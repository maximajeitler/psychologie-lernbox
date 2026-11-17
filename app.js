/* Psychologie Lernbox · App (installierbar + offline) */
(function(){
const me=document.currentScript&&document.currentScript.src||'';
const base=me?me.replace(/app\.js(\?.*)?$/,''):'./';
const standalone=()=>matchMedia('(display-mode: standalone)').matches||navigator.standalone===true;
const ua=navigator.userAgent;
const iOS=/iPhone|iPad|iPod/.test(ua)||(navigator.platform==='MacIntel'&&navigator.maxTouchPoints>1);
const android=/Android/.test(ua);
let deferred=null;

/* Service Worker: speichert alle Seiten und Lerntools fürs Offline-Lernen */
if('serviceWorker' in navigator&&(location.protocol==='https:'||location.hostname==='localhost')){
  addEventListener('load',()=>navigator.serviceWorker.register(base+'sw.js',{scope:base}).catch(()=>{}));
  navigator.serviceWorker.ready.then(()=>setTimeout(refresh,300)).catch(()=>{});
}
addEventListener('beforeinstallprompt',e=>{e.preventDefault();deferred=e;refresh()});
addEventListener('appinstalled',()=>{deferred=null;close();refresh()});

/* Styles (funktionieren auf der Website und in den Lerntools) */
const st=document.createElement('style');st.textContent=`
.appbg{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:90}
.appdlg{position:fixed;z-index:91;left:50%;top:50%;transform:translate(-50%,-50%);width:min(460px,calc(100vw - 24px));max-height:calc(100vh - 40px);overflow:auto;background:#FEFEFE;color:#1A1C24;border-radius:20px;box-shadow:0 24px 70px rgba(0,0,0,.35);padding:24px 22px 20px;font-family:'Instrument Sans',system-ui,sans-serif;line-height:1.5}
.appdlg h3{margin:0 0 4px;font-family:'Bricolage Grotesque',system-ui,sans-serif;font-weight:800;font-size:1.5rem;letter-spacing:-.02em;text-wrap:balance}
.appdlg p{margin:6px 0;color:#4A4E58;font-size:.95rem;text-wrap:pretty}
.appdlg .ax{position:absolute;top:10px;right:14px;border:0;background:none;font-size:1.5rem;color:#5F636D;cursor:pointer}
.appdlg .ahead{display:flex;gap:14px;align-items:center;margin-bottom:8px}
.appdlg .ahead img{width:60px;height:60px;border-radius:15px;flex:none;box-shadow:0 4px 14px rgba(10,20,40,.25)}
.appdlg ol{margin:10px 0;padding:0;list-style:none;counter-reset:s;display:grid;gap:8px}
.appdlg ol li{counter-increment:s;display:flex;gap:10px;align-items:flex-start;background:#F1F4F8;border-radius:12px;padding:10px 12px;font-size:.95rem}
.appdlg ol li::before{content:counter(s);flex:none;width:22px;height:22px;border-radius:50%;background:#0A1428;color:#72CEF2;font-weight:700;font-size:.8rem;display:grid;place-items:center;margin-top:1px}
.appdlg .shr{display:inline-block;vertical-align:-3px;width:16px;height:18px}
.appdlg .abtn{display:inline-flex;align-items:center;gap:8px;border:0;border-radius:999px;padding:11px 20px;background:#0A1428;color:#fff;font:inherit;font-weight:600;cursor:pointer}
.appdlg .abtn:hover{background:#1B3360}
.appdlg .afeat{display:grid;gap:4px;margin:12px 0 4px;padding:12px 14px;border:1.5px solid #E1E4EA;border-radius:14px;font-size:.9rem}
.appdlg .afeat b{font-weight:600}
.appdlg .anote{font-size:.85rem;color:#5F636D}
.appok{color:#1E7F4F;font-weight:600}
.offpill{position:fixed;left:50%;bottom:calc(14px + env(safe-area-inset-bottom));transform:translateX(-50%);z-index:85;background:#0A1428;color:#fff;border-radius:999px;padding:8px 16px;font:500 .85rem/1.3 'Instrument Sans',system-ui,sans-serif;box-shadow:0 8px 26px rgba(0,0,0,.3);display:flex;gap:8px;align-items:center;max-width:calc(100vw - 24px)}
.offpill i{width:8px;height:8px;border-radius:50%;background:#FFB347;flex:none;font-style:normal}
@media (prefers-color-scheme:dark){.appdlg{background:#1D1F23;color:#EBECEF}.appdlg p,.appdlg .anote{color:#B5B8C0}.appdlg ol li{background:#2A2D33}.appdlg .afeat{border-color:#3A3D44}.appdlg .abtn{background:#72CEF2;color:#0A1428}.appdlg .abtn:hover{background:#9EDDF5}.appok{color:#6FD39E}}
`;document.head.appendChild(st);

const SHARE='<svg class="shr" viewBox="0 0 16 18" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"><path d="M8 11V1.5M4.8 4.5 8 1.3l3.2 3.2"/><path d="M5 7H2.5v9.5h11V7H11"/></svg>';
function steps(){
  if(iOS)return `<ol><li><span>Tippe unten (iPad: oben) auf <b>Teilen</b> ${SHARE}.</span></li><li><span>Wähle <b>„Zum Home-Bildschirm“</b> – eventuell ein Stück nach unten scrollen.</span></li><li><span>Tippe auf <b>„Hinzufügen“</b>. Fertig!</span></li></ol>
    <p class="anote">Geht in Safari und ab iOS 16.4 auch in Chrome. Wichtig: Die App am iPhone hat einen eigenen Speicher. <b>Melde dich in der App einmal an</b>, dann ist dein Fortschritt auch dort.</p>`;
  if(deferred)return `<p style="margin:14px 0 6px"><button class="abtn" data-app="go">⤓ Jetzt installieren</button></p>`;
  if(android)return `<ol><li><span>Tippe oben rechts auf das Menü <b>⋮</b>.</span></li><li><span>Wähle <b>„App installieren“</b> oder <b>„Zum Startbildschirm hinzufügen“</b>.</span></li></ol>`;
  return `<ol><li><span>In Chrome oder Edge: oben in der Adressleiste auf das Symbol <b>⊕ Installieren</b> klicken (oder Menü ⋮ → „Installieren“).</span></li><li><span>Am Mac in Safari: Menü <b>Ablage → Zum Dock hinzufügen</b>.</span></li></ol>`;
}
function close(){document.querySelector('.appbg')?.remove();document.querySelector('.appdlg')?.remove()}
function open(){close();
  const bg=document.createElement('div');bg.className='appbg';bg.onclick=close;document.body.appendChild(bg);
  const d=document.createElement('div');d.className='appdlg';d.setAttribute('role','dialog');d.setAttribute('aria-label','Lernbox als App');
  d.innerHTML=`<button class="ax" aria-label="Schließen">×</button>
   <div class="ahead"><img src="${base}icon-192.png" alt=""><div><h3>Lernbox als App</h3><p style="margin:0">Mit eigenem Icon am Homescreen, ganz ohne App Store.</p></div></div>
   ${standalone()?'<p class="appok">✓ Du verwendest die Lernbox schon als App.</p>':steps()}
   <div class="afeat"><span>📴 <b>Lernen ohne Internet:</b> Lernzettel, Karteikarten und Quiz gehen auch im Zug oder im Hörsaal-Keller.</span><span>☁️ <b>Fortschritt geht nicht verloren:</b> wird auf dem Gerät gespeichert und mit deinem Account abgeglichen, sobald du wieder online bist.</span><span>🌐 Ranglisten, Lerngruppen und Wetter brauchen Internet.</span></div>`;
  document.body.appendChild(d);
  d.querySelector('.ax').onclick=close;
  const g=d.querySelector('[data-app="go"]');if(g)g.onclick=async()=>{if(!deferred)return;deferred.prompt();try{await deferred.userChoice}catch(e){}deferred=null;close();refresh()};
}
window.lbApp={open,standalone,canPrompt:()=>!!deferred};
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
document.addEventListener('click',e=>{const b=e.target.closest('[data-x="app"],[data-app="open"]');if(!b)return;e.preventDefault();e.stopPropagation();open()},true);

/* Einstellungen: Panel „App“ */
async function offlineReady(){try{if(!('caches' in window))return false;const ks=await caches.keys();for(const k of ks){if(!k.startsWith('lernbox-'))continue;const c=await caches.open(k);if(await c.match(base+'faecher/sozial-1.html',{ignoreSearch:true}))return true}}catch(e){}return false}
async function refresh(){const el=document.getElementById('apppanel');if(!el)return;
  const sa=standalone();
  el.innerHTML=`<p class="label">App</p><h2>Lernbox am Handy</h2>
    <div class="srow"><div class="t"><b>${sa?'Läuft als App ✓':'Als App installieren'}</b><small>${sa?'Du hast die Lernbox installiert.':'Icon am Homescreen, öffnet sich ohne Browserleiste – kein App Store nötig.'}</small></div>${sa?'':`<button class="btn g" data-app="open">📱 ${deferred?'Installieren':'So geht’s'}</button>`}</div>
    <div class="srow"><div class="t"><b>Offline lernen</b><small id="appoff">Wird geprüft …</small></div></div>`;
  const ok=await offlineReady();const o=document.getElementById('appoff');
  if(o)o.textContent=ok?'✓ Bereit: Alle Lerntools sind auf diesem Gerät gespeichert und gehen auch ohne Internet.':'Wird beim nächsten Öffnen mit Internet eingerichtet.'}
window.appPanel=refresh;

/* Offline-Hinweis */
function net(){let p=document.querySelector('.offpill');
  if(navigator.onLine){p&&p.remove();return}
  if(!p){p=document.createElement('div');p.className='offpill';p.setAttribute('role','status');p.innerHTML='<i></i><span>Offline – du kannst weiterlernen, alles wird gespeichert.</span>';p.title='Ausblenden';p.onclick=()=>p.remove();document.body.appendChild(p)}}
addEventListener('online',net);addEventListener('offline',net);
if(document.readyState==='loading')addEventListener('DOMContentLoaded',()=>{net();refresh()});else{net();refresh()}
})();

/* ===== Benachrichtigungen: Pop-up in der Ecke bei neuen Nachrichten (stummschaltbar) ===== */
(function(){
const SK='lernbox.settings',LK='lbnotif.last',B2=((document.currentScript&&document.currentScript.src)||'').replace(/app\.js(\?.*)?$/,'')||'./';
const getS=()=>{try{return JSON.parse(localStorage.getItem(SK)||'{}')||{}}catch(e){return{}}};
const css=document.createElement('style');css.textContent=`
.ntf-wrap{position:fixed;right:16px;bottom:calc(16px + env(safe-area-inset-bottom));z-index:120;display:grid;gap:8px;max-width:min(360px,calc(100vw - 32px))}
.ntf{display:flex;gap:10px;align-items:flex-start;background:#0A1428;color:#fff;border-radius:16px;padding:12px 14px;box-shadow:0 14px 40px rgba(0,0,0,.3);font:500 .9rem/1.35 'Instrument Sans',system-ui,sans-serif;cursor:pointer;animation:ntfin .35s cubic-bezier(.2,.9,.3,1.2) both;text-align:left;border:0}
.ntf:hover{background:#13213D}.ntf b{display:block;font-size:.82rem;color:#72CEF2}.ntf .nx{margin-left:auto;background:none;border:0;color:#9DAFCC;font-size:1.1rem;cursor:pointer;padding:0 0 0 6px}
.ntf .na{width:34px;height:34px;border-radius:50%;background:#D6F1FA;display:grid;place-items:center;overflow:hidden;flex:none;--hl:#D6F1FA}.ntf .na svg{width:125%;height:auto;margin-top:6px}
@keyframes ntfin{from{opacity:0;transform:translateY(16px) scale(.96)}to{opacity:1;transform:none}}`;document.head.appendChild(css);
let wrap=null;
function pop(m){if(!wrap){wrap=document.createElement('div');wrap.className='ntf-wrap';document.body.appendChild(wrap)}
  const b=document.createElement('div');b.className='ntf';b.setAttribute('role','status');
  const who=m.gname?`${m.nickname} · ${m.gname}`:m.nickname;
  const av=m.avatar&&m.avatar.sp&&window.petSVG?window.petSVG({sp:m.avatar.sp,mood:'content'}):(m.gname?'👥':'💬');
  b.innerHTML=`<span class="na">${av}</span><span><b></b><span class="nt"></span></span><button class="nx" aria-label="Schließen">×</button>`;
  b.querySelector('b').textContent='💬 '+who;b.querySelector('.nt').textContent=window.stkPreview?window.stkPreview(m.body):m.body;
  b.onclick=e=>{if(e.target.closest('.nx')){b.remove();return}if(window.socOpenChat&&document.getElementById('socmain')){window.socOpenChat(m.chat);b.remove();return}location.href=B2+'gruppen.html?chat='+encodeURIComponent(m.chat)};
  wrap.appendChild(b);setTimeout(()=>b.remove(),9000)}
async function check(){const st=window.acState&&window.acState();if(!st||!st.user||!window.acApi||document.hidden)return;
  let last=+localStorage.getItem(LK)||0;
  if(!last){const r=await window.acApi.rpc('max_msg_id');if(r&&r.data!=null)localStorage.setItem(LK,String(r.data||1));return}
  const r=await window.acApi.rpc('new_msgs',{p_after:last});const list=(r&&r.data||[]).slice().reverse();if(!list.length)return;
  localStorage.setItem(LK,String(Math.max(last,...list.map(m=>m.id))));
  const S=getS(),mute=S.mute||{};if(S.notifOff)return;
  const openChat=window.SOC&&window.SOC.sel&&document.getElementById('socmain')?window.SOC.sel.chat:null;
  list.filter(m=>!mute[m.chat]&&m.chat!==openChat).slice(-3).forEach(pop);
  if(window.socRender&&document.getElementById('socside'))window.socRender(true)}
setTimeout(check,4000);setInterval(check,15000);
})();

