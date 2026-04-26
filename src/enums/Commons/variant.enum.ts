/**
 * Visual variants applied to elevation-driven components (Btn, Card, Chip…).
 * Mirrors the Vuetify / optimus-design-system taxonomy so consumers can swap
 * design systems without re-learning the API.
 */
export enum VARIANT {
    TEXT = 'text',
    FLAT = 'flat',
    ELEVATED = 'elevated',
    TONAL = 'tonal',
    OUTLINED = 'outlined',
    PLAIN = 'plain',
    /**
     * Glassmorphism — translucent tint of the current text color plus a
     * backdrop-filter blur. Browsers without `backdrop-filter` get a
     * slightly stronger tint as the fallback (handled in the SCSS via
     * `@supports`). Pairs cleanly with `color="primary"` etc. — the
     * variant only owns the chrome, not the foreground color.
     */
    GHOST = 'ghost'
}

/**
 * Visual variants specific to text input controls (TextField, NumberField,
 * PasswordField, etc.). Distinct from `VARIANT` because the rendering
 * conventions for inputs (filled / underlined / solo) differ from those of
 * action surfaces (elevated / tonal / outlined).
 */
export enum VARIANT_INPUT {
    SOLO_INVERTED = 'solo-inverted',
    SOLO_FILLED = 'solo-filled',
    UNDERLINED = 'underlined',
    FILLED = 'filled',
    SOLO = 'solo',
    OUTLINED = 'outlined',
    PLAIN = 'plain'
}
