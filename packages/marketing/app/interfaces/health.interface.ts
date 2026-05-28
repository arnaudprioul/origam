import type { THealthStatus } from '~/enums/health-status.enum'

export interface IHealthResponse {
    readonly status: THealthStatus
    readonly version: string
    readonly uptime: number
}
