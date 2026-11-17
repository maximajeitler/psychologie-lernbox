/* Psychologie Lernbox · Service Worker (offline lernen) */
const V='2611170152';
const CACHE='lernbox-'+V, EXT='lernbox-ext';
const PRE=["./index.html", "./datenschutz.html", "./einstellungen.html", "./fach.html", "./gruppen.html", "./impressum.html", "./noten.html", "./rangliste.html", "./wrapped.html", "./faecher/entwicklung-1.html", "./faecher/sozial-1.html", "./faecher/taetigkeitsbereiche.html", "./site.css", "./site.js", "./account.js", "./pets.js", "./pdf.js", "./report.js", "./tools.css", "./app.js", "./wlog.js", "./wrapped.js", "./chat.js", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./apple-touch-icon.png", "./favicon-32.png", "./favicon.svg"];
self.addEventListener('install',e=>{
  e.waitUntil(caches.open(CACHE).then(c=>Promise.all(PRE.map(u=>fetch(u,{cache:'reload'}).then(r=>r.ok&&c.put(u,r)).catch(()=>{})))).then(()=>self.skipWaiting()));
});
self.addEventListener('activate',e=>{
  e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k.startsWith('lernbox-')&&k!==CACHE&&k!==EXT).map(k=>caches.delete(k)))).then(()=>self.clients.claim()));
});
/* eigene Dateien: erst Netz (immer aktuell), sonst Speicher. Schlüssel ohne ?v=… */
const key=u=>{const x=new URL(u);return x.origin+(x.pathname.endsWith('/')?x.pathname+'index.html':x.pathname)};
async function fresh(req){
  const c=await caches.open(CACHE),k=key(req.url);
  const net=fetch(req).then(r=>{if(r.ok)c.put(k,r.clone());return r});
  const slow=new Promise(res=>setTimeout(res,4000));
  try{const r=await Promise.race([net,slow.then(()=>null)]);if(r)return r}catch(e){}
  const hit=await c.match(k)||await caches.match(k,{ignoreSearch:true});
  if(hit)return hit;
  try{return await net}catch(e){}
  if(req.mode==='navigate'){const home=await c.match(key(self.registration.scope));if(home)return home}
  return new Response('Offline',{status:503,headers:{'Content-Type':'text/plain; charset=utf-8'}});
}
/* Schriften + Supabase-Bibliothek: einmal laden, dann aus dem Speicher */
async function stored(req){
  const c=await caches.open(EXT),hit=await c.match(req);if(hit)return hit;
  const r=await fetch(req);if(r.ok||r.type==='opaque')c.put(req,r.clone());return r;
}
self.addEventListener('fetch',e=>{
  const r=e.request;if(r.method!=='GET')return;
  const u=new URL(r.url);
  if(u.origin===location.origin){if(u.pathname.startsWith(new URL(self.registration.scope).pathname))e.respondWith(fresh(r));return}
  if(u.hostname==='fonts.googleapis.com'||u.hostname==='fonts.gstatic.com'||(u.hostname==='cdn.jsdelivr.net'&&u.pathname.includes('/@supabase/')))e.respondWith(stored(r));
});
