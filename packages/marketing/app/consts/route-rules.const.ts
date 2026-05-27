import type { NitroConfig } from 'nitropack'

export const ROUTE_RULES: NonNullable<NitroConfig['routeRules']> = {
    '/docs/**': { static: true },
    '/stories/**': { static: true },
    '/api/health': { cors: false }
} as const
