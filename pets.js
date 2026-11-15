/* Psychologie Lernbox · Lern-Tiere für Profilbilder (aus den Lerntools) */
(function(){
/* ================== Lern-Haustier · Zeichnungen ================== */
const PI='#1D2B2F';
const pa=(d,f,sw=3.5,x='')=>`<path d="${d}" fill="${f}"${sw?` stroke="${PI}" stroke-width="${sw}" stroke-linejoin="round" stroke-linecap="round"`:''}${x}/>`;
const el=(cx,cy,rx,ry,f,sw=3.5,x='')=>`<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="${f}"${sw?` stroke="${PI}" stroke-width="${sw}"`:''}${x}/>`;
const ci=(cx,cy,r,f,sw=3.5,x='')=>el(cx,cy,r,r,f,sw,x);
const ln=(d,c=PI,w=3.5,x='')=>`<path d="${d}" fill="none" stroke="${c}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"${x}/>`;
const fat=(d,c,w=14)=>ln(d,PI,w+7)+ln(d,c,w);
const ep=(cx,cy,rx,ry)=>`M${cx-rx},${cy} a${rx},${ry} 0 1,0 ${2*rx},0 a${rx},${ry} 0 1,0 ${-2*rx},0 Z`;
const rot=(a,x,y)=>` transform="rotate(${a} ${x} ${y})"`;
/* Form mit Füllung, Zeichnung darin (abgeschnitten) und Kontur obendrauf */
const clipd=(uid,k,d,fill,marks)=>`<clipPath id="${uid}${k}"><path d="${d}"/></clipPath>${pa(d,fill,0)}<g clip-path="url(#${uid}${k})">${marks}</g>${pa(d,'none')}`;
function stdBody(col,belly,arm,foot){
  return el(100,150,40,32,col)+(belly?el(100,158,23,19,belly,0):'')+el(65,147,9,15,arm,3.5,rot(28,65,147))+el(135,147,9,15,arm,3.5,rot(-28,135,147))+el(81,178,13,8,foot)+el(119,178,13,8,foot);
}
const MIRX=d=>d.replace(/(-?\d+(?:\.\d+)?),(-?\d+(?:\.\d+)?)/g,(m,x,y)=>`${200-x},${y}`);

const SP={
 cat:{n:'Katze',food:'🐟',foods:'Fische',nm:'Mochi',draw:u=>{const c='#F5B07A',st='#DE8644',cr='#FFF1DF';return{
   back:`<g class="ptail" style="transform-origin:132px 168px">${fat('M132,168 C166,170 174,138 160,114',c,13)}</g>`,
   ears:pa('M50,82 L55,30 L92,52 Z',c)+pa(MIRX('M50,82 L55,30 L92,52 Z'),c)+pa('M60,64 L61,42 L79,54 Z','#FFB3C1',0)+pa(MIRX('M60,64 L61,42 L79,54 Z'),'#FFB3C1',0),
   body:stdBody(c,cr,c,c),
   head:clipd(u,'h',ep(100,94,58,48),c,ln('M100,44 v14',st,4.5)+ln('M87,46 l3,12',st,4.5)+ln('M113,46 l-3,12',st,4.5)+el(100,120,24,15,cr,0)),
   front:pa('M95,104 h10 l-5,6 z','#FF8FA3',2.5)+ln('M58,110 l-18,-5',PI,2.5)+ln('M58,117 l-18,1',PI,2.5)+ln('M142,110 l18,-5',PI,2.5)+ln('M142,117 l18,1',PI,2.5),
   f:{ex:24,ey:95,my:113},a:{hat:[100,50,92],neck:138}}}},
 dog:{n:'Hund',food:'🦴',foods:'Knochen',nm:'Bruno',draw:u=>{const c='#EBCB9F',ear='#A8714A';return{
   back:`<g class="ptail" style="transform-origin:134px 160px">${fat('M134,160 C152,158 160,146 158,126',c,12)}</g>`,
   body:stdBody(c,'#FFF4E4',c,c),
   head:clipd(u,'h',ep(100,94,56,48),c,el(127,82,17,15,'#D9A673',0)+el(100,117,23,15,'#FFF4E4',0)),
   front:`<g class="pflop">${pa('M60,56 C32,56 26,108 44,118 C57,125 67,104 69,76 Z',ear)+pa(MIRX('M60,56 C32,56 26,108 44,118 C57,125 67,104 69,76 Z'),ear)}</g>`+el(100,105,7.5,5.5,PI,0)+ci(97.5,103.5,1.8,'#fff',0),
   f:{ex:22,ey:95,my:114},a:{hat:[100,50,90],neck:138}}}},
 bunny:{n:'Hase',food:'🥕',foods:'Karotten',nm:'Hoppel',ep:1,draw:u=>{const c='#F7F2EC',pk='#FFC2CF';return{
   back:ci(139,168,11,'#FFFFFF'),
   ears:`<g class="pears" style="transform-origin:100px 56px">${pa('M74,58 C56,12 66,-4 78,0 C91,4 95,28 92,54 Z',c)+pa(MIRX('M74,58 C56,12 66,-4 78,0 C91,4 95,28 92,54 Z'),c)+pa('M79,48 C69,22 71,9 78,11 C85,13 87,30 86,48 Z',pk,0)+pa(MIRX('M79,48 C69,22 71,9 78,11 C85,13 87,30 86,48 Z'),pk,0)}</g>`,
   body:stdBody(c,'#FFFFFF',c,c),
   head:clipd(u,'h',ep(100,96,55,46),c,el(100,118,20,13,'#FFFFFF',0)),
   front:pa('M96,105 h8 l-4,5 z','#FF8FA3',2.5),
   f:{ex:21,ey:97,my:112},a:{hat:[100,53,86],neck:139}}}},
 fox:{n:'Fuchs',food:'🫐',foods:'Beeren',nm:'Fini',draw:u=>{const c='#F28C4E',w='#FFF6EE',d='#3B2A24';return{
   back:`<g class="ptail" style="transform-origin:126px 160px">${clipd(u,'t','M124,152 C150,150 162,126 166,98 C194,118 192,172 140,175 C131,175 125,166 124,152 Z',c,ci(176,104,17,w,0))}</g>`,
   ears:pa('M52,78 L60,24 L95,50 Z',c)+pa(MIRX('M52,78 L60,24 L95,50 Z'),c)+pa('M62,62 L64,38 L81,51 Z','#FFE3D2',0)+pa(MIRX('M62,62 L64,38 L81,51 Z'),'#FFE3D2',0),
   body:stdBody(c,w,d,d),
   head:clipd(u,'h',ep(100,96,58,46),c,pa('M38,94 C58,112 84,122 100,110 C116,122 142,112 162,94 L162,150 L38,150 Z',w,0)),
   front:el(100,106,6.5,4.5,PI,0),
   f:{ex:24,ey:95,my:115},a:{hat:[100,52,90],neck:139}}}},
 panda:{n:'Panda',food:'🎋',foods:'Bambusstangen',nm:'Bao',draw:u=>{const c='#FBFBF7',k='#2C3439';return{
   ears:ci(56,54,17,k)+ci(144,54,17,k),
   body:stdBody(c,'',k,k),
   head:clipd(u,'h',ep(100,96,58,48),c,el(77,99,13,17,k,0,rot(28,77,99))+el(123,99,13,17,k,0,rot(-28,123,99))),
   front:pa('M93,108 q7,-4 14,0 q-2,6 -7,7 q-5,-1 -7,-7 z',k,0),
   f:{ex:23,ey:98,my:119,ec:'#FFFFFF',hc:PI},a:{hat:[100,50,92],neck:140}}}},
 koala:{n:'Koala',food:'🌿',foods:'Eukalyptusblätter',nm:'Kiki',draw:u=>{const c='#B8C3CB';return{
   ears:ci(50,68,25,c)+ci(150,68,25,c)+ci(53,71,14,'#F2E4EA',0)+ci(147,71,14,'#F2E4EA',0),
   body:stdBody(c,'#DCE3E8',c,c),
   head:clipd(u,'h',ep(100,98,56,46),c,el(100,132,30,14,'#DCE3E8',0)),
   front:pa('M100,94 C112,94 113,104 112,112 C111,122 89,122 88,112 C87,104 88,94 100,94 Z','#3A434A',2.5)+ci(95,101,2.4,'#fff',0),
   f:{ex:27,ey:94,my:127,cy:112},a:{hat:[100,55,84],neck:141}}}},
 penguin:{n:'Pinguin',food:'🦐',foods:'Garnelen',nm:'Flocke',nf:1,draw:u=>{const c='#2E5266',o='#FFB347';return{
   ears:el(47,128,11,27,c,3.5,rot(18,47,128))+el(153,128,11,27,c,3.5,rot(-18,153,128)),
   head:clipd(u,'h','M100,34 C150,34 158,96 156,132 C154,170 132,182 100,182 C68,182 46,170 44,132 C42,96 50,34 100,34 Z',c,pa('M100,62 C84,48 56,56 58,86 C60,112 80,124 100,124 C120,124 140,112 142,86 C144,56 116,48 100,62 Z','#FFFFFF',0)+el(100,156,36,30,'#FFFFFF',0)),
   front:el(84,180,13,7,o)+el(116,180,13,7,o)+pa('M90,103 Q100,97 110,103 Q100,116 90,103 Z',o,2.5),
   f:{ex:20,ey:91,my:0,nomouth:1,cy:106},a:{hat:[100,40,84],neck:126,nw:1.3}}}},
 axolotl:{n:'Axolotl',food:'🪱',foods:'Würmchen',nm:'Axel',draw:u=>{const c='#FFB8CF',g='#FF7AA2';const gl=el(40,72,17,7,g,3.5,rot(28,40,72))+el(34,96,18,7,g)+el(40,120,17,7,g,3.5,rot(-28,40,120));return{
   back:`<g class="ptail" style="transform-origin:130px 158px">${pa('M128,166 C158,170 178,152 182,126 C166,144 150,150 132,148 Z',c)}</g>`,
   ears:`<g class="pgill">${gl}<g transform="translate(200 0) scale(-1 1)">${gl}</g></g>`,
   body:stdBody(c,'#FFE1EA',c,c),
   head:clipd(u,'h',ep(100,98,62,44),c,ci(80,64,3.5,'#F28FB0',0)+ci(93,58,2.5,'#F28FB0',0)+ci(119,61,3.5,'#F28FB0',0)+ci(108,56,2,'#F28FB0',0)),
   front:'',
   f:{ex:30,ey:99,my:113,wide:1,cy:112},a:{hat:[100,57,88],neck:144}}}},
 frog:{n:'Frosch',food:'🪰',foods:'Fliegen',nm:'Fredi',draw:u=>{const c='#9FD58A';return{
   body:stdBody(c,'#E9F7DD',c,c),
   head:clipd(u,'h',ep(100,100,64,42),c,ci(142,98,4.5,'#7DBA68',0)+ci(60,106,3.5,'#7DBA68',0)+ci(70,96,2.5,'#7DBA68',0)),
   front:ci(72,62,19,c)+ci(128,62,19,c),
   f:{ex:28,ey:62,my:111,wide:1,cy:110},a:{hat:[100,39,70],neck:142,side:[62,74]}}}},
 hedgehog:{n:'Igel',food:'🍎',foods:'Äpfel',nm:'Stupsi',draw:u=>{const s='#8A6145',f='#F5DEC2';let pts=[];for(let i=0;i<=22;i++){const a=(-28+i*10.5)*Math.PI/180,r=i%2?62:80;pts.push((100+r*Math.cos(a)).toFixed(1)+','+(108-r*Math.sin(a)).toFixed(1))}return{
   back:pa('M'+pts.join(' L')+' Z',s),
   ears:ci(63,72,9,f)+ci(137,72,9,f),
   body:stdBody(s,f,f,f),
   head:clipd(u,'h',ep(100,104,52,42),f,''),
   front:ci(100,111,5.5,PI,0)+ci(98.5,109.5,1.5,'#fff',0),
   f:{ex:20,ey:100,my:119,cy:114},a:{hat:[100,36,80],neck:144}}}},
};
const PMOOD={happy:'überglücklich',content:'zufrieden',hungry:'hungrig',sad:'traurig'};

function petFace(m,f){
  const L=100-f.ex,R=100+f.ex,y=f.ey,ec=f.ec||PI,hc=f.hc||'#fff',my=f.my;
  const dot=(x,r=6.5)=>ci(x,y,r,ec,0)+ci(x+2.2,y-2.4,2.2,hc,0);
  const arc=x=>ln(`M${x-7},${y+2} q7,-10 14,0`,ec,3.8);
  const brow=k=>ln(`M${L-9},${y-10-k} L${L+6},${y-14-2*k}`,PI,3)+ln(`M${R-6},${y-14-2*k} L${R+9},${y-10-k}`,PI,3);
  let eyes='',mouth='',extra='';
  if(m==='happy'||m==='yay'||m==='eat') eyes=arc(L)+arc(R);
  else if(m==='oops') eyes=ln(`M${L-6},${y-5} l10,5 l-10,5`,ec,3.5)+ln(`M${R+6},${y-5} l-10,5 l10,5`,ec,3.5);
  else if(m==='sad') eyes=dot(L,5.5)+dot(R,5.5)+brow(1);
  else if(m==='hungry') eyes=dot(L,7)+dot(R,7)+brow(0);
  else eyes=dot(L)+dot(R);
  if(!f.nomouth){
    if(m==='happy'||m==='yay') mouth=pa(`M${f.wide?86:91},${my-1} q${f.wide?14:9},${f.wide?16:13} ${f.wide?28:18},0 z`,'#B8394E',3);
    else if(m==='eat') mouth=`<g class="pchew" style="transform-origin:100px ${my+2}px">${el(100,my+2,6,5,'#B8394E',3)}</g>`;
    else if(m==='hungry') mouth=el(100,my+3,4,5,PI,0);
    else if(m==='sad') mouth=ln(`M93,${my+5} q7,-6 14,0`);
    else if(m==='oops') mouth=ln(`M90,${my+2} q5,-4 10,0 q5,4 10,0`);
    else mouth=f.wide?ln(`M86,${my} q14,11 28,0`):ln(`M93,${my} q3.5,5 7,0 q3.5,5 7,0`);
  }
  if(m==='sad') extra=`<g class="ptear">${pa(`M${R+5},${y+7} q-5,8 0,11 q5,-3 0,-11z`,'#8FD3F4',2.5)}</g>`;
  const cy=f.cy||y+17, cx=f.ex+12;
  return `<g class="peyes" style="transform-origin:100px ${y}px">${eyes}</g>`+el(100-cx,cy,9,5.5,'#FF8FA3',0,` opacity="${m==='sad'?.3:.55}"`)+el(100+cx,cy,9,5.5,'#FF8FA3',0,` opacity="${m==='sad'?.3:.55}"`)+mouth+extra;
}

/* Accessoires */
const PCOL=[['Koralle','#FF6F61'],['Senf','#F2B33D'],['Salbei','#8DBF9C'],['Petrol','#0E6E7E'],['Himmelblau','#7DB7E8'],['Lavendel','#B49CDD'],['Rosa','#F6A6C1'],['Creme','#F4EAD3'],['Bordeaux','#8E2C48'],['Anthrazit','#3A4248'],['Gold','#E8B93B'],['Silber','#C9D1D8']];
const PPAT=[['uni','Uni'],['streifen','Streifen'],['karo','Karo'],['punkte','Punkte']];
const ACC=[
 {id:'schleife',s:'head',n:'Masche',tex:1,pr:0,c:'#FF6F61'},
 {id:'halstuch',s:'neck',n:'Halstuch',tex:1,pr:0,c:'#F6A6C1',p:'punkte'},
 {id:'fliege',s:'neck',n:'Fliege',tex:1,pr:20,c:'#8E2C48'},
 {id:'rund',s:'eyes',n:'Runde Brille',pr:30,c:'#3A4248'},
 {id:'kappe',s:'head',n:'Kappe',tex:1,pr:40,c:'#7DB7E8'},
 {id:'haube',s:'head',n:'Haube',tex:1,pr:60,c:'#F2B33D'},
 {id:'schal',s:'neck',n:'Schal',tex:1,pr:70,c:'#0E6E7E',p:'streifen'},
 {id:'kopfh',s:'head',n:'Kopfhörer',pr:90,c:'#3A4248'},
 {id:'eckig',s:'eyes',n:'Eckige Brille',pr:100,c:'#8E2C48'},
 {id:'sonne',s:'eyes',n:'Sonnenbrille',pr:130,c:'#3A4248'},
 {id:'kranz',s:'head',n:'Blumenkranz',pr:150,c:'#F6A6C1'},
 {id:'goldkette',s:'neck',n:'Goldkette',pr:180,c:'#E8B93B'},
 {id:'doktor',s:'head',n:'Doktorhut',sim:1,c:'#F2B33D'},
 {id:'kette',s:'neck',n:'Perlenkette',streak:5,c:'#F4EAD3'},
 {id:'krone',s:'head',n:'Krone',all:1,c:'#E8B93B'},
];
const ACCI=Object.fromEntries(ACC.map(a=>[a.id,a]));
const lum=h=>{const n=parseInt(h.slice(1),16);return(0.299*(n>>16)+0.587*(n>>8&255)+0.114*(n&255))/255};
function pfill(uid,k,c,p){
  if(!p||p==='uni') return {d:'',f:c};
  const o=lum(c)>.75?`fill="${PI}" opacity=".16"`:`fill="#fff" opacity=".5"`, id=uid+'p'+k;
  const inner=p==='streifen'?`<rect y="5" width="10" height="5" ${o}/>`:p==='karo'?`<rect width="10" height="4" ${o}/><rect width="4" height="10" ${o}/>`:`<circle cx="5" cy="5" r="1.9" ${o}/>`;
  return {d:`<pattern id="${id}" width="10" height="10" patternUnits="userSpaceOnUse"><rect width="10" height="10" fill="${c}"/>${inner}</pattern>`,f:`url(#${id})`};
}
function accSVG(uid,it,c,p,A,F){
  const [hx,hy,hw]=A.hat, s=hw/90, ny=A.neck, nw=A.nw||1, L=100-F.ex, R=100+F.ex, y=F.ey;
  const P=pfill(uid,it,c,p), f=P.f;
  const T=(x,yy,sc,r=0)=>`transform="translate(${x} ${yy}) rotate(${r}) scale(${sc})"`;
  switch(it){
   case 'haube': return P.d+`<g ${T(hx,hy,s)}>${pa('M-42,-4 C-44,-58 44,-58 42,-4 Z',f)}${pa('M-47,-6 q47,-9 94,0 l0,15 q-47,-9 -94,0 z',f)}${[-36,-27,-18,-9,0,9,18,27,36].map(x=>ln(`M${x},${(-9+(x/47)**2*3).toFixed(1)} v10`,PI,1.6,' opacity=".35"')).join('')}${ci(0,-50,11,c)}</g>`;
   case 'kappe': return P.d+`<g ${T(hx,hy+2,s,-7)}>${pa('M-43,4 C-45,-28 -27,-49 0,-49 C27,-49 45,-28 43,4 C15,-1 -15,-1 -43,4 Z',f)}${ln('M0,-49 C-7,-32 -10,-15 -12,1',PI,1.8,' opacity=".4"')}${ln('M0,-49 C9,-32 14,-15 17,0',PI,1.8,' opacity=".4"')}${ln('M-31,-24 C-27,-36 -17,-44 -7,-46','#fff',3.5,' opacity=".4"')}${ci(-22,-27,1.6,PI,0,' opacity=".45"')}${ci(27,-26,1.6,PI,0,' opacity=".45"')}${ln('M-41,1 C-14,-4 14,-4 41,1',PI,1.8,' opacity=".3"')}${pa('M6,-1 C26,-9 58,-10 80,0 C85,3 84,8 78,9 C58,11 30,9 4,5 Z',c)}${pa('M12,4 C34,8 58,9 79,8 C70,11 40,11 12,7 Z',PI,0,' opacity=".2"')}${ln('M14,-4 C34,-9 56,-9 74,-3','#fff',2.5,' opacity=".35"')}${ci(0,-49,4.6,c,2.5)}</g>`;
   case 'schleife': return P.d+`<g ${T(hx+hw*.33,hy+6,s*.95,18)}>${pa('M-2,2 L-11,22 L-4,19 L1,24 Z',f,3)}${pa('M2,2 L11,22 L4,19 L-1,24 Z',f,3)}${pa('M0,0 C-8,-20 -30,-16 -27,-1 C-26,12 -9,9 0,0 Z',f)}${pa('M0,0 C8,-20 30,-16 27,-1 C26,12 9,9 0,0 Z',f)}${ci(0,0,6,c,3)}</g>`;
   case 'kranz': {let o='';const fl=y<70;const pts=[-42,-28,-14,0,14,28,42].map(x=>[x,fl?2+(x/45)**2*5:8+(x/45)**2*16-(1-(x/45)**2)*4]);
     pts.forEach(([x,yy],i)=>{if(i<6){const [x2,y2]=pts[i+1];o+=el((x+x2)/2,(yy+y2)/2-2,7,3.5,'#8DBF9C',2,rot(-15+i*6,(x+x2)/2,(yy+y2)/2-2))}});
     pts.forEach(([x,yy],i)=>{const r=i%2?4.2:5;for(let k=0;k<5;k++){const a=k*72*Math.PI/180;o+=ci(+(x+r*Math.cos(a)).toFixed(1),+(yy+r*Math.sin(a)).toFixed(1),r*.8,c,1.8)}o+=ci(x,yy,2.8,'#FFD54A',1.5)});
     return `<g ${T(hx,hy,s)}>${o}</g>`}
   case 'doktor': return `<g ${T(hx,hy,s)}>${pa('M-31,-8 L-31,8 C-10,16 10,16 31,8 L31,-8 Z','#2C3439')}${pa('M-56,-16 L0,-33 L56,-16 L0,1 Z','#2C3439')}${ln('M0,-16 C22,-14 38,-12 44,-9 L44,10',c,3)}${pa('M39,8 h10 l2,14 h-14 z',c,2)}${ci(0,-16,4,c,2)}</g>`;
   case 'rund': return ci(L,y,13,'#fff',0,' fill-opacity=".22"')+ci(R,y,13,'#fff',0,' fill-opacity=".22"')+`<g fill="none" stroke="${c}" stroke-width="3.5" stroke-linecap="round"><circle cx="${L}" cy="${y}" r="13"/><circle cx="${R}" cy="${y}" r="13"/><path d="M${L+13},${y-1} q${(R-L-26)/2},-6 ${R-L-26},0 M${L-13},${y-2} l-12,-5 M${R+13},${y-2} l12,-5"/></g>`;
   case 'eckig': return `<g stroke="${c}" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><rect x="${L-14}" y="${y-10}" width="28" height="21" rx="5" fill="#fff" fill-opacity=".22"/><rect x="${R-14}" y="${y-10}" width="28" height="21" rx="5" fill="#fff" fill-opacity=".22"/><path fill="none" d="M${L+14},${y-2} q${(R-L-28)/2},-5 ${R-L-28},0 M${L-14},${y-4} l-11,-4 M${R+14},${y-4} l11,-4"/></g>`;
   case 'sonne': return `<g stroke="${c}" stroke-width="3.5" stroke-linecap="round"><path d="M${L-15},${y-8} h30 q0,19 -15,19 q-15,0 -15,-19 z" fill="#22303A" fill-opacity=".9"/><path d="M${R-15},${y-8} h30 q0,19 -15,19 q-15,0 -15,-19 z" fill="#22303A" fill-opacity=".9"/><path fill="none" d="M${L+15},${y-7} q${(R-L-30)/2},-4 ${R-L-30},0 M${L-15},${y-8} l-10,-3 M${R+15},${y-8} l10,-3"/></g>`+ln(`M${L-9},${y-3} l6,-2`,'#fff',2.5,' opacity=".7"')+ln(`M${R-9},${y-3} l6,-2`,'#fff',2.5,' opacity=".7"');
   case 'schal': return P.d+`<g ${T(100,ny,nw)}>${pa('M-42,-7 C-20,2 20,2 42,-7 L44,8 C20,17 -20,17 -44,8 Z',f)}${pa('M16,8 L30,7 L36,40 L21,42 Z',f)}${ln('M23,42 v6 M28,41 v6 M33,40 v6',c,2.5)}</g>`;
   case 'halstuch': return P.d+`<g ${T(100,ny,nw)}>${pa('M-38,-5 C-14,4 14,4 38,-5 L2,30 Z',f)}${ci(0,1,5,c,2.5)}</g>`;
   case 'fliege': return P.d+`<g ${T(100,ny+5*nw,nw)}>${pa('M0,0 L-19,-11 Q-23,0 -19,11 Z',f)}${pa('M0,0 L19,-11 Q23,0 19,11 Z',f)}${el(0,0,5,6,c,3)}</g>`;
   case 'kopfh': {const [sx,sy]=A.side||[hw*.63,y+4];return `<g>${ln(`M${hx-sx+2},${sy-6} C${hx-sx},${hy-30} ${hx+sx},${hy-30} ${hx+sx-2},${sy-6}`,PI,9)}${ln(`M${hx-sx+2},${sy-6} C${hx-sx},${hy-30} ${hx+sx},${hy-30} ${hx+sx-2},${sy-6}`,c,4.5)}<rect x="${hx-sx-9}" y="${sy-15}" width="18" height="28" rx="8" fill="${c}" stroke="${PI}" stroke-width="3.5"/><rect x="${hx+sx-9}" y="${sy-15}" width="18" height="28" rx="8" fill="${c}" stroke="${PI}" stroke-width="3.5"/>${ln(`M${hx-sx-3},${sy-8} v13 M${hx+sx+3},${sy-8} v13`,'#fff',2.5,' opacity=".45"')}</g>`}
   case 'goldkette': {let o='';for(let i=0;i<=12;i++){const x=-33+i*5.5;o+=el(x,+(1+(1-(x/34)**2)*10).toFixed(1),3.2,2.2,'none',0,` stroke="${c}" stroke-width="2.2"`)}o+=ln('M0,11 v4',c,2.5)+ci(0,21,7.5,c,2.5)+pa('M0,16.5 l1.4,3 3.2,.4 -2.4,2.2 .7,3.2 -2.9,-1.6 -2.9,1.6 .7,-3.2 -2.4,-2.2 3.2,-.4 Z','#fff',0,' opacity=".75"');return `<g ${T(100,ny,nw)}>${o}</g>`}
   case 'krone': {const g=c==='#FF6F61'?'#FF8A73':'#FF6F61';return `<g ${T(hx,hy+2,s,-8)}>${pa('M-30,0 L-34,-30 L-17,-14 L0,-36 L17,-14 L34,-30 L30,0 Z',c)}${pa('M-30,0 L30,0 L29,8 L-29,8 Z',c,3)}${pa('M-29,0 L29,0 L28.6,8 L-28.6,8 Z',PI,0,' opacity=".18"')}${ln('M-24,-6 L-27,-24','#fff',2.5,' opacity=".45"')}${ci(0,-36,3.5,g,2)}${ci(-34,-30,3,g,2)}${ci(34,-30,3,g,2)}${ci(0,-8,4.5,g,2)}${ci(-17,-5,3,g,2)}${ci(17,-5,3,g,2)}</g>`}
   case 'kette': {let o='';for(let i=0;i<=8;i++){const x=-32+i*8;o+=ci(x,+(2+(1-(x/34)**2)*9).toFixed(1),4.3,c,2)+ci(x-1.3,+(0.7+(1-(x/34)**2)*9).toFixed(1),1.2,'#fff',0)}return `<g ${T(100,ny,nw)}>${o}</g>`}
  }
  return '';
}

let petUid=0;
/* o: {sp, mood, eq:{head:{id,c,p},eyes,neck}, crop, cls} */
function petSVG(o){
  const S=SP[o.sp]; if(!S) return '';
  const u='pq'+(++petUid), D=S.draw(u), m=o.mood||'content', eq=o.eq||{};
  const acc=k=>{const e=eq[k];return e&&ACCI[e.id]?accSVG(u,e.id,e.c||ACCI[e.id].c,e.p||'uni',D.a,D.f):''};
  const thought=m==='hungry'?`<g class="pthink">${ci(150,58,3,'#fff',2)+ci(158,47,5,'#fff',2.5)}${el(176,26,21,16,'#fff',3)}<text x="176" y="33" text-anchor="middle" font-size="19">${S.food}</text></g>`:'';
  const neck=acc('neck');
  const hbk=S.hb&&eq.head&&!['schleife','kranz','stirnband','spange','lorbeer'].includes(eq.head.id); /* Frosch/Krokodil: Hüte hinter die Augenhügel */
  return `<svg class="pet m-${m} ${o.cls||''}" viewBox="${o.crop||'0 -8 200 200'}" role="img" aria-label="${S.n}, ${PMOOD[m]||''}">
   <path d="M38,183 C70,175 138,177 164,183 C150,192 62,193 38,183 Z" fill="var(--hl)" opacity=".75"/>
   <g class="pbody">${D.back||''}${D.ears||''}${D.body||''}${S.nf?'':neck}${D.head||''}${hbk?acc('head'):''}${D.front||''}${S.nf?neck:''}${petFace(m,D.f)}${acc('eyes')}${hbk?'':acc('head')}${S.ep&&eq.head&&['haube','kappe'].includes(eq.head.id)?D.ears:''}</g>${thought}</svg>`;
}

/* weitere Tiere */
const BEAN='M100,36 C150,36 158,96 156,132 C154,170 132,182 100,182 C68,182 46,170 44,132 C42,96 50,36 100,36 Z';
Object.assign(SP,{
 croc:{n:'Krokodil',food:'🍗',foods:'Hendlhaxen',nm:'Kroko',draw:u=>{const c='#6DBB7A',d='#4E9A5E';return{
   back:`<g class="ptail" style="transform-origin:130px 166px">${pa('M126,172 C150,178 178,166 190,138 C172,152 150,155 130,150 Z',c)+pa('M148,153 l5,-10 l6,9 Z',d,2.5)+pa('M164,149 l6,-10 l5,9 Z',d,2.5)+pa('M178,142 l6,-9 l3,8 Z',d,2.5)}</g>`,
   body:stdBody(c,'#E3F2CF',c,c),
   head:clipd(u,'h','M44,98 C44,54 156,54 156,98 L158,124 C158,148 42,148 42,124 Z',c,el(100,130,50,16,'#8ACB92',0)+ci(100,68,3,d,0)+ci(88,71,2.5,d,0)+ci(112,71,2.5,d,0)),
   front:ci(76,62,17,c)+ci(124,62,17,c)+ci(90,108,2.6,PI,0)+ci(110,108,2.6,PI,0)+[66,78,90,102,114,126].map((x,i)=>{const yc=u=>{const s=(u-56)/88;return 122+32*s*(1-s)};const x0=x-4.5,x1=x+4.5,xm=x,h=i===0||i===5?5:7;return pa(`M${x0},${yc(x0).toFixed(1)} L${xm},${(yc(xm)+h).toFixed(1)} L${x1},${yc(x1).toFixed(1)} Z`,'#fff',2)}).join('')+ln('M56,122 Q100,138 144,122',PI,3.5),
   f:{ex:24,ey:62,my:0,nomouth:1,cy:100},a:{hat:[100,41,70],neck:142,side:[62,80]}}}},
 dino:{n:'Dino',food:'🍖',foods:'Fleischkeulen',nm:'Rex',draw:u=>{const c='#8EC9E8',sp='#F6C453';return{
   back:`<g class="ptail" style="transform-origin:132px 166px">${fat('M132,168 C162,172 182,160 186,136',c,16)+pa('M158,166 l6,-12 l7,10 Z',sp,2.5)+pa('M176,154 l8,-10 l3,11 Z',sp,2.5)}</g>`,
   ears:pa('M76,58 L82,36 L94,52 Z',sp,3)+pa('M90,50 L100,26 L110,50 Z',sp,3)+pa('M106,52 L118,36 L124,58 Z',sp,3),
   body:stdBody(c,'#FFF3D6',c,c),
   head:clipd(u,'h',ep(100,96,56,48),c,el(100,126,30,16,'#B5DCF0',0)+ci(68,80,4,'#74B2D4',0)+ci(134,78,5,'#74B2D4',0)+ci(126,66,3,'#74B2D4',0)),
   front:ci(93,113,2.2,PI,0)+ci(107,113,2.2,PI,0),
   f:{ex:24,ey:94,my:122,wide:1,cy:110},a:{hat:[100,52,88],neck:140}}}},
 shark:{n:'Hai',food:'🐠',foods:'Fische',nm:'Finn',nf:1,draw:u=>{const c='#8FB3CF',w='#FFFFFF';return{
   back:`<g class="ptail" style="transform-origin:146px 164px">${pa('M140,158 C160,154 174,138 180,118 C178,142 182,160 190,176 C172,170 156,170 140,170 Z',c)}</g>`,
   ears:pa('M86,42 C92,20 104,10 118,6 C113,20 113,32 117,44 Z',c)+pa('M52,128 C36,138 30,152 34,162 C44,156 52,148 58,142 Z',c)+pa(MIRX('M52,128 C36,138 30,152 34,162 C44,156 52,148 58,142 Z'),c),
   head:clipd(u,'h',BEAN,c,pa('M38,116 C70,132 130,132 162,116 L162,200 L38,200 Z',w,0)+ln('M60,96 q-4,7 0,14 M66,94 q-4,8 0,16',PI,2.5,' opacity=".4"')+ln('M140,96 q4,7 0,14 M134,94 q4,8 0,16',PI,2.5,' opacity=".4"')),
   front:el(84,181,12,6,c)+el(116,181,12,6,c),
   f:{ex:22,ey:86,my:104,wide:1,cy:98},a:{hat:[100,42,84],neck:122,nw:1.34,side:[56,90]}}}},
 dragon:{n:'Drache',food:'🌶️',foods:'Chilis',nm:'Funki',draw:u=>{const c='#E8766C',wg='#C9564E';const wing='M66,136 C42,122 24,124 16,104 C30,108 38,98 32,84 C50,92 60,106 72,122 Z';return{
   back:pa(wing,wg)+pa(MIRX(wing),wg)+`<g class="ptail" style="transform-origin:134px 168px">${fat('M134,170 C162,174 176,160 180,140',c,13)+pa('M173,144 l8,-16 l10,12 Z',c,3)}</g>`,
   ears:pa('M68,62 C60,46 61,34 68,24 C73,40 79,50 86,56 Z','#FFF1C9')+pa(MIRX('M68,62 C60,46 61,34 68,24 C73,40 79,50 86,56 Z'),'#FFF1C9'),
   body:stdBody(c,'#FFD98A',c,c),
   head:clipd(u,'h',ep(100,96,58,47),c,el(100,126,28,15,'#F29A90',0)+pa('M92,50 l8,10 l8,-10 Z','#FFD98A',0)),
   front:ci(93,113,2.2,PI,0)+ci(107,113,2.2,PI,0),
   f:{ex:24,ey:94,my:122,cy:110},a:{hat:[100,51,92],neck:139}}}},
 wolf:{n:'Wolf',food:'🥩',foods:'Steaks',nm:'Luna',draw:u=>{const c='#9AA6B2',w='#F2F4F6',d='#717E8B';return{
   back:`<g class="ptail" style="transform-origin:126px 160px">${clipd(u,'t','M124,152 C150,150 162,126 166,98 C194,118 192,172 140,175 C131,175 125,166 124,152 Z',c,ci(176,104,17,w,0))}</g>`,
   ears:pa('M52,80 L58,22 L95,50 Z',c)+pa(MIRX('M52,80 L58,22 L95,50 Z'),c)+pa('M62,64 L64,38 L81,51 Z','#5A6570',0)+pa(MIRX('M62,64 L64,38 L81,51 Z'),'#5A6570',0),
   body:stdBody(c,w,c,d),
   head:clipd(u,'h',ep(100,96,58,46),c,pa('M100,48 C90,60 90,78 100,88 C110,78 110,60 100,48 Z',d,0)+pa('M38,94 C58,112 84,122 100,110 C116,122 142,112 162,94 L162,150 L38,150 Z',w,0)),
   front:el(100,106,7,5,PI,0),
   f:{ex:24,ey:95,my:115},a:{hat:[100,52,90],neck:139}}}},
 gorilla:{n:'Gorilla',food:'🍌',foods:'Bananen',nm:'Bongo',draw:u=>{const c='#4A505A',fc='#C2A58E';return{
   ears:ci(45,98,11,fc)+ci(155,98,11,fc),
   body:stdBody(c,'#6A707A',c,c),
   head:clipd(u,'h',ep(100,94,57,50),c,pa('M100,72 C84,58 54,64 58,94 C60,124 80,140 100,140 C120,140 140,124 142,94 C146,64 116,58 100,72 Z',fc,0)),
   front:el(95,107,3.2,2.2,PI,0)+el(105,107,3.2,2.2,PI,0)+ln('M72,78 q8,-5 16,0 M112,78 q8,-5 16,0',PI,3),
   f:{ex:21,ey:92,my:121,cy:112},a:{hat:[100,47,92],neck:146,nw:1.1,side:[57,96]}}}},
 owl:{n:'Eule',food:'🐛',foods:'Raupen',nm:'Ollie',nf:1,draw:u=>{const c='#B5835A',o='#FFB347';return{
   ears:pa('M54,64 L48,26 L82,48 Z',c)+pa(MIRX('M54,64 L48,26 L82,48 Z'),c)+el(46,132,12,28,'#9C6E48',3.5,rot(14,46,132))+el(154,132,12,28,'#9C6E48',3.5,rot(-14,154,132)),
   head:clipd(u,'h',BEAN,c,ci(78,88,22,'#F6E7CF',0)+ci(122,88,22,'#F6E7CF',0)+el(100,154,34,28,'#E9CFA9',0)+ln('M86,144 l4,4 l4,-4 M106,144 l4,4 l4,-4 M96,156 l4,4 l4,-4 M86,166 l4,4 l4,-4 M106,166 l4,4 l4,-4',c,2.5)),
   front:pa('M93,100 L107,100 L100,113 Z',o,2.5)+el(84,181,11,6,o)+el(116,181,11,6,o),
   f:{ex:22,ey:88,my:0,nomouth:1,cy:112},a:{hat:[100,42,84],neck:124,nw:1.32,side:[56,90]}}}},
 turtle:{n:'Schildkröte',food:'🥬',foods:'Salatblätter',nm:'Tilda',draw:u=>{const c='#A8D88F',sh='#7AAE5C',sl='#5E8F45';return{
   back:ci(144,172,6,c),
   body:el(58,148,9,15,c,3.5,rot(32,58,148))+el(142,148,9,15,c,3.5,rot(-32,142,148))+clipd(u,'s',ep(100,152,47,34),sh,pa('M88,142 l12,-8 l12,8 v13 l-12,8 l-12,-8 Z','none',0,` stroke="${sl}" stroke-width="3"`)+ln('M88,142 l-18,-6 M112,142 l18,-6 M88,155 l-20,6 M112,155 l20,6 M100,163 v20',sl,3))+el(80,180,13,8,c)+el(120,180,13,8,c),
   head:clipd(u,'h',ep(100,92,52,44),c,ci(132,72,3.5,'#8CC373',0)+ci(70,70,2.5,'#8CC373',0)),
   front:'',
   f:{ex:21,ey:92,my:110},a:{hat:[100,50,84],neck:134}}}},
 octopus:{n:'Oktopus',food:'🦀',foods:'Krabben',nm:'Otto',nf:1,draw:u=>{const c='#C99BE8',d='#B07FD6';const T=['M60,134 C50,158 44,176 56,180 C64,182 68,174 62,170','M80,142 C76,162 72,178 82,180 C90,181 90,172 84,171','M100,146 C100,164 100,176 96,180 C90,184 86,176 92,173','M120,142 C124,162 128,178 118,180 C110,181 110,172 116,171','M140,134 C150,158 156,176 144,180 C136,182 132,174 138,170'];return{
   body:pa('M54,132 L146,132 L140,170 L60,170 Z',d,0)+T.map(d=>fat(d,c,13)).join(''),
   head:clipd(u,'h','M100,34 C150,34 160,82 156,116 C152,142 128,150 100,150 C72,150 48,142 44,116 C40,82 50,34 100,34 Z',c,ci(76,58,5,d,0)+ci(124,52,4,d,0)+ci(134,70,3,d,0)+ci(64,76,2.5,d,0)),
   front:'',
   f:{ex:24,ey:98,my:118,cy:112},a:{hat:[100,42,88],neck:138,nw:1.25,side:[58,98]}}}},
 bear:{n:'Bär',food:'🍯',foods:'Honigtöpfe',nm:'Teddy',draw:u=>{const c='#B07A50';return{
   ears:ci(58,56,17,c)+ci(142,56,17,c)+ci(58,57,9,'#E3B48D',0)+ci(142,57,9,'#E3B48D',0),
   body:stdBody(c,'#EBCDA8',c,c),
   head:clipd(u,'h',ep(100,96,58,48),c,el(100,117,24,17,'#EBCDA8',0)),
   front:el(100,106,8,6,PI,0)+ci(97,104,2,'#fff',0),
   f:{ex:24,ey:93,my:118},a:{hat:[100,50,92],neck:140}}}},
});

window.petSVG=petSVG;window.PET_SP=SP;window.PET_ACC=ACC;
})();
