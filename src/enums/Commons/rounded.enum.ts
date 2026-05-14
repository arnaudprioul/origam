/**
 * Predefined corner-radius variants. Mirrors the origam-design-system
 * taxonomy so consumers can swap design systems without re-learning the
 * `rounded` API. Each value is also a class suffix
 * (`origam-btn--rounded-large`) and maps 1:1 to a token rung in
 * `tokens/primitive.json` under `radius.*`.
 */
export enum ROUNDED {
    X_SMALL = 'x-small',
    SMALL = 'small',
    DEFAULT = 'default',
    MEDIUM = 'medium',
    LARGE = 'large',
    X_LARGE = 'x-large',
    SHAPED = 'shaped',
    SHAPED_INVERT = 'shaped-invert'
}
