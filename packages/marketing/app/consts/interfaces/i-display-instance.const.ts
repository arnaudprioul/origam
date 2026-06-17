import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_DISPLAY_INSTANCE_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-display-instance',
    name: 'IDisplayInstance',
    category: 'Display & Responsive',
    descriptionKey: 'interfaces.catalog.i_display_instance.description',
    descriptionFallback: 'Reactive display service — the object returned by useDisplay(). Exposes reactive breakpoint flags, current viewport dimensions, platform detection and an update() method for manual refresh.',
    definition: `export interface IDisplayInstance {
    xs: Ref<boolean>
    sm: Ref<boolean>
    md: Ref<boolean>
    lg: Ref<boolean>
    xl: Ref<boolean>
    xxl: Ref<boolean>
    smAndUp: Ref<boolean>
    mdAndUp: Ref<boolean>
    lgAndUp: Ref<boolean>
    xlAndUp: Ref<boolean>
    smAndDown: Ref<boolean>
    mdAndDown: Ref<boolean>
    lgAndDown: Ref<boolean>
    xlAndDown: Ref<boolean>
    name: Ref<TBreakpoint>
    height: Ref<number>
    width: Ref<number>
    mobile: Ref<boolean>
    mobileBreakpoint: Ref<number | TBreakpoint>
    platform: Ref<IDisplayPlatform>
    thresholds: Ref<TDisplayThresholds>
    ssr: boolean
    update(): void
}`,
    extends: [],
    props: [
        { name: 'xs', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when the viewport is in the xs range.' },
        { name: 'sm', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when the viewport is in the sm range.' },
        { name: 'md', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when the viewport is in the md range.' },
        { name: 'lg', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when the viewport is in the lg range.' },
        { name: 'xl', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when the viewport is in the xl range.' },
        { name: 'xxl', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when the viewport is in the xxl range.' },
        { name: 'smAndUp', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when viewport width >= sm threshold.' },
        { name: 'mdAndUp', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when viewport width >= md threshold.' },
        { name: 'lgAndUp', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when viewport width >= lg threshold.' },
        { name: 'xlAndUp', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when viewport width >= xl threshold.' },
        { name: 'smAndDown', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when viewport width < md threshold.' },
        { name: 'mdAndDown', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when viewport width < lg threshold.' },
        { name: 'lgAndDown', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when viewport width < xl threshold.' },
        { name: 'xlAndDown', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when viewport width < xxl threshold.' },
        { name: 'name', type: 'Ref<TBreakpoint>', optional: false, descriptionFallback: 'Current active breakpoint name (xs | sm | md | lg | xl | xxl).' },
        { name: 'height', type: 'Ref<number>', optional: false, descriptionFallback: 'Reactive viewport height in pixels.' },
        { name: 'width', type: 'Ref<number>', optional: false, descriptionFallback: 'Reactive viewport width in pixels.' },
        { name: 'mobile', type: 'Ref<boolean>', optional: false, descriptionFallback: 'True when the current breakpoint is at or below the configured mobileBreakpoint.' },
        { name: 'mobileBreakpoint', type: 'Ref<number | TBreakpoint>', optional: false, descriptionFallback: 'Active mobile breakpoint value (reactive).' },
        { name: 'platform', type: 'Ref<IDisplayPlatform>', optional: false, descriptionFallback: 'Reactive platform detection snapshot.' },
        { name: 'thresholds', type: 'Ref<TDisplayThresholds>', optional: false, descriptionFallback: 'Reactive named breakpoint thresholds in pixels.' },
        { name: 'ssr', type: 'boolean', optional: false, descriptionFallback: 'Static flag indicating server-side rendering context (non-reactive).' },
        { name: 'update', type: '() => void', optional: false, descriptionFallback: 'Manually trigger a re-evaluation of all reactive breakpoint flags.' },
    ],
    usedBy: [
        { slug: 'use-display', name: 'useDisplay', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/display.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_display_instance.example',
            titleFallback: 'Consuming the display instance in a component',
            code: `import { useDisplay } from 'origam'

const { mobile, mdAndUp, name, platform } = useDisplay()

// mobile.value === true on small screens
// name.value === 'md' on medium screens`,
            lang: 'typescript',
        },
    ],
}
