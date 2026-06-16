/**
 * /components/svg-icon — full documentation data for OrigamSvgIcon.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Icon/icon.interface.ts         (IIconComponentProps)
 *   - packages/ds/src/components/Icon/OrigamSvgIcon.vue         (template BEM, defineExpose)
 *   - packages/ds/tokens/component/icon.json                    (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const SVG_ICON_DOC: IComponentDoc = {
    slug: 'svg-icon',
    name: 'SvgIcon',
    tag: 'origam-svg-icon',
    icon: 'mdi-vector-square',
    category: 'Media & Display',
    descriptionKey: 'components.catalog.svg_icon.description',
    descriptionFallback: 'Renders an inline SVG path icon. Accepts a single path string or an array of multi-path entries with optional fill-opacity values.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-icon--design',
    docUrl: 'http://localhost:4000/components/Icon/OrigamIcon',

    parentSlug: 'icon',

    family: [
        {
            slug: 'icon',
            name: 'Icon',
            descriptionKey: 'components.catalog.icon.description',
            descriptionFallback: 'Universal icon renderer that dispatches to the correct icon strategy.'
        },
        {
            slug: 'class-icon',
            name: 'ClassIcon',
            descriptionKey: 'components.catalog.class_icon.description',
            descriptionFallback: 'Renders a CSS class-based icon (e.g. MDI font).'
        },
        {
            slug: 'component-icon',
            name: 'ComponentIcon',
            descriptionKey: 'components.catalog.component_icon.description',
            descriptionFallback: 'Renders a Vue component as an icon.'
        },
        {
            slug: 'ligature-icon',
            name: 'LigatureIcon',
            descriptionKey: 'components.catalog.ligature_icon.description',
            descriptionFallback: 'Renders a ligature-based icon (Material Symbols / Material Icons font).'
        }
    ],

    props: [
        {
            name: 'icon',
            type: { label: 'string | [string, number?][]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.svg_icon.props.icon.description',
            descriptionFallback: 'SVG path data. Pass a single path string for a single-path icon, or an array of [path, fillOpacity?] tuples for multi-path icons.'
        },
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.svg_icon.props.size.description',
            descriptionFallback: 'Icon size. Accepts a named size token (x-small, small, default, large, x-large) which applies a size class, or a number converted to px as an inline style.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.svg_icon.props.color.description',
            descriptionFallback: 'Icon fill colour. Accepts a semantic intent token or a CSS colour. Defaults to currentColor so the icon inherits the parent text colour.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.svg_icon.props.bg_color.description',
            descriptionFallback: 'Background colour of the root wrapper element.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.svg_icon.props.disabled.description',
            descriptionFallback: 'Applies the disabled token colour and reduces opacity.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.svg_icon.props.rounded.description',
            descriptionFallback: 'Border-radius token applied to the root wrapper.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.svg_icon.props.border.description',
            descriptionFallback: 'Applies a border to the root wrapper.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.svg_icon.props.tag.description',
            descriptionFallback: 'HTML element rendered as the wrapper around the SVG. Defaults to div.'
        }
    ],

    emits: [],

    slots: [],

    examples: [
        {
            titleKey: 'components.svg_icon.examples.basic.title',
            titleFallback: 'Basic SVG path icon',
            lang: 'vue',
            code: `<template>
  <!-- Single-path MDI heart icon (SVG path data) -->
  <origam-svg-icon
    icon="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3c1.74,0 3.41,.81 4.5,2.08C13.09,3.81 14.76,3 16.5,3 19.58,3 22,5.41 22,8.5c0,3.77 -3.4,6.86 -8.55,11.53L12,21.35Z"
    size="large"
    color="danger"
  />
</template>`
        },
        {
            titleKey: 'components.svg_icon.examples.multi_path.title',
            titleFallback: 'Multi-path icon',
            lang: 'vue',
            code: `<template>
  <!-- Two-path icon with opacity on second path -->
  <origam-svg-icon
    :icon="[
      ['M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z', 0.3],
      'M13 7h-2v5H7v2h6v-6h2V7z'
    ]"
  />
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { icon: 'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3c1.74,0 3.41,.81 4.5,2.08C13.09,3.81 14.76,3 16.5,3 19.58,3 22,5.41 22,8.5c0,3.77 -3.4,6.86 -8.55,11.53L12,21.35Z', size: 'default' } },
        { label: 'large', props: { icon: 'M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5 2,5.41 4.42,3 7.5,3c1.74,0 3.41,.81 4.5,2.08C13.09,3.81 14.76,3 16.5,3 19.58,3 22,5.41 22,8.5c0,3.77 -3.4,6.86 -8.55,11.53L12,21.35Z', size: 'large', color: 'danger' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-icon',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamSvgIcon',
        svgDesc: 'Schematic of the SvgIcon component with 3 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #f8f5ff)" rx="4"/>
  <rect x="270" y="30" width="160" height="140" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="283" y="52" font-size="8" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-family="'JetBrains Mono',monospace" font-weight="700">origam-icon--svg</text>
  <rect x="290" y="60" width="120" height="90" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1"/>
  <text x="350" y="80" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">origam-icon__svg</text>
  <text x="350" y="108" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">&lt;svg viewBox="0 0 24 24"&gt;</text>
  <text x="350" y="124" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">&lt;path :d="icon" /&gt;</text>
  <circle cx="278" cy="38" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="278" y="42" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="298" cy="68" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="298" y="72" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="298" cy="116" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="298" y="120" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-svg-icon&gt;</code> — 3 internal parts. The root wrapper carries size and colour classes; the inner <code>&lt;svg&gt;</code> is <code>aria-hidden</code> and renders one or more <code>&lt;path&gt;</code> elements.`,
        legend: [
            {
                num: 1,
                cls: '.origam-icon.origam-icon--svg',
                descriptionKey: 'components.svg_icon.anatomy.root',
                descriptionFallback: 'Root wrapper element (default <code>&lt;div&gt;</code>). Carries <code>origam-icon--svg</code>, optional size class (<code>origam-icon--size-{size}</code>), and inline size style for numeric sizes.'
            },
            {
                num: 2,
                cls: '.origam-icon__svg',
                descriptionKey: 'components.svg_icon.anatomy.svg',
                descriptionFallback: '<code>&lt;svg&gt;</code> element. Always <code>aria-hidden="true"</code> and <code>focusable="false"</code>. viewBox is fixed at 24x24. <code>fill: currentColor</code> — inherits colour from the parent.'
            },
            {
                num: 3,
                cls: 'path',
                descriptionKey: 'components.svg_icon.anatomy.path',
                descriptionFallback: 'One or more <code>&lt;path&gt;</code> elements. For multi-path arrays the second tuple value sets <code>fill-opacity</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-icon origam-icon--svg origam-icon--size-default">
  <svg
    aria-hidden="true"
    class="origam-icon__svg"
    focusable="false"
    viewBox="0 0 24 24"
    xmlns="http://www.w3.org/2000/svg"
  >
    <!-- single path -->
    <path :d="icon" />
    <!-- multi-path (array) -->
    <path :d="path[0]" :fill-opacity="path[1]" />
  </svg>
</div>`,
        classes: [
            {
                cls: 'origam-icon',
                descriptionKey: 'components.svg_icon.anatomy.root',
                descriptionFallback: 'Root wrapper element shared with all Icon sub-variants.'
            },
            {
                cls: 'origam-icon--svg',
                descriptionKey: 'components.svg_icon.anatomy.modifier_svg',
                descriptionFallback: 'Modifier class applied by SvgIcon. Enables inline-flex sizing layout for the SVG.'
            },
            {
                cls: 'origam-icon__svg',
                descriptionKey: 'components.svg_icon.anatomy.svg',
                descriptionFallback: 'Inner SVG element. Width and height 1em, fill currentColor.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-icon---color',
            defaultValue: 'currentColor',
            descriptionKey: 'components.svg_icon.css_vars.color',
            descriptionFallback: 'Icon fill colour. Defaults to currentColor so the icon inherits the parent text colour.'
        },
        {
            name: '--origam-icon---font-size-xs',
            defaultValue: '{font.size.xs}',
            descriptionKey: 'components.svg_icon.css_vars.font_size_xs',
            descriptionFallback: 'Icon size when size="x-small".'
        },
        {
            name: '--origam-icon---font-size-sm',
            defaultValue: '{font.size.sm}',
            descriptionKey: 'components.svg_icon.css_vars.font_size_sm',
            descriptionFallback: 'Icon size when size="small".'
        },
        {
            name: '--origam-icon---font-size-md',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.svg_icon.css_vars.font_size_md',
            descriptionFallback: 'Icon size when size="default".'
        },
        {
            name: '--origam-icon---font-size-lg',
            defaultValue: '{font.size.lg}',
            descriptionKey: 'components.svg_icon.css_vars.font_size_lg',
            descriptionFallback: 'Icon size when size="large".'
        },
        {
            name: '--origam-icon---font-size-xl',
            defaultValue: '{font.size.xl}',
            descriptionKey: 'components.svg_icon.css_vars.font_size_xl',
            descriptionFallback: 'Icon size when size="x-large".'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.svg_icon.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.svg_icon.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed icon styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.svg_icon.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.svg_icon.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.svg_icon.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.svg_icon.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.svg_icon.a11y.hidden_note',
                noteFallback: 'The inner <svg> element always carries aria-hidden="true" and focusable="false". The icon is decorative — the parent element must provide a meaningful aria-label when the icon conveys information.'
            },
            {
                noteKey: 'components.svg_icon.a11y.color_note',
                noteFallback: 'SVG paths inherit fill: currentColor. Ensure the surrounding text colour meets WCAG AA contrast ratio against the background.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/icon.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types. SvgIcon shares the icon token namespace with ClassIcon, LigatureIcon and ComponentIcon.',
        excerpt: [
            {
                tokenPath: 'icon.color',
                value: 'currentColor',
                type: 'color',
                descriptionKey: 'components.svg_icon.tokens.color',
                descriptionFallback: 'Default fill colour — inherits from the parent text colour.'
            },
            {
                tokenPath: 'icon.font-size-md',
                value: '{font.size.md}',
                type: 'dimension',
                descriptionKey: 'components.svg_icon.tokens.font_size_md',
                descriptionFallback: 'Size for the default size variant.'
            },
            {
                tokenPath: 'icon.font-size-lg',
                value: '{font.size.lg}',
                type: 'dimension',
                descriptionKey: 'components.svg_icon.tokens.font_size_lg',
                descriptionFallback: 'Size for the large variant.'
            },
            {
                tokenPath: 'icon.transition-duration',
                value: '{motion.duration.fast}',
                type: 'duration',
                descriptionKey: 'components.svg_icon.tokens.transition_duration',
                descriptionFallback: 'Transition duration for colour changes.'
            }
        ]
    } satisfies IComponentTokens
}
