import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_GO_TO_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-go-to-key',
    name: 'ORIGAM_GO_TO_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_go_to_key.description',
    descriptionFallback: 'Vue provide/inject symbol that carries the IGoToInstance (programmatic scroll-to helper) provided by the origam plugin and consumed by useGoTo() and scroll-sensitive components such as OrigamScrollObserver.',
    definition: `export const ORIGAM_GO_TO_KEY: InjectionKey<IGoToInstance> = Symbol.for('origam:goto')`,
    value: "Symbol.for('origam:goto')",
    usedBy: [
        { name: 'useGoTo' },
        { name: 'OrigamScrollObserver', slug: 'scroll-observer' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/goTo.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_go_to_key.example',
            titleFallback: 'Smooth-scrolling to an element with useGoTo',
            code: `import { useGoTo } from 'origam'

const goTo = useGoTo()
goTo('#section-features', { duration: 400, easing: 'easeInOutCubic' })`,
            lang: 'typescript',
        },
    ],
}
