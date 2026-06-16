/**
 * /components/timeline-item — full documentation data for OrigamTimelineItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Timeline/timeline.interface.ts   (ITimelineItemProps)
 *   - packages/ds/src/components/Timeline/OrigamTimelineItem.vue  (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/timeline.json                  (CSS tokens)
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

export const TIMELINE_ITEM_DOC: IComponentDoc = {
    slug: 'timeline-item',
    name: 'TimelineItem',
    tag: 'origam-timeline-item',
    icon: 'mdi-timeline-outline',
    category: 'Data Display',
    descriptionKey: 'components.catalog.timeline_item.description',
    descriptionFallback: 'Individual event entry inside an OrigamTimeline — renders a dot, connector and content area with optional title, subtitle, body, icon and intent.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-timeline--design',
    docUrl: 'http://localhost:4000/components/Timeline/OrigamTimeline',

    parentSlug: 'timeline',

    family: [
        {
            slug: 'timeline',
            name: 'Timeline',
            descriptionKey: 'components.catalog.timeline.description',
            descriptionFallback: 'Vertical or horizontal event timeline container that manages OrigamTimelineItem children.'
        }
    ],

    related: [
        {
            slug: 'timeline',
            name: 'Timeline',
            kind: 'component',
            descriptionKey: 'components.catalog.timeline.description',
            descriptionFallback: 'Parent container — required wrapper for OrigamTimelineItem.'
        }
    ],

    props: [
        // ── Content props ──────────────────────────────────────────────
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.timeline_item.props.title.description',
            descriptionFallback: 'Primary label rendered in the item header. Can also be provided via the default slot.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.timeline_item.props.subtitle.description',
            descriptionFallback: 'Secondary label rendered below the title in the item header.'
        },
        {
            name: 'description',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.timeline_item.props.description.description',
            descriptionFallback: 'Body text rendered in the item body area. Overridden by the body slot.'
        },
        {
            name: 'icon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.timeline_item.props.icon.description',
            descriptionFallback: 'Icon rendered inside the dot. Overridden by the dot slot.'
        },
        // ── Intent / color ─────────────────────────────────────────────
        {
            name: 'intent',
            type: { label: 'TIntent', slug: 'intent', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.timeline_item.props.intent.description',
            descriptionFallback: 'Semantic intent that sets the dot background and foreground color. Falls back to the parent OrigamTimeline color.'
        },
        // ── Layout props ───────────────────────────────────────────────
        {
            name: 'side',
            type: { label: "'start' | 'end' | 'alternating'", slug: '', kind: 'primitive' },
            defaultValue: "'start'",
            descriptionKey: 'components.timeline_item.props.side.description',
            descriptionFallback: 'Which side of the track the content appears. Overridden by the parent OrigamTimeline side prop via inject.'
        },
        {
            name: 'orientation',
            type: { label: "'vertical' | 'horizontal'", slug: '', kind: 'primitive' },
            defaultValue: "'vertical'",
            descriptionKey: 'components.timeline_item.props.orientation.description',
            descriptionFallback: 'Layout direction. Normally injected by the parent OrigamTimeline — items rarely set this directly.'
        },
        {
            name: 'index',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.timeline_item.props.index.description',
            descriptionFallback: 'Zero-based position index in the timeline. Used to determine the content side when side="alternating".'
        },
        {
            name: 'isLast',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.timeline_item.props.is_last.description',
            descriptionFallback: 'Marks this item as the last entry. Hides the trailing connector when truncateLine=true.'
        },
        {
            name: 'truncateLine',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.timeline_item.props.truncate_line.description',
            descriptionFallback: 'When true and isLast=true, the connector line after the last dot is hidden.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.timeline_item.slots.default.description',
            descriptionFallback: 'Replaces the entire header (title + subtitle) and body area. Use for fully custom item content.'
        },
        {
            slot: 'dot',
            slotProps: '—',
            descriptionKey: 'components.timeline_item.slots.dot.description',
            descriptionFallback: 'Replaces the dot content. By default renders an OrigamIcon when icon is provided.'
        },
        {
            slot: 'body',
            slotProps: '—',
            descriptionKey: 'components.timeline_item.slots.body.description',
            descriptionFallback: 'Replaces the body text area. Falls back to the description prop.'
        }
    ],

    examples: [
        {
            titleKey: 'components.timeline_item.examples.basic.title',
            titleFallback: 'Basic timeline items',
            lang: 'vue',
            code: `<template>
  <origam-timeline>
    <origam-timeline-item
      title="Order placed"
      subtitle="2024-01-10"
      description="Your order #4821 has been confirmed."
      intent="success"
    />
    <origam-timeline-item
      title="Shipped"
      subtitle="2024-01-12"
      description="Package is on its way."
      intent="info"
    />
    <origam-timeline-item
      title="Delivered"
      subtitle="2024-01-15"
      intent="primary"
      :is-last="true"
    />
  </origam-timeline>
</template>`
        },
        {
            titleKey: 'components.timeline_item.examples.custom_dot.title',
            titleFallback: 'Custom dot slot',
            lang: 'vue',
            code: `<template>
  <origam-timeline>
    <origam-timeline-item title="Custom dot" intent="warning">
      <template #dot>
        <origam-icon icon="mdi-alert" :size="10" />
      </template>
    </origam-timeline-item>
  </origam-timeline>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-timeline-item',
        svgViewBox: '0 0 640 260',
        svgTitle: 'Anatomy of OrigamTimelineItem',
        svgDesc: 'Schematic of the TimelineItem component with 7 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="640" height="260" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <!-- root -->
  <rect x="20" y="30" width="600" height="200" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <!-- track -->
  <rect x="40" y="50" width="40" height="160" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.30))" stroke-width="1"/>
  <!-- dot -->
  <circle cx="60" cy="80" r="14" fill="var(--origam-color__action--primary---bg, #7c3aed)" stroke="var(--origam-color__surface---default, #fff)" stroke-width="2"/>
  <text x="60" y="85" font-size="8" fill="#fff" text-anchor="middle" font-family="'JetBrains Mono',monospace">icon</text>
  <!-- connector -->
  <line x1="60" y1="96" x2="60" y2="200" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.3))" stroke-width="2" stroke-dasharray="4 2"/>
  <!-- content -->
  <rect x="100" y="50" width="500" height="160" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.20))" stroke-width="1"/>
  <!-- header -->
  <rect x="116" y="66" width="460" height="44" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="200" y="84" font-size="10" fill="var(--origam-color__text---primary, #1a1035)" font-family="'JetBrains Mono',monospace" font-weight="600">title</text>
  <text x="200" y="100" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">subtitle</text>
  <!-- body -->
  <rect x="116" y="120" width="460" height="72" rx="2" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="346" y="160" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">body / description</text>
  <!-- number circles -->
  <circle cx="30" cy="38" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="30" y="42.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="48" cy="58" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="62" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="60" cy="80" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" stroke="none"/>
  <text x="60" y="84" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="60" cy="148" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="60" y="152" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="110" cy="58" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="110" y="62" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="120" cy="74" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="120" y="78" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">6</text>
  <circle cx="120" cy="128" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="120" y="132" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">7</text>
  <line x1="30" y1="26" x2="58" y2="10" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="62" y="8" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-timeline-item</text>
  <text x="320" y="248" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">③ dot · ④ connector · ⑥ header · ⑦ body — inside track ② and content ⑤</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-timeline-item&gt;</code> — 7 internal parts. The track holds the dot and connector; the content area holds the header (title + subtitle) and the body.`,
        legend: [
            {
                num: 1,
                cls: '.origam-timeline-item',
                descriptionKey: 'components.timeline_item.anatomy.root',
                descriptionFallback: 'Root element. <code>role="listitem"</code>, flex row. Orientation modifier class switches to flex-column in horizontal mode.'
            },
            {
                num: 2,
                cls: '.origam-timeline-item__track',
                descriptionKey: 'components.timeline_item.anatomy.track',
                descriptionFallback: 'Track column: contains the dot and connector, flex-column, fixed width. In horizontal mode switches to flex-row.'
            },
            {
                num: 3,
                cls: '.origam-timeline-item__dot',
                descriptionKey: 'components.timeline_item.anatomy.dot',
                descriptionFallback: 'Colored dot circle. Background and foreground color driven by the resolved intent via CSS custom properties.'
            },
            {
                num: 4,
                cls: '.origam-timeline-item__connector',
                descriptionKey: 'components.timeline_item.anatomy.connector',
                descriptionFallback: 'Connector line between dots. Hidden when <code>isLast=true</code> and <code>truncateLine=true</code>.'
            },
            {
                num: 5,
                cls: '.origam-timeline-item__content',
                descriptionKey: 'components.timeline_item.anatomy.content',
                descriptionFallback: 'Content area, flex: 1. Hosts the header and body sub-elements or the entire default slot.'
            },
            {
                num: 6,
                cls: '.origam-timeline-item__header',
                descriptionKey: 'components.timeline_item.anatomy.header',
                descriptionFallback: 'Header row containing title and subtitle spans. Visible only when default slot is not used.'
            },
            {
                num: 7,
                cls: '.origam-timeline-item__body',
                descriptionKey: 'components.timeline_item.anatomy.body',
                descriptionFallback: 'Body text area. Rendered when description prop or the body slot is provided.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: role="listitem" -->
<div class="origam-timeline-item origam-timeline-item--orientation-vertical">
  <!-- track: dot + connector -->
  <div class="origam-timeline-item__track" aria-hidden="true">
    <div class="origam-timeline-item__dot">
      <slot name="dot">
        <origam-icon v-if="icon" :icon="icon" :size="10" />
      </slot>
    </div>
    <span v-if="showConnector" class="origam-timeline-item__connector" />
  </div>

  <!-- content area -->
  <div class="origam-timeline-item__content">
    <slot name="default">
      <div class="origam-timeline-item__header">
        <span class="origam-timeline-item__title">{{ title }}</span>
        <span class="origam-timeline-item__subtitle">{{ subtitle }}</span>
      </div>
      <div class="origam-timeline-item__body">
        <slot name="body">{{ description }}</slot>
      </div>
    </slot>
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-timeline-item',
                descriptionKey: 'components.timeline_item.anatomy.root',
                descriptionFallback: 'Root element. role="listitem", flex row, gap between track and content.'
            },
            {
                cls: 'origam-timeline-item--orientation-horizontal',
                descriptionKey: 'components.timeline_item.anatomy.horizontal',
                descriptionFallback: 'Applied when orientation="horizontal". Switches to flex-column layout with horizontal track.'
            },
            {
                cls: 'origam-timeline-item--side-start',
                descriptionKey: 'components.timeline_item.anatomy.side_start',
                descriptionFallback: 'Applied when content is on the start side (default).'
            },
            {
                cls: 'origam-timeline-item--side-end',
                descriptionKey: 'components.timeline_item.anatomy.side_end',
                descriptionFallback: 'Applied when content is on the end side (row-reverse layout).'
            },
            {
                cls: 'origam-timeline-item--alternating',
                descriptionKey: 'components.timeline_item.anatomy.alternating',
                descriptionFallback: 'Applied when side="alternating". Even items go to start, odd items to end.'
            },
            {
                cls: 'origam-timeline-item--last',
                descriptionKey: 'components.timeline_item.anatomy.last',
                descriptionFallback: 'Applied when isLast=true. Removes bottom padding from content area.'
            },
            {
                cls: 'origam-timeline-item__track',
                descriptionKey: 'components.timeline_item.anatomy.track',
                descriptionFallback: 'Track column containing dot and connector.'
            },
            {
                cls: 'origam-timeline-item__dot',
                descriptionKey: 'components.timeline_item.anatomy.dot',
                descriptionFallback: 'Circular dot. Color set via intent-resolved CSS custom properties.'
            },
            {
                cls: 'origam-timeline-item__connector',
                descriptionKey: 'components.timeline_item.anatomy.connector',
                descriptionFallback: 'Connector line. Hidden on last item when truncateLine is active.'
            },
            {
                cls: 'origam-timeline-item__content',
                descriptionKey: 'components.timeline_item.anatomy.content',
                descriptionFallback: 'Content wrapper. flex: 1.'
            },
            {
                cls: 'origam-timeline-item__header',
                descriptionKey: 'components.timeline_item.anatomy.header',
                descriptionFallback: 'Header row with title and subtitle.'
            },
            {
                cls: 'origam-timeline-item__title',
                descriptionKey: 'components.timeline_item.anatomy.title',
                descriptionFallback: 'Title text element.'
            },
            {
                cls: 'origam-timeline-item__subtitle',
                descriptionKey: 'components.timeline_item.anatomy.subtitle',
                descriptionFallback: 'Subtitle text element.'
            },
            {
                cls: 'origam-timeline-item__body',
                descriptionKey: 'components.timeline_item.anatomy.body',
                descriptionFallback: 'Body text area. Only rendered when description or body slot is present.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-timeline---gap',
            defaultValue: '14px',
            descriptionKey: 'components.timeline_item.css_vars.gap',
            descriptionFallback: 'Gap between the track and the content area.'
        },
        {
            name: '--origam-timeline---track-width',
            defaultValue: '24px',
            descriptionKey: 'components.timeline_item.css_vars.track_width',
            descriptionFallback: 'Fixed width of the track column (holds dot + connector).'
        },
        {
            name: '--origam-timeline---dot-size',
            defaultValue: '12px',
            descriptionKey: 'components.timeline_item.css_vars.dot_size',
            descriptionFallback: 'Diameter of the timeline dot circle.'
        },
        {
            name: '--origam-timeline-item---dot-bg',
            defaultValue: 'var(--origam-timeline---dot-bg)',
            descriptionKey: 'components.timeline_item.css_vars.dot_bg',
            descriptionFallback: 'Per-item dot background color. Set via intent-resolved CSS custom property on the dot element style.'
        },
        {
            name: '--origam-timeline-item---dot-color',
            defaultValue: 'var(--origam-timeline---dot-color)',
            descriptionKey: 'components.timeline_item.css_vars.dot_color',
            descriptionFallback: 'Per-item dot foreground (icon) color. Set via intent-resolved CSS custom property.'
        },
        {
            name: '--origam-timeline---dot-border-width',
            defaultValue: '2px',
            descriptionKey: 'components.timeline_item.css_vars.dot_border_width',
            descriptionFallback: 'Border width of the dot circle (separates dot from background).'
        },
        {
            name: '--origam-timeline---connector-color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.timeline_item.css_vars.connector_color',
            descriptionFallback: 'Color of the connector line between dots.'
        },
        {
            name: '--origam-timeline---connector-thickness',
            defaultValue: '1px',
            descriptionKey: 'components.timeline_item.css_vars.connector_thickness',
            descriptionFallback: 'Thickness of the connector line.'
        },
        {
            name: '--origam-timeline---title-font-size',
            defaultValue: '0.875rem',
            descriptionKey: 'components.timeline_item.css_vars.title_font_size',
            descriptionFallback: 'Font size of the item title text.'
        },
        {
            name: '--origam-timeline---title-font-weight',
            defaultValue: '600',
            descriptionKey: 'components.timeline_item.css_vars.title_font_weight',
            descriptionFallback: 'Font weight of the item title text.'
        },
        {
            name: '--origam-timeline---subtitle-font-size',
            defaultValue: '0.75rem',
            descriptionKey: 'components.timeline_item.css_vars.subtitle_font_size',
            descriptionFallback: 'Font size of the subtitle and body text.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.timeline_item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.timeline_item.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.timeline_item.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.timeline_item.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.timeline_item.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.timeline_item.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['listitem'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.timeline_item.a11y.role_note',
                noteFallback: 'OrigamTimelineItem uses role="listitem" matching the parent OrigamTimeline role="list". The track area (dot + connector) is aria-hidden="true" — it is decorative.'
            },
            {
                noteKey: 'components.timeline_item.a11y.icon_note',
                noteFallback: 'Icons inside the dot are decorative and aria-hidden by the parent track. If the icon conveys status, provide the information via title or description for screen readers.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/timeline.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. All item-level tokens inherit from the root timeline token group.',
        excerpt: [
            {
                tokenPath: 'timeline.dot-size',
                value: '{space.3}',
                type: 'dimension',
                descriptionKey: 'components.timeline_item.tokens.dot_size',
                descriptionFallback: 'Diameter of the timeline dot.'
            },
            {
                tokenPath: 'timeline.dot-bg',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.timeline_item.tokens.dot_bg',
                descriptionFallback: 'Default dot background color (overridden per-item by intent).'
            },
            {
                tokenPath: 'timeline.connector-color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.timeline_item.tokens.connector_color',
                descriptionFallback: 'Connector line color.'
            },
            {
                tokenPath: 'timeline.connector-thickness',
                value: '{border.width.thin}',
                type: 'dimension',
                descriptionKey: 'components.timeline_item.tokens.connector_thickness',
                descriptionFallback: 'Connector line thickness.'
            },
            {
                tokenPath: 'timeline.title-font-weight',
                value: '{font.weight.semibold}',
                type: 'fontWeight',
                descriptionKey: 'components.timeline_item.tokens.title_font_weight',
                descriptionFallback: 'Font weight of the item title.'
            },
            {
                tokenPath: 'timeline.subtitle-color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.timeline_item.tokens.subtitle_color',
                descriptionFallback: 'Color of subtitle and body text.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: '',
        controls: [
            {
                prop: 'title',
                kind: 'text',
                labelKey: 'components.timeline_item.playground.title',
                labelFallback: 'Title',
                defaultValue: 'Event title'
            },
            {
                prop: 'subtitle',
                kind: 'text',
                labelKey: 'components.timeline_item.playground.subtitle',
                labelFallback: 'Subtitle',
                defaultValue: '2024-01-10'
            },
            {
                prop: 'description',
                kind: 'text',
                labelKey: 'components.timeline_item.playground.description',
                labelFallback: 'Description',
                defaultValue: 'Event description text.'
            },
            {
                prop: 'intent',
                kind: 'select',
                labelKey: 'components.timeline_item.playground.intent',
                labelFallback: 'Intent',
                defaultValue: 'primary',
                options: [
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'warning', value: 'warning' },
                    { label: 'info', value: 'info' }
                ]
            },
            {
                prop: 'icon',
                kind: 'select',
                labelKey: 'components.timeline_item.playground.icon',
                labelFallback: 'Icon',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'mdi-check', value: 'mdi-check' },
                    { label: 'mdi-clock', value: 'mdi-clock' },
                    { label: 'mdi-alert', value: 'mdi-alert' },
                    { label: 'mdi-star', value: 'mdi-star' }
                ]
            },
            {
                prop: 'side',
                kind: 'select',
                labelKey: 'components.timeline_item.playground.side',
                labelFallback: 'Side',
                defaultValue: 'start',
                options: [
                    { label: 'start', value: 'start' },
                    { label: 'end', value: 'end' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
