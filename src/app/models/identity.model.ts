export interface Identity {
  id: string; // The DID identifier
  method: string; // The DID method (key, web, stellar, etc.)
  publicKey: string;
  privateKey?: string; // Optional, only if imported
  name?: string; // User-assigned name
  description?: string; // User-assigned description
  created: Date;
  updated: Date;
  didDocument?: any; // The full DID document, if available
}

export const DID_METHODS = [
  { id: 'key', name: 'did:key', description: 'Cryptographic keys on the curve Ed25519' },
  { id: 'web', name: 'did:web', description: 'DIDs based on web domains' },
  { id: 'stellar', name: 'did:stellar', description: 'DIDs on the Stellar network' },
  { id: 'is', name: 'did:is', description: 'DIDs used by Liberstad' }
];
