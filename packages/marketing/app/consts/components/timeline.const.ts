/**
 * /components/timeline — full documentation data for OrigamTimeline.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Timeline/timeline.interface.ts  (props)
 *   - packages/ds/src/components/Timeline/OrigamTimeline.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/timeline.json                 (CSS tokens)
 *
 * FAMILY: timeline-item (OrigamTimelineItem sub-component).
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

export const TIMELINE_DOC: IComponentDoc = {
    slug: 'timeline',
    name: 'Timeline',
    tag: 'origam-timeline',
    icon: 'mdi-timeline-outline',
    category: 'Data Display',
    descriptionKey: 'components.catalog.timeline.description',
    descriptionFallback: 'Vertical or horizontal event timeline with dot, connector and item content slots. Supports alternating layout, custom intents per item, and scroll-snapping in horizontal mode.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-timeline--design',
    docUrl: 'http://localhost:4000/components/Timeline/OrigamTimeline',

    family: [
        {
            slug: 'timeline-item',
            name: 'TimelineItem',
            descriptionKey: 'components.catalog.timeline_item.description',
            descriptionFallback: 'Individual event entry inside a Timeline.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'items',
            type: { label: 'ITimelineEntry[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.timeline.props.items.description',
            descriptionFallback: 'Array of timeline entries. Each entry has title, subtitle, description, icon and intent. When provided, OrigamTimelineItem is rendered automatically.'
        },
        {
            name: 'orientation',
            type: { label: 'TTimelineOrientation', slug: 'timeline-orientation', kind: 'type' },
            defaultValue: "'vertical'",
            descriptionKey: 'components.timeline.props.orientation.description',
            descriptionFallback: "Layout direction. 'vertical' (default): dots stacked top→bottom. 'horizontal': dots in a scroll-snapping row, content below."
        },
        {
            name: 'side',
            type: { label: "'start' | 'end' | 'alternating'", slug: '', kind: 'primitive' },
            defaultValue: "'start'",
            descriptionKey: 'components.timeline.props.side.description',
            descriptionFallback: "Which side the content appears on in vertical mode. 'alternating' places odd items on the start side and even items on the end side."
        },
        {
            name: 'truncateLine',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.timeline.props.truncate_line.description',
            descriptionFallback: 'When true, the connector line is hidden on the last item (no trailing connector).'
        },
        {
            name: 'ariaLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.timeline.props.aria_label.description',
            descriptionFallback: 'aria-label for the timeline list root (role="list").'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.timeline.props.tag.description',
            descriptionFallback: 'HTML element rendered at root.'
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.timeline.props.color.description',
            descriptionFallback: 'Default intent color for dots when no per-item intent is set.'
        },
        // ── ISizeProps / IDensityProps ─────────────────────────────────
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.timeline.props.size.description',
            descriptionFallback: 'Dot size token. Overrides the --origam-timeline---dot-size token.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.timeline.props.density.description',
            descriptionFallback: 'Adjusts the gap between items.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.timeline.slots.default.description',
            descriptionFallback: 'Slot for manual OrigamTimelineItem children. Overrides the items prop. Use when you need per-item slot customisation.'
        }
    ],

    examples: [
        {
            titleKey: 'components.timeline.examples.basic.title',
            titleFallback: 'Basic vertical timeline',
            lang: 'vue',
            code: `<template>
  <origam-timeline :items="events" truncate-line />
</template>

<script setup>
const events = [
  { title: 'Account created', subtitle: '2024-01-01', description: 'Welcome aboard!', intent: 'success' },
  { title: 'Profile completed', subtitle: '2024-01-05', intent: 'primary' },
  { title: 'First payment', subtitle: '2024-01-10', description: 'Plan Pro activated.', intent: 'info' }
]
</script>`
        },
        {
            titleKey: 'components.timeline.examples.alternating.title',
            titleFallback: 'Alternating layout',
            lang: 'vue',
            code: `<template>
  <origam-timeline :items="events" side="alternating" truncate-line />
</template>

<script setup>
const events = [
  { title: 'Step 1', icon: 'mdi-check', intent: 'success' },
  { title: 'Step 2', icon: 'mdi-pencil', intent: 'primary' },
  { title: 'Step 3', icon: 'mdi-clock-outline', intent: 'warning' },
  { title: 'Step 4', icon: 'mdi-star', intent: 'info' }
]
</script>`
        },
        {
            titleKey: 'components.timeline.examples.horizontal.title',
            titleFallback: 'Horizontal scroll-snap',
            lang: 'vue',
            code: `<template>
  <origam-timeline
    :items="steps"
    orientation="horizontal"
    truncate-line
    aria-label="Onboarding steps"
  />
</template>

<script setup>
const steps = [
  { title: 'Install', subtitle: 'Step 1', intent: 'primary' },
  { title: 'Configure', subtitle: 'Step 2', intent: 'secondary' },
  { title: 'Deploy', subtitle: 'Step 3', intent: 'success' }
]
</script>`
        }
    ],

    previewVariants: [
        {
            label: 'vertical 3 items',
            props: {
                truncateLine: true,
                orientation: 'vertical',
                side: 'start'
            }
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-timeline',
        svgViewBox: '0 0 600 300',
        svgTitle: 'Anatomy of OrigamTimeline',
        svgDesc: 'Schematic of the Timeline component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="600" height="300" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="20" width="544" height="260" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <circle cx="120" cy="70" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" stroke="var(--origam-color__surface---default, #fff)" stroke-width="2"/>
  <line x1="120" y1="80" x2="120" y2="150" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.3))" stroke-width="1.5"/>
  <circle cx="120" cy="160" r="10" fill="var(--origam-color__feedback--success---bg, #10b981)" stroke="var(--origam-color__surface---default, #fff)" stroke-width="2"/>
  <line x1="120" y1="170" x2="120" y2="240" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.3))" stroke-width="1.5"/>
  <circle cx="120" cy="250" r="10" fill="var(--origam-color__feedback--info---bg, #06b6d4)" stroke="var(--origam-color__surface---default, #fff)" stroke-width="2"/>
  <rect x="148" y="50" width="380" height="40" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="160" y="76" font-size="11" fill="var(--origam-color__text---primary, #1a1a2e)" font-family="'JetBrains Mono',monospace">Account created</text>
  <rect x="148" y="140" width="380" height="40" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="160" y="166" font-size="11" fill="var(--origam-color__text---primary, #1a1a2e)" font-family="'JetBrains Mono',monospace">Profile completed</text>
  <rect x="148" y="230" width="380" height="40" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1"/>
  <text x="160" y="256" font-size="11" fill="var(--origam-color__text---primary, #1a1a2e)" font-family="'JetBrains Mono',monospace">First payment</text>
  <circle cx="36" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="32.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="110" cy="58" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="110" y="62.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="132" cy="82" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="132" y="86.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="148" cy="58" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="148" y="62.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
  <line x1="46" y1="20" x2="80" y2="6" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="6" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-timeline</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-timeline&gt;</code> — 4 internal parts: root list ①, dot ②, connector ③ and content area ④ per item.`,
        legend: [
            {
                num: 1,
                cls: '.origam-timeline',
                descriptionKey: 'components.timeline.anatomy.root',
                descriptionFallback: 'Root element with role="list". Contains a track-wrapper div in horizontal mode.'
            },
            {
                num: 2,
                cls: '.origam-timeline-item__dot',
                descriptionKey: 'components.timeline.anatomy.dot',
                descriptionFallback: 'Circular dot. Background color driven by the item intent via --origam-timeline-item---dot-bg. Hosts the #dot slot (icon by default when icon prop is set).'
            },
            {
                num: 3,
                cls: '.origam-timeline-item__connector',
                descriptionKey: 'components.timeline.anatomy.connector',
                descriptionFallback: 'Vertical (or horizontal) line connecting consecutive dots. Hidden on the last item when truncateLine=true.'
            },
            {
                num: 4,
                cls: '.origam-timeline-item__content',
                descriptionKey: 'components.timeline.anatomy.content',
                descriptionFallback: 'Content area next to the dot. Contains the header (title + subtitle) and an optional body. Hosts the #default and #body slots.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: role="list" -->
<component :is="tag" class="origam-timeline" role="list" :aria-label="ariaLabel">
  <!-- horizontal mode wraps items in a scroll-snap track -->
  <div v-if="orientation === 'horizontal'" class="origam-timeline__track-wrapper">
    <slot>
      <origam-timeline-item v-for="(entry, i) in items" :key="i" v-bind="entry" />
    </slot>
  </div>

  <!-- vertical mode: direct slot -->
  <slot v-else>
    <origam-timeline-item v-for="(entry, i) in items" :key="i" v-bind="entry" />
  </slot>
</component>`,
        classes: [
            {
                cls: 'origam-timeline',
                descriptionKey: 'components.timeline.anatomy.root',
                descriptionFallback: 'Root element (role="list").'
            },
            {
                cls: 'origam-timeline__track-wrapper',
                descriptionKey: 'components.timeline.anatomy.track_wrapper',
                descriptionFallback: 'Horizontal scroll container. Only rendered when orientation="horizontal".'
            },
            {
                cls: 'origam-timeline-item',
                descriptionKey: 'components.timeline.anatomy.item',
                descriptionFallback: 'Individual timeline entry (role="listitem").'
            },
            {
                cls: 'origam-timeline-item__track',
                descriptionKey: 'components.timeline.anatomy.track',
                descriptionFallback: 'Track column: dot + connector (aria-hidden).'
            },
            {
                cls: 'origam-timeline-item__dot',
                descriptionKey: 'components.timeline.anatomy.dot',
                descriptionFallback: 'Circular dot. Intent-colored background.'
            },
            {
                cls: 'origam-timeline-item__connector',
                descriptionKey: 'components.timeline.anatomy.connector',
                descriptionFallback: 'Line connecting this dot to the next.'
            },
            {
                cls: 'origam-timeline-item__content',
                descriptionKey: 'components.timeline.anatomy.content',
                descriptionFallback: 'Content area: header + body.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-timeline---gap',
            defaultValue: '{space.4}',
            descriptionKey: 'components.timeline.css_vars.gap',
            descriptionFallback: 'Gap between timeline items and between the dot and content.'
        },
        {
            name: '--origam-timeline---dot-size',
            defaultValue: '{space.3}',
            descriptionKey: 'components.timeline.css_vars.dot_size',
            descriptionFallback: 'Diameter of the dot.'
        },
        {
            name: '--origam-timeline---dot-bg',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.timeline.css_vars.dot_bg',
            descriptionFallback: 'Default dot background color (overridden per item by intent).'
        },
        {
            name: '--origam-timeline---dot-color',
            defaultValue: '{color.action.primary.fg}',
            descriptionKey: 'components.timeline.css_vars.dot_color',
            descriptionFallback: 'Default dot foreground (icon) color.'
        },
        {
            name: '--origam-timeline---connector-color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.timeline.css_vars.connector_color',
            descriptionFallback: 'Color of the connector line between dots.'
        },
        {
            name: '--origam-timeline---connector-thickness',
            defaultValue: '{border.width.thin}',
            descriptionKey: 'components.timeline.css_vars.connector_thickness',
            descriptionFallback: 'Width/height of the connector line.'
        },
        {
            name: '--origam-timeline---track-width',
            defaultValue: '{space.6}',
            descriptionKey: 'components.timeline.css_vars.track_width',
            descriptionFallback: 'Width of the track column (dot + connector area).'
        },
        {
            name: '--origam-timeline---title-font-size',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.timeline.css_vars.title_font_size',
            descriptionFallback: 'Font size of the item title.'
        },
        {
            name: '--origam-timeline---subtitle-color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.timeline.css_vars.subtitle_color',
            descriptionFallback: 'Color of the item subtitle and body text.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.timeline.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.timeline.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.timeline.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.timeline.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.timeline.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.timeline.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['list', 'listitem (per item)'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.timeline.a11y.key_tab',
                actionFallback: 'Moves focus between interactive elements inside the timeline items (links, buttons in content slots).'
            }
        ],
        notes: [
            {
                noteKey: 'components.timeline.a11y.list_note',
                noteFallback: 'The root element has role="list". Each OrigamTimelineItem has role="listitem". Screen readers announce the number of items in the timeline.'
            },
            {
                noteKey: 'components.timeline.a11y.label_note',
                noteFallback: 'Provide an ariaLabel prop to describe the timeline purpose (e.g. "Project history"). Without it, screen readers will not contextualise the list.'
            },
            {
                noteKey: 'components.timeline.a11y.connector_note',
                noteFallback: 'The track column (dot + connector) has aria-hidden="true" — it is decorative. Meaningful content lives in the content area.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/timeline.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'timeline.gap',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.timeline.tokens.gap',
                descriptionFallback: 'Gap between items.'
            },
            {
                tokenPath: 'timeline.dot-size',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.timeline.tokens.dot_size',
                descriptionFallback: 'Dot diameter.'
            },
            {
                tokenPath: 'timeline.dot-bg',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.timeline.tokens.dot_bg',
                descriptionFallback: 'Default dot background color.'
            },
            {
                tokenPath: 'timeline.connector-color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.timeline.tokens.connector_color',
                descriptionFallback: 'Connector line color.'
            },
            {
                tokenPath: 'timeline.connector-thickness',
                value: '{border.width.thin}',
                type: 'dimension',
                descriptionKey: 'components.timeline.tokens.connector_thickness',
                descriptionFallback: 'Connector line width.'
            },
            {
                tokenPath: 'timeline.title-font-weight',
                value: '{font.weight.semibold}',
                type: 'fontWeight',
                descriptionKey: 'components.timeline.tokens.title_font_weight',
                descriptionFallback: 'Title font weight.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'orientation',
                kind: 'select',
                labelKey: 'components.timeline.playground.orientation',
                labelFallback: 'Orientation',
                defaultValue: 'vertical',
                options: [
                    { label: 'vertical', value: 'vertical' },
                    { label: 'horizontal', value: 'horizontal' }
                ]
            },
            {
                prop: 'side',
                kind: 'select',
                labelKey: 'components.timeline.playground.side',
                labelFallback: 'Side',
                defaultValue: 'start',
                options: [
                    { label: 'start', value: 'start' },
                    { label: 'end', value: 'end' },
                    { label: 'alternating', value: 'alternating' }
                ]
            },
            {
                prop: 'truncateLine',
                kind: 'switch',
                labelKey: 'components.timeline.playground.truncate_line',
                labelFallback: 'Truncate last connector',
                defaultValue: true
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.timeline.playground.color',
                labelFallback: 'Default color',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'info', value: 'info' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
