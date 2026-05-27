import { HEALTH_STATUS_OK, HEALTH_VERSION } from '~app/consts/health.const'
import type { IHealthResponse } from '~app/interfaces/health.interface'

/**
 * GET /api/health — Coolify health probe.
 * Returns status, version, and current process uptime (seconds).
 */
export default defineEventHandler((): IHealthResponse => ({
    status: HEALTH_STATUS_OK,
    version: HEALTH_VERSION,
    uptime: process.uptime(),
}))
