import type { IOptions } from '@stories/interfaces'

/**
 * Common HTML tags used as the polymorphic `tag` prop on Btn, Card,
 * Title, etc. Limited to a vetted list so stories don't accidentally
 * suggest arcane tags.
 */
export const tagList: Array<IOptions<string | undefined>> = [
    { label: 'Default (component-decided)', value: undefined },
    { label: 'div',     value: 'div' },
    { label: 'span',    value: 'span' },
    { label: 'a',       value: 'a' },
    { label: 'button',  value: 'button' },
    { label: 'section', value: 'section' },
    { label: 'article', value: 'article' },
    { label: 'aside',   value: 'aside' },
    { label: 'nav',     value: 'nav' },
    { label: 'main',    value: 'main' },
    { label: 'header',  value: 'header' },
    { label: 'footer',  value: 'footer' }
]
