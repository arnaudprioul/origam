import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const GET_PLATFORM_UTIL_DOC: IUtilDoc = {
    slug: 'get-platform',
    name: 'getPlatform',
    category: 'Commons',
    icon: 'mdi-function-variant',
    descriptionKey: 'utils.catalog.get_platform.description',
    descriptionFallback: 'Detects the current runtime environment by reading the browser user-agent and returns a typed IDisplayPlatform object with boolean flags for each platform/browser.',
    signature: `function getPlatform(ssr?: TSSROptions): IDisplayPlatform`,
    params: [
        {
            name: 'ssr',
            type: 'TSSROptions',
            required: false,
            descriptionKey: 'utils.detail.get_platform.param_ssr',
            descriptionFallback: 'SSR configuration object. When provided (and truthy), the user-agent is forced to "ssr" so all flags are false. Use this in SSR environments to avoid window access.',
        },
    ],
    returns: {
        type: 'IDisplayPlatform',
        descriptionKey: 'utils.detail.get_platform.returns',
        descriptionFallback: 'An IDisplayPlatform object containing boolean flags: android, ios, cordova, electron, chrome, edge, firefox, opera, win, mac, ssr, and touch.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/display.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.get_platform.example_basic',
            titleFallback: 'Detect platform and apply conditional behaviour',
            code: `import { getPlatform } from 'origam'

const platform = getPlatform()

if (platform.ios) {
  // Apply iOS-specific scroll fix
}
if (platform.mac) {
  // Use Cmd key shortcut label
}`,
            lang: 'typescript',
        },
    ],
    related: ['get-scroll-parent'],
}
