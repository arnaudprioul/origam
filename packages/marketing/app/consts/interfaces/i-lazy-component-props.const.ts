import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LAZY_COMPONENT_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-lazy-component-props',
    name: 'ILazyComponentProps',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_lazy_component_props.description',
    descriptionFallback: 'Props for OrigamLazy — extends the common, dimension, tag and transition contracts with IntersectionObserver options and a v-model visibility toggle.',
    definition: `export interface ILazyComponentProps
    extends ICommonsComponentProps,
            IDimensionProps,
            ITagProps,
            ITransitionComponentProps {
    modelValue?: boolean
    options?: IntersectionObserverInit
}`,
    extends: ['ICommonsComponentProps', 'IDimensionProps', 'ITagProps', 'ITransitionComponentProps'],
    props: [
        {
            name: 'modelValue',
            type: 'boolean',
            optional: true,
            descriptionFallback: 'Controlled visibility — when provided, overrides intersection-based visibility.',
        },
        {
            name: 'options',
            type: 'IntersectionObserverInit',
            optional: true,
            descriptionFallback: 'Native IntersectionObserver options: root, rootMargin, threshold.',
        },
    ],
    usedBy: [
        { slug: 'lazy', name: 'Lazy', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/lazy.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_lazy_component_props.example',
            titleFallback: 'Lazy-loading an image below the fold',
            code: `<OrigamLazy
    :options="{ rootMargin: '200px', threshold: 0 }"
    min-height="200"
>
    <OrigamImg src="/below-fold.webp" />
</OrigamLazy>`,
            lang: 'html',
        },
    ],
}
