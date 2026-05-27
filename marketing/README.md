# @origam/marketing

Nuxt 4 marketing site for the [origam](https://github.com/arnaudprioul/origam) design system: landing, components showcase, playground, blog, and hub for stories + docs.

See [`SPEC.md`](./SPEC.md) for the full functional + technical specification.

## Requirements

- Node `>=22` (see `../.nvmrc`)
- The origam library must be built once before first install so the local `file:..` link resolves to a populated `dist/` folder:

  ```bash
  cd ..
  npm run lib:build
  ```

## Install

```bash
npm install
```

## Commands

| Command | Purpose |
|---|---|
| `npm run dev` | Start the Nuxt dev server (default `http://localhost:3000`) |
| `npm run build` | Production build to `.output/` |
| `npm run preview` | Preview the production build |
| `npm run generate` | Static prerender |
| `npm run assets:build` | Copy sibling Histoire + VitePress builds into `public/{stories,docs}` (placeholder, see task #72) |
| `npm run typecheck` | `vue-tsc` type-check |
| `npm run lint` | ESLint |
| `npm run test:unit` | Vitest |

## Environment

Copy `.env.example` to `.env` and adapt:

```bash
cp .env.example .env
```

## Deployment

### Docker (standalone)

The build context must be the **repository root** (not the `marketing/` subfolder) because the Dockerfile builds the origam library, Histoire stories, and VitePress docs before building the Nuxt site.

```bash
# From the repository root
docker build -f marketing/Dockerfile -t origam-marketing .
docker run -p 3000:3000 origam-marketing
```

Environment variables passed at runtime:

| Variable | Default | Description |
|---|---|---|
| `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` | `origam.dev` | Plausible analytics domain |
| `NUXT_PUBLIC_PLAUSIBLE_API_HOST` | `https://plausible.origam.dev` | Plausible API host |

### Coolify

Use the provided `docker-compose.yml`. In Coolify, set the build context to the repository root and point the Dockerfile path to `marketing/Dockerfile`.

Traefik labels are pre-configured for `origam.dev` with automatic Let's Encrypt TLS. See [Coolify docs](https://coolify.io/docs) for service setup.

### Full one-shot build

```bash
# From the repository root — builds lib + stories + docs + marketing
cd marketing && npm run build:full
```

## Project status

Phase 1 — MVP bootstrap. Subsequent tasks:

- #68 — Landing page + `TheNav` / `TheFooter`
- #69 — Components showcase grid
- #70 — Reverse-proxy routes for `/docs/*` and `/stories/*` (completed)
- #71 — Dockerfile + docker-compose for Coolify (completed)
- #72 — Build pipeline (`assets:build` populating `public/`) (completed)
