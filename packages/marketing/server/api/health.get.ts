// Liveness/readiness probe for container orchestrators (Coolify healthcheck
// is configured to GET /api/health). Returns 200 as soon as the Nitro server
// is accepting requests — no external dependency is touched on purpose.
export default defineEventHandler(() => ({ status: 'ok' }))
