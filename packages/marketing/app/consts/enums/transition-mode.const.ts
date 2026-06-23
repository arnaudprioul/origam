import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const TRANSITION_MODE_ENUM_DOC: IEnumDoc = {
    slug: 'transition-mode',
    name: 'TRANSITION_MODE',
    category: 'Animation & Transitions',
    descriptionKey: 'enums.catalog.transition_mode.description',
    descriptionFallback: 'TypeScript enum for the Vue transition mode — in-out, out-in, or default (simultaneous).',
    definition: `export enum TRANSITION_MODE {
    IN_OUT  = 'in-out',
    OUT_IN  = 'out-in',
    DEFAULT = 'default',
}`,
    values: [
        { value: 'TRANSITION_MODE.IN_OUT', descriptionKey: 'enums.detail.transition_mode.in_out', descriptionFallback: 'New element transitions in first, then the current element transitions out.' },
        { value: 'TRANSITION_MODE.OUT_IN', descriptionKey: 'enums.detail.transition_mode.out_in', descriptionFallback: 'Current element transitions out first, then the new element transitions in.' },
        { value: 'TRANSITION_MODE.DEFAULT', descriptionKey: 'enums.detail.transition_mode.default', descriptionFallback: 'Both enter and leave transitions happen simultaneously (Vue default).' },
    ],
    usedBy: [
        { slug: 'expand-y', name: 'ExpandY', propName: 'mode' },
        { slug: 'expand-x', name: 'ExpandX', propName: 'mode' },
        { slug: 'translate-scale', name: 'TranslateScale', propName: 'mode' },
        { slug: 'number-field', name: 'NumberField', propName: 'transitionMode' },
        { slug: 'field', name: 'Field', propName: 'transitionMode' },
    ],
    sourceFile: 'packages/ds/src/enums/Transition/transition.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.transition_mode.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { TRANSITION_MODE } from 'origam'

const mode: TRANSITION_MODE = TRANSITION_MODE.OUT_IN`,
            lang: 'typescript',
        },
    ],
}
