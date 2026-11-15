/* Psychologie Lernbox · Lern-Wrapped (nur am Semesterende) */
(function(){
const main=document.getElementById('wrapmain');if(!main)return;
const NAVY='#0A1428',TQ='#72CEF2',CREAM='#FBF3E6',CORAL='#FF8A73',GREEN='#5FD39A',DEEP='#13213D';
const fmt=n=>Number(n||0).toLocaleString('de-AT');
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const P=x=>{if(x==null)return null;if(typeof x==='object')return x;try{return JSON.parse(x)}catch(e){return null}};
const dk=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const pd=k=>{const a=k.split('-');return new Date(+a[0],+a[1]-1,+a[2])};
const WD=['Sonntag','Montag','Dienstag','Mittwoch','Donnerstag','Freitag','Samstag'];

/* ---------- Wann gibt's Wrapped? Ab Beginn der Semesterferien (Uni-Graz-Kalender UNI in site.js) ---------- */
const pdk=s=>{const a=s.split('-');return new Date(+a[0],+a[1]-1,+a[2])};
function termInfo(key){const T=uniTerm(key);return{key:T.key,label:T.label,long:T.long,from:pdk(T.from),to:new Date(pdk(T.to).getTime()+864e5-1),wrap:T.wrap}}
const qs=new URLSearchParams(location.search);
const demo=qs.has('demo');
const preview=demo||qs.has('vorschau');
const WS=wrapState(),todayK=ukey(new Date());
const req=qs.get('s');
const info=req&&(WS.past.some(T=>T.key===req)||preview)?termInfo(req):WS.open?termInfo(WS.open.key):preview?termInfo(termKeyOf(new Date())):null;
const frozen=info&&!demo&&todayK>info.wrap[1];  /* nach den Ferien: eingefrorener Stand */
/* Name auf der Karte: Spitzname aus dem Account, sonst selbst eingetragen */
const NK='lernbox.wrapname';
function wname(){try{const v=localStorage.getItem(NK);if(v)return v}catch(e){}const s=window.acState&&window.acState();return (s&&s.profile&&s.profile.nickname)||''}

/* ---------- Daten sammeln ---------- */
const mx=(a,b)=>{const o={...(a||{})};for(const k in (b||{})){const x=o[k],y=b[k];if(Array.isArray(y))o[k]=x?x.map((v,i)=>Math.max(v,y[i]||0)):y.slice()}return o};
/* Lernzeiten: pro Gerät eigene Liste (v2) – gleiche Geräte zusammenführen, verschiedene Geräte addieren */
const norm=x=>!x?null:x.dev?x:{v:2,start:x.start,dev:{alt:{d:x.d||{},h:x.h||{},wd:x.wd||{}}}};
const addM=(a,b)=>{const o={...(a||{})};for(const k in (b||{})){const x=o[k],y=b[k];if(Array.isArray(y))o[k]=x?x.map((v,i)=>v+(y[i]||0)):y.slice()}return o};
function mergeLog(a,b){a=norm(a);b=norm(b);if(!a&&!b)return null;const dv={};
  for(const L of [a,b])if(L)for(const id in L.dev){const x=dv[id]||{d:{},h:{},wd:{}},y=L.dev[id];dv[id]={d:mx(x.d,y.d),h:mx(x.h,y.h),wd:mx(x.wd,y.wd)}}
  let d={},h={},wd={};for(const id in dv){d=addM(d,dv[id].d);h=addM(h,dv[id].h);wd=addM(wd,dv[id].wd)}
  return{start:[a&&a.start,b&&b.start].filter(Boolean).sort()[0],d,h,wd}}
async function waitAcc(){for(let i=0;i<40;i++){const s=window.acState&&window.acState();if(s&&s.ready)return s;await new Promise(r=>setTimeout(r,100))}return window.acState?window.acState():{}}
function demoData(I){const days={};let k=0;for(let d=new Date(I.from);d<=new Date(2027,0,31);d.setDate(d.getDate()+1)){const r=Math.sin(k++*1.7)+Math.cos(k*.37);if(r>-.2){days[dk(d)]=Math.round(25+40*(r+1.5)+(d.getMonth()===0?60:0))}}
  const dks=Object.keys(days).sort();let streak=0,cur=0,prev=null,best=null;for(const x of dks){const d=pd(x);cur=prev&&Math.round((d-prev)/864e5)===1?cur+1:1;streak=Math.max(streak,cur);prev=d;if(!best||days[x]>best.n)best={k:x,n:days[x]}}
  const ans=dks.reduce((s,x)=>s+days[x],0);
  return{I,ans,seen:Math.round(ans*.31),right:Math.round(ans*.79),acc:79,fixed:412,known:236,ach:17,sims:[{r:24,n:33},{r:27,n:33},{r:31,n:33}],
    nem:{q:'Wie nennt man das Phänomen, dass Menschen in Gruppen weniger Anstrengung zeigen als allein?',w:7,ok:true,tool:'Sozialpsychologie I'},
    name:'Maxima',pets:[{sp:'cat',name:'Mochi',snacks:318,tool:'Sozialpsychologie I',eq:{head:{id:'kranz',c:'#F6A6C1'},eyes:{id:'rund',c:'#3A4248'}}},{sp:'owl',name:'Professor Hu',snacks:204,tool:'Entwicklungspsychologie I',eq:{head:{id:'doktor',c:'#F2B33D'},neck:{id:'fliege',c:'#8E2C48'}}},{sp:'axolotl',name:'Blubb',snacks:121,tool:'Tätigkeitsbereiche',eq:{neck:{id:'schal',c:'#0E6E7E',p:'streifen'}}}],tools:[{n:'Sozialpsychologie I',a:Math.round(ans*.42),c:'#6B2D68'},{n:'Entwicklungspsychologie I',a:Math.round(ans*.33),c:'#2B44F0'},{n:'Tätigkeitsbereiche',a:Math.round(ans*.25),c:'#0E6E7E'}],
    days,dks,streak,best,hours:[14,6,2,0,0,0,0,1,4,9,12,15,11,8,13,18,22,25,21,26,34,41,38,27],hsum:350,wds:[52,30,35,28,31,12,44],
    ex:[{n:'Sozialpsychologie I',g:2},{n:'Entwicklungspsychologie I',g:1},{n:'Tätigkeitsbereiche',g:2}],pct:84,user:null}}
async function gather(I){
  const st=await waitAcc();let remote={},pct=null;
  if(st&&st.user&&window.acApi&&window.acApi.allProgress){try{(await window.acApi.allProgress()||[]).forEach(r=>remote[r.tool]=r.data||{})}catch(e){}}
  const lget=k=>{try{return localStorage.getItem(k)}catch(e){return null}};
  const inR=k=>{const d=pd(k);return d>=I.from&&d<=I.to};
  const days={},hours=Array(24).fill(0),wds=Array(7).fill(0),tools=[];let ans=0,right=0,fixed=0,known=0,seen=0,sims=[],ach=0,nem=null,pets=[];
  for(const l of LV.filter(l=>l.url&&l.key)){const R=remote[l.key]||{};
    let a=P(lget(l.key+'.wsum')),b=P(R.wsum);let ws=(a&&b)?((b.ans||0)>(a.ans||0)?b:a):(a||b);
    const wl=mergeLog(P(lget(l.key+'.wlog')),P(R.wlog));
    if(!ws){const s1=P(lget(l.key+'.stats'))||{},s2=P(R.stats)||{},s={...s2,...s1};let x=0,y=0;Object.values(s).forEach(v=>{x+=(v.r||0)+(v.w||0);y+=v.r||0});if(x)ws={ans:x,right:y,name:l.n,sims:P(lget(l.key+'.simhist'))||[]}}
    if(!ws)continue;
    let logged=0,loggedR=0,all=0;
    if(wl&&wl.d)for(const k in wl.d){const e=wl.d[k];all+=e[0];if(inR(k)){logged+=e[0];loggedR+=e[1];days[k]=(days[k]||0)+e[0]}}
    const pre=Math.max(0,(ws.ans||0)-all),startIn=!wl||!wl.start||inR(wl.start);
    const preIn=startIn?pre:0,acc=ws.ans?(ws.right||0)/ws.ans:0;
    const plog=ws.plog||{};for(const k in plog){if(inR(k)&&(!wl||!wl.start||k<wl.start)){days[k]=(days[k]||0)+(plog[k].a||0)}}
    if(wl&&wl.h&&wl.h[I.key])wl.h[I.key].forEach((v,i)=>hours[i]+=v);
    if(wl&&wl.wd&&wl.wd[I.key])wl.wd[I.key].forEach((v,i)=>wds[i]+=v);
    const semA=logged+preIn;if(!semA)continue;
    ans+=semA;right+=loggedR+Math.round(preIn*acc);fixed+=ws.fixed||0;seen+=ws.seen||0;known+=ws.known||0;ach+=ws.ach||0;
    (ws.sims||[]).forEach(s=>{const d=new Date(s.d);if(d>=I.from&&d<=I.to)sims.push({...s,tool:l.n})});
    if(ws.nem&&(!nem||ws.nem.w>nem.w))nem={...ws.nem,tool:l.n};
    if(ws.pet&&ws.pet.sp)pets.push({...ws.pet,tool:l.n,a:semA});
    tools.push({n:l.n,a:semA,c:l.f&&l.f.a||NAVY,h:l.f&&l.f.h||TQ});
  }
  tools.sort((a,b)=>b.a-a.a);
  /* Tage */
  const dks=Object.keys(days).filter(k=>days[k]>0).sort();let streak=0,cur=0,prev=null,best=null;
  for(const k of dks){const d=pd(k);cur=prev&&Math.round((d-prev)/864e5)===1?cur+1:1;streak=Math.max(streak,cur);prev=d;if(!best||days[k]>best.n)best={k,n:days[k]}}
  /* Prüfungen */
  const ex=[];try{for(const k in X){const v=X[k];if(!v||!v.d||v.res!=='ok')continue;const d=D(v.d);if(d>=I.from&&d<=new Date(I.to.getTime()+45*864e5))ex.push({n:(byKey[k]&&byKey[k].n)||k,g:+v.grade||null})}}catch(e){}
  /* Vergleich mit allen */
  if(st&&st.user&&window.acApi&&ans>0){try{const r=await window.acApi.rpc('wrapped_rank',{p_answered:ans});const row=r&&r.data&&(Array.isArray(r.data)?r.data[0]:r.data);if(row&&row.n>=5)pct=row.pct}catch(e){}}
  const hsum=hours.reduce((a,b)=>a+b,0);pets.sort((a,b)=>(b.snacks||0)-(a.snacks||0)||b.a-a.a);
  return{I,ans,seen,right,acc:ans?Math.round(100*right/ans):0,fixed,known,ach,sims,nem,pets,tools,days,dks,streak,best,hours,hsum,wds,ex,pct,user:st&&st.user}
}
function persona(W){
  let t='Durchzieher:in',e='💪';
  if(W.hsum>=15){const h=W.hours.indexOf(Math.max(...W.hours));
    [t,e]=h>=5&&h<10?['Frühaufsteher:in','🌅']:h>=10&&h<17?['Tagmensch','☀️']:h>=17&&h<22?['Abendlerner:in','🌆']:['Nachteule','🦉']}
  const perDay=W.dks.length?W.ans/W.dks.length:0;
  const s=W.acc>=85?'mit Präzision':W.streak>=7?'mit Ausdauer':W.sims.length>=3?'im Prüfungsmodus':perDay>=80&&W.dks.length<=10?'auf den letzten Drücker':'mit Plan';
  return{t,e,s}
}

/* ---------- Logo ---------- */
const PSI=(cx,cy,s,c,w)=>{const h=s/2,u=s*.4;return `<g fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"><path d="M${cx} ${cy-h}V${cy+h}"/><path d="M${cx-u} ${cy-h+s*.04}V${cy-h+s*.3}Q${cx-u} ${cy+s*.12} ${cx} ${cy+s*.12}Q${cx+u} ${cy+s*.12} ${cx+u} ${cy-h+s*.3}V${cy-h+s*.04}"/></g>`};
const LOGO=`<svg viewBox="0 0 100 100" class="wlogo"><rect width="100" height="100" rx="24" fill="${TQ}"/><g class="lid"><rect x="16" y="19" width="68" height="15" rx="5" fill="#1F2D4A"/></g><rect x="20" y="37" width="60" height="45" rx="8" fill="${NAVY}"/>${PSI(50,59.5,27,TQ,5.6)}</svg>`;

const petName=p=>p.name||(window.PET_SP&&window.PET_SP[p.sp]&&window.PET_SP[p.sp].n)||'Dein Haustier';
const petImg=(p,m)=>window.petSVG?window.petSVG({sp:p.sp,mood:m||'yay',eq:p.eq||{}}):'';
/* ---------- Folien ---------- */
function slides(W){const S=[],I=W.I,pe=persona(W);
  S.push({bg:NAVY,ink:'#fff',dur:5000,h:`<div class="wc">${LOGO}<p class="wk">Lern-Wrapped</p><h2 class="wbig">${W.name?esc(W.name)+', das war dein':'Dein'} ${esc(I.label)}<br>in der Lernbox</h2><p class="wsub">Tippe rechts, um weiterzumachen →</p></div>`});
  if(!W.ans){S.push({bg:CREAM,ink:NAVY,h:`<div class="wc"><p class="wk">Hmm …</p><h2 class="wbig">Dieses Semester war's ruhig hier.</h2><p class="wsub">Nächstes Semester gibt's mehr zu feiern. Versprochen! 😄</p></div>`});return S}
  const hrs=W.ans*20/3600;
  S.push({bg:TQ,ink:NAVY,h:`<div class="wc"><p class="wk">Du hast</p><h2 class="wnum" data-count="${W.ans}">0</h2><p class="wl">Antworten gegeben.</p>${W.seen?`<p class="wsub">zu <b>${fmt(W.seen)} verschiedenen Fragen</b> – ${W.ans>W.seen*1.2?`im Schnitt hast du jede ${(W.ans/W.seen).toLocaleString('de-AT',{maximumFractionDigits:1})}-mal gemacht. Wiederholung ist alles! 🔁`:'fast jede nur einmal. Mutig! 😎'}</p>`:''}<p class="wsub">${hrs>=1?`Bei 20 Sekunden pro Frage sind das rund <b>${fmt(Math.round(hrs))} Stunden</b> Quiz – ${Math.round(hrs*60/45)>=1?`so viel wie <b>${fmt(Math.round(hrs*60/45))} Serienfolgen</b>.`:'nicht schlecht!'}`:`Jede einzelne davon zählt. ✨`}</p></div>`});
  S.push({bg:CREAM,ink:NAVY,h:`<div class="wc"><p class="wk">Trefferquote</p><h2 class="wnum"><span data-count="${W.acc}">0</span> %</h2><p class="wl">deiner Antworten waren richtig.</p>${W.fixed?`<p class="wsub"><b>${fmt(W.fixed)} Fragen</b> hattest du zuerst falsch – und dann doch drauf. 💪</p>`:''}</div>`});
  if(W.dks.length){const from=I.from,to=new Date(Math.min(I.to,new Date()));const cells=[];const mxd=Math.max(...Object.values(W.days));
    const start=new Date(from);start.setDate(start.getDate()-((start.getDay()+6)%7));
    for(let d=new Date(start);d<=to;d.setDate(d.getDate()+1)){const k=dk(d),v=W.days[k]||0,out=d<from;cells.push(`<i style="opacity:${out?0:v?(.35+.65*v/mxd).toFixed(2):.12}"></i>`)}
    S.push({bg:CORAL,ink:NAVY,h:`<div class="wc"><p class="wk">Du hast an</p><h2 class="wnum"><span data-count="${W.dks.length}">0</span> Tagen</h2><p class="wl">gelernt.</p><div class="heat">${cells.join('')}</div>
      <p class="wsub">${W.streak>1?`Längste Serie: <b>${W.streak} Tage am Stück</b> 🔥<br>`:''}${W.best?`Fleißigster Tag: <b>${pd(W.best.k).toLocaleDateString('de-AT',{day:'numeric',month:'long'})}</b> mit ${fmt(W.best.n)} Fragen 🤯`:''}</p></div>`})}
  if(W.hsum>=15){const m=Math.max(...W.hours),h=W.hours.indexOf(m),wd=W.wds.indexOf(Math.max(...W.wds));
    S.push({bg:DEEP,ink:'#fff',h:`<div class="wc"><p class="wk">Deine Lernzeit</p><h2 class="wbig">${pe.e} ${esc(pe.t)}</h2><div class="hours">${W.hours.map((v,i)=>`<i style="--v:${(v/m).toFixed(3)}" class="${i===h?'pk':''}"></i>`).join('')}</div><div class="hax"><span>0</span><span>6</span><span>12</span><span>18</span><span>24</span></div>
      <p class="wsub">Am liebsten hast du um <b>${h} Uhr</b> gelernt.${W.wds.some(Boolean)?`<br>Dein Lerntag: <b>${WD[wd]}</b>.`:''}</p></div>`})}
  if(W.tools.length){const m=W.tools[0].a;
    S.push({bg:'#FFFFFF',ink:NAVY,h:`<div class="wc"><p class="wk">Dein Fach Nr. 1</p><h2 class="wbig${W.tools[0].n.length>18?' long':''}">${esc(W.tools[0].n)}</h2><div class="bars">${W.tools.map(t=>`<div class="br"><span>${esc(t.n)}</span><div><i style="--v:${(t.a/m).toFixed(3)};background:${t.c}"></i></div><b>${fmt(t.a)}</b></div>`).join('')}</div></div>`})}
  if(W.nem&&W.nem.w>=2)S.push({bg:'#2A1B3D',ink:'#fff',h:`<div class="wc"><p class="wk">Deine Nemesis-Frage 😈</p><blockquote class="nem">„${esc(W.nem.q)}“<small>${esc(W.nem.tool)}</small></blockquote><h2 class="wbig"><span data-count="${W.nem.w}">0</span>-mal falsch.</h2><p class="wsub">${W.nem.ok?'… aber am Ende hast du sie geknackt. ✓':'Nächstes Mal gehört sie dir. 😤'}</p></div>`});
  if(W.known||W.sims.length){const best=W.sims.length?Math.max(...W.sims.map(s=>Math.round(100*s.r/(s.n||1)))):0;
    S.push({bg:GREEN,ink:NAVY,h:`<div class="wc"><p class="wk">Training</p>${W.known?`<h2 class="wnum" data-count="${W.known}">0</h2><p class="wl">Karteikarten gewusst.</p>`:''}${W.sims.length?`<p class="wsub wsb"><b>${W.sims.length}</b> Prüfungs­simulation${W.sims.length>1?'en':''} · Bestwert <b>${best} %</b> 🎯</p>`:''}</div>`})}
  if(W.pets.length&&window.petSVG){const p=W.pets[0],rest=W.pets.slice(1,4);
    S.push({bg:CREAM,ink:NAVY,h:`<div class="wc"><p class="wk">${W.pets.length>1?'Deine Lern-Buddys':'Dein Lern-Buddy'}</p><div class="wpet">${petImg(p)}</div><h2 class="wbig">${esc(petName(p))} war immer dabei.</h2><p class="wsub">${p.snacks?`<b>${fmt(p.snacks)} Snacks</b> gefuttert`:''}${p.tool&&W.pets.length>1?` – in ${esc(p.tool)}`:''}${W.ach?`<br><b>${W.ach} Abzeichen</b> hast du gesammelt.`:''}</p>${rest.length?`<div class="wpets">${rest.map(r=>`<figure>${petImg(r)}<figcaption>${esc(petName(r))}<small>${esc(r.tool||'')}</small></figcaption></figure>`).join('')}</div>`:''}</div>`})}
  if(W.ex.length){const g=W.ex.filter(x=>x.g),avg=g.length?(g.reduce((a,b)=>a+b.g,0)/g.length):null;
    S.push({bg:TQ,ink:NAVY,h:`<div class="wc"><p class="wk">Geschafft 🎓</p><h2 class="wnum"><span data-count="${W.ex.length}">0</span></h2><p class="wl">Prüfung${W.ex.length>1?'en':''} bestanden.</p><ul class="exl">${W.ex.map(x=>`<li><span>${esc(x.n)}</span>${x.g?`<b>${x.g}</b>`:''}</li>`).join('')}</ul>${avg?`<p class="wsub">Notenschnitt: <b>${avg.toLocaleString('de-AT',{maximumFractionDigits:1})}</b></p>`:''}</div>`})}
  if(W.pct!=null&&W.pct>=30)S.push({bg:NAVY,ink:'#fff',h:`<div class="wc"><p class="wk">Im Vergleich</p><p class="wl">Du hast mehr gelernt als</p><h2 class="wnum" style="color:${TQ}"><span data-count="${W.pct}">0</span> %</h2><p class="wl">aller Lernbox-Leute.</p></div>`});
  S.push({bg:NAVY,ink:'#fff',dur:0,last:1,h:`${card(W,pe)}<div class="wact"><button class="wbtn" data-w="share">Teilen</button><button class="wbtn g" data-w="save">Bild speichern</button><button class="wbtn g" data-w="again">↺ Nochmal</button></div>`});
  return S}
function facts(W){const peak=W.hsum>=15?W.hours.indexOf(Math.max(...W.hours)):null;const g=W.ex.filter(x=>x.g),avg=g.length?g.reduce((a,b)=>a+b.g,0)/g.length:null;
  const best=W.sims.length?Math.max(...W.sims.map(s=>Math.round(100*s.r/(s.n||1)))):null;const T=[];
  T.push({v:W.acc+' %',l:'richtig',bg:CORAL});if(W.dks.length)T.push({v:fmt(W.dks.length),l:'Lerntage',bg:GREEN});
  if(W.streak>1)T.push({v:W.streak+' 🔥',l:'Tage am Stück',bg:CREAM});if(peak!=null)T.push({v:peak+' Uhr',l:'Lieblings-Lernzeit',bg:'#FFFFFF'});
  if(W.ex.length)T.push({v:W.ex.length+(avg?' · Ø '+avg.toLocaleString('de-AT',{maximumFractionDigits:1}):''),l:'Prüfungen bestanden',bg:TQ});
  if(W.known)T.push({v:fmt(W.known),l:'Karteikarten gewusst',bg:'#C9B8FF'});if(best!=null)T.push({v:best+' %',l:'Bestwert Simulation',bg:'#FFD9A0'});
  if(W.ach)T.push({v:String(W.ach),l:'Abzeichen',bg:'#B8F0D6'});
  return{tiles:T.slice(0,T.length>=6?6:T.length-(T.length%2)||T.length),top:W.tools[0]&&W.tools[0].n,pet:W.pets[0]||null}}
function card(W,pe){const F=facts(W);
  return `<div class="wfin"><div class="fh">${LOGO}<div><span>Lern-Wrapped · ${esc(W.I.label)}</span><b>${W.name?esc(W.name):esc(W.I.label)}</b></div></div>
  <div class="fp"><div class="fpt"><span class="fe">${pe.e}</span><h3>${esc(pe.t)}</h3><small>${esc(pe.s)}</small></div>${F.pet?`<div class="fpet">${petImg(F.pet)}</div>`:''}</div>
  <div class="fbig"><b>${fmt(W.ans)}</b><span>Antworten${W.seen?` · ${fmt(W.seen)} verschiedene Fragen`:''}</span></div>
  <div class="fg">${F.tiles.map(x=>`<div style="background:${x.bg}"><b>${x.v}</b><span>${x.l}</span></div>`).join('')}</div>
  ${F.top?`<div class="ftop"><span>Fach Nr. 1</span><b>${esc(F.top)}</b></div>`:''}
  <p class="ff">Psychologie Lernbox · Uni Graz</p></div>`}

/* ---------- Story-Player ---------- */
let SL=[],idx=0,timer=null,W=null,box=null;
function open(){box=document.createElement('div');box.className='wrapov';box.innerHTML=`<div class="wstory"><div class="wprog">${SL.map(()=>'<span><i></i></span>').join('')}</div><button class="wx" aria-label="Schließen">×</button><div class="wslide"></div><button class="wnav l" aria-label="Zurück"></button><button class="wnav r" aria-label="Weiter"></button></div>`;
  document.body.appendChild(box);document.documentElement.style.overflow='hidden';
  box.querySelector('.wx').onclick=close;box.querySelector('.wnav.l').onclick=()=>go(idx-1);box.querySelector('.wnav.r').onclick=()=>go(idx+1);
  box.addEventListener('click',e=>{const b=e.target.closest('[data-w]');if(!b)return;e.stopPropagation();const a=b.dataset.w;if(a==='again')go(0);else shareImg(a==='share')});
  go(0)}
function close(){clearTimeout(timer);box&&box.remove();box=null;document.documentElement.style.overflow=''}
function go(i){if(!box)return;if(i<0)i=0;if(i>=SL.length){close();return}idx=i;clearTimeout(timer);const s=SL[i],st=box.querySelector('.wstory');
  st.style.setProperty('--sbg',s.bg);st.style.setProperty('--sink',s.ink);
  box.querySelectorAll('.wprog span').forEach((p,j)=>{const b=p.firstChild;b.style.transition='none';b.style.width=j<i?'100%':'0%';});
  const sl=box.querySelector('.wslide');sl.innerHTML=s.h;sl.classList.toggle('wlast',!!s.last);sl.classList.remove('in');void sl.offsetWidth;sl.classList.add('in');
  box.querySelector('.wnav.l').hidden=false;box.querySelector('.wnav.r').hidden=!!s.last;
  sl.querySelectorAll('[data-count]').forEach(el=>{const to=+el.dataset.count,t0=performance.now(),D=1100;const f=t=>{const p=Math.min(1,(t-t0)/D),e=1-Math.pow(1-p,3);el.textContent=fmt(Math.round(to*e));if(p<1)requestAnimationFrame(f)};requestAnimationFrame(f)});
  const dur=s.dur===0?0:(s.dur||7000);
  if(dur){const b=box.querySelectorAll('.wprog span')[i].firstChild;requestAnimationFrame(()=>{b.style.transition=`width ${dur}ms linear`;b.style.width='100%'});timer=setTimeout(()=>go(i+1),dur)}
  else box.querySelectorAll('.wprog span')[i].firstChild.style.width='100%'}
addEventListener('keydown',e=>{if(!box)return;if(e.key==='Escape')close();if(e.key==='ArrowRight'||e.key===' '){e.preventDefault();go(idx+1)}if(e.key==='ArrowLeft')go(idx-1)});

/* ---------- Teilen-Bild (Story-Format 1080×1920) ---------- */
function svgImg(s){return new Promise(r=>{s=s.replace(/var\(--[\w-]+\)/g,'#D6F1FA');if(!/xmlns=/.test(s))s=s.replace('<svg ','<svg xmlns="http://www.w3.org/2000/svg" ');const i=new Image();i.onload=()=>r(i);i.onerror=()=>r(null);i.src='data:image/svg+xml;charset=utf-8,'+encodeURIComponent(s)})}
async function drawImg(){const pe=persona(W),F=facts(W),c=document.createElement('canvas');c.width=1080;c.height=1920;const x=c.getContext('2d');
  try{await Promise.all(['800 120px "Bricolage Grotesque"','600 40px "Instrument Sans"','600 30px "JetBrains Mono"'].map(f=>document.fonts.load(f)))}catch(e){}
  x.fillStyle=NAVY;x.fillRect(0,0,1080,1920);
  const blob=(cx,cy,r,col)=>{const g=x.createRadialGradient(cx,cy,0,cx,cy,r);g.addColorStop(0,col);g.addColorStop(1,'rgba(10,20,40,0)');x.fillStyle=g;x.fillRect(0,0,1080,1920)};
  blob(950,250,700,'rgba(114,206,242,.30)');blob(100,1500,650,'rgba(255,138,115,.18)');
  const rr=(X,Y,w,h,r,f)=>{x.beginPath();x.roundRect(X,Y,w,h,r);x.fillStyle=f;x.fill()};
  const fit=(t,max,size,w)=>{let z=size;do{x.font=`${w||800} ${z}px "Bricolage Grotesque"`;z-=3}while(x.measureText(t).width>max&&z>30)};
  /* Kopf mit Logo */
  const L=120,lx=80,ly=80,s=L/100;rr(lx,ly,L,L,24*s,TQ);rr(lx+16*s,ly+19*s,68*s,15*s,5*s,'#1F2D4A');rr(lx+20*s,ly+37*s,60*s,45*s,8*s,NAVY);
  x.strokeStyle=TQ;x.lineWidth=5.6*s;x.lineCap='round';x.lineJoin='round';const cx=lx+50*s,cy=ly+59.5*s,S=27*s,h=S/2,u=S*.4;
  x.beginPath();x.moveTo(cx,cy-h);x.lineTo(cx,cy+h);x.stroke();x.beginPath();x.moveTo(cx-u,cy-h+S*.04);x.lineTo(cx-u,cy-h+S*.3);x.quadraticCurveTo(cx-u,cy+S*.12,cx,cy+S*.12);x.quadraticCurveTo(cx+u,cy+S*.12,cx+u,cy-h+S*.3);x.lineTo(cx+u,cy-h+S*.04);x.stroke();
  x.fillStyle='#9DAFCC';x.font='600 30px "JetBrains Mono"';x.fillText('LERN-WRAPPED · '+W.I.label.toUpperCase(),230,128);x.fillStyle='#fff';fit(W.name||W.I.label,770,70);x.fillText(W.name||W.I.label,228,196);
  /* Lerntyp + Haustier */
  if(F.pet){const im=await svgImg(petImg(F.pet));if(im){x.save();x.beginPath();x.arc(860,420,190,0,7);x.fillStyle='rgba(214,241,250,.95)';x.fill();x.restore();x.drawImage(im,680,240,360,360)}}
  x.font='120px "Bricolage Grotesque"';x.fillStyle='#fff';x.fillText(pe.e,80,400);
  fit(pe.t,F.pet?580:900,120);x.fillStyle='#fff';x.fillText(pe.t,80,530);x.font='600 44px "Instrument Sans"';x.fillStyle=TQ;x.fillText(pe.s,84,592);
  /* große Zahl */
  rr(80,650,920,230,40,TQ);x.fillStyle=NAVY;fit(fmt(W.ans),820,170);x.fillText(fmt(W.ans),124,810);x.font='600 38px "Instrument Sans"';x.fillText('Antworten'+(W.seen?' · '+fmt(W.seen)+' verschiedene Fragen':''),128,856);
  /* Kacheln */
  F.tiles.forEach((t,i)=>{const X=80+(i%2)*470,Y=910+Math.floor(i/2)*220;rr(X,Y,450,200,34,t.bg);x.fillStyle=NAVY;fit(t.v,380,92);x.fillText(t.v,X+36,Y+112);x.font='600 34px "Instrument Sans"';x.fillText(t.l,X+38,Y+162)});
  /* Fach Nr. 1 */
  const ty=910+Math.ceil(F.tiles.length/2)*220;
  if(F.top){x.lineWidth=4;x.strokeStyle=TQ;x.beginPath();x.roundRect(82,ty+2,916,170,34);x.stroke();x.fillStyle='#9DAFCC';x.font='600 28px "JetBrains Mono"';x.fillText('FACH NR. 1',124,ty+62);x.fillStyle='#fff';fit(F.top,830,64);x.fillText(F.top,122,ty+136)}
  x.fillStyle='#9DAFCC';x.font='600 30px "JetBrains Mono"';x.fillText('PSYCHOLOGIE LERNBOX · UNI GRAZ',80,1850);
  return new Promise(r=>c.toBlob(r,'image/png'))}
window.lbWrapImg=()=>W?drawImg():null;
async function shareImg(share){const b=await drawImg();if(!b)return;const name='lern-wrapped-'+W.I.label.replace(/\W+/g,'-').toLowerCase()+'.png',f=new File([b],name,{type:'image/png'});
  if(share&&navigator.canShare&&navigator.canShare({files:[f]})){try{await navigator.share({files:[f],title:'Mein Lern-Wrapped'});return}catch(e){if(e&&e.name==='AbortError')return}}
  const a=document.createElement('a');a.href=URL.createObjectURL(b);a.download=name;document.body.appendChild(a);a.click();setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove()},1500)}

/* ---------- Eigene Semester-Zahlen (kompakt) für das Gruppen-Wrapped ---------- */
function compact(W){const hs=W.hsum||0,sumH=(a,b)=>W.hours.slice(a,b).reduce((x,y)=>x+y,0);
  const night=hs>=15?(sumH(22,24)+sumH(0,5))/hs:0,early=hs>=15?sumH(5,10)/hs:0;
  const best=W.sims.length?Math.max(...W.sims.map(s=>Math.round(100*s.r/(s.n||1)))):0,pet=W.pets[0];
  return{ans:W.ans,seen:W.seen||0,acc:W.acc,days:W.dks.length,streak:W.streak,peak:hs>=15?W.hours.indexOf(Math.max(...W.hours)):null,
    night:+night.toFixed(3),early:+early.toFixed(3),sims:W.sims.length,best,known:W.known,snacks:pet?pet.snacks||0:0,ach:W.ach,fixed:W.fixed,
    tools:W.tools.length,top:W.tools[0]?W.tools[0].n:null,pet:pet?{sp:pet.sp,eq:pet.eq||{}}:null}}
async function uploadStats(W){try{if(window.acApi&&window.acApi.saveWrapStats&&W.ans)await window.acApi.saveWrapStats(W.I.key,compact(W))}catch(e){}}
/* ---------- Gruppen-Wrapped: jede Person bekommt genau einen Award ---------- */
const AW=[
 ['🐝','Fleißbiene','hat die meisten Fragen beantwortet',m=>m.ans,v=>fmt(v)+' Antworten'],
 ['🎯','Präzisionswunder','hatte die beste Trefferquote',m=>m.ans>=30?m.acc:0,v=>v+' % richtig'],
 ['🦉','Nachteule','lernt am liebsten, wenn alle anderen schlafen',m=>m.s&&m.s.night>.15?m.s.night:0,v=>Math.round(v*100)+' % nach 22 Uhr'],
 ['🌅','Frühaufsteher:in','war schon wach, bevor der Kaffee fertig war',m=>m.s&&m.s.early>.15?m.s.early:0,v=>Math.round(v*100)+' % vor 10 Uhr'],
 ['🔥','Dauerbrenner:in','hat die längste Lern-Serie hingelegt',m=>m.s?m.s.streak:0,v=>v+' Tage am Stück'],
 ['📅','Stammgast','war an den meisten Tagen da',m=>m.s?m.s.days:0,v=>v+' Lerntage'],
 ['🧪','Simulationsprofi','hat am öftesten die Prüfung geprobt',m=>m.s?m.s.sims:0,v=>v+' Simulation'+(v===1?'':'en')],
 ['💪','Comeback-Kid','hat die meisten Fehler ausgebügelt',m=>m.s?m.s.fixed:0,v=>v+' Fragen erst falsch, dann richtig'],
 ['🃏','Kartenkönig:in','kennt die meisten Karteikarten',m=>m.s?m.s.known:0,v=>v+' Karten gewusst'],
 ['🐾','Haustier-Liebling','hat das Lern-Haustier am besten gefüttert',m=>m.s?m.s.snacks:0,v=>v+' Snacks'],
 ['🌈','Allrounder:in','war in den meisten Fächern unterwegs',m=>m.s?m.s.tools:m.faecher,v=>v+' Fächer'],
 ['🔁','Wiederholungs-Champion','hat am fleißigsten wiederholt',m=>m.s&&m.s.seen?m.ans/m.s.seen:0,v=>'jede Frage '+v.toLocaleString('de-AT',{maximumFractionDigits:1})+'×']];
function awards(M){const max=Math.max(0,...M.map(m=>m.ans)),lazyCut=max>=50?Math.max(10,max*.05):-1;
  M.forEach(m=>{m.aw=null;if(m.ans<lazyCut)m.aw={e:'🛋️',t:'Entspannteste Person',d:'hat diesmal am wenigsten erledigt – nächstes Semester holst du alle ein! 😄',v:fmt(m.ans)+' Antworten'}});
  for(const [e,t,d,f,vf] of AW){const free=M.filter(m=>!m.aw&&f(m)>0);if(!free.length)continue;
    /* nur vergeben, wenn die Person in dieser Kategorie auch unter den Besten der ganzen Gruppe ist */
    const best=free.reduce((a,b)=>f(b)>f(a)?b:a),all=M.map(f).sort((a,b)=>b-a),rank=all.indexOf(f(best));
    if(rank<=Math.max(1,Math.floor(M.length/2)))best.aw={e,t,d,v:vf(f(best))}}
  M.filter(m=>!m.aw).forEach(m=>m.aw={e:'🤝',t:'Teamgeist',d:'war das ganze Semester mit dabei',v:fmt(m.ans)+' Antworten'});return M}
const avSvg=(a,mood)=>a&&a.sp&&window.petSVG?window.petSVG({sp:a.sp,mood:mood||'yay',eq:a.eq||{}}):'<div class="gav0">🙂</div>';
function groupSlides(G){const S=[],I=G.I,M=G.members,tot=M.reduce((a,m)=>a+m.ans,0),hrs=tot*20/3600;
  S.push({bg:NAVY,ink:'#fff',dur:5000,h:`<div class="wc">${LOGO}<p class="wk">Gruppen-Wrapped · ${esc(I.label)}</p><h2 class="wbig">${esc(G.name)}</h2><div class="gavs">${M.map(m=>`<span>${avSvg(m.av,'content')}</span>`).join('')}</div><p class="wsub">${M.length} Leute, ein Semester. Mal schauen, was ihr so getrieben habt … 👀</p></div>`});
  S.push({bg:TQ,ink:NAVY,h:`<div class="wc"><p class="wk">Zusammen habt ihr</p><h2 class="wnum" data-count="${tot}">0</h2><p class="wl">Fragen beantwortet.</p><p class="wsub">${hrs>=1?`Das sind rund <b>${fmt(Math.round(hrs))} Stunden</b> Quiz – gemeinsam seid ihr eine Lernmaschine. 🚀`:'Jede einzelne zählt! ✨'}</p></div>`});
  const sorted=[...M].sort((a,b)=>b.ans-a.ans),mx=Math.max(1,sorted[0].ans);
  S.push({bg:'#FFFFFF',ink:NAVY,h:`<div class="wc"><p class="wk">Wer hat wie viel gelernt</p><h2 class="wbig">Eure Lern-Kurve</h2><div class="bars">${sorted.map(m=>`<div class="br"><span>${esc(m.name)}${m.me?' (du)':''}</span><div><i style="--v:${(m.ans/mx).toFixed(3)};background:${m.me?'#FF8A73':TQ}"></i></div><b>${fmt(m.ans)}</b></div>`).join('')}</div></div>`});
  const BG=[CREAM,GREEN,CORAL,'#C9B8FF',TQ,'#FFD9A0','#B8F0D6'],order=[...M].sort((a,b)=>(a.aw.t==='Entspannteste Person')-(b.aw.t==='Entspannteste Person')||Math.random()-.5);
  order.forEach((m,i)=>S.push({bg:BG[i%BG.length],ink:NAVY,h:`<div class="wc"><p class="wk">Award ${i+1} von ${M.length}</p><div class="gaw">${avSvg(m.av)}</div><h2 class="wbig">${m.aw.e} ${esc(m.aw.t)}</h2><p class="wl">${esc(m.name)}${m.me?' – das bist du!':''}</p><p class="wsub">${esc(m.name)} ${esc(m.aw.d)}.<br><b>${esc(m.aw.v)}</b></p></div>`}));
  S.push({bg:NAVY,ink:'#fff',dur:0,last:1,h:`<div class="wfin"><div class="fh">${LOGO}<div><span>Gruppen-Wrapped · ${esc(I.label)}</span><b>${esc(G.name)}</b></div></div>
    <div class="fbig"><b>${fmt(tot)}</b><span>Antworten zusammen · ${M.length} Leute</span></div>
    <div class="gfin">${order.map(m=>`<div><span class="gfa">${avSvg(m.av,'content')}</span><span class="gft"><b>${esc(m.name)}</b><small>${m.aw.e} ${esc(m.aw.t)}</small></span></div>`).join('')}</div>
    <p class="ff">Psychologie Lernbox · Uni Graz</p></div><div class="wact"><button class="wbtn g" data-w="again">↺ Nochmal</button></div>`});
  return S}
function groupDemo(I){const n=['Maxima','Lisa','Jonas','Sophie','Ben'],sp=['fox','cat','owl','axolotl','panda'];
  const M=n.map((name,i)=>({name,me:i===0,av:{sp:sp[i]},ans:[4210,3380,2950,1820,40][i],acc:[79,88,71,74,60][i],faecher:3,
    s:i===4?null:{ans:0,seen:[1400,1300,1250,900][i],acc:0,days:[52,61,38,30][i],streak:[9,14,6,5][i],night:[.42,.05,.12,.2][i],early:[.02,.3,.05,.1][i],sims:[3,6,1,0][i],known:[180,90,40,60][i],snacks:[318,120,80,40][i],fixed:[412,260,380,150][i],tools:[3,3,2,2][i]}}));
  return{I,name:'Lernkoalas 🐨',members:awards(M)}}
async function groupGather(I,gid){await waitAcc();let name='Eure Gruppe';try{const r=await window.acApi.rpc('my_groups',{});const g=(r.data||[]).find(x=>x.id===gid);if(g)name=g.name}catch(e){}
  try{const mine=await gather(I);if(mine.ans)await uploadStats(mine)}catch(e){}
  const r=await window.acApi.rpc('group_wrapped',{p_group:gid,p_sem:I.key});if(r.error)throw new Error(r.error);
  const M=(r.data||[]).map(x=>({name:x.nickname,me:x.is_me,av:x.stats&&x.stats.pet||x.avatar,ans:x.stats&&x.stats.ans||x.answered||0,acc:x.stats&&x.stats.acc||x.score||0,faecher:x.faecher,s:x.stats}));
  return{I,name,members:awards(M)}}

/* ---------- Seite ---------- */
const fD=s=>pdk(s).toLocaleDateString('de-AT',{day:'numeric',month:'long',year:'numeric'});
const archive=()=>WS.past.filter(T=>!info||T.key!==info.key).length?`<div class="warch"><p class="wk">Deine Rückblicke</p>${WS.past.filter(T=>!info||T.key!==info.key).map(T=>`<a href="wrapped.html?s=${T.key}">${esc(T.long)} →</a>`).join('')}</div>`:'';
const gid=qs.get('gruppe');
if(gid&&info){main.innerHTML=`<div class="wland">${LOGO}<p class="wk">${demo?'Demo mit Beispieldaten · ':''}Gruppen-Wrapped · ${esc(info.long)}</p><h2>Euer Semester als Gruppe</h2><p>Wer war die Fleißbiene, wer die Nachteule? Jede Person in eurer Gruppe bekommt ihren eigenen Award. 🏆</p><button class="wgo" data-w="ggo">▶ Los geht's</button><p class="sm" id="wstat"></p><p class="sm"><a href="wrapped.html${demo?'?demo':''}">Lieber dein eigenes Wrapped →</a></p></div>`;
  main.querySelector('[data-w="ggo"]').onclick=async e=>{const b=e.currentTarget;b.disabled=true;b.textContent='Wird zusammengezählt …';
    try{const st=demo?null:await waitAcc();if(!demo&&!(st&&st.user)){document.getElementById('wstat').textContent='Melde dich an, um das Gruppen-Wrapped zu sehen.';b.disabled=false;b.textContent='▶ Los geht\'s';return}
      const G=demo?groupDemo(info):await groupGather(info,gid);SL=groupSlides(G);open()}catch(err){console.error(err);document.getElementById('wstat').textContent='Da ist was schiefgelaufen – lade die Seite bitte neu.'}
    b.disabled=false;b.textContent='▶ Nochmal ansehen'};return}
if(!info){
  main.innerHTML=`<div class="wland off">${LOGO}<h2>Lern-Wrapped kommt in den Semesterferien ✨</h2><p>Einmal pro Semester siehst du hier dein Semester in Zahlen: wie viel du gelernt hast, deine Lieblings-Lernzeit, deine Nemesis-Frage und mehr. Das nächste – <b>${esc(WS.next.long)}</b> – gibt's ab <b>${fD(WS.next.wrap[0])}</b>.</p><p class="sm">Bis dahin: einfach weiterlernen – alles wird automatisch mitgezählt.</p><a class="sm" href="wrapped.html?demo">So schaut's aus: Demo ansehen →</a>${archive()}</div>`;return}
main.innerHTML=`<div class="wland">${LOGO}<p class="wk">${demo?'Demo mit Beispieldaten · ':preview&&!WS.past.some(T=>T.key===info.key)?'Vorschau · ':''}${esc(info.long)}</p><h2>${frozen?'Dein Rückblick':'Dein Semester in der Lernbox ist da.'}</h2><p>${frozen?`So war dein ${esc(info.long)} in der Lernbox.`:'Wie viel du gelernt hast, wann du am liebsten lernst, deine Nemesis-Frage – und am Ende ein Bild zum Teilen.'}</p>
  <label class="wname">Dein Name auf der Karte <input id="wnm" maxlength="24" placeholder="z. B. Maxima" value="${esc(demo?'Maxima':wname())}"></label>
  <button class="wgo" data-w="go">▶ Los geht's</button><p class="sm" id="wstat"></p>${archive()}</div>`;
const nm=main.querySelector('#wnm');
setTimeout(()=>{if(!nm.value&&!demo)nm.value=wname()},1500);
nm.addEventListener('input',()=>{if(demo)return;try{localStorage.setItem(NK,nm.value.trim())}catch(e){}});
main.querySelector('[data-w="go"]').onclick=async e=>{const b=e.currentTarget;b.disabled=true;b.textContent='Wird zusammengezählt …';
  try{const SK='lernbox.wrapped.'+info.key;let snap=null;try{snap=JSON.parse(localStorage.getItem(SK)||'null')}catch(x){}
    if(demo)W=demoData(info);
    else if(frozen&&snap){W={...snap,I:info}}
    else{W=await gather(info);uploadStats(W);if(todayK>=info.wrap[0]){try{const {I,...rest}=W;localStorage.setItem(SK,JSON.stringify(rest))}catch(x){}}}
    W.name=nm.value.trim();SL=slides(W);open()}catch(err){console.error(err);document.getElementById('wstat').textContent='Da ist was schiefgelaufen – lade die Seite bitte neu.'}
  b.disabled=false;b.textContent='▶ Nochmal ansehen'};
})();
