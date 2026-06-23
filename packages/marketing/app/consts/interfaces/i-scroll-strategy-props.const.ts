import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SCROLL_STRATEGY_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-scroll-strategy-props',
    name: 'IScrollStrategyProps',
    category: 'Scroll',
    descriptionKey: 'interfaces.catalog.i_scroll_strategy_props.description',
    descriptionFallback: 'Overlay scroll-strategy props. Extended by Overlay, Tooltip and related components to let consumers choose how the floating panel reacts when the page or its ancestor container scrolls.',
    definition: `export interface IScrollStrategyProps {
    scrollStrategy?: TScrollStrategy | TScrollStrategyFn
    contained?: boolean
}`,
    extends: [],
    props: [
        { name: 'scrollStrategy', type: 'TScrollStrategy | TScrollStrategyFn', optional: true, descriptionFallback: 'Named strategy (block, close, none, reposition) or a custom TScrollStrategyFn callback that receives IScrollStrategyData.' },
        { name: 'contained', type: 'boolean', optional: true, descriptionFallback: 'When true, the overlay is positioned inside its scroll container rather than the document root, so the positioning engine observes the container scroll instead.' },
    ],
    usedBy: [
        { slug: 'overlay', name: 'Overlay', kind: 'component' },
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
        { slug: 'use-scroll', name: 'useScroll', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/scroll.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_scroll_strategy_props.example',
            titleFallback: 'Configuring scroll strategy on a Tooltip',
            code: `<OrigamTooltip scroll-strategy="close" :contained="true">
    <template #activator="{ props }">
        <OrigamBtn v-bind="props">Hover me</OrigamBtn>
    </template>
    Tooltip content
</OrigamTooltip>`,
            lang: 'html',
        },
    ],
}
