/**
 * Default number of waveform peaks (`bins`) produced by `useWaveform`.
 * 200 is the sweet spot between visual density (one pixel per peak on
 * a 200 px-wide waveform) and decode cost (~5 ms on a 30 s mp3).
 */
export const WAVEFORM_DEFAULT_BINS = 200
