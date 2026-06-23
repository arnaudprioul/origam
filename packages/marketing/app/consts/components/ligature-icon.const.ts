/**
 * /components/ligature-icon — full documentation data for OrigamLigatureIcon.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Icon/icon.interface.ts               (IIconComponentProps)
 *   - packages/ds/src/components/Icon/OrigamLigatureIcon.vue          (template BEM, defineExpose)
 *   - packages/ds/tokens/component/icon.json                          (CSS tokens)
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

export const LIGATURE_ICON_DOC: IComponentDoc = {
    slug: 'ligature-icon',
    name: 'LigatureIcon',
    tag: 'origam-ligature-icon',
    icon: 'mdi-format-color-text',
    category: 'Data Display',
    descriptionKey: 'components.catalog.ligature_icon.description',
    descriptionFallback: 'Renders a Material Design ligature icon by placing the icon name as text content inside an element styled with the Material Icons font.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-icon--design',
    docUrl: 'http://localhost:4000/components/Icon/OrigamIcon',

    parentSlug: 'icon',

    family: [
        {
            slug: 'icon',
            name: 'Icon',
            descriptionKey: 'components.catalog.icon.description',
            descriptionFallback: 'Polymorphic icon component that delegates to class, SVG, component or ligature renderers.'
        },
        {
            slug: 'class-icon',
            name: 'ClassIcon',
            descriptionKey: 'components.catalog.class_icon.description',
            descriptionFallback: 'Renders an icon via a CSS class (e.g. MDI class-based icons).'
        },
        {
            slug: 'component-icon',
            name: 'ComponentIcon',
            descriptionKey: 'components.catalog.component_icon.description',
            descriptionFallback: 'Renders an icon by mounting a Vue component (e.g. SVG component icons).'
        }
    ],

    props: [
        {
            name: 'icon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.ligature_icon.props.icon.description',
            descriptionFallback: 'The ligature name rendered as text content, e.g. "home" for Material Icons. The font resolves the glyph via font feature liga.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.ligature_icon.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Common alternatives: span, i.'
        },
        {
            name: 'size',
            type: { label: 'TSize | number', slug: 'size', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.ligature_icon.props.size.description',
            descriptionFallback: 'Named size token (x-small, small, default, large, x-large) or a raw number (converted to px). Controls font-size and line-height.'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.ligature_icon.props.color.description',
            descriptionFallback: 'Text color (foreground) of the icon. Accepts a semantic intent or a CSS color value.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.ligature_icon.props.bg_color.description',
            descriptionFallback: 'Background color of the icon container.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.ligature_icon.props.disabled.description',
            descriptionFallback: 'Renders the icon in a disabled (muted) visual state.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.ligature_icon.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean for the icon container.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.ligature_icon.props.border.description',
            descriptionFallback: 'Applies a border around the icon container.'
        },
        {
            name: 'height',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.ligature_icon.props.height.description',
            descriptionFallback: 'Overrides the icon container height.'
        },
        {
            name: 'width',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.ligature_icon.props.width.description',
            descriptionFallback: 'Overrides the icon container width.'
        }
    ],

    emits: [],

    slots: [],

    examples: [
        {
            titleKey: 'components.ligature_icon.examples.basic.title',
            titleFallback: 'Basic ligature icon',
            lang: 'vue',
            code: `<template>
  <!-- Requires Material Icons font loaded in the page -->
  <origam-ligature-icon icon="home" />
  <origam-ligature-icon icon="search" size="large" color="primary" />
  <origam-ligature-icon icon="favorite" size="x-large" color="danger" />
</template>`
        },
        {
            titleKey: 'components.ligature_icon.examples.sizes.title',
            titleFallback: 'Size variants',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; align-items: center; gap: 1rem;">
    <origam-ligature-icon icon="star" size="x-small" />
    <origam-ligature-icon icon="star" size="small" />
    <origam-ligature-icon icon="star" size="default" />
    <origam-ligature-icon icon="star" size="large" />
    <origam-ligature-icon icon="star" size="x-large" />
    <origam-ligature-icon icon="star" :size="48" />
  </div>
</template>`
        }
    ],

    previewVariants: [
        { label: 'home', props: { icon: 'home', size: 'large' } },
        { label: 'primary', props: { icon: 'favorite', size: 'large', color: 'primary' } },
        { label: 'danger', props: { icon: 'close', size: 'large', color: 'danger' } },
        { label: 'x-large', props: { icon: 'star', size: 'x-large' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-icon',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamLigatureIcon',
        svgDesc: 'Schematic of the LigatureIcon component with 2 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="40" width="644" height="100" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="60" y="60" width="580" height="60" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="94" font-size="18" fill="var(--origam-color__action--primary---bg, #7c3aed)" text-anchor="middle" font-family="'Material Icons','Material Symbols Outlined',serif">home</text>
  <circle cx="36" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="68" cy="68" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="68" y="72.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <line x1="46" y1="44" x2="88" y2="28" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="92" y="28" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-icon origam-icon--ligature</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-ligature-icon&gt;</code> — 2 parts: the root element styled with the Material Icons ligature font, and the text content node that holds the ligature name.`,
        legend: [
            {
                num: 1,
                cls: '.origam-icon.origam-icon--ligature',
                descriptionKey: 'components.ligature_icon.anatomy.root',
                descriptionFallback: 'Root element. Carries both <code>.origam-icon</code> and <code>.origam-icon--ligature</code>. The SCSS rule sets <code>font-family: "Material Icons", "Material Symbols Outlined"</code> and enables <code>font-feature-settings: "liga"</code>.'
            },
            {
                num: 2,
                cls: '.origam-icon--size-{size}',
                descriptionKey: 'components.ligature_icon.anatomy.size_modifier',
                descriptionFallback: 'Optional size modifier class (e.g. <code>.origam-icon--size-large</code>). Applied only for named TSize values; numeric sizes use an inline <code>font-size</code> style instead.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-icon---color',
            defaultValue: 'currentColor',
            descriptionKey: 'components.ligature_icon.css_vars.color',
            descriptionFallback: 'Icon color. Inherits currentColor by default, overridden by the color prop.'
        },
        {
            name: '--origam-icon---font-size-md',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.ligature_icon.css_vars.font_size_md',
            descriptionFallback: 'Font size for the default size variant.'
        },
        {
            name: '--origam-icon---transition-duration',
            defaultValue: '{motion.duration.fast}',
            descriptionKey: 'components.ligature_icon.css_vars.transition_duration',
            descriptionFallback: 'Transition duration for color and opacity changes.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.ligature_icon.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.ligature_icon.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from computed icon styles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.ligature_icon.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.ligature_icon.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.ligature_icon.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.ligature_icon.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.ligature_icon.a11y.decorative_note',
                noteFallback: 'Decorative icons should carry aria-hidden="true" on the parent wrapper to hide them from assistive technologies.'
            },
            {
                noteKey: 'components.ligature_icon.a11y.font_note',
                noteFallback: 'Requires the Material Icons or Material Symbols Outlined font to be loaded in the page. Without the font, the raw ligature text string is shown instead of the glyph.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/icon.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'icon.color',
                value: 'currentColor',
                type: 'color',
                descriptionKey: 'components.ligature_icon.tokens.color',
                descriptionFallback: 'Default icon color. Inherits currentColor so the icon automatically matches surrounding text.'
            },
            {
                tokenPath: 'icon.font-size-md',
                value: '{font.size.md}',
                type: 'dimension',
                descriptionKey: 'components.ligature_icon.tokens.font_size_md',
                descriptionFallback: 'Font size for the default size variant.'
            },
            {
                tokenPath: 'icon.font-size-lg',
                value: '{font.size.lg}',
                type: 'dimension',
                descriptionKey: 'components.ligature_icon.tokens.font_size_lg',
                descriptionFallback: 'Font size for the large size variant.'
            },
            {
                tokenPath: 'icon.color-primary',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.ligature_icon.tokens.color_primary',
                descriptionFallback: 'Icon color when color="primary".'
            },
            {
                tokenPath: 'icon.color-disabled',
                value: '{color.text.disabled}',
                type: 'color',
                descriptionKey: 'components.ligature_icon.tokens.color_disabled',
                descriptionFallback: 'Icon color when disabled.'
            }
        ]
    } satisfies IComponentTokens
}
