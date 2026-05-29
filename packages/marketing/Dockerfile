# syntax=docker/dockerfile:1
# ============================================================
# Build context: root of the origam repository (parent of packages/marketing/)
# docker build -f packages/marketing/Dockerfile -t origam-marketing .
# ============================================================
#
# Cache-friendly layer order
# --------------------------
# COPY / RUN steps are ordered so that the *cheap* layers come first and
# the *expensive but frequently-changing* layers come last. Concretely:
#
#   workspace manifests           → almost never change
#     pnpm install                ↳ cached for weeks
#   tsconfig + CHANGELOG          → change rarely
#   packages/ds source            → changes per lib release
#     pnpm -F origam build        ↳ heavy (~25 s) but cached unless ds/ changed
#   packages/stories source       → changes per story update
#     pnpm -F @origam/stories build ↳ heaviest single step (~45 s); cached
#                                    unless stories/ or ds/ changed
#   packages/marketing source     → most volatile (every PR usually touches it)
#     nuxt build                  ↳ ~45 s; cached unless marketing/ changed
#
# Why this matters: every step AFTER a changed COPY is invalidated. Putting
# marketing LAST means a marketing-only change skips the lib & stories
# rebuilds and the whole image rebuilds in ~50 s instead of ~3 min. Faster
# builds also make Coolify-host kills (concurrent deploys, host pressure)
# far less likely to hit our pipeline.

# ---- Stage 1: build the origam library, stories, and marketing site ----
FROM node:22-alpine AS builder
WORKDIR /app

# Enable pnpm via corepack and PIN the version. The repo deliberately
# does NOT carry a `packageManager` field in root package.json (to keep
# npm/yarn workspaces compatibility for local dev). Without that field
# corepack pulls the latest pnpm — currently pnpm@11.x ships a new
# `minimumReleaseAge` policy that rejects lockfile entries for packages
# published within the last few hours, which breaks reproducible builds
# right after upstream releases (Vue 3.5.x, etc.).
# Lock the Docker build to pnpm@9.15.0 (same version we develop on).
RUN corepack enable \
    && corepack prepare pnpm@9.15.0 --activate

# Copy workspace manifests first so the install layer caches well
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY packages/ds/package.json ./packages/ds/
COPY packages/marketing/package.json ./packages/marketing/
COPY packages/stories/package.json ./packages/stories/
COPY packages/docs/package.json ./packages/docs/

RUN pnpm install --frozen-lockfile

# Stable inputs needed by the lib build
COPY tsconfig*.json ./
# CHANGELOG.md is read by packages/marketing/scripts/parse-changelog.mjs
# during the Nuxt build (resolves to /app/CHANGELOG.md inside the image).
# It is intentionally NOT ignored in .dockerignore for this reason.
COPY CHANGELOG.md ./

# ---- Lib build (cached unless packages/ds changes) ----
COPY packages/ds ./packages/ds
RUN pnpm -F origam build

# Docs source is copied BEFORE the stories build because Histoire pulls
# component markdown from packages/docs/components/<Name>/Origam<Name>.md
# at story-collection time (e.g. App/OrigamApp.md). Without the docs
# tree present, `histoire build` fails with ENOENT mid-collection.
# The VitePress build itself is SKIPPED for V1 (vitepress@1.6.x +
# esbuild@0.21.5 wasm shim bug — `Expected ":" but found "}"` in
# wasm.!~{001}~.js, tracked in a follow-up ticket). The marketing
# site serves /docs/* from public/docs/ which will be empty until
# this is resolved — user-visible impact: the "/docs" links from
# /components/<name> pages show 404 until fixed.
COPY packages/docs ./packages/docs
# RUN pnpm -F @origam/docs build

# ---- Stories build (cached unless packages/stories, ds, or docs changes) ----
COPY packages/stories ./packages/stories
RUN pnpm -F @origam/stories build

# ---- Marketing build (the most volatile bit — copied LAST) ----
COPY packages/marketing ./packages/marketing
WORKDIR /app/packages/marketing

# Assemble public/stories from sibling builds (stories dist must already
# exist at this point — it was built above).
RUN node scripts/build-static-assets.mjs

# Generate the data files the Nuxt server routes import at build time.
# - components-meta.json : props/emits/slots extracted from packages/ds
#                          (consumed by server/api/components/*.get.ts)
# - changelog.json       : parsed from repo-root CHANGELOG.md
# These live in .generated/ which is gitignored, so they MUST be built
# from source during the Docker build. Without them, the Nuxt build
# crashes at the prerender step with "Could not load .generated/*.json".
RUN node scripts/extract-component-meta.mjs --out=.generated/components-meta.json
RUN node scripts/parse-changelog.mjs --out=.generated/changelog.json

# Nuxt production build → .output/
# Bump V8 heap: the Nitro SSR build pulls in the whole origam lib + all
# server routes + prerendered components-meta. With ~2 GB default heap
# the SSR step OOMs ("Reached heap limit Allocation failed"). 4 GB is
# comfortable for the current footprint and stays well under Docker
# Desktop / Coolify host limits.
#
RUN NODE_OPTIONS="--max-old-space-size=4096" pnpm run build

# ---- Stage 2: minimal production image ----
FROM node:22-alpine AS runner
WORKDIR /app

# Install curl. Two reasons:
#  1. Coolify's container healthcheck runs `curl ... || wget ...` via
#     `docker exec`. Without curl in PATH it falls back to busybox wget.
#  2. Busybox wget on Alpine resolves `localhost` to ::1 (IPv6) FIRST
#     via musl, tries to connect, fails (Node only listens on IPv4
#     0.0.0.0:3000 by default), and does NOT fall back to 127.0.0.1.
#     The container then reports `Connection refused` on every probe
#     even though the server is healthy on IPv4. curl handles the
#     IPv4/IPv6 fallback gracefully (happy eyeballs), so the same
#     `curl http://localhost:3000/api/health` works.
#  Verified locally:
#    wget  http://localhost:3000   → Connection refused (musl ::1 first)
#    wget  http://127.0.0.1:3000   → OK
#    curl  http://localhost:3000   → OK (curl falls back to v4)
RUN apk add --no-cache curl

RUN addgroup -g 1001 -S nodejs && adduser -S nuxt -u 1001

COPY --from=builder --chown=nuxt:nodejs /app/packages/marketing/.output ./.output

USER nuxt

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

# Use 127.0.0.1 explicitly (not `localhost`) to bypass the musl IPv6
# resolution order. Use curl (installed above) so the failure mode is
# clear in logs if it ever breaks again.
HEALTHCHECK --interval=30s --timeout=5s --retries=3 --start-period=20s \
    CMD curl --silent --fail --show-error --max-time 4 \
        http://127.0.0.1:3000/api/health > /dev/null || exit 1

CMD ["node", ".output/server/index.mjs"]
