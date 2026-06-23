import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_CLIENT_HEIGHT_UTIL_DOC: IUtilDoc = {
    slug: 'get-client-height',
    name: 'getClientHeight',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_client_height.description',
    descriptionFallback: 'Returns the viewport height (window.innerHeight) in a browser context, or the SSR-provided clientHeight fallback when running server-side.',
    signature: `function getClientHeight(ssr?: TSSROptions): number`,
    params: [
        {
            name: 'ssr',
            type: 'TSSROptions',
            required: false,
            descriptionKey: 'utils.detail.get_client_height.param_ssr',
            descriptionFallback: 'Optional SSR options object. When provided as an object with a clientHeight property, that value is returned instead of window.innerHeight.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_client_height.returns',
        descriptionFallback: 'The viewport height in pixels. Returns 0 when running server-side without an SSR options object.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/display.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_client_height.example_basic',
            titleFallback: 'Viewport height in browser vs SSR',
            code: `import { getClientHeight } from 'origam'

// In a browser
getClientHeight()          // → window.innerHeight (e.g. 768)

// During SSR with explicit dimensions
getClientHeight({ clientHeight: 800, clientWidth: 1280 })  // → 800`,
            lang: 'typescript',
        },
    ],
    related: ['get-client-width', 'get-client-size'],
}
