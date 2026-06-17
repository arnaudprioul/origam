import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_SCROLL_PROPS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-scroll-props',
    name: 'IScrollProps',
    category: 'Scroll',
    descriptionKey: 'interfaces.catalog.i_scroll_props.description',
    descriptionFallback: 'Scroll-aware behaviour props for AppBar and similar layout components. Declares the scroll target, threshold and a space-separated list of behaviours (hide, collapse, elevate, fade-image, inverted).',
    definition: `export interface IScrollProps {
    scrollBehavior?: TScrollBehavior | (string & {})
    scrollTarget?: string
    scrollThreshold?: string | number
}`,
    extends: [],
    props: [
        { name: 'scrollBehavior', type: 'TScrollBehavior | (string & {})', optional: true, descriptionFallback: 'Space-separated list of scroll behaviours, e.g. "hide inverted" or "elevate active". The inverted modifier flips the trigger direction for hide / collapse / elevate and does nothing on its own.' },
        { name: 'scrollTarget', type: 'string', optional: true, descriptionFallback: 'CSS selector or element ID of the scroll container to observe. Defaults to the nearest scrollable ancestor when omitted.' },
        { name: 'scrollThreshold', type: 'string | number', optional: true, descriptionFallback: 'Scroll distance (in pixels) the target must travel before the behaviour activates. Accepts a number or a CSS length string.' },
    ],
    usedBy: [
        { slug: 'app-bar', name: 'AppBar', kind: 'component' },
        { slug: 'use-scroll', name: 'useScroll', kind: 'composable' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Commons/scroll.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_scroll_props.example',
            titleFallback: 'AppBar hiding on scroll with a threshold',
            code: `<OrigamAppBar
    scroll-behavior="hide inverted"
    scroll-target="#main-content"
    :scroll-threshold="100"
/>`,
            lang: 'html',
        },
    ],
}
