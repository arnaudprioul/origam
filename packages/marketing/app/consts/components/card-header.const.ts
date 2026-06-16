/**
 * /components/card-header — full documentation data for OrigamCardHeader.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Card/card-header.interface.ts  (props / emits)
 *   - packages/ds/src/components/Card/OrigamCardHeader.vue      (template BEM, defineExpose)
 *   - CSS vars: <style> block in OrigamCardHeader.vue (:root section)
 *
 * Sub-component of: OrigamCard (parentSlug: 'card')
 * Note: OrigamCardHeader renders with tag='OrigamToolbar' by default and
 *       overrides toolbar's box-shadow/background/color to integrate into the Card surface.
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

export const CARD_HEADER_DOC: IComponentDoc = {
    slug: 'card-header',
    name: 'CardHeader',
    tag: 'origam-card-header',
    icon: 'mdi-card-text-outline',
    category: 'Surface',
    descriptionKey: 'components.catalog.card_header.description',
    descriptionFallback: 'Card header section rendering title, subtitle and optional prepend/append icon or avatar in a 3-column grid layout.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-card--design',
    docUrl: 'http://localhost:4000/components/Card/OrigamCard',
    parentSlug: 'card',

    family: [
        {
            slug: 'card',
            name: 'Card',
            descriptionKey: 'components.catalog.card.description',
            descriptionFallback: 'Versatile surface container with title, subtitle, image asset, text body and footer slots.'
        },
        {
            slug: 'card-text',
            name: 'CardText',
            descriptionKey: 'components.catalog.card_text.description',
            descriptionFallback: 'Card body text section with density-aware padding.'
        }
    ],

    related: [
        { slug: 'card', name: 'Card', kind: 'component', descriptionFallback: 'Parent card container that typically wraps OrigamCardHeader.', descriptionKey: 'components.catalog.card.description' },
        { slug: 'toolbar', name: 'Toolbar', kind: 'component', descriptionFallback: 'OrigamCardHeader renders as OrigamToolbar by default.', descriptionKey: 'components.catalog.toolbar.description' }
    ],

    props: [
        {
            name: 'title',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card_header.props.title.description',
            descriptionFallback: 'Primary heading text rendered in the content area. Can also be overridden with the #title slot.'
        },
        {
            name: 'subtitle',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card_header.props.subtitle.description',
            descriptionFallback: 'Secondary text rendered below the title. Slightly smaller and at reduced opacity (0.6). Can be overridden with the #subtitle slot.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'OrigamToolbar'",
            descriptionKey: 'components.card_header.props.tag.description',
            descriptionFallback: 'Root element tag. Defaults to OrigamToolbar so it picks up toolbar-level layout; overrides box-shadow and background to integrate into the card surface.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.card_header.props.density.description',
            descriptionFallback: 'Density modifier that adjusts padding block and inline values via --origam-card-header---density.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card_header.props.prepend_icon.description',
            descriptionFallback: 'MDI icon displayed in the prepend column (grid-area: prepend).'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card_header.props.append_icon.description',
            descriptionFallback: 'MDI icon displayed in the append column (grid-area: append).'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card_header.props.prepend_avatar.description',
            descriptionFallback: 'Image URL for an OrigamAvatar rendered in the prepend slot.'
        },
        {
            name: 'appendAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card_header.props.append_avatar.description',
            descriptionFallback: 'Image URL for an OrigamAvatar rendered in the append slot.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card_header.props.rounded.description',
            descriptionFallback: 'Border-radius for the header element.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.card_header.props.border.description',
            descriptionFallback: 'Applies a border to the header element. Sets border-width: thin when true.'
        }
    ],

    emits: [
        {
            event: 'click:prepend',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.card_header.emits.click_prepend.description',
            descriptionFallback: 'Fired when the user clicks the prepend slot area.'
        },
        {
            event: 'click:append',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.card_header.emits.click_append.description',
            descriptionFallback: 'Fired when the user clicks the append slot area.'
        }
    ],

    slots: [
        {
            slot: 'wrapper',
            slotProps: '—',
            descriptionKey: 'components.card_header.slots.wrapper.description',
            descriptionFallback: 'Full override of the header inner layout (prepend + content + append). When provided, all other slots and prop-driven rendering are bypassed.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.card_header.slots.prepend.description',
            descriptionFallback: 'Replaces the prepend column content. Rendered inside .origam-card-header__prepend.'
        },
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.card_header.slots.default.description',
            descriptionFallback: 'Extra content rendered inside .origam-card-header__content after the title and subtitle.'
        },
        {
            slot: 'title',
            slotProps: '{ title }',
            descriptionKey: 'components.card_header.slots.title.description',
            descriptionFallback: 'Override the title content. Receives the title prop value.'
        },
        {
            slot: 'subtitle',
            slotProps: '{ subtitle }',
            descriptionKey: 'components.card_header.slots.subtitle.description',
            descriptionFallback: 'Override the subtitle content. Receives the subtitle prop value.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.card_header.slots.append.description',
            descriptionFallback: 'Replaces the append column content. Rendered inside .origam-card-header__append.'
        }
    ],

    examples: [
        {
            titleKey: 'components.card_header.examples.basic.title',
            titleFallback: 'Basic card header',
            lang: 'vue',
            code: `<template>
  <origam-card>
    <origam-card-header
      title="Card Title"
      subtitle="Supporting text"
    />
  </origam-card>
</template>`
        },
        {
            titleKey: 'components.card_header.examples.with_icons.title',
            titleFallback: 'With prepend icon and append action',
            lang: 'vue',
            code: `<template>
  <origam-card>
    <origam-card-header
      title="Profile"
      subtitle="Account settings"
      prepend-icon="mdi-account-circle"
      append-icon="mdi-dots-vertical"
      @click:append="openMenu"
    />
  </origam-card>
</template>`
        },
        {
            titleKey: 'components.card_header.examples.avatar.title',
            titleFallback: 'With avatar',
            lang: 'vue',
            code: `<template>
  <origam-card>
    <origam-card-header
      title="John Doe"
      subtitle="Software Engineer"
      prepend-avatar="https://example.com/avatar.jpg"
    />
  </origam-card>
</template>`
        }
    ],

    previewVariants: [
        { label: 'title only', props: { title: 'Card Title' } },
        { label: 'with subtitle', props: { title: 'Card Title', subtitle: 'Supporting text here' } },
        { label: 'with prepend icon', props: { title: 'Profile', subtitle: 'Account', prependIcon: 'mdi-account-circle' } },
        { label: 'with append icon', props: { title: 'Settings', appendIcon: 'mdi-dots-vertical' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-card-header',
        svgViewBox: '0 0 700 140',
        svgTitle: 'Anatomy of OrigamCardHeader',
        svgDesc: 'Schematic of the CardHeader component with 6 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="140" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="100" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="20" y="20" width="660" height="100" rx="4" fill="none" stroke="var(--origam-color__action--primary---bg, #a855f7)" stroke-width="1" stroke-dasharray="6 3" opacity="0.5"/>
  <rect x="30" y="30" width="60" height="80" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="60" y="73" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">prepend</text>
  <rect x="100" y="30" width="480" height="80" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="110" y="38" width="460" height="24" rx="2" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.10))"/>
  <text x="340" y="54" font-size="12" fill="var(--origam-color__text---primary, #1a0533)" text-anchor="middle" font-family="sans-serif" font-weight="600">Title</text>
  <rect x="110" y="66" width="460" height="18" rx="2" fill="rgba(124,58,237,0.04)"/>
  <text x="340" y="79" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif" opacity="0.7">Subtitle</text>
  <rect x="590" y="30" width="60" height="80" rx="4" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="620" y="73" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">append</text>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="38" cy="32" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="38" y="36.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="38" cy="22" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="38" y="26.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="108" cy="32" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="108" y="36.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="118" cy="40" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="118" y="44.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="118" cy="68" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="118" y="72.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">6</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-card-header&gt;</code> — root grid ① (3-column: prepend / content / append), underlay ② (absolute), prepend ③, content area ④, title ⑤, subtitle ⑥.',
        legend: [
            {
                num: 1,
                cls: '.origam-card-header',
                descriptionKey: 'components.card_header.anatomy.root',
                descriptionFallback: 'Root element (renders as OrigamToolbar). 3-column grid: <code>max-content 1fr auto</code>. Overrides toolbar box-shadow and background to be transparent/none to match the card surface.'
            },
            {
                num: 2,
                cls: '.origam-card-header__underlay',
                descriptionKey: 'components.card_header.anatomy.underlay',
                descriptionFallback: 'Absolute positioned underlay span. Reserved for interaction overlays (position: absolute, inset: 0).'
            },
            {
                num: 3,
                cls: '.origam-card-header__prepend',
                descriptionKey: 'components.card_header.anatomy.prepend',
                descriptionFallback: 'Prepend column host (grid-area: prepend). Display: flex, align-items: center. Renders prependAvatar, prependIcon or #prepend slot.'
            },
            {
                num: 4,
                cls: '.origam-card-header__content',
                descriptionKey: 'components.card_header.anatomy.content',
                descriptionFallback: 'Content column host (grid-area: content). overflow: hidden. Contains title, subtitle and the #default slot.'
            },
            {
                num: 5,
                cls: '.origam-card-header__title',
                descriptionKey: 'components.card_header.anatomy.title',
                descriptionFallback: 'Title text block. font-size: 1rem, font-weight: 400, white-space: nowrap, overflow: hidden, text-overflow: ellipsis.'
            },
            {
                num: 6,
                cls: '.origam-card-header__subtitle',
                descriptionKey: 'components.card_header.anatomy.subtitle',
                descriptionFallback: 'Subtitle text block. opacity: 0.6, font-size: 0.875rem. Line-clamped via -webkit-box-orient: vertical.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: OrigamToolbar with overrides -->
<component :is="tag" class="origam-card-header">
  <!-- absolute underlay layer -->
  <span class="origam-card-header__underlay" />
  <slot name="wrapper">
    <!-- prepend: avatar or icon -->
    <div class="origam-card-header__prepend">
      <slot name="prepend">
        <origam-avatar v-if="prependAvatar" :image="prependAvatar" />
        <origam-icon v-if="prependIcon" :icon="prependIcon" />
      </slot>
    </div>
    <!-- content: title + subtitle + default slot -->
    <div class="origam-card-header__content">
      <div class="origam-card-header__title">
        <slot name="title">{{ title }}</slot>
      </div>
      <div class="origam-card-header__subtitle">
        <slot name="subtitle">{{ subtitle }}</slot>
      </div>
      <slot name="default" />
    </div>
    <!-- append: avatar or icon -->
    <div class="origam-card-header__append">
      <slot name="append">
        <origam-avatar v-if="appendAvatar" :image="appendAvatar" />
        <origam-icon v-if="appendIcon" :icon="appendIcon" />
      </slot>
    </div>
  </slot>
</component>`,
        classes: [
            {
                cls: 'origam-card-header',
                descriptionKey: 'components.card_header.anatomy.root',
                descriptionFallback: 'Root element. display: grid, 3-column layout, min-height: 40px (density-adjusted).'
            },
            {
                cls: 'origam-card-header__underlay',
                descriptionKey: 'components.card_header.anatomy.underlay',
                descriptionFallback: 'Absolute overlay/underlay reserved for interaction feedback.'
            },
            {
                cls: 'origam-card-header__prepend',
                descriptionKey: 'components.card_header.anatomy.prepend',
                descriptionFallback: 'Leading icon/avatar column.'
            },
            {
                cls: 'origam-card-header__content',
                descriptionKey: 'components.card_header.anatomy.content',
                descriptionFallback: 'Center text column. overflow: hidden.'
            },
            {
                cls: 'origam-card-header__title',
                descriptionKey: 'components.card_header.anatomy.title',
                descriptionFallback: 'Title text block with ellipsis truncation.'
            },
            {
                cls: 'origam-card-header__subtitle',
                descriptionKey: 'components.card_header.anatomy.subtitle',
                descriptionFallback: 'Subtitle text block at 0.6 opacity.'
            },
            {
                cls: 'origam-card-header__append',
                descriptionKey: 'components.card_header.anatomy.append',
                descriptionFallback: 'Trailing icon/avatar column.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-card-header---min-height',
            defaultValue: '40px',
            descriptionKey: 'components.card_header.css_vars.min_height',
            descriptionFallback: 'Minimum height of the header. Adjusted with density offset.'
        },
        {
            name: '--origam-card-header---padding-block-start',
            defaultValue: '8px',
            descriptionKey: 'components.card_header.css_vars.padding_block_start',
            descriptionFallback: 'Block-start padding (density-adjusted at render time).'
        },
        {
            name: '--origam-card-header---padding-block-end',
            defaultValue: '8px',
            descriptionKey: 'components.card_header.css_vars.padding_block_end',
            descriptionFallback: 'Block-end padding (density-adjusted).'
        },
        {
            name: '--origam-card-header---padding-inline-start',
            defaultValue: '16px',
            descriptionKey: 'components.card_header.css_vars.padding_inline_start',
            descriptionFallback: 'Inline-start padding (density-adjusted).'
        },
        {
            name: '--origam-card-header---padding-inline-end',
            defaultValue: '16px',
            descriptionKey: 'components.card_header.css_vars.padding_inline_end',
            descriptionFallback: 'Inline-end padding (density-adjusted).'
        },
        {
            name: '--origam-card-header---density',
            defaultValue: '0px',
            descriptionKey: 'components.card_header.css_vars.density',
            descriptionFallback: 'Density offset added to padding values. compact: −8px, default: 0px, comfortable: +8px.'
        },
        {
            name: '--origam-card-header---grid-template-areas',
            defaultValue: '"prepend content append"',
            descriptionKey: 'components.card_header.css_vars.grid_template_areas',
            descriptionFallback: 'Grid layout areas: prepend / content / append.'
        },
        {
            name: '--origam-card-header---grid-template-columns',
            defaultValue: 'max-content 1fr auto',
            descriptionKey: 'components.card_header.css_vars.grid_template_columns',
            descriptionFallback: 'Grid columns: prepend (shrink-to-content) / content (fill) / append (auto).'
        },
        {
            name: '--origam-card-header__title---font-size',
            defaultValue: '1rem',
            descriptionKey: 'components.card_header.css_vars.title_font_size',
            descriptionFallback: 'Title font size (1rem = 16px).'
        },
        {
            name: '--origam-card-header__subtitle---font-size',
            defaultValue: '0.875rem',
            descriptionKey: 'components.card_header.css_vars.subtitle_font_size',
            descriptionFallback: 'Subtitle font size (0.875rem = 14px).'
        },
        {
            name: '--origam-card-header__subtitle---opacity',
            defaultValue: '0.6',
            descriptionKey: 'components.card_header.css_vars.subtitle_opacity',
            descriptionFallback: 'Subtitle opacity (reduced to create visual hierarchy).'
        },
        {
            name: '--origam-card-header__icon---opacity',
            defaultValue: '0.87',
            descriptionKey: 'components.card_header.css_vars.icon_opacity',
            descriptionFallback: 'Opacity applied to icons in the prepend/append areas.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.card_header.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.card_header.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed cardHeaderStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.card_header.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.card_header.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.card_header.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.card_header.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.card_header.a11y.key_tab',
                actionFallback: 'Moves focus to interactive elements inside the header (prepend/append clicks).'
            }
        ],
        notes: [
            {
                noteKey: 'components.card_header.a11y.heading',
                noteFallback: 'The title prop is rendered as plain text in a <div>. If the card header serves as a section heading, wrap the title slot content in the appropriate heading element (<h2>, <h3>, etc.) for correct document outline.'
            },
            {
                noteKey: 'components.card_header.a11y.append_label',
                noteFallback: 'When appendIcon is an action (e.g. a menu trigger), add aria-label via the #append slot or on the wrapping element to describe the action to screen reader users.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/card.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. CardHeader tokens are namespaced under card-header.*.',
        excerpt: [
            {
                tokenPath: 'card-header.min-height',
                value: '40px',
                type: 'dimension',
                descriptionKey: 'components.card_header.tokens.min_height',
                descriptionFallback: 'Minimum height of the card header.'
            },
            {
                tokenPath: 'card-header.padding-inline',
                value: '16px',
                type: 'dimension',
                descriptionKey: 'components.card_header.tokens.padding_inline',
                descriptionFallback: 'Horizontal padding of the card header.'
            },
            {
                tokenPath: 'card-header.title.font-size',
                value: '1rem',
                type: 'dimension',
                descriptionKey: 'components.card_header.tokens.title_font_size',
                descriptionFallback: 'Title text size.'
            },
            {
                tokenPath: 'card-header.subtitle.font-size',
                value: '0.875rem',
                type: 'dimension',
                descriptionKey: 'components.card_header.tokens.subtitle_font_size',
                descriptionFallback: 'Subtitle text size.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'title',
                kind: 'text',
                labelKey: 'components.card_header.playground.title',
                labelFallback: 'Title',
                defaultValue: 'Card Title'
            },
            {
                prop: 'subtitle',
                kind: 'text',
                labelKey: 'components.card_header.playground.subtitle',
                labelFallback: 'Subtitle',
                defaultValue: 'Supporting text'
            },
            {
                prop: 'prependIcon',
                kind: 'select',
                labelKey: 'components.card_header.playground.prepend_icon',
                labelFallback: 'Prepend icon',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'mdi-account-circle', value: 'mdi-account-circle' },
                    { label: 'mdi-star', value: 'mdi-star' },
                    { label: 'mdi-image', value: 'mdi-image' }
                ]
            },
            {
                prop: 'appendIcon',
                kind: 'select',
                labelKey: 'components.card_header.playground.append_icon',
                labelFallback: 'Append icon',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'mdi-dots-vertical', value: 'mdi-dots-vertical' },
                    { label: 'mdi-close', value: 'mdi-close' },
                    { label: 'mdi-share-variant', value: 'mdi-share-variant' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.card_header.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'default', value: 'default' },
                    { label: 'compact', value: 'compact' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
