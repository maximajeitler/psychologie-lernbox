/* Psychologie Lernbox · Zusammenfassung als PDF (alle Lernzettel eines Tools) */
(function(){
if(typeof CH==='undefined'||typeof renderItem!=='function')return;
const css=`
.sumbtn{display:inline-block;margin:0 0 10px 6px;font-family:var(--mono);font-size:.74rem;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);border:1px solid var(--line);border-radius:999px;padding:4px 12px;background:var(--paper);cursor:pointer}
.sumbtn:hover{color:var(--ink);border-color:var(--ink)}
#printsum{display:none}
.sumbg{position:fixed;inset:0;background:rgba(0,0,0,.45);z-index:80}
.sumdlg{position:fixed;z-index:81;left:50%;top:50%;transform:translate(-50%,-50%);width:min(520px,calc(100vw - 24px));max-height:calc(100vh - 40px);overflow:auto;background:var(--paper);color:var(--ink);border-radius:18px;box-shadow:0 24px 70px rgba(0,0,0,.3);padding:22px;display:grid;gap:12px;font-family:var(--body)}
.sumdlg h3{margin:0;font-family:var(--display);font-weight:800;font-size:1.45rem;letter-spacing:-.02em}
.sumdlg p{margin:0;color:var(--muted);font-size:.93rem}
.sumdlg .sx{position:absolute;top:10px;right:14px;border:0;background:none;font-size:1.5rem;color:var(--muted);cursor:pointer}
.sopts{display:grid;grid-template-columns:1fr 1fr;gap:10px}
.sopts button{display:grid;gap:4px;text-align:left;border:1.5px solid var(--line);background:var(--paper);color:var(--ink);border-radius:14px;padding:14px;cursor:pointer;font:inherit}
.sopts button:hover,.sopts button:focus-visible{border-color:var(--accent);outline:none}
.sopts .sv{font-size:.85rem;background:var(--bg);border-radius:8px;padding:8px 10px;margin-bottom:4px}
.sopts b{font-family:var(--display);font-size:1.05rem}
.sopts small{color:var(--muted);font-size:.84rem;line-height:1.35}
.sumdlg .shint{font-size:.82rem}
@media (max-width:520px){.sopts{grid-template-columns:1fr}}
@media print{
  @page{size:A4;margin:16mm 15mm 18mm}
  html.printing,html.printing body{background:#fff!important;color:#111!important}
  html.printing body>*:not(#printsum){display:none!important}
  html.printing #printsum{display:block!important}
  #printsum{font-family:"Instrument Sans",Arial,sans-serif;font-size:10.5pt;line-height:1.45;color:#111;-webkit-print-color-adjust:exact;print-color-adjust:exact}
  #printsum .cover{border-bottom:2px solid #111;padding-bottom:10px;margin-bottom:14px}
  #printsum .cover h1{font-family:"Bricolage Grotesque",Arial,sans-serif;font-weight:800;font-size:26pt;margin:0;letter-spacing:-.02em}
  #printsum .cover p{margin:4px 0 0;color:#555;font-size:9.5pt}
  #printsum .toc{columns:2;column-gap:24px;font-size:9.5pt;margin:0 0 6px;padding-left:18px}
  #printsum .ch{break-before:page}
  #printsum .ch:first-of-type{break-before:auto}
  #printsum .ch>h2{font-family:"Bricolage Grotesque",Arial,sans-serif;font-weight:800;font-size:17pt;margin:0 0 2px;letter-spacing:-.01em}
  #printsum .ch>.k{font-family:"JetBrains Mono",monospace;font-size:8pt;letter-spacing:.06em;text-transform:uppercase;color:#666}
  #printsum h3{font-family:"Bricolage Grotesque",Arial,sans-serif;font-size:12pt;margin:12px 0 4px;break-after:avoid}
  #printsum ul{margin:0;padding-left:16px}
  #printsum li{margin:2px 0;break-inside:avoid}
  #printsum li.sub{list-style:none;margin-left:-16px;font-weight:700;margin-top:8px}
  #printsum li.warn,#printsum li.neu,#printsum li.vid{list-style:none;margin-left:-16px;border-left:3px solid #999;background:#f3f3f3;padding:5px 9px;border-radius:4px}
  #printsum li.warn b,#printsum li.neu b{display:block;font-size:8pt;text-transform:uppercase;letter-spacing:.05em}
  #printsum li.tbl{list-style:none;margin-left:-16px}
  #printsum table{border-collapse:collapse;width:100%;font-size:9.5pt;margin:4px 0}
  #printsum th,#printsum td{border:1px solid #bbb;padding:3px 6px;text-align:left;vertical-align:top}
  #printsum th{background:#eee}
  #printsum mark{background:#fff27a;color:#111;padding:0 .1em;border-radius:2px;font-weight:600}
  html.nomark #printsum mark{background:none;font-weight:inherit;padding:0}
  #printsum .x{color:#666;font-size:9pt}
}`;
const st=document.createElement('style');st.textContent=css;document.head.appendChild(st);
const esc2=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
function build(marked){
  const title=(document.title||'Lerntool').replace(/ ?Lernbox$/,'').trim();
  const main=CH.filter(c=>!c.x),extra=CH.filter(c=>c.x);
  const chap=(c,zus)=>`<section class="ch"><div class="k">Kapitel ${esc2(c.id)}${zus?' · Zusatz (vermutlich nicht prüfungsrelevant)':''}</div><h2>${esc2(c.t||c.s)}</h2>${c.sec.map(s=>`<h3>${esc2(s.h)}</h3><ul>${s.b.map(renderItem).join('')}</ul>`).join('')}</section>`;
  return `<div class="cover"><h1>${esc2(title)} · Zusammenfassung</h1><p>Psychologie Lernbox · Stand ${new Date().toLocaleDateString('de-AT',{day:'numeric',month:'long',year:'numeric'})}${marked?' · Markierte Begriffe = wichtig':' · Ohne Markierungen – zum selbst Markieren'}</p></div>
    <ol class="toc">${main.map(c=>`<li>${esc2(c.t||c.s)}</li>`).join('')}${extra.map(c=>`<li class="x">${esc2(c.t||c.s)} (Zusatz)</li>`).join('')}</ol>
    ${main.map(c=>chap(c,false)).join('')}${extra.map(c=>chap(c,true)).join('')}`;
}
function printSum(marked){marked=marked!==false;let d=document.getElementById('printsum');if(!d){d=document.createElement('div');d.id='printsum';document.body.appendChild(d)}
  d.innerHTML=build(marked);document.documentElement.classList.add('printing');document.documentElement.classList.toggle('nomark',!marked);
  const done=()=>{document.documentElement.classList.remove('printing','nomark');removeEventListener('afterprint',done)};
  addEventListener('afterprint',done);setTimeout(()=>window.print(),60)}
window.printSum=printSum;window.buildSum=build;
function closeAsk(){document.querySelector('.sumbg')?.remove();document.querySelector('.sumdlg')?.remove()}
function askSum(){closeAsk();const bg=document.createElement('div');bg.className='sumbg';bg.onclick=closeAsk;document.body.appendChild(bg);
  const d=document.createElement('div');d.className='sumdlg';d.setAttribute('role','dialog');d.setAttribute('aria-label','Zusammenfassung als PDF');
  d.innerHTML=`<button class="sx" aria-label="Schließen">×</button><h3>Zusammenfassung als PDF</h3><p>Alle Lernzettel zum Speichern oder Ausdrucken. Wie hättest du's gern?</p>
   <div class="sopts"><button data-m="1"><span class="sv"><mark>Begriff</mark> schon markiert</span><b>Mit Markierungen</b><small>Die wichtigen Begriffe sind schon gelb markiert.</small></button>
   <button data-m="0"><span class="sv">Begriff ohne Markierung</span><b>Ohne Markierungen</b><small>Zum selbst Markieren mit deinem eigenen Textmarker.</small></button></div>
   <p class="shint">Im nächsten Fenster bei „Ziel“ <b>Als PDF speichern</b> wählen – oder direkt drucken.</p>`;
  document.body.appendChild(d);d.querySelector('.sx').onclick=closeAsk;
  d.querySelectorAll('[data-m]').forEach(b=>b.onclick=()=>{closeAsk();printSum(b.dataset.m==='1')});
  d.querySelector('[data-m]').focus()}
addEventListener('keydown',e=>{if(e.key==='Escape')closeAsk()});
const brand=document.querySelector('.brand');
if(brand){const b=document.createElement('button');b.className='sumbtn';b.type='button';b.textContent='📄 Zusammenfassung als PDF';b.title='Alle Lernzettel als PDF speichern oder ausdrucken';b.onclick=askSum;
  const back=brand.querySelector('.hubback');if(back)back.after(b);else brand.prepend(b)}
if(location.hash==='#pdf'){history.replaceState(null,'',location.pathname+location.search);setTimeout(askSum,600)}
})();
