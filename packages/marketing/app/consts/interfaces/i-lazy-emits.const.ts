import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LAZY_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-lazy-emits',
    name: 'ILazyEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_lazy_emits.description',
    descriptionFallback: 'Emits contract for OrigamLazy — extends ICommonsComponentEmits. The v-model update fires when the IntersectionObserver flips visibility.',
    definition: `export interface ILazyEmits extends ICommonsComponentEmits {}`,
    extends: ['ICommonsComponentEmits'],
    props: [],
    usedBy: [
        { slug: 'lazy', name: 'Lazy', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/lazy.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_lazy_emits.example',
            titleFallback: 'Listening to the v-model update',
            code: `<OrigamLazy v-model="isVisible" @update:model-value="onVisible">
    <OrigamImg src="/asset.webp" />
</OrigamLazy>`,
            lang: 'html',
        },
    ],
}
