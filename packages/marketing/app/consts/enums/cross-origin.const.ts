import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const CROSS_ORIGIN_ENUM_DOC: IEnumDoc = {
    slug: 'cross-origin',
    name: 'CROSS_ORIGIN',
    category: 'Media',
    descriptionKey: 'enums.catalog.cross_origin.description',
    descriptionFallback: 'Maps to the crossorigin HTML attribute for media elements (img, video, audio). Controls CORS credential behaviour when fetching the resource.',
    definition: `export enum CROSS_ORIGIN {
    ANONYMOUS       = 'anonymous',
    USE_CREDENTIALS = 'use-credentials',
}`,
    values: [
        {
            value: 'CROSS_ORIGIN.ANONYMOUS',
            descriptionKey: 'enums.detail.cross_origin.anonymous',
            descriptionFallback: 'Sends a CORS request without credentials (cookies, certificates).',
        },
        {
            value: 'CROSS_ORIGIN.USE_CREDENTIALS',
            descriptionKey: 'enums.detail.cross_origin.use_credentials',
            descriptionFallback: 'Sends a CORS request including credentials (cookies, client certificates).',
        },
    ],
    usedBy: [
        { slug: 'img', name: 'Img', propName: 'crossOrigin' },
        { slug: 'video', name: 'Video', propName: 'crossOrigin' },
        { slug: 'audio', name: 'Audio', propName: 'crossOrigin' },
    ],
    sourceFile: 'packages/ds/src/enums/Img/img.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.cross_origin.example',
            titleFallback: 'Loading an image from a CDN with CORS',
            code: `<origam-img :cross-origin="CROSS_ORIGIN.ANONYMOUS" src="https://cdn.example.com/photo.jpg" />`,
            lang: 'vue',
        },
    ],
}
