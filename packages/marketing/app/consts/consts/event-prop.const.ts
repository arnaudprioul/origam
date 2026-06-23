import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const EVENT_PROP_CONST_DOC: IConstDoc = {
    slug: 'event-prop',
    name: 'EVENT_PROP',
    category: 'Composables & Internals',
    descriptionKey: 'consts.catalog.event_prop.description',
    descriptionFallback: 'Generic factory that returns a Vue PropType descriptor accepting either a Function or an Array of functions, typed as TEventProp<T>. Used on components that need to expose a callback prop (e.g. onClick, onInput).',
    definition: `export const EVENT_PROP = <T extends Array<any> = Array<any>>() =>
    [Function as PropType<(e: Event, ...args: T) => void>, Array] as PropType<TEventProp<T>>`,
    usedBy: [
        { name: 'OrigamBtn', slug: 'btn' },
        { name: 'OrigamInput', slug: 'input' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/commons.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.event_prop.example',
            titleFallback: 'Declaring an event prop on a component',
            code: `import { EVENT_PROP } from 'origam'

// In a component's props definition
const props = defineProps({
  onClick: EVENT_PROP<[MouseEvent]>()
})`,
            lang: 'typescript',
        },
    ],
}
