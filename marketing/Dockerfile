# syntax=docker/dockerfile:1
# ============================================================
# Build context: root of the origam repository (parent of marketing/)
# docker build -f marketing/Dockerfile -t origam-marketing .
# ============================================================

# ---- Stage 1: build the origam library, stories, and docs ----
FROM node:22-alpine AS builder
WORKDIR /app

# Install root deps first (origam library + story/docs tooling)
COPY package*.json ./
# marketing has a local `file:..` dep — resolve it before building
COPY marketing/package*.json ./marketing/
RUN npm ci

# Copy source needed for the lib + assets build
COPY src ./src
COPY scripts ./scripts
COPY tokens ./tokens
COPY build.config.ts ./
COPY tsconfig*.json ./
COPY histoire.config.js ./
COPY docs ./docs
COPY stories ./stories
COPY public ./public

# Build the origam library (tokens + unbuild)
RUN npm run lib:build

# Build Histoire stories static site
RUN npm run story:build

# Build VitePress docs static site
RUN npm run docs:build

# ---- Stage 2: build the Nuxt marketing site ----
WORKDIR /app/marketing
COPY marketing/ ./

RUN npm ci

# Assemble public/stories and public/docs from sibling builds
RUN node scripts/build-static-assets.mjs

# Nuxt production build → .output/
RUN npm run build

# ---- Stage 3: minimal production image ----
FROM node:22-alpine AS runner
WORKDIR /app

RUN addgroup -g 1001 -S nodejs && adduser -S nuxt -u 1001

COPY --from=builder --chown=nuxt:nodejs /app/marketing/.output ./.output

USER nuxt

ENV NITRO_HOST=0.0.0.0
ENV NITRO_PORT=3000
ENV NODE_ENV=production

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --retries=3 \
    CMD wget --quiet --tries=1 --spider http://localhost:3000/api/health || exit 1

CMD ["node", ".output/server/index.mjs"]
