// Liveness/readiness probe for container orchestrators (Coolify healthcheck is
// configured to GET /api/health). The Nitro server being able to answer is the
// liveness signal. The API-Reference database is an additional readiness check:
// while the site still reads the static .const.ts files the DB is OPTIONAL, so
// an unconfigured DB does not degrade health. Once configured, an unreachable
// DB flips the response to 503 so orchestrators can gate on readiness.

interface IHealthResponse {
    status: 'ok' | 'degraded'
    db: {
        configured: boolean
        ok: boolean
    }
}

export default defineEventHandler(async (event): Promise<IHealthResponse> => {
    const configured = isDbConfigured()
    const ok = configured ? await pingDb() : false

    const degraded = configured && !ok
    if (degraded) {
        setResponseStatus(event, 503)
    }

    return {
        status: degraded ? 'degraded' : 'ok',
        db: { configured, ok }
    }
})
