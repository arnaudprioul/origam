/**
 * /components/data-list — full documentation data for OrigamDataList.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DataList/data-list.interface.ts  (props)
 *   - packages/ds/src/components/DataList/OrigamDataList.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/data-list.json                 (CSS tokens)
 *
 * FAMILY:
 *   - OrigamDataText (OrigamDataList.vue sub-component: .origam-data-list__text)
 *   - OrigamDataTitle (OrigamDataList.vue sub-component: .origam-data-list__title)
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

export const DATA_LIST_DOC: IComponentDoc = {
    slug: 'data-list',
    name: 'DataList',
    tag: 'origam-data-list',
    icon: 'mdi-format-list-bulleted',
    category: 'Data Display',
    descriptionKey: 'components.catalog.data_list.description',
    descriptionFallback: 'Semantic description list (<dl>) with two layout modes: avatar (icon + title/text stacked) and kv (key/value rows aligned side-by-side).',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-datalist--design',
    docUrl: 'http://localhost:4000/components/DataList/OrigamDataList',

    family: [
        {
            slug: 'data-text',
            name: 'DataText',
            descriptionKey: 'components.catalog.data_text.description',
            descriptionFallback: 'Text row inside a DataList avatar-mode item (<dd> element).'
        },
        {
            slug: 'data-title',
            name: 'DataTitle',
            descriptionKey: 'components.catalog.data_title.description',
            descriptionFallback: 'Title row inside a DataList avatar-mode item (<dt> element with optional icon/avatar).'
        }
    ],

    related: [
        {
            slug: 'table',
            name: 'Table',
            kind: 'component',
            descriptionKey: 'components.catalog.table.description',
            descriptionFallback: 'Semantic <table> for tabular data — use DataList for definition/description layouts.'
        },
        {
            slug: 'data-table',
            name: 'DataTable',
            kind: 'component',
            descriptionKey: 'components.catalog.data_table.description',
            descriptionFallback: 'Feature-rich data table with sorting, grouping and pagination.'
        }
    ],

    props: [
        {
            name: 'mode',
            type: { label: "'avatar' | 'kv'", slug: '', kind: 'primitive' },
            defaultValue: "'avatar'",
            descriptionKey: 'components.data_list.props.mode.description',
            descriptionFallback: "Layout mode. 'avatar' renders icon+title/text stacks; 'kv' renders key/value rows aligned side-by-side."
        },
        {
            name: 'items',
            type: { label: 'Array<IDataItem> | Array<IDataListKVItem> | Record<string, IDataItem | IDataListKVItem>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_list.props.items.description',
            descriptionFallback: "Data source. Shape depends on mode: avatar items use IDataItem; kv items use IDataListKVItem. Accepts arrays or keyed objects."
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_list.props.color.description',
            descriptionFallback: 'Text/foreground colour applied to the list.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_list.props.bg_color.description',
            descriptionFallback: 'Background colour of the list.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.data_list.props.density.description',
            descriptionFallback: 'Vertical padding density for each item.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.data_list.props.border.description',
            descriptionFallback: 'Adds a border around the list and bottom dividers between items.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_list.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the list container.'
        },
        // ── IElevationProps ────────────────────────────────────────────
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_list.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation of the list container.'
        },
        // ── IAdjacentProps ─────────────────────────────────────────────
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_list.props.prepend_icon.description',
            descriptionFallback: 'Default icon for every item prepend area (can be overridden per-item).'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_list.props.prepend_avatar.description',
            descriptionFallback: 'Default avatar image URL for every item prepend area.'
        },
        // ── IPaddingProps / IMarginProps ───────────────────────────────
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_list.props.padding.description',
            descriptionFallback: 'Padding shorthand applied to the list container.'
        },
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_list.props.margin.description',
            descriptionFallback: 'Margin shorthand applied to the list container.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.data_list.slots.default.description',
            descriptionFallback: 'Full override of the list content. Use when the items prop is not sufficient.'
        },
        {
            slot: 'item.title',
            slotProps: '{ item: IDataItem, index: number }',
            descriptionKey: 'components.data_list.slots.item_title.description',
            descriptionFallback: 'Custom title renderer for avatar-mode items. Receives the item data and its index.'
        },
        {
            slot: 'item.title.prepend',
            slotProps: '{ item: IDataItem, index: number }',
            descriptionKey: 'components.data_list.slots.item_title_prepend.description',
            descriptionFallback: 'Custom prepend area inside the title row (avatar-mode).'
        },
        {
            slot: 'item.title.append',
            slotProps: '{ item: IDataItem, index: number }',
            descriptionKey: 'components.data_list.slots.item_title_append.description',
            descriptionFallback: 'Custom append area inside the title row (avatar-mode).'
        },
        {
            slot: 'item.text',
            slotProps: '{ text: IDataTextProps, index: number }',
            descriptionKey: 'components.data_list.slots.item_text.description',
            descriptionFallback: 'Custom text renderer for each text row inside an avatar-mode item.'
        }
    ],

    examples: [
        {
            titleKey: 'components.data_list.examples.avatar.title',
            titleFallback: 'Avatar mode (default)',
            lang: 'vue',
            code: `<template>
  <origam-data-list :items="contacts" />
</template>

<script setup lang="ts">
  const contacts = [
    {
      title: { text: 'Alice Martin', prependAvatar: 'https://i.pravatar.cc/40?u=alice' },
      text: [
        { text: 'alice@example.com', prependIcon: 'mdi-email-outline' },
        { text: '+33 6 12 34 56 78',  prependIcon: 'mdi-phone-outline' }
      ]
    }
  ]
</script>`
        },
        {
            titleKey: 'components.data_list.examples.kv.title',
            titleFallback: 'Key/value mode',
            lang: 'vue',
            code: `<template>
  <origam-data-list
    mode="kv"
    :items="details"
    border
    rounded="md"
  />
</template>

<script setup lang="ts">
  const details = [
    { key: 'Status',   value: 'Active' },
    { key: 'Plan',     value: 'Pro' },
    { key: 'Created',  value: '2024-01-15' }
  ]
</script>`
        },
        {
            titleKey: 'components.data_list.examples.slot.title',
            titleFallback: 'Custom title slot',
            lang: 'vue',
            code: `<template>
  <origam-data-list :items="items">
    <template #item.title="{ item }">
      <strong>{{ item.title?.text }}</strong>
      <origam-chip color="success" size="small" text="Verified" />
    </template>
  </origam-data-list>
</template>`
        }
    ],

    previewVariants: [
        { label: 'avatar mode', props: { mode: 'avatar' } },
        { label: 'kv mode', props: { mode: 'kv' } },
        { label: 'bordered', props: { mode: 'kv', border: true, rounded: 'md' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-data-list',
        svgViewBox: '0 0 700 300',
        svgTitle: 'Anatomy of OrigamDataList',
        svgDesc: 'Schematic of the DataList component in avatar mode and kv mode.',
        svg: `
  <rect x="0" y="0" width="700" height="300" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <text x="175" y="22" font-size="10" fill="var(--origam-color__text---secondary, #555)" text-anchor="middle" font-weight="700">mode="avatar"</text>
  <text x="525" y="22" font-size="10" fill="var(--origam-color__text---secondary, #555)" text-anchor="middle" font-weight="700">mode="kv"</text>
  <rect x="20" y="30" width="310" height="250" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.1))" stroke-width="1.5"/>
  <circle cx="36" cy="38" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="42.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <rect x="28" y="50" width="294" height="80" rx="4" fill="none" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.08))" stroke-width="1" stroke-dasharray="4 2"/>
  <circle cx="52" cy="75" r="18" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.1))"/>
  <text x="52" y="79" font-size="9" fill="var(--origam-color__text---secondary, #666)" text-anchor="middle">av.</text>
  <circle cx="44" cy="62" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="44" y="66.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <text x="96" y="68" font-size="11" fill="var(--origam-color__text---primary, #222)" font-family="system-ui" font-weight="600">Alice Martin</text>
  <circle cx="80" cy="62" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="80" y="66.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="96" y="86" font-size="10" fill="var(--origam-color__text---secondary, #666)" font-family="system-ui">alice@example.com</text>
  <circle cx="80" cy="82" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="80" y="86.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <rect x="380" y="30" width="300" height="250" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.1))" stroke-width="1.5"/>
  <circle cx="396" cy="38" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="396" y="42.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <line x1="388" y1="96" x2="672" y2="96" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.1))" stroke-width="1"/>
  <text x="400" y="74" font-size="10" fill="var(--origam-color__text---secondary, #888)" font-family="system-ui">Status</text>
  <text x="540" y="74" font-size="10" fill="var(--origam-color__text---primary, #222)" font-family="system-ui">Active</text>
  <circle cx="520" cy="70" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="520" y="74.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="396" cy="70" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="396" y="74.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">6</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-data-list&gt;</code> in avatar mode (left) and kv mode (right). Avatar mode renders a <code>&lt;dl&gt;</code> with <code>&lt;dt&gt;</code> titles and <code>&lt;dd&gt;</code> text rows. KV mode renders a key/value grid layout.`,
        legend: [
            {
                num: 1,
                cls: '.origam-data-list',
                descriptionKey: 'components.data_list.anatomy.root',
                descriptionFallback: 'Root element. Renders as <code>&lt;dl&gt;</code> in avatar mode, <code>&lt;div&gt;</code> in kv mode. Background, padding and border-radius from tokens.'
            },
            {
                num: 2,
                cls: '.origam-data-list__title',
                descriptionKey: 'components.data_list.anatomy.title',
                descriptionFallback: '<code>&lt;dt&gt;</code> element. Hosts the <code>OrigamDataTitle</code> with its prepend avatar/icon and text. Only in avatar mode.'
            },
            {
                num: 3,
                cls: '.origam-data-list__text (first)',
                descriptionKey: 'components.data_list.anatomy.text',
                descriptionFallback: '<code>&lt;dd&gt;</code> elements. Each text row rendered by <code>OrigamDataText</code>. Stacked below the title in avatar mode.'
            },
            {
                num: 4,
                cls: '.origam-data-list__text (nth)',
                descriptionKey: 'components.data_list.anatomy.text_nth',
                descriptionFallback: 'Additional text rows. Multiple rows are stacked vertically within the item.'
            },
            {
                num: 5,
                cls: '.origam-data-list__kv-value',
                descriptionKey: 'components.data_list.anatomy.kv_value',
                descriptionFallback: '<code>&lt;dd&gt;</code> element for the value in kv mode. Right-aligned. Accepts inline components (Chip, Avatar…).'
            },
            {
                num: 6,
                cls: '.origam-data-list__kv-key',
                descriptionKey: 'components.data_list.anatomy.kv_key',
                descriptionFallback: '<code>&lt;dt&gt;</code> element for the key in kv mode. Width fixed by <code>--origam-data-list__kv---key-width</code>. Muted colour.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- mode="avatar" — semantic <dl> layout -->
<dl class="origam-data-list">
  <!-- per IDataItem -->
  <div class="origam-data-list__item">
    <dt class="origam-data-list__title">
      <!-- OrigamDataTitle: avatar/icon + text -->
    </dt>
    <dd class="origam-data-list__text">
      <!-- OrigamDataText per text entry -->
    </dd>
  </div>
</dl>

<!-- mode="kv" — key/value grid -->
<dl class="origam-data-list origam-data-list--kv">
  <!-- per IDataListKVItem -->
  <div class="origam-data-list__kv-row">
    <dt class="origam-data-list__kv-key">Status</dt>
    <dd class="origam-data-list__kv-value">Active</dd>
  </div>
</dl>`,
        classes: [
            { cls: 'origam-data-list', descriptionKey: 'components.data_list.anatomy.root', descriptionFallback: 'Root list element (dl in avatar mode).' },
            { cls: 'origam-data-list--kv', descriptionKey: 'components.data_list.anatomy.kv_modifier', descriptionFallback: 'Applied when mode="kv". Switches to key/value grid layout.' },
            { cls: 'origam-data-list__title', descriptionKey: 'components.data_list.anatomy.title', descriptionFallback: 'Title row (dt) in avatar mode.' },
            { cls: 'origam-data-list__text', descriptionKey: 'components.data_list.anatomy.text', descriptionFallback: 'Text row (dd) in avatar mode.' },
            { cls: 'origam-data-list__kv-key', descriptionKey: 'components.data_list.anatomy.kv_key', descriptionFallback: 'Key cell (dt) in kv mode.' },
            { cls: 'origam-data-list__kv-value', descriptionKey: 'components.data_list.anatomy.kv_value', descriptionFallback: 'Value cell (dd) in kv mode.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-data-list---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.data_list.css_vars.background_color',
            descriptionFallback: 'Root list background colour.'
        },
        {
            name: '--origam-data-list---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.data_list.css_vars.color',
            descriptionFallback: 'Root list foreground colour.'
        },
        {
            name: '--origam-data-list---border-radius',
            defaultValue: '{radius.none}',
            descriptionKey: 'components.data_list.css_vars.border_radius',
            descriptionFallback: 'List container border-radius.'
        },
        {
            name: '--origam-data-list__title---font-size',
            defaultValue: '{font.size.sm}',
            descriptionKey: 'components.data_list.css_vars.title_font_size',
            descriptionFallback: 'Font size of avatar-mode title rows.'
        },
        {
            name: '--origam-data-list__title---font-weight',
            defaultValue: '{font.weight.medium}',
            descriptionKey: 'components.data_list.css_vars.title_font_weight',
            descriptionFallback: 'Font weight of avatar-mode title rows.'
        },
        {
            name: '--origam-data-list__title---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.data_list.css_vars.title_color',
            descriptionFallback: 'Text colour of avatar-mode title rows.'
        },
        {
            name: '--origam-data-list__kv---key-width',
            defaultValue: '160px',
            descriptionKey: 'components.data_list.css_vars.kv_key_width',
            descriptionFallback: 'Fixed width of the key column in kv mode.'
        },
        {
            name: '--origam-data-list__kv---key-color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.data_list.css_vars.kv_key_color',
            descriptionFallback: 'Text colour of kv-mode keys.'
        },
        {
            name: '--origam-data-list__kv---value-color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.data_list.css_vars.kv_value_color',
            descriptionFallback: 'Text colour of kv-mode values.'
        },
        {
            name: '--origam-data-list__kv---row-divider',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.data_list.css_vars.kv_row_divider',
            descriptionFallback: 'Bottom border colour between kv rows.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.data_list.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.data_list.exposed.css',
            descriptionFallback: 'Reactive CSS string for the injected style sheet.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.data_list.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.data_list.exposed.load',
            descriptionFallback: 'Injects the style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.data_list.exposed.unload',
            descriptionFallback: 'Removes the style sheet from the document.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.data_list.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['term', 'definition'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.data_list.a11y.dl_note',
                noteFallback: 'Avatar mode renders a semantic <dl> with <dt> (term/title) and <dd> (definition/text) elements. This provides native screen-reader association between key and value without ARIA.'
            },
            {
                noteKey: 'components.data_list.a11y.kv_note',
                noteFallback: 'KV mode also uses <dl>/<dt>/<dd> structure, which is the recommended HTML pattern for key/value pairs. Do not use a <table> unless the data is truly tabular (multiple columns with a column header).'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/data-list.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'data-list.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.data_list.tokens.background_color',
                descriptionFallback: 'Root list background.'
            },
            {
                tokenPath: 'data-list.title.font-weight',
                value: '{font.weight.medium}',
                type: 'fontWeight',
                descriptionKey: 'components.data_list.tokens.title_font_weight',
                descriptionFallback: 'Title row font weight.'
            },
            {
                tokenPath: 'data-list.kv.key-width',
                value: '160px',
                type: 'dimension',
                descriptionKey: 'components.data_list.tokens.kv_key_width',
                descriptionFallback: 'Fixed width of the key column in kv mode.'
            },
            {
                tokenPath: 'data-list.kv.row-divider',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.data_list.tokens.kv_row_divider',
                descriptionFallback: 'Row bottom border colour in kv mode.'
            },
            {
                tokenPath: 'data-list.item.hover-background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.data_list.tokens.item_hover_background_color',
                descriptionFallback: 'Item background on hover.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'mode',
                kind: 'select',
                labelKey: 'components.data_list.playground.mode',
                labelFallback: 'Mode',
                defaultValue: 'avatar',
                options: [
                    { label: 'avatar', value: 'avatar' },
                    { label: 'kv', value: 'kv' }
                ]
            },
            {
                prop: 'border',
                kind: 'switch',
                labelKey: 'components.data_list.playground.border',
                labelFallback: 'Border',
                defaultValue: false
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.data_list.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.data_list.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'default', value: 'default' },
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'compact', value: 'compact' }
                ]
            },
            {
                prop: 'elevation',
                kind: 'select',
                labelKey: 'components.data_list.playground.elevation',
                labelFallback: 'Elevation',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
