/* Psychologie Lernbox · gemeinsames Skript für alle Seiten */
/* Angemeldet? Sofort merken, damit nichts kurz aufblitzt */
try{if(localStorage.getItem('lernbox-auth'))document.documentElement.classList.add('lb-auth')}catch(e){}
/* ================== Studienplan (Bachelor Psychologie 16W, ohne Freie Wahlfächer) ================== */
const MOD={A1:'Modul A1 · Fachspezifisches Basismodul',A2:'Modul A2 · Einführung & wissenschaftliches Arbeiten',B:'Modul B · Statistik / Methoden',C:'Modul C · Diagnostik',D1:'Modul D1 · Grundlagen Teil 1 (kognitiv & biologisch)',D2:'Modul D2 · Grundlagen Teil 2 (kognitiv & biologisch)',E1:'Modul E1 · Grundlagen Teil 1 (intra- & interpersonell)',E2:'Modul E2 · Grundlagen Teil 2 (intra- & interpersonell)',F1:'Modul F1 · Anwendungsfächer Basis',F2:'Modul F2 · Anwendungsfächer Basis',F3:'Modul F3 · Anwendungsfächer Aufbau',F4:'Modul F4 · Anwendungsfächer Aufbau',F5:'Modul F5 · Theorien, Techniken & Methoden',G:'Modul G · Praxis',H:'Modul H · Forschungsmethodik & Bachelorarbeit',U:'Untersuchungsscheine',FWF:'Freie Wahlfächer'};
const FOLDERS=[
 {id:'entwicklung',n:'Entwicklungs­psychologie',a:'#2B44F0',h:'#E4FF3D',lv:[
   {c:'A.1.e',n:'Entwicklungspsychologie I',t:'VO',m:'A1',key:'ep1',url:'faecher/entwicklung-1.html'},
   {c:'E.1.a',n:'Entwicklungspsychologie II',t:'VO',m:'E1'}]},
 {id:'sozial',n:'Sozial­psychologie',a:'#6B2D68',h:'#D3F07A',lv:[
   {c:'E.1.b',n:'Sozialpsychologie I',t:'VO',m:'E1',key:'soz1',url:'faecher/sozial-1.html'},
   {c:'E.1.d',n:'Sozialpsychologie II',t:'VO',m:'E1'}]},
 {id:'taetigkeit',n:'Tätigkeits­bereiche',a:'#0E6E7E',h:'#FFC6A5',lv:[
   {c:'A.2.a',n:'Tätigkeitsbereiche',t:'VO',m:'A2',key:'tb30',url:'faecher/taetigkeitsbereiche.html'}]},
 {id:'geschichte',n:'Geschichte & Richtungen',a:'#B4521E',h:'#B9E3F4',lv:[
   {c:'A.1.a',n:'Einführung in Fächer, Geschichte und Richtungen der Psychologie',t:'VO',m:'A1',key:'gesch'}]},
 {id:'statistik',n:'Statistik & Methoden',a:'#5A36C9',h:'#FFC062',lv:[
   {c:'A.1.b',n:'Psychologische Statistik I',t:'VO',m:'A1',key:'stat'},
   {c:'A.2.b',n:'Wissenschaftliches Arbeiten: Forschungsmethoden',t:'VO',m:'A2'},
   {c:'B.a',n:'Psychologische Statistik II',t:'VO',m:'B'},
   {c:'B.b',n:'Anwendung statistischer Verfahren am Computer',t:'UE',m:'B'},
   {c:'B.c',n:'Praktikum für Forschungsmethodik',t:'SE',m:'B'},
   {c:'E.2.b',n:'Sozialwissenschaftliche Methoden',t:'VU',m:'E2'},
   {c:'H.a',n:'Seminar Forschungsmethodik in einem Grundlagen- oder Anwendungsfach',t:'SE',m:'H'},
   {c:'H.b',n:'Tutorium zum Seminar Forschungsmethodik',t:'TU',m:'H'}]},
 {id:'biologisch',n:'Biologische Psychologie',a:'#A3285F',h:'#A6EDCF',lv:[
   {c:'A.1.d',n:'Biologische Psychologie I',t:'VO',m:'A1',key:'bio'},
   {c:'D.1.b',n:'Biologische Psychologie II',t:'VO',m:'D1'},
   {c:'D.2.b',n:'Spezielle Kapitel der Biologischen Psychologie',t:'VO/SE',m:'D2'}]},
 {id:'allgemein',n:'Allgemeine Psychologie',a:'#8A5A00',h:'#D9CEFF',lv:[
   {c:'A.1.c',n:'Allgemeine Psychologie I',t:'VO',m:'A1',key:'allg'},
   {c:'D.1.a',n:'Allgemeine Psychologie II',t:'VO',m:'D1'},
   {c:'D.1.c',n:'Demonstrationen und Übungen zur Allgemeinen Psychologie',t:'VU',m:'D1'},
   {c:'D.1.d',n:'Tutorium zu Demonstrationen und Übungen',t:'TU',m:'D1'},
   {c:'D.2.a',n:'Spezielle Kapitel der Allgemeinen Psychologie',t:'VO/SE',m:'D2'},
   {c:'D.2.c',n:'Ausgewählte Untersuchungen aus der Allgemeinen oder Biologischen Psychologie',t:'KS',m:'D2'},
   {c:'D.2.d',n:'Tutorium zu Ausgewählte Untersuchungen',t:'TU',m:'D2'}]},
 {id:'differentiell',n:'Differentielle Psychologie',a:'#0C66A0',h:'#FFB3A1',lv:[
   {c:'E.1.c',n:'Differentielle Psychologie I',t:'VO',m:'E1'},
   {c:'E.1.e',n:'Differentielle Psychologie II',t:'VO',m:'E1'}]},
 {id:'intrainter',n:'Intra- & inter­personelle Prozesse',a:'#1D5C73',h:'#FFC9E4',lv:[
   {c:'E.2.a',n:'Grundlagen intra- und interpersoneller Prozesse I',t:'KS',m:'E2'},
   {c:'E.2.c',n:'Grundlagen intra- und interpersoneller Prozesse II',t:'VO/SE',m:'E2'}]},
 {id:'diagnostik',n:'Diagnostik',a:'#3C556E',h:'#DCFA5A',lv:[
   {c:'C.a',n:'Messtheorie',t:'VO',m:'C'},
   {c:'C.b',n:'Psychologische Diagnostik I',t:'VO',m:'C'},
   {c:'C.c',n:'Psychologische Diagnostik II',t:'VO',m:'C'},
   {c:'C.d',n:'Übungen zur Psychologischen Diagnostik',t:'UE',m:'C'},
   {c:'F.3.c',n:'Spezielle Kapitel der Psychologischen Diagnostik',t:'VU/UE',m:'F3'}]},
 {id:'klinisch',n:'Klinische, Gesundheits- & Neuro­psychologie',a:'#9A1FA6',h:'#F4EE7A',lv:[
   {c:'F.1.a',n:'Klinische Psychologie',t:'VO',m:'F1'},
   {c:'F.1.b',n:'Gesundheitspsychologie',t:'VO',m:'F1'},
   {c:'F.1.c',n:'Neuropsychologie',t:'VO',m:'F1'},
   {c:'F.4.a',n:'Spezielle Kapitel der Neuropsychologie',t:'VO/SE/UE',m:'F4'},
   {c:'F.4.b',n:'Spezielle Kapitel der Klinischen Psychologie',t:'VO/SE/UE',m:'F4'},
   {c:'F.4.c',n:'Spezielle Kapitel der Gesundheitspsychologie',t:'VO/SE/UE',m:'F4'}]},
 {id:'arbeit',n:'Arbeits-, Organisations- & Umwelt­psychologie',a:'#8A3E5C',h:'#C9E9C4',lv:[
   {c:'F.2.b',n:'Arbeits-, Organisations- und Umweltpsychologie',t:'VO',m:'F2'},
   {c:'F.3.a',n:'Spezielle Kapitel der Arbeits-, Organisations- und Umweltpsychologie',t:'VO/SE/UE',m:'F3'}]},
 {id:'paedagogisch',n:'Pädagogische Psychologie',a:'#1F3366',h:'#FFD54A',lv:[
   {c:'F.2.a',n:'Pädagogische Psychologie',t:'VO',m:'F2'},
   {c:'F.3.b',n:'Spezielle Kapitel der Pädagogischen Psychologie',t:'VO/SE/UE',m:'F3'}]},
 {id:'beratung',n:'Beratung & Moderation',a:'#5B2A86',h:'#FFE27A',lv:[
   {c:'F.5.a',n:'Beratung / Gesprächsführung',t:'UE',m:'F5'},
   {c:'F.5.b',n:'Moderationstechniken, Mediation, Coaching',t:'VU/UE',m:'F5'}]},
 {id:'praxis',n:'Praxis & Bachelor­arbeit',a:'#2B2F3A',h:'#72CEF2',lv:[
   {c:'G.a',n:'Einführung in die Praxisfelder der Psychologie',t:'VU',m:'G'},
   {c:'G.b',n:'Praxis',t:'Praktikum',m:'G',nx:1},
   {c:'H.c',n:'Bachelorarbeit',t:'BA',m:'H'},
   {c:'U',n:'Untersuchungsscheine',t:'Schein',m:'U',nx:1},
   {c:'FWF',n:'Freie Wahlfächer (inkl. universitätsweites Basismodul)',t:'FWF',m:'FWF',nx:1}]},
];
const LV=[];FOLDERS.forEach(f=>f.lv.forEach(l=>{l.f=f;l.key=l.key||('lv_'+l.c.replace(/\W/g,''));LV.push(l)}));
const byKey=Object.fromEntries(LV.map(l=>[l.key,l]));
const isVO=l=>l.t==='VO';
/* Prüfungsmodus laut UNIGRAZonline (Beurteilungsschema WiSe 26/27 + SoSe 27, abgefragt 15.11.2026)
   P = schriftliche Prüfung · PI = prüfungsimmanent mit Test/Klausur · I = keine Prüfung · TU = Tutorium · W = je nach gewählter LV */
const PM={
 'A.1.a':['P','Schriftliche Prüfung'],'A.1.b':['P','Schriftliche Prüfung (75 Min.), u. a. Multiple Response'],'A.1.c':['P','Schriftliche Prüfung via flExam, Single Choice'],
 'A.1.d':['P','Schriftliche Prüfung'],'A.1.e':['P','Schriftliche Prüfung: Grundlagenwissen und Transfer'],'A.2.a':['P','Schriftliche Prüfung'],'A.2.b':['P','Schriftliche Prüfung'],
 'B.a':['P','Schriftliche Prüfung'],'B.b':['PI','Laufende Mitarbeitsüberprüfungen am Computer und eine Abschlussklausur am Computer (closed book)'],
 'B.c':['I','Keine Prüfung: Mitarbeit, Referat und schriftlicher Bericht'],
 'C.a':['P','Schriftliche Prüfung am Ende der LV'],'C.b':['P','Schriftliche Prüfung'],'C.c':['P','Schriftliche Prüfung am Semesterende'],
 'C.d':['PI','Präsentation bzw. Beschreibung von Testverfahren, dazu ein Zwischentest'],
 'D.1.a':['P','Schriftliche Prüfung mit offenen Fragen'],'D.1.b':['P','Schriftliche Prüfung'],'D.1.c':['P','Schriftliche Prüfung, dazu Tutorium und Protokollbögen'],
 'D.1.d':['TU','Tutorium: nur Teilnahme (mit/ohne Erfolg), keine Prüfung'],
 'D.2.a':['W','Je nach Seminar: meist Referat, schriftliche Arbeit und Mitarbeit – keine große Prüfung'],
 'D.2.b':['W','Je nach Wahl: Seminar mit Präsentation und Abschlussarbeit oder eine VO mit schriftlicher Prüfung'],
 'D.2.c':['W','Bericht und Mitarbeit, bei manchen Gruppen zusätzlich eine schriftliche Prüfung'],
 'D.2.d':['TU','Tutorium: nur Teilnahme (mit/ohne Erfolg), keine Prüfung'],
 'E.1.a':['P','Schriftliche Prüfung'],'E.1.b':['P','Multiple-Choice-Klausur via flExam'],'E.1.c':['P','Schriftliche Prüfung'],'E.1.d':['P','Multiple-Choice-Klausur'],
 'E.1.e':['P','Klausur: Multiple Choice und Lückentexte'],
 'E.2.a':['W','Je nach Gruppe: Mitarbeit, Gruppenarbeiten und Referate, manchmal eine Prüfung am Semesterende'],
 'E.2.b':['PI','Kleine Untersuchungen mit Berichten, Moodle-Quizzes und eine Abschlussklausur'],
 'E.2.c':['W','Je nach Gruppe: meist Workshops und Hausübungen, eine Variante als VO mit Multiple-Choice-Prüfung'],
 'F.1.a':['P','Schriftliche Prüfung'],'F.1.b':['P','Benotete Klausur'],'F.1.c':['P','Schriftliche Prüfung'],
 'F.2.a':['P','Schriftliche Prüfung'],'F.2.b':['P','Klausur: 2 offene Fragen und 10 Multiple-Choice-Fragen'],
 'F.3.a':['I','Keine Prüfung: Teilnahme, Präsentation und Seminararbeit'],
 'F.3.b':['W','Je nach Wahl: Seminar mit Referat und Seminararbeit oder eine VO mit Prüfung'],
 'F.3.c':['W','Je nach Wahl: Referate, Projektarbeit, teils Kurzprüfungen'],
 'F.4.a':['W','Je nach Wahl: Seminar mit Referat und Arbeit oder eine VO mit Klausur'],
 'F.4.b':['W','Seminar mit Präsentation, Mitarbeit und meist einer schriftlichen Prüfung'],
 'F.4.c':['W','Je nach Wahl: Seminar mit Referaten und kurzer Abschlussprüfung oder eine VO mit schriftlicher Prüfung'],
 'F.5.a':['I','Keine Prüfung: aktive Mitarbeit, Gruppenbeitrag und Abschlussarbeit'],
 'F.5.b':['PI','Reflexionsberichte, Referat und eine Prüfung'],
 'G.a':['I','Keine Prüfung: Referate, Bericht und Diskussionen'],
 'G.b':['I','Keine Prüfung: Praktikum'],'H.c':['I','Keine Prüfung – die Bachelorarbeit wird benotet (eigenes Zeugnis)'],'U':['I','Keine Prüfung: Teilnahme an Untersuchungen'],
 'H.a':['I','Keine Prüfung: Referate, Protokolle und schriftliche Arbeiten'],
 'H.b':['TU','Tutorium: nur Teilnahme (mit/ohne Erfolg), keine Prüfung'],
 'FWF':['W','Frei wählbar: beliebige Lehrveranstaltungen, auch aus anderen Studien – davon 6 ECTS universitätsweites Basismodul. Deine Kurse trägst du im Notenplaner selbst ein.']};
LV.forEach(l=>{const p=PM[l.c];if(p){l.pm=p[0];l.pn=p[1]}});
/* ECTS laut Curriculum Bachelor Psychologie 2016 / UNIGRAZonline (Summe 180) */
const ECTS={'A.1.a':3,'A.1.b':4,'A.1.c':3,'A.1.d':3,'A.1.e':3,'A.2.a':3,'A.2.b':4,'B.a':4,'B.b':3,'B.c':6,'C.a':4,'C.b':3,'C.c':3,'C.d':3,'D.1.a':3,'D.1.b':3,'D.1.c':3,'D.1.d':1,'D.2.a':3,'D.2.b':3,'D.2.c':3,'D.2.d':1,'E.1.a':3,'E.1.b':3,'E.1.c':3,'E.1.d':3,'E.1.e':3,'E.2.a':4,'E.2.b':4,'E.2.c':4,'F.1.a':3,'F.1.b':3,'F.1.c':3,'F.2.a':3,'F.2.b':3,'F.3.a':4,'F.3.b':4,'F.3.c':4,'F.4.a':4,'F.4.b':4,'F.4.c':4,'F.5.a':4,'F.5.b':4,'G.a':1,'G.b':10,'H.a':5,'H.b':1,'H.c':4,'U':1,'FWF':15};
LV.forEach(l=>{l.ec=ECTS[l.c]||0});
function ectsOf(l){const v=+((X[l.key]||{}).ects);return v>0?v:(l.ec||0)}
/* geschaffte ECTS: bestanden = volle ECTS; freie Wahlfächer auch teilweise */
const fwfPassed=it=>it.g==='ok'||(it.g>=1&&it.g<=4);
function fwfItems(){return((X.lv_FWF||{}).items)||[]}
function doneEcts(l){const r=X[l.key]||{};if(l.c==='FWF')return Math.min(l.ec,fwfItems().filter(fwfPassed).reduce((a,it)=>a+(+it.ec||0),0));return r.res==='ok'?ectsOf(l):0}
const noExam=l=>!!l.nx||l.pm==='I'||l.pm==='TU';
const kindTxt=l=>l.pn||(l.nx?'Keine Prüfung':'');
const PMLBL={P:'Prüfung',PI:'Prüfungsimmanent + Test',I:'Keine Prüfung',TU:'Tutorium',W:'Je nach Wahl'};

/* ================== Speicher ================== */
const esc=s=>String(s==null?'':s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const get=(k,d)=>{try{const v=localStorage.getItem(k);return v==null?d:JSON.parse(v)}catch(e){return d}};
const put=(k,v)=>{try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}};
let X=get('lernbox.exams',{}); /* key → {d:[y,m,d]|null, time, res:'ok'|'no', grade, lead, t} */
const saveX=()=>put('lernbox.exams',X);
let SET=Object.assign({lead:21,weather:true,tip:true,t:0},get('lernbox.settings',{}));
const saveSet=()=>{SET.t=Date.now();put('lernbox.settings',SET)};
/* ÖH-Beitrag: Zahlungsfrist = Zeitraum der Fortsetzungsmeldung laut Mitteilungsblatt; Geld muss bis zum letzten Tag am Uni-Konto sein */
const OEH_EUR='26,20';
function oehTerm(key){const o=UNI.oeh.find(x=>x.key===key);if(o)return o;const y=+key.slice(2);return key.startsWith('WS')?{key,a:`${y}-07-01`,b:`${y}-10-31`}:{key,a:`${y}-01-08`,b:`${y}-03-31`}}
function oehInfo(n=new Date()){const k=ukey(n),y=n.getFullYear(),cands=['WS'+(y-1),'SO'+y,'WS'+y,'SO'+(y+1)].map(oehTerm);
  const cur=cands.find(o=>k>=o.a&&k<=o.b)||null,next=cands.find(o=>o.a>k)||null;return{cur,next}}
const oehSt=key=>(SET.oeh||{})[key]||'';
function oehSet(key,v){SET.oeh=Object.assign({},SET.oeh||{},{[key]:v});saveSet()}
const fDay=s=>{const a=s.split('-');return new Date(+a[0],+a[1]-1,+a[2])};
const fLong=s=>fDay(s).toLocaleDateString('de-AT',{day:'numeric',month:'long'});
const today=new Date();today.setHours(0,0,0,0);
const D=a=>new Date(a[0],a[1],a[2]);
/* Uni Graz: Semester + lehrveranstaltungsfreie Zeiten (Mitteilungsblatt 15.a, 2025/26, Senat 21.01.2026) */
const UNI={terms:[
  {key:'WS2026',label:'WiSe 26/27',long:'Wintersemester 2026/27',from:'2026-10-01',to:'2027-02-27',wrap:['2027-02-01','2027-02-27']},
  {key:'SO2027',label:'SoSe 27',long:'Sommersemester 2027',from:'2027-03-01',to:'2027-09-30',wrap:['2027-07-01','2027-09-30']},
  {key:'WS2027',label:'WiSe 27/28',long:'Wintersemester 2027/28',from:'2027-10-01',to:'2028-02-29',wrap:['2028-02-01','2028-02-29']},
  {key:'SO2028',label:'SoSe 28',long:'Sommersemester 2028',from:'2028-03-01',to:'2028-09-30',wrap:['2028-07-01','2028-09-30']}],
oeh:[{key:'WS2026',a:'2026-07-06',b:'2026-10-31'},{key:'SO2027',a:'2027-01-11',b:'2027-03-31'},{key:'WS2027',a:'2027-07-05',b:'2027-10-31'},{key:'SO2028',a:'2028-01-10',b:'2028-03-31'}],
 frei:[
  {n:'Allerseelen',a:'2026-11-02'},{n:'Weihnachtsferien',a:'2026-12-21',b:'2027-01-06'},{n:'Semesterferien',a:'2027-02-01',b:'2027-02-27'},
  {n:'Osterferien',a:'2027-03-22',b:'2027-04-03'},{n:'Tag des Rektors',a:'2027-05-07'},{n:'Dienstag nach Pfingsten',a:'2027-05-18'},{n:'Sommerferien',a:'2027-07-01',b:'2027-09-30'},
  {n:'Allerseelen',a:'2027-11-02'},{n:'Weihnachtsferien',a:'2027-12-21',b:'2028-01-06'},{n:'Semesterferien',a:'2028-02-01',b:'2028-02-29'},
  {n:'Osterferien',a:'2028-04-10',b:'2028-04-22'},{n:'Tag des Rektors',a:'2028-05-26'},{n:'Dienstag nach Pfingsten',a:'2028-06-06'},{n:'Sommerferien',a:'2028-07-01',b:'2028-09-30'}]};
const ukey=d=>d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0');
const uniFrei=d=>{const k=ukey(d);const f=UNI.frei.find(x=>k>=x.a&&k<=(x.b||x.a));return f?f.n:null};
/* Für spätere Jahre ohne Mitteilungsblatt: WiSe Okt–Feb (Wrapped im Februar), SoSe März–Sept (Wrapped Juli–Sept) */
function uniTerm(key){const t=UNI.terms.find(x=>x.key===key);if(t)return t;const ws=key.startsWith('WS'),y=+key.slice(2),s=v=>String(v).slice(2),feb=new Date(y+1,2,0).getDate();
  return ws?{key,label:`WiSe ${s(y)}/${s(y+1)}`,long:`Wintersemester ${y}/${s(y+1)}`,from:`${y}-10-01`,to:`${y+1}-02-${feb}`,wrap:[`${y+1}-02-01`,`${y+1}-02-${feb}`]}
           :{key,label:`SoSe ${s(y)}`,long:`Sommersemester ${y}`,from:`${y}-03-01`,to:`${y}-09-30`,wrap:[`${y}-07-01`,`${y}-09-30`]}}
function termKeyOf(d){const m=d.getMonth(),y=d.getFullYear();return m>=9?'WS'+y:m<=1?'WS'+(y-1):'SO'+y}
/* Wrapped: welche sind schon freigeschaltet (ab Beginn der Ferien), welches läuft gerade */
function wrapState(n=new Date()){const k=ukey(n),cur=uniTerm(termKeyOf(n));const open=k>=cur.wrap[0]&&k<=cur.wrap[1]?cur:null;
  const past=[];let t=termKeyOf(n);for(let i=0;i<8;i++){const T=uniTerm(t);if(k>=T.wrap[0]&&T.from>='2026-10-01')past.push(T);t=t.startsWith('WS')?'SO'+(+t.slice(2)):'WS'+(+t.slice(2)-1)}
  const nextT=k<cur.wrap[0]?cur:uniTerm(cur.key.startsWith('WS')?'SO'+(+cur.key.slice(2)+1):'WS'+(+cur.key.slice(2)));
  return{open,past,next:nextT}}

const daysTo=a=>Math.round((D(a)-today)/864e5);
const leadOf=l=>{const r=X[l.key];return r&&r.lead?r.lead:(isVO(l)?(+SET.lead||21):7)};
/* Termin einer LV: eigener Eintrag > Termin aus dem Lerntool > Standardtermin */
function examOf(l){
  const r=X[l.key], tool=get(l.key+'.exam',null);
  if(l.url&&tool&&(!r||!r.d||r.d.join()!==tool.join())&&(!r||!r.toolT||r.toolT!==tool.join())){X[l.key]={...(r||{}),d:tool,toolT:tool.join(),t:Date.now()};saveX()}
  const rr=X[l.key];
  if(rr&&'d' in rr)return rr.d;
  return get(l.key+'.exam',null)||null;
}
function setExam(l,d,extra){X[l.key]={...(X[l.key]||{}),...extra,d,t:Date.now()};if(d)X[l.key].toolT=d.join();saveX();
  if(d)put(l.key+'.exam',d);else{try{localStorage.removeItem(l.key+'.exam')}catch(e){}}}
window.hubMerge=d=>{let inc={};try{inc=JSON.parse(d.exams||'{}')}catch(e){}
  Object.keys(inc).forEach(k=>{const a=X[k],b=inc[k];if(!a||(b.t||0)>(a.t||0)){X[k]=b;const l=byKey[k];if(l&&l.url){if(b.d)put(k+'.exam',b.d);else try{localStorage.removeItem(k+'.exam')}catch(e){}}}});
  saveX();
  try{const ss=JSON.parse(d.settings||'null');if(ss&&(ss.t||0)>(SET.t||0)){SET=Object.assign(SET,ss);put('lernbox.settings',SET)}}catch(e){}};
window.hubRender=()=>renderAll();

/* ================== Hero: Begrüßung, Wetter, Tipp ================== */
if(document.getElementById('hello'))(function(){const h=new Date().getHours(),pick=a=>a[new Date().getDate()%a.length];const g=h<5?pick(['Hallo Nachteule 🦉','Noch wach? 🌙','Mitternachtslernen? Respekt 🦉','Die Nacht gehört dir ✨']):h<11?'Guten Morgen':h<14?'Mahlzeit':h<18?'Schönen Nachmittag':h<22?'Guten Abend':pick(['Spätschicht 🌙','Noch fleißig? 🌙','Abendlernen ✨']);
  document.getElementById('hello').textContent=g+' · '+new Date().toLocaleDateString('de-AT',{weekday:'long',day:'numeric',month:'long'})+(h<5?' · Schlaf festigt das Gelernte 😴':'');})();
const TIPS=[
 ['t','Spacing-Effekt','Lieber viermal 20 Minuten über mehrere Tage als einmal 80 Minuten am Stück. Verteiltes Lernen bleibt deutlich länger hängen.'],
 ['f','Der unsichtbare Gorilla','In einem berühmten Experiment (Simons & Chabris, 1999) zählten Leute Basketballpässe – rund die Hälfte übersah dabei eine Person im Gorillakostüm, die mitten durchs Bild lief.'],
 ['m','„Wir nutzen nur 10 % unseres Gehirns“','Stimmt nicht. Bildgebende Verfahren zeigen, dass praktisch alle Hirnregionen aktiv sind – nur eben nicht alle gleichzeitig.'],
 ['t','Testing-Effekt','Sich selbst abfragen bringt mehr als nochmal durchlesen. Also: lieber ein Quiz als den Lernzettel zum dritten Mal.'],
 ['f','Mere-Exposure-Effekt','Wir mögen Dinge oft schon deshalb lieber, weil wir sie öfter gesehen haben (Zajonc, 1968). Das gilt für Gesichter, Wörter und Songs.'],
 ['f','Spotlight-Effekt','Wir überschätzen stark, wie sehr andere uns bemerken. In einer Studie glaubten Studierende mit peinlichem T-Shirt, etwa die Hälfte habe es gesehen – tatsächlich war es rund ein Viertel.'],
 ['t','Interleaving','Themen mischen statt Block für Block. Das fühlt sich schwerer an, wirkt aber besser – zum Beispiel mit „Alle Kapitel“ im Quiz.'],
 ['m','Lerntypen','„Ich bin ein visueller Lerntyp“ – dass Lernen besser klappt, wenn der Stoff zum eigenen Typ passt, ist wissenschaftlich nicht belegt.'],
 ['f','Zuschauereffekt','Je mehr Leute einen Notfall mitbekommen, desto seltener hilft eine einzelne Person (Darley & Latané, 1968). Verantwortung verteilt sich auf alle.'],
 ['t','Schlaf','Im Schlaf festigt das Gehirn, was du tagsüber gelernt hast. Die Nacht vor der Prüfung durchlernen kostet mehr, als es bringt.'],
 ['f','Stroop-Effekt','Das Wort „ROT“ in blauer Farbe zu benennen, dauert länger als bei passender Farbe. Lesen läuft so automatisch ab, dass man es kaum unterdrücken kann.'],
 ['f','Kindheitsamnesie','An Erlebnisse vor dem dritten oder vierten Lebensjahr können sich die meisten Erwachsenen kaum erinnern – obwohl Kleinkinder sehr wohl lernen und sich erinnern.'],
 ['t','Pomodoro','25 Minuten Fokus, 5 Minuten Pause. Der Fokus-Timer im Lerntool macht genau das.'],
 ['f','Asch-Experiment','Bei einer einfachen Aufgabe zu Linienlängen schlossen sich rund drei Viertel der Versuchspersonen mindestens einmal der offensichtlich falschen Gruppenmeinung an (Asch, 1951).'],
 ['m','Mozart-Effekt','Mozart hören macht nicht dauerhaft klüger. Der kurze Effekt aus der Originalstudie ließ sich kaum wiederholen und hat eher mit guter Laune zu tun.'],
 ['f','Cocktailparty-Effekt','Mitten im Stimmengewirr hörst du sofort, wenn jemand deinen Namen sagt – obwohl du gar nicht zugehört hast.'],
 ['t','Generierungseffekt','Was du selbst formulierst, merkst du dir besser. Erklär ein Konzept laut, bevor du die Karteikarte umdrehst.'],
 ['f','Peak-End-Regel','Wie wir ein Erlebnis im Nachhinein bewerten, hängt vor allem vom Höhepunkt und vom Ende ab – weniger von der Dauer (Kahneman).'],
 ['f','IKEA-Effekt','Was wir selbst zusammengebaut haben, schätzen wir mehr wert – selbst wenn es etwas schief geraten ist (Norton u. a., 2012).'],
 ['t','Zeigarnik-Effekt','Unerledigtes bleibt im Kopf. Hör ruhig mitten in einem Kapitel auf – morgen geht der Einstieg leichter.'],
 ['f','McGurk-Effekt','Siehst du Lippen „ga“ sagen und hörst gleichzeitig „ba“, nimmst du oft „da“ wahr. Sehen und Hören verschmelzen zu einem Eindruck.'],
 ['m','Linke und rechte Gehirnhälfte','„Kreative“ rechts, „Logische“ links? Beide Hälften arbeiten bei fast allem zusammen – einen dominanten Persönlichkeits-Hirntyp gibt es nicht.'],
 ['f','Chunking','Telefonnummern merkt man sich in Blöcken leichter. Das Arbeitsgedächtnis fasst nur wenige Einheiten – durch Bündeln passt mehr hinein.'],
 ['t','Kontext','Lernen und Prüfung am besten unter ähnlichen Bedingungen: ruhig, ohne Handy, mit Zeitlimit – wie in der Prüfungssimulation.'],
 ['f','Von-Restorff-Effekt','Was aus der Reihe fällt, bleibt hängen. Darum funktioniert der Textmarker – solange nicht die ganze Seite gelb ist.'],
 ['f','Zungenspitzen-Phänomen','Du weißt, dass du das Wort kennst, kommst aber nicht drauf – oft kennst du sogar den Anfangsbuchstaben oder die Silbenzahl (Brown & McNeill, 1966).'],
 ['f','Pratfall-Effekt','Kompetente Menschen wirken sympathischer, wenn ihnen ein kleines Missgeschick passiert (Aronson, 1966).'],
 ['t','Elaboration','Frag dich bei jedem Begriff: Warum ist das so? Wo kenne ich das aus dem Alltag?'],
 ['f','Reminiszenz-Effekt','An die Zeit zwischen etwa 10 und 30 erinnern sich ältere Menschen besonders gut – genau die Jahre, in denen du gerade steckst.'],
 ['m','„Gegensätze ziehen sich an“','Meistens nicht. Ähnlichkeit in Einstellungen und Werten ist einer der stärksten Faktoren für Sympathie.'],
 ['f','Objektpermanenz','Babys lernen erst im Lauf des ersten Lebensjahres, dass Dinge weiter existieren, wenn sie nicht mehr zu sehen sind – darum ist „Kuckuck“ so spannend.'],
 ['t','Selbstbezug','Was du auf dich selbst beziehst, merkst du dir besser (Selbstreferenz-Effekt). Überleg: Wann hab ich das schon mal erlebt?'],
 ['f','Rubber-Hand-Illusion','Wird eine Gummihand gleichzeitig mit der eigenen, versteckten Hand gestreichelt, fühlt sie sich nach kurzer Zeit an wie die eigene.'],
 ['f','Primacy und Recency','Aus einer Liste merken wir uns den Anfang und das Ende am besten – die Mitte geht unter. Fang beim Wiederholen ruhig mal in der Mitte an.'],
 ['t','Fehler sind gut','Falsch beantwortete Fragen, die man danach korrigiert, merkt man sich oft besser als Zufallstreffer. „Zuletzt falsch“ im Quiz nutzt genau das.'],
 ['f','Frequenz-Illusion','Kaum hast du ein neues Wort gelernt, begegnet es dir überall. Es kommt nicht öfter vor – du bemerkst es nur jetzt.'],
 ['m','Mit 7 Dingen gleichzeitig','Millers „magische Zahl 7 ± 2“ ist berühmt – neuere Forschung geht eher von etwa 4 Einheiten im Arbeitsgedächtnis aus (Cowan, 2001).'],
 ['f','Yerkes-Dodson','Ein bisschen Aufregung macht leistungsfähiger, zu viel blockiert. Ein bisschen Prüfungsnervosität ist also völlig okay.'],
 ['f','Gesichter überall','Steckdosen, Autos, Wolken: Wir sehen ständig Gesichter in Dingen (Pareidolie). Das Gehirn ist auf Gesichter spezialisiert.'],
 ['t','Pausen bewegen','Kurze Bewegungspausen – Treppen, Spaziergang ums Haus – helfen der Konzentration mehr als Handy-Scrollen.'],
 ['f','Halo-Effekt','Eine positive Eigenschaft färbt auf das ganze Bild ab: Attraktive Menschen werden oft auch für klüger oder netter gehalten.'],
 ['f','Ben-Franklin-Effekt','Wer jemandem einen Gefallen getan hat, mag diese Person danach oft mehr – nicht umgekehrt, wie man denken würde.'],
];
const TKIND={t:'Lerntipp des Tages',f:'Fun-Fact des Tages',m:'Mythos des Tages'};
function renderTip(){const el=document.getElementById('tip');if(!el)return;const box=el.closest('.tip');if(box)box.hidden=SET.tip===false;
  const n=new Date(),day=Math.round((new Date(n.getFullYear(),n.getMonth(),n.getDate())-new Date(2026,0,1))/864e5);
  const i=((day*17)%TIPS.length+TIPS.length)%TIPS.length,t=TIPS[i];
  const lab=box&&box.querySelector('.label');if(lab)lab.textContent=TKIND[t[0]];
  el.innerHTML=`<b>${t[0]==='m'?'❌ ':''}${esc(t[1])}${t[0]==='m'?'':':'}</b> ${t[0]==='m'?'– ':''}${esc(t[2])}`}
const WX={0:['☀️','Klar','Perfekt für eine Lernpause am Schlossberg.'],1:['🌤','Überwiegend klar','Fenster auf, Kaffee dazu, los geht’s.'],2:['⛅','Teils bewölkt','Ideales Wetter für einen Platz in der Bibliothek.'],3:['☁️','Bedeckt','Grau draußen – gute Zeit für ein paar Karteikarten.'],45:['🌫','Nebel','Nebel draußen, Klarheit drinnen: Quiz starten.'],48:['🌫','Raureifnebel','Warm anziehen, dann ab in die Bib.'],51:['🌦','Leichter Niesel','Kein Grund rauszugehen – perfektes Lernwetter.'],53:['🌦','Niesel','Kein Grund rauszugehen – perfektes Lernwetter.'],55:['🌧','Starker Niesel','Drinnen bleiben und eine Simulation machen.'],56:['🌧','Gefrierender Niesel','Vorsicht, glatt! Heute lieber zuhause lernen.'],57:['🌧','Gefrierender Niesel','Vorsicht, glatt! Heute lieber zuhause lernen.'],61:['🌧','Leichter Regen','Regen = Lernwetter. Kein schlechtes Gewissen.'],63:['🌧','Regen','Regen = Lernwetter. Kein schlechtes Gewissen.'],65:['🌧','Starker Regen','Tee, Decke, Lernzettel.'],66:['🌧','Gefrierender Regen','Vorsicht, glatt!'],67:['🌧','Gefrierender Regen','Vorsicht, glatt!'],71:['🌨','Leichter Schnee','Schnee in Graz – kurz rausschauen, dann weiterlernen.'],73:['🌨','Schnee','Heißer Kakao und ein Kapitel Lernzettel.'],75:['❄️','Starker Schneefall','Ein Tag zum Drinbleiben.'],77:['🌨','Schneegriesel','Heißer Kakao und ein Kapitel Lernzettel.'],80:['🌦','Regenschauer','Schirm nicht vergessen, falls du zur Uni gehst.'],81:['🌧','Regenschauer','Schirm nicht vergessen, falls du zur Uni gehst.'],82:['⛈','Heftige Schauer','Heute lieber drinnen bleiben.'],85:['🌨','Schneeschauer','Warm anziehen!'],86:['🌨','Schneeschauer','Warm anziehen!'],95:['⛈','Gewitter','Gewitter draußen, Gewitter im Kopf? Kurze Pause.'],96:['⛈','Gewitter mit Hagel','Heute lieber drinnen bleiben.'],99:['⛈','Gewitter mit Hagel','Heute lieber drinnen bleiben.']};
async function loadWeather(){const box=document.getElementById('wetter');if(!box)return;box.hidden=SET.weather===false;if(box.hidden)return;
  try{const r=await fetch('https://api.open-meteo.com/v1/forecast?latitude=47.0707&longitude=15.4395&current=temperature_2m,apparent_temperature,weather_code,is_day&timezone=Europe%2FVienna');
    if(!r.ok)throw 0;const w=await r.json(),c=w.current,code=c.weather_code,m=WX[code]||['🌡','Wetter',''];
    const ic=(code===0||code===1)&&!c.is_day?'🌙':m[0];
    box.innerHTML=`<div class="wx2"><span class="ic">${ic}</span><span class="tmp">${Math.round(c.temperature_2m)}°</span><span class="txt"><b>Graz</b><span>${esc(m[1])} · gefühlt ${Math.round(c.apparent_temperature)}°</span></span></div><a class="wsrc" href="https://open-meteo.com/" target="_blank" rel="noopener">Wetter: Open-Meteo.com</a>`;
  }catch(e){box.innerHTML=`<div class="wx2"><span class="ic">🌡</span><span class="txt"><b>Graz</b><span>Wetter gerade nicht erreichbar</span></span></div><span class="wsrc">Wetter: Open-Meteo.com</span>`}}

/* ================== Prüfungen ================== */
const fmtD=(a,o)=>D(a).toLocaleDateString('de-AT',o||{weekday:'short',day:'2-digit',month:'2-digit',year:'numeric'});
const dtxt=d=>d>1?'noch '+d+' Tage':d===1?'morgen':d===0?'heute':'vorbei';
function toolStats(l){if(!l.url)return null;const st=get(l.key+'.stats',{}),ids=Object.keys(st);if(!ids.length)return null;const ok=ids.filter(i=>st[i].last==='r').length;return{n:ids.length,ok}}
function allExams(){return LV.map(l=>({l,d:examOf(l),r:X[l.key]||{}})).filter(x=>x.d)}
function renderExams(){if(!document.getElementById('xlist')){renderHeroNext();return}
  const all=allExams().sort((a,b)=>D(a.d)-D(b.d)||(a.r.time||'').localeCompare(b.r.time||''));
  const up=all.filter(x=>daysTo(x.d)>=0), past=all.filter(x=>daysTo(x.d)<0);
  /* nächste Prüfung groß */
  const nx=up[0], nb=document.getElementById('nextx');
  if(nx){const l=nx.l,d=daysTo(nx.d),lead=leadOf(l),ls=new Date(D(nx.d)-lead*864e5),inLern=d<=lead,ts=toolStats(l);
    nb.innerHTML=`<div class="nextx" style="--a:${l.f.a};--h:${l.f.h}"><p class="label">Als Nächstes · ${esc(l.c)} ${esc(l.t)}</p><h3>${esc(l.n)}</h3>
     <div class="big"><b>${d}</b><span>${d===1?'Tag':'Tage'}${d===0?' – heute ist es so weit!':''}</span></div>
     <div class="meta"><span>📅 ${fmtD(nx.d,{weekday:'long',day:'numeric',month:'long'})}${nx.r.time?' · '+esc(nx.r.time)+' Uhr':''}</span><span>${inLern?'📚 Lernphase läuft':'📚 Lernstart '+ls.toLocaleDateString('de-AT',{day:'numeric',month:'numeric'})}</span>${ts?`<span>✅ ${ts.ok} von ${ts.n} Fragen zuletzt richtig</span>`:''}</div>
     <div class="go">${l.url?`<a href="${l.url}">Zum Lerntool →</a>`:''}<button class="g" data-x="edit" data-k="${l.key}">✎ Termin bearbeiten</button></div></div>`;
  }else nb.innerHTML=`<div class="nextx empty"><p class="label">Als Nächstes</p><h3>Noch keine Prüfung eingetragen</h3><p style="margin:0;color:var(--muted);position:relative;z-index:1">Trag deine Termine ein – dann siehst du hier den Countdown und wann du mit dem Lernen anfangen solltest.</p><div class="go"><button class="btn" data-x="add" style="background:var(--ink);color:var(--bg)">＋ Prüfung eintragen</button></div></div>`;
  /* Hinweise */
  const w=[];
  for(let i=0;i<up.length;i++){const grp=up.filter(x=>{const t=daysTo(x.d)-daysTo(up[i].d);return t>=0&&t<=7});if(grp.length>=2&&!w.some(s=>s.k===grp[0].l.key)){w.push({k:grp[0].l.key,t:`<b>Stressphase:</b> ${grp.length} Prüfungen innerhalb von ${daysTo(grp[grp.length-1].d)-daysTo(grp[0].d)} Tagen (${grp.map(x=>esc(x.l.n)+' '+fmtD(x.d,{day:'numeric',month:'numeric'})).join(', ')}). Fang für alle früher an.`})}}
  up.filter(x=>{const d=daysTo(x.d),lead=leadOf(x.l);return d<=lead&&x!==nx}).slice(0,3).forEach(x=>w.push({t:`<b>Lernphase:</b> Für ${esc(x.l.n)} (${dtxt(daysTo(x.d))}) solltest du auch schon lernen.`}));
  {const oi=oehInfo();if(!SET.oehOff&&oi.cur&&oehSt(oi.cur.key)!=='paid'){const T=uniTerm(oi.cur.key),dl=Math.round((fDay(oi.cur.b)-today)/864e5);w.unshift({i:'💸',t:`<b>ÖH-Beitrag:</b> ${OEH_EUR} € fürs ${esc(T.label)} bis <b>${fLong(oi.cur.b)}</b> (${dl===0?'heute':'noch '+dl+' Tage'}) – muss bis dahin am Uni-Konto sein. Zahlen in UNIGRAZonline unter „Studienbeitragsstatus“. <a href="einstellungen.html#oeh">Schon bezahlt?</a>`})}}
  document.getElementById('warns').innerHTML=w.map(x=>`<div class="warn"><span>${x.i||'💡'}</span><span>${x.t}</span></div>`).join('');
  /* Liste nach Monaten */
  const row=x=>{const l=x.l,d=daysTo(x.d),r=x.r,lead=leadOf(l),ts=toolStats(l);
    const tags=[`<span class="chip">${esc(l.c)} · ${esc(l.t)}</span>`];
    if(d>=0){tags.push(d<=lead?`<span class="chip hot">Lernphase</span>`:`<span class="chip">Lernstart ${new Date(D(x.d)-lead*864e5).toLocaleDateString('de-AT',{day:'numeric',month:'numeric'})}</span>`);
      if(ts)tags.push(`<span class="chip">${Math.round(100*ts.ok/ts.n)} % richtig</span>`)}
    else{if(r.res==='ok')tags.push(`<span class="chip ok">✓ bestanden${r.grade?' · Note '+r.grade:''}</span>`);else if(r.res==='no')tags.push(`<span class="chip no">nicht bestanden</span>`)}
    const right=d>=0?`<span class="cnt">${dtxt(d)}</span><button class="ib" data-x="edit" data-k="${l.key}">✎</button>`
      :`${r.res?'':'<span class="cnt" style="font-size:.9rem">Wie lief’s?</span>'}<button class="ib ${r.res==='ok'?'on':''}" data-x="res" data-v="ok" data-k="${l.key}">Bestanden</button><button class="ib ${r.res==='no'?'off':''}" data-x="res" data-v="no" data-k="${l.key}">Nicht bestanden</button><button class="ib" data-x="edit" data-k="${l.key}">✎</button>`;
    return `<div class="xrow" style="--a:${l.f.a}"><div class="dt"><b>${D(x.d).getDate()}</b><small>${fmtD(x.d,{month:'short'})} · ${fmtD(x.d,{weekday:'short'})}</small></div>
      <div class="nm">${l.url?`<a href="${l.url}">${esc(l.n)}</a>`:`<span class="t">${esc(l.n)}</span>`}${r.time?` <span class="chip">${esc(r.time)} Uhr</span>`:''}<div class="tags">${tags.join('')}</div></div><div class="r">${right}</div></div>`};
  let html='',lastM='';up.forEach(x=>{const m=fmtD(x.d,{month:'long',year:'numeric'});if(m!==lastM){html+=`<p class="mhead">${m}</p>`;lastM=m}html+=row(x)});
  document.getElementById('xlist').innerHTML=html||'';
  const db=document.getElementById('donebox');db.hidden=!past.length;
  const grades=past.filter(x=>x.r.res==='ok'&&x.r.grade).map(x=>x.r.grade);
  document.getElementById('donesum').innerHTML=`Erledigt (${past.length})${grades.length?` <span class="avg">· Notenschnitt ${(grades.reduce((a,b)=>a+b,0)/grades.length).toFixed(2).replace('.',',')}</span>`:''}`;
  document.getElementById('xdone').innerHTML=past.slice().reverse().map(row).join('');
  /* Monate */
  const months=[];for(let i=0;i<4;i++)months.push(new Date(today.getFullYear(),today.getMonth()+i,1));
  document.getElementById('months').innerHTML=months.map(m=>{const y=m.getFullYear(),mo=m.getMonth(),first=(new Date(y,mo,1).getDay()+6)%7,len=new Date(y,mo+1,0).getDate();let cells='';for(let i=0;i<first;i++)cells+='<span></span>';
    for(let d=1;d<=len;d++){const day=new Date(y,mo,d),ex=all.filter(x=>D(x.d).getTime()===day.getTime());
      const lern=!ex.length&&up.find(x=>{const t=Math.round((D(x.d)-day)/864e5);return t>0&&t<=leadOf(x.l)});
      const isT=day.getTime()===today.getTime(),past=day<today;const fr=uniFrei(day);const oe=!SET.oehOff&&(()=>{const k=ukey(day),o=oehInfo(day).cur;return o&&o.b===k&&oehSt(o.key)!=='paid'?o:null})();
      const st=ex.length?`style="--a:${ex[0].l.f.a};--a2:${(ex[1]||ex[0]).l.f.a}" title="${esc(ex.map(x=>x.l.n).join(', '))}"`:lern?`style="--a:${lern.l.f.a}" title="Lernphase ${esc(lern.l.n)}"`:'';
      cells+=`<span class="dd${isT?' today':''}${ex.length?' ex':''}${ex.length>1?' ex2':''}${lern?' lern':''}${fr?' frei':''}${oe?' oehd':''}${past&&!isT?' past':''}" ${st||(oe?`title="ÖH-Beitrag: letzter Tag – ${OEH_EUR} € müssen am Uni-Konto sein"`:fr?`title="${esc(fr)} · lehrveranstaltungsfrei"`:'')}>${d}</span>`}
    return `<div class="month"><h4>${m.toLocaleDateString('de-AT',{month:'long',year:'numeric'})}</h4><div class="mgrid">${['Mo','Di','Mi','Do','Fr','Sa','So'].map(w=>`<span class="wd">${w}</span>`).join('')}${cells}</div></div>`}).join('');
  /* Hero */
  renderHeroNext();
}
function renderHeroNext(){
  const all=allExams().filter(x=>daysTo(x.d)>=0).sort((a,b)=>D(a.d)-D(b.d)),nx=all[0];
  const ch=document.getElementById('cdHero');if(!ch)return;
  if(nx){const d=daysTo(nx.d),lead=leadOf(nx.l),pct=Math.max(4,Math.min(100,Math.round(100*(lead-d)/lead)));
    ch.innerHTML=`<div class="n">${d}<small>${d===1?'Tag':'Tage'}</small></div><div><div class="l">Deine nächste Prüfung</div><div class="t">${esc(nx.l.n)}</div><div class="d">${fmtD(nx.d,{weekday:'long',day:'numeric',month:'long'})}${nx.r.time?' · '+esc(nx.r.time)+' Uhr':''}</div></div>${nx.l.url?`<a class="go" href="${nx.l.url}">Lernen →</a>`:`<a class="go" href="#pruefungen">Kalender</a>`}${d<=lead?`<div class="bar" title="Lernphase: Tag ${lead-d} von ${lead}"><i style="width:${pct}%"></i></div>`:''}`}
  else ch.innerHTML=`<div class="n">📅</div><div><div class="l">Prüfungskalender</div><div class="t">Noch keine Prüfung eingetragen</div><div class="d">Trag deine Termine ein – dann zählt hier der Countdown.</div></div><button class="go" data-x="add">＋ Eintragen</button>`;
}

/* ================== Dialog ================== */
function closeDlg(){document.querySelector('.dbg')?.remove();document.querySelector('.dlg')?.remove()}
function dlg(html){closeDlg();const bg=document.createElement('div');bg.className='dbg';bg.onclick=closeDlg;document.body.appendChild(bg);const d=document.createElement('div');d.className='dlg';d.innerHTML='<button class="x" data-x="close">×</button>'+html;document.body.appendChild(d);return d}
const ymd=a=>a[0]+'-'+String(a[1]+1).padStart(2,'0')+'-'+String(a[2]).padStart(2,'0');
function editDlg(key,fid){const l0=key?byKey[key]:null,edit=!!(l0&&examOf(l0));
  const fOpts=FOLDERS.map(f=>`<option value="${f.id}">${esc(f.n.replace(/­/g,''))}</option>`).join('');
  const dd=dlg(`<h3>${edit?'Prüfung bearbeiten':'Prüfung eintragen'}</h3>
    <p>${edit?'Änderungen werden automatisch gespeichert.':'Wähl aus, welche Prüfung es ist, und trag das Datum ein – gespeichert wird automatisch.'}</p>
    <div class="two"><label>Fach<select id="eF" ${edit?'disabled':''}>${fOpts}</select></label><label>Prüfung<select id="eLv" ${edit?'disabled':''}></select></label></div>
    <div class="two"><label>Datum<input type="date" id="eD"></label><label>Uhrzeit (optional)<input type="time" id="eT"></label></div>
    <label>Lernstart – wie viele Tage vorher?<input type="number" id="eL" min="1" max="120"></label>
    <div id="eRes"></div>
    <p class="saved" id="eS" aria-live="polite"></p>
    <div class="row"><span id="eDel"></span><button class="btn" data-x="close">Fertig</button></div>`);
  const $d=s=>dd.querySelector(s),fs=$d('#eF'),sel=$d('#eLv');
  let cur=l0||((FOLDERS.find(f=>f.id===fid)||FOLDERS[0]).lv[0]);
  const fillLv=()=>{const f=FOLDERS.find(x=>x.id===fs.value);sel.innerHTML=f.lv.filter(x=>!noExam(x)).map(x=>`<option value="${x.key}">${esc(x.n)} (${esc(x.t)})${examOf(x)?' · eingetragen':''}</option>`).join('')};
  const resUI=()=>{const R=X[cur.key]||{},ed=examOf(cur);$d('#eRes').innerHTML=(ed&&daysTo(ed)<0)||R.res?`<label>Ergebnis</label><div class="grade" id="eG">${[1,2,3,4,5].map(n=>`<button type="button" data-g="${n}" aria-pressed="${R.grade===n}">${n}</button>`).join('')}</div><p>Note antippen = bestanden (bei 5 = nicht bestanden).</p>`:'';
    $d('#eDel').innerHTML=ed?`<button class="btn g del" data-x="delx" data-k="${cur.key}">Termin entfernen</button>`:''};
  const load=()=>{cur=byKey[sel.value];const R=X[cur.key]||{},ed=examOf(cur);$d('#eD').value=ed?ymd(ed):'';$d('#eT').value=R.time||'';$d('#eL').value=leadOf(cur);$d('#eS').textContent='';resUI()};
  const save=()=>{const v=$d('#eD').value;if(!/^\d{4}-\d{2}-\d{2}$/.test(v)){$d('#eS').textContent='Datum wählen – dann wird automatisch gespeichert.';return}
    const [y,m,d]=v.split('-').map(Number),g=dd.querySelector('#eG [aria-pressed="true"]'),extra={time:$d('#eT').value||'',lead:Math.max(1,Math.min(120,+$d('#eL').value||21))};
    if(g){extra.grade=+g.dataset.g;extra.res=extra.grade===5?'no':'ok'}
    const prevRes=(X[cur.key]||{}).res,bp=wegStat().pct;
    setExam(cur,[y,m-1,d],extra);renderAll();if((X[cur.key]||{}).res!==prevRes){const L=cur;closeDlg();resultFx(L,prevRes,bp);return}const keep=sel.value;fillLv();sel.value=keep;resUI();$d('#eS').textContent='✓ Automatisch gespeichert';};
  fs.value=cur.f.id;fillLv();sel.value=cur.key;load();
  fs.onchange=()=>{fillLv();load()};sel.onchange=load;
  ['#eD','#eT','#eL'].forEach(q=>{$d(q).addEventListener('change',save);if(q!=='#eD')$d(q).addEventListener('input',save)});
  dd.addEventListener('click',e=>{const g=e.target.closest('[data-g]');if(!g)return;dd.querySelectorAll('[data-g]').forEach(b=>b.setAttribute('aria-pressed',b===g?'true':'false'));save()});
}
function toast(t){const d=document.createElement('div');d.className='toast';d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),2200)}
document.addEventListener('click',e=>{const b=e.target.closest('[data-x]');if(!b)return;const x=b.dataset.x;if(b.tagName==='A')e.preventDefault();
  if(x==='close'){closeDlg();return}
  if(x==='add'){editDlg(null,b.dataset.f);return}
  if(x==='edit'){editDlg(b.dataset.k);return}
  if(x==='delx'){const L=byKey[b.dataset.k];setExam(L,null,{});closeDlg();renderAll();toast('Termin entfernt');return}
  if(x==='res'){const L=byKey[b.dataset.k],r=X[L.key]||{},v=b.dataset.v,prevRes=r.res,bp=wegStat().pct;X[L.key]={...r,res:r.res===v?null:v,t:Date.now()};if(v==='no')delete X[L.key].grade;if(!('d' in X[L.key]))X[L.key].d=examOf(L);saveX();renderAll();resultFx(L,prevRes,bp);return}
  if(x==='ics'){const all=allExams().filter(e=>daysTo(e.d)>=-1);if(!all.length&&SET.oehOff){toast('Noch keine Termine eingetragen');return}
    const st=new Date().toISOString().replace(/[-:]/g,'').split('.')[0]+'Z',p2=n=>String(n).padStart(2,'0');
    const ev=all.map(e=>{const d=ymd(e.d).replace(/-/g,'');let s,en;
      if(e.r.time){const [h,mi]=e.r.time.split(':').map(Number);s=`DTSTART:${d}T${p2(h)}${p2(mi)}00`;const h2=new Date(e.d[0],e.d[1],e.d[2],h+1,mi);en=`DTEND:${h2.getFullYear()}${p2(h2.getMonth()+1)}${p2(h2.getDate())}T${p2(h2.getHours())}${p2(h2.getMinutes())}00`}
      else{const n=new Date(e.d[0],e.d[1],e.d[2]+1);s=`DTSTART;VALUE=DATE:${d}`;en=`DTEND;VALUE=DATE:${n.getFullYear()}${p2(n.getMonth()+1)}${p2(n.getDate())}`}
      return `BEGIN:VEVENT\r\nUID:${e.l.key}-${d}@psychologie-lernbox\r\nDTSTAMP:${st}\r\n${s}\r\n${en}\r\nSUMMARY:Prüfung: ${e.l.n}\r\nDESCRIPTION:${e.l.c} ${e.l.t} · Lernstart ${leadOf(e.l)} Tage vorher\r\nBEGIN:VALARM\r\nTRIGGER:-P${leadOf(e.l)}D\r\nACTION:DISPLAY\r\nDESCRIPTION:Lernstart: ${e.l.n}\r\nEND:VALARM\r\nEND:VEVENT`}).join('\r\n');
    const oi=oehInfo(),oo=SET.oehOff?'':[oi.cur,oi.next].filter(o=>o&&oehSt(o.key)!=='paid').map(o=>{const d=o.b.replace(/-/g,''),n=new Date(fDay(o.b).getTime()+864e5);return `BEGIN:VEVENT\r\nUID:oeh-${o.key}@psychologie-lernbox\r\nDTSTAMP:${st}\r\nDTSTART;VALUE=DATE:${d}\r\nDTEND;VALUE=DATE:${n.getFullYear()}${p2(n.getMonth()+1)}${p2(n.getDate())}\r\nSUMMARY:ÖH-Beitrag: letzter Tag (${uniTerm(o.key).label})\r\nDESCRIPTION:${OEH_EUR} € müssen bis heute am Konto der Uni Graz sein. Zahlungsdaten in UNIGRAZonline unter Studienbeitragsstatus.\r\nBEGIN:VALARM\r\nTRIGGER:-P7D\r\nACTION:DISPLAY\r\nDESCRIPTION:ÖH-Beitrag zahlen\r\nEND:VALARM\r\nEND:VEVENT`}).join('\r\n');
    const ics=`BEGIN:VCALENDAR\r\nVERSION:2.0\r\nPRODID:-//Psychologie Lernbox//DE\r\n${ev}${oo?'\r\n'+oo:''}\r\nEND:VCALENDAR\r\n`;const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([ics],{type:'text/calendar'}));a.download='pruefungen.ics';a.click();return}
  if(x==='rtab'){rTool=b.dataset.t;lbRender();return}
  if(x==='logout'&&window.acApi){window.acApi.logout();return}
  if(x==='login'&&window.acOpen){window.acOpen();return}
});
addEventListener('keydown',e=>{if(e.key==='Escape')closeDlg()});


/* ================== Bestanden-Feier, Nicht-bestanden-Plan, Weg zum Bachelor ================== */
function WEG(){return LV}
function wegStat(){const all=WEG(),done=all.filter(l=>(X[l.key]||{}).res==='ok'),tot=all.reduce((a,l)=>a+l.ec,0)||180,got=all.reduce((a,l)=>a+doneEcts(l),0);return{all,done,tot,got,pct:Math.min(1,got/tot)}}
const fmtE=n=>String(Math.round(n*10)/10).replace('.',',');
var MILES=[[.25,'Ein Viertel vom Berg geschafft! 🥾'],[.5,'Halbzeit am Berg – ab jetzt geht\'s Richtung Gipfel! ⛰️'],[.75,'Drei Viertel geschafft – der Gipfel ist schon in Sicht! 🏔️'],[1,'GIPFEL! Alle Lehrveranstaltungen geschafft – Bachelor in der Tasche! 🎓']];
function confetti(){if(matchMedia('(prefers-reduced-motion: reduce)').matches)return;const c=document.createElement('canvas');c.className='confetti';document.body.appendChild(c);const x=c.getContext('2d');
  const W=c.width=innerWidth*devicePixelRatio,H=c.height=innerHeight*devicePixelRatio,col=['#72CEF2','#FF8A73','#5FD39A','#FFD54A','#C9B8FF','#FFFFFF'];
  const P=[...Array(160)].map(()=>({x:W*(.2+.6*Math.random()),y:H*.35+Math.random()*H*.1,vx:(Math.random()-.5)*W*.018,vy:-(Math.random()*H*.022+H*.006),r:(4+Math.random()*6)*devicePixelRatio,c:col[Math.random()*col.length|0],a:Math.random()*6,va:(Math.random()-.5)*.3}));
  const t0=performance.now();(function f(t){x.clearRect(0,0,W,H);const k=(t-t0)/1000;P.forEach(p=>{p.vy+=H*.0009;p.vx*=.99;p.x+=p.vx;p.y+=p.vy;p.a+=p.va;x.save();x.translate(p.x,p.y);x.rotate(p.a);x.globalAlpha=Math.max(0,1-k/3.2);x.fillStyle=p.c;x.fillRect(-p.r/2,-p.r/4,p.r,p.r/2);x.restore()});if(k<3.3)requestAnimationFrame(f);else c.remove()})(t0)}
function lvPet(l){let p=null;try{p=JSON.parse(localStorage.getItem(l.key+'.pet')||'null')}catch(e){}if(p&&p.sp&&window.petSVG)return window.petSVG({sp:p.sp,mood:'yay',eq:Object.fromEntries(Object.entries(p.eq||{}).filter(([k,v])=>k!=='bg'&&v))});
  let a=null;try{a=JSON.parse(localStorage.getItem('lernbox.avatar')||'null')}catch(e){}if(a&&a.sp&&window.petSVG)return window.petSVG({sp:a.sp,mood:'yay'});return '<div style="font-size:4rem">🎉</div>'}
const YAY=['Mega, gratuliere! 🥳','Du hast es geschafft – sei stolz auf dich!','Wieder eine weniger. Weiter so! 💪','Das hast du dir verdient. Gönn dir was! 🍦','Zack, erledigt! ✨'];
function celebrate(l,before){const s=wegStat(),r=X[l.key]||{},mile=MILES.find(([p])=>before<p&&s.pct>=p);confetti();
  const d=dlg(`<div class="yay"><div class="ypet">${lvPet(l)}</div><p class="label">Bestanden</p><h3>${esc(l.n)}</h3><p class="ysub">${YAY[Math.random()*YAY.length|0]}</p>
    ${l.pm==='TU'||l.nx?'':r.grade?`<p class="ygr">Note <b>${r.grade}</b> · ${['','Sehr gut','Gut','Befriedigend','Genügend'][r.grade]||''}</p>`:`<p class="yq">Welche Note hast du bekommen?</p><div class="grade yg">${[1,2,3,4].map(n=>`<button type="button" data-yg="${n}" aria-pressed="${r.grade===n}">${n}</button>`).join('')}<button type="button" data-yg="" aria-pressed="${!r.grade}">weiß noch nicht</button></div>`}
    ${mile?`<div class="ymile">🏔️ <b>Meilenstein:</b> ${mile[1]}</div>`:''}
    <p class="yweg">Damit hast du <b>${fmtE(s.got)} von ${s.tot} ECTS</b> geschafft. <a href="noten.html#weg" data-weg="1">Dein Weg zum Bachelor →</a></p>
    <div class="row" style="justify-content:center"><button class="btn" data-x="close">Weiter</button></div></div>`);
  d.classList.add('yaydlg');
  d.addEventListener('click',e=>{const w=e.target.closest('[data-weg]');if(w){const el=document.getElementById('weg');closeDlg();if(el){e.preventDefault();el.scrollIntoView({behavior:'smooth',block:'center'})}return}const b=e.target.closest('[data-yg]');if(!b)return;const g=b.dataset.yg;const R={...(X[l.key]||{})};if(g){R.grade=+g;R.res='ok'}else delete R.grade;R.t=Date.now();X[l.key]=R;saveX();
    d.querySelectorAll('[data-yg]').forEach(x=>x.setAttribute('aria-pressed',x===b?'true':'false'));renderAll()})}
function retry(l){const r=X[l.key]||{},n=(r.tries||0)+1;
  const d=dlg(`<div class="yay"><div class="ypet" style="font-size:3.4rem">💛</div><p class="label">Nicht bestanden</p><h3>${esc(l.n)}</h3>
    <p class="ysub">Das passiert richtig vielen – und es sagt nichts darüber aus, wie gut du bist. Du hast jetzt schon Prüfungserfahrung in diesem Fach, beim nächsten Mal weißt du genau, was kommt.</p>
    <label>Wann trittst du wieder an?<input type="date" id="rD"></label>
    <p class="ysub" style="font-size:.88rem">${l.url?'Tipp: Im Lerntool unter Quiz → „Zuletzt falsch“ und in der Prüfungssimulation kannst du gezielt die Lücken schließen.':'Tipp: Schau dir an, welche Themen dich erwischt haben, und plan den Lernstart rechtzeitig ein.'}</p>
    <p class="saved" id="rS" aria-live="polite"></p>
    <div class="row"><button class="btn g" data-x="close">Weiß ich noch nicht</button><button class="btn" data-r="save">Termin eintragen</button></div></div>`);
  d.classList.add('yaydlg');
  d.querySelector('[data-r="save"]').onclick=()=>{const v=d.querySelector('#rD').value;if(!/^\d{4}-\d{2}-\d{2}$/.test(v)){d.querySelector('#rS').textContent='Bitte ein Datum wählen.';return}
    const [y,m,dd]=v.split('-').map(Number),R={...(X[l.key]||{})};R.prev=(R.prev||[]).concat([{d:R.d,res:'no'}]);R.tries=n;delete R.res;delete R.grade;R.d=[y,m-1,dd];R.t=Date.now();X[l.key]=R;saveX();renderAll();closeDlg();toast('📅 Neuer Termin eingetragen – du schaffst das!')}}
/* wird nach jeder Ergebnis-Änderung aufgerufen */
window.resultFx=(l,prev,beforePct)=>{const now=(X[l.key]||{}).res;if(now==='ok'&&prev!=='ok')setTimeout(()=>celebrate(l,beforePct),60);else if(now==='no'&&prev!=='no')setTimeout(()=>retry(l),60)};
/* Weg zum Bachelor (Notenplaner) – kleine Landschaft mit Wanderweg */
const WEG_TRAIL=[[70,388],[200,366],[330,354],[380,318],[480,292],[440,256],[548,226],[505,192],[588,164],[560,134],[604,108],[612,70]];
function crPath(P){let d=`M${P[0][0]} ${P[0][1]}`;for(let i=0;i<P.length-1;i++){const p0=P[i-1]||P[i],p1=P[i],p2=P[i+1],p3=P[i+2]||p2;
  d+=` C${(p1[0]+(p2[0]-p0[0])/6).toFixed(1)} ${(p1[1]+(p2[1]-p0[1])/6).toFixed(1)} ${(p2[0]-(p3[0]-p1[0])/6).toFixed(1)} ${(p2[1]-(p3[1]-p1[1])/6).toFixed(1)} ${p2[0]} ${p2[1]}`}return d}
const tree=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M0 -34 L11 -12 L6 -12 L14 2 L-14 2 L-6 -12 L-11 -12 Z" fill="#245E44" stroke="#F4FBF6" stroke-width="1.6" stroke-linejoin="round" paint-order="stroke"/><path d="M0 -34 L-11 -12 L-6 -12 L-14 2 L0 2 Z" fill="#3C8A62"/><rect x="-2" y="2" width="4" height="7" fill="#7A5A3A"/></g>`;

const bush=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><circle cx="-9" cy="-4" r="8" fill="#5DAE84"/><circle cx="0" cy="-9" r="10" fill="#6CBF92"/><circle cx="10" cy="-4" r="8" fill="#5DAE84"/></g>`;
const flower=(x,y,c)=>`<g transform="translate(${x} ${y})"><path d="M0 0 V-7" stroke="#4E9A70" stroke-width="1.2"/><circle cy="-8" r="2.6" fill="${c}"/><circle cy="-8" r="1" fill="#FFE38A"/></g>`;
const tuft=(x,y)=>`<path d="M${x-4} ${y} Q${x-3} ${y-7} ${x-1} ${y-9} M${x} ${y} Q${x} ${y-8} ${x+1} ${y-11} M${x+4} ${y} Q${x+3} ${y-6} ${x+5} ${y-8}" stroke="#4E9A70" stroke-width="1.3" fill="none" stroke-linecap="round"/>`;
const rock=(x,y,s)=>`<g transform="translate(${x} ${y}) scale(${s})"><path d="M-10 0 Q-9 -9 -1 -11 Q9 -10 11 0 Z" fill="#A9B6C0"/><path d="M-1 -11 Q9 -10 11 0 L4 0 Q5 -6 -1 -11 Z" fill="#8E9CA8"/></g>`;
const FLC=['#FF8A73','#FFFFFF','#C9B8FF','#FFD54A'];
const WEG_GROUND=`
    <path d="M0 400 L0 346 Q120 316 260 338 Q420 362 560 342 Q680 326 800 336 L800 400 Z" fill="#B5E5C8"/>
    <path d="M0 400 L0 362 Q150 336 320 356 T640 360 T800 352 L800 400 Z" fill="url(#wHill)"/>
    <path d="M0 400 L0 384 Q200 372 400 386 T800 380 L800 400 Z" fill="#5FB487" opacity=".55"/>
    ${tree(20,364,1.15)}${tree(46,374,.85)}${bush(66,396,.6)}
    ${tree(676,378,.8)}${tree(704,372,1.1)}${tree(738,380,.9)}${tree(768,370,1.15)}${tree(792,384,.75)}${bush(752,396,.7)}
    ${bush(392,390,.85)}${bush(616,394,.75)}
    <g transform="translate(502 388)"><ellipse rx="42" ry="9" fill="#7CC7E6"/><ellipse rx="42" ry="9" fill="none" stroke="#4FA77A" stroke-width="2"/><path d="M-24 -2 Q-12 -5 2 -2" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round" opacity=".8"/><path d="M14 2 Q22 0 30 2" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round" opacity=".6"/></g>
    ${rock(458,394,.75)}${rock(548,396,.6)}
    ${[[150,396],[180,391],[226,396],[262,391],[318,396],[348,390],[428,397],[582,397],[640,397],[96,394],[652,390]].map(([x,y],i)=>flower(x,y,FLC[i%4])).join('')}
    ${[[200,398],[288,398],[372,398],[420,394],[566,398],[600,392],[720,398],[118,398]].map(([x,y])=>tuft(x,y)).join('')}
    <g fill="none" stroke="#0A1428" stroke-width="1.4" stroke-linecap="round" opacity=".55"><path d="M300 92 q5 -5 10 0 q5 -5 10 0"/><path d="M332 108 q4 -4 8 0 q4 -4 8 0"/></g>`;
function renderWeg(){const el=document.getElementById('weg');if(!el)return;const s=wegStat(),N=Math.round(s.tot/2),k=s.pct*N,pct=Math.round(100*s.pct),next=MILES.find(([p])=>s.pct<p);
  let av=null;try{av=JSON.parse(localStorage.getItem('lernbox.avatar')||'null')}catch(e){}
  const D=crPath(WEG_TRAIL);
  el.innerHTML=`<div class="wegt"><p class="label">Dein Weg zum Bachelor</p><h2>${s.pct>=1?'Gipfel erreicht! 🎓':s.got?`${fmtE(s.got)} von ${s.tot} ECTS`:'Der Berg wartet auf dich'}</h2>
    <div class="wegbar"><i style="width:${pct}%"></i></div><p class="sub"><b>${pct} %</b> · ${s.done.length} LV${s.done.length===1?'':'s'} bestanden${s.pct>=1?' · Bachelor geschafft!':next?` · nächstes Ziel ${Math.round(next[0]*100)} %: noch ${fmtE(Math.max(0,next[0]*s.tot-s.got))} ECTS`:''}</p>
    <p class="sub sm">Jeder Punkt am Weg sind 2 ECTS – je größer die Lehrveranstaltung, desto größer dein Sprung bergauf.</p></div>
   <svg class="wegsvg" viewBox="0 0 800 400" preserveAspectRatio="xMidYMax slice" role="img" aria-label="${k} von ${N} Lehrveranstaltungen geschafft">
    <defs>
     <linearGradient id="wSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#A9DDF3"/><stop offset=".65" stop-color="#E4F5FB"/><stop offset="1" stop-color="#FFF3E2"/></linearGradient>
     <linearGradient id="wMain" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="#7DBBD6"/><stop offset="1" stop-color="#4F8FB0"/></linearGradient>
     <linearGradient id="wHill" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9FDCB9"/><stop offset="1" stop-color="#6FBF95"/></linearGradient>
     <radialGradient id="wSun"><stop offset="0" stop-color="#FFF6C9"/><stop offset=".45" stop-color="#FFE38A"/><stop offset="1" stop-color="#FFE38A" stop-opacity="0"/></radialGradient>
     <filter id="wSh" x="-50%" y="-50%" width="200%" height="200%"><feDropShadow dx="0" dy="3" stdDeviation="3" flood-color="#0A1428" flood-opacity=".25"/></filter>
    </defs>
    <rect width="800" height="400" fill="url(#wSky)"/>
    <circle cx="720" cy="70" r="70" fill="url(#wSun)"/><circle cx="720" cy="70" r="24" fill="#FFE38A"/>
    <g fill="#fff" opacity=".85"><ellipse cx="190" cy="70" rx="46" ry="14"/><ellipse cx="225" cy="60" rx="30" ry="14"/><ellipse cx="420" cy="48" rx="38" ry="11"/><ellipse cx="448" cy="40" rx="22" ry="10"/></g>
    <clipPath id="wRF"><path d="M612 62 L800 250 L800 400 L660 400 Z"/></clipPath>
    <path d="M0 400 L0 250 L90 190 L170 240 L280 150 L370 220 L450 170 L560 230 L660 160 L800 230 L800 400 Z" fill="#CBE7F2"/>
    <path d="M220 400 L612 62 L800 250 L800 400 Z" fill="url(#wMain)"/>
    <path d="M612 62 L800 250 L800 400 L660 400 Z" fill="#3F7D9E" opacity=".45"/>
    <path d="M612 62 L336 300 L336 294 L379 314 L422 294 L464 314 L507 294 L550 314 L593 294 L636 314 L679 294 L721 314 L764 294 L807 314 L850 294 L850 300 Z" fill="#fff" opacity=".05"/>
    <path d="M612 62 L415 232 L415 227 L452 244 L488 227 L525 244 L562 227 L598 244 L635 227 L672 244 L709 227 L745 244 L782 227 L782 232 Z" fill="#fff" opacity=".1"/>
    <path d="M612 62 L487 170 L487 166 L516 180 L545 166 L574 180 L603 166 L633 180 L662 166 L691 180 L720 166 L720 170 Z" fill="#fff" opacity=".24"/>
    <path d="M612 62 L547 118 L547 115 L567 126 L587 115 L608 126 L628 115 L648 126 L668 115 L668 118 Z" fill="#fff" opacity="1"/>
    <path d="M612 62 L547 118 L547 115 L567 126 L587 115 L608 126 L628 115 L648 126 L668 115 L668 118 Z" fill="#C6E0EC" clip-path="url(#wRF)"/>
    ${WEG_GROUND}
    <path id="wegp" d="${D}" fill="none" stroke="#fff" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity=".75"/>
    <path id="wegq" d="${D}" fill="none" stroke="#0A1428" stroke-width="2.2" stroke-linecap="round" stroke-dasharray="1 9" opacity=".45"/>
    <path id="wegdone" d="${D}" fill="none" stroke="#FF8A73" stroke-width="5" stroke-linecap="round" opacity=".9"/>
    <g id="wegdots"></g>
   </svg>`;
  /* Punkte, Fahnen und Wanderer entlang des Weges platzieren */
  const p=el.querySelector('#wegp'),L=p.getTotalLength(),at=i=>p.getPointAtLength(L*i/N);
  const dn=el.querySelector('#wegdone');dn.setAttribute('stroke-dasharray',`${L*s.pct} ${L}`);
  let h='';for(let i=1;i<=N;i++){const q=at(i),done=i<=k+1e-9;h+=`<circle cx="${q.x.toFixed(1)}" cy="${q.y.toFixed(1)}" r="${done?3.4:2.3}" fill="${done?'#FF8A73':'#fff'}" stroke="${done?'#fff':'#0A1428'}" stroke-width="${done?1.6:1}" opacity="${done?1:.65}"/>`}
  MILES.slice(0,3).forEach(([m])=>{const q=at(Math.round(m*N)),ok=s.pct>=m;h+=`<g transform="translate(${q.x.toFixed(1)} ${q.y.toFixed(1)})"><path d="M0 0 V-26" stroke="#0A1428" stroke-width="2"/><path d="M0 -26 L18 -20 L0 -14 Z" fill="${ok?'#FF8A73':'#fff'}" stroke="#0A1428" stroke-width="1.2"/><rect x="-16" y="-44" width="32" height="14" rx="7" fill="#0A1428" opacity=".8"/><text x="0" y="-34" text-anchor="middle" font-size="9.5" font-family="JetBrains Mono,monospace" fill="#fff">${m*100}%</text></g>`});
  const top=at(N);h+=`<g transform="translate(${top.x.toFixed(1)} ${top.y.toFixed(1)})"><path d="M0 0 V-36" stroke="#0A1428" stroke-width="2.4"/><path d="M0 -36 L24 -29 L0 -22 Z" fill="${s.pct>=1?'#FFD54A':'#fff'}" stroke="#0A1428" stroke-width="1.2"/><text x="-8" y="-42" font-size="20">🎓</text></g>`;
  const me=p.getPointAtLength(L*s.pct),pet=av&&av.sp&&window.petSVG?window.petSVG({sp:av.sp,mood:s.got?'yay':'content'}).replace('<svg ','<svg x="-30" y="-64" width="60" height="60" '):'<text x="0" y="-14" text-anchor="middle" font-size="30">🥾</text>';
  h+=`<g transform="translate(${me.x.toFixed(1)} ${me.y.toFixed(1)})" filter="url(#wSh)"><circle cx="0" cy="-34" r="31" fill="#fff"/>${pet}<g transform="translate(26 -66)"><rect x="-4" y="-14" width="44" height="22" rx="11" fill="#0A1428"/><text x="18" y="1" text-anchor="middle" font-size="11" font-weight="700" font-family="Instrument Sans,sans-serif" fill="#fff">${pct} %</text></g></g>`;
  el.querySelector('#wegdots').innerHTML=h}

/* ================== Fächer-Kacheln (Startseite) ================== */
function lvStatus(l){const r=X[l.key]||{};return r.res}
function renderFolderTiles(){const el=document.getElementById('folders');if(!el)return;
  const tot=LV.filter(l=>l.m!=='U').length, done=LV.filter(l=>lvStatus(l)==='ok').length,sb=document.getElementById('studbar');
  if(sb)sb.innerHTML=`<span>${done} von ${tot} Lehrveranstaltungen bestanden</span><span class="bar"><i style="width:${Math.round(100*done/tot)}%"></i></span>`;
  el.innerHTML=FOLDERS.map(f=>{const tools=f.lv.filter(l=>l.url).length,ok=f.lv.filter(l=>lvStatus(l)==='ok').length;
    const nx=f.lv.map(l=>({l,d:examOf(l)})).filter(x=>x.d&&daysTo(x.d)>=0).sort((a,b)=>D(a.d)-D(b.d))[0];
    return `<a class="folder" href="fach.html?f=${f.id}" style="--a:${f.a};--h:${f.h}"><span class="fc">${f.lv.length} ${f.lv.length===1?'Lehrveranstaltung':'Lehrveranstaltungen'}</span><span class="fn">${f.n}</span><span class="fx">${tools?`<span class="tl">${tools} Lerntool${tools>1?'s':''}</span>`:'<span>noch kein Lerntool</span>'}${nx?`<span>Prüfung ${dtxt(daysTo(nx.d))}</span>`:''}${ok?`<span>✓ ${ok} bestanden</span>`:''}</span></a>`}).join('');
}

/* ================== Fach-Seite ================== */
const FID=new URLSearchParams(location.search).get('f');
const FCUR=FOLDERS.find(f=>f.id===FID)||null;
function renderFach(){const head=document.getElementById('fhead');if(!head)return;
  const f=FCUR;
  if(!f){head.innerHTML=`<div class="wrap"><a class="crumb" href="index.html#faecher">← Alle Fächer</a><h1>Fach nicht gefunden</h1></div>`;return}
  document.title=f.n.replace(/­/g,'')+' · Psychologie Lernbox';
  head.style.setProperty('--a',f.a);head.style.setProperty('--h',f.h);document.body.style.setProperty('--a',f.a);document.body.style.setProperty('--h',f.h);
  const tools=f.lv.filter(l=>l.url).length,ok=f.lv.filter(l=>lvStatus(l)==='ok').length;
  head.innerHTML=`<div class="wrap"><a class="crumb" href="index.html#faecher">← Alle Fächer</a><h1>${f.n}</h1>
    <div class="stats"><span>${f.lv.length} ${f.lv.length===1?'Lehrveranstaltung':'Lehrveranstaltungen'}</span><span>${tools?tools+' Lerntool'+(tools>1?'s':''):'noch kein Lerntool'}</span>${ok?`<span>✓ ${ok} bestanden</span>`:''}</div></div>`;
  document.getElementById('lvs').innerHTML=f.lv.map(l=>{const d=examOf(l),r=X[l.key]||{},ts=toolStats(l),dd=d?daysTo(d):null;
    return `<div class="lv${l.url?' has':''}" style="--a:${f.a}"><span class="code">${esc(l.c)} · ${esc(MOD[l.m]||'')}</span><h4>${esc(l.n)}</h4>
     <div class="tags"><span class="chip">${esc(l.t)}</span>${l.pm?`<span class="chip pm-${l.pm}">${PMLBL[l.pm]}</span>`:''}${l.url?'<span class="chip hot">Lerntool</span>':''}${r.res==='ok'?`<span class="chip ok">✓ bestanden${r.grade?' · '+r.grade:''}</span>`:r.res==='no'?'<span class="chip no">nicht bestanden</span>':''}${d?`<span class="chip">📅 ${fmtD(d,{day:'2-digit',month:'2-digit',year:'2-digit'})}${dd>=0?' · '+dtxt(dd):''}</span>`:''}</div>
     <p class="ln">${esc(kindTxt(l))}</p>
     ${ts?`<div><p class="ln">${ts.ok} von ${ts.n} beantworteten Fragen zuletzt richtig</p><div class="bar"><i style="width:${Math.round(100*ts.ok/ts.n)}%"></i></div></div>`:''}
     <div class="row">${l.url?`<a class="open" href="${l.url}">Lerntool öffnen →</a><a class="ib" href="${l.url}#pdf" style="text-decoration:none" title="Alle Lernzettel als PDF speichern oder drucken">📄 Zusammenfassung</a>`:noExam(l)?`<span class="soon">Ohne Prüfung – kein Lerntool nötig</span>`:l.pm==='P'?`<span class="soon">Lerntool folgt, sobald es Unterlagen gibt</span>`:l.pm==='W'?`<span class="soon">Kein eigenes Lerntool – hängt vom gewählten Kurs ab</span>`:`<span class="soon">Kein Lerntool geplant – die Tests laufen in der LV</span>`}${noExam(l)?'':`<button class="ib" data-x="edit" data-k="${l.key}">${d?'✎ Termin':'＋ Termin'}</button>`}${!d||dd<0?`<button class="ib ${r.res==='ok'?'on':''}" data-x="res" data-v="ok" data-k="${l.key}">✓ Bestanden</button>`:''}</div></div>`}).join('');
  const ex=f.lv.map(l=>({l,d:examOf(l),r:X[l.key]||{}})).filter(x=>x.d).sort((a,b)=>D(a.d)-D(b.d));
  document.getElementById('fexams').innerHTML=`<p class="label">Deine Termine</p><h2>Prüfungen</h2>${ex.length?`<div class="mini">${ex.map(x=>`<a href="#" data-x="edit" data-k="${x.l.key}" style="--a:${f.a}"><i></i><span>${esc(x.l.n)}</span><small>${fmtD(x.d,{day:'numeric',month:'numeric',year:'2-digit'})} · ${dtxt(daysTo(x.d))}</small></a>`).join('')}</div>`:'<p>Du hast für dieses Fach noch keine Prüfung eingetragen.</p>'}<div style="margin-top:12px"><button class="btn" data-x="add" data-f="${f.id}">＋ Prüfung eintragen</button></div>`;
}

/* ================== Ranglisten ================== */
const medal=i=>i===0?'🥇':i===1?'🥈':i===2?'🥉':i+1;
const RT=LV.filter(l=>l.url);
let rTool=(FCUR&&FCUR.lv.find(l=>l.url)||RT[0]).key;
function boardHTML(rows,kind,empty){if(!rows)return '<div class="bempty">Rangliste gerade nicht erreichbar.</div>';if(!rows.length)return `<div class="bempty">${empty}</div>`;
  return (kind==='g'?'<div class="bhead"><span>#</span><span>Spitzname</span><span>Fächer · Ø richtig</span><span>Fragen</span></div>':'<div class="bhead"><span>#</span><span>Spitzname</span><span>Fragen</span><span>richtig</span></div>')+rows.map((r,i)=>`<div class="brow${r.is_me?' me':''}"><span class="p">${medal(i)}</span><span class="bn">${(window.acAvatar&&window.acAvatar(r.avatar,30))||'<span class="av avnone" style="width:30px;height:30px">'+esc((r.nickname||'?')[0].toUpperCase())+'</span>'}<span>${esc(r.nickname)}${r.is_me?' <small>du</small>':''}</span></span>${kind==='g'?`<span class="m">${r.faecher} ${r.faecher===1?'Fach':'Fächer'} · Ø ${r.score} %</span><span class="s">${Number(r.answered).toLocaleString('de-AT')}</span>`:`<span class="m">${r.answered} Fragen</span><span class="s">${r.score} %</span>`}</div>`).join('')}
function meCard(kind){const st=window.acState?window.acState():{};const p=st.profile||{},on=kind==='g'?p.show_general:p.show_on_board;
  if(!st.user)return `<h3>Mitmachen</h3><p>Leg einen Account an, wähl in den Einstellungen einen Spitznamen und schalte die Rangliste ein. Deine E-Mail sieht niemand.</p><div class="acts" style="margin-top:10px"><button class="btn" data-x="login">Anmelden</button><a class="btn g" href="einstellungen.html" style="text-decoration:none">Einstellungen</a></div>`;
  if(on&&p.nickname)return `<h3>Du bist dabei</h3><p>Du erscheinst als <b>${esc(p.nickname)}</b>. Dein Stand aktualisiert sich beim Lernen automatisch.</p><div style="margin-top:10px"><a class="btn g" href="einstellungen.html" style="text-decoration:none">Sichtbarkeit ändern</a></div>`;
  return `<h3>Du bist nicht sichtbar</h3><p>Du bist angemeldet, erscheinst aber nicht in ${kind==='g'?'der allgemeinen Rangliste':'den Fach-Ranglisten'}. Das kannst du in den Einstellungen ändern.</p><div style="margin-top:10px"><a class="btn" href="einstellungen.html" style="text-decoration:none">Zu den Einstellungen</a></div>`}
async function renderRanks(){
  const ready=window.acState&&window.acState().ready;
  /* Allgemeine Rangliste */
  const g=document.getElementById('gboard');
  if(g){document.getElementById('gme').innerHTML=meCard('g');g.innerHTML=ready?boardHTML(await window.lbFetchGeneral(),'g','Noch niemand in der Rangliste – sei die erste Person!'):'<div class="bempty">Wird geladen …</div>';
    const rf=document.getElementById('rfach');if(rf)rf.innerHTML=FOLDERS.filter(f=>f.lv.some(l=>l.url)).map(f=>`<a href="fach.html?f=${f.id}#rangliste" style="--a:${f.a}"><i></i><span>${f.n}</span><small>${f.lv.filter(l=>l.url).length} Lerntool${f.lv.filter(l=>l.url).length>1?'s':''} →</small></a>`).join('')}
  /* Teaser Startseite */
  const t=document.getElementById('top3');
  if(t){if(!ready){t.innerHTML='';}else{const rows=await window.lbFetchGeneral();t.innerHTML=rows&&rows.length?rows.slice(0,3).map((r,i)=>`<span>${medal(i)} ${(window.acAvatar&&window.acAvatar(r.avatar,22))||''} ${esc(r.nickname)} · ${Number(r.answered).toLocaleString('de-AT')} Fragen</span>`).join(''):'<span>Noch niemand dabei – sei die erste Person!</span>'}}
  /* Fach-Rangliste */
  const fb=document.getElementById('fboard');
  if(fb&&FCUR){const tl=FCUR.lv.filter(l=>l.url);document.getElementById('fme').innerHTML=tl.length?meCard('f'):'';
    if(!tl.length){document.getElementById('rtabs').innerHTML='';fb.innerHTML='<div class="bempty">Die Rangliste startet, sobald es für dieses Fach ein Lerntool gibt.</div>';return}
    document.getElementById('rtabs').innerHTML=tl.length>1?tl.map(l=>`<button data-x="rtab" data-t="${l.key}" aria-pressed="${l.key===rTool}">${esc(l.n)}</button>`).join(''):'';
    fb.innerHTML=ready?boardHTML(await window.lbFetch(rTool),'f','Noch niemand in dieser Rangliste – sei die erste Person!'):'<div class="bempty">Wird geladen …</div>'}
}


/* ================== Lerngruppen ================== */
let GR=null,GSEL=null,GTOOL=null,GLEAVE=false,GMODE='';
const GJOIN=(new URLSearchParams(location.search).get('gruppe')||'').toUpperCase().replace(/[^A-Z0-9]/g,'').slice(0,6);
async function loadGroups(){if(!window.acApi)return;const r=await window.acApi.rpc('my_groups');GR=r.data||[];if(!GSEL||!GR.some(g=>g.id===GSEL))GSEL=GR[0]&&GR[0].id||null}
async function renderGroups(reload){const el=document.getElementById('groups');if(!el)return;
  const st=window.acState?window.acState():{};
  if(!st.ready){el.innerHTML='<p class="label">Lerngruppen</p><h2>Deine Lerngruppen</h2><p>Wird geladen …</p>';return}
  if(!st.user){el.innerHTML=`<p class="label">Lerngruppen</p><h2>Lernt gemeinsam</h2><p>Mach eine Gruppe mit deinen Freund:innen auf und seht in einer eigenen Rangliste, wer am meisten lernt.${GJOIN?` Du wurdest in eine Gruppe eingeladen (Code <b>${esc(GJOIN)}</b>) – melde dich an, um beizutreten.`:''}</p><div style="margin-top:12px"><button class="btn" data-x="login">Anmelden, um mitzumachen</button></div>`;return}
  if(reload||GR===null)await loadGroups();
  const g=GR.find(x=>x.id===GSEL);
  const invite=GJOIN&&!GR.some(x=>x.code===GJOIN)?`<div class="ginv"><span>Du wurdest eingeladen: Gruppe mit Code <b>${esc(GJOIN)}</b></span><button class="btn" data-g="joinlink">Beitreten</button></div>`:'';
  const form=GMODE==='new'?`<div class="gform"><input type="text" id="gName" maxlength="40" placeholder="Name der Gruppe, z. B. Psycho-Crew"><button class="btn" data-g="create">Erstellen</button><button class="btn g" data-g="cancel">Abbrechen</button></div>`
    :GMODE==='join'?`<div class="gform"><input type="text" id="gCode" maxlength="6" placeholder="Code, z. B. K7M2QX" autocapitalize="characters" style="text-transform:uppercase;letter-spacing:.12em"><button class="btn" data-g="join">Beitreten</button><button class="btn g" data-g="cancel">Abbrechen</button></div>`:'';
  el.innerHTML=`<div class="ghead"><div><p class="label">Lerngruppen</p><h2>Deine Lerngruppen</h2></div><div class="acts"><button class="btn${GMODE==='new'?'':' g'}" data-g="new">＋ Gruppe erstellen</button><button class="btn${GMODE==='join'?'':' g'}" data-g="joinmode">Mit Code beitreten</button></div></div>
   ${invite}${form}<p class="saved" id="gMsg" aria-live="polite"></p>
   ${GR.length?`<div class="rtabs">${GR.map(x=>`<button data-gsel="${x.id}" aria-pressed="${x.id===GSEL}">${esc(x.name)} <small>${x.members}</small></button>`).join('')}</div>`:'<p>Du bist noch in keiner Gruppe. Erstell eine und schick den Code an deine Freund:innen – oder tritt mit einem Code bei.</p>'}
   ${g?`<div class="gbox"><div class="gmeta"><span>Code <b class="gcode">${esc(g.code)}</b></span><button class="ib" data-g="copy">🔗 Einladungslink kopieren</button>${(()=>{const w=wrapState();const k=w.open?w.open.key:w.past[0]&&w.past[0].key;return k?`<a class="ib" href="wrapped.html?gruppe=${g.id}&s=${k}" style="text-decoration:none">✨ Gruppen-Wrapped</a>`:''})()}<span class="gsp"></span>${GLEAVE?`<span>Wirklich verlassen?</span><button class="ib off" data-g="leave">Ja, verlassen</button><button class="ib" data-g="noleave">Nein</button>`:`<button class="ib" data-g="askleave">Gruppe verlassen</button>`}</div>
     <div class="rtabs"><button data-gtool="" aria-pressed="${!GTOOL}">Alle Fächer</button>${RT.map(l=>`<button data-gtool="${l.key}" aria-pressed="${GTOOL===l.key}">${esc(l.n)}</button>`).join('')}</div>
     <div class="board big" id="gboard2"><div class="bempty">Wird geladen …</div></div>
     <p class="ghint">${GTOOL?'Sortiert nach: Prozent der Fragen, die zuletzt richtig waren.':'Sortiert nach: beantwortete Fragen in allen Fächern.'} In Gruppen sehen dich alle Mitglieder – unabhängig von deinen Ranglisten-Einstellungen.</p></div>`:''}`;
  if(g){const r=await window.acApi.rpc('group_board',{p_group:g.id,p_tool:GTOOL});const b=document.getElementById('gboard2');if(b)b.innerHTML=boardHTML(r.data||null,GTOOL?'f':'g','Noch niemand hat gelernt.')}
}
const gmsg=(t,bad)=>{const e=document.getElementById('gMsg');if(e){e.textContent=t;e.style.color=bad?'var(--bad)':''}};
document.addEventListener('click',async e=>{const b=e.target.closest('[data-g],[data-gsel],[data-gtool]');if(!b||!document.getElementById('groups'))return;
  if(b.dataset.gsel){GSEL=b.dataset.gsel;GLEAVE=false;renderGroups();return}
  if(b.dataset.gtool!==undefined){GTOOL=b.dataset.gtool||null;renderGroups();return}
  const a=b.dataset.g;
  if(a==='new'){GMODE=GMODE==='new'?'':'new';await renderGroups();document.getElementById('gName')?.focus();return}
  if(a==='joinmode'){GMODE=GMODE==='join'?'':'join';await renderGroups();document.getElementById('gCode')?.focus();return}
  if(a==='cancel'){GMODE='';renderGroups();return}
  if(a==='create'){const n=(document.getElementById('gName').value||'').trim();if(n.length<2){gmsg('Der Name braucht mindestens 2 Zeichen.',true);return}
    if(window.lbNameOk&&!window.lbNameOk(n)){gmsg('Dieser Gruppenname geht leider nicht – bitte such dir einen anderen aus. 🙂',true);return}const r=await window.acApi.rpc('create_group',{p_name:n});if(r.error){gmsg(r.error,true);return}GMODE='';GSEL=r.data[0].id;await renderGroups(true);gmsg('✓ Gruppe erstellt – schick den Einladungslink an deine Freund:innen.');return}
  if(a==='join'||a==='joinlink'){const c=a==='join'?(document.getElementById('gCode').value||''):GJOIN;
    const r=await window.acApi.rpc('join_group',{p_code:c});if(r.error){gmsg(r.error,true);return}GMODE='';GSEL=r.data[0].id;if(a==='joinlink')history.replaceState(null,'',location.pathname);await renderGroups(true);gmsg('✓ Du bist jetzt in der Gruppe „'+r.data[0].name+'“.');return}
  if(a==='copy'){const g=GR.find(x=>x.id===GSEL);const url=location.origin+location.pathname+'?gruppe='+g.code;try{await navigator.clipboard.writeText(url);gmsg('✓ Link kopiert: '+url)}catch(err){gmsg('Link: '+url)}return}
  if(a==='askleave'){GLEAVE=true;renderGroups();return}
  if(a==='noleave'){GLEAVE=false;renderGroups();return}
  if(a==='leave'){const r=await window.acApi.rpc('leave_group',{p_group:GSEL});if(r.error){gmsg(r.error,true);return}GLEAVE=false;GSEL=null;await renderGroups(true);gmsg('Du hast die Gruppe verlassen.');return}
});
document.addEventListener('keydown',e=>{if(e.key!=='Enter')return;if(e.target.id==='gName')document.querySelector('[data-g="create"]')?.click();if(e.target.id==='gCode')document.querySelector('[data-g="join"]')?.click()});

/* ================== Einstellungen ================== */
function curAv(){const st=window.acState?window.acState():{};return (st.user&&st.profile&&st.profile.avatar)||(window.avLocal&&window.avLocal())||null}
function renderAvatar(){const el=document.getElementById('avpanel');if(!el||!window.acAvatar||!window.PET_SP)return;
  const a=curAv()||{},sp=window.PET_SP,u=(window.acState&&window.acState().user);
  el.innerHTML=`<p class="label">Profilbild</p><h2>Such dir ein Tier aus</h2>
   <div class="avtop">${a.sp?window.acAvatar(a,84):'<span class="av avnone" style="width:84px;height:84px">?</span>'}<div><b>${a.sp?esc(sp[a.sp].n):'Noch kein Profilbild'}</b><p>${u?'So siehst du oben im Konto-Knopf und in den Ranglisten aus.':'Wird gespeichert und mit Account in den Ranglisten angezeigt.'}</p>
   ${a.sp?`<div class="avmood">${window.AV_MOODS.map(([m,n])=>`<button data-avm="${m}" aria-pressed="${(a.m||'content')===m}">${window.acAvatar({sp:a.sp,m},28)}${n}</button>`).join('')}</div>`:''}</div></div>
   <div class="avgrid">${Object.keys(sp).map(k=>`<button data-avsp="${k}" aria-pressed="${a.sp===k}" title="${esc(sp[k].n)}">${window.acAvatar({sp:k,m:a.m||'content'},54)}<span>${esc(sp[k].n)}</span></button>`).join('')}</div>
   <div class="row" style="display:flex;justify-content:space-between;align-items:center;gap:10px;margin-top:12px;flex-wrap:wrap"><p class="saved" id="sAv" aria-live="polite"></p>${a.sp?'<button class="btn g" data-avsp="">Kein Profilbild</button>':''}</div>`}
async function setAv(a){try{localStorage.setItem('lernbox.avatar',JSON.stringify(a))}catch(e){}
  const st=window.acState?window.acState():{};let ok=true;
  if(st.user&&window.acApi){const r=await window.acApi.saveProfile({avatar:a});if(r.error){ok=false;flash('sAv',r.error,true)}}
  renderAvatar();if(ok)flash('sAv','✓ Automatisch gespeichert')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-avsp],[data-avm]');if(!b)return;const a=curAv()||{};
  if(b.dataset.avsp!==undefined){setAv(b.dataset.avsp?{sp:b.dataset.avsp,m:a.m||'content'}:null)}else{if(a.sp)setAv({sp:a.sp,m:b.dataset.avm})}});
function sw(id,on,dis){return `<label class="sw"><input type="checkbox" id="${id}" ${on?'checked':''} ${dis?'disabled':''}><span></span></label>`}
function renderSettings(){const el=document.getElementById('settings');if(!el)return;
  const st=window.acState?window.acState():{ready:false},u=st.user,p=st.profile||{};
  el.innerHTML=`
  <div class="panel"><p class="label">Account</p><h2>${u?'Angemeldet':'Nicht angemeldet'}</h2>
    ${u?`<div class="srow"><div class="t"><b>E-Mail</b><small>${esc(u.email)}</small></div><button class="btn g" data-x="logout">Abmelden</button></div>
    <div class="srow"><div class="t"><b>Passwort ändern</b><small>Mindestens 8 Zeichen</small></div><span class="acts"><input type="password" id="sPw" autocomplete="new-password" placeholder="Neues Passwort"><button class="btn g" data-x="setpw">Ändern</button></span></div>
    <p class="saved" id="sAcc" aria-live="polite"></p>`
    :`<p>Ohne Account bleibt alles nur in diesem Browser. Mit Account wird dein Fortschritt automatisch gespeichert – auf jedem Gerät – und du kannst bei den Ranglisten mitmachen.</p><div style="margin-top:12px"><button class="btn" data-x="login">Anmelden oder registrieren</button></div>`}
  </div>
  <div class="panel" id="avpanel"></div>
  <div class="panel" id="apppanel"></div>
  <div class="panel"><p class="label">Ranglisten</p><h2>Sichtbarkeit</h2>
    ${u?'':'<p class="lock">Melde dich an, um bei den Ranglisten mitzumachen.</p>'}
    <div class="srow"><div class="t"><b>Spitzname</b><small>So siehst du in den Ranglisten aus. Deine E-Mail sieht niemand.</small></div><input type="text" id="sNick" maxlength="24" value="${esc(p.nickname||'')}" ${u?'':'disabled'} placeholder="z. B. Lernmonster"></div>
    <div class="srow"><div class="t"><b>Allgemeine Rangliste</b><small>Wer am meisten lernt – gezählt werden alle beantworteten Fragen in allen Fächern.</small></div>${sw('sGen',p.show_general,!u)}</div>
    <div class="srow"><div class="t"><b>Fach-Ranglisten</b><small>Pro Fach: wie viel Prozent der Fragen du zuletzt richtig hattest.</small></div>${sw('sFach',p.show_on_board,!u)}</div>
    <p class="saved" id="sRank" aria-live="polite"></p>
  </div>
  <div class="panel"><p class="label">Prüfungskalender</p><h2>Lernen & Termine</h2>
    <div class="srow"><div class="t"><b>Lernstart für Vorlesungsprüfungen</b><small>Wie viele Tage vor einer Prüfung die Lernphase beginnt (pro Prüfung änderbar).</small></div><span class="acts"><input type="number" id="sLead" min="1" max="120" value="${+SET.lead||21}"> Tage</span></div>
    <div class="srow"><div class="t"><b>Termine in deinen Kalender</b><small>Alle eingetragenen Prüfungen als Kalenderdatei, mit Erinnerung zum Lernstart.</small></div><button class="btn g" data-x="ics">📅 Exportieren</button></div>
    <p class="saved" id="sCal" aria-live="polite"></p>
  </div>
  <div class="panel"><p class="label">Startseite</p><h2>Anzeige</h2>
    <div class="srow"><div class="t"><b>Wetter in Graz</b><small>Aktuelles Wetter in Graz (Quelle: Open-Meteo).</small></div>${sw('sWx',SET.weather!==false)}</div>
    <div class="srow"><div class="t"><b>Lerntipp aus der Psychologie</b><small>Jeden Tag ein anderer Tipp.</small></div>${sw('sTip',SET.tip!==false)}</div>
    <p class="saved" id="sHome" aria-live="polite"></p>
  </div>
  <div class="panel"><p class="label">Chat</p><h2>Benachrichtigungen</h2><div class="srow"><div class="t"><b>Pop-ups bei neuen Nachrichten</b><small>Kleine Meldung unten in der Ecke – auch im Lerntool. Einzelne Chats kannst du im Chat mit 🔔/🔕 stummschalten.</small></div>${sw('sNotif',!SET.notifOff)}</div></div>
  <div class="panel" id="oeh"><p class="label">ÖH-Beitrag</p><h2>Rückmeldung pro Semester</h2>${(()=>{const oi=oehInfo(),list=[oi.cur,oi.next].filter(Boolean);
    return `<p style="margin:0 0 8px">Jedes Semester ${OEH_EUR} € (ab WiSe 26/27). Das Geld muss bis zum Fristende <b>am Konto der Uni Graz</b> sein – Überweisungen brauchen ein paar Tage. Die Zahlungsdaten stehen in UNIGRAZonline unter „Studienbeitragsstatus“. Ohne Zahlung keine Rückmeldung zum Studium. <a href="https://studienabteilung.uni-graz.at/de/studienbeitrag/rueckmeldung-zum-studium-und-zur-zahlung/" target="_blank" rel="noopener">Infos der Uni Graz</a></p>
    ${list.map(o=>{const T=uniTerm(o.key),s=oehSt(o.key);return `<div class="srow"><div class="t"><b>${esc(T.long)}</b><small>Zahlen von ${fLong(o.a)} bis ${fLong(o.b)} ${o.b.slice(0,4)}${o===oi.cur?' · läuft gerade':''}</small></div><span class="gseg"><button data-oeh="open" data-k="${o.key}" aria-pressed="${s!=='paid'}">noch offen</button><button data-oeh="paid" data-k="${o.key}" aria-pressed="${s==='paid'}">✓ bezahlt</button></span></div>`}).join('')}
    <div class="srow"><div class="t"><b>Erinnerung</b><small>Frage oben auf der Seite und Frist im Kalender, solange der Zahlungszeitraum läuft.</small></div>${sw('sOeh',!SET.oehOff)}</div>`})()}
  </div>
  <div class="panel"><p class="label">Lern-Wrapped</p><h2>Deine Semester-Rückblicke</h2>${(()=>{const s=wrapState();return `${s.past.length?s.past.map(T=>`<div class="srow"><div class="t"><b>${esc(T.long)}</b><small>${s.open&&s.open.key===T.key?'✨ Gerade frisch – nur in den Semesterferien hervorgehoben':'Jederzeit wieder ansehen'}</small></div><a class="btn g" href="wrapped.html?s=${T.key}">Ansehen</a></div>`).join(''):''}<div class="srow"><div class="t"><b>${s.open?'Nächstes':'Als Nächstes'}: ${esc((s.open?uniTerm(s.open.key.startsWith('WS')?'SO'+(+s.open.key.slice(2)+1):'WS'+(+s.open.key.slice(2))):s.next).long)}</b><small>Erscheint mit Beginn der Ferien am ${(()=>{const T=s.open?uniTerm(s.open.key.startsWith('WS')?'SO'+(+s.open.key.slice(2)+1):'WS'+(+s.open.key.slice(2))):s.next,a=T.wrap[0].split('-');return new Date(+a[0],+a[1]-1,+a[2]).toLocaleDateString('de-AT',{day:'numeric',month:'long',year:'numeric'})})()}.</small></div><a class="btn g" href="wrapped.html?demo">Demo ansehen</a></div>`})()}
  </div>
  <div class="panel"><p class="label">Daten</p><h2>Deine Daten</h2>
    <p>${u?'Dein Fortschritt liegt in diesem Browser und in deinem Account. ':'Dein Fortschritt liegt nur in diesem Browser. '}Account löschen? Schreib an <a href="mailto:contact@maxedout.at">contact@maxedout.at</a>, dann wird alles entfernt. Mehr in der <a href="datenschutz.html">Datenschutzerklärung</a>.</p>
  </div>`;
  renderAvatar();if(window.appPanel)window.appPanel();
}
const flash=(id,t,bad)=>{const e=document.getElementById(id);if(!e)return;e.textContent=t;e.style.color=bad?'var(--bad)':'';};
let nickT=null;
async function saveRank(patch){if(!window.acApi)return;const r=await window.acApi.saveProfile(patch);if(r.error){flash('sRank',r.error,true);const st=window.acState(),p=st.profile||{};const g=document.getElementById('sGen'),f=document.getElementById('sFach');if(g)g.checked=!!p.show_general;if(f)f.checked=!!p.show_on_board}else flash('sRank','✓ Automatisch gespeichert')}
document.addEventListener('input',e=>{const id=e.target.id;
  if(id==='sNick'){clearTimeout(nickT);nickT=setTimeout(()=>saveRank({nickname:e.target.value}),700)}
  if(id==='sLead'){const v=Math.max(1,Math.min(120,+e.target.value||0));if(v){SET.lead=v;saveSet();flash('sCal','✓ Automatisch gespeichert')}}});
document.addEventListener('change',e=>{const id=e.target.id;
  if(id==='sNick'){clearTimeout(nickT);saveRank({nickname:e.target.value})}
  if(id==='sGen')saveRank({show_general:e.target.checked});
  if(id==='sNotif'){SET.notifOff=!e.target.checked;saveSet();flash('sHome','✓ Gespeichert')}
  if(id==='sOeh'){SET.oehOff=!e.target.checked;saveSet();renderAll()}
  if(id==='sFach')saveRank({show_on_board:e.target.checked});
  if(id==='sWx'){SET.weather=e.target.checked;saveSet();flash('sHome','✓ Automatisch gespeichert')}
  if(id==='sTip'){SET.tip=e.target.checked;saveSet();flash('sHome','✓ Automatisch gespeichert')}});
document.addEventListener('click',async e=>{const b=e.target.closest('[data-x="setpw"]');if(!b||!window.acApi)return;const r=await window.acApi.updatePassword(document.getElementById('sPw').value);flash('sAcc',r.error||'✓ Passwort geändert',!!r.error);if(r.ok)document.getElementById('sPw').value=''});



/* ================== Notenplaner ================== */
const GTXT={1:'Sehr gut',2:'Gut',3:'Befriedigend',4:'Genügend',5:'Nicht genügend'};
function setGrade(l,g){const r={...(X[l.key]||{})};if(g==null){delete r.grade;delete r.res}else if(g==='ok'){delete r.grade;r.res='ok'}else{r.grade=g;r.res=g===5?'no':'ok'}r.t=Date.now();X[l.key]=r;saveX()}
function notenStats(){const gr=LV.filter(l=>!l.nx&&l.pm!=='TU');
  const done=gr.filter(l=>(X[l.key]||{}).grade>=1&&(X[l.key]||{}).grade<=4);
  const passedAll=LV.filter(l=>l.m!=='U'&&(X[l.key]||{}).res==='ok').length;
  const useE=done.length&&done.every(l=>ectsOf(l)>0);
  const fg=fwfItems().filter(it=>it.g>=1&&it.g<=4&&+it.ec>0);
  const sumW=done.reduce((a,l)=>a+(useE?ectsOf(l):1),0)+fg.reduce((a,it)=>a+(useE?+it.ec:1),0),sumG=done.reduce((a,l)=>a+X[l.key].grade*(useE?ectsOf(l):1),0)+fg.reduce((a,it)=>a+it.g*(useE?+it.ec:1),0);
  const avg=sumW?sumG/sumW:null;
  const ects=LV.reduce((a,l)=>a+doneEcts(l),0);
  const open=gr.filter(l=>!((X[l.key]||{}).res==='ok'));
  return{gr,done,passedAll,avg,useE,ects,open,sumG,sumW,ectsOf}}
const fmtN=n=>n==null?'–':n.toFixed(2).replace('.',',');
function zielText(s){const tgt=+(SET.goal||0);if(!tgt)return 'Gib einen Wunsch-Schnitt ein, dann rechnet der Planer aus, was du in den restlichen Prüfungen brauchst (ohne ECTS-Gewichtung).';
  const rest=s.open.length;if(!rest)return 'Du hast schon alle benoteten Lehrveranstaltungen abgeschlossen.';
  const need=(tgt*(s.done.length+rest)-s.done.reduce((a,l)=>a+X[l.key].grade,0))/rest;
  return need<1?`Schwierig: Selbst mit lauter Einsern kommst du rechnerisch nicht ganz auf ${fmtN(tgt)}.`:need>=4?`Entspannt: Mit lauter Vierern landest du bei ${fmtN(tgt)} oder besser.`:`Für einen Schnitt von <b>${fmtN(tgt)}</b> brauchst du in den restlichen ${rest} Lehrveranstaltungen im Schnitt eine <b>${fmtN(need)}</b>.`}
function renderNotenTop(){const st=document.getElementById('nstats');if(!st)return;const s=notenStats();
  st.innerHTML=`
    <div class="nst"><span class="lb">Notenschnitt</span><b>${fmtN(s.avg)}</b><small>${s.sumW?`aus ${s.done.length+fwfItems().filter(it=>it.g>=1&&it.g<=4).length} Noten${s.useE?', nach ECTS gewichtet':''}`:'noch keine Note eingetragen'}</small></div>
    <div class="nst"><span class="lb">Bestanden</span><b>${s.passedAll}<em>/${LV.filter(l=>l.m!=='U').length}</em></b><small>Lehrveranstaltungen</small></div>
    <div class="nst"><span class="lb">ECTS</span><b>${s.ects}<em>/180</em></b><small>${s.ects?'geschafft – laut Curriculum vorausgefüllt':'ECTS sind laut Curriculum schon eingetragen'}</small></div>`;
  const z=document.getElementById('zres');if(z)z.innerHTML=zielText(s)}
function renderNoten(){const el=document.getElementById('noten');if(!el)return;
  const z=document.getElementById('nziel');
  if(!z.dataset.done){z.dataset.done=1;z.innerHTML=`<p class="label">Ziel-Rechner</p><h2>Welcher Schnitt soll's werden?</h2><div class="zrow"><label>Wunsch-Schnitt<input type="text" inputmode="decimal" id="nGoal" value="${SET.goal?String(SET.goal).replace('.',','):''}" placeholder="z. B. 2,0"></label></div><p class="zres" id="zres"></p>`}
  document.getElementById('nlist').innerHTML=FOLDERS.map(f=>`<div class="ngrp" style="--a:${f.a}"><h3><i></i>${f.n}</h3>${f.lv.map(l=>{const r=X[l.key]||{};if(l.c==='FWF')return fwfBlock(l);
    const ctl=(l.nx||l.pm==='TU')?`<div class="gseg"><button data-x="ng" data-k="${l.key}" data-g="" aria-pressed="${r.res!=='ok'}">offen</button><button data-x="ng" data-k="${l.key}" data-g="ok" aria-pressed="${r.res==='ok'}">✓ erledigt</button></div>`
      :`<div class="gseg"><button data-x="ng" data-k="${l.key}" data-g="" aria-pressed="${!r.grade}" title="noch offen">–</button>${[1,2,3,4,5].map(g=>`<button data-x="ng" data-k="${l.key}" data-g="${g}" aria-pressed="${r.grade===g}" title="${GTXT[g]}">${g}</button>`).join('')}</div>`;
    return `<div class="nrow${r.res==='ok'?' ok':r.res==='no'?' no':''}"><div class="nn"><span class="code">${esc(l.c)} · ${esc(l.t)}</span><b>${esc(l.n)}</b></div>${ctl}<label class="ects">${l.c==='FWF'?'erreicht':'ECTS'}<input type="text" inputmode="decimal" data-ects="${l.key}" value="${r.ects?String(r.ects).replace('.',','):''}" placeholder="${l.c==='FWF'?'0 / '+l.ec:l.ec||''}"></label></div>`}).join('')}</div>`).join('');
  renderNotenTop()}
document.addEventListener('click',e=>{const b=e.target.closest('[data-x="ng"]');if(!b)return;const l=byKey[b.dataset.k],v=b.dataset.g,prevRes=(X[l.key]||{}).res,bp=wegStat().pct;setGrade(l,v===''?null:v==='ok'?'ok':+v);renderNoten();renderWeg();resultFx(l,prevRes,bp);flash('nsave','✓ Automatisch gespeichert')});
document.addEventListener('input',e=>{const t=e.target;
  if(t.dataset&&t.dataset.ects){const l=byKey[t.dataset.ects],v=Math.max(0,Math.min(30,+String(t.value).replace(',','.')||0));const r={...(X[l.key]||{}),t:Date.now()};if(v)r.ects=v;else delete r.ects;X[l.key]=r;saveX();renderNotenTop();renderWeg();flash('nsave','✓ Automatisch gespeichert')}
  if(t.id==='nGoal'){const v=+String(t.value).replace(',','.');SET.goal=v>=1&&v<=4?v:0;saveSet();renderNotenTop()}});

/* Freie Wahlfächer: eigene Kurse eintragen */
function fwfBlock(l){const its=fwfItems(),got=doneEcts(l),sum=its.filter(fwfPassed).reduce((a,it)=>a+(+it.ec||0),0);
  return `<div class="nrow fwf"><div class="nn"><span class="code">FWF · frei wählbar</span><b>Freie Wahlfächer</b><small class="fwfs">${fmtE(sum)} von ${l.ec} ECTS geschafft${sum>l.ec?' – mehr als nötig, super!':''}</small></div>
   <div class="fwfl">${its.map(it=>`<div class="fwfi"><input class="fwn" data-fwf="n" data-i="${it.id}" value="${esc(it.n)}" placeholder="Name des Kurses" maxlength="80"><label class="ects">ECTS<input type="text" inputmode="decimal" data-fwf="ec" data-i="${it.id}" value="${it.ec?String(it.ec).replace('.',','):''}"></label>
     <select data-fwf="g" data-i="${it.id}"><option value="">offen</option>${[1,2,3,4,5].map(g=>`<option value="${g}" ${it.g===g?'selected':''}>${g} · ${GTXT[g]}</option>`).join('')}<option value="ok" ${it.g==='ok'?'selected':''}>✓ mit Erfolg</option></select>
     <button class="fwx" data-fwf="del" data-i="${it.id}" title="Entfernen" aria-label="Kurs entfernen">×</button></div>`).join('')}
   <div class="fwfi add"><input class="fwn" id="fwfN" placeholder="z. B. Spanisch A1, Basismodul Digitalisierung …" maxlength="80"><label class="ects">ECTS<input type="text" inputmode="decimal" id="fwfE" placeholder="z. B. 2"></label><button class="btn g" data-fwf="add">＋ Hinzufügen</button></div></div></div>`}
function fwfSave(items){X.lv_FWF={...(X.lv_FWF||{}),items,t:Date.now()};saveX();renderNotenTop();renderWeg();const s=document.querySelector('.fwfs');if(s){const l=byKey.lv_FWF,sum=items.filter(fwfPassed).reduce((a,it)=>a+(+it.ec||0),0);s.textContent=`${fmtE(sum)} von ${l.ec} ECTS geschafft${sum>l.ec?' – mehr als nötig, super!':''}`}flash('nsave','✓ Automatisch gespeichert')}
document.addEventListener('click',e=>{const b=e.target.closest('[data-fwf="add"],[data-fwf="del"]');if(!b)return;let its=fwfItems().slice();
  if(b.dataset.fwf==='add'){const n=document.getElementById('fwfN'),ec=document.getElementById('fwfE');const name=n.value.trim();if(!name){n.focus();return}
    its.push({id:Date.now().toString(36),n:name,ec:Math.max(0,Math.min(30,+String(ec.value).replace(',','.')||0)),g:''})}
  else its=its.filter(it=>it.id!==b.dataset.i);fwfSave(its);renderNoten()});
document.addEventListener('input',e=>{const t=e.target;if(!t.dataset||!t.dataset.fwf||t.dataset.fwf==='g')return;const its=fwfItems().map(it=>({...it}));const it=its.find(x=>x.id===t.dataset.i);if(!it)return;
  if(t.dataset.fwf==='n')it.n=t.value.slice(0,80);if(t.dataset.fwf==='ec')it.ec=Math.max(0,Math.min(30,+String(t.value).replace(',','.')||0));fwfSave(its)});
document.addEventListener('change',e=>{const t=e.target;if(!t.dataset||t.dataset.fwf!=='g')return;const its=fwfItems().map(it=>({...it}));const it=its.find(x=>x.id===t.dataset.i);if(!it)return;
  const before=fwfPassed(it),bp=wegStat().pct;it.g=t.value===''?'':t.value==='ok'?'ok':+t.value;fwfSave(its);
  if(!before&&fwfPassed(it)){confetti();toast('🎉 '+it.n+' geschafft – +'+fmtE(+it.ec||0)+' ECTS!');const m=MILES.find(([p])=>bp<p&&wegStat().pct>=p);if(m)setTimeout(()=>toast('🏔️ '+m[1]),2300)}});

/* ================== Feedback ================== */
const FB_MAIL='contact@maxedout.at';
function feedbackDlg(){const st=window.acState?window.acState():{},u=st.user;
  const opts=['<option value="">– kein bestimmtes –</option>',...FOLDERS.map(f=>`<optgroup label="${esc(f.n.replace(/­/g,''))}">${f.lv.map(l=>`<option>${esc(l.n)}</option>`).join('')}</optgroup>`)].join('');
  const dd=dlg(`<h3>Feedback</h3><p>Fehler gefunden, Idee oder Wunsch? Schreib's hier rein – es landet direkt bei mir.</p>
    <label>Worum geht's?<select id="fbK"><option>Fehler in einer Frage oder Lösung</option><option>Fehler auf der Website</option><option>Idee oder Wunsch</option><option>Sonstiges</option></select></label>
    <label>Fach (optional)<select id="fbF">${opts}</select></label>
    <label>Nachricht<textarea id="fbM" rows="6" maxlength="4000" placeholder="z. B. Sozial I, Quizfrage zu Heuristiken: Antwort B müsste eigentlich richtig sein, weil …" style="font:inherit;padding:10px 12px;border:1.5px solid var(--line);border-radius:10px;background:var(--paper);color:var(--ink);resize:vertical;width:100%"></textarea></label>
    <label>Deine E-Mail für eine Antwort (optional)<input type="email" id="fbC" value="${u?esc(u.email):''}" placeholder="name@beispiel.at"></label>
    <p class="saved" id="fbS" aria-live="polite"></p>
    <div class="row"><span style="font-size:.8rem;color:var(--muted);align-self:center">Mehr in der <a href="datenschutz.html">Datenschutzerklärung</a></span><button class="btn" data-x="fbsend">Abschicken</button></div>`);
  if(FCUR){const sel=dd.querySelector('#fbF');const first=FCUR.lv[0];if(first)sel.value=first.n}
  setTimeout(()=>dd.querySelector('#fbM').focus(),50);
}
async function feedbackSend(btn){const m=document.getElementById('fbM').value.trim(),s=document.getElementById('fbS');
  if(m.length<3){s.style.color='var(--bad)';s.textContent='Bitte schreib kurz, worum es geht.';return}
  const row={kind:document.getElementById('fbK').value,fach:document.getElementById('fbF').value||null,page:location.pathname.split('/').pop()+location.search,message:m,contact:document.getElementById('fbC').value.trim()||null};
  btn.disabled=true;s.style.color='';s.textContent='Wird gesendet …';
  let ok=false;
  try{const r=await (window.acApi?window.acApi.sendFeedback(row):Promise.resolve({error:1}));ok=!!r.ok}catch(e){}
  try{const r=await fetch('https://formsubmit.co/ajax/'+FB_MAIL,{method:'POST',headers:{'Content-Type':'application/json',Accept:'application/json'},body:JSON.stringify({_subject:'Lernbox-Feedback: '+row.kind,_template:'table',_captcha:'false',Art:row.kind,Fach:row.fach||'–',Seite:row.page,Nachricht:row.message,Kontakt:row.contact||'–',_replyto:row.contact||undefined})});if(r.ok)ok=true}catch(e){}
  if(ok){document.querySelector('.dlg').innerHTML=`<button class="x" data-x="close">×</button><h3>Danke! 💙</h3><p>Dein Feedback ist angekommen. ${row.contact?'Wenn eine Antwort nötig ist, kommt sie an deine E-Mail.':''}</p><div class="row"><span></span><button class="btn" data-x="close">Schließen</button></div>`}
  else{btn.disabled=false;s.style.color='var(--bad)';s.textContent='Hat leider nicht geklappt. Prüf deine Internetverbindung oder schreib direkt an '+FB_MAIL+'.'}}
document.addEventListener('click',e=>{const b=e.target.closest('[data-x="feedback"],[data-x="fbsend"]');if(!b)return;e.preventDefault();if(b.dataset.x==='feedback')feedbackDlg();else feedbackSend(b)});
/* ================== Kopf- und Fußzeile, Start ================== */
(function(){const page=document.body.dataset.page||'';const cur=p=>page===p?' aria-current="page"':'';
  let h=document.querySelector('header.topbar');if(!h){h=document.createElement('header');h.className='topbar';
  h.innerHTML=`<div class="wrap navin"><a class="logo" href="index.html"><img class="lmark" src="icon-192.png" alt="" width="28" height="28">Psychologie<span>Lernbox</span></a><nav class="links" aria-label="Hauptnavigation"><a href="index.html"${cur('start')}>Start</a><a href="index.html#pruefungen">Prüfungen</a><a href="index.html#faecher"${cur('fach')}>Fächer</a><a href="noten.html"${cur('noten')}>Noten</a><a href="rangliste.html"${cur('rang')}>Rangliste</a><a href="gruppen.html"${cur('soc')}>Freunde<i class="navb" id="navsoc" hidden></i></a></nav><div class="topr"><a class="gear" href="einstellungen.html" title="Einstellungen" aria-label="Einstellungen"${cur('set')}>⚙︎</a></div></div>`;
  document.body.prepend(h)}const ob=document.createElement('div');ob.id='oehbar';ob.hidden=true;ob.setAttribute('role','status');h.appendChild(ob);
  const f=document.createElement('footer');f.innerHTML=`<div class="wrap"><span>Psychologie Lernbox · Uni Graz · keine offizielle Seite der Universität</span><nav><a href="#" data-x="feedback">Feedback</a><a href="#" data-x="app">📱 App</a><a href="einstellungen.html">Einstellungen</a><a href="impressum.html">Impressum</a><a href="datenschutz.html">Datenschutz</a></nav></div>`;document.body.appendChild(f);
})();
let lastUid='-';
window.lbRender=()=>{renderRanks();const st=window.acState?window.acState():{};const uid=(st.user&&st.user.id||'')+'|'+(st.ready?1:0);if(uid!==lastUid){lastUid=uid;renderSettings();GR=null;renderGroups()}};
/* ÖH-Beitrag: Leiste oben, nur in der Zahlungsfrist */
const OEHDEMO=/[?&]oehvorschau/.test(location.search);let oehDemoSt='';
function renderOeh(){const el=document.getElementById('oehbar');if(!el||el.dataset.busy)return;const o=OEHDEMO?oehInfo().next:oehInfo().cur;
  if(!o||(SET.oehOff&&!OEHDEMO)){el.hidden=true;return}const st=OEHDEMO?oehDemoSt:oehSt(o.key),T=uniTerm(o.key),dl=Math.round((fDay(o.b)-today)/864e5);
  if(st==='paid'||(st==='open'&&dl>14)){el.hidden=true;return}
  el.hidden=false;el.className='oehbar'+(st==='open'?' late':'');
  el.innerHTML=`<div class="wrap"><span class="oi">💸</span><span class="ot">${st==='open'?`<b>Noch ${dl===0?'heute':dl+(dl===1?' Tag':' Tage')}:</b> ÖH-Beitrag fürs ${esc(T.label)} zahlen – ${OEH_EUR} € bis ${fLong(o.b)}.`:`<b>Hast du deinen ÖH-Beitrag fürs ${esc(T.label)} schon bezahlt?</b> ${OEH_EUR} € · Frist ${fLong(o.b)}`}</span><span class="ob"><button data-oeh="paid" data-k="${o.key}">${st==='open'?'Jetzt erledigt ✓':'Ja ✓'}</button>${st==='open'?'':`<button class="g" data-oeh="open" data-k="${o.key}">Nein, noch nicht</button>`}</span></div>`}
document.addEventListener('click',e=>{const b=e.target.closest('[data-oeh]');if(!b)return;const v=b.dataset.oeh,k=b.dataset.k,el=document.getElementById('oehbar');if(OEHDEMO&&b.closest('#oehbar')){oehDemoSt=v==='open'?'':''}else oehSet(k,v);
  if(el&&!el.hidden&&b.closest('#oehbar')){const T=uniTerm(k);el.dataset.busy=1;el.className='oehbar done';
    el.innerHTML=`<div class="wrap"><span class="oi">${v==='paid'?'🎉':'📅'}</span><span class="ot">${v==='paid'?`<b>Super, erledigt!</b> Du bist fürs ${esc(T.label)} rückgemeldet – jetzt kann's weitergehen. 💪`:`<b>Alles klar!</b> Die Frist (${fLong(oehTerm(k).b)}) steht im Kalender – 2 Wochen vorher erinnere ich dich hier nochmal.`}</span></div>`;
    setTimeout(()=>{el.classList.add('bye');setTimeout(()=>{delete el.dataset.busy;renderAll()},600)},3200)}else renderAll()});
/* Lern-Wrapped: Banner nur in den Semesterferien (Uni-Graz-Termine in UNI) */
function renderWrapBan(){const hc=document.querySelector('.hcards');if(!hc)return;let b=document.getElementById('wrapban');const o=wrapState().open;
  if(!o){b&&b.remove();return}
  if(!b){b=document.createElement('a');b.id='wrapban';b.className='wrapban';b.href='wrapped.html';hc.prepend(b)}
  b.innerHTML=`<span class="wbk">✨ Nur in den Semesterferien</span><b>Dein Lern-Wrapped ${o.label} ist da!</b><small>Dein Semester in Zahlen – jetzt ansehen →</small>`}
/* Nächste Ferien unter dem Kalender */
function renderFerien(){const el=document.getElementById('ferien');if(!el)return;const k=ukey(today);const nx=UNI.frei.filter(f=>(f.b||f.a)>=k&&f.n!=='Tag des Rektors').slice(0,2);
  const f=d=>{const a=d.split('-');return new Date(+a[0],+a[1]-1,+a[2]).toLocaleDateString('de-AT',{day:'numeric',month:'short'})};
  el.innerHTML=nx.length?'🏖 '+nx.map(x=>`<b>${esc(x.n)}</b> ${k>=x.a?'jetzt bis '+f(x.b||x.a):f(x.a)+(x.b?' – '+f(x.b):'')}`).join(' · '):''}
function renderAll(){renderExams();renderFolderTiles();renderFach();renderTip();renderSettings();renderNoten();renderWrapBan();renderFerien();renderOeh();renderWeg()}
renderAll();loadWeather();renderRanks();renderGroups();

/* ================== Freunde & Gruppen (Chat) ================== */
const SOC=window.SOC={sel:null,tab:'chat',friends:[],groups:[],gun:{},code:'',msgs:[],last:0,reply:null,timer:null,busy:false};
const rpc=(f,a)=>window.acApi?window.acApi.rpc(f,a||{}):Promise.resolve({error:'login'});
const avHTML=(a,cls)=>`<span class="sav ${cls||''}">${a&&a.sp&&window.petSVG?window.petSVG({sp:a.sp,mood:a.m||'content'}):'🙂'}</span>`;
const tShort=d=>{const x=new Date(d),n=new Date();return x.toDateString()===n.toDateString()?x.toLocaleTimeString('de-AT',{hour:'2-digit',minute:'2-digit'}):x.toLocaleDateString('de-AT',{day:'numeric',month:'numeric'})+' '+x.toLocaleTimeString('de-AT',{hour:'2-digit',minute:'2-digit'})};
const refLink=r=>{const l=LV.find(x=>x.key===r.tool);if(!l||!l.url)return null;return l.url+(r.type==='q'?'#frage='+encodeURIComponent(r.id):'#abschnitt='+r.ch+','+r.si)};
const refCard=(r,mid)=>{if(!r)return'';if(r.o||r.b){const l=LV.find(x=>x.key===r.tool);return `<button class="sref" data-s="openref" data-i="${mid}"><span>${r.type==='q'?'❓ Quizfrage':'📄 Lernzettel'} · ${esc(l?l.n:r.tool)} · antippen zum Ansehen</span><b>${esc(String(r.text||'').slice(0,180))}</b></button>`}const href=refLink(r),l=LV.find(x=>x.key===r.tool);return `<a class="sref" ${href?`href="${href}"`:''}><span>${r.type==='q'?'❓ Quizfrage':'📄 Lernzettel'} · ${esc(l?l.n:r.tool)}</span><b>${esc(String(r.text||'').slice(0,180))}</b></a>`};
async function socLoad(){const st=window.acState?window.acState():{};if(!st.user)return false;
  const [f,g,u,c]=await Promise.all([rpc('my_friends'),rpc('my_groups'),rpc('group_unread'),SOC.code?Promise.resolve({data:SOC.code}):rpc('my_friend_code')]);
  if(f.error&&g.error)return false;
  SOC.friends=f.data||[];SOC.groups=g.data||[];SOC.gun=Object.fromEntries((u.data||[]).map(x=>[x.group_id,x.unread]));if(c.data)SOC.code=c.data;socSave(st.user.id);return true}
/* Zwischenspeicher im Browser: Liste sofort zeigen, im Hintergrund aktualisieren */
const SOCK='lernbox.soc';
function socSave(uid){try{localStorage.setItem(SOCK,JSON.stringify({uid,friends:SOC.friends,groups:SOC.groups,gun:SOC.gun,code:SOC.code}))}catch(e){}}
function socCached(uid){try{const c=JSON.parse(localStorage.getItem(SOCK)||'null');if(!c||(uid&&c.uid!==uid))return false;SOC.friends=c.friends||[];SOC.groups=c.groups||[];SOC.gun=c.gun||{};SOC.code=c.code||'';return true}catch(e){return false}}
function socForget(){try{localStorage.removeItem(SOCK)}catch(e){}}
function socUnreadTotal(){return SOC.friends.filter(f=>f.status==='accepted').reduce((a,f)=>a+(f.unread||0),0)+Object.values(SOC.gun).reduce((a,b)=>a+b,0)+SOC.friends.filter(f=>f.incoming).length}
function navBadge(){const b=document.getElementById('navsoc');if(!b)return;const n=socUnreadTotal();b.textContent=n>9?'9+':n;b.hidden=!n}
window.socOpenChat=chat=>{if(chat.startsWith('g:'))SOC.sel={gid:chat.slice(2),chat};else{const f=SOC.friends.find(x=>x.chat===chat);if(!f)return;SOC.sel={fid:f.id,chat}}SOC.tab='chat';SOC.reply=null;socRender()};
const muted=c=>!!((SET.mute||{})[c]);
async function socRender(noMain){const side=document.getElementById('socside'),main=document.getElementById('socmain');if(!side)return;
  const st=window.acState?window.acState():{};
  if(!st.ready){if(!side.dataset.drawn&&socCached()){socDraw(noMain);navBadge()}else if(!side.dataset.drawn)side.innerHTML='<p class="sm">Wird geladen …</p>';return}
  if(!st.user){socForget();delete side.dataset.drawn;side.innerHTML='';main.innerHTML=`<div class="sempty"><div class="sbig">👯</div><h2>Lernt gemeinsam</h2><p>Vernetz dich mit deinen Freund:innen, schreib ihnen direkt aus dem Lerntool und macht Lerngruppen mit eigenem Chat und Rangliste.</p><button class="btn" data-x="login">Anmelden, um mitzumachen</button></div>`;return}
  let fromCache=false;
  if(!side.dataset.drawn&&socCached(st.user.id)){socDraw(noMain);navBadge();fromCache=true}
  const ok=await socLoad();navBadge();
  if(!ok&&side.dataset.drawn)return;
  socDraw(noMain||fromCache)}
function socDraw(noMain){const side=document.getElementById('socside');if(!side)return;side.dataset.drawn=1;
  const inc=SOC.friends.filter(f=>f.incoming),out=SOC.friends.filter(f=>f.status==='pending'&&!f.incoming),fr=SOC.friends.filter(f=>f.status==='accepted'),bl=SOC.friends.filter(f=>f.status==='blocked');
  const link=location.origin+location.pathname.replace(/[^/]*$/,'')+'gruppen.html?freund='+SOC.code;
  side.innerHTML=`<div class="sbox"><p class="label">Dein Freundescode</p><div class="scode"><b>${esc(SOC.code)}</b><button class="ib" data-s="copyf" data-l="${esc(link)}">🔗 Link kopieren</button></div>
     <div class="sadd"><input id="sfc" maxlength="6" placeholder="Code von Freund:in" autocomplete="off"><button class="btn g" data-s="addf">Hinzufügen</button></div><p class="smsg" id="sfmsg"></p></div>
    ${inc.length?`<div class="sbox"><p class="label">Anfragen</p>${inc.map(f=>`<div class="srow2">${avHTML(f.avatar)}<span class="sn">${esc(f.nickname)}</span><button class="ib on" data-s="acc" data-i="${f.id}">Annehmen</button><button class="ib" data-s="rem" data-i="${f.id}">✕</button></div>`).join('')}</div>`:''}
    <div class="sbox"><p class="label">Freunde</p>${fr.length?fr.map(f=>`<button class="sitem${SOC.sel&&SOC.sel.chat===f.chat?' on':''}" data-s="openf" data-i="${f.id}">${avHTML(f.avatar)}<span class="sn">${esc(f.nickname)}</span>${muted(f.chat)?'<span class="smute" title="Stumm">🔕</span>':''}${f.unread?`<i class="sbadge">${f.unread}</i>`:''}</button>`).join(''):'<p class="sm">Noch keine Freunde – schick deinen Code oder Link her! 🙂</p>'}
      ${out.map(f=>`<div class="srow2 dim">${avHTML(f.avatar)}<span class="sn">${esc(f.nickname)}</span><small>wartet …</small><button class="ib" data-s="rem" data-i="${f.id}" title="Anfrage zurückziehen">✕</button></div>`).join('')}</div>
    <div class="sbox"><p class="label">Gruppen</p>${SOC.groups.map(g=>`<button class="sitem${SOC.sel&&SOC.sel.gid===g.id?' on':''}" data-s="openg" data-i="${g.id}"><span class="sav sg">👥</span><span class="sn">${esc(g.name)}<small>${g.members} Mitglied${g.members===1?'':'er'}</small></span>${muted('g:'+g.id)?'<span class="smute" title="Stumm">🔕</span>':''}${SOC.gun[g.id]?`<i class="sbadge">${SOC.gun[g.id]}</i>`:''}</button>`).join('')||'<p class="sm">Noch keine Gruppe.</p>'}
      <div class="sadd"><input id="sgn" maxlength="40" placeholder="Name der neuen Gruppe"><button class="btn g" data-s="newg">Erstellen</button></div>
      <div class="sadd"><input id="sgc" maxlength="6" placeholder="Gruppen-Code"><button class="btn g" data-s="joing">Beitreten</button></div><p class="smsg" id="sgmsg"></p></div>
    ${bl.length?`<details class="sbox"><summary class="label">Blockiert (${bl.length})</summary>${bl.map(f=>`<div class="srow2">${avHTML(f.avatar)}<span class="sn">${esc(f.nickname)}</span><button class="ib" data-s="unbl" data-i="${f.id}">Entsperren</button></div>`).join('')}</details>`:''}`;
  if(!noMain)socMain()}
function socMain(){const main=document.getElementById('socmain');if(!main)return;const s=SOC.sel;
  if(!s){main.innerHTML=`<div class="sempty"><div class="sbig">💬</div><h2>Wähl links eine Person oder Gruppe</h2><p>Tipp: Im Lerntool kannst du bei jeder Quizfrage und jedem Lernzettel-Abschnitt auf „💬 Fragen“ drücken – die Stelle wird automatisch mitgeschickt.</p></div>`;return}
  const g=s.gid?SOC.groups.find(x=>x.id===s.gid):null,f=s.fid?SOC.friends.find(x=>x.id===s.fid):null;
  const head=g?`<div class="shead"><span class="sav sg">👥</span><div><b>${esc(g.name)}</b><small>Code <b>${esc(g.code)}</b> · ${g.members} Mitglieder</small></div><span class="sgap"></span><button class="ib" data-s="mute">${muted(s.chat)?'🔕 Stumm':'🔔 Ton an'}</button><button class="ib" data-s="copyg" data-l="${esc(location.origin+location.pathname.replace(/[^/]*$/,'')+'gruppen.html?gruppe='+g.code)}">🔗 Einladen</button><button class="ib" data-s="leaveg">Verlassen</button></div>
    <div class="stabs">${[['chat','💬 Chat'],['rang','🏆 Rangliste'],['wrap','✨ Wrapped']].map(([k,n])=>`<button data-s="tab" data-t="${k}" aria-pressed="${SOC.tab===k}">${n}</button>`).join('')}</div>`
    :f?`<div class="shead">${avHTML(f.avatar)}<div><b>${esc(f.nickname)}</b><small>Privater Chat</small></div><span class="sgap"></span><button class="ib" data-s="mute">${muted(s.chat)?'🔕 Stumm':'🔔 Ton an'}</button><button class="ib" data-s="rem" data-i="${f.id}">Entfernen</button><button class="ib" data-s="block" data-i="${f.id}">Blockieren</button></div>`:'';
  if(g&&SOC.tab==='rang'){main.innerHTML=head+'<div class="sbody" id="srang"><p class="sm">Wird geladen …</p></div>';groupRang(g.id);return}
  if(g&&SOC.tab==='wrap'){const w=wrapState(),k=w.open?w.open.key:w.past[0]&&w.past[0].key;main.innerHTML=head+`<div class="sbody sempty"><div class="sbig">✨</div><h2>Gruppen-Wrapped</h2><p>${k?'Euer Semester als Gruppe – jede Person bekommt einen Award.':'Kommt in den Semesterferien! Bis dahin: ansehen, wie es ausschaut.'}</p><a class="btn" href="wrapped.html?gruppe=${k?g.id+'&s='+k:'demo&demo'}">${k?'Ansehen':'Demo ansehen'}</a></div>`;return}
  main.innerHTML=head+`<div class="smsgs" id="smsgs"><p class="sm">Wird geladen …</p></div>
    <div class="scomp">${SOC.reply?`<div class="sreply">↩ Antwort auf: ${esc((SOC.msgs.find(m=>m.id===SOC.reply)||{}).body||'').slice(0,80)}<button class="ib" data-s="noreply">✕</button></div>`:''}<textarea id="stxt" rows="1" maxlength="2000" placeholder="Nachricht schreiben …"></textarea><button class="btn" data-s="send">Senden</button></div>`;
  const ta=main.querySelector('#stxt');ta.addEventListener('keydown',e=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();socSend()}});
  ta.addEventListener('input',()=>{ta.style.height='auto';ta.style.height=Math.min(140,ta.scrollHeight)+'px'});
  SOC.msgs=[];SOC.last=0;socPull(true)}
function msgHTML(m,isG){if(m.deleted)return `<div class="smsg2 ${m.is_me?'me':''}"><div class="sbub del">Nachricht gelöscht</div></div>`;
  const rp=m.reply_to?SOC.msgs.find(x=>x.id===m.reply_to):null;
  return `<div class="smsg2 ${m.is_me?'me':''}" data-id="${m.id}">${!m.is_me&&isG?avHTML(m.avatar,'sm'):''}<div class="sbub">${!m.is_me&&isG?`<span class="sfrom">${esc(m.nickname)}</span>`:''}${rp?`<span class="squote">↩ ${esc((rp.body||'').slice(0,70))}</span>`:''}${refCard(m.ref,m.id)}<span class="stext">${esc(m.body)}</span>
    <span class="smeta">${m.ref&&m.solved?'<b class="ssolved">✓ gelöst</b> · ':''}${tShort(m.created_at)}</span>
    <span class="sacts"><button data-s="rep" data-i="${m.id}">Antworten</button>${m.is_me&&m.ref?`<button data-s="solv" data-i="${m.id}">${m.solved?'Doch offen':'✓ Gelöst'}</button>`:''}${m.is_me?`<button data-s="del" data-i="${m.id}">Löschen</button>`:`<button data-s="rept" data-i="${m.id}">Melden</button>`}</span></div></div>`}
async function socPull(scroll){const s=SOC.sel;if(!s||SOC.tab!=='chat'||SOC.busy)return;SOC.busy=true;
  try{const r=await rpc('get_msgs',{p_chat:s.chat,p_after:0});const box=document.getElementById('smsgs');if(!box||SOC.sel!==s)return;
    const list=(r.data||[]).slice().reverse();const changed=JSON.stringify(list.map(m=>[m.id,m.solved,m.deleted]))!==JSON.stringify(SOC.msgs.map(m=>[m.id,m.solved,m.deleted]));
    if(changed){const atBottom=box.scrollHeight-box.scrollTop-box.clientHeight<80;SOC.msgs=list;
      box.innerHTML=list.length?list.map(m=>msgHTML(m,!!s.gid)).join(''):`<p class="sm sc">Noch keine Nachrichten – schreib die erste! 👋</p>`;
      if(scroll||atBottom)box.scrollTop=box.scrollHeight}
    const last=list.length?list[list.length-1].id:0;if(last>SOC.last){SOC.last=last;await rpc('chat_seen',{p_chat:s.chat,p_last:last});
      if(s.fid){const f=SOC.friends.find(x=>x.id===s.fid);if(f)f.unread=0}else SOC.gun[s.gid]=0;navBadge();document.querySelectorAll('.sitem.on .sbadge').forEach(x=>x.remove())}}
  finally{SOC.busy=false}}
async function socSend(){const ta=document.getElementById('stxt');if(!ta)return;const t=ta.value.trim();if(!t)return;
  if(window.lbNameOk&&!window.lbNameOk(t)){toast('Bitte ohne Kraftausdrücke 🙂');return}
  ta.disabled=true;const r=await rpc('send_msg',{p_chat:SOC.sel.chat,p_body:t,p_ref:null,p_reply:SOC.reply});ta.disabled=false;
  if(r.error){toast(/slow/.test(r.error)?'Langsam – kurz durchatmen 🙂':r.error);return}ta.value='';ta.style.height='';SOC.reply=null;const q=document.querySelector('.sreply');if(q)q.remove();ta.focus();socPull(true)}
async function groupRang(gid){const r=await rpc('group_board',{p_group:gid,p_tool:null});const el=document.getElementById('srang');if(!el)return;const d=r.data||[];
  el.innerHTML=d.length?`<ol class="srank">${d.map((x,i)=>`<li class="${x.is_me?'me':''}"><span class="spos">${['🥇','🥈','🥉'][i]||i+1}</span>${avHTML(x.avatar)}<span class="sn">${esc(x.nickname)}${x.is_me?' (du)':''}</span><b>${fmt0(x.answered)}</b><small>Fragen</small></li>`).join('')}</ol>`:'<p class="sm">Noch keine Daten.</p>'}
const fmt0=n=>Number(n||0).toLocaleString('de-AT');
document.addEventListener('click',async e=>{const b=e.target.closest('[data-s]');if(!b||!document.getElementById('socside'))return;const a=b.dataset.s,id=b.dataset.i;
  const fm=t=>{const x=document.getElementById('sfmsg');if(x)x.textContent=t},gm=t=>{const x=document.getElementById('sgmsg');if(x)x.textContent=t};
  if(a==='copyf'||a==='copyg'){try{await navigator.clipboard.writeText(b.dataset.l);toast('🔗 Link kopiert – schick ihn weiter!')}catch(x){prompt('Link kopieren:',b.dataset.l)}return}
  if(a==='addf'){const c=document.getElementById('sfc').value.trim();if(!c)return;const r=await rpc('friend_request',{p_code:c});if(r.error){fm(/code/.test(r.error)?'Diesen Code gibt es nicht.':/self/.test(r.error)?'Das ist dein eigener Code 😄':/blocked/.test(r.error)?'Das geht leider nicht.':r.error);return}fm(r.data==='accepted'?'✓ Ihr seid jetzt befreundet!':'✓ Anfrage geschickt – sobald sie annimmt, könnt ihr schreiben.');socRender();return}
  if(a==='acc'){await rpc('friend_respond',{p_other:id,p_action:'accept'});toast('🎉 Ihr seid jetzt befreundet!');socRender();return}
  if(a==='rem'){if(!b.dataset.sure){b.dataset.sure=1;b.textContent='Sicher?';return}await rpc('friend_respond',{p_other:id,p_action:'remove'});if(SOC.sel&&SOC.sel.fid===id)SOC.sel=null;socRender();return}
  if(a==='block'){if(!b.dataset.sure){b.dataset.sure=1;b.textContent='Wirklich blockieren?';return}await rpc('friend_respond',{p_other:id,p_action:'block'});SOC.sel=null;socRender();return}
  if(a==='unbl'){await rpc('friend_respond',{p_other:id,p_action:'unblock'});socRender();return}
  if(a==='openf'){const f=SOC.friends.find(x=>x.id===id);SOC.sel={fid:id,chat:f.chat};SOC.reply=null;document.querySelectorAll('.sitem').forEach(x=>x.classList.toggle('on',x===b));socMain();return}
  if(a==='openg'){SOC.sel={gid:id,chat:'g:'+id};SOC.tab='chat';SOC.reply=null;document.querySelectorAll('.sitem').forEach(x=>x.classList.toggle('on',x===b));socMain();return}
  if(a==='tab'){SOC.tab=b.dataset.t;socMain();return}
  if(a==='newg'){const n=document.getElementById('sgn').value.trim();if(n.length<2){gm('Der Name braucht mind. 2 Zeichen.');return}if(window.lbNameOk&&!window.lbNameOk(n)){gm('Dieser Gruppenname geht leider nicht 🙂');return}const r=await rpc('create_group',{p_name:n});if(r.error){gm(r.error);return}SOC.sel={gid:r.data[0].id,chat:'g:'+r.data[0].id};SOC.tab='chat';await socRender();toast('✓ Gruppe erstellt – lad deine Freund:innen ein!');return}
  if(a==='joing'){const c=document.getElementById('sgc').value.trim();if(!c)return;const r=await rpc('join_group',{p_code:c});if(r.error){gm(r.error);return}SOC.sel={gid:r.data[0].id,chat:'g:'+r.data[0].id};SOC.tab='chat';await socRender();toast('🎉 Willkommen in der Gruppe!');return}
  if(a==='leaveg'){if(!b.dataset.sure){b.dataset.sure=1;b.textContent='Wirklich verlassen?';return}await rpc('leave_group',{p_group:SOC.sel.gid});SOC.sel=null;socRender();return}
  if(a==='send'){socSend();return}
  if(a==='mute'){SET.mute=Object.assign({},SET.mute||{});if(SET.mute[SOC.sel.chat])delete SET.mute[SOC.sel.chat];else SET.mute[SOC.sel.chat]=1;saveSet();toast(SET.mute[SOC.sel.chat]?'🔕 Stumm – keine Pop-ups mehr, die Zahl siehst du trotzdem':'🔔 Pop-ups wieder an');socRender();return}
  if(a==='openref'){const m=SOC.msgs.find(x=>x.id===+id);if(!m||!m.ref)return;const r=m.ref,l=LV.find(x=>x.key===r.tool),href=refLink(r);let body='';
    if(r.type==='q'){const ok=new Set([].concat(r.a));body=r.t==='tf'?`<p class="refok">✓ ${r.a?'Stimmt':'Stimmt nicht'}</p>`:r.t==='gap'?`<p class="refok">✓ ${esc([].concat(r.a).join(' / '))}</p>`:`<ul class="refo">${(r.o||[]).map((o,i)=>`<li class="${ok.has(i)?'ok':''}">${ok.has(i)?'✓ ':''}${esc(o)}</li>`).join('')}</ul>`;if(r.e)body+=`<p class="refe">${esc(r.e)}</p>`}
    else body=`<div class="refb">${esc(r.b).replace(/\n/g,'<br>')}</div>`;
    const d=dlg(`<p class="label">${r.type==='q'?'Quizfrage':'Lernzettel'} · ${esc(l?l.n:'')}</p><h3>${esc(r.text)}</h3>${body}<p class="sm">Gefragt von ${esc(m.nickname)}: „${esc(m.body)}“</p><div class="row"><span>${href?`<a class="btn g" href="${href}">Im Lerntool öffnen</a>`:''}</span><button class="btn" data-s="replyref" data-i="${m.id}">↩ Antworten</button></div>`);return}
  if(a==='replyref'){SOC.reply=+id;closeDlg();socMain();setTimeout(()=>{const t=document.getElementById('stxt');if(t)t.focus()},80);return}
  if(a==='rep'){SOC.reply=+id;socMain();setTimeout(()=>{const t=document.getElementById('stxt');if(t)t.focus()},50);return}
  if(a==='noreply'){SOC.reply=null;socMain();return}
  if(a==='del'){if(!b.dataset.sure){b.dataset.sure=1;b.textContent='Sicher?';return}await rpc('msg_action',{p_id:+id,p_action:'delete'});socPull();return}
  if(a==='solv'){await rpc('msg_action',{p_id:+id,p_action:'solved'});socPull();return}
  if(a==='rept'){await rpc('msg_action',{p_id:+id,p_action:'report'});toast('Danke – die Nachricht wurde gemeldet.');return}});
/* Einladungslinks: gruppen.html?freund=CODE / ?gruppe=CODE */
async function socInvites(){const p=new URLSearchParams(location.search),fc=p.get('freund'),gc=p.get('gruppe'),cc=p.get('chat');if(cc){history.replaceState(null,'',location.pathname);window.socOpenChat(cc);return}if(!fc&&!gc)return;const st=window.acState?window.acState():{};if(!st.user)return;
  history.replaceState(null,'',location.pathname);
  if(fc){const r=await rpc('friend_request',{p_code:fc});toast(r.error?(/self/.test(r.error)?'Das ist dein eigener Link 😄':'Der Freundes-Link funktioniert leider nicht.'):r.data==='accepted'?'🎉 Ihr seid jetzt befreundet!':'✓ Freundschaftsanfrage geschickt!')}
  if(gc){const r=await rpc('join_group',{p_code:gc});if(!r.error){SOC.sel={gid:r.data[0].id,chat:'g:'+r.data[0].id};toast('🎉 Willkommen in der Gruppe!')}}
  socRender()}
let socLastUid='-';
window.socTick=socTick;
function socTick(){const st=window.acState?window.acState():{};const uid=(st.user&&st.user.id||'')+'|'+(st.ready?1:0);
  if(st.ready&&!st.user)socForget();
  if(uid!==socLastUid){socLastUid=uid;if(document.getElementById('socside')){socRender().then(socInvites)}else if(st.user){socLoad().then(navBadge)}}}
setInterval(()=>{socTick();if(document.hidden)return;if(document.getElementById('socside')&&SOC.sel)socPull();},6000);
setInterval(()=>{if(document.hidden)return;const st=window.acState?window.acState():{};if(st.user){const sd=document.getElementById('socside');if(sd){if(!sd.contains(document.activeElement))socRender(true)}else socLoad().then(navBadge)}},45000);
socCached()&&navBadge();socTick();{let n=0;const iv=setInterval(()=>{socTick();if(++n>60)clearInterval(iv)},250)}
