# Utopia

![CI](https://github.com/guipm2/utopia-site/actions/workflows/ci.yml/badge.svg)

Uma landing page moderna e animada construída com Next.js 14, Tailwind CSS e um conjunto robusto de componentes de UI e 3D. O projeto demonstra seções interativas, transições suaves e fundos em 3D usando React Three Fiber.

## Stack de Tecnologias

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + tailwindcss-animate
- Radix UI (primitives)
- Componentes de UI personalizados (em `components/ui`)
- Framer Motion (animações)
- React Three Fiber + Drei + Three.js (cenas 3D)
- next-themes (tema/escuro)
- React Hook Form + Zod (forms e validação)
- Recharts, Embla Carousel, Sonner e outros

## Estrutura do Projeto

- `app/` — Páginas com App Router, import de estilos globais e layout
- `components/ui/` — Componentes reutilizáveis (botões, diálogos, formulários etc.)
- `components/three/` — Cenas e utilitários 3D (React Three Fiber + Drei)
- `components/` — Provider de tema e componentes compartilhados
- `hooks/` — Hooks customizados
- `lib/` — Utilitários
- `public/` — Assets estáticos
- `styles/` — CSS global do Tailwind

## Requisitos

- Node.js 18.18+ (ou 20+ recomendado)
- pnpm (o projeto usa `pnpm-lock.yaml`)

## Como começar

1) Instalar dependências

```bash
pnpm install
```

2) Rodar o servidor de desenvolvimento

```bash
pnpm dev
```

Depois, acesse http://localhost:3000 no navegador.

3) Gerar build de produção

```bash
pnpm build
```

4) Iniciar o servidor em produção

```bash
pnpm start
```

## Scripts disponíveis

- `pnpm dev` — Inicia o servidor de desenvolvimento do Next.js
- `pnpm build` — Gera o bundle de produção
- `pnpm start` — Inicia o Next.js em modo de produção
- `pnpm lint` — Executa o lint do Next.js

## Variáveis de ambiente

Não há variáveis obrigatórias por padrão. Caso adicione alguma configuração no cliente, use `.env.local` com prefixo `NEXT_PUBLIC_` e reinicie o servidor de desenvolvimento.

## Notas

- As experiências 3D ficam em `components/three/` (ex.: cenas de background/hero)
- Os blocos de UI usam Radix UI como base, estilizados com Tailwind

## Licença

Distribuído sob a licença [MIT](./LICENSE).

---

## Pré-visualização

Você pode fazer o deploy com um clique na Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/guipm2/utopia-site)

### Deploy manual (Vercel)

1) Crie uma conta na Vercel e instale o Vercel CLI (opcional)
2) Conecte seu repositório `guipm2/utopia-site`
3) Configure o framework como Next.js e a versão do Node 20
4) Use `pnpm install`, `pnpm build` e `pnpm start` (defaults da Vercel para Next já funcionam)
5) Se precisar, adicione variáveis de ambiente em Project Settings > Environment Variables
