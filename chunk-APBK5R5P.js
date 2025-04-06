import{a as et,b as it,c as nt}from"./chunk-66MR4OIR.js";import{a as yt}from"./chunk-X2FLUBUD.js";import{a as vt,b as ut}from"./chunk-SWAWC44T.js";import{a as tt}from"./chunk-LSVRQGKC.js";import{b as ct,g as lt,h as st,j as mt,k as pt,l as _t,m as gt}from"./chunk-QKM7KKRN.js";import{B as at,D as dt,u as ot,z as rt}from"./chunk-2N6EGSYQ.js";import{K as Z,a as L,b as z,c as A,d as K,e as W,f as $,g as U,h as H}from"./chunk-GO5H5FWT.js";import{a as N,c as B,d as R}from"./chunk-7BHHVVNY.js";import{$a as p,Gd as J,Hb as o,Hd as q,Ib as m,Id as G,Jb as y,Ka as M,Kb as E,Kd as Q,Lb as b,Ma as a,Mb as O,Md as X,Nb as S,Nd as Y,Qa as x,Qb as w,Rb as k,Tb as h,Vb as C,Xa as P,gb as d,nc as D,oc as T,pa as _,pc as j,qa as g,qb as n,rb as i,sb as I,sc as V,ub as f,uc as F,wb as v,xb as c}from"./chunk-ONE5RFGK.js";var ft=(e,r)=>({issued:e,received:r}),ht=e=>["/credential",e];function Ct(e,r){if(e&1&&I(0,"img",40),e&2){let t=c(2);d("src",t.identity.picture,M)}}function Mt(e,r){if(e&1&&(n(0,"mat-icon",41),o(1),i()),e&2){let t=c(2);d("ngClass","method-"+t.identity.method),a(),y(" ",t.identity.method==="key"?"vpn_key":t.identity.method==="web"?"language":t.identity.method==="stellar"?"star":"person"," ")}}function It(e,r){if(e&1&&(n(0,"h1"),o(1),i()),e&2){let t=c(2);a(),m(t.identity.name)}}function bt(e,r){if(e&1){let t=f();n(0,"mat-form-field",42)(1,"mat-label"),o(2,"Name"),i(),n(3,"input",43),S("ngModelChange",function(s){_(t);let u=c(2);return O(u.editedName,s)||(u.editedName=s),g(s)}),i()()}if(e&2){let t=c(2);a(3),b("ngModel",t.editedName)}}function Ot(e,r){if(e&1&&(n(0,"p",44),o(1),i()),e&2){let t=c(2);a(),y(" ",t.identity.description||"No description provided"," ")}}function St(e,r){if(e&1){let t=f();n(0,"mat-form-field",45)(1,"mat-label"),o(2,"Description"),i(),n(3,"textarea",46),S("ngModelChange",function(s){_(t);let u=c(2);return O(u.editedDescription,s)||(u.editedDescription=s),g(s)}),i()()}if(e&2){let t=c(2);a(3),b("ngModel",t.editedDescription)}}function Pt(e,r){e&1&&(n(0,"div",23)(1,"h3"),o(2,"Private Key"),i(),n(3,"div",47)(4,"div",48)(5,"mat-icon",49),o(6,"vpn_key"),i(),o(7," [Private key available for signing] "),i()()())}function Et(e,r){if(e&1&&(n(0,"span",52)(1,"a",53),o(2),i()()),e&2){let t=r.$implicit;a(),d("href",t.serviceEndpoint,M),a(),m(t.serviceEndpoint)}}function wt(e,r){if(e&1&&(n(0,"div",23)(1,"h3"),o(2,"Domains"),i(),n(3,"div",50),p(4,Et,3,2,"span",51),i()()),e&2){let t=c(2);a(4),d("ngForOf",t.getLinkedDomains())}}function kt(e,r){if(e&1&&(n(0,"span",60),o(1),i()),e&2){let t=c().$implicit;a(),m(t.serviceEndpoint)}}function Dt(e,r){if(e&1&&(n(0,"div",61)(1,"span",62),o(2),i(),n(3,"span",63),o(4),i()()),e&2){let t=r.$implicit,l=c().$implicit;a(2),y("",t,":"),a(2),m(l[t])}}function Tt(e,r){if(e&1&&(n(0,"div",56)(1,"span",57),o(2),i(),p(3,kt,2,1,"span",58)(4,Dt,5,2,"div",59),i()),e&2){let t=r.$implicit,l=c(3);a(2),y("",t.type,":"),a(),d("ngIf",t.serviceEndpoint),a(),d("ngForOf",l.getOtherServiceProperties(t))}}function jt(e,r){if(e&1&&(n(0,"div",23)(1,"h3"),o(2,"Services"),i(),n(3,"div",54),p(4,Tt,5,3,"div",55),i()()),e&2){let t=c(2);a(4),d("ngForOf",t.getOtherServices())}}function Vt(e,r){if(e&1){let t=f();n(0,"div",64)(1,"button",65),v("click",function(){_(t);let s=c(2);return g(s.saveChanges())}),n(2,"mat-icon"),o(3,"save"),i(),o(4," Save Changes "),i()()}}function Ft(e,r){e&1&&(n(0,"div",66)(1,"mat-icon"),o(2,"verified_user"),i(),n(3,"p"),o(4,"No credentials associated with this identity."),i(),n(5,"button",67),o(6," Issue New Credential "),i()())}function Nt(e,r){if(e&1&&(n(0,"p"),o(1),i()),e&2){let t=c().$implicit;a(),m(t.description)}}function Bt(e,r){if(e&1&&(n(0,"mat-card",70)(1,"mat-card-header")(2,"div",71)(3,"mat-icon"),o(4),i()(),n(5,"mat-card-title"),o(6),i(),n(7,"mat-card-subtitle"),o(8),i()(),n(9,"mat-card-content"),p(10,Nt,2,1,"p",14),n(11,"p",72),o(12),h(13,"date"),i()(),n(14,"mat-card-actions")(15,"a",73),o(16,"VIEW"),i()()()),e&2){let t=r.$implicit,l=c(3);a(2),d("ngClass",k(11,ft,l.getRelationshipType(t)==="Issued",l.getRelationshipType(t)==="Received")),a(2),m(l.getRelationshipType(t)==="Issued"?"send":"download"),a(2),m(t.name),a(2),E(" ",l.getRelationshipType(t)," \xB7 ",t.type," "),a(2),d("ngIf",t.description),a(2),y(" ",C(13,8,t.issuanceDate,"medium")," "),a(3),d("routerLink",w(14,ht,t.id))}}function Rt(e,r){if(e&1&&(n(0,"div",68),p(1,Bt,17,16,"mat-card",69),i()),e&2){let t=c(2);a(),d("ngForOf",t.relatedCredentials)}}function Lt(e,r){if(e&1){let t=f();n(0,"div",2)(1,"div",3)(2,"a",4)(3,"mat-icon"),o(4,"arrow_back"),i(),o(5," Back to Identities "),i(),n(6,"div",5)(7,"button",6),v("click",function(){_(t);let s=c();return g(s.toggleEditMode())}),n(8,"mat-icon"),o(9),i(),o(10),i(),n(11,"button",7),v("click",function(){_(t);let s=c();return g(s.deleteIdentity())}),n(12,"mat-icon"),o(13,"delete"),i(),o(14," Delete "),i()()(),n(15,"div",8)(16,"div",9)(17,"div",10),p(18,Ct,1,1,"img",11)(19,Mt,2,2,"mat-icon",12),i(),n(20,"div",13),p(21,It,2,1,"h1",14)(22,bt,4,1,"mat-form-field",15),n(23,"div",16),v("click",function(){_(t);let s=c();return g(s.copyToClipboard(s.identity.id))}),o(24),n(25,"mat-icon",17),o(26,"content_copy"),i()()()(),I(27,"mat-divider",18),n(28,"div",19)(29,"mat-tab-group",20)(30,"mat-tab",21)(31,"div",22)(32,"div",23)(33,"h3"),o(34,"Description"),i(),p(35,Ot,2,1,"p",24)(36,St,4,1,"mat-form-field",25),i(),n(37,"div",23)(38,"h3"),o(39,"Method"),i(),n(40,"p",26)(41,"span",27),o(42),i()()(),n(43,"div",23)(44,"h3"),o(45,"Public Key"),i(),n(46,"div",28)(47,"div",29),o(48),i(),n(49,"button",30),v("click",function(){_(t);let s=c();return g(s.copyToClipboard(s.identity.publicKey))}),n(50,"mat-icon"),o(51,"content_copy"),i()()()(),p(52,Pt,8,0,"div",31)(53,wt,5,1,"div",31)(54,jt,5,1,"div",31),n(55,"div",23)(56,"h3"),o(57,"Created"),i(),n(58,"p"),o(59),h(60,"date"),i()(),n(61,"div",23)(62,"h3"),o(63,"Last Updated"),i(),n(64,"p"),o(65),h(66,"date"),i()(),p(67,Vt,5,0,"div",32),i()(),n(68,"mat-tab",33)(69,"div",22)(70,"div",34)(71,"div",35)(72,"h3"),o(73,"DID Document"),i(),n(74,"button",30),v("click",function(){_(t);let s=c();return g(s.copyToClipboard(s.jsonView))}),n(75,"mat-icon"),o(76,"content_copy"),i()()(),n(77,"pre",36),o(78),i()()()(),n(79,"mat-tab",37)(80,"div",22)(81,"h3"),o(82,"Related Credentials"),i(),p(83,Ft,7,0,"div",38)(84,Rt,2,1,"div",39),i()()()()()()}if(e&2){let t=c();a(9),m(t.isEditMode?"close":"edit"),a(),y(" ",t.isEditMode?"Cancel":"Edit"," "),a(8),d("ngIf",t.identity.picture),a(),d("ngIf",!t.identity.picture),a(2),d("ngIf",!t.isEditMode),a(),d("ngIf",t.isEditMode),a(2),y(" ",t.identity.id," "),a(11),d("ngIf",!t.isEditMode),a(),d("ngIf",t.isEditMode),a(6),m(t.identity.method),a(6),m(t.identity.publicKey),a(4),d("ngIf",t.identity.privateKey),a(),d("ngIf",(t.identity.didDocument==null?null:t.identity.didDocument.service)&&t.getLinkedDomains().length>0),a(),d("ngIf",(t.identity.didDocument==null?null:t.identity.didDocument.service)&&t.getOtherServices().length>0),a(5),m(C(60,20,t.identity.created,"medium")),a(6),m(C(66,23,t.identity.updated,"medium")),a(2),d("ngIf",t.isEditMode),a(11),m(t.jsonView),a(5),d("ngIf",t.relatedCredentials.length===0),a(),d("ngIf",t.relatedCredentials.length>0)}}function zt(e,r){e&1&&(n(0,"div",74)(1,"mat-icon"),o(2,"error_outline"),i(),n(3,"h2"),o(4,"Identity Not Found"),i(),n(5,"p"),o(6,"The requested identity could not be found."),i(),n(7,"button",75),o(8," Back to Identities "),i()())}var xt=class e{constructor(r,t,l,s,u){this.route=r;this.router=t;this.identityService=l;this.credentialService=s;this.snackBar=u}identity;isEditMode=!1;editedName="";editedDescription="";relatedCredentials=[];jsonView="";ngOnInit(){this.route.params.subscribe(r=>{let t=r.id;this.loadIdentity(t)})}loadIdentity(r){if(this.identity=this.identityService.getIdentityById(r),!this.identity){this.showError("Identity not found"),this.router.navigate(["/identities"]);return}if(this.editedName=this.identity.name||"",this.editedDescription=this.identity.description||"",this.identity.didDocument)this.jsonView=JSON.stringify(this.identity.didDocument,null,2);else{let t={id:this.identity.id,method:this.identity.method,created:this.identity.created,publicKey:this.identity.publicKey};this.jsonView=JSON.stringify(t,null,2)}this.credentialService.getAllCredentials().subscribe(t=>{this.relatedCredentials=t.filter(l=>l.issuer===this.identity?.id||l.subject===this.identity?.id)})}toggleEditMode(){this.isEditMode=!this.isEditMode,!this.isEditMode&&this.identity&&(this.editedName=this.identity.name||"",this.editedDescription=this.identity.description||"")}saveChanges(){if(this.identity)try{this.identityService.updateIdentity(this.identity.id,{name:this.editedName,description:this.editedDescription}),this.isEditMode=!1,this.identity=this.identityService.getIdentityById(this.identity.id),this.showSuccess("Identity information updated")}catch{this.showError("Failed to update identity")}}deleteIdentity(){this.identity&&confirm(`Are you sure you want to delete the identity "${this.identity.name}"?`)&&(this.identityService.deleteIdentity(this.identity.id),this.router.navigate(["/identities"]),this.showSuccess("Identity deleted"))}copyToClipboard(r){navigator.clipboard.writeText(r).then(()=>this.showSuccess("Copied to clipboard"),()=>this.showError("Failed to copy"))}getRelationshipType(r){return this.identity?r.issuer===this.identity.id?"Issued":r.subject===this.identity.id?"Received":"Related":""}getLinkedDomains(){return this.identity?.didDocument?.service?this.identity.didDocument.service.filter(r=>r.type==="LinkedDomains"):[]}getOtherServices(){return this.identity?.didDocument?.service?this.identity.didDocument.service.filter(r=>r.type!=="LinkedDomains"):[]}getServiceProperties(r){return Object.keys(r).filter(t=>t!=="id"&&t!=="type")}getOtherServiceProperties(r){return Object.keys(r).filter(t=>t!=="id"&&t!=="type"&&t!=="serviceEndpoint")}showSuccess(r){this.snackBar.open(r,"Close",{duration:3e3,panelClass:"success-snackbar"})}showError(r){this.snackBar.open(r,"Close",{duration:5e3,panelClass:"error-snackbar"})}static \u0275fac=function(t){return new(t||e)(x(N),x(B),x(Z),x(tt),x(_t))};static \u0275cmp=P({type:e,selectors:[["app-identity-detail"]],decls:2,vars:2,consts:[["class","page-container",4,"ngIf"],["class","not-found",4,"ngIf"],[1,"page-container"],[1,"page-header"],["routerLink","/identities",1,"back-link"],[1,"header-actions"],["mat-button","",1,"edit-button",3,"click"],["mat-stroked-button","",1,"delete-button",3,"click"],[1,"identity-container"],[1,"identity-header"],[1,"identity-icon"],["alt","Profile picture","class","profile-picture",3,"src",4,"ngIf"],[3,"ngClass",4,"ngIf"],[1,"identity-title"],[4,"ngIf"],["appearance","outline",4,"ngIf"],[1,"identity-id",3,"click"],[1,"copy-icon"],[1,"divider"],[1,"identity-content"],["dynamicHeight","","animationDuration","300ms"],["label","Details"],[1,"tab-content"],[1,"detail-section"],["class","description",4,"ngIf"],["appearance","outline","class","full-width",4,"ngIf"],[1,"method-chip"],[1,"chip"],[1,"key-container"],[1,"key-text"],["mat-icon-button","",3,"click"],["class","detail-section",4,"ngIf"],["class","action-buttons",4,"ngIf"],["label","DID Document"],[1,"json-container","neon-card"],[1,"json-header"],[1,"json-content"],["label","Credentials"],["class","empty-state",4,"ngIf"],["class","credentials-list",4,"ngIf"],["alt","Profile picture",1,"profile-picture",3,"src"],[3,"ngClass"],["appearance","outline"],["matInput","",3,"ngModelChange","ngModel"],[1,"description"],["appearance","outline",1,"full-width"],["matInput","","rows","3",3,"ngModelChange","ngModel"],[1,"key-container","private"],[1,"key-text","masked"],[1,"key-icon"],[1,"domain-list"],["class","domain-chip",4,"ngFor","ngForOf"],[1,"domain-chip"],["target","_blank",3,"href"],[1,"service-list"],["class","service-entry",4,"ngFor","ngForOf"],[1,"service-entry"],[1,"service-type"],["class","service-value",4,"ngIf"],["class","service-property",4,"ngFor","ngForOf"],[1,"service-value"],[1,"service-property"],[1,"property-name"],[1,"property-value"],[1,"action-buttons"],["mat-flat-button","","color","primary",3,"click"],[1,"empty-state"],["mat-flat-button","","color","primary","routerLink","/issue"],[1,"credentials-list"],["class","credential-card neon-card",4,"ngFor","ngForOf"],[1,"credential-card","neon-card"],["mat-card-avatar","",1,"credential-avatar",3,"ngClass"],[1,"credential-date"],["mat-button","","color","primary",3,"routerLink"],[1,"not-found"],["mat-raised-button","","color","primary","routerLink","/identities"]],template:function(t,l){t&1&&p(0,Lt,85,26,"div",0)(1,zt,9,0,"div",1),t&2&&(d("ngIf",l.identity),a(),d("ngIf",!l.identity))},dependencies:[F,D,T,j,V,dt,ot,rt,at,R,H,L,W,U,A,$,K,z,Q,q,J,G,Y,X,nt,et,it,st,lt,ct,pt,mt,gt,yt,ut,vt],styles:[".page-header[_ngcontent-%COMP%]{display:flex;flex-direction:row;align-items:center;margin-bottom:20px;width:100%}.header-actions[_ngcontent-%COMP%]{display:flex;gap:10px;justify-content:flex-end;margin-left:auto}.identity-container[_ngcontent-%COMP%]{background-color:var(--card-bg);border-radius:4px;box-shadow:0 2px 4px #00000024;overflow:hidden}.identity-header[_ngcontent-%COMP%]{display:flex;align-items:center;padding:20px}.identity-icon[_ngcontent-%COMP%]{display:flex;align-items:center;justify-content:center;width:60px;height:60px;border-radius:50%;margin-right:20px;background-color:#0078d41a}.identity-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:30px;height:30px;width:30px;color:var(--primary-color)}.profile-picture[_ngcontent-%COMP%]{width:100%;height:100%;border-radius:50%;object-fit:cover}.method-key[_ngcontent-%COMP%]{color:var(--primary-color)}.method-web[_ngcontent-%COMP%]{color:var(--success-color)}.method-stellar[_ngcontent-%COMP%]{color:var(--warning-color)}.identity-title[_ngcontent-%COMP%]{flex:1}.identity-title[_ngcontent-%COMP%]   h1[_ngcontent-%COMP%]{margin:0 0 5px}.identity-id[_ngcontent-%COMP%]{font-size:.9rem;color:var(--text-secondary);cursor:pointer;display:flex;align-items:center;max-width:fit-content;transition:all .2s ease}.identity-id[_ngcontent-%COMP%]:hover{color:var(--primary-color)}.copy-icon[_ngcontent-%COMP%]{font-size:16px;height:16px;width:16px;margin-left:5px;opacity:.5}.identity-id[_ngcontent-%COMP%]:hover   .copy-icon[_ngcontent-%COMP%]{opacity:1}.divider[_ngcontent-%COMP%]{margin:0;border-top-color:#0000001f}.identity-content[_ngcontent-%COMP%]{padding:0}.tab-content[_ngcontent-%COMP%]{padding:20px}.detail-section[_ngcontent-%COMP%]{margin-bottom:25px}.detail-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin-bottom:8px;color:var(--text-secondary);font-size:1rem;font-weight:500}.detail-section[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin:0}.description[_ngcontent-%COMP%]{color:var(--text-color);line-height:1.5}.method-chip[_ngcontent-%COMP%]{margin:0}.chip[_ngcontent-%COMP%]{padding:4px 10px;border-radius:16px;background-color:#0078d41a;font-size:.9rem}.key-container[_ngcontent-%COMP%]{display:flex;align-items:center;background-color:#0000000d;border-radius:4px;padding:10px;font-family:monospace;font-size:.9rem;word-break:break-all}.key-container.private[_ngcontent-%COMP%]{background-color:#0078d40d;border:1px dashed rgba(0,120,212,.3)}.key-text[_ngcontent-%COMP%]{flex:1}.key-text.masked[_ngcontent-%COMP%]{display:flex;align-items:center;color:var(--success-color)}.service-list[_ngcontent-%COMP%]{display:flex;flex-direction:column;gap:8px;margin-top:10px}.service-entry[_ngcontent-%COMP%]{display:flex;align-items:flex-start;line-height:1.5;flex-wrap:wrap}.service-type[_ngcontent-%COMP%]{font-weight:500;color:var(--primary-color);margin-right:6px}.service-value[_ngcontent-%COMP%]{word-break:break-all}.service-property[_ngcontent-%COMP%]{display:flex;align-items:flex-start;font-size:.9rem;margin-top:4px;margin-left:15px;width:100%}.property-name[_ngcontent-%COMP%]{font-weight:500;min-width:120px;color:var(--text-secondary)}.property-value[_ngcontent-%COMP%]{word-break:break-all}.key-icon[_ngcontent-%COMP%]{margin-right:8px;font-size:18px;height:18px;width:18px}.action-buttons[_ngcontent-%COMP%]{display:flex;justify-content:flex-end;margin-top:20px}.full-width[_ngcontent-%COMP%]{width:100%}.json-container[_ngcontent-%COMP%]{background-color:#0003;border-radius:4px;padding:0;overflow:hidden}.json-header[_ngcontent-%COMP%]{display:flex;justify-content:space-between;align-items:center;padding:10px 15px;background-color:#0000000d;border-bottom:1px solid rgba(0,0,0,.12)}.json-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]{margin:0}.json-content[_ngcontent-%COMP%]{padding:15px;margin:0;white-space:pre-wrap;font-family:monospace;font-size:.9rem;color:var(--text-color);overflow-x:auto}.empty-state[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:40px 0;text-align:center}.empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:4rem;height:4rem;width:4rem;margin-bottom:15px;color:var(--text-secondary)}.empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{margin-bottom:20px;color:var(--text-secondary)}.credentials-list[_ngcontent-%COMP%]{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:20px;margin-top:15px}.credential-card[_ngcontent-%COMP%]{margin-bottom:0}.credential-avatar[_ngcontent-%COMP%]{background-color:#00c3ff1a;display:flex;align-items:center;justify-content:center}.credential-avatar.issued[_ngcontent-%COMP%]{background-color:#00e6761a}.credential-avatar.received[_ngcontent-%COMP%]{background-color:#ffb3001a}.credential-avatar[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--primary-color)}.credential-avatar.issued[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--success-color)}.credential-avatar.received[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{color:var(--warning-color)}.credential-date[_ngcontent-%COMP%]{font-size:.8rem;color:var(--text-secondary);margin-top:10px}.not-found[_ngcontent-%COMP%]{display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center;padding:100px 0}.not-found[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%]{font-size:5rem;height:5rem;width:5rem;margin-bottom:20px;color:var(--error-color)}.edit-button[_ngcontent-%COMP%]{color:var(--mat-sys-primary)}@media (max-width: 768px){.header-actions[_ngcontent-%COMP%]{margin-top:15px}.identity-header[_ngcontent-%COMP%]{flex-direction:column;text-align:center}.identity-icon[_ngcontent-%COMP%]{margin-right:0;margin-bottom:15px}.identity-id[_ngcontent-%COMP%]{justify-content:center;margin:0 auto}.credentials-list[_ngcontent-%COMP%]{grid-template-columns:1fr}}"]})};export{xt as IdentityDetailComponent};
