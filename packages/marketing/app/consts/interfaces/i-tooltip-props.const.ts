import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TOOLTIP_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-tooltip-props',
    name: 'ITooltipProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_tooltip_props.description',
    descriptionFallback: 'Full props contract for <OrigamTooltip>. Floating text label anchored to an activator element, with configurable positioning, transition, scroll strategy, lazy rendering, and the full color/dimension surface.',
    definition: `export interface ITooltipProps extends ICommonsComponentProps, IOverlayProps, IColorProps, IBgColorProps, IDimensionProps, IActivatorProps, ILocationStrategyProps, IScrollStrategyProps, ILazyProps, ITransitionComponentProps, IScrimProps {
    id?: string
    text?: string
}`,
    extends: [
        'ICommonsComponentProps', 'IOverlayProps', 'IColorProps', 'IBgColorProps',
        'IDimensionProps', 'IActivatorProps', 'ILocationStrategyProps',
        'IScrollStrategyProps', 'ILazyProps', 'ITransitionComponentProps', 'IScrimProps',
    ],
    props: [
        { name: 'id', type: 'string', optional: true, descriptionFallback: 'Override the auto-generated DOM id for the tooltip panel. Used when you need a stable aria-describedby reference.' },
        { name: 'text', type: 'string', optional: true, descriptionFallback: 'Tooltip label text. Shorthand for the default slot when only plain text is needed.' },
    ],
    usedBy: [
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Tooltip/tooltip.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_tooltip_props.example',
            titleFallback: 'Tooltip with custom placement and color',
            code: `<OrigamTooltip
    text="Delete this item"
    location="top"
    bg-color="danger"
>
    <template #activator="{ props }">
        <OrigamBtn v-bind="props" icon="mdi-delete" />
    </template>
</OrigamTooltip>`,
            lang: 'vue',
        },
    ],
}
