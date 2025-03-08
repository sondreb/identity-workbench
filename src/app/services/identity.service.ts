import { Injectable } from '@angular/core';
import { Identity } from '../models/identity.model';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class IdentityService {
  private storageKey = 'identity-workbench-identities';
  private identitiesSubject = new BehaviorSubject<Identity[]>([]);
  public identities$ = this.identitiesSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadIdentities();
  }

  private loadIdentities() {
    const identities = this.storageService.get<Identity[]>(this.storageKey) || [];
    this.identitiesSubject.next(identities);
  }

  private saveIdentities(identities: Identity[]) {
    this.storageService.set(this.storageKey, identities);
    this.identitiesSubject.next(identities);
  }

  getAllIdentities(): Observable<Identity[]> {
    return this.identities$;
  }

  getIdentityById(id: string): Identity | undefined {
    const identities = this.identitiesSubject.value;
    return identities.find(identity => identity.id === id);
  }

  addIdentity(identity: Partial<Identity>): Identity {
    const now = new Date();
    const newIdentity: Identity = {
      id: identity.id || `did:key:${uuidv4()}`,
      method: identity.method || 'key',
      publicKey: identity.publicKey || '',
      privateKey: identity.privateKey,
      name: identity.name || `Identity ${this.identitiesSubject.value.length + 1}`,
      description: identity.description,
      created: now,
      updated: now,
      didDocument: identity.didDocument
    };

    const updatedIdentities = [...this.identitiesSubject.value, newIdentity];
    this.saveIdentities(updatedIdentities);
    return newIdentity;
  }

  updateIdentity(id: string, updates: Partial<Identity>): Identity {
    const identities = this.identitiesSubject.value;
    const index = identities.findIndex(identity => identity.id === id);
    
    if (index === -1) {
      throw new Error(`Identity with id ${id} not found`);
    }

    const updatedIdentity = {
      ...identities[index],
      ...updates,
      updated: new Date()
    };

    const updatedIdentities = [
      ...identities.slice(0, index),
      updatedIdentity,
      ...identities.slice(index + 1)
    ];

    this.saveIdentities(updatedIdentities);
    return updatedIdentity;
  }

  deleteIdentity(id: string): void {
    const identities = this.identitiesSubject.value;
    const updatedIdentities = identities.filter(identity => identity.id !== id);
    this.saveIdentities(updatedIdentities);
  }

  importFromDIDString(didString: string): Identity | null {
    // Basic validation
    if (!didString.startsWith('did:')) {
      return null;
    }

    const parts = didString.split(':');
    if (parts.length < 3) {
      return null;
    }

    const method = parts[1];
    
    // Create a basic identity from the DID string
    return this.addIdentity({
      id: didString,
      method: method,
      publicKey: parts.slice(2).join(':'),
      name: `Imported ${method.toUpperCase()} DID`,
      description: `Imported on ${new Date().toLocaleString()}`
    });
  }

  importFromStellarKey(publicKey: string): Identity | null {
    if (!publicKey || publicKey.length < 16) {
      return null;
    }

    // Create a Stellar DID from the public key
    const didString = `did:stellar:${publicKey}`;
    
    return this.addIdentity({
      id: didString,
      method: 'stellar',
      publicKey: publicKey,
      name: `Imported Stellar Key`,
      description: `Imported on ${new Date().toLocaleString()}`
    });
  }

  importFromJsonFile(didDocument: any): Identity | null {
    if (!didDocument || !didDocument.id || !didDocument.id.startsWith('did:')) {
      return null;
    }

    const parts = didDocument.id.split(':');
    if (parts.length < 3) {
      return null;
    }

    let publicKey = '';

    // Extract public key if available in the DID document
    if (didDocument.verificationMethod && didDocument.verificationMethod.length > 0) {
      for (const method of didDocument.verificationMethod) {
        if (method.type === 'Ed25519VerificationKey2018' || 
            method.type === 'Ed25519VerificationKey2020') {
          if (method.publicKeyBase58) {
            publicKey = method.publicKeyBase58;
            break;
          }
        }
      }
    }

    return this.addIdentity({
      id: didDocument.id,
      method: parts[1],
      publicKey,
      name: `Imported ${parts[1].toUpperCase()} DID Document`,
      description: `Imported on ${new Date().toLocaleString()}`,
      didDocument
    });
  }
}
