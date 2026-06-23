import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_CLIENT_WIDTH_UTIL_DOC: IUtilDoc = {
    slug: 'get-client-width',
    name: 'getClientWidth',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_client_width.description',
    descriptionFallback: 'Returns the viewport width (window.innerWidth) in a browser context, or the SSR-provided clientWidth fallback when running server-side.',
    signature: `function getClientWidth(ssr?: TSSROptions): number`,
    params: [
        {
            name: 'ssr',
            type: 'TSSROptions',
            required: false,
            descriptionKey: 'utils.detail.get_client_width.param_ssr',
            descriptionFallback: 'Optional SSR options object. When provided as an object with a clientWidth property, that value is returned instead of window.innerWidth.',
        },
    ],
    returns: {
        type: 'number',
        descriptionKey: 'utils.detail.get_client_width.returns',
        descriptionFallback: 'The viewport width in pixels. Returns 0 when running server-side without an SSR options object.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/display.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_client_width.example_basic',
            titleFallback: 'Viewport width in browser vs SSR',
            code: `import { getClientWidth } from 'origam'

// In a browser
getClientWidth()           // → window.innerWidth (e.g. 1440)

// During SSR with explicit dimensions
getClientWidth({ clientHeight: 800, clientWidth: 1280 })   // → 1280`,
            lang: 'typescript',
        },
    ],
    related: ['get-client-height', 'get-client-size'],
}
