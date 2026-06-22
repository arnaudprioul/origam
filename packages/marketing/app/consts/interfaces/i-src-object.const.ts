import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SRC_OBJECT_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-src-object',
    name: 'ISrcObject',
    category: 'Data Shapes',
    descriptionKey: 'interfaces.catalog.i_src_object.description',
    descriptionFallback: 'Structured image source descriptor for <OrigamImg>. Allows passing src, srcset, lazySrc, aspectRatio and alt as a single object to the src prop instead of individual attributes.',
    definition: `export interface ISrcObject {
    src?: string
    srcset?: string
    lazySrc?: string
    aspectRatio: number
    alt?: string
}`,
    extends: [],
    props: [
        { name: 'src', type: 'string', optional: true, descriptionFallback: 'The primary image URL.' },
        { name: 'srcset', type: 'string', optional: true, descriptionFallback: 'Responsive srcset string for the image.' },
        { name: 'lazySrc', type: 'string', optional: true, descriptionFallback: 'Low-quality placeholder image URL shown while the main src loads.' },
        { name: 'aspectRatio', type: 'number', optional: false, descriptionFallback: 'Intrinsic aspect ratio (width / height). Required to reserve layout space before the image loads.' },
        { name: 'alt', type: 'string', optional: true, descriptionFallback: 'Alt text for the image. Forwarded to the underlying <img> element.' },
    ],
    usedBy: [
        { slug: 'img', name: 'Img', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Img/img.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_src_object.example',
            titleFallback: 'Passing an ISrcObject to OrigamImg',
            code: `import type { ISrcObject } from 'origam'

const image: ISrcObject = {
    src: '/hero.jpg',
    srcset: '/hero@2x.jpg 2x',
    lazySrc: '/hero-blur.jpg',
    aspectRatio: 16 / 9,
    alt: 'Hero banner',
}`,
            lang: 'typescript',
        },
    ],
}
