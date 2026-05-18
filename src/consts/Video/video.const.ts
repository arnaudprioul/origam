/**
 * Default `<video preload>` hint — `'metadata'` (loads only what is
 * needed to compute duration) — kept as a Video-specific alias of
 * `MEDIA_DEFAULT_PRELOAD` so consumers that target only the video
 * surface can import without pulling the broader media barrel.
 */
export const VIDEO_DEFAULT_PRELOAD: 'none' | 'metadata' | 'auto' = 'metadata'
