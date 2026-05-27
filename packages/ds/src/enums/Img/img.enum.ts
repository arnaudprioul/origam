export enum CROSS_ORIGIN {
    ANONYMOUS = 'anonymous',
    USE_CREDENTIALS = 'use-credentials'
}

export enum REFERRER_POLICY {
    NO_REFERRER = 'no-referrer',
    NO_REFERRER_WHEN_DOWNGRADE = 'no-referrer-when-downgrade',
    ORIGIN = 'origin',
    ORIGIN_WHEN_CROSS_ORIGIN = 'origin-when-cross-origin',
    SAME_ORIGIN = 'same-origin',
    STRICT_ORIGIN = 'strict-origin',
    STRICT_ORIGIN_WHEN_CROSS_ORIGIN = 'strict-origin-when-cross-origin',
    UNSAFE_URL = 'unsafe-url'
}

export enum IMG_STATE {
    IDLE = 'idle',
    LOADING = 'loading',
    LOADED = 'loaded',
    ERROR = 'error'
}
