import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const TRANSITION_TYPE_DOC: ITypeDoc = {
    slug: 'transition',
    name: 'TTransitionMode',
    kind: 'type',
    category: 'Animation & Motion',
    descriptionKey: 'types.catalog.transition.description',
    descriptionFallback: 'Controls the sequencing of enter and leave transitions when the content inside OrigamTransition changes.',
    definition: `export type TTransitionMode = \`\${TRANSITION_MODE}\`

// Where TRANSITION_MODE is:
export enum TRANSITION_MODE {
    IN_OUT  = 'in-out',
    OUT_IN  = 'out-in',
    DEFAULT = 'default'
}`,
    values: [
        {
            value: 'in-out',
            descriptionKey: 'types.detail.transition.in_out',
            descriptionFallback: 'The new element transitions IN first, then the leaving element transitions OUT. Useful when content should appear before the old content disappears.',
        },
        {
            value: 'out-in',
            descriptionKey: 'types.detail.transition.out_in',
            descriptionFallback: 'The leaving element transitions OUT first, then the new element transitions IN. The most common mode for page-level route transitions.',
        },
        {
            value: 'default',
            descriptionKey: 'types.detail.transition.default',
            descriptionFallback: 'Enter and leave transitions run simultaneously. Matches Vue\'s native <Transition> default behaviour.',
        },
    ],
    usedBy: [
        { slug: 'transition', name: 'Transition', propName: 'mode' },
    ],
    sourceFile: 'packages/ds/src/enums/Transition/transition.enum.ts',
    examples: [
        {
            titleKey: 'types.detail.transition.example',
            titleFallback: 'Out-in mode for a route-level swap',
            code: `<origam-transition name="fade" mode="out-in">
  <component :is="activeView" :key="activeView" />
</origam-transition>`,
            lang: 'html',
        },
    ],
}
