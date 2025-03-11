import { Injectable } from '@angular/core';
import { Credential } from '../models/credential.model';
import { v4 as uuidv4 } from 'uuid';
import { StorageService } from './storage.service';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CredentialService {
  private storageKey = 'identity-workbench-credentials';
  private credentialsSubject = new BehaviorSubject<Credential[]>([]);
  public credentials$ = this.credentialsSubject.asObservable();

  constructor(private storageService: StorageService) {
    this.loadCredentials();
  }

  private loadCredentials() {
    const credentials = this.storageService.get<Credential[]>(this.storageKey) || [];
    this.credentialsSubject.next(credentials);
  }

  private saveCredentials(credentials: Credential[]) {
    this.storageService.set(this.storageKey, credentials);
    this.credentialsSubject.next(credentials);
  }

  getAllCredentials(): Observable<Credential[]> {
    return this.credentials$;
  }

  getCredentialById(id: string): Credential | undefined {
    const credentials = this.credentialsSubject.value;
    return credentials.find(cred => cred.id === id);
  }

  getCredentialsByIssuer(issuerId: string): Credential[] {
    return this.credentialsSubject.value.filter(cred => cred.issuer === issuerId);
  }

  getCredentialsBySubject(subjectId: string): Credential[] {
    return this.credentialsSubject.value.filter(cred => cred.subject === subjectId);
  }

  addCredential(credentialData: Partial<Credential>): Credential {
    // Generate a unique ID if not provided
    const id = credentialData.id || uuidv4();
    
    const newCredential: Credential = {
      id,
      type: credentialData.type || 'VerifiableCredential',
      issuer: credentialData.issuer || '',
      issuanceDate: credentialData.issuanceDate || new Date(),
      expirationDate: credentialData.expirationDate,
      subject: credentialData.subject || '',
      credentialSubject: credentialData.credentialSubject || {},
      rawCredential: credentialData.rawCredential || {},
      revoked: false,
      name: credentialData.name || `Credential ${this.credentialsSubject.value.length + 1}`,
      description: credentialData.description || '',
      jwt: credentialData.jwt || '',
      decodedJwt: credentialData.decodedJwt || null
    };

    const updatedCredentials = [...this.credentialsSubject.value, newCredential];
    this.saveCredentials(updatedCredentials);
    return newCredential;
  }

  updateCredential(id: string, updates: Partial<Credential>): Credential {
    const credentials = this.credentialsSubject.value;
    const index = credentials.findIndex(cred => cred.id === id);
    
    if (index === -1) {
      throw new Error(`Credential with id ${id} not found`);
    }

    const updatedCredential = {
      ...credentials[index],
      ...updates
    };

    const updatedCredentials = [
      ...credentials.slice(0, index),
      updatedCredential,
      ...credentials.slice(index + 1)
    ];

    this.saveCredentials(updatedCredentials);
    return updatedCredential;
  }

  deleteCredential(id: string): void {
    const credentials = this.credentialsSubject.value;
    const updatedCredentials = credentials.filter(cred => cred.id !== id);
    this.saveCredentials(updatedCredentials);
  }

  revokeCredential(id: string): void {
    const credentials = this.credentialsSubject.value;
    const index = credentials.findIndex(cred => cred.id === id);
    
    if (index !== -1) {
      this.updateCredential(id, { revoked: true });
    }
  }

  importCredential(json: any): Credential | null {
    try {
      const vcData = json.vc;

      // Basic validation for VC structure
      if (!vcData || !vcData.id || !vcData.type || 
          !vcData.issuer || !vcData.credentialSubject) {
        return null;
      }
      
      // Parse dates from string if needed
      const issuanceDate = vcData.issuanceDate ? new Date(vcData.issuanceDate) : new Date();
      const expirationDate = vcData.expirationDate ? new Date(vcData.expirationDate) : undefined;
      
      const subject = typeof vcData.credentialSubject.id === 'string' 
        ? vcData.credentialSubject.id 
        : '';

      return this.addCredential({
        id: vcData.id,
        type: Array.isArray(vcData.type) ? vcData.type[1] || vcData.type[0] : vcData.type,
        issuer: typeof vcData.issuer === 'string' ? vcData.issuer : vcData.issuer.id,
        issuanceDate,
        expirationDate,
        subject,
        credentialSubject: vcData.credentialSubject,
        rawCredential: vcData,
        name: `Imported ${Array.isArray(vcData.type) ? vcData.type[1] || 'Credential' : vcData.type}`,
        description: `Imported on ${new Date().toLocaleString()}`,
        jwt: json.jwt,
        decodedJwt: json.decoded
      });
    } catch (error) {
      console.error('Error importing credential:', error);
      return null;
    }
  }

  verifyCredential(vcData: any): { valid: boolean, message: string } {
    // Basic validation logic
    if (!vcData || !vcData.id || !vcData.type || !vcData.issuer || !vcData.credentialSubject) {
      return { valid: false, message: 'Invalid credential format' };
    }

    // Check if credential is expired
    if (vcData.expirationDate) {
      const expiry = new Date(vcData.expirationDate);
      if (expiry < new Date()) {
        return { valid: false, message: 'Credential has expired' };
      }
    }

    // Check signature and other verification would happen here
    // This would use proper crypto in a real implementation

    // For this demo, just return valid
    return { valid: true, message: 'Credential format is valid. Full cryptographic verification not implemented in demo.' };
  }

  /**
   * Reloads credentials from storage
   * Used when data is imported/cleared in settings
   */
  public loadFromStorage(): void {
    this.loadCredentials();
  }
}
