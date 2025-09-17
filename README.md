# Utopia

A modern, animated landing experience built with Next.js 14, Tailwind CSS, and a rich set of UI/3D components. It showcases interactive sections, smooth transitions, and 3D backgrounds using React Three Fiber.

## Tech Stack

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS + tailwindcss-animate
- Radix UI primitives
- Custom UI components (in `components/ui`)
- Framer Motion (animations)
- React Three Fiber + Drei + Three.js (3D scenes)
- next-themes (theme switch / dark mode)
- React Hook Form + Zod (forms + validation)
- Recharts, Embla Carousel, Sonner, and more

## Project Structure

- `app/` — App Router pages, global styles import, and layout
- `components/ui/` — Reusable UI components (buttons, dialogs, forms, etc.)
- `components/three/` — 3D scenes and helpers (React Three Fiber + Drei)
- `components/` — Theme provider and other shared components
- `hooks/` — Custom hooks
- `lib/` — Utilities
- `public/` — Static assets
- `styles/` — Tailwind CSS globals

## Requirements

- Node.js 18.18+ (or 20+ recommended)
- pnpm (project uses `pnpm-lock.yaml`)

## Getting Started

1) Install dependencies

```
pnpm install
```

2) Run the development server

```
pnpm dev
```

Then open http://localhost:3000 in your browser.

3) Build for production

```
pnpm build
```

4) Start the production server

```
pnpm start
```

## Available Scripts

- `pnpm dev` — Start the Next.js dev server
- `pnpm build` — Build the production bundle
- `pnpm start` — Start Next.js in production mode
- `pnpm lint` — Run Next.js lint

## Environment variables

No required env vars by default. If you add any client-side config, place them in `.env.local` with the `NEXT_PUBLIC_` prefix and restart the dev server.

## Notes

- 3D experiences live under `components/three/` (e.g. background/hero scenes)
- UI building blocks are based on Radix UI primitives and Tailwind styling

## License

All rights reserved. If you plan to open-source or publish, update this section accordingly (e.g., MIT).
