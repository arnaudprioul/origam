import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SLIDE_GROUP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-slide-group-props',
    name: 'ISlideGroupProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_slide_group_props.description',
    descriptionFallback: 'Props contract for <OrigamSlideGroup> — a horizontally/vertically scrollable group with optional prev/next arrow navigation, active-slide centering, and the full design surface (border, padding, margin, rounded).',
    definition: `export interface ISlideGroupProps extends ICommonsComponentProps, ITagProps, IDirectionProps, IGroupProps, IPaddingProps, IMarginProps, IRoundedProps, IBorderProps, IDisplayProps {
    centerActive?: boolean
    nextIcon?: TIcon
    prevIcon?: TIcon
    showArrows?: boolean | string
}`,
    extends: [
        'ICommonsComponentProps', 'ITagProps', 'IDirectionProps', 'IGroupProps',
        'IPaddingProps', 'IMarginProps', 'IRoundedProps', 'IBorderProps', 'IDisplayProps',
    ],
    props: [
        { name: 'centerActive', type: 'boolean', optional: true, descriptionFallback: 'Automatically scrolls the container to keep the active slide centered in the viewport.' },
        { name: 'nextIcon', type: 'TIcon', optional: true, descriptionFallback: 'Custom icon for the "next" navigation arrow button.' },
        { name: 'prevIcon', type: 'TIcon', optional: true, descriptionFallback: 'Custom icon for the "previous" navigation arrow button.' },
        { name: 'showArrows', type: 'boolean | string', optional: true, descriptionFallback: 'Controls arrow visibility. Pass true to always show, false to always hide, or a string breakpoint to show only above it.' },
    ],
    usedBy: [
        { slug: 'slide-group', name: 'SlideGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Slide/slide-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_slide_group_props.example',
            titleFallback: 'SlideGroup with arrows and active centering',
            code: `<OrigamSlideGroup
    v-model="active"
    center-active
    show-arrows
>
    <OrigamSlide v-for="item in items" :key="item.id" :value="item.id">
        {{ item.label }}
    </OrigamSlide>
</OrigamSlideGroup>`,
            lang: 'vue',
        },
    ],
}
