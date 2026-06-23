import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const REQUEST_NEW_FRAME_UTIL_DOC: IUtilDoc = {
    slug: 'request-new-frame',
    name: 'requestNewFrame',
    category: 'Commons',
    icon: 'mdi-timer-sand',
    descriptionKey: 'utils.catalog.request_new_frame.description',
    descriptionFallback: 'Schedule a callback to run in its own animation frame, isolated from other frame tasks. Heavy work is queued so each callback gets a fresh frame, preventing jank when multiple tasks pile up.',
    signature: `function requestNewFrame(cb: () => void): void`,
    params: [
        {
            name: 'cb',
            type: '() => void',
            required: true,
            descriptionKey: 'utils.detail.request_new_frame.param_cb',
            descriptionFallback: 'The callback to schedule. It runs alone in its own animation frame to avoid competing with other frame work.',
        },
    ],
    returns: {
        type: 'void',
        descriptionKey: 'utils.detail.request_new_frame.returns',
        descriptionFallback: 'No return value. The callback is queued and executed asynchronously.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/requestNewFrame.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.request_new_frame.example_basic',
            titleFallback: 'Isolate a DOM measurement to its own frame',
            code: `import { requestNewFrame } from 'origam'

requestNewFrame(() => {
  // heavy layout read — runs alone without competing
  const height = el.getBoundingClientRect().height
  console.log(height)
})`,
            lang: 'typescript',
        },
    ],
    related: ['reposition-scroll-strategy', 'animate', 'debounce'],
}
