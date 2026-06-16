import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const TRANSITION_MODE_TYPE_DOC: ITypeDoc = {
    slug: 'transition-mode',
    name: 'TTransitionMode',
    kind: 'type',
    category: 'Animation & Transition',
    descriptionKey: 'types.catalog.transition_mode.description',
    descriptionFallback: 'Vue transition mode: in-out, out-in, or default (simultaneous).',
    definition: `export type TTransitionMode = \`\${TRANSITION_MODE}\`

// Where TRANSITION_MODE is:
export enum TRANSITION_MODE {
    IN_OUT  = 'in-out',
    OUT_IN  = 'out-in',
    DEFAULT = 'default'
}`,
    values: [
        { value: 'in-out', descriptionKey: 'types.detail.transition_mode.in_out', descriptionFallback: 'New element transitions in first, then old element transitions out.' },
        { value: 'out-in', descriptionKey: 'types.detail.transition_mode.out_in', descriptionFallback: 'Old element transitions out first, then new element transitions in.' },
        { value: 'default', descriptionKey: 'types.detail.transition_mode.default', descriptionFallback: 'Simultaneous — both transitions run at the same time (Vue default).' },
    ],
    usedBy: [
        { slug: 'window', name: 'Window', propName: 'mode' },
        { slug: 'tabs', name: 'Tabs', propName: 'transitionMode' },
    ],
    sourceFile: 'packages/ds/src/types/Transition/transition.type.ts',
    examples: [
        {
            titleKey: 'types.detail.transition_mode.example',
            titleFallback: 'Window with out-in transition',
            code: `<origam-window mode="out-in">
  <origam-window-item value="1">Step 1</origam-window-item>
  <origam-window-item value="2">Step 2</origam-window-item>
</origam-window>`,
            lang: 'html',
        },
    ],
}
