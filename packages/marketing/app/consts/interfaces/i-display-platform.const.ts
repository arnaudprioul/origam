import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DISPLAY_PLATFORM_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-display-platform',
    name: 'IDisplayPlatform',
    category: 'Display & Responsive',
    descriptionKey: 'interfaces.catalog.i_display_platform.description',
    descriptionFallback: 'Platform detection snapshot — a set of boolean flags that identify the current runtime environment (OS, browser, form factor). Exposed as `platform` on the IDisplayInstance reactive object.',
    definition: `export interface IDisplayPlatform {
    android: boolean
    ios: boolean
    cordova: boolean
    electron: boolean
    chrome: boolean
    edge: boolean
    firefox: boolean
    opera: boolean
    win: boolean
    mac: boolean
    linux: boolean
    touch: boolean
    ssr: boolean
}`,
    extends: [],
    props: [
        { name: 'android', type: 'boolean', optional: false, descriptionFallback: 'True when the UA suggests an Android device.' },
        { name: 'ios', type: 'boolean', optional: false, descriptionFallback: 'True when the UA suggests an iOS device.' },
        { name: 'cordova', type: 'boolean', optional: false, descriptionFallback: 'True when running inside a Cordova/Capacitor shell.' },
        { name: 'electron', type: 'boolean', optional: false, descriptionFallback: 'True when running inside Electron.' },
        { name: 'chrome', type: 'boolean', optional: false, descriptionFallback: 'True when the UA is Chromium-based.' },
        { name: 'edge', type: 'boolean', optional: false, descriptionFallback: 'True when the UA is Microsoft Edge.' },
        { name: 'firefox', type: 'boolean', optional: false, descriptionFallback: 'True when the UA is Firefox.' },
        { name: 'opera', type: 'boolean', optional: false, descriptionFallback: 'True when the UA is Opera.' },
        { name: 'win', type: 'boolean', optional: false, descriptionFallback: 'True when the OS is Windows.' },
        { name: 'mac', type: 'boolean', optional: false, descriptionFallback: 'True when the OS is macOS.' },
        { name: 'linux', type: 'boolean', optional: false, descriptionFallback: 'True when the OS is Linux (non-Android).' },
        { name: 'touch', type: 'boolean', optional: false, descriptionFallback: 'True when a primary touch input is detected.' },
        { name: 'ssr', type: 'boolean', optional: false, descriptionFallback: 'True when the code runs in a server-side rendering context.' },
    ],
    usedBy: [
        { slug: 'use-display', name: 'useDisplay', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/display.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_display_platform.example',
            titleFallback: 'Reading platform flags from useDisplay()',
            code: `import { useDisplay } from 'origam'

const { platform } = useDisplay()

if (platform.value.ios) {
    // iOS-specific behaviour
}`,
            lang: 'typescript',
        },
    ],
}
