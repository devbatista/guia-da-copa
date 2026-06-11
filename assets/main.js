/* ---------- canais ---------- */
const FULL =['Globo','SBT','SporTV','Globoplay','ge tv','N Sports','Cazé TV'];
const FULL2=['Globo','SBT','SporTV','Globoplay','N Sports','Cazé TV'];
const GLOBO=['Globo','SporTV','Globoplay','ge tv','Cazé TV'];
const GLOBOX=['Globo','SporTV','Globoplay','Cazé TV'];
const CAZE =['Cazé TV'];

/* ---------- tabela embutida (di = dia: 0 = 11/jun ... 16 = 27/jun) ---------- */
const M=[
 {di:0,t:'16h',a:'México',b:'África do Sul',g:'A',r:1,v:'Estádio Azteca · Cidade do México',ch:FULL},
 {di:0,t:'23h',a:'Coreia do Sul',b:'República Tcheca',g:'A',r:1,v:'Estádio Akron · Guadalajara',ch:CAZE},
 {di:1,t:'16h',a:'Canadá',b:'Bósnia e Herzegovina',g:'B',r:1,v:'BMO Field · Toronto',ch:CAZE},
 {di:1,t:'22h',a:'Estados Unidos',b:'Paraguai',g:'D',r:1,v:'SoFi Stadium · Los Angeles',ch:FULL},
 {di:2,t:'16h',a:'Catar',b:'Suíça',g:'B',r:1,v:"Levi's Stadium · São Francisco",ch:CAZE},
 {di:2,t:'19h',a:'Brasil',b:'Marrocos',g:'C',r:1,v:'MetLife Stadium · Nova York',ch:FULL},
 {di:2,t:'22h',a:'Haiti',b:'Escócia',g:'C',r:1,v:'Gillette Stadium · Boston',ch:CAZE},
 {di:3,t:'01h',a:'Austrália',b:'Turquia',g:'D',r:1,v:'BC Place · Vancouver',ch:GLOBO},
 {di:3,t:'14h',a:'Alemanha',b:'Curaçao',g:'E',r:1,v:'NRG Stadium · Houston',ch:GLOBO},
 {di:3,t:'17h',a:'Holanda',b:'Japão',g:'F',r:1,v:'AT&T Stadium · Dallas',ch:FULL},
 {di:3,t:'20h',a:'Costa do Marfim',b:'Equador',g:'E',r:1,v:'Lincoln Financial Field · Filadélfia',ch:GLOBOX},
 {di:3,t:'23h',a:'Suécia',b:'Tunísia',g:'F',r:1,v:'Estádio BBVA · Monterrey',ch:GLOBOX},
 {di:4,t:'13h',a:'Espanha',b:'Cabo Verde',g:'H',r:1,v:'Mercedes-Benz Stadium · Atlanta',ch:CAZE},
 {di:4,t:'16h',a:'Bélgica',b:'Egito',g:'G',r:1,v:'Lumen Field · Seattle',ch:GLOBO},
 {di:4,t:'19h',a:'Arábia Saudita',b:'Uruguai',g:'H',r:1,v:'Hard Rock Stadium · Miami',ch:FULL2},
 {di:4,t:'22h',a:'Irã',b:'Nova Zelândia',g:'G',r:1,v:'SoFi Stadium · Los Angeles',ch:CAZE},
 {di:5,t:'16h',a:'França',b:'Senegal',g:'I',r:1,v:'MetLife Stadium · Nova York',ch:FULL},
 {di:5,t:'19h',a:'Iraque',b:'Noruega',g:'I',r:1,v:'Gillette Stadium · Boston',ch:CAZE},
 {di:5,t:'19h',a:'Argentina',b:'Argélia',g:'J',r:1,v:'Arrowhead Stadium · Kansas City',ch:CAZE},
 {di:6,t:'01h',a:'Áustria',b:'Jordânia',g:'J',r:1,v:"Levi's Stadium · São Francisco",ch:GLOBOX},
 {di:6,t:'14h',a:'Portugal',b:'Rep. Dem. do Congo',g:'K',r:1,v:'NRG Stadium · Houston',ch:CAZE},
 {di:6,t:'17h',a:'Inglaterra',b:'Croácia',g:'L',r:1,v:'AT&T Stadium · Dallas',ch:FULL},
 {di:6,t:'20h',a:'Gana',b:'Panamá',g:'L',r:1,v:'BMO Field · Toronto',ch:CAZE},
 {di:6,t:'23h',a:'Uzbequistão',b:'Colômbia',g:'K',r:1,v:'Estádio Azteca · Cidade do México',ch:GLOBOX},
 {di:7,t:'13h',a:'República Tcheca',b:'África do Sul',g:'A',r:2,v:'Mercedes-Benz Stadium · Atlanta',ch:CAZE},
 {di:7,t:'16h',a:'Suíça',b:'Bósnia e Herzegovina',g:'B',r:2,v:'SoFi Stadium · Los Angeles',ch:FULL},
 {di:7,t:'19h',a:'Canadá',b:'Catar',g:'B',r:2,v:'BC Place · Vancouver',ch:CAZE},
 {di:7,t:'22h',a:'México',b:'Coreia do Sul',g:'A',r:2,v:'Estadio Guadalajara · Guadalajara',ch:GLOBOX},
 {di:8,t:'16h',a:'Estados Unidos',b:'Austrália',g:'D',r:2,v:'Lumen Field · Seattle',ch:CAZE},
 {di:8,t:'19h',a:'Escócia',b:'Marrocos',g:'C',r:2,v:'Gillette Stadium · Boston',ch:CAZE},
 {di:8,t:'21h30',a:'Brasil',b:'Haiti',g:'C',r:2,v:'Lincoln Financial Field · Filadélfia',ch:FULL},
 {di:9,t:'00h',a:'Turquia',b:'Paraguai',g:'D',r:2,v:"Levi's Stadium · São Francisco",ch:GLOBOX},
 {di:9,t:'14h',a:'Holanda',b:'Suécia',g:'F',r:2,v:'NRG Stadium · Houston',ch:CAZE},
 {di:9,t:'17h',a:'Alemanha',b:'Costa do Marfim',g:'E',r:2,v:'BMO Field · Toronto',ch:FULL},
 {di:9,t:'21h',a:'Equador',b:'Curaçao',g:'E',r:2,v:'Arrowhead Stadium · Kansas City',ch:CAZE},
 {di:10,t:'01h',a:'Tunísia',b:'Japão',g:'F',r:2,v:'Estádio BBVA · Monterrey',ch:GLOBOX},
 {di:10,t:'13h',a:'Espanha',b:'Arábia Saudita',g:'H',r:2,v:'Mercedes-Benz Stadium · Atlanta',ch:CAZE},
 {di:10,t:'16h',a:'Bélgica',b:'Irã',g:'G',r:2,v:'SoFi Stadium · Los Angeles',ch:CAZE},
 {di:10,t:'19h',a:'Uruguai',b:'Cabo Verde',g:'H',r:2,v:'Hard Rock Stadium · Miami',ch:FULL},
 {di:10,t:'22h',a:'Nova Zelândia',b:'Egito',g:'G',r:2,v:'BC Place · Vancouver',ch:GLOBOX},
 {di:11,t:'1h',a:'Noruega',b:'Senegal',g:'I',r:2,v:'New York/New Jersey Stadium · Nova Jersey',ch:GLOBOX},
 {di:11,t:'14h',a:'Argentina',b:'Áustria',g:'J',r:2,v:'AT&T Stadium · Dallas',ch:FULL},
 {di:11,t:'18h',a:'França',b:'Iraque',g:'I',r:2,v:'Lincoln Financial Field · Filadélfia',ch:CAZE},
 {di:12,t:'00h',a:'Jordânia',b:'Argélia',g:'J',r:2,v:"Levi's Stadium · São Francisco",ch:GLOBOX},
 {di:12,t:'14h',a:'Portugal',b:'Uzbequistão',g:'K',r:2,v:'NRG Stadium · Houston',ch:CAZE},
 {di:12,t:'17h',a:'Inglaterra',b:'Gana',g:'L',r:2,v:'Gillette Stadium · Boston',ch:FULL},
 {di:12,t:'20h',a:'Panamá',b:'Croácia',g:'L',r:2,v:'BMO Field · Toronto',ch:CAZE},
 {di:12,t:'23h',a:'Colômbia',b:'Rep. Dem. do Congo',g:'K',r:2,v:'Estadio Akron · Guadalajara',ch:GLOBOX},
 {di:13,t:'16h',a:'Suíça',b:'Canadá',g:'B',r:3,v:'BC Place · Vancouver',ch:CAZE},
 {di:13,t:'16h',a:'Bósnia e Herzegovina',b:'Catar',g:'B',r:3,v:'Lumen Field · Seattle',ch:CAZE},
 {di:13,t:'19h',a:'Escócia',b:'Brasil',g:'C',r:3,v:'Hard Rock Stadium · Miami',ch:FULL},
 {di:13,t:'19h',a:'Marrocos',b:'Haiti',g:'C',r:3,v:'Mercedes-Benz Stadium · Atlanta',ch:CAZE},
 {di:13,t:'22h',a:'República Tcheca',b:'México',g:'A',r:3,v:'Estádio Azteca · Cidade do México',ch:CAZE},
 {di:13,t:'22h',a:'África do Sul',b:'Coreia do Sul',g:'A',r:3,v:'Estádio BBVA · Monterrey',ch:CAZE},
 {di:14,t:'3h',a:'Turquia',b:'Estados Unidos',g:'D',r:3,v:'SoFi Stadium · Los Angeles',ch:CAZE},
 {di:14,t:'17h',a:'Curaçao',b:'Costa do Marfim',g:'E',r:3,v:'Lincoln Financial Field · Filadélfia',ch:CAZE},
 {di:14,t:'17h',a:'Equador',b:'Alemanha',g:'E',r:3,v:'MetLife Stadium · Nova York',ch:CAZE},
 {di:14,t:'20h',a:'Japão',b:'Suécia',g:'F',r:3,v:'AT&T Stadium · Dallas',ch:CAZE},
 {di:14,t:'20h',a:'Tunísia',b:'Holanda',g:'F',r:3,v:'Arrowhead Stadium · Kansas City',ch:CAZE},
 {di:14,t:'23h',a:'Paraguai',b:'Austrália',g:'D',r:3,v:"Levi's Stadium · São Francisco",ch:CAZE},
 {di:15,t:'16h',a:'Noruega',b:'França',g:'I',r:3,v:'Gillette Stadium · Boston',ch:CAZE},
 {di:15,t:'16h',a:'Senegal',b:'Iraque',g:'I',r:3,v:'BMO Field · Toronto',ch:CAZE},
 {di:15,t:'21h',a:'Cabo Verde',b:'Arábia Saudita',g:'H',r:3,v:'NRG Stadium · Houston',ch:CAZE},
 {di:15,t:'21h',a:'Uruguai',b:'Espanha',g:'H',r:3,v:'Estadio Akron · Guadalajara',ch:CAZE},
 {di:16,t:'00h',a:'Egito',b:'Irã',g:'G',r:3,v:'Lumen Field · Seattle',ch:CAZE},
 {di:16,t:'00h',a:'Nova Zelândia',b:'Bélgica',g:'G',r:3,v:'BC Place · Vancouver',ch:CAZE},
 {di:16,t:'18h',a:'Panamá',b:'Inglaterra',g:'L',r:3,v:'MetLife Stadium · Nova York',ch:CAZE},
 {di:16,t:'18h',a:'Croácia',b:'Gana',g:'L',r:3,v:'Lincoln Financial Field · Filadélfia',ch:CAZE},
 {di:16,t:'20h30',a:'Colômbia',b:'Portugal',g:'K',r:3,v:'Hard Rock Stadium · Miami',ch:CAZE},
 {di:16,t:'20h30',a:'Rep. Dem. do Congo',b:'Uzbequistão',g:'K',r:3,v:'Mercedes-Benz Stadium · Atlanta',ch:CAZE},
 {di:16,t:'23h',a:'Argélia',b:'Áustria',g:'J',r:3,v:'Arrowhead Stadium · Kansas City',ch:CAZE},
 {di:16,t:'23h',a:'Jordânia',b:'Argentina',g:'J',r:3,v:'AT&T Stadium · Dallas',ch:CAZE},
];
const DAYS=[
 {dow:'Quinta',n:'11 jun'},{dow:'Sexta',n:'12 jun'},{dow:'Sábado',n:'13 jun'},{dow:'Domingo',n:'14 jun'},
 {dow:'Segunda',n:'15 jun'},{dow:'Terça',n:'16 jun'},{dow:'Quarta',n:'17 jun'},{dow:'Quinta',n:'18 jun'},
 {dow:'Sexta',n:'19 jun'},{dow:'Sábado',n:'20 jun'},{dow:'Domingo',n:'21 jun'},{dow:'Segunda',n:'22 jun'},
 {dow:'Terça',n:'23 jun'},{dow:'Quarta',n:'24 jun'},{dow:'Quinta',n:'25 jun'},{dow:'Sexta',n:'26 jun'},{dow:'Sábado',n:'27 jun'},
];

/* EN->PT p/ casar placares da API com a tabela */
const PT={Algeria:"Argélia",Argentina:"Argentina",Australia:"Austrália",Austria:"Áustria",Belgium:"Bélgica",
"Bosnia & Herzegovina":"Bósnia e Herzegovina",Brazil:"Brasil",Canada:"Canadá","Cape Verde":"Cabo Verde",
Colombia:"Colômbia",Croatia:"Croácia","Curaçao":"Curaçao","Czech Republic":"República Tcheca","DR Congo":"Rep. Dem. do Congo",
Ecuador:"Equador",Egypt:"Egito",England:"Inglaterra",France:"França",Germany:"Alemanha",Ghana:"Gana",Haiti:"Haiti",
Iran:"Irã",Iraq:"Iraque","Ivory Coast":"Costa do Marfim",Japan:"Japão",Jordan:"Jordânia",Mexico:"México",Morocco:"Marrocos",
Netherlands:"Holanda","New Zealand":"Nova Zelândia",Norway:"Noruega",Panama:"Panamá",Paraguay:"Paraguai",Portugal:"Portugal",
Qatar:"Catar","Saudi Arabia":"Arábia Saudita",Scotland:"Escócia",Senegal:"Senegal","South Africa":"África do Sul",
"South Korea":"Coreia do Sul",Spain:"Espanha",Sweden:"Suécia",Switzerland:"Suíça",Tunisia:"Tunísia",Turkey:"Turquia",
USA:"Estados Unidos",Uruguay:"Uruguai",Uzbekistan:"Uzbequistão"};

const CAT={'Globo':'aberta','SBT':'aberta','SporTV':'fechada','Globoplay':'stream','ge tv':'youtube','N Sports':'youtube','Cazé TV':'caze'};
const ORD={aberta:0,fechada:1,stream:2,youtube:3,caze:4};
const SP='America/Sao_Paulo';
const $=id=>document.getElementById(id);
const pairKey=(a,b)=>[a,b].sort().join('|');

/* ---------- bandeiras (nome PT -> código ISO p/ flagcdn) ---------- */
const ISO={
  'México':'mx','África do Sul':'za','Coreia do Sul':'kr','República Tcheca':'cz','Canadá':'ca',
  'Bósnia e Herzegovina':'ba','Estados Unidos':'us','Paraguai':'py','Catar':'qa','Suíça':'ch',
  'Brasil':'br','Marrocos':'ma','Haiti':'ht','Escócia':'gb-sct','Austrália':'au','Turquia':'tr',
  'Alemanha':'de','Curaçao':'cw','Holanda':'nl','Japão':'jp','Costa do Marfim':'ci','Equador':'ec',
  'Suécia':'se','Tunísia':'tn','Espanha':'es','Cabo Verde':'cv','Bélgica':'be','Egito':'eg',
  'Arábia Saudita':'sa','Uruguai':'uy','Irã':'ir','Nova Zelândia':'nz','França':'fr','Senegal':'sn',
  'Iraque':'iq','Noruega':'no','Argentina':'ar','Argélia':'dz','Áustria':'at','Jordânia':'jo',
  'Portugal':'pt','Rep. Dem. do Congo':'cd','Inglaterra':'gb-eng','Croácia':'hr','Gana':'gh',
  'Panamá':'pa','Uzbequistão':'uz','Colômbia':'co',
};
/* emoji p/ fallback offline (regional indicators; Escócia/Inglaterra usam sequência de subdivisão) */
function flagEmoji(code){
  if(code==='gb-sct') return '🏴󠁧󠁢󠁳󠁣󠁴󠁿';
  if(code==='gb-eng') return '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
  return code.toUpperCase().replace(/./g,c=>String.fromCodePoint(127397+c.charCodeAt(0)));
}
/* <img> do CDN com emoji no alt; se a imagem falhar (offline/preview), o onerror troca pelo emoji */
function flag(n){
  const code=ISO[n]; if(!code) return '';
  const emo=flagEmoji(code);
  return `<img class="flag" src="https://flagcdn.com/${code}.svg" alt="${emo}" width="20" loading="lazy" decoding="async" onerror="const s=document.createElement('span');s.className='flag flag-emoji';s.textContent=this.alt;this.replaceWith(s);">`;
}

/* enriquecer tabela */
M.forEach(m=>{
  m.isBr=m.a==='Brasil'||m.b==='Brasil';
  m.open=m.ch.some(c=>c==='Globo'||c==='SBT');
  m.cazeOnly=m.ch.length===1;
  const pm=m.t.match(/(\d{1,2})h(\d{2})?/); m.min=parseInt(pm[1])*60+(pm[2]?+pm[2]:0);
  const day=String(11+m.di).padStart(2,'0'), hh=String(Math.floor(m.min/60)).padStart(2,'0'), mm=String(m.min%60).padStart(2,'0');
  m.ts=Date.parse(`2026-06-${day}T${hh}:${mm}:00-03:00`);
  m.pk=pairKey(m.a,m.b);
  m.score=null;
  m.q=(m.a+' '+m.b).toLowerCase();
});

let filter='all', query='';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const team=(n,br)=>`${flag(n)}${br&&n==='Brasil'?`<span class="br-name">${esc(n)}</span>`:esc(n)}`;
const pills=ch=>[...ch].sort((x,y)=>ORD[CAT[x]]-ORD[CAT[y]]).map(c=>{const k=CAT[c];return `<span class="pill p-${k}"><i class="${k}"></i>${esc(c)}</span>`;}).join('');

function statusOf(m){
  const now=Date.now(), end=m.ts+135*60000;
  if(m.score) return {fin:true,txt:`${m.score[0]} × ${m.score[1]}`,cls:'done',label:'Encerrado'};
  if(now<m.ts) return {txt:m.t,label:'BRT'};
  if(now<end)  return {txt:m.t,cls:'live',label:'Em andamento'};
  return {txt:m.t,label:'Aguardando'};
}
function matchHTML(m){
  const st=statusOf(m);
  const cls=['match',m.isBr?'is-br':'',(m.open&&!m.isBr)?'open':''].join(' ').trim();
  const top=st.fin?`<div class="score">${st.txt}</div>`:`<div class="time">${st.txt}</div>`;
  const line=st.cls?`<span class="status ${st.cls}"><span class="d"></span>${st.label}</span>`:`<small>${st.label}</small>`;
  return `<div class="${cls}" data-q="${m.q}">
    <div class="tcol">${top}${line}</div>
    <div class="body">
      <div class="teams">${team(m.a,m.isBr)} <span class="vs">×</span> ${team(m.b,m.isBr)}</div>
      <div class="meta"><span class="badge">Grupo ${m.g}</span><span class="badge">${m.r}ª rodada</span><span>${esc(m.v)}</span></div>
      <div class="chans">${pills(m.ch)}</div>
    </div>
  </div>`;
}
function pass(m){
  if(query && !m.q.includes(query)) return false;
  if(filter==='br') return m.isBr;
  if(filter==='open') return m.open;
  if(filter==='caze') return m.cazeOnly;
  return true;
}
function render(){
  const today=new Date().toLocaleDateString('en-CA',{timeZone:SP});
  let html='', total=0;
  for(let di=0;di<DAYS.length;di++){
    const games=M.filter(m=>m.di===di&&pass(m)).sort((a,b)=>a.min-b.min);
    if(!games.length) continue;
    total+=games.length;
    const dayDate=`2026-06-${String(11+di).padStart(2,'0')}`;
    const badge=dayDate===today?'<span class="today">Hoje</span>':'';
    html+=`<section class="day"><div class="day-head"><span class="dow">${DAYS[di].dow}</span><span class="dnum">${DAYS[di].n}</span>${badge}</div>${games.map(matchHTML).join('')}</section>`;
  }
  $('list').innerHTML=html;
  const lbl=filter==='br'?'jogos do Brasil':filter==='open'?'jogos na TV aberta':filter==='caze'?'jogos só na Cazé TV':'jogos';
  $('count').innerHTML=`<b>${total}</b> ${query?'resultado(s)':lbl}`;
}

/* ---------- camada ao vivo (placares) ---------- */
const API="https://raw.githubusercontent.com/openfootball/worldcup.json/master/2026/worldcup.json";
function setSrc(state,text){
  const el=$('src'); el.classList.remove('ok','off');
  if(state) el.classList.add(state);
  $('srcText').textContent=text;
}
async function fetchLive(){
  const btn=$('refresh'); btn.disabled=true; btn.classList.add('spin');
  setSrc('', 'Buscando placares…');
  try{
    const res=await fetch(API+'?t='+Date.now(),{cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const data=await res.json();
    const scores={};
    data.matches.forEach(x=>{
      if(x.score&&x.score.ft){
        const a=PT[x.team1]||x.team1, b=PT[x.team2]||x.team2;
        scores[pairKey(a,b)]=x.score.ft;
      }
    });
    let n=0;
    M.forEach(m=>{ if(scores[m.pk]){ m.score=scores[m.pk]; n++; } });
    const hora=new Date().toLocaleTimeString('pt-BR',{timeZone:SP,hour:'2-digit',minute:'2-digit'});
    setSrc('ok', n?`Ao vivo · ${n} placar(es) · ${hora}`:`Conectado · sem placares ainda · ${hora}`);
    render();
  }catch(e){
    setSrc('off','Sem conexão ao vivo — tabela embutida (abra o arquivo no navegador)');
    console.warn('Live indisponível:',e.message);
  }finally{
    btn.disabled=false; btn.classList.remove('spin');
  }
}

document.querySelectorAll('.chip').forEach(b=>b.addEventListener('click',()=>{
  filter=b.dataset.f;
  document.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));
  render();
}));
$('q').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();render();});
$('refresh').addEventListener('click',fetchLive);

render();              // mostra a tabela na hora
fetchLive();           // tenta os placares por cima (silencioso se falhar)
