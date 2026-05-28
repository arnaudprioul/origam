# Origam Marketing Site — SPEC

## 1. But & cible

### Objectifs

1. **Vitrine produit** — donner envie d'essayer origam dès le hero.
2. **Showcase composants** — galerie filtrable, mini-previews live, lien vers la story Histoire et la doc VitePress.
3. **Playground / REPL** — code editor + preview live, permet d'essayer sans installer.
4. **Hub** — point d'entrée unique vers stories (Histoire) et docs (VitePress) sous le même domaine.
5. **SEO** — référencement sur "Vue 3 design system", "Vue 3 components", "design tokens Vue".
6. **Coolify** — déployable sur ton instance Coolify avec un docker-compose simple.

### Cible

- **Dev Vue 3 senior** qui cherche un DS production-ready (perf, types, a11y).
- **Tech lead** qui évalue une lib pour son équipe (qualité, doc, support).
- **Designer** curieux des design tokens / du système.
- **Recruteur tech** (vitrine portfolio).

---

## 2. Stack technique

### Choix retenus

| Brique | Choix | Raison |
|---|---|---|
| Framework | **Nuxt 4** | SSR/SSG, file-based routing, server engine Nitro, déploiement Coolify natif |
| UI / Styles | **origam@2.5.1** + utilities daisyUI-inspired | Eat your own dog food. Pas d'install Tailwind ni daisyUI direct. |
| Code editor (Playground) | **monaco-editor** (lazy-loaded) | TS IntelliSense |
| Live preview Playground | **@vue/repl** | REPL Vue officiel |
| Anims | **CSS natif + Web Animations API** | view-transition-name pour routes |
| Search | **Pagefind** | Static search, 0 backend |
| Analytics | **Plausible self-hosted** | RGPD, sans cookies |
| Markdown / blog | **@nuxt/content v3** | Frontmatter typé |
| SEO | **@nuxtjs/seo** | sitemap + robots + OG + JSON-LD |
| i18n (V2) | **@nuxtjs/i18n v9** | EN par défaut |
| Tests | Vitest + Playwright | Cohérent avec la lib |

### Ce qu'on n'installe PAS

- ❌ Tailwind CSS — origam tokens couvrent déjà spacing/color/typography
- ❌ daisyUI direct — inspiration visuelle uniquement
- ❌ Pinia — pas de state global lourd
- ❌ Heavy mod analytics (GA4, Hotjar)

---

## 3. Structure de pages

```
marketing/
├─ app.vue                          # Layout racine — OrigamApp + Nav + Footer
├─ pages/
│  ├─ index.vue                     # Landing
│  ├─ components/
│  │  ├─ index.vue                  # Galerie filtrable
│  │  └─ [...slug].vue              # Détail composant
│  ├─ playground/index.vue          # REPL
│  ├─ blog/
│  │  ├─ index.vue                  # Liste
│  │  └─ [slug].vue                 # Article
│  ├─ changelog.vue                 # CHANGELOG.md parsé
│  ├─ about.vue
│  └─ 404.vue
├─ content/
│  ├─ blog/                         # *.md
│  └─ pages/                        # about.md, …
├─ public/
│  ├─ stories/                      # Build Histoire (copié au build)
│  └─ docs/                         # Build VitePress (copié au build)
├─ server/
│  └─ routes/
│     ├─ docs/[...].get.ts          # Static serve VitePress
│     ├─ stories/[...].get.ts       # Static serve Histoire
│     └─ api/health.get.ts          # Coolify health check
└─ nuxt.config.ts
```

### Landing (`/`)

1. **Hero** : H1 "The Vue 3 design system that just works", sous-titre 29 chart primitives + ~95 components + a11y + tokens, 2 CTA (Browse / GitHub), grille animée mini-composants en background, snippet `npm install origam` avec bouton copy.
2. **Bandeau trust** : placeholder logos + GitHub stats.
3. **Features grid** 6 items : Charts / WCAG / Tokens / TS / CSS-first / Vue 3.
4. **Showcase carousel** : Variants composants.
5. **Code demo** : split code / preview live.
6. **CTA bandeau** : "Ready to ship faster?" + install + GitHub.
7. **Footer** : Docs / Stories / GitHub / Blog / About / Changelog + version + LICENSE.

### Components (`/components`)

- H1 + subtitle.
- Sidebar filtres 8 catégories : Layout / Navigation / Forms / Data / Feedback / Overlay / Media / Utilities.
- Grid 3-4 col : preview + nom + catégorie + 1 ligne descriptive.
- Click → `/components/<name>`.

### Détail composant (`/components/[...slug]`)

- Layout 2-col : story Default iframe + doc Markdown.
- Header : breadcrumb, version, lien GitHub source, lien stories full.
- Onglets : Overview / Props / Slots / Emits / Examples.

### Playground (`/playground`)

- Split monaco-editor + @vue/repl preview.
- Toolbar : Load template, Reset, Share link (URL hash).
- Thème editor synchro DS.

### Docs / Stories (`/docs/*` & `/stories/*`)

- Nitro static serve depuis `public/docs/` et `public/stories/`.
- Cache-control immutable pour assets hash.
- Lien retour vers main via theme custom.

### Blog / Changelog / About / 404

Voir SPEC originale. Blog = `@nuxt/content` v3, Changelog = parse CHANGELOG.md au build.

---

## 4. Routing — tout sous un même domaine

```
origam.dev/                       Nuxt — Landing
origam.dev/components             Nuxt — Showcase
origam.dev/components/Btn         Nuxt — Détail composant
origam.dev/playground             Nuxt — REPL
origam.dev/docs/*                 Nitro static (build VitePress)
origam.dev/stories/*              Nitro static (build Histoire)
origam.dev/blog                   Nuxt — Liste blog
origam.dev/blog/<slug>            Nuxt — Article
origam.dev/changelog              Nuxt — Changelog parsé
origam.dev/about                  Nuxt — About
origam.dev/sitemap.xml            Auto @nuxtjs/seo
origam.dev/robots.txt             Auto
origam.dev/api/health             Health check Coolify
```

---

## 5. Design direction (daisyUI-inspired, origam-powered)

### Vibe

- Hero plein écran, illustrations vives, accents colorés
- Badges arrondis, look candy/friendly
- Color schemes lumineux traduits via brand themes origam
- Cards border-radius généreuse, ombres douces
- Typography hero big + bold
- Splash colors par section

### Tokens utilisés

- **Couleurs** : `primary / success / warning / danger / info / secondary / ghost / neutral`
- **Radius** : `rounded="2xl"` partout, `pill` sur CTA
- **Elevation** : `elevation={3}` features, `elevation={6}` modals
- **Typography** : `h1` `display-1`, `h2` `display-3`, body `text-base`
- **Spacing** : utilities `origam--padding-lg` etc.

### Composants origam utilisés (eat your own dog food)

OrigamApp / OrigamAppBar / OrigamMain / OrigamBtn / OrigamCard / OrigamChart / OrigamAlert / OrigamChip / OrigamSearch / OrigamCode / OrigamClipboard / OrigamThemeProvider.

### Hero illustration

Option retenue : **grid animée 4×6 de mini-composants** flottant en background. Hover = composant s'agrandit + révèle son nom. CSS keyframes léger. Respect `prefers-reduced-motion`.

---

## 6. Architecture composants Nuxt

```
marketing/components/
├─ TheNav.vue                       # Top navigation
├─ TheFooter.vue                    # Footer global
├─ HomeHero.vue                     # Hero
├─ HomeFeatures.vue                 # Features grid
├─ HomeShowcase.vue                 # Carousel composants
├─ HomeCodeDemo.vue                 # Split code / preview
├─ ComponentsGrid.vue               # Galerie filtrable
├─ ComponentCard.vue                # Card preview
├─ ComponentDetailView.vue          # Layout 2-col détail
├─ PlaygroundEditor.vue             # monaco wrapper
├─ PlaygroundPreview.vue            # @vue/repl preview
├─ BlogCard.vue                     # Card article
├─ ChangelogEntry.vue               # Entrée changelog
├─ ThemeToggle.vue                  # Light/dark/brand
└─ SearchOverlay.vue                # Modal Pagefind
```

---

## 7. Build & déploiement Coolify

### Pipeline

```bash
# Depuis la racine origam
npm run lib:build              # dist/
npm run story:build            # build Histoire static
npm run docs:build             # build VitePress static

# Marketing
cd marketing/
node scripts/build-static-assets.mjs  # copie stories + docs dans public/
npm run build                  # Nuxt build → .output/
```

### Dockerfile (multi-stage Node 22)

```dockerfile
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

FROM node:22-alpine AS runner
WORKDIR /app
COPY --from=builder /app/.output ./.output
ENV HOST=0.0.0.0
ENV PORT=3000
EXPOSE 3000
CMD ["node", ".output/server/index.mjs"]
```

### docker-compose.yml

```yaml
services:
  origam-site:
    build: .
    container_name: origam-marketing
    restart: unless-stopped
    environment:
      - NITRO_HOST=0.0.0.0
      - NITRO_PORT=3000
    labels:
      - "coolify.managed=true"
      - "traefik.enable=true"
      - "traefik.http.routers.origam.rule=Host(`origam.dev`)"
      - "traefik.http.routers.origam.entrypoints=https"
      - "traefik.http.routers.origam.tls.certresolver=letsencrypt"
```

### Health check

`/api/health` Nitro → `{ status: 'ok', version: '2.5.1' }`.

---

## 8. SEO & analytics

- Title + meta par page via `useSeoMeta`.
- OG image auto via `@nuxt/og-image`.
- JSON-LD `SoftwareApplication` sur landing.
- Sitemap `/sitemap.xml` (incl. /docs/* et /components/* indexés).
- Hreflang `en` (et `fr` si i18n).
- Plausible : page views auto + custom events (`playground:share`, `cta:install:copy`, `component:click`, `theme:change`).

---

## 9. Performance & a11y

### Performance targets

- Lighthouse Performance ≥ 95 (mobile + desktop)
- LCP ≤ 2.5s
- TBT ≤ 200ms
- CLS ≤ 0.1
- Monaco lazy-loaded sur `/playground` only
- Pagefind index ≤ 500 KB

### A11y targets

- Lighthouse A11y = 100
- `npm run test:a11y` axe-core sur Landing / Components / Playground / Blog
- Skip-to-content link
- Heading hierarchy stricte

---

## 10. Milestones / phases

| Phase | Effort | Contenu |
|---|---|---|
| 1 — MVP | 5-7 j | Setup + Landing + Components + reverse-proxy + Docker + deploy |
| 2 — Contenu | 3-4 j | Détail composant + Blog + Changelog + About + Search |
| 3 — Playground | 5-7 j | Monaco + repl + templates + share |
| 4 — Polish | 3-4 j | Anims, SEO, a11y, perf, theme toggle |
| 5 — Nice-to-have | — | i18n FR/EN, A/B test hero |

---

## 11. Décisions à confirmer

1. Domaine final : `origam.dev` ou autre ?
2. Self-host Plausible ou skip analytics V1 ?
3. i18n V1 ou EN-only ?
4. Logo : favicon Vite ou logo dédié ?
5. Hero illustration : grid animée (option retenue) confirmée ?
6. Lien GitHub Discussions / Discord ?

---

## 12. Commande pour bootstrap

```bash
cd /Users/arnaudprioul/Projects/origam
mkdir -p marketing && cd marketing
# Bootstrap manuel (pas npx nuxi init qui est interactif)
# package.json + nuxt.config.ts + app.vue créés à la main
npm install
```

---

**Version spec** : 1.0 — 2026-05-27
**Auteur** : Arnaud Prioul + Claude
**Status** : validée, en cours d'implémentation Phase 1
