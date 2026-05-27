export interface ISoftwareApplicationLd {
    '@context': 'https://schema.org'
    '@type': 'SoftwareApplication'
    name: string
    description: string
    applicationCategory: string
    operatingSystem: string
    offers: {
        '@type': 'Offer'
        price: string
        priceCurrency: string
    }
    author: {
        '@type': 'Person'
        name: string
        url: string
    }
    sameAs: string[]
}

export interface IBlogPostingLd {
    '@context': 'https://schema.org'
    '@type': 'BlogPosting'
    headline: string
    description: string
    datePublished: string
    dateModified: string
    author: {
        '@type': 'Person'
        name: string
        url: string
    }
    url: string
    image?: string
}

export interface IBreadcrumbItem {
    name: string
    url: string
}

export interface IBreadcrumbListLd {
    '@context': 'https://schema.org'
    '@type': 'BreadcrumbList'
    itemListElement: {
        '@type': 'ListItem'
        position: number
        name: string
        item: string
    }[]
}

export interface IWebsiteLd {
    '@context': 'https://schema.org'
    '@type': 'WebSite'
    name: string
    url: string
    description: string
    author: {
        '@type': 'Person'
        name: string
        url: string
    }
    potentialAction: {
        '@type': 'SearchAction'
        target: {
            '@type': 'EntryPoint'
            urlTemplate: string
        }
        'query-input': string
    }
}
