declare module '@sondreb/did-stellar' {
    export class DidStellar {
        static resolve(didString: string): any;
        static fromPrivateKey(key: string): any;
        static fromPublicKey(key: string): any;
    }

    export class StrKey {
        static encodeEd25519PublicKey(key: string): string;
        static encodeEd25519SecretSeed(key: string): string;
        static encodeEd25519SecretKey(key: string): string;
        static encodePreAuthTx(key: string): string;
        static encodeSha256Hash(key: string): string;
        static decodeEd25519PublicKey(key: string): string;
        static decodeEd25519SecretSeed(key: string): string;
        static decodeEd25519SecretKey(key: string): string;
        static decodePreAuthTx(key: string): string;
        static decodeSha256Hash(key: string): string;
    }
}

declare module '@sondreb/did-key' {
    export class DidKey {
        static resolve(didString: string): any;
        static fromPrivateKey(key: any, keyType: 'ed25519' | 'secp256k1'): any;
        static generate(keyType: string): any;
    }
}