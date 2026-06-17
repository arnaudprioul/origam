import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const HANDLERS_CONST_DOC: IConstDoc = {
    slug: 'handlers',
    name: 'HANDLERS',
    category: 'Internals',
    descriptionKey: 'consts.catalog.handlers.description',
    descriptionFallback: 'WeakMap used internally by bindProps to track active event listeners per HTMLElement. Allows the directive to cleanly unbind handlers without leaking references when elements are removed from the DOM.',
    definition: `export const HANDLERS = new WeakMap<HTMLElement, Set<[string, () => void]>>()`,
    value: 'new WeakMap<HTMLElement, Set<[string, () => void]>>()',
    usedBy: [
        { name: 'useBindProps' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/bindProps.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.handlers.example',
            titleFallback: 'Internal WeakMap usage (informational)',
            code: `// Internal use only — do not import directly in consumer code.
import { HANDLERS } from 'origam'

// Register a listener for an element
const set = HANDLERS.get(el) ?? new Set()
set.add([eventName, handler])
HANDLERS.set(el, set)`,
            lang: 'typescript',
        },
    ],
}
