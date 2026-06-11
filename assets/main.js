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

/* apelidos extras p/ as grafias da ESPN que diferem do mapa acima */
const ALIAS={"United States":"Estados Unidos",Czechia:"República Tcheca","Türkiye":"Turquia",Turkiye:"Turquia",
"Korea Republic":"Coreia do Sul","Côte d'Ivoire":"Costa do Marfim","Cote d'Ivoire":"Costa do Marfim",
"Congo DR":"Rep. Dem. do Congo","Bosnia and Herzegovina":"Bósnia e Herzegovina","IR Iran":"Irã"};
const _norm=s=>s.normalize('NFD').replace(/[̀-ͯ]/g,'').toLowerCase().replace(/[^a-z]/g,'');
const _ptNorm={}; Object.entries(PT).forEach(([en,pt])=>_ptNorm[_norm(en)]=pt); Object.values(PT).forEach(pt=>_ptNorm[_norm(pt)]=pt);
function toPT(name){
  if(!name) return null;
  if(PT[name]) return PT[name];
  if(ALIAS[name]) return ALIAS[name];
  return _ptNorm[_norm(name)]||null;
}

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
function flag(n,after){
  const code=ISO[n]; if(!code) return '';
  const emo=flagEmoji(code), cls=after?'flag flag-after':'flag';
  return `<img class="${cls}" src="https://flagcdn.com/${code}.svg" alt="${emo}" width="20" loading="lazy" decoding="async" onerror="const s=document.createElement('span');s.className=this.className+' flag-emoji';s.textContent=this.alt;this.replaceWith(s);">`;
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
  m.score=null;   // placar final [a,b]
  m.live=null;    // jogo em andamento {a,b,clock}
  m.eid=null;     // id do evento na ESPN (p/ buscar estatísticas)
  m.q=(m.a+' '+m.b).toLowerCase();
});
const byPk={}; M.forEach(m=>{ byPk[m.pk]=m; });   // chave do par -> jogo
const byEid={};                                    // id ESPN -> jogo (preenchido ao buscar)

let filter='all', query='', todayDI=-1;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
/* nomes grandes -> versão curta só p/ exibição (busca/API seguem usando o nome completo) */
const ABBR={'Rep. Dem. do Congo':'RD Congo','Bósnia e Herzegovina':'Bósnia','Estados Unidos':'EUA','República Tcheca':'Rep. Tcheca'};
const team=(n,br,after)=>{
  const disp=esc(ABBR[n]||n);
  const name=br&&n==='Brasil'?`<span class="br-name">${disp}</span>`:disp;
  return after?`${name}${flag(n,true)}`:`${flag(n)}${name}`;
};
const pills=ch=>[...ch].sort((x,y)=>ORD[CAT[x]]-ORD[CAT[y]]).map(c=>{const k=CAT[c];return `<span class="pill p-${k}"><i class="${k}"></i>${esc(c)}</span>`;}).join('');

function statusOf(m){
  const now=Date.now(), end=m.ts+135*60000;
  if(m.live)  return {score:[m.live.a,m.live.b],live:true,half:m.live.half,left:m.live.half?'Intervalo':(m.live.clock||"AO VIVO"),cls:'live',label:'Ao vivo'};
  if(m.score) return {score:m.score,fin:true,left:m.t,cls:'done',label:'Encerrado'};
  if(now<m.ts) return {left:m.t,label:'BRT'};
  if(now<end)  return {left:m.t,cls:'live',label:'Em andamento'};
  return {left:m.t,label:'Aguardando'};
}
function matchHTML(m){
  const st=statusOf(m);
  const playable=!!(m.live||m.score)&&!!m.eid;   // só ao vivo/encerrado tem estatísticas
  const isOpen=playable&&openSet.has(m.eid);
  const cls=['match',m.isBr?'is-br':'',(m.open&&!m.isBr)?'open':'',m.live?'islive':'',playable?'has-stats':'',isOpen?'expanded':''].join(' ').replace(/\s+/g,' ').trim();
  const top=`<div class="time${st.live?' islive':''}${st.half?' half':''}">${st.left}</div>`;
  const line=st.cls?`<span class="status ${st.cls}"><span class="d"></span>${st.label}</span>`:`<small>${st.label}</small>`;
  const mid=st.score
    ? `<span class="sc${st.live?' islive':''}">${st.score[0]}</span><span class="vs">×</span><span class="sc${st.live?' islive':''}">${st.score[1]}</span>`
    : `<span class="vs">×</span>`;
  const toggle=playable?`<div class="stat-toggle">Estatísticas <span class="chev">▾</span></div>`:'';
  const statbox=playable?`<div class="statbox" data-eid="${m.eid}"${isOpen?'':' hidden'}>${isOpen?(statCache[m.eid]||'<div class="stat-empty">Carregando estatísticas…</div>'):''}</div>`:'';
  return `<div class="${cls}"${playable?` data-eid="${m.eid}"`:''} data-q="${m.q}">
    <div class="tcol">${top}${line}</div>
    <div class="body">
      <div class="teams">${team(m.a,m.isBr)} ${mid} ${team(m.b,m.isBr,true)}</div>
      <div class="meta"><span class="badge">Grupo ${m.g}</span><span class="badge">${m.r}ª rodada</span><span>${esc(m.v)}</span></div>
      <div class="chans">${pills(m.ch)}</div>
      ${toggle}
    </div>
    ${statbox}
  </div>`;
}
/* encerrado: tem placar final, ou já passou do fim estimado e não está mais ao vivo */
const isPast=m=>!!m.score||(!m.live&&Date.now()>m.ts+135*60000);
function pass(m){
  if(query && !m.q.includes(query)) return false;
  if(filter==='br') return m.isBr;
  if(filter==='open') return m.open;
  if(filter==='caze') return m.cazeOnly;
  if(filter==='done') return isPast(m);
  if(filter==='next') return !isPast(m);
  return true;
}
/* índice do dia de hoje na tabela (-1 se fora do período da Copa) */
function todayIndex(){
  const today=new Date().toLocaleDateString('en-CA',{timeZone:SP});
  for(let di=0;di<DAYS.length;di++){
    if(`2026-06-${String(11+di).padStart(2,'0')}`===today) return di;
  }
  return -1;
}
function renderToday(){
  const el=$('todayPanel'); if(!el) return;
  const games=todayDI<0?[]:M.filter(m=>m.di===todayDI&&pass(m)).sort((a,b)=>a.min-b.min);
  if(!games.length){
    // sem filtro/busca ativos mostra o aviso; com filtro ativo apenas esconde o painel
    el.innerHTML=(filter==='all'&&!query)?'<div class="today-empty">Nenhum jogo hoje</div>':'';
    return;
  }
  el.innerHTML=`<div class="today-head"><span class="today-kicker">Jogos de hoje</span><span class="today-date">${DAYS[todayDI].dow} · ${DAYS[todayDI].n}</span></div>${games.map(matchHTML).join('')}`;
}
function render(){
  todayDI=todayIndex();
  let html='', total=0;
  for(let di=0;di<DAYS.length;di++){
    if(di===todayDI) continue;   // jogos de hoje ficam só no painel do topo
    const games=M.filter(m=>m.di===di&&pass(m)).sort((a,b)=>a.min-b.min);
    if(!games.length) continue;
    total+=games.length;
    html+=`<section class="day"><div class="day-head"><span class="dow">${DAYS[di].dow}</span><span class="dnum">${DAYS[di].n}</span></div>${games.map(matchHTML).join('')}</section>`;
  }
  $('list').innerHTML=html;
  // soma os jogos de hoje (que ficam no painel do topo) respeitando o filtro/busca
  if(todayDI>=0) total+=M.filter(m=>m.di===todayDI&&pass(m)).length;
  const lbl=filter==='br'?'jogos do Brasil':filter==='open'?'jogos na TV aberta':filter==='caze'?'jogos só na Cazé TV':filter==='done'?'jogos encerrados':filter==='next'?'próximos jogos':'jogos';
  $('count').innerHTML=`<b>${total}</b> ${query?'resultado(s)':lbl}`;
  renderToday();
}

/* ---------- camada ao vivo (placares via API pública da ESPN) ---------- */
const API="https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard";
function setSrc(state,text){
  const el=$('src'); el.classList.remove('ok','off');
  if(state) el.classList.add(state);
  $('srcText').textContent=text;
}
/* casa os eventos da ESPN com a tabela: id, placar final e/ou jogo ao vivo */
function applyEvents(events){
  let live=0, fin=0;
  (events||[]).forEach(ev=>{
    const c=ev.competitions&&ev.competitions[0]; if(!c||!c.competitors||c.competitors.length<2) return;
    const home=c.competitors.find(x=>x.homeAway==='home')||c.competitors[0];
    const away=c.competitors.find(x=>x.homeAway==='away')||c.competitors[1];
    const ph=toPT(home.team&&(home.team.displayName||home.team.name));
    const pa=toPT(away.team&&(away.team.displayName||away.team.name));
    if(!ph||!pa) return;
    const m=byPk[pairKey(ph,pa)]; if(!m) return;
    if(ev.id){ m.eid=String(ev.id); byEid[m.eid]=m; }
    const st=(ev.status||c.status||{}), tp=st.type||{}, state=tp.state;   // pre | in | post
    const goals={[ph]:+home.score||0,[pa]:+away.score||0};
    if(state==='post'){ m.score=[goals[m.a],goals[m.b]]; m.live=null; fin++; }
    else if(state==='in'){
      const half=tp.name==='STATUS_HALFTIME'||/halftime/i.test(tp.description||'');   // intervalo
      m.live={a:goals[m.a],b:goals[m.b],clock:st.displayClock||'',half}; m.score=null; live++;
    }
    else { m.live=null; }
  });
  return {live,fin};
}
let liveBusy=false;
async function fetchLive(silent=false){
  if(liveBusy) return;            // evita buscas sobrepostas (auto-refresh + clique)
  liveBusy=true;
  const btn=$('refresh');
  if(!silent){ btn.disabled=true; btn.classList.add('spin'); setSrc('', 'Buscando placares…'); }
  try{
    const res=await fetch(API,{cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const {live,fin}=applyEvents((await res.json()).events);
    const hora=new Date().toLocaleTimeString('pt-BR',{timeZone:SP,hour:'2-digit',minute:'2-digit'});
    setSrc('ok', live?`${live} jogo(s) ao vivo · ${hora}`:(fin?`Atualizado · ${hora}`:`Conectado · ${hora}`));
    render();
    refreshOpenLive();             // atualiza painéis de stats abertos de jogos ao vivo
  }catch(e){
    setSrc('off','Sem conexão ao vivo — tabela embutida');
    console.warn('Live indisponível:',e.message);
  }finally{
    liveBusy=false;
    if(!silent){ btn.disabled=false; btn.classList.remove('spin'); }
  }
}
/* uma vez no carregamento: pega ids e placares finais de todos os dias do torneio */
async function fetchSeason(){
  try{
    const res=await fetch(API+'?dates=20260611-20260719',{cache:'no-store'});
    if(!res.ok) return;
    applyEvents((await res.json()).events);
    render();
  }catch(e){ console.warn('Histórico indisponível:',e.message); }
}

/* ---------- estatísticas da partida (clique no card) ---------- */
const SUMMARY="https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/summary?event=";
const STAT_DEFS=[
  {k:'possessionPct',label:'Posse de bola',pct:true},
  {k:'totalShots',label:'Finalizações'},
  {k:'shotsOnTarget',label:'No alvo'},
  {k:'wonCorners',label:'Escanteios'},
  {k:'foulsCommitted',label:'Faltas'},
  {k:'yellowCards',label:'Cartões amarelos'},
  {k:'redCards',label:'Cartões vermelhos',hideZero:true},   // só aparece se houver ao menos um
];
const statCache={};        // eid -> html (cache de jogo encerrado)
const openSet=new Set();   // eids com painel aberto
const statVal=(t,k)=>{ const s=(t.statistics||[]).find(x=>x.name===k); return s?parseFloat(s.displayValue):null; };
function buildStats(m,box){
  const teams=(box&&box.teams)||[];
  let ta=null, tb=null;
  teams.forEach(t=>{ const pt=toPT(t.team&&(t.team.displayName||t.team.name)); if(pt===m.a)ta=t; else if(pt===m.b)tb=t; });
  if(!ta||!tb) return '<div class="stat-empty">Estatísticas indisponíveis para esta partida.</div>';
  const hex=c=>c?'#'+String(c).replace('#',''):null;
  const col=t=>hex(t.team&&t.team.color), alt=t=>hex(t.team&&t.team.alternateColor);
  const rgb=h=>{const n=h.slice(1);return [parseInt(n.slice(0,2),16),parseInt(n.slice(2,4),16),parseInt(n.slice(4,6),16)];};
  const dist=(x,y)=>{const a=rgb(x),b=rgb(y);return Math.hypot(a[0]-b[0],a[1]-b[1],a[2]-b[2]);};
  const lum=h=>{const [r,g,b]=rgb(h);return (0.299*r+0.587*g+0.114*b)/255;};
  const ol=h=>lum(h)>0.78?';box-shadow:inset 0 0 0 1px rgba(0,0,0,.28)':'';   // contorno p/ cor clara (ex.: branco no tema claro)
  const ca=col(ta)||'#f6c544';
  let cb=col(tb)||'#6db5ff';
  // cores principais parecidas? usa a cor secundária do 2º time (se for mais distinta)
  const altB=alt(tb);
  if(altB&&dist(ca,cb)<70&&dist(ca,altB)>dist(ca,cb)) cb=altB;
  let rows='';
  STAT_DEFS.forEach(d=>{
    let va=statVal(ta,d.k), vb=statVal(tb,d.k);
    if(va==null&&vb==null) return;
    va=va||0; vb=vb||0;
    if(d.hideZero&&va+vb===0) return;   // ex.: cartões vermelhos só se houver
    const sum=va+vb, share=sum?Math.round(va/sum*100):50, sfx=d.pct?'%':'';
    rows+=`<div class="stat-row"><span class="stat-v sa">${va}${sfx}</span><div class="stat-mid"><span class="stat-label">${d.label}</span><div class="stat-bar" style="background:${cb}${ol(cb)}"><i style="width:${share}%;background:${ca}${ol(ca)}"></i></div></div><span class="stat-v sb">${vb}${sfx}</span></div>`;
  });
  return rows||'<div class="stat-empty">Sem estatísticas ainda.</div>';
}
const paintStats=(eid,html)=>document.querySelectorAll('.statbox[data-eid="'+eid+'"]').forEach(b=>b.innerHTML=html);
async function loadStats(eid){
  const m=byEid[eid]; if(!m) return;
  if(statCache[eid]&&!m.live){ paintStats(eid,statCache[eid]); return; }   // encerrado: usa cache
  paintStats(eid,'<div class="stat-empty">Carregando estatísticas…</div>');
  try{
    const data=await (await fetch(SUMMARY+eid,{cache:'no-store'})).json();
    const html=buildStats(m,data.boxscore);
    if(!m.live) statCache[eid]=html;
    paintStats(eid,html);
  }catch(e){ paintStats(eid,'<div class="stat-empty">Não foi possível carregar as estatísticas.</div>'); }
}
function refreshOpenLive(){ openSet.forEach(eid=>{ const m=byEid[eid]; if(m&&m.live) loadStats(eid); }); }
function toggleStats(eid){
  if(openSet.has(eid)) openSet.delete(eid); else openSet.add(eid);
  render();
  if(openSet.has(eid)) loadStats(eid);
}
document.addEventListener('click',e=>{
  if(e.target.closest('.statbox')) return;        // cliques dentro do painel não fecham
  const card=e.target.closest('.match.has-stats');
  if(card&&card.dataset.eid) toggleStats(card.dataset.eid);
});

/* ---------- auto-refresh: 30s quando há jogo ao vivo, 5min caso contrário; pausa em aba oculta ---------- */
function hasLive(){ return M.some(m=>m.live); }
let liveTimer=null;
function scheduleNext(){
  clearTimeout(liveTimer);
  liveTimer=setTimeout(async()=>{
    if(!document.hidden) await fetchLive(true);
    scheduleNext();
  }, hasLive()?30000:300000);
}
document.addEventListener('visibilitychange',()=>{ if(!document.hidden) fetchLive(true); });

document.querySelectorAll('.chip').forEach(b=>b.addEventListener('click',()=>{
  filter=b.dataset.f;
  document.querySelectorAll('.chip').forEach(x=>x.setAttribute('aria-pressed',x===b));
  render();
}));
$('q').addEventListener('input',e=>{query=e.target.value.trim().toLowerCase();render();});
$('refresh').addEventListener('click',()=>fetchLive());

/* ---------- tema claro / escuro ---------- */
$('themeToggle').addEventListener('click',()=>{
  const next=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
  document.documentElement.setAttribute('data-theme',next);
  document.querySelector('meta[name="theme-color"]').setAttribute('content',next==='light'?'#eef2f6':'#0c1620');
  try{localStorage.setItem('gdc-theme',next);}catch(e){}
});

function reveal(){ document.body.classList.add('ready'); }
render();                          // monta a tabela (ainda escondida pelo overlay)
fetchLive().then(scheduleNext).finally(reveal);   // revela após carregar os placares
fetchSeason();                     // ids e resultados dos demais dias (p/ estatísticas)
setTimeout(reveal, 6000);          // fallback: nunca deixa a tela travada no "carregando"
