import type { TBlogTag, TBlogTagColor } from '~/types/blog.type'

export const BLOG_POSTS_PER_PAGE = 10

export const BLOG_DATE_LOCALE = 'en-US' as const

export const BLOG_DATE_FORMAT: Intl.DateTimeFormatOptions = {
    dateStyle: 'long'
} as const

export const BLOG_GITHUB_EDIT_BASE = 'https://github.com/arnaudprioul/origam/edit/main/marketing/content/blog' as const

export const BLOG_TAG_COLORS: Record<TBlogTag, TBlogTagColor> = {
    release: 'info',
    maintenance: 'neutral',
    announcement: 'primary',
    philosophy: 'primary',
    tutorial: 'success',
    changelog: 'secondary'
} as const
