import type { IBlogPost } from '~/interfaces/blog.interface'
import type {
    IBreadcrumbItem,
    IBreadcrumbListLd,
    IBlogPostingLd,
    ISoftwareApplicationLd,
    IWebsiteLd
} from '~/interfaces/structured-data.interface'
import { MARKETING_DEFAULTS } from '~/consts/marketing.const'

const AUTHOR_NAME = 'Arnaud Prioul'
const AUTHOR_URL = 'https://github.com/arnaudprioul'
const GITHUB_URL = 'https://github.com/arnaudprioul/origam'
const NPM_URL = 'https://www.npmjs.com/package/origam'
const BASE_URL = MARKETING_DEFAULTS.siteUrl

function injectLd(data: object): void {
    useHead({
        script: [
            {
                type: 'application/ld+json',
                innerHTML: JSON.stringify(data)
            }
        ]
    })
}

export function useWebsiteLd(): void {
    const ld: IWebsiteLd = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: MARKETING_DEFAULTS.siteName,
        url: BASE_URL,
        description: MARKETING_DEFAULTS.siteDescription,
        author: {
            '@type': 'Person',
            name: AUTHOR_NAME,
            url: AUTHOR_URL
        },
        potentialAction: {
            '@type': 'SearchAction',
            target: {
                '@type': 'EntryPoint',
                urlTemplate: `${BASE_URL}/?q={search_term_string}`
            },
            'query-input': 'required name=search_term_string'
        }
    }
    injectLd(ld)
}

export function useSoftwareApplicationLd(): void {
    const ld: ISoftwareApplicationLd = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'origam',
        description: MARKETING_DEFAULTS.siteDescription,
        applicationCategory: 'DeveloperApplication',
        operatingSystem: 'Any',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD'
        },
        author: {
            '@type': 'Person',
            name: AUTHOR_NAME,
            url: AUTHOR_URL
        },
        sameAs: [GITHUB_URL, NPM_URL]
    }
    injectLd(ld)
}

export function useBlogPostingLd(post: IBlogPost): void {
    const route = useRoute()
    const ld: IBlogPostingLd = {
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        dateModified: post.date,
        author: {
            '@type': 'Person',
            name: post.author ?? AUTHOR_NAME,
            url: AUTHOR_URL
        },
        url: `${BASE_URL}${route.fullPath}`,
        image: post.image ?? `${BASE_URL}/og-image.png`
    }
    injectLd(ld)
}

export function useBreadcrumbListLd(items: IBreadcrumbItem[]): void {
    const ld: IBreadcrumbListLd = {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: item.name,
            item: item.url.startsWith('http') ? item.url : `${BASE_URL}${item.url}`
        }))
    }
    injectLd(ld)
}
