/* Psychologie Lernbox · „💬 Fragen“ im Lerntool: Stelle an Freund:in oder Gruppe schicken */
(function(){
if(typeof Q==='undefined'||typeof CFG==='undefined')return;
const st=document.createElement('style');st.textContent=`
.qask{display:inline-block;border:0;background:none;padding:2px 0;margin:8px 14px 0 0;font:inherit;font-size:.78rem;color:var(--muted);opacity:.8;cursor:pointer}
.qask:hover{opacity:1;color:var(--ink);text-decoration:underline}
.sec h3 .qask{margin:0 0 0 10px;font-family:var(--body);font-weight:400;letter-spacing:0;text-transform:none;vertical-align:middle}
.askto{display:flex;flex-wrap:wrap;gap:6px}.askto button{border:1.5px solid var(--line);background:var(--paper);color:var(--ink);border-radius:999px;padding:6px 12px;font:inherit;font-size:.88rem;cursor:pointer}
.askto button[aria-pressed="true"]{border-color:var(--ink);background:var(--ink);color:var(--paper)}
.askref{background:var(--bg);border-left:4px solid #72CEF2;border-radius:10px;padding:8px 12px;font-size:.88rem}
.askref small{display:block;font-family:var(--mono);font-size:.68rem;text-transform:uppercase;letter-spacing:.05em;color:var(--muted)}
.chatb{display:inline-block;margin:0 0 10px 6px;font-family:var(--mono);font-size:.74rem;letter-spacing:.06em;text-transform:uppercase;color:#fff;background:#FF8A73;border-radius:999px;padding:4px 12px;text-decoration:none}
.fragedlg .ok{color:#1E7F4F;font-weight:700}`;document.head.appendChild(st);
const plain=s=>String(s==null?'':s).replace(/\*\*/g,'');
const e3=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const name=(document.title||'').replace(/ ?Lernbox$/,'').trim();
function close(){document.querySelector('.sumbg.ask')?.remove();document.querySelector('.sumdlg.ask')?.remove()}
async function ask(ref){close();const bg=document.createElement('div');bg.className='sumbg ask';bg.onclick=close;document.body.appendChild(bg);
  const d=document.createElement('div');d.className='sumdlg ask';d.setAttribute('role','dialog');document.body.appendChild(d);
  const s=window.acState&&window.acState();
  if(!s||!s.user){d.innerHTML=`<button class="sx">×</button><h3>Fragen</h3><p>Melde dich an, um Freund:innen oder deiner Lerngruppe Fragen zu schicken.</p><div style="display:flex;justify-content:flex-end"><button class="btn accent" type="button" id="askl">Anmelden</button></div>`;
    d.querySelector('.sx').onclick=close;d.querySelector('#askl').onclick=()=>{close();window.acOpen&&window.acOpen()};return}
  d.innerHTML=`<button class="sx" aria-label="Schließen">×</button><h3>💬 Fragen</h3><div class="askref"><small>${ref.type==='q'?'Quizfrage':'Lernzettel'} · ${e3(name)}</small>${e3(ref.text)}</div><p>Wird geladen …</p>`;d.querySelector('.sx').onclick=close;
  const [f,g]=await Promise.all([window.acApi.rpc('my_friends'),window.acApi.rpc('my_groups')]);
  const T=[...(g.data||[]).map(x=>({chat:'g:'+x.id,n:(x.icon||'👥')+' '+x.name})),...(f.data||[]).filter(x=>x.status==='accepted').map(x=>({chat:x.chat,n:x.nickname}))];
  if(!T.length){d.querySelector('p').innerHTML='Du hast noch keine Freund:innen oder Gruppen. <a href="../gruppen.html">Jetzt vernetzen →</a>';return}
  let sel=T[0].chat;
  d.innerHTML=`<button class="sx" aria-label="Schließen">×</button><h3>💬 Fragen</h3><div class="askref"><small>${ref.type==='q'?'Quizfrage':'Lernzettel'} · ${e3(name)}</small>${e3(ref.text)}</div>
    <label style="display:grid;gap:6px;font-weight:600;font-size:.85rem">An wen?<div class="askto">${T.map((t,i)=>`<button type="button" data-c="${e3(t.chat)}" aria-pressed="${i===0}">${e3(t.n)}</button>`).join('')}</div></label>
    <label style="display:grid;gap:6px;font-weight:600;font-size:.85rem">Deine Frage<textarea id="askT" rows="3" maxlength="2000" placeholder="z. B. Warum ist hier B richtig?" style="font:inherit;font-weight:400;padding:9px 11px;border:1.5px solid var(--line);border-radius:10px;background:var(--paper);color:var(--ink)"></textarea></label>
    <p id="askS" aria-live="polite" style="margin:0"></p><div style="display:flex;justify-content:flex-end;gap:8px"><button class="btn ghost" type="button" data-a="x">Abbrechen</button><button class="btn accent" type="button" data-a="s">Senden</button></div>`;
  ['keydown','keyup','keypress'].forEach(t=>d.addEventListener(t,e=>{if(e.key!=='Escape')e.stopPropagation()}));
  d.querySelector('.sx').onclick=close;d.querySelector('[data-a="x"]').onclick=close;
  d.querySelectorAll('[data-c]').forEach(b=>b.onclick=()=>{sel=b.dataset.c;d.querySelectorAll('[data-c]').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'))});
  d.querySelector('#askT').focus();
  d.querySelector('[data-a="s"]').onclick=async e=>{const t=d.querySelector('#askT').value.trim(),s2=d.querySelector('#askS');if(!t){s2.textContent='Schreib kurz deine Frage dazu 🙂';return}
    if(window.lbNameOk&&!window.lbNameOk(t)){s2.textContent='Bitte ohne Kraftausdrücke 🙂';return}
    e.currentTarget.disabled=true;const r=await window.acApi.rpc('send_msg',{p_chat:sel,p_body:t,p_ref:{...ref,tool:CFG.key,text:String(ref.text).slice(0,300)},p_reply:null});
    if(r.error){e.currentTarget.disabled=false;s2.textContent='Hat nicht geklappt: '+r.error;return}
    s2.innerHTML='<b style="color:#1E7F4F">✓ Geschickt!</b> Antworten siehst du unter <a href="../gruppen.html">Freunde</a>.';setTimeout(close,1600)}}
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
/* Knöpfe einsetzen */
function place(){
  const stg=document.querySelector('#v-quiz .stage .qrepwrap');if(stg&&!stg.querySelector('.qask'))stg.insertAdjacentHTML('afterbegin','<button class="qask" type="button" data-ask="cur">💬 Fragen</button>');
  document.querySelectorAll('.bq .bfoot').forEach(f=>{if(!f.querySelector('.qask'))f.insertAdjacentHTML('afterbegin','<button class="qask" type="button" data-ask="bq">💬 Fragen</button>')});
  document.querySelectorAll('#chapter .sec h3').forEach((h,i)=>{if(!h.querySelector('.qask'))h.insertAdjacentHTML('beforeend',`<button class="qask" type="button" data-ask="sec" data-si="${i}">💬 Fragen</button>`)});
}
let pend=false;new MutationObserver(()=>{if(pend)return;pend=true;requestAnimationFrame(()=>{pend=false;place()})}).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',e=>{const b=e.target.closest('[data-ask]');if(!b)return;e.preventDefault();e.stopPropagation();const k=b.dataset.ask;
  if(k==='sec'){const c=CH.find(x=>x.id===curCh),si=+b.dataset.si,s=c&&c.sec[si];if(s)ask({type:'s',ch:curCh,si,text:'K'+curCh+' · '+s.h,b:s.b.map(x=>typeof x==='string'?(x.startsWith('§')?x.slice(1):'• '+x):x&&(x.warn||x.vid||x.neu)?'• '+(x.warn||x.vid||x.neu):'').filter(Boolean).map(plain).join('\n').slice(0,1800)});return}
  let q=null;if(k==='cur'&&typeof quiz!=='undefined')q=quiz.list[quiz.i];else{const a=b.closest('.bq');if(a)q=Q.find(x=>x.id===a.dataset.id)}
  if(q)ask({type:'q',id:q.id,text:plain(q.q),t:q.t,o:(q.o||[]).map(plain),a:q.a,e:plain(q.e||'').slice(0,700)})},true);
place();
/* Sprung aus dem Chat: #frage=ID oder #abschnitt=Kapitel,Abschnitt */
function deep(){const h=decodeURIComponent(location.hash||'');let m;
  if((m=h.match(/^#abschnitt=(\d+),(\d+)/))&&typeof jumpTo==='function'){history.replaceState(null,'',location.pathname);setTimeout(()=>jumpTo(+m[1],+m[2],''),300)}
  else if((m=h.match(/^#frage=(.+)$/))){history.replaceState(null,'',location.pathname);const q=Q.find(x=>x.id===m[1]);if(!q)return;
    setTimeout(()=>{close();const bg=document.createElement('div');bg.className='sumbg ask';bg.onclick=close;document.body.appendChild(bg);const d=document.createElement('div');d.className='sumdlg ask fragedlg';document.body.appendChild(d);
      const ok=new Set([].concat(q.a));const ans=q.t==='tf'?`<p class="ok">${q.a?'Stimmt':'Stimmt nicht'}</p>`:q.t==='gap'?`<p class="ok">${e3([].concat(q.a).join(' / '))}</p>`:`<ul style="margin:0;padding-left:18px">${(q.o||[]).map((o,i)=>`<li class="${ok.has(i)?'ok':''}">${ok.has(i)?'✓ ':''}${e3(plain(o))}</li>`).join('')}</ul>`;
      d.innerHTML=`<button class="sx">×</button><p class="label" style="margin:0">Frage aus dem Chat</p><h3 style="font-size:1.15rem">${e3(plain(q.q))}</h3>${ans}${q.e?`<p>${e3(plain(q.e))}</p>`:''}<div style="display:flex;justify-content:flex-end"><button class="btn accent" type="button" id="fok">Alles klar</button></div>`;
      d.querySelector('.sx').onclick=close;d.querySelector('#fok').onclick=close},400)}}
deep();addEventListener('hashchange',deep);
/* Ungelesen-Hinweis im Kopf */
async function badge(){const s=window.acState&&window.acState();if(!s||!s.user)return;
  const [f,g]=await Promise.all([window.acApi.rpc('my_friends'),window.acApi.rpc('group_unread')]);
  const n=(f.data||[]).filter(x=>x.status==='accepted').reduce((a,x)=>a+(x.unread||0),0)+(g.data||[]).reduce((a,x)=>a+x.unread,0)+(f.data||[]).filter(x=>x.incoming).length;
  let a=document.querySelector('.chatb');const brand=document.querySelector('.brand');
  if(!n){a&&a.remove();return}if(!a&&brand){a=document.createElement('a');a.className='chatb';a.href='../gruppen.html';const pdf=brand.querySelector('.sumbtn');(pdf||brand.querySelector('.hubback')||brand.firstChild).after(a)}
  if(a)a.textContent='💬 '+n+' neu'}
setTimeout(badge,2500);setInterval(()=>{if(!document.hidden)badge()},60000);
})();
