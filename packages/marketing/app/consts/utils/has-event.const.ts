import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const HAS_EVENT_UTIL_DOC: IUtilDoc = {
    slug: 'has-event',
    name: 'hasEvent',
    category: 'Commons',
    icon: 'mdi-bell-check-outline',
    descriptionKey: 'utils.catalog.has_event.description',
    descriptionFallback: 'Checks whether a Vue component props object contains a listener for a given event name, covering all Vue 3 listener modifier variants: plain, Once, Capture, OnceCapture, and CaptureOnce.',
    signature: `function hasEvent(
  props: Record<string, any>,
  name: string
): boolean`,
    params: [
        {
            name: 'props',
            type: 'Record<string, any>',
            required: true,
            descriptionKey: 'utils.detail.has_event.param_props',
            descriptionFallback: 'The component props object (as received by the component). Vue 3 stores listeners as onXxx keys.',
        },
        {
            name: 'name',
            type: 'string',
            required: true,
            descriptionKey: 'utils.detail.has_event.param_name',
            descriptionFallback: 'The event name in camelCase without the "on" prefix (e.g. "click", "update:modelValue").',
        },
    ],
    returns: {
        type: 'boolean',
        descriptionKey: 'utils.detail.has_event.returns',
        descriptionFallback: 'true when at least one listener variant for the event is present in props.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.has_event.example_basic',
            titleFallback: 'Guard a side effect on listener presence',
            code: `import { hasEvent } from 'origam'

// Inside a component
if (hasEvent(props, 'click')) {
  // A parent has bound @click — proceed to emit
}`,
            lang: 'typescript',
        },
    ],
    related: ['has', 'get-uid'],
}
