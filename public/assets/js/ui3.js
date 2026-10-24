/* ---------- STATE & HELPERS ---------- */
const $=s=>document.querySelector(s);
const photos=Object.assign({},typeof PHOTOS!=='undefined'?PHOTOS:{});
const VARIANTS=typeof VARIANT_PHOTOS!=='undefined'?VARIANT_PHOTOS:{};
const HAS=o=>!!photos[o.id];
const CATN={ethnic:'Ethnic',fusion:'Fusion',western:'Western'};
let saved=new Set();try{saved=new Set(JSON.parse(localStorage.getItem('usg-saved')||'[]'))}catch(e){}
let SITE={hidden:[],featured:[],announce:'',announceOn:false};
const persist=(user)=>{try{localStorage.setItem('usg-saved',JSON.stringify([...saved]))}catch(e){}$('#savedCount').textContent=saved.size;if(user&&typeof ACCT!=='undefined')ACCT.onSaved()};
const F={cat:'all',reg:'all',occ:'all',q:'',saved:false};
const pimg=o=>`<img src="${photos[o.id]}" alt="${o.n}" class="${(typeof PHOTOFIT!=='undefined'&&PHOTOFIT[o.id])==='contain'?'fit-contain':'fit-cover'}" loading="lazy">`;
const heartSVG='<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.4 1.1 5 3 1.6-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/></svg>';
function toast(msg){const t=document.createElement('div');t.className='toast';t.textContent=msg;document.body.appendChild(t);setTimeout(()=>t.remove(),1800)}
function copyText(txt,ta){const fb=()=>{if(ta){ta.focus();ta.select()}toast('Press Ctrl/⌘+C to copy')};try{navigator.clipboard.writeText(txt).then(()=>toast('Prompt copied'),fb)}catch(e){fb()}}
const hexEq=(a,b)=>(a||'').toLowerCase()===(b||'').toLowerCase();
function colourName(h){const p=PAL.find(x=>hexEq(x[0],h));if(p)return p[1];const n=parseInt(h.slice(1),16),r=n>>16,g=(n>>8)&255,b=n&255;let best=PAL[0],bd=1e9;PAL.forEach(x=>{const m=parseInt(x[0].slice(1),16),d=(r-(m>>16))**2+(g-((m>>8)&255))**2+(b-(m&255))**2;if(d<bd){bd=d;best=x}});return best[1]}
const PL=()=>L.filter(o=>HAS(o)&&!SITE.hidden.includes(o.id));

/* ---------- HERO ---------- */
$('#stats').innerHTML=[[PL().length,'photo looks'],[L.length-PL().length,'coming soon'],[Object.keys(OCC).length,'occasions'],[Object.keys(VARIANTS).length,'pieces to try on']].map(([n,t])=>`<span class="stat"><b>${n}</b>${t}</span>`).join('');
$('#lineup').removeAttribute('aria-hidden');
function renderHero(){const ids=(SITE.featured&&SITE.featured.length?SITE.featured:['banarasi','bridal','chaniya','ivorytee','anarkali','kanjeevaram','sharara','ruffle']).filter(id=>photos[id]&&!SITE.hidden.includes(id));
$('#lineup').innerHTML=ids.map(id=>{const o=L.find(l=>l.id===id);return `<button class="m" data-open="${id}" aria-label="Open ${o.n}">${pimg(o)}</button>`}).join('');}
renderHero();

/* ---------- LOOKBOOK ---------- */
$('#occSel').insertAdjacentHTML('beforeend',Object.entries(OCC).map(([k,v])=>`<option value="${k}">${v.n}</option>`).join(''));
function match(o){
  if(SITE.hidden.includes(o.id))return false;
  if(F.cat!=='all'&&o.c!==F.cat)return false;
  if(F.reg!=='all'&&o.r!==F.reg)return false;
  if(F.occ!=='all'&&!o.occ.includes(F.occ))return false;
  if(F.saved&&!saved.has(o.id))return false;
  if(F.q){const hay=[o.n,o.c,o.r,o.cn,o.d,o.pc.join(' '),o.occ.map(k=>OCC[k].n).join(' ')].join(' ').toLowerCase();if(!F.q.split(/\s+/).every(w=>hay.includes(w)))return false}
  return true;
}
function card(o){
  return `<article class="card">
   <button class="art" data-open="${o.id}" aria-label="Open ${o.n}">${pimg(o)}</button>
   <button class="heart" data-heart="${o.id}" aria-pressed="${saved.has(o.id)}" aria-label="Save ${o.n}">${heartSVG}</button>
   <button class="tryon" data-try="${o.id}">Customise</button>
   <div class="info">
     <div class="tags"><span class="tag ${o.c}">${CATN[o.c]}</span><span class="tag">${o.r}</span><span class="tag">${o.m}</span></div>
     <h3>${o.n}</h3>
     <div class="occ">${o.occ.map(k=>OCC[k].n).join(' · ')}</div>
     <p class="colourline">${o.cn}</p>
   </div></article>`;
}
function renderGrid(){
  const ok=L.filter(match),ph=ok.filter(HAS),pend=ok.filter(o=>!HAS(o));
  $('#grid').innerHTML=ph.length?ph.map(card).join(''):`<div class="empty">No photo looks match these filters yet. Try clearing the search or picking “Any occasion”.</div>`;
  $('#count').textContent=`${ph.length} photo looks · ${pend.length} coming`;
  $('#soon').innerHTML=pend.length?`<div class="soon"><span class="eyebrow">Being photographed</span><h3>${pend.length} more looks coming soon</h3><p class="small" style="margin:.4rem 0 0">Copy a prompt, generate the photo in Gemini or ChatGPT with the model photo attached, and the look appears here.</p><div class="soonlist">${pend.map(o=>`<div><span>${o.n}<small>${CATN[o.c]} · ${o.occ.map(k=>OCC[k].n).slice(0,2).join(', ')}</small></span><button data-copyp="${o.id}">Copy prompt</button></div>`).join('')}</div></div>`:'';
}
document.querySelectorAll('.chip[data-f]').forEach(b=>b.addEventListener('click',()=>{
  const f=b.dataset.f;
  if(f==='saved'){F.saved=!F.saved;b.setAttribute('aria-pressed',F.saved)}
  else{F[f]=b.dataset.v;document.querySelectorAll(`.chip[data-f="${f}"]`).forEach(x=>x.setAttribute('aria-pressed',x===b))}
  renderGrid();
}));
$('#occSel').addEventListener('change',e=>{F.occ=e.target.value;renderGrid()});
$('#q').addEventListener('input',e=>{F.q=e.target.value.trim().toLowerCase();renderGrid()});
$('#savedLink').addEventListener('click',()=>{F.saved=true;$('#savedOnly').setAttribute('aria-pressed','true');renderGrid()});

document.addEventListener('click',e=>{
  const h=e.target.closest('[data-heart]');
  if(h){const id=h.dataset.heart;saved.has(id)?saved.delete(id):saved.add(id);persist(true);document.querySelectorAll(`[data-heart="${id}"]`).forEach(x=>x.setAttribute('aria-pressed',saved.has(id)));toast(saved.has(id)?'Saved to your looks':'Removed from saved');if(F.saved)renderGrid();return}
  const cp=e.target.closest('[data-copyp]');
  if(cp){copyText(promptFor(L.find(l=>l.id===cp.dataset.copyp)));return}
  const tr=e.target.closest('[data-try]');
  if(tr){if(dlg.open)dlg.close();pickSubject(tr.dataset.try);$('#studio').scrollIntoView({behavior:'smooth'});return}
  const op=e.target.closest('[data-open]');
  if(op){const o=L.find(l=>l.id===op.dataset.open);if(o&&HAS(o))openLook(o.id)}
});

/* ---------- MODAL ---------- */
const dlg=$('#dlg');
function openLook(id){
  const o=L.find(l=>l.id===id);const pr=promptFor(o);
  dlg.innerHTML=`<button class="close" id="dlgClose" aria-label="Close">×</button>
  <div class="dlg"><div class="pic">${pimg(o)}</div>
  <div class="body">
    <div class="tags"><span class="tag ${o.c}">${CATN[o.c]}</span><span class="tag">${o.r}</span><span class="tag">${o.m}</span></div>
    <h3 id="dlgTitle">${o.n}</h3>
    <p style="margin:0">${o.d}</p>
    <dl>
      <dt>Pieces</dt><dd><ul>${o.pc.map(x=>`<li>${x}</li>`).join('')}</ul></dd>
      <dt>Footwear</dt><dd>${o.ft}</dd>
      <dt>Jewellery</dt><dd>${o.ac}</dd>
      <dt>Colours</dt><dd>${o.cn}</dd>
      <dt>Wear to</dt><dd>${o.occ.map(k=>OCC[k].n).join(', ')}</dd>
    </dl>
    <div class="tipbox"><b>Stylist tip:</b> ${o.tip}</div>
    <div class="row"><button class="btn alt" data-try="${o.id}">Customise colours on this photo</button>
      <button class="heart" style="position:static" data-heart="${o.id}" aria-pressed="${saved.has(o.id)}" aria-label="Save ${o.n}">${heartSVG}</button></div>
    <div><div class="eyebrow" style="margin-bottom:6px">Prompt used for this photo</div>
      <textarea class="promptbox" id="dlgPrompt" readonly aria-label="Prompt">${pr}</textarea>
      <div class="row" style="margin-top:8px"><button class="btn ghost" id="dlgCopy">Copy prompt</button></div></div>
  </div></div>`;
  if(!dlg.open)dlg.showModal();
  $('#dlgClose').onclick=()=>dlg.close();
  $('#dlgCopy').onclick=()=>copyText(pr,$('#dlgPrompt'));
}
dlg.addEventListener('click',e=>{if(e.target===dlg)dlg.close()});

/* ---------- OCCASIONS ---------- */
let curOcc='wedding';
$('#occGrid').innerHTML=Object.entries(OCC).map(([k,v])=>`<button class="occ-tile" data-occ="${k}" style="background:${v.c}" aria-pressed="${k===curOcc}"><b>${v.n}</b><small>${v.s}</small></button>`).join('');
$('#occGrid').addEventListener('click',e=>{const b=e.target.closest('[data-occ]');if(!b)return;curOcc=b.dataset.occ;document.querySelectorAll('.occ-tile').forEach(x=>x.setAttribute('aria-pressed',x===b));renderOcc()});
const mini=o=>`<button class="mini" data-open="${o.id}">${pimg(o)}<span>${o.n}</span></button>`;
function renderOcc(){
  const v=OCC[curOcc],all=L.filter(l=>l.occ.includes(curOcc)),looks=all.filter(HAS);
  $('#occPanel').innerHTML=`<div><span class="eyebrow">${v.s}</span><h3 style="color:${v.c}">${v.n}</h3><p style="margin:.4rem 0 0;max-width:70ch">${v.d}</p></div>
  <div class="rules3"><div><h4>Wear</h4><p>${v.w}</p></div><div><h4>Skip</h4><p>${v.a}</p></div><div><h4>Colours that suit it</h4><p>${v.t}</p></div></div>
  <div><div class="eyebrow" style="margin-bottom:8px">${looks.length} photo looks for ${v.n.toLowerCase()}${all.length>looks.length?` · ${all.length-looks.length} more coming`:''}</div>${looks.length?`<div class="rail">${looks.map(mini).join('')}</div>`:'<p class="small">Photos for this occasion are on the way.</p>'}</div>`;
}

/* ---------- QUIZ ---------- */
const QZ=[
 {q:'Where are you going?',o:[['Wedding or festival',['wedding','festive','pooja']],['Sangeet or party',['sangeet','party','cocktail']],['Office or interview',['office','interview']],['Date night',['date','cocktail']],['Brunch or day out',['brunch','college']],['Travel or beach',['travel','beach']],['Mehendi or haldi',['mehendi','haldi']],['Black-tie event',['formal','cocktail']]]},
 {q:'What’s your vibe?',o:[['Traditional Indian','ethnic'],['Modern western','western'],['A bit of both','fusion']]},
 {q:'How do you want to feel?',o:[['Comfortable & easy','easy'],['Elegant & classic','classic'],['Bold & head-turning','bold']]}
];
let qs=[],qi=0;
function renderQuiz(){
  const box=$('#quizBox');
  const head=`<div><span class="eyebrow" style="color:rgba(255,255,255,.85)">Style Quiz · 3 questions</span><h2>Find your <em>perfect look</em></h2></div><div class="progress">${QZ.map((_,i)=>`<span class="${i<qi||(qi===QZ.length)?'on':''}"></span>`).join('')}</div>`;
  if(qi<QZ.length){
    box.innerHTML=head+`<div class="q">${QZ[qi].q}</div><div class="qopts">${QZ[qi].o.map((x,i)=>`<button class="qopt" data-qa="${i}">${x[0]}</button>`).join('')}</div>${qi>0?'<button class="qback" id="qBack">← Back</button>':''}`;
    box.querySelectorAll('[data-qa]').forEach(b=>b.onclick=()=>{qs[qi]=QZ[qi].o[+b.dataset.qa][1];qi++;renderQuiz()});
    const bk=$('#qBack');if(bk)bk.onclick=()=>{qi--;renderQuiz()};
  }else{
    const [occs,vibe,mood]=qs;
    const sc=o=>{let s=0;occs.forEach(k=>{if(o.occ.includes(k))s+=3});if(o.c===vibe)s+=3;else if(vibe==='fusion'||o.c==='fusion')s+=1;if(o.m===mood)s+=2;return s};
    const top=PL().map(o=>[sc(o),o]).sort((a,b)=>b[0]-a[0]).slice(0,4);
    const soon=L.filter(o=>!HAS(o)).map(o=>[sc(o),o]).sort((a,b)=>b[0]-a[0]).slice(0,2).filter(x=>x[0]>top[top.length-1][0]);
    box.innerHTML=head+`<div class="q">Your top picks</div><div class="qresult">${top.map(([,o])=>`<button class="mini" data-open="${o.id}">${pimg(o)}<span>${o.n}</span></button>`).join('')}</div>${soon.length?`<p style="margin:0">Also a great match, photos coming soon: <b>${soon.map(x=>x[1].n).join('</b> and <b>')}</b>.</p>`:''}<button class="btn" id="qAgain" style="justify-self:start;background:#fff;color:#2A0F2E">Take it again</button>`;
    $('#qAgain').onclick=()=>{qs=[];qi=0;renderQuiz()};
  }
}

/* ---------- COLOUR COMBOS (shown on real photos) ---------- */
const COMBOLOOK=['patiala','banarasi','kanjeevaram','chikan','pantsuit','lbd','blockprint','mirror','ivorytee','kaftan','bridal','anarkali'];
$('#combos').innerHTML=COMBOS.map(([n,a,b,u],i)=>{const o=L.find(l=>l.id===COMBOLOOK[i]);const has=o&&HAS(o);
  return `<div class="combo">${has?`<button class="cphoto" data-open="${o.id}" aria-label="Open ${o.n}">${pimg(o)}</button>`:`<div class="cphoto none"><span>Photo coming soon</span></div>`}<div class="t"><b>${n}</b><small>${u}</small>${has?`<br><small>Seen in: ${o.n}</small>`:''}</div></div>`}).join('');
$('#rulesGrid').innerHTML=RULES.map(([h,p],i)=>`<div class="rule"><div class="n">${['i','ii','iii','iv','v','vi'][i]}.</div><h3>${h}</h3><p>${p}</p></div>`).join('');

/* ---------- DRESSING ROOM (real-photo recolouring) ---------- */
const cv=$('#cv'),ctx=cv.getContext('2d',{willReadFrequently:true});
const PARTS=[['top','T-shirt',0],['bottom','Trousers',1],['shoes','Sneakers',2]];
let D={who:'model',lab:null,src:null,mask:null,w:0,h:0,parts:{},variant:{},regions:[],sel:null,history:[]};
const imgCache={};
function loadImg(src){return imgCache[src]||(imgCache[src]=new Promise(r=>{const i=new Image();i.onload=()=>r(i);i.src=src}))}
async function dataOf(src,w,h){const i=await loadImg(src);const c=document.createElement('canvas');c.width=w;c.height=h;const x=c.getContext('2d');x.drawImage(i,0,0,w,h);return x.getImageData(0,0,w,h)}
function hexRGB(h){const n=parseInt(h.slice(1),16);return [(n>>16)/255,((n>>8)&255)/255,(n&255)/255]}
function recolour(out,mask,mi,stride,hex,thr=0){
  const d=out.data,m=mask,T=hexRGB(hex);let sum=0,cnt=0;
  for(let p=0,q=mi;p<d.length;p+=4,q+=stride){const a=m[q];if(a>128&&d[p+3]>100){sum+=.299*d[p]+.587*d[p+1]+.114*d[p+2];cnt++}}
  if(!cnt)return;const mean=sum/cnt;
  for(let p=0,q=mi;p<d.length;p+=4,q+=stride){const a=m[q]/255;if(a<=thr)continue;
    const s=(.299*d[p]+.587*d[p+1]+.114*d[p+2])/mean;
    for(let c=0;c<3;c++){const v=s<=1?T[c]*Math.pow(s,1.15):T[c]+(1-T[c])*Math.min(1,(s-1)*1.2);d[p+c]=d[p+c]*(1-a)+Math.min(1,v)*255*a}}
}
async function pickSubject(who){
  if(who==='ivorytee')who='model';
  D={who,lab:null,src:null,mask:null,w:0,h:0,parts:{},variant:{},regions:[],sel:who==='model'?'bottom':null,history:[]};
  if(who==='model'){D.w=683;D.h=1024;D.src=await dataOf(BASE_DARK,D.w,D.h);D.mask=await dataOf(BASE_MASK,D.w,D.h)}
  else{const i=await loadImg(photos[who]);const sc=Math.min(1,1024/i.height);D.w=Math.round(i.width*sc);D.h=Math.round(i.height*sc);D.src=await dataOf(photos[who],D.w,D.h);
    const LP=typeof LOOKPARTS!=='undefined'&&LOOKPARTS[who];
    if(LP){const md=await dataOf(LP.map,D.w,D.h),N=D.w*D.h,W=D.w;
      for(const p of LP.parts){const raw=new Uint8Array(N);for(let i=0;i<N;i++)raw[i]=md.data[i*4]===p.id?1:0;
        const m=new Uint8Array(N);for(let y=1;y<D.h-1;y++)for(let x=1;x<W-1;x++){const i=y*W+x;let s=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)s+=raw[i+dy*W+dx];m[i]=Math.round(s/9*255)}
        D.regions.push({mask:m,col:null,pid:p.id,seg:p.seg,name:p.name})}}}
  $('#stageWrap').classList.toggle('dark',who==='model');
  D.cx=who==='model'?337:(()=>{let sx=0,n=0;for(const r of D.regions)for(let i=0;i<r.mask.length;i+=5)if(r.mask[i]>128){sx+=i%D.w;n++}return n?sx/n:D.w/2})();
  cv.width=D.w;cv.height=D.h;syncDR();drawDR();
}
const vCache={};
async function vData(id){if(vCache[id])return vCache[id];const v=VARIANTS[id];const mk=async src=>{const i=await loadImg(src);const c=document.createElement('canvas');c.width=683;c.height=1024;c.getContext('2d').drawImage(i,v.x,v.y,v.w,v.h);return c.getContext('2d').getImageData(0,0,683,1024).data};
  const img=await mk(v.img),m=await mk(v.mask),N=683*1024,comp=new Uint8Array(N),rec=new Uint8Array(N);for(let i=0;i<N;i++){comp[i]=m[i*4];rec[i]=m[i*4+1]}
  return vCache[id]={img,comp,rec}}
const CATS=['bottom','top','belt','shoes','necklace','scarf','bag','jewellery','earrings','wrist','rings','eyewear','head'];
async function effMasks(){ // per-part recolour masks after layering
  const N=D.w*D.h,V={};for(const c of CATS)if(D.variant[c])V[c]=await vData(D.variant[c]);
  const res={};for(const [k,,ch] of PARTS){const m=new Uint8Array(N);
    if(V[k]){m.set(V[k].rec)}else{for(let i=0;i<N;i++)m[i]=D.mask.data[i*4+ch]}
    for(const c of CATS.slice(CATS.indexOf(k)+1)){if(!V[c])continue;const o=V[c].comp;for(let i=0;i<N;i++)if(o[i])m[i]=m[i]*(255-o[i])/255}
    res[k]=m}
  return {V,res}}
async function compose(){
  const out=new ImageData(new Uint8ClampedArray(D.src.data),D.w,D.h);
  if(D.who==='model'){const {V,res}=await effMasks();const o=out.data;
    for(const c of CATS){const v=V[c];if(!v)continue;for(let i=0,p=0;i<v.comp.length;i++,p+=4){const a=v.comp[i]/255;if(a>0){o[p]=o[p]*(1-a)+v.img[p]*a;o[p+1]=o[p+1]*(1-a)+v.img[p+1]*a;o[p+2]=o[p+2]*(1-a)+v.img[p+2]*a}}}
    D.eff=res;
    for(const [k] of PARTS){const col=D.parts[k];if(col)recolour(out,res[k],0,1,col)}
  }else{for(const r of D.regions)if(r.col)recolour(out,r.mask,0,1,r.col)}
  return out;
}
/* body type: reshapes the finished photo (head stays untouched) */
let BT='regular';
const BTN=[['petite','Petite'],['slim','Slim'],['regular','Regular'],['curvy','Curvy'],['plus','Plus-size'],['tall','Tall']];
const BTW={slim:[[0,1],[.163,1],[.215,.9],[1,.9]],curvy:[[0,1],[.163,1],[.215,1.04],[.273,1.1],[.339,1],[.417,1.16],[.534,1.12],[.716,1.05],[1,1.02]],plus:[[0,1],[.163,1],[.215,1.12],[.273,1.22],[.365,1.26],[.456,1.25],[.651,1.15],[1,1.08]]};
const BTV={petite:.9,tall:1.06};
function lerpK(keys,t){for(let i=1;i<keys.length;i++)if(t<=keys[i][0]){const [a,fa]=keys[i-1],[b,fb]=keys[i];return fa+(fb-fa)*(t-a)/(b-a||1)}return keys[keys.length-1][1]}
function btMaps(){const {w,h}=D;const f=new Float32Array(h),vy=new Float32Array(h);const k=BTW[BT],s=BTV[BT],y0=h*.365;
  const kk=s?(y0+(h-y0)*s)/h:1; // whole-frame scale so the full figure still fits
  for(let y=0;y<h;y++){const yv=y*kk;f[y]=(k?lerpK(k,y/h):1)/kk;vy[y]=Math.min(h-1,s&&yv>y0?y0+(yv-y0)/s:yv)}return {f,vy}}
function bodyWarp(src){if(BT==='regular')return src;const {w,h}=D,cx=D.cx||w/2,{f,vy}=btMaps(),s=src.data,out=new ImageData(w,h),o=out.data;
  for(let y=0;y<h;y++){const sy=vy[y],y1=Math.floor(sy),y2=Math.min(h-1,y1+1),fy=sy-y1,fr=f[y];
    for(let x=0;x<w;x++){const sx=cx+(x-cx)/fr;const p=(y*w+x)*4;if(sx<0||sx>w-1){o[p+3]=D.who==='model'?255:0;continue}
      const x1=Math.floor(sx),x2=Math.min(w-1,x1+1),fx=sx-x1;
      for(let c=0;c<4;c++){const a=s[(y1*w+x1)*4+c],b=s[(y1*w+x2)*4+c],cc=s[(y2*w+x1)*4+c],d=s[(y2*w+x2)*4+c];o[p+c]=(a*(1-fx)+b*fx)*(1-fy)+(cc*(1-fx)+d*fx)*fy}}}
  return out}
function toSrc(x,y){if(BT==='regular')return [x,y];const {f,vy}=btMaps(),cx=D.cx||D.w/2;return [Math.round(cx+(x-cx)/f[y]),Math.round(vy[y])]}
let drawing=0;
async function drawDR(){const t=++drawing;const out=await compose();if(t!==drawing)return;
  const hl=D.who==='model'?[]:(typeof D.sel==='string'&&D.sel.startsWith('g:')?D.regions.filter(r=>r.seg===D.sel.slice(2)):D.regions[D.sel]?[D.regions[D.sel]]:[]).filter(r=>!r.col);
  if(hl.length){const ov=out;for(let i=0,p=0;i<D.w*D.h;i++,p+=4){if(hl.some(r=>r.mask[i]>128)){ov.data[p]=ov.data[p]*.5+214*.5;ov.data[p+1]=ov.data[p+1]*.5+36*.5;ov.data[p+2]=ov.data[p+2]*.5+110*.5}}}
  ctx.putImageData(bodyWarp(out),0,0);
  drPrompt();}
function labOf(){if(D.lab)return D.lab;const d=D.src.data,N=D.w*D.h,La=new Float32Array(N),A=new Float32Array(N),B=new Float32Array(N);
  const lin=v=>{v/=255;return v<=.04045?v/12.92:Math.pow((v+.055)/1.055,2.4)},f=t=>t>.008856?Math.cbrt(t):7.787*t+16/116;const LUT=new Float32Array(256);for(let i=0;i<256;i++)LUT[i]=lin(i);
  for(let i=0,p=0;i<N;i++,p+=4){const r=LUT[d[p]],g=LUT[d[p+1]],b=LUT[d[p+2]];const X=(r*.4124+g*.3576+b*.1805)/.95047,Y=r*.2126+g*.7152+b*.0722,Z=(r*.0193+g*.1192+b*.9505)/1.08883;const fx=f(X),fy=f(Y),fz=f(Z);La[i]=116*fy-16;A[i]=500*(fx-fy);B[i]=200*(fy-fz)}
  return D.lab={L:La,A,B}}
function flood(x0,y0,tol){
  const {w,h}=D,d=D.src.data,N=w*h,seen=new Uint8Array(N);let mask=new Uint8Array(N);const {L:La,A,B}=labOf();
  let sa=0,sb=0,sl=0,n=0;for(let dy=-3;dy<=3;dy++)for(let dx=-3;dx<=3;dx++){const x=Math.min(w-1,Math.max(0,x0+dx)),y=Math.min(h-1,Math.max(0,y0+dy)),i=y*w+x;sa+=A[i];sb+=B[i];sl+=La[i];n++}
  sa/=n;sb/=n;sl/=n;const st=[y0*w+x0];const chroma=Math.hypot(sa,sb),lw=.15+.85*Math.max(0,1-chroma/22);
  while(st.length){const i=st.pop();if(seen[i])continue;seen[i]=1;
    const dist=Math.hypot(A[i]-sa,B[i]-sb)+Math.abs(La[i]-sl)*lw;
    if(d[i*4+3]<100||dist>tol)continue;mask[i]=1;const x=i%w;
    if(x>0)st.push(i-1);if(x<w-1)st.push(i+1);if(i>=w)st.push(i-w);if(i<N-w)st.push(i+w)}
  // close gaps (fills small motifs and speckles), then soften the edge
  const morph=(m,r,dil)=>{const t=new Uint8Array(N),o=new Uint8Array(N);
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){let v=dil?0:1;for(let k=-r;k<=r;k++){const xx=x+k;if(xx<0||xx>=w)continue;const q=m[y*w+xx];if(dil?q:!q){v=dil?1:0;break}}t[y*w+x]=v}
    for(let y=0;y<h;y++)for(let x=0;x<w;x++){let v=dil?0:1;for(let k=-r;k<=r;k++){const yy=y+k;if(yy<0||yy>=h)continue;const q=t[yy*w+x];if(dil?q:!q){v=dil?1:0;break}}o[y*w+x]=v}
    return o};
  mask=morph(morph(mask,4,true),4,false);
  const out=new Uint8Array(N);for(let y=1;y<h-1;y++)for(let x=1;x<w-1;x++){const i=y*w+x;let s=0;for(let dy=-1;dy<=1;dy++)for(let dx=-1;dx<=1;dx++)s+=mask[i+dy*w+dx];out[i]=Math.round(s/9*255)}
  // keep away from transparent background
  for(let i=0;i<N;i++)if(d[i*4+3]<60)out[i]=0;
  return out;
}
cv.addEventListener('click',e=>{
  const r=cv.getBoundingClientRect(),sc=Math.min(r.width/D.w,r.height/D.h),ox=(r.width-D.w*sc)/2,oy=(r.height-D.h*sc)/2;
  let x=Math.round((e.clientX-r.left-ox)/sc),y=Math.round((e.clientY-r.top-oy)/sc);if(x<0||y<0||x>=D.w||y>=D.h)return;
  [x,y]=toSrc(x,y);if(x<0||y<0||x>=D.w||y>=D.h)return;
  if(D.who==='model'){const i=y*D.w+x;let best=null,bv=110;PARTS.forEach(([k])=>{const v=D.eff?D.eff[k][i]:0;if(v>bv){bv=v;best=k}});
    if(best){D.sel=best;syncDR();toast(`${partName(best)} selected`)}else toast('Tap the t-shirt, trousers or shoes');return}
  let idx=D.regions.findIndex(r=>r.pid&&r.mask[y*D.w+x]>128);
  for(let rad=4;idx<0&&rad<=16;rad+=4)for(const [dx,dy] of [[rad,0],[-rad,0],[0,rad],[0,-rad],[rad,rad],[-rad,rad],[rad,-rad],[-rad,-rad]]){const xx=x+dx,yy=y+dy;if(xx<0||yy<0||xx>=D.w||yy>=D.h)continue;const j=D.regions.findIndex(r=>r.pid&&r.mask[yy*D.w+xx]>128);if(j>=0){idx=j;break}}
  if(idx>=0){const r=D.regions[idx];const sib=D.regions.filter(q=>q.pid&&q.seg===r.seg);D.sel=sib.length>1&&D.sel!=='g:'+r.seg&&D.sel!==idx?'g:'+r.seg:idx;syncDR();drawDR();toast(typeof D.sel==='string'?`Entire ${segLabel(r.seg).toLowerCase()} selected. Tap again to pick just ${regName(r)}.`:`${regName(r)} selected. Now pick a colour.`);return}
  const m=flood(x,y,+$('#drTol').value);let cnt=0;for(const v of m)if(v>128)cnt++;
  if(cnt<300){toast('That area is too small. Try a larger selection size.');return}
  if(cnt>D.w*D.h*.4){toast('That looks like the background. Tap the fabric itself, or lower the selection size.');return}
  D.regions.push({mask:m,col:null,seed:[x,y,+$('#drTol').value]});D.sel=D.regions.length-1;D.history.push('region');drawDR();toast('Area selected. Now pick a colour.');
});
function segLabel(seg){const o=L.find(l=>l.id===D.who)||{};const t=o.t||'';
  if(seg==='Outfit'){if(/saree|mekhela/.test(t)||o.id==='mekhela'||o.id==='beltedsaree')return 'Saree';if(['lehenga','halfsaree','cape'].includes(t))return 'Lehenga';if(t==='anarkali')return 'Anarkali';if(['sharara','gharara','patiala','dhoti','kurta_pants','kurta_palazzo','kurta_jeans'].includes(t))return 'Kurta set';if(t==='jumpsuit')return 'Jumpsuit';if(t==='kaftan')return 'Kaftan';if(t==='coat')return 'Coat';if(['pencil','skirt_top','coord_skirt','shrugset'].includes(t))return 'Skirt';if(['dress','maxi','mermaid','gown','sareegown'].includes(t))return 'Dress';return 'Outfit'}
  if(seg==='Top')return ['dhotijacket','smartdenim','pantsuit','suit'].includes(t)||['dhotijacket','smartdenim','pantsuit'].includes(o.id)?'Top & jacket':'Top';return 'Bottom'}
const regName=r=>{if(!r.pid)return 'Selected area';const same=D.regions.filter(q=>q.pid&&q.seg===r.seg&&q.name===r.name);const n=same.length>1?' '+(same.indexOf(r)+1):'';return `${segLabel(r.seg)} · ${r.name}${n}`};
const partName=k=>{const v=D.variant[k];return v?VARIANTS[v].name.replace(/ \(.*\)/,''):PARTS.find(p=>p[0]===k)[1]};
function applyColour(hex){
  if(D.who==='model'){if(!D.sel)return toast('Choose a piece first');D.history.push(['part',D.sel,D.parts[D.sel]]);D.parts[D.sel]=hex}
  else if(typeof D.sel==='string'&&D.sel.startsWith('g:')){const rs=D.regions.map((r,i)=>[r,i]).filter(([r])=>r.seg===D.sel.slice(2));D.history.push(['cols',rs.map(([r,i])=>[i,r.col])]);rs.forEach(([r])=>r.col=hex)}
  else{const r=D.regions[D.sel];if(!r)return toast('Tap a garment on the photo first');D.history.push(['col',D.sel,r.col]);r.col=hex}
  syncDR();drawDR();
}
function syncDR(){
  $('#drBody').innerHTML=BTN.map(([k,n])=>`<button class="chip" data-bt="${k}" aria-pressed="${BT===k}">${n}</button>`).join('');
  $('#drPick').innerHTML=`<button class="mini" data-who="model" aria-pressed="${D.who==='model'}"><img src="${BASE_DARK}" alt="Model" class="fit-cover"><span>The model</span></button>`+PL().filter(o=>o.id!=='ivorytee').map(o=>`<button class="mini" data-who="${o.id}" aria-pressed="${D.who===o.id}">${pimg(o)}<span>${o.n}</span></button>`).join('');
  const isM=D.who==='model';$('#drBase').hidden=!isM;$('#drLook').hidden=isM;$('#drSwapBox').hidden=!isM;
  $('#cvHint').textContent=isM?'Tap the t-shirt, trousers or shoes':'Tap a garment to select it';
  if(isM)$('#drParts').innerHTML=PARTS.map(([k])=>`<button class="chip" data-part="${k}" aria-pressed="${D.sel===k}">${partName(k)}${D.parts[k]?` · ${colourName(D.parts[k])}`:''}</button>`).join('');
  if(!isM){const segs=[...new Set(D.regions.filter(r=>r.pid).map(r=>r.seg))];
    $('#drLookParts').innerHTML=segs.filter(s=>D.regions.filter(r=>r.seg===s).length>1).map(s=>`<button class="chip whole" data-group="${s}" aria-pressed="${D.sel==='g:'+s}">Entire ${segLabel(s).toLowerCase()}</button>`).join('')+D.regions.map((r,i)=>`<button class="chip" data-reg="${i}" aria-pressed="${D.sel===i}">${regName(r)}${r.col?` → ${colourName(r.col)}`:''}</button>`).join('')||'<span class="small" style="margin:0">Tap the garment on the photo.</span>';}
  const selRegs=()=>typeof D.sel==='string'&&D.sel.startsWith('g:')?D.regions.filter(r=>r.seg===D.sel.slice(2)):D.regions[D.sel]?[D.regions[D.sel]]:[];
  const cur=isM?D.parts[D.sel]:(selRegs()[0]||{}).col;
  $('#drColLbl').textContent=isM?`Colour for: ${partName(D.sel||'bottom')}`:(typeof D.sel==='string'&&D.sel.startsWith('g:')?`Colour for: entire ${segLabel(D.sel.slice(2)).toLowerCase()}`:D.regions[D.sel]?`Colour for: ${regName(D.regions[D.sel])}`:'Pick a piece first');
  $('#drSw').innerHTML=PAL.map(([c,n])=>`<button data-col="${c}" style="background:${c}" aria-label="${n}" title="${n}" aria-pressed="${hexEq(c,cur)}"></button>`).join('')+`<input type="color" id="drPickCol" value="${cur||'#1F2A55'}" aria-label="Pick any colour" title="Pick any colour">`;
  renderSwap();
}
let swapCat='bottom';
function renderSwap(){
  $('#drCats').innerHTML=PACK_CATS.map(([k,n])=>`<button role="tab" data-scat="${k}" aria-selected="${swapCat===k}">${n}</button>`).join('');
  const items=ALL_PACK.filter(x=>x.cat===swapCat&&VARIANTS[x.id]);
  const first=swapCat==='top'||swapCat==='bottom'||swapCat==='shoes'?{id:'',name:'Original '+({top:'t-shirt',bottom:'trousers',shoes:'sneakers'}[swapCat])}:{id:'',name:'None'};
  $('#drSwap').innerHTML=`<div class="swapgrid">${[first].concat(items).map(x=>{const on=(D.variant[swapCat]||'')===x.id;const v=VARIANTS[x.id];
   return `<button class="swapbtn" data-var="${x.id}" aria-pressed="${on}"><span class="sth">${v?`<img src="${v.img}" alt="">`:`<i>${['top','bottom','shoes'].includes(swapCat)?'Original':'None'}</i>`}</span><b>${x.name}</b></button>`}).join('')}</div>`;
}
function drPrompt(){
  let t;
  if(D.who==='model'){
    const ch=[];PARTS.forEach(([k])=>{if(D.parts[k])ch.push(`change the colour of the ${partName(k).toLowerCase()} to ${colourName(D.parts[k])}`)});
    const desc=id=>(ALL_PACK.find(x=>x.id===id)||{desc:VARIANTS[id].name.toLowerCase()}).desc;
    CATS.slice().reverse().forEach(k=>{const v=D.variant[k];if(!v)return;ch.unshift(k==='top'?`replace the t-shirt with ${desc(v)}`:k==='bottom'?`replace the trousers with ${desc(v)}`:k==='shoes'?`replace the sneakers with ${desc(v)}`:`add ${desc(v)}`)});
    if(BT!=='regular')ch.push(`give her a ${BTN.find(b=>b[0]===BT)[1].toLowerCase()} body type while keeping the same face`);
    t=ch.length?`Edit the attached photo. ${ch.join('; ').replace(/^./,c=>c.toUpperCase())}. ${KEEP.replace('skin tone, body, pose','skin tone, pose')}`:'Pick a piece and a colour, or try on a new piece. The edit prompt for your exact changes appears here.';
  }else{
    const o=L.find(l=>l.id===D.who);const ch=D.regions.filter(r=>r.col).map(r=>{if(r.pid)return `change the ${r.name} ${r.seg==='Outfit'?'part of the outfit':r.seg.toLowerCase()} to ${colourName(r.col)}`;let sy=0,c=0;for(let i=0;i<r.mask.length;i+=7)if(r.mask[i]>128){sy+=Math.floor(i/D.w);c++}const f=sy/c/D.h;const zone=f<.3?'the blouse or top':f<.5?'the middle of the outfit (waist and drape)':f<.78?'the skirt, trousers or lower drape':'the hem and border';return `make ${zone} ${colourName(r.col)}`});
    if(BT!=='regular')ch.push(`give her a ${BTN.find(b=>b[0]===BT)[1].toLowerCase()} body type (same face and outfit)`);
    t=ch.length?`Edit the attached photo of the ${o.n.toLowerCase()}. ${ch.join('; ').replace(/^./,c=>c.toUpperCase())}. Keep the fabric texture, embroidery, jewellery, the woman, her pose, the lighting and background exactly the same. Photorealistic, no watermark.`:'Tap a garment on the photo and pick a colour. The edit prompt for your changes appears here.';
  }
  $('#drPrompt').value=t;
}
$('#studio').addEventListener('click',e=>{
  const b=e.target.closest('button');if(!b)return;const d=b.dataset;
  if(d.who){pickSubject(d.who);return}
  if(d.part){D.sel=d.part;syncDR();return}
  if(d.reg){D.sel=+d.reg;syncDR();drawDR();return}
  if(d.bt){BT=d.bt;syncDR();drawDR();return}
  if(d.group){D.sel='g:'+d.group;syncDR();drawDR();return}
  if(d.col){applyColour(d.col);return}
  if(d.scat){swapCat=d.scat;renderSwap();return}
  if('var' in d){D.history.push(['var',swapCat,D.variant[swapCat]]);if(d.var)D.variant[swapCat]=d.var;else delete D.variant[swapCat];if(['top','bottom','shoes'].includes(swapCat))D.sel=swapCat;syncDR();drawDR();return}
  if(d.vprompt){const x=ALL_PACK.find(p=>p.id===d.vprompt);copyText(x.prompt);return}
  if(d.my){const s=myLooks[+d.my];loadSaved(s);return}
});
$('#studio').addEventListener('change',e=>{if(e.target.id==='drPickCol')applyColour(e.target.value)});
$('#drTol').oninput=e=>{$('#drTolV').textContent=e.target.value};
$('#drUndo').onclick=()=>{const h=D.history.pop();if(!h)return toast('Nothing to undo');
  if(h==='region'){D.regions.pop();D.sel=null}
  else if(h[0]==='part'){if(h[2])D.parts[h[1]]=h[2];else delete D.parts[h[1]]}
  else if(h[0]==='col'){D.regions[h[1]].col=h[2]}
  else if(h[0]==='cols'){h[1].forEach(([i,c])=>D.regions[i].col=c)}
  else if(h[0]==='var'){if(h[2])D.variant[h[1]]=h[2];else delete D.variant[h[1]]}
  syncDR();drawDR()};
$('#drReset').onclick=()=>pickSubject(D.who);
$('#drCopy').onclick=()=>copyText($('#drPrompt').value,$('#drPrompt'));
let myLooks=[];try{myLooks=JSON.parse(localStorage.getItem('usg-photolooks')||'[]')}catch(e){}
function renderMyLooks(){$('#myLooksBox').hidden=!myLooks.length;$('#myLooks').innerHTML=myLooks.map((s,i)=>`<button class="mini" data-my="${i}"><img src="${s.thumb}" alt="Saved look ${i+1}" class="fit-contain"><span>Saved look ${i+1}</span></button>`).join('')}
$('#drSave').onclick=()=>{const c=document.createElement('canvas');c.width=160;c.height=Math.round(160*D.h/D.w);c.getContext('2d').drawImage(cv,0,0,c.width,c.height);
  const lk={lid:Date.now().toString(36)+Math.random().toString(36).slice(2,6),bt:BT,who:D.who,parts:D.parts,variant:D.variant,regions:D.regions.filter(r=>r.col).map(r=>r.pid?{pid:r.pid,col:r.col}:{seed:r.seed,col:r.col}),thumb:c.toDataURL('image/jpeg',.75)};myLooks.unshift(lk);myLooks=myLooks.slice(0,12);
  try{localStorage.setItem('usg-photolooks',JSON.stringify(myLooks))}catch(e){}renderMyLooks();toast('Look saved');if(typeof ACCT!=='undefined')ACCT.onLookSaved(lk)};
async function loadSaved(s){BT=s.bt||'regular';await pickSubject(s.who);D.parts=Object.assign({},s.parts);D.variant=Object.assign({},s.variant);
  for(const r of s.regions||[]){if(r.pid){const t=D.regions.find(q=>q.pid===r.pid);if(t)t.col=r.col}else D.regions.push({mask:flood(r.seed[0],r.seed[1],r.seed[2]),col:r.col,seed:r.seed})}syncDR();drawDR();toast('Saved look loaded')}

/* ---------- BOOT ---------- */
persist();renderGrid();renderOcc();renderQuiz();renderMyLooks();pickSubject('model');
