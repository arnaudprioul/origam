import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const BUBBLING_EVENTS_CONST_DOC: IConstDoc = {
    slug: 'bubbling-events',
    name: 'BUBBLING_EVENTS',
    category: 'Events & Interaction',
    descriptionKey: 'consts.catalog.bubbling_events.description',
    descriptionFallback: 'Array of all DOM event handler prop names that bubble. Used by OrigamInput-family components to forward only bubbling events to the inner native element, avoiding duplication on the root wrapper.',
    definition: `export const BUBBLING_EVENTS = [
    'onAfterscriptexecute',
    'onAnimationcancel',
    'onAnimationend',
    // … 50+ event names (see source for full list)
    'onWheel'
]`,
    values: [
        { value: "'onAnimationstart'", descriptionKey: 'consts.detail.bubbling_events.animation_start', descriptionFallback: 'CSS animation start.' },
        { value: "'onChange'", descriptionKey: 'consts.detail.bubbling_events.change', descriptionFallback: 'Form field change.' },
        { value: "'onClick'", descriptionKey: 'consts.detail.bubbling_events.click', descriptionFallback: 'Mouse click — primary pointer interaction.' },
        { value: "'onInput'", descriptionKey: 'consts.detail.bubbling_events.input', descriptionFallback: 'Input value changed.' },
        { value: "'onKeydown'", descriptionKey: 'consts.detail.bubbling_events.keydown', descriptionFallback: 'Key pressed down.' },
        { value: "'onWheel'", descriptionKey: 'consts.detail.bubbling_events.wheel', descriptionFallback: 'Mouse wheel / trackpad scroll.' },
    ],
    usedBy: [
        { name: 'OrigamInput', slug: 'input' },
        { name: 'OrigamTextField', slug: 'text-field' },
        { name: 'OrigamSelect', slug: 'select' },
    ],
    sourceFile: 'packages/ds/src/consts/Input/input.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.bubbling_events.example',
            titleFallback: 'Filtering attrs to forward only bubbling events',
            code: `import { BUBBLING_EVENTS } from 'origam'

const forwardedAttrs = Object.fromEntries(
  Object.entries(attrs).filter(([k]) => BUBBLING_EVENTS.includes(k))
)`,
            lang: 'typescript',
        },
    ],
}
