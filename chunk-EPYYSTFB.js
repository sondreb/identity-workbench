import{a as u}from"./chunk-FKVQ3YOM.js";import{i as c}from"./chunk-D6JINR2S.js";import{a as s,ba as a,ga as o,m as l}from"./chunk-OXWMXC6C.js";var p=class n{constructor(e){this.storageService=e;this.loadCredentials()}storageKey="identity-workbench-credentials";credentialsSubject=new l([]);credentials$=this.credentialsSubject.asObservable();loadCredentials(){let e=this.storageService.get(this.storageKey)||[];this.credentialsSubject.next(e)}saveCredentials(e){this.storageService.set(this.storageKey,e),this.credentialsSubject.next(e)}getAllCredentials(){return this.credentials$}getCredentialById(e){return this.credentialsSubject.value.find(i=>i.id===e)}getCredentialsByIssuer(e){return this.credentialsSubject.value.filter(t=>t.issuer===e)}getCredentialsBySubject(e){return this.credentialsSubject.value.filter(t=>t.subject===e)}addCredential(e){let i={id:e.id||u(),type:e.type||"VerifiableCredential",issuer:e.issuer||"",issuanceDate:e.issuanceDate||new Date,expirationDate:e.expirationDate,subject:e.subject||"",credentialSubject:e.credentialSubject||{},rawCredential:e.rawCredential||{},revoked:!1,name:e.name||`Credential ${this.credentialsSubject.value.length+1}`,description:e.description||""},r=[...this.credentialsSubject.value,i];return this.saveCredentials(r),i}updateCredential(e,t){let i=this.credentialsSubject.value,r=i.findIndex(b=>b.id===e);if(r===-1)throw new Error(`Credential with id ${e} not found`);let d=s(s({},i[r]),t),C=[...i.slice(0,r),d,...i.slice(r+1)];return this.saveCredentials(C),d}deleteCredential(e){let i=this.credentialsSubject.value.filter(r=>r.id!==e);this.saveCredentials(i)}revokeCredential(e){this.credentialsSubject.value.findIndex(r=>r.id===e)!==-1&&this.updateCredential(e,{revoked:!0})}importCredential(e){try{if(!e||!e.id||!e.type||!e.issuer||!e.credentialSubject)return null;let t=e.issuanceDate?new Date(e.issuanceDate):new Date,i=e.expirationDate?new Date(e.expirationDate):void 0,r=typeof e.credentialSubject.id=="string"?e.credentialSubject.id:"";return this.addCredential({id:e.id,type:Array.isArray(e.type)?e.type[1]||e.type[0]:e.type,issuer:typeof e.issuer=="string"?e.issuer:e.issuer.id,issuanceDate:t,expirationDate:i,subject:r,credentialSubject:e.credentialSubject,rawCredential:e,name:`Imported ${Array.isArray(e.type)?e.type[1]||"Credential":e.type}`,description:`Imported on ${new Date().toLocaleString()}`})}catch(t){return console.error("Error importing credential:",t),null}}verifyCredential(e){return!e||!e.id||!e.type||!e.issuer||!e.credentialSubject?{valid:!1,message:"Invalid credential format"}:e.expirationDate&&new Date(e.expirationDate)<new Date?{valid:!1,message:"Credential has expired"}:{valid:!0,message:"Credential format is valid. Full cryptographic verification not implemented in demo."}}static \u0275fac=function(t){return new(t||n)(o(c))};static \u0275prov=a({token:n,factory:n.\u0275fac,providedIn:"root"})};export{p as a};
