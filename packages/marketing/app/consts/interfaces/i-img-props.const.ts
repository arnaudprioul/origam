import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_IMG_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-img-props',
    name: 'IImgProps',
    category: 'Media',
    descriptionKey: 'interfaces.catalog.i_img_props.description',
    descriptionFallback: 'Props contract for OrigamImg — covers source, lazy loading, responsive sizes, gradient overlays, cross-origin policy, and transition configuration.',
    definition: `export interface IImgProps extends IColorProps, IBgColorProps, IResponsiveProps, ITransitionComponentProps, ILazyProps {
    alt?: string
    cover?: boolean
    draggable?: boolean
    gradient?: string
    lazySrc?: string
    options?: IIntersectionObserverInit
    sizes?: string
    src?: string | ISrcObject
    crossorigin?: TCrossOrigin
    referrerpolicy?: TReferrerPolicy
    srcset?: string
    position?: string
}`,
    extends: ['IColorProps', 'IBgColorProps', 'IResponsiveProps', 'ITransitionComponentProps', 'ILazyProps'],
    props: [
        { name: 'alt', type: 'string', optional: true, descriptionFallback: 'Alternative text for the image (required for a11y).' },
        { name: 'cover', type: 'boolean', optional: true, descriptionFallback: 'Apply object-fit: cover to fill the container without letterboxing.' },
        { name: 'draggable', type: 'boolean', optional: true, descriptionFallback: 'Whether the image is draggable.' },
        { name: 'gradient', type: 'string', optional: true, descriptionFallback: 'CSS gradient string applied as an overlay on top of the image.' },
        { name: 'lazySrc', type: 'string', optional: true, descriptionFallback: 'Low-resolution placeholder shown while the real src is loading.' },
        { name: 'options', type: 'IIntersectionObserverInit', optional: true, descriptionFallback: 'IntersectionObserver options for the lazy-load trigger.' },
        { name: 'sizes', type: 'string', optional: true, descriptionFallback: 'HTML sizes attribute for responsive image selection.' },
        { name: 'src', type: 'string | ISrcObject', optional: true, descriptionFallback: 'Image source. Accepts a URL string or an ISrcObject with srcset and lazySrc.' },
        { name: 'crossorigin', type: 'TCrossOrigin', optional: true, descriptionFallback: 'CORS setting for the image request (anonymous or use-credentials).' },
        { name: 'referrerpolicy', type: 'TReferrerPolicy', optional: true, descriptionFallback: 'Referrer policy sent with the image request.' },
        { name: 'srcset', type: 'string', optional: true, descriptionFallback: 'HTML srcset attribute for responsive image selection.' },
        { name: 'position', type: 'string', optional: true, descriptionFallback: 'CSS object-position value (e.g. "top center").' },
    ],
    usedBy: [
        { slug: 'img', name: 'Img', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Img/img.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_img_props.example',
            titleFallback: 'Responsive lazy image with a gradient overlay',
            code: `<OrigamImg
    src="/hero.jpg"
    lazy-src="/hero-thumb.jpg"
    cover
    gradient="to top, rgba(0,0,0,.6), transparent"
    alt="Landscape"
    sizes="(max-width: 600px) 100vw, 50vw"
/>`,
            lang: 'vue',
        },
    ],
}
