# Guia da Copa 2026

Site com os jogos da Copa do Mundo 2026, em ordem cronológica, com o horário de Brasília e os canais de transmissão no Brasil.

No ar em [devbatista.online/guiadacopa](https://devbatista.online/guiadacopa/).

## Páginas

- **Jogos e transmissão:** a tabela com data, horário, grupo, sede e onde assistir
- **Classificação:** a tabela dos grupos
- **Mata-mata:** o chaveamento
- **Prancheta:** uma prancheta tática

## Como funciona

- O site é estático: HTML, CSS e JavaScript puro.
- A tabela de jogos fica no front-end (`assets/transmissao.js`). O placar e as estatísticas ao vivo vêm da API da ESPN, direto no navegador.
- Os canais de transmissão vêm do `gerar-jogos.php`, que roda por cron na hospedagem, lê várias fontes, junta o resultado e gera o `jogos.json`.
- O deploy é automático por FTP a cada push na `main` (GitHub Actions).
