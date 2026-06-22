import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CAROUSEL_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-carousel-emits',
    name: 'ICarouselEmits',
    category: 'Carousel',
    descriptionKey: 'interfaces.catalog.i_carousel_emits.description',
    descriptionFallback: 'Emit signatures fired by OrigamCarousel — inherited from ICommonsComponentEmits (v-model on the active slide index).',
    definition: `export interface ICarouselEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'carousel', name: 'OrigamCarousel', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Carousel/carousel.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_carousel_emits.example',
            titleFallback: 'v-model on the active slide index',
            code: `<OrigamCarousel v-model="activeSlide" @update:model-value="onSlideChange" />`,
            lang: 'vue',
        },
    ],
}
