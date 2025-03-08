export interface Credential {
  id: string;
  type: string;
  issuer: string;
  issuanceDate: Date;
  expirationDate?: Date;
  subject: string;
  credentialSubject: any;
  rawCredential: any;
  revoked?: boolean;
  name?: string; // User-friendly name
  description?: string; // User-friendly description
}

export const CREDENTIAL_TYPES = [
  { 
    id: 'VerifiableCredential', 
    name: 'Generic Credential',
    description: 'A basic Verifiable Credential'
  },
  { 
    id: 'IdentityCredential', 
    name: 'Identity',
    description: 'A credential asserting identity information'
  },
  { 
    id: 'ProofOfAgeCredential', 
    name: 'Proof of Age',
    description: 'A credential proving the holder is over a certain age'
  },
  { 
    id: 'AgreementCredential', 
    name: 'Agreement',
    description: 'A credential asserting an agreement between parties'
  },
  { 
    id: 'DocumentCredential', 
    name: 'Document',
    description: 'A credential containing or referencing a document'
  },
  { 
    id: 'ContractCredential', 
    name: 'Contract',
    description: 'A credential representing a contract between parties'
  }
];
