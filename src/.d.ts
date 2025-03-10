declare module '@sondreb/did-stellar' {
    export class DidStellar {
        static resolve(didString: string): any;
        static fromPrivateKey(key: string): any;
        static fromPublicKey(key: string): any;
    }
}

declare module '@sondreb/did-key' {
    export class DidKey {
        static resolve(didString: string): any;
        static fromPrivateKey(key: any, keyType: 'ed25519' | 'secp256k1'): any;
        static generate(keyType: string): any;
    }
}