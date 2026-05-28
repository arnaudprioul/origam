import type { INavLink } from '~/interfaces/nav.interface'

export const NAV_LINKS: ReadonlyArray<INavLink> = [
    {
        id: 'components',
        labelKey: 'nav.components',
        labelFallback: 'Components',
        href: '/components'
    },
    {
        id: 'playground',
        labelKey: 'nav.playground',
        labelFallback: 'Playground',
        href: '/playground'
    },
    {
        id: 'docs',
        labelKey: 'nav.docs',
        labelFallback: 'Docs',
        href: '/docs'
    },
    {
        id: 'stories',
        labelKey: 'nav.stories',
        labelFallback: 'Stories',
        href: '/stories'
    },
    {
        id: 'figma',
        labelKey: 'nav.figma',
        labelFallback: 'Figma plugin',
        href: '/integrations/figma'
    },
    {
        id: 'blog',
        labelKey: 'nav.blog',
        labelFallback: 'Blog',
        href: '/blog'
    },
    {
        id: 'changelog',
        labelKey: 'nav.changelog',
        labelFallback: 'Changelog',
        href: '/changelog'
    },
    {
        id: 'about',
        labelKey: 'nav.about',
        labelFallback: 'About',
        href: '/about'
    }
] as const
