/* Psychologie Lernbox · Fehler in einer Quizfrage melden (dezent) */
(function(){
if(typeof Q==='undefined')return;
const FB_MAIL='contact@maxedout.at';
const st=document.createElement('style');st.textContent=`
.qrep{display:inline-block;border:0;background:none;padding:2px 0;margin-top:8px;font:inherit;font-size:.78rem;color:var(--muted);opacity:.75;cursor:pointer;text-decoration:underline;text-decoration-color:transparent;text-underline-offset:3px}
.qrep:hover,.qrep:focus-visible{opacity:1;color:var(--ink);text-decoration-color:currentColor}
.stage .qrepwrap{display:flex;justify-content:flex-end}
.bfoot .qrep{margin:0 0 0 auto}
.repq{background:var(--bg);border-radius:12px;padding:10px 12px;font-size:.9rem;color:var(--ink)}
.repq small{display:block;color:var(--muted);font-size:.78rem;margin-top:4px}
.sumdlg label{display:grid;gap:4px;font-size:.85rem;font-weight:600}
.sumdlg select,.sumdlg textarea,.sumdlg input{font:inherit;font-weight:400;padding:9px 11px;border:1.5px solid var(--line);border-radius:10px;background:var(--paper);color:var(--ink);width:100%}
.repok{color:var(--good);font-weight:600}.reperr{color:var(--bad);font-weight:600}
`;document.head.appendChild(st);
const esc3=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const plain=s=>String(s==null?'':s).replace(/\*\*/g,'');
function ansText(q){if(q.t==='tf')return q.a?'Stimmt':'Stimmt nicht';if(q.t==='gap')return [].concat(q.a).join(' / ');const ok=new Set([].concat(q.a));return (q.o||[]).map((o,i)=>(ok.has(i)?'✓ ':'✗ ')+plain(o)).join('\n')}
function close(){document.querySelector('.sumbg.rep')?.remove();document.querySelector('.sumdlg.rep')?.remove()}
function open(q){close();if(!q)return;
  const bg=document.createElement('div');bg.className='sumbg rep';bg.onclick=close;document.body.appendChild(bg);
  const d=document.createElement('div');d.className='sumdlg rep';d.setAttribute('role','dialog');d.setAttribute('aria-label','Fehler melden');
  const u=window.acState&&window.acState().user;
  d.innerHTML=`<button class="sx" aria-label="Schließen">×</button><h3>Fehler melden</h3>
   <div class="repq">${esc3(plain(q.q))}<small>${esc3(document.title.replace(/ ?Lernbox$/,''))}${typeof CHNAME!=='undefined'&&CHNAME[q.c]?' · '+esc3(CHNAME[q.c]):''}</small></div>
   <label>Was stimmt nicht?<select id="repK"><option>Die Lösung ist falsch</option><option>Die Frage ist unklar</option><option>Tipp- oder Rechtschreibfehler</option><option>Etwas anderes</option></select></label>
   <label>Erklärung (optional)<textarea id="repM" rows="3" maxlength="2000" placeholder="z. B. Laut Folie 12 ist B richtig, weil …"></textarea></label>
   <label>E-Mail für eine Antwort (optional)<input type="email" id="repC" value="${u?esc3(u.email):''}"></label>
   <p id="repS" aria-live="polite"></p>
   <div style="display:flex;justify-content:flex-end;gap:8px"><button class="btn ghost" type="button" data-rep="x">Abbrechen</button><button class="btn accent" type="button" data-rep="send">Melden</button></div>`;
  document.body.appendChild(d);
  ['keydown','keyup','keypress'].forEach(t=>d.addEventListener(t,e=>{if(e.key!=='Escape')e.stopPropagation()}));
  d.querySelector('.sx').onclick=close;d.querySelector('[data-rep="x"]').onclick=close;
  d.querySelector('[data-rep="send"]').onclick=async e=>{const b=e.currentTarget,s=d.querySelector('#repS');b.disabled=true;s.className='';s.textContent='Wird gesendet …';
    const kind=d.querySelector('#repK').value,note=d.querySelector('#repM').value.trim(),contact=d.querySelector('#repC').value.trim()||null;
    const fach=document.title.replace(/ ?Lernbox$/,'');
    const msg=`[Quizfrage] ${plain(q.q)}\n\n[Hinterlegte Lösung]\n${ansText(q)}\n\n[Problem] ${kind}${note?'\n\n'+note:''}\n\n(ID ${q.id})`;
    const row={kind:'Quizfrage: '+kind,fach,page:location.pathname.split('/').pop(),message:msg.slice(0,3990),contact};
    let ok=false;
    try{if(window.acApi){const r=await window.acApi.sendFeedback(row);ok=!!r.ok}}catch(err){}
    try{const r=await fetch('https://formsubmit.co/ajax/'+FB_MAIL,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({_subject:'Lernbox: Fehler in Quizfrage ('+fach+')',_template:'table',_captcha:'false',Fach:fach,Problem:kind,Frage:plain(q.q),Lösung:ansText(q),Erklärung:note||'–',Kontakt:contact||'–',ID:q.id,_replyto:contact||undefined})});if(r.ok)ok=true}catch(err){}
    if(ok){s.className='repok';s.textContent='Danke! Die Meldung ist angekommen.';setTimeout(close,1400)}else{b.disabled=false;s.className='reperr';s.textContent='Hat nicht geklappt – prüf deine Internetverbindung.'}};
  d.querySelector('#repK').focus();
}
addEventListener('keydown',e=>{if(e.key==='Escape')close()});
/* Link unter Fragen einsetzen */
function place(){
  const stg=document.querySelector('#v-quiz .stage');
  if(stg&&!stg.querySelector('.qrep')&&typeof quiz!=='undefined'&&quiz.list&&quiz.list[quiz.i]){const w=document.createElement('div');w.className='qrepwrap';w.innerHTML='<button class="qrep" type="button" data-qrep="cur">⚑ Fehler melden</button>';stg.appendChild(w)}
  document.querySelectorAll('.bq .bfoot').forEach(f=>{if(!f.querySelector('.qrep'))f.insertAdjacentHTML('beforeend','<button class="qrep" type="button" data-qrep="bq">⚑ Fehler melden</button>')});
}
let pend=false;new MutationObserver(()=>{if(pend)return;pend=true;requestAnimationFrame(()=>{pend=false;place()})}).observe(document.body,{childList:true,subtree:true});
document.addEventListener('click',e=>{const b=e.target.closest('[data-qrep]');if(!b)return;e.preventDefault();e.stopPropagation();
  let q=null;if(b.dataset.qrep==='cur'&&typeof quiz!=='undefined')q=quiz.list[quiz.i];else{const a=b.closest('.bq');if(a)q=Q.find(x=>x.id===a.dataset.id)}
  open(q)},true);
place();
})();
