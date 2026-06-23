import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_LAYOUT_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-layout-provide',
    name: 'ILayoutProvide',
    category: 'Layout & Sizing',
    descriptionKey: 'interfaces.catalog.i_layout_provide.description',
    descriptionFallback: 'Internal provide/inject contract exposed by OrigamLayout to its registered layout items — do not use directly in application code.',
    definition: `export interface ILayoutProvide {
    register: (
        vm: ComponentInternalInstance,
        options: {
            id: string
            order: Ref<number>
            position: Ref<TDirectionBoth>
            layoutSize: Ref<number | string>
            elementSize: Ref<number | string | undefined>
            active: Ref<boolean>
            disableTransitions?: Ref<boolean>
            absolute: Ref<boolean | undefined>
        }
    ) => {
        layoutItemStyles: Ref<CSSProperties>
        layoutItemScrimStyles: Ref<CSSProperties>
        zIndex: Ref<number>
    }
    unregister: (id: string) => void
    mainRect: Ref<ILayer>
    mainStyles: Ref<CSSProperties>
    getLayoutItem: (id: string) => ILayerItem | undefined
    items: Ref<Array<ILayerItem>>
    layoutRect: Ref<DOMRectReadOnly | undefined>
    rootZIndex: Ref<number>
    layoutId: ComputedRef<string>
}`,
    extends: [],
    props: [
        {
            name: 'register',
            type: '(vm: ComponentInternalInstance, options: {...}) => { layoutItemStyles, layoutItemScrimStyles, zIndex }',
            optional: false,
            descriptionFallback: 'Called by useLayoutItem to register a new docked item and receive reactive style refs.',
        },
        {
            name: 'unregister',
            type: '(id: string) => void',
            optional: false,
            descriptionFallback: 'Removes a previously registered item from the layout.',
        },
        {
            name: 'mainRect',
            type: 'Ref<ILayer>',
            optional: false,
            descriptionFallback: 'Reactive bounding-box of the main content area after all items have claimed their space.',
        },
        {
            name: 'mainStyles',
            type: 'Ref<CSSProperties>',
            optional: false,
            descriptionFallback: 'Computed CSS properties applied to the main content slot (padding offsets derived from registered items).',
        },
        {
            name: 'getLayoutItem',
            type: '(id: string) => ILayerItem | undefined',
            optional: false,
            descriptionFallback: 'Retrieves the ILayerItem record for the given item id.',
        },
        {
            name: 'items',
            type: 'Ref<Array<ILayerItem>>',
            optional: false,
            descriptionFallback: 'Reactive list of all currently registered layout items.',
        },
        {
            name: 'layoutRect',
            type: 'Ref<DOMRectReadOnly | undefined>',
            optional: false,
            descriptionFallback: 'DOMRect of the layout root element, updated by a ResizeObserver.',
        },
        {
            name: 'rootZIndex',
            type: 'Ref<number>',
            optional: false,
            descriptionFallback: 'Base z-index from which layout item z-indices are calculated.',
        },
        {
            name: 'layoutId',
            type: 'ComputedRef<string>',
            optional: false,
            descriptionFallback: 'Unique id of the layout instance, used to scope CSS properties.',
        },
    ],
    usedBy: [
        { slug: 'layout', name: 'Layout', kind: 'component' },
        { slug: 'use-layout', name: 'useLayout', kind: 'composable' },
        { slug: 'use-layout-item', name: 'useLayoutItem', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/layout.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_layout_provide.example',
            titleFallback: 'Injecting the layout context in a custom layout item',
            code: `import { inject } from 'vue'
import { LAYOUT_KEY } from 'origam'
import type { ILayoutProvide } from 'origam'

const layout = inject<ILayoutProvide>(LAYOUT_KEY)
// layout.register(vm, { id, order, position, ... })`,
            lang: 'typescript',
        },
    ],
}
