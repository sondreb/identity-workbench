/**
 * Common interfaces and types for the Identity Workbench
 */

export interface DidDocument {
  '@context': string[];
  id: string;
  controller?: string | string[];
  verificationMethod?: VerificationMethod[];
  authentication?: (string | VerificationMethod)[];
  assertionMethod?: (string | VerificationMethod)[];
  keyAgreement?: (string | VerificationMethod)[];
  capabilityInvocation?: (string | VerificationMethod)[];
  capabilityDelegation?: (string | VerificationMethod)[];
  service?: ServiceEndpoint[];
}

export interface VerificationMethod {
  id: string;
  type: string;
  controller: string;
  publicKeyBase58?: string;
  publicKeyJwk?: any;
  publicKeyMultibase?: string;
  publicKeyHex?: string;
  blockchainAccountId?: string;
}

export interface ServiceEndpoint {
  id: string;
  type: string;
  serviceEndpoint: string | string[] | Record<string, any>;
  description?: string;
}

export interface VerifiableCredential {
  '@context': string[];
  id: string;
  type: string[];
  issuer: string | { id: string; [key: string]: any };
  issuanceDate: string;
  expirationDate?: string;
  credentialSubject: {
    id?: string;
    [key: string]: any;
  };
  proof?: {
    type: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    proofValue?: string;
    jws?: string;
    [key: string]: any;
  };
  [key: string]: any;
}

export interface VerifiablePresentation {
  '@context': string[];
  id?: string;
  type: string[];
  verifiableCredential: VerifiableCredential[];
  holder: string;
  proof?: {
    type: string;
    created: string;
    verificationMethod: string;
    proofPurpose: string;
    challenge?: string;
    domain?: string;
    proofValue?: string;
    jws?: string;
    [key: string]: any;
  };
}

export interface ThemeSettings {
  theme: 'dark' | 'light' | 'system';
  accentColor: string;
}

export interface PrivacySettings {
  storePrivateKeys: boolean;
  autoVerify: boolean;
}

export interface AdvancedSettings {
  resolverEndpoint: string;
  enableDebugMode: boolean;
}

export interface AppSettings {
  appearance: ThemeSettings;
  privacy: PrivacySettings;
  advanced: AdvancedSettings;
}
