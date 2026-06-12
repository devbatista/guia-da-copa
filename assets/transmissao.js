/* ============================================================
   GRADE DE TRANSMISSÃO — edite este arquivo para mudar os canais.
   'presets' = conjuntos reutilizáveis de canais.
   'jogos'   = "Casa x Visitante"  ->  nome de um preset  OU  lista própria,
               ex.:  "Brasil x Marrocos": ["Globo","Cazé TV"]
   Canais válidos: Globo, SBT, SporTV, Globoplay, ge tv, N Sports, Cazé TV
   ============================================================ */
const TRANSMISSAO = {
  "_sobre": "Grade de transmissao no Brasil. 'presets' = conjuntos de canais reutilizaveis. 'jogos' mapeia 'CasaXVisitante' para o nome de um preset OU uma lista propria de canais, ex: [\"Globo\",\"Caze TV\"]. Canais validos: Globo, SBT, SporTV, Globoplay, ge tv, N Sports, Caze TV. Edite este arquivo para mudar a transmissao sem mexer no codigo.",
  "presets": {
    "FULL": [
      "Globo",
      "SBT",
      "SporTV",
      "Globoplay",
      "ge tv",
      "N Sports",
      "Cazé TV"
    ],
    "FULL2": [
      "Globo",
      "SBT",
      "SporTV",
      "Globoplay",
      "N Sports",
      "Cazé TV"
    ],
    "GLOBO": [
      "Globo",
      "SporTV",
      "Globoplay",
      "ge tv",
      "Cazé TV"
    ],
    "GLOBOX": [
      "Globo",
      "SporTV",
      "Globoplay",
      "Cazé TV"
    ],
    "CAZE": [
      "Cazé TV"
    ]
  },
  "jogos": {
    "México x África do Sul": "FULL",
    "Coreia do Sul x República Tcheca": "CAZE",
    "Canadá x Bósnia e Herzegovina": "CAZE",
    "Estados Unidos x Paraguai": "FULL",
    "Catar x Suíça": "CAZE",
    "Brasil x Marrocos": "FULL",
    "Haiti x Escócia": "CAZE",
    "Austrália x Turquia": "GLOBO",
    "Alemanha x Curaçao": "GLOBO",
    "Holanda x Japão": "FULL",
    "Costa do Marfim x Equador": "GLOBOX",
    "Suécia x Tunísia": "GLOBOX",
    "Espanha x Cabo Verde": "CAZE",
    "Bélgica x Egito": "GLOBO",
    "Arábia Saudita x Uruguai": "FULL2",
    "Irã x Nova Zelândia": "CAZE",
    "França x Senegal": "FULL",
    "Iraque x Noruega": "CAZE",
    "Argentina x Argélia": "CAZE",
    "Áustria x Jordânia": "GLOBOX",
    "Portugal x Rep. Dem. do Congo": "CAZE",
    "Inglaterra x Croácia": "FULL",
    "Gana x Panamá": "CAZE",
    "Uzbequistão x Colômbia": "GLOBOX",
    "República Tcheca x África do Sul": "CAZE",
    "Suíça x Bósnia e Herzegovina": "FULL",
    "Canadá x Catar": "CAZE",
    "México x Coreia do Sul": "GLOBOX",
    "Estados Unidos x Austrália": "CAZE",
    "Escócia x Marrocos": "CAZE",
    "Brasil x Haiti": "FULL",
    "Turquia x Paraguai": "GLOBOX",
    "Holanda x Suécia": "CAZE",
    "Alemanha x Costa do Marfim": "FULL",
    "Equador x Curaçao": "CAZE",
    "Tunísia x Japão": "GLOBOX",
    "Espanha x Arábia Saudita": "CAZE",
    "Bélgica x Irã": "CAZE",
    "Uruguai x Cabo Verde": "FULL",
    "Nova Zelândia x Egito": "GLOBOX",
    "Noruega x Senegal": "GLOBOX",
    "Argentina x Áustria": "FULL",
    "França x Iraque": "CAZE",
    "Jordânia x Argélia": "GLOBOX",
    "Portugal x Uzbequistão": "CAZE",
    "Inglaterra x Gana": "FULL",
    "Panamá x Croácia": "CAZE",
    "Colômbia x Rep. Dem. do Congo": "GLOBOX",
    "Suíça x Canadá": "CAZE",
    "Bósnia e Herzegovina x Catar": "CAZE",
    "Escócia x Brasil": "FULL",
    "Marrocos x Haiti": "CAZE",
    "República Tcheca x México": "CAZE",
    "África do Sul x Coreia do Sul": "CAZE",
    "Turquia x Estados Unidos": "CAZE",
    "Curaçao x Costa do Marfim": "CAZE",
    "Equador x Alemanha": "CAZE",
    "Japão x Suécia": "CAZE",
    "Tunísia x Holanda": "CAZE",
    "Paraguai x Austrália": "CAZE",
    "Noruega x França": "CAZE",
    "Senegal x Iraque": "CAZE",
    "Cabo Verde x Arábia Saudita": "CAZE",
    "Uruguai x Espanha": "CAZE",
    "Egito x Irã": "CAZE",
    "Nova Zelândia x Bélgica": "CAZE",
    "Panamá x Inglaterra": "CAZE",
    "Croácia x Gana": "CAZE",
    "Colômbia x Portugal": "CAZE",
    "Rep. Dem. do Congo x Uzbequistão": "CAZE",
    "Argélia x Áustria": "CAZE",
    "Jordânia x Argentina": "CAZE"
  }
};
