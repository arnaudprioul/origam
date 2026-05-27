export const SEO_DEFAULT_OG_IMAGE = '/og-image.png'
export const SEO_TWITTER_HANDLE = '@arnaudprioul'
export const SEO_TWITTER_SITE = '@origam_ds'
export const SEO_SOFTWARE_APPLICATION_CATEGORY = 'DeveloperApplication'
export const SEO_LANGUAGES = ['en'] as const
export const OG_IMAGE_DIMENSIONS = { width: 1200, height: 630 } as const

export const SEO_OG_TYPE_ACCENT: Record<string, string> = {
    home:      'var(--origam-color-primary-500)',
    blog:      'var(--origam-color-success-500)',
    component: 'var(--origam-color-info-500)',
    doc:       'var(--origam-color-secondary-500)',
    page:      'var(--origam-color-neutral-500)'
}
