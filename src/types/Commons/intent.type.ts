/**
 * Semantic intents accepted by `useColorEffect` and `intent`-prop components
 * (Btn, Chip, Alert, Badge, …).
 *
 * These names map 1:1 to semantic tokens under
 * `--origam-color-action-{intent}-*` and `--origam-color-feedback-{intent}-*`,
 * generated from `tokens/semantic/{light,dark}.json`.
 *
 * Component-local CSS vars follow the convention
 * `--origam-{component}--{intent}---{prop}`
 * (e.g. `--origam-btn--success---bg`).
 */
export type TIntent =
    | 'neutral'
    | 'primary'
    | 'secondary'
    | 'ghost'
    | 'success'
    | 'warning'
    | 'danger'
    | 'info'
