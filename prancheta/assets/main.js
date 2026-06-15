/* ============================================================================
   ①  BANCO DE DADOS
   ----------------------------------------------------------------------------
   Fundação do jogo. Cada elenco: { team, year, players:[{n,pos,f}] }.
   Posições: GOL, ZAG, LAT, MEI, ATA  ·  f = força de 1 a 99.
   Todo elenco cobre as 5 posições. Há elencos craques e elencos fracos de
   propósito (Grécia 2010 / Arábia 1994): é o que dá tensão ao sorteio —
   nem toda rolagem entrega um astro.
   ============================================================================ */
const ELENCOS = [
  /* ---- Clássicos vencedores ---- */
  { team:"Brasil", year:1970, players:[
    {n:"Félix",pos:"GOL",f:78},{n:"Carlos Alberto",pos:"LAT",f:90},{n:"Everaldo",pos:"LAT",f:79},
    {n:"Brito",pos:"ZAG",f:80},{n:"Piazza",pos:"ZAG",f:82},{n:"Clodoaldo",pos:"MEI",f:85},
    {n:"Gérson",pos:"MEI",f:90},{n:"Rivelino",pos:"MEI",f:91},{n:"Jairzinho",pos:"ATA",f:92},
    {n:"Pelé",pos:"ATA",f:97},{n:"Tostão",pos:"ATA",f:90}]},
  { team:"Brasil", year:2002, players:[
    {n:"Marcos",pos:"GOL",f:85},{n:"Cafu",pos:"LAT",f:89},{n:"Roberto Carlos",pos:"LAT",f:90},
    {n:"Lúcio",pos:"ZAG",f:86},{n:"Edmílson",pos:"ZAG",f:82},{n:"Gilberto Silva",pos:"MEI",f:83},
    {n:"Kléberson",pos:"MEI",f:77},{n:"Ronaldinho",pos:"MEI",f:90},{n:"Rivaldo",pos:"MEI",f:91},
    {n:"Ronaldo",pos:"ATA",f:95},{n:"Denílson",pos:"ATA",f:78}]},
  { team:"Argentina", year:1986, players:[
    {n:"Pumpido",pos:"GOL",f:78},{n:"Cuciuffo",pos:"LAT",f:76},{n:"Olarticoechea",pos:"LAT",f:77},
    {n:"Brown",pos:"ZAG",f:80},{n:"Ruggeri",pos:"ZAG",f:82},{n:"Giusti",pos:"MEI",f:80},
    {n:"Burruchaga",pos:"MEI",f:84},{n:"Maradona",pos:"MEI",f:99},{n:"Enrique",pos:"MEI",f:79},
    {n:"Valdano",pos:"ATA",f:85},{n:"Pasculli",pos:"ATA",f:75}]},
  { team:"França", year:1998, players:[
    {n:"Barthez",pos:"GOL",f:85},{n:"Thuram",pos:"LAT",f:87},{n:"Lizarazu",pos:"LAT",f:85},
    {n:"Blanc",pos:"ZAG",f:85},{n:"Desailly",pos:"ZAG",f:87},{n:"Deschamps",pos:"MEI",f:83},
    {n:"Petit",pos:"MEI",f:82},{n:"Zidane",pos:"MEI",f:96},{n:"Djorkaeff",pos:"MEI",f:84},
    {n:"Henry",pos:"ATA",f:84},{n:"Guivarc'h",pos:"ATA",f:70}]},
  { team:"Itália", year:1982, players:[
    {n:"Zoff",pos:"GOL",f:88},{n:"Cabrini",pos:"LAT",f:82},{n:"Bergomi",pos:"LAT",f:79},
    {n:"Gentile",pos:"ZAG",f:84},{n:"Scirea",pos:"ZAG",f:86},{n:"Tardelli",pos:"MEI",f:84},
    {n:"Oriali",pos:"MEI",f:78},{n:"Antognoni",pos:"MEI",f:83},{n:"Conti",pos:"MEI",f:82},
    {n:"Rossi",pos:"ATA",f:90},{n:"Graziani",pos:"ATA",f:80}]},
  { team:"Alemanha", year:2014, players:[
    {n:"Neuer",pos:"GOL",f:92},{n:"Lahm",pos:"LAT",f:88},{n:"Höwedes",pos:"LAT",f:80},
    {n:"Boateng",pos:"ZAG",f:86},{n:"Hummels",pos:"ZAG",f:87},{n:"Schweinsteiger",pos:"MEI",f:88},
    {n:"Khedira",pos:"MEI",f:83},{n:"Kroos",pos:"MEI",f:89},{n:"Özil",pos:"MEI",f:86},
    {n:"Müller",pos:"ATA",f:88},{n:"Klose",pos:"ATA",f:84}]},
  { team:"Espanha", year:2010, players:[
    {n:"Casillas",pos:"GOL",f:90},{n:"Ramos",pos:"LAT",f:88},{n:"Capdevila",pos:"LAT",f:78},
    {n:"Piqué",pos:"ZAG",f:87},{n:"Puyol",pos:"ZAG",f:86},{n:"Busquets",pos:"MEI",f:85},
    {n:"Xabi Alonso",pos:"MEI",f:85},{n:"Xavi",pos:"MEI",f:92},{n:"Iniesta",pos:"MEI",f:91},
    {n:"Villa",pos:"ATA",f:87},{n:"Torres",pos:"ATA",f:83}]},

  /* ---- Europeias fortes ---- */
  { team:"Holanda", year:1974, players:[
    {n:"Jongbloed",pos:"GOL",f:74},{n:"Suurbier",pos:"LAT",f:78},{n:"Krol",pos:"LAT",f:84},
    {n:"Rijsbergen",pos:"ZAG",f:78},{n:"Haan",pos:"ZAG",f:82},{n:"Jansen",pos:"MEI",f:79},
    {n:"Neeskens",pos:"MEI",f:87},{n:"Van Hanegem",pos:"MEI",f:84},{n:"Cruyff",pos:"ATA",f:96},
    {n:"Rep",pos:"ATA",f:81},{n:"Rensenbrink",pos:"ATA",f:83}]},
  { team:"Alemanha", year:1990, players:[
    {n:"Illgner",pos:"GOL",f:82},{n:"Brehme",pos:"LAT",f:86},{n:"Berthold",pos:"LAT",f:78},
    {n:"Kohler",pos:"ZAG",f:84},{n:"Augenthaler",pos:"ZAG",f:83},{n:"Matthäus",pos:"MEI",f:92},
    {n:"Häßler",pos:"MEI",f:82},{n:"Littbarski",pos:"MEI",f:80},{n:"Völler",pos:"ATA",f:86},
    {n:"Klinsmann",pos:"ATA",f:87},{n:"Riedle",pos:"ATA",f:79}]},
  { team:"Inglaterra", year:1966, players:[
    {n:"Banks",pos:"GOL",f:86},{n:"Cohen",pos:"LAT",f:78},{n:"Wilson",pos:"LAT",f:78},
    {n:"J. Charlton",pos:"ZAG",f:82},{n:"Moore",pos:"ZAG",f:90},{n:"Stiles",pos:"MEI",f:78},
    {n:"B. Charlton",pos:"MEI",f:90},{n:"Ball",pos:"MEI",f:82},{n:"Peters",pos:"MEI",f:81},
    {n:"Hurst",pos:"ATA",f:85},{n:"Hunt",pos:"ATA",f:79}]},
  { team:"França", year:2018, players:[
    {n:"Lloris",pos:"GOL",f:86},{n:"Pavard",pos:"LAT",f:81},{n:"L. Hernández",pos:"LAT",f:83},
    {n:"Varane",pos:"ZAG",f:87},{n:"Umtiti",pos:"ZAG",f:83},{n:"Kanté",pos:"MEI",f:88},
    {n:"Pogba",pos:"MEI",f:86},{n:"Griezmann",pos:"MEI",f:89},{n:"Matuidi",pos:"MEI",f:80},
    {n:"Mbappé",pos:"ATA",f:91},{n:"Giroud",pos:"ATA",f:81}]},
  { team:"Itália", year:2006, players:[
    {n:"Buffon",pos:"GOL",f:91},{n:"Zambrotta",pos:"LAT",f:84},{n:"Grosso",pos:"LAT",f:80},
    {n:"Cannavaro",pos:"ZAG",f:90},{n:"Nesta",pos:"ZAG",f:88},{n:"Pirlo",pos:"MEI",f:89},
    {n:"Gattuso",pos:"MEI",f:82},{n:"Perrotta",pos:"MEI",f:78},{n:"Totti",pos:"MEI",f:87},
    {n:"Toni",pos:"ATA",f:82},{n:"Del Piero",pos:"ATA",f:84}]},
  { team:"Portugal", year:2006, players:[
    {n:"Ricardo",pos:"GOL",f:80},{n:"Miguel",pos:"LAT",f:76},{n:"Nuno Valente",pos:"LAT",f:74},
    {n:"R. Carvalho",pos:"ZAG",f:85},{n:"F. Meira",pos:"ZAG",f:78},{n:"Maniche",pos:"MEI",f:80},
    {n:"Deco",pos:"MEI",f:86},{n:"Costinha",pos:"MEI",f:76},{n:"Figo",pos:"MEI",f:86},
    {n:"C. Ronaldo",pos:"ATA",f:86},{n:"Pauleta",pos:"ATA",f:80}]},

  /* ---- Sul-americanas extras ---- */
  { team:"Brasil", year:1982, players:[
    {n:"Waldir Peres",pos:"GOL",f:74},{n:"Leandro",pos:"LAT",f:83},{n:"Júnior",pos:"LAT",f:84},
    {n:"Oscar",pos:"ZAG",f:80},{n:"Luizinho",pos:"ZAG",f:78},{n:"Falcão",pos:"MEI",f:90},
    {n:"Cerezo",pos:"MEI",f:84},{n:"Sócrates",pos:"MEI",f:91},{n:"Zico",pos:"MEI",f:93},
    {n:"Éder",pos:"ATA",f:84},{n:"Serginho",pos:"ATA",f:72}]},
  { team:"Argentina", year:1978, players:[
    {n:"Fillol",pos:"GOL",f:84},{n:"Olguín",pos:"LAT",f:76},{n:"Tarantini",pos:"LAT",f:77},
    {n:"Passarella",pos:"ZAG",f:86},{n:"Galván",pos:"ZAG",f:79},{n:"Ardiles",pos:"MEI",f:84},
    {n:"Gallego",pos:"MEI",f:78},{n:"Bertoni",pos:"MEI",f:80},{n:"Kempes",pos:"ATA",f:88},
    {n:"Luque",pos:"ATA",f:81},{n:"Ortiz",pos:"ATA",f:74}]},
  { team:"Uruguai", year:1950, players:[
    {n:"Máspoli",pos:"GOL",f:80},{n:"M. González",pos:"LAT",f:74},{n:"Tejera",pos:"LAT",f:75},
    {n:"W. Gambetta",pos:"ZAG",f:78},{n:"Varela",pos:"ZAG",f:85},{n:"Andrade",pos:"MEI",f:81},
    {n:"Pérez",pos:"MEI",f:76},{n:"Schiaffino",pos:"MEI",f:87},{n:"Ghiggia",pos:"ATA",f:84},
    {n:"Míguez",pos:"ATA",f:80},{n:"Vidal",pos:"ATA",f:75}]},
  { team:"Brasil", year:1994, players:[
    {n:"Taffarel",pos:"GOL",f:84},{n:"Jorginho",pos:"LAT",f:80},{n:"Branco",pos:"LAT",f:80},
    {n:"Aldair",pos:"ZAG",f:84},{n:"Márcio Santos",pos:"ZAG",f:78},{n:"Dunga",pos:"MEI",f:84},
    {n:"Mauro Silva",pos:"MEI",f:82},{n:"Mazinho",pos:"MEI",f:78},{n:"Zinho",pos:"MEI",f:79},
    {n:"Romário",pos:"ATA",f:92},{n:"Bebeto",pos:"ATA",f:86}]},
  { team:"Argentina", year:2022, players:[
    {n:"E. Martínez",pos:"GOL",f:87},{n:"Molina",pos:"LAT",f:80},{n:"Tagliafico",pos:"LAT",f:79},
    {n:"Romero",pos:"ZAG",f:85},{n:"Otamendi",pos:"ZAG",f:82},{n:"De Paul",pos:"MEI",f:84},
    {n:"Enzo Fernández",pos:"MEI",f:83},{n:"Mac Allister",pos:"MEI",f:84},{n:"Messi",pos:"MEI",f:95},
    {n:"J. Álvarez",pos:"ATA",f:85},{n:"Di María",pos:"ATA",f:84}]},

  /* ---- Fracos de propósito (geram a tensão do sorteio) ---- */
  { team:"Grécia", year:2010, players:[
    {n:"Tzorvas",pos:"GOL",f:68},{n:"Torosidis",pos:"LAT",f:70},{n:"Vyntra",pos:"LAT",f:66},
    {n:"Papadopoulos",pos:"ZAG",f:70},{n:"Kyrgiakos",pos:"ZAG",f:69},{n:"Katsouranis",pos:"MEI",f:71},
    {n:"Karagounis",pos:"MEI",f:73},{n:"Tziolis",pos:"MEI",f:65},{n:"Samaras",pos:"ATA",f:72},
    {n:"Gekas",pos:"ATA",f:71},{n:"Salpingidis",pos:"ATA",f:70}]},
  { team:"Arábia Saudita", year:1994, players:[
    {n:"Al-Deayea",pos:"GOL",f:70},{n:"Zubromawi",pos:"LAT",f:64},{n:"Al-Solaimani",pos:"LAT",f:61},
    {n:"Al-Khlaiwi",pos:"ZAG",f:66},{n:"Madani",pos:"ZAG",f:62},{n:"Al-Jaber",pos:"MEI",f:73},
    {n:"Al-Muwallid",pos:"MEI",f:68},{n:"Al-Bishi",pos:"MEI",f:66},{n:"Owairan",pos:"ATA",f:75},
    {n:"Amin",pos:"ATA",f:64},{n:"Al-Thunayan",pos:"ATA",f:63}]},

  /* ---- Lendas clássicas ---- */
  { team:"Hungria", year:1954, players:[
    {n:"Grosics",pos:"GOL",f:82},{n:"Buzánszky",pos:"LAT",f:76},{n:"Lántos",pos:"LAT",f:75},
    {n:"Lóránt",pos:"ZAG",f:80},{n:"Zakariás",pos:"ZAG",f:77},{n:"Bozsik",pos:"MEI",f:86},
    {n:"Hidegkuti",pos:"MEI",f:86},{n:"Czibor",pos:"MEI",f:83},{n:"Kocsis",pos:"ATA",f:90},
    {n:"Puskás",pos:"ATA",f:95},{n:"Tóth",pos:"ATA",f:74}]},
  { team:"Brasil", year:1958, players:[
    {n:"Gilmar",pos:"GOL",f:84},{n:"Djalma Santos",pos:"LAT",f:86},{n:"Nílton Santos",pos:"LAT",f:87},
    {n:"Bellini",pos:"ZAG",f:82},{n:"Orlando",pos:"ZAG",f:80},{n:"Zito",pos:"MEI",f:83},
    {n:"Didi",pos:"MEI",f:90},{n:"Zagallo",pos:"MEI",f:83},{n:"Garrincha",pos:"ATA",f:94},
    {n:"Pelé",pos:"ATA",f:93},{n:"Vavá",pos:"ATA",f:85}]},
  { team:"Alemanha", year:1974, players:[
    {n:"Maier",pos:"GOL",f:86},{n:"Vogts",pos:"LAT",f:84},{n:"Breitner",pos:"LAT",f:85},
    {n:"Beckenbauer",pos:"ZAG",f:92},{n:"Schwarzenbeck",pos:"ZAG",f:79},{n:"Bonhof",pos:"MEI",f:82},
    {n:"Overath",pos:"MEI",f:84},{n:"Hoeneß",pos:"MEI",f:83},{n:"Grabowski",pos:"ATA",f:80},
    {n:"G. Müller",pos:"ATA",f:92},{n:"Hölzenbein",pos:"ATA",f:78}]},

  /* ---- Craques modernos ---- */
  { team:"Brasil", year:2006, players:[
    {n:"Dida",pos:"GOL",f:83},{n:"Cafu",pos:"LAT",f:84},{n:"Roberto Carlos",pos:"LAT",f:85},
    {n:"Lúcio",pos:"ZAG",f:86},{n:"Juan",pos:"ZAG",f:82},{n:"Emerson",pos:"MEI",f:81},
    {n:"Zé Roberto",pos:"MEI",f:82},{n:"Kaká",pos:"MEI",f:90},{n:"Ronaldinho",pos:"MEI",f:92},
    {n:"Ronaldo",pos:"ATA",f:88},{n:"Adriano",pos:"ATA",f:84}]},
  { team:"Bélgica", year:2018, players:[
    {n:"Courtois",pos:"GOL",f:88},{n:"Meunier",pos:"LAT",f:80},{n:"Carrasco",pos:"LAT",f:79},
    {n:"Alderweireld",pos:"ZAG",f:85},{n:"Vertonghen",pos:"ZAG",f:84},{n:"Witsel",pos:"MEI",f:83},
    {n:"De Bruyne",pos:"MEI",f:91},{n:"Hazard",pos:"MEI",f:90},{n:"Fellaini",pos:"MEI",f:78},
    {n:"Lukaku",pos:"ATA",f:86},{n:"Mertens",pos:"ATA",f:82}]},
  { team:"França", year:2022, players:[
    {n:"Lloris",pos:"GOL",f:84},{n:"Koundé",pos:"LAT",f:82},{n:"T. Hernández",pos:"LAT",f:83},
    {n:"Varane",pos:"ZAG",f:84},{n:"Upamecano",pos:"ZAG",f:82},{n:"Tchouaméni",pos:"MEI",f:83},
    {n:"Rabiot",pos:"MEI",f:80},{n:"Griezmann",pos:"MEI",f:87},{n:"Dembélé",pos:"MEI",f:82},
    {n:"Mbappé",pos:"ATA",f:93},{n:"Giroud",pos:"ATA",f:81}]},

  /* ---- Zebras históricas (mais tensão no sorteio) ---- */
  { team:"Camarões", year:1990, players:[
    {n:"N'Kono",pos:"GOL",f:76},{n:"Tataw",pos:"LAT",f:70},{n:"Ebwellé",pos:"LAT",f:68},
    {n:"Kundé",pos:"ZAG",f:72},{n:"Massing",pos:"ZAG",f:70},{n:"M'Bouh",pos:"MEI",f:70},
    {n:"Mfede",pos:"MEI",f:71},{n:"Maboang",pos:"MEI",f:70},{n:"Omam-Biyik",pos:"ATA",f:78},
    {n:"Milla",pos:"ATA",f:82},{n:"Makanaky",pos:"ATA",f:72}]},
  { team:"Coreia do Sul", year:2002, players:[
    {n:"Lee Woon-jae",pos:"GOL",f:74},{n:"Song Chong-gug",pos:"LAT",f:72},{n:"Lee Young-pyo",pos:"LAT",f:75},
    {n:"Hong Myung-bo",pos:"ZAG",f:79},{n:"Choi Jin-cheul",pos:"ZAG",f:72},{n:"Yoo Sang-chul",pos:"MEI",f:74},
    {n:"Kim Nam-il",pos:"MEI",f:73},{n:"Park Ji-sung",pos:"MEI",f:80},{n:"Lee Chun-soo",pos:"MEI",f:73},
    {n:"Ahn Jung-hwan",pos:"ATA",f:76},{n:"Seol Ki-hyeon",pos:"ATA",f:73}]},
  { team:"Marrocos", year:2022, players:[
    {n:"Bono",pos:"GOL",f:82},{n:"Hakimi",pos:"LAT",f:84},{n:"Mazraoui",pos:"LAT",f:80},
    {n:"Saïss",pos:"ZAG",f:78},{n:"Aguerd",pos:"ZAG",f:78},{n:"Amrabat",pos:"MEI",f:80},
    {n:"Ounahi",pos:"MEI",f:76},{n:"Amallah",pos:"MEI",f:73},{n:"Ziyech",pos:"MEI",f:81},
    {n:"En-Nesyri",pos:"ATA",f:78},{n:"Boufal",pos:"ATA",f:76}]},

  /* ---- Mais variedade ---- */
  { team:"Croácia", year:2018, players:[
    {n:"Subašić",pos:"GOL",f:80},{n:"Vrsaljko",pos:"LAT",f:80},{n:"Strinić",pos:"LAT",f:76},
    {n:"Lovren",pos:"ZAG",f:81},{n:"Vida",pos:"ZAG",f:78},{n:"Modrić",pos:"MEI",f:90},
    {n:"Rakitić",pos:"MEI",f:85},{n:"Brozović",pos:"MEI",f:82},{n:"Perišić",pos:"MEI",f:83},
    {n:"Mandžukić",pos:"ATA",f:83},{n:"Rebić",pos:"ATA",f:78}]},
  { team:"Colômbia", year:1994, players:[
    {n:"Córdoba",pos:"GOL",f:76},{n:"Herrera",pos:"LAT",f:72},{n:"Mendoza",pos:"LAT",f:71},
    {n:"Perea",pos:"ZAG",f:74},{n:"Escobar",pos:"ZAG",f:75},{n:"Valderrama",pos:"MEI",f:85},
    {n:"Álvarez",pos:"MEI",f:73},{n:"Rincón",pos:"MEI",f:80},{n:"Asprilla",pos:"ATA",f:82},
    {n:"Valencia",pos:"ATA",f:76},{n:"De Ávila",pos:"ATA",f:74}]},
  { team:"México", year:1986, players:[
    {n:"Larios",pos:"GOL",f:76},{n:"Amador",pos:"LAT",f:71},{n:"Servín",pos:"LAT",f:70},
    {n:"Quirarte",pos:"ZAG",f:77},{n:"F. Cruz",pos:"ZAG",f:71},{n:"Aguirre",pos:"MEI",f:74},
    {n:"Boy",pos:"MEI",f:76},{n:"Negrete",pos:"MEI",f:78},{n:"Flores",pos:"MEI",f:73},
    {n:"Hugo Sánchez",pos:"ATA",f:86},{n:"Hermosillo",pos:"ATA",f:75}]},
];


/* ============================================================================
   ②  MOTOR DE SORTEIO
   ----------------------------------------------------------------------------
   sortearElenco()   → sorteia um elenco aleatório do banco.
   posicoesAbertas() → posições que ainda têm slot vazio no nosso time.
   Regra-chave: só dá pra pescar atleta cuja posição ainda esteja vaga.
   Se o elenco sorteado não tiver nenhum compatível → reroll grátis.
   3 trocas pagas por partida ("Trocar elenco"), com contador.
   ============================================================================ */
function sortearElenco(){
  return ELENCOS[Math.floor(Math.random()*ELENCOS.length)];
}

// Posições com pelo menos um slot ainda vazio
function posicoesAbertas(){
  const abertas = new Set();
  estado.slots.forEach(s => { if(!s.player) abertas.add(s.pos); });
  return abertas;
}

// Um jogador é "pescável" se a posição dele está vaga E ele ainda não foi
// escalado (mesmo nome em elenco de outro ano não pode repetir)
function disponivel(p, abertas){
  return abertas.has(p.pos) && !estado.escolhidos.has(p.n);
}

// Jogadores do elenco que cabem numa posição ainda aberta e não foram usados
function compativeis(elenco){
  const abertas = posicoesAbertas();
  return elenco.players.filter(p => disponivel(p, abertas));
}

// Sorteia até cair um elenco com ao menos 1 jogador encaixável (reroll grátis)
function rolarComGarantia(){
  let elenco, tentativas = 0;
  do {
    elenco = sortearElenco();
    tentativas++;
  } while (compativeis(elenco).length === 0 && tentativas < 50);
  return elenco;
}

// Encaixa o jogador escolhido no primeiro slot livre daquela posição
function encaixar(jogador){
  const slot = estado.slots.find(s => s.pos === jogador.pos && !s.player);
  if(!slot) return false;
  slot.player = jogador;
  return true;
}


/* ============================================================================
   ③  CÁLCULO DE FORÇA
   ----------------------------------------------------------------------------
   FORMACOES define quantos slots de cada posição existem (e o desenho do campo).
   Overall do time = média simples das forças dos jogadores já escalados,
   atualizado ao vivo conforme o draft avança.
   A mentalidade NÃO entra aqui — só na simulação (sistema ④).
   ============================================================================ */
const FORMACOES = {
  "4-3-3":   { slots:{ GOL:1, ZAG:2, LAT:2, MEI:3, ATA:3 } },
  "4-4-2":   { slots:{ GOL:1, ZAG:2, LAT:2, MEI:4, ATA:2 } },
  "3-5-2":   { slots:{ GOL:1, ZAG:3, LAT:2, MEI:3, ATA:2 } },
  "4-2-3-1": { slots:{ GOL:1, ZAG:2, LAT:2, MEI:5, ATA:1 } },
  "3-4-3":   { slots:{ GOL:1, ZAG:3, LAT:2, MEI:2, ATA:3 } },
  "4-2-4":   { slots:{ GOL:1, ZAG:2, LAT:2, MEI:2, ATA:4 } },
  "5-4-1":   { slots:{ GOL:1, ZAG:3, LAT:2, MEI:4, ATA:1 } },
};

const MENTALIDADES = {
  "Defensiva":   { atk:0.85, def:1.20 },
  "Equilibrada": { atk:1.00, def:1.00 },
  "Ofensiva":    { atk:1.20, def:0.85 },
};

// Monta os 11 slots vazios a partir da formação escolhida
function construirSlots(formacao){
  const cont = FORMACOES[formacao].slots;
  const slots = [];
  ["GOL","ZAG","LAT","MEI","ATA"].forEach(pos => {
    for(let i=0; i<cont[pos]; i++) slots.push({ pos, player:null });
  });
  return slots;
}

// Média das forças dos escalados (ignora slots vazios)
function calcularOverall(){
  const escalados = estado.slots.filter(s => s.player);
  if(escalados.length === 0) return 0;
  const soma = escalados.reduce((acc, s) => acc + s.player.f, 0);
  return soma / escalados.length;
}


/* ============================================================================
   ④  SIMULADOR  (modelo de Poisson / xG)
   ----------------------------------------------------------------------------
   Gols esperados (xG) → distribuição de Poisson → placares realistas.
   A razão de força elevada a 3.2 acentua o favoritismo do mais forte.
   7 jogos: 3 de fase de grupos + oitavas, quartas, semi e final, com
   adversários cada vez mais fortes. No mata-mata não pode empatar:
   desempate por "pênaltis" usando a razão de força.
   NÃO ALTERE 3.2 / base 2.0 / o bracket sem testar — está calibrado para
   overall ~90 vencer ~41% das vezes, ~80 ~9%, ~72 ~0.7% (mata-mata mais duro).
   ============================================================================ */
function poisson(lambda){            // amostra gols (algoritmo de Knuth)
  const L = Math.exp(-lambda);
  let k = 0, p = 1;
  do { k++; p *= Math.random(); } while (p > L);
  return k - 1;
}

const BRACKET = [58, 62, 66, 73, 77, 80, 83];   // mata-mata +2 = um pouco mais difícil
const ETAPAS  = [
  "Fase de grupos · 1", "Fase de grupos · 2", "Fase de grupos · 3",
  "Oitavas de final", "Quartas de final", "Semifinal", "Final"
];

// Pool de adversários por etapa (cada vez mais fortes). A força que conta é a do
// BRACKET acima — o nome+ano é só identidade (todos são seleções de Copa de verdade).
// art = possíveis autores dos gols (craques reais daquela seleção). Sorteia 1 por jogo.
const ADVERSARIOS = [
  [ {n:"Canadá",fl:"🇨🇦",a:2022,art:["Davies","J. David","Larin","Buchanan","Hoilett","Eustáquio","Osorio","Laryea","Johnston","Vitória","Borjan"]},
    {n:"Catar",fl:"🇶🇦",a:2022,art:["Almoez Ali","Afif","Muntari","Al-Haydos","Hatim","Ali Asad","Madibo","Boudiaf","Khoukhi","Pedro Miguel","Al-Sheeb"]},
    {n:"Nova Zelândia",fl:"🇳🇿",a:2010,art:["Smeltz","Fallon","Killen","Wood","Bertos","Brown","Elliott","Vicelich","Nelsen","Reid","Paston"]},
    {n:"Arábia Saudita",fl:"🇸🇦",a:2018,art:["Al-Dawsari","Al-Muwallad","Al-Sahlawi","Al-Faraj","Al-Shehri","Otayf","Kanno","Al-Shahrani","Al-Burayk","O. Hawsawi","Al-Owais"]},
    {n:"Tunísia",fl:"🇹🇳",a:2018,art:["Khazri","F. Ben Youssef","Sliti","Sassi","Badri","Skhiri","Khaoui","Maâloul","Bronn","S. Ben Youssef","Hassen"]} ],   // grupos 1
  [ {n:"Japão",fl:"🇯🇵",a:2022,art:["Doan","Mitoma","Maeda","Asano","Tanaka","Kubo","Kamada","Minamino","Endo","Yoshida","Gonda"]},
    {n:"Austrália",fl:"🇦🇺",a:2022,art:["Duke","Leckie","Goodwin","Rogic","Mooy","Hrustic","McGree","Boyle","Irvine","Behich","Ryan"]},
    {n:"Egito",fl:"🇪🇬",a:2018,art:["Salah","Trezeguet","M. Mohsen","Sobhi","Warda","Kahraba","Elneny","Hamed","Hegazi","Fathy","El-Shenawy"]},
    {n:"Coreia do Sul",fl:"🇰🇷",a:2018,art:["Son","Hwang","Kim Y.","Lee Jae-sung","Koo Ja-cheol","Lee Seung-woo","Moon Seon-min","Ki Sung-yueng","Lee Yong","Jang Hyun-soo","Cho Hyun-woo"]},
    {n:"Irã",fl:"🇮🇷",a:2018,art:["Taremi","Azmoun","Ansarifard","Jahanbakhsh","Dejagah","Amiri","Shojaei","Ezatolahi","Hajsafi","Pouraliganji","Beiranvand"]} ],   // grupos 2
  [ {n:"México",fl:"🇲🇽",a:2018,art:["Chicharito","Lozano","C. Vela","R. Jiménez","Corona","H. Herrera","Guardado","M. Fabián","Layún","H. Moreno","Ochoa"]},
    {n:"Estados Unidos",fl:"🇺🇸",a:2022,art:["Pulisic","Weah","Sargent","Ferreira","Reyna","McKennie","Aaronson","Musah","Adams","Dest","Turner"]},
    {n:"Nigéria",fl:"🇳🇬",a:1998,art:["Yekini","Ikpeba","Babangida","Kanu","Okocha","Oliseh","Finidi","Lawal","Babayaro","West","Rufai"]},
    {n:"Costa Rica",fl:"🇨🇷",a:2014,art:["B. Ruiz","J. Campbell","Bolaños","Ureña","Saborío","Borges","Tejeda","Cubero","Gamboa","González","Navas"]},
    {n:"Equador",fl:"🇪🇨",a:2006,art:["Delgado","A. Valencia","Tenorio","Kaviedes","Méndez","Castillo","Lara","Ayoví","Hurtado","de la Cruz","Mora"]} ],   // grupos 3
  [ {n:"Suíça",fl:"🇨🇭",a:2018,art:["Shaqiri","Xhaka","Seferovic","Dzemaili","Embolo","Zuber","Drmić","Freuler","Rodríguez","Schär","Sommer"]},
    {n:"Dinamarca",fl:"🇩🇰",a:1998,art:["B. Laudrup","M. Laudrup","Sand","Møller","A. Nielsen","Tøfting","Helveg","Høgh","Rieper","Heintze","Schmeichel"]},
    {n:"Uruguai",fl:"🇺🇾",a:2010,art:["Forlán","Suárez","Cavani","Abreu","Pereira","Pérez","Arévalo Ríos","Eguren","Godín","Lugano","Muslera"]},
    {n:"Senegal",fl:"🇸🇳",a:2002,art:["Diouf","H. Camara","Fadiga","Bouba Diop","Diao","Cissé","S. Camara","Beye","Diatta","Coly","Sylva"]},
    {n:"Colômbia",fl:"🇨🇴",a:2014,art:["J. Rodríguez","Martínez","Cuadrado","Bacca","T. Gutiérrez","Quintero","C. Sánchez","Aguilar","Zúñiga","Yepes","Ospina"]} ],   // oitavas
  [ {n:"Holanda",fl:"🇳🇱",a:2014,art:["Robben","Van Persie","Sneijder","Depay","Huntelaar","Wijnaldum","Lens","De Guzmán","Blind","De Vrij","Cillessen"]},
    {n:"Portugal",fl:"🇵🇹",a:2022,art:["G. Ramos","João Félix","Bruno F.","C. Ronaldo","Leão","Bernardo Silva","João Mário","Rúben Neves","Cancelo","Pepe","Diogo Costa"]},
    {n:"Itália",fl:"🇮🇹",a:1994,art:["R. Baggio","Massaro","D. Baggio","Signori","Casiraghi","Donadoni","Albertini","Berti","Maldini","Baresi","Pagliuca"]},
    {n:"Inglaterra",fl:"🏴󠁧󠁢󠁥󠁮󠁧󠁿",a:1990,art:["Lineker","Platt","Beardsley","Waddle","Gascoigne","Barnes","Robson","Pearce","Walker","Butcher","Shilton"]} ],   // quartas
  [ {n:"Alemanha",fl:"🇩🇪",a:2010,art:["Müller","Klose","Podolski","Özil","Schweinsteiger","Khedira","Gómez","Cacau","Lahm","Mertesacker","Neuer"]},
    {n:"Espanha",fl:"🇪🇸",a:2022,art:["Morata","Asensio","F. Torres","Gavi","Olmo","Sarabia","Pedri","Busquets","J. Alba","Laporte","Unai Simón"]},
    {n:"França",fl:"🇫🇷",a:2006,art:["Henry","Zidane","Ribéry","Vieira","Trezeguet","Malouda","Govou","Wiltord","Sagnol","Thuram","Barthez"]},
    {n:"Croácia",fl:"🇭🇷",a:2022,art:["Modrić","Kramarić","Perišić","Oršić","Petković","Livaja","Brozović","Kovačić","Majer","Juranović","Livaković"]} ],   // semi
  [ {n:"Brasil",fl:"🇧🇷",a:1962,art:["Garrincha","Vavá","Amarildo","Pelé","Zagallo","Didi","Zito","Pepe","Djalma Santos","Nílton Santos","Gilmar"]},
    {n:"Argentina",fl:"🇦🇷",a:2014,art:["Messi","Higuaín","Di María","Agüero","Lavezzi","Palacio","Maxi Rodríguez","Mascherano","Zabaleta","Garay","Romero"]},
    {n:"Alemanha",fl:"🇩🇪",a:2002,art:["Klose","Ballack","Neuville","Bierhoff","Jancker","Schneider","Frings","Ziege","Linke","Metzelder","Kahn"]},
    {n:"França",fl:"🇫🇷",a:1986,art:["Platini","Papin","Giresse","Stopyra","Bellone","Rocheteau","Tigana","Fernández","Amoros","Battiston","Bats"]} ],   // final
];
function sortearAdversario(etapa){
  const pool = ADVERSARIOS[etapa];
  return pool[Math.floor(Math.random() * pool.length)];
}

// Gera a sequência de cobranças de uma disputa de pênaltis com regras de verdade:
// 5 cobranças alternadas (T, A, T, A…) com PARADA ANTECIPADA — encerra assim que
// um time não pode mais ser alcançado mesmo convertendo as restantes — e morte
// súbita em caso de empate. T e A são listas de booleans (true = convertido) na
// ordem das cobranças; st/sa são os totais. É só a roupagem — quem vence já foi
// decidido pela força (a sequência é espelhada para bater com o vencedor).
function sequenciaPenaltis(){
  const p = 0.74;                 // ~74% de conversão por cobrança
  const T = [], A = [];
  let st = 0, sa = 0, tRem = 5, aRem = 5;

  const baterT = () => { const m = Math.random() < p; T.push(m); if(m) st++; tRem--; };
  const baterA = () => { const m = Math.random() < p; A.push(m); if(m) sa++; aRem--; };
  // decidido: o time atrás não alcança nem convertendo todas as cobranças que faltam
  const decidido = () => st > sa + aRem || sa > st + tRem;

  // fase regulamentar: alterna T,A começando por T; para na hora que decide
  while((tRem > 0 || aRem > 0) && !decidido()){
    if(tRem >= aRem) baterT(); else baterA();
  }
  // morte súbita: uma cobrança de cada por rodada até alguém abrir vantagem
  while(st === sa){
    baterT();
    baterA();
  }
  return { T, A, st, sa };
}

// Simula um jogo. mataMata=true → não pode empatar (decide nos pênaltis).
function simularJogo(forcaTime, forcaAdv, ment, mataMata){
  const ratio  = Math.pow(forcaTime / forcaAdv, 3.2);
  const xgTime = Math.max(0.20, 2.0 * ratio * ment.atk);
  const xgAdv  = Math.max(0.12, 2.0 / ratio / ment.def);
  let gt = poisson(xgTime);
  let ga = poisson(xgAdv);

  let penaltis = null, penT = null, penA = null, penSeqT = null, penSeqA = null;
  if(mataMata && gt === ga){
    // desempate por pênaltis: probabilidade proporcional à razão de força
    const pTime = forcaTime / (forcaTime + forcaAdv);
    penaltis = (Math.random() < pTime) ? "time" : "adv";
    const seq = sequenciaPenaltis();             // sequência coerente com o vencedor
    const timeVenceSeq = seq.st > seq.sa;
    if(timeVenceSeq === (penaltis === "time")){  // sequência já casa com o vencedor
      penSeqT = seq.T; penSeqA = seq.A; penT = seq.st; penA = seq.sa;
    } else {                                      // espelha para o vencedor ficar à frente
      penSeqT = seq.A; penSeqA = seq.T; penT = seq.sa; penA = seq.st;
    }
  }
  const venceu =
    gt > ga || (penaltis === "time");
  return { gt, ga, penaltis, penT, penA, penSeqT, penSeqA, venceu };
}

// Roda a campanha inteira (7 jogos). Para no 1º tropeço de mata-mata.
function simularCopa(){
  const forca = calcularOverall();
  const ment  = MENTALIDADES[estado.mentalidade];
  const jogos = [];
  let venceuTudo = true;     // 7 vitórias? → Prancheta perfeito
  let eliminadoEm = null;    // só para oitavas/quartas
  let posicao = null;        // colocação final (1º a 4º) a partir da semifinal

  for(let i = 0; i < 7; i++){
    const mataMata = i >= 3;                 // jogos 4-7 são mata-mata
    const r = simularJogo(forca, BRACKET[i], ment, mataMata);
    jogos.push({ etapa: ETAPAS[i], advForca: BRACKET[i], adversario: sortearAdversario(i), ...r });
    if(!r.venceu) venceuTudo = false;

    if(mataMata && !r.venceu){               // derrota no mata-mata encerra a campanha
      if(i === 6){                           // perdeu a final → vice-campeão
        posicao = 2;
      } else if(i === 5){                    // perdeu a semi → disputa o 3º lugar
        const advSemi = jogos[jogos.length-1].adversario;
        let adv3 = sortearAdversario(5), g = 0;
        while(adv3.n === advSemi.n && g++ < 10) adv3 = sortearAdversario(5);
        const t = simularJogo(forca, BRACKET[5], ment, true);
        jogos.push({ etapa: "Disputa de 3º lugar", advForca: BRACKET[5], adversario: adv3, terceiro: true, ...t });
        posicao = t.venceu ? 3 : 4;
      } else {                               // oitavas/quartas → eliminado
        eliminadoEm = ETAPAS[i];
      }
      break;
    }
  }
  if(!eliminadoEm && posicao === null) posicao = 1;   // venceu a final → campeão
  const grupo = montarTabelaGrupo(jogos.slice(0, 3));  // classificação da fase de grupos
  return { forca, jogos, venceuTudo, eliminadoEm, posicao, grupo };
}

// Monta a classificação do grupo: você + os 3 adversários da 1ª fase.
// Seus 3 resultados já estão simulados; os 3 confrontos entre os adversários
// são simulados aqui (sem mata-mata) para fechar o returno completo do grupo.
function montarTabelaGrupo(jogosGrupo){
  const linha = (id, nome, fl) => ({ id, nome, fl, j:0, v:0, e:0, d:0, gp:0, gc:0, pts:0 });
  const tab = { EU: linha("EU", nomeDoTime(), "⭐") };
  jogosGrupo.forEach((j, i) => { tab[i] = linha(i, j.adversario.n, j.adversario.fl); });

  const registrar = (A, B, ga, gb) => {
    const a = tab[A], b = tab[B];
    a.j++; b.j++; a.gp += ga; a.gc += gb; b.gp += gb; b.gc += ga;
    if(ga > gb){ a.v++; b.d++; a.pts += 3; }
    else if(gb > ga){ b.v++; a.d++; b.pts += 3; }
    else { a.e++; b.e++; a.pts++; b.pts++; }
  };

  jogosGrupo.forEach((j, i) => registrar("EU", i, j.gt, j.ga));   // seus 3 jogos
  [[0,1],[0,2],[1,2]].forEach(([x,y]) => {                        // adversários entre si
    const r = simularJogo(jogosGrupo[x].advForca, jogosGrupo[y].advForca, MENTALIDADES["Equilibrada"], false);
    registrar(x, y, r.gt, r.ga);
  });

  return Object.values(tab).sort((p, q) =>
    q.pts - p.pts || (q.gp-q.gc) - (p.gp-p.gc) || q.gp - p.gp || p.nome.localeCompare(q.nome));
}


/* ============================================================================
   ⑤  INTERFACE
   ----------------------------------------------------------------------------
   Estado 100% em memória (sem localStorage). Render das 3 telas + reporter
   de altura para o site pai redimensionar o <iframe>.
   ============================================================================ */
const estado = {
  formacao:    "4-3-3",
  nomeTime:    "",           // nome do time (opcional) — vazio cai em "Seu time"
  mentalidade: "Equilibrada",
  modo:        "Classico",   // "Classico" = forças visíveis · "Almanaque" = ocultas
  slots:       [],
  rodada:      1,
  rerolls:     3,
  elenco:      null,
  escolhidos:  new Set(),   // nomes já escalados — não podem repetir entre elencos
  velocidade:  "Normal",    // ritmo do cronômetro: Lento · Normal · Rápido
};

const $ = id => document.getElementById(id);

// Escapa o que o jogador digitou antes de injetar via innerHTML
const escapar = s => s.replace(/[&<>"]/g, c =>
  ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;" }[c]));
// Nome a exibir para o nosso time (fallback quando o campo fica em branco)
const nomeDoTime = () => estado.nomeTime || "Seu time";

/* ----- Tema claro/escuro -----
   Persistido em localStorage na chave "gdc-theme" — a MESMA do Guia da Copa —
   então a escolha do tema sobrevive à navegação entre o guia e a prancheta.
   Fallback: preferência do sistema. O site pai ainda pode sincronizar via
   postMessage({prancheta_theme:'light'|'dark'}) caso rode embutido. */
function aplicarTema(t){
  document.documentElement.setAttribute("data-theme", t);
  try{ localStorage.setItem("gdc-theme", t); }catch(e){}
  reportarAltura();
}
let temaInicial;
try{ temaInicial = localStorage.getItem("gdc-theme"); }catch(e){}
if(temaInicial !== "light" && temaInicial !== "dark")
  temaInicial = (window.matchMedia && matchMedia("(prefers-color-scheme: light)").matches) ? "light" : "dark";
aplicarTema(temaInicial);
$("themeToggle").addEventListener("click", () => {
  const atual = document.documentElement.getAttribute("data-theme");
  aplicarTema(atual === "light" ? "dark" : "light");
});
window.addEventListener("message", e => {
  const t = e.data && e.data.prancheta_theme;
  if(t === "light" || t === "dark") aplicarTema(t);
});

/* ----- Setup: seletores de opção ----- */
function ligarOpcoes(idGrupo, chave){
  $(idGrupo).addEventListener("click", e => {
    const opt = e.target.closest(".opt");
    if(!opt) return;
    $(idGrupo).querySelectorAll(".opt").forEach(o => o.classList.remove("sel"));
    opt.classList.add("sel");
    estado[chave] = opt.dataset.v;
  });
}
ligarOpcoes("op-formacao", "formacao");
ligarOpcoes("op-mentalidade", "mentalidade");
ligarOpcoes("op-modo", "modo");

function mostrarTela(qual){
  $("tela-setup").classList.toggle("hidden", qual !== "setup");
  $("tela-draft").classList.toggle("hidden", qual !== "draft");
  $("tela-resultado").classList.toggle("hidden", qual !== "resultado");
}

/* ----- Início do jogo ----- */
$("btn-comecar").addEventListener("click", () => {
  estado.nomeTime   = $("nome-time").value.trim();
  estado.slots      = construirSlots(estado.formacao);
  estado.rodada     = 1;
  estado.rerolls    = 3;
  estado.escolhidos = new Set();
  mostrarTela("draft");
  novaRodada();
});

/* ----- Uma rodada do draft ----- */
function novaRodada(){
  estado.elenco = rolarComGarantia();
  $("aviso").classList.add("hidden");
  renderHUD();
  renderCampo();
  renderElenco();
}

/* Botão "Trocar elenco" (gasta 1 das 3 trocas) */
$("btn-trocar").addEventListener("click", () => {
  if(estado.rerolls <= 0) return;
  estado.rerolls--;
  estado.elenco = rolarComGarantia();
  renderHUD();
  renderElenco();
});

/* Escolha de um jogador do elenco sorteado */
function escolher(jogador){
  if(estado.escolhidos.has(jogador.n)) return;   // já escalado em outro elenco
  if(!encaixar(jogador)) return;
  estado.escolhidos.add(jogador.n);
  estado.rodada++;
  if(estado.rodada > 11){
    // Onze fechado → simula a Copa
    irParaResultado();
  } else {
    estado.rerolls = 3;        // trocas renovam a cada rodada
    novaRodada();
  }
}

/* ----- Renderização: HUD (rodada, overall, rerolls) ----- */
function renderHUD(){
  const oculto = estado.modo === "Almanaque";
  $("rodada-txt").textContent  = `Rodada ${Math.min(estado.rodada,11)} de 11`;
  $("rerolls-txt").textContent = `Trocas de elenco: ${estado.rerolls}`;
  $("btn-trocar").disabled = estado.rerolls <= 0;
  $("barra-prog").style.width = `${((estado.rodada-1)/11)*100}%`;

  const ov = calcularOverall();
  $("ov-num").textContent = oculto ? "?" : (ov ? Math.round(ov) : "--");

  const abertas = [...posicoesAbertas()].join(" · ");
  $("abertas-txt").textContent = abertas ? `Posições em aberto: ${abertas}` : "";
}

/* ----- Renderização: campo de giz com as peças ----- */
function renderCampo(){
  const campo = $("campo");
  campo.innerHTML = "";
  const slotsPos = pos => estado.slots.filter(s => s.pos === pos);

  // Linha de defesa: laterais nas pontas, zagueiros no meio
  const lats = slotsPos("LAT");
  const defesa = [lats[0], ...slotsPos("ZAG"), lats[1]].filter(Boolean);

  // Topo → base: ATA, MEI, DEFESA, GOL
  const linhas = [ slotsPos("ATA"), slotsPos("MEI"), defesa, slotsPos("GOL") ];

  linhas.forEach(linha => {
    const div = document.createElement("div");
    div.className = "linha";
    linha.forEach(s => div.appendChild(peca(s)));
    campo.appendChild(div);
  });
}

function peca(slot){
  const el = document.createElement("div");
  el.className = "peca" + (slot.player ? " cheia" : "") + (slot.pos === "GOL" ? " gol" : "");
  const conteudo = slot.player
    ? sobrenome(slot.player.n)
    : slot.pos;
  el.innerHTML =
    `<div class="bola">${slot.pos}</div>` +
    `<div class="nome">${slot.player ? `<b>${conteudo}</b>` : "&nbsp;"}</div>`;
  return el;
}
const sobrenome = nome => nome.split(" ").slice(-1)[0];

/* ----- Renderização: elenco sorteado ----- */
function renderElenco(){
  const el = estado.elenco;
  const oculto = estado.modo === "Almanaque";
  $("sorteio-time").innerHTML = `<b>${el.team}</b> ${el.year}`;

  const abertas = posicoesAbertas();
  const cont = $("jogadores");
  cont.innerHTML = "";

  // agrupa por posição (GOL → ZAG → LAT → MEI → ATA); dentro de cada posição,
  // os pescáveis vêm primeiro e a força só desempata
  const ORDEM_POS = { GOL:0, ZAG:1, LAT:2, MEI:3, ATA:4 };
  const ordenados = [...el.players].sort((a,b) => {
    if(ORDEM_POS[a.pos] !== ORDEM_POS[b.pos]) return ORDEM_POS[a.pos] - ORDEM_POS[b.pos];
    const da = disponivel(a, abertas), db = disponivel(b, abertas);
    if(da !== db) return da ? -1 : 1;
    return b.f - a.f;
  });

  ordenados.forEach(p => {
    const usado = estado.escolhidos.has(p.n);
    const ok = abertas.has(p.pos) && !usado;
    const status = usado ? "Já escalado" : (abertas.has(p.pos) ? "Livre" : "Preenchida");
    const btn = document.createElement("button");
    btn.className = "jog " + (ok ? "ok" : "bloq");
    btn.innerHTML =
      `<span class="pos">${p.pos}</span>` +
      `<span class="info2"><span class="jn">${p.n}</span>` +
      `<span class="js">${status}</span></span>` +
      (oculto ? "" : `<span class="forca">${p.f}</span>`);
    if(ok) btn.addEventListener("click", () => escolher(p));
    cont.appendChild(btn);
  });
}

/* ----- Resultado: simula e revela a campanha jogo a jogo (com suspense) ----- */
const sleep = ms => new Promise(res => setTimeout(res, ms));

// Multiplicador do ritmo do cronômetro (lido ao vivo, dá pra trocar no meio)
// Fator multiplica o ms/minuto: quanto maior, mais devagar o cronômetro corre.
// No "Normal", um jogo de grupo (90') leva ~10s.
const VELOCIDADES = { "Lento": 8.0, "Normal": 6.2, "Rápido": 3.6 };
const fatorVel = () => VELOCIDADES[estado.velocidade] || 6.2;

// Botões de velocidade (Lento / Normal / Rápido)
$("speedCtrl").addEventListener("click", e => {
  const btn = e.target.closest("button[data-v]");
  if(!btn) return;
  estado.velocidade = btn.dataset.v;
  $("speedCtrl").querySelectorAll("button").forEach(b => b.classList.toggle("on", b === btn));
});

function irParaResultado(){
  const r = simularCopa();
  mostrarTela("resultado");
  revelarCampanha(r);          // assíncrono: os jogos aparecem um a um
}

// Monta o card de um jogo com o cronômetro zerado (o placar corre ao vivo)
function montarJogoCard(j, oculto){
  const div = document.createElement("div");
  div.className = "jogo entrando";       // sem venc/perd até o apito final
  const adv = j.adversario;
  const temGols = (j.gt + j.ga) > 0;     // 0×0 não mostra súmula de gols
  div.innerHTML =
    `<div class="etapa">${j.etapa}</div>` +
    `<div class="lado">${escapar(nomeDoTime())}</div>` +
    `<div class="placar ao-vivo"><span class="cron">0'</span><span class="liveplacar">0 × 0</span></div>` +
    `<div class="lado dir"><span class="adv-fl">${adv.fl}</span> ${adv.n} <span class="adv-ano">${adv.a}</span></div>` +
    (temGols ? `<div class="gols"><div class="col-t"></div><div class="col-a"></div></div>` : "");
  return div;
}

// Sorteia o minuto de um gol (1' a 90')
function minutoGol(){ return Math.floor(Math.random() * 90) + 1; }

// Sorteia um artilheiro do nosso XI, com peso por posição (atacante marca mais)
function artilheiroTime(){
  const peso = { ATA:6, MEI:3, LAT:1, ZAG:0.7, GOL:0.1 };
  const cands = [];
  let total = 0;
  estado.slots.forEach(s => {
    if(!s.player) return;
    const w = peso[s.pos] || 1;
    cands.push({ nome: s.player.n, w });
    total += w;
  });
  let r = Math.random() * total;
  for(const c of cands){ if((r -= c.w) <= 0) return c.nome; }
  return cands[cands.length - 1].nome;
}

// Sorteia o autor de um gol do adversário (craques reais da seleção).
// art está ordenado por vocação ofensiva (atacantes → ... → goleiro), então
// enviesamos para o início da lista: atacantes marcam bem mais que zagueiros.
function artilheiroAdv(adv){
  const pool = (adv.art && adv.art.length) ? adv.art : [adv.n];
  return pool[Math.floor(pool.length * Math.random() ** 2)];
}

// Lista de cobradores do nosso XI, na ordem de vocação (ATA → MEI → LAT → ZAG → GOL).
// Repete a lista se houver mais cobranças que jogadores (morte súbita longa).
function cobradoresTime(n){
  const ordem = { ATA:0, MEI:1, LAT:2, ZAG:3, GOL:4 };
  const nomes = estado.slots.filter(s => s.player)
    .sort((a,b) => ordem[a.pos]-ordem[b.pos] || b.player.f-a.player.f)
    .map(s => s.player.n);
  return Array.from({length:n}, (_,i) => nomes[i % nomes.length]);
}
// Cobradores do adversário (craques reais da seleção, ciclando se preciso)
function cobradoresAdv(adv, n){
  const pool = (adv.art && adv.art.length) ? adv.art : [adv.n];
  return Array.from({length:n}, (_,i) => pool[i % pool.length]);
}
// Item de súmula de uma cobrança: ✅ marcou · ❌ perdeu
function penItem(nome, marcou){
  return marcou
    ? `<span class="gol-item pen-gol">✅ ${nome} <i>marcou</i></span>`
    : `<span class="gol-item pen-miss">❌ ${nome} <i>perdeu</i></span>`;
}

// Roda o relógio do jogo tipo Brasfoot: o minuto avança rápido, o placar muda
// ao vivo e a súmula de gols vai sendo preenchida quando cada gol "acontece"
async function animarJogo(div, j, mataMata){
  const placar  = div.querySelector(".placar");
  const cronEl  = placar.querySelector(".cron");
  const scoreEl = placar.querySelector(".liveplacar");
  const colT    = div.querySelector(".gols .col-t");
  const colA    = div.querySelector(".gols .col-a");

  // distribui os gols já simulados em minutos aleatórios, com autor
  const eventos = [];
  for(let k = 0; k < j.gt; k++) eventos.push({ min: minutoGol(), lado: "t", nome: artilheiroTime() });
  for(let k = 0; k < j.ga; k++) eventos.push({ min: minutoGol(), lado: "a", nome: artilheiroAdv(j.adversario) });
  eventos.sort((a, b) => a.min - b.min);

  let gt = 0, ga = 0, idx = 0;
  const base = mataMata ? 22 : 18;         // ms/minuto base (mata-mata corre um pouco mais devagar)
  for(let m = 1; m <= 90; m++){
    cronEl.textContent = m + "'";
    while(idx < eventos.length && eventos[idx].min === m){
      const ev = eventos[idx++];
      if(ev.lado === "t") gt++; else ga++;
      scoreEl.textContent = `${gt} × ${ga}`;
      scoreEl.classList.remove("gol"); void scoreEl.offsetWidth; scoreEl.classList.add("gol");
      const col = ev.lado === "t" ? colT : colA;
      col.insertAdjacentHTML("beforeend",
        `<span class="gol-item">⚽ ${ev.nome} <i>${m}'</i></span>`);
    }
    await sleep(base * fatorVel());        // fator lido a cada minuto → troca ao vivo
  }
  cronEl.textContent = "90'";

  // empate no mata-mata → decisão por pênaltis
  if(mataMata && j.penaltis){
    await sleep(300 * fatorVel());
    cronEl.classList.add("pen-cron");
    cronEl.textContent = "Pênaltis";
    await sleep(550 * fatorVel());

    // Separador do tempo normal + bloco dedicado da disputa
    div.insertAdjacentHTML("beforeend",
      `<hr class="pen-sep">` +
      `<div class="pen-lbl">Disputa de pênaltis</div>` +
      `<div class="pen-gols"><div class="col-t"></div><div class="col-a"></div></div>`);
    const penColT = div.querySelector(".pen-gols .col-t");
    const penColA = div.querySelector(".pen-gols .col-a");

    // Replay cobrança a cobrança, alternando os lados (marcou ✅ / perdeu ❌)
    const seqT = j.penSeqT || [], seqA = j.penSeqA || [];
    const cobT = cobradoresTime(seqT.length);
    const cobA = cobradoresAdv(j.adversario, seqA.length);
    let pt = 0, pa = 0;
    const rodadas = Math.max(seqT.length, seqA.length);
    for(let k = 0; k < rodadas; k++){
      if(k < seqT.length){
        if(seqT[k]) pt++;
        penColT.insertAdjacentHTML("beforeend", penItem(cobT[k], seqT[k]));
        cronEl.textContent = `pên ${pt}×${pa}`;
        await sleep(360 * fatorVel());
      }
      if(k < seqA.length){
        if(seqA[k]) pa++;
        penColA.insertAdjacentHTML("beforeend", penItem(cobA[k], seqA[k]));
        cronEl.textContent = `pên ${pt}×${pa}`;
        await sleep(360 * fatorVel());
      }
    }
    await sleep(500 * fatorVel());
  }
}

// Apito final: fixa o placar e pinta o card de vitória/empate/derrota
function revelarPlacar(div, j){
  div.classList.remove("entrando");
  const empate = (j.gt === j.ga) && !j.penaltis;   // só acontece na fase de grupos
  div.classList.add(j.venceu ? "venc" : (empate ? "emp" : "perd"));
  const pen = j.penaltis ? `<span class="pen"> (${j.penT}×${j.penA} pên.)</span>` : "";
  const placar = div.querySelector(".placar");
  placar.classList.remove("ao-vivo");
  placar.innerHTML = `${j.gt} <span style="opacity:.4">×</span> ${j.ga}${pen}`;
  placar.classList.add("revelado");
}

// Rola a tela pra acompanhar um elemento. Funciona na visão direta; dentro de
// <iframe> (sem barra própria) avisa o site pai a posição pra ele acompanhar.
function rolarPara(el, bloco){
  el.scrollIntoView({ behavior: "smooth", block: bloco || "center" });
  if(window.parent !== window){
    const y = el.getBoundingClientRect().top + window.scrollY;
    parent.postMessage({ prancheta_scroll: y }, "*");
  }
}

// Sequência: cada jogo entra, o relógio roda até 90', e então o apito final;
// o veredito só aparece quando a campanha encerra
async function revelarCampanha(r){
  const oculto = estado.modo === "Almanaque";
  const vEl = $("veredito"); vEl.className = "veredito"; vEl.innerHTML = "";
  const jc = $("jogos"); jc.innerHTML = "";
  const head = $("simHead");
  $("btn-reiniciar").classList.add("hidden");
  head.classList.remove("hidden");
  $("speedCtrl").classList.remove("hidden");

  for(let i = 0; i < r.jogos.length; i++){
    const j = r.jogos[i];
    const mataMata = i >= 3;
    head.innerHTML = `<span class="d"></span> ${j.etapa} — em andamento`;
    const div = montarJogoCard(j, oculto);
    jc.appendChild(div);
    rolarPara(div, "center");             // a tela acompanha o jogo que está entrando
    await animarJogo(div, j, mataMata);   // roda o cronômetro até o apito
    revelarPlacar(div, j);
    await sleep(450 * fatorVel());

    if(i === 2 && r.grupo){               // fim da fase de grupos → classificação
      head.innerHTML = "Fase de grupos encerrada · classificação";
      const tabEl = renderGrupo(r.grupo);
      jc.appendChild(tabEl);
      rolarPara(tabEl, "center");
      await sleep(1300 * fatorVel());
    }
  }

  head.classList.add("hidden");
  $("speedCtrl").classList.add("hidden");
  montarVeredito(r, oculto);
  rolarPara(vEl, "start");                // no fim, sobe pro veredito
  $("btn-reiniciar").classList.remove("hidden");

  if(r.posicao === 1){                    // campeão → comemoração
    await sleep(550);
    festejarCampeao(r.venceuTudo);
  }
}

/* ----- Tabela de classificação do grupo ----- */
function renderGrupo(linhas){
  const card = document.createElement("div");
  card.className = "card grupo-tab entrando";
  const corpo = linhas.map((t, i) => {
    const sg = t.gp - t.gc;
    const sgTxt = (sg > 0 ? "+" : "") + sg;
    const eu = t.id === "EU";
    return `<tr class="${eu ? "eu" : ""}">` +
      `<td class="pos">${i + 1}</td>` +
      `<td class="time"><span class="fl">${eu ? "⭐" : t.fl}</span>${escapar(t.nome)}</td>` +
      `<td>${t.j}</td><td>${t.v}</td><td>${t.e}</td><td>${t.d}</td>` +
      `<td>${sgTxt}</td><td class="pts">${t.pts}</td></tr>`;
  }).join("");
  card.innerHTML =
    `<div class="grupo-tit">Classificação do grupo</div>` +
    `<table class="classif"><thead><tr>` +
      `<th>#</th><th class="th-time">Time</th><th>J</th><th>V</th><th>E</th><th>D</th><th>SG</th><th>Pts</th>` +
    `</tr></thead><tbody>${corpo}</tbody></table>` +
    `<div class="grupo-nota">Você avança para o mata-mata.</div>`;
  return card;
}

/* ----- Popup festivo de CAMPEÃO ----- */
function festejarCampeao(invicto){
  $("festaTitulo").textContent = invicto ? "Campeão Invicto!" : "Campeão!";
  $("festaTime").textContent = nomeDoTime();

  // chuva de confete (respeita "reduzir movimento")
  const cont = $("festaConfete");
  cont.innerHTML = "";
  const reduz = window.matchMedia && matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cores = ["#f6c544","#5fd08a","#e8eef3","#ff4d4d","#4da3ff","#ff9f43"];
  for(let i = 0; i < (reduz ? 0 : 90); i++){
    const c = document.createElement("span");
    c.className = "confete";
    c.style.left = (Math.random()*100) + "%";
    c.style.background = cores[i % cores.length];
    c.style.animationDelay = (Math.random()*2.2) + "s";
    c.style.animationDuration = (2.6 + Math.random()*2.4) + "s";
    const sz = 6 + Math.random()*7;
    c.style.width = sz + "px";
    c.style.height = (sz*0.5) + "px";
    if(Math.random() < 0.3) c.style.borderRadius = "50%";
    cont.appendChild(c);
  }

  const festa = $("festa");
  festa.classList.remove("hidden");
  festa.setAttribute("aria-hidden", "false");
}
function fecharFesta(){
  const festa = $("festa");
  festa.classList.add("hidden");
  festa.setAttribute("aria-hidden", "true");
  $("festaConfete").innerHTML = "";       // para a animação e libera DOM
}
$("festaFechar").addEventListener("click", fecharFesta);
$("festa").addEventListener("click", e => { if(e.target === $("festa")) fecharFesta(); });

// Veredito final da campanha
function montarVeredito(r, oculto){
  let classe, titulo, sub;
  if(r.eliminadoEm){
    classe = "fora";
    titulo = "Eliminado";
    sub = `Sua campanha terminou nas ${r.eliminadoEm.toLowerCase()}.`;
  } else if(r.posicao === 1 && r.venceuTudo){
    classe = "perfeito";
    titulo = "Prancheta Perfeito";
    sub = "7 jogos, 7 vitórias, invicto. O onze dos sonhos levantou a taça.";
  } else if(r.posicao === 1){
    classe = "campeao";
    titulo = "Campeão do Mundo";
    sub = "Tropeçou na fase de grupos, mas passou por todo o mata-mata. É o título!";
  } else if(r.posicao === 2){
    classe = "vice";
    titulo = "Vice-campeão";
    sub = "Chegou à final e parou no último jogo. A taça passou perto.";
  } else if(r.posicao === 3){
    classe = "terceiro";
    titulo = "3º lugar";
    sub = "Perdeu na semi, mas reagiu e levou a disputa de terceiro. Tem medalha!";
  } else {
    classe = "quarto";
    titulo = "4º lugar";
    sub = "Caiu na semi e na disputa de terceiro. Ficou no pé do pódio.";
  }
  const vEl = $("veredito");
  vEl.className = "veredito show " + classe;
  vEl.innerHTML =
    `<div class="vt">${titulo}</div>` +
    `<div class="vs">${escapar(nomeDoTime())} · overall ${oculto ? "?" : Math.round(r.forca)} · ${estado.formacao} · ${estado.mentalidade}<br>${sub}</div>`;
}

/* ----- Jogar de novo ----- */
$("btn-reiniciar").addEventListener("click", () => { fecharFesta(); mostrarTela("setup"); });


/* ============================================================================
   REPORTER DE ALTURA  (o jogo roda em <iframe> no site pai)
   ============================================================================ */
function reportarAltura(){
  const h = document.documentElement.scrollHeight;
  if(window.parent !== window) parent.postMessage({ prancheta:h }, "*");
}
new ResizeObserver(reportarAltura).observe(document.body);
window.addEventListener("load", reportarAltura);

/* Tudo carregado e inicializado → revela a tela (esconde o loader) */
document.body.classList.add("ready");
