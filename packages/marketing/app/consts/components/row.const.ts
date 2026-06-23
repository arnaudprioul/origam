/**
 * /components/row — full documentation data for OrigamRow.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Grids/row.interface.ts    (props)
 *   - packages/ds/src/components/Grids/OrigamRow.vue       (template BEM, defineExpose)
 *   - packages/ds/tokens/component/ (no row-specific token file — vars in component style block)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const ROW_DOC: IComponentDoc = {
    slug: 'row',
    name: 'Row',
    tag: 'origam-row',
    icon: 'mdi-table-row',
    category: 'Layout',
    descriptionKey: 'components.catalog.row.description',
    descriptionFallback: 'Horizontal flex row that wraps Col children with configurable gutters, alignment, justify and direction. Sub-component of the Grids family.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-grids--design',
    docUrl: 'http://localhost:4000/components/Grids/OrigamGrids',

    parentSlug: 'grids',

    family: [
        {
            slug: 'grids',
            name: 'Grids',
            descriptionKey: 'components.catalog.grids.description',
            descriptionFallback: 'Responsive 12-column grid system based on CSS Grid.'
        },
        {
            slug: 'container',
            name: 'Container',
            descriptionKey: 'components.catalog.container.description',
            descriptionFallback: 'Page-level structural wrapper with optional fluid / fullscreen modes.'
        },
        {
            slug: 'col',
            name: 'Col',
            descriptionKey: 'components.catalog.col.description',
            descriptionFallback: 'Responsive column that spans 1–12 grid tracks with per-breakpoint overrides.'
        },
        {
            slug: 'spacer',
            name: 'Spacer',
            descriptionKey: 'components.catalog.spacer.description',
            descriptionFallback: 'Invisible flex-grow element that fills remaining space between cols.'
        }
    ],

    props: [
        {
            name: 'gutters',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.row.props.gutters.description',
            descriptionFallback: 'Gap between Col children. Accepts a CSS length or a number (converted to px).'
        },
        {
            name: 'direction',
            type: { label: "TFlexDirection", slug: 'flex-direction', kind: 'type' },
            defaultValue: "'row'",
            descriptionKey: 'components.row.props.direction.description',
            descriptionFallback: 'Flex direction of the row: row, row-reverse, column, column-reverse.'
        },
        {
            name: 'align',
            type: { label: "'start' | 'center' | 'end' | 'stretch' | 'baseline'", slug: '', kind: 'primitive' },
            defaultValue: "'stretch'",
            descriptionKey: 'components.row.props.align.description',
            descriptionFallback: 'Aligns Col children along the cross axis (align-items). Supports per-breakpoint variants: alignSm, alignMd, alignLg, alignXl, alignXxl.'
        },
        {
            name: 'justify',
            type: { label: "'start' | 'center' | 'end' | 'space-between' | 'space-around' | 'space-evenly'", slug: '', kind: 'primitive' },
            defaultValue: "'start'",
            descriptionKey: 'components.row.props.justify.description',
            descriptionFallback: 'Distributes Col children along the main axis (justify-content). Supports per-breakpoint variants: justifySm, justifyMd, justifyLg, justifyXl, justifyXxl.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.row.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Default is div.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.row.props.density.description',
            descriptionFallback: 'Controls margin density offset applied to block and inline margins. compact: -8px, comfortable: +8px.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.row.props.color.description',
            descriptionFallback: 'Foreground color applied to the row element.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.row.props.bg_color.description',
            descriptionFallback: 'Background color applied to the row element.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.row.props.border.description',
            descriptionFallback: 'Applies a border to the row. Pass true for the default border or a CSS shorthand.'
        },
        {
            name: 'borderColor',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.row.props.border_color.description',
            descriptionFallback: 'Override border color.'
        },
        {
            name: 'borderStyle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.row.props.border_style.description',
            descriptionFallback: 'Override border style (solid, dashed, dotted…).'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.row.slots.default.description',
            descriptionFallback: 'Col children and any other content placed inside the row.'
        }
    ],

    examples: [
        {
            titleKey: 'components.row.examples.basic.title',
            titleFallback: 'Basic row with two columns',
            lang: 'vue',
            code: `<template>
  <origam-container>
    <origam-row>
      <origam-col cols="8">Main</origam-col>
      <origam-col cols="4">Aside</origam-col>
    </origam-row>
  </origam-container>
</template>`
        },
        {
            titleKey: 'components.row.examples.align_justify.title',
            titleFallback: 'Alignment and justify',
            lang: 'vue',
            code: `<template>
  <origam-container>
    <origam-row align="center" justify="space-between">
      <origam-col cols="auto">Left</origam-col>
      <origam-col cols="auto">Right</origam-col>
    </origam-row>
  </origam-container>
</template>`
        },
        {
            titleKey: 'components.row.examples.direction.title',
            titleFallback: 'Column direction',
            lang: 'vue',
            code: `<template>
  <origam-container>
    <origam-row direction="column">
      <origam-col>Top</origam-col>
      <origam-col>Bottom</origam-col>
    </origam-row>
  </origam-container>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-row',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamRow',
        svgDesc: 'Schematic of the Row component with 3 numbered parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="30" width="660" height="120" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <rect x="40" y="55" width="190" height="70" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1.5"/>
  <text x="135" y="94" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Col slot</text>
  <rect x="255" y="55" width="190" height="70" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1.5"/>
  <text x="350" y="94" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Col slot</text>
  <rect x="470" y="55" width="190" height="70" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1.5"/>
  <text x="565" y="94" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Col slot</text>
  <circle cx="28" cy="38" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="42" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="50" cy="63" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="50" y="67" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="350" cy="40" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="350" y="44" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-row&gt;</code> — 3 parts: root flex container ①, Col children ②, density-driven margin adjustment ③.`,
        legend: [
            {
                num: 1,
                cls: '.origam-row',
                descriptionKey: 'components.row.anatomy.root',
                descriptionFallback: 'Root element. Renders as a flex container (display: flex, flex-wrap: wrap). Tag is configurable via the tag prop.'
            },
            {
                num: 2,
                cls: '.origam-row (Col children)',
                descriptionKey: 'components.row.anatomy.cols',
                descriptionFallback: 'Direct Col children receive gutter via negative margin on the row and padding on each Col.'
            },
            {
                num: 3,
                cls: '.origam-row--density-{compact|default|comfortable}',
                descriptionKey: 'components.row.anatomy.density',
                descriptionFallback: 'Density modifier class. Adjusts --origam-row---density offset on block and inline margins.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: flex container, tag configurable -->
<div class="origam-row origam-row--density-default origam-row--align-stretch origam-row--justify-start">
  <!-- default slot: Col children -->
  <slot name="default" />
</div>`,
        classes: [
            {
                cls: 'origam-row',
                descriptionKey: 'components.row.anatomy.root',
                descriptionFallback: 'Root flex container.'
            },
            {
                cls: 'origam-row--density-default',
                descriptionKey: 'components.row.anatomy.density_default',
                descriptionFallback: 'Default density (0 offset).'
            },
            {
                cls: 'origam-row--density-compact',
                descriptionKey: 'components.row.anatomy.density_compact',
                descriptionFallback: 'Compact density (−8px margin offset).'
            },
            {
                cls: 'origam-row--density-comfortable',
                descriptionKey: 'components.row.anatomy.density_comfortable',
                descriptionFallback: 'Comfortable density (+8px margin offset).'
            },
            {
                cls: 'origam-row--align-{value}',
                descriptionKey: 'components.row.anatomy.align',
                descriptionFallback: 'Sets --origam-row---align-items. Values: start, end, center, baseline, stretch.'
            },
            {
                cls: 'origam-row--justify-{value}',
                descriptionKey: 'components.row.anatomy.justify',
                descriptionFallback: 'Sets --origam-row---justify-content. Values: start, end, center, space-between, space-around, space-evenly.'
            },
            {
                cls: 'origam-row--direction-{value}',
                descriptionKey: 'components.row.anatomy.direction',
                descriptionFallback: 'Sets --origam-row---flex-direction. Values: row, row-reverse, column, column-reverse.'
            },
            {
                cls: 'origam-row--border',
                descriptionKey: 'components.row.anatomy.border',
                descriptionFallback: 'Applied when border prop is set. Activates border-width and box-shadow tokens.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-row---display',
            defaultValue: 'flex',
            descriptionKey: 'components.row.css_vars.display',
            descriptionFallback: 'Display value for the row (always flex).'
        },
        {
            name: '--origam-row---flex-direction',
            defaultValue: 'row',
            descriptionKey: 'components.row.css_vars.flex_direction',
            descriptionFallback: 'Flex direction. Overridden by direction prop class.'
        },
        {
            name: '--origam-row---flex-wrap',
            defaultValue: 'wrap',
            descriptionKey: 'components.row.css_vars.flex_wrap',
            descriptionFallback: 'Wrap mode. Default: wrap (columns stack on overflow).'
        },
        {
            name: '--origam-row---flex',
            defaultValue: '1 1 auto',
            descriptionKey: 'components.row.css_vars.flex',
            descriptionFallback: 'Flex shorthand applied to the row itself.'
        },
        {
            name: '--origam-row---align-items',
            defaultValue: 'stretch',
            descriptionKey: 'components.row.css_vars.align_items',
            descriptionFallback: 'Cross-axis alignment. Overridden by align / alignSm … alignXxl classes.'
        },
        {
            name: '--origam-row---justify-content',
            defaultValue: 'flex-start',
            descriptionKey: 'components.row.css_vars.justify_content',
            descriptionFallback: 'Main-axis distribution. Overridden by justify / justifySm … justifyXxl classes.'
        },
        {
            name: '--origam-row---margin-block-start',
            defaultValue: '-4px',
            descriptionKey: 'components.row.css_vars.margin_block_start',
            descriptionFallback: 'Default negative block-start margin that creates gutters with Col padding.'
        },
        {
            name: '--origam-row---margin-inline-start',
            defaultValue: '-4px',
            descriptionKey: 'components.row.css_vars.margin_inline_start',
            descriptionFallback: 'Default negative inline-start margin.'
        },
        {
            name: '--origam-row---density',
            defaultValue: '0px',
            descriptionKey: 'components.row.css_vars.density',
            descriptionFallback: 'Density offset added to block and inline margins. compact: −8px, comfortable: +8px.'
        },
        {
            name: '--origam-row--border---border-width',
            defaultValue: '{border.width.1}',
            descriptionKey: 'components.row.css_vars.border_width',
            descriptionFallback: 'Border width when the border modifier class is active.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.row.exposed.filter_props',
            descriptionFallback: 'Forwards a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.row.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from computed row styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.row.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.row.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.row.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.row.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.row.a11y.semantic_note',
                noteFallback: 'Row renders a plain div by default. For sectioning content, override the tag prop with a semantic element such as section or main.'
            }
        ]
    } satisfies IComponentA11y
}
