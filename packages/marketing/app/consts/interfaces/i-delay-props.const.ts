import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DELAY_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-delay-props',
    name: 'IDelayProps',
    category: 'Behavior',
    descriptionKey: 'interfaces.catalog.i_delay_props.description',
    descriptionFallback: 'Open/close delay contract for hover-activated components (Tooltip, Menu, …). Values are in milliseconds; strings are coerced to numbers.',
    definition: `export interface IDelayProps {
    closeDelay?: number | string
    openDelay?: number | string
}`,
    extends: [],
    props: [
        { name: 'closeDelay', type: 'number | string', optional: true, descriptionFallback: 'Time in milliseconds to wait before closing the component after the trigger condition is no longer met.' },
        { name: 'openDelay', type: 'number | string', optional: true, descriptionFallback: 'Time in milliseconds to wait before opening the component once the trigger condition is met.' },
    ],
    usedBy: [
        { slug: 'activator', name: 'IActivatorProps', kind: 'composable' },
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
        { slug: 'menu', name: 'Menu', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/delay.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_delay_props.example',
            titleFallback: 'Using delay props on a Tooltip',
            code: `<origam-tooltip :open-delay="300" :close-delay="100">
    <template #activator="{ props }">
        <origam-btn v-bind="props">Hover me</origam-btn>
    </template>
    Tooltip content
</origam-tooltip>`,
            lang: 'html',
        },
    ],
}
