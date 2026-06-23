/**
 * /components/overlay-scrim — full documentation data for OrigamOverlayScrim.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Overlay/overlay-scrim.interface.ts  (props)
 *   - packages/ds/src/components/Overlay/OrigamOverlayScrim.vue      (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/overlay-scrim.json                (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const OVERLAY_SCRIM_DOC: IComponentDoc = {
    slug: 'overlay-scrim',
    name: 'OverlayScrim',
    tag: 'origam-overlay-scrim',
    icon: 'mdi-blur',
    category: 'Layout',
    descriptionKey: 'components.catalog.overlay_scrim.description',
    descriptionFallback: 'Full-viewport backdrop that dims content behind a dialog, drawer or menu. Supports click-to-close and custom background color.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-overlay-scrim--design',
    docUrl: 'http://localhost:4000/components/Overlay/OrigamOverlayScrim',

    family: [
        {
            slug: 'overlay',
            name: 'Overlay',
            descriptionKey: 'components.catalog.overlay.description',
            descriptionFallback: 'Positioning layer that combines a scrim, a content panel and scroll-lock.'
        }
    ],

    parentSlug: 'overlay',

    related: [
        {
            slug: 'dialog',
            name: 'Dialog',
            kind: 'component',
            descriptionKey: 'components.overlay_scrim.related.dialog.description',
            descriptionFallback: 'Dialog uses OverlayScrim as its backdrop.'
        },
        {
            slug: 'drawer',
            name: 'Drawer',
            kind: 'component',
            descriptionKey: 'components.overlay_scrim.related.drawer.description',
            descriptionFallback: 'Drawer uses OverlayScrim to dim the page when open.'
        }
    ],

    props: [
        {
            name: 'active',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.overlay_scrim.props.active.description',
            descriptionFallback: 'Shows or hides the scrim. When false, the element is removed from the DOM (v-if).'
        },
        {
            name: 'scrim',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.overlay_scrim.props.scrim.description',
            descriptionFallback: 'When a string, used as the background-color via useBackgroundColor. When boolean, toggles the scrim visibility. False disables the scrim.'
        },
        {
            name: 'transition',
            type: { label: 'TTransitionProps', slug: 'transition', kind: 'type' },
            defaultValue: 'OrigamFade',
            descriptionKey: 'components.overlay_scrim.props.transition.description',
            descriptionFallback: 'Transition component or config applied around the scrim. Defaults to OrigamFade.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.overlay_scrim.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root.'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: { label: 'Event', slug: '', kind: 'primitive' },
            descriptionKey: 'components.overlay_scrim.emits.click.description',
            descriptionFallback: 'Fired when the scrim is clicked. Typically used to close the parent overlay.'
        },
        {
            event: 'mouseenter',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.overlay_scrim.emits.mouseenter.description',
            descriptionFallback: 'Fired when the pointer enters the scrim surface.'
        },
        {
            event: 'mouseleave',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.overlay_scrim.emits.mouseleave.description',
            descriptionFallback: 'Fired when the pointer leaves the scrim surface.'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.overlay_scrim.examples.basic.title',
            titleFallback: 'Basic scrim',
            lang: 'vue',
            code: `<template>
  <origam-btn @click="open = true">Open</origam-btn>
  <origam-overlay-scrim
    :active="open"
    @click="open = false"
  />
</template>

<script setup lang="ts">
import { ref } from 'vue'
const open = ref(false)
</script>`
        },
        {
            titleKey: 'components.overlay_scrim.examples.custom_color.title',
            titleFallback: 'Custom scrim color',
            lang: 'vue',
            code: `<template>
  <origam-overlay-scrim
    :active="true"
    scrim="rgba(0, 0, 128, 0.5)"
  />
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-scrim',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamOverlayScrim',
        svgDesc: 'Schematic of the OverlayScrim component — a single fixed-position overlay element.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #f8f9fa)" rx="4"/>
  <rect x="28" y="20" width="644" height="160" rx="4" fill="rgba(0,0,0,0.32)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="350" y="108" font-size="12" fill="#fff" text-anchor="middle" font-family="'JetBrains Mono',monospace" opacity="0.8">position: fixed · inset: 0 · opacity: 0.32</text>
  <circle cx="36" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="32.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <line x1="46" y1="28" x2="80" y2="14" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="13" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-scrim</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-overlay-scrim&gt;</code> — a single <code>div.origam-scrim</code> positioned <code>fixed</code> with <code>inset: 0</code>. Wrapped in an <code>&lt;origam-transition&gt;</code> (OrigamFade by default).`,
        legend: [
            {
                num: 1,
                cls: '.origam-scrim',
                descriptionKey: 'components.overlay_scrim.anatomy.root',
                descriptionFallback: 'Root element. <code>position: fixed; inset: 0; opacity: 0.32</code>. Conditionally rendered via <code>v-if="active"</code> wrapped in <code>&lt;origam-transition&gt;</code>. Has <code>aria-hidden="true"</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- OrigamTransition wraps for enter/leave animation -->
<origam-transition :transition="transition">
  <div
    v-if="active"
    class="origam-scrim"
    aria-hidden="true"
    @click="emit('click', $event)"
    @mouseenter="emit('mouseenter', $event)"
    @mouseleave="emit('mouseleave', $event)"
  />
</origam-transition>`,
        classes: [
            {
                cls: 'origam-scrim',
                descriptionKey: 'components.overlay_scrim.anatomy.root',
                descriptionFallback: 'Root element. Fixed, full-viewport, semi-transparent backdrop. background-color driven by scrim prop or --origam-overlay-scrim---background-color.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-overlay-scrim---background-color',
            defaultValue: '{color.overlay.scrim}',
            descriptionKey: 'components.overlay_scrim.css_vars.background_color',
            descriptionFallback: 'Scrim background color. Aliased to color.overlay.scrim. Overridden inline when scrim prop is a color string.'
        },
        {
            name: '--origam-overlay-scrim---opacity',
            defaultValue: '0.32',
            descriptionKey: 'components.overlay_scrim.css_vars.opacity',
            descriptionFallback: 'Opacity of the backdrop. 0.32 matches Material Design spec.'
        },
        {
            name: '--origam-overlay-scrim---pointer-events',
            defaultValue: 'auto',
            descriptionKey: 'components.overlay_scrim.css_vars.pointer_events',
            descriptionFallback: 'Pointer event handling. Set to none to make the scrim click-through.'
        },
        {
            name: '--origam-overlay-scrim---transition-duration',
            defaultValue: '{motion.duration.medium}',
            descriptionKey: 'components.overlay_scrim.css_vars.transition_duration',
            descriptionFallback: 'Duration of the opacity transition on enter/leave.'
        },
        {
            name: '--origam-overlay-scrim---transition-timing-function',
            defaultValue: '{motion.easing.standard}',
            descriptionKey: 'components.overlay_scrim.css_vars.transition_timing_function',
            descriptionFallback: 'Easing function for the opacity transition.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.overlay_scrim.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.overlay_scrim.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.overlay_scrim.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.overlay_scrim.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.overlay_scrim.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.overlay_scrim.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Escape',
                actionKey: 'components.overlay_scrim.a11y.key_escape',
                actionFallback: 'Conventionally closes the parent overlay (handled by the parent, not the scrim itself).'
            }
        ],
        notes: [
            {
                noteKey: 'components.overlay_scrim.a11y.aria_hidden_note',
                noteFallback: 'The scrim element always carries aria-hidden="true" — it is purely decorative. Screen readers skip it entirely.'
            },
            {
                noteKey: 'components.overlay_scrim.a11y.click_note',
                noteFallback: 'Click events are forwarded to the parent overlay which is responsible for closing and restoring focus.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/overlay-scrim.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'overlay-scrim.background-color',
                value: '{color.overlay.scrim}',
                type: 'color',
                descriptionKey: 'components.overlay_scrim.tokens.background_color',
                descriptionFallback: 'Scrim background. References color.overlay.scrim semantic token.'
            },
            {
                tokenPath: 'overlay-scrim.opacity',
                value: '{opacity.32}',
                type: 'number',
                descriptionKey: 'components.overlay_scrim.tokens.opacity',
                descriptionFallback: 'Default opacity (0.32).'
            },
            {
                tokenPath: 'overlay-scrim.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.overlay_scrim.tokens.transition_duration',
                descriptionFallback: 'Duration of the opacity fade animation.'
            },
            {
                tokenPath: 'overlay-scrim.position',
                value: 'fixed',
                type: 'other',
                descriptionKey: 'components.overlay_scrim.tokens.position',
                descriptionFallback: 'Positioning strategy — always fixed to cover the viewport.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'active',
                kind: 'switch',
                labelKey: 'components.overlay_scrim.playground.active',
                labelFallback: 'Active',
                defaultValue: true
            },
            {
                prop: 'scrim',
                kind: 'select',
                labelKey: 'components.overlay_scrim.playground.scrim',
                labelFallback: 'Scrim color',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'rgba(0,0,0,0.5)', value: 'rgba(0,0,0,0.5)' },
                    { label: 'rgba(0,0,128,0.4)', value: 'rgba(0,0,128,0.4)' },
                    { label: 'rgba(124,58,237,0.3)', value: 'rgba(124,58,237,0.3)' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
