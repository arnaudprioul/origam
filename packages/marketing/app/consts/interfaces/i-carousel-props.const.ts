import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_CAROUSEL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-carousel-props',
    name: 'ICarouselProps',
    category: 'Carousel',
    descriptionKey: 'interfaces.catalog.i_carousel_props.description',
    descriptionFallback: 'Props for OrigamCarousel — extends IWindowProps (slide management), IColorProps, IBgColorProps, IDimensionProps, IHoverProps, IActiveProps, ICommonsComponentProps and ITagProps, with carousel-specific controls for auto-cycle, delimiter icons and progress bar.',
    definition: `export interface ICarouselProps extends IWindowProps, IColorProps, IBgColorProps, ICommonsComponentProps, ITagProps, IDimensionProps, IHoverProps, IActiveProps {
    cycle?: boolean
    delimiterIcon?: TIcon
    hideDelimiters?: boolean
    hideDelimiterBackground?: boolean
    interval?: number | string
    progress?: boolean
    verticalDelimiters?: boolean | TInline
}`,
    extends: ['IWindowProps', 'IColorProps', 'IBgColorProps', 'ICommonsComponentProps', 'ITagProps', 'IDimensionProps', 'IHoverProps', 'IActiveProps'],
    props: [
        { name: 'cycle', type: 'boolean', optional: true, descriptionFallback: 'Automatically advance slides on a timer.' },
        { name: 'delimiterIcon', type: 'TIcon', optional: true, descriptionFallback: 'Icon rendered for each slide delimiter dot.' },
        { name: 'hideDelimiters', type: 'boolean', optional: true, descriptionFallback: 'Hide the slide position delimiter dots.' },
        { name: 'hideDelimiterBackground', type: 'boolean', optional: true, descriptionFallback: 'Remove the translucent background behind the delimiter dots.' },
        { name: 'interval', type: 'number | string', optional: true, descriptionFallback: 'Auto-cycle interval in milliseconds. Only effective when cycle is true. Default 6000.' },
        { name: 'progress', type: 'boolean', optional: true, descriptionFallback: 'Show a thin linear progress bar below the carousel that tracks cycle countdown.' },
        { name: 'verticalDelimiters', type: 'boolean | TInline', optional: true, descriptionFallback: 'Render delimiter dots on the left or right side instead of at the bottom.' },
    ],
    usedBy: [
        { slug: 'carousel', name: 'OrigamCarousel', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Carousel/carousel.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_carousel_props.example',
            titleFallback: 'Auto-cycling carousel with progress bar',
            code: `<OrigamCarousel
    cycle
    :interval="4000"
    progress
    height="400"
    color="primary"
>
    <OrigamCarouselItem src="/img/slide-1.webp" cover />
    <OrigamCarouselItem src="/img/slide-2.webp" cover />
</OrigamCarousel>`,
            lang: 'vue',
        },
    ],
}
