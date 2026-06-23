import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_WINDOW_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-window-emits',
    name: 'IWindowEmits',
    category: 'State & Interaction',
    descriptionKey: 'interfaces.catalog.i_window_emits.description',
    descriptionFallback: 'Emits contract for <OrigamWindow> — inherits the v-model update and commons lifecycle events from ICommonsComponentEmits.',
    definition: `export interface IWindowEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'window', name: 'Window', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Window/window.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_window_emits.example',
            titleFallback: 'Listening to slide changes via v-model',
            code: `<OrigamWindow v-model="activeSlide" @update:model-value="onSlideChange">
  <OrigamWindowItem v-for="item in slides" :key="item.id">
    {{ item.content }}
  </OrigamWindowItem>
</OrigamWindow>`,
            lang: 'html',
        },
    ],
}
