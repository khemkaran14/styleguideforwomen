/* ---------- ILLUSTRATION ENGINE v2: shaded figures with faces ---------- */
let UID=0;
const MODEL={on:false,ref:true,bt:'regular',skin:'#DDA883',fx:true};
const BODY={petite:['Petite',1.1,.93],slim:['Slim',1.03,1],regular:['Regular',1.14,1],curvy:['Curvy',1.27,1],plus:['Plus-size',1.42,1],tall:['Tall',1.1,1.04]};
function shade(h,p){if(!h||h[0]!=='#')return h;let n=parseInt(h.slice(1),16),r=n>>16,g=(n>>8)&255,b=n&255;const t=p<0?0:255,a=Math.abs(p);r=Math.round(r+(t-r)*a);g=Math.round(g+(t-g)*a);b=Math.round(b+(t-b)*a);return '#'+((1<<24)|(r<<16)|(g<<8)|b).toString(16).slice(1)}
const P=(d,f,x='')=>`<path d="${d}" fill="${f}" ${x}/>`;
const FOLD='stroke="rgba(0,0,0,.16)" stroke-width="1.1" fill="none" stroke-linecap="round"';
const MIR=s=>`<g transform="matrix(-1 0 0 1 200 0)">${s}</g>`;
const both=s=>s+MIR(s);

function pattern(p,id,A,B,C){
  const o=`<pattern id="${id}" patternUnits="userSpaceOnUse"`;
  switch(p){
    case 'dots':return `${o} width="9" height="9"><rect width="9" height="9" fill="${A}"/><circle cx="4.5" cy="4.5" r="1.3" fill="${C}"/></pattern>`;
    case 'floral':return `${o} width="16" height="16"><rect width="16" height="16" fill="${A}"/><g fill="${B}"><circle cx="8" cy="5.6" r="2"/><circle cx="8" cy="10.4" r="2"/><circle cx="5.6" cy="8" r="2"/><circle cx="10.4" cy="8" r="2"/></g><circle cx="8" cy="8" r="1.3" fill="${C}"/><circle cx="0" cy="0" r="1" fill="${C}"/><circle cx="16" cy="16" r="1" fill="${C}"/></pattern>`;
    case 'vstripes':return `${o} width="8" height="8"><rect width="8" height="8" fill="${A}"/><rect width="3" height="8" fill="${B}"/></pattern>`;
    case 'check':return `${o} width="12" height="12"><rect width="12" height="12" fill="${A}"/><rect width="12" height="4" fill="${B}" opacity=".5"/><rect width="4" height="12" fill="${B}" opacity=".5"/></pattern>`;
    case 'ikat':return `${o} width="16" height="12"><rect width="16" height="12" fill="${A}"/><path d="M0 6 L4 1.5 L8 6 L4 10.5Z M8 6 L12 1.5 L16 6 L12 10.5Z" fill="${B}" opacity=".9"/><path d="M2.6 6 L4 4.4 L5.4 6 L4 7.6Z M10.6 6 L12 4.4 L13.4 6 L12 7.6Z" fill="${C}"/></pattern>`;
    case 'brocade':return `${o} width="13" height="13"><rect width="13" height="13" fill="${A}"/><ellipse cx="6.5" cy="6.5" rx="1.8" ry="3" fill="${C}" transform="rotate(30 6.5 6.5)" opacity=".9"/><circle cx="0" cy="0" r="1" fill="${C}"/><circle cx="13" cy="13" r="1" fill="${C}"/><circle cx="13" cy="0" r="1" fill="${C}"/><circle cx="0" cy="13" r="1" fill="${C}"/></pattern>`;
    case 'sequin':return `${o} width="6" height="6"><rect width="6" height="6" fill="${A}"/><circle cx="3" cy="3" r="1.6" fill="${B}" opacity=".55"/><circle cx="2.4" cy="2.4" r=".6" fill="#fff" opacity=".8"/></pattern>`;
    case 'block':return `${o} width="16" height="16"><rect width="16" height="16" fill="${A}"/><circle cx="8" cy="8" r="3.2" fill="none" stroke="${B}" stroke-width="1.3"/><circle cx="8" cy="8" r="1" fill="${C}"/><circle cx="0" cy="0" r="1.2" fill="${B}"/><circle cx="16" cy="0" r="1.2" fill="${B}"/><circle cx="0" cy="16" r="1.2" fill="${B}"/><circle cx="16" cy="16" r="1.2" fill="${B}"/></pattern>`;
    case 'mirror':return `${o} width="12" height="12"><rect width="12" height="12" fill="${A}"/><circle cx="6" cy="6" r="2.2" fill="#EEF3F6" stroke="${C}" stroke-width=".9"/><circle cx="0" cy="0" r="1" fill="${C}"/><circle cx="12" cy="12" r="1" fill="${C}"/></pattern>`;
    case 'chikan':return `${o} width="14" height="14"><rect width="14" height="14" fill="${A}"/><g fill="${B}"><circle cx="7" cy="5" r="1.4"/><circle cx="7" cy="9" r="1.4"/><circle cx="5" cy="7" r="1.4"/><circle cx="9" cy="7" r="1.4"/></g><path d="M0 14 Q3 10 7 12" stroke="${B}" fill="none" stroke-width=".8"/></pattern>`;
    case 'denim':return `${o} width="4" height="4"><rect width="4" height="4" fill="${A}"/><path d="M0 4 L4 0" stroke="${B}" stroke-width=".7" opacity=".45"/></pattern>`;
    default:return '';
  }
}

function skirt(top,H,W,w0,f,n=4){
  let s=P(`M${100-w0} ${top} Q100 ${top-4} ${100+w0} ${top} L${100+W} ${H} Q100 ${H+10} ${100-W} ${H} Z`,f);
  let d='';const ks=n===4?[-.62,-.25,.18,.55]:Array.from({length:n},(_,i)=>-0.8+1.6*i/(n-1));
  for(const k of ks)d+=`M${(100+k*w0).toFixed(1)} ${top+12} L${(100+k*W).toFixed(1)} ${H+3} `;
  return s+`<path d="${d}" ${FOLD}/>`;
}
function hem(top,H,W,w0,c,h=12){const t=(H-h-top)/(H-top),Wb=w0+(W-w0)*t;return P(`M${100-Wb} ${H-h} L${100+Wb} ${H-h} L${100+W} ${H} Q100 ${H+10} ${100-W} ${H} Z`,c)}
const crop=(f,y=126)=>P(`M77 86 Q100 80 123 86 L122 ${y} Q100 ${y+4} 78 ${y} Z`,f);
const fitted=(f,y)=>P(`M77 86 Q100 80 123 86 L121 ${y} Q100 ${y+4} 79 ${y} Z`,f);
const tee=(f,y=178)=>P(`M75 86 Q100 80 125 86 L124 ${y} Q100 ${y+4} 76 ${y} Z`,f);
function kurta(f,L,k=.16){const x=(L-140)*k;return P(`M77 86 Q100 80 123 86 L121 140 L${121+x} ${L} Q100 ${L+5} ${79-x} ${L} L79 140 Z`,f)+`<path d="M${84-x*.5} ${L-50} L${82-x*.9} ${L}" ${FOLD}/><path d="M${116+x*.5} ${L-50} L${118+x*.9} ${L}" ${FOLD}/>`}
function kurtaHem(c,L,k=.16){const x=(L-140)*k,x2=(L-10-140)*k;return P(`M${79-x2} ${L-10} L${121+x2} ${L-10} L${121+x} ${L} Q100 ${L+5} ${79-x} ${L} Z`,c)}
const slim=f=>P('M80 172 L82 370 L94 370 L99.5 205 L100.5 205 L106 370 L118 370 L120 172 Z',f)+`<path d="M90 230 L89 360 M110 230 L111 360" ${FOLD}/>`;
const wide=(f,top=170)=>P(`M80 ${top} L64 376 L98 376 L100 222 L102 376 L136 376 L120 ${top} Z`,f)+`<path d="M84 230 L76 370 M116 230 L124 370 M92 260 L90 372 M108 260 L110 372" ${FOLD}/>`;
const straightT=f=>P('M80 172 L74 374 L97 374 L100 215 L103 374 L126 374 L120 172 Z',f)+`<path d="M88 210 L86 372 M112 210 L114 372" ${FOLD}/>`;
const shararaP=f=>P('M80 172 L85 282 L60 380 L99 380 L100 236 L101 380 L140 380 L115 282 L120 172 Z',f)+`<path d="M84 300 L72 376 M116 300 L128 376 M92 300 L88 378 M108 300 L112 378" ${FOLD}/>`;
const patialaP=f=>P('M80 176 Q56 270 86 362 L95 364 L100 236 L105 364 L114 362 Q144 270 120 176 Z',f)+`<path d="M84 210 Q70 280 90 352 M92 214 Q82 280 94 356 M116 210 Q130 280 110 352 M108 214 Q118 280 106 356" ${FOLD}/>`;
const dhotiP=f=>P('M80 172 Q62 250 84 366 L95 368 L100 262 L105 368 L116 366 Q138 250 120 172 Z',f)+`<path d="M100 180 Q90 228 100 262 Q110 228 100 180 M86 196 Q96 236 90 310 M114 196 Q104 236 110 310" ${FOLD}/>`;
const jogP=(f,c)=>P('M80 172 L80 362 L95 362 L99.5 205 L100.5 205 L105 362 L120 362 L120 172 Z',f)+P('M80 356 L95 356 L95 368 L80 368Z',f)+P('M105 356 L120 356 L120 368 L105 368Z',f)+`<path d="M80 356 L95 356 M105 356 L120 356" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/><path d="M80 176 L80 300" stroke="${c}" stroke-width="2"/><path d="M120 176 L120 300" stroke="${c}" stroke-width="2"/>`;
const dupatta=(c,C)=>P('M80 84 L93 84 L128 172 L142 334 L127 338 L114 182 Z',c,'opacity=".82"')+`<path d="M142 334 L127 338" stroke="${C}" stroke-width="4"/><path d="M93 84 L128 172 L142 334" stroke="${C}" stroke-width="1.6" fill="none" opacity=".9"/><path d="M100 110 L124 200 M108 104 L132 220" ${FOLD}/>`;
const palluFront=(f,C)=>P('M77 86 L91 82 L126 146 L123 170 Z',f)+`<path d="M91 82 L126 146" stroke="${C}" stroke-width="3.2"/><path d="M84 96 L118 158 M80 92 L121 165" ${FOLD}/>`;
const palluBack=(f,C)=>P('M78 88 L63 92 L57 262 Q66 268 75 262 L76 130 Z',f)+P('M57.6 250 L75.3 250 L75 262 Q66 268 57 262Z',C);
const blazer=f=>P('M72 86 Q100 80 128 86 L131 208 L104 208 L100 122 L96 208 L69 208 Z',f)+both(P('M88 84 L100 122 L92 106 L82 92 Z','rgba(0,0,0,.2)'))+`<circle cx="101.5" cy="170" r="1.6" fill="rgba(0,0,0,.35)"/><path d="M76 180 L90 180 M110 180 L124 180" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/>`;
const coat=f=>P('M72 86 Q100 80 128 86 L135 302 L104 304 L100 128 L96 304 L65 302 Z',f)+both(P('M88 84 L100 128 L91 110 L80 92 Z','rgba(0,0,0,.2)'))+P('M71 146 L129 146 L129 154 L71 154Z','rgba(0,0,0,.22)')+`<path d="M98 154 L92 196 M102 154 L106 196" stroke="${f}" stroke-width="3"/>`;
const belt=(c,y=136)=>P(`M79 ${y} Q100 ${y+3} 121 ${y} L121 ${y+7} Q100 ${y+10} 79 ${y+7}Z`,c)+`<rect x="96" y="${y}" width="8" height="8.5" rx="1.5" fill="none" stroke="#E2C275" stroke-width="1.4"/>`;
const neck=(S,deep=96)=>P(`M92 83 Q100 ${deep} 108 83 Z`,S);

function sleeve(sl,c,op=1){
  const Lm={cap:100,short:114,elbow:152,full:202}[sl];if(!Lm||!c)return '';
  let d;
  if(Lm<=120){d=`M81 86 Q64 89 65.5 ${Lm} L77.6 ${Lm} Z`;}
  else{const ox=66-4*(Lm-120)/80,ix=76-5*(Lm-126)/74;d=`M81 86 Q64 89 66 120 L${ox.toFixed(1)} ${Lm} L${ix.toFixed(1)} ${Lm} L76 126 Z`;}
  return both(P(d,c,`opacity="${op}"`)+`<path d="M${Lm>120?66-4*(Lm-120)/80+1:66.5} ${Lm-1} L${Lm>126?76-5*(Lm-126)/74-1:76.6} ${Lm-1}" stroke="rgba(0,0,0,.18)" stroke-width="1"/>`);
}

const LIPS={bold:'#B3123F',classic:'#A63A44',easy:'#B0645A'};
function face(S,Hc,o,id){
  const dk=shade(S,-.28),lip=o.lip||LIPS[o.m]||'#A63A44';
  const eye=`<path d="M91.2 45.2 Q94.5 42.9 97.7 45 Q94.6 47 91.2 45.2Z" fill="#F4EEE9"/><circle cx="94.5" cy="45" r="1.45" fill="#2A160D"/><circle cx="94.9" cy="44.6" r=".4" fill="#fff"/><path d="M90.8 45.2 Q94.4 42.2 98 44.9" stroke="#1A0E08" stroke-width="1" fill="none" stroke-linecap="round"/><path d="M90.8 45.2 L89.8 44.5" stroke="#1A0E08" stroke-width=".8"/><path d="M91 40.8 Q94.6 38.6 98 40.2" stroke="${shade(Hc,.05)}" stroke-width="1.25" fill="none" stroke-linecap="round"/><path d="M91.6 47 Q94.5 48.2 97.4 46.8" stroke="${dk}" stroke-width=".5" fill="none" opacity=".6"/>`;
  return `<ellipse cx="85.6" cy="49" rx="2.4" ry="4" fill="url(#sk${id})"/><ellipse cx="114.4" cy="49" rx="2.4" ry="4" fill="url(#sk${id})"/>`+
  P('M86 44 Q85.6 27 100 27 Q114.4 27 114 44 Q114 57 107 63.5 Q100 68.5 93 63.5 Q86 57 86 44Z',`url(#sk${id})`)+
  `<ellipse cx="91" cy="53" rx="3.6" ry="2.1" fill="${lip}" opacity=".1"/><ellipse cx="109" cy="53" rx="3.6" ry="2.1" fill="${lip}" opacity=".1"/>`+
  both(eye)+
  `<path d="M100.6 45.5 Q99.4 50.5 98.3 52.6 Q100 54 101.9 52.8" stroke="${dk}" stroke-width=".85" fill="none" stroke-linecap="round"/>`+
  `<path d="M95.6 58 Q97.9 56.4 100 57.3 Q102.1 56.4 104.4 58 Q100 59.1 95.6 58Z" fill="${shade(lip,-.12)}"/><path d="M95.6 58 Q100 62 104.4 58 Q100 59.3 95.6 58Z" fill="${lip}"/><path d="M98.6 60 Q100 60.5 101.4 60" stroke="#fff" stroke-width=".5" opacity=".45" fill="none"/>`;
}

function figure(o,bg=true){
  const id='p'+(UID++);
  const [A,B,C]=o.col;const PH=MODEL.on&&o.photo!==false;const S=PH?MODEL.skin:SK[o.sk??2];const Hc=HAIRC[o.sk??2];const bt0=BODY[o.bt||MODEL.bt]||BODY.regular;const bt=PH?bt0:[bt0[0],bt0[1]/1.14,bt0[2]];
  const F=o.p?`url(#${id})`:A;
  const lo=o.lo||B,du=o.du||C,shoe=o.shoe||C;
  let u='',mid='',top='',sc=F,so=o.so||1;
  const DUP=(c,cc)=>o.dupOv==='off'?'':dupatta(c,cc);
  const tp=o.t;
  switch(tp){
    case 'saree':{
      u+=palluBack(F,C)+skirt(138,386,36,22,F,5);
      u+=`<path d="M96 142 L94 384 M100 142 L100 386 M104 142 L106 384 M92 150 L88 382 M108 150 L112 382" stroke="rgba(0,0,0,.16)" stroke-width="1.1" fill="none"/>`;
      if(o.ruf)u+=`<path d="M70 300 Q76 294 82 300 Q88 294 94 300 Q100 294 106 300 Q112 294 118 300 Q124 294 130 300 M66 344 Q73 337 80 344 Q87 337 94 344 Q100 337 106 344 Q113 337 120 344 Q127 337 134 344" stroke="${B}" stroke-width="3" fill="none"/>`;
      if(o.b)u+=hem(138,386,36,22,C,10);
      u+=crop(B,128)+neck(`url(#sk${id})`);sc=B;
      top+=palluFront(F,C);if(o.belt)top+=belt(C,134);
      break;}
    case 'lehenga':
      u+=skirt(136,388,72,22,F,6)+(o.b!==0?hem(136,388,72,22,C,16):'')+crop(B,126)+neck(`url(#sk${id})`);sc=B;top+=DUP(du,C);break;
    case 'halfsaree':
      u+=palluBack(du,C)+skirt(136,388,62,22,F,6)+hem(136,388,62,22,C,16)+crop(B,126)+neck(`url(#sk${id})`);sc=B;top+=palluFront(du,C);break;
    case 'anarkali':
      u+=slim(lo)+fitted(F,140)+skirt(138,336,60,21,F,6)+(o.b?hem(138,336,60,21,C,12):'')+neck(`url(#sk${id})`,92);top+=DUP(du,C);break;
    case 'kurta_pants':
      u+=slim(lo)+kurta(F,292,.1)+neck(`url(#sk${id})`,98);if(o.dup)top+=DUP(du,C);break;
    case 'kurta_palazzo':
      u+=wide(lo)+kurta(F,268,.13)+(o.b?kurtaHem(C,268,.13):'')+neck(`url(#sk${id})`,98);break;
    case 'kurta_jeans':
      u+=slim(lo)+kurta(F,232,.12)+neck(`url(#sk${id})`,98);break;
    case 'sharara':case 'gharara':
      u+=shararaP(F)+(tp==='gharara'?P('M84.6 272 L115.4 272 L115.8 286 L84.2 286Z',C):'')+kurta(F,214,.12)+(o.b?kurtaHem(C,214,.12):'')+neck(`url(#sk${id})`,96);top+=DUP(du,C);break;
    case 'patiala':
      u+=patialaP(lo)+kurta(F,226,.1)+neck(`url(#sk${id})`,98);top+=DUP(du,C);break;
    case 'dhoti':
      u+=dhotiP(lo)+kurta(F,206,.1)+neck(`url(#sk${id})`,98);break;
    case 'dhotijacket':
      u+=dhotiP(B)+crop(B,128)+neck(`url(#sk${id})`,94);mid+=P('M74 86 Q100 80 126 86 L131 248 L104 250 L100 98 L96 250 L69 248 Z',F)+belt(C,134);sc=null;break;
    case 'cape':
      u+=skirt(134,388,52,21,F,6)+crop(B,128)+P('M78 92 Q100 100 122 92 L122 96 Q100 104 78 96Z',`url(#sk${id})`);sc=null;
      top+=P('M76 86 Q100 80 124 86 L164 300 Q100 318 36 300 Z',A,'opacity=".55"')+`<path d="M36 300 Q100 318 164 300" stroke="${C}" stroke-width="5" fill="none"/><path d="M76 86 L36 300 M124 86 L164 300" stroke="${C}" stroke-width="1.5" fill="none"/>`;break;
    case 'sareegown': case 'gown':
      u+=fitted(F,146)+skirt(146,390,64,20,F,6)+(o.b?hem(146,390,64,20,C,8):'')+neck(`url(#sk${id})`,92);
      if(tp==='sareegown'){top+=palluFront(B,C);u=palluBack(B,C)+u;}
      break;
    case 'mermaid':
      u+=fitted(F,140)+P('M79 138 L83 284 Q62 350 48 392 Q100 402 152 392 Q138 350 117 284 L121 138 Z',F)+`<path d="M86 300 Q72 350 64 392 M114 300 Q128 350 136 392 M100 300 L100 398" ${FOLD}/>`+P('M77 86 Q100 80 123 86 L123 92 Q100 100 77 92Z',`url(#sk${id})`);break;
    case 'maxi':
      u+=fitted(F,140)+skirt(140,388,50,20,F,5)+neck(`url(#sk${id})`,96)+`<path d="M${100-31} 230 Q100 238 ${100+31} 230 M${100-41} 310 Q100 318 ${100+41} 310" stroke="rgba(0,0,0,.2)" stroke-width="1.6" fill="none"/>`;break;
    case 'dress':{
      const [H,W]=o.len==='mini'?[222,o.fit?23:28]:o.len==='knee'?[258,30]:[292,42];
      if(o.st==='slip'){u+=P('M80 102 Q100 110 120 102 L121 140 Q100 144 79 140Z',F)+`<path d="M85 86 L84 103 M115 86 L116 103" stroke="${A}" stroke-width="1.6"/>`;}
      else u+=fitted(F,140)+neck(`url(#sk${id})`,o.st==='wrap'?108:94);
      u+=skirt(140,H,W,20,F,o.fit?3:4);
      if(o.st==='wrap')u+=`<path d="M82 92 L118 140 L${100+W*.7} ${H}" stroke="rgba(0,0,0,.25)" stroke-width="1.5" fill="none"/>`+P('M114 136 L126 150 L121 154 L111 142Z',A);
      if(o.st==='shirt')u+=both(P('M92 82 L100 92 L96 96 L88 86Z','rgba(255,255,255,.75)'))+`<path d="M100 92 L100 ${H}" stroke="rgba(0,0,0,.25)" stroke-width="1.2"/>`+belt(C,136);
      break;}
    case 'jeans_top':
      u+=slim(`url(#dn${id})`)+tee(F,176)+neck(`url(#sk${id})`,92)+`<path d="M86 172 L86 190 M114 172 L114 190" stroke="#D9922E" stroke-width=".8" stroke-dasharray="2 1.5"/>`;
      if(o.gfx)u+=`<circle cx="100" cy="122" r="12" fill="${C}"/><path d="M93 122 L100 114 L107 122 L100 130Z" fill="${A}"/>`;
      if(o.blz){mid+=blazer(o.blz);sc=o.blz;}break;
    case 'suit':
      u+=straightT(A)+tee(B,170)+neck(`url(#sk${id})`,100);mid+=blazer(A);sc=A;break;
    case 'jumpsuit':
      u+=wide(F,146)+fitted(F,152)+P('M77 86 Q100 80 123 86 L122 94 Q100 100 78 94Z',`url(#sk${id})`)+P('M88 88 L100 112 L112 88Z',`url(#sk${id})`)+belt(C,146);sc=null;break;
    case 'coord':
      u+=wide(F,132)+crop(F,128)+neck(`url(#sk${id})`,92);break;
    case 'coord_skirt':
      u+=skirt(132,300,46,21,F,5)+crop(F,124)+neck(`url(#sk${id})`,92);break;
    case 'shrugset':
      u+=skirt(134,386,42,21,A,5)+`<path d="M80 150 Q110 200 128 386" stroke="rgba(0,0,0,.2)" stroke-width="2" fill="none"/>`+crop(F,124)+neck(`url(#sk${id})`,100);
      top+=both(P('M76 86 L64 334 L86 336 L92 104 Z',B,'opacity=".5"'));sc=B;so=.5;break;
    case 'skirt_top':
      u+=skirt(138,296,40,21,B,9)+fitted(F,142)+neck(`url(#sk${id})`,90)+`<path d="M80 120 L120 120 M80 128 L120 128" stroke="rgba(0,0,0,.06)"/>`;break;
    case 'pencil':
      u+=P('M79 138 Q100 134 121 138 L118 264 Q100 268 82 264 Z',B)+`<path d="M100 240 L100 266" stroke="rgba(0,0,0,.3)" stroke-width="1.2"/>`+fitted(F,142)+neck(`url(#sk${id})`,92)+belt('#5D4037',136);break;
    case 'kaftan':
      mid+=P('M70 86 Q100 80 130 86 L170 190 L142 200 L124 150 L134 382 Q100 390 66 382 L76 150 L58 200 L30 190 Z',F)+P('M66 368 L134 368 L134 382 Q100 390 66 382Z',C)+P('M30 190 L58 200 L56 206 L28 196Z',C)+MIR(P('M30 190 L58 200 L56 206 L28 196Z',C))+neck(`url(#sk${id})`,104)+`<path d="M92 84 L100 104 L108 84" stroke="${C}" stroke-width="2.5" fill="none"/><path d="M84 160 L80 370 M116 160 L120 370 M100 150 L100 380" ${FOLD}/>`;sc=null;break;
    case 'coat':
      u+=slim(`url(#dn${id})`)+tee(C,172)+neck(`url(#sk${id})`,90);mid+=coat(A);sc=A;break;
    case 'athleisure':
      u+=jogP(B,C)+tee(F,140)+P('M86 84 Q100 70 114 84 Q100 92 86 84Z','rgba(0,0,0,.18)')+`<path d="M96 92 L95 110 M104 92 L105 110" stroke="${C}" stroke-width="1.4"/>`;break;
    case 'custom':{
      const Ft=(o.p&&o.pp!=='bottom')?F:A, Fb=(o.p&&o.pp!=='top')?`url(#${id}b)`:B, SK=`url(#sk${id})`;
      switch(o.bot){
        case 'jeans':u+=slim(`url(#dn${id})`)+`<path d="M86 172 L86 190 M114 172 L114 190" stroke="#D9922E" stroke-width=".8" stroke-dasharray="2 1.5"/>`;break;
        case 'trousers':u+=straightT(Fb);break;
        case 'palazzo':u+=wide(Fb);break;
        case 'cigarette':u+=slim(Fb);break;
        case 'sharara':u+=shararaP(Fb);break;
        case 'patiala':u+=patialaP(Fb);break;
        case 'dhoti':u+=dhotiP(Fb);break;
        case 'flared':u+=skirt(138,296,40,21,Fb,5);break;
        case 'pleated':u+=skirt(138,296,40,21,Fb,9);break;
        case 'pencil':u+=P('M79 138 Q100 134 121 138 L118 264 Q100 268 82 264 Z',Fb)+`<path d="M100 240 L100 266" stroke="rgba(0,0,0,.3)" stroke-width="1.2"/>`;break;
        case 'maxiskirt':u+=skirt(138,388,50,21,Fb,6);break;
        case 'lehenga':u+=skirt(136,388,72,22,Fb,6)+hem(136,388,72,22,C,16);break;
        case 'saree':u+=palluBack(Fb,C)+skirt(138,386,36,22,Fb,5)+`<path d="M96 142 L94 384 M100 142 L100 386 M104 142 L106 384 M92 150 L88 382 M108 150 L112 382" stroke="rgba(0,0,0,.16)" stroke-width="1.1" fill="none"/>`+hem(138,386,36,22,C,10);top+=palluFront(Fb,C);break;
      }
      switch(o.topK){
        case 'tee':u+=tee(Ft,176)+neck(SK,92);break;
        case 'shirt':u+=tee(Ft,176)+both(P('M90 82 L100 92 L96 97 L86 86Z',shade(A,.12)))+`<path d="M100 92 L100 178" stroke="rgba(0,0,0,.25)" stroke-width="1.1"/>`+[110,128,146,164].map(y=>`<circle cx="101.6" cy="${y}" r="1" fill="rgba(0,0,0,.35)"/>`).join('');break;
        case 'crop':u+=crop(Ft,126)+neck(SK,92);break;
        case 'blouse':u+=crop(Ft,128)+neck(SK,98);break;
        case 'knit':u+=fitted(Ft,142)+neck(SK,90)+`<path d="M79 134 L121 134" stroke="rgba(0,0,0,.15)" stroke-width="1"/>`;break;
        case 'cami':u+=P('M80 102 Q100 110 120 102 L121 142 Q100 146 79 142Z',Ft)+`<path d="M85 86 L84 103 M115 86 L116 103" stroke="${A}" stroke-width="1.6"/>`;break;
        case 'offshoulder':u+=P('M74 100 Q100 106 126 100 L122 142 Q100 146 78 142 Z',Ft)+P('M64 96 Q100 108 136 96 L134 110 Q100 122 66 110Z',Ft)+`<path d="M70 106 L72 111 M82 110 L83 116 M94 112 L94 118 M106 112 L106 118 M118 110 L117 116 M130 106 L128 111" ${FOLD}/>`;break;
        case 'kurta':u+=kurta(Ft,268,.13)+neck(SK,98);break;
        case 'shortkurta':u+=kurta(Ft,214,.12)+neck(SK,96);break;
        case 'anarkalitop':u+=fitted(Ft,140)+skirt(138,336,60,21,Ft,6)+hem(138,336,60,21,C,10)+neck(SK,92);break;
      }
      sc=['cami','offshoulder'].includes(o.topK)?null:Ft;
      switch(o.layer){
        case 'dupatta':top+=dupatta(C,shade(C,-.3));break;
        case 'blazer':mid+=blazer(C);sc=C;break;
        case 'trench':mid+=coat(C);sc=C;break;
        case 'longjacket':mid+=P('M74 86 Q100 80 126 86 L131 248 L104 250 L100 98 L96 250 L69 248 Z',C)+`<path d="M100 98 L100 250" stroke="rgba(0,0,0,.2)"/>`;break;
        case 'cape':top+=P('M76 86 Q100 80 124 86 L164 300 Q100 318 36 300 Z',C,'opacity=".55"')+`<path d="M36 300 Q100 318 164 300" stroke="${shade(C,-.3)}" stroke-width="4" fill="none"/>`;break;
        case 'shrug':top+=both(P('M76 86 L64 334 L86 336 L92 104 Z',C,'opacity=".5"'));sc=C;so=.5;break;
      }
      if(o.belt)top+=belt(shade(C,-.35),136);
      break;}
    case 'offshoulder':
      u+=wide(lo,138)+P('M74 100 Q100 106 126 100 L122 142 Q100 146 78 142 Z',F)+P('M64 96 Q100 108 136 96 L134 110 Q100 122 66 110Z',F)+`<path d="M70 106 L72 111 M82 110 L83 116 M94 112 L94 118 M106 112 L106 118 M118 110 L117 116 M130 106 L128 111" ${FOLD}/>`;sc=null;break;
  }
  if(o.dupOv==='on'&&!/DUP|dupatta\(/.test('')&&!['lehenga','anarkali','sharara','gharara','patiala','saree','halfsaree','custom','sareegown'].includes(tp)&&!(tp==='kurta_pants'&&o.dup))top+=dupatta(du,C);
  const defs=pattern(o.p,id,A,B,C)+(tp==='custom'?pattern(o.p,id+'b',B,A,C):'')+
    `<linearGradient id="sk${id}" x1="0" x2="1"><stop offset="0" stop-color="${shade(S,-.16)}"/><stop offset=".38" stop-color="${S}"/><stop offset=".58" stop-color="${shade(S,.07)}"/><stop offset="1" stop-color="${shade(S,-.2)}"/></linearGradient>`+
    `<linearGradient id="hl${id}" x1="0" x2="1"><stop offset="0" stop-color="${Hc}"/><stop offset=".45" stop-color="${shade(Hc,.13)}"/><stop offset="1" stop-color="${shade(Hc,-.1)}"/></linearGradient>`+
    `<linearGradient id="vol${id}" gradientUnits="userSpaceOnUse" x1="52" x2="148" y1="0" y2="0"><stop offset="0" stop-color="#000" stop-opacity=".34"/><stop offset=".3" stop-color="#fff" stop-opacity=".13"/><stop offset=".46" stop-color="#fff" stop-opacity="0"/><stop offset=".74" stop-color="#000" stop-opacity=".08"/><stop offset="1" stop-color="#000" stop-opacity=".36"/></linearGradient>`+
    `<linearGradient id="vv${id}" gradientUnits="userSpaceOnUse" x1="0" x2="0" y1="80" y2="400"><stop offset="0" stop-color="#fff" stop-opacity=".08"/><stop offset=".55" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".16"/></linearGradient>`+
    `<filter id="wh${id}"><feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0"/></filter>`+
    `<mask id="mk${id}" maskUnits="userSpaceOnUse" x="0" y="0" width="200" height="410"><use href="#fg${id}" filter="url(#wh${id})"/></mask>`+
    pattern('denim','dn'+id,o.t==='coat'||o.t==='jeans_top'||o.t==='custom'?B:'#3D5A80',shade(B,.4),'')+
    `<filter id="ds${id}" x="-20%" y="-10%" width="140%" height="130%"><feDropShadow dx="2" dy="4" stdDeviation="4" flood-color="#000" flood-opacity=".18"/></filter>`;
  const hs=o.hs||'long';
  let hb='',hf='';
  const HF=`url(#hl${id})`;
  if(hs==='long')hb=P('M84 44 Q82 22 100 24 Q118 22 116 44 L122 128 Q112 136 100 133 Q88 136 78 128 Z',Hc)+`<path d="M84 60 Q82 100 82 126 M116 60 Q118 100 118 126" stroke="${shade(Hc,.25)}" stroke-width="1" fill="none" opacity=".6"/>`;
  if(hs==='bob')hb=P('M83 46 Q81 24 100 25 Q119 24 117 46 L119 74 Q111 78 105 70 L95 70 Q89 78 81 74Z',Hc);
  if(hs==='pony')hb=P('M108 30 Q132 40 124 112 Q118 86 110 46Z',Hc);
  hf=P('M85.2 49 Q83 24 100 24.4 Q117 24 114.8 49 Q113.6 37 108.5 32.4 Q104 30.6 100 31.6 Q96 30.6 91.5 32.4 Q86.4 37 85.2 49Z',HF)+`<path d="M100 25 L100 31.4 M98 26 Q92 28 88 36 M102 26 Q108 28 112 36" stroke="${shade(Hc,.18)}" stroke-width=".6" fill="none" opacity=".8"/>`;
  if(hs==='bun')hf+=`<circle cx="100" cy="24" r="9" fill="${HF}"/><path d="M93 22 Q100 17 107 22" stroke="${shade(Hc,.35)}" stroke-width=".8" fill="none"/>`+(o.c==='ethnic'?`<path d="M91 26 Q100 15 109 26" stroke="#FFFFFF" stroke-width="2.6" stroke-dasharray="1 2.4" fill="none"/>`:'');
  if(hs==='braid'){for(let i=0;i<8;i++)hf+=`<ellipse cx="${111+i*.5}" cy="${68+i*11}" rx="4.6" ry="6.4" fill="${shade(Hc,.06)}" stroke="${shade(Hc,-.3)}" stroke-width=".5"/>`;if(o.c==='ethnic')hf+=`<path d="M108 64 Q113 72 114 152" stroke="#FFFFFF" stroke-width="2.4" stroke-dasharray="1 2.2" fill="none"/>`;}
  const ethnic=o.c!=='western';
  const gold='#E2B13C';
  const deepN=tp==='saree'||tp==='lehenga'||tp==='halfsaree'||(tp==='custom'&&['blouse','crop','offshoulder'].includes(o.topK));
  const J=o.jw||(ethnic?'gold':'studs');
  const dy=deepN?6:0;
  const EAR=(f)=>f(85.6,54)+f(114.4,54);
  const JW={
    none:'',
    gold:`<path d="M90 76 Q100 ${88+dy} 110 76" stroke="${gold}" stroke-width="2.4" fill="none"/><circle cx="100" cy="${87+dy}" r="2.6" fill="${gold}"/>`+EAR((x,y)=>`<circle cx="${x}" cy="${y}" r="1.4" fill="${gold}"/><path d="M${x-2} ${y+1.5} Q${x} ${y+7} ${x+2} ${y+1.5}Z" fill="${gold}"/>`),
    temple:`<path d="M89 76 Q100 ${88+dy} 111 76" stroke="${gold}" stroke-width="2.6" fill="none"/><path d="M87 78 Q100 ${100+dy} 113 78" stroke="${gold}" stroke-width="2" fill="none" stroke-dasharray="2 1.2"/><path d="M96 ${96+dy} L104 ${96+dy} L100 ${104+dy}Z" fill="${gold}"/><circle cx="100" cy="${98+dy}" r="1.6" fill="#B3123F"/>`+EAR((x,y)=>`<circle cx="${x}" cy="${y}" r="1.6" fill="${gold}"/><path d="M${x-2.8} ${y+1.5} Q${x} ${y+9} ${x+2.8} ${y+1.5}Z" fill="${gold}"/><circle cx="${x}" cy="${y+8}" r=".8" fill="#fff"/>`),
    kundan:`<path d="M90.5 75 Q100 82 109.5 75" stroke="${gold}" stroke-width="4.2" fill="none"/>`+[92,95,98,101,104,107].map((x,i)=>`<circle cx="${x+.5}" cy="${77.6+Math.sin((i+.5)/6*Math.PI)*2.6}" r="1.2" fill="${i%2?'#0B6E4F':'#B3123F'}"/>`).join('')+EAR((x,y)=>`<path d="M${x-3} ${y+1} Q${x} ${y+8} ${x+3} ${y+1} Q${x} ${y+5} ${x-3} ${y+1}Z" fill="${gold}"/><circle cx="${x}" cy="${y+5.4}" r=".9" fill="#B3123F"/>`),
    pearl:Array.from({length:13},(_,i)=>{const t=i/12,x=89+22*t,y=76+4*Math.sin(t*Math.PI)*(3+dy/4);return `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="1.2" fill="#F7F3EA" stroke="#CFC6B4" stroke-width=".3"/>`}).join('')+EAR((x,y)=>`<circle cx="${x}" cy="${y+2}" r="1.6" fill="#F7F3EA" stroke="#CFC6B4" stroke-width=".3"/>`),
    oxidised:`<path d="M90 75.5 Q100 ${86+dy} 110 75.5" stroke="#7E848C" stroke-width="3.6" fill="none"/><path d="M90 75.5 Q100 ${86+dy} 110 75.5" stroke="#B9BEC4" stroke-width="1" fill="none" stroke-dasharray="1 1.4"/><circle cx="100" cy="${85+dy}" r="2.4" fill="#7E848C"/>`+EAR((x,y)=>`<circle cx="${x}" cy="${y}" r="1.4" fill="#7E848C"/><path d="M${x-2.6} ${y+1.5} Q${x} ${y+8} ${x+2.6} ${y+1.5}Z" fill="#7E848C"/>`),
    hoops:EAR((x,y)=>`<circle cx="${x}" cy="${y+3.2}" r="3.2" fill="none" stroke="${gold}" stroke-width="1"/>`),
    studs:`<path d="M92 76 Q100 ${84+dy} 108 76" stroke="${gold}" stroke-width=".7" fill="none"/>`+EAR((x,y)=>`<circle cx="${x}" cy="${y}" r="1.2" fill="${gold}"/>`)
  };
  const jw=(JW[J]??JW.gold)+(ethnic&&J!=='none'&&J!=='hoops'&&J!=='studs'&&o.t!=='dhotijacket'?`<circle cx="100" cy="39.2" r=".9" fill="#B3123F"/>`:'');
  const BG=o.bagc||'#7B1E3A';
  const BAG={none:'',
    clutch:`<rect x="125" y="196" width="22" height="13" rx="2" fill="${BG}" stroke="rgba(0,0,0,.3)" stroke-width=".5"/><path d="M125 198 L136 204 L147 198" stroke="rgba(0,0,0,.25)" fill="none"/><circle cx="136" cy="204" r="1.2" fill="${gold}"/>`,
    potli:`<path d="M134 207 L138 214" stroke="${gold}" stroke-width=".8"/><path d="M131 216 Q138 211 145 216 Q150 228 138 232 Q126 228 131 216Z" fill="${BG}" stroke="rgba(0,0,0,.3)" stroke-width=".5"/><path d="M131.5 217 Q138 213 144.5 217" stroke="${gold}" stroke-width="1.4" fill="none"/>`,
    tote:`<path d="M127 186 Q131 166 136 168 Q141 166 145 186" stroke="${shade(BG,-.3)}" stroke-width="1.6" fill="none"/><path d="M123 184 L149 184 L152 216 L120 216Z" fill="${BG}" stroke="rgba(0,0,0,.3)" stroke-width=".5"/>`,
    crossbody:`<path d="M88 88 L124 170" stroke="${shade(BG,-.35)}" stroke-width="1.4"/><rect x="115" y="167" width="20" height="16" rx="2" fill="${BG}" stroke="rgba(0,0,0,.3)" stroke-width=".5"/><path d="M115 172 L135 172" stroke="rgba(0,0,0,.25)"/><circle cx="125" cy="176" r="1" fill="${gold}"/>`
  };
  const bagS=BAG[o.bag||'none']||'';
  const arm='M79 87 Q65 90 66 122 Q64.5 160 63 196 Q61.5 209.5 67 210.5 Q72.5 209.5 71.8 198 Q72.5 162 74.5 146 L76 126 Z';
  const leg='M84 186 Q80.5 240 84.6 292 Q82 330 83.6 368 L92 368 Q93 334 95.2 296 Q100 246 99 205 Z';
  const bangles=ethnic?both(`<path d="M63.6 192 L71.4 193 M63.4 195 L71.4 196" stroke="${gold}" stroke-width="1.3"/>`):'';
  if(PH){hb='';hf='';}
  const bodyT=`translate(100 84) scale(${bt[1]} ${bt[2]}) translate(-100 -84)`;
  const head=PH?`<image href="${MODEL_HEAD}" x="62.8" y="19" width="72" height="60" preserveAspectRatio="none"/>`:'';
  const body=`<g id="fg${id}"><g transform="${bodyT}">
  ${hb}
  ${P('M78 86 Q100 80 122 86 L121 142 Q100 146 79 142 Z',`url(#sk${id})`)}${P('M95 58 L94.6 84 L105.4 84 L105 58Z',`url(#sk${id})`)}<path d="M94.5 66 Q100 70 105.5 66 L105.5 70 Q100 73 94.5 70Z" fill="${shade(S,-.25)}" opacity=".45"/>
  ${both(P(leg,`url(#sk${id})`))}
  ${both(`<path d="M80 372 Q80 367 88 366.5 Q96 367 96 372 Q95 377 88 377.5 Q81 377 80 372Z" fill="${shoe}"/><path d="M82 373 Q88 376 95 373" stroke="rgba(0,0,0,.3)" stroke-width=".8" fill="none"/>`)}
  ${u}
  ${both(P(arm,`url(#sk${id})`))}${bangles}
  ${mid}
  ${sleeve(sc?o.sl:'',sc,so)}
  ${top}
  ${bagS}
  ${PH?'':face(S,Hc,o,id)+hf+jw}
  </g></g>`;
  return `<svg viewBox="0 0 200 300" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid slice" role="img" aria-label="${(o.n||'Outfit').replace(/"/g,'')} illustration"><defs>${defs}</defs>
  ${bg?`<rect x="-200" y="-200" width="600" height="800" fill="${B}" opacity=".2"/><circle cx="100" cy="150" r="96" fill="${A}" opacity=".14"/><circle cx="160" cy="40" r="30" fill="${C}" opacity=".18"/>`:''}
  <g transform="translate(28 2) scale(.72)">
  <ellipse cx="100" cy="${84+(394-84)*bt[2]}" rx="${62*bt[1]}" ry="7" fill="rgba(0,0,0,.16)"/>
  <g ${MODEL.fx?`filter="url(#ds${id})"`:""}>${body}</g>
  <rect x="0" y="0" width="200" height="410" fill="url(#vol${id})" mask="url(#mk${id})"/>
  <rect x="0" y="0" width="200" height="410" fill="url(#vv${id})" mask="url(#mk${id})"/>
  ${head}${PH&&ethnic?jw.replace(/<circle cx="8[56][^>]*>|<path d="M8[3-7][^>]*>|<circle cx="11[45][^>]*>|<path d="M11[2-6][^>]*>|<circle cx="100" cy="39.2"[^>]*>/g,''):''}
  </g></svg>`;
}

/* ---------- GARMENT FLAT-LAYS ---------- */
const FLATN={tee:'T-shirt',graphic:'Graphic tee',shirt:'Shirt',silkblouse:'Silk blouse',blouse:'Saree blouse',crop:'Crop top',bralette:'Bralette',cami:'Camisole',kurta:'Kurta',shortkurta:'Short kurta',anarkali:'Anarkali',blazer:'Blazer',trench:'Trench coat',longjacket:'Long jacket',hoodie:'Crop hoodie',knit:'Knit top',offshoulder:'Off-shoulder top',jeans:'Jeans',trousers:'Trousers',palazzo:'Palazzo',cigarette:'Cigarette pants',churidar:'Churidar',sharara:'Sharara pants',gharara:'Gharara pants',patiala:'Patiala salwar',dhoti:'Dhoti pants',joggers:'Joggers',flares:'Flared trousers',widepants:'Wide-leg pants',skirt:'Flared skirt',pleated:'Pleated skirt',pencil:'Pencil skirt',drapeskirt:'Draped skirt',lehenga:'Lehenga skirt',saree:'Saree',dupatta:'Dupatta',cape:'Cape',shrug:'Sheer shrug',gown:'Gown',mermaid:'Mermaid gown',dress:'Dress',mini:'Mini dress',slip:'Slip dress',wrapdress:'Wrap dress',shirtdress:'Shirt dress',maxi:'Maxi dress',jumpsuit:'Jumpsuit',kaftan:'Kaftan',heels:'Pumps',strappy:'Strappy heels',platform:'Platform heels',juttis:'Juttis',kolhapuri:'Kolhapuris',sneakers:'Sneakers',loafers:'Loafers',sandals:'Flat sandals',boots:'Ankle boots',espadrilles:'Espadrilles',gladiator:'Gladiators',jhumka:'Jhumkas',necklace:'Necklace',choker:'Choker',hoops:'Hoops',studs:'Studs',bangles:'Bangles',clutch:'Clutch',tote:'Tote bag',potli:'Potli bag',crossbody:'Crossbody bag',minibag:'Mini bag',belt:'Belt',sunglasses:'Sunglasses',watch:'Watch',cap:'Cap',backpack:'Backpack',scarf:'Scarf'};

function flat(kind,c1='#999',c2,pat,label){
  const id='f'+(UID++);c2=c2||shade(c1,-.25);
  const fill=pat?`url(#${id}p)`:c1;
  const SH=`url(#${id}s)`;
  const ED='stroke="rgba(0,0,0,.28)" stroke-width=".7" stroke-linejoin="round"';
  const G=(d,f=fill)=>`<path d="${d}" fill="${f}" ${ED}/><path d="${d}" fill="${SH}"/>`;
  const ST=(d,c='rgba(255,255,255,.6)')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width=".7" stroke-dasharray="1.6 1.2"/>`;
  const L=(d,c='rgba(0,0,0,.2)',w=.8)=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  const gold='#D8A93B';
  let s='';
  switch(kind){
    case 'tee':case 'graphic':s=G('M30 22 L42 17 Q50 23 58 17 L70 22 L85 35 L76 45 L69 39 L69 87 Q50 89 31 87 L31 39 L24 45 L15 35 Z')+L('M42 17 Q50 25 58 17','rgba(0,0,0,.3)',2)+ST('M31 83 Q50 85 69 83')+ST('M17.5 37 L25 43.5 M82.5 37 L75 43.5')+(kind==='graphic'?`<circle cx="50" cy="48" r="10" fill="${c2}"/><path d="M44 48 L50 41 L56 48 L50 55Z" fill="${c1}"/>`:'');break;
    case 'shirt':case 'silkblouse':s=G('M33 20 L44 15 L50 22 L56 15 L67 20 L75 27 L85 77 L76 80 L68 41 L68 89 Q50 91 32 89 L32 41 L24 80 L15 77 L25 27 Z')+G('M44 15 L50 22 L45.5 28 L39.5 18.5Z',shade(c1,.06))+G('M56 15 L50 22 L54.5 28 L60.5 18.5Z',shade(c1,.06))+L('M50 22 L50 89','rgba(0,0,0,.22)')+[32,44,56,68,80].map(y=>`<circle cx="51.6" cy="${y}" r="1.1" fill="${kind==='shirt'?'#fff':shade(c1,.2)}" stroke="rgba(0,0,0,.3)" stroke-width=".4"/>`).join('')+L('M17 71 L25 74 M83 71 L75 74','rgba(0,0,0,.25)')+(kind==='shirt'?`<path d="M36 34 L45 34 L45 44 L36 44Z" fill="none" stroke="rgba(0,0,0,.2)" stroke-width=".6"/>`:'');break;
    case 'blouse':s=G('M34 30 L44 24 Q50 40 56 24 L66 30 L78 46 L71 52 L66 46 L66 68 Q50 72 34 68 L34 46 L29 52 L22 46 Z')+L('M72 49 L77.5 45 M28 49 L22.5 45',c2,3)+L('M44 24 Q50 40 56 24',c2,1.6)+ST('M34 64 Q50 68 66 64');break;
    case 'crop':s=G('M32 30 L43 25 Q50 32 57 25 L68 30 L78 41 L71 47 L67 42 L67 64 Q50 67 33 64 L33 42 L29 47 L22 41 Z')+L('M43 25 Q50 33 57 25','rgba(0,0,0,.3)',1.6)+ST('M33 60 Q50 63 67 60');break;
    case 'bralette':s=G('M30 44 Q40 32 50 44 Q60 32 70 44 L70 62 Q50 66 30 62 Z')+L('M36 36 L38 22 M64 36 L62 22','rgba(0,0,0,.45)',1.2)+L('M30 58 Q50 62 70 58',c2,2.5);break;
    case 'cami':s=G('M34 34 Q50 40 66 34 L68 84 Q50 87 32 84 Z')+L('M38 35 L40 18 M62 35 L60 18','rgba(0,0,0,.4)',1);break;
    case 'kurta':case 'shortkurta':{const hb=kind==='kurta'?94:76;s=G(`M36 12 L45 9 L50 17 L55 9 L64 12 L81 34 L74 40 L65 28 L67 ${hb} L54 ${hb} L54 ${hb-12} L46 ${hb-12} L46 ${hb} L33 ${hb} L35 28 L26 40 L19 34 Z`)+L('M50 17 L50 32','rgba(0,0,0,.3)',1)+`<circle cx="51.4" cy="22" r=".9" fill="${c2}"/><circle cx="51.4" cy="28" r=".9" fill="${c2}"/>`+`<path d="M33 ${hb-4} L46 ${hb-4} L46 ${hb} L33 ${hb}Z M54 ${hb-4} L67 ${hb-4} L67 ${hb} L54 ${hb}Z" fill="${c2}"/>`+L('M76 36 L79 33 M24 36 L21 33',c2,2.2);break;}
    case 'anarkali':s=G('M38 10 L46 8 L50 16 L54 8 L62 10 L75 26 L69 31 L61 24 L60 38 L88 92 Q50 98 12 92 L40 38 L39 24 L31 31 L25 26 Z')+`<path d="M15.5 86 Q50 92 84.5 86 L88 92 Q50 98 12 92Z" fill="${c2}"/>`+L('M40 38 Q50 41 60 38',c2,2)+L('M45 42 L36 92 M50 42 L50 95 M55 42 L64 92 M42 42 L24 90 M58 42 L76 90');break;
    case 'blazer':s=G('M30 16 L42 12 L50 40 L58 12 L70 16 L80 30 L83 80 L75 82 L70 42 L70 86 L52 86 L50 44 L48 86 L30 86 L30 42 L25 82 L17 80 L20 30 Z')+G('M42 12 L50 40 L44 35 L37 20Z',shade(c1,-.12))+G('M58 12 L50 40 L56 35 L63 20Z',shade(c1,-.12))+`<circle cx="48" cy="54" r="1.4" fill="${shade(c1,-.4)}"/><circle cx="48" cy="66" r="1.4" fill="${shade(c1,-.4)}"/>`+L('M33 66 L45 66 M55 66 L67 66','rgba(0,0,0,.3)',1)+L('M57 32 L65 32','rgba(0,0,0,.3)',.8);break;
    case 'trench':s=G('M30 10 L42 7 L50 30 L58 7 L70 10 L80 24 L84 72 L76 74 L71 34 L72 96 L52 96 L50 34 L48 96 L28 96 L29 34 L24 74 L16 72 L20 24 Z')+G('M42 7 L50 30 L43 27 L36 14Z',shade(c1,-.12))+G('M58 7 L50 30 L57 27 L64 14Z',shade(c1,-.12))+`<rect x="28.5" y="44" width="43" height="4" fill="${shade(c1,-.18)}"/><rect x="47" y="43.5" width="6" height="5" fill="none" stroke="${shade(c1,-.45)}" stroke-width=".8"/>`+[30,38,54,62].map(y=>`<circle cx="${y<46?44:44}" cy="${y}" r="1.1" fill="${shade(c1,-.45)}"/><circle cx="56" cy="${y}" r="1.1" fill="${shade(c1,-.45)}"/>`).join('')+ST('M28 92 L48 92 M52 92 L72 92','rgba(0,0,0,.3)');break;
    case 'longjacket':s=G('M34 10 L44 8 L50 30 L56 8 L66 10 L70 18 L70 94 L52 94 L50 34 L48 94 L30 94 L30 18 Z')+L('M44 8 L50 30 L56 8',c2,1.6)+ST('M30 90 L48 90 M52 90 L70 90',c2);break;
    case 'hoodie':s=G('M40 12 Q50 2 60 12 Q58 22 50 22 Q42 22 40 12Z',shade(c1,-.1))+G('M30 20 L42 16 Q50 24 58 16 L70 20 L84 66 L76 70 L69 38 L69 70 Q50 73 31 70 L31 38 L24 70 L16 66 Z')+`<path d="M38 52 L62 52 L64 66 L36 66Z" fill="none" stroke="rgba(0,0,0,.25)" stroke-width=".8"/>`+L('M47 22 L46 34 M53 22 L54 34',c2,1.2)+`<path d="M31 66 Q50 69 69 66 L69 70 Q50 73 31 70Z" fill="${shade(c1,-.15)}"/>`;break;
    case 'knit':s=G('M32 18 L43 14 Q50 20 57 14 L68 18 L83 74 L75 77 L68 38 L68 86 Q50 88 32 86 L32 38 L25 77 L17 74 Z')+L('M43 14 Q50 21 57 14','rgba(0,0,0,.3)',2.4)+`<path d="M32 80 Q50 82 68 80 L68 86 Q50 88 32 86Z" fill="${shade(c1,-.08)}"/>`+[36,40,44,48,52,56,60,64].map(x=>L(`M${x} 80.5 L${x} 86.5`,'rgba(0,0,0,.15)',.6)).join('')+L('M17 70 L25 73 M83 70 L75 73','rgba(0,0,0,.2)',1.2);break;
    case 'offshoulder':s=G('M20 32 Q50 40 80 32 L74 48 L72 80 Q50 83 28 80 L26 48 Z')+G('M16 28 Q50 38 84 28 L82 40 Q50 52 18 40 Z',shade(c1,.05))+[22,32,42,50,58,68,78].map(x=>L(`M${x} ${36+Math.abs(50-x)*-.1} L${x} ${43+Math.abs(50-x)*-.05}`)).join('');break;
    case 'jeans':case 'trousers':case 'widepants':case 'flares':case 'cigarette':case 'churidar':case 'joggers':{
      const D={jeans:'M30 10 L70 10 L71.5 18 L75 94 L56 94 L50 32 L44 94 L25 94 L28.5 18 Z',trousers:'M30 10 L70 10 L71.5 18 L77 94 L55 94 L50 32 L45 94 L23 94 L28.5 18 Z',widepants:'M30 10 L70 10 L72 18 L86 94 L53 94 L50 32 L47 94 L14 94 L28 18 Z',flares:'M31 10 L69 10 L70 18 L66 58 L80 94 L55 94 L50 34 L45 94 L20 94 L34 58 L30 18 Z',cigarette:'M33 10 L67 10 L68 18 L64 92 L53 92 L50 32 L47 92 L36 92 L32 18 Z',churidar:'M33 10 L67 10 L68 18 L62 94 L53 94 L50 32 L47 94 L38 94 L32 18 Z',joggers:'M31 10 L69 10 L70 18 L68 86 L54 86 L50 32 L46 86 L32 86 L30 18 Z'}[kind];
      const f2=kind==='jeans'?`url(#${id}d)`:fill;
      s=G(D[kind]||D,f2)+L('M29 18 L71 18','rgba(0,0,0,.3)',.9);
      if(kind==='jeans')s+=ST('M50 18 Q53.5 26 50.5 31','#D9922E')+ST('M30 21 Q37 27 41 18','#D9922E')+ST('M70 21 Q63 27 59 18','#D9922E')+ST('M26 90 L44 90 M56 90 L74 90','#D9922E')+`<circle cx="38" cy="21" r=".9" fill="#C9A04B"/><circle cx="62" cy="21" r=".9" fill="#C9A04B"/><rect x="48.5" y="11.5" width="3" height="5" rx=".8" fill="none" stroke="#C9A04B" stroke-width=".7"/>`;
      if(kind==='trousers'||kind==='widepants')s+=L('M38 22 L36 92 M62 22 L64 92','rgba(255,255,255,.35)',.8)+L('M44 18 L45 30 M56 18 L55 30','rgba(0,0,0,.18)');
      if(kind==='churidar')s+=[78,81,84,87,90].map(y=>L(`M${38+ (y-78)*.05} ${y} L${47} ${y+.5} M53 ${y+.5} L${62-(y-78)*.05} ${y}`,'rgba(0,0,0,.2)',.6)).join('');
      if(kind==='joggers')s+=`<rect x="32" y="82" width="14" height="5" fill="${shade(c1,-.12)}"/><rect x="54" y="82" width="14" height="5" fill="${shade(c1,-.12)}"/>`+L('M48 18 L46 26 M52 18 L54 26','#fff',1)+L('M30 22 L28 80 M70 22 L72 80',c2,1.6);
      if(kind==='flares'||kind==='widepants')s+=L('M38 60 L30 92 M62 60 L70 92');
      break;}
    case 'palazzo':s=G('M31 10 L69 10 L70 16 L90 94 L52 94 L50 30 L48 94 L10 94 L30 16 Z')+L('M30 16 L70 16','rgba(0,0,0,.3)',.9)+L('M36 24 L22 92 M42 26 L36 92 M64 24 L78 92 M58 26 L64 92');break;
    case 'sharara':case 'gharara':s=G('M33 10 L67 10 L68 16 L64 56 L88 94 L52 94 L50 34 L48 94 L12 94 L36 56 L32 16 Z')+L('M32 16 L68 16','rgba(0,0,0,.3)',.9)+L('M38 60 L22 92 M43 60 L38 92 M62 60 L78 92 M57 60 L62 92')+(kind==='gharara'?`<path d="M35.6 54 L48.6 54 L48.6 60 L35 60Z M51.4 54 L64.4 54 L65 60 L51.4 60Z" fill="${c2}"/>`:'');break;
    case 'patiala':s=G('M34 10 L66 10 Q86 50 64 90 L54 92 L50 34 L46 92 L36 90 Q14 50 34 10Z')+L('M37 18 Q26 50 40 86 M42 22 Q34 50 44 88 M63 18 Q74 50 60 86 M58 22 Q66 50 56 88')+`<path d="M36 86 L46 87 L46 92 L36 90Z M54 87 L64 86 L64 90 L54 92Z" fill="${shade(c1,-.12)}"/>`;break;
    case 'dhoti':s=G('M33 10 L67 10 Q82 50 63 92 L54 92 L50 48 L46 92 L37 92 Q18 50 33 10Z')+L('M50 14 Q42 32 50 48 Q58 32 50 14 M38 20 Q46 44 42 74 M62 20 Q54 44 58 74');break;
    case 'skirt':case 'pleated':case 'drapeskirt':s=G('M37 12 L63 12 L84 88 Q50 95 16 88 Z')+`<rect x="37" y="12" width="26" height="5" fill="${shade(c1,-.1)}"/>`+(kind==='pleated'?[22,28,34,40,46,52,58,64,70,76].map(x=>L(`M${38+ (x-16)*0.38} 18 L${x} 90`,'rgba(0,0,0,.18)',.7)).join(''):kind==='drapeskirt'?L('M40 18 Q62 46 74 90','rgba(0,0,0,.25)',1.4)+L('M44 18 Q60 40 64 92'):L('M42 18 L28 89 M50 18 L50 92 M58 18 L72 89'));break;
    case 'pencil':s=G('M35 12 L65 12 L63 86 L37 86 Z')+`<rect x="35" y="12" width="30" height="5" fill="${shade(c1,-.1)}"/>`+L('M50 72 L50 86','rgba(0,0,0,.4)',1)+L('M42 17 L43 28 M58 17 L57 28');break;
    case 'lehenga':s=G('M39 10 L61 10 L94 88 Q50 99 6 88 Z')+`<path d="M11 78 Q50 88 89 78 L94 88 Q50 99 6 88Z" fill="${c2}"/>`+`<path d="M11 78 Q50 88 89 78" stroke="${shade(c2,.35)}" stroke-width="1" fill="none" stroke-dasharray="1.5 1.5"/>`+`<rect x="39" y="10" width="22" height="5" fill="${c2}"/>`+L('M44 16 L26 82 M50 16 L50 92 M56 16 L74 82 M41 16 L14 80 M59 16 L86 80')+L('M60 13 Q66 20 64 32','#C9A04B',1)+`<circle cx="64" cy="33" r="1.6" fill="#C9A04B"/>`;break;
    case 'saree':s=G('M14 30 L72 30 L72 78 L14 78 Z')+G('M72 30 L90 26 L90 82 L72 78Z',fill)+`<rect x="14" y="30" width="58" height="7" fill="${c2}"/><rect x="14" y="71" width="58" height="7" fill="${c2}"/><path d="M72 30 L90 26 L90 33 L72 37Z M72 71 L90 75 L90 82 L72 78Z" fill="${c2}"/><path d="M78 37 L78 71 M84 35 L84 73" stroke="${c2}" stroke-width="2.4"/>`+L('M14 37 L72 37 M14 71 L72 71','rgba(255,255,255,.35)',.6)+L('M32 38 L32 70 M50 38 L50 70','rgba(0,0,0,.12)',.8)+`<path d="M14 30 L72 30 L72 78" fill="none" stroke="rgba(0,0,0,.25)" stroke-width=".7"/>`;break;
    case 'dupatta':s=`<path d="M14 18 Q50 62 86 18 L86 32 Q50 78 14 32 Z" fill="${fill}" opacity=".88" ${ED}/><path d="M14 18 Q50 62 86 18 L86 32 Q50 78 14 32 Z" fill="${SH}"/>`+L('M14 32 Q50 78 86 32',c2,2.4)+L('M14 18 Q50 62 86 18',c2,1.4)+[0,3,6,9,12].map(i=>L(`M${14+i*.0} ${19+i} L${10} ${21+i}`,c2,.8)+L(`M86 ${19+i} L90 ${21+i}`,c2,.8)).join('');break;
    case 'cape':case 'shrug':s=`<path d="M36 10 L64 10 L88 90 Q50 98 12 90 Z" fill="${fill}" opacity="${kind==='shrug'?.55:.7}" ${ED}/>`+L('M12 90 Q50 98 88 90',c2,kind==='cape'?3:1.5)+L('M36 10 L12 90 M64 10 L88 90',c2,1)+L('M44 10 Q50 20 56 10','rgba(0,0,0,.3)',1);break;
    case 'gown':case 'mermaid':case 'dress':case 'mini':case 'slip':case 'wrapdress':case 'shirtdress':case 'maxi':{
      const bodice=kind==='slip'?'M38 22 Q50 26 62 22 L62 38 Q50 40 38 38 Z':'M37 14 L45 12 Q50 18 55 12 L63 14 L63 38 Q50 40 37 38 Z';
      const skirtD={gown:'M37 38 Q50 40 63 38 L88 96 Q50 100 12 96 Z',maxi:'M37 38 Q50 40 63 38 L80 96 Q50 100 20 96 Z',mermaid:'M37 38 Q50 40 63 38 L61 70 L82 96 Q50 100 18 96 L39 70 Z',dress:'M37 38 Q50 40 63 38 L75 82 Q50 86 25 82 Z',wrapdress:'M37 38 Q50 40 63 38 L75 82 Q50 86 25 82 Z',shirtdress:'M37 38 Q50 40 63 38 L72 84 Q50 87 28 84 Z',slip:'M38 38 Q50 40 62 38 L72 86 Q50 89 28 86 Z',mini:'M37 38 Q50 40 63 38 L68 64 Q50 67 32 64 Z'}[kind];
      s=G(skirtD)+G(bodice);
      if(kind!=='slip')s+=G('M37 14 L45 12 L37 26 L28 22Z')+G('M63 14 L55 12 L63 26 L72 22Z');
      else s+=L('M40 22 L41 10 M60 22 L59 10','rgba(0,0,0,.45)',.9);
      if(kind==='wrapdress')s+=L('M45 12 L62 38 L66 82','rgba(0,0,0,.3)',1.1)+`<path d="M60 36 L68 44 L65 46 L58 39Z" fill="${c1}" ${ED}/>`;
      if(kind==='shirtdress')s+=L('M50 16 L50 84','rgba(0,0,0,.25)')+`<rect x="37" y="36" width="26" height="4" fill="${c2}"/>`+[22,30,48,58,68].map(y=>`<circle cx="51.5" cy="${y}" r=".9" fill="#fff" stroke="rgba(0,0,0,.3)" stroke-width=".3"/>`).join('');
      if(kind==='maxi')s+=L('M30 58 Q50 62 70 58 M24 78 Q50 83 76 78','rgba(0,0,0,.22)',1.1);
      if(kind==='gown'||kind==='mermaid')s+=L('M44 40 L30 96 M50 40 L50 98 M56 40 L70 96');
      else s+=L('M44 40 L38 82 M56 40 L62 82');
      if(c2&&kind==='gown')s+=`<path d="M14 92 Q50 96 86 92 L88 96 Q50 100 12 96Z" fill="${c2}"/>`;
      break;}
    case 'jumpsuit':s=G('M38 12 Q50 16 62 12 L64 40 L80 94 L54 94 L50 50 L46 94 L20 94 L36 40 Z')+`<path d="M38 12 L44 8 M62 12 L56 8" stroke="rgba(0,0,0,.4)" stroke-width="1"/><rect x="36" y="38" width="28" height="4" fill="${c2}"/>`+L('M42 50 L30 92 M58 50 L70 92');break;
    case 'kaftan':s=G('M38 10 L62 10 L92 40 L80 50 L66 34 L72 94 Q50 98 28 94 L34 34 L20 50 L8 40 Z')+`<path d="M29 88 Q50 92 71 88 L72 94 Q50 98 28 94Z" fill="${c2}"/>`+L('M44 10 L50 24 L56 10',c2,1.6)+L('M42 30 L36 90 M58 30 L64 90');break;
    /* footwear */
    case 'heels':case 'strappy':case 'platform':{const pf=kind==='platform',st=kind==='strappy';s=both2(`${st?'':`<path d="M8 70 Q8 62 18 61 Q30 60 38 58 Q44 56 48 52 L58 50 L58 62 Q44 64 34 70 Q22 74 8 74 Z" fill="${c1}" ${ED}/><path d="M8 70 Q8 62 18 61 Q30 60 38 58" stroke="#fff" stroke-width=".8" opacity=".4" fill="none"/>`}<path d="M8 74 Q22 74 34 70 Q44 64 58 62 L58 65 Q44 67 34 73 Q22 77 8 77Z" fill="${st?c1:shade(c1,-.4)}"/>${st?`<path d="M12 74 Q16 64 24 70 M24 72 Q30 62 36 68 M50 52 L56 50 L58 60" stroke="${c1}" stroke-width="2.4" fill="none"/>`:''}${pf?`<path d="M8 74 L32 72 L32 80 L8 80Z" fill="${shade(c1,-.4)}"/>`:''}<path d="M54 64 L58 63 L57.4 88 L55.4 88Z" fill="${shade(c1,-.35)}"/>`);break;}
    case 'juttis':s=both2(`<path d="M8 66 Q10 56 22 56 L50 58 Q56 58 58 52 Q60 60 56 68 L14 72 Q8 72 8 66Z" fill="${c1}" ${ED}/><path d="M8 68 L56 66 L56 69 L12 74Z" fill="${shade(c1,-.4)}"/><path d="M22 60 Q30 64 40 60" stroke="${c2}" stroke-width="1.6" fill="none"/>${[18,26,34,42,48].map(x=>`<circle cx="${x}" cy="62" r="1" fill="${c2}"/>`).join('')}`);break;
    case 'kolhapuri':s=`<g transform="translate(-2 0)"><ellipse cx="34" cy="54" rx="12" ry="30" fill="${c1}" ${ED}/><path d="M24 50 Q34 40 44 50 L44 56 Q34 46 24 56Z" fill="${shade(c1,-.2)}"/><path d="M34 26 L34 42" stroke="${shade(c1,-.3)}" stroke-width="2"/><circle cx="34" cy="26" r="2" fill="${shade(c1,-.3)}"/></g><g transform="translate(32 0)"><ellipse cx="34" cy="54" rx="12" ry="30" fill="${c1}" ${ED}/><path d="M24 50 Q34 40 44 50 L44 56 Q34 46 24 56Z" fill="${shade(c1,-.2)}"/><path d="M34 26 L34 42" stroke="${shade(c1,-.3)}" stroke-width="2"/><circle cx="34" cy="26" r="2" fill="${shade(c1,-.3)}"/></g>`;break;
    case 'sneakers':s=both2(`<path d="M8 64 Q8 52 18 52 Q26 52 32 46 L42 44 Q46 54 58 58 Q62 60 62 66 L62 70 L8 70Z" fill="${c1}" ${ED}/><path d="M8 68 L62 68 L62 74 Q35 76 8 74Z" fill="#F4F4F4" stroke="rgba(0,0,0,.25)" stroke-width=".6"/><path d="M30 50 L36 56 M34 48 L40 54 M38 46 L44 52" stroke="${c2||'#999'}" stroke-width="1.1"/><path d="M14 60 Q30 62 44 58" stroke="${c2||'#999'}" stroke-width="1.6" fill="none"/>`);break;
    case 'loafers':s=both2(`<path d="M8 66 Q8 56 20 56 L44 56 Q58 56 60 64 L60 70 L8 70Z" fill="${c1}" ${ED}/><path d="M8 68 L60 68 L60 72 L8 72Z" fill="${shade(c1,-.35)}"/><path d="M34 58 L50 58 L50 62 L34 62Z" fill="${shade(c1,-.15)}"/><path d="M8 72 L18 72 L18 75 L8 75Z" fill="${shade(c1,-.45)}"/>`);break;
    case 'sandals':case 'gladiator':case 'espadrilles':s=both2(`<path d="M8 70 L60 70 L60 74 L8 74Z" fill="${kind==='espadrilles'?'#D8BD8A':shade(c1,-.3)}"/>${kind==='espadrilles'?`<path d="M10 70 Q12 56 26 56 L46 58 Q58 60 60 70Z" fill="${c1}" ${ED}/><path d="M8 72 L60 72" stroke="#B89A66" stroke-dasharray="1 1"/>`:`<path d="M12 70 Q18 60 26 66 M28 70 Q34 58 42 66 M44 70 Q48 60 56 64" stroke="${c1}" stroke-width="2.4" fill="none"/>${kind==='gladiator'?`<path d="M44 40 L56 40 M44 48 L56 48 M44 56 L56 56 M50 36 L50 70" stroke="${c1}" stroke-width="2.2"/>`:''}`}`);break;
    case 'boots':s=both2(`<path d="M16 30 L40 30 L42 56 Q56 58 60 66 L60 72 L10 72 L12 60 Z" fill="${c1}" ${ED}/><path d="M10 72 L60 72 L60 76 L10 76Z" fill="${shade(c1,-.4)}"/><path d="M12 72 L22 72 L22 80 L12 80Z" fill="${shade(c1,-.45)}"/><path d="M38 32 L38 54" stroke="rgba(0,0,0,.3)" stroke-width=".8"/>`);break;
    /* jewellery & bags */
    case 'jhumka':s=[30,70].map(x=>`<circle cx="${x}" cy="22" r="4" fill="${gold}" stroke="${shade(gold,-.35)}" stroke-width=".6"/><path d="M${x} 26 L${x} 34" stroke="${gold}" stroke-width="1.4"/><path d="M${x-12} 56 Q${x-12} 34 ${x} 34 Q${x+12} 34 ${x+12} 56 Z" fill="${gold}" stroke="${shade(gold,-.35)}" stroke-width=".7"/><path d="M${x-12} 56 Q${x} 50 ${x+12} 56" stroke="${shade(gold,-.3)}" stroke-width=".8" fill="none"/><circle cx="${x}" cy="44" r="2.2" fill="${c1}"/>${[-10,-6,-2,2,6,10].map(d=>`<circle cx="${x+d}" cy="${60+Math.abs(d)*-.15}" r="1.6" fill="#F4EEE6" stroke="${shade(gold,-.3)}" stroke-width=".4"/>`).join('')}`).join('');break;
    case 'necklace':case 'choker':{const ch=kind==='choker';s=`<path d="M16 ${ch?24:16} Q50 ${ch?70:86} 84 ${ch?24:16}" stroke="${gold}" stroke-width="${ch?7:3}" fill="none" stroke-linecap="round"/>`+`<path d="M18 ${ch?24:16} Q50 ${ch?68:84} 82 ${ch?24:16}" stroke="${shade(gold,.3)}" stroke-width="1" fill="none" stroke-dasharray="1.6 2"/>`+(ch?[24,34,44,50,56,66,76].map(x=>{const t=(x-16)/68,y=24+(70-24)*4*t*(1-t)*.5+4;return `<circle cx="${x}" cy="${y.toFixed(1)}" r="2.2" fill="${c1}" stroke="${gold}" stroke-width=".8"/>`}).join(''):`<path d="M44 52 L56 52 L50 68 Z" fill="${gold}" stroke="${shade(gold,-.35)}" stroke-width=".7"/><circle cx="50" cy="57" r="3" fill="${c1}"/><path d="M50 68 L50 74" stroke="${gold}"/><circle cx="50" cy="76" r="2" fill="#F4EEE6"/>`);break;}
    case 'hoops':s=`<circle cx="32" cy="50" r="16" fill="none" stroke="${gold}" stroke-width="3.2"/><circle cx="68" cy="50" r="16" fill="none" stroke="${gold}" stroke-width="3.2"/><path d="M22 40 Q26 36 30 35" stroke="#fff" stroke-width="1" opacity=".6" fill="none"/>`;break;
    case 'studs':s=`<circle cx="35" cy="50" r="7" fill="${c1}" stroke="${gold}" stroke-width="1.6"/><circle cx="65" cy="50" r="7" fill="${c1}" stroke="${gold}" stroke-width="1.6"/><circle cx="33" cy="48" r="2" fill="#fff" opacity=".7"/><circle cx="63" cy="48" r="2" fill="#fff" opacity=".7"/>`;break;
    case 'bangles':s=[0,6,12,18,24].map(i=>`<ellipse cx="50" cy="${36+i}" rx="26" ry="9" fill="none" stroke="${i%12===0?gold:c1}" stroke-width="3.2"/>`).join('');break;
    case 'clutch':s=G('M16 38 L84 38 L84 70 Q84 74 80 74 L20 74 Q16 74 16 70 Z')+G('M16 38 L84 38 L50 58 Z',shade(c1,-.1))+`<circle cx="50" cy="56" r="3" fill="${gold}"/>`;break;
    case 'minibag':s=`<path d="M30 40 Q50 14 70 40" stroke="${shade(c1,-.3)}" stroke-width="2.4" fill="none"/>`+G('M22 40 L78 40 L80 78 L20 78 Z')+`<rect x="44" y="46" width="12" height="6" rx="1" fill="${gold}"/>`;break;
    case 'tote':s=`<path d="M32 36 Q34 14 44 14 Q50 14 50 36 M50 36 Q50 14 58 14 Q66 14 68 36" stroke="${shade(c1,-.3)}" stroke-width="2.2" fill="none"/>`+G('M18 36 L82 36 L76 90 L24 90 Z')+ST('M22 42 L78 42');break;
    case 'potli':s=G('M30 34 Q50 40 70 34 Q86 60 72 86 Q50 94 28 86 Q14 60 30 34Z')+`<path d="M30 34 Q40 24 50 30 Q60 24 70 34" stroke="${gold}" stroke-width="2" fill="none"/><path d="M30 36 Q50 42 70 36" stroke="${gold}" stroke-width="2.4" fill="none"/>`+[36,44,52,60].map(x=>`<circle cx="${x+4}" cy="62" r="1.6" fill="${gold}"/>`).join('')+`<path d="M50 40 L46 54 M50 40 L54 54" stroke="${gold}" stroke-width="1"/><circle cx="46" cy="56" r="2" fill="${gold}"/><circle cx="54" cy="56" r="2" fill="${gold}"/>`;break;
    case 'crossbody':s=`<path d="M14 12 L30 44 M86 12 L70 44" stroke="${shade(c1,-.3)}" stroke-width="1.6"/>`+G('M26 44 L74 44 L74 80 L26 80 Z')+G('M26 44 L74 44 L74 60 Q50 66 26 60 Z',shade(c1,-.08))+`<circle cx="50" cy="60" r="2.2" fill="${gold}"/>`;break;
    case 'backpack':s=G('M28 24 Q50 10 72 24 L76 88 L24 88 Z')+G('M34 54 L66 54 L66 80 L34 80 Z',shade(c1,-.1))+L('M38 60 L62 60','rgba(255,255,255,.5)');break;
    case 'belt':s=`<path d="M8 46 L92 46 L92 56 L8 56Z" fill="${c1}" ${ED}/><rect x="56" y="43" width="12" height="16" rx="2" fill="none" stroke="${gold}" stroke-width="2"/><path d="M62 51 L72 51" stroke="${gold}" stroke-width="1.6"/>${[20,28,36].map(x=>`<circle cx="${x+50}" cy="51" r="1" fill="rgba(0,0,0,.4)"/>`).join('')}`;break;
    case 'sunglasses':s=`<path d="M14 44 L44 44 Q44 62 30 62 Q16 62 14 44Z M56 44 L86 44 Q84 62 70 62 Q56 62 56 44Z" fill="#2A2A2A"/><path d="M44 46 Q50 42 56 46" stroke="#2A2A2A" stroke-width="2" fill="none"/><path d="M14 44 L6 40 M86 44 L94 40" stroke="#2A2A2A" stroke-width="2"/><path d="M20 48 L28 48" stroke="#fff" opacity=".4"/>`;break;
    case 'watch':s=`<rect x="42" y="10" width="16" height="80" rx="4" fill="${c1}"/><circle cx="50" cy="50" r="15" fill="#FAFAFA" stroke="${gold}" stroke-width="3"/><path d="M50 50 L50 41 M50 50 L56 53" stroke="#333" stroke-width="1.2"/>`;break;
    case 'cap':s=G('M20 56 Q22 26 50 26 Q78 26 80 56 Z')+G('M60 54 L94 58 Q90 64 60 62Z',shade(c1,-.1))+`<circle cx="50" cy="27" r="2" fill="${shade(c1,-.3)}"/>`;break;
    case 'scarf':s=G('M30 10 L70 10 L70 30 L60 92 L48 92 L52 32 L44 32 L40 80 L28 80 Z');break;
    default:s=`<rect x="20" y="20" width="60" height="60" fill="${c1}"/>`;
  }
  const defs=pattern(pat,id+'p',c1,c2,c2)+pattern('denim',id+'d',c1,shade(c1,.35),'')+`<linearGradient id="${id}s" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#fff" stop-opacity=".26"/><stop offset=".45" stop-color="#fff" stop-opacity="0"/><stop offset="1" stop-color="#000" stop-opacity=".22"/></linearGradient><filter id="${id}f" x="-10%" y="-10%" width="130%" height="130%"><feDropShadow dx="1.2" dy="2" stdDeviation="1.6" flood-color="#000" flood-opacity=".22"/></filter>`;
  return `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="${label||FLATN[kind]||kind}"><defs>${defs}</defs><g filter="url(#${id}f)">${s}</g></svg>`;
}
function both2(s){return `<g transform="translate(-4 -10)">${s}</g><g transform="translate(36 6)">${s}</g>`}

/* pieces that make up each look */
function footKind(t){t=(t||'').toLowerCase();const m=[['barefoot','juttis'],['jutti','juttis'],['mojari','juttis'],['kolhapuri','kolhapuri'],['sneaker','sneakers'],['loafer','loafers'],['mary jane','loafers'],['mule','loafers'],['strappy','strappy'],['platform','platform'],['espadrille','espadrilles'],['gladiator','gladiator'],['boot','boots'],['pump','heels'],['heel','heels'],['sandal','sandals'],['flat','sandals']];for(const [k,v] of m)if(t.includes(k))return v;return 'heels'}
function accKinds(t,ethnic){t=(t||'').toLowerCase();const m=[['jhumka','jhumka'],['chandbali','jhumka'],['earring','jhumka'],['choker','choker'],['temple','necklace'],['kasu','necklace'],['haar','necklace'],['necklace','necklace'],['pendant','necklace'],['chain','necklace'],['hoop','hoops'],['stud','studs'],['pearl','studs'],['bangle','bangles'],['chooda','bangles'],['clutch','clutch'],['minaudi','clutch'],['potli','potli'],['tote','tote'],['crossbody','crossbody'],['shoulder bag','minibag'],['mini bag','minibag'],['top-handle','minibag'],['straw bag','tote'],['fringe bag','crossbody'],['backpack','backpack'],['belt bag','crossbody'],['watch','watch'],['sunglasses','sunglasses'],['cap','cap'],['scarf','scarf'],['belt','belt']];const out=[];for(const [k,v] of m)if(t.includes(k)&&!out.includes(v))out.push(v);if(!out.length)out.push(ethnic?'jhumka':'hoops');if(!t.includes('earring')&&!out.some(x=>['jhumka','hoops','studs'].includes(x))&&ethnic)out.unshift('jhumka');return out.slice(0,3)}
function kit(o){
  const [A,B,C]=o.col,lo=o.lo||B,du=o.du||C,p=o.p||'';
  const K={
    saree:[['saree',A,C,p],[o.belt?'shirt':'blouse',B,C]].concat(o.belt?[['belt',C]]:[]),
    lehenga:[['lehenga',A,C,p],['blouse',B,C],['dupatta',du,C]],
    halfsaree:[['lehenga',A,C,p],['blouse',B,C],['dupatta',du,C]],
    anarkali:[['anarkali',A,C,p],['churidar',lo],['dupatta',du,C]],
    kurta_pants:[['kurta',A,C,p],['cigarette',lo]].concat(o.dup?[['dupatta',du,C]]:[]),
    kurta_palazzo:[['kurta',A,C,p],['palazzo',lo]],
    kurta_jeans:[['shortkurta',A,C,p],['jeans',lo]],
    sharara:[['shortkurta',A,C,p],['sharara',A,C,p],['dupatta',du,C]],
    gharara:[['shortkurta',A,C,p],['gharara',A,C,p],['dupatta',du,C]],
    patiala:[['shortkurta',A,C,p],['patiala',lo],['dupatta',du,C,'dots']],
    dhoti:[['shortkurta',A,C,p],['dhoti',lo]],
    dhotijacket:[['longjacket',A,C,p],['crop',B],['dhoti',B]],
    cape:[['crop',B],['lehenga',A,B,p],['cape',A,C]],
    sareegown:[['gown',A,C,p],['dupatta',B,C]],
    gown:[['gown',A,C,p]],
    mermaid:[['mermaid',A,B,p]],
    maxi:[['maxi',A,B,p]],
    dress:[[o.st==='slip'?'slip':o.st==='wrap'?'wrapdress':o.st==='shirt'?'shirtdress':o.len==='mini'?'mini':'dress',A,o.st==='shirt'?C:B,p]],
    jeans_top:(o.blz?[['blazer',o.blz]]:[]).concat([[o.gfx?'graphic':'tee',A,C,p],[o.trou?'trousers':'jeans',B]]),
    suit:[['blazer',A],['trousers',A],['cami',B]],
    jumpsuit:[['jumpsuit',A,C,p]],
    coord:[['crop',A,B,p],['widepants',A,B,p]],
    coord_skirt:[['crop',A,B,p],['skirt',A,B,p]],
    shrugset:[['bralette',A,B,p],['drapeskirt',A],['shrug',B,C]],
    skirt_top:[['knit',A],['pleated',B]],
    pencil:[['silkblouse',A],['pencil',B]],
    kaftan:[['kaftan',A,C,p]],
    coat:[['trench',A],['knit',C],['jeans',B]],
    athleisure:[['hoodie',A,C],['joggers',B,C]],
    offshoulder:[['offshoulder',A],['flares',lo]]
  }[o.t]||[];
  const ethnic=o.c!=='western';
  const fk=footKind(o.ft);const fc=o.shoe||(ethnic?'#C9A04B':'#3E2723');
  const out=K.map(x=>({k:x[0],c1:x[1],c2:x[2],p:x[3]}));
  out.push({k:fk,c1:fc,c2:ethnic?'#B3123F':'#FFFFFF'});
  accKinds(o.ac,ethnic).forEach(k=>out.push({k,c1:k==='bangles'?A:(['clutch','tote','potli','crossbody','minibag','backpack','cap','belt','watch','scarf'].includes(k)?(ethnic?C:shade(B,-.1)):'#B3123F'),c2:C}));
  return out;
}
const flatOf=x=>flat(x.k,x.c1,x.c2,x.p,FLATN[x.k]);

/* ---------- PROMPTS ---------- */
const SETTING={wedding:'at a decorated Indian wedding venue with marigold garlands and warm fairy lights',sangeet:'on a glowing sangeet stage with festive lights',mehendi:'in a sunlit courtyard decorated for a mehendi with floral swings',haldi:'at a bright haldi ceremony with marigolds and turmeric-yellow decor',festive:'in a home lit with diyas and rangoli for Diwali',pooja:'in front of a carved stone temple doorway',office:'in a bright modern office lobby',interview:'in a sleek glass-walled corporate office',date:'at a candlelit rooftop restaurant at dusk',brunch:'at a sunny garden café',party:'in a nightclub with neon and disco lights',cocktail:'at an elegant hotel cocktail lounge',formal:'on a grand ballroom staircase',travel:'at a busy international airport terminal',college:'on a leafy university campus',beach:'on a tropical beach at golden hour'};
function promptFor(o){
  const who=MODEL.ref?`the same woman as in the attached reference photo (identical face, hair and skin tone${MODEL.bt!=='regular'?`, ${BODY[MODEL.bt][0].toLowerCase()} body type`:', same body'})`:(o.r==='Indian'||!o.md?'an Indian woman':`a ${o.md} woman`);
  const pieces=(o.pc||[]).join(', ');
  return `Photorealistic full-length fashion photograph of ${who}${MODEL.ref?'':' model'} wearing ${pieces||o.n}, in ${o.cn}. Footwear: ${o.ft||'matching footwear'}. Accessories: ${o.ac||'minimal'}. Styled ${SETTING[(o.occ||['brunch'])[0]]}. Natural pose, true-to-life skin texture, accurate fabric detail and drape, soft natural light, 85mm lens, shallow depth of field, editorial fashion magazine quality, 4:5 vertical frame.`;
}

/* ---------- OCCASION WARDROBES (flat-lay pieces) ---------- */
const OCCKIT={
 wedding:{w:[['saree','#7B1E3A','#C9A04B','brocade','Banarasi silk saree'],['lehenga','#0B6E4F','#C9A04B','brocade','Embroidered lehenga'],['anarkali','#1E3A8A','#E8C266','','Floor-length anarkali'],['juttis','#C9A04B','#B3123F','','Gold juttis'],['choker','#0B6E4F','','','Kundan choker'],['potli','#7B1E3A','','','Potli bag']],x:[['dress','#FFFFFF','#EEEEEE','','All-white outfit'],['mini','#151515','#151515','','Short hemlines']]},
 sangeet:{w:[['saree','#B79AE6','#E9DDFB','sequin','Sequin saree'],['sharara','#7B2CBF','#E2B13C','sequin','Sharara set'],['dhoti','#151515','','','Dhoti pants'],['crop','#C9A04B','#5A3E12','brocade','Brocade crop top'],['strappy','#C8C8C8','','','Metallic heels'],['jhumka','#7B2CBF','','','Statement jhumkas']],x:[['dupatta','#B3122E','#E3B04B','','Heavy trailing dupattas'],['platform','#151515','','','Very high heels']]},
 mehendi:{w:[['lehenga','#A8E6CF','#F6A5C0','mirror','Mirror-work lehenga'],['gharara','#2E7D32','#E2B13C','','Gharara set'],['shortkurta','#FFD3B6','#F6A5C0','chikan','Short kurta'],['palazzo','#F4EFE3','','','Palazzo'],['juttis','#F6A5C0','#2E7D32','','Embroidered juttis'],['bangles','#2E7D32','','','Bangles']],x:[['blouse','#151515','#151515','','Long tight sleeves'],['silkblouse','#FFFFFF','','','Stain-showing whites']]},
 haldi:{w:[['kurta','#FFD60A','#F4A300','floral','Yellow gota kurta'],['palazzo','#FFF3B0','','','Pale yellow palazzo'],['lehenga','#FFC107','#F4A300','','Cotton lehenga'],['dupatta','#FFF3B0','#F4A300','','Mul dupatta'],['sandals','#C9A04B','','','Washable flats'],['necklace','#F4A300','','','Floral jewellery']],x:[['saree','#7B1E3A','#C9A04B','brocade','Expensive silk'],['shirt','#FFFFFF','','','White clothes']]},
 festive:{w:[['saree','#E65100','#C9A04B','brocade','Silk saree'],['lehenga','#E53935','#00897B','mirror','Chaniya choli'],['anarkali','#0F5132','#D4AF37','','Anarkali'],['sharara','#B3122E','#E2B13C','','Sharara set'],['juttis','#C9A04B','#B3123F','','Juttis'],['jhumka','#B3123F','','','Gold jhumkas']],x:[['dress','#424242','#424242','','Dark dull colours'],['gown','#9E9E9E','#9E9E9E','sequin','Synthetic near diyas']]},
 pooja:{w:[['saree','#F5EBDC','#C9A04B','','Ivory cotton-silk saree'],['blouse','#B3122E','#C9A04B','','Elbow-sleeve blouse'],['kurta','#FAF7F0','#D9CBB0','chikan','Chikankari kurta'],['dupatta','#F4A300','#B3122E','','Dupatta to cover head'],['kolhapuri','#A0522D','','','Easy slip-off footwear'],['necklace','#B3123F','','','Temple jewellery']],x:[['belt','#3E2723','','','Leather belts'],['cami','#151515','','','Sleeveless tops']]},
 office:{w:[['kurta','#2B3F8C','#F3EFE6','block','Cotton kurta'],['cigarette','#F3EFE6','','','Straight pants'],['shirt','#FFFFFF','','','Crisp shirt'],['trousers','#1F2A55','','','Tailored trousers'],['loafers','#7A4B2A','','','Loafers'],['tote','#C19A6B','','','Structured tote']],x:[['mini','#C8C8C8','#9E9E9E','sequin','Sequins & shine'],['crop','#E91E63','','','Crop tops']]},
 interview:{w:[['blazer','#1F2A55','','','Navy blazer'],['trousers','#1F2A55','','','Matching trousers'],['silkblouse','#F2B8C6','','','Silk blouse'],['pencil','#2D2D2D','','','Pencil skirt'],['heels','#2B2B2B','','','Mid-height pumps'],['studs','#FAFAFA','','','Small studs']],x:[['graphic','#E53935','#FAFAFA','','Loud prints & slogans'],['sneakers','#FF8A65','#fff','','Casual sneakers']]},
 date:{w:[['slip','#E8C9A0','#F5E3C8','','Satin slip dress'],['wrapdress','#B3122E','#7BC8A4','','Wrap dress'],['jumpsuit','#151515','#E2B13C','','Jumpsuit'],['offshoulder','#FFFFFF','','','Off-shoulder top'],['strappy','#C9A04B','','','Strappy heels'],['minibag','#151515','','','Mini bag']],x:[['hoodie','#9E9E9E','#fff','','Gym wear'],['boots','#5D4037','','','Shoes you can’t walk in']]},
 brunch:{w:[['dress','#FFD54F','#FFFFFF','floral','Floral sundress'],['crop','#B9A6E0','','','Co-ord top'],['widepants','#B9A6E0','','','Co-ord pants'],['shortkurta','#C2185B','#F4A300','block','Printed kurti'],['espadrilles','#F3E9DC','','','Espadrilles'],['sunglasses','#222','','','Sunglasses']],x:[['mini','#C8C8C8','#9E9E9E','sequin','Heavy sequins'],['gown','#0D3B8C','#2856C8','','Evening gowns']]},
 party:{w:[['mini','#C8C8C8','#9E9E9E','sequin','Sequin mini'],['dress','#E91E63','#E91E63','','Bodycon dress'],['jumpsuit','#1F4FD1','#E2B13C','','Jumpsuit'],['saree','#F3A6C0','#FFFFFF','sequin','Party saree'],['platform','#E2B13C','','','Platform heels'],['clutch','#C8C8C8','','','Metallic clutch']],x:[['kurta','#E1A21B','#0E5E6F','block','Daywear cottons'],['knit','#A1887F','','','Dull, flat colours']]},
 cocktail:{w:[['gown','#00796B','#E2C275','','Saree gown'],['lehenga','#F5EBDC','#C9A04B','sequin','Cape lehenga'],['cape','#F5EBDC','#C9A04B','','Sheer cape'],['slip','#E8C9A0','#F5E3C8','','Satin slip'],['strappy','#C9A04B','','','Strappy heels'],['clutch','#C9A04B','','','Clutch']],x:[['jeans','#3D5A80','','','Casual denim'],['hoodie','#FF8A65','#fff','','Loungewear']]},
 formal:{w:[['mermaid','#0D3B8C','#2856C8','sequin','Mermaid gown'],['gown','#0B6E4F','#E2B13C','','A-line gown'],['saree','#0B6E4F','#C2185B','brocade','Kanjeevaram saree'],['heels','#C0C0C0','','','Silver heels'],['studs','#E8EEF2','','','Drop earrings'],['clutch','#C0C0C0','','','Minaudière']],x:[['mini','#E91E63','','','Short hemlines'],['sneakers','#FFFFFF','#999','','Everyday sneakers']]},
 travel:{w:[['trench','#C19A6B','','','Trench coat'],['knit','#F3E9DC','','','Soft knit'],['jeans','#2F4B7C','','','Jeans'],['hoodie','#FF8A65','#fff','','Crop hoodie'],['sneakers','#FFFFFF','#999','','Sneakers'],['crossbody','#5D4037','','','Crossbody bag']],x:[['strappy','#C9A04B','','','Stiff new shoes'],['necklace','#B3123F','','','Lots of jewellery']]},
 college:{w:[['graphic','#E53935','#FAFAFA','','Graphic tee'],['jeans','#2F4B7C','','','Straight jeans'],['shortkurta','#00796B','#F3E9DC','ikat','Short kurta'],['pleated','#A1887F','','','Pleated skirt'],['sneakers','#FAFAFA','#E53935','','Canvas sneakers'],['backpack','#37474F','','','Backpack']],x:[['saree','#7B1E3A','#C9A04B','brocade','Precious silks'],['heels','#151515','','','High heels']]},
 beach:{w:[['kaftan','#FF6F59','#E2B13C','floral','Kaftan'],['maxi','#B5502A','#E9A66B','','Boho maxi'],['slip','#FFD54F','#FFFFFF','floral','Sundress'],['crop','#1FB5AC','','','Linen co-ord'],['espadrilles','#F4E1C1','','','Espadrilles'],['sunglasses','#222','','','Sunglasses']],x:[['trench','#3E2723','','','Heavy fabrics'],['heels','#151515','','','Heels in sand']]}
};
const kitFlat=x=>flat(x[0],x[1],x[2]||undefined,x[3]||'',x[4]);

/* colour combos as outfits: [top kind, bottom kind] */
const COMBOFITS=[['shortkurta','palazzo'],['blouse','saree'],['blouse','lehenga'],['kurta','cigarette'],['blazer','trousers'],['tee','jeans'],['kurta','palazzo'],['crop','skirt'],['knit','trousers'],['crop','widepants'],['wrapdress','dupatta'],['jumpsuit','belt']];
