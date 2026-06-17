import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SCROLL_ARGUMENTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-scroll-arguments',
    name: 'IScrollArguments',
    category: 'Scroll',
    descriptionKey: 'interfaces.catalog.i_scroll_arguments.description',
    descriptionFallback: 'Arguments bag passed into scroll-behaviour handler functions. Provides a reactive ref indicating whether the target element can currently scroll, allowing behaviours to guard against no-op updates.',
    definition: `export interface IScrollArguments {
    canScroll?: Readonly<Ref<boolean>>
}`,
    extends: [],
    props: [
        { name: 'canScroll', type: 'Readonly<Ref<boolean>>', optional: true, descriptionFallback: 'Reactive flag set to true when the scroll target has scrollable overflow. Behaviours should read this before mutating layout.' },
    ],
    usedBy: [
        { slug: 'use-scroll', name: 'useScroll', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/scroll.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_scroll_arguments.example',
            titleFallback: 'Using IScrollArguments in a custom scroll behaviour',
            code: `import type { IScrollArguments } from 'origam'

function myBehaviour({ canScroll }: IScrollArguments) {
    if (!canScroll?.value) return
    // apply layout change
}`,
            lang: 'typescript',
        },
    ],
}
