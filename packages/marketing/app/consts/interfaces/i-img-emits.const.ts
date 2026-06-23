import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_IMG_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-img-emits',
    name: 'IImgEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_img_emits.description',
    descriptionFallback: 'Emit contract for OrigamImg — mirrors the native <img> lifecycle: loadstart fires before the network request, load when fully decoded, error when the browser gives up.',
    definition: `export interface IImgEmits {
    (e: 'loadstart', value: { src: string }): void
    (e: 'load', value: { src: string }): void
    (e: 'error', value: { src: string }): void
}`,
    extends: [],
    props: [
        { name: 'loadstart', type: "(e: 'loadstart', value: { src: string }) => void", optional: false, descriptionFallback: 'Fired before the network request is initiated, with the resolved src.' },
        { name: 'load', type: "(e: 'load', value: { src: string }) => void", optional: false, descriptionFallback: 'Fired when the image resource is fully decoded and ready to display.' },
        { name: 'error', type: "(e: 'error', value: { src: string }) => void", optional: false, descriptionFallback: 'Fired when the browser cannot load or decode the image.' },
    ],
    usedBy: [
        { slug: 'img', name: 'Img', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Img/img.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_img_emits.example',
            titleFallback: 'Handling image load and error events',
            code: `<OrigamImg
    src="/hero.jpg"
    alt="Hero image"
    @load="({ src }) => console.log('loaded', src)"
    @error="({ src }) => console.warn('failed', src)"
/>`,
            lang: 'vue',
        },
    ],
}
