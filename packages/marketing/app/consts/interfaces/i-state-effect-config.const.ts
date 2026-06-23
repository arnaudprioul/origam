import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_STATE_EFFECT_CONFIG_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-state-effect-config',
    name: 'IStateEffectConfig',
    category: 'Behaviour',
    descriptionKey: 'interfaces.catalog.i_state_effect_config.description',
    descriptionFallback: 'Shared shape for state-aware visual overrides (hover, active). When passed as an object to the hover or active prop, its keys override the corresponding resting props only while the state is engaged.',
    definition: `export interface IStateEffectConfig {
    enabled?: boolean
    color?: TColor
    bgColor?: TColor
    border?: IBorderProps['border']
    rounded?: IRoundedProps['rounded']
    elevation?: IElevationProps['elevation']
    padding?: IPaddingProps['padding']
    margin?: IMarginProps['margin']
    gap?: boolean | number | string
}`,
    extends: [],
    props: [
        { name: 'enabled', type: 'boolean', optional: true, descriptionFallback: 'Force the state on regardless of mouse / pointer events. Useful for controlled hover toggled by parent state.' },
        { name: 'color', type: 'TColor', optional: true, descriptionFallback: 'Foreground (text / icon) colour override while the state is engaged.' },
        { name: 'bgColor', type: 'TColor', optional: true, descriptionFallback: 'Surface background colour override while the state is engaged.' },
        { name: 'border', type: "IBorderProps['border']", optional: true, descriptionFallback: 'Border width / style / direction override while the state is engaged.' },
        { name: 'rounded', type: "IRoundedProps['rounded']", optional: true, descriptionFallback: 'Corner radius override while the state is engaged.' },
        { name: 'elevation', type: "IElevationProps['elevation']", optional: true, descriptionFallback: 'Box-shadow elevation override while the state is engaged.' },
        { name: 'padding', type: "IPaddingProps['padding']", optional: true, descriptionFallback: 'Padding scalar override while the state is engaged. Per-axis padding is not supported in state overrides.' },
        { name: 'margin', type: "IMarginProps['margin']", optional: true, descriptionFallback: 'Margin scalar override while the state is engaged.' },
        { name: 'gap', type: 'boolean | number | string', optional: true, descriptionFallback: 'Flex/grid gap override while the state is engaged. Consumed by components that expose a gap prop.' },
    ],
    usedBy: [
        { slug: 'use-state-effect', name: 'useStateEffect', kind: 'composable' },
        { slug: 'card', name: 'Card', kind: 'component' },
        { slug: 'btn', name: 'Btn', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/state-effect.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_state_effect_config.example',
            titleFallback: 'Using hover and active overrides on OrigamCard',
            code: `<OrigamCard
    bg-color="primary"
    :hover="{ bgColor: 'success', border: 'thick', rounded: 'lg' }"
    :active="{ bgColor: 'danger', elevation: 'md' }"
/>`,
            lang: 'html',
        },
    ],
}
