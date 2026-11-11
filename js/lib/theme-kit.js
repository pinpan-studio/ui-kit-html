/* Calcul de schémas Material 3 : ui-kit/src/app/core/theme/custom-theme.ts + @material/material-color-utilities (Apache-2.0), empaquetés. Exposé sous window.ThemeKit. */
var ThemeKit=(()=>{var Ge=Object.defineProperty;var Ct=Object.getOwnPropertyDescriptor;var St=Object.getOwnPropertyNames;var xt=Object.prototype.hasOwnProperty;var Tt=(r,e)=>{for(var t in e)Ge(r,t,{get:e[t],enumerable:!0})},kt=(r,e,t,n)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of St(e))!xt.call(r,a)&&a!==t&&Ge(r,a,{get:()=>e[a],enumerable:!(n=Ct(e,a))||n.enumerable});return r};var At=r=>kt(Ge({},"__esModule",{value:!0}),r);var $t={};Tt($t,{CONTRAST_LEVELS:()=>Vt,CUSTOM_THEME_PROPERTIES:()=>Nt,OVERRIDABLE_ROLES:()=>ht,SCHEME_STYLES:()=>Ze,SHOWCASE_TONES:()=>mt,THEME_PALETTES:()=>pt,contrastRatio:()=>Yt,createScheme:()=>He,cssVariables:()=>dt,cssVariablesFor:()=>_t,derivedKeyColors:()=>Gt,exportCss:()=>Kt,isHexColor:()=>Je,normalizeConfig:()=>Ut,paletteStrips:()=>zt,schemeColors:()=>Ve});function z(r){return r<0?-1:r===0?0:1}function ae(r,e,t){return(1-t)*r+t*e}function rt(r,e,t){return t<r?r:t>e?e:t}function N(r,e,t){return t<r?r:t>e?e:t}function ce(r){return r=r%360,r<0&&(r=r+360),r}function U(r){return r=r%360,r<0&&(r=r+360),r}function Ke(r,e){return 180-Math.abs(Math.abs(r-e)-180)}function he(r,e){let t=r[0]*e[0][0]+r[1]*e[0][1]+r[2]*e[0][2],n=r[0]*e[1][0]+r[1]*e[1][1]+r[2]*e[1][2],a=r[0]*e[2][0]+r[1]*e[2][1]+r[2]*e[2][2];return[t,n,a]}var nt=[[.41233895,.35762064,.18051042],[.2126,.7152,.0722],[.01932141,.11916382,.95034478]],Dt=[[3.2413774792388685,-1.5376652402851851,-.49885366846268053],[-.9691452513005321,1.8758853451067872,.04156585616912061],[.05562093689691305,-.20395524564742123,1.0571799111220335]],at=[95.047,100,108.883];function xe(r,e,t){return(255<<24|(r&255)<<16|(e&255)<<8|t&255)>>>0}function Ye(r){let e=oe(r[0]),t=oe(r[1]),n=oe(r[2]);return xe(e,t,n)}function fe(r){return r>>16&255}function de(r){return r>>8&255}function pe(r){return r&255}function ot(r,e,t){let n=Dt,a=n[0][0]*r+n[0][1]*e+n[0][2]*t,o=n[1][0]*r+n[1][1]*e+n[1][2]*t,i=n[2][0]*r+n[2][1]*e+n[2][2]*t,l=oe(a),m=oe(o),f=oe(i);return xe(l,m,f)}function vt(r){let e=W(fe(r)),t=W(de(r)),n=W(pe(r));return he([e,t,n],nt)}function $e(r){let e=W(fe(r)),t=W(de(r)),n=W(pe(r)),a=nt,o=a[0][0]*e+a[0][1]*t+a[0][2]*n,i=a[1][0]*e+a[1][1]*t+a[1][2]*n,l=a[2][0]*e+a[2][1]*t+a[2][2]*n,m=at,f=o/m[0],p=i/m[1],C=l/m[2],g=me(f),P=me(p),d=me(C),h=116*P-16,b=500*(g-P),v=200*(P-d);return[h,b,v]}function it(r){let e=$(r),t=oe(e);return xe(t,t,t)}function Te(r){let e=vt(r)[1];return 116*me(e/100)-16}function $(r){return 100*Et((r+16)/116)}function ye(r){return me(r/100)*116-16}function W(r){let e=r/255;return e<=.040449936?e/12.92*100:Math.pow((e+.055)/1.055,2.4)*100}function oe(r){let e=r/100,t=0;return e<=.0031308?t=e*12.92:t=1.055*Math.pow(e,1/2.4)-.055,rt(0,255,Math.round(t*255))}function st(){return at}function me(r){let e=.008856451679035631,t=24389/27;return r>e?Math.pow(r,1/3):(t*r+16)/116}function Et(r){let e=.008856451679035631,t=24389/27,n=r*r*r;return n>e?n:(116*r-16)/t}var G=class r{static make(e=st(),t=200/Math.PI*$(50)/100,n=50,a=2,o=!1){let i=e,l=i[0]*.401288+i[1]*.650173+i[2]*-.051461,m=i[0]*-.250268+i[1]*1.204414+i[2]*.045854,f=i[0]*-.002079+i[1]*.048952+i[2]*.953127,p=.8+a/10,C=p>=.9?ae(.59,.69,(p-.9)*10):ae(.525,.59,(p-.8)*10),g=o?1:p*(1-1/3.6*Math.exp((-t-42)/92));g=g>1?1:g<0?0:g;let P=p,d=[g*(100/l)+1-g,g*(100/m)+1-g,g*(100/f)+1-g],h=1/(5*t+1),b=h*h*h*h,v=1-b,F=b*t+.1*v*v*Math.cbrt(5*t),I=$(n)/e[1],R=1.48+Math.sqrt(I),L=.725/Math.pow(I,.2),B=L,w=[Math.pow(F*d[0]*l/100,.42),Math.pow(F*d[1]*m/100,.42),Math.pow(F*d[2]*f/100,.42)],H=[400*w[0]/(w[0]+27.13),400*w[1]/(w[1]+27.13),400*w[2]/(w[2]+27.13)],_=(2*H[0]+H[1]+.05*H[2])*L;return new r(I,_,L,B,C,P,d,F,Math.pow(F,.25),R)}constructor(e,t,n,a,o,i,l,m,f,p){this.n=e,this.aw=t,this.nbb=n,this.ncb=a,this.c=o,this.nc=i,this.rgbD=l,this.fl=m,this.fLRoot=f,this.z=p}};G.DEFAULT=G.make();var J=class r{constructor(e,t,n,a,o,i,l,m,f){this.hue=e,this.chroma=t,this.j=n,this.q=a,this.m=o,this.s=i,this.jstar=l,this.astar=m,this.bstar=f}distance(e){let t=this.jstar-e.jstar,n=this.astar-e.astar,a=this.bstar-e.bstar,o=Math.sqrt(t*t+n*n+a*a);return 1.41*Math.pow(o,.63)}static fromInt(e){return r.fromIntInViewingConditions(e,G.DEFAULT)}static fromIntInViewingConditions(e,t){let n=(e&16711680)>>16,a=(e&65280)>>8,o=e&255,i=W(n),l=W(a),m=W(o),f=.41233895*i+.35762064*l+.18051042*m,p=.2126*i+.7152*l+.0722*m,C=.01932141*i+.11916382*l+.95034478*m,g=.401288*f+.650173*p-.051461*C,P=-.250268*f+1.204414*p+.045854*C,d=-.002079*f+.048952*p+.953127*C,h=t.rgbD[0]*g,b=t.rgbD[1]*P,v=t.rgbD[2]*d,F=Math.pow(t.fl*Math.abs(h)/100,.42),I=Math.pow(t.fl*Math.abs(b)/100,.42),R=Math.pow(t.fl*Math.abs(v)/100,.42),L=z(h)*400*F/(F+27.13),B=z(b)*400*I/(I+27.13),w=z(v)*400*R/(R+27.13),H=(11*L+-12*B+w)/11,_=(L+B-2*w)/9,O=(20*L+20*B+21*w)/20,Z=(40*L+20*B+w)/20,se=Math.atan2(_,H)*180/Math.PI,Y=U(se),Pe=Y*Math.PI/180,be=Z*t.nbb,re=100*Math.pow(be/t.aw,t.c*t.z),Ce=4/t.c*Math.sqrt(re/100)*(t.aw+4)*t.fLRoot,Ne=Y<20.14?Y+360:Y,Ue=.25*(Math.cos(Ne*Math.PI/180+2)+3.8),ze=5e4/13*Ue*t.nc*t.ncb*Math.sqrt(H*H+_*_)/(O+.305),Se=Math.pow(ze,.9)*Math.pow(1.64-Math.pow(.29,t.n),.73),Qe=Se*Math.sqrt(re/100),et=Qe*t.fLRoot,yt=50*Math.sqrt(Se*t.c/(t.aw+4)),gt=(1+100*.007)*re/(1+.007*re),tt=1/.0228*Math.log(1+.0228*et),Pt=tt*Math.cos(Pe),bt=tt*Math.sin(Pe);return new r(Y,Qe,re,Ce,et,yt,gt,Pt,bt)}static fromJch(e,t,n){return r.fromJchInViewingConditions(e,t,n,G.DEFAULT)}static fromJchInViewingConditions(e,t,n,a){let o=4/a.c*Math.sqrt(e/100)*(a.aw+4)*a.fLRoot,i=t*a.fLRoot,l=t/Math.sqrt(e/100),m=50*Math.sqrt(l*a.c/(a.aw+4)),f=n*Math.PI/180,p=(1+100*.007)*e/(1+.007*e),C=1/.0228*Math.log(1+.0228*i),g=C*Math.cos(f),P=C*Math.sin(f);return new r(n,t,e,o,i,m,p,g,P)}static fromUcs(e,t,n){return r.fromUcsInViewingConditions(e,t,n,G.DEFAULT)}static fromUcsInViewingConditions(e,t,n,a){let o=t,i=n,l=Math.sqrt(o*o+i*i),f=(Math.exp(l*.0228)-1)/.0228/a.fLRoot,p=Math.atan2(i,o)*(180/Math.PI);p<0&&(p+=360);let C=e/(1-(e-100)*.007);return r.fromJchInViewingConditions(C,f,p,a)}toInt(){return this.viewed(G.DEFAULT)}viewed(e){let t=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(t/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),a=this.hue*Math.PI/180,o=.25*(Math.cos(a+2)+3.8),i=e.aw*Math.pow(this.j/100,1/e.c/e.z),l=o*(5e4/13)*e.nc*e.ncb,m=i/e.nbb,f=Math.sin(a),p=Math.cos(a),C=23*(m+.305)*n/(23*l+11*n*p+108*n*f),g=C*p,P=C*f,d=(460*m+451*g+288*P)/1403,h=(460*m-891*g-261*P)/1403,b=(460*m-220*g-6300*P)/1403,v=Math.max(0,27.13*Math.abs(d)/(400-Math.abs(d))),F=z(d)*(100/e.fl)*Math.pow(v,1/.42),I=Math.max(0,27.13*Math.abs(h)/(400-Math.abs(h))),R=z(h)*(100/e.fl)*Math.pow(I,1/.42),L=Math.max(0,27.13*Math.abs(b)/(400-Math.abs(b))),B=z(b)*(100/e.fl)*Math.pow(L,1/.42),w=F/e.rgbD[0],H=R/e.rgbD[1],_=B/e.rgbD[2],O=1.86206786*w-1.01125463*H+.14918677*_,Z=.38752654*w+.62144744*H-.00897398*_,te=-.0158415*w-.03412294*H+1.04996444*_;return ot(O,Z,te)}static fromXyzInViewingConditions(e,t,n,a){let o=.401288*e+.650173*t-.051461*n,i=-.250268*e+1.204414*t+.045854*n,l=-.002079*e+.048952*t+.953127*n,m=a.rgbD[0]*o,f=a.rgbD[1]*i,p=a.rgbD[2]*l,C=Math.pow(a.fl*Math.abs(m)/100,.42),g=Math.pow(a.fl*Math.abs(f)/100,.42),P=Math.pow(a.fl*Math.abs(p)/100,.42),d=z(m)*400*C/(C+27.13),h=z(f)*400*g/(g+27.13),b=z(p)*400*P/(P+27.13),v=(11*d+-12*h+b)/11,F=(d+h-2*b)/9,I=(20*d+20*h+21*b)/20,R=(40*d+20*h+b)/20,B=Math.atan2(F,v)*180/Math.PI,w=B<0?B+360:B>=360?B-360:B,H=w*Math.PI/180,_=R*a.nbb,O=100*Math.pow(_/a.aw,a.c*a.z),Z=4/a.c*Math.sqrt(O/100)*(a.aw+4)*a.fLRoot,te=w<20.14?w+360:w,se=1/4*(Math.cos(te*Math.PI/180+2)+3.8),Pe=5e4/13*se*a.nc*a.ncb*Math.sqrt(v*v+F*F)/(I+.305),be=Math.pow(Pe,.9)*Math.pow(1.64-Math.pow(.29,a.n),.73),re=be*Math.sqrt(O/100),Ce=re*a.fLRoot,Ne=50*Math.sqrt(be*a.c/(a.aw+4)),Ue=(1+100*.007)*O/(1+.007*O),_e=Math.log(1+.0228*Ce)/.0228,ze=_e*Math.cos(H),Se=_e*Math.sin(H);return new r(w,re,O,Z,Ce,Ne,Ue,ze,Se)}xyzInViewingConditions(e){let t=this.chroma===0||this.j===0?0:this.chroma/Math.sqrt(this.j/100),n=Math.pow(t/Math.pow(1.64-Math.pow(.29,e.n),.73),1/.9),a=this.hue*Math.PI/180,o=.25*(Math.cos(a+2)+3.8),i=e.aw*Math.pow(this.j/100,1/e.c/e.z),l=o*(5e4/13)*e.nc*e.ncb,m=i/e.nbb,f=Math.sin(a),p=Math.cos(a),C=23*(m+.305)*n/(23*l+11*n*p+108*n*f),g=C*p,P=C*f,d=(460*m+451*g+288*P)/1403,h=(460*m-891*g-261*P)/1403,b=(460*m-220*g-6300*P)/1403,v=Math.max(0,27.13*Math.abs(d)/(400-Math.abs(d))),F=z(d)*(100/e.fl)*Math.pow(v,1/.42),I=Math.max(0,27.13*Math.abs(h)/(400-Math.abs(h))),R=z(h)*(100/e.fl)*Math.pow(I,1/.42),L=Math.max(0,27.13*Math.abs(b)/(400-Math.abs(b))),B=z(b)*(100/e.fl)*Math.pow(L,1/.42),w=F/e.rgbD[0],H=R/e.rgbD[1],_=B/e.rgbD[2],O=1.86206786*w-1.01125463*H+.14918677*_,Z=.38752654*w+.62144744*H-.00897398*_,te=-.0158415*w-.03412294*H+1.04996444*_;return[O,Z,te]}};var j=class r{static sanitizeRadians(e){return(e+Math.PI*8)%(Math.PI*2)}static trueDelinearized(e){let t=e/100,n=0;return t<=.0031308?n=t*12.92:n=1.055*Math.pow(t,1/2.4)-.055,n*255}static chromaticAdaptation(e){let t=Math.pow(Math.abs(e),.42);return z(e)*400*t/(t+27.13)}static hueOf(e){let t=he(e,r.SCALED_DISCOUNT_FROM_LINRGB),n=r.chromaticAdaptation(t[0]),a=r.chromaticAdaptation(t[1]),o=r.chromaticAdaptation(t[2]),i=(11*n+-12*a+o)/11,l=(n+a-2*o)/9;return Math.atan2(l,i)}static areInCyclicOrder(e,t,n){let a=r.sanitizeRadians(t-e),o=r.sanitizeRadians(n-e);return a<o}static intercept(e,t,n){return(t-e)/(n-e)}static lerpPoint(e,t,n){return[e[0]+(n[0]-e[0])*t,e[1]+(n[1]-e[1])*t,e[2]+(n[2]-e[2])*t]}static setCoordinate(e,t,n,a){let o=r.intercept(e[a],t,n[a]);return r.lerpPoint(e,o,n)}static isBounded(e){return 0<=e&&e<=100}static nthVertex(e,t){let n=r.Y_FROM_LINRGB[0],a=r.Y_FROM_LINRGB[1],o=r.Y_FROM_LINRGB[2],i=t%4<=1?0:100,l=t%2===0?0:100;if(t<4){let m=i,f=l,p=(e-m*a-f*o)/n;return r.isBounded(p)?[p,m,f]:[-1,-1,-1]}else if(t<8){let m=i,f=l,p=(e-f*n-m*o)/a;return r.isBounded(p)?[f,p,m]:[-1,-1,-1]}else{let m=i,f=l,p=(e-m*n-f*a)/o;return r.isBounded(p)?[m,f,p]:[-1,-1,-1]}}static bisectToSegment(e,t){let n=[-1,-1,-1],a=n,o=0,i=0,l=!1,m=!0;for(let f=0;f<12;f++){let p=r.nthVertex(e,f);if(p[0]<0)continue;let C=r.hueOf(p);if(!l){n=p,a=p,o=C,i=C,l=!0;continue}(m||r.areInCyclicOrder(o,C,i))&&(m=!1,r.areInCyclicOrder(o,t,C)?(a=p,i=C):(n=p,o=C))}return[n,a]}static midpoint(e,t){return[(e[0]+t[0])/2,(e[1]+t[1])/2,(e[2]+t[2])/2]}static criticalPlaneBelow(e){return Math.floor(e-.5)}static criticalPlaneAbove(e){return Math.ceil(e-.5)}static bisectToLimit(e,t){let n=r.bisectToSegment(e,t),a=n[0],o=r.hueOf(a),i=n[1];for(let l=0;l<3;l++)if(a[l]!==i[l]){let m=-1,f=255;a[l]<i[l]?(m=r.criticalPlaneBelow(r.trueDelinearized(a[l])),f=r.criticalPlaneAbove(r.trueDelinearized(i[l]))):(m=r.criticalPlaneAbove(r.trueDelinearized(a[l])),f=r.criticalPlaneBelow(r.trueDelinearized(i[l])));for(let p=0;p<8&&!(Math.abs(f-m)<=1);p++){let C=Math.floor((m+f)/2),g=r.CRITICAL_PLANES[C],P=r.setCoordinate(a,g,i,l),d=r.hueOf(P);r.areInCyclicOrder(o,t,d)?(i=P,f=C):(a=P,o=d,m=C)}}return r.midpoint(a,i)}static inverseChromaticAdaptation(e){let t=Math.abs(e),n=Math.max(0,27.13*t/(400-t));return z(e)*Math.pow(n,1/.42)}static findResultByJ(e,t,n){let a=Math.sqrt(n)*11,o=G.DEFAULT,i=1/Math.pow(1.64-Math.pow(.29,o.n),.73),m=.25*(Math.cos(e+2)+3.8)*(5e4/13)*o.nc*o.ncb,f=Math.sin(e),p=Math.cos(e);for(let C=0;C<5;C++){let g=a/100,P=t===0||a===0?0:t/Math.sqrt(g),d=Math.pow(P*i,1/.9),b=o.aw*Math.pow(g,1/o.c/o.z)/o.nbb,v=23*(b+.305)*d/(23*m+11*d*p+108*d*f),F=v*p,I=v*f,R=(460*b+451*F+288*I)/1403,L=(460*b-891*F-261*I)/1403,B=(460*b-220*F-6300*I)/1403,w=r.inverseChromaticAdaptation(R),H=r.inverseChromaticAdaptation(L),_=r.inverseChromaticAdaptation(B),O=he([w,H,_],r.LINRGB_FROM_SCALED_DISCOUNT);if(O[0]<0||O[1]<0||O[2]<0)return 0;let Z=r.Y_FROM_LINRGB[0],te=r.Y_FROM_LINRGB[1],se=r.Y_FROM_LINRGB[2],Y=Z*O[0]+te*O[1]+se*O[2];if(Y<=0)return 0;if(C===4||Math.abs(Y-n)<.002)return O[0]>100.01||O[1]>100.01||O[2]>100.01?0:Ye(O);a=a-(Y-n)*a/(2*Y)}return 0}static solveToInt(e,t,n){if(t<1e-4||n<1e-4||n>99.9999)return it(n);e=U(e);let a=e/180*Math.PI,o=$(n),i=r.findResultByJ(a,t,o);if(i!==0)return i;let l=r.bisectToLimit(o,a);return Ye(l)}static solveToCam(e,t,n){return J.fromInt(r.solveToInt(e,t,n))}};j.SCALED_DISCOUNT_FROM_LINRGB=[[.001200833568784504,.002389694492170889,.0002795742885861124],[.0005891086651375999,.0029785502573438758,.0003270666104008398],[.00010146692491640572,.0005364214359186694,.0032979401770712076]];j.LINRGB_FROM_SCALED_DISCOUNT=[[1373.2198709594231,-1100.4251190754821,-7.278681089101213],[-271.815969077903,559.6580465940733,-32.46047482791194],[1.9622899599665666,-57.173814538844006,308.7233197812385]];j.Y_FROM_LINRGB=[.2126,.7152,.0722];j.CRITICAL_PLANES=[.015176349177441876,.045529047532325624,.07588174588720938,.10623444424209313,.13658714259697685,.16693984095186062,.19729253930674434,.2276452376616281,.2579979360165119,.28835063437139563,.3188300904430532,.350925934958123,.3848314933096426,.42057480301049466,.458183274052838,.4976837250274023,.5391024159806381,.5824650784040898,.6277969426914107,.6751227633498623,.7244668422128921,.775853049866786,.829304845476233,.8848452951698498,.942497089126609,1.0022825574869039,1.0642236851973577,1.1283421258858297,1.1946592148522128,1.2631959812511864,1.3339731595349034,1.407011200216447,1.4823302800086415,1.5599503113873272,1.6398909516233677,1.7221716113234105,1.8068114625156377,1.8938294463134073,1.9832442801866852,2.075074464868551,2.1693382909216234,2.2660538449872063,2.36523901573795,2.4669114995532007,2.5710888059345764,2.6777882626779785,2.7870270208169257,2.898822059350997,3.0131901897720907,3.1301480604002863,3.2497121605402226,3.3718988244681087,3.4967242352587946,3.624204428461639,3.754355295633311,3.887192587735158,4.022731918402185,4.160988767090289,4.301978482107941,4.445716283538092,4.592217266055746,4.741496401646282,4.893568542229298,5.048448422192488,5.20615066083972,5.3666897647573375,5.5300801301023865,5.696336044816294,5.865471690767354,6.037501145825082,6.212438385869475,6.390297286737924,6.571091626112461,6.7548350853498045,6.941541251256611,7.131223617812143,7.323895587840543,7.5195704746346665,7.7182615035334345,7.919981813454504,8.124744458384042,8.332562408825165,8.543448553206703,8.757415699253682,8.974476575321063,9.194643831691977,9.417930041841839,9.644347703669503,9.873909240696694,10.106627003236781,10.342513269534024,10.58158024687427,10.8238400726681,11.069304815507364,11.317986476196008,11.569896988756009,11.825048221409341,12.083451977536606,12.345119996613247,12.610063955123938,12.878295467455942,13.149826086772048,13.42466730586372,13.702830557985108,13.984327217668513,14.269168601521828,14.55736596900856,14.848930523210871,15.143873411576273,15.44220572664832,15.743938506781891,16.04908273684337,16.35764934889634,16.66964922287304,16.985093187232053,17.30399201960269,17.62635644741625,17.95219714852476,18.281524751807332,18.614349837764564,18.95068293910138,19.290534541298456,19.633915083172692,19.98083495742689,20.331304511189067,20.685334046541502,21.042933821039977,21.404114048223256,21.76888489811322,22.137256497705877,22.50923893145328,22.884842241736916,23.264076429332462,23.6469514538663,24.033477234264016,24.42366364919083,24.817520537484558,25.21505769858089,25.61628489293138,26.021211842414342,26.429848230738664,26.842203703840827,27.258287870275353,27.678110301598522,28.10168053274597,28.529008062403893,28.96010235337422,29.39497283293396,29.83362889318845,30.276079891419332,30.722335150426627,31.172403958865512,31.62629557157785,32.08401920991837,32.54558406207592,33.010999283389665,33.4802739966603,33.953417292456834,34.430438229418264,34.911345834551085,35.39614910352207,35.88485700094671,36.37747846067349,36.87402238606382,37.37449765026789,37.87891309649659,38.38727753828926,38.89959975977785,39.41588851594697,39.93615253289054,40.460400508064545,40.98864111053629,41.520882981230194,42.05713473317016,42.597404951718396,43.141702194811224,43.6900349931913,44.24241185063697,44.798841244188324,45.35933162437017,45.92389141541209,46.49252901546552,47.065252796817916,47.64207110610409,48.22299226451468,48.808024568002054,49.3971762874833,49.9904556690408,50.587870934119984,51.189430279724725,51.79514187861014,52.40501387947288,53.0190544071392,53.637271562750364,54.259673423945976,54.88626804504493,55.517063457223934,56.15206766869424,56.79128866487574,57.43473440856916,58.08241284012621,58.734331877617365,59.39049941699807,60.05092333227251,60.715611475655585,61.38457167773311,62.057811747619894,62.7353394731159,63.417162620860914,64.10328893648692,64.79372614476921,65.48848194977529,66.18756403501224,66.89098006357258,67.59873767827808,68.31084450182222,69.02730813691093,69.74813616640164,70.47333615344107,71.20291564160104,71.93688215501312,72.67524319850172,73.41800625771542,74.16517879925733,74.9167682708136,75.67278210128072,76.43322770089146,77.1981124613393,77.96744375590167,78.74122893956174,79.51947534912904,80.30219030335869,81.08938110306934,81.88105503125999,82.67721935322541,83.4778813166706,84.28304815182372,85.09272707154808,85.90692527145302,86.72564993000343,87.54890820862819,88.3767072518277,89.2090541872801,90.04595612594655,90.88742016217518,91.73345337380438,92.58406282226491,93.43925555268066,94.29903859396902,95.16341895893969,96.03240364439274,96.9059996312159,97.78421388448044,98.6670533535366,99.55452497210776];var S=class r{static from(e,t,n){return new r(j.solveToInt(e,t,n))}static fromInt(e){return new r(e)}toInt(){return this.argb}get hue(){return this.internalHue}set hue(e){this.setInternalState(j.solveToInt(e,this.internalChroma,this.internalTone))}get chroma(){return this.internalChroma}set chroma(e){this.setInternalState(j.solveToInt(this.internalHue,e,this.internalTone))}get tone(){return this.internalTone}set tone(e){this.setInternalState(j.solveToInt(this.internalHue,this.internalChroma,e))}setValue(e,t){this[e]=t}toString(){return`HCT(${this.hue.toFixed(0)}, ${this.chroma.toFixed(0)}, ${this.tone.toFixed(0)})`}static isBlue(e){return e>=250&&e<270}static isYellow(e){return e>=105&&e<125}static isCyan(e){return e>=170&&e<207}constructor(e){this.argb=e;let t=J.fromInt(e);this.internalHue=t.hue,this.internalChroma=t.chroma,this.internalTone=Te(e),this.argb=e}setInternalState(e){let t=J.fromInt(e);this.internalHue=t.hue,this.internalChroma=t.chroma,this.internalTone=Te(e),this.argb=e}inViewingConditions(e){let n=J.fromInt(this.toInt()).xyzInViewingConditions(e),a=J.fromXyzInViewingConditions(n[0],n[1],n[2],G.make());return r.from(a.hue,a.chroma,ye(n[1]))}};var V=class r{static ratioOfTones(e,t){return e=N(0,100,e),t=N(0,100,t),r.ratioOfYs($(e),$(t))}static ratioOfYs(e,t){let n=e>t?e:t,a=n===t?e:t;return(n+5)/(a+5)}static lighter(e,t){if(e<0||e>100)return-1;let n=$(e),a=t*(n+5)-5,o=r.ratioOfYs(a,n),i=Math.abs(o-t);if(o<t&&i>.04)return-1;let l=ye(a)+.4;return l<0||l>100?-1:l}static darker(e,t){if(e<0||e>100)return-1;let n=$(e),a=(n+5)/t-5,o=r.ratioOfYs(n,a),i=Math.abs(o-t);if(o<t&&i>.04)return-1;let l=ye(a)-.4;return l<0||l>100?-1:l}static lighterUnsafe(e,t){let n=r.lighter(e,t);return n<0?100:n}static darkerUnsafe(e,t){let n=r.darker(e,t);return n<0?0:n}};var ie=class r{static isDisliked(e){let t=Math.round(e.hue)>=90&&Math.round(e.hue)<=111,n=Math.round(e.chroma)>16,a=Math.round(e.tone)<65;return t&&n&&a}static fixIfDisliked(e){return r.isDisliked(e)?S.from(e.hue,e.chroma,70):e}};function Ft(r,e,t){if(r.name!==t.name)throw new Error(`Attempting to extend color ${r.name} with color ${t.name} of different name for spec version ${e}.`);if(r.isBackground!==t.isBackground)throw new Error(`Attempting to extend color ${r.name} as a ${r.isBackground?"background":"foreground"} with color ${t.name} as a ${t.isBackground?"background":"foreground"} for spec version ${e}.`)}function A(r,e,t){return Ft(r,e,t),c.fromPalette({name:r.name,palette:n=>n.specVersion===e?t.palette(n):r.palette(n),tone:n=>n.specVersion===e?t.tone(n):r.tone(n),isBackground:r.isBackground,chromaMultiplier:n=>{let a=n.specVersion===e?t.chromaMultiplier:r.chromaMultiplier;return a!==void 0?a(n):1},background:n=>{let a=n.specVersion===e?t.background:r.background;return a!==void 0?a(n):void 0},secondBackground:n=>{let a=n.specVersion===e?t.secondBackground:r.secondBackground;return a!==void 0?a(n):void 0},contrastCurve:n=>{let a=n.specVersion===e?t.contrastCurve:r.contrastCurve;return a!==void 0?a(n):void 0},toneDeltaPair:n=>{let a=n.specVersion===e?t.toneDeltaPair:r.toneDeltaPair;return a!==void 0?a(n):void 0}})}var c=class r{static fromPalette(e){var t,n,a;return new r((t=e.name)!=null?t:"",e.palette,(n=e.tone)!=null?n:r.getInitialToneFromBackground(e.background),(a=e.isBackground)!=null?a:!1,e.chromaMultiplier,e.background,e.secondBackground,e.contrastCurve,e.toneDeltaPair)}static getInitialToneFromBackground(e){return e===void 0?t=>50:t=>e(t)?e(t).getTone(t):50}constructor(e,t,n,a,o,i,l,m,f){if(this.name=e,this.palette=t,this.tone=n,this.isBackground=a,this.chromaMultiplier=o,this.background=i,this.secondBackground=l,this.contrastCurve=m,this.toneDeltaPair=f,this.hctCache=new Map,!i&&l)throw new Error(`Color ${e} has secondBackgrounddefined, but background is not defined.`);if(!i&&m)throw new Error(`Color ${e} has contrastCurvedefined, but background is not defined.`);if(i&&!m)throw new Error(`Color ${e} has backgrounddefined, but contrastCurve is not defined.`)}clone(){return r.fromPalette({name:this.name,palette:this.palette,tone:this.tone,isBackground:this.isBackground,chromaMultiplier:this.chromaMultiplier,background:this.background,secondBackground:this.secondBackground,contrastCurve:this.contrastCurve,toneDeltaPair:this.toneDeltaPair})}clearCache(){this.hctCache.clear()}getArgb(e){return this.getHct(e).toInt()}getHct(e){let t=this.hctCache.get(e);if(t!=null)return t;let n=ct(e.specVersion).getHct(e,this);return this.hctCache.size>4&&this.hctCache.clear(),this.hctCache.set(e,n),n}getTone(e){return ct(e.specVersion).getTone(e,this)}static foregroundTone(e,t){let n=V.lighterUnsafe(e,t),a=V.darkerUnsafe(e,t),o=V.ratioOfTones(n,e),i=V.ratioOfTones(a,e);if(r.tonePrefersLightForeground(e)){let m=Math.abs(o-i)<.1&&o<t&&i<t;return o>=t||o>=i||m?n:a}else return i>=t||i>=o?a:n}static tonePrefersLightForeground(e){return Math.round(e)<60}static toneAllowsLightForeground(e){return Math.round(e)<=49}static enableLightForeground(e){return r.tonePrefersLightForeground(e)&&!r.toneAllowsLightForeground(e)?49:e}},qe=class{getHct(e,t){let n=t.getTone(e);return t.palette(e).getHct(n)}getTone(e,t){let n=e.contrastLevel<0,a=t.toneDeltaPair?t.toneDeltaPair(e):void 0;if(a){let o=a.roleA,i=a.roleB,l=a.delta,m=a.polarity,f=a.stayTogether,p=m==="nearer"||m==="lighter"&&!e.isDark||m==="darker"&&e.isDark,C=p?o:i,g=p?i:o,P=t.name===C.name,d=e.isDark?1:-1,h=C.tone(e),b=g.tone(e);if(t.background&&C.contrastCurve&&g.contrastCurve){let v=t.background(e),F=C.contrastCurve(e),I=g.contrastCurve(e);if(v&&F&&I){let R=v.getTone(e),L=F.get(e.contrastLevel),B=I.get(e.contrastLevel);V.ratioOfTones(R,h)<L&&(h=c.foregroundTone(R,L)),V.ratioOfTones(R,b)<B&&(b=c.foregroundTone(R,B)),n&&(h=c.foregroundTone(R,L),b=c.foregroundTone(R,B))}}return(b-h)*d<l&&(b=N(0,100,h+l*d),(b-h)*d>=l||(h=N(0,100,b-l*d))),50<=h&&h<60?d>0?(h=60,b=Math.max(b,h+l*d)):(h=49,b=Math.min(b,h+l*d)):50<=b&&b<60&&(f?d>0?(h=60,b=Math.max(b,h+l*d)):(h=49,b=Math.min(b,h+l*d)):d>0?b=60:b=49),P?h:b}else{let o=t.tone(e);if(t.background==null||t.background(e)===void 0||t.contrastCurve==null||t.contrastCurve(e)===void 0)return o;let i=t.background(e).getTone(e),l=t.contrastCurve(e).get(e.contrastLevel);if(V.ratioOfTones(i,o)>=l||(o=c.foregroundTone(i,l)),n&&(o=c.foregroundTone(i,l)),t.isBackground&&50<=o&&o<60&&(V.ratioOfTones(49,i)>=l?o=49:o=60),t.secondBackground==null||t.secondBackground(e)===void 0)return o;let[m,f]=[t.background,t.secondBackground],[p,C]=[m(e).getTone(e),f(e).getTone(e)],[g,P]=[Math.max(p,C),Math.min(p,C)];if(V.ratioOfTones(g,o)>=l&&V.ratioOfTones(P,o)>=l)return o;let d=V.lighter(g,l),h=V.darker(P,l),b=[];return d!==-1&&b.push(d),h!==-1&&b.push(h),c.tonePrefersLightForeground(p)||c.tonePrefersLightForeground(C)?d<0?100:d:b.length===1?b[0]:h<0?0:h}}},je=class{getHct(e,t){let n=t.palette(e),a=t.getTone(e),o=n.hue,i=n.chroma*(t.chromaMultiplier?t.chromaMultiplier(e):1);return S.from(o,i,a)}getTone(e,t){let n=t.toneDeltaPair?t.toneDeltaPair(e):void 0;if(n){let a=n.roleA,o=n.roleB,i=n.polarity,l=n.constraint,m=i==="darker"||i==="relative_lighter"&&e.isDark||i==="relative_darker"&&!e.isDark?-n.delta:n.delta,f=t.name===a.name,p=f?a:o,C=f?o:a,g=p.tone(e),P=C.getTone(e),d=m*(f?1:-1);if(l==="exact"?g=N(0,100,P+d):l==="nearer"?d>0?g=N(0,100,N(P,P+d,g)):g=N(0,100,N(P+d,P,g)):l==="farther"&&(d>0?g=N(P+d,100,g):g=N(0,P+d,g)),t.background&&t.contrastCurve){let h=t.background(e),b=t.contrastCurve(e);if(h&&b){let v=h.getTone(e),F=b.get(e.contrastLevel);g=V.ratioOfTones(v,g)>=F&&e.contrastLevel>=0?g:c.foregroundTone(v,F)}}return t.isBackground&&!t.name.endsWith("_fixed_dim")&&(g>=57?g=N(65,100,g):g=N(0,49,g)),g}else{let a=t.tone(e);if(t.background==null||t.background(e)===void 0||t.contrastCurve==null||t.contrastCurve(e)===void 0)return a;let o=t.background(e).getTone(e),i=t.contrastCurve(e).get(e.contrastLevel);if(a=V.ratioOfTones(o,a)>=i&&e.contrastLevel>=0?a:c.foregroundTone(o,i),t.isBackground&&!t.name.endsWith("_fixed_dim")&&(a>=57?a=N(65,100,a):a=N(0,49,a)),t.secondBackground==null||t.secondBackground(e)===void 0)return a;let[l,m]=[t.background,t.secondBackground],[f,p]=[l(e).getTone(e),m(e).getTone(e)],[C,g]=[Math.max(f,p),Math.min(f,p)];if(V.ratioOfTones(C,a)>=i&&V.ratioOfTones(g,a)>=i)return a;let P=V.lighter(C,i),d=V.darker(g,i),h=[];return P!==-1&&h.push(P),d!==-1&&h.push(d),c.tonePrefersLightForeground(f)||c.tonePrefersLightForeground(p)?P<0?100:P:h.length===1?h[0]:d<0?0:d}}},wt=new qe,It=new je;function ct(r){return r==="2025"?It:wt}var y=class r{static fromInt(e){let t=S.fromInt(e);return r.fromHct(t)}static fromHct(e){return new r(e.hue,e.chroma,e)}static fromHueAndChroma(e,t){let n=new Xe(e,t).create();return new r(e,t,n)}constructor(e,t,n){this.hue=e,this.chroma=t,this.keyColor=n,this.cache=new Map}tone(e){let t=this.cache.get(e);return t===void 0&&(e==99&&S.isYellow(this.hue)?t=this.averageArgb(this.tone(98),this.tone(100)):t=S.from(this.hue,this.chroma,e).toInt(),this.cache.set(e,t)),t}getHct(e){return S.fromInt(this.tone(e))}averageArgb(e,t){let n=e>>>16&255,a=e>>>8&255,o=e&255,i=t>>>16&255,l=t>>>8&255,m=t&255,f=Math.round((n+i)/2),p=Math.round((a+l)/2),C=Math.round((o+m)/2);return(255<<24|(f&255)<<16|(p&255)<<8|C&255)>>>0}},Xe=class{constructor(e,t){this.hue=e,this.requestedChroma=t,this.chromaCache=new Map,this.maxChromaValue=200}create(){let a=0,o=100;for(;a<o;){let i=Math.floor((a+o)/2),l=this.maxChroma(i)<this.maxChroma(i+1);if(this.maxChroma(i)>=this.requestedChroma-.01)if(Math.abs(a-50)<Math.abs(o-50))o=i;else{if(a===i)return S.from(this.hue,this.requestedChroma,a);a=i}else l?a=i+1:o=i}return S.from(this.hue,this.requestedChroma,a)}maxChroma(e){if(this.chromaCache.has(e))return this.chromaCache.get(e);let t=S.from(this.hue,this.maxChromaValue,e).chroma;return this.chromaCache.set(e,t),t}};var ge=class r{constructor(e){this.input=e,this.hctsByTempCache=[],this.hctsByHueCache=[],this.tempsByHctCache=new Map,this.inputRelativeTemperatureCache=-1,this.complementCache=null}get hctsByTemp(){if(this.hctsByTempCache.length>0)return this.hctsByTempCache;let e=this.hctsByHue.concat([this.input]),t=this.tempsByHct;return e.sort((n,a)=>t.get(n)-t.get(a)),this.hctsByTempCache=e,e}get warmest(){return this.hctsByTemp[this.hctsByTemp.length-1]}get coldest(){return this.hctsByTemp[0]}analogous(e=5,t=12){let n=Math.round(this.input.hue),a=this.hctsByHue[n],o=this.relativeTemperature(a),i=[a],l=0;for(let d=0;d<360;d++){let h=ce(n+d),b=this.hctsByHue[h],v=this.relativeTemperature(b),F=Math.abs(v-o);o=v,l+=F}let m=1,f=l/t,p=0;for(o=this.relativeTemperature(a);i.length<t;){let d=ce(n+m),h=this.hctsByHue[d],b=this.relativeTemperature(h),v=Math.abs(b-o);p+=v;let F=i.length*f,I=p>=F,R=1;for(;I&&i.length<t;){i.push(h);let L=(i.length+R)*f;I=p>=L,R++}if(o=b,m++,m>360){for(;i.length<t;)i.push(h);break}}let C=[this.input],g=Math.floor((e-1)/2);for(let d=1;d<g+1;d++){let h=0-d;for(;h<0;)h=i.length+h;h>=i.length&&(h=h%i.length),C.splice(0,0,i[h])}let P=e-g-1;for(let d=1;d<P+1;d++){let h=d;for(;h<0;)h=i.length+h;h>=i.length&&(h=h%i.length),C.push(i[h])}return C}get complement(){if(this.complementCache!=null)return this.complementCache;let e=this.coldest.hue,t=this.tempsByHct.get(this.coldest),n=this.warmest.hue,o=this.tempsByHct.get(this.warmest)-t,i=r.isBetween(this.input.hue,e,n),l=i?n:e,m=i?e:n,f=1,p=1e3,C=this.hctsByHue[Math.round(this.input.hue)],g=1-this.inputRelativeTemperature;for(let P=0;P<=360;P+=1){let d=U(l+f*P);if(!r.isBetween(d,l,m))continue;let h=this.hctsByHue[Math.round(d)],b=(this.tempsByHct.get(h)-t)/o,v=Math.abs(g-b);v<p&&(p=v,C=h)}return this.complementCache=C,this.complementCache}relativeTemperature(e){let t=this.tempsByHct.get(this.warmest)-this.tempsByHct.get(this.coldest),n=this.tempsByHct.get(e)-this.tempsByHct.get(this.coldest);return t===0?.5:n/t}get inputRelativeTemperature(){return this.inputRelativeTemperatureCache>=0?this.inputRelativeTemperatureCache:(this.inputRelativeTemperatureCache=this.relativeTemperature(this.input),this.inputRelativeTemperatureCache)}get tempsByHct(){if(this.tempsByHctCache.size>0)return this.tempsByHctCache;let e=this.hctsByHue.concat([this.input]),t=new Map;for(let n of e)t.set(n,r.rawTemperature(n));return this.tempsByHctCache=t,t}get hctsByHue(){if(this.hctsByHueCache.length>0)return this.hctsByHueCache;let e=[];for(let t=0;t<=360;t+=1){let n=S.from(t,this.input.chroma,this.input.tone);e.push(n)}return this.hctsByHueCache=e,this.hctsByHueCache}static isBetween(e,t,n){return t<n?t<=e&&e<=n:t<=e||e<=n}static rawTemperature(e){let t=$e(e.toInt()),n=U(Math.atan2(t[2],t[1])*180/Math.PI),a=Math.sqrt(t[1]*t[1]+t[2]*t[2]);return-.5+.02*Math.pow(a,1.07)*Math.cos(U(n-50)*Math.PI/180)}};var x=class{constructor(e,t,n,a){this.low=e,this.normal=t,this.medium=n,this.high=a}get(e){return e<=-1?this.low:e<0?ae(this.low,this.normal,(e- -1)/1):e<.5?ae(this.normal,this.medium,(e-0)/.5):e<1?ae(this.medium,this.high,(e-.5)/.5):this.high}};var E=class{constructor(e,t,n,a,o,i){this.roleA=e,this.roleB=t,this.delta=n,this.polarity=a,this.stayTogether=o,this.constraint=i,this.constraint=i!=null?i:"exact"}};var s;(function(r){r[r.MONOCHROME=0]="MONOCHROME",r[r.NEUTRAL=1]="NEUTRAL",r[r.TONAL_SPOT=2]="TONAL_SPOT",r[r.VIBRANT=3]="VIBRANT",r[r.EXPRESSIVE=4]="EXPRESSIVE",r[r.FIDELITY=5]="FIDELITY",r[r.CONTENT=6]="CONTENT",r[r.RAINBOW=7]="RAINBOW",r[r.FRUIT_SALAD=8]="FRUIT_SALAD"})(s||(s={}));function le(r){return r.variant===s.FIDELITY||r.variant===s.CONTENT}function M(r){return r.variant===s.MONOCHROME}function Mt(r,e,t,n){let a=t,o=S.from(r,e,t);if(o.chroma<e){let i=o.chroma;for(;o.chroma<e;){a+=n?-1:1;let l=S.from(r,e,a);if(i>l.chroma||Math.abs(l.chroma-e)<.4)break;let m=Math.abs(l.chroma-e),f=Math.abs(o.chroma-e);m<f&&(o=l),i=Math.max(i,l.chroma)}}return a}var ke=class{primaryPaletteKeyColor(){return c.fromPalette({name:"primary_palette_key_color",palette:e=>e.primaryPalette,tone:e=>e.primaryPalette.keyColor.tone})}secondaryPaletteKeyColor(){return c.fromPalette({name:"secondary_palette_key_color",palette:e=>e.secondaryPalette,tone:e=>e.secondaryPalette.keyColor.tone})}tertiaryPaletteKeyColor(){return c.fromPalette({name:"tertiary_palette_key_color",palette:e=>e.tertiaryPalette,tone:e=>e.tertiaryPalette.keyColor.tone})}neutralPaletteKeyColor(){return c.fromPalette({name:"neutral_palette_key_color",palette:e=>e.neutralPalette,tone:e=>e.neutralPalette.keyColor.tone})}neutralVariantPaletteKeyColor(){return c.fromPalette({name:"neutral_variant_palette_key_color",palette:e=>e.neutralVariantPalette,tone:e=>e.neutralVariantPalette.keyColor.tone})}errorPaletteKeyColor(){return c.fromPalette({name:"error_palette_key_color",palette:e=>e.errorPalette,tone:e=>e.errorPalette.keyColor.tone})}background(){return c.fromPalette({name:"background",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0})}onBackground(){return c.fromPalette({name:"on_background",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>this.background(),contrastCurve:e=>new x(3,3,4.5,7)})}surface(){return c.fromPalette({name:"surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:98,isBackground:!0})}surfaceDim(){return c.fromPalette({name:"surface_dim",palette:e=>e.neutralPalette,tone:e=>e.isDark?6:new x(87,87,80,75).get(e.contrastLevel),isBackground:!0})}surfaceBright(){return c.fromPalette({name:"surface_bright",palette:e=>e.neutralPalette,tone:e=>e.isDark?new x(24,24,29,34).get(e.contrastLevel):98,isBackground:!0})}surfaceContainerLowest(){return c.fromPalette({name:"surface_container_lowest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new x(4,4,2,0).get(e.contrastLevel):100,isBackground:!0})}surfaceContainerLow(){return c.fromPalette({name:"surface_container_low",palette:e=>e.neutralPalette,tone:e=>e.isDark?new x(10,10,11,12).get(e.contrastLevel):new x(96,96,96,95).get(e.contrastLevel),isBackground:!0})}surfaceContainer(){return c.fromPalette({name:"surface_container",palette:e=>e.neutralPalette,tone:e=>e.isDark?new x(12,12,16,20).get(e.contrastLevel):new x(94,94,92,90).get(e.contrastLevel),isBackground:!0})}surfaceContainerHigh(){return c.fromPalette({name:"surface_container_high",palette:e=>e.neutralPalette,tone:e=>e.isDark?new x(17,17,21,25).get(e.contrastLevel):new x(92,92,88,85).get(e.contrastLevel),isBackground:!0})}surfaceContainerHighest(){return c.fromPalette({name:"surface_container_highest",palette:e=>e.neutralPalette,tone:e=>e.isDark?new x(22,22,26,30).get(e.contrastLevel):new x(90,90,84,80).get(e.contrastLevel),isBackground:!0})}onSurface(){return c.fromPalette({name:"on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:10,background:e=>this.highestSurface(e),contrastCurve:e=>new x(4.5,7,11,21)})}surfaceVariant(){return c.fromPalette({name:"surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:90,isBackground:!0})}onSurfaceVariant(){return c.fromPalette({name:"on_surface_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?80:30,background:e=>this.highestSurface(e),contrastCurve:e=>new x(3,4.5,7,11)})}inverseSurface(){return c.fromPalette({name:"inverse_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?90:20,isBackground:!0})}inverseOnSurface(){return c.fromPalette({name:"inverse_on_surface",palette:e=>e.neutralPalette,tone:e=>e.isDark?20:95,background:e=>this.inverseSurface(),contrastCurve:e=>new x(4.5,7,11,21)})}outline(){return c.fromPalette({name:"outline",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?60:50,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1.5,3,4.5,7)})}outlineVariant(){return c.fromPalette({name:"outline_variant",palette:e=>e.neutralVariantPalette,tone:e=>e.isDark?30:80,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1,1,3,4.5)})}shadow(){return c.fromPalette({name:"shadow",palette:e=>e.neutralPalette,tone:e=>0})}scrim(){return c.fromPalette({name:"scrim",palette:e=>e.neutralPalette,tone:e=>0})}surfaceTint(){return c.fromPalette({name:"surface_tint",palette:e=>e.primaryPalette,tone:e=>e.isDark?80:40,isBackground:!0})}primary(){return c.fromPalette({name:"primary",palette:e=>e.primaryPalette,tone:e=>M(e)?e.isDark?100:0:e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(3,4.5,7,7),toneDeltaPair:e=>new E(this.primaryContainer(),this.primary(),10,"nearer",!1)})}primaryDim(){}onPrimary(){return c.fromPalette({name:"on_primary",palette:e=>e.primaryPalette,tone:e=>M(e)?e.isDark?10:90:e.isDark?20:100,background:e=>this.primary(),contrastCurve:e=>new x(4.5,7,11,21)})}primaryContainer(){return c.fromPalette({name:"primary_container",palette:e=>e.primaryPalette,tone:e=>le(e)?e.sourceColorHct.tone:M(e)?e.isDark?85:25:e.isDark?30:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1,1,3,4.5),toneDeltaPair:e=>new E(this.primaryContainer(),this.primary(),10,"nearer",!1)})}onPrimaryContainer(){return c.fromPalette({name:"on_primary_container",palette:e=>e.primaryPalette,tone:e=>le(e)?c.foregroundTone(this.primaryContainer().tone(e),4.5):M(e)?e.isDark?0:100:e.isDark?90:30,background:e=>this.primaryContainer(),contrastCurve:e=>new x(3,4.5,7,11)})}inversePrimary(){return c.fromPalette({name:"inverse_primary",palette:e=>e.primaryPalette,tone:e=>e.isDark?40:80,background:e=>this.inverseSurface(),contrastCurve:e=>new x(3,4.5,7,7)})}secondary(){return c.fromPalette({name:"secondary",palette:e=>e.secondaryPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(3,4.5,7,7),toneDeltaPair:e=>new E(this.secondaryContainer(),this.secondary(),10,"nearer",!1)})}secondaryDim(){}onSecondary(){return c.fromPalette({name:"on_secondary",palette:e=>e.secondaryPalette,tone:e=>M(e)?e.isDark?10:100:e.isDark?20:100,background:e=>this.secondary(),contrastCurve:e=>new x(4.5,7,11,21)})}secondaryContainer(){return c.fromPalette({name:"secondary_container",palette:e=>e.secondaryPalette,tone:e=>{let t=e.isDark?30:90;return M(e)?e.isDark?30:85:le(e)?Mt(e.secondaryPalette.hue,e.secondaryPalette.chroma,t,!e.isDark):t},isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1,1,3,4.5),toneDeltaPair:e=>new E(this.secondaryContainer(),this.secondary(),10,"nearer",!1)})}onSecondaryContainer(){return c.fromPalette({name:"on_secondary_container",palette:e=>e.secondaryPalette,tone:e=>M(e)?e.isDark?90:10:le(e)?c.foregroundTone(this.secondaryContainer().tone(e),4.5):e.isDark?90:30,background:e=>this.secondaryContainer(),contrastCurve:e=>new x(3,4.5,7,11)})}tertiary(){return c.fromPalette({name:"tertiary",palette:e=>e.tertiaryPalette,tone:e=>M(e)?e.isDark?90:25:e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(3,4.5,7,7),toneDeltaPair:e=>new E(this.tertiaryContainer(),this.tertiary(),10,"nearer",!1)})}tertiaryDim(){}onTertiary(){return c.fromPalette({name:"on_tertiary",palette:e=>e.tertiaryPalette,tone:e=>M(e)?e.isDark?10:90:e.isDark?20:100,background:e=>this.tertiary(),contrastCurve:e=>new x(4.5,7,11,21)})}tertiaryContainer(){return c.fromPalette({name:"tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>{if(M(e))return e.isDark?60:49;if(!le(e))return e.isDark?30:90;let t=e.tertiaryPalette.getHct(e.sourceColorHct.tone);return ie.fixIfDisliked(t).tone},isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1,1,3,4.5),toneDeltaPair:e=>new E(this.tertiaryContainer(),this.tertiary(),10,"nearer",!1)})}onTertiaryContainer(){return c.fromPalette({name:"on_tertiary_container",palette:e=>e.tertiaryPalette,tone:e=>M(e)?e.isDark?0:100:le(e)?c.foregroundTone(this.tertiaryContainer().tone(e),4.5):e.isDark?90:30,background:e=>this.tertiaryContainer(),contrastCurve:e=>new x(3,4.5,7,11)})}error(){return c.fromPalette({name:"error",palette:e=>e.errorPalette,tone:e=>e.isDark?80:40,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(3,4.5,7,7),toneDeltaPair:e=>new E(this.errorContainer(),this.error(),10,"nearer",!1)})}errorDim(){}onError(){return c.fromPalette({name:"on_error",palette:e=>e.errorPalette,tone:e=>e.isDark?20:100,background:e=>this.error(),contrastCurve:e=>new x(4.5,7,11,21)})}errorContainer(){return c.fromPalette({name:"error_container",palette:e=>e.errorPalette,tone:e=>e.isDark?30:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1,1,3,4.5),toneDeltaPair:e=>new E(this.errorContainer(),this.error(),10,"nearer",!1)})}onErrorContainer(){return c.fromPalette({name:"on_error_container",palette:e=>e.errorPalette,tone:e=>M(e)?e.isDark?90:10:e.isDark?90:30,background:e=>this.errorContainer(),contrastCurve:e=>new x(3,4.5,7,11)})}primaryFixed(){return c.fromPalette({name:"primary_fixed",palette:e=>e.primaryPalette,tone:e=>M(e)?40:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1,1,3,4.5),toneDeltaPair:e=>new E(this.primaryFixed(),this.primaryFixedDim(),10,"lighter",!0)})}primaryFixedDim(){return c.fromPalette({name:"primary_fixed_dim",palette:e=>e.primaryPalette,tone:e=>M(e)?30:80,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1,1,3,4.5),toneDeltaPair:e=>new E(this.primaryFixed(),this.primaryFixedDim(),10,"lighter",!0)})}onPrimaryFixed(){return c.fromPalette({name:"on_primary_fixed",palette:e=>e.primaryPalette,tone:e=>M(e)?100:10,background:e=>this.primaryFixedDim(),secondBackground:e=>this.primaryFixed(),contrastCurve:e=>new x(4.5,7,11,21)})}onPrimaryFixedVariant(){return c.fromPalette({name:"on_primary_fixed_variant",palette:e=>e.primaryPalette,tone:e=>M(e)?90:30,background:e=>this.primaryFixedDim(),secondBackground:e=>this.primaryFixed(),contrastCurve:e=>new x(3,4.5,7,11)})}secondaryFixed(){return c.fromPalette({name:"secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>M(e)?80:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1,1,3,4.5),toneDeltaPair:e=>new E(this.secondaryFixed(),this.secondaryFixedDim(),10,"lighter",!0)})}secondaryFixedDim(){return c.fromPalette({name:"secondary_fixed_dim",palette:e=>e.secondaryPalette,tone:e=>M(e)?70:80,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1,1,3,4.5),toneDeltaPair:e=>new E(this.secondaryFixed(),this.secondaryFixedDim(),10,"lighter",!0)})}onSecondaryFixed(){return c.fromPalette({name:"on_secondary_fixed",palette:e=>e.secondaryPalette,tone:e=>10,background:e=>this.secondaryFixedDim(),secondBackground:e=>this.secondaryFixed(),contrastCurve:e=>new x(4.5,7,11,21)})}onSecondaryFixedVariant(){return c.fromPalette({name:"on_secondary_fixed_variant",palette:e=>e.secondaryPalette,tone:e=>M(e)?25:30,background:e=>this.secondaryFixedDim(),secondBackground:e=>this.secondaryFixed(),contrastCurve:e=>new x(3,4.5,7,11)})}tertiaryFixed(){return c.fromPalette({name:"tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>M(e)?40:90,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1,1,3,4.5),toneDeltaPair:e=>new E(this.tertiaryFixed(),this.tertiaryFixedDim(),10,"lighter",!0)})}tertiaryFixedDim(){return c.fromPalette({name:"tertiary_fixed_dim",palette:e=>e.tertiaryPalette,tone:e=>M(e)?30:80,isBackground:!0,background:e=>this.highestSurface(e),contrastCurve:e=>new x(1,1,3,4.5),toneDeltaPair:e=>new E(this.tertiaryFixed(),this.tertiaryFixedDim(),10,"lighter",!0)})}onTertiaryFixed(){return c.fromPalette({name:"on_tertiary_fixed",palette:e=>e.tertiaryPalette,tone:e=>M(e)?100:10,background:e=>this.tertiaryFixedDim(),secondBackground:e=>this.tertiaryFixed(),contrastCurve:e=>new x(4.5,7,11,21)})}onTertiaryFixedVariant(){return c.fromPalette({name:"on_tertiary_fixed_variant",palette:e=>e.tertiaryPalette,tone:e=>M(e)?90:30,background:e=>this.tertiaryFixedDim(),secondBackground:e=>this.tertiaryFixed(),contrastCurve:e=>new x(3,4.5,7,11)})}highestSurface(e){return e.isDark?this.surfaceBright():this.surfaceDim()}};function D(r,e=0,t=100,n=1){let a=lt(r.hue,r.chroma*n,100,!0);return N(e,t,a)}function ne(r,e=0,t=100){let n=lt(r.hue,r.chroma,0,!1);return N(e,t,n)}function lt(r,e,t,n){let a=t,o=S.from(r,e,a);for(;o.chroma<e&&!(t<0||t>100);){t+=n?-1:1;let i=S.from(r,e,t);o.chroma<i.chroma&&(o=i,a=t)}return a}function k(r){return r===1.5?new x(1.5,1.5,3,5.5):r===3?new x(3,3,4.5,7):r===4.5?new x(4.5,4.5,7,11):r===6?new x(6,6,7,11):r===7?new x(7,7,11,21):r===9?new x(9,9,11,21):r===11?new x(11,11,21,21):r===21?new x(21,21,21,21):new x(r,r,7,21)}var Ae=class extends ke{surface(){let e=c.fromPalette({name:"surface",palette:t=>t.neutralPalette,tone:t=>(super.surface().tone(t),t.platform==="phone"?t.isDark?4:S.isYellow(t.neutralPalette.hue)?99:t.variant===s.VIBRANT?97:98:0),isBackground:!0});return A(super.surface(),"2025",e)}surfaceDim(){let e=c.fromPalette({name:"surface_dim",palette:t=>t.neutralPalette,tone:t=>t.isDark?4:S.isYellow(t.neutralPalette.hue)?90:t.variant===s.VIBRANT?85:87,isBackground:!0,chromaMultiplier:t=>{if(!t.isDark){if(t.variant===s.NEUTRAL)return 2.5;if(t.variant===s.TONAL_SPOT)return 1.7;if(t.variant===s.EXPRESSIVE)return S.isYellow(t.neutralPalette.hue)?2.7:1.75;if(t.variant===s.VIBRANT)return 1.36}return 1}});return A(super.surfaceDim(),"2025",e)}surfaceBright(){let e=c.fromPalette({name:"surface_bright",palette:t=>t.neutralPalette,tone:t=>t.isDark?18:S.isYellow(t.neutralPalette.hue)?99:t.variant===s.VIBRANT?97:98,isBackground:!0,chromaMultiplier:t=>{if(t.isDark){if(t.variant===s.NEUTRAL)return 2.5;if(t.variant===s.TONAL_SPOT)return 1.7;if(t.variant===s.EXPRESSIVE)return S.isYellow(t.neutralPalette.hue)?2.7:1.75;if(t.variant===s.VIBRANT)return 1.36}return 1}});return A(super.surfaceBright(),"2025",e)}surfaceContainerLowest(){let e=c.fromPalette({name:"surface_container_lowest",palette:t=>t.neutralPalette,tone:t=>t.isDark?0:100,isBackground:!0});return A(super.surfaceContainerLowest(),"2025",e)}surfaceContainerLow(){let e=c.fromPalette({name:"surface_container_low",palette:t=>t.neutralPalette,tone:t=>t.platform==="phone"?t.isDark?6:S.isYellow(t.neutralPalette.hue)?98:t.variant===s.VIBRANT?95:96:15,isBackground:!0,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===s.NEUTRAL)return 1.3;if(t.variant===s.TONAL_SPOT)return 1.25;if(t.variant===s.EXPRESSIVE)return S.isYellow(t.neutralPalette.hue)?1.3:1.15;if(t.variant===s.VIBRANT)return 1.08}return 1}});return A(super.surfaceContainerLow(),"2025",e)}surfaceContainer(){let e=c.fromPalette({name:"surface_container",palette:t=>t.neutralPalette,tone:t=>t.platform==="phone"?t.isDark?9:S.isYellow(t.neutralPalette.hue)?96:t.variant===s.VIBRANT?92:94:20,isBackground:!0,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===s.NEUTRAL)return 1.6;if(t.variant===s.TONAL_SPOT)return 1.4;if(t.variant===s.EXPRESSIVE)return S.isYellow(t.neutralPalette.hue)?1.6:1.3;if(t.variant===s.VIBRANT)return 1.15}return 1}});return A(super.surfaceContainer(),"2025",e)}surfaceContainerHigh(){let e=c.fromPalette({name:"surface_container_high",palette:t=>t.neutralPalette,tone:t=>t.platform==="phone"?t.isDark?12:S.isYellow(t.neutralPalette.hue)?94:t.variant===s.VIBRANT?90:92:25,isBackground:!0,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===s.NEUTRAL)return 1.9;if(t.variant===s.TONAL_SPOT)return 1.5;if(t.variant===s.EXPRESSIVE)return S.isYellow(t.neutralPalette.hue)?1.95:1.45;if(t.variant===s.VIBRANT)return 1.22}return 1}});return A(super.surfaceContainerHigh(),"2025",e)}surfaceContainerHighest(){let e=c.fromPalette({name:"surface_container_highest",palette:t=>t.neutralPalette,tone:t=>t.isDark?15:S.isYellow(t.neutralPalette.hue)?92:t.variant===s.VIBRANT?88:90,isBackground:!0,chromaMultiplier:t=>t.variant===s.NEUTRAL?2.2:t.variant===s.TONAL_SPOT?1.7:t.variant===s.EXPRESSIVE?S.isYellow(t.neutralPalette.hue)?2.3:1.6:t.variant===s.VIBRANT?1.29:1});return A(super.surfaceContainerHighest(),"2025",e)}onSurface(){let e=c.fromPalette({name:"on_surface",palette:t=>t.neutralPalette,tone:t=>t.variant===s.VIBRANT?D(t.neutralPalette,0,100,1.1):c.getInitialToneFromBackground(n=>n.platform==="phone"?this.highestSurface(n):this.surfaceContainerHigh())(t),chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===s.NEUTRAL)return 2.2;if(t.variant===s.TONAL_SPOT)return 1.7;if(t.variant===s.EXPRESSIVE)return S.isYellow(t.neutralPalette.hue)?t.isDark?3:2.3:1.6}return 1},background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.isDark&&t.platform==="phone"?k(11):k(9)});return A(super.onSurface(),"2025",e)}onSurfaceVariant(){let e=c.fromPalette({name:"on_surface_variant",palette:t=>t.neutralPalette,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===s.NEUTRAL)return 2.2;if(t.variant===s.TONAL_SPOT)return 1.7;if(t.variant===s.EXPRESSIVE)return S.isYellow(t.neutralPalette.hue)?t.isDark?3:2.3:1.6}return 1},background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?t.isDark?k(6):k(4.5):k(7)});return A(super.onSurfaceVariant(),"2025",e)}outline(){let e=c.fromPalette({name:"outline",palette:t=>t.neutralPalette,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===s.NEUTRAL)return 2.2;if(t.variant===s.TONAL_SPOT)return 1.7;if(t.variant===s.EXPRESSIVE)return S.isYellow(t.neutralPalette.hue)?t.isDark?3:2.3:1.6}return 1},background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?k(3):k(4.5)});return A(super.outline(),"2025",e)}outlineVariant(){let e=c.fromPalette({name:"outline_variant",palette:t=>t.neutralPalette,chromaMultiplier:t=>{if(t.platform==="phone"){if(t.variant===s.NEUTRAL)return 2.2;if(t.variant===s.TONAL_SPOT)return 1.7;if(t.variant===s.EXPRESSIVE)return S.isYellow(t.neutralPalette.hue)?t.isDark?3:2.3:1.6}return 1},background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?k(1.5):k(3)});return A(super.outlineVariant(),"2025",e)}inverseSurface(){let e=c.fromPalette({name:"inverse_surface",palette:t=>t.neutralPalette,tone:t=>t.isDark?98:4,isBackground:!0});return A(super.inverseSurface(),"2025",e)}inverseOnSurface(){let e=c.fromPalette({name:"inverse_on_surface",palette:t=>t.neutralPalette,background:t=>this.inverseSurface(),contrastCurve:t=>k(7)});return A(super.inverseOnSurface(),"2025",e)}primary(){let e=c.fromPalette({name:"primary",palette:t=>t.primaryPalette,tone:t=>t.variant===s.NEUTRAL?t.platform==="phone"?t.isDark?80:40:90:t.variant===s.TONAL_SPOT?t.platform==="phone"?t.isDark?80:D(t.primaryPalette):D(t.primaryPalette,0,90):t.variant===s.EXPRESSIVE?t.platform==="phone"?D(t.primaryPalette,0,S.isYellow(t.primaryPalette.hue)?25:S.isCyan(t.primaryPalette.hue)?88:98):D(t.primaryPalette):t.platform==="phone"?D(t.primaryPalette,0,S.isCyan(t.primaryPalette.hue)?88:98):D(t.primaryPalette),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?k(4.5):k(7),toneDeltaPair:t=>t.platform==="phone"?new E(this.primaryContainer(),this.primary(),5,"relative_lighter",!0,"farther"):void 0});return A(super.primary(),"2025",e)}primaryDim(){return c.fromPalette({name:"primary_dim",palette:e=>e.primaryPalette,tone:e=>e.variant===s.NEUTRAL?85:e.variant===s.TONAL_SPOT?D(e.primaryPalette,0,90):D(e.primaryPalette),isBackground:!0,background:e=>this.surfaceContainerHigh(),contrastCurve:e=>k(4.5),toneDeltaPair:e=>new E(this.primaryDim(),this.primary(),5,"darker",!0,"farther")})}onPrimary(){let e=c.fromPalette({name:"on_primary",palette:t=>t.primaryPalette,background:t=>t.platform==="phone"?this.primary():this.primaryDim(),contrastCurve:t=>t.platform==="phone"?k(6):k(7)});return A(super.onPrimary(),"2025",e)}primaryContainer(){let e=c.fromPalette({name:"primary_container",palette:t=>t.primaryPalette,tone:t=>t.platform==="watch"?30:t.variant===s.NEUTRAL?t.isDark?30:90:t.variant===s.TONAL_SPOT?t.isDark?ne(t.primaryPalette,35,93):D(t.primaryPalette,0,90):t.variant===s.EXPRESSIVE?t.isDark?D(t.primaryPalette,30,93):D(t.primaryPalette,78,S.isCyan(t.primaryPalette.hue)?88:90):t.isDark?ne(t.primaryPalette,66,93):D(t.primaryPalette,66,S.isCyan(t.primaryPalette.hue)?88:93),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,toneDeltaPair:t=>t.platform==="phone"?void 0:new E(this.primaryContainer(),this.primaryDim(),10,"darker",!0,"farther"),contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?k(1.5):void 0});return A(super.primaryContainer(),"2025",e)}onPrimaryContainer(){let e=c.fromPalette({name:"on_primary_container",palette:t=>t.primaryPalette,background:t=>this.primaryContainer(),contrastCurve:t=>t.platform==="phone"?k(6):k(7)});return A(super.onPrimaryContainer(),"2025",e)}primaryFixed(){let e=c.fromPalette({name:"primary_fixed",palette:t=>t.primaryPalette,tone:t=>{let n=Object.assign({},t,{isDark:!1,contrastLevel:0});return this.primaryContainer().getTone(n)},isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?k(1.5):void 0});return A(super.primaryFixed(),"2025",e)}primaryFixedDim(){let e=c.fromPalette({name:"primary_fixed_dim",palette:t=>t.primaryPalette,tone:t=>this.primaryFixed().getTone(t),isBackground:!0,toneDeltaPair:t=>new E(this.primaryFixedDim(),this.primaryFixed(),5,"darker",!0,"exact")});return A(super.primaryFixedDim(),"2025",e)}onPrimaryFixed(){let e=c.fromPalette({name:"on_primary_fixed",palette:t=>t.primaryPalette,background:t=>this.primaryFixedDim(),contrastCurve:t=>k(7)});return A(super.onPrimaryFixed(),"2025",e)}onPrimaryFixedVariant(){let e=c.fromPalette({name:"on_primary_fixed_variant",palette:t=>t.primaryPalette,background:t=>this.primaryFixedDim(),contrastCurve:t=>k(4.5)});return A(super.onPrimaryFixedVariant(),"2025",e)}inversePrimary(){let e=c.fromPalette({name:"inverse_primary",palette:t=>t.primaryPalette,tone:t=>D(t.primaryPalette),background:t=>this.inverseSurface(),contrastCurve:t=>t.platform==="phone"?k(6):k(7)});return A(super.inversePrimary(),"2025",e)}secondary(){let e=c.fromPalette({name:"secondary",palette:t=>t.secondaryPalette,tone:t=>t.platform==="watch"?t.variant===s.NEUTRAL?90:D(t.secondaryPalette,0,90):t.variant===s.NEUTRAL?t.isDark?ne(t.secondaryPalette,0,98):D(t.secondaryPalette):t.variant===s.VIBRANT?D(t.secondaryPalette,0,t.isDark?90:98):t.isDark?80:D(t.secondaryPalette),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?k(4.5):k(7),toneDeltaPair:t=>t.platform==="phone"?new E(this.secondaryContainer(),this.secondary(),5,"relative_lighter",!0,"farther"):void 0});return A(super.secondary(),"2025",e)}secondaryDim(){return c.fromPalette({name:"secondary_dim",palette:e=>e.secondaryPalette,tone:e=>e.variant===s.NEUTRAL?85:D(e.secondaryPalette,0,90),isBackground:!0,background:e=>this.surfaceContainerHigh(),contrastCurve:e=>k(4.5),toneDeltaPair:e=>new E(this.secondaryDim(),this.secondary(),5,"darker",!0,"farther")})}onSecondary(){let e=c.fromPalette({name:"on_secondary",palette:t=>t.secondaryPalette,background:t=>t.platform==="phone"?this.secondary():this.secondaryDim(),contrastCurve:t=>t.platform==="phone"?k(6):k(7)});return A(super.onSecondary(),"2025",e)}secondaryContainer(){let e=c.fromPalette({name:"secondary_container",palette:t=>t.secondaryPalette,tone:t=>t.platform==="watch"?30:t.variant===s.VIBRANT?t.isDark?ne(t.secondaryPalette,30,40):D(t.secondaryPalette,84,90):t.variant===s.EXPRESSIVE?t.isDark?15:D(t.secondaryPalette,90,95):t.isDark?25:90,isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,toneDeltaPair:t=>t.platform==="watch"?new E(this.secondaryContainer(),this.secondaryDim(),10,"darker",!0,"farther"):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?k(1.5):void 0});return A(super.secondaryContainer(),"2025",e)}onSecondaryContainer(){let e=c.fromPalette({name:"on_secondary_container",palette:t=>t.secondaryPalette,background:t=>this.secondaryContainer(),contrastCurve:t=>t.platform==="phone"?k(6):k(7)});return A(super.onSecondaryContainer(),"2025",e)}secondaryFixed(){let e=c.fromPalette({name:"secondary_fixed",palette:t=>t.secondaryPalette,tone:t=>{let n=Object.assign({},t,{isDark:!1,contrastLevel:0});return this.secondaryContainer().getTone(n)},isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?k(1.5):void 0});return A(super.secondaryFixed(),"2025",e)}secondaryFixedDim(){let e=c.fromPalette({name:"secondary_fixed_dim",palette:t=>t.secondaryPalette,tone:t=>this.secondaryFixed().getTone(t),isBackground:!0,toneDeltaPair:t=>new E(this.secondaryFixedDim(),this.secondaryFixed(),5,"darker",!0,"exact")});return A(super.secondaryFixedDim(),"2025",e)}onSecondaryFixed(){let e=c.fromPalette({name:"on_secondary_fixed",palette:t=>t.secondaryPalette,background:t=>this.secondaryFixedDim(),contrastCurve:t=>k(7)});return A(super.onSecondaryFixed(),"2025",e)}onSecondaryFixedVariant(){let e=c.fromPalette({name:"on_secondary_fixed_variant",palette:t=>t.secondaryPalette,background:t=>this.secondaryFixedDim(),contrastCurve:t=>k(4.5)});return A(super.onSecondaryFixedVariant(),"2025",e)}tertiary(){let e=c.fromPalette({name:"tertiary",palette:t=>t.tertiaryPalette,tone:t=>t.platform==="watch"?t.variant===s.TONAL_SPOT?D(t.tertiaryPalette,0,90):D(t.tertiaryPalette):t.variant===s.EXPRESSIVE||t.variant===s.VIBRANT?D(t.tertiaryPalette,0,S.isCyan(t.tertiaryPalette.hue)?88:t.isDark?98:100):t.isDark?D(t.tertiaryPalette,0,98):D(t.tertiaryPalette),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?k(4.5):k(7),toneDeltaPair:t=>t.platform==="phone"?new E(this.tertiaryContainer(),this.tertiary(),5,"relative_lighter",!0,"farther"):void 0});return A(super.tertiary(),"2025",e)}tertiaryDim(){return c.fromPalette({name:"tertiary_dim",palette:e=>e.tertiaryPalette,tone:e=>e.variant===s.TONAL_SPOT?D(e.tertiaryPalette,0,90):D(e.tertiaryPalette),isBackground:!0,background:e=>this.surfaceContainerHigh(),contrastCurve:e=>k(4.5),toneDeltaPair:e=>new E(this.tertiaryDim(),this.tertiary(),5,"darker",!0,"farther")})}onTertiary(){let e=c.fromPalette({name:"on_tertiary",palette:t=>t.tertiaryPalette,background:t=>t.platform==="phone"?this.tertiary():this.tertiaryDim(),contrastCurve:t=>t.platform==="phone"?k(6):k(7)});return A(super.onTertiary(),"2025",e)}tertiaryContainer(){let e=c.fromPalette({name:"tertiary_container",palette:t=>t.tertiaryPalette,tone:t=>t.platform==="watch"?t.variant===s.TONAL_SPOT?D(t.tertiaryPalette,0,90):D(t.tertiaryPalette):t.variant===s.NEUTRAL?t.isDark?D(t.tertiaryPalette,0,93):D(t.tertiaryPalette,0,96):t.variant===s.TONAL_SPOT?D(t.tertiaryPalette,0,t.isDark?93:100):t.variant===s.EXPRESSIVE?D(t.tertiaryPalette,75,S.isCyan(t.tertiaryPalette.hue)?88:t.isDark?93:100):t.isDark?D(t.tertiaryPalette,0,93):D(t.tertiaryPalette,72,100),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,toneDeltaPair:t=>t.platform==="watch"?new E(this.tertiaryContainer(),this.tertiaryDim(),10,"darker",!0,"farther"):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?k(1.5):void 0});return A(super.tertiaryContainer(),"2025",e)}onTertiaryContainer(){let e=c.fromPalette({name:"on_tertiary_container",palette:t=>t.tertiaryPalette,background:t=>this.tertiaryContainer(),contrastCurve:t=>t.platform==="phone"?k(6):k(7)});return A(super.onTertiaryContainer(),"2025",e)}tertiaryFixed(){let e=c.fromPalette({name:"tertiary_fixed",palette:t=>t.tertiaryPalette,tone:t=>{let n=Object.assign({},t,{isDark:!1,contrastLevel:0});return this.tertiaryContainer().getTone(n)},isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?k(1.5):void 0});return A(super.tertiaryFixed(),"2025",e)}tertiaryFixedDim(){let e=c.fromPalette({name:"tertiary_fixed_dim",palette:t=>t.tertiaryPalette,tone:t=>this.tertiaryFixed().getTone(t),isBackground:!0,toneDeltaPair:t=>new E(this.tertiaryFixedDim(),this.tertiaryFixed(),5,"darker",!0,"exact")});return A(super.tertiaryFixedDim(),"2025",e)}onTertiaryFixed(){let e=c.fromPalette({name:"on_tertiary_fixed",palette:t=>t.tertiaryPalette,background:t=>this.tertiaryFixedDim(),contrastCurve:t=>k(7)});return A(super.onTertiaryFixed(),"2025",e)}onTertiaryFixedVariant(){let e=c.fromPalette({name:"on_tertiary_fixed_variant",palette:t=>t.tertiaryPalette,background:t=>this.tertiaryFixedDim(),contrastCurve:t=>k(4.5)});return A(super.onTertiaryFixedVariant(),"2025",e)}error(){let e=c.fromPalette({name:"error",palette:t=>t.errorPalette,tone:t=>t.platform==="phone"?t.isDark?ne(t.errorPalette,0,98):D(t.errorPalette):ne(t.errorPalette),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):this.surfaceContainerHigh(),contrastCurve:t=>t.platform==="phone"?k(4.5):k(7),toneDeltaPair:t=>t.platform==="phone"?new E(this.errorContainer(),this.error(),5,"relative_lighter",!0,"farther"):void 0});return A(super.error(),"2025",e)}errorDim(){return c.fromPalette({name:"error_dim",palette:e=>e.errorPalette,tone:e=>ne(e.errorPalette),isBackground:!0,background:e=>this.surfaceContainerHigh(),contrastCurve:e=>k(4.5),toneDeltaPair:e=>new E(this.errorDim(),this.error(),5,"darker",!0,"farther")})}onError(){let e=c.fromPalette({name:"on_error",palette:t=>t.errorPalette,background:t=>t.platform==="phone"?this.error():this.errorDim(),contrastCurve:t=>t.platform==="phone"?k(6):k(7)});return A(super.onError(),"2025",e)}errorContainer(){let e=c.fromPalette({name:"error_container",palette:t=>t.errorPalette,tone:t=>t.platform==="watch"?30:t.isDark?ne(t.errorPalette,30,93):D(t.errorPalette,0,90),isBackground:!0,background:t=>t.platform==="phone"?this.highestSurface(t):void 0,toneDeltaPair:t=>t.platform==="watch"?new E(this.errorContainer(),this.errorDim(),10,"darker",!0,"farther"):void 0,contrastCurve:t=>t.platform==="phone"&&t.contrastLevel>0?k(1.5):void 0});return A(super.errorContainer(),"2025",e)}onErrorContainer(){let e=c.fromPalette({name:"on_error_container",palette:t=>t.errorPalette,background:t=>this.errorContainer(),contrastCurve:t=>t.platform==="phone"?k(4.5):k(7)});return A(super.onErrorContainer(),"2025",e)}surfaceVariant(){let e=Object.assign(this.surfaceContainerHighest().clone(),{name:"surface_variant"});return A(super.surfaceVariant(),"2025",e)}surfaceTint(){let e=Object.assign(this.primary().clone(),{name:"surface_tint"});return A(super.surfaceTint(),"2025",e)}background(){let e=Object.assign(this.surface().clone(),{name:"background"});return A(super.background(),"2025",e)}onBackground(){let e=Object.assign(this.onSurface().clone(),{name:"on_background",tone:t=>t.platform==="watch"?100:this.onSurface().getTone(t)});return A(super.onBackground(),"2025",e)}};var u=class r{constructor(){this.allColors=[this.background(),this.onBackground(),this.surface(),this.surfaceDim(),this.surfaceBright(),this.surfaceContainerLowest(),this.surfaceContainerLow(),this.surfaceContainer(),this.surfaceContainerHigh(),this.surfaceContainerHighest(),this.onSurface(),this.onSurfaceVariant(),this.outline(),this.outlineVariant(),this.inverseSurface(),this.inverseOnSurface(),this.primary(),this.primaryDim(),this.onPrimary(),this.primaryContainer(),this.onPrimaryContainer(),this.primaryFixed(),this.primaryFixedDim(),this.onPrimaryFixed(),this.onPrimaryFixedVariant(),this.inversePrimary(),this.secondary(),this.secondaryDim(),this.onSecondary(),this.secondaryContainer(),this.onSecondaryContainer(),this.secondaryFixed(),this.secondaryFixedDim(),this.onSecondaryFixed(),this.onSecondaryFixedVariant(),this.tertiary(),this.tertiaryDim(),this.onTertiary(),this.tertiaryContainer(),this.onTertiaryContainer(),this.tertiaryFixed(),this.tertiaryFixedDim(),this.onTertiaryFixed(),this.onTertiaryFixedVariant(),this.error(),this.errorDim(),this.onError(),this.errorContainer(),this.onErrorContainer()].filter(e=>e!==void 0)}highestSurface(e){return r.colorSpec.highestSurface(e)}primaryPaletteKeyColor(){return r.colorSpec.primaryPaletteKeyColor()}secondaryPaletteKeyColor(){return r.colorSpec.secondaryPaletteKeyColor()}tertiaryPaletteKeyColor(){return r.colorSpec.tertiaryPaletteKeyColor()}neutralPaletteKeyColor(){return r.colorSpec.neutralPaletteKeyColor()}neutralVariantPaletteKeyColor(){return r.colorSpec.neutralVariantPaletteKeyColor()}errorPaletteKeyColor(){return r.colorSpec.errorPaletteKeyColor()}background(){return r.colorSpec.background()}onBackground(){return r.colorSpec.onBackground()}surface(){return r.colorSpec.surface()}surfaceDim(){return r.colorSpec.surfaceDim()}surfaceBright(){return r.colorSpec.surfaceBright()}surfaceContainerLowest(){return r.colorSpec.surfaceContainerLowest()}surfaceContainerLow(){return r.colorSpec.surfaceContainerLow()}surfaceContainer(){return r.colorSpec.surfaceContainer()}surfaceContainerHigh(){return r.colorSpec.surfaceContainerHigh()}surfaceContainerHighest(){return r.colorSpec.surfaceContainerHighest()}onSurface(){return r.colorSpec.onSurface()}surfaceVariant(){return r.colorSpec.surfaceVariant()}onSurfaceVariant(){return r.colorSpec.onSurfaceVariant()}outline(){return r.colorSpec.outline()}outlineVariant(){return r.colorSpec.outlineVariant()}inverseSurface(){return r.colorSpec.inverseSurface()}inverseOnSurface(){return r.colorSpec.inverseOnSurface()}shadow(){return r.colorSpec.shadow()}scrim(){return r.colorSpec.scrim()}surfaceTint(){return r.colorSpec.surfaceTint()}primary(){return r.colorSpec.primary()}primaryDim(){return r.colorSpec.primaryDim()}onPrimary(){return r.colorSpec.onPrimary()}primaryContainer(){return r.colorSpec.primaryContainer()}onPrimaryContainer(){return r.colorSpec.onPrimaryContainer()}inversePrimary(){return r.colorSpec.inversePrimary()}primaryFixed(){return r.colorSpec.primaryFixed()}primaryFixedDim(){return r.colorSpec.primaryFixedDim()}onPrimaryFixed(){return r.colorSpec.onPrimaryFixed()}onPrimaryFixedVariant(){return r.colorSpec.onPrimaryFixedVariant()}secondary(){return r.colorSpec.secondary()}secondaryDim(){return r.colorSpec.secondaryDim()}onSecondary(){return r.colorSpec.onSecondary()}secondaryContainer(){return r.colorSpec.secondaryContainer()}onSecondaryContainer(){return r.colorSpec.onSecondaryContainer()}secondaryFixed(){return r.colorSpec.secondaryFixed()}secondaryFixedDim(){return r.colorSpec.secondaryFixedDim()}onSecondaryFixed(){return r.colorSpec.onSecondaryFixed()}onSecondaryFixedVariant(){return r.colorSpec.onSecondaryFixedVariant()}tertiary(){return r.colorSpec.tertiary()}tertiaryDim(){return r.colorSpec.tertiaryDim()}onTertiary(){return r.colorSpec.onTertiary()}tertiaryContainer(){return r.colorSpec.tertiaryContainer()}onTertiaryContainer(){return r.colorSpec.onTertiaryContainer()}tertiaryFixed(){return r.colorSpec.tertiaryFixed()}tertiaryFixedDim(){return r.colorSpec.tertiaryFixedDim()}onTertiaryFixed(){return r.colorSpec.onTertiaryFixed()}onTertiaryFixedVariant(){return r.colorSpec.onTertiaryFixedVariant()}error(){return r.colorSpec.error()}errorDim(){return r.colorSpec.errorDim()}onError(){return r.colorSpec.onError()}errorContainer(){return r.colorSpec.errorContainer()}onErrorContainer(){return r.colorSpec.onErrorContainer()}static highestSurface(e){return r.colorSpec.highestSurface(e)}};u.contentAccentToneDelta=15;u.colorSpec=new Ae;u.primaryPaletteKeyColor=u.colorSpec.primaryPaletteKeyColor();u.secondaryPaletteKeyColor=u.colorSpec.secondaryPaletteKeyColor();u.tertiaryPaletteKeyColor=u.colorSpec.tertiaryPaletteKeyColor();u.neutralPaletteKeyColor=u.colorSpec.neutralPaletteKeyColor();u.neutralVariantPaletteKeyColor=u.colorSpec.neutralVariantPaletteKeyColor();u.background=u.colorSpec.background();u.onBackground=u.colorSpec.onBackground();u.surface=u.colorSpec.surface();u.surfaceDim=u.colorSpec.surfaceDim();u.surfaceBright=u.colorSpec.surfaceBright();u.surfaceContainerLowest=u.colorSpec.surfaceContainerLowest();u.surfaceContainerLow=u.colorSpec.surfaceContainerLow();u.surfaceContainer=u.colorSpec.surfaceContainer();u.surfaceContainerHigh=u.colorSpec.surfaceContainerHigh();u.surfaceContainerHighest=u.colorSpec.surfaceContainerHighest();u.onSurface=u.colorSpec.onSurface();u.surfaceVariant=u.colorSpec.surfaceVariant();u.onSurfaceVariant=u.colorSpec.onSurfaceVariant();u.inverseSurface=u.colorSpec.inverseSurface();u.inverseOnSurface=u.colorSpec.inverseOnSurface();u.outline=u.colorSpec.outline();u.outlineVariant=u.colorSpec.outlineVariant();u.shadow=u.colorSpec.shadow();u.scrim=u.colorSpec.scrim();u.surfaceTint=u.colorSpec.surfaceTint();u.primary=u.colorSpec.primary();u.onPrimary=u.colorSpec.onPrimary();u.primaryContainer=u.colorSpec.primaryContainer();u.onPrimaryContainer=u.colorSpec.onPrimaryContainer();u.inversePrimary=u.colorSpec.inversePrimary();u.secondary=u.colorSpec.secondary();u.onSecondary=u.colorSpec.onSecondary();u.secondaryContainer=u.colorSpec.secondaryContainer();u.onSecondaryContainer=u.colorSpec.onSecondaryContainer();u.tertiary=u.colorSpec.tertiary();u.onTertiary=u.colorSpec.onTertiary();u.tertiaryContainer=u.colorSpec.tertiaryContainer();u.onTertiaryContainer=u.colorSpec.onTertiaryContainer();u.error=u.colorSpec.error();u.onError=u.colorSpec.onError();u.errorContainer=u.colorSpec.errorContainer();u.onErrorContainer=u.colorSpec.onErrorContainer();u.primaryFixed=u.colorSpec.primaryFixed();u.primaryFixedDim=u.colorSpec.primaryFixedDim();u.onPrimaryFixed=u.colorSpec.onPrimaryFixed();u.onPrimaryFixedVariant=u.colorSpec.onPrimaryFixedVariant();u.secondaryFixed=u.colorSpec.secondaryFixed();u.secondaryFixedDim=u.colorSpec.secondaryFixedDim();u.onSecondaryFixed=u.colorSpec.onSecondaryFixed();u.onSecondaryFixedVariant=u.colorSpec.onSecondaryFixedVariant();u.tertiaryFixed=u.colorSpec.tertiaryFixed();u.tertiaryFixedDim=u.colorSpec.tertiaryFixedDim();u.onTertiaryFixed=u.colorSpec.onTertiaryFixed();u.onTertiaryFixedVariant=u.colorSpec.onTertiaryFixedVariant();var T=class r{static maybeFallbackSpecVersion(e,t){switch(t){case s.EXPRESSIVE:case s.VIBRANT:case s.TONAL_SPOT:case s.NEUTRAL:return e;default:return"2021"}}constructor(e){var t,n,a,o,i,l,m,f,p;this.sourceColorArgb=e.sourceColorHct.toInt(),this.variant=e.variant,this.contrastLevel=e.contrastLevel,this.isDark=e.isDark,this.platform=(t=e.platform)!=null?t:"phone",this.specVersion=r.maybeFallbackSpecVersion((n=e.specVersion)!=null?n:"2021",this.variant),this.sourceColorHct=e.sourceColorHct,this.primaryPalette=(a=e.primaryPalette)!=null?a:ue(this.specVersion).getPrimaryPalette(this.variant,e.sourceColorHct,this.isDark,this.platform,this.contrastLevel),this.secondaryPalette=(o=e.secondaryPalette)!=null?o:ue(this.specVersion).getSecondaryPalette(this.variant,e.sourceColorHct,this.isDark,this.platform,this.contrastLevel),this.tertiaryPalette=(i=e.tertiaryPalette)!=null?i:ue(this.specVersion).getTertiaryPalette(this.variant,e.sourceColorHct,this.isDark,this.platform,this.contrastLevel),this.neutralPalette=(l=e.neutralPalette)!=null?l:ue(this.specVersion).getNeutralPalette(this.variant,e.sourceColorHct,this.isDark,this.platform,this.contrastLevel),this.neutralVariantPalette=(m=e.neutralVariantPalette)!=null?m:ue(this.specVersion).getNeutralVariantPalette(this.variant,e.sourceColorHct,this.isDark,this.platform,this.contrastLevel),this.errorPalette=(p=(f=e.errorPalette)!=null?f:ue(this.specVersion).getErrorPalette(this.variant,e.sourceColorHct,this.isDark,this.platform,this.contrastLevel))!=null?p:y.fromHueAndChroma(25,84),this.colors=new u}toString(){return`Scheme: variant=${s[this.variant]}, mode=${this.isDark?"dark":"light"}, platform=${this.platform}, contrastLevel=${this.contrastLevel.toFixed(1)}, seed=${this.sourceColorHct.toString()}, specVersion=${this.specVersion}`}static getPiecewiseHue(e,t,n){let a=Math.min(t.length-1,n.length),o=e.hue;for(let i=0;i<a;i++)if(o>=t[i]&&o<t[i+1])return U(n[i]);return o}static getRotatedHue(e,t,n){let a=r.getPiecewiseHue(e,t,n);return Math.min(t.length-1,n.length)<=0&&(a=0),U(e.hue+a)}getArgb(e){return e.getArgb(this)}getHct(e){return e.getHct(this)}get primaryPaletteKeyColor(){return this.getArgb(this.colors.primaryPaletteKeyColor())}get secondaryPaletteKeyColor(){return this.getArgb(this.colors.secondaryPaletteKeyColor())}get tertiaryPaletteKeyColor(){return this.getArgb(this.colors.tertiaryPaletteKeyColor())}get neutralPaletteKeyColor(){return this.getArgb(this.colors.neutralPaletteKeyColor())}get neutralVariantPaletteKeyColor(){return this.getArgb(this.colors.neutralVariantPaletteKeyColor())}get errorPaletteKeyColor(){return this.getArgb(this.colors.errorPaletteKeyColor())}get background(){return this.getArgb(this.colors.background())}get onBackground(){return this.getArgb(this.colors.onBackground())}get surface(){return this.getArgb(this.colors.surface())}get surfaceDim(){return this.getArgb(this.colors.surfaceDim())}get surfaceBright(){return this.getArgb(this.colors.surfaceBright())}get surfaceContainerLowest(){return this.getArgb(this.colors.surfaceContainerLowest())}get surfaceContainerLow(){return this.getArgb(this.colors.surfaceContainerLow())}get surfaceContainer(){return this.getArgb(this.colors.surfaceContainer())}get surfaceContainerHigh(){return this.getArgb(this.colors.surfaceContainerHigh())}get surfaceContainerHighest(){return this.getArgb(this.colors.surfaceContainerHighest())}get onSurface(){return this.getArgb(this.colors.onSurface())}get surfaceVariant(){return this.getArgb(this.colors.surfaceVariant())}get onSurfaceVariant(){return this.getArgb(this.colors.onSurfaceVariant())}get inverseSurface(){return this.getArgb(this.colors.inverseSurface())}get inverseOnSurface(){return this.getArgb(this.colors.inverseOnSurface())}get outline(){return this.getArgb(this.colors.outline())}get outlineVariant(){return this.getArgb(this.colors.outlineVariant())}get shadow(){return this.getArgb(this.colors.shadow())}get scrim(){return this.getArgb(this.colors.scrim())}get surfaceTint(){return this.getArgb(this.colors.surfaceTint())}get primary(){return this.getArgb(this.colors.primary())}get primaryDim(){let e=this.colors.primaryDim();if(e===void 0)throw new Error("`primaryDim` color is undefined prior to 2025 spec.");return this.getArgb(e)}get onPrimary(){return this.getArgb(this.colors.onPrimary())}get primaryContainer(){return this.getArgb(this.colors.primaryContainer())}get onPrimaryContainer(){return this.getArgb(this.colors.onPrimaryContainer())}get primaryFixed(){return this.getArgb(this.colors.primaryFixed())}get primaryFixedDim(){return this.getArgb(this.colors.primaryFixedDim())}get onPrimaryFixed(){return this.getArgb(this.colors.onPrimaryFixed())}get onPrimaryFixedVariant(){return this.getArgb(this.colors.onPrimaryFixedVariant())}get inversePrimary(){return this.getArgb(this.colors.inversePrimary())}get secondary(){return this.getArgb(this.colors.secondary())}get secondaryDim(){let e=this.colors.secondaryDim();if(e===void 0)throw new Error("`secondaryDim` color is undefined prior to 2025 spec.");return this.getArgb(e)}get onSecondary(){return this.getArgb(this.colors.onSecondary())}get secondaryContainer(){return this.getArgb(this.colors.secondaryContainer())}get onSecondaryContainer(){return this.getArgb(this.colors.onSecondaryContainer())}get secondaryFixed(){return this.getArgb(this.colors.secondaryFixed())}get secondaryFixedDim(){return this.getArgb(this.colors.secondaryFixedDim())}get onSecondaryFixed(){return this.getArgb(this.colors.onSecondaryFixed())}get onSecondaryFixedVariant(){return this.getArgb(this.colors.onSecondaryFixedVariant())}get tertiary(){return this.getArgb(this.colors.tertiary())}get tertiaryDim(){let e=this.colors.tertiaryDim();if(e===void 0)throw new Error("`tertiaryDim` color is undefined prior to 2025 spec.");return this.getArgb(e)}get onTertiary(){return this.getArgb(this.colors.onTertiary())}get tertiaryContainer(){return this.getArgb(this.colors.tertiaryContainer())}get onTertiaryContainer(){return this.getArgb(this.colors.onTertiaryContainer())}get tertiaryFixed(){return this.getArgb(this.colors.tertiaryFixed())}get tertiaryFixedDim(){return this.getArgb(this.colors.tertiaryFixedDim())}get onTertiaryFixed(){return this.getArgb(this.colors.onTertiaryFixed())}get onTertiaryFixedVariant(){return this.getArgb(this.colors.onTertiaryFixedVariant())}get error(){return this.getArgb(this.colors.error())}get errorDim(){let e=this.colors.errorDim();if(e===void 0)throw new Error("`errorDim` color is undefined prior to 2025 spec.");return this.getArgb(e)}get onError(){return this.getArgb(this.colors.onError())}get errorContainer(){return this.getArgb(this.colors.errorContainer())}get onErrorContainer(){return this.getArgb(this.colors.onErrorContainer())}};T.DEFAULT_SPEC_VERSION="2021";T.DEFAULT_PLATFORM="phone";var De=class{getPrimaryPalette(e,t,n,a,o){switch(e){case s.CONTENT:case s.FIDELITY:return y.fromHueAndChroma(t.hue,t.chroma);case s.FRUIT_SALAD:return y.fromHueAndChroma(U(t.hue-50),48);case s.MONOCHROME:return y.fromHueAndChroma(t.hue,0);case s.NEUTRAL:return y.fromHueAndChroma(t.hue,12);case s.RAINBOW:return y.fromHueAndChroma(t.hue,48);case s.TONAL_SPOT:return y.fromHueAndChroma(t.hue,36);case s.EXPRESSIVE:return y.fromHueAndChroma(U(t.hue+240),40);case s.VIBRANT:return y.fromHueAndChroma(t.hue,200);default:throw new Error(`Unsupported variant: ${e}`)}}getSecondaryPalette(e,t,n,a,o){switch(e){case s.CONTENT:case s.FIDELITY:return y.fromHueAndChroma(t.hue,Math.max(t.chroma-32,t.chroma*.5));case s.FRUIT_SALAD:return y.fromHueAndChroma(U(t.hue-50),36);case s.MONOCHROME:return y.fromHueAndChroma(t.hue,0);case s.NEUTRAL:return y.fromHueAndChroma(t.hue,8);case s.RAINBOW:return y.fromHueAndChroma(t.hue,16);case s.TONAL_SPOT:return y.fromHueAndChroma(t.hue,16);case s.EXPRESSIVE:return y.fromHueAndChroma(T.getRotatedHue(t,[0,21,51,121,151,191,271,321,360],[45,95,45,20,45,90,45,45,45]),24);case s.VIBRANT:return y.fromHueAndChroma(T.getRotatedHue(t,[0,41,61,101,131,181,251,301,360],[18,15,10,12,15,18,15,12,12]),24);default:throw new Error(`Unsupported variant: ${e}`)}}getTertiaryPalette(e,t,n,a,o){switch(e){case s.CONTENT:return y.fromHct(ie.fixIfDisliked(new ge(t).analogous(3,6)[2]));case s.FIDELITY:return y.fromHct(ie.fixIfDisliked(new ge(t).complement));case s.FRUIT_SALAD:return y.fromHueAndChroma(t.hue,36);case s.MONOCHROME:return y.fromHueAndChroma(t.hue,0);case s.NEUTRAL:return y.fromHueAndChroma(t.hue,16);case s.RAINBOW:case s.TONAL_SPOT:return y.fromHueAndChroma(U(t.hue+60),24);case s.EXPRESSIVE:return y.fromHueAndChroma(T.getRotatedHue(t,[0,21,51,121,151,191,271,321,360],[120,120,20,45,20,15,20,120,120]),32);case s.VIBRANT:return y.fromHueAndChroma(T.getRotatedHue(t,[0,41,61,101,131,181,251,301,360],[35,30,20,25,30,35,30,25,25]),32);default:throw new Error(`Unsupported variant: ${e}`)}}getNeutralPalette(e,t,n,a,o){switch(e){case s.CONTENT:case s.FIDELITY:return y.fromHueAndChroma(t.hue,t.chroma/8);case s.FRUIT_SALAD:return y.fromHueAndChroma(t.hue,10);case s.MONOCHROME:return y.fromHueAndChroma(t.hue,0);case s.NEUTRAL:return y.fromHueAndChroma(t.hue,2);case s.RAINBOW:return y.fromHueAndChroma(t.hue,0);case s.TONAL_SPOT:return y.fromHueAndChroma(t.hue,6);case s.EXPRESSIVE:return y.fromHueAndChroma(U(t.hue+15),8);case s.VIBRANT:return y.fromHueAndChroma(t.hue,10);default:throw new Error(`Unsupported variant: ${e}`)}}getNeutralVariantPalette(e,t,n,a,o){switch(e){case s.CONTENT:return y.fromHueAndChroma(t.hue,t.chroma/8+4);case s.FIDELITY:return y.fromHueAndChroma(t.hue,t.chroma/8+4);case s.FRUIT_SALAD:return y.fromHueAndChroma(t.hue,16);case s.MONOCHROME:return y.fromHueAndChroma(t.hue,0);case s.NEUTRAL:return y.fromHueAndChroma(t.hue,2);case s.RAINBOW:return y.fromHueAndChroma(t.hue,0);case s.TONAL_SPOT:return y.fromHueAndChroma(t.hue,8);case s.EXPRESSIVE:return y.fromHueAndChroma(U(t.hue+15),12);case s.VIBRANT:return y.fromHueAndChroma(t.hue,12);default:throw new Error(`Unsupported variant: ${e}`)}}getErrorPalette(e,t,n,a,o){}},We=class r extends De{getPrimaryPalette(e,t,n,a,o){switch(e){case s.NEUTRAL:return y.fromHueAndChroma(t.hue,a==="phone"?S.isBlue(t.hue)?12:8:S.isBlue(t.hue)?16:12);case s.TONAL_SPOT:return y.fromHueAndChroma(t.hue,a==="phone"&&n?26:32);case s.EXPRESSIVE:return y.fromHueAndChroma(t.hue,a==="phone"?n?36:48:40);case s.VIBRANT:return y.fromHueAndChroma(t.hue,a==="phone"?74:56);default:return super.getPrimaryPalette(e,t,n,a,o)}}getSecondaryPalette(e,t,n,a,o){switch(e){case s.NEUTRAL:return y.fromHueAndChroma(t.hue,a==="phone"?S.isBlue(t.hue)?6:4:S.isBlue(t.hue)?10:6);case s.TONAL_SPOT:return y.fromHueAndChroma(t.hue,16);case s.EXPRESSIVE:return y.fromHueAndChroma(T.getRotatedHue(t,[0,105,140,204,253,278,300,333,360],[-160,155,-100,96,-96,-156,-165,-160]),a==="phone"&&n?16:24);case s.VIBRANT:return y.fromHueAndChroma(T.getRotatedHue(t,[0,38,105,140,333,360],[-14,10,-14,10,-14]),a==="phone"?56:36);default:return super.getSecondaryPalette(e,t,n,a,o)}}getTertiaryPalette(e,t,n,a,o){switch(e){case s.NEUTRAL:return y.fromHueAndChroma(T.getRotatedHue(t,[0,38,105,161,204,278,333,360],[-32,26,10,-39,24,-15,-32]),a==="phone"?20:36);case s.TONAL_SPOT:return y.fromHueAndChroma(T.getRotatedHue(t,[0,20,71,161,333,360],[-40,48,-32,40,-32]),a==="phone"?28:32);case s.EXPRESSIVE:return y.fromHueAndChroma(T.getRotatedHue(t,[0,105,140,204,253,278,300,333,360],[-165,160,-105,101,-101,-160,-170,-165]),48);case s.VIBRANT:return y.fromHueAndChroma(T.getRotatedHue(t,[0,38,71,105,140,161,253,333,360],[-72,35,24,-24,62,50,62,-72]),56);default:return super.getTertiaryPalette(e,t,n,a,o)}}static getExpressiveNeutralHue(e){return T.getRotatedHue(e,[0,71,124,253,278,300,360],[10,0,10,0,10,0])}static getExpressiveNeutralChroma(e,t,n){let a=r.getExpressiveNeutralHue(e);return n==="phone"?t?S.isYellow(a)?6:14:18:12}static getVibrantNeutralHue(e){return T.getRotatedHue(e,[0,38,105,140,333,360],[-14,10,-14,10,-14])}static getVibrantNeutralChroma(e,t){let n=r.getVibrantNeutralHue(e);return t==="phone"||S.isBlue(n)?28:20}getNeutralPalette(e,t,n,a,o){switch(e){case s.NEUTRAL:return y.fromHueAndChroma(t.hue,a==="phone"?1.4:6);case s.TONAL_SPOT:return y.fromHueAndChroma(t.hue,a==="phone"?5:10);case s.EXPRESSIVE:return y.fromHueAndChroma(r.getExpressiveNeutralHue(t),r.getExpressiveNeutralChroma(t,n,a));case s.VIBRANT:return y.fromHueAndChroma(r.getVibrantNeutralHue(t),r.getVibrantNeutralChroma(t,a));default:return super.getNeutralPalette(e,t,n,a,o)}}getNeutralVariantPalette(e,t,n,a,o){switch(e){case s.NEUTRAL:return y.fromHueAndChroma(t.hue,(a==="phone"?1.4:6)*2.2);case s.TONAL_SPOT:return y.fromHueAndChroma(t.hue,(a==="phone"?5:10)*1.7);case s.EXPRESSIVE:let i=r.getExpressiveNeutralHue(t),l=r.getExpressiveNeutralChroma(t,n,a);return y.fromHueAndChroma(i,l*(i>=105&&i<125?1.6:2.3));case s.VIBRANT:let m=r.getVibrantNeutralHue(t),f=r.getVibrantNeutralChroma(t,a);return y.fromHueAndChroma(m,f*1.29);default:return super.getNeutralVariantPalette(e,t,n,a,o)}}getErrorPalette(e,t,n,a,o){let i=T.getPiecewiseHue(t,[0,3,13,23,33,43,153,273,360],[12,22,32,12,22,32,22,12]);switch(e){case s.NEUTRAL:return y.fromHueAndChroma(i,a==="phone"?50:40);case s.TONAL_SPOT:return y.fromHueAndChroma(i,a==="phone"?60:48);case s.EXPRESSIVE:return y.fromHueAndChroma(i,a==="phone"?64:48);case s.VIBRANT:return y.fromHueAndChroma(i,a==="phone"?80:60);default:return super.getErrorPalette(e,t,n,a,o)}}},Rt=new De,Bt=new We;function ue(r){return r==="2025"?Bt:Rt}var ve=class extends T{constructor(e,t,n,a=T.DEFAULT_SPEC_VERSION,o=T.DEFAULT_PLATFORM){super({sourceColorHct:e,variant:s.CONTENT,contrastLevel:n,isDark:t,platform:o,specVersion:a})}};var Ee=class extends T{constructor(e,t,n,a=T.DEFAULT_SPEC_VERSION,o=T.DEFAULT_PLATFORM){super({sourceColorHct:e,variant:s.EXPRESSIVE,contrastLevel:n,isDark:t,platform:o,specVersion:a})}};var Fe=class extends T{constructor(e,t,n,a=T.DEFAULT_SPEC_VERSION,o=T.DEFAULT_PLATFORM){super({sourceColorHct:e,variant:s.FIDELITY,contrastLevel:n,isDark:t,platform:o,specVersion:a})}};var we=class extends T{constructor(e,t,n,a=T.DEFAULT_SPEC_VERSION,o=T.DEFAULT_PLATFORM){super({sourceColorHct:e,variant:s.FRUIT_SALAD,contrastLevel:n,isDark:t,platform:o,specVersion:a})}};var Ie=class extends T{constructor(e,t,n,a=T.DEFAULT_SPEC_VERSION,o=T.DEFAULT_PLATFORM){super({sourceColorHct:e,variant:s.MONOCHROME,contrastLevel:n,isDark:t,platform:o,specVersion:a})}};var Me=class extends T{constructor(e,t,n,a=T.DEFAULT_SPEC_VERSION,o=T.DEFAULT_PLATFORM){super({sourceColorHct:e,variant:s.NEUTRAL,contrastLevel:n,isDark:t,platform:o,specVersion:a})}};var Re=class extends T{constructor(e,t,n,a=T.DEFAULT_SPEC_VERSION,o=T.DEFAULT_PLATFORM){super({sourceColorHct:e,variant:s.RAINBOW,contrastLevel:n,isDark:t,platform:o,specVersion:a})}};var Be=class extends T{constructor(e,t,n,a=T.DEFAULT_SPEC_VERSION,o=T.DEFAULT_PLATFORM){super({sourceColorHct:e,variant:s.TONAL_SPOT,contrastLevel:n,isDark:t,platform:o,specVersion:a})}};var Oe=class extends T{constructor(e,t,n,a=T.DEFAULT_SPEC_VERSION,o=T.DEFAULT_PLATFORM){super({sourceColorHct:e,variant:s.VIBRANT,contrastLevel:n,isDark:t,platform:o,specVersion:a})}};var Ot={desired:4,fallbackColorARGB:4282549748,filter:!0};function Lt(r,e){return r.score>e.score?-1:r.score<e.score?1:0}var Q=class r{constructor(){}static score(e,t){let{desired:n,fallbackColorARGB:a,filter:o}={...Ot,...t},i=[],l=new Array(360).fill(0),m=0;for(let[P,d]of e.entries()){let h=S.fromInt(P);i.push(h);let b=Math.floor(h.hue);l[b]+=d,m+=d}let f=new Array(360).fill(0);for(let P=0;P<360;P++){let d=l[P]/m;for(let h=P-14;h<P+16;h++){let b=ce(h);f[b]+=d}}let p=new Array;for(let P of i){let d=ce(Math.round(P.hue)),h=f[d];if(o&&(P.chroma<r.CUTOFF_CHROMA||h<=r.CUTOFF_EXCITED_PROPORTION))continue;let b=h*100*r.WEIGHT_PROPORTION,v=P.chroma<r.TARGET_CHROMA?r.WEIGHT_CHROMA_BELOW:r.WEIGHT_CHROMA_ABOVE,F=(P.chroma-r.TARGET_CHROMA)*v,I=b+F;p.push({hct:P,score:I})}p.sort(Lt);let C=[];for(let P=90;P>=15;P--){C.length=0;for(let{hct:d}of p)if(C.find(b=>Ke(d.hue,b.hue)<P)||C.push(d),C.length>=n)break;if(C.length>=n)break}let g=[];C.length===0&&g.push(a);for(let P of C)g.push(P.toInt());return g}};Q.TARGET_CHROMA=48;Q.WEIGHT_PROPORTION=.7;Q.WEIGHT_CHROMA_ABOVE=.3;Q.WEIGHT_CHROMA_BELOW=.1;Q.CUTOFF_CHROMA=5;Q.CUTOFF_EXCITED_PROPORTION=.01;function X(r){let e=fe(r),t=de(r),n=pe(r),a=[e.toString(16),t.toString(16),n.toString(16)];for(let[o,i]of a.entries())i.length===1&&(a[o]="0"+i);return"#"+a.join("")}function Le(r){r=r.replace("#","");let e=r.length===3,t=r.length===6,n=r.length===8;if(!e&&!t&&!n)throw new Error("unexpected hex "+r);let a=0,o=0,i=0;return e?(a=ee(r.slice(0,1).repeat(2)),o=ee(r.slice(1,2).repeat(2)),i=ee(r.slice(2,3).repeat(2))):t?(a=ee(r.slice(0,2)),o=ee(r.slice(2,4)),i=ee(r.slice(4,6))):n&&(a=ee(r.slice(2,4)),o=ee(r.slice(4,6)),i=ee(r.slice(6,8))),(255<<24|(a&255)<<16|(o&255)<<8|i&255)>>>0}function ee(r){return parseInt(r,16)}var Ze=[{id:"fidelity",label:"Fid\xE9lit\xE9",description:"Primary fid\xE8le \xE0 la couleur choisie (m\xEAme rendu que les th\xE8mes pr\xE9d\xE9finis)."},{id:"tonal-spot",label:"Tonal spot",description:"Style par d\xE9faut d\u2019Android : primary adoucie, ambiance calme."},{id:"vibrant",label:"Vibrant",description:"Couleurs satur\xE9es au maximum, pour une interface \xE9nergique."},{id:"expressive",label:"Expressif",description:"Teintes d\xE9cal\xE9es et contrast\xE9es, volontairement inattendues."},{id:"content",label:"Contenu",description:"Suit fid\xE8lement la couleur source, pens\xE9 pour s\u2019accorder \xE0 une image."},{id:"rainbow",label:"Arc-en-ciel",description:"Accents color\xE9s sur des surfaces neutres."},{id:"fruit-salad",label:"Salade de fruits",description:"Primary et tertiary de teintes tr\xE8s diff\xE9rentes, ludique."},{id:"neutral",label:"Neutre",description:"Couleurs tr\xE8s d\xE9satur\xE9es, presque grises."},{id:"monochrome",label:"Noir & blanc",description:"Monochrome : primary noire en clair, blanche en sombre, aucune teinte."}],Vt=[{value:0,label:"Standard"},{value:.5,label:"Moyen"},{value:1,label:"\xC9lev\xE9"}],ht=[{id:"secondary",label:"Secondary",hint:"Composants moins visibles : chips, indicateur de navigation, boutons tonals."},{id:"tertiary",label:"Tertiary",hint:"Accents contrast\xE9s : badges, mises en avant."},{id:"neutral",label:"Neutral",hint:"Surfaces et fonds (teinte l\xE9g\xE8re)."},{id:"neutralVariant",label:"Neutral variant",hint:"Contours, textes secondaires, surfaces variantes."},{id:"error",label:"Error",hint:"\xC9tats d\u2019erreur."}],mt=[0,5,10,15,20,25,30,35,40,50,60,70,80,90,95,98,99,100],Ht={fidelity:Fe,"tonal-spot":Be,neutral:Me,vibrant:Oe,expressive:Ee,content:ve,rainbow:Re,"fruit-salad":we,monochrome:Ie},ft={background:r=>r.background,"on-background":r=>r.onBackground,primary:r=>r.primary,"on-primary":r=>r.onPrimary,"primary-container":r=>r.primaryContainer,"on-primary-container":r=>r.onPrimaryContainer,"primary-fixed":r=>r.primaryFixed,"primary-fixed-dim":r=>r.primaryFixedDim,"on-primary-fixed":r=>r.onPrimaryFixed,"on-primary-fixed-variant":r=>r.onPrimaryFixedVariant,"inverse-primary":r=>r.inversePrimary,secondary:r=>r.secondary,"on-secondary":r=>r.onSecondary,"secondary-container":r=>r.secondaryContainer,"on-secondary-container":r=>r.onSecondaryContainer,"secondary-fixed":r=>r.secondaryFixed,"secondary-fixed-dim":r=>r.secondaryFixedDim,"on-secondary-fixed":r=>r.onSecondaryFixed,"on-secondary-fixed-variant":r=>r.onSecondaryFixedVariant,tertiary:r=>r.tertiary,"on-tertiary":r=>r.onTertiary,"tertiary-container":r=>r.tertiaryContainer,"on-tertiary-container":r=>r.onTertiaryContainer,"tertiary-fixed":r=>r.tertiaryFixed,"tertiary-fixed-dim":r=>r.tertiaryFixedDim,"on-tertiary-fixed":r=>r.onTertiaryFixed,"on-tertiary-fixed-variant":r=>r.onTertiaryFixedVariant,error:r=>r.error,"on-error":r=>r.onError,"error-container":r=>r.errorContainer,"on-error-container":r=>r.onErrorContainer,surface:r=>r.surface,"on-surface":r=>r.onSurface,"surface-variant":r=>r.surfaceVariant,"on-surface-variant":r=>r.onSurfaceVariant,"surface-dim":r=>r.surfaceDim,"surface-bright":r=>r.surfaceBright,"surface-container-lowest":r=>r.surfaceContainerLowest,"surface-container-low":r=>r.surfaceContainerLow,"surface-container":r=>r.surfaceContainer,"surface-container-high":r=>r.surfaceContainerHigh,"surface-container-highest":r=>r.surfaceContainerHighest,"surface-tint":r=>r.surfaceTint,"inverse-surface":r=>r.inverseSurface,"inverse-on-surface":r=>r.inverseOnSurface,outline:r=>r.outline,"outline-variant":r=>r.outlineVariant,shadow:r=>r.shadow,scrim:r=>r.scrim,neutral10:r=>r.neutralPalette.tone(10),"neutral-variant20":r=>r.neutralVariantPalette.tone(20)},Nt=Object.keys(ft).map(r=>"--mat-sys-"+r);function Je(r){return!!r&&/^#[0-9a-f]{6}$/i.test(r)}function Ut(r,e){var n;let t={};for(let a of ht){let o=(n=r==null?void 0:r.overrides)==null?void 0:n[a.id];Je(o)&&(t[a.id]=o.toLowerCase())}return{source:Je(r==null?void 0:r.source)?r.source.toLowerCase():e,style:Ze.some(a=>a.id===(r==null?void 0:r.style))?r.style:"fidelity",contrast:typeof(r==null?void 0:r.contrast)=="number"?Math.max(-1,Math.min(1,r.contrast)):0,overrides:t}}function He(r,e){let t=S.fromInt(Le(r.source)),n=new Ht[r.style](t,e,r.contrast),a=(o,i)=>{let l=r.overrides[o];return l?y.fromInt(Le(l)):i};return new T({sourceColorHct:t,variant:n.variant,contrastLevel:r.contrast,isDark:e,primaryPalette:n.primaryPalette,secondaryPalette:a("secondary",n.secondaryPalette),tertiaryPalette:a("tertiary",n.tertiaryPalette),neutralPalette:a("neutral",n.neutralPalette),neutralVariantPalette:a("neutralVariant",n.neutralVariantPalette),errorPalette:a("error",n.errorPalette)})}function Ve(r,e){let t=He(r,e);return Object.fromEntries(Object.entries(ft).map(([n,a])=>[n,X(a(t))]))}function dt(r){let e=Ve(r,!1),t=Ve(r,!0);return Object.fromEntries(Object.keys(e).map(n=>["--mat-sys-"+n,`light-dark(${e[n]}, ${t[n]})`]))}function _t(r,e){let t=Ve(r,e);return Object.fromEntries(Object.entries(t).map(([n,a])=>["--mat-sys-"+n,a]))}function zt(r){let e=He(r,!1);return[["primary","Primary",e.primaryPalette,e.primaryPaletteKeyColor],["secondary","Secondary",e.secondaryPalette,e.secondaryPaletteKeyColor],["tertiary","Tertiary",e.tertiaryPalette,e.tertiaryPaletteKeyColor],["neutral","Neutral",e.neutralPalette,e.neutralPaletteKeyColor],["neutralVariant","Neutral variant",e.neutralVariantPalette,e.neutralVariantPaletteKeyColor],["error","Error",e.errorPalette,e.errorPaletteKeyColor]].map(([n,a,o,i])=>({key:n,label:a,keyColor:X(i),tones:mt.map(l=>({tone:l,hex:X(o.tone(l))}))}))}function Gt(r){let e=He({...r,overrides:{}},!1);return{primary:X(e.primaryPaletteKeyColor),secondary:X(e.secondaryPaletteKeyColor),tertiary:X(e.tertiaryPaletteKeyColor),neutral:X(e.neutralPaletteKeyColor),neutralVariant:X(e.neutralVariantPaletteKeyColor),error:X(e.errorPaletteKeyColor)}}function Kt(r,e=".theme-custom"){var o;let t=dt(r),n=(o=Ze.find(i=>i.id===r.style))==null?void 0:o.label,a=Object.entries(t).map(([i,l])=>`  ${i}: ${l};`).join(`
`);return`/* Th\xE8me personnalis\xE9 \u2014 source ${r.source}, style ${n}, contraste ${r.contrast} */
${e} {
${a}
}
`}function Yt(r,e){let t=o=>{let i=Le(o),l=[i>>16&255,i>>8&255,i&255].map(m=>{let f=m/255;return f<=.03928?f/12.92:((f+.055)/1.055)**2.4});return .2126*l[0]+.7152*l[1]+.0722*l[2]},[n,a]=[t(r),t(e)].sort((o,i)=>i-o);return(n+.05)/(a+.05)}var pt=[{id:"cyan",label:"Cyan",seed:"#006a6a",light:{primary:"#006a6a",secondary:"#4a6363",tertiary:"#964900",container:"#00fbfb"},dark:{primary:"#00dddd",secondary:"#b0cccb",tertiary:"#ffb787",container:"#004f4f"}},{id:"baseline",label:"Material",seed:"#6750a4",light:{primary:"#6750a4",secondary:"#63597c",tertiary:"#924274",container:"#e9ddff"},dark:{primary:"#cfbcff",secondary:"#cdc0e9",tertiary:"#ffaedb",container:"#4f378a"}},{id:"red",label:"Rouge",seed:"#e53935",light:{primary:"#bb171c",secondary:"#a13d36",tertiary:"#875200",container:"#ffdad6"},dark:{primary:"#ffb4ac",secondary:"#ffb4ac",tertiary:"#ffb866",container:"#93000d"}},{id:"salmon",label:"Saumon",seed:"#fa8072",light:{primary:"#a23d34",secondary:"#855049",tertiary:"#6b5f00",container:"#ffdad5"},dark:{primary:"#ffb4aa",secondary:"#fab6ad",tertiary:"#dcc83a",container:"#82261f"}},{id:"coral",label:"Corail",seed:"#f4511e",light:{primary:"#b02e00",secondary:"#9e4227",tertiary:"#755b00",container:"#ffdbd1"},dark:{primary:"#ffb5a0",secondary:"#ffb5a0",tertiary:"#edc147",container:"#872100"}},{id:"terracotta",label:"Terracotta",seed:"#c1502e",light:{primary:"#a53c1b",secondary:"#884f3f",tertiary:"#715c00",container:"#ffdbd1"},dark:{primary:"#ffb5a0",secondary:"#ffb5a0",tertiary:"#e3c457",container:"#842504"}},{id:"peach",label:"P\xEAche",seed:"#ffab91",light:{primary:"#8d4d38",secondary:"#79564c",tertiary:"#676018",container:"#ffdbd0"},dark:{primary:"#ffb59e",secondary:"#e9bdaf",tertiary:"#d3c976",container:"#713623"}},{id:"brown",label:"Brun",seed:"#6d4c41",light:{primary:"#79564b",secondary:"#6c5a55",tertiary:"#695d3d",container:"#ffdbcf"},dark:{primary:"#e9bdae",secondary:"#d9c2ba",tertiary:"#d5c59e",container:"#5e3f35"}},{id:"copper",label:"Cuivre",seed:"#b87333",light:{primary:"#8c4f10",secondary:"#79573c",tertiary:"#5c630e",container:"#ffdcc2"},dark:{primary:"#ffb77b",secondary:"#eabe9c",tertiary:"#c4cd6f",container:"#6d3a00"}},{id:"orange",label:"Orange",seed:"#fb8c00",light:{primary:"#8f4e00",secondary:"#845326",tertiary:"#5b6400",container:"#ffdcc2"},dark:{primary:"#ffb77b",secondary:"#fab983",tertiary:"#c0d030",container:"#6d3a00"}},{id:"amber",label:"Ambre",seed:"#ffb300",light:{primary:"#7e5700",secondary:"#795920",tertiary:"#586400",container:"#ffdeac"},dark:{primary:"#ffba38",secondary:"#eac07d",tertiary:"#bcd13f",container:"#604100"}},{id:"mustard",label:"Moutarde",seed:"#c7a317",light:{primary:"#725c00",secondary:"#6d5d2a",tertiary:"#476800",container:"#ffe082"},dark:{primary:"#eac33b",secondary:"#dac588",tertiary:"#abd467",container:"#564500"}},{id:"sand",label:"Sable",seed:"#c2b280",light:{primary:"#6a5e33",secondary:"#655e4a",tertiary:"#536442",container:"#f3e2ac"},dark:{primary:"#d6c692",secondary:"#d0c6ad",tertiary:"#bacda4",container:"#51461e"}},{id:"yellow",label:"Jaune",seed:"#fdd835",light:{primary:"#705d00",secondary:"#6c5e23",tertiary:"#4d6700",container:"#ffe16e"},dark:{primary:"#e8c41d",secondary:"#d9c680",tertiary:"#add452",container:"#544600"}},{id:"olive",label:"Olive",seed:"#808000",light:{primary:"#626200",secondary:"#616132",tertiary:"#2d6b23",container:"#e9e86b"},dark:{primary:"#cccc52",secondary:"#cbc991",tertiary:"#94d781",container:"#494900"}},{id:"chartreuse",label:"Chartreuse",seed:"#c0ca33",light:{primary:"#5d6300",secondary:"#5e622a",tertiary:"#006e17",container:"#e1eb53"},dark:{primary:"#c5cf38",secondary:"#c7cb87",tertiary:"#7ddc77",container:"#464a00"}},{id:"lime",label:"Anis",seed:"#7cb342",light:{primary:"#3c6a00",secondary:"#4f6537",tertiary:"#006c53",container:"#b8f47a"},dark:{primary:"#9dd761",secondary:"#b5cf97",tertiary:"#4bdeb2",container:"#2c5000"}},{id:"sage",label:"Sauge",seed:"#87a96b",light:{primary:"#486730",secondary:"#556349",tertiary:"#0c6a5c",container:"#c9eea9"},dark:{primary:"#aed18f",secondary:"#bdcbac",tertiary:"#86d5c3",container:"#314e1b"}},{id:"forest",label:"For\xEAt",seed:"#1b5e20",light:{primary:"#2a6b2c",secondary:"#4b6547",tertiary:"#1d619c",container:"#acf4a4"},dark:{primary:"#91d78a",secondary:"#b1cfaa",tertiary:"#9ecaff",container:"#0c5216"}},{id:"green",label:"Vert",seed:"#43a047",light:{primary:"#006e1c",secondary:"#446741",tertiary:"#006495",container:"#98f994"},dark:{primary:"#7ddc7a",secondary:"#aad1a2",tertiary:"#90cdff",container:"#005313"}},{id:"mint",label:"Menthe",seed:"#3eb489",light:{primary:"#006c4d",secondary:"#3e6654",tertiary:"#5555a9",container:"#86f8c8"},dark:{primary:"#69dbad",secondary:"#a5d0ba",tertiary:"#c2c1ff",container:"#005139"}},{id:"teal",label:"Sarcelle",seed:"#00897b",light:{primary:"#006b5f",secondary:"#41655f",tertiary:"#6b5196",container:"#8df5e4"},dark:{primary:"#70d8c8",secondary:"#a8cec6",tertiary:"#d4bbff",container:"#005048"}},{id:"turquoise",label:"Turquoise",seed:"#40e0d0",light:{primary:"#006a62",secondary:"#346760",tertiary:"#5b598d",container:"#61f9e9"},dark:{primary:"#3adccc",secondary:"#9cd1c8",tertiary:"#c4c1fb",container:"#005049"}},{id:"slate",label:"Ardoise",seed:"#546e7a",light:{primary:"#48626e",secondary:"#566065",tertiary:"#6a5871",container:"#cbe7f5"},dark:{primary:"#afcbd8",secondary:"#bec8ce",tertiary:"#d5bfdc",container:"#304a55"}},{id:"ocean",label:"Oc\xE9an",seed:"#006994",light:{primary:"#00658e",secondary:"#486173",tertiary:"#794d8d",container:"#c7e7ff"},dark:{primary:"#85cfff",secondary:"#afcadf",tertiary:"#e7b4fc",container:"#004c6c"}},{id:"sky",label:"Ciel",seed:"#039be5",light:{primary:"#006496",secondary:"#3e627f",tertiary:"#8242a1",container:"#cbe6ff"},dark:{primary:"#90cdff",secondary:"#a6cbeb",tertiary:"#e9b3ff",container:"#004b72"}},{id:"steel",label:"Bleu acier",seed:"#4682b4",light:{primary:"#206393",secondary:"#4c6075",tertiary:"#7c4c88",container:"#cee5ff"},dark:{primary:"#96ccff",secondary:"#b3c9e0",tertiary:"#ebb3f7",container:"#004a75"}},{id:"blue",label:"Bleu",seed:"#1e88e5",light:{primary:"#0060a8",secondary:"#446084",tertiary:"#873ea3",container:"#d3e4ff"},dark:{primary:"#a2c9ff",secondary:"#acc8f2",tertiary:"#edb1ff",container:"#004881"}},{id:"sapphire",label:"Saphir",seed:"#0f52ba",light:{primary:"#1d59c1",secondary:"#4d5e86",tertiary:"#893da1",container:"#d9e2ff"},dark:{primary:"#b0c6ff",secondary:"#b5c6f5",tertiary:"#f0b0ff",container:"#00419c"}},{id:"indigo",label:"Indigo",seed:"#3949ab",light:{primary:"#4555b7",secondary:"#565c83",tertiary:"#8c3f92",container:"#dee0ff"},dark:{primary:"#bbc3ff",secondary:"#bfc4f1",tertiary:"#ffa9ff",container:"#2c3c9e"}},{id:"navy",label:"Bleu nuit",seed:"#1a237e",light:{primary:"#4c56af",secondary:"#585c80",tertiary:"#864492",container:"#e0e0ff"},dark:{primary:"#bdc2ff",secondary:"#c1c3ed",tertiary:"#f6adff",container:"#343d96"}},{id:"lavender",label:"Lavande",seed:"#9575cd",light:{primary:"#6d4ea2",secondary:"#65587b",tertiary:"#95416d",container:"#ebdcff"},dark:{primary:"#d4bbff",secondary:"#d0bfe8",tertiary:"#ffafd3",container:"#543589"}},{id:"purple",label:"Violet",seed:"#8e24aa",light:{primary:"#942cb0",secondary:"#7c4d86",tertiary:"#af245f",container:"#fdd6ff"},dark:{primary:"#f3aeff",secondary:"#ecb3f4",tertiary:"#ffb1c6",container:"#790096"}},{id:"lilac",label:"Lilas",seed:"#c8a2c8",light:{primary:"#745475",secondary:"#695a68",tertiary:"#845055",container:"#ffd6fe"},dark:{primary:"#e2bae1",secondary:"#d5c1d2",tertiary:"#f8b5ba",container:"#5a3c5d"}},{id:"fuchsia",label:"Fuchsia",seed:"#e040fb",light:{primary:"#a200bb",secondary:"#8e3b9b",tertiary:"#bb0058",container:"#ffd6fe"},dark:{primary:"#faabff",secondary:"#faabff",tertiary:"#ffb1c3",container:"#7b008f"}},{id:"plum",label:"Prune",seed:"#5e2750",light:{primary:"#864a75",secondary:"#735668",tertiary:"#934843",container:"#ffd7ee"},dark:{primary:"#fab0e1",secondary:"#e1bcd2",tertiary:"#ffb3ad",container:"#6b325c"}},{id:"powder",label:"Rose poudr\xE9",seed:"#e8a0b4",light:{primary:"#874d5f",secondary:"#74565e",tertiary:"#845326",container:"#ffd9e1"},dark:{primary:"#fcb2c6",secondary:"#e3bdc6",tertiary:"#fab983",container:"#6c3647"}},{id:"bordeaux",label:"Bordeaux",seed:"#7b1e3a",light:{primary:"#a03b56",secondary:"#83505a",tertiary:"#944a1b",container:"#ffd9df"},dark:{primary:"#ffb1c0",secondary:"#f7b5c1",tertiary:"#ffb68f",container:"#81233f"}},{id:"pink",label:"Rose",seed:"#d81b60",light:{primary:"#bc004f",secondary:"#a33855",tertiary:"#a83900",container:"#ffd9de"},dark:{primary:"#ffb2bf",secondary:"#ffb2bf",tertiary:"#ffb59a",container:"#90003b"}},{id:"graphite",label:"Graphite",seed:"#616161",light:{primary:"#5e5e5e",secondary:"#5f5e5e",tertiary:"#605d5f",container:"#e4e2e2"},dark:{primary:"#c7c6c6",secondary:"#c8c6c5",tertiary:"#cac5c7",container:"#464747"}},{id:"taupe",label:"Taupe",seed:"#8b7d6b",light:{primary:"#695c4c",secondary:"#645d55",tertiary:"#5d6050",container:"#f2e0cb"},dark:{primary:"#d5c4b0",secondary:"#cfc5bb",tertiary:"#c6c8b5",container:"#504535"}}];return At($t);})();
/*! Bundled license information:

@material/material-color-utilities/utils/math_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/color_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/viewing_conditions.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/cam16.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/hct_solver.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/hct/hct.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/blend/blend.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/contrast/contrast.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dislike/dislike_analyzer.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/dynamic_color.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/palettes/tonal_palette.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/temperature/temperature_cache.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/contrast_curve.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/tone_delta_pair.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/variant.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/color_spec_2021.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/color_spec_2025.js:
  (**
   * @license
   * Copyright 2025 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/material_dynamic_colors.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/dynamiccolor/dynamic_scheme.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/palettes/core_palette.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/lab_point_provider.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_wsmeans.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_map.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_wu.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/quantize/quantizer_celebi.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_android.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_content.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_expressive.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_fidelity.js:
  (**
   * @license
   * Copyright 2023 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_fruit_salad.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_monochrome.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_neutral.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_rainbow.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_tonal_spot.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/scheme/scheme_vibrant.js:
  (**
   * @license
   * Copyright 2022 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/score/score.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/string_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/image_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/utils/theme_utils.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)

@material/material-color-utilities/index.js:
  (**
   * @license
   * Copyright 2021 Google LLC
   *
   * Licensed under the Apache License, Version 2.0 (the "License");
   * you may not use this file except in compliance with the License.
   * You may obtain a copy of the License at
   *
   *      http://www.apache.org/licenses/LICENSE-2.0
   *
   * Unless required by applicable law or agreed to in writing, software
   * distributed under the License is distributed on an "AS IS" BASIS,
   * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
   * See the License for the specific language governing permissions and
   * limitations under the License.
   *)
*/
