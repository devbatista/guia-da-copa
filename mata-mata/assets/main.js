/* ============================================================
   Mata-Mata — chaveamento da Copa do Mundo 2026
   Página autocontida (como a classificação). Os times saem da
   tabela ao vivo (API pública da ESPN); a árvore é montada no
   navegador a partir da grade oficial FIFA 2026 (jogos 73–104).
   ============================================================ */

/* ---------- os 12 grupos (mesma grafia PT do guia) ---------- */
const GROUPS={
  A:['México','África do Sul','Coreia do Sul','República Tcheca'],
  B:['Canadá','Bósnia e Herzegovina','Catar','Suíça'],
  C:['Brasil','Marrocos','Haiti','Escócia'],
  D:['Estados Unidos','Paraguai','Austrália','Turquia'],
  E:['Alemanha','Curaçao','Costa do Marfim','Equador'],
  F:['Holanda','Japão','Suécia','Tunísia'],
  G:['Bélgica','Egito','Irã','Nova Zelândia'],
  H:['Espanha','Cabo Verde','Arábia Saudita','Uruguai'],
  I:['França','Senegal','Iraque','Noruega'],
  J:['Argentina','Argélia','Áustria','Jordânia'],
  K:['Portugal','Rep. Dem. do Congo','Uzbequistão','Colômbia'],
  L:['Inglaterra','Croácia','Gana','Panamá'],
};
const GROUP_OF={}; for(const g in GROUPS) GROUPS[g].forEach(t=>GROUP_OF[t]=g);

/* ---------- EN->PT p/ casar os nomes da ESPN com os grupos ---------- */
const PT={Algeria:"Argélia",Argentina:"Argentina",Australia:"Austrália",Austria:"Áustria",Belgium:"Bélgica",
"Bosnia & Herzegovina":"Bósnia e Herzegovina",Brazil:"Brasil",Canada:"Canadá","Cape Verde":"Cabo Verde",
Colombia:"Colômbia",Croatia:"Croácia","Curaçao":"Curaçao","Czech Republic":"República Tcheca","DR Congo":"Rep. Dem. do Congo",
Ecuador:"Equador",Egypt:"Egito",England:"Inglaterra",France:"França",Germany:"Alemanha",Ghana:"Gana",Haiti:"Haiti",
Iran:"Irã",Iraq:"Iraque","Ivory Coast":"Costa do Marfim",Japan:"Japão",Jordan:"Jordânia",Mexico:"México",Morocco:"Marrocos",
Netherlands:"Holanda","New Zealand":"Nova Zelândia",Norway:"Noruega",Panama:"Panamá",Paraguay:"Paraguai",Portugal:"Portugal",
Qatar:"Catar","Saudi Arabia":"Arábia Saudita",Scotland:"Escócia",Senegal:"Senegal","South Africa":"África do Sul",
"South Korea":"Coreia do Sul",Spain:"Espanha",Sweden:"Suécia",Switzerland:"Suíça",Tunisia:"Tunísia",Turkey:"Turquia",
USA:"Estados Unidos",Uruguay:"Uruguai",Uzbekistan:"Uzbequistão"};
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
function flagEmoji(code){
  if(code==='gb-sct') return '🏴󠁧󠁢󠁳󠁣󠁴󠁿';
  if(code==='gb-eng') return '🏴󠁧󠁢󠁥󠁮󠁧󠁿';
  return code.toUpperCase().replace(/./g,c=>String.fromCodePoint(127397+c.charCodeAt(0)));
}
function flag(n){
  const code=ISO[n]; if(!code) return '';
  const emo=flagEmoji(code);
  return `<img class="flag" src="https://flagcdn.com/${code}.svg" alt="${emo}" width="20" loading="lazy" decoding="async" onerror="const s=document.createElement('span');s.className='flag flag-emoji';s.textContent=this.alt;this.replaceWith(s);">`;
}
const ABBR={'Rep. Dem. do Congo':'RD Congo','Bósnia e Herzegovina':'Bósnia','Estados Unidos':'EUA','República Tcheca':'Rep. Tcheca','Arábia Saudita':'Ar. Saudita','Coreia do Sul':'Coreia Sul','Nova Zelândia':'N. Zelândia','Costa do Marfim':'C. Marfim'};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const $=id=>document.getElementById(id);
const SP='America/Sao_Paulo';

/* ============================================================
   FASE DE GRUPOS — tabela (mesma lógica da página Classificação)
   ============================================================ */
const results={};           // confrontos de grupo: pairKey -> {a,b,ga,gb,live}
const koResults={};         // confrontos de mata-mata: pairKey -> {a,b,ga,gb,winner,pens,live}
const pairKey=(a,b)=>[a,b].sort().join('|');

function applyEvents(events){
  let live=0;
  (events||[]).forEach(ev=>{
    const c=ev.competitions&&ev.competitions[0]; if(!c||!c.competitors||c.competitors.length<2) return;
    const home=c.competitors.find(x=>x.homeAway==='home')||c.competitors[0];
    const away=c.competitors.find(x=>x.homeAway==='away')||c.competitors[1];
    const pa=toPT(home.team&&(home.team.displayName||home.team.name));
    const pb=toPT(away.team&&(away.team.displayName||away.team.name));
    if(!pa||!pb) return;                       // jogo com seleção ainda indefinida (placeholder): ignora
    const st=(ev.status||c.status||{}), state=(st.type||{}).state;   // pre | in | post
    const isPre=state==='pre', isLive=state==='in';
    const ga=+home.score||0, gb=+away.score||0;
    if(GROUP_OF[pa]&&GROUP_OF[pa]===GROUP_OF[pb]){
      if(isPre) return;                                             // grupo ainda não jogado: nada a computar
      if(isLive) live++;
      results[pairKey(pa,pb)]={a:pa,b:pb,ga,gb,live:isLive};        // fase de grupos
    }else if(GROUP_OF[pa]&&GROUP_OF[pb]){
      // mata-mata — guarda o CONFRONTO (times + horário) MESMO no estado 'pre': a ESPN já
      // resolve o chaveamento da Rodada de 32 quando os grupos fecham, e é disso que
      // koFixtureFor precisa pra preencher os jogos 1º×melhor-3º com os times reais.
      if(isLive) live++;
      let winner=null;
      if(!isPre){
        if(home.winner===true) winner=pa; else if(away.winner===true) winner=pb;
        else if(!isLive) winner=ga>gb?pa:gb>ga?pb:null;
      }
      let pens=null;
      if(home.shootoutScore!=null&&away.shootoutScore!=null) pens=[+home.shootoutScore,+away.shootoutScore];
      koResults[pairKey(pa,pb)]={a:pa,b:pb,ga,gb,winner,pens,live:isLive,pre:isPre,ts:Date.parse(ev.date||c.date||'')};
    }
  });
  return {live};
}

function h2h(aName,bName){
  const r=results[pairKey(aName,bName)]; if(!r) return 0;
  const ga=r.a===aName?r.ga:r.gb, gb=r.a===aName?r.gb:r.ga;
  return ga>gb?-1:ga<gb?1:0;
}
function cmp(a,b){
  if(b.pts!==a.pts) return b.pts-a.pts;
  if(b.sg!==a.sg)   return b.sg-a.sg;
  if(b.gp!==a.gp)   return b.gp-a.gp;
  const h=h2h(a.name,b.name); if(h) return h;
  return a.name.localeCompare(b.name,'pt');
}
function standings(){
  const tbl={}, idx={};
  for(const g in GROUPS){
    tbl[g]=GROUPS[g].map(name=>({name,pts:0,j:0,v:0,e:0,d:0,gp:0,gc:0,sg:0}));
    tbl[g].forEach(row=>idx[row.name]=row);
  }
  Object.values(results).forEach(r=>{
    const ra=idx[r.a], rb=idx[r.b]; if(!ra||!rb) return;
    ra.j++; rb.j++; ra.gp+=r.ga; ra.gc+=r.gb; rb.gp+=r.gb; rb.gc+=r.ga;
    if(r.ga>r.gb){ ra.v++; rb.d++; ra.pts+=3; }
    else if(r.ga<r.gb){ rb.v++; ra.d++; rb.pts+=3; }
    else { ra.e++; rb.e++; ra.pts++; rb.pts++; }
  });
  for(const g in tbl){ tbl[g].forEach(r=>r.sg=r.gp-r.gc); tbl[g].sort(cmp); }
  return tbl;
}
/* grupo encerrado: 6 jogos disputados e nenhum em andamento */
function groupDone(g){
  let n=0, live=false;
  for(const k in results){ const r=results[k];
    if(GROUP_OF[r.a]===g&&GROUP_OF[r.b]===g){ n++; if(r.live) live=true; } }
  return n>=6 && !live;
}

/* ============================================================
   MATA-MATA — grade oficial FIFA 2026 (jogos 73 a 104)
   slots: '1A'..'2L' (posição no grupo) · '3:ABCDF' (melhor 3º
   de um do conjunto) · 'W74' (vencedor do jogo) · 'L101' (perdedor)
   Datas e sedes: calendário oficial. ============================ */
/* Ordem dentro de cada fase = ordem do BRACKET (cima→baixo), não numérica:
   cada jogo fica alinhado entre seus dois alimentadores da fase anterior. */
const KNOCKOUT=[
  /* Rodada de 32 (16-avos) — metade de cima (→ #101) e metade de baixo (→ #102) */
  {id:74,ph:'r32',d:'29/06',v:'Foxborough · Gillette Stadium',  h:'1E',a:'3:ABCDF'},
  {id:77,ph:'r32',d:'30/06',v:'East Rutherford · MetLife',      h:'1I',a:'3:CDFGH'},
  {id:73,ph:'r32',d:'28/06',v:'Inglewood · SoFi Stadium',       h:'2A',a:'2B'},
  {id:75,ph:'r32',d:'29/06',v:'Guadalupe · Estadio BBVA',       h:'1F',a:'2C'},
  {id:83,ph:'r32',d:'02/07',v:'Toronto · BMO Field',            h:'2K',a:'2L'},
  {id:84,ph:'r32',d:'02/07',v:'Inglewood · SoFi Stadium',       h:'1H',a:'2J'},
  {id:81,ph:'r32',d:'01/07',v:"Santa Clara · Levi's Stadium",   h:'1D',a:'3:BEFIJ'},
  {id:82,ph:'r32',d:'01/07',v:'Seattle · Lumen Field',          h:'1G',a:'3:AEHIJ'},
  {id:76,ph:'r32',d:'29/06',v:'Houston · NRG Stadium',          h:'1C',a:'2F'},
  {id:78,ph:'r32',d:'30/06',v:'Arlington · AT&T Stadium',       h:'2E',a:'2I'},
  {id:79,ph:'r32',d:'30/06',v:'Cidade do México · Azteca',      h:'1A',a:'3:CEFHI'},
  {id:80,ph:'r32',d:'01/07',v:'Atlanta · Mercedes-Benz',        h:'1L',a:'3:EHIJK'},
  {id:86,ph:'r32',d:'03/07',v:'Miami Gardens · Hard Rock',      h:'1J',a:'2H'},
  {id:88,ph:'r32',d:'03/07',v:'Arlington · AT&T Stadium',       h:'2D',a:'2G'},
  {id:85,ph:'r32',d:'02/07',v:'Vancouver · BC Place',           h:'1B',a:'3:EFGIJ'},
  {id:87,ph:'r32',d:'03/07',v:'Kansas City · Arrowhead',        h:'1K',a:'3:DEIJL'},
  /* Oitavas de final */
  {id:89,ph:'r16',d:'04/07',v:'Filadélfia · Lincoln Financial', h:'W74',a:'W77'},
  {id:90,ph:'r16',d:'04/07',v:'Houston · NRG Stadium',          h:'W73',a:'W75'},
  {id:93,ph:'r16',d:'06/07',v:'Arlington · AT&T Stadium',       h:'W83',a:'W84'},
  {id:94,ph:'r16',d:'06/07',v:'Seattle · Lumen Field',          h:'W81',a:'W82'},
  {id:91,ph:'r16',d:'05/07',v:'East Rutherford · MetLife',      h:'W76',a:'W78'},
  {id:92,ph:'r16',d:'05/07',v:'Cidade do México · Azteca',      h:'W79',a:'W80'},
  {id:95,ph:'r16',d:'07/07',v:'Atlanta · Mercedes-Benz',        h:'W86',a:'W88'},
  {id:96,ph:'r16',d:'07/07',v:'Vancouver · BC Place',           h:'W85',a:'W87'},
  /* Quartas de final */
  {id:97,ph:'qf',d:'09/07',v:'Foxborough · Gillette Stadium',   h:'W89',a:'W90'},
  {id:98,ph:'qf',d:'10/07',v:'Inglewood · SoFi Stadium',        h:'W93',a:'W94'},
  {id:99,ph:'qf',d:'11/07',v:'Miami Gardens · Hard Rock',       h:'W91',a:'W92'},
  {id:100,ph:'qf',d:'11/07',v:'Kansas City · Arrowhead',        h:'W95',a:'W96'},
  /* Semifinais */
  {id:101,ph:'sf',d:'14/07',v:'Arlington · AT&T Stadium',       h:'W97',a:'W98'},
  {id:102,ph:'sf',d:'15/07',v:'Atlanta · Mercedes-Benz',        h:'W99',a:'W100'},
  /* Final e 3º lugar */
  {id:104,ph:'final',d:'19/07',v:'East Rutherford · MetLife',   h:'W101',a:'W102'},
  {id:103,ph:'final',d:'18/07',v:'Miami Gardens · Hard Rock',   h:'L101',a:'L102',third:true},
];
const PHASES=[
  {ph:'r32',  name:'Rodada de 32'},
  {ph:'r16',  name:'Oitavas'},
  {ph:'qf',   name:'Quartas'},
  {ph:'sf',   name:'Semifinais'},
  {ph:'final',name:'Final'},
];
/* NEXT[idDoJogo] = id do jogo da fase seguinte que ele alimenta (via slot 'W##').
   Os dois jogos que apontam pro mesmo NEXT são o "par" cujos vencedores se enfrentam —
   usado só pra agrupá-los (espaço menor dentro do par, maior entre pares). */
const NEXT={}; KNOCKOUT.forEach(m=>['h','a'].forEach(side=>{ const s=m[side]; if(s[0]==='W') NEXT[+s.slice(1)]=m.id; }));

/* horário de referência de cada jogo (meio-dia BRT do dia) — usado p/ casar o confronto
   com o evento da ESPN no koFixtureFor. dd/mm cobre junho e julho de 2026. */
KNOCKOUT.forEach(m=>{ const [dd,mm]=m.d.split('/').map(Number);
  m.ts=Date.parse(`2026-${String(mm).padStart(2,'0')}-${String(dd).padStart(2,'0')}T12:00:00-03:00`); });

/* ============================================================
   Resolução: do estado da ESPN para os times de cada confronto
   ============================================================ */
function buildContext(){
  const tbl=standings();
  const done={};
  for(const g in GROUPS) done[g]=groupDone(g);
  return {tbl,done,winnerOf:{},loserOf:{}};
}
/* nome do time de um slot, ou null se ainda indefinido.
   O melhor 3º (slot '3') NÃO é resolvido aqui: o pareamento depende da combinação
   exata dos grupos classificados (495 possibilidades). Em vez de manter essa tabela,
   pegamos o confronto real do chaveamento que a ESPN publica (ver tieTeams/koFixtureFor). */
function teamForSlot(s,m,ctx){
  if(s[0]==='1'||s[0]==='2'){
    const g=s.slice(1); if(!ctx.done[g]) return null;
    return ctx.tbl[g][s[0]==='1'?0:1].name;
  }
  if(s[0]==='3') return null;                              // melhor 3º: resolvido pela ESPN
  if(s[0]==='W') return ctx.winnerOf[+s.slice(1)]||null;
  if(s[0]==='L') return ctx.loserOf[+s.slice(1)]||null;
  return null;
}
/* confronto de mata-mata que a ESPN já resolveu (times reais), casado por horário.
   koResults só guarda jogos de mata-mata, então qualquer match aqui é um confronto válido.
   Com um time âncora (slot 1º/2º já resolvido), exige que o par o contenha — desambigua. */
function koFixtureFor(m,anchor){
  let best=null,bestDh=Infinity;
  for(const key in koResults){
    const r=koResults[key];
    if(!Number.isFinite(r.ts)||!Number.isFinite(m.ts)) continue;
    const dh=Math.abs(r.ts-m.ts);
    if(dh>18*3600*1000) continue;                          // janela: mesmo dia (descarta confrontos de outro dia)
    if(anchor && r.a!==anchor && r.b!==anchor) continue;
    if(dh<bestDh){ bestDh=dh; best=r; }
  }
  return best;
}
/* times de um confronto: resolve pelos slots e, SÓ no slot de melhor 3º ('3:...'),
   completa pelo confronto real da ESPN usando o 1º de grupo do outro lado como ÂNCORA.
   Slots de vencedor/perdedor (W##/L##) ficam por conta da propagação — casar por data
   sem âncora pegaria o confronto errado (ex.: um jogo da R32 no mesmo dia das Oitavas). */
function tieTeams(m,ctx){
  let ht=teamForSlot(m.h,m,ctx), at=teamForSlot(m.a,m,ctx);
  if(ht&&at) return [ht,at];
  if(ht&&!at&&m.a[0]==='3'){ const fx=koFixtureFor(m,ht); if(fx) at=(fx.a===ht)?fx.b:(fx.b===ht?fx.a:at); }
  else if(at&&!ht&&m.h[0]==='3'){ const fx=koFixtureFor(m,at); if(fx) ht=(fx.a===at)?fx.b:(fx.b===at?fx.a:ht); }
  return [ht,at];
}
/* rótulo de um slot ainda não resolvido */
function slotLabel(s,m,ctx){
  if(s[0]==='1') return '1º Grupo '+s.slice(1);
  if(s[0]==='2') return '2º Grupo '+s.slice(1);
  if(s[0]==='3') return '3º '+s.slice(2).split('').join('/');
  if(s[0]==='W') return 'Vencedor #'+s.slice(1);
  if(s[0]==='L') return 'Perdedor #'+s.slice(1);
  return '';
}
/* propaga vencedores/perdedores pela árvore até estabilizar */
function propagate(ctx){
  let changed=true, guard=0;
  while(changed && guard++<12){
    changed=false;
    for(const m of KNOCKOUT){
      if(ctx.winnerOf[m.id]) continue;
      const [ht,at]=tieTeams(m,ctx);
      if(!ht||!at) continue;
      const r=koResults[pairKey(ht,at)];
      if(r&&!r.live&&r.winner){
        ctx.winnerOf[m.id]=r.winner;
        ctx.loserOf[m.id]= r.winner===ht?at:ht;
        changed=true;
      }
    }
  }
}

/* ============================================================
   Render
   ============================================================ */
function teamRow(name,slot,m,ctx,other){
  if(!name) return {html:`<div class="row"><span class="nm lbl">${esc(slotLabel(slot,m,ctx))}</span></div>`,name:null};
  const disp=esc(ABBR[name]||name);
  const cls=name==='Brasil'?' br-name':'';
  /* placar do confronto, se houver */
  let sc='', rowcls='';
  if(other){
    const r=koResults[pairKey(name,other)];
    if(r&&!r.pre){                                          // confronto só marcado (pre): mostra o time, sem placar
      const g=r.a===name?r.ga:r.gb;
      let pens='';
      if(r.pens){ const p=r.a===name?r.pens[0]:r.pens[1]; pens=`<span class="pens">(${p})</span>`; }
      sc=`<span class="sc">${g}</span>${pens}`;
      if(r.winner===name) rowcls=' win'; else if(r.winner) rowcls=' out';
    }
  }
  return {html:`<div class="row${rowcls}">${flag(name)}<span class="nm${cls}">${disp}</span>${sc}</div>`,name};
}
function tieCard(m,ctx){
  const [ht,at]=tieTeams(m,ctx);
  const live=(()=>{ if(ht&&at){ const r=koResults[pairKey(ht,at)]; return r&&r.live; } return false; })();
  const top=teamRow(ht,m.h,m,ctx,at), bot=teamRow(at,m.a,m,ctx,ht);
  const tag=m.third?'3º lugar · ':'';
  return `<div class="tie${live?' live':''}">
    <div class="tie-meta">${tag}#${m.id} · ${m.d} · ${esc(m.v)}${live?' · <span class="lv">ao vivo</span>':''}</div>
    ${top.html}${bot.html}
  </div>`;
}
/* agrupa os jogos de uma fase pelo confronto que alimentam na fase seguinte (NEXT),
   só pra renderizar em PARES — espaço menor dentro do par, maior entre pares.
   A Final fica num par de um jogo só. */
function pairsHTML(ties,ctx){
  const groups=new Map();
  ties.forEach(m=>{ const k=NEXT[m.id]??('solo'+m.id); if(!groups.has(k)) groups.set(k,[]); groups.get(k).push(m); });
  let out='';
  for(const gms of groups.values()) out+=`<div class="mm-pair">${gms.map(m=>tieCard(m,ctx)).join('')}</div>`;
  return out;
}
/* ---------- carrossel por fase ---------- */
let mmActive=-1;   // fase ativa (-1 = ainda não definida; escolhida na 1ª render)
/* fase decidida = todos os confrontos (fora o 3º lugar) já têm vencedor */
function phaseDecided(ph,ctx){ return KNOCKOUT.filter(m=>m.ph===ph&&!m.third).every(m=>ctx.winnerOf[m.id]); }
/* ordem dos slides: as 5 fases do bracket, com o 3º lugar logo ANTES da Final */
function slideDefs(){
  const defs=[];
  PHASES.forEach(p=>{
    if(p.ph==='final') defs.push({third:true,name:'3º lugar'});
    defs.push({ph:p.ph,name:p.name});
  });
  return defs;
}
/* fase padrão ao abrir: a primeira ainda não decidida (= fase atual do torneio); se tudo decidido, a Final.
   O 3º lugar é pulado nessa escolha (só é acessado por aba/swipe). */
function defaultPhase(ctx){
  const defs=slideDefs();
  for(let i=0;i<defs.length;i++){ if(defs[i].third) continue; if(!phaseDecided(defs[i].ph,ctx)) return i; }
  return defs.length-1;
}
function mmApply(){
  const track=$('mmTrack'); if(!track) return;
  const slides=[...track.children], last=slides.length-1;
  mmActive=Math.max(0,Math.min(mmActive,last));
  slides.forEach((s,i)=>{
    s.style.transform=`translateX(${(i-mmActive)*100}%)`;
    s.setAttribute('aria-hidden', i!==mmActive);
  });
  const active=slides[mmActive];
  if(active) $('mmViewport').style.height=active.offsetHeight+'px';
  [...$('mmTabs').children].forEach((t,i)=>{
    t.classList.toggle('active',i===mmActive);
    t.setAttribute('aria-selected',i===mmActive);
  });
}
function mmGo(i){ mmActive=i; mmApply(); }

function render(){
  const ctx=buildContext();
  propagate(ctx);

  let tabs='', slides='';
  slideDefs().forEach((d,i)=>{
    if(d.third){                                    // disputa de 3º lugar — slide próprio, antes da Final
      const bronze=KNOCKOUT.find(m=>m.third);
      tabs+=`<button class="mm-tab" type="button" role="tab" data-i="${i}">3º lugar</button>`;
      slides+=`<div class="mm-slide" role="tabpanel" data-ph="third"><div class="mm-grid"><div class="mm-pair">${tieCard(bronze,ctx)}</div></div></div>`;
    }else{
      const ties=KNOCKOUT.filter(m=>m.ph===d.ph && !m.third);
      tabs+=`<button class="mm-tab" type="button" role="tab" data-i="${i}">${d.name}<span class="mm-tab-n">${ties.length}</span></button>`;
      slides+=`<div class="mm-slide" role="tabpanel" data-ph="${d.ph}"><div class="mm-grid">${pairsHTML(ties,ctx)}</div></div>`;
    }
  });
  $('mmTabs').innerHTML=tabs;
  $('mmTrack').innerHTML=slides;

  if(mmActive<0) mmActive=defaultPhase(ctx);   // só na 1ª render; navegação do usuário é preservada
  mmApply();
}

/* ============================================================
   Camada ao vivo (placares via API pública da ESPN)
   Range amplo: grupos (tabela) + mata-mata (propagação)
   ============================================================ */
const API="https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260719";
function setSrc(state,text){
  const el=$('src'); el.classList.remove('ok','off');
  if(state) el.classList.add(state);
  $('srcText').textContent=text;
}
let liveBusy=false, hasLive=false;
async function fetchScores(silent=false){
  if(liveBusy) return; liveBusy=true;
  const btn=$('refresh');
  if(!silent){ btn.disabled=true; btn.classList.add('spin'); setSrc('','Atualizando…'); }
  try{
    const res=await fetch(API,{cache:'no-store'});
    if(!res.ok) throw new Error('HTTP '+res.status);
    const {live}=applyEvents((await res.json()).events);
    hasLive=live>0;
    const hora=new Date().toLocaleTimeString('pt-BR',{timeZone:SP,hour:'2-digit',minute:'2-digit'});
    setSrc('ok', live?`${live} jogo(s) ao vivo · ${hora}`:`Atualizado · ${hora}`);
    render();
  }catch(e){
    setSrc('off','Sem conexão ao vivo');
    console.warn('Placares indisponíveis:',e.message);
  }finally{
    liveBusy=false;
    if(!silent){ btn.disabled=false; btn.classList.remove('spin'); }
  }
}
let liveTimer=null;
function scheduleNext(){
  clearTimeout(liveTimer);
  liveTimer=setTimeout(async()=>{
    if(!document.hidden) await fetchScores(true);
    scheduleNext();
  }, hasLive?30000:300000);
}
document.addEventListener('visibilitychange',()=>{ if(!document.hidden) fetchScores(true); });
$('refresh').addEventListener('click',()=>fetchScores());

/* ---------- navegação do carrossel (abas + swipe + resize) ---------- */
$('mmTabs').addEventListener('click',e=>{ const b=e.target.closest('.mm-tab'); if(b) mmGo(+b.dataset.i); });
(()=>{                                   // swipe horizontal (com guarda vertical p/ não atrapalhar o scroll)
  const vp=$('mmViewport'); let x=null,y=null;
  vp.addEventListener('touchstart',e=>{ x=e.touches[0].clientX; y=e.touches[0].clientY; },{passive:true});
  vp.addEventListener('touchend',e=>{
    if(x==null) return;
    const dx=e.changedTouches[0].clientX-x, dy=e.changedTouches[0].clientY-y;
    if(Math.abs(dx)>50 && Math.abs(dx)>Math.abs(dy)*1.4) mmGo(mmActive+(dx<0?1:-1));
    x=y=null;
  },{passive:true});
})();
let mmResizeT=null;
window.addEventListener('resize',()=>{ clearTimeout(mmResizeT); mmResizeT=setTimeout(mmApply,120); });

/* ---------- tema claro / escuro (persistente, igual ao guia) ---------- */
$('themeToggle').addEventListener('click',()=>{
  const next=document.documentElement.getAttribute('data-theme')==='light'?'dark':'light';
  document.documentElement.setAttribute('data-theme',next);
  const m=document.querySelector('meta[name="theme-color"]');
  if(m) m.setAttribute('content',next==='light'?'#eef2f6':'#0c1620');
  try{localStorage.setItem('gdc-theme',next);}catch(e){}
});

function reveal(){ document.body.classList.add('ready'); }
render();
fetchScores().then(scheduleNext).finally(reveal);
setTimeout(reveal, 6000);
