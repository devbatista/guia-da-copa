/* ============================================================
   Classificação da fase de grupos — Copa do Mundo 2026
   Página autocontida (como a prancheta). Os placares vêm da
   API pública da ESPN; a tabela é 100% calculada no navegador.
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
/* time -> grupo (lookup rápido) */
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
/* nomes grandes -> versão curta só p/ exibição */
const ABBR={'Rep. Dem. do Congo':'RD Congo','Bósnia e Herzegovina':'Bósnia','Estados Unidos':'EUA','República Tcheca':'Rep. Tcheca','Arábia Saudita':'Ar. Saudita','Coreia do Sul':'Coreia Sul','Nova Zelândia':'N. Zelândia','Costa do Marfim':'C. Marfim'};
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/</g,'&lt;');
const $=id=>document.getElementById(id);
const SP='America/Sao_Paulo';

/* ---------- estado: jogos encerrados da fase de grupos ---------- */
/* chave do par -> {a,b,ga,gb}; dedupe garante 1 resultado por confronto */
const results={};
const pairKey=(a,b)=>[a,b].sort().join('|');

/* casa os eventos da ESPN: guarda só os jogos ENCERRADOS entre dois times do MESMO grupo */
function applyEvents(events){
  let live=0;
  (events||[]).forEach(ev=>{
    const c=ev.competitions&&ev.competitions[0]; if(!c||!c.competitors||c.competitors.length<2) return;
    const home=c.competitors.find(x=>x.homeAway==='home')||c.competitors[0];
    const away=c.competitors.find(x=>x.homeAway==='away')||c.competitors[1];
    const pa=toPT(home.team&&(home.team.displayName||home.team.name));
    const pb=toPT(away.team&&(away.team.displayName||away.team.name));
    if(!pa||!pb) return;
    if(!GROUP_OF[pa]||GROUP_OF[pa]!==GROUP_OF[pb]) return;   // só confrontos da fase de grupos
    const st=(ev.status||c.status||{}), state=(st.type||{}).state;   // pre | in | post
    if(state==='pre') return;                 // ainda não começou: não entra na conta
    const isLive=state==='in';
    if(isLive) live++;
    /* jogos ao vivo entram na tabela como parcial (live:true); encerrados sobrescrevem com live:false */
    results[pairKey(pa,pb)]={a:pa,b:pb,ga:+home.score||0,gb:+away.score||0,live:isLive};
  });
  return {live};
}

/* ---------- cálculo da tabela ---------- */
/* confronto direto entre dois times: -1 se A venceu, 1 se B venceu, 0 empate/sem jogo */
function h2h(aName,bName){
  const r=results[pairKey(aName,bName)]; if(!r) return 0;
  const ga=r.a===aName?r.ga:r.gb, gb=r.a===aName?r.gb:r.ga;
  return ga>gb?-1:ga<gb?1:0;
}
/* critérios FIFA: Pts > Saldo > Gols pró > Confronto direto > ordem alfabética */
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
/* os 8 melhores 3º colocados avançam (formato 2026). Marca quem está na zona. */
function bestThirds(tbl){
  const thirds=Object.keys(tbl).map(g=>({g,r:tbl[g][2]})).filter(x=>x.r);
  thirds.sort((x,y)=>cmp(x.r,y.r));
  return new Set(thirds.slice(0,8).map(x=>x.g));   // grupos cujo 3º está classificado
}

/* ---------- render ---------- */
function teamCell(name,live){
  const disp=esc(ABBR[name]||name);
  const cls=name==='Brasil'?' br-name':'';
  const dot=live?'<span class="live-dot" title="Jogo em andamento — parcial"></span>':'';
  return `${flag(name)}<span class="tn${cls}">${disp}</span>${dot}`;
}
function render(){
  const tbl=standings();
  const thirdsIn=bestThirds(tbl);
  /* times que estão num jogo em andamento (números provisórios na tabela) */
  const liveTeams=new Set();
  Object.values(results).forEach(r=>{ if(r.live){ liveTeams.add(r.a); liveTeams.add(r.b); } });
  let html='';
  for(const g of Object.keys(GROUPS)){
    const rows=tbl[g];
    const played=rows.reduce((s,r)=>s+r.j,0)/2;   // jogos disputados/em andamento no grupo (de 6)
    const groupLive=rows.some(r=>liveTeams.has(r.name));
    const tag=groupLive ?'<span class="gtag live">ao vivo</span>'
             :played===0?'<span class="gtag">a começar</span>'
             :played<6 ?`<span class="gtag">${played}/6 jogos</span>`
                        :'<span class="gtag done">encerrado</span>';
    const body=rows.map((r,i)=>{
      const pos=i+1;
      const zone=pos<=2?'q':(pos===3&&thirdsIn.has(g)?'q3':'');
      const live=liveTeams.has(r.name);
      const sg=(r.sg>0?'+':'')+r.sg;
      return `<tr class="${zone}${live?' live':''}">
        <td class="pos">${pos}</td>
        <td class="team">${teamCell(r.name,live)}</td>
        <td class="pt">${r.pts}</td>
        <td>${r.j}</td><td>${r.v}</td><td>${r.e}</td><td>${r.d}</td>
        <td>${r.gp}</td><td>${r.gc}</td><td class="sg">${sg}</td>
      </tr>`;
    }).join('');
    html+=`<section class="gcard">
      <div class="ghead"><span class="gname">Grupo ${g}</span>${tag}</div>
      <table class="gtable">
        <thead><tr>
          <th class="pos">#</th><th class="team">Seleção</th>
          <th class="pt" title="Pontos">Pts</th>
          <th title="Jogos">J</th><th title="Vitórias">V</th><th title="Empates">E</th><th title="Derrotas">D</th>
          <th title="Gols pró">GP</th><th title="Gols contra">GC</th><th class="sg" title="Saldo de gols">SG</th>
        </tr></thead>
        <tbody>${body}</tbody>
      </table>
    </section>`;
  }
  $('grid').innerHTML=html;
}

/* ---------- camada ao vivo (placares via API pública da ESPN) ---------- */
/* range só da fase de grupos (11–27 jun): evita contar revanches do mata-mata */
const API="https://site.api.espn.com/apis/site/v2/sports/soccer/fifa.world/scoreboard?dates=20260611-20260627";
function setSrc(state,text){
  const el=$('src'); el.classList.remove('ok','off');
  if(state) el.classList.add(state);
  $('srcText').textContent=text;
}
let liveBusy=false, hasLive=false;
async function fetchScores(silent=false){
  if(liveBusy) return;
  liveBusy=true;
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

/* auto-refresh: 30s com jogo ao vivo, 5min caso contrário; pausa em aba oculta */
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
render();                                   // grade vazia (some sob o loader)
fetchScores().then(scheduleNext).finally(reveal);
setTimeout(reveal, 6000);                   // fallback: nunca trava no "carregando"
