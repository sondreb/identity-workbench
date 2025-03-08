# Identity Workbench
Workbench Tool for Decentralized Identifiers and Verifiable Credentials

## About

Local and private environment for working with Decentralized Identifiers (DIDs) and Verifiable Credentials (VCs).

Your identities and your credentials are stored locally and privately. No data is stored on any server.

Use the Identity Workbench to import and manage your DIDs and VCs, create and verify VCs, and interact with the decentralized identity ecosystem.

While some data can be useful on blockchains, the majority of data should be stored privately between the involved (signing) parties. This tool is designed to help you manage your data in a secure and private way.

## Features

Use the Identity Workbench to issue verifiable credentials to others, verify credentials issued to you, and manage your decentralized identities.

You can for example generate an business contract, prenuptial agreement, or any other contract or agreement, then sign it and send it to the other party. The other party can then verify the credential and store it in their own Identity Workbench.

### Signing Content vs Documents

The Identity Workbench can sign content and documents. Content is a string of text, while a document is a file. 

When you sign a document, the Identity Workbench will hash the document and sign the hash. When you sign content, the Identity Workbench will sign the content directly.

This can be useful when you want to publicly share that you signed something, but don't want to share the actual content. It is also useful when the content is large.

## Supported DID Methods

The Identity Workbench supports the following DID methods:

- did:key
- did:web
- did:stellar (used by [Montelibero](https://montelibero.org))
- [did:is](https://did.is) (used by [Liberstad](https://liberstad.com))

