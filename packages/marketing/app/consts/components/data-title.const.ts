/**
 * /components/data-title — full documentation data for OrigamDataTitle.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DataList/data-title.interface.ts  (IDataTitleProps)
 *   - packages/ds/src/components/DataList/OrigamDataTitle.vue      (template BEM)
 *   - packages/ds/tokens/component/data-list.json                   (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const DATA_TITLE_DOC: IComponentDoc = {
    slug: 'data-title',
    name: 'DataTitle',
    tag: 'origam-data-title',
    icon: 'mdi-format-list-group',
    category: 'Data Display',
    descriptionKey: 'components.catalog.data_title.description',
    descriptionFallback: 'Term label cell rendered as a <dt> element. Displays a key label with optional prepend/append avatar or icon. Used inside OrigamDataList paired with OrigamDataText.',
    packageNote: 'origam',
    parentSlug: 'data-list',

    family: [
        { slug: 'data-list', name: 'DataList', descriptionKey: 'components.catalog.data_list.description', descriptionFallback: 'Key–value list container.' },
        { slug: 'data-text', name: 'DataText', descriptionKey: 'components.catalog.data_text.description', descriptionFallback: 'Value cell rendered as a <dd> element.' }
    ],

    related: [
        { slug: 'data-list', name: 'DataList', kind: 'component', descriptionKey: 'components.catalog.data_list.description', descriptionFallback: 'Parent container for DataTitle + DataText pairs.' },
        { slug: 'data-text', name: 'DataText', kind: 'component', descriptionKey: 'components.catalog.data_text.description', descriptionFallback: 'Paired value cell for this term label.' }
    ],

    props: [
        {
            name: 'text',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.data_title.props.text.description',
            descriptionFallback: 'Term label rendered in the default slot when no slot override is provided.'
        },
        {
            name: 'color',
            type: { label: 'TColor | string', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_title.props.color.description',
            descriptionFallback: 'Text colour — tokenised intent value or custom CSS colour.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor | string', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_title.props.bg_color.description',
            descriptionFallback: 'Background colour of the cell.'
        },
        {
            name: 'hoverColor',
            type: { label: 'TColor | string', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_title.props.hover_color.description',
            descriptionFallback: 'Text colour applied on hover. Falls back to color when absent.'
        },
        {
            name: 'hoverBgColor',
            type: { label: 'TColor | string', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_title.props.hover_bg_color.description',
            descriptionFallback: 'Background colour applied on hover.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_title.props.density.description',
            descriptionFallback: 'Density modifier forwarded to prepend/append icons and avatars.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_title.props.prepend_icon.description',
            descriptionFallback: 'MDI icon rendered in the prepend slot when no slot override is provided.'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_title.props.prepend_avatar.description',
            descriptionFallback: 'Image URL for an avatar rendered in the prepend area.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_title.props.append_icon.description',
            descriptionFallback: 'MDI icon rendered in the append slot when no slot override is provided.'
        },
        {
            name: 'appendAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.data_title.props.append_avatar.description',
            descriptionFallback: 'Image URL for an avatar rendered in the append area.'
        }
    ],

    emits: [
        {
            event: 'click:prepend',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_title.emits.click_prepend.description',
            descriptionFallback: 'Fired when the prepend area is clicked.'
        },
        {
            event: 'click:append',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.data_title.emits.click_append.description',
            descriptionFallback: 'Fired when the append area is clicked.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ text: string | number }',
            descriptionKey: 'components.data_title.slots.default.description',
            descriptionFallback: 'Term label content. Receives the text prop as slot prop. Falls back to displaying text directly.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.data_title.slots.prepend.description',
            descriptionFallback: 'Custom content before the term. When absent, renders prependAvatar or prependIcon.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.data_title.slots.append.description',
            descriptionFallback: 'Custom content after the term. When absent, renders appendAvatar or appendIcon.'
        }
    ],

    examples: [
        {
            titleKey: 'components.data_title.examples.basic.title',
            titleFallback: 'Basic usage inside DataList',
            lang: 'vue',
            code: `<template>
  <origam-data-list>
    <origam-data-title text="Author" />
    <origam-data-text text="Jane Doe" />
    <origam-data-title text="Version" prepend-icon="mdi-tag" />
    <origam-data-text text="2.6.0" />
  </origam-data-list>
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-data-title',
        svgViewBox: '0 0 560 100',
        svgTitle: 'Anatomy of OrigamDataTitle',
        svgDesc: 'A dt element with optional prepend, content and append spans.',
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
        figcaption: `Anatomy of <code>&lt;origam-data-title&gt;</code> — 4 parts: root <code>&lt;dt&gt;</code> ①, prepend area ②, content span ③, append area ④.`,
        legend: [
            { num: 1, cls: '.origam-data-title', descriptionKey: 'components.data_title.anatomy.root', descriptionFallback: 'Root <dt> element.' },
            { num: 2, cls: '.origam-data-title__prepend', descriptionKey: 'components.data_title.anatomy.prepend', descriptionFallback: 'Prepend span hosting avatar or icon.' },
            { num: 3, cls: '.origam-data-title__content', descriptionKey: 'components.data_title.anatomy.content', descriptionFallback: 'Content span with data-no-activator attribute.' },
            { num: 4, cls: '.origam-data-title__append', descriptionKey: 'components.data_title.anatomy.append', descriptionFallback: 'Append span hosting avatar or icon.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<dt class="origam-data-title">
  <span class="origam-data-title__prepend"><!-- prepend slot --></span>
  <span class="origam-data-title__content" data-no-activator="">
    <!-- default slot / text prop -->
  </span>
  <span class="origam-data-title__append"><!-- append slot --></span>
</dt>`,
        classes: [
            { cls: 'origam-data-title', descriptionKey: 'components.data_title.anatomy.root', descriptionFallback: 'Root <dt> element.' },
            { cls: 'origam-data-title__prepend', descriptionKey: 'components.data_title.anatomy.prepend', descriptionFallback: 'Prepend area.' },
            { cls: 'origam-data-title__content', descriptionKey: 'components.data_title.anatomy.content', descriptionFallback: 'Content area.' },
            { cls: 'origam-data-title__append', descriptionKey: 'components.data_title.anatomy.append', descriptionFallback: 'Append area.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-data-list---title-font-size',
            defaultValue: '{font.size.sm}',
            descriptionKey: 'components.data_title.css_vars.font_size',
            descriptionFallback: 'Font size of the term label.'
        },
        {
            name: '--origam-data-list---title-font-weight',
            defaultValue: '{font.weight.medium}',
            descriptionKey: 'components.data_title.css_vars.font_weight',
            descriptionFallback: 'Font weight of the term label.'
        },
        {
            name: '--origam-data-list---title-color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.data_title.css_vars.color',
            descriptionFallback: 'Text colour of the term label.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        { name: 'filterProps', type: '(props: IDataTitleProps, exclude?: string[]) => Partial<IDataTitleProps>', descriptionKey: 'components.data_title.exposed.filter_props', descriptionFallback: 'Filters component props for forwarding to child components.' },
        { name: 'css', type: 'ComputedRef<string>', descriptionKey: 'components.data_title.exposed.css', descriptionFallback: 'Serialised scoped CSS string.' },
        { name: 'id', type: 'string', descriptionKey: 'components.data_title.exposed.id', descriptionFallback: 'Unique style scope identifier.' },
        { name: 'load', type: '() => void', descriptionKey: 'components.data_title.exposed.load', descriptionFallback: 'Mounts the scoped style sheet.' },
        { name: 'unload', type: '() => void', descriptionKey: 'components.data_title.exposed.unload', descriptionFallback: 'Unmounts the scoped style sheet.' },
        { name: 'isLoaded', type: 'Ref<boolean>', descriptionKey: 'components.data_title.exposed.is_loaded', descriptionFallback: 'Whether the scoped style sheet is currently mounted.' }
    ],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            { noteKey: 'components.data_title.a11y.dt_semantic', noteFallback: 'Rendered as a <dt> element — semantically correct term cell in a description list.' },
            { noteKey: 'components.data_title.a11y.contrast', noteFallback: 'The v-contrast directive adjusts text colour automatically for sufficient contrast.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/data-list.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. DataTitle uses the data-list.title.* sub-namespace.',
        excerpt: [
            { tokenPath: 'data-list.title.font-size', value: '{font.size.sm}', type: 'dimension', descriptionKey: 'components.data_title.tokens.font_size', descriptionFallback: 'Term label font size.' },
            { tokenPath: 'data-list.title.font-weight', value: '{font.weight.medium}', type: 'fontWeight', descriptionKey: 'components.data_title.tokens.font_weight', descriptionFallback: 'Term label font weight.' },
            { tokenPath: 'data-list.title.color', value: '{color.text.secondary}', type: 'color', descriptionKey: 'components.data_title.tokens.color', descriptionFallback: 'Term label colour.' },
            { tokenPath: 'data-list.title.line-height', value: '{font.lineHeight.normal}', type: 'number', descriptionKey: 'components.data_title.tokens.line_height', descriptionFallback: 'Term label line height.' },
            { tokenPath: 'data-list.title.letter-spacing', value: '{font.letterSpacing.wide}', type: 'dimension', descriptionKey: 'components.data_title.tokens.letter_spacing', descriptionFallback: 'Term label letter spacing.' }
        ]
    } satisfies IComponentTokens
}
