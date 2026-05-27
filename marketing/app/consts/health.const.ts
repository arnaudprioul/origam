import { MARKETING_DEFAULTS } from './marketing.const'
import { HEALTH_STATUS } from '~/enums/health-status.enum'

/** Static fields of the health response — uptime is computed at request time. */
export const HEALTH_STATUS_OK = HEALTH_STATUS.OK
export const HEALTH_VERSION = MARKETING_DEFAULTS.npmVersion
