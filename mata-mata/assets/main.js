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
    if(state==='pre') return;
    const isLive=state==='in';
    if(isLive) live++;
    const ga=+home.score||0, gb=+away.score||0;
    if(GROUP_OF[pa]&&GROUP_OF[pa]===GROUP_OF[pb]){
      results[pairKey(pa,pb)]={a:pa,b:pb,ga,gb,live:isLive};        // fase de grupos
    }else if(GROUP_OF[pa]&&GROUP_OF[pb]){
      let winner=null;                                              // mata-mata
      if(home.winner===true) winner=pa; else if(away.winner===true) winner=pb;
      else if(!isLive) winner=ga>gb?pa:gb>ga?pb:null;
      let pens=null;
      if(home.shootoutScore!=null&&away.shootoutScore!=null) pens=[+home.shootoutScore,+away.shootoutScore];
      koResults[pairKey(pa,pb)]={a:pa,b:pb,ga,gb,winner,pens,live:isLive};
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
/* os 8 melhores 3º colocados (formato 2026): retorna as letras dos grupos classificados */
function bestThirds(tbl){
  const thirds=Object.keys(tbl).map(g=>({g,r:tbl[g][2]})).filter(x=>x.r&&x.r.j>0);
  thirds.sort((x,y)=>cmp(x.r,y.r));
  return thirds.slice(0,8).map(x=>x.g);
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

/* ------------------------------------------------------------
   Alocação dos 8 melhores 3º (FIFA, Anexo C — 495 combinações).
   Chave = letras dos grupos classificados em ordem alfabética.
   Valor = qual grupo (3º) enfrenta cada vencedor de grupo.
   As linhas abaixo são da tabela oficial e servem de semente/teste;
   a combinação que realmente ocorrer (definida em 27/jun) deve ser
   adicionada aqui — enquanto não estiver, os jogos 1º×3º mostram o
   rótulo do conjunto elegível (ex.: "3º A/B/C/D/F").
   ------------------------------------------------------------ */
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
].forEach(([k,v])=>{ const a=v.split(','); const o={}; TA_COLS.forEach((c,i)=>o[c]=a[i]); THIRDS_ALLOCATION[k]=o; });

/* ============================================================
   Resolução: do estado da ESPN para os times de cada confronto
   ============================================================ */
function buildContext(){
  const tbl=standings();
  const done={}; let allDone=true;
  for(const g in GROUPS){ done[g]=groupDone(g); if(!done[g]) allDone=false; }
  let thirdAssign=null, thirdGroups=null;
  if(allDone){
    thirdGroups=bestThirds(tbl).slice().sort();           // 8 letras
    if(thirdGroups.length===8) thirdAssign=THIRDS_ALLOCATION[thirdGroups.join('')]||null;
  }
  return {tbl,done,allDone,thirdGroups,thirdAssign,winnerOf:{},loserOf:{}};
}
/* nome do time de um slot, ou null se ainda indefinido */
function teamForSlot(s,m,ctx){
  if(s[0]==='1'||s[0]==='2'){
    const g=s.slice(1); if(!ctx.done[g]) return null;
    return ctx.tbl[g][s[0]==='1'?0:1].name;
  }
  if(s[0]==='3'){                                          // melhor 3º: depende do vencedor (lado mandante)
    if(!ctx.thirdAssign) return null;
    const g=ctx.thirdAssign[m.h]; if(!g) return null;
    const row=ctx.tbl[g][2]; return row?row.name:null;
  }
  if(s[0]==='W') return ctx.winnerOf[+s.slice(1)]||null;
  if(s[0]==='L') return ctx.loserOf[+s.slice(1)]||null;
  return null;
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
      const ht=teamForSlot(m.h,m,ctx), at=teamForSlot(m.a,m,ctx);
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
function teamRow(slot,m,ctx,oppTeam){
  const name=teamForSlot(slot,m,ctx);
  if(!name) return {html:`<div class="row"><span class="nm lbl">${esc(slotLabel(slot,m,ctx))}</span></div>`,name:null};
  const disp=esc(ABBR[name]||name);
  const cls=name==='Brasil'?' br-name':'';
  /* placar do confronto, se houver */
  let sc='', rowcls='';
  const other=oppTeam;
  if(other){
    const r=koResults[pairKey(name,other)];
    if(r){
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
  const live=(()=>{ const ht=teamForSlot(m.h,m,ctx),at=teamForSlot(m.a,m,ctx);
    if(ht&&at){ const r=koResults[pairKey(ht,at)]; return r&&r.live; } return false; })();
  const ht=teamForSlot(m.h,m,ctx), at=teamForSlot(m.a,m,ctx);
  const top=teamRow(m.h,m,ctx,at), bot=teamRow(m.a,m,ctx,ht);
  const tag=m.third?'3º lugar · ':'';
  return `<div class="tie${live?' live':''}">
    <div class="tie-meta">${tag}#${m.id} · ${m.d} · ${esc(m.v)}${live?' · <span class="lv">ao vivo</span>':''}</div>
    ${top.html}${bot.html}
  </div>`;
}
function render(){
  const ctx=buildContext();
  propagate(ctx);
  let html='';
  for(const p of PHASES){
    const ties=KNOCKOUT.filter(m=>m.ph===p.ph && !m.third);   // 3º lugar fica fora da coluna (não desalinha a final)
    const body=ties.map(m=>tieCard(m,ctx)).join('');
    html+=`<div class="col col-${p.ph}"><div class="col-head">${p.name}</div><div class="col-body">${body}</div></div>`;
  }
  $('bracket').innerHTML=html;

  /* disputa de 3º lugar — cartão à parte, abaixo da árvore */
  const bronze=KNOCKOUT.find(m=>m.third);
  $('bronze').innerHTML=`<div class="bronze-head">Disputa de 3º lugar</div>${tieCard(bronze,ctx)}`;

  /* painel dos 3º classificados */
  const tp=$('thirds');
  if(ctx.allDone && ctx.thirdGroups){
    const chips=ctx.thirdGroups.map(g=>{ const t=ctx.tbl[g][2]; const n=t?t.name:null;
      return n?`<span class="tchip">${flag(n)}<span>${esc(ABBR[n]||n)}</span><i>${g}</i></span>`:''; }).join('');
    const note=ctx.thirdAssign?'':'<div class="tnote">O pareamento exato dos 3º com os vencedores será definido pela tabela oficial da FIFA.</div>';
    tp.innerHTML=`<div class="thead">8 melhores terceiros classificados</div><div class="tchips">${chips}</div>${note}`;
    tp.style.display='';
  }else{
    tp.style.display='none';
  }
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
