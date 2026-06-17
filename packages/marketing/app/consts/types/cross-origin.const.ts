import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const CROSS_ORIGIN_TYPE_DOC: ITypeDoc = {
    slug: 'cross-origin',
    name: 'TCrossOrigin',
    kind: 'type',
    category: 'Media',
    descriptionKey: 'types.catalog.cross_origin.description',
    descriptionFallback: 'CORS mode for cross-origin media requests — mirrors the native crossorigin attribute on <img>, <video> and <audio> elements.',
    definition: `export type TCrossOrigin = \`\${CROSS_ORIGIN}\` | ''

// Where CROSS_ORIGIN is:
export enum CROSS_ORIGIN {
    ANONYMOUS        = 'anonymous',
    USE_CREDENTIALS  = 'use-credentials'
}`,
    values: [
        {
            value: '',
            descriptionKey: 'types.detail.cross_origin.empty',
            descriptionFallback: 'No CORS request is sent — the resource is fetched without credentials (equivalent to omitting the attribute).',
        },
        {
            value: 'anonymous',
            descriptionKey: 'types.detail.cross_origin.anonymous',
            descriptionFallback: 'CORS request sent without credentials (cookies, HTTP authentication). The server must respond with Access-Control-Allow-Origin: * or the requesting origin.',
        },
        {
            value: 'use-credentials',
            descriptionKey: 'types.detail.cross_origin.use_credentials',
            descriptionFallback: 'CORS request sent with credentials (cookies, client certificates). The server must respond with Access-Control-Allow-Credentials: true and a specific origin.',
        },
    ],
    usedBy: [
        { slug: 'img', name: 'Img', propName: 'crossorigin' },
        { slug: 'video', name: 'Video', propName: 'crossorigin' },
        { slug: 'audio', name: 'Audio', propName: 'crossorigin' },
    ],
    sourceFile: 'packages/ds/src/types/Img/img.type.ts',
    examples: [
        {
            titleKey: 'types.detail.cross_origin.example',
            titleFallback: 'Image loaded with anonymous CORS for canvas access',
            code: `<origam-img
  src="https://cdn.example.com/photo.jpg"
  crossorigin="anonymous"
  alt="Cross-origin photo"
/>`,
            lang: 'html',
        },
    ],
}
