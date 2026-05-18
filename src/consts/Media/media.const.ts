/**
 * Default `<audio>`/`<video preload>` hint forwarded to the native
 * element when no consumer override is provided. `'metadata'` loads
 * just enough to compute the duration without auto-buffering, which
 * is the lightest sane default for the Media composables.
 */
export const MEDIA_DEFAULT_PRELOAD: 'none' | 'metadata' | 'auto' = 'metadata'
