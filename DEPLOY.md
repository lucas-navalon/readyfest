# Deploy Hibrido

Este projeto agora esta preparado para 3 caminhos praticos:

- frontend na Vercel + backend e banco em Docker
- frontend no Cloudflare Pages + backend e banco em Docker
- API publicada com HTTPS via Caddy dentro do Docker

## Estrutura recomendada

- frontend: `https://app.seudominio.com`
- api: `https://api.seudominio.com`

O frontend usa a variavel `VITE_API_BASE_URL` para apontar para a API publicada.

## 1. Backend e banco com Docker + Caddy

Arquivos usados:

- `docker-compose.server.yml`
- `.env.server.example`
- `infra/Caddyfile`

Passos:

1. Copie o arquivo de ambiente:

```bash
cp .env.server.example .env.server
```

2. Edite `.env.server` e troque:

- `POSTGRES_PASSWORD`
- `API_DOMAIN`

3. Suba a stack:

```bash
docker compose --env-file .env.server -f docker-compose.server.yml up -d --build
```

Com isso:

- PostgreSQL fica interno ao Docker
- backend fica interno ao Docker
- Caddy publica a API em `https://API_DOMAIN`

Importante:

- o DNS de `api.seudominio.com` precisa apontar para o IP da VPS
- as portas `80` e `443` precisam estar liberadas no servidor

## 2. Frontend na Vercel

Arquivo usado:

- `frontend/vercel.json`

Configuracao do projeto:

- Root Directory: `frontend`
- Build Command: `npm run build`
- Output Directory: `dist`

Variavel de ambiente na Vercel:

- `VITE_API_BASE_URL=https://api.seudominio.com`

Deploy pela CLI:

```bash
vercel --cwd frontend
```

Ou pelo painel da Vercel, conectando o repositorio e definindo `frontend` como root directory.

## 3. Frontend no Cloudflare Pages

Arquivo usado:

- `frontend/wrangler.toml`

Configuracao do projeto:

- Root Directory: `frontend`
- Build Command: `npm run build`
- Build Output Directory: `dist`

Variavel de ambiente:

- `VITE_API_BASE_URL=https://api.seudominio.com`

Deploy com Wrangler:

```bash
cd frontend
npx wrangler pages deploy dist
```

Se preferir Git integration no painel, mantenha a mesma configuracao de build acima.

## Fontes oficiais

- Vercel CLI deploy: https://vercel.com/docs/cli/deploy
- Cloudflare Pages configuration: https://developers.cloudflare.com/pages/functions/wrangler-configuration/
- Caddy reverse_proxy: https://caddyserver.com/docs/caddyfile/directives/reverse_proxy
- Caddy automatic HTTPS: https://caddyserver.com/docs/automatic-https
