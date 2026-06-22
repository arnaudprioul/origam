import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SLIDE_GROUP_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-slide-group-emits',
    name: 'ISlideGroupEmits',
    category: 'Component Emits',
    descriptionKey: 'interfaces.catalog.i_slide_group_emits.description',
    descriptionFallback: 'Emits contract for <OrigamSlideGroup> — extends ICommonsComponentEmits (update:modelValue for the active slide index).',
    definition: `export interface ISlideGroupEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'slide-group', name: 'SlideGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Slide/slide-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_slide_group_emits.example',
            titleFallback: 'Listening to the active-slide change',
            code: `<OrigamSlideGroup v-model="active" @update:model-value="onSlideChange" />`,
            lang: 'vue',
        },
    ],
}
