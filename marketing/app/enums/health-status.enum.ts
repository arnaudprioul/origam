export const HEALTH_STATUS = {
    OK: 'ok',
    DEGRADED: 'degraded',
    ERROR: 'error'
} as const

export type THealthStatus = typeof HEALTH_STATUS[keyof typeof HEALTH_STATUS]
