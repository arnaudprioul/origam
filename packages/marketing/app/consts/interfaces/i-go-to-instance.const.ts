import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_GO_TO_INSTANCE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-go-to-instance',
    name: 'IGoToInstance',
    category: 'Navigation & Scroll',
    descriptionKey: 'interfaces.catalog.i_go_to_instance.description',
    descriptionFallback: 'Internal service instance for useGoTo() — carries the reactive RTL flag and the resolved options used for smooth-scroll calculations.',
    definition: `export interface IGoToInstance {
    rtl: Ref<boolean>
    options: IGoToOptions
}`,
    extends: [],
    props: [
        {
            name: 'rtl',
            type: 'Ref<boolean>',
            optional: false,
            descriptionFallback: 'Reactive right-to-left flag — when true, scroll direction is inverted for RTL layouts.',
        },
        {
            name: 'options',
            type: 'IGoToOptions',
            optional: false,
            descriptionFallback: 'Resolved configuration object for the scroll animation (container, duration, offset, easing, patterns).',
        },
    ],
    usedBy: [
        { slug: 'use-go-to', name: 'useGoTo', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/goTo.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_go_to_instance.example',
            titleFallback: 'Shape of the internal instance injected by createGoTo()',
            code: `import type { IGoToInstance } from 'origam'

// The instance is injected into components via the GoTo symbol
// and consumed by useGoTo() internally.
const instance: IGoToInstance = {
    rtl: ref(false),
    options: { container: window, duration: 300, layout: false, offset: 0, easing: 'linear', patterns: {} },
}`,
            lang: 'typescript',
        },
    ],
}
