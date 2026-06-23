import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_TOOLTIP_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-tooltip-emits',
    name: 'ITooltipEmits',
    category: 'Component Emits',
    descriptionKey: 'interfaces.catalog.i_tooltip_emits.description',
    descriptionFallback: 'Emits fired by <OrigamTooltip>. Extends ICommonsComponentEmits — inherits the standard component event surface including v-model open-state binding.',
    definition: `export interface ITooltipEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'tooltip', name: 'Tooltip', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Tooltip/tooltip.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_tooltip_emits.example',
            titleFallback: 'Listening to tooltip open/close via v-model',
            code: `<OrigamTooltip v-model="isOpen" text="Hello world">
    <template #activator="{ props }">
        <OrigamBtn v-bind="props">Hover me</OrigamBtn>
    </template>
</OrigamTooltip>`,
            lang: 'vue',
        },
    ],
}
