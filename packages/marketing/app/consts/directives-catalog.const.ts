import type { CSSProperties } from 'vue'

/**
 * Hero badge CSS vars — same pattern as roadmap/installation.
 */
export const DIRECTIVES_HERO_BADGE_VARS: CSSProperties = {
    '--origam-chip---background-color': 'transparent'
} as CSSProperties

/**
 * Flat catalog of the 6 origam directives.
 * Used on /directives/index.vue for cards + search.
 * Each entry links to /directives/{slug}.
 *
 * Sources verified against:
 *   packages/ds/src/directives/{ClickOutside,Contrast,Hover,Intersect,Ripple,Touch}/
 */
export interface IDirectiveCatalogEntry {
    /** kebab-case slug — URL segment: /directives/{slug} */
    slug: string
    /** Display name with v- prefix */
    name: string
    /** MDI icon */
    icon: string
    /** i18n key for the short description */
    descriptionKey: string
    /** Inline English fallback */
    descriptionFallback: string
}

export const DIRECTIVES_CATALOG: IDirectiveCatalogEntry[] = [
    {
        slug: 'click-outside',
        name: 'v-click-outside',
        icon: 'mdi-cursor-pointer',
        descriptionKey: 'directives.click_outside.description',
        descriptionFallback: 'Calls a handler when a click lands outside the bound element.'
    },
    {
        slug: 'contrast',
        name: 'v-contrast',
        icon: 'mdi-contrast-circle',
        descriptionKey: 'directives.contrast.description',
        descriptionFallback: 'Automatically adjusts foreground text colour to meet WCAG AA contrast ratio.'
    },
    {
        slug: 'hover',
        name: 'v-hover',
        icon: 'mdi-cursor-default-outline',
        descriptionKey: 'directives.hover.description',
        descriptionFallback: 'Toggles a CSS class on an element while the pointer is over it.'
    },
    {
        slug: 'intersect',
        name: 'v-intersect',
        icon: 'mdi-eye-outline',
        descriptionKey: 'directives.intersect.description',
        descriptionFallback: 'Wraps the IntersectionObserver API to fire a callback when the element enters or leaves the viewport.'
    },
    {
        slug: 'ripple',
        name: 'v-ripple',
        icon: 'mdi-target',
        descriptionKey: 'directives.ripple.description',
        descriptionFallback: 'Applies a Material-style ripple animation from the click position.'
    },
    {
        slug: 'touch',
        name: 'v-touch',
        icon: 'mdi-gesture-tap',
        descriptionKey: 'directives.touch.description',
        descriptionFallback: 'Attaches touch event listeners and recognises swipe gestures.'
    }
]
