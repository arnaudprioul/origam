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
        id: 'integrations',
        titleKey: 'footer.integrations',
        titleFallback: 'Integrations',
        links: [
            {
                id: 'footer-figma',
                labelKey: 'nav.figma',
                labelFallback: 'Figma plugin',
                href: '/integrations/figma'
            },
            {
                id: 'footer-tokens-studio',
                labelKey: 'footer.tokensStudio',
                labelFallback: 'Tokens Studio',
                href: 'https://tokens.studio/',
                external: true
            },
            {
                id: 'footer-npm',
                labelKey: 'footer.npm',
                labelFallback: 'npm package',
                href: 'https://www.npmjs.com/package/origam',
                external: true
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
                id: 'footer-tokens-studio-res',
                labelKey: 'footer.tokensStudio',
                labelFallback: 'Tokens Studio',
                href: 'https://tokens.studio/',
                external: true
            },
            {
                id: 'footer-npm-res',
                labelKey: 'footer.npm',
                labelFallback: 'npm package',
                href: 'https://www.npmjs.com/package/origam',
                external: true
            }
        ]
    },
    {
        id: 'legal',
        titleKey: 'footer.cols.legal.title',
        titleFallback: 'Legal',
        links: [
            {
                id: 'footer-license',
                labelKey: 'footer.license',
                labelFallback: 'MIT License',
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
