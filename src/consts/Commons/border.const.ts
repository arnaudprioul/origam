/**
 * Parse a free-form `border` value into width / style / color groups.
 *
 * Accepted color forms (in alternation order — `var()` MUST come before
 * the bare `[A-Za-z]+` branch, otherwise `var` would be eaten as a word
 * before the parenthesis group has a chance to match):
 *
 *   • Hex literal       — `#abc` / `#aabbcc`
 *   • CSS function      — `rgb(…)` / `rgba(…)` / `hsl(…)` / `hsla(…)`
 *   • CSS custom prop   — `var(--origam-color-action-primary-bg)` (with optional
 *                          fallback: `var(--x, fallback)`)
 *   • Named keyword     — `red`, `currentColor`, `transparent`, etc.
 *
 * The user reported that DS-token references (`var(--…)`) silently
 * dropped through this regex and were never emitted as `border-color`,
 * while raw hex / named colors worked. Adding the `var()` alternative
 * fixes the design-token path.
 */
export const BORDER_REGEX = /^(?<width>(?: ?(?:[0-9]+)(?:px|pt|PC|in|cm|mm|em|rem|%|ex|ch|fr)?){0,4}) {0,1}(?<style>(?:(?: ?(?:none|hidden|dotted|dashed|solid|double|groove|ridge|inset|outset))+){0,4}) ?(?<color>(?: ?(?:(?:(?:#)(?:[a-f0-9]{3}|[a-f0-9]{6}))|(?:var\(--[^)]+\))|(?:(?:rgb|hsl|rgba)a?\(.*\))|(?:[A-Za-z]+))){0,4})$/
