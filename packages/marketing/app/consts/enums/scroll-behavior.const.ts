import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const SCROLL_BEHAVIOR_ENUM_DOC: IEnumDoc = {
    slug: 'scroll-behavior',
    name: 'SCROLL_BEHAVIOR',
    category: 'Behavior',
    descriptionKey: 'enums.catalog.scroll_behavior.description',
    descriptionFallback: 'TypeScript enum for Toolbar scroll behavior — hide, invert, collapse, elevate, or activate on scroll.',
    definition: `export enum SCROLL_BEHAVIOR {
    HIDE     = 'hide',
    INVERTED = 'inverted',
    COLLAPSE = 'collapse',
    ELEVATED = 'elevate',
    ACTIVE   = 'active',
}`,
    values: [
        { value: 'SCROLL_BEHAVIOR.HIDE', descriptionKey: 'enums.detail.scroll_behavior.hide', descriptionFallback: 'Toolbar slides out of view when the user scrolls down and reappears on scroll up.' },
        { value: 'SCROLL_BEHAVIOR.INVERTED', descriptionKey: 'enums.detail.scroll_behavior.inverted', descriptionFallback: 'Inverted hide — toolbar shows when scrolling down and hides when scrolling up.' },
        { value: 'SCROLL_BEHAVIOR.COLLAPSE', descriptionKey: 'enums.detail.scroll_behavior.collapse', descriptionFallback: 'Toolbar shrinks (collapses) its height as the user scrolls down.' },
        { value: 'SCROLL_BEHAVIOR.ELEVATED', descriptionKey: 'enums.detail.scroll_behavior.elevated', descriptionFallback: 'Toolbar gains an elevation shadow when the page is scrolled away from the top.' },
        { value: 'SCROLL_BEHAVIOR.ACTIVE', descriptionKey: 'enums.detail.scroll_behavior.active', descriptionFallback: 'Toolbar enters an active/highlighted state when the page is scrolled.' },
    ],
    usedBy: [
        { slug: 'app-bar', name: 'AppBar', propName: 'scrollBehavior' },
        { slug: 'toolbar', name: 'Toolbar', propName: 'scrollBehavior' },
    ],
    sourceFile: 'packages/ds/src/enums/Toolbar/toolbar.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.scroll_behavior.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { SCROLL_BEHAVIOR } from 'origam'

const behavior: SCROLL_BEHAVIOR = SCROLL_BEHAVIOR.HIDE`,
            lang: 'typescript',
        },
    ],
}
