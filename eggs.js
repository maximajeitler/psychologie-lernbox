/* Psychologie Lernbox · Ostereier: bestimmte Wörter in einer Suche tippen → kleine Überraschung */
(function(){
const strip=s=>s.replace(/pq\d+/g,'').replace(/class="pet m-[a-z]+/,'').replace(/aria-label="[^"]*"/,'');
const MOOD_OK=m=>{try{return !!window.petSVG&&strip(window.petSVG({sp:'fox',mood:m}))!==strip(window.petSVG({sp:'fox',mood:'zzzunbekannt'}))}catch(e){return false}};
const fini=(m,fb,cls)=>{if(!window.petSVG)return '<span style="font-size:64px">🦊</span>';const mm=MOOD_OK(m)?m:(fb||'happy');return window.petSVG({sp:'fox',mood:mm,cls:cls||''})};
const INK='#1A1C24';
const COUCH=`<svg viewBox="0 0 220 120" class="egg-couch"><path d="M18 58 Q18 34 42 34 H178 Q202 34 202 58 V74 H18 Z" fill="#8E2C48" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M8 66 Q8 54 22 54 Q34 54 34 66 V96 H8 Z" fill="#A63A5C" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><path d="M186 66 Q186 54 198 54 Q212 54 212 66 V96 H186 Z" fill="#A63A5C" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><rect x="30" y="70" width="160" height="26" rx="8" fill="#B4466A" stroke="${INK}" stroke-width="4"/><path d="M40 96 v14 M180 96 v14" stroke="${INK}" stroke-width="6" stroke-linecap="round"/><path d="M40 52 q12 -10 30 -4" stroke="#F4EAD3" stroke-width="4" fill="none" stroke-linecap="round" opacity=".6"/></svg>`;
const BELL=`<svg viewBox="0 0 80 90" class="egg-bell"><path d="M40 6 v8" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><path d="M14 66 Q16 22 40 18 Q64 22 66 66 Z" fill="#F2B33D" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><rect x="8" y="62" width="64" height="10" rx="5" fill="#E8B93B" stroke="${INK}" stroke-width="4"/><circle cx="40" cy="80" r="7" fill="#F2B33D" stroke="${INK}" stroke-width="4"/><path d="M26 34 q4 -8 12 -10" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/></svg>`;
const TREAT=`<svg viewBox="0 0 60 40" class="egg-treat"><path d="M10 20 a10 10 0 1 1 10 -12 h20 a10 10 0 1 1 10 12 a10 10 0 1 1 -10 12 h-20 a10 10 0 1 1 -10 -12z" fill="#F4D9A8" stroke="${INK}" stroke-width="3.5"/></svg>`;
function blot(){let s=Math.random()*1000;const r=()=>{s=(s*9301+49297)%233280;return s/233280};let d='';for(let i=0;i<9;i++){const x=10+r()*44,y=12+r()*76,rx=6+r()*14,ry=6+r()*16;d+=`<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}"/><ellipse cx="${120-x}" cy="${y}" rx="${rx}" ry="${ry}"/>`}
  return `<svg viewBox="0 0 120 100" class="egg-blot"><g fill="${INK}">${d}<ellipse cx="60" cy="50" rx="10" ry="34"/></g></svg>`}
const MARSH=`<svg viewBox="0 0 60 60" class="egg-marsh"><ellipse cx="30" cy="48" rx="24" ry="6" fill="#000" opacity=".12"/><path d="M8 22 Q8 12 30 12 Q52 12 52 22 V40 Q52 50 30 50 Q8 50 8 40 Z" fill="#FFF6F0" stroke="${INK}" stroke-width="3.5"/><ellipse cx="30" cy="22" rx="22" ry="9" fill="#FFE3EC" stroke="${INK}" stroke-width="3.5"/></svg>`;
const PYR=['#F2557A','#F2B33D','#7BD389','#72CEF2','#B49CDD'];
const MASLOW=`<div class="egg-pyr">${['Bestanden ✨','Rangliste','Lerngruppe','Altfragen','Kaffee & Snacks'].map((t,i)=>`<div style="--w:${40+i*15}%;--c:${PYR[i]};animation-delay:${.15*(4-i)}s">${t}</div>`).join('')}</div>`;
const BOBO=`<svg viewBox="0 0 80 120" class="egg-bobo"><ellipse cx="40" cy="112" rx="26" ry="5" fill="#000" opacity=".15"/><path d="M14 80 Q14 48 40 48 Q66 48 66 80 Q66 110 40 110 Q14 110 14 80 Z" fill="#F2557A" stroke="${INK}" stroke-width="4"/><circle cx="40" cy="30" r="20" fill="#FFF6F0" stroke="${INK}" stroke-width="4"/><circle cx="40" cy="34" r="5" fill="#F2557A"/><circle cx="33" cy="26" r="2.6" fill="${INK}"/><circle cx="47" cy="26" r="2.6" fill="${INK}"/><path d="M32 40 q8 6 16 0" stroke="${INK}" stroke-width="3" fill="none" stroke-linecap="round"/><path d="M22 18 q18 -18 36 0" stroke="#72CEF2" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="32" cy="72" r="4" fill="#FFD23F"/><circle cx="48" cy="86" r="4" fill="#FFD23F"/><circle cx="36" cy="96" r="3.5" fill="#FFD23F"/></svg>`;
const ASCH=`<svg viewBox="0 0 150 70" class="egg-asch"><rect x="1.5" y="1.5" width="40" height="67" rx="8" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M21 14 v40" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><rect x="52" y="1.5" width="96" height="67" rx="8" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M72 20 v34 M100 10 v44 M128 18 v36" stroke="${INK}" stroke-width="5" stroke-linecap="round"/><g font-family="Arial" font-weight="700" font-size="10" fill="${INK}"><text x="68" y="66">A</text><text x="96" y="66">B</text><text x="124" y="66">C</text></g></svg>`;

function beep(){try{if((JSON.parse(localStorage.getItem('lernbox.settings')||'{}').soundOff))return;const C=new (window.AudioContext||window.webkitAudioContext)();[0,.22].forEach((t,i)=>{const o=C.createOscillator(),g=C.createGain();o.type='sine';o.frequency.value=i?1568:2093;g.gain.setValueAtTime(.0001,C.currentTime+t);g.gain.exponentialRampToValueAtTime(.18,C.currentTime+t+.01);g.gain.exponentialRampToValueAtTime(.0001,C.currentTime+t+.9);o.connect(g).connect(C.destination);o.start(C.currentTime+t);o.stop(C.currentTime+t+1)})}catch(e){}}

const EGGS={
 freud:{s:()=>`<div class="egg-stage egg-freud">${COUCH}<div class="egg-fini on-couch">${fini('sleepy','content')}</div></div>`,t:'„Erzähl mir von deiner Mutter …“ – oder lern einfach weiter. 🛋️'},
 pawlow:{s:()=>`<div class="egg-stage egg-pawlow"><div class="egg-fini">${fini('hungry')}</div>${BELL}<span class="egg-drool"></span></div>`,t:'*kling* … Fini läuft das Wasser im Mund zusammen. Klassisch konditioniert!',go:beep},
 pavlov:{alias:'pawlow'},
 milgram:{s:()=>`<div class="egg-stage"><div class="egg-fini">${fini('wink','happy')}</div></div>`,t:'Du musst nicht weiterlernen. Wirklich nicht. (Aber es wäre schon gut.)'},
 skinner:{s:()=>`<div class="egg-stage egg-skinner">${TREAT}<div class="egg-fini">${fini('eat')}</div></div>`,t:'Verstärkung! Ein Leckerli für Fini.',go:skinnerStar},
 rorschach:{s:()=>`<div class="egg-stage egg-ror">${blot()}<div class="egg-fini small">${fini('star','happy')}</div></div>`,t:'Was siehst du? Ich seh einen Fuchs. Ich seh immer einen Fuchs.'},
 asch:{s:()=>`<div class="egg-stage egg-asch-w">${ASCH}<div class="egg-trio">${[0,1,2].map(i=>`<div class="egg-fini tiny" style="animation-delay:${i*.12}s">${fini('smug','content')}</div>`).join('')}</div></div>`,t:'Alle drei sagen „A“. Und du? 😏'},
 marshmallow:{s:()=>`<div class="egg-stage egg-marshw"><div class="egg-fini">${fini('focus','hungry','egg-swap')}</div>${MARSH}</div>`,t:'Fini hält tapfer durch … 3 … 2 … *mampf*. Belohnungsaufschub ist schwer!',go:marsh},
 maslow:{s:()=>`<div class="egg-stage egg-maslow">${MASLOW}<div class="egg-fini small">${fini('party','yay')}</div></div>`,t:'Selbstverwirklichung, Lernbox-Edition.'},
 bobo:{s:()=>`<div class="egg-stage egg-bobow">${BOBO}<div class="egg-fini">${fini('shock','oops')}</div></div>`,t:'Fini schaut die Bobo-Puppe sehr misstrauisch an. Nur beobachten, nix nachmachen!'},
};
const ALL=['freud','pawlow','milgram','skinner','rorschach','asch','marshmallow','maslow','bobo'];

function skinnerStar(){try{const k=new Date().toISOString().slice(0,10);if(localStorage.getItem('lernbox.eggstar')===k)return;if(typeof window.lbPetStar==='function'&&window.lbPetStar()){localStorage.setItem('lernbox.eggstar',k);setTimeout(()=>note('+1 ⭐ für dein Haustier'),2200)}}catch(e){}}
function marsh(box){setTimeout(()=>{const m=box.querySelector('.egg-marsh');if(m)m.classList.add('gone');const f=box.querySelector('.egg-swap');if(f&&window.petSVG)f.outerHTML=fini('eat')},2100)}


const CSS=`.egg{position:fixed;left:50%;bottom:24px;z-index:9999;width:min(360px,calc(100vw - 32px));transform:translate(-50%,30px) scale(.94);opacity:0;transition:transform .45s cubic-bezier(.2,1.3,.4,1),opacity .3s;background:#FEFEFE;color:#1A1C24;border-radius:24px;box-shadow:0 18px 50px rgba(10,20,40,.28);padding:16px 18px 14px;text-align:center;font-family:'Instrument Sans',system-ui,sans-serif}
.egg.in{transform:translate(-50%,0) scale(1);opacity:1}
.egg p{margin:8px 0 2px;font-weight:600;font-size:.95rem;line-height:1.35;text-wrap:balance}
.egg small{font:700 .66rem 'JetBrains Mono',monospace;letter-spacing:.08em;text-transform:uppercase;color:#8A8F99}
.egg-x{position:absolute;top:8px;right:10px;border:0;background:none;font-size:1.3rem;color:#8A8F99;cursor:pointer}
.egg-stage{position:relative;height:150px;display:flex;align-items:flex-end;justify-content:center;gap:6px;border-radius:18px;background:radial-gradient(120% 90% at 50% 100%,#D6F1FA,#EEF8FC 70%);overflow:hidden}
.egg-fini{width:120px;height:120px;animation:eggPop .55s cubic-bezier(.2,1.4,.4,1) both}
.egg-fini svg{width:100%;height:100%}
.egg-fini.small{width:92px;height:92px}.egg-fini.tiny{width:62px;height:62px}
.egg-couch{position:absolute;bottom:8px;left:50%;width:210px;transform:translateX(-50%)}
.egg-fini.on-couch{position:absolute;bottom:42px;left:50%;margin-left:-60px;transform:rotate(-8deg)}
.egg-bell{position:absolute;top:8px;right:46px;width:56px;transform-origin:50% 6px;animation:eggRing .5s ease-in-out 4}
.egg-drool{position:absolute;bottom:52px;left:calc(50% + 4px);width:8px;height:12px;border-radius:50% 50% 50% 50%/40% 40% 60% 60%;background:#8FD3F4;border:2px solid #1A1C24;animation:eggDrip 1.4s ease-in .5s infinite}
.egg-treat{position:absolute;top:-30px;left:50%;width:44px;margin-left:-22px;animation:eggFall .9s cubic-bezier(.5,0,1,1) .2s forwards}
.egg-blot{width:130px;height:110px;margin-bottom:14px;animation:eggPop .6s both}
.egg-ror .egg-fini{position:absolute;right:6px;bottom:0}
.egg-asch{width:150px;margin-bottom:76px;position:absolute;top:10px;left:50%;transform:translateX(-50%)}
.egg-trio{display:flex;gap:2px}
.egg-trio .egg-fini svg .pbody{transform-origin:100px 180px}
.egg-marsh{width:52px;margin:0 0 14px -10px;transition:transform .35s,opacity .35s}
.egg-marsh.gone{transform:scale(.2) translateX(-60px);opacity:0}
.egg-pyr{display:flex;flex-direction:column;align-items:center;gap:3px;width:64%;margin:10px 0}
.egg-pyr div{width:var(--w);background:var(--c);border:2px solid #1A1C24;border-radius:6px;font:800 .62rem/1.1 'Bricolage Grotesque',system-ui;padding:4px 2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;animation:eggPop .45s both}
.egg-maslow{justify-content:space-between;padding:0 8px;align-items:center}
.egg-bobo{width:70px;margin-bottom:6px;transform-origin:50% 95%;animation:eggWob 1.2s ease-in-out infinite}
.egg-note{position:fixed;left:50%;top:18px;transform:translateX(-50%);z-index:10000;background:#1A1C24;color:#fff;font:700 .85rem 'Instrument Sans',system-ui;padding:9px 16px;border-radius:999px;box-shadow:0 8px 24px rgba(0,0,0,.25);animation:eggPop .4s both}
@keyframes eggPop{from{transform:scale(.6);opacity:0}to{transform:none;opacity:1}}
@keyframes eggRing{0%,100%{transform:rotate(0)}25%{transform:rotate(18deg)}75%{transform:rotate(-18deg)}}
@keyframes eggDrip{0%{transform:translateY(0);opacity:0}20%{opacity:1}100%{transform:translateY(26px);opacity:0}}
@keyframes eggFall{to{transform:translateY(118px) rotate(200deg);opacity:0}}
@keyframes eggWob{0%,100%{transform:rotate(-12deg)}50%{transform:rotate(12deg)}}
@media (prefers-reduced-motion:reduce){.egg *{animation:none!important}}`;
const st=document.createElement('style');st.textContent=CSS;document.head.appendChild(st);
let box=null,hideT=0;
function note(t){const n=document.createElement('div');n.className='egg-note';n.textContent=t;document.body.appendChild(n);setTimeout(()=>n.remove(),2600)}
function show(key){let e=EGGS[key];if(e.alias){key=e.alias;e=EGGS[key]}
  if(box)box.remove();clearTimeout(hideT);
  box=document.createElement('div');box.className='egg';box.setAttribute('role','status');
  box.innerHTML=`<button class="egg-x" aria-label="Schließen">×</button>${e.s()}<p>${e.t}</p><small>Osterei gefunden 🥚</small>`;
  document.body.appendChild(box);requestAnimationFrame(()=>box.classList.add('in'));
  box.querySelector('.egg-x').onclick=hide;if(e.go)e.go(box);
  hideT=setTimeout(hide,6500);
  try{const f=new Set(JSON.parse(localStorage.getItem('lernbox.eggs')||'[]'));const before=f.size;f.add(key);localStorage.setItem('lernbox.eggs',JSON.stringify([...f]));
    if(f.size===ALL.length&&before<ALL.length)setTimeout(()=>note('🕵️ Psycho-Detektiv:in – alle '+ALL.length+' Ostereier gefunden!'),3000);
    else if(f.size>before)setTimeout(()=>note(`🥚 ${f.size} von ${ALL.length} Ostereiern`),2600)}catch(x){}}
function hide(){if(!box)return;const b=box;box=null;b.classList.remove('in');setTimeout(()=>b.remove(),350)}
let last='';
document.addEventListener('input',e=>{const t=e.target;if(!t||t.tagName!=='INPUT')return;if(!(t.type==='search'||/^(sq|sfq|q|search)$/i.test(t.id)||/such/i.test(t.placeholder||'')))return;
  const v=(t.value||'').trim().toLowerCase().replace(/[^a-zäöüß]/g,'');if(v===last)return;last=v;if(EGGS[v])show(v)});
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&box)hide()});
window.lbEgg=show;
})();
