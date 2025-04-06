import { Injectable } from '@angular/core';
import { Identity } from '../models/identity.model';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';
import { DidStellar } from '@sondreb/did-stellar';
import { DidKey } from '@sondreb/did-key';
import is from '@blockcore/did-resolver';
import nostr from '@blockcore/nostr-did-resolver';
import { Resolver } from 'did-resolver';

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

  /**
   * Reloads identities from storage
   * Used when data is imported/cleared in settings
   */
  public loadFromStorage(): void {
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

  async importFromDIDString(didString: string): Promise<Identity | null> {
    // Basic validation
    if (!didString.startsWith('did:')) {
      return null;
    }

    try {
      const parts = didString.split(':');
      if (parts.length < 3) {
        return null;
      }

      const method = parts[1];

      if (method === 'key') {
        let didDocument;
        let didResolution;

        didResolution = DidKey.resolve(didString);
        didDocument = didResolution.didDocument;
        
        return this.addIdentity({
          id: didString,
          method: 'key',
          publicKey: parts[2], // Extract the public key from the DID
          name: `Imported Key DID (${parts[2].startsWith('z6Mk') ? 'Ed25519' : 'Secp256k1'})`,
          description: `Imported on ${new Date().toLocaleString()}`,
          didDocument
        });
      }
      
      // Handle Stellar DIDs specifically
      if (method === 'stellar') {
        const didResolution = DidStellar.resolve(didString);
        const didDocument = didResolution.didDocument;
        
        return this.addIdentity({
          id: didString,
          method: method,
          publicKey: parts[2], // Extract the public key from the DID
          name: `Imported Stellar DID`,
          description: `Imported on ${new Date().toLocaleString()}`,
          didDocument
        });
      }

      if (method === 'is') {
        const resolver = new Resolver(is.getResolver());
        const didResolution = await resolver.resolve(didString);
        const didDocument = didResolution.didDocument
        
        return this.addIdentity({
          id: didString,
          method: method,
          publicKey: parts[2], // Extract the public key from the DID
          name: `Imported FreeID`,
          description: `Imported on ${new Date().toLocaleString()}`,
          didDocument
        });
      }

      if (method === 'nostr') {
        const resolver = new Resolver(nostr.getResolver());
        const didResolution = await resolver.resolve(didString);
        const didDocument = didResolution.didDocument
        
        return this.addIdentity({
          id: didString,
          method: method,
          publicKey: parts[2], // Extract the public key from the DID
          name: `Imported Nostr DID`,
          description: `Imported on ${new Date().toLocaleString()}`,
          didDocument
        });
      }
      
      // Create a basic identity from the DID string for other methods
      return this.addIdentity({
        id: didString,
        method: method,
        publicKey: parts.slice(2).join(':'),
        name: `Imported ${method.toUpperCase()} DID`,
        description: `Imported on ${new Date().toLocaleString()}`
      });
    } catch (error) {
      console.error('Error importing DID string:', error);
      return null;
    }
  }

  importFromStellarKey(key: string, isPrivateKey = false): Identity | null {
    try {
      if (!key || key.length < 16) {
        return null;
      }

      let didDocument;
      let publicKey;
      let privateKey;
      let did;
      
      // Handle based on whether this is a private or public key
      if (isPrivateKey) {
        const result = DidStellar.fromPrivateKey(key);
        didDocument = result;
        did = didDocument.id;
        // Should the key be formatted as Stellar or not?
        // publicKey = result.verificationMethod[0].publicKeyMultibase;
        publicKey = did.split(':')[2];
        privateKey = key;
      } else {
        // This is a public key
        const result = DidStellar.fromPublicKey(key);
        didDocument = result;
        did = didDocument.id;
        publicKey = key;
      }
      
      return this.addIdentity({
        id: did,
        method: 'stellar',
        publicKey,
        privateKey,
        name: `Imported Stellar ${isPrivateKey ? 'Private' : 'Public'} Key`,
        description: `Imported on ${new Date().toLocaleString()}`,
        didDocument
      });
    } catch (error) {
      console.error('Error importing Stellar key:', error);
      return null;
    }
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
