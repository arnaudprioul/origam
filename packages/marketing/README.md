# @origam/marketing

Nuxt 4 marketing site for the [origam](https://github.com/arnaudprioul/origam) design system: landing, components showcase, playground, blog, changelog, about, and hub for stories + docs.

See [`SPEC.md`](./SPEC.md) for the full functional + technical specification.

## Requirements

- Node `>=22` (see `../../.nvmrc`)
- pnpm (via `corepack enable`)
- The origam library must be built once before first run so the workspace
  link (`origam: workspace:*`) resolves to a populated `dist/`:

  ```bash
  # From the repository root
  pnpm -F origam build
  ```

## Install

```bash
# From the repository root
corepack enable
pnpm install
```

## Commands

All commands run with `pnpm -F @origam/marketing <script>` from the
repository root, or `pnpm <script>` from inside `packages/marketing/`.

| Command | Purpose |
|---|---|
| `pnpm dev` | Dev server (runs changelog:build + meta:build first, default `http://localhost:3000`) |
| `pnpm build` | Production build to `.output/` + Pagefind index |
| `pnpm preview` | Preview the production build |
| `pnpm generate` | Static prerender + Pagefind index |
| `pnpm assets:build` | Copy sibling Histoire + VitePress builds into `public/{stories,docs}` |
| `pnpm changelog:build` | Parse root `CHANGELOG.md` → `.generated/changelog.json` |
| `pnpm meta:build` | Extract origam components metadata → `.generated/components-meta.json` |
| `pnpm search:build` | Run Pagefind on `.output/public` |
| `pnpm build:full` | One-shot: ds build + stories build + docs build + assets:build + nuxt build + search:build |
| `pnpm typecheck` | `vue-tsc` type-check |
| `pnpm lint` | ESLint |
| `pnpm test:unit` | Vitest |

## Environment

Copy `env.example` (or `.env.example` if present) to `.env`, adapt to your context, and either source it locally or paste the values into the Coolify UI.

| Variable | Default | Description |
|---|---|---|
| `NUXT_PUBLIC_SITE_URL` | `https://origam.dev.elysera.net` | Public canonical URL. Drives sitemap, OG, canonical, hreflang. |
| `TRAEFIK_HOST` | `origam.dev.elysera.net` | Hostname Traefik routes traffic from. Must match the SITE_URL host. |
| `NUXT_PUBLIC_GITHUB_REPO` | `arnaudprioul/origam` | Used by nav GitHub button, footer, edit-on-github links. |
| `NUXT_PUBLIC_NPM_PKG` | `origam` | npm package name shown in hero / footer. |
| `NUXT_PUBLIC_NPM_VERSION` | `2.5.1` | Version label in hero / footer. |
| `NUXT_PUBLIC_CONTACT_EMAIL` | `` | Email surfaced in About page. Leave empty to hide. |
| `NUXT_PUBLIC_PLAUSIBLE_DOMAIN` | `` | **Empty disables tracking** — `useAnalytics` becomes a no-op. |
| `NUXT_PUBLIC_PLAUSIBLE_API_HOST` | `` | **Empty disables tracking**. |
| `NODE_ENV` | `production` | Set to `development` for verbose logs. |

## Deployment

### Coolify (recommended)

1. New Resource → Docker Compose (or Git repository pointing at this repo).
2. Build context: repository root (`../..` from this folder).
3. Dockerfile path: `packages/marketing/Dockerfile`.
4. Compose file: `packages/marketing/docker-compose.yml`.
5. Set env vars listed above (esp. `NUXT_PUBLIC_SITE_URL` and `TRAEFIK_HOST`).
6. Deploy. Traefik handles TLS via Let's Encrypt automatically.

Health check is at `/api/health` (probed by both Coolify and Traefik).

### Docker standalone

The build context must be the **repository root** (not the `packages/marketing/` subfolder) because the Dockerfile builds the origam library, Histoire stories, and VitePress docs before building the Nuxt site.

```bash
# From the repository root
docker build -f packages/marketing/Dockerfile -t origam-marketing .

docker run -p 3000:3000 \
  -e NUXT_PUBLIC_SITE_URL=http://localhost:3000 \
  origam-marketing
```

### Full one-shot build (local)

```bash
# From the repository root
pnpm -F @origam/marketing build:full
```

## Routing

All under a single host (e.g. `origam.dev.elysera.net`):

| Path | Source |
|---|---|
| `/` | Nuxt — Landing |
| `/components` | Nuxt — Showcase grid (filterable) |
| `/components/<name>` | Nuxt — Detail (story iframe + Props/Slots/Emits) |
| `/playground` | Nuxt — Monaco + @vue/repl REPL |
| `/blog` `/blog/<slug>` | Nuxt — @nuxt/content v3 |
| `/changelog` | Nuxt — Parsed `CHANGELOG.md` |
| `/about` | Nuxt — Content markdown |
| `/docs/*` | Nitro static serve — VitePress build |
| `/stories/*` | Nitro static serve — Histoire build |
| `/api/health` | Nitro — Coolify probe |
| `/api/changelog` `/api/components/{,:slug}` | Nitro — JSON catalogs |
| `/sitemap.xml` `/robots.txt` | Auto via `@nuxtjs/seo` |

## Languages

EN (default) + FR. Strategy `prefix_except_default` (FR served under `/fr/...`). Cookie: `origam_locale`. Switch via the LanguageSwitcher in the nav.

## i18n key extraction

To re-scan `t()` calls and rebuild `app/locales/{en,fr}.json`:

```bash
node scripts/extract-i18n-keys.mjs --check
```
