# syntax=docker/dockerfile:1
# ============================================================
# Build context: root of the origam repository (parent of packages/marketing/)
# docker build -f packages/marketing/Dockerfile -t origam-marketing .
# ============================================================

# ---- Stage 1: build the origam library, stories, and docs ----
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

# Copy source needed for the lib + assets builds
COPY tsconfig*.json ./
COPY packages/ds ./packages/ds
COPY packages/stories ./packages/stories
COPY packages/docs ./packages/docs
COPY packages/marketing ./packages/marketing

# Build the origam library (tokens + unbuild)
RUN pnpm -F origam build

# Build Histoire stories static site
RUN pnpm -F @origam/stories build

# Build VitePress docs static site — SKIPPED for V1.
# vitepress@1.6.x + esbuild@0.21.5 has a wasm shim bug
# (`Expected ":" but found "}"` in wasm.!~{001}~.js).
# Tracking in follow-up ticket. The marketing site serves /docs/*
# from public/docs/ which will be empty until this is resolved —
# user-visible impact: the "/docs" links from /components/<name>
# pages show 404 until fixed.
# RUN pnpm -F @origam/docs build

# ---- Stage 2: build the Nuxt marketing site ----
WORKDIR /app/packages/marketing

# Assemble public/stories and public/docs from sibling builds
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
RUN pnpm run build

# ---- Stage 3: minimal production image ----
FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && adduser -S nuxt -u 1001

COPY --from=builder --chown=nuxt:nodejs /app/packages/marketing/.output ./.output

USER nuxt

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", ".output/server/index.mjs"]
