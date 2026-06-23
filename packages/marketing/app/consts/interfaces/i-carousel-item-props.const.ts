import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CAROUSEL_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-carousel-item-props',
    name: 'ICarouselItemProps',
    category: 'Carousel',
    descriptionKey: 'interfaces.catalog.i_carousel_item_props.description',
    descriptionFallback: 'Props for OrigamCarouselItem — extends IImgProps (src, alt, cover, aspect-ratio, eager) and IWindowItemProps (value, disabled, eager transition), plus a transition override.',
    definition: `export interface ICarouselItemProps extends IImgProps, IWindowItemProps {
    transition?: boolean | string
}`,
    extends: ['IImgProps', 'IWindowItemProps'],
    props: [
        { name: 'transition', type: 'boolean | string', optional: true, descriptionFallback: 'Override the slide transition. Pass false to disable, or a CSS transition name to customise. Default is inherited from OrigamCarousel.' },
    ],
    usedBy: [
        { slug: 'carousel-item', name: 'OrigamCarouselItem', kind: 'component' },
        { slug: 'carousel', name: 'OrigamCarousel', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Carousel/carousel-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_carousel_item_props.example',
            titleFallback: 'Carousel item with image and custom transition',
            code: `<OrigamCarousel>
    <OrigamCarouselItem
        src="/img/slide-1.webp"
        alt="Product launch"
        cover
        transition="fade"
    />
    <OrigamCarouselItem
        src="/img/slide-2.webp"
        alt="Team photo"
        cover
    />
</OrigamCarousel>`,
            lang: 'vue',
        },
    ],
}
