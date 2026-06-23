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
 * Core set wired in the editor. ~15 components that render visibly from props
 * (plus light slot text). `tabs` is intentionally excluded: it renders only via
 * OrigamTab children (slot-driven) and can't be previewed from props alone.
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
    select: { previewProps: { label: 'Pick one', items: ['One', 'Two', 'Three'], width: 240 } },
    checkbox: { previewProps: { label: 'Checkbox', modelValue: true } },
    switch: { previewProps: { label: 'Switch', modelValue: true } },
    title: { slotText: 'The quick brown fox' },
    icon: { previewProps: { icon: 'mdi-star', size: 'x-large' } },
    badge: { slotText: 'Inbox', previewProps: { content: '4', inline: true } },
    divider: { previewProps: { width: 240 } },
    'progress-linear': { previewProps: { modelValue: 64, height: 8 } }
}

/**
 * CSS custom-property name fragments that map to a colour input. Everything
 * else (lengths, shadows, easings, …) uses a plain text input.
 */
export const THEME_BUILDER_COLOR_HINTS = ['color', 'bg', 'background', 'fill', 'border'] as const
