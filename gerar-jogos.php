<?php
/**
 * gerar-jogos.php — Gera jogos.json com os CANAIS de transmissão no Brasil.
 * -----------------------------------------------------------------------------
 * Feito para hospedagem PHP/cPanel, rodando via CRON. Usa só cURL + funções
 * nativas (nada de Composer/bibliotecas externas).
 *
 * ESCOPO (importante)
 *   Este script cuida APENAS dos canais — a única informação que nenhuma API
 *   pública entrega pronta para o Brasil. A tabela de jogos (data, horário,
 *   grupo, sede) vive no front-end (assets/transmissao.js) e o placar/estatística
 *   ao vivo vêm da API da ESPN, direto no navegador.
 *
 * FONTES (atualizadas com frequência)
 *   Raspa VÁRIAS páginas (ver SOURCES) e MESCLA o resultado: portais "onde
 *   assistir HOJE" (atualizados diariamente, jogos do dia) + uma lista do
 *   torneio inteiro (cobertura dos 72 jogos). Quanto mais fontes, mais
 *   resiliente — se uma cair ou mudar de layout, as outras seguram.
 *
 * COMO FUNCIONA — e por que é SEGURO
 *   A grade curada (defaultGames) é o PISO GARANTIDO. O scraping só pode
 *   ACRESCENTAR canais a um jogo, NUNCA remover abaixo do piso. Isso evita o
 *   bug clássico de raspagem em que um casamento ruim degradava o jogo (ex.:
 *   "Escócia x Brasil" virava "só Cazé TV"). Resultado de cada jogo:
 *
 *       canais = UNIÃO( grade curada , canais raspados )   + (Globo ⇒ Globoplay)
 *
 *   Assim, na pior hipótese (scraping falho), o JSON sai idêntico à grade
 *   curada. Na melhor, um jogo hoje só-Cazé é PROMOVIDO quando a Globo/SBT o
 *   pega. Custo: não detecta REMOÇÃO de canal (raríssimo) — risco aceitável
 *   perto de nunca degradar a grade.
 *
 * SAÍDA: jogos.json (NÃO versionado — gerado no servidor). Formato:
 *   { "updated_at", "source", "count", "canais": [ {home, away, channels}, ... ] }
 *
 * CRON (cPanel → "Cron Jobs"), DIÁRIO (ex.: todo dia às 06:00):
 *   0 6 * * *  /usr/bin/php /home/SEU_USUARIO/public_html/guiadacopa/gerar-jogos.php >> /home/SEU_USUARIO/cron.log 2>&1
 */

date_default_timezone_set('America/Sao_Paulo');

/* ----------------------------- CONFIG ----------------------------- */
// FONTES de canais, raspadas e MESCLADAS (união). Quanto mais fontes, mais
// resiliente: se uma sair do ar ou mudar de layout, as outras seguram.
// A extração é ANCORADA nos nomes dos jogos (ver extractFromText), então NÃO
// depende do layout específico de cada página — basta a página citar
// "Time x Time" seguido dos canais. Para adicionar uma fonte, inclua a URL aqui.
const SOURCES = [
    // O Tempo — página "onde assistir HOJE", atualizada diariamente.
    // Formato: "14h: Argentina x Áustria - Globo, Sportv, ge tv, Globoplay, Cazé TV, SBT e N Sports"
    'https://www.otempo.com.br/sports/copa-do-mundo/onde-assistir-jogos-hoje',
    // Doentes por Futebol — guia de jogos do dia, atualizado diariamente.
    // Formato: "Argentina x Áustria 📺 SBT; GLOBO; GE TV (Globoplay); SPORTV; CAZÉ TV; NSPORTS"
    'https://doentesporfutebol.com.br/guiadejogos/',
    // Canaltech — lista do torneio inteiro (cobre os jogos que não são "de hoje").
    // Formato: "Time x Time (Grupo X): 16h, Cidade. Transmissões: A, B e C."
    'https://canaltech.com.br/entretenimento/onde-assistir-aos-jogos-da-copa-do-mundo-2026/',
];

// jogos.json precisa ficar acessível pela web, ao lado do index.html.
$OUTPUT_FILE = __DIR__ . '/jogos.json';
$LOG_FILE    = __DIR__ . '/gerar-jogos.log';

/* ----------------------------- LOG ----------------------------- */
function logLine(string $msg): void {
    global $LOG_FILE;
    $line = '[' . date('Y-m-d H:i:s') . "] $msg\n";
    file_put_contents($LOG_FILE, $line, FILE_APPEND);
    echo $line;
}

/* ----------------------------- HTTP (cURL) ----------------------------- */
function httpGet(string $url): ?string {
    $ch = curl_init($url);
    curl_setopt_array($ch, [
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_FOLLOWLOCATION => true,
        CURLOPT_TIMEOUT        => 25,
        CURLOPT_ENCODING       => '',                 // aceita gzip
        CURLOPT_SSL_VERIFYPEER => true,
        CURLOPT_USERAGENT      => 'Mozilla/5.0 (compatible; CopaBot/1.0)',
        CURLOPT_HTTPHEADER     => ['Accept-Language: pt-BR,pt;q=0.9'],
    ]);
    $body = curl_exec($ch);
    $code = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    $err  = curl_error($ch);
    curl_close($ch);
    if ($body === false || $code >= 400) {
        logLine("HTTP falhou ($url): código $code $err");
        return null;
    }
    return $body;
}

/* --------------------- NORMALIZAÇÃO --------------------- */
function norm(string $s): string {
    $s = mb_strtolower(trim($s), 'UTF-8');
    $map = ['á'=>'a','à'=>'a','ã'=>'a','â'=>'a','é'=>'e','ê'=>'e','í'=>'i',
            'ó'=>'o','ô'=>'o','õ'=>'o','ú'=>'u','ç'=>'c'];
    $s = strtr($s, $map);
    return preg_replace('/\s+/', ' ', $s);
}

// chave única e independente de ordem para uma dupla de seleções
function pairKey(string $a, string $b): string {
    $p = [norm($a), norm($b)];
    sort($p);
    return implode('|', $p);
}

// Detecta TODOS os canais citados num trecho de texto, por assinatura (regex
// com fronteira de palavra). Robusto a separadores e a combos como
// "GE TV (Globoplay)". A ordem importa para o \b: 'globoplay' antes de 'globo',
// e '\bglobo\b' NÃO casa dentro de "globoplay".
function channelsInText(string $text): array {
    $n = norm($text);
    $sigs = [
        'Cazé TV'   => '/\bcaze(\s*tv)?\b/u',
        'Globoplay' => '/\bglobo\s*play\b/u',
        'Globo'     => '/\bglobo\b/u',
        'SBT'       => '/\bsbt\b/u',
        'SporTV'    => '/\bsportv\b/u',
        'ge tv'     => '/\bge\s*tv\b/u',
        'N Sports'  => '/\bn\s*sports\b/u',
    ];
    $out = [];
    foreach ($sigs as $canon => $re) {
        if (preg_match($re, $n)) $out[] = $canon;
    }
    return $out;
}

/* ----------------- TABELA DE JOGOS + CANAL PADRÃO -----------------
 * Espelha a grade do front-end (assets/transmissao.js). É o PISO GARANTIDO:
 * o scraping só acrescenta sobre isto, nunca remove. Mantenha as duas em sincronia. */
function defaultGames(): array {
    return [
        ['México', 'África do Sul', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Coreia do Sul', 'República Tcheca', ['Cazé TV']],
        ['Canadá', 'Bósnia e Herzegovina', ['Cazé TV']],
        ['Estados Unidos', 'Paraguai', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Catar', 'Suíça', ['Cazé TV']],
        ['Brasil', 'Marrocos', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Haiti', 'Escócia', ['Cazé TV']],
        ['Austrália', 'Turquia', ['Globo', 'SporTV', 'Globoplay', 'ge tv', 'Cazé TV']],
        ['Alemanha', 'Curaçao', ['Globo', 'SporTV', 'Globoplay', 'ge tv', 'Cazé TV']],
        ['Holanda', 'Japão', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Costa do Marfim', 'Equador', ['Globo', 'SporTV', 'Globoplay', 'Cazé TV']],
        ['Suécia', 'Tunísia', ['Globo', 'SporTV', 'Globoplay', 'Cazé TV']],
        ['Espanha', 'Cabo Verde', ['Cazé TV']],
        ['Bélgica', 'Egito', ['Globo', 'SporTV', 'Globoplay', 'ge tv', 'Cazé TV']],
        ['Arábia Saudita', 'Uruguai', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'N Sports', 'Cazé TV']],
        ['Irã', 'Nova Zelândia', ['Cazé TV']],
        ['França', 'Senegal', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Iraque', 'Noruega', ['Cazé TV']],
        ['Argentina', 'Argélia', ['Cazé TV']],
        ['Áustria', 'Jordânia', ['Globo', 'SporTV', 'Globoplay', 'Cazé TV']],
        ['Portugal', 'Rep. Dem. do Congo', ['Cazé TV']],
        ['Inglaterra', 'Croácia', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Gana', 'Panamá', ['Cazé TV']],
        ['Uzbequistão', 'Colômbia', ['Globo', 'SporTV', 'Globoplay', 'Cazé TV']],
        ['República Tcheca', 'África do Sul', ['Cazé TV']],
        ['Suíça', 'Bósnia e Herzegovina', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Canadá', 'Catar', ['Cazé TV']],
        ['México', 'Coreia do Sul', ['Globo', 'SporTV', 'Globoplay', 'Cazé TV']],
        ['Estados Unidos', 'Austrália', ['Cazé TV']],
        ['Escócia', 'Marrocos', ['Cazé TV']],
        ['Brasil', 'Haiti', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Turquia', 'Paraguai', ['Globo', 'SporTV', 'Globoplay', 'Cazé TV']],
        ['Holanda', 'Suécia', ['Cazé TV']],
        ['Alemanha', 'Costa do Marfim', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Equador', 'Curaçao', ['Cazé TV']],
        ['Tunísia', 'Japão', ['Globo', 'SporTV', 'Globoplay', 'Cazé TV']],
        ['Espanha', 'Arábia Saudita', ['Cazé TV']],
        ['Bélgica', 'Irã', ['Cazé TV']],
        ['Uruguai', 'Cabo Verde', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Nova Zelândia', 'Egito', ['Globo', 'SporTV', 'Globoplay', 'Cazé TV']],
        ['Noruega', 'Senegal', ['Globo', 'SporTV', 'Globoplay', 'Cazé TV']],
        ['Argentina', 'Áustria', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['França', 'Iraque', ['Cazé TV']],
        ['Jordânia', 'Argélia', ['Globo', 'SporTV', 'Globoplay', 'Cazé TV']],
        ['Portugal', 'Uzbequistão', ['Cazé TV']],
        ['Inglaterra', 'Gana', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Panamá', 'Croácia', ['Cazé TV']],
        ['Colômbia', 'Rep. Dem. do Congo', ['Globo', 'SporTV', 'Globoplay', 'Cazé TV']],
        ['Suíça', 'Canadá', ['Cazé TV']],
        ['Bósnia e Herzegovina', 'Catar', ['Cazé TV']],
        ['Escócia', 'Brasil', ['Globo', 'SBT', 'SporTV', 'Globoplay', 'ge tv', 'N Sports', 'Cazé TV']],
        ['Marrocos', 'Haiti', ['Cazé TV']],
        ['República Tcheca', 'México', ['Cazé TV']],
        ['África do Sul', 'Coreia do Sul', ['Cazé TV']],
        ['Turquia', 'Estados Unidos', ['Cazé TV']],
        ['Curaçao', 'Costa do Marfim', ['Cazé TV']],
        ['Equador', 'Alemanha', ['Cazé TV']],
        ['Japão', 'Suécia', ['Cazé TV']],
        ['Tunísia', 'Holanda', ['Cazé TV']],
        ['Paraguai', 'Austrália', ['Cazé TV']],
        ['Noruega', 'França', ['Cazé TV']],
        ['Senegal', 'Iraque', ['Cazé TV']],
        ['Cabo Verde', 'Arábia Saudita', ['Cazé TV']],
        ['Uruguai', 'Espanha', ['Cazé TV']],
        ['Egito', 'Irã', ['Cazé TV']],
        ['Nova Zelândia', 'Bélgica', ['Cazé TV']],
        ['Panamá', 'Inglaterra', ['Cazé TV']],
        ['Croácia', 'Gana', ['Cazé TV']],
        ['Colômbia', 'Portugal', ['Cazé TV']],
        ['Rep. Dem. do Congo', 'Uzbequistão', ['Cazé TV']],
        ['Argélia', 'Áustria', ['Cazé TV']],
        ['Jordânia', 'Argentina', ['Cazé TV']],
    ];
}

/* ----------------- EXTRAÇÃO ANCORADA NOS JOGOS -----------------
 * Em vez de confiar no layout de cada fonte, ANCORAMOS nos nomes conhecidos:
 * para cada jogo da grade, procuramos "casa x visitante" (em qualquer ordem)
 * no texto e lemos os canais numa JANELA logo após o confronto, cortando na
 * próxima ocorrência de " x " (= próximo jogo) para não vazar canais alheios.
 * Funciona igual em qualquer página que cite "Time x Time" seguido dos canais. */
function extractFromText(string $text, array $games): array {
    $ntext = norm($text);
    $found = [];
    foreach ($games as [$home, $away, $piso]) {
        $h = norm($home); $a = norm($away);
        $pos = false; $needleLen = 0;
        foreach (["$h x $a", "$a x $h"] as $cand) {
            $p = mb_strpos($ntext, $cand);
            if ($p !== false) { $pos = $p; $needleLen = mb_strlen($cand); break; }
        }
        if ($pos === false) continue;

        $window = mb_substr($ntext, $pos + $needleLen, 300);
        $cut = mb_strpos($window, ' x ');           // próximo confronto -> para aqui
        if ($cut !== false) $window = mb_substr($window, 0, $cut);

        $channels = channelsInText($window);
        if ($channels) $found[pairKey($home, $away)] = $channels;
    }
    return $found;
}

/* ----------------- SCRAPING MULTI-FONTE (MESCLA) ----------------- */
function scrapeChannels(array $games): array {
    $merged = [];
    foreach (SOURCES as $url) {
        $html = httpGet($url);
        if ($html === null) { logLine("AVISO: fonte indisponível, pulando: $url"); continue; }

        // HTML -> texto corrido (resiliente a mudanças de marcação)
        $text = preg_replace('/\s+/', ' ', strip_tags($html));
        $found = extractFromText($text, $games);

        $host = parse_url($url, PHP_URL_HOST) ?: $url;
        logLine("Fonte $host: canais encontrados para " . count($found) . ' jogos.');

        // mescla (união) entre fontes
        foreach ($found as $key => $chs) {
            foreach ($chs as $c) {
                if (!isset($merged[$key])) $merged[$key] = [];
                if (!in_array($c, $merged[$key], true)) $merged[$key][] = $c;
            }
        }
    }
    logLine('Mesclado de ' . count(SOURCES) . ' fontes: dados para ' . count($merged) . ' jogos.');
    return $merged;
}

/* ----------------- MONTA O RESULTADO (UNIÃO SEGURA) ----------------- */
function build(): array {
    $games   = defaultGames();
    $scraped = scrapeChannels($games);
    $result  = [];
    $promovidos = 0;
    foreach ($games as [$home, $away, $piso]) {
        $key = pairKey($home, $away);

        // União: começa pelo piso curado e só ACRESCENTA o que o scraping trouxer.
        $channels = $piso;
        if (isset($scraped[$key])) {
            foreach ($scraped[$key] as $c) {
                if (!in_array($c, $channels, true)) $channels[] = $c;
            }
        }
        // Invariante da grade: Globoplay sempre acompanha a Globo.
        if (in_array('Globo', $channels, true) && !in_array('Globoplay', $channels, true)) {
            $channels[] = 'Globoplay';
        }
        if (count($channels) > count($piso)) $promovidos++;

        $result[] = [
            'home'     => $home,
            'away'     => $away,
            'channels' => array_values($channels),
        ];
    }
    logLine('Montado: ' . count($result) . " jogos ($promovidos promovidos pelo scraping; o resto = grade curada).");
    return $result;
}

/* ----------------- GRAVA O JSON (atômico) ----------------- */
function main(): void {
    global $OUTPUT_FILE;
    $canais = build();
    if (!$canais) { logLine('ERRO: nada para gravar. JSON antigo preservado.'); exit(1); }

    $payload = [
        'updated_at' => date('c'),
        'source'     => ['channels' => SOURCES],
        'count'      => count($canais),
        'canais'     => $canais,
    ];
    $json = json_encode($payload, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);

    $tmp = $OUTPUT_FILE . '.tmp';
    if (file_put_contents($tmp, $json) === false || !rename($tmp, $OUTPUT_FILE)) {
        logLine('ERRO ao gravar o arquivo. Verifique permissões da pasta.');
        exit(1);
    }
    logLine('OK: jogos.json atualizado (' . count($canais) . ' jogos).');
}

main();
