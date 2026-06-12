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
 *   grupo, sede) vive embutida no front-end (assets/main.js) e o placar/estatísticas
 *   ao vivo vêm da API da ESPN, direto no navegador.
 *
 * COMO FUNCIONA
 *   1) Para cada um dos 72 jogos (lista GAMES abaixo, com o canal PADRÃO de cada),
 *      tenta sobrescrever com os canais raspados de uma página de "onde assistir".
 *   2) Se o scraping falhar para um jogo, mantém o canal padrão da lista.
 *   3) Grava jogos.json de forma atômica (arquivo temporário + rename).
 *
 * SAÍDA: { "updated_at", "source", "count", "canais": [ {home, away, channels}, ... ] }
 *
 * CRON (cPanel → "Cron Jobs"), ex. a cada 6 horas:
 *   0 *\/6 * * *  /usr/bin/php /home/SEU_USUARIO/public_html/guiadacopa/gerar-jogos.php >> /home/SEU_USUARIO/cron.log 2>&1
 */

date_default_timezone_set('America/Sao_Paulo');

/* ----------------------------- CONFIG ----------------------------- */
// Página de onde os CANAIS são raspados. Padrão do Canaltech:
// "Time x Time (Grupo X): 16h, Cidade. Transmissões: A, B e C."
// Se a página mudar, troque a URL e/ou ajuste o REGEX em scrapeChannels().
const CHANNELS_URL = 'https://canaltech.com.br/entretenimento/onde-assistir-aos-jogos-da-copa-do-mundo-2026/';

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

// normaliza nomes de canal raspados para uma forma canônica
function canonChannel(string $raw): ?string {
    $n = norm($raw);
    $map = [
        'caze tv'=>'Cazé TV','cazetv'=>'Cazé TV','caze'=>'Cazé TV',
        'globoplay'=>'Globoplay',
        'globo'=>'Globo','tv globo'=>'Globo',
        'sbt'=>'SBT',
        'sportv'=>'SporTV',
        'ge tv'=>'ge tv','getv'=>'ge tv',
        'n sports'=>'N Sports','nsports'=>'N Sports',
    ];
    foreach ($map as $needle => $canon) {
        if (strpos($n, $needle) !== false) return $canon;
    }
    return null; // ignora ruído
}

/* ----------------- TABELA DE JOGOS + CANAL PADRÃO -----------------
 * Espelha a grade do front-end (assets/transmissao.js). É o fallback usado
 * quando o scraping não encontra o jogo. Mantenha as duas em sincronia. */
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

/* ----------------- SCRAPING DOS CANAIS ----------------- */
function scrapeChannels(): array {
    $html = httpGet(CHANNELS_URL);
    if ($html === null) { logLine('AVISO: scraping falhou; usando os canais padrão.'); return []; }

    // HTML -> texto corrido (resiliente a mudanças de marcação)
    $text = preg_replace('/\s+/', ' ', strip_tags($html));

    // "Time x Time (Grupo X): ... Transmiss(ão|ões): canal, canal e canal."
    $re = '/([\p{L}\.\s]+?)\s+x\s+([\p{L}\.\s]+?)\s*\(Grupo\s+([A-L])\)[^:]*:[^.]*?\.?\s*'
        . 'Transmiss[ãõ]o?e?s?:\s*([^.\n•·]+)/u';

    $found = [];
    if (preg_match_all($re, $text, $matches, PREG_SET_ORDER)) {
        foreach ($matches as $g) {
            $home = trim($g[1]); $away = trim($g[2]);
            $channels = [];
            foreach (preg_split('/,|\be\b|\/|·|•/u', $g[4]) as $c) {
                $canon = canonChannel($c);
                if ($canon && !in_array($canon, $channels, true)) $channels[] = $canon;
            }
            if ($channels) $found[pairKey($home, $away)] = $channels;
        }
    }
    logLine('Scraping: canais encontrados para ' . count($found) . ' jogos.');
    return $found;
}

/* ----------------- MONTA O RESULTADO ----------------- */
function build(): array {
    $scraped = scrapeChannels();
    $result = [];
    $usados_scrape = 0;
    foreach (defaultGames() as [$home, $away, $padrao]) {
        $key = pairKey($home, $away);
        if (isset($scraped[$key])) { $channels = $scraped[$key]; $usados_scrape++; }
        else                       { $channels = $padrao; }
        $result[] = [
            'home'     => $home,
            'away'     => $away,
            'channels' => array_values($channels),
        ];
    }
    logLine('Montado: ' . count($result) . " jogos ($usados_scrape do scraping, o resto do padrão).");
    return $result;
}

/* ----------------- GRAVA O JSON (atômico) ----------------- */
function main(): void {
    global $OUTPUT_FILE;
    $canais = build();
    if (!$canais) { logLine('ERRO: nada para gravar. JSON antigo preservado.'); exit(1); }

    $payload = [
        'updated_at' => date('c'),
        'source'     => ['channels' => CHANNELS_URL],
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
