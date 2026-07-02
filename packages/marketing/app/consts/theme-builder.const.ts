/**
 * THEME_BUILDER — config for the /theming visual theme builder.
 *
 * `CORE_THEME_SLUGS` is the curated set of components surfaced in the editor.
 * Adding a slug here wires it automatically: its prop controls come from
 * `consts/components/{slug}.const.ts` → `playground.controls`, and its editable
 * CSS tokens are derived from the origam theme `cssVars` (block prefix
 * `--origam-{slug}---`). The only per-slug data below is an optional preview
 * adapter for components that need slot/demo content to render visibly.
 *
 * Slugs are verified against real const files; preview props/slots use the real
 * component API only (no invented props).
 */
import type { IThemeBuilderPreviewAdapter } from '~/interfaces/theme-builder.interface'

/**
 * Default theme name pre-filled in the name field and used as the export
 * filename / camelCased export identifier when the user doesn't change it.
 */
export const THEME_BUILDER_DEFAULT_NAME = 'my-theme'

/**
 * Default human-readable label pre-filled in the label field (maps to
 * `IOrigamTheme.label`).
 */
export const THEME_BUILDER_DEFAULT_LABEL = 'My theme'

/**
 * Default color mode for a freshly-started theme (maps to `IOrigamTheme.mode`).
 */
export const THEME_BUILDER_DEFAULT_MODE = 'light'

/**
 * localStorage key under which the builder auto-persists its diff-only state so
 * edits survive a page reload. Reset clears this entry too.
 */
export const THEME_BUILDER_STORAGE_KEY = 'origam_theme_builder_state'

/**
 * Core set kept for backwards compatibility (tests / legacy references). The v2
 * builder lists EVERY component via the catalog; this curated list now only
 * marks the historically-wired components.
 */
export const CORE_THEME_SLUGS = [
    'btn',
    'card',
    'chip',
    'avatar',
    'alert',
    'text-field',
    'select',
    'checkbox',
    'switch',
    'title',
    'icon',
    'badge',
    'divider',
    'progress-linear'
] as const

/**
 * Slugs whose component renders a visible, meaningful preview from props alone
 * (plus the slot text / preview props from the adapter below). The builder
 * shows the live `<component :is>` preview for these and a graceful
 * "preview unavailable" note for the rest (overlays, providers, sub-parts that
 * need an activator or parent context). Verified against the real component API.
 */
export const THEME_BUILDER_PREVIEWABLE_SLUGS = [
    'btn',
    'card',
    'chip',
    'avatar',
    'alert',
    'text-field',
    'textarea-field',
    'number-field',
    'password-field',
    'select',
    'checkbox',
    'switch',
    'radio',
    'rating-field',
    'slider-field',
    'title',
    'icon',
    'badge',
    'divider',
    'progress-linear',
    'blockquote',
    'breadcrumb',
    'pagination'
] as const

/**
 * Per-slug preview adapter. Static `previewProps` are merged UNDER the user's
 * edited props (preview only — never serialised). `slotText` renders inside the
 * default slot. Absent slugs fall back to `playground.defaultSlotContent`.
 */
export const THEME_BUILDER_PREVIEW_ADAPTERS: Record<string, IThemeBuilderPreviewAdapter> = {
    btn: { slotText: 'Button' },
    card: { slotText: 'Card content', previewProps: { width: 240 } },
    chip: { slotText: 'Chip' },
    avatar: { previewProps: { icon: 'mdi-account', size: 'large' } },
    alert: { slotText: 'A short alert message.', previewProps: { type: 'info' } },
    'text-field': { previewProps: { label: 'Label', modelValue: 'Value', width: 240 } },
    'textarea-field': { previewProps: { label: 'Message', modelValue: 'A few lines of text.', width: 240, rows: 3 } },
    'number-field': { previewProps: { label: 'Amount', modelValue: 42, width: 240 } },
    'password-field': { previewProps: { label: 'Password', modelValue: 'secret', width: 240 } },
    select: { previewProps: { label: 'Pick one', items: ['One', 'Two', 'Three'], width: 240 } },
    checkbox: { previewProps: { label: 'Checkbox', modelValue: true } },
    switch: { previewProps: { label: 'Switch', modelValue: true } },
    radio: { previewProps: { label: 'Radio', modelValue: true } },
    'rating-field': { previewProps: { modelValue: 3 } },
    'slider-field': { previewProps: { modelValue: 50, width: 240 } },
    title: { slotText: 'The quick brown fox' },
    icon: { previewProps: { icon: 'mdi-star', size: 'x-large' } },
    badge: { slotText: 'Inbox', previewProps: { content: '4', inline: true } },
    divider: { previewProps: { width: 240 } },
    'progress-linear': { previewProps: { modelValue: 64, height: 8 } },
    blockquote: { slotText: 'Design is not just what it looks like. Design is how it works.' },
    breadcrumb: { previewProps: { items: [{ title: 'Home', href: '#' }, { title: 'Library', href: '#' }, { title: 'Data' }] } },
    pagination: { previewProps: { length: 5, modelValue: 2 } }
}

/**
 * CSS custom-property name fragments that map to a colour input. Everything
 * else (lengths, shadows, easings, …) uses a plain text input.
 */
export const THEME_BUILDER_COLOR_HINTS = ['color', 'bg', 'background', 'fill', 'border'] as const
