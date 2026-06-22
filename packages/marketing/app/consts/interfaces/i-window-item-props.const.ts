import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_WINDOW_ITEM_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-window-item-props',
    name: 'IWindowItemProps',
    category: 'Layout & Structure',
    descriptionKey: 'interfaces.catalog.i_window_item_props.description',
    descriptionFallback: 'Props contract for <OrigamWindowItem> — a single slide in a Window carousel. Supports lazy loading, group selection, and per-item transition overrides.',
    definition: `export interface IWindowItemProps extends ICommonsComponentProps, ILazyProps, IGroupItemProps, ITransitionComponentProps {
    transition?: boolean | string
    reverseTransition?: boolean | string
}`,
    extends: ['ICommonsComponentProps', 'ILazyProps', 'IGroupItemProps', 'ITransitionComponentProps'],
    props: [
        { name: 'transition', type: 'boolean | string', optional: true, descriptionFallback: 'Transition name applied when this item enters. Pass false to disable the enter transition.' },
        { name: 'reverseTransition', type: 'boolean | string', optional: true, descriptionFallback: 'Transition name applied when this item leaves in reverse direction. Pass false to disable.' },
    ],
    usedBy: [
        { slug: 'window-item', name: 'WindowItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Window/window-item.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_window_item_props.example',
            titleFallback: 'Custom per-item transitions',
            code: `<OrigamWindow v-model="active">
  <OrigamWindowItem transition="slide-x-transition" reverse-transition="slide-x-reverse-transition">
    <img src="slide1.jpg" alt="Slide 1" />
  </OrigamWindowItem>
  <OrigamWindowItem :transition="false">
    <img src="slide2.jpg" alt="Slide 2 (no transition)" />
  </OrigamWindowItem>
</OrigamWindow>`,
            lang: 'html',
        },
    ],
}
