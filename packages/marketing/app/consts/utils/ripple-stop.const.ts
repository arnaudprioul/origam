import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const RIPPLE_STOP_UTIL_DOC: IUtilDoc = {
    slug: 'ripple-stop',
    name: 'rippleStop',
    category: 'Commons',
    icon: 'mdi-gesture-tap',
    descriptionKey: 'utils.catalog.ripple_stop.description',
    descriptionFallback: 'Set the internal stop-propagation flag on a ripple event so that nested elements do not also spawn a ripple for the same interaction.',
    signature: `function rippleStop(e: TRippleEvent): void`,
    params: [
        {
            name: 'e',
            type: 'TRippleEvent',
            required: true,
            descriptionKey: 'utils.detail.ripple_stop.param_e',
            descriptionFallback: 'The event to mark as stopped. Any subsequent rippleShow call that reads this event will bail out immediately.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.ripple_stop.returns',
        descriptionFallback: 'No return value. Works via a side-effect on the event object.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/ripple.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.ripple_stop.example_basic',
            titleFallback: 'Prevent ripple bubbling from a child element',
            code: `import { rippleStop } from 'origam'

// Inside a nested interactive element
el.addEventListener('mousedown', (e) => {
  rippleStop(e)   // parent's rippleShow will see the flag and skip
})`,
            lang: 'typescript',
        },
    ],
    related: ['ripple-show', 'ripple-transform'],
}
