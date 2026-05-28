# syntax=docker/dockerfile:1
# ============================================================
# Build context: root of the origam repository (parent of packages/marketing/)
# docker build -f packages/marketing/Dockerfile -t origam-marketing .
# ============================================================

# ---- Stage 1: build the origam library, stories, and docs ----
FROM node:22-alpine AS builder
WORKDIR /app

# Enable pnpm via corepack (workspace manager)
RUN corepack enable

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

# Build VitePress docs static site
RUN pnpm -F @origam/docs build

# ---- Stage 2: build the Nuxt marketing site ----
WORKDIR /app/packages/marketing

# Assemble public/stories and public/docs from sibling builds
RUN node scripts/build-static-assets.mjs

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
