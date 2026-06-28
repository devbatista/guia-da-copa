/* ---------- canais: grade estática de assets/transmissao.js (ver applyChannels) ---------- */

/* ---------- tabela embutida (di = dia: 0 = 11/jun ... 16 = 27/jun) ---------- */
const M=[
 {di:0,t:'16h',a:'México',b:'África do Sul',g:'A',r:1,v:'Estádio Azteca · Cidade do México'},
 {di:0,t:'23h',a:'Coreia do Sul',b:'República Tcheca',g:'A',r:1,v:'Estádio Akron · Guadalajara'},
 {di:1,t:'16h',a:'Canadá',b:'Bósnia e Herzegovina',g:'B',r:1,v:'BMO Field · Toronto'},
 {di:1,t:'22h',a:'Estados Unidos',b:'Paraguai',g:'D',r:1,v:'SoFi Stadium · Los Angeles'},
 {di:2,t:'16h',a:'Catar',b:'Suíça',g:'B',r:1,v:"Levi's Stadium · São Francisco"},
 {di:2,t:'19h',a:'Brasil',b:'Marrocos',g:'C',r:1,v:'MetLife Stadium · Nova York'},
 {di:2,t:'22h',a:'Haiti',b:'Escócia',g:'C',r:1,v:'Gillette Stadium · Boston'},
 {di:3,t:'01h',a:'Austrália',b:'Turquia',g:'D',r:1,v:'BC Place · Vancouver'},
 {di:3,t:'14h',a:'Alemanha',b:'Curaçao',g:'E',r:1,v:'NRG Stadium · Houston'},
 {di:3,t:'17h',a:'Holanda',b:'Japão',g:'F',r:1,v:'AT&T Stadium · Dallas'},
 {di:3,t:'20h',a:'Costa do Marfim',b:'Equador',g:'E',r:1,v:'Lincoln Financial Field · Filadélfia'},
 {di:3,t:'23h',a:'Suécia',b:'Tunísia',g:'F',r:1,v:'Estádio BBVA · Monterrey'},
 {di:4,t:'13h',a:'Espanha',b:'Cabo Verde',g:'H',r:1,v:'Mercedes-Benz Stadium · Atlanta'},
 {di:4,t:'16h',a:'Bélgica',b:'Egito',g:'G',r:1,v:'Lumen Field · Seattle'},
 {di:4,t:'19h',a:'Arábia Saudita',b:'Uruguai',g:'H',r:1,v:'Hard Rock Stadium · Miami'},
 {di:4,t:'22h',a:'Irã',b:'Nova Zelândia',g:'G',r:1,v:'SoFi Stadium · Los Angeles'},
 {di:5,t:'16h',a:'França',b:'Senegal',g:'I',r:1,v:'MetLife Stadium · Nova York'},
 {di:5,t:'19h',a:'Iraque',b:'Noruega',g:'I',r:1,v:'Gillette Stadium · Boston'},
 {di:5,t:'22h',a:'Argentina',b:'Argélia',g:'J',r:1,v:'Arrowhead Stadium · Kansas City'},
 {di:6,t:'01h',a:'Áustria',b:'Jordânia',g:'J',r:1,v:"Levi's Stadium · São Francisco"},
 {di:6,t:'14h',a:'Portugal',b:'Rep. Dem. do Congo',g:'K',r:1,v:'NRG Stadium · Houston'},
 {di:6,t:'17h',a:'Inglaterra',b:'Croácia',g:'L',r:1,v:'AT&T Stadium · Dallas'},
 {di:6,t:'20h',a:'Gana',b:'Panamá',g:'L',r:1,v:'BMO Field · Toronto'},
 {di:6,t:'23h',a:'Uzbequistão',b:'Colômbia',g:'K',r:1,v:'Estádio Azteca · Cidade do México'},
 {di:7,t:'13h',a:'República Tcheca',b:'África do Sul',g:'A',r:2,v:'Mercedes-Benz Stadium · Atlanta'},
 {di:7,t:'16h',a:'Suíça',b:'Bósnia e Herzegovina',g:'B',r:2,v:'SoFi Stadium · Los Angeles'},
 {di:7,t:'19h',a:'Canadá',b:'Catar',g:'B',r:2,v:'BC Place · Vancouver'},
 {di:7,t:'22h',a:'México',b:'Coreia do Sul',g:'A',r:2,v:'Estadio Guadalajara · Guadalajara'},
 {di:8,t:'16h',a:'Estados Unidos',b:'Austrália',g:'D',r:2,v:'Lumen Field · Seattle'},
 {di:8,t:'19h',a:'Escócia',b:'Marrocos',g:'C',r:2,v:'Gillette Stadium · Boston'},
 {di:8,t:'21h30',a:'Brasil',b:'Haiti',g:'C',r:2,v:'Lincoln Financial Field · Filadélfia'},
 {di:9,t:'00h',a:'Turquia',b:'Paraguai',g:'D',r:2,v:"Levi's Stadium · São Francisco"},
 {di:9,t:'14h',a:'Holanda',b:'Suécia',g:'F',r:2,v:'NRG Stadium · Houston'},
 {di:9,t:'17h',a:'Alemanha',b:'Costa do Marfim',g:'E',r:2,v:'BMO Field · Toronto'},
 {di:9,t:'21h',a:'Equador',b:'Curaçao',g:'E',r:2,v:'Arrowhead Stadium · Kansas City'},
 {di:10,t:'01h',a:'Tunísia',b:'Japão',g:'F',r:2,v:'Estádio BBVA · Monterrey'},
 {di:10,t:'13h',a:'Espanha',b:'Arábia Saudita',g:'H',r:2,v:'Mercedes-Benz Stadium · Atlanta'},
 {di:10,t:'16h',a:'Bélgica',b:'Irã',g:'G',r:2,v:'SoFi Stadium · Los Angeles'},
 {di:10,t:'19h',a:'Uruguai',b:'Cabo Verde',g:'H',r:2,v:'Hard Rock Stadium · Miami'},
 {di:10,t:'22h',a:'Nova Zelândia',b:'Egito',g:'G',r:2,v:'BC Place · Vancouver'},
 {di:11,t:'21h',a:'Noruega',b:'Senegal',g:'I',r:2,v:'New York/New Jersey Stadium · Nova Jersey'},
 {di:11,t:'14h',a:'Argentina',b:'Áustria',g:'J',r:2,v:'AT&T Stadium · Dallas'},
 {di:11,t:'18h',a:'França',b:'Iraque',g:'I',r:2,v:'Lincoln Financial Field · Filadélfia'},
 {di:12,t:'00h',a:'Jordânia',b:'Argélia',g:'J',r:2,v:"Levi's Stadium · São Francisco"},
 {di:12,t:'14h',a:'Portugal',b:'Uzbequistão',g:'K',r:2,v:'NRG Stadium · Houston'},
 {di:12,t:'17h',a:'Inglaterra',b:'Gana',g:'L',r:2,v:'Gillette Stadium · Boston'},
 {di:12,t:'20h',a:'Panamá',b:'Croácia',g:'L',r:2,v:'BMO Field · Toronto'},
 {di:12,t:'23h',a:'Colômbia',b:'Rep. Dem. do Congo',g:'K',r:2,v:'Estadio Akron · Guadalajara'},
 {di:13,t:'16h',a:'Suíça',b:'Canadá',g:'B',r:3,v:'BC Place · Vancouver'},
 {di:13,t:'16h',a:'Bósnia e Herzegovina',b:'Catar',g:'B',r:3,v:'Lumen Field · Seattle'},
 {di:13,t:'19h',a:'Escócia',b:'Brasil',g:'C',r:3,v:'Hard Rock Stadium · Miami'},
 {di:13,t:'19h',a:'Marrocos',b:'Haiti',g:'C',r:3,v:'Mercedes-Benz Stadium · Atlanta'},
 {di:13,t:'22h',a:'República Tcheca',b:'México',g:'A',r:3,v:'Estádio Azteca · Cidade do México'},
 {di:13,t:'22h',a:'África do Sul',b:'Coreia do Sul',g:'A',r:3,v:'Estádio BBVA · Monterrey'},
 {di:14,t:'23h',a:'Turquia',b:'Estados Unidos',g:'D',r:3,v:'SoFi Stadium · Los Angeles'},
 {di:14,t:'17h',a:'Curaçao',b:'Costa do Marfim',g:'E',r:3,v:'Lincoln Financial Field · Filadélfia'},
 {di:14,t:'17h',a:'Equador',b:'Alemanha',g:'E',r:3,v:'MetLife Stadium · Nova York'},
 {di:14,t:'20h',a:'Japão',b:'Suécia',g:'F',r:3,v:'AT&T Stadium · Dallas'},
 {di:14,t:'20h',a:'Tunísia',b:'Holanda',g:'F',r:3,v:'Arrowhead Stadium · Kansas City'},
 {di:14,t:'23h',a:'Paraguai',b:'Austrália',g:'D',r:3,v:"Levi's Stadium · São Francisco"},
 {di:15,t:'16h',a:'Noruega',b:'França',g:'I',r:3,v:'Gillette Stadium · Boston'},
 {di:15,t:'16h',a:'Senegal',b:'Iraque',g:'I',r:3,v:'BMO Field · Toronto'},
 {di:15,t:'21h',a:'Cabo Verde',b:'Arábia Saudita',g:'H',r:3,v:'NRG Stadium · Houston'},
 {di:15,t:'21h',a:'Uruguai',b:'Espanha',g:'H',r:3,v:'Estadio Akron · Guadalajara'},
 {di:16,t:'00h',a:'Egito',b:'Irã',g:'G',r:3,v:'Lumen Field · Seattle'},
 {di:16,t:'00h',a:'Nova Zelândia',b:'Bélgica',g:'G',r:3,v:'BC Place · Vancouver'},
 {di:16,t:'18h',a:'Panamá',b:'Inglaterra',g:'L',r:3,v:'MetLife Stadium · Nova York'},
 {di:16,t:'18h',a:'Croácia',b:'Gana',g:'L',r:3,v:'Lincoln Financial Field · Filadélfia'},
 {di:16,t:'20h30',a:'Colômbia',b:'Portugal',g:'K',r:3,v:'Hard Rock Stadium · Miami'},
 {di:16,t:'20h30',a:'Rep. Dem. do Congo',b:'Uzbequistão',g:'K',r:3,v:'Mercedes-Benz Stadium · Atlanta'},
 {di:16,t:'23h',a:'Argélia',b:'Áustria',g:'J',r:3,v:'Arrowhead Stadium · Kansas City'},
 {di:16,t:'23h',a:'Jordânia',b:'Argentina',g:'J',r:3,v:'AT&T Stadium · Dallas'},
];
/* dias do torneio: 11/jun (di 0) … 19/jul (di 38). Gerado p/ não errar data/dia-da-semana
   e p/ cobrir o mata-mata, que entra em julho (a virada de mês quebra o "11+di" antigo). */
const _DOW=['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado'];
const _MON=['jan','fev','mar','abr','mai','jun','jul','ago','set','out','nov','dez'];
const DAYS=[];
for(let i=0;i<39;i++){
  const d=new Date(2026,5,11+i);   // mês 5 = junho; JS rola p/ julho sozinho
  const mm=String(d.getMonth()+1).padStart(2,'0'), dd=String(d.getDate()).padStart(2,'0');
  DAYS.push({dow:_DOW[d.getDay()],n:`${d.getDate()} ${_MON[d.getMonth()]}`,iso:`2026-${mm}-${dd}`});
}

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
  m.ch=[]; m.open=false; m.cazeOnly=false;   // grade real preenchida por applyChannels (transmissao.js)
  const pm=m.t.match(/(\d{1,2})h(\d{2})?/); m.min=parseInt(pm[1])*60+(pm[2]?+pm[2]:0);
  const hh=String(Math.floor(m.min/60)).padStart(2,'0'), mm=String(m.min%60).padStart(2,'0');
  m.ts=Date.parse(`${DAYS[m.di].iso}T${hh}:${mm}:00-03:00`);
  m.pk=pairKey(m.a,m.b);
  m.score=null;   // placar final [a,b]
  m.live=null;    // jogo em andamento {a,b,clock}
  m.eid=null;     // id do evento na ESPN (p/ buscar estatísticas)
  m.q=(m.a+' '+m.b).toLowerCase();
});
const byPk={}; M.forEach(m=>{ byPk[m.pk]=m; });   // chave do par -> jogo
const byEid={};                                    // id ESPN -> jogo (preenchido ao buscar)

/* ============================================================
   MATA-MATA — jogos 73–104 na mesma lista cronológica do guia.
   Os times saem da resolução do chaveamento (tabela de grupos +
   propagação dos vencedores), igual à página /mata-mata. Datas e
   horários: calendário oficial FIFA 2026 (horário de Brasília).
   ============================================================ */
/* grupos derivados da própria tabela de grupos (M) — evita duplicar a lista das 12 chaves */
const GROUPS={}, GROUP_OF={};
M.forEach(m=>{ (GROUPS[m.g]=GROUPS[m.g]||new Set()).add(m.a).add(m.b); GROUP_OF[m.a]=m.g; GROUP_OF[m.b]=m.g; });
Object.keys(GROUPS).forEach(g=>GROUPS[g]=[...GROUPS[g]]);

const koResults={};   // confronto de mata-mata: pairKey -> {a,b,ga,gb,winner,pens,live,eid}
const koChByPair={};  // canais do mata-mata vindos do jogos.json: pairKey(times resolvidos) -> [canais]
const KO_FLOOR=['Cazé TV'];   // piso garantido: a Cazé transmite todos os jogos do mata-mata
const diForDate=d=>{ const [dd,mm]=d.split('/').map(Number); return mm===6?dd-11:19+dd; };   // dd/mm -> índice do dia
const PHNAME={r32:'Rodada de 32',r16:'Oitavas',qf:'Quartas',sf:'Semifinais',final:'Final'};

/* grade oficial FIFA 2026 (jogos 73–104). slots: '1A'..'2L' (posição no grupo) ·
   '3:ABCDF' (melhor 3º elegível) · 'W74'/'L101' (vencedor/perdedor do jogo). */
const KO=[
  {id:73, ph:'r32',  d:'28/06', t:'16h',   v:'SoFi Stadium · Los Angeles',           h:'2A',  a:'2B'},
  {id:74, ph:'r32',  d:'29/06', t:'17h30', v:'Gillette Stadium · Boston',            h:'1E',  a:'3:ABCDF'},
  {id:75, ph:'r32',  d:'29/06', t:'22h',   v:'Estádio BBVA · Monterrey',             h:'1F',  a:'2C'},
  {id:76, ph:'r32',  d:'29/06', t:'14h',   v:'NRG Stadium · Houston',                h:'1C',  a:'2F'},
  {id:77, ph:'r32',  d:'30/06', t:'18h',   v:'MetLife Stadium · Nova York',          h:'1I',  a:'3:CDFGH'},
  {id:78, ph:'r32',  d:'30/06', t:'14h',   v:'AT&T Stadium · Dallas',                h:'2E',  a:'2I'},
  {id:79, ph:'r32',  d:'30/06', t:'22h',   v:'Estádio Azteca · Cidade do México',    h:'1A',  a:'3:CEFHI'},
  {id:80, ph:'r32',  d:'01/07', t:'13h',   v:'Mercedes-Benz Stadium · Atlanta',      h:'1L',  a:'3:EHIJK'},
  {id:81, ph:'r32',  d:'01/07', t:'21h',   v:"Levi's Stadium · São Francisco",       h:'1D',  a:'3:BEFIJ'},
  {id:82, ph:'r32',  d:'01/07', t:'17h',   v:'Lumen Field · Seattle',                h:'1G',  a:'3:AEHIJ'},
  {id:83, ph:'r32',  d:'02/07', t:'20h',   v:'BMO Field · Toronto',                  h:'2K',  a:'2L'},
  {id:84, ph:'r32',  d:'02/07', t:'16h',   v:'SoFi Stadium · Los Angeles',           h:'1H',  a:'2J'},
  {id:85, ph:'r32',  d:'02/07', t:'23h',   v:'BC Place · Vancouver',                 h:'1B',  a:'3:EFGIJ'},
  {id:86, ph:'r32',  d:'03/07', t:'19h',   v:'Hard Rock Stadium · Miami',            h:'1J',  a:'2H'},
  {id:87, ph:'r32',  d:'03/07', t:'22h30', v:'Arrowhead Stadium · Kansas City',      h:'1K',  a:'3:DEIJL'},
  {id:88, ph:'r32',  d:'03/07', t:'15h',   v:'AT&T Stadium · Dallas',                h:'2D',  a:'2G'},
  {id:89, ph:'r16',  d:'04/07', t:'18h',   v:'Lincoln Financial Field · Filadélfia', h:'W74', a:'W77'},
  {id:90, ph:'r16',  d:'04/07', t:'14h',   v:'NRG Stadium · Houston',                h:'W73', a:'W75'},
  {id:91, ph:'r16',  d:'05/07', t:'17h',   v:'MetLife Stadium · Nova York',          h:'W76', a:'W78'},
  {id:92, ph:'r16',  d:'05/07', t:'21h',   v:'Estádio Azteca · Cidade do México',    h:'W79', a:'W80'},
  {id:93, ph:'r16',  d:'06/07', t:'16h',   v:'AT&T Stadium · Dallas',                h:'W83', a:'W84'},
  {id:94, ph:'r16',  d:'06/07', t:'21h',   v:'Lumen Field · Seattle',                h:'W81', a:'W82'},
  {id:95, ph:'r16',  d:'07/07', t:'13h',   v:'Mercedes-Benz Stadium · Atlanta',      h:'W86', a:'W88'},
  {id:96, ph:'r16',  d:'07/07', t:'17h',   v:'BC Place · Vancouver',                 h:'W85', a:'W87'},
  {id:97, ph:'qf',   d:'09/07', t:'17h',   v:'Gillette Stadium · Boston',            h:'W89', a:'W90'},
  {id:98, ph:'qf',   d:'10/07', t:'16h',   v:'SoFi Stadium · Los Angeles',           h:'W93', a:'W94'},
  {id:99, ph:'qf',   d:'11/07', t:'18h',   v:'Hard Rock Stadium · Miami',            h:'W91', a:'W92'},
  {id:100,ph:'qf',   d:'11/07', t:'22h',   v:'Arrowhead Stadium · Kansas City',      h:'W95', a:'W96'},
  {id:101,ph:'sf',   d:'14/07', t:'16h',   v:'AT&T Stadium · Dallas',                h:'W97', a:'W98'},
  {id:102,ph:'sf',   d:'15/07', t:'16h',   v:'Mercedes-Benz Stadium · Atlanta',      h:'W99', a:'W100'},
  {id:103,ph:'final',d:'18/07', t:'18h',   v:'Hard Rock Stadium · Miami',            h:'L101',a:'L102', third:true},
  {id:104,ph:'final',d:'19/07', t:'16h',   v:'MetLife Stadium · Nova York',          h:'W101',a:'W102'},
];
KO.forEach(k=>{
  k.di=diForDate(k.d);
  const pm=k.t.match(/(\d{1,2})h(\d{2})?/); k.min=parseInt(pm[1])*60+(pm[2]?+pm[2]:0);
  const hh=String(Math.floor(k.min/60)).padStart(2,'0'), mm=String(k.min%60).padStart(2,'0');
  k.ts=Date.parse(`${DAYS[k.di].iso}T${hh}:${mm}:00-03:00`);
  k.phName=k.third?'Disputa de 3º':PHNAME[k.ph];
});

/* alocação dos 8 melhores 3º (FIFA, Anexo C). chave = letras dos grupos classificados em
   ordem alfabética; valor = qual 3º enfrenta cada vencedor de grupo. */
const TA_COLS=['1A','1B','1D','1E','1G','1I','1K','1L'];
const THIRDS_ALLOCATION={};
[
  ['EFGHIJKL','E,J,I,F,H,G,L,K'],['DFGHIJKL','H,G,I,D,J,F,L,K'],['DEGHIJKL','E,J,I,D,H,G,L,K'],
  ['DEFHIJKL','E,J,I,D,H,F,L,K'],['DEFGIJKL','E,G,I,D,J,F,L,K'],['DEFGHJKL','E,G,J,D,H,F,L,K'],
  ['DEFGHIKL','E,G,I,D,H,F,L,K'],['DEFGHIJL','E,G,J,D,H,F,L,I'],['DEFGHIJK','E,G,J,D,H,F,I,K'],
  ['CFGHIJKL','H,G,I,C,J,F,L,K'],['CEGHIJKL','E,J,I,C,H,G,L,K'],['CEFHIJKL','E,J,I,C,H,F,L,K'],
  ['CEFGIJKL','E,G,I,C,J,F,L,K'],['CEFGHJKL','E,G,J,C,H,F,L,K'],['CEFGHIKL','E,G,I,C,H,F,L,K'],
  ['CEFGHIJL','E,G,J,C,H,F,L,I'],['CEFGHIJK','E,G,J,C,H,F,I,K'],['CDGHIJKL','H,G,I,C,J,D,L,K'],
  ['CDFHIJKL','C,J,I,D,H,F,L,K'],['CDFGIJKL','C,G,I,D,J,F,L,K'],
].forEach(([k,v])=>{ const a=v.split(','), o={}; TA_COLS.forEach((c,i)=>o[c]=a[i]); THIRDS_ALLOCATION[k]=o; });

/* desempate por confronto direto na fase de grupos (usa o placar guardado em M) */
function koCmp(a,b){
  if(b.pts!==a.pts) return b.pts-a.pts;
  if(b.sg!==a.sg)   return b.sg-a.sg;
  if(b.gp!==a.gp)   return b.gp-a.gp;
  const m=byPk[pairKey(a.name,b.name)];
  if(m&&m.score){ const ga=m.a===a.name?m.score[0]:m.score[1], gb=m.a===a.name?m.score[1]:m.score[0]; if(ga!==gb) return ga>gb?-1:1; }
  return a.name.localeCompare(b.name,'pt');
}
function koStandings(){
  const tbl={}, idx={};
  for(const g in GROUPS){ tbl[g]=GROUPS[g].map(name=>({name,pts:0,j:0,gp:0,gc:0,sg:0})); tbl[g].forEach(r=>idx[r.name]=r); }
  M.forEach(m=>{ if(!m.score) return; const [ga,gb]=m.score, ra=idx[m.a], rb=idx[m.b]; if(!ra||!rb) return;
    ra.j++; rb.j++; ra.gp+=ga; ra.gc+=gb; rb.gp+=gb; rb.gc+=ga;
    if(ga>gb){ ra.pts+=3; } else if(ga<gb){ rb.pts+=3; } else { ra.pts++; rb.pts++; }
  });
  for(const g in tbl){ tbl[g].forEach(r=>r.sg=r.gp-r.gc); tbl[g].sort(koCmp); }
  return tbl;
}
function koBestThirds(tbl){
  return Object.keys(tbl).map(g=>({g,r:tbl[g][2]})).filter(x=>x.r&&x.r.j>0).sort((x,y)=>koCmp(x.r,y.r)).slice(0,8).map(x=>x.g);
}
/* grupo encerrado: 6 jogos com placar final e nenhum ao vivo */
function koGroupDone(g){ const gs=M.filter(m=>m.g===g); return gs.length>0 && gs.every(m=>m.score) && !gs.some(m=>m.live); }
function koContext(){
  const tbl=koStandings(), done={}; let allDone=true;
  for(const g in GROUPS){ done[g]=koGroupDone(g); if(!done[g]) allDone=false; }
  let thirdAssign=null, thirdGroups=null;
  if(allDone){ thirdGroups=koBestThirds(tbl).slice().sort(); if(thirdGroups.length===8) thirdAssign=THIRDS_ALLOCATION[thirdGroups.join('')]||null; }
  return {tbl,done,allDone,thirdGroups,thirdAssign,winnerOf:{},loserOf:{}};
}
/* nome do time de um slot, ou null se ainda indefinido */
function koTeamForSlot(s,k,ctx){
  if(s[0]==='1'||s[0]==='2'){ const g=s.slice(1); if(!ctx.done[g]) return null; return ctx.tbl[g][s[0]==='1'?0:1].name; }
  if(s[0]==='3'){ if(!ctx.thirdAssign) return null; const g=ctx.thirdAssign[k.h]; if(!g) return null; const row=ctx.tbl[g][2]; return row?row.name:null; }
  if(s[0]==='W') return ctx.winnerOf[+s.slice(1)]||null;
  if(s[0]==='L') return ctx.loserOf[+s.slice(1)]||null;
  return null;
}
/* rótulo de um slot ainda não resolvido (ex.: "1º Grupo E", "3º A/B/C/D/F", "Vencedor #74") */
function koSlotLabel(s){
  if(s[0]==='1') return '1º Grupo '+s.slice(1);
  if(s[0]==='2') return '2º Grupo '+s.slice(1);
  if(s[0]==='3') return '3º '+s.slice(2).split('').join('/');
  if(s[0]==='W') return 'Vencedor #'+s.slice(1);
  if(s[0]==='L') return 'Perdedor #'+s.slice(1);
  return '';
}
/* Confronto de mata-mata que a ESPN já resolveu (times reais), casado por horário.
   A ESPN publica o chaveamento da Rodada de 32 assim que a fase de grupos acaba, então
   é a FONTE DA VERDADE do confronto: não dependemos da nossa alocação de melhores 3ºs
   (são 495 combinações possíveis — não cabe numa tabela fixa). koResults só guarda jogos
   de mata-mata (os de grupo vão pra M), então qualquer match aqui é um confronto válido. */
function koEspnFixtureFor(k,anchor){
  let best=null,bestDh=Infinity;
  for(const key in koResults){
    const r=koResults[key];
    if(!Number.isFinite(r.ts)) continue;
    const dh=Math.abs(r.ts-k.ts);
    if(dh>12*3600*1000) continue;                       // janela: descarta confrontos de outro dia
    if(anchor && r.a!==anchor && r.b!==anchor) continue; // com um time âncora (slot 1º/2º já resolvido), exige que o par o contenha
    if(dh<bestDh){ bestDh=dh; best=r; }
  }
  return best;
}
/* times de um jogo do mata-mata: resolve pelos slots (grupos + propagação) e, SÓ no slot
   de melhor 3º ('3:...'), completa pelo confronto real da ESPN usando o 1º de grupo do
   outro lado como ÂNCORA. Slots de vencedor/perdedor (W##/L##) ficam por conta da
   propagação — casar por data sem âncora pegaria o confronto errado (ex.: um jogo da R32
   no mesmo dia das Oitavas, que a FIFA agenda na virada de fase). */
function koResolveTeams(k,ctx){
  let ht=koTeamForSlot(k.h,k,ctx), at=koTeamForSlot(k.a,k,ctx);
  if(ht&&at) return [ht,at];
  if(ht&&!at&&k.a[0]==='3'){ const fx=koEspnFixtureFor(k,ht); if(fx) at=(fx.a===ht)?fx.b:(fx.b===ht?fx.a:at); }
  else if(at&&!ht&&k.h[0]==='3'){ const fx=koEspnFixtureFor(k,at); if(fx) ht=(fx.a===at)?fx.b:(fx.b===at?fx.a:ht); }
  return [ht,at];
}
/* propaga vencedores/perdedores pela árvore até estabilizar */
function koPropagate(ctx){
  let changed=true, guard=0;
  while(changed && guard++<12){
    changed=false;
    for(const k of KO){
      if(ctx.winnerOf[k.id]) continue;
      const [ht,at]=koResolveTeams(k,ctx);
      if(!ht||!at) continue;
      const r=koResults[pairKey(ht,at)];
      if(r&&!r.live&&r.winner){ ctx.winnerOf[k.id]=r.winner; ctx.loserOf[k.id]=r.winner===ht?at:ht; changed=true; }
    }
  }
}
/* monta os jogos do mata-mata no MESMO shape dos jogos de grupo (di,min,ts,score,live,…),
   pra entrarem na lista cronológica sem casos especiais em pass()/statusOf()/render() */
function koMatches(){
  const ctx=koContext(); koPropagate(ctx);
  return KO.map(k=>{
    const [ht,at]=koResolveTeams(k,ctx);
    // canais: piso Cazé TV; quando o par resolvido aparece no jogos.json, sobe p/ a grade raspada
    const ch=(ht&&at&&koChByPair[pairKey(ht,at)])||KO_FLOOR;
    const o={ ko:true, id:k.id, phName:k.phName, third:!!k.third, v:k.v, di:k.di, min:k.min, t:k.t, ts:k.ts,
      a:ht, b:at, hLabel:koSlotLabel(k.h), aLabel:koSlotLabel(k.a),
      isBr:ht==='Brasil'||at==='Brasil', open:ch.some(c=>c==='Globo'||c==='SBT'), cazeOnly:ch.length===1, ch,
      score:null, live:null, eid:null, pens:null };
    const r=(ht&&at)?koResults[pairKey(ht,at)]:null;
    if(r&&!r.pre){   // confronto só marcado (pre): mostra os times, mas ainda sem placar
      const ga=r.a===ht?r.ga:r.gb, gb=r.a===ht?r.gb:r.ga;
      if(r.live) o.live={a:ga,b:gb,clock:'',half:false}; else o.score=[ga,gb];
      if(r.pens) o.pens=r.a===ht?[r.pens[0],r.pens[1]]:[r.pens[1],r.pens[0]];
      o.eid=r.eid||null;
    }
    o.q=((ht||o.hLabel)+' '+(at||o.aLabel)).toLowerCase();
    return o;
  });
}
let koList=[];   // jogos do mata-mata resolvidos (recalculado a cada render)

/* ---------- grade de transmissão (definida em assets/transmissao.js) ---------- */
/* jogo casado por "Casa x Visitante"; valor = nome de preset ou lista própria de canais */
function applyChannels(data){
  const presets=(data&&data.presets)||{}, jogos=(data&&data.jogos)||{};
  M.forEach(m=>{
    const v=jogos[`${m.a} x ${m.b}`];
    const ch=Array.isArray(v)?v:(presets[v]||[]);
    m.ch=ch;
    m.open=ch.some(c=>c==='Globo'||c==='SBT');
    m.cazeOnly=ch.length===1;
  });
}
/* canais atualizados pelo cron PHP (jogos.json, não versionado) — sobrescrevem a grade estática quando disponível.
   O PHP já entrega a UNIÃO (grade curada + scraping), então aqui é só aplicar. */
async function loadJogosJson(){
  try{
    const res=await fetch('jogos.json',{cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const data=await res.json();
    let n=0;
    (data.canais||[]).forEach(g=>{
      const ch=g.channels;
      if(!Array.isArray(ch)||!ch.length) return;
      const pk=pairKey(g.home,g.away), m=byPk[pk];
      if(m){ m.ch=ch; m.open=ch.some(c=>c==='Globo'||c==='SBT'); m.cazeOnly=ch.length===1; n++; }
      else { koChByPair[pk]=ch; n++; }   // par que não é de grupo = mata-mata; aplicado em koMatches()
    });
    if(n) render();
  }catch(e){ console.warn('Canais dinâmicos (jogos.json) indisponíveis, usando a grade estática:',e.message); }
}
let filter='next', query='', todayDI=-1;
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
/* nomes grandes -> versão curta só p/ exibição (busca/API seguem usando o nome completo) */
const ABBR={'Rep. Dem. do Congo':'RD Congo','Bósnia e Herzegovina':'Bósnia','Estados Unidos':'EUA','República Tcheca':'Rep. Tcheca'};
const team=(n,br,after)=>{
  const disp=esc(ABBR[n]||n);
  const name=br&&n==='Brasil'?`<span class="team-label br-name">${disp}</span>`:`<span class="team-label">${disp}</span>`;
  const side=after?'away':'home';
  return after
    ? `<span class="team-name ${side}">${name}${flag(n,true)}</span>`
    : `<span class="team-name ${side}">${flag(n)}${name}</span>`;
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
    ? `<span class="match-score"><span class="sc${st.live?' islive':''}">${st.score[0]}</span><span class="vs">×</span><span class="sc${st.live?' islive':''}">${st.score[1]}</span></span>`
    : `<span class="match-score"><span class="vs">×</span></span>`;
  const toggle=playable?`<div class="stat-toggle">Detalhes da partida <span class="chev">▾</span></div>`:'';
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
/* time de um confronto de mata-mata: bandeira+nome quando resolvido, senão o rótulo do slot */
function koTeam(name,label,after){
  if(name) return team(name,name==='Brasil',after);
  return `<span class="team-name ${after?'away':'home'} ko-ph"><span class="team-label">${esc(label)}</span></span>`;
}
function koMatchHTML(m){
  const st=statusOf(m);
  const cls=['match','ko',m.isBr?'is-br':'',m.live?'islive':''].join(' ').replace(/\s+/g,' ').trim();
  const top=`<div class="time${st.live?' islive':''}${st.half?' half':''}">${st.left}</div>`;
  const line=st.cls?`<span class="status ${st.cls}"><span class="d"></span>${st.label}</span>`:`<small>${st.label}</small>`;
  const penA=m.pens?`<span class="pens">(${m.pens[0]})</span>`:'';
  const penB=m.pens?`<span class="pens">(${m.pens[1]})</span>`:'';
  const mid=st.score
    ? `<span class="match-score"><span class="sc${st.live?' islive':''}">${st.score[0]}</span>${penA}<span class="vs">×</span><span class="sc${st.live?' islive':''}">${st.score[1]}</span>${penB}</span>`
    : `<span class="match-score"><span class="vs">×</span></span>`;
  return `<div class="${cls}" data-q="${m.q}">
    <div class="tcol">${top}${line}</div>
    <div class="body">
      <div class="teams">${koTeam(m.a,m.hLabel)} ${mid} ${koTeam(m.b,m.aLabel,true)}</div>
      <div class="meta"><span class="badge badge-ko">${esc(m.phName)}</span><span class="badge">Jogo ${m.id}</span><span>${esc(m.v)}</span></div>
      <div class="chans">${pills(m.ch)}</div>
    </div>
  </div>`;
}
/* despacha p/ o render certo conforme o tipo do jogo (grupo x mata-mata) */
const cardHTML=m=>m.ko?koMatchHTML(m):matchHTML(m);

/* encerrado: tem placar final, ou já passou do fim estimado e não está mais ao vivo */
const isPast=m=>!!m.score||(!m.live&&Date.now()>m.ts+135*60000);
/* em andamento agora: ao vivo confirmado pela ESPN, ou dentro da janela estimada (135min) sem placar final */
const inProgress=m=>!!m.live||(Date.now()>=m.ts&&Date.now()<m.ts+135*60000&&!m.score);
function pass(m){
  if(query && !m.q.includes(query)) return false;
  if(filter==='br') return m.isBr;
  if(filter==='open') return m.open;
  if(filter==='caze') return m.cazeOnly;
  if(filter==='done') return isPast(m);
  if(filter==='next') return !isPast(m);
  return true;
}
/* Como pass(), mas SEM os filtros de tempo (next/done): o painel "Jogos de hoje"
   é a agenda do dia, então um jogo encerrado hoje continua sempre visível.
   Ainda respeita busca e os filtros de conteúdo (Brasil/TV aberta/Cazé). */
function passToday(m){
  if(query && !m.q.includes(query)) return false;
  if(filter==='br') return m.isBr;
  if(filter==='open') return m.open;
  if(filter==='caze') return m.cazeOnly;
  return true;
}
/* índice do dia de hoje na tabela (-1 se fora do período da Copa) */
function todayIndex(){
  const today=new Date().toLocaleDateString('en-CA',{timeZone:SP});
  for(let di=0;di<DAYS.length;di++){
    if(DAYS[di].iso===today) return di;
  }
  return -1;
}
/* painel "Jogos em andamento": qualquer jogo ao vivo agora, de qualquer dia (some quando acaba) */
function renderLive(){
  const el=$('livePanel'); if(!el) return;
  const games=M.concat(koList).filter(m=>inProgress(m)&&pass(m)).sort((a,b)=>a.ts-b.ts);
  el.innerHTML=games.length
    ? `<div class="today-head"><span class="today-kicker">Jogos em andamento</span></div>${games.map(cardHTML).join('')}`
    : '';
}
function renderToday(){
  const el=$('todayPanel'); if(!el) return;
  // jogos de hoje que NÃO estão ao vivo (os ao vivo ficam no painel de andamento)
  const games=todayDI<0?[]:M.concat(koList).filter(m=>m.di===todayDI&&!inProgress(m)&&passToday(m)).sort((a,b)=>a.min-b.min);
  if(!games.length){
    // sem filtro de conteúdo/busca ativos mostra o aviso; senão apenas esconde o painel
    const filtrandoConteudo=filter==='br'||filter==='open'||filter==='caze'||!!query;
    el.innerHTML=filtrandoConteudo?'':'<div class="today-empty">Nenhum jogo hoje</div>';
    return;
  }
  el.innerHTML=`<div class="today-head"><span class="today-kicker">Jogos de hoje</span><span class="today-date">${DAYS[todayDI].dow} · ${DAYS[todayDI].n}</span></div>${games.map(cardHTML).join('')}`;
}
function render(){
  todayDI=todayIndex();
  koList=koMatches();                // resolve os jogos do mata-mata (times + placares)
  const ALL=M.concat(koList);
  let html='', total=0;
  for(let di=0;di<DAYS.length;di++){
    if(di===todayDI) continue;   // jogos de hoje ficam só no painel do topo
    // jogos em andamento saem da lista por dia (vão pro painel de andamento)
    const games=ALL.filter(m=>m.di===di&&!inProgress(m)&&pass(m)).sort((a,b)=>a.min-b.min);
    if(!games.length) continue;
    total+=games.length;
    html+=`<section class="day"><div class="day-head"><span class="dow">${DAYS[di].dow}</span><span class="dnum">${DAYS[di].n}</span></div>${games.map(cardHTML).join('')}</section>`;
  }
  $('list').innerHTML=html;
  // soma os jogos dos painéis do topo (em andamento + os de hoje fora de andamento) respeitando o filtro/busca
  total+=ALL.filter(m=>inProgress(m)&&pass(m)).length;
  if(todayDI>=0) total+=ALL.filter(m=>m.di===todayDI&&!inProgress(m)&&pass(m)).length;
  const lbl=filter==='br'?'jogos do Brasil':filter==='open'?'jogos na TV aberta':filter==='caze'?'jogos só na Cazé TV':filter==='done'?'jogos encerrados':filter==='next'?'próximos jogos':'jogos';
  $('count').innerHTML=`<b>${total}</b> ${query?'resultado(s)':lbl}`;
  renderLive();
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
    const st=(ev.status||c.status||{}), tp=st.type||{}, state=tp.state;   // pre | in | post
    let m=byPk[pairKey(ph,pa)];
    // mesmo par pode se repetir na final (dois times do mesmo grupo): se a data do evento não bate
    // com a do jogo de grupo, é mata-mata — não deixa o placar da final sobrescrever o do grupo
    const evTs=Date.parse(ev.date||c.date||'');
    if(m && Number.isFinite(evTs) && Math.abs(evTs-m.ts)>36*3600*1000) m=null;
    if(!m){
      // confronto fora da tabela de grupos = jogo de mata-mata. Guarda o CONFRONTO (times +
      // horário) MESMO antes de começar (state 'pre'): a ESPN já resolve o chaveamento da
      // Rodada de 32 quando os grupos acabam, e é disso que koEspnFixtureFor precisa pra
      // exibir os times reais antes do apito (sem depender da nossa alocação de melhores 3ºs).
      const isPre=state==='pre', isLive=state==='in', ga=+home.score||0, gb=+away.score||0;
      let winner=null;
      if(!isPre){
        if(home.winner===true) winner=ph; else if(away.winner===true) winner=pa;
        else if(!isLive) winner=ga>gb?ph:gb>ga?pa:null;
      }
      let pens=null;
      if(home.shootoutScore!=null&&away.shootoutScore!=null) pens=[+home.shootoutScore,+away.shootoutScore];
      koResults[pairKey(ph,pa)]={a:ph,b:pa,ga,gb,winner,pens,live:isLive,pre:isPre,eid:ev.id?String(ev.id):null,ts:evTs};
      if(isLive) live++; else if(!isPre) fin++;
      return;
    }
    if(ev.id){ m.eid=String(ev.id); byEid[m.eid]=m; }
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
function teamKey(t){
  const team=t&&t.team?t.team:t;
  return {
    id:team&&team.id?String(team.id):null,
    pt:toPT(team&&(team.displayName||team.name||team.shortDisplayName)),
  };
}
function playTeam(sp,teams){
  const k=teamKey(sp);
  if(k.pt) return k.pt;
  if(k.id){
    const found=teams.find(t=>teamKey(t).id===k.id);
    if(found) return teamKey(found).pt;
  }
  return null;
}
function scorerName(sp){
  const pools=[sp.participants,sp.athletesInvolved,sp.athletes].filter(Array.isArray);
  for(const pool of pools){
    for(const p of pool){
      const a=p.athlete||p;
      const name=a&&(
        a.displayName||a.fullName||a.shortName||a.name||
        (a.athlete&&(a.athlete.displayName||a.athlete.fullName||a.athlete.name))
      );
      if(name) return name;
    }
  }
  const direct=sp.athlete||sp.scorer;
  if(direct&&(direct.displayName||direct.fullName||direct.name)) return direct.displayName||direct.fullName||direct.name;
  const txt=sp.text||sp.shortText||sp.displayText||'';
  const parsed=txt.split('(')[0].replace(/\b(goal|gol|penalty|own goal)\b/ig,'').trim();
  return parsed||'Gol';
}
function goalMinute(sp){
  const clock=sp.clock;
  if(clock&&clock.displayValue) return clock.displayValue;
  if(clock&&Number.isFinite(+clock.value)) return `${Math.ceil(+clock.value/60)}'`;
  if(sp.time&&sp.time.displayValue) return sp.time.displayValue;
  if(sp.period&&sp.period.displayValue) return sp.period.displayValue;
  return '';
}
function scoringPlays(data){
  const pools=[
    data&&data.scoringPlays,
    data&&data.header&&data.header.competitions&&data.header.competitions[0]&&data.header.competitions[0].details,
    data&&data.competitions&&data.competitions[0]&&data.competitions[0].details,
    data&&data.plays,
  ].filter(Array.isArray);
  return pools.find(p=>p.length)||[];
}
function buildGoals(m,data,teams){
  const plays=scoringPlays(data);
  const goals=plays.filter(sp=>{
    const txt=[sp.type&&sp.type.text,sp.text,sp.shortText,sp.displayText].filter(Boolean).join(' ');
    if(/(card|cartão|cartao|substitution|substituição|substituicao|yellow|red|amarelo|vermelho)/i.test(txt)) return false;
    return sp.scoringPlay===true||/(goal|gol|penalty|own goal)/i.test(txt);
  }).map(sp=>({
    team:playTeam(sp,teams),
    name:scorerName(sp),
    minute:goalMinute(sp),
    own:/own goal|gol contra/i.test([sp.type&&sp.type.text,sp.text,sp.shortText,sp.displayText].filter(Boolean).join(' ')),
    pen:/penalty|pênalti|penalti/i.test([sp.type&&sp.type.text,sp.text,sp.shortText,sp.displayText].filter(Boolean).join(' ')),
  })).filter(g=>g.team===m.a||g.team===m.b);
  if(!goals.length) return '<div class="goals"><div class="stat-title">Gols</div><div class="stat-empty">Autores dos gols indisponíveis para esta partida.</div></div>';
  const list=teamName=>goals.filter(g=>g.team===teamName).map(g=>{
    const note=[g.own?'contra':'',g.pen?'pênalti':''].filter(Boolean).join(' · ');
    return `<li><span class="goal-minute">${esc(g.minute)}</span><span>${esc(g.name)}</span>${note?`<small>${esc(note)}</small>`:''}</li>`;
  }).join('');
  return `<div class="goals">
    <div class="stat-title">Gols</div>
    <div class="goal-cols">
      <div><div class="goal-team">${team(m.a,m.isBr)}</div><ul>${list(m.a)||'<li class="muted">Sem gols</li>'}</ul></div>
      <div><div class="goal-team right">${team(m.b,m.isBr,true)}</div><ul>${list(m.b)||'<li class="muted">Sem gols</li>'}</ul></div>
    </div>
  </div>`;
}
function buildStats(m,box,data){
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
  return `${buildGoals(m,data,teams)}${rows?`<div class="stat-title">Estatísticas</div>${rows}`:'<div class="stat-empty">Sem estatísticas ainda.</div>'}`;
}
const paintStats=(eid,html)=>document.querySelectorAll('.statbox[data-eid="'+eid+'"]').forEach(b=>b.innerHTML=html);
async function loadStats(eid){
  const m=byEid[eid]; if(!m) return;
  if(statCache[eid]&&!m.live){ paintStats(eid,statCache[eid]); return; }   // encerrado: usa cache
  paintStats(eid,'<div class="stat-empty">Carregando estatísticas…</div>');
  try{
    const data=await (await fetch(SUMMARY+eid,{cache:'no-store'})).json();
    const html=buildStats(m,data.boxscore,data);
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
function hasLive(){ return M.some(m=>m.live) || Object.values(koResults).some(r=>r.live); }
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
applyChannels(typeof TRANSMISSAO!=='undefined'?TRANSMISSAO:null);   // grade de transmissão (assets/transmissao.js)
render();                          // monta a tabela (ainda escondida pelo overlay)
loadJogosJson();                   // canais atualizados pelo cron (jogos.json) sobrescrevem quando disponível
// revela só DEPOIS dos placares de hoje (fetchLive) E da temporada inteira (fetchSeason) —
// é o fetchSeason que carrega o chaveamento do mata-mata (confrontos reais da ESPN), então
// sem esperar por ele a tela apareceria com os jogos 1º×3º ainda em "3º A/B/C/D/F".
const _live=fetchLive().then(scheduleNext);   // placares de hoje + agenda do auto-refresh
const _season=fetchSeason();                  // ids, resultados e chaveamento dos demais dias
Promise.allSettled([_live,_season]).finally(reveal);
setTimeout(reveal, 6000);          // fallback: nunca deixa a tela travada no "carregando"
