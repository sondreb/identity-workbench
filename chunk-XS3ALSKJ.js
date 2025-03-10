import{Cd as Xe,a as T,b as V,ba as qe,d as G,e as ze,f as E,ga as Ze,m as Ne}from"./chunk-AE43V2TS.js";var We=G(R=>{"use strict";var ue=function(t,e){return e||(e={}),t.split("").forEach(function(n,r){n in e||(e[n]=r)}),e},J={alphabet:"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",charmap:{0:14,1:8}};J.charmap=ue(J.alphabet,J.charmap);var le={alphabet:"0123456789ABCDEFGHJKMNPQRSTVWXYZ",charmap:{O:0,I:1,L:1}};le.charmap=ue(le.alphabet,le.charmap);var he={alphabet:"0123456789ABCDEFGHIJKLMNOPQRSTUV",charmap:{}};he.charmap=ue(he.alphabet,he.charmap);function Q(t){if(this.buf=[],this.shift=8,this.carry=0,t){switch(t.type){case"rfc4648":this.charmap=R.rfc4648.charmap;break;case"crockford":this.charmap=R.crockford.charmap;break;case"base32hex":this.charmap=R.base32hex.charmap;break;default:throw new Error("invalid type")}t.charmap&&(this.charmap=t.charmap)}}Q.prototype.charmap=J.charmap;Q.prototype.write=function(t){var e=this.charmap,n=this.buf,r=this.shift,o=this.carry;return t.toUpperCase().split("").forEach(function(s){if(s!="="){var i=e[s]&255;r-=5,r>0?o|=i<<r:r<0?(n.push(o|i>>-r),r+=8,o=i<<r&255):(n.push(o|i),r=8,o=0)}}),this.shift=r,this.carry=o,this};Q.prototype.finalize=function(t){return t&&this.write(t),this.shift!==8&&this.carry!==0&&(this.buf.push(this.carry),this.shift=8,this.carry=0),this.buf};function ee(t){if(this.buf="",this.shift=3,this.carry=0,t){switch(t.type){case"rfc4648":this.alphabet=R.rfc4648.alphabet;break;case"crockford":this.alphabet=R.crockford.alphabet;break;case"base32hex":this.alphabet=R.base32hex.alphabet;break;default:throw new Error("invalid type")}t.alphabet?this.alphabet=t.alphabet:t.lc&&(this.alphabet=this.alphabet.toLowerCase())}}ee.prototype.alphabet=J.alphabet;ee.prototype.write=function(t){var e=this.shift,n=this.carry,r,o,s;for(s=0;s<t.length;s++)o=t[s],r=n|o>>e,this.buf+=this.alphabet[r&31],e>5&&(e-=5,r=o>>e,this.buf+=this.alphabet[r&31]),e=5-e,n=o<<e,e=8-e;return this.shift=e,this.carry=n,this};ee.prototype.finalize=function(t){return t&&this.write(t),this.shift!==3&&(this.buf+=this.alphabet[this.carry&31],this.shift=3,this.carry=0),this.buf};R.encode=function(t,e){return new ee(e).finalize(t)};R.decode=function(t,e){return new Q(e).finalize(t)};R.Decoder=Q;R.Encoder=ee;R.charmap=ue;R.crockford=le;R.rfc4648=J;R.base32hex=he});var et=G((Sr,Qe)=>{"use strict";function _t(t){if(t.length>=255)throw new TypeError("Alphabet too long");for(var e=new Uint8Array(256),n=0;n<e.length;n++)e[n]=255;for(var r=0;r<t.length;r++){var o=t.charAt(r),s=o.charCodeAt(0);if(e[s]!==255)throw new TypeError(o+" is ambiguous");e[s]=r}var i=t.length,c=t.charAt(0),a=Math.log(i)/Math.log(256),l=Math.log(256)/Math.log(i);function u(h){if(h instanceof Uint8Array||(ArrayBuffer.isView(h)?h=new Uint8Array(h.buffer,h.byteOffset,h.byteLength):Array.isArray(h)&&(h=Uint8Array.from(h))),!(h instanceof Uint8Array))throw new TypeError("Expected Uint8Array");if(h.length===0)return"";for(var y=0,g=0,m=0,w=h.length;m!==w&&h[m]===0;)m++,y++;for(var S=(w-m)*l+1>>>0,b=new Uint8Array(S);m!==w;){for(var v=h[m],A=0,B=S-1;(v!==0||A<g)&&B!==-1;B--,A++)v+=256*b[B]>>>0,b[B]=v%i>>>0,v=v/i>>>0;if(v!==0)throw new Error("Non-zero carry");g=A,m++}for(var P=S-g;P!==S&&b[P]===0;)P++;for(var L=c.repeat(y);P<S;++P)L+=t.charAt(b[P]);return L}function d(h){if(typeof h!="string")throw new TypeError("Expected String");if(h.length===0)return new Uint8Array;var y=0;if(h[y]!==" "){for(var g=0,m=0;h[y]===c;)g++,y++;for(var w=(h.length-y)*a+1>>>0,S=new Uint8Array(w);h[y];){var b=e[h.charCodeAt(y)];if(b===255)return;for(var v=0,A=w-1;(b!==0||v<m)&&A!==-1;A--,v++)b+=i*S[A]>>>0,S[A]=b%256>>>0,b=b/256>>>0;if(b!==0)throw new Error("Non-zero carry");m=v,y++}if(h[y]!==" "){for(var B=w-m;B!==w&&S[B]===0;)B++;for(var P=new Uint8Array(g+(w-B)),L=g;B!==w;)P[L++]=S[B++];return P}}}function p(h){var y=d(h);if(y)return y;throw new Error("Non-base"+i+" character")}return{encode:u,decodeUnsafe:d,decode:p}}Qe.exports=_t});var pe=G((Ar,tt)=>{"use strict";var Ot=new TextDecoder,Vt=t=>Ot.decode(t),Gt=new TextEncoder,zt=t=>Gt.encode(t);function Nt(t,e){let n=new Uint8Array(e),r=0;for(let o of t)n.set(o,r),r+=o.length;return n}tt.exports={decodeText:Vt,encodeText:zt,concat:Nt}});var rt=G((Er,nt)=>{"use strict";var{encodeText:qt}=pe(),Te=class{constructor(e,n,r,o){this.name=e,this.code=n,this.codeBuf=qt(this.code),this.alphabet=o,this.codec=r(o)}encode(e){return this.codec.encode(e)}decode(e){for(let n of e)if(this.alphabet&&this.alphabet.indexOf(n)<0)throw new Error(`invalid character '${n}' in '${e}'`);return this.codec.decode(e)}};nt.exports=Te});var st=G((Br,ot)=>{"use strict";var Zt=(t,e,n)=>{let r={};for(let l=0;l<e.length;++l)r[e[l]]=l;let o=t.length;for(;t[o-1]==="=";)--o;let s=new Uint8Array(o*n/8|0),i=0,c=0,a=0;for(let l=0;l<o;++l){let u=r[t[l]];if(u===void 0)throw new SyntaxError("Invalid character "+t[l]);c=c<<n|u,i+=n,i>=8&&(i-=8,s[a++]=255&c>>i)}if(i>=n||255&c<<8-i)throw new SyntaxError("Unexpected end of data");return s},Xt=(t,e,n)=>{let r=e[e.length-1]==="=",o=(1<<n)-1,s="",i=0,c=0;for(let a=0;a<t.length;++a)for(c=c<<8|t[a],i+=8;i>n;)i-=n,s+=e[o&c>>i];if(i&&(s+=e[o&c<<n-i]),r)for(;s.length*n&7;)s+="=";return s},Jt=t=>e=>({encode(n){return Xt(n,e,t)},decode(n){return Zt(n,e,t)}});ot.exports={rfc4648:Jt}});var dt=G((Ir,at)=>{"use strict";var ne=et(),Wt=rt(),{rfc4648:U}=st(),{decodeText:Yt,encodeText:Qt}=pe(),en=()=>({encode:Yt,decode:Qt}),it=[["identity","\0",en,""],["base2","0",U(1),"01"],["base8","7",U(3),"01234567"],["base10","9",ne,"0123456789"],["base16","f",U(4),"0123456789abcdef"],["base16upper","F",U(4),"0123456789ABCDEF"],["base32hex","v",U(5),"0123456789abcdefghijklmnopqrstuv"],["base32hexupper","V",U(5),"0123456789ABCDEFGHIJKLMNOPQRSTUV"],["base32hexpad","t",U(5),"0123456789abcdefghijklmnopqrstuv="],["base32hexpadupper","T",U(5),"0123456789ABCDEFGHIJKLMNOPQRSTUV="],["base32","b",U(5),"abcdefghijklmnopqrstuvwxyz234567"],["base32upper","B",U(5),"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"],["base32pad","c",U(5),"abcdefghijklmnopqrstuvwxyz234567="],["base32padupper","C",U(5),"ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="],["base32z","h",U(5),"ybndrfg8ejkmcpqxot1uwisza345h769"],["base36","k",ne,"0123456789abcdefghijklmnopqrstuvwxyz"],["base36upper","K",ne,"0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"],["base58btc","z",ne,"123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"],["base58flickr","Z",ne,"123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"],["base64","m",U(6),"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"],["base64pad","M",U(6),"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="],["base64url","u",U(6),"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"],["base64urlpad","U",U(6),"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]],ct=it.reduce((t,e)=>(t[e[0]]=new Wt(e[0],e[1],e[2],e[3]),t),{}),tn=it.reduce((t,e)=>(t[e[1]]=ct[e[0]],t),{});at.exports={names:ct,codes:tn}});var ht=G((M,lt)=>{"use strict";var W=dt(),{encodeText:nn,decodeText:ye,concat:ft}=pe();function rn(t,e){if(!e)throw new Error("requires an encoded Uint8Array");let{name:n,codeBuf:r}=q(t);return an(n,e),ft([r,e],r.length+e.length)}function on(t,e){let n=q(t),r=nn(n.encode(e));return ft([n.codeBuf,r],n.codeBuf.length+r.length)}function sn(t){t instanceof Uint8Array&&(t=ye(t));let e=t[0];return["f","F","v","V","t","T","b","B","c","C","h","k","K"].includes(e)&&(t=t.toLowerCase()),q(t[0]).decode(t.substring(1))}function cn(t){if(t instanceof Uint8Array&&(t=ye(t)),Object.prototype.toString.call(t)!=="[object String]")return!1;try{return q(t[0]).name}catch{return!1}}function an(t,e){q(t).decode(ye(e))}function q(t){if(Object.prototype.hasOwnProperty.call(W.names,t))return W.names[t];if(Object.prototype.hasOwnProperty.call(W.codes,t))return W.codes[t];throw new Error(`Unsupported encoding: ${t}`)}function dn(t){return t instanceof Uint8Array&&(t=ye(t)),q(t[0])}M=lt.exports=rn;M.encode=on;M.decode=sn;M.isEncoded=cn;M.encoding=q;M.encodingFromData=dn;var fn=Object.freeze(W.names),ln=Object.freeze(W.codes);M.names=fn;M.codes=ln});var Mt=typeof crypto<"u"&&crypto.randomUUID&&crypto.randomUUID.bind(crypto),Pe={randomUUID:Mt};var fe,Ct=new Uint8Array(16);function Re(){if(!fe&&(fe=typeof crypto<"u"&&crypto.getRandomValues&&crypto.getRandomValues.bind(crypto),!fe))throw new Error("crypto.getRandomValues() not supported. See https://github.com/uuidjs/uuid#getrandomvalues-not-supported");return fe(Ct)}var I=[];for(let t=0;t<256;++t)I.push((t+256).toString(16).slice(1));function Je(t,e=0){return I[t[e+0]]+I[t[e+1]]+I[t[e+2]]+I[t[e+3]]+"-"+I[t[e+4]]+I[t[e+5]]+"-"+I[t[e+6]]+I[t[e+7]]+"-"+I[t[e+8]]+I[t[e+9]]+"-"+I[t[e+10]]+I[t[e+11]]+I[t[e+12]]+I[t[e+13]]+I[t[e+14]]+I[t[e+15]]}function $t(t,e,n){if(Pe.randomUUID&&!e&&!t)return Pe.randomUUID();t=t||{};let r=t.random||(t.rng||Re)();if(r[6]=r[6]&15|64,r[8]=r[8]&63|128,e){n=n||0;for(let o=0;o<16;++o)e[n+o]=r[o];return e}return Je(r)}var Le=$t;var xe=ze(We(),1);function jt(t,e){if(t.length!==e.length)return!1;if(t.length===0)return!0;for(let n=0;n<t.length;n+=1)if(t[n]!==e[n])return!1;return!0}var be={ed25519PublicKey:48,ed25519SecretSeed:144,med25519PublicKey:96,preAuthTx:152,sha256Hash:184,signedPayload:120,contract:16},Ft={G:"ed25519PublicKey",S:"ed25519SecretSeed",M:"med25519PublicKey",T:"preAuthTx",X:"sha256Hash",P:"signedPayload",C:"contract"},N=class{static encodeEd25519PublicKey(e){return z("ed25519PublicKey",e)}static decodeEd25519PublicKey(e){return j("ed25519PublicKey",e)}static isValidEd25519PublicKey(e){return te("ed25519PublicKey",e)}static encodeEd25519SecretSeed(e){return z("ed25519SecretSeed",e)}static decodeEd25519SecretSeed(e){return j("ed25519SecretSeed",e)}static isValidEd25519SecretSeed(e){return te("ed25519SecretSeed",e)}static encodeMed25519PublicKey(e){return z("med25519PublicKey",e)}static decodeMed25519PublicKey(e){return j("med25519PublicKey",e)}static isValidMed25519PublicKey(e){return te("med25519PublicKey",e)}static encodePreAuthTx(e){return z("preAuthTx",e)}static decodePreAuthTx(e){return j("preAuthTx",e)}static encodeSha256Hash(e){return z("sha256Hash",e)}static decodeSha256Hash(e){return j("sha256Hash",e)}static encodeSignedPayload(e){return z("signedPayload",e)}static decodeSignedPayload(e){return j("signedPayload",e)}static isValidSignedPayload(e){return te("signedPayload",e)}static encodeContract(e){return z("contract",e)}static decodeContract(e){return j("contract",e)}static isValidContract(e){return te("contract",e)}static getVersionByteForPrefix(e){return Ft[e[0]]}};function te(t,e){if(typeof e!="string")return!1;switch(t){case"ed25519PublicKey":case"ed25519SecretSeed":case"preAuthTx":case"sha256Hash":case"contract":if(e.length!==56)return!1;break;case"med25519PublicKey":if(e.length!==69)return!1;break;case"signedPayload":if(e.length<56||e.length>165)return!1;break;default:return!1}let n="";try{n=j(t,e)}catch{return!1}switch(t){case"ed25519PublicKey":case"ed25519SecretSeed":case"preAuthTx":case"sha256Hash":case"contract":return n.length===32;case"med25519PublicKey":return n.length===40;case"signedPayload":return n.length>=40&&n.length<=100;default:return!1}}function j(t,e){if(typeof e!="string")throw new TypeError("encoded argument must be of type String");let n=xe.default.decode(e),r=n[0],o=n.slice(0,-2),s=o.slice(1),i=n.slice(-2);if(e!==xe.default.encode(n))throw new Error("invalid encoded string");let c=be[t];if(c===void 0)throw new Error(`${t} is not a valid version byte name. Expected one of ${Object.keys(be).join(", ")}`);if(r!==c)throw new Error(`invalid version byte. expected ${c}, got ${r}`);let a=Ye(o);if(!jt(a,i))throw new Error("invalid checksum");return new Uint8Array(s)}function z(t,e){if(e==null)throw new Error("cannot encode null data");let n=be[t];if(n===void 0)throw new Error(`${t} is not a valid version byte name. Expected one of ${Object.keys(be).join(", ")}`);e=new Uint8Array(e);let r=new Uint8Array([n]),o=new Uint8Array(r.length+e.length);o.set(r,0),o.set(e,r.length);let s=new Uint8Array(Ye(o)),i=new Uint8Array(o.length+s.length);return i.set(o,0),i.set(s,o.length),xe.default.encode(i)}function Ye(t){let e=[0,4129,8258,12387,16516,20645,24774,28903,33032,37161,41290,45419,49548,53677,57806,61935,4657,528,12915,8786,21173,17044,29431,25302,37689,33560,45947,41818,54205,50076,62463,58334,9314,13379,1056,5121,25830,29895,17572,21637,42346,46411,34088,38153,58862,62927,50604,54669,13907,9842,5649,1584,30423,26358,22165,18100,46939,42874,38681,34616,63455,59390,55197,51132,18628,22757,26758,30887,2112,6241,10242,14371,51660,55789,59790,63919,35144,39273,43274,47403,23285,19156,31415,27286,6769,2640,14899,10770,56317,52188,64447,60318,39801,35672,47931,43802,27814,31879,19684,23749,11298,15363,3168,7233,60846,64911,52716,56781,44330,48395,36200,40265,32407,28342,24277,20212,15891,11826,7761,3696,65439,61374,57309,53244,48923,44858,40793,36728,37256,33193,45514,41451,53516,49453,61774,57711,4224,161,12482,8419,20484,16421,28742,24679,33721,37784,41979,46042,49981,54044,58239,62302,689,4752,8947,13010,16949,21012,25207,29270,46570,42443,38312,34185,62830,58703,54572,50445,13538,9411,5280,1153,29798,25671,21540,17413,42971,47098,34713,38840,59231,63358,50973,55100,9939,14066,1681,5808,26199,30326,17941,22068,55628,51565,63758,59695,39368,35305,47498,43435,22596,18533,30726,26663,6336,2273,14466,10403,52093,56156,60223,64286,35833,39896,43963,48026,19061,23124,27191,31254,2801,6864,10931,14994,64814,60687,56684,52557,48554,44427,40424,36297,31782,27655,23652,19525,15522,11395,7392,3265,61215,65342,53085,57212,44955,49082,36825,40952,28183,32310,20053,24180,11923,16050,3793,7920],n=0;for(let o=0;o<t.length;o+=1){let s=t[o],i=n>>8^s;n=n<<8^e[i],n&=65535}let r=new Uint8Array(2);return r[0]=n&255,r[1]=n>>8&255,r}var Kt=ze(ht(),1);var D=2n**255n-19n,oe=2n**252n+27742317777372353535851937790883648493n,He=0x216936d3cd6e53fec0a4e231fdd6dc5c692cc7609525a7b2c9562d608f25d51an,ke=0x6666666666666666666666666666666666666666666666666666666666666658n,hn=37095705934669439343138083508754565189542113879843219016388785533085940283555n,me={a:-1n,d:hn,p:D,n:oe,h:8,Gx:He,Gy:ke},K=(t="")=>{throw new Error(t)},gt=t=>typeof t=="string",un=t=>t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array",ie=(t,e)=>!un(t)||typeof e=="number"&&e>0&&t.length!==e?K("Uint8Array of valid length expected"):t,Y=t=>new Uint8Array(t),wt=(t,e)=>ie(gt(t)?Ce(t):Y(ie(t)),e),f=(t,e=D)=>{let n=t%e;return n>=0n?n:e+n},ut=t=>t instanceof F?t:K("Point expected"),F=class t{constructor(e,n,r,o){this.ex=e,this.ey=n,this.ez=r,this.et=o}static fromAffine(e){return new t(e.x,e.y,1n,f(e.x*e.y))}static fromHex(e,n=!1){let{d:r}=me;e=wt(e,32);let o=e.slice(),s=e[31];o[31]=s&-129;let i=St(o);n&&!(0n<=i&&i<2n**256n)&&K("bad y coord 1"),!n&&!(0n<=i&&i<D)&&K("bad y coord 2");let c=f(i*i),a=f(c-1n),l=f(r*c+1n),{isValid:u,value:d}=pn(a,l);u||K("bad y coordinate 3");let p=(d&1n)===1n,h=(s&128)!==0;return!n&&d===0n&&h&&K("bad y coord 3"),h!==p&&(d=f(-d)),new t(d,i,1n,f(d*i))}get x(){return this.toAffine().x}get y(){return this.toAffine().y}equals(e){let{ex:n,ey:r,ez:o}=this,{ex:s,ey:i,ez:c}=ut(e),a=f(n*c),l=f(s*o),u=f(r*c),d=f(i*o);return a===l&&u===d}is0(){return this.equals(re)}negate(){return new t(f(-this.ex),this.ey,this.ez,f(-this.et))}double(){let{ex:e,ey:n,ez:r}=this,{a:o}=me,s=f(e*e),i=f(n*n),c=f(2n*f(r*r)),a=f(o*s),l=e+n,u=f(f(l*l)-s-i),d=a+i,p=d-c,h=a-i,y=f(u*p),g=f(d*h),m=f(u*h),w=f(p*d);return new t(y,g,w,m)}add(e){let{ex:n,ey:r,ez:o,et:s}=this,{ex:i,ey:c,ez:a,et:l}=ut(e),{a:u,d}=me,p=f(n*i),h=f(r*c),y=f(s*d*l),g=f(o*a),m=f((n+r)*(i+c)-p-h),w=f(g-y),S=f(g+y),b=f(h-u*p),v=f(m*w),A=f(S*b),B=f(m*b),P=f(w*S);return new t(v,A,P,B)}mul(e,n=!0){if(e===0n)return n===!0?K("cannot multiply by 0"):re;if(typeof e=="bigint"&&0n<e&&e<oe||K("invalid scalar, must be < L"),!n&&this.is0()||e===1n)return this;if(this.equals(ce))return Sn(e).p;let r=re,o=ce;for(let s=this;e>0n;s=s.double(),e>>=1n)e&1n?r=r.add(s):n&&(o=o.add(s));return r}multiply(e){return this.mul(e)}clearCofactor(){return this.mul(BigInt(me.h),!1)}isSmallOrder(){return this.clearCofactor().is0()}isTorsionFree(){let e=this.mul(oe/2n,!1).double();return oe%2n&&(e=e.add(this)),e.is0()}toAffine(){let{ex:e,ey:n,ez:r}=this;if(this.equals(re))return{x:0n,y:1n};let o=At(r,D);return f(r*o)!==1n&&K("invalid inverse"),{x:f(e*o),y:f(n*o)}}toRawBytes(){let{x:e,y:n}=this.toAffine(),r=xn(n);return r[31]|=e&1n?128:0,r}toHex(){return Me(this.toRawBytes())}};F.BASE=new F(He,ke,1n,f(He*ke));F.ZERO=new F(0n,1n,1n,0n);var{BASE:ce,ZERO:re}=F,vt=(t,e)=>t.toString(16).padStart(e,"0"),Me=t=>Array.from(ie(t)).map(e=>vt(e,2)).join(""),C={_0:48,_9:57,A:65,F:70,a:97,f:102},xt=t=>{if(t>=C._0&&t<=C._9)return t-C._0;if(t>=C.A&&t<=C.F)return t-(C.A-10);if(t>=C.a&&t<=C.f)return t-(C.a-10)},Ce=t=>{let e="hex invalid";if(!gt(t))return K(e);let n=t.length,r=n/2;if(n%2)return K(e);let o=Y(r);for(let s=0,i=0;s<r;s++,i+=2){let c=xt(t.charCodeAt(i)),a=xt(t.charCodeAt(i+1));if(c===void 0||a===void 0)return K(e);o[s]=c*16+a}return o},xn=t=>Ce(vt(t,32*2)).reverse(),St=t=>BigInt("0x"+Me(Y(ie(t)).reverse())),bt=(...t)=>{let e=Y(t.reduce((r,o)=>r+ie(o).length,0)),n=0;return t.forEach(r=>{e.set(r,n),n+=r.length}),e},At=(t,e)=>{(t===0n||e<=0n)&&K("no inverse n="+t+" mod="+e);let n=f(t,e),r=e,o=0n,s=1n,i=1n,c=0n;for(;n!==0n;){let a=r/n,l=r%n,u=o-i*a,d=s-c*a;r=n,n=l,o=i,s=c,i=u,c=d}return r===1n?f(o,e):K("no inverse")},H=(t,e)=>{let n=t;for(;e-- >0n;)n*=n,n%=D;return n},bn=t=>{let n=t*t%D*t%D,r=H(n,2n)*n%D,o=H(r,1n)*t%D,s=H(o,5n)*o%D,i=H(s,10n)*s%D,c=H(i,20n)*i%D,a=H(c,40n)*c%D,l=H(a,80n)*a%D,u=H(l,80n)*a%D,d=H(u,10n)*s%D;return{pow_p_5_8:H(d,2n)*t%D,b2:n}},pt=19681161376707505956807079304988542015446066515923890162744021073123829784752n,pn=(t,e)=>{let n=f(e*e*e),r=f(n*n*e),o=bn(t*r).pow_p_5_8,s=f(t*n*o),i=f(e*s*s),c=s,a=f(s*pt),l=i===t,u=i===f(-t),d=i===f(-t*pt);return l&&(s=c),(u||d)&&(s=a),(f(s)&1n)===1n&&(s=f(-s)),{isValid:l||u,value:s}},yn=t=>f(St(t),oe),se;var mn=(...t)=>typeof se=="function"?se(...t):K("etc.sha512Sync not set"),gn=t=>{let e=t.slice(0,32);e[0]&=248,e[31]&=127,e[31]|=64;let n=t.slice(32,64),r=yn(e),o=ce.mul(r),s=o.toRawBytes();return{head:e,prefix:n,scalar:r,point:o,pointBytes:s}};var wn=t=>gn(mn(wt(t,32)));var Et=t=>wn(t).pointBytes;var yt=()=>typeof globalThis=="object"&&"crypto"in globalThis?globalThis.crypto:void 0,ge={bytesToHex:Me,hexToBytes:Ce,concatBytes:bt,mod:f,invert:At,randomBytes:(t=32)=>{let e=yt();return(!e||!e.getRandomValues)&&K("crypto.getRandomValues must be defined"),e.getRandomValues(Y(t))},sha512Async:(...t)=>E(void 0,null,function*(){let e=yt(),n=e&&e.subtle;n||K("etc.sha512Async or crypto.subtle must be defined");let r=bt(...t);return Y(yield n.digest("SHA-512",r.buffer))}),sha512Sync:void 0};Object.defineProperties(ge,{sha512Sync:{configurable:!1,get(){return se},set(t){se||(se=t)}}});var Z=8,vn=()=>{let t=[],e=256/Z+1,n=ce,r=n;for(let o=0;o<e;o++){r=n,t.push(r);for(let s=1;s<2**(Z-1);s++)r=r.add(n),t.push(r);n=r.double()}return t},mt,Sn=t=>{let e=mt||(mt=vn()),n=(u,d)=>{let p=d.negate();return u?p:d},r=re,o=ce,s=1+256/Z,i=2**(Z-1),c=BigInt(2**Z-1),a=2**Z,l=BigInt(Z);for(let u=0;u<s;u++){let d=u*i,p=Number(t&c);t>>=l,p>i&&(p-=a,t+=1n);let h=d,y=d+Math.abs(p)-1,g=u%2!==0,m=p<0;p===0?o=o.add(n(g,e[h])):r=r.add(n(m,e[y]))}return{p:r,f:o}};function En(t){return t instanceof Uint8Array||ArrayBuffer.isView(t)&&t.constructor.name==="Uint8Array"}function $e(t,...e){if(!En(t))throw new Error("Uint8Array expected");if(e.length>0&&!e.includes(t.length))throw new Error("Uint8Array expected of length "+e+", got length="+t.length)}function je(t,e=!0){if(t.destroyed)throw new Error("Hash instance has been destroyed");if(e&&t.finished)throw new Error("Hash#digest() has already been called")}function Bt(t,e){$e(t);let n=e.outputLen;if(t.length<n)throw new Error("digestInto() expects output buffer of length at least "+n)}function ve(t){return new DataView(t.buffer,t.byteOffset,t.byteLength)}function Bn(t){if(typeof t!="string")throw new Error("utf8ToBytes expected string, got "+typeof t);return new Uint8Array(new TextEncoder().encode(t))}function Fe(t){return typeof t=="string"&&(t=Bn(t)),$e(t),t}var we=class{clone(){return this._cloneInto()}};function It(t){let e=r=>t().update(Fe(r)).digest(),n=t();return e.outputLen=n.outputLen,e.blockLen=n.blockLen,e.create=()=>t(),e}function In(t,e,n,r){if(typeof t.setBigUint64=="function")return t.setBigUint64(e,n,r);let o=BigInt(32),s=BigInt(4294967295),i=Number(n>>o&s),c=Number(n&s),a=r?4:0,l=r?0:4;t.setUint32(e+a,i,r),t.setUint32(e+l,c,r)}var Se=class extends we{constructor(e,n,r,o){super(),this.blockLen=e,this.outputLen=n,this.padOffset=r,this.isLE=o,this.finished=!1,this.length=0,this.pos=0,this.destroyed=!1,this.buffer=new Uint8Array(e),this.view=ve(this.buffer)}update(e){je(this);let{view:n,buffer:r,blockLen:o}=this;e=Fe(e);let s=e.length;for(let i=0;i<s;){let c=Math.min(o-this.pos,s-i);if(c===o){let a=ve(e);for(;o<=s-i;i+=o)this.process(a,i);continue}r.set(e.subarray(i,i+c),this.pos),this.pos+=c,i+=c,this.pos===o&&(this.process(n,0),this.pos=0)}return this.length+=e.length,this.roundClean(),this}digestInto(e){je(this),Bt(e,this),this.finished=!0;let{buffer:n,view:r,blockLen:o,isLE:s}=this,{pos:i}=this;n[i++]=128,this.buffer.subarray(i).fill(0),this.padOffset>o-i&&(this.process(r,0),i=0);for(let d=i;d<o;d++)n[d]=0;In(r,o-8,BigInt(this.length*8),s),this.process(r,0);let c=ve(e),a=this.outputLen;if(a%4)throw new Error("_sha2: outputLen should be aligned to 32bit");let l=a/4,u=this.get();if(l>u.length)throw new Error("_sha2: outputLen bigger than state");for(let d=0;d<l;d++)c.setUint32(4*d,u[d],s)}digest(){let{buffer:e,outputLen:n}=this;this.digestInto(e);let r=e.slice(0,n);return this.destroy(),r}_cloneInto(e){e||(e=new this.constructor),e.set(...this.get());let{blockLen:n,buffer:r,length:o,finished:s,destroyed:i,pos:c}=this;return e.length=o,e.pos=c,e.finished=s,e.destroyed=i,o%n&&e.buffer.set(r),e}};var Ae=BigInt(4294967295),_e=BigInt(32);function Ut(t,e=!1){return e?{h:Number(t&Ae),l:Number(t>>_e&Ae)}:{h:Number(t>>_e&Ae)|0,l:Number(t&Ae)|0}}function Un(t,e=!1){let n=new Uint32Array(t.length),r=new Uint32Array(t.length);for(let o=0;o<t.length;o++){let{h:s,l:i}=Ut(t[o],e);[n[o],r[o]]=[s,i]}return[n,r]}var Dn=(t,e)=>BigInt(t>>>0)<<_e|BigInt(e>>>0),Kn=(t,e,n)=>t>>>n,Pn=(t,e,n)=>t<<32-n|e>>>n,Rn=(t,e,n)=>t>>>n|e<<32-n,Ln=(t,e,n)=>t<<32-n|e>>>n,Tn=(t,e,n)=>t<<64-n|e>>>n-32,Hn=(t,e,n)=>t>>>n-32|e<<64-n,kn=(t,e)=>e,Mn=(t,e)=>t,Cn=(t,e,n)=>t<<n|e>>>32-n,$n=(t,e,n)=>e<<n|t>>>32-n,jn=(t,e,n)=>e<<n-32|t>>>64-n,Fn=(t,e,n)=>t<<n-32|e>>>64-n;function _n(t,e,n,r){let o=(e>>>0)+(r>>>0);return{h:t+n+(o/2**32|0)|0,l:o|0}}var On=(t,e,n)=>(t>>>0)+(e>>>0)+(n>>>0),Vn=(t,e,n,r)=>e+n+r+(t/2**32|0)|0,Gn=(t,e,n,r)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0),zn=(t,e,n,r,o)=>e+n+r+o+(t/2**32|0)|0,Nn=(t,e,n,r,o)=>(t>>>0)+(e>>>0)+(n>>>0)+(r>>>0)+(o>>>0),qn=(t,e,n,r,o,s)=>e+n+r+o+s+(t/2**32|0)|0;var Zn={fromBig:Ut,split:Un,toBig:Dn,shrSH:Kn,shrSL:Pn,rotrSH:Rn,rotrSL:Ln,rotrBH:Tn,rotrBL:Hn,rotr32H:kn,rotr32L:Mn,rotlSH:Cn,rotlSL:$n,rotlBH:jn,rotlBL:Fn,add:_n,add3L:On,add3H:Vn,add4L:Gn,add4H:zn,add5H:qn,add5L:Nn},x=Zn;var[Xn,Jn]=x.split(["0x428a2f98d728ae22","0x7137449123ef65cd","0xb5c0fbcfec4d3b2f","0xe9b5dba58189dbbc","0x3956c25bf348b538","0x59f111f1b605d019","0x923f82a4af194f9b","0xab1c5ed5da6d8118","0xd807aa98a3030242","0x12835b0145706fbe","0x243185be4ee4b28c","0x550c7dc3d5ffb4e2","0x72be5d74f27b896f","0x80deb1fe3b1696b1","0x9bdc06a725c71235","0xc19bf174cf692694","0xe49b69c19ef14ad2","0xefbe4786384f25e3","0x0fc19dc68b8cd5b5","0x240ca1cc77ac9c65","0x2de92c6f592b0275","0x4a7484aa6ea6e483","0x5cb0a9dcbd41fbd4","0x76f988da831153b5","0x983e5152ee66dfab","0xa831c66d2db43210","0xb00327c898fb213f","0xbf597fc7beef0ee4","0xc6e00bf33da88fc2","0xd5a79147930aa725","0x06ca6351e003826f","0x142929670a0e6e70","0x27b70a8546d22ffc","0x2e1b21385c26c926","0x4d2c6dfc5ac42aed","0x53380d139d95b3df","0x650a73548baf63de","0x766a0abb3c77b2a8","0x81c2c92e47edaee6","0x92722c851482353b","0xa2bfe8a14cf10364","0xa81a664bbc423001","0xc24b8b70d0f89791","0xc76c51a30654be30","0xd192e819d6ef5218","0xd69906245565a910","0xf40e35855771202a","0x106aa07032bbd1b8","0x19a4c116b8d2d0c8","0x1e376c085141ab53","0x2748774cdf8eeb99","0x34b0bcb5e19b48a8","0x391c0cb3c5c95a63","0x4ed8aa4ae3418acb","0x5b9cca4f7763e373","0x682e6ff3d6b2b8a3","0x748f82ee5defb2fc","0x78a5636f43172f60","0x84c87814a1f0ab72","0x8cc702081a6439ec","0x90befffa23631e28","0xa4506cebde82bde9","0xbef9a3f7b2c67915","0xc67178f2e372532b","0xca273eceea26619c","0xd186b8c721c0c207","0xeada7dd6cde0eb1e","0xf57d4f7fee6ed178","0x06f067aa72176fba","0x0a637dc5a2c898a6","0x113f9804bef90dae","0x1b710b35131c471b","0x28db77f523047d84","0x32caab7b40c72493","0x3c9ebe0a15c9bebc","0x431d67c49c100d4c","0x4cc5d4becb3e42b6","0x597f299cfc657e2a","0x5fcb6fab3ad6faec","0x6c44198c4a475817"].map(t=>BigInt(t))),_=new Uint32Array(80),O=new Uint32Array(80),Oe=class extends Se{constructor(){super(128,64,16,!1),this.Ah=1779033703,this.Al=-205731576,this.Bh=-1150833019,this.Bl=-2067093701,this.Ch=1013904242,this.Cl=-23791573,this.Dh=-1521486534,this.Dl=1595750129,this.Eh=1359893119,this.El=-1377402159,this.Fh=-1694144372,this.Fl=725511199,this.Gh=528734635,this.Gl=-79577749,this.Hh=1541459225,this.Hl=327033209}get(){let{Ah:e,Al:n,Bh:r,Bl:o,Ch:s,Cl:i,Dh:c,Dl:a,Eh:l,El:u,Fh:d,Fl:p,Gh:h,Gl:y,Hh:g,Hl:m}=this;return[e,n,r,o,s,i,c,a,l,u,d,p,h,y,g,m]}set(e,n,r,o,s,i,c,a,l,u,d,p,h,y,g,m){this.Ah=e|0,this.Al=n|0,this.Bh=r|0,this.Bl=o|0,this.Ch=s|0,this.Cl=i|0,this.Dh=c|0,this.Dl=a|0,this.Eh=l|0,this.El=u|0,this.Fh=d|0,this.Fl=p|0,this.Gh=h|0,this.Gl=y|0,this.Hh=g|0,this.Hl=m|0}process(e,n){for(let b=0;b<16;b++,n+=4)_[b]=e.getUint32(n),O[b]=e.getUint32(n+=4);for(let b=16;b<80;b++){let v=_[b-15]|0,A=O[b-15]|0,B=x.rotrSH(v,A,1)^x.rotrSH(v,A,8)^x.shrSH(v,A,7),P=x.rotrSL(v,A,1)^x.rotrSL(v,A,8)^x.shrSL(v,A,7),L=_[b-2]|0,k=O[b-2]|0,ae=x.rotrSH(L,k,19)^x.rotrBH(L,k,61)^x.shrSH(L,k,6),De=x.rotrSL(L,k,19)^x.rotrBL(L,k,61)^x.shrSL(L,k,6),de=x.add4L(P,De,O[b-7],O[b-16]),Ke=x.add4H(de,B,ae,_[b-7],_[b-16]);_[b]=Ke|0,O[b]=de|0}let{Ah:r,Al:o,Bh:s,Bl:i,Ch:c,Cl:a,Dh:l,Dl:u,Eh:d,El:p,Fh:h,Fl:y,Gh:g,Gl:m,Hh:w,Hl:S}=this;for(let b=0;b<80;b++){let v=x.rotrSH(d,p,14)^x.rotrSH(d,p,18)^x.rotrBH(d,p,41),A=x.rotrSL(d,p,14)^x.rotrSL(d,p,18)^x.rotrBL(d,p,41),B=d&h^~d&g,P=p&y^~p&m,L=x.add5L(S,A,P,Jn[b],O[b]),k=x.add5H(L,w,v,B,Xn[b],_[b]),ae=L|0,De=x.rotrSH(r,o,28)^x.rotrBH(r,o,34)^x.rotrBH(r,o,39),de=x.rotrSL(r,o,28)^x.rotrBL(r,o,34)^x.rotrBL(r,o,39),Ke=r&s^r&c^s&c,kt=o&i^o&a^i&a;w=g|0,S=m|0,g=h|0,m=y|0,h=d|0,y=p|0,{h:d,l:p}=x.add(l|0,u|0,k|0,ae|0),l=c|0,u=a|0,c=s|0,a=i|0,s=r|0,i=o|0;let Ge=x.add3L(ae,de,kt);r=x.add3H(Ge,k,De,Ke),o=Ge|0}({h:r,l:o}=x.add(this.Ah|0,this.Al|0,r|0,o|0)),{h:s,l:i}=x.add(this.Bh|0,this.Bl|0,s|0,i|0),{h:c,l:a}=x.add(this.Ch|0,this.Cl|0,c|0,a|0),{h:l,l:u}=x.add(this.Dh|0,this.Dl|0,l|0,u|0),{h:d,l:p}=x.add(this.Eh|0,this.El|0,d|0,p|0),{h,l:y}=x.add(this.Fh|0,this.Fl|0,h|0,y|0),{h:g,l:m}=x.add(this.Gh|0,this.Gl|0,g|0,m|0),{h:w,l:S}=x.add(this.Hh|0,this.Hl|0,w|0,S|0),this.set(r,o,s,i,c,a,l,u,d,p,h,y,g,m,w,S)}roundClean(){_.fill(0),O.fill(0)}destroy(){this.buffer.fill(0),this.set(0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0)}};var Dt=It(()=>new Oe);ge.sha512Sync=(...t)=>Dt(ge.concatBytes(...t));var X=class t{static publicKeyToMultibase(e){let n=new Uint8Array([0,...e]),r=Kt.encode("base58btc",n);return new TextDecoder().decode(r)}static resolve(e){let n=t.getDocument(e);return{didResolutionMetadata:{contentType:"application/did+ld+json",retrieved:new Date().toISOString()},didDocument:n,didDocumentMetadata:{}}}static fromPublicKey(e){let n=`did:stellar:${e}`;return t.getDocument(n)}static fromPrivateKey(e){let r=`did:stellar:${t.getPublicKey(e)}`;return t.getDocument(r)}static getPublicKey(e){let n=N.decodeEd25519SecretSeed(e),r=Et(n);return N.encodeEd25519PublicKey(r)}static getDocument(e){let n=`${e}#0`,r=e.split(":")[2],o=N.decodeEd25519PublicKey(r),s=t.publicKeyToMultibase(o),i=`{
            "@context": [
              "https://www.w3.org/ns/did/v1",
              "https://w3id.org/security/suites/ed25519-2020/v1"
            ],
            "id": "${e}",
            "verificationMethod": [
              {
                "id": "${n}",
                "type": "Ed25519VerificationKey2020",
                "controller": "${e}",
                "publicKeyMultibase": "${s}"
              }
            ],
            "authentication": [
              "${n}"
            ],
            "assertionMethod": [
              "${n}"
            ],
            "capabilityDelegation": [
              "${n}"
            ],
            "capabilityInvocation": [
              "${n}"
            ],
            "keyAgreement": [
              "${n}"
            ]
          }`;return JSON.parse(i)}};var $=class t{static fetchText(e){return E(this,null,function*(){return(yield t.fetchUrl(e)).text()})}static fetchJson(e){return E(this,null,function*(){return(yield t.fetchUrl(e)).json()})}static fetchUrl(e){return E(this,null,function*(){return yield fetch(e,{method:"GET",mode:"cors",cache:"no-cache",credentials:"omit",redirect:"follow",referrerPolicy:"no-referrer"})})}};var Ee=class{constructor(e){Object.defineProperty(this,"activeServer",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.setActiveServer(e)}setActiveServer(e){this.activeServer=e}getServicesByType(e){return E(this,null,function*(){let n=`${this.activeServer}/api/dns/services/service/${e}`;try{return yield $.fetchJson(n)}catch(r){return console.warn(`No services found for ${n}`),console.error(r),[]}})}getServicesByTypeAndNetwork(e,n){return E(this,null,function*(){let r=`${this.activeServer}/api/dns/services/symbol/${n}/service/${e}`;try{return yield $.fetchJson(r)}catch(o){return console.warn(`No services found for ${r}`),console.error(o),[]}})}getServicesByNetwork(e){return E(this,null,function*(){let n=`${this.activeServer}/api/dns/services/symbol/${e}`;try{return yield $.fetchJson(n)}catch(r){return console.warn(`No services found for ${n}`),console.error(r),[]}})}getExternalIP(){return E(this,null,function*(){let e=`${this.activeServer}/api/dns/ipaddress`;try{return yield $.fetchText(e)}catch(n){return console.warn("Unable to find external IP."),console.error(n),""}})}};var Be=class{constructor(){Object.defineProperty(this,"nameservers",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"services",{enumerable:!0,configurable:!0,writable:!0,value:[]}),Object.defineProperty(this,"api",{enumerable:!0,configurable:!0,writable:!0,value:void 0}),this.api=new Ee("")}getDnsServers(){return E(this,null,function*(){let e="https://chains.blockcore.net/services/DNS.json";try{return yield $.fetchJson(e)}catch(n){return console.warn(`Unable to retrieve DNS list, using fixed list instead. URL: ${e}`),console.error(n),[{url:"https://ns.blockcore.net",contact:"post@blockcore.net"},{url:"https://ns.coinvault.io",contact:"post@coinvault.io"},{url:"https://ns.seniorblockchain.io",contact:"post@seniorblockchain.io"}]}})}getNameServers(){return this.nameservers}getOnlineServicesByNetwork(e){return this.services.filter(n=>n.symbol===e&&n.online===!0)}getServices(){return this.services}load(e,n="Indexer"){return E(this,null,function*(){this.nameservers=e||(yield this.getDnsServers());let r=new Map;for(let s=0;s<this.nameservers.length;s++){let i=this.nameservers[s];i&&(this.api.setActiveServer(i.url),n&&(yield this.api.getServicesByType(n)).forEach(a=>r.set(a.domain,T(T({},r.get(a.domain)),a))))}this.services=Array.from(r.values());let o=this.getRandomInt(this.nameservers.length);this.api.setActiveServer(this.nameservers[o].url)})}getRandomInt(e){return Math.floor(Math.random()*e)}};function Pt(){return new Ve().build()}var Ve=class{identityServiceDomain="https://id.blockcore.net";resolve(e,n,r,o){return E(this,null,function*(){let s=`${this.identityServiceDomain}/1.0/identifiers/did:is:${n.id}`;return yield(yield fetch(s,{method:"GET",headers:{Accept:"application/json","Content-Type":"application/json"}})).json()})}load(){let e=new Be;e.load(void 0,"Identity").then(()=>{let n=e.getServices().filter(o=>o.online);if(n.length===0)return;let r=this.getRandomInt(n.length);n[r]?.domain&&(this.identityServiceDomain="https://"+n[r]?.domain)})}getRandomInt(e){return Math.floor(Math.random()*e)}build(){return this.load(),{is:this.resolve.bind(this)}}};var Rt={getResolver:Pt};function Wn(t,e){try{var n=t()}catch(r){return e(r)}return n&&n.then?n.then(void 0,e):n}function Yn(){let t=new Map;return function(e,n){try{let s=function(c){if(o)return c;let a=t.get(e.didUrl);return a!==void 0?a:Promise.resolve(n()).then(function(l){var u;return((u=l.didResolutionMetadata)==null?void 0:u.error)!=="notFound"&&t.set(e.didUrl,l),l})};var r=s;let o,i=function(){if(e.params&&e.params["no-cache"]==="true")return Promise.resolve(n()).then(function(c){return o=1,c})}();return Promise.resolve(i&&i.then?i.then(s):s(i))}catch(o){return Promise.reject(o)}}}function Qn(t,e){return e()}var er="(?:%[0-9a-fA-F]{2})",Lt=`(?:[a-zA-Z0-9._-]|${er})`,tr="([a-z0-9]+)",nr=`((?:${Lt}*:)*(${Lt}+))`,Tt="[a-zA-Z0-9_.:%-]",rr=`;${Tt}+=${Tt}*`,or=`((${rr})*)`,sr="(/[^#?]*)?",ir="([?][^#]*)?",cr="(#.*)?",ar=new RegExp(`^did:${tr}:${nr}${or}${sr}${ir}${cr}$`);function dr(t){if(t===""||!t)return null;let e=t.match(ar);if(e){let n={did:`did:${e[1]}:${e[2]}`,method:e[1],id:e[2],didUrl:t};if(e[4]){let r=e[4].slice(1).split(";");n.params={};for(let o of r){let s=o.split("=");n.params[s[0]]=s[1]}}return e[6]&&(n.path=e[6]),e[7]&&(n.query=e[7].slice(1)),e[8]&&(n.fragment=e[8].slice(1)),n}return null}var Ie={didResolutionMetadata:{},didDocument:null,didDocumentMetadata:{}};function fr(t){return function(e,n,r){try{return Promise.resolve(Wn(function(){return Promise.resolve(t(e,n,r)).then(function(o){return V(T({},Ie),{didResolutionMetadata:{contentType:"application/did+ld+json"},didDocument:o})})},function(o){return V(T({},Ie),{didResolutionMetadata:{error:"notFound",message:o.toString()}})}))}catch(o){return Promise.reject(o)}}}var Ue=class{constructor(e={},n={}){this.registry=void 0,this.cache=void 0,this.registry=e,this.cache=n.cache===!0?Yn():n.cache||Qn,n.legacyResolvers&&Object.keys(n.legacyResolvers).map(r=>{this.registry[r]||(this.registry[r]=fr(n.legacyResolvers[r]))})}resolve(e,n={}){try{let r=this,o=dr(e);if(o===null)return Promise.resolve(V(T({},Ie),{didResolutionMetadata:{error:"invalidDid"}}));let s=r.registry[o.method];return s?Promise.resolve(r.cache(o,()=>s(o.did,o,r,n))):Promise.resolve(V(T({},Ie),{didResolutionMetadata:{error:"unsupportedDidMethod"}}))}catch(r){return Promise.reject(r)}}};var Ht=class t{constructor(e){this.storageService=e;this.loadIdentities()}storageKey="identity-workbench-identities";identitiesSubject=new Ne([]);identities$=this.identitiesSubject.asObservable();loadIdentities(){let e=this.storageService.get(this.storageKey)||[];this.identitiesSubject.next(e)}saveIdentities(e){this.storageService.set(this.storageKey,e),this.identitiesSubject.next(e)}getAllIdentities(){return this.identities$}getIdentityById(e){return this.identitiesSubject.value.find(r=>r.id===e)}addIdentity(e){let n=new Date,r={id:e.id||`did:key:${Le()}`,method:e.method||"key",publicKey:e.publicKey||"",privateKey:e.privateKey,name:e.name||`Identity ${this.identitiesSubject.value.length+1}`,description:e.description,created:n,updated:n,didDocument:e.didDocument},o=[...this.identitiesSubject.value,r];return this.saveIdentities(o),r}updateIdentity(e,n){let r=this.identitiesSubject.value,o=r.findIndex(c=>c.id===e);if(o===-1)throw new Error(`Identity with id ${e} not found`);let s=V(T(T({},r[o]),n),{updated:new Date}),i=[...r.slice(0,o),s,...r.slice(o+1)];return this.saveIdentities(i),s}deleteIdentity(e){let r=this.identitiesSubject.value.filter(o=>o.id!==e);this.saveIdentities(r)}importFromDIDString(e){return E(this,null,function*(){debugger;if(!e.startsWith("did:"))return null;try{let n=e.split(":");if(n.length<3)return null;let r=n[1];if(r==="stellar"){let s=X.resolve(e).didDocument;return this.addIdentity({id:e,method:"stellar",publicKey:n[2],name:"Imported Stellar DID",description:`Imported on ${new Date().toLocaleString()}`,didDocument:s})}if(r==="is"){let i=(yield new Ue(Rt.getResolver()).resolve(e)).didDocument;return this.addIdentity({id:e,method:"is",publicKey:n[2],name:"Imported FreeID",description:`Imported on ${new Date().toLocaleString()}`,didDocument:i})}return this.addIdentity({id:e,method:r,publicKey:n.slice(2).join(":"),name:`Imported ${r.toUpperCase()} DID`,description:`Imported on ${new Date().toLocaleString()}`})}catch(n){return console.error("Error importing DID string:",n),null}})}importFromStellarKey(e,n=!1){try{if(!e||e.length<16)return null;let r,o,s,i;return n?(r=X.fromPrivateKey(e),i=r.id,o=i.split(":")[2],s=e):(r=X.fromPublicKey(e),i=r.id,o=e),this.addIdentity({id:i,method:"stellar",publicKey:o,privateKey:s,name:`Imported Stellar ${n?"Private":"Public"} Key`,description:`Imported on ${new Date().toLocaleString()}`,didDocument:r})}catch(r){return console.error("Error importing Stellar key:",r),null}}importFromJsonFile(e){if(!e||!e.id||!e.id.startsWith("did:"))return null;let n=e.id.split(":");if(n.length<3)return null;let r="";if(e.verificationMethod&&e.verificationMethod.length>0){for(let o of e.verificationMethod)if((o.type==="Ed25519VerificationKey2018"||o.type==="Ed25519VerificationKey2020")&&o.publicKeyBase58){r=o.publicKeyBase58;break}}return this.addIdentity({id:e.id,method:n[1],publicKey:r,name:`Imported ${n[1].toUpperCase()} DID Document`,description:`Imported on ${new Date().toLocaleString()}`,didDocument:e})}static \u0275fac=function(n){return new(n||t)(Ze(Xe))};static \u0275prov=qe({token:t,factory:t.\u0275fac,providedIn:"root"})};export{Le as a,Ht as b};
