import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_WINDOW_PROVIDE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-window-provide',
    name: 'IWindowProvide',
    category: 'State & Interaction',
    descriptionKey: 'interfaces.catalog.i_window_provide.description',
    descriptionFallback: 'Internal provide contract injected by <OrigamWindow> into its WindowItem children — exposes the active transition name, slide count, height, direction and root ref for coordinated animations.',
    definition: `export interface IWindowProvide {
    transition: ComputedRef<undefined | string>
    transitionCount: Ref<number>
    transitionHeight: Ref<undefined | string>
    isReversed: Ref<boolean>
    rootRef: Ref<HTMLElement | undefined>
}`,
    extends: [],
    props: [
        { name: 'transition', type: 'ComputedRef<undefined | string>', optional: false, descriptionFallback: 'Computed transition name currently in use, derived from the active slide direction and parent props.' },
        { name: 'transitionCount', type: 'Ref<number>', optional: false, descriptionFallback: 'Running count of slide transitions; used to key animations and prevent stale transitions.' },
        { name: 'transitionHeight', type: 'Ref<undefined | string>', optional: false, descriptionFallback: 'Height of the active slide (CSS string or undefined) used to animate the container height during transitions.' },
        { name: 'isReversed', type: 'Ref<boolean>', optional: false, descriptionFallback: 'Whether the current navigation direction is reversed — drives the transition enter/leave direction on child items.' },
        { name: 'rootRef', type: 'Ref<HTMLElement | undefined>', optional: false, descriptionFallback: 'Template ref to the Window root element; used by items to measure container dimensions.' },
    ],
    usedBy: [
        { slug: 'window', name: 'Window', kind: 'component' },
        { slug: 'window-item', name: 'WindowItem', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Window/window.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_window_provide.example',
            titleFallback: 'Consuming the provided context in a custom WindowItem',
            code: `import { inject } from 'vue'
import type { IWindowProvide } from 'origam'

const windowCtx = inject<IWindowProvide>('window')
const isReversed = windowCtx?.isReversed`,
            lang: 'typescript',
        },
    ],
}
