/* Psychologie Lernbox · Lern-Wrapped: zeichnet auf, wann gelernt wird, und fasst das Tool zusammen */
(function(){
if(typeof CFG==='undefined'||typeof Q==='undefined'||typeof record!=='function'||typeof stats==='undefined')return;
const K=CFG.key+'.';
const get=(k,d)=>{try{const v=localStorage.getItem(K+k);return v==null?d:JSON.parse(v)}catch(e){return d}};
const put=(k,v)=>{try{const s=JSON.stringify(v);if(localStorage.getItem(K+k)!==s)localStorage.setItem(K+k,s)}catch(e){}};
const dk=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
/* Semester-Schlüssel: WS2026 = WiSe 26/27 (Okt–Feb), SO2027 = SoSe 27 (März–Sept) */
const sem=d=>{const m=d.getMonth(),y=d.getFullYear();return m>=9?'WS'+y:m<=1?'WS'+(y-1):'SO'+y};
const plain=s=>String(s==null?'':s).replace(/\*\*/g,'').replace(/<[^>]+>/g,'');
/* Jedes Gerät führt seine eigene Liste (dev[ID]) – im Wrapped wird über alle Geräte zusammengezählt */
const DEV=(()=>{try{let d=localStorage.getItem('lernbox-dev');if(!d){d=Date.now().toString(36)+Math.random().toString(36).slice(2,7);localStorage.setItem('lernbox-dev',d)}return d}catch(e){return 'x'}})();
const norm=x=>!x?null:x.dev?x:{v:2,start:x.start,dev:{alt:{d:x.d||{},h:x.h||{},wd:x.wd||{}}}};
let L=norm(get('wlog',null))||{v:2,start:dk(new Date()),dev:{}};
const me=()=>L.dev[DEV]||(L.dev[DEV]={d:{},h:{},wd:{}});
function log(ok){const n=new Date(),k=dk(n),s=sem(n),M=me();
  const e=M.d[k]||[0,0];e[0]++;if(ok)e[1]++;M.d[k]=e;
  (M.h[s]=M.h[s]||Array(24).fill(0))[n.getHours()]++;
  (M.wd[s]=M.wd[s]||Array(7).fill(0))[n.getDay()]++;
  put('wlog',L)}
function summary(){let ans=0,right=0,seen=0,fixed=0,nem=null;
  for(const q of Q){const s=stats[q.id];if(!s)continue;const r=s.r||0,w=s.w||0;if(!r&&!w)continue;seen++;ans+=r+w;right+=r;if(w>0&&s.last==='r')fixed++;
    if(w>0&&(!nem||w>nem.w||(w===nem.w&&r<nem.r)))nem={q:plain(q.q).slice(0,240),w,r,ok:s.last==='r'}}
  let known=0;try{known=Object.values((typeof card!=='undefined'&&card.known)||get('known',{})).filter(Boolean).length}catch(e){}
  const pet=get('pet',null),ach=get('ach',{got:{}});
  return{v:1,t:Date.now(),key:CFG.key,name:(document.title||'').replace(/ ?Lernbox$/,'').trim(),nq:Q.length,ans,right,seen,fixed,nem,known,
    ncards:typeof CARDS!=='undefined'?CARDS.length:0,sims:get('simhist',[]),ach:Object.keys(ach.got||{}).length,nach:typeof ACH!=='undefined'?ACH.length:0,
    pet:pet&&pet.sp?{sp:pet.sp,name:pet.name||'',snacks:pet.snacks||0,stars:pet.stars||0,born:pet.born||null,eq:Object.fromEntries(Object.entries(pet.eq||{}).filter(([k,v])=>k!=='bg'&&v))}:null,plog:pet&&pet.log||{}}}
function save(){const s=summary(),o=get('wsum',null);if(o){const a=JSON.stringify({...s,t:0}),b=JSON.stringify({...o,t:0});if(a===b)return}put('wsum',s)}
let T=null;const later=()=>{clearTimeout(T);T=setTimeout(save,1500)};
/* jede Antwort mitschreiben */
const orec=window.record;
window.record=function(q,ok){const r=orec.apply(this,arguments);try{log(!!ok);later()}catch(e){}return r};
/* beim Synchronisieren: Tage und Uhrzeiten von mehreren Geräten zusammenführen */
const mx=(a,b)=>{const o={...a};for(const k in b){const x=o[k],y=b[k];if(Array.isArray(y))o[k]=x?x.map((v,i)=>Math.max(v,y[i]||0)):y.slice()}return o};
if(typeof window.bkMerge==='function'){const om=window.bkMerge;window.bkMerge=function(d){const r=om.apply(this,arguments);
  try{const inc=norm(d&&d.wlog?JSON.parse(d.wlog):null);if(inc){const dv={...L.dev};for(const id in inc.dev){const a=dv[id]||{d:{},h:{},wd:{}},b=inc.dev[id];dv[id]={d:mx(a.d,b.d||{}),h:mx(a.h,b.h||{}),wd:mx(a.wd,b.wd||{})}}L={v:2,start:[L.start,inc.start].filter(Boolean).sort()[0],dev:dv};put('wlog',L)}save()}catch(e){}return r}}
if(!get('wlog',null))put('wlog',L);
setTimeout(save,800);
addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden')save()});
})();
