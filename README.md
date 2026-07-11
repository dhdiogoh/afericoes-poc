# Central de Aferições — POC

Protótipo interativo (frontend puro, dados fictícios) do módulo de digitalização de aferições de bombas de combustível.

## Rodar localmente

```bash
npm install
npm run dev
```

## Deploy na Vercel

**Opção 1 — Mais rápida (sem Git):**
1. Entre em [vercel.com/new](https://vercel.com/new)
2. Arraste a pasta deste projeto (sem a `node_modules`) pra área de upload
3. A Vercel detecta Vite automaticamente — clique em Deploy

**Opção 2 — Via GitHub (recomendada, permite atualizar depois):**
```bash
git init
git add .
git commit -m "poc afericoes"
git remote add origin SEU_REPO_AQUI
git push -u origin main
```
Depois importe o repositório em [vercel.com/new](https://vercel.com/new). A Vercel já reconhece Vite (build command `vite build`, output `dist`) — não precisa configurar nada.

**Opção 3 — Vercel CLI:**
```bash
npm i -g vercel
vercel
```
Segue os prompts (aceita as opções padrão que ele detecta pra Vite).

## Stack
- Vite + React
- Tailwind CSS
- lucide-react (ícones)

Build de produção já testado localmente (`npm run build`) e passou sem erros.
