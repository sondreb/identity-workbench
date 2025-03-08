declare module '@sondreb/did-stellar' {
    export class DidStellar {
        static resolve(didString: string): any;
        static fromPrivateKey(key: string): any;
        static fromPublicKey(key: string): any;
    }
}