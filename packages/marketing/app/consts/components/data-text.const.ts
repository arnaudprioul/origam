/**
 * /components/data-text — full documentation data for OrigamDataText.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DataList/data-text.interface.ts  (IDataTextProps)
 *   - packages/ds/src/components/DataList/OrigamDataText.vue      (template BEM)
 *   - packages/ds/tokens/component/data-list.json                  (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const DATA_TEXT_DOC: IComponentDoc = {
    slug: 'data-text',
    name: 'DataText',
    tag: 'origam-data-text',
    icon: 'mdi-format-list-text',
    category: 'Data Display',
    descriptionKey: 'components.catalog.data_text.description',
    descriptionFallback: 'Term-definition value cell rendered as a <dd> element. Displays text content with optional prepend/append avatar or icon. Used inside OrigamDataList to pair with OrigamDataTitle.',
    packageNote: 'origam',
    parentSlug: 'data-list',

    family: [
        { slug: 'data-list', name: 'DataList', descriptionKey: 'components.catalog.data_list.description', descriptionFallback: 'Key–value list container.' },
        { slug: 'data-title', name: 'DataTitle', descriptionKey: 'components.catalog.data_title.description', descriptionFallback: 'Term label cell rendered as a <dt> element.' }
    ],

    related: [
        { slug: 'data-list', name: 'DataList', kind: 'component', descriptionKey: 'components.catalog.data_list.description', descriptionFallback: 'Parent container for DataTitle + DataText pairs.' },
        { slug: 'data-title', name: 'DataTitle', kind: 'component', descriptionKey: 'components.catalog.data_title.description', descriptionFallback: 'Paired term label for this value cell.' }
    ],

    props: [
        {
            name: 'text',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.data_text.props.text.description',
            descriptionFallback: 'Value content rendered in the default slot when no slot override is provided.'
        },
        {
            name: 'color',
            type: { label: 'TColor | string', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_text.props.color.description',
            descriptionFallback: 'Text colour — tokenised intent value or custom CSS colour.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor | string', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_text.props.bg_color.description',
            descriptionFallback: 'Background colour of the cell.'
        },
        {
            name: 'hoverColor',
            type: { label: 'TColor | string', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_text.props.hover_color.description',
            descriptionFallback: 'Text colour applied on hover. Falls back to color when absent.'
        },
        {
            name: 'hoverBgColor',
            type: { label: 'TColor | string', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_text.props.hover_bg_color.description',
            descriptionFallback: 'Background colour applied on hover.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_text.props.density.description',
            descriptionFallback: 'Density modifier forwarded to prepend/append icons and avatars.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_text.props.prepend_icon.description',
            descriptionFallback: 'MDI icon rendered in the prepend slot when no slot override is provided.'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_text.props.prepend_avatar.description',
            descriptionFallback: 'Image URL for an avatar rendered in the prepend area.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_text.props.append_icon.description',
            descriptionFallback: 'MDI icon rendered in the append slot when no slot override is provided.'
        },
        {
            name: 'appendAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_text.props.append_avatar.description',
            descriptionFallback: 'Image URL for an avatar rendered in the append area.'
        }
    ],

    emits: [
        {
            event: 'click:prepend',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_text.emits.click_prepend.description',
            descriptionFallback: 'Fired when the prepend area is clicked.'
        },
        {
            event: 'click:append',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_text.emits.click_append.description',
            descriptionFallback: 'Fired when the append area is clicked.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.data_text.slots.default.description',
            descriptionFallback: 'Value content. Falls back to the text prop.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.data_text.slots.prepend.description',
            descriptionFallback: 'Custom content before the value. When absent, renders prependAvatar or prependIcon.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.data_text.slots.append.description',
            descriptionFallback: 'Custom content after the value. When absent, renders appendAvatar or appendIcon.'
        }
    ],

    examples: [
        {
            titleKey: 'components.data_text.examples.basic.title',
            titleFallback: 'Basic usage inside DataList',
            lang: 'vue',
            code: `<template>
  <origam-data-list>
    <origam-data-title text="Author" />
    <origam-data-text text="Jane Doe" />
    <origam-data-title text="Status" />
    <origam-data-text text="Active" color="success" />
  </origam-data-list>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-data-text',
        svgViewBox: '0 0 560 100',
        svgTitle: 'Anatomy of OrigamDataText',
        svgDesc: 'A dd element with optional prepend, content and append spans.',
        svg: `
  <rect x="0" y="0" width="560" height="100" rx="4" fill="var(--origam-color__surface---sunken, #f8f5ff)"/>
  <rect x="12" y="20" width="536" height="60" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.2))" stroke-width="1"/>
  <rect x="24" y="34" width="44" height="32" rx="2" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.08))"/>
  <rect x="80" y="38" width="200" height="24" rx="2" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.06))"/>
  <rect x="490" y="34" width="44" height="32" rx="2" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.08))"/>
  <circle cx="20" cy="20" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="20" y="24" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="48" cy="34" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="48" y="38" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="160" cy="34" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="160" y="38" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="512" cy="34" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="512" y="38" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-data-text&gt;</code> — 4 parts: root <code>&lt;dd&gt;</code> ①, prepend area ②, content span ③, append area ④.`,
        legend: [
            { num: 1, cls: '.origam-data-text', descriptionKey: 'components.data_text.anatomy.root', descriptionFallback: 'Root <dd> element.' },
            { num: 2, cls: '.origam-data-text__prepend', descriptionKey: 'components.data_text.anatomy.prepend', descriptionFallback: 'Prepend span hosting avatar or icon.' },
            { num: 3, cls: '.origam-data-text__content', descriptionKey: 'components.data_text.anatomy.content', descriptionFallback: 'Content span with data-no-activator attribute.' },
            { num: 4, cls: '.origam-data-text__append', descriptionKey: 'components.data_text.anatomy.append', descriptionFallback: 'Append span hosting avatar or icon.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<dd class="origam-data-text">
  <span class="origam-data-text__prepend"><!-- prepend slot --></span>
  <span class="origam-data-text__content" data-no-activator="">
    <!-- default slot / text prop -->
  </span>
  <span class="origam-data-text__append"><!-- append slot --></span>
</dd>`,
        classes: [
            { cls: 'origam-data-text', descriptionKey: 'components.data_text.anatomy.root', descriptionFallback: 'Root <dd> element.' },
            { cls: 'origam-data-text__prepend', descriptionKey: 'components.data_text.anatomy.prepend', descriptionFallback: 'Prepend area.' },
            { cls: 'origam-data-text__content', descriptionKey: 'components.data_text.anatomy.content', descriptionFallback: 'Content area.' },
            { cls: 'origam-data-text__append', descriptionKey: 'components.data_text.anatomy.append', descriptionFallback: 'Append area.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-data-list---text-font-size',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.data_text.css_vars.font_size',
            descriptionFallback: 'Font size of the value text.'
        },
        {
            name: '--origam-data-list---text-color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.data_text.css_vars.color',
            descriptionFallback: 'Text colour of the value cell.'
        },
        {
            name: '--origam-data-list---text-line-height',
            defaultValue: '{font.lineHeight.normal}',
            descriptionKey: 'components.data_text.css_vars.line_height',
            descriptionFallback: 'Line height of the value text.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        { name: 'filterProps', type: '(props: IDataTextProps, exclude?: string[]) => Partial<IDataTextProps>', descriptionKey: 'components.data_text.exposed.filter_props', descriptionFallback: 'Filters component props for forwarding to child components.' },
        { name: 'css', type: 'ComputedRef<string>', descriptionKey: 'components.data_text.exposed.css', descriptionFallback: 'Serialised scoped CSS string.' },
        { name: 'id', type: 'string', descriptionKey: 'components.data_text.exposed.id', descriptionFallback: 'Unique style scope identifier.' },
        { name: 'load', type: '() => void', descriptionKey: 'components.data_text.exposed.load', descriptionFallback: 'Mounts the scoped style sheet.' },
        { name: 'unload', type: '() => void', descriptionKey: 'components.data_text.exposed.unload', descriptionFallback: 'Unmounts the scoped style sheet.' },
        { name: 'isLoaded', type: 'Ref<boolean>', descriptionKey: 'components.data_text.exposed.is_loaded', descriptionFallback: 'Whether the scoped style sheet is currently mounted.' }
    ],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            { noteKey: 'components.data_text.a11y.dd_semantic', noteFallback: 'Rendered as a <dd> element — semantically correct value cell in a description list.' },
            { noteKey: 'components.data_text.a11y.contrast', noteFallback: 'The v-contrast directive adjusts text colour automatically for sufficient contrast.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/data-list.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. DataText uses the data-list.text.* sub-namespace.',
        excerpt: [
            { tokenPath: 'data-list.text.font-size', value: '{font.size.md}', type: 'dimension', descriptionKey: 'components.data_text.tokens.font_size', descriptionFallback: 'Value text font size.' },
            { tokenPath: 'data-list.text.color', value: '{color.text.primary}', type: 'color', descriptionKey: 'components.data_text.tokens.color', descriptionFallback: 'Value text colour.' },
            { tokenPath: 'data-list.text.line-height', value: '{font.lineHeight.normal}', type: 'number', descriptionKey: 'components.data_text.tokens.line_height', descriptionFallback: 'Value text line height.' },
            { tokenPath: 'data-list.text.letter-spacing', value: '{font.letterSpacing.normal}', type: 'dimension', descriptionKey: 'components.data_text.tokens.letter_spacing', descriptionFallback: 'Value text letter spacing.' }
        ]
    } satisfies IComponentTokens
}
