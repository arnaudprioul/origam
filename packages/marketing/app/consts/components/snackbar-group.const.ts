/**
 * /components/snackbar-group — full documentation data for OrigamSnackbarGroup.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Snackbar/snackbar-group.interface.ts  (props)
 *   - packages/ds/src/components/Snackbar/OrigamSnackbarGroup.vue       (template, defineExpose)
 *   - packages/ds/tokens/component/snackbar-group.json                  (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const SNACKBAR_GROUP_DOC: IComponentDoc = {
    slug: 'snackbar-group',
    name: 'SnackbarGroup',
    tag: 'origam-snackbar-group',
    icon: 'mdi-message-badge-outline',
    category: 'Feedback',
    descriptionKey: 'components.catalog.snackbar_group.description',
    descriptionFallback: 'Manages a queue of toast notifications stacked at a viewport anchor, driven by the useSnackbarGroup composable.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-snackbar--design',
    docUrl: 'http://localhost:4000/components/Snackbar/OrigamSnackbar',

    parentSlug: 'snackbar',

    family: [
        {
            slug: 'snackbar',
            name: 'Snackbar',
            descriptionKey: 'components.catalog.snackbar.description',
            descriptionFallback: 'Temporary overlay that delivers brief non-blocking feedback at a configurable viewport location.'
        },
        {
            slug: 'snackbar-item',
            name: 'SnackbarItem',
            descriptionKey: 'components.catalog.snackbar_item.description',
            descriptionFallback: 'Pure visual layer for a single toast notification with intent theming, icon, title, message and action buttons.'
        }
    ],

    props: [
        {
            name: 'id',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.snackbar_group.props.id.description',
            descriptionFallback: 'Identifier of the stack this container renders. Pair with useSnackbarGroup({ id }) to spawn items into the same stack.'
        },
        {
            name: 'location',
            type: { label: 'TSnackbarGroupLocation', slug: 'snackbar-group-location', kind: 'type' },
            defaultValue: "'bottom-right'",
            descriptionKey: 'components.snackbar_group.props.location.description',
            descriptionFallback: 'Anchor location on the viewport. Drives both absolute positioning and the direction default.'
        },
        {
            name: 'max',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '5',
            descriptionKey: 'components.snackbar_group.props.max.description',
            descriptionFallback: 'Maximum number of items rendered concurrently. Oldest item is evicted FIFO when the cap is exceeded.'
        },
        {
            name: 'defaultDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '5000',
            descriptionKey: 'components.snackbar_group.props.default_duration.description',
            descriptionFallback: 'Default auto-dismiss timeout in milliseconds for items that do not supply their own duration. Pass 0 to make all items sticky.'
        },
        {
            name: 'spacing',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: "'12px'",
            descriptionKey: 'components.snackbar_group.props.spacing.description',
            descriptionFallback: 'Gap between stacked items. Accepts a CSS dimension string or a number (converted to px).'
        },
        {
            name: 'direction',
            type: { label: 'TSnackbarGroupDirection', slug: 'snackbar-group-direction', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.snackbar_group.props.direction.description',
            descriptionFallback: 'Stacking order. Defaults to top-down for top-* locations and bottom-up for bottom-* locations.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.snackbar_group.props.tag.description',
            descriptionFallback: 'HTML element rendered as the stack root inside the Teleport to body.'
        }
    ],

    emits: [],

    slots: [],

    examples: [
        {
            titleKey: 'components.snackbar_group.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<template>
  <!-- Place once in your app root -->
  <origam-snackbar-group id="app" location="bottom-right" />
</template>

<script setup>
import { useSnackbarGroup } from 'origam'
const { notify } = useSnackbarGroup({ id: 'app' })
notify({ intent: 'success', title: 'Saved', message: 'Your changes have been saved.' })
</script>`
        },
        {
            titleKey: 'components.snackbar_group.examples.locations.title',
            titleFallback: 'Locations',
            lang: 'vue',
            code: `<template>
  <origam-snackbar-group id="tl" location="top-left" />
  <origam-snackbar-group id="tr" location="top-right" />
  <origam-snackbar-group id="bc" location="bottom-center" />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-snackbar-group',
        svgViewBox: '0 0 700 220',
        svgTitle: 'Anatomy of OrigamSnackbarGroup',
        svgDesc: 'Schematic of the SnackbarGroup component with 2 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="220" fill="var(--origam-color__surface---sunken, #f8f5ff)" rx="4"/>
  <rect x="24" y="20" width="652" height="180" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="36" y="42" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-family="'JetBrains Mono',monospace" font-weight="700">origam-snackbar-group (Teleport → body)</text>
  <rect x="36" y="54" width="628" height="136" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="48" y="72" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">__items (transition-group)</text>
  <rect x="48" y="80" width="604" height="32" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="60" y="100" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">origam-snackbar-item (intent=success) ← newest</text>
  <rect x="48" y="120" width="604" height="32" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="60" y="140" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">origam-snackbar-item (intent=info)</text>
  <circle cx="32" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="32" y="32" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="44" cy="62" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="44" y="66" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-snackbar-group&gt;</code> — 2 internal parts. The root teleports to <code>&lt;body&gt;</code> and is positioned via the <code>location</code> prop; the <code>__items</code> wrapper hosts a <code>&lt;transition-group&gt;</code> animating each <code>OrigamSnackbarItem</code>.`,
        legend: [
            {
                num: 1,
                cls: '.origam-snackbar-group',
                descriptionKey: 'components.snackbar_group.anatomy.root',
                descriptionFallback: 'Root element. Teleported to <code>&lt;body&gt;</code>. Positioned <code>fixed</code> per the <code>location</code> prop modifier class (e.g. <code>--bottom-right</code>).'
            },
            {
                num: 2,
                cls: '.origam-snackbar-group__items',
                descriptionKey: 'components.snackbar_group.anatomy.items',
                descriptionFallback: '<code>&lt;transition-group&gt;</code> wrapper. Renders each <code>OrigamSnackbarItem</code> with slide-up or slide-down enter/leave transitions.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- teleported to <body> -->
<div class="origam-snackbar-group origam-snackbar-group--bottom-right">
  <transition-group tag="div" class="origam-snackbar-group__items">
    <origam-snackbar-item v-for="item in visibleItems" :key="item.id" />
  </transition-group>
</div>`,
        classes: [
            {
                cls: 'origam-snackbar-group',
                descriptionKey: 'components.snackbar_group.anatomy.root',
                descriptionFallback: 'Root element. Fixed-positioned container teleported to body.'
            },
            {
                cls: 'origam-snackbar-group__items',
                descriptionKey: 'components.snackbar_group.anatomy.items',
                descriptionFallback: 'transition-group host. Stacks SnackbarItem elements with gap driven by --origam-snackbar-group---gap.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-snackbar-group---gap',
            defaultValue: '12px',
            descriptionKey: 'components.snackbar_group.css_vars.gap',
            descriptionFallback: 'Gap between stacked toast items. Overridden at runtime by the spacing prop.'
        },
        {
            name: '--origam-snackbar-group---max-width',
            defaultValue: '420px',
            descriptionKey: 'components.snackbar_group.css_vars.max_width',
            descriptionFallback: 'Maximum width of the stack container.'
        },
        {
            name: '--origam-snackbar-group---z-index',
            defaultValue: 'var(--origam-z-index-toast, 1060)',
            descriptionKey: 'components.snackbar_group.css_vars.z_index',
            descriptionFallback: 'Z-index of the teleported stack root.'
        },
        {
            name: '--origam-snackbar-group---position-top',
            defaultValue: '16px',
            descriptionKey: 'components.snackbar_group.css_vars.position_top',
            descriptionFallback: 'Distance from the viewport top edge for top-* locations.'
        },
        {
            name: '--origam-snackbar-group---position-bottom',
            defaultValue: '16px',
            descriptionKey: 'components.snackbar_group.css_vars.position_bottom',
            descriptionFallback: 'Distance from the viewport bottom edge for bottom-* locations.'
        },
        {
            name: '--origam-snackbar-group---position-left',
            defaultValue: '16px',
            descriptionKey: 'components.snackbar_group.css_vars.position_left',
            descriptionFallback: 'Distance from the viewport left edge for *-left locations.'
        },
        {
            name: '--origam-snackbar-group---position-right',
            defaultValue: '16px',
            descriptionKey: 'components.snackbar_group.css_vars.position_right',
            descriptionFallback: 'Distance from the viewport right edge for *-right locations.'
        },
        {
            name: '--origam-snackbar-group---transition-duration',
            defaultValue: '180ms',
            descriptionKey: 'components.snackbar_group.css_vars.transition_duration',
            descriptionFallback: 'Duration of the slide-up / slide-down enter and leave transitions.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.snackbar_group.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'visibleItems',
            type: 'ComputedRef<ReadonlyArray<ISnackbarGroupItem>>',
            descriptionKey: 'components.snackbar_group.exposed.visible_items',
            descriptionFallback: 'Computed slice of items currently rendered (capped to max, ordered per direction).'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.snackbar_group.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed stack styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.snackbar_group.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.snackbar_group.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.snackbar_group.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.snackbar_group.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['region', 'status', 'alert'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.snackbar_group.a11y.key_tab',
                actionFallback: 'Moves focus to the dismiss button or action buttons inside the visible toast items.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.snackbar_group.a11y.key_activate',
                actionFallback: 'Activates the focused dismiss or action button.'
            }
        ],
        notes: [
            {
                noteKey: 'components.snackbar_group.a11y.region_note',
                noteFallback: 'The stack root carries role="region" and aria-label="Notifications" so screen readers can navigate to the announcement zone.'
            },
            {
                noteKey: 'components.snackbar_group.a11y.live_note',
                noteFallback: 'Each SnackbarItem inside the group carries aria-live="polite" (info, success) or aria-live="assertive" (warning, danger) so announcements are prioritised correctly.'
            },
            {
                noteKey: 'components.snackbar_group.a11y.reduced_motion_note',
                noteFallback: 'Slide transitions are replaced by an opacity-only fade under prefers-reduced-motion: reduce.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/snackbar-group.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'snackbar-group.gap',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.snackbar_group.tokens.gap',
                descriptionFallback: 'Gap between stacked toast items.'
            },
            {
                tokenPath: 'snackbar-group.max-width',
                value: '420px',
                type: 'dimension',
                descriptionKey: 'components.snackbar_group.tokens.max_width',
                descriptionFallback: 'Maximum width of the stack container.'
            },
            {
                tokenPath: 'snackbar-group.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.snackbar_group.tokens.transition_duration',
                descriptionFallback: 'Duration of the enter/leave slide transitions.'
            },
            {
                tokenPath: 'snackbar-group.position-top',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.snackbar_group.tokens.position_top',
                descriptionFallback: 'Distance from the top edge for top-* locations.'
            },
            {
                tokenPath: 'snackbar-group.position-right',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.snackbar_group.tokens.position_right',
                descriptionFallback: 'Distance from the right edge for *-right locations.'
            }
        ]
    } satisfies IComponentTokens
}
