import type { IFooterSection } from '~/interfaces/nav.interface'

export const FOOTER_SECTIONS: ReadonlyArray<IFooterSection> = [
    {
        id: 'product',
        titleKey: 'footer.product',
        titleFallback: 'Product',
        links: [
            {
                id: 'footer-components',
                labelKey: 'nav.components',
                labelFallback: 'Components',
                href: '/components'
            },
            {
                id: 'footer-playground',
                labelKey: 'nav.playground',
                labelFallback: 'Playground',
                href: '/playground'
            },
            {
                id: 'footer-docs',
                labelKey: 'nav.docs',
                labelFallback: 'Docs',
                href: '/docs'
            },
            {
                id: 'footer-stories',
                labelKey: 'nav.stories',
                labelFallback: 'Stories',
                href: '/stories'
            }
        ]
    },
    {
        id: 'community',
        titleKey: 'footer.community',
        titleFallback: 'Community',
        links: [
            {
                id: 'footer-github',
                labelKey: 'footer.github',
                labelFallback: 'GitHub',
                href: 'https://github.com/arnaudprioul/origam',
                external: true
            },
            {
                id: 'footer-blog',
                labelKey: 'nav.blog',
                labelFallback: 'Blog',
                href: '/blog'
            },
            {
                id: 'footer-changelog',
                labelKey: 'nav.changelog',
                labelFallback: 'Changelog',
                href: '/changelog'
            }
        ]
    },
    {
        id: 'resources',
        titleKey: 'footer.resources',
        titleFallback: 'Resources',
        links: [
            {
                id: 'footer-about',
                labelKey: 'nav.about',
                labelFallback: 'About',
                href: '/about'
            },
            {
                id: 'footer-license',
                labelKey: 'footer.license',
                labelFallback: 'License',
                href: 'https://github.com/arnaudprioul/origam/blob/main/LICENSE',
                external: true
            },
            {
                id: 'footer-contact',
                labelKey: 'footer.contact',
                labelFallback: 'Contact',
                href: 'mailto:contact@origam.dev',
                external: true
            }
        ]
    }
] as const
