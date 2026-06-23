import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_COUNTER_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-counter-props',
    name: 'ICounterProps',
    category: 'Component Props',
    descriptionKey: 'interfaces.catalog.i_counter_props.description',
    descriptionFallback: 'Full props contract for <OrigamCounter> — a numeric badge that clamps to a max value, with the full design surface (color, border, spacing, elevation, density, rounded, transition).',
    definition: `export interface ICounterProps extends ICommonsComponentProps, ITagProps, IPaddingProps, IMarginProps, IBorderProps, IRoundedProps, IColorProps, IElevationProps, IDensityProps, ITransitionComponentProps {
    active?: boolean
    disabled?: boolean
    max?: string | number
    value?: string | number
}`,
    extends: [
        'ICommonsComponentProps', 'ITagProps', 'IPaddingProps', 'IMarginProps',
        'IBorderProps', 'IRoundedProps', 'IColorProps', 'IElevationProps',
        'IDensityProps', 'ITransitionComponentProps',
    ],
    props: [
        { name: 'active', type: 'boolean', optional: true, descriptionFallback: 'When true the counter is visible. When false it is hidden.' },
        { name: 'disabled', type: 'boolean', optional: true, descriptionFallback: 'Disables the counter, muting its interactive appearance.' },
        { name: 'max', type: 'string | number', optional: true, descriptionFallback: 'Maximum displayable value. When `value` exceeds `max`, the counter displays `{max}+`.' },
        { name: 'value', type: 'string | number', optional: true, descriptionFallback: 'Numeric value to display inside the counter badge.' },
    ],
    usedBy: [
        { slug: 'counter', name: 'Counter', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Counter/counter.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_counter_props.example',
            titleFallback: 'Counter with a max cap',
            code: `<OrigamCounter :value="42" :max="99" color="primary" active />`,
            lang: 'vue',
        },
    ],
}
