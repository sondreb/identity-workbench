import{b as je,e as qe,f as Ge}from"./chunk-MQR7L55N.js";import{k as Ue}from"./chunk-CDN4SK7S.js";import{$c as Pe,Ab as m,Ad as Be,Ba as z,Bb as h,Bd as $e,Da as be,Dc as ze,Ea as O,Eb as te,Ec as Oe,Fa as xe,Fb as x,Fc as Re,Gb as C,Ka as s,La as D,Mb as ie,Na as Ce,Ob as ne,Qa as Se,Tb as Ee,Tc as Ae,Va as E,W as S,Wa as N,X as he,Xa as b,Xb as $,Y as y,Ya as R,Yb as T,Yc as Fe,Za as f,Zb as we,ad as Le,ba as ue,bd as He,ca as H,cd as ae,db as w,ea as fe,eb as u,fb as Ie,g as de,gb as k,ha as l,hb as J,hd as j,ia as _e,ib as Me,id as Ne,ja as ve,jb as _,jc as re,l as L,lb as Q,ld as Qe,mb as V,md as Ve,na as ge,nb as B,oa as W,ob as d,p as ce,pa as Y,pb as c,qb as X,rb as I,sa as Z,sb as De,t as me,ub as ee,uc as ke,vb as p,wb as A,xb as F,ya as M,yb as v,za as ye,zb as P,zc as Te}from"./chunk-OXWMXC6C.js";var tt=["*"];function it(i,a){i&1&&F(0)}var oe=(()=>{class i{_elementRef=l(z);constructor(){}focus(){this._elementRef.nativeElement.focus()}static \u0275fac=function(t){return new(t||i)};static \u0275dir=b({type:i,selectors:[["","cdkStepHeader",""]],hostAttrs:["role","tab"]})}return i})(),se=(()=>{class i{template=l(D);constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275dir=b({type:i,selectors:[["","cdkStepLabel",""]]})}return i})();var g={NUMBER:"number",EDIT:"edit",DONE:"done",ERROR:"error"},nt=new fe("STEPPER_GLOBAL_OPTIONS"),q=(()=>{class i{_stepperOptions;_stepper=l(G);_displayDefaultIndicatorType;stepLabel;_childForms;content;stepControl;interacted=!1;interactedStream=new M;label;errorMessage;ariaLabel;ariaLabelledby;state;editable=!0;optional=!1;get completed(){return this._completedOverride==null?this._getDefaultCompleted():this._completedOverride}set completed(e){this._completedOverride=e}_completedOverride=null;_getDefaultCompleted(){return this.stepControl?this.stepControl.valid&&this.interacted:this.interacted}get hasError(){return this._customError==null?this._getDefaultError():this._customError}set hasError(e){this._customError=e}_customError=null;_getDefaultError(){return this.stepControl&&this.stepControl.invalid&&this.interacted}constructor(){let e=l(nt,{optional:!0});this._stepperOptions=e||{},this._displayDefaultIndicatorType=this._stepperOptions.displayDefaultIndicatorType!==!1}select(){this._stepper.selected=this}reset(){this.interacted=!1,this._completedOverride!=null&&(this._completedOverride=!1),this._customError!=null&&(this._customError=!1),this.stepControl&&(this._childForms?.forEach(e=>e.resetForm?.()),this.stepControl.reset())}ngOnChanges(){this._stepper._stateChanged()}_markAsInteracted(){this.interacted||(this.interacted=!0,this.interactedStream.emit(this))}_showError(){return this._stepperOptions.showError??this._customError!=null}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=E({type:i,selectors:[["cdk-step"]],contentQueries:function(t,n,r){if(t&1&&(v(r,se,5),v(r,Ue,5)),t&2){let o;m(o=h())&&(n.stepLabel=o.first),m(o=h())&&(n._childForms=o)}},viewQuery:function(t,n){if(t&1&&P(D,7),t&2){let r;m(r=h())&&(n.content=r.first)}},inputs:{stepControl:"stepControl",label:"label",errorMessage:"errorMessage",ariaLabel:[0,"aria-label","ariaLabel"],ariaLabelledby:[0,"aria-labelledby","ariaLabelledby"],state:"state",editable:[2,"editable","editable",T],optional:[2,"optional","optional",T],completed:[2,"completed","completed",T],hasError:[2,"hasError","hasError",T]},outputs:{interactedStream:"interacted"},exportAs:["cdkStep"],features:[ge],ngContentSelectors:tt,decls:1,vars:0,template:function(t,n){t&1&&(A(),f(0,it,1,0,"ng-template"))},encapsulation:2,changeDetection:0})}return i})(),G=(()=>{class i{_dir=l(Le,{optional:!0});_changeDetectorRef=l($);_elementRef=l(z);_destroyed=new L;_keyManager;_steps;steps=new O;_stepHeader;_sortedHeaders=new O;linear=!1;get selectedIndex(){return this._selectedIndex}set selectedIndex(e){this._steps?(this._isValidIndex(e),this._selectedIndex!==e&&(this.selected?._markAsInteracted(),!this._anyControlsInvalidOrPending(e)&&(e>=this._selectedIndex||this.steps.toArray()[e].editable)&&this._updateSelectedItemIndex(e))):this._selectedIndex=e}_selectedIndex=0;get selected(){return this.steps?this.steps.toArray()[this.selectedIndex]:void 0}set selected(e){this.selectedIndex=e&&this.steps?this.steps.toArray().indexOf(e):-1}selectionChange=new M;selectedIndexChange=new M;_groupId=l(Pe).getId("cdk-stepper-");get orientation(){return this._orientation}set orientation(e){this._orientation=e,this._keyManager&&this._keyManager.withVerticalOrientation(e==="vertical")}_orientation="horizontal";constructor(){}ngAfterContentInit(){this._steps.changes.pipe(S(this._steps),y(this._destroyed)).subscribe(e=>{this.steps.reset(e.filter(t=>t._stepper===this)),this.steps.notifyOnChanges()})}ngAfterViewInit(){if(this._stepHeader.changes.pipe(S(this._stepHeader),y(this._destroyed)).subscribe(e=>{this._sortedHeaders.reset(e.toArray().sort((t,n)=>t._elementRef.nativeElement.compareDocumentPosition(n._elementRef.nativeElement)&Node.DOCUMENT_POSITION_FOLLOWING?-1:1)),this._sortedHeaders.notifyOnChanges()}),this._keyManager=new Ae(this._sortedHeaders).withWrap().withHomeAndEnd().withVerticalOrientation(this._orientation==="vertical"),(this._dir?this._dir.change:ce()).pipe(S(this._layoutDirection()),y(this._destroyed)).subscribe(e=>this._keyManager.withHorizontalOrientation(e)),this._keyManager.updateActiveItem(this._selectedIndex),this.steps.changes.subscribe(()=>{this.selected||(this._selectedIndex=Math.max(this._selectedIndex-1,0))}),this._isValidIndex(this._selectedIndex)||(this._selectedIndex=0),this.linear&&this._selectedIndex>0){let e=this.steps.toArray().slice(0,this._selectedIndex);for(let t of e)t._markAsInteracted()}}ngOnDestroy(){this._keyManager?.destroy(),this.steps.destroy(),this._sortedHeaders.destroy(),this._destroyed.next(),this._destroyed.complete()}next(){this.selectedIndex=Math.min(this._selectedIndex+1,this.steps.length-1)}previous(){this.selectedIndex=Math.max(this._selectedIndex-1,0)}reset(){this._updateSelectedItemIndex(0),this.steps.forEach(e=>e.reset()),this._stateChanged()}_getStepLabelId(e){return`${this._groupId}-label-${e}`}_getStepContentId(e){return`${this._groupId}-content-${e}`}_stateChanged(){this._changeDetectorRef.markForCheck()}_getAnimationDirection(e){let t=e-this._selectedIndex;return t<0?this._layoutDirection()==="rtl"?"next":"previous":t>0?this._layoutDirection()==="rtl"?"previous":"next":"current"}_getIndicatorType(e,t=g.NUMBER){let n=this.steps.toArray()[e],r=this._isCurrentStep(e);return n._displayDefaultIndicatorType?this._getDefaultIndicatorLogic(n,r):this._getGuidelineLogic(n,r,t)}_getDefaultIndicatorLogic(e,t){return e._showError()&&e.hasError&&!t?g.ERROR:!e.completed||t?g.NUMBER:e.editable?g.EDIT:g.DONE}_getGuidelineLogic(e,t,n=g.NUMBER){return e._showError()&&e.hasError&&!t?g.ERROR:e.completed&&!t?g.DONE:e.completed&&t?n:e.editable&&t?g.EDIT:n}_isCurrentStep(e){return this._selectedIndex===e}_getFocusIndex(){return this._keyManager?this._keyManager.activeItemIndex:this._selectedIndex}_updateSelectedItemIndex(e){let t=this.steps.toArray();this.selectionChange.emit({selectedIndex:e,previouslySelectedIndex:this._selectedIndex,selectedStep:t[e],previouslySelectedStep:t[this._selectedIndex]}),this._containsFocus()?this._keyManager.setActiveItem(e):this._keyManager.updateActiveItem(e),this._selectedIndex=e,this.selectedIndexChange.emit(this._selectedIndex),this._stateChanged()}_onKeydown(e){let t=Re(e),n=e.keyCode,r=this._keyManager;r.activeItemIndex!=null&&!t&&(n===32||n===13)?(this.selectedIndex=r.activeItemIndex,e.preventDefault()):r.setFocusOrigin("keyboard").onKeydown(e)}_anyControlsInvalidOrPending(e){return this.linear&&e>=0?this.steps.toArray().slice(0,e).some(t=>{let n=t.stepControl;return(n?n.invalid||n.pending||!t.interacted:!t.completed)&&!t.optional&&!t._completedOverride}):!1}_layoutDirection(){return this._dir&&this._dir.value==="rtl"?"rtl":"ltr"}_containsFocus(){let e=this._elementRef.nativeElement,t=Te();return e===t||e.contains(t)}_isValidIndex(e){return e>-1&&(!this.steps||e<this.steps.length)}static \u0275fac=function(t){return new(t||i)};static \u0275dir=b({type:i,selectors:[["","cdkStepper",""]],contentQueries:function(t,n,r){if(t&1&&(v(r,q,5),v(r,oe,5)),t&2){let o;m(o=h())&&(n._steps=o),m(o=h())&&(n._stepHeader=o)}},inputs:{linear:[2,"linear","linear",T],selectedIndex:[2,"selectedIndex","selectedIndex",we],selected:"selected",orientation:"orientation"},outputs:{selectionChange:"selectionChange",selectedIndexChange:"selectedIndexChange"},exportAs:["cdkStepper"]})}return i})();var Ke=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=N({type:i});static \u0275inj=H({imports:[He]})}return i})();function rt(i,a){if(i&1&&I(0,2),i&2){let e=p();u("ngTemplateOutlet",e.iconOverrides[e.state])("ngTemplateOutletContext",e._getIconContext())}}function at(i,a){if(i&1&&(d(0,"span",7),x(1),c()),i&2){let e=p(2);s(),C(e._getDefaultTextForState(e.state))}}function ot(i,a){if(i&1&&(d(0,"span",8),x(1),c()),i&2){let e=p(3);s(),C(e._intl.completedLabel)}}function st(i,a){if(i&1&&(d(0,"span",8),x(1),c()),i&2){let e=p(3);s(),C(e._intl.editableLabel)}}function lt(i,a){if(i&1&&(f(0,ot,2,1,"span",8)(1,st,2,1,"span",8),d(2,"mat-icon",7),x(3),c()),i&2){let e=p(2);_(e.state==="done"?0:e.state==="edit"?1:-1),s(3),C(e._getDefaultTextForState(e.state))}}function pt(i,a){if(i&1&&f(0,at,2,1,"span",7)(1,lt,4,2),i&2){let e,t=p();_((e=t.state)==="number"?0:1)}}function dt(i,a){i&1&&(d(0,"div",4),I(1,9),c()),i&2&&(s(),u("ngTemplateOutlet",a.template))}function ct(i,a){if(i&1&&(d(0,"div",4),x(1),c()),i&2){let e=p();s(),C(e.label)}}function mt(i,a){if(i&1&&(d(0,"div",5),x(1),c()),i&2){let e=p();s(),C(e._intl.optionalLabel)}}function ht(i,a){if(i&1&&(d(0,"div",6),x(1),c()),i&2){let e=p();s(),C(e.errorMessage)}}var We=["*"];function ut(i,a){}function ft(i,a){if(i&1&&(F(0),f(1,ut,0,0,"ng-template",0)),i&2){let e=p();s(),u("cdkPortalOutlet",e._portal)}}var _t=["animatedContainer"],Ye=(i,a)=>({step:i,i:a});function vt(i,a){i&1&&F(0)}function gt(i,a){i&1&&X(0,"div",7)}function yt(i,a){if(i&1&&(I(0,6),f(1,gt,1,0,"div",7)),i&2){let e=a.$implicit,t=a.$index,n=a.$index,r=a.$count;p(2);let o=te(4);u("ngTemplateOutlet",o)("ngTemplateOutletContext",ne(3,Ye,e,t)),s(),_(n!==r-1?1:-1)}}function bt(i,a){if(i&1&&(d(0,"div",8,1),I(2,9),c()),i&2){let e=a.$implicit,t=a.$index,n=p(2);J("mat-horizontal-stepper-content-"+n._getAnimationDirection(t)),u("id",n._getStepContentId(t)),w("aria-labelledby",n._getStepLabelId(t))("inert",n.selectedIndex===t?null:""),s(2),u("ngTemplateOutlet",e.content)}}function xt(i,a){if(i&1&&(d(0,"div",2)(1,"div",3),V(2,yt,2,6,null,null,Q),c(),d(4,"div",4),V(5,bt,3,6,"div",5,Q),c()()),i&2){let e=p();s(2),B(e.steps),s(3),B(e.steps)}}function Ct(i,a){if(i&1&&(d(0,"div",10),I(1,6),d(2,"div",11,1)(4,"div",12)(5,"div",13),I(6,9),c()()()()),i&2){let e=a.$implicit,t=a.$index,n=a.$index,r=a.$count,o=p(2),K=te(4);s(),u("ngTemplateOutlet",K)("ngTemplateOutletContext",ne(10,Ye,e,t)),s(),k("mat-stepper-vertical-line",n!==r-1)("mat-vertical-content-container-active",o.selectedIndex===t),w("inert",o.selectedIndex===t?null:""),s(2),u("id",o._getStepContentId(t)),w("aria-labelledby",o._getStepLabelId(t)),s(2),u("ngTemplateOutlet",e.content)}}function St(i,a){if(i&1&&V(0,Ct,7,13,"div",10,Q),i&2){let e=p();B(e.steps)}}function It(i,a){if(i&1){let e=De();d(0,"mat-step-header",14),ee("click",function(){let n=W(e).step;return Y(n.select())})("keydown",function(n){W(e);let r=p();return Y(r._onKeydown(n))}),c()}if(i&2){let e=a.step,t=a.i,n=p();k("mat-horizontal-stepper-header",n.orientation==="horizontal")("mat-vertical-stepper-header",n.orientation==="vertical"),u("tabIndex",n._getFocusIndex()===t?0:-1)("id",n._getStepLabelId(t))("index",t)("state",n._getIndicatorType(t,e.state))("label",e.stepLabel||e.label)("selected",n.selectedIndex===t)("active",n._stepIsNavigable(t,e))("optional",e.optional)("errorMessage",e.errorMessage)("iconOverrides",n._iconOverrides)("disableRipple",n.disableRipple||!n._stepIsNavigable(t,e))("color",e.color||n.color),w("aria-posinset",t+1)("aria-setsize",n.steps.length)("aria-controls",n._getStepContentId(t))("aria-selected",n.selectedIndex==t)("aria-label",e.ariaLabel||null)("aria-labelledby",!e.ariaLabel&&e.ariaLabelledby?e.ariaLabelledby:null)("aria-disabled",n._stepIsNavigable(t,e)?null:!0)}}var le=(()=>{class i extends se{static \u0275fac=(()=>{let e;return function(n){return(e||(e=Z(i)))(n||i)}})();static \u0275dir=b({type:i,selectors:[["","matStepLabel",""]],features:[R]})}return i})(),U=(()=>{class i{changes=new L;optionalLabel="Optional";completedLabel="Completed";editableLabel="Editable";static \u0275fac=function(t){return new(t||i)};static \u0275prov=ue({token:i,factory:i.\u0275fac,providedIn:"root"})}return i})();function Mt(i){return i||new U}var Dt={provide:U,deps:[[new _e,new ve,U]],useFactory:Mt},pe=(()=>{class i extends oe{_intl=l(U);_focusMonitor=l(Fe);_intlSubscription;state;label;errorMessage;iconOverrides;index;selected;active;optional;disableRipple;color;constructor(){super();let e=l(ze);e.load(Ne),e.load(Oe);let t=l($);this._intlSubscription=this._intl.changes.subscribe(()=>t.markForCheck())}ngAfterViewInit(){this._focusMonitor.monitor(this._elementRef,!0)}ngOnDestroy(){this._intlSubscription.unsubscribe(),this._focusMonitor.stopMonitoring(this._elementRef)}focus(e,t){e?this._focusMonitor.focusVia(this._elementRef,e,t):this._elementRef.nativeElement.focus(t)}_stringLabel(){return this.label instanceof le?null:this.label}_templateLabel(){return this.label instanceof le?this.label:null}_getHostElement(){return this._elementRef.nativeElement}_getIconContext(){return{index:this.index,active:this.active,optional:this.optional}}_getDefaultTextForState(e){return e=="number"?`${this.index+1}`:e=="edit"?"create":e=="error"?"warning":e}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=E({type:i,selectors:[["mat-step-header"]],hostAttrs:["role","tab",1,"mat-step-header"],hostVars:2,hostBindings:function(t,n){t&2&&J("mat-"+(n.color||"primary"))},inputs:{state:"state",label:"label",errorMessage:"errorMessage",iconOverrides:"iconOverrides",index:"index",selected:"selected",active:"active",optional:"optional",disableRipple:"disableRipple",color:"color"},features:[R],decls:10,vars:17,consts:[["matRipple","",1,"mat-step-header-ripple","mat-focus-indicator",3,"matRippleTrigger","matRippleDisabled"],[1,"mat-step-icon-content"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"mat-step-label"],[1,"mat-step-text-label"],[1,"mat-step-optional"],[1,"mat-step-sub-label-error"],["aria-hidden","true"],[1,"cdk-visually-hidden"],[3,"ngTemplateOutlet"]],template:function(t,n){if(t&1&&(X(0,"div",0),d(1,"div")(2,"div",1),f(3,rt,1,2,"ng-container",2)(4,pt,2,1),c()(),d(5,"div",3),f(6,dt,2,1,"div",4)(7,ct,2,1,"div",4)(8,mt,2,1,"div",5)(9,ht,2,1,"div",6),c()),t&2){let r;u("matRippleTrigger",n._getHostElement())("matRippleDisabled",n.disableRipple),s(),Me("mat-step-icon-state-",n.state," mat-step-icon"),k("mat-step-icon-selected",n.selected),s(2),_(n.iconOverrides&&n.iconOverrides[n.state]?3:4),s(2),k("mat-step-label-active",n.active)("mat-step-label-selected",n.selected)("mat-step-label-error",n.state=="error"),s(),_((r=n._templateLabel())?6:n._stringLabel()?7:-1,r),s(2),_(n.optional&&n.state!="error"?8:-1),s(),_(n.state==="error"?9:-1)}},dependencies:[Qe,re,Be],styles:['.mat-step-header{overflow:hidden;outline:none;cursor:pointer;position:relative;box-sizing:content-box;-webkit-tap-highlight-color:rgba(0,0,0,0)}.mat-step-header:focus .mat-focus-indicator::before{content:""}.mat-step-header:hover[aria-disabled=true]{cursor:default}.mat-step-header:hover:not([aria-disabled]),.mat-step-header:hover[aria-disabled=false]{background-color:var(--mat-stepper-header-hover-state-layer-color, color-mix(in srgb, var(--mat-sys-inverse-surface) calc(var(--mat-sys-hover-state-layer-opacity) * 100%), transparent));border-radius:var(--mat-stepper-header-hover-state-layer-shape, var(--mat-sys-corner-medium))}.mat-step-header.cdk-keyboard-focused,.mat-step-header.cdk-program-focused{background-color:var(--mat-stepper-header-focus-state-layer-color, color-mix(in srgb, var(--mat-sys-inverse-surface) calc(var(--mat-sys-focus-state-layer-opacity) * 100%), transparent));border-radius:var(--mat-stepper-header-focus-state-layer-shape, var(--mat-sys-corner-medium))}@media(hover: none){.mat-step-header:hover{background:none}}@media(forced-colors: active){.mat-step-header{outline:solid 1px}.mat-step-header[aria-selected=true] .mat-step-label{text-decoration:underline}.mat-step-header[aria-disabled=true]{outline-color:GrayText}.mat-step-header[aria-disabled=true] .mat-step-label,.mat-step-header[aria-disabled=true] .mat-step-icon,.mat-step-header[aria-disabled=true] .mat-step-optional{color:GrayText}}.mat-step-optional{font-size:12px;color:var(--mat-stepper-header-optional-label-text-color, var(--mat-sys-on-surface-variant))}.mat-step-sub-label-error{font-size:12px;font-weight:normal}.mat-step-icon{border-radius:50%;height:24px;width:24px;flex-shrink:0;position:relative;color:var(--mat-stepper-header-icon-foreground-color, var(--mat-sys-surface));background-color:var(--mat-stepper-header-icon-background-color, var(--mat-sys-on-surface-variant))}.mat-step-icon-content{position:absolute;top:50%;left:50%;transform:translate(-50%, -50%);display:flex}.mat-step-icon .mat-icon{font-size:16px;height:16px;width:16px}.mat-step-icon-state-error{background-color:var(--mat-stepper-header-error-state-icon-background-color, transparent);color:var(--mat-stepper-header-error-state-icon-foreground-color, var(--mat-sys-error))}.mat-step-icon-state-error .mat-icon{font-size:24px;height:24px;width:24px}.mat-step-label{display:inline-block;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;min-width:50px;vertical-align:middle;font-family:var(--mat-stepper-header-label-text-font, var(--mat-sys-title-small-font));font-size:var(--mat-stepper-header-label-text-size, var(--mat-sys-title-small-size));font-weight:var(--mat-stepper-header-label-text-weight, var(--mat-sys-title-small-weight));color:var(--mat-stepper-header-label-text-color, var(--mat-sys-on-surface-variant))}.mat-step-label.mat-step-label-active{color:var(--mat-stepper-header-selected-state-label-text-color, var(--mat-sys-on-surface-variant))}.mat-step-label.mat-step-label-error{color:var(--mat-stepper-header-error-state-label-text-color, var(--mat-sys-error));font-size:var(--mat-stepper-header-error-state-label-text-size, var(--mat-sys-title-small-size))}.mat-step-label.mat-step-label-selected{font-size:var(--mat-stepper-header-selected-state-label-text-size, var(--mat-sys-title-small-size));font-weight:var(--mat-stepper-header-selected-state-label-text-weight, var(--mat-sys-title-small-weight))}.mat-step-text-label{text-overflow:ellipsis;overflow:hidden}.mat-step-header .mat-step-header-ripple{top:0;left:0;right:0;bottom:0;position:absolute;pointer-events:none}.mat-step-icon-selected{background-color:var(--mat-stepper-header-selected-state-icon-background-color, var(--mat-sys-primary));color:var(--mat-stepper-header-selected-state-icon-foreground-color, var(--mat-sys-on-primary))}.mat-step-icon-state-done{background-color:var(--mat-stepper-header-done-state-icon-background-color);color:var(--mat-stepper-header-done-state-icon-foreground-color)}.mat-step-icon-state-edit{background-color:var(--mat-stepper-header-edit-state-icon-background-color, var(--mat-sys-primary));color:var(--mat-stepper-header-edit-state-icon-foreground-color, var(--mat-sys-on-primary))}'],encapsulation:2,changeDetection:0})}return i})(),Et=(()=>{class i{templateRef=l(D);name;constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275dir=b({type:i,selectors:[["ng-template","matStepperIcon",""]],inputs:{name:[0,"matStepperIcon","name"]}})}return i})(),wt=(()=>{class i{_template=l(D);constructor(){}static \u0275fac=function(t){return new(t||i)};static \u0275dir=b({type:i,selectors:[["ng-template","matStepContent",""]]})}return i})(),kt=(()=>{class i extends q{_errorStateMatcher=l(j,{skipSelf:!0});_viewContainerRef=l(Se);_isSelected=de.EMPTY;stepLabel=void 0;color;_lazyContent;_portal;ngAfterContentInit(){this._isSelected=this._stepper.steps.changes.pipe(he(()=>this._stepper.selectionChange.pipe(me(e=>e.selectedStep===this),S(this._stepper.selected===this)))).subscribe(e=>{e&&this._lazyContent&&!this._portal&&(this._portal=new je(this._lazyContent._template,this._viewContainerRef))})}ngOnDestroy(){this._isSelected.unsubscribe()}isErrorState(e,t){let n=this._errorStateMatcher.isErrorState(e,t),r=!!(e&&e.invalid&&this.interacted);return n||r}static \u0275fac=(()=>{let e;return function(n){return(e||(e=Z(i)))(n||i)}})();static \u0275cmp=E({type:i,selectors:[["mat-step"]],contentQueries:function(t,n,r){if(t&1&&(v(r,le,5),v(r,wt,5)),t&2){let o;m(o=h())&&(n.stepLabel=o.first),m(o=h())&&(n._lazyContent=o.first)}},hostAttrs:["hidden",""],inputs:{color:"color"},exportAs:["matStep"],features:[ie([{provide:j,useExisting:i},{provide:q,useExisting:i}]),R],ngContentSelectors:We,decls:1,vars:0,consts:[[3,"cdkPortalOutlet"]],template:function(t,n){t&1&&(A(),f(0,ft,2,1,"ng-template"))},dependencies:[qe],encapsulation:2,changeDetection:0})}return i})(),Tt=(()=>{class i extends G{_ngZone=l(ye);_renderer=l(Ce);_animationsModule=l(xe,{optional:!0});_cleanupTransition;_isAnimating=be(!1);_stepHeader=void 0;_animatedContainers;_steps=void 0;steps=new O;_icons;animationDone=new M;disableRipple;color;labelPosition="end";headerPosition="top";_iconOverrides={};get animationDuration(){return this._animationDuration}set animationDuration(e){this._animationDuration=/^\d+$/.test(e)?e+"ms":e}_animationDuration="";_isServer=!l(ke).isBrowser;constructor(){super();let t=l(z).nativeElement.nodeName.toLowerCase();this.orientation=t==="mat-vertical-stepper"?"vertical":"horizontal"}ngAfterContentInit(){super.ngAfterContentInit(),this._icons.forEach(({name:e,templateRef:t})=>this._iconOverrides[e]=t),this.steps.changes.pipe(y(this._destroyed)).subscribe(()=>this._stateChanged()),this.selectedIndexChange.pipe(y(this._destroyed)).subscribe(()=>{let e=this._getAnimationDuration();e==="0ms"||e==="0s"?this._onAnimationDone():this._isAnimating.set(!0)}),this._ngZone.runOutsideAngular(()=>{this._animationsModule!=="NoopAnimations"&&setTimeout(()=>{this._elementRef.nativeElement.classList.add("mat-stepper-animations-enabled"),this._cleanupTransition=this._renderer.listen(this._elementRef.nativeElement,"transitionend",this._handleTransitionend)},200)})}ngAfterViewInit(){if(super.ngAfterViewInit(),typeof queueMicrotask=="function"){let e=!1;this._animatedContainers.changes.pipe(S(null),y(this._destroyed)).subscribe(()=>queueMicrotask(()=>{e||(e=!0,this.animationDone.emit()),this._stateChanged()}))}}ngOnDestroy(){super.ngOnDestroy(),this._cleanupTransition?.()}_stepIsNavigable(e,t){return t.completed||this.selectedIndex===e||!this.linear}_getAnimationDuration(){return this._animationsModule==="NoopAnimations"?"0ms":this.animationDuration?this.animationDuration:this.orientation==="horizontal"?"500ms":"225ms"}_handleTransitionend=e=>{let t=e.target;if(!t)return;let n=this.orientation==="horizontal"&&e.propertyName==="transform"&&t.classList.contains("mat-horizontal-stepper-content-current"),r=this.orientation==="vertical"&&e.propertyName==="grid-template-rows"&&t.classList.contains("mat-vertical-content-container-active");(n||r)&&this._animatedContainers.find(K=>K.nativeElement===t)&&this._onAnimationDone()};_onAnimationDone(){this._isAnimating.set(!1),this.animationDone.emit()}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=E({type:i,selectors:[["mat-stepper"],["mat-vertical-stepper"],["mat-horizontal-stepper"],["","matStepper",""]],contentQueries:function(t,n,r){if(t&1&&(v(r,kt,5),v(r,Et,5)),t&2){let o;m(o=h())&&(n._steps=o),m(o=h())&&(n._icons=o)}},viewQuery:function(t,n){if(t&1&&(P(pe,5),P(_t,5)),t&2){let r;m(r=h())&&(n._stepHeader=r),m(r=h())&&(n._animatedContainers=r)}},hostAttrs:["role","tablist"],hostVars:15,hostBindings:function(t,n){t&2&&(w("aria-orientation",n.orientation),Ie("--mat-stepper-animation-duration",n._getAnimationDuration()),k("mat-stepper-horizontal",n.orientation==="horizontal")("mat-stepper-vertical",n.orientation==="vertical")("mat-stepper-label-position-end",n.orientation==="horizontal"&&n.labelPosition=="end")("mat-stepper-label-position-bottom",n.orientation==="horizontal"&&n.labelPosition=="bottom")("mat-stepper-header-position-bottom",n.headerPosition==="bottom")("mat-stepper-animating",n._isAnimating()))},inputs:{disableRipple:"disableRipple",color:"color",labelPosition:"labelPosition",headerPosition:"headerPosition",animationDuration:"animationDuration"},outputs:{animationDone:"animationDone"},exportAs:["matStepper","matVerticalStepper","matHorizontalStepper"],features:[ie([{provide:G,useExisting:i}]),R],ngContentSelectors:We,decls:5,vars:2,consts:[["stepTemplate",""],["animatedContainer",""],[1,"mat-horizontal-stepper-wrapper"],[1,"mat-horizontal-stepper-header-container"],[1,"mat-horizontal-content-container"],["role","tabpanel",1,"mat-horizontal-stepper-content",3,"id","class"],[3,"ngTemplateOutlet","ngTemplateOutletContext"],[1,"mat-stepper-horizontal-line"],["role","tabpanel",1,"mat-horizontal-stepper-content",3,"id"],[3,"ngTemplateOutlet"],[1,"mat-step"],[1,"mat-vertical-content-container"],["role","tabpanel",1,"mat-vertical-stepper-content",3,"id"],[1,"mat-vertical-content"],[3,"click","keydown","tabIndex","id","index","state","label","selected","active","optional","errorMessage","iconOverrides","disableRipple","color"]],template:function(t,n){if(t&1&&(A(),f(0,vt,1,0)(1,xt,7,0,"div",2)(2,St,2,0)(3,It,1,23,"ng-template",null,0,Ee)),t&2){let r;_(n._isServer?0:-1),s(),_((r=n.orientation)==="horizontal"?1:r==="vertical"?2:-1)}},dependencies:[re,pe],styles:['.mat-stepper-vertical,.mat-stepper-horizontal{display:block;font-family:var(--mat-stepper-container-text-font, var(--mat-sys-body-medium-font));background:var(--mat-stepper-container-color, var(--mat-sys-surface))}.mat-horizontal-stepper-header-container{white-space:nowrap;display:flex;align-items:center}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header-container{align-items:flex-start}.mat-stepper-header-position-bottom .mat-horizontal-stepper-header-container{order:1}.mat-stepper-horizontal-line{border-top-width:1px;border-top-style:solid;flex:auto;height:0;margin:0 -16px;min-width:32px;border-top-color:var(--mat-stepper-line-color, var(--mat-sys-outline))}.mat-stepper-label-position-bottom .mat-stepper-horizontal-line{margin:0;min-width:0;position:relative;top:calc(calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{border-top-width:1px;border-top-style:solid;content:"";display:inline-block;height:0;position:absolute;width:calc(50% - 20px)}.mat-horizontal-stepper-header{display:flex;height:72px;overflow:hidden;align-items:center;padding:0 24px;height:var(--mat-stepper-header-height, 72px)}.mat-horizontal-stepper-header .mat-step-icon{margin-right:8px;flex:none}[dir=rtl] .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:8px}.mat-horizontal-stepper-header::before,.mat-horizontal-stepper-header::after{border-top-color:var(--mat-stepper-line-color, var(--mat-sys-outline))}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{padding:calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) 24px}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::before,.mat-stepper-label-position-bottom .mat-horizontal-stepper-header::after{top:calc(calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) + 12px)}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header{box-sizing:border-box;flex-direction:column;height:auto}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::after,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::after{right:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:first-child)::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:not(:last-child)::before{left:0}[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:last-child::before,[dir=rtl] .mat-stepper-label-position-bottom .mat-horizontal-stepper-header:first-child::after{display:none}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-icon{margin-right:0;margin-left:0}.mat-stepper-label-position-bottom .mat-horizontal-stepper-header .mat-step-label{padding:16px 0 0 0;text-align:center;width:100%}.mat-vertical-stepper-header{display:flex;align-items:center;height:24px;padding:calc((var(--mat-stepper-header-height, 72px) - 24px) / 2) 24px}.mat-vertical-stepper-header .mat-step-icon{margin-right:12px}[dir=rtl] .mat-vertical-stepper-header .mat-step-icon{margin-right:0;margin-left:12px}.mat-horizontal-stepper-wrapper{display:flex;flex-direction:column}.mat-horizontal-stepper-content{visibility:hidden;overflow:hidden;outline:0;height:0}.mat-stepper-animations-enabled .mat-horizontal-stepper-content{transition:transform var(--mat-stepper-animation-duration, 0) cubic-bezier(0.35, 0, 0.25, 1)}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-previous{transform:translate3d(-100%, 0, 0)}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-next{transform:translate3d(100%, 0, 0)}.mat-horizontal-stepper-content.mat-horizontal-stepper-content-current{visibility:visible;transform:none;height:auto}.mat-stepper-horizontal:not(.mat-stepper-animating) .mat-horizontal-stepper-content.mat-horizontal-stepper-content-current{overflow:visible}.mat-horizontal-content-container{overflow:hidden;padding:0 24px 24px 24px}@media(forced-colors: active){.mat-horizontal-content-container{outline:solid 1px}}.mat-stepper-header-position-bottom .mat-horizontal-content-container{padding:24px 24px 0 24px}.mat-vertical-content-container{display:grid;grid-template-rows:0fr;grid-template-columns:100%;margin-left:36px;border:0;position:relative}.mat-stepper-animations-enabled .mat-vertical-content-container{transition:grid-template-rows var(--mat-stepper-animation-duration, 0) cubic-bezier(0.4, 0, 0.2, 1)}.mat-vertical-content-container.mat-vertical-content-container-active{grid-template-rows:1fr}.mat-step:last-child .mat-vertical-content-container{border:none}@media(forced-colors: active){.mat-vertical-content-container{outline:solid 1px}}[dir=rtl] .mat-vertical-content-container{margin-left:0;margin-right:36px}@supports not (grid-template-rows: 0fr){.mat-vertical-content-container{height:0}.mat-vertical-content-container.mat-vertical-content-container-active{height:auto}}.mat-stepper-vertical-line::before{content:"";position:absolute;left:0;border-left-width:1px;border-left-style:solid;border-left-color:var(--mat-stepper-line-color, var(--mat-sys-outline));top:calc(8px - calc((var(--mat-stepper-header-height, 72px) - 24px) / 2));bottom:calc(8px - calc((var(--mat-stepper-header-height, 72px) - 24px) / 2))}[dir=rtl] .mat-stepper-vertical-line::before{left:auto;right:0}.mat-vertical-stepper-content{overflow:hidden;outline:0;visibility:hidden}.mat-stepper-animations-enabled .mat-vertical-stepper-content{transition:visibility var(--mat-stepper-animation-duration, 0) linear}.mat-vertical-content-container-active>.mat-vertical-stepper-content{visibility:visible}.mat-vertical-content{padding:0 24px 24px 24px}'],encapsulation:2,changeDetection:0})}return i})();var bi=(()=>{class i{static \u0275fac=function(t){return new(t||i)};static \u0275mod=N({type:i});static \u0275inj=H({providers:[Dt,j],imports:[ae,Ge,Ke,$e,Ve,Tt,pe,ae]})}return i})();export{bi as a};
