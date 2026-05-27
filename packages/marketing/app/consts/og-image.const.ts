import type { TOgImageType } from '~/types/og-image.type'

export const OG_TYPE_BADGE_LABEL: Record<TOgImageType, string> = {
    home:      'Design System',
    blog:      'Blog',
    component: 'Component',
    doc:       'Docs',
    page:      'origam'
}

export const OG_TYPE_ACCENT_VAR: Record<TOgImageType, string> = {
    home:      'var(--origam-color-primary-500, #6d5fff)',
    blog:      'var(--origam-color-success-500, #22c55e)',
    component: 'var(--origam-color-info-500, #3b82f6)',
    doc:       'var(--origam-color-secondary-500, #a855f7)',
    page:      'var(--origam-color-neutral-500, #6b7280)'
}
