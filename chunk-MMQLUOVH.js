import{a as _e,b as he}from"./chunk-C666SH7X.js";import{a as me,b as se,c as T}from"./chunk-4S3552LW.js";import{a as pe,b as ce,c as O}from"./chunk-NGBCD6AJ.js";import{A as fe,p as L,q as ge,r as B,u as R,v as ye,x as J,y as V,z as ue}from"./chunk-R3OSE4SY.js";import{h as F,m as N,o as W,q as j}from"./chunk-UHRTGXCF.js";import{b as K}from"./chunk-XS3ALSKJ.js";import{a as te,b as ie,c as ne,d as oe,e as re,f as ae,g as le,h as de}from"./chunk-ITVYJ2AF.js";import{d as ee}from"./chunk-X5YHJFSD.js";import{Ad as k,Bd as P,Fb as i,Gb as u,Hb as x,Jb as c,Ka as m,Kb as g,Lb as y,Nb as b,Oa as f,Qb as Z,Sb as q,Va as v,Za as h,eb as _,f as H,gc as Q,ic as X,jb as C,lc as $,mb as U,nb as G,nc as D,oa as I,ob as t,pa as S,pb as e,qb as Y,sb as M,ub as s,vb as p,vd as E,yd as w}from"./chunk-AE43V2TS.js";var Pe=l=>({detected:l});function Ke(l,o){if(l&1&&(t(0,"div",27),i(1),e()),l&2){let r=p();_("ngClass",b(2,Pe,r.stellarKeyType==="Public Key"||r.stellarKeyType==="Private Key")),m(),x(" Detected: ",r.stellarKeyType," ")}}function Te(l,o){l&1&&(t(0,"div",28),i(1," Private keys enable credential signing and can be used to derive the public key "),e())}var A=class l{constructor(o,r,n){this.dialogRef=o;this.identityService=r;this.snackBar=n}didString="";stellarKey="";jsonContent="";privateKey="";privateKeyName="";isStellarPrivateKey=!1;stellarKeyType="Unknown Key Type";freeIdDid="";freeIdPrivateKey="";freeIdImportType="did";importDID(){return H(this,null,function*(){if(!this.didString){this.showError("Please enter a valid DID");return}let o=yield this.identityService.importFromDIDString(this.didString);console.log("Result:",o),o?(this.showSuccess("DID imported successfully"),this.dialogRef.close(!0)):this.showError("Failed to import DID. Please check the format.")})}importStellar(){if(!this.stellarKey){this.showError("Please enter a valid Stellar key");return}this.identityService.importFromStellarKey(this.stellarKey,this.isStellarPrivateKey)?(this.showSuccess(`Stellar ${this.isStellarPrivateKey?"private":"public"} key imported successfully`),this.dialogRef.close(!0)):this.showError(`Failed to import Stellar ${this.isStellarPrivateKey?"private":"public"} key. Please check the format.`)}importJSON(){if(!this.jsonContent){this.showError("Please enter valid JSON content");return}try{let o=JSON.parse(this.jsonContent);this.identityService.importFromJsonFile(o)?(this.showSuccess("DID document imported successfully"),this.dialogRef.close(!0)):this.showError("Failed to import DID document. Invalid format.")}catch{this.showError("Invalid JSON format")}}importPrivateKey(){if(!this.privateKey||!this.privateKeyName){this.showError("Please provide both a name and private key");return}this.identityService.addIdentity({method:"key",publicKey:"generated-from-private-key",privateKey:this.privateKey,name:this.privateKeyName,description:"Identity with imported private key"})?(this.showSuccess("Private key imported successfully"),this.dialogRef.close(!0)):this.showError("Failed to import private key")}onFileSelected(o,r){let n=o.target.files?.[0];if(!n)return;let d=new FileReader;d.onload=a=>{let z=a.target?.result;r==="json"?this.jsonContent=z:r==="privateKey"&&(this.privateKey=z)},d.readAsText(n)}onStellarKeyInput(){let o=this.stellarKey.trim();if(!o){this.stellarKeyType="Unknown Key Type";return}o.startsWith("S")&&o.length===56?(this.isStellarPrivateKey=!0,this.stellarKeyType="Private Key"):o.startsWith("G")&&o.length===56?(this.isStellarPrivateKey=!1,this.stellarKeyType="Public Key"):this.stellarKeyType="Invalid Key Format"}closeDialog(){this.dialogRef.close(!1)}showSuccess(o){this.snackBar.open(o,"Close",{duration:3e3,panelClass:"success-snackbar"})}showError(o){this.snackBar.open(o,"Close",{duration:5e3,panelClass:"error-snackbar"})}static \u0275fac=function(r){return new(r||l)(f(me),f(K),f(ue))};static \u0275cmp=v({type:l,selectors:[["app-import-identity-dialog"]],decls:96,vars:10,consts:[[1,"import-dialog-container"],[1,"dialog-title","neon-text"],["dynamicHeight","","animationDuration","300ms"],["label","DID String"],[1,"tab-content"],[1,"tab-description"],["appearance","outline",1,"full-width"],["matInput","","placeholder","did:method:identifier",3,"ngModelChange","ngModel"],["matSuffix",""],[1,"action-buttons"],["mat-button","",3,"click"],["mat-raised-button","","color","primary",3,"click"],["label","Stellar Key"],["matInput","","placeholder","Enter Stellar public or private key",3,"ngModelChange","input","ngModel"],[1,"key-type-selector"],["color","primary",3,"ngModelChange","ngModel","disabled"],["class","key-type-hint",3,"ngClass",4,"ngIf"],["class","key-type-hint",4,"ngIf"],["label","JSON File"],[1,"file-input-wrapper"],["mat-stroked-button","","color","primary",1,"upload-btn"],["type","file","accept",".json",3,"change"],["matInput","","rows","8","placeholder","Paste JSON content here...",3,"ngModelChange","ngModel"],["label","Private Key"],["matInput","","placeholder","Signing Key Name",3,"ngModelChange","ngModel"],["type","file",3,"change"],["matInput","","rows","4","placeholder","Paste private key here...",3,"ngModelChange","ngModel"],[1,"key-type-hint",3,"ngClass"],[1,"key-type-hint"]],template:function(r,n){r&1&&(t(0,"div",0)(1,"h2",1),i(2,"Import Identity"),e(),t(3,"mat-tab-group",2)(4,"mat-tab",3)(5,"div",4)(6,"p",5),i(7,"Supported methods: DID Key (did:key), FreeID (did:is), DID Stellar (did:stellar)"),Y(8,"br")(9,"br"),i(10," Enter a DID identifier to import (e.g., did:key:z6Mk..., did:stellar:SOZ..., did:is:0f254...) "),e(),t(11,"mat-form-field",6)(12,"mat-label"),i(13,"DID String"),e(),t(14,"input",7),y("ngModelChange",function(a){return g(n.didString,a)||(n.didString=a),a}),e(),t(15,"mat-icon",8),i(16,"contact_page"),e()(),t(17,"div",9)(18,"button",10),s("click",function(){return n.closeDialog()}),i(19,"Cancel"),e(),t(20,"button",11),s("click",function(){return n.importDID()}),t(21,"mat-icon"),i(22,"add"),e(),i(23," Import DID "),e()()()(),t(24,"mat-tab",12)(25,"div",4)(26,"p",5),i(27,"Enter a Stellar key to import"),e(),t(28,"mat-form-field",6)(29,"mat-label"),i(30,"Stellar Key"),e(),t(31,"input",13),y("ngModelChange",function(a){return g(n.stellarKey,a)||(n.stellarKey=a),a}),s("input",function(){return n.onStellarKeyInput()}),e(),t(32,"mat-icon",8),i(33,"star"),e(),t(34,"mat-hint"),i(35),e()(),t(36,"div",14)(37,"mat-slide-toggle",15),y("ngModelChange",function(a){return g(n.isStellarPrivateKey,a)||(n.isStellarPrivateKey=a),a}),i(38," This is a private key "),e(),h(39,Ke,2,4,"div",16)(40,Te,2,0,"div",17),e(),t(41,"div",9)(42,"button",10),s("click",function(){return n.closeDialog()}),i(43,"Cancel"),e(),t(44,"button",11),s("click",function(){return n.importStellar()}),t(45,"mat-icon"),i(46,"add"),e(),i(47," Import Stellar Key "),e()()()(),t(48,"mat-tab",18)(49,"div",4)(50,"p",5),i(51,"Import a DID Document from JSON"),e(),t(52,"div",19)(53,"button",20)(54,"mat-icon"),i(55,"upload_file"),e(),i(56," Select JSON File "),e(),t(57,"input",21),s("change",function(a){return n.onFileSelected(a,"json")}),e()(),t(58,"mat-form-field",6)(59,"mat-label"),i(60,"JSON Content"),e(),t(61,"textarea",22),y("ngModelChange",function(a){return g(n.jsonContent,a)||(n.jsonContent=a),a}),e()(),t(62,"div",9)(63,"button",10),s("click",function(){return n.closeDialog()}),i(64,"Cancel"),e(),t(65,"button",11),s("click",function(){return n.importJSON()}),t(66,"mat-icon"),i(67,"add"),e(),i(68," Import JSON "),e()()()(),t(69,"mat-tab",23)(70,"div",4)(71,"p",5),i(72,"Import a private key for signing credentials"),e(),t(73,"mat-form-field",6)(74,"mat-label"),i(75,"Name"),e(),t(76,"input",24),y("ngModelChange",function(a){return g(n.privateKeyName,a)||(n.privateKeyName=a),a}),e()(),t(77,"div",19)(78,"button",20)(79,"mat-icon"),i(80,"upload_file"),e(),i(81," Select Private Key File "),e(),t(82,"input",25),s("change",function(a){return n.onFileSelected(a,"privateKey")}),e()(),t(83,"mat-form-field",6)(84,"mat-label"),i(85,"Private Key"),e(),t(86,"textarea",26),y("ngModelChange",function(a){return g(n.privateKey,a)||(n.privateKey=a),a}),e(),t(87,"mat-hint"),i(88,"This key will be stored securely and used for signing credentials"),e()(),t(89,"div",9)(90,"button",10),s("click",function(){return n.closeDialog()}),i(91,"Cancel"),e(),t(92,"button",11),s("click",function(){return n.importPrivateKey()}),t(93,"mat-icon"),i(94,"vpn_key"),e(),i(95," Import Private Key "),e()()()()()()),r&2&&(m(14),c("ngModel",n.didString),m(17),c("ngModel",n.stellarKey),m(4),u(n.stellarKeyType),m(2),c("ngModel",n.isStellarPrivateKey),_("disabled",n.stellarKey&&(n.stellarKeyType==="Public Key"||n.stellarKeyType==="Private Key")),m(2),_("ngIf",n.stellarKey&&n.stellarKeyType!=="Unknown Key Type"),m(),_("ngIf",!n.stellarKey||n.stellarKeyType==="Unknown Key Type"),m(21),c("ngModel",n.jsonContent),m(15),c("ngModel",n.privateKeyName),m(10),c("ngModel",n.privateKey))},dependencies:[D,Q,X,j,F,N,W,T,ye,R,L,ge,B,V,J,w,E,O,pe,ce,P,k,fe,he,_e],styles:[".import-dialog-container[_ngcontent-%COMP%]{padding:16px;max-width:600px}.dialog-title[_ngcontent-%COMP%]{text-align:center;margin-bottom:20px}.tab-content[_ngcontent-%COMP%]{padding:20px 0}.tab-description[_ngcontent-%COMP%]{color:var(--text-secondary);margin-bottom:20px}.full-width[_ngcontent-%COMP%]{width:100%}.action-buttons[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;gap:10px;margin-top:20px}.file-input-wrapper[_ngcontent-%COMP%]{position:relative;margin-bottom:20px;overflow:hidden}.file-input-wrapper[_ngcontent-%COMP%]   input[type=file][_ngcontent-%COMP%]{position:absolute;top:0;left:0;width:100%;height:100%;opacity:0;cursor:pointer}.upload-btn[_ngcontent-%COMP%]{width:100%;display:flex;align-items:center;justify-content:center;gap:8px;padding:10px;border:1px dashed var(--primary-color)}textarea[_ngcontent-%COMP%]:focus, input[_ngcontent-%COMP%]:focus{box-shadow:0 0 8px #00c3ff99}.key-type-selector[_ngcontent-%COMP%]{margin-bottom:20px}.key-type-hint[_ngcontent-%COMP%]{font-size:.85rem;color:var(--text-secondary);margin-top:8px;margin-left:4px}.key-type-hint.detected[_ngcontent-%COMP%]{color:var(--success-color);font-weight:500}"]})};var Oe=l=>["/identity",l],Fe=(l,o)=>o.id;function Ne(l,o){if(l&1){let r=M();t(0,"div",10)(1,"mat-icon"),i(2,"person_off"),e(),t(3,"h2"),i(4,"No Identities Found"),e(),t(5,"p"),i(6,"You haven't imported any identities yet."),e(),t(7,"button",5),s("click",function(){I(r);let d=p();return S(d.openImportDialog())}),i(8," Import Your First Identity "),e()()}}function We(l,o){if(l&1){let r=M();t(0,"div",10)(1,"mat-icon"),i(2,"search_off"),e(),t(3,"h2"),i(4,"No Results Found"),e(),t(5,"p"),i(6,"No identities match your search criteria."),e(),t(7,"button",12),s("click",function(){I(r);let d=p();return S(d.searchTerm="")}),i(8," Clear Search "),e()()}}function je(l,o){if(l&1&&(t(0,"p",15),i(1),e()),l&2){let r=p().$implicit;m(),u(r.description)}}function Le(l,o){l&1&&(t(0,"p",17)(1,"mat-icon"),i(2,"vpn_key"),e(),i(3," Private Key Available "),e())}function Be(l,o){if(l&1){let r=M();t(0,"mat-card",13)(1,"mat-card-header")(2,"div",14)(3,"mat-icon"),i(4),e()(),t(5,"mat-card-title"),i(6),e(),t(7,"mat-card-subtitle"),i(8),e()(),t(9,"mat-card-content"),h(10,je,2,1,"p",15),t(11,"p",16),i(12,"Method: "),t(13,"span",3),i(14),e()(),t(15,"p",16),i(16),Z(17,"date"),e(),h(18,Le,4,0,"p",17),e(),t(19,"mat-card-actions")(20,"button",18),i(21," DETAILS "),e(),t(22,"button",19),s("click",function(){let d=I(r).$implicit,a=p(2);return S(a.deleteIdentity(d.id))}),i(23," DELETE "),e()()()}if(l&2){let r=o.$implicit,n=p(2);m(4),u(n.getMethodLogo(r.method)),m(2),u(r.name),m(2),u(n.truncateId(r.id)),m(2),C(r.description?10:-1),m(4),u(r.method),m(2),x("Created: ",q(17,8,r.created,"medium"),""),m(2),C(r.privateKey?18:-1),m(2),_("routerLink",b(11,Oe,r.id))}}function Re(l,o){if(l&1&&(t(0,"div",11),U(1,Be,24,13,"mat-card",13,Fe),e()),l&2){let r=p();m(),G(r.filteredIdentities)}}var Ce=class l{constructor(o,r){this.identityService=o;this.dialog=r;this.loadIdentities()}identities=[];searchTerm="";loadIdentities(){this.identityService.getAllIdentities().subscribe(o=>{this.identities=o})}get filteredIdentities(){if(!this.searchTerm)return this.identities;let o=this.searchTerm.toLowerCase();return this.identities.filter(r=>r.id.toLowerCase().includes(o)||r.name?.toLowerCase().includes(o)||r.description?.toLowerCase().includes(o))}openImportDialog(){this.dialog.open(A,{width:"600px"}).afterClosed().subscribe(r=>{r&&this.loadIdentities()})}deleteIdentity(o){confirm("Are you sure you want to delete this identity?")&&this.identityService.deleteIdentity(o)}getMethodLogo(o){switch(o){case"key":return"vpn_key";case"web":return"language";case"stellar":return"star";case"is":return"public";default:return"person"}}truncateId(o){return o.length<=30?o:o.substring(0,15)+"..."+o.substring(o.length-10)}static \u0275fac=function(r){return new(r||l)(f(K),f(se))};static \u0275cmp=v({type:l,selectors:[["app-identities"]],decls:22,vars:4,consts:[[1,"page-container"],[1,"page-header"],[1,"title-section"],[1,"neon-text"],[1,"actions-section"],["mat-raised-button","","color","primary",3,"click"],[1,"search-container"],["appearance","outline",1,"search-field"],["matInput","","placeholder","Search by name or DID",3,"ngModelChange","ngModel"],["matSuffix",""],[1,"empty-state"],[1,"identities-grid"],["mat-button","","color","primary",3,"click"],[1,"identity-card","neon-card"],["mat-card-avatar","",1,"identity-avatar"],[1,"identity-description"],[1,"identity-meta"],[1,"private-key-indicator"],["mat-button","","color","primary",3,"routerLink"],["mat-button","","color","warn",3,"click"]],template:function(r,n){r&1&&(t(0,"div",0)(1,"div",1)(2,"div",2)(3,"h1",3),i(4,"Identities"),e(),t(5,"p"),i(6,"Manage your decentralized identifiers (DIDs)"),e()(),t(7,"div",4)(8,"button",5),s("click",function(){return n.openImportDialog()}),t(9,"mat-icon"),i(10,"add"),e(),i(11," Import Identity "),e()()(),t(12,"div",6)(13,"mat-form-field",7)(14,"mat-label"),i(15,"Search"),e(),t(16,"input",8),y("ngModelChange",function(a){return g(n.searchTerm,a)||(n.searchTerm=a),a}),e(),t(17,"mat-icon",9),i(18,"search"),e()()(),h(19,Ne,9,0,"div",10)(20,We,9,0,"div",10)(21,Re,3,0,"div",11),e()),r&2&&(m(16),c("ngModel",n.searchTerm),m(3),C(n.identities.length===0?19:-1),m(),C(n.filteredIdentities.length===0&&n.searchTerm?20:-1),m(),C(n.filteredIdentities.length>0?21:-1))},dependencies:[D,$,ee,de,te,re,le,ne,ae,oe,ie,w,E,P,k,T,O,V,J,R,L,B,j,F,N,W],styles:[".page-header[_ngcontent-%COMP%]{display:flex;flex-direction:row;justify-content:space-between;align-items:center;margin-bottom:30px}.title-section[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin-bottom:5px}.title-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:var(--text-secondary);margin:0}.search-container[_ngcontent-%COMP%]{margin-bottom:20px}.search-field[_ngcontent-%COMP%]{width:100%}.identities-grid[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px}.identity-card[_ngcontent-%COMP%]{margin-bottom:20px}.identity-avatar[_ngcontent-%COMP%]{background-color:#00c3ff33;display:flex;align-items:center;justify-content:center}.identity-avatar[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--primary-color)}.identity-description[_ngcontent-%COMP%]{color:var(--text-secondary);margin-bottom:15px;min-height:40px}.identity-meta[_ngcontent-%COMP%]{font-size:.9rem;margin:5px 0;color:var(--text-secondary)}.private-key-indicator[_ngcontent-%COMP%]{display:flex;align-items:center;color:var(--success-color);margin-top:10px}.private-key-indicator[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{margin-right:5px;font-size:1rem;height:1rem;width:1rem}.empty-state[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:60px 0;text-align:center}.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:5rem;height:5rem;width:5rem;margin-bottom:20px;color:var(--text-secondary)}.empty-state[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{margin-bottom:10px}.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:20px;color:var(--text-secondary)}@media (max-width: 768px){.page-header[_ngcontent-%COMP%]{flex-direction:column;align-items:flex-start}.actions-section[_ngcontent-%COMP%]{margin-top:15px;width:100%}.identities-grid[_ngcontent-%COMP%]{grid-template-columns:1fr}}"]})};export{Ce as IdentitiesComponent};
