import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const DEFER_UTIL_DOC: IUtilDoc = {
    slug: 'defer',
    name: 'defer',
    category: 'Commons',
    icon: 'mdi-timer-outline',
    descriptionKey: 'utils.catalog.defer.description',
    descriptionFallback: 'Schedules a callback after a given timeout (ms) using window.setTimeout in the browser. When called during SSR or with timeout = 0, the callback runs synchronously. Returns a cancel function.',
    signature: `function defer(timeout: number, cb: () => void): () => void`,
    params: [
        {
            name: 'timeout',
            type: 'number',
            required: true,
            descriptionKey: 'utils.detail.defer.param_timeout',
            descriptionFallback: 'Delay in milliseconds before the callback is invoked. Pass 0 to run synchronously.',
        },
        {
            name: 'cb',
            type: '() => void',
            required: true,
            descriptionKey: 'utils.detail.defer.param_cb',
            descriptionFallback: 'The function to call after the timeout.',
        },
    ],
    returns: {
        type: '() => void',
        descriptionKey: 'utils.detail.defer.returns',
        descriptionFallback: 'A cancel function. Calling it clears the pending timeout so the callback is never invoked.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.defer.example_basic',
            titleFallback: 'Delayed execution with cancel',
            code: `import { defer } from 'origam'

const cancel = defer(300, () => console.log('fired'))

// Later, if you changed your mind:
cancel() // clears the timeout, callback never runs`,
            lang: 'typescript',
        },
    ],
    related: ['event-name'],
}
