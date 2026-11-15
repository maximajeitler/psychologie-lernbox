/* Psychologie Lernbox · Accounts, automatisches Speichern, Leaderboards (Supabase) */
(function(){
const SB_URL='https://alvzppygynfntlkvlavn.supabase.co', SB_KEY='sb_publishable_JG7Iy3KLa__lSu-VRQpunQ_WVGg5hCR';
const TOOLS={ep1:'Entwicklungspsychologie I',soz1:'Sozialpsychologie I',tb30:'Tätigkeitsbereiche'};
const inTool=typeof CFG!=='undefined'&&typeof bkDump==='function';
let sb=null, user=null, profile=null, pushT=null, pulling=false;
/* Gespeicherte Anmeldung sofort lesen, damit beim Laden nicht kurz „Anmelden“ aufblitzt (wird nach der Prüfung bestätigt oder verworfen) */
let authDone=false, pend=null, profC=null;
try{const s=JSON.parse(localStorage.getItem('lernbox-auth')||'null');if(s&&s.user&&s.refresh_token)pend=s.user}catch(e){}
try{profC=JSON.parse(localStorage.getItem('lernbox.profile')||'null')}catch(e){}
if(pend&&profC&&profC.id!==pend.id)profC=null;
const curU=()=>user||(authDone?null:pend), curP=()=>profile||(!user&&curU()?profC:null);
function profSave(){try{if(user&&profile)localStorage.setItem('lernbox.profile',JSON.stringify({id:user.id,nickname:profile.nickname||null,avatar:profile.avatar||null,show_on_board:!!profile.show_on_board,show_general:!!profile.show_general}));else localStorage.removeItem('lernbox.profile')}catch(e){}}
const $=s=>document.querySelector(s);
/* ---------- Profilbild (Lern-Tier) ---------- */
const AV_MOODS=[['content','Ruhig'],['yay','Fröhlich'],['oops','Hoppla']];
function avLocal(){try{return JSON.parse(localStorage.getItem('lernbox.avatar')||'null')}catch(e){return null}}
function avatarHTML(a,size,cls){size=size||32;const f=window.petSVG;if(!a||!a.sp||typeof f!=='function')return '';
  const m=AV_MOODS.some(x=>x[0]===a.m)?a.m:'content';
  let s='';try{s=f({sp:a.sp,mood:m})}catch(e){return ''}
  s=s.replace(/viewBox="[^"]*"/,'viewBox="20 -2 160 160"').replace(/<path d="M38,183[^>]*\/>/,'').replace(/ role="img" aria-label="[^"]*"/,' aria-hidden="true"');
  return `<span class="av${cls?' '+cls:''}" style="width:${size}px;height:${size}px">${s}</span>`}
window.acAvatar=avatarHTML;window.AV_MOODS=AV_MOODS;window.avLocal=avLocal;
const escA=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ---------- Oberfläche ---------- */
const css=`
.acbtn{display:inline-flex;align-items:center;gap:6px;border:1px solid var(--line);background:var(--paper);color:var(--ink);border-radius:999px;padding:8px 14px;font:inherit;font-weight:600;cursor:pointer;white-space:nowrap}
.acbtn:hover{border-color:var(--ink)}
.acbtn .ic{display:none}
.av{display:inline-block;flex:none;border-radius:50%;overflow:hidden;background:#D6F1FA;vertical-align:middle;box-shadow:inset 0 0 0 1.5px rgba(0,0,0,.08)}
.av svg{width:100%;height:100%;display:block}
.av .pet *{animation:none!important}
.acbtn.hasav{padding:3px 12px 3px 3px}
.acbtn.hasav .dot,.acbtn.hasav .ic{display:none!important}
.topr{flex-wrap:wrap;justify-content:flex-end}
@media (max-width:560px){.acbtn{position:relative;width:40px;height:40px;padding:0;justify-content:center;flex:none}.acbtn.hasav{padding:0}.acbtn.hasav .av{width:40px!important;height:40px!important}.acbtn .t{display:none}.acbtn .ic{display:inline;font-size:1.05rem}.acbtn .dot{position:absolute;right:2px;top:2px;width:10px;height:10px;border:2px solid var(--paper)}}
.acbtn .dot{width:8px;height:8px;border-radius:50%;background:#9AA6B2}.acbtn.on .dot{background:#2EAE6B}
.acbg{position:fixed;inset:0;background:rgba(0,0,0,.4);z-index:60}
.acm{position:fixed;z-index:61;left:50%;top:50%;transform:translate(-50%,-50%);width:min(440px,calc(100vw - 24px));max-height:calc(100vh - 40px);overflow:auto;background:var(--paper);color:var(--ink);border-radius:16px;box-shadow:0 24px 70px rgba(0,0,0,.3);padding:20px;display:grid;gap:12px;font-family:var(--body)}
.acm h3{font-family:var(--display);font-weight:800;font-size:1.5rem;margin:0;letter-spacing:-.02em}
.acm p{margin:0;color:var(--muted);font-size:.92rem}
.acm label{display:grid;gap:4px;font-size:.85rem;font-weight:600}
.acm input[type=email],.acm input[type=password],.acm input[type=text]{font:inherit;font-weight:400;padding:10px 12px;border:1.5px solid var(--line);border-radius:10px;background:var(--paper);color:var(--ink)}
.acm input:focus{outline:none;border-color:var(--accent)}
.acm .row{display:flex;gap:8px;flex-wrap:wrap;align-items:center}
.acm .b{border:1px solid var(--ink);background:var(--ink);color:var(--bg);border-radius:10px;padding:10px 16px;font:inherit;font-weight:600;cursor:pointer}
.acm .b.g{background:transparent;color:var(--ink);border-color:var(--line)}
.acm .seg2{display:inline-flex;gap:4px;background:var(--bg);border-radius:12px;padding:4px}
.acm .seg2 button{border:0;background:none;border-radius:9px;padding:7px 12px;font:inherit;cursor:pointer;color:var(--ink)}
.acm .seg2 button[aria-pressed="true"]{background:var(--paper);font-weight:600;box-shadow:0 1px 2px rgba(0,0,0,.12)}
.acm .msg{font-size:.88rem;border-radius:10px;padding:8px 12px;background:var(--bg)}
.acm .msg.err{color:#C2361F}
.acm .tog{display:flex;gap:8px;align-items:center;font-weight:600;font-size:.9rem}
.acm .x{position:absolute;top:12px;right:14px;border:0;background:none;font-size:1.4rem;color:var(--muted);cursor:pointer}
.acm .acsave{font-size:.85rem;color:var(--muted)}.acm .acsave.ok{color:#1E8A52;font-weight:600}.acm .acsave.err{color:#C2361F;font-weight:600}
.lb-auth #bkpanel,.lb-auth #bkwrap,.lb-auth .bkhead button,.lb-auth .bkhead small{display:none!important}
.lb-auth .bkhead::before{content:"☁️ Wird automatisch in deinem Account gespeichert";font-size:.85rem;color:var(--muted)}
.acsync{font-family:var(--mono);font-size:.7rem;letter-spacing:.05em;text-transform:uppercase;color:var(--muted)}
`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const btn=document.createElement('button');btn.className='acbtn';btn.id='acbtn';btn.innerHTML='<span class="ic" aria-hidden="true">👤</span><span class="dot"></span><span class="t">Anmelden</span>';btn.setAttribute('aria-label','Account');btn.onclick=()=>openModal();
const slot=document.querySelector('.topr')||document.querySelector('header.top');
if(slot){if(slot.classList.contains('topr'))slot.prepend(btn);else slot.appendChild(btn)}
setBtn();
function setBtn(){const user=curU(),profile=curP();if(authDone)profSave();document.documentElement.classList.toggle('lb-auth',!!user);const av=user&&profile&&profile.avatar?avatarHTML(profile.avatar,32):'';btn.classList.toggle('hasav',!!av);const oa=btn.querySelector('.av');if(oa)oa.remove();if(av)btn.insertAdjacentHTML('afterbegin',av);btn.classList.toggle('on',!!user);btn.querySelector('.t').textContent=user?(profile&&profile.nickname?profile.nickname:'Mein Account'):'Anmelden';btn.title=user?'Angemeldet – Fortschritt wird automatisch gespeichert':'Anmelden, damit dein Fortschritt automatisch gespeichert wird'}
let mode='login', msg='';
function close(){document.querySelector('.acbg')?.remove();document.querySelector('.acm')?.remove()}
function openModal(){close();const bg=document.createElement('div');bg.className='acbg';bg.onclick=close;document.body.appendChild(bg);const m=document.createElement('div');m.className='acm';document.body.appendChild(m);render()}
function render(){const m=$('.acm');if(!m)return;
  if(!sb){m.innerHTML=`<button class="x" data-ac="close">×</button><h3>Account</h3><p>Die Anmeldung wird gerade geladen … Wenn das so bleibt, prüf deine Internetverbindung.</p>`;return}
  if(!user){m.innerHTML=`<button class="x" data-ac="close">×</button><h3>${mode==='login'?'Anmelden':'Account anlegen'}</h3>
    <p>Mit Account wird dein Fortschritt automatisch gespeichert – auf jedem Gerät, ohne Code. Dein bisheriger Stand aus diesem Browser wird beim ersten Anmelden übernommen.</p>
    <div class="seg2"><button data-ac="mode" data-v="login" aria-pressed="${mode==='login'}">Anmelden</button><button data-ac="mode" data-v="signup" aria-pressed="${mode==='signup'}">Neu registrieren</button></div>
    <label>E-Mail<input type="email" id="acmail" autocomplete="email"></label>
    <label>Passwort${mode==='signup'?' (mind. 8 Zeichen)':''}<input type="password" id="acpw" autocomplete="${mode==='login'?'current-password':'new-password'}"></label>
    ${mode==='signup'?`<label>Spitzname (für die Ranglisten, optional)<input type="text" id="acnick" maxlength="24"></label>`:''}
    ${msg?`<div class="msg${/Fehler|falsch|nicht/.test(msg)?' err':''}">${escA(msg)}</div>`:''}
    <div class="row"><button class="b" data-ac="${mode}">${mode==='login'?'Anmelden':'Account anlegen'}</button>${mode==='login'?'<button class="b g" data-ac="reset">Passwort vergessen?</button>':''}</div>
    <p style="font-size:.8rem">Mehr dazu in der <a href="${inTool?'../':''}datenschutz.html">Datenschutzerklärung</a>.</p>`;return}
  const setp=(inTool?'../':'')+'einstellungen.html';
  m.innerHTML=`<button class="x" data-ac="close">×</button><h3 style="display:flex;align-items:center;gap:10px">${profile&&profile.avatar?avatarHTML(profile.avatar,44):''}Mein Account</h3><p>Angemeldet als <b>${escA(user.email)}</b>${profile&&profile.nickname?` · Spitzname <b>${escA(profile.nickname)}</b>`:''}. Dein Fortschritt und deine Prüfungstermine werden automatisch gespeichert.</p>
   <p>Spitzname, Ranglisten und mehr stellst du in den Einstellungen ein.</p>
   ${msg?`<div class="msg${/Fehler|nicht/.test(msg)?' err':''}">${escA(msg)}</div>`:''}
   <div class="row"><a class="b" href="${setp}" style="text-decoration:none">⚙︎ Einstellungen</a><button class="b g" data-ac="logout">Abmelden</button><button class="b g" data-ac="close">Fertig</button></div>
   <p class="acsync" id="acsyncinfo">${lastSync?'Zuletzt gespeichert: '+new Date(lastSync).toLocaleTimeString('de-AT',{hour:'2-digit',minute:'2-digit'}):''}</p>`;
}
document.addEventListener('click',async e=>{const b=e.target.closest('[data-ac]');if(!b)return;const a=b.dataset.ac;
  if(a==='close'){close();return}
  if(a==='mode'){mode=b.dataset.v;msg='';render();return}
  if(a==='login'||a==='signup'){const em=$('#acmail').value.trim(),pw=$('#acpw').value;if(!em||!pw){msg='Bitte E-Mail und Passwort eingeben.';render();return}
    b.disabled=true;msg='';
    if(a==='signup'){if(pw.length<8){msg='Fehler: Passwort braucht mind. 8 Zeichen.';render();return}
      if(!nameOk(($('#acnick')?.value||'').trim())){msg=BADMSG;b.disabled=false;render();return}
      const {data,error}=await sb.auth.signUp({email:em,password:pw});if(error){msg='Fehler: '+error.message;render();return}
      if(!data.session){msg='Fast geschafft: Bitte bestätige deine E-Mail über den Link, den wir dir geschickt haben, und melde dich dann an.';mode='login';render();return}
      const nick=($('#acnick')?.value||'').trim();user=data.user;await ensureProfile(nick);await afterLogin();msg='Account angelegt ✓';render();return}
    const {data,error}=await sb.auth.signInWithPassword({email:em,password:pw});if(error){msg=/Invalid login/.test(error.message)?'E-Mail oder Passwort ist falsch.':'Fehler: '+error.message;render();return}
    user=data.user;await ensureProfile('');await afterLogin();msg='Angemeldet ✓';render();return}
  if(a==='reset'){const em=$('#acmail').value.trim();if(!em){msg='Gib zuerst deine E-Mail ein.';render();return}const {error}=await sb.auth.resetPasswordForEmail(em,{redirectTo:location.origin+location.pathname});msg=error?'Fehler: '+error.message:'Wenn es den Account gibt, kommt gleich eine Mail zum Zurücksetzen.';render();return}
  if(a==='syncnow'){await push(true);msg='Gespeichert ✓';render();return}
  if(a==='logout'){await window.acApi.logout();return}
});

/* API für die Einstellungen-Seite */
/* Kraftausdrücke in Spitznamen/Gruppennamen blockieren (gleiche Regel wie in der Datenbank: public.name_ok) */
const BADRX=/fick|fotze|nutte|hure|schlampe|wichs|wix|bitch|fuck|shit|cunt|whore|slut|pussy|penis|vagina|porn|rape|vergewalt|hitler|nsdap|siegheil|nazi|neger|nigg|kanake|schwuchtel|spast|missgeburt|scheis|kacke|retard|faggot|titte|tits|drecksau|asshole|bastard|(^|[^mbh])arsch|mongo([^l]|$)/;
const nameOk=n=>!n||!BADRX.test(n.toLowerCase().replace(/[0134578@$!ßäöü]/g,c=>({'0':'o','1':'i','3':'e','4':'a','5':'s','7':'t','8':'b','@':'a','$':'s','!':'i','ß':'s','ä':'a','ö':'o','ü':'u'}[c])).replace(/[^a-z]/g,''));
window.lbNameOk=nameOk;
const BADMSG='Dieser Name geht leider nicht – bitte such dir einen anderen aus. 🙂';
async function saveProfile(patch){if(!user)return{error:'login'};
  if('nickname' in patch){const n=(patch.nickname||'').trim();if(n&&n.length<2)return{error:'Der Spitzname braucht mindestens 2 Zeichen.'};if(!nameOk(n))return{error:BADMSG};patch.nickname=n||null}
  const next={...profile,...patch};if('avatar' in patch){try{localStorage.setItem('lernbox.avatar',JSON.stringify(patch.avatar))}catch(e){}}
  if((next.show_on_board||next.show_general)&&!next.nickname)return{error:'Für die Ranglisten brauchst du zuerst einen Spitznamen.'};
  const {error}=await sb.from('profiles').upsert({id:user.id,nickname:next.nickname||null,show_on_board:!!next.show_on_board,show_general:!!next.show_general,avatar:next.avatar||null,updated_at:new Date().toISOString()});
  if(error)return{error:/duplicate|unique/i.test(error.message)?'Diesen Spitznamen gibt es schon – nimm einen anderen.':/blocked/.test(error.message)?BADMSG:'Fehler: '+error.message};
  profile=next;setBtn();if(window.lbRender)window.lbRender();return{ok:true}}
window.acApi={saveProfile,
  async sendFeedback(row){if(!sb)return{error:'offline'};const {error}=await sb.from('feedback').insert(row);return error?{error:error.message}:{ok:true}},
  async updatePassword(pw){if(!user)return{error:'login'};if(!pw||pw.length<8)return{error:'Mindestens 8 Zeichen.'};const {error}=await sb.auth.updateUser({password:pw});return error?{error:'Fehler: '+error.message}:{ok:true}},
  async logout(){await sb.auth.signOut();user=null;profile=null;msg='';setBtn();if($('.acm'))render();if(window.lbRender)window.lbRender()},
  async syncNow(){await push(true);return lastSync},
  async saveWrapStats(sem,stats){if(!sb||!user)return{error:'login'};const {error}=await sb.from('wrap_stats').upsert({user_id:user.id,sem,stats,updated_at:new Date().toISOString()});return error?{error:error.message}:{ok:true}},
  async allProgress(){if(!sb||!user)return null;const {data,error}=await sb.from('progress').select('tool,data,answered,score').eq('user_id',user.id);return error?null:data},
  async rpc(fn,args){if(!sb||!user)return{error:'login'};const {data,error}=await sb.rpc(fn,args||{});if(error){const m=error.message||'';return{error:/blocked/.test(m)?BADMSG:/code/.test(m)?'Diesen Code gibt es nicht.':/voll/.test(m)?'Die Gruppe ist schon voll (max. 50).':/zu viele/.test(m)?'Du bist schon in 10 Gruppen.':/check|name/.test(m)?'Der Name braucht 2 bis 40 Zeichen.':'Fehler: '+m}}return{data}}};
async function ensureProfile(nick){const {data}=await sb.from('profiles').select('*').eq('id',user.id).maybeSingle();if(data){profile=data;if(nick&&!data.nickname){const r=await sb.from('profiles').update({nickname:nick}).eq('id',user.id);if(!r.error)profile.nickname=nick}}else{let row={id:user.id,nickname:nick||null,show_on_board:false,show_general:false};let r=await sb.from('profiles').insert(row);if(r.error&&nick){row={...row,nickname:null};await sb.from('profiles').insert(row)}profile=row}setBtn()}

/* ---------- Speichern: Lerntools (CFG.key) und Startseite (lernbox.*) ---------- */
let lastSync=0;
const SK=inTool?CFG.key:'lernbox', PRE=SK+'.';
function dumpAll(){if(inTool)return bkDump();const o={};try{for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(k&&k.startsWith(PRE))o[k.slice(PRE.length)]=localStorage.getItem(k)}}catch(e){}return o}
function mergeAll(d){if(inTool){bkMerge(d);return}if(window.hubMerge)window.hubMerge(d)}
function calcScore(){try{const main=Q.filter(q=>MAIN.has(q.c));const seen=main.filter(q=>stats[q.id]);const ok=seen.filter(q=>stats[q.id].last==='r').length;return{score:main.length?Math.round(100*ok/main.length):0,answered:seen.length}}catch(e){return{score:0,answered:0}}}
async function pull(){if(!user)return;pulling=true;
  try{const {data,error}=await sb.from('progress').select('data,updated_at').eq('user_id',user.id).eq('tool',SK).maybeSingle();
    if(!error&&data&&data.data){mergeAll(data.data);if(inTool){try{if(typeof renderCount==='function')renderCount();if(typeof petHeader==='function')petHeader();if(typeof planTabSync==='function')planTabSync();show(LS.get('tab','learn'))}catch(e){}}}
  }finally{pulling=false}
  await push(true);
}
async function push(now){if(!user||pulling)return;clearTimeout(pushT);const go=async()=>{if(inTool){try{const r=await sb.from('progress').select('data').eq('user_id',user.id).eq('tool',SK).maybeSingle();if(!r.error&&r.data&&r.data.data){pulling=true;try{mergeAll(r.data.data)}finally{pulling=false}}}catch(e){}}const sc=inTool?calcScore():{score:0,answered:0};const {error}=await sb.from('progress').upsert({user_id:user.id,tool:SK,data:dumpAll(),score:sc.score,answered:sc.answered,updated_at:new Date().toISOString()});if(!error){lastSync=Date.now();const i=$('#acsyncinfo');if(i)i.textContent='Zuletzt gespeichert: '+new Date(lastSync).toLocaleTimeString('de-AT',{hour:'2-digit',minute:'2-digit'})}};if(now)return go();pushT=setTimeout(go,2500)}
if(inTool&&typeof bkNudge==='function'){const _bn=bkNudge;window.bkNudge=function(){return user?'':_bn.apply(this,arguments)}}
{const orig=Storage.prototype.setItem;Storage.prototype.setItem=function(k,v){orig.apply(this,arguments);if(this===window.localStorage&&String(k).startsWith(PRE)&&user&&!pulling)push(false)};
  addEventListener('visibilitychange',()=>{if(document.visibilityState==='hidden'&&user)push(true)});
  addEventListener('online',()=>{if(user&&sb)pull()})}
async function afterLogin(){const la=avLocal();if(profile&&!profile.avatar&&la&&la.sp){await saveProfile({avatar:la})}else if(profile&&profile.avatar){try{localStorage.setItem('lernbox.avatar',JSON.stringify(profile.avatar))}catch(e){}}setBtn();await pull();if(window.lbRender)window.lbRender();if(window.hubRender)window.hubRender()}

/* ---------- Leaderboard (Startseite) ---------- */
window.lbFetchGeneral=async()=>{if(!sb)return null;const {data,error}=await sb.rpc('leaderboard_general');return error?null:data};
window.lbFetch=async tool=>{if(!sb)return null;const {data,error}=await sb.rpc('leaderboard',{p_tool:tool});return error?null:data};
window.acState=()=>({user:curU(),profile:curP(),ready:!!sb&&authDone,pending:!authDone&&!user&&!!pend});
/* Seiten gleich im angemeldeten Zustand zeichnen (nicht erst nach der Server-Prüfung) */
if(pend){try{if(window.lbRender)window.lbRender();if(window.socTick)window.socTick()}catch(e){}}
window.acOpen=openModal;

/* ---------- Start ---------- */
const s=document.createElement('script');s.src='https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2.45.4/dist/umd/supabase.min.js';
s.onload=async()=>{sb=window.supabase.createClient(SB_URL,SB_KEY,{auth:{persistSession:true,autoRefreshToken:true,storageKey:'lernbox-auth'}});
  try{const {data}=await sb.auth.getSession();if(data.session){user=data.session.user;await ensureProfile('');await afterLogin()}}catch(e){}
  authDone=true;setBtn();
  sb.auth.onAuthStateChange((ev,ses)=>{if(ev==='PASSWORD_RECOVERY'){const pw=prompt('Neues Passwort (mind. 8 Zeichen):');if(pw&&pw.length>=8)sb.auth.updateUser({password:pw})}});
  if($('.acm'))render();if(window.lbRender)window.lbRender()};
document.head.appendChild(s);
})();
