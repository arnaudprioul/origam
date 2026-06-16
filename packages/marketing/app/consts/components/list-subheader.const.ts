/**
 * /components/list-subheader — full documentation data for OrigamListSubheader.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/List/list-subheader.interface.ts  (props)
 *   - packages/ds/src/components/List/OrigamListSubheader.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/list.json                       (CSS tokens — list.subheader.*)
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

export const LIST_SUBHEADER_DOC: IComponentDoc = {
    slug: 'list-subheader',
    name: 'ListSubheader',
    tag: 'origam-list-subheader',
    icon: 'mdi-format-list-group',
    category: 'Data Display',
    descriptionKey: 'components.catalog.list_subheader.description',
    descriptionFallback: 'Section heading rendered inside a List. Supports inset indent and sticky positioning.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-list-subheader--design',
    docUrl: 'http://localhost:4000/components/List/OrigamListSubheader',

    parentSlug: 'list',

    family: [],

    related: [
        {
            slug: 'list',
            name: 'List',
            kind: 'component',
            descriptionKey: 'components.catalog.list.description',
            descriptionFallback: 'Scrollable container that hosts ListItem and ListSubheader rows.'
        },
        {
            slug: 'list-item',
            name: 'ListItem',
            kind: 'component',
            descriptionKey: 'components.catalog.list_item.description',
            descriptionFallback: 'Single row inside a List.'
        }
    ],

    props: [
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_subheader.props.title.description',
            descriptionFallback: 'Subheader label text. Can also be provided via the default slot.'
        },
        {
            name: 'inset',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list_subheader.props.inset.description',
            descriptionFallback: 'Adds an indent (32px) to align with list items that have a prepend icon/avatar.'
        },
        {
            name: 'sticky',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list_subheader.props.sticky.description',
            descriptionFallback: 'Makes the subheader stick to the top of the scrollable list container (position: sticky; top: 0).'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_subheader.props.color.description',
            descriptionFallback: 'Text color override. Defaults to the semantic secondary text color.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_subheader.props.bg_color.description',
            descriptionFallback: 'Background color override. Inherits the list background by default.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.list_subheader.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean applied to the subheader.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.list_subheader.props.border.description',
            descriptionFallback: 'Applies a border to the subheader element.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.list_subheader.props.tag.description',
            descriptionFallback: 'Root HTML element. Consider using a semantic heading tag (h2–h6) when appropriate.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '{ title }',
            descriptionKey: 'components.list_subheader.slots.default.description',
            descriptionFallback: 'Subheader label content. Receives the title prop as a slot binding. Overrides the title prop when provided.'
        }
    ],

    examples: [
        {
            titleKey: 'components.list_subheader.examples.basic.title',
            titleFallback: 'Basic subheader',
            lang: 'vue',
            code: `<template>
  <origam-list>
    <origam-list-subheader title="Recent" />
    <origam-list-item title="Inbox" prepend-icon="mdi-inbox" />
    <origam-list-item title="Sent" prepend-icon="mdi-send" />
    <origam-list-subheader title="Other" />
    <origam-list-item title="Trash" prepend-icon="mdi-delete" />
  </origam-list>
</template>`
        },
        {
            titleKey: 'components.list_subheader.examples.inset_sticky.title',
            titleFallback: 'Inset + sticky',
            lang: 'vue',
            code: `<template>
  <origam-list style="max-height: 200px; overflow-y: auto;">
    <origam-list-subheader title="A" inset sticky />
    <origam-list-item title="Alice" prepend-icon="mdi-account" />
    <origam-list-item title="Arthur" prepend-icon="mdi-account" />
    <origam-list-subheader title="B" inset sticky />
    <origam-list-item title="Bob" prepend-icon="mdi-account" />
  </origam-list>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { title: 'Section header' } },
        { label: 'inset', props: { title: 'Inset header', inset: true } },
        { label: 'sticky', props: { title: 'Sticky header', sticky: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-list-subheader',
        svgViewBox: '0 0 700 140',
        svgTitle: 'Anatomy of OrigamListSubheader',
        svgDesc: 'Schematic of the ListSubheader component with 2 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="140" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="30" width="660" height="50" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="20" y="30" width="660" height="50" rx="4" fill="none" stroke="var(--origam-color__action--primary---bg, #a855f7)" stroke-width="1" stroke-dasharray="6 3" opacity="0.6"/>
  <rect x="32" y="44" width="400" height="22" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="232" y="59" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__text (label)</text>
  <circle cx="28" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="42" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="60" cy="44" r="8" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="60" y="48" font-size="8" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <line x1="38" y1="36" x2="90" y2="20" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="94" y="22" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-list-subheader</text>
  <text x="350" y="125" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">--inset adds 32px indent-padding · --sticky sets position: sticky top: 0</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-list-subheader&gt;</code> — 2 internal parts. The root ① is a flex container; the inner text element ② truncates with ellipsis.`,
        legend: [
            {
                num: 1,
                cls: '.origam-list-subheader',
                descriptionKey: 'components.list_subheader.anatomy.root',
                descriptionFallback: 'Root element. Flex container (align-items: center). Renders as <code>&lt;div&gt;</code> by default; use <code>tag="h2"</code>–<code>"h6"</code> for semantic sectioning.'
            },
            {
                num: 2,
                cls: '.origam-list-subheader__text',
                descriptionKey: 'components.list_subheader.anatomy.text',
                descriptionFallback: 'Label text wrapper. <code>overflow: hidden; text-overflow: ellipsis; white-space: nowrap</code>. Rendered only when the title prop or default slot is provided.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-list-subheader---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.list_subheader.css_vars.color',
            descriptionFallback: 'Text color of the subheader label. Defaults to the semantic secondary text color.'
        },
        {
            name: '--origam-list-subheader---font-size',
            defaultValue: '0.875rem',
            descriptionKey: 'components.list_subheader.css_vars.font_size',
            descriptionFallback: 'Font size of the subheader label.'
        },
        {
            name: '--origam-list-subheader---font-weight',
            defaultValue: '400',
            descriptionKey: 'components.list_subheader.css_vars.font_weight',
            descriptionFallback: 'Font weight of the subheader label.'
        },
        {
            name: '--origam-list-subheader---min-height',
            defaultValue: '40px',
            descriptionKey: 'components.list_subheader.css_vars.min_height',
            descriptionFallback: 'Minimum height of the subheader row. Transitions with density changes.'
        },
        {
            name: '--origam-list-subheader---padding-inline-end',
            defaultValue: '16px',
            descriptionKey: 'components.list_subheader.css_vars.padding_inline_end',
            descriptionFallback: 'Trailing padding to avoid text running to the edge.'
        },
        {
            name: '--origam-list-subheader---line-height',
            defaultValue: '1.375rem',
            descriptionKey: 'components.list_subheader.css_vars.line_height',
            descriptionFallback: 'Line height of the subheader text.'
        },
        {
            name: '--origam-list-subheader---inset-indent-padding',
            defaultValue: '32px',
            descriptionKey: 'components.list_subheader.css_vars.inset_indent_padding',
            descriptionFallback: 'Indent padding applied when --inset modifier is active. Aligns the label with prepend icons.'
        },
        {
            name: '--origam-list-subheader---transition-duration',
            defaultValue: '0.2s',
            descriptionKey: 'components.list_subheader.css_vars.transition_duration',
            descriptionFallback: 'Duration of the min-height transition.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.list_subheader.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.list_subheader.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed listSubheaderStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.list_subheader.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.list_subheader.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.list_subheader.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.list_subheader.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.list_subheader.a11y.semantic_note',
                noteFallback: 'For screen-reader accessibility, consider using tag="h2" through "h6" so the subheader is part of the heading outline. The default <div> tag is appropriate when the list is not a standalone section.'
            },
            {
                noteKey: 'components.list_subheader.a11y.sticky_note',
                noteFallback: 'The sticky variant uses position: sticky; top: 0 — the parent list must have overflow: auto or overflow: scroll for this to work correctly.'
            },
            {
                noteKey: 'components.list_subheader.a11y.contrast_note',
                noteFallback: 'The default secondary text color may have reduced contrast. Ensure at least 4.5:1 contrast ratio when customising the color prop.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/list.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Tokens are namespaced under list.subheader.* in the source JSON.',
        excerpt: [
            {
                tokenPath: 'list.subheader.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.list_subheader.tokens.color',
                descriptionFallback: 'Default text color (secondary).'
            },
            {
                tokenPath: 'list.subheader.font-size',
                value: '{font.size.sm}',
                type: 'dimension',
                descriptionKey: 'components.list_subheader.tokens.font_size',
                descriptionFallback: 'Font size (0.875rem).'
            },
            {
                tokenPath: 'list.subheader.min-height',
                value: '40px',
                type: 'dimension',
                descriptionKey: 'components.list_subheader.tokens.min_height',
                descriptionFallback: 'Minimum row height.'
            },
            {
                tokenPath: 'list.subheader.inset-indent-padding',
                value: '32px',
                type: 'dimension',
                descriptionKey: 'components.list_subheader.tokens.inset_indent_padding',
                descriptionFallback: 'Indent applied in --inset mode to align with prepend icon items.'
            },
            {
                tokenPath: 'list.subheader.transition-duration',
                value: '{motion.duration.medium}',
                type: 'duration',
                descriptionKey: 'components.list_subheader.tokens.transition_duration',
                descriptionFallback: 'Transition duration for min-height changes.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'title',
                kind: 'text',
                labelKey: 'components.list_subheader.playground.title',
                labelFallback: 'Title',
                defaultValue: 'Section header'
            },
            {
                prop: 'inset',
                kind: 'switch',
                labelKey: 'components.list_subheader.playground.inset',
                labelFallback: 'Inset',
                defaultValue: false
            },
            {
                prop: 'sticky',
                kind: 'switch',
                labelKey: 'components.list_subheader.playground.sticky',
                labelFallback: 'Sticky',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
