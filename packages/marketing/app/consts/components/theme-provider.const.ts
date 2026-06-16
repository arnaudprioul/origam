/**
 * /components/theme-provider — full documentation data for OrigamThemeProvider.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/components/ThemeProvider/OrigamThemeProvider.vue (template + inline Props)
 *   - packages/ds/tokens/component/theme-provider.json                 (CSS tokens — display:contents only)
 *
 * NOTE: ThemeProvider has no dedicated interface file — its Props are declared
 * inline in the SFC. It does not use a standard ICommonsComponentProps extension.
 * No emits, no defineExpose — it is a pure provider wrapper.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentA11y,
    IComponentTokens,
    IComponentPreviewVariant,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const THEME_PROVIDER_DOC: IComponentDoc = {
    slug: 'theme-provider',
    name: 'ThemeProvider',
    tag: 'origam-theme-provider',
    icon: 'mdi-palette-swatch-outline',
    category: 'Utilities & Providers',
    descriptionKey: 'components.catalog.theme_provider.description',
    descriptionFallback: 'Overrides the active theme and/or color mode for a sub-tree by setting data-theme and data-mode attributes on a display:contents wrapper.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-themeprovider--design',
    docUrl: 'http://localhost:4000/components/ThemeProvider/OrigamThemeProvider',

    family: [],

    props: [
        {
            name: 'theme',
            type: { label: 'TTheme', slug: 'theme', kind: 'type' },
            defaultValue: "'auto'",
            descriptionKey: 'components.theme_provider.props.theme.description',
            descriptionFallback: "Brand/theme name to activate on this sub-tree. Rendered as data-theme=\"{name}\". Pass 'auto' to defer to the closest ancestor (no attribute rendered)."
        },
        {
            name: 'mode',
            type: { label: 'TMode', slug: 'mode', kind: 'type' },
            defaultValue: "'auto'",
            descriptionKey: 'components.theme_provider.props.mode.description',
            descriptionFallback: "Color mode: 'light', 'dark', or 'auto' (inherit from ancestor). Rendered as data-mode=\"{mode}\" so CSS can scope token overrides to this sub-tree."
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.theme_provider.props.tag.description',
            descriptionFallback: "HTML tag for the wrapper element. Defaults to div (display:contents). Use 'section' / 'article' when the wrapper carries semantic meaning."
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.theme_provider.slots.default.description',
            descriptionFallback: 'Sub-tree whose CSS custom properties are resolved against the provided theme and/or mode.'
        }
    ],

    examples: [
        {
            titleKey: 'components.theme_provider.examples.dark_island.title',
            titleFallback: 'Dark island inside a light page',
            lang: 'vue',
            code: `<template>
  <!-- Light page -->
  <div>
    <p>Light content</p>

    <!-- Dark island -->
    <origam-theme-provider mode="dark">
      <origam-card title="Dark card">
        <p>This card renders in dark mode.</p>
      </origam-card>
    </origam-theme-provider>
  </div>
</template>`
        },
        {
            titleKey: 'components.theme_provider.examples.brand.title',
            titleFallback: 'Brand sub-tree',
            lang: 'vue',
            code: `<template>
  <origam-theme-provider theme="ocean">
    <origam-btn color="primary">Ocean theme button</origam-btn>
    <origam-card title="Branded card">
      <p>Tokens from the ocean theme are active here.</p>
    </origam-card>
  </origam-theme-provider>
</template>`
        },
        {
            titleKey: 'components.theme_provider.examples.semantic_tag.title',
            titleFallback: 'Semantic tag override',
            lang: 'vue',
            code: `<template>
  <!-- Use a <section> wrapper for semantic regions -->
  <origam-theme-provider theme="brand-x" mode="dark" tag="section">
    <h2>Brand-X Dark Section</h2>
    <p>The wrapper is a semantic &lt;section&gt;.</p>
  </origam-theme-provider>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-theme-provider',
        svgViewBox: '0 0 600 200',
        svgTitle: 'Anatomy of OrigamThemeProvider',
        svgDesc: 'Schematic of the ThemeProvider — a display:contents wrapper that rewrites data-theme / data-mode.',
        svg: `
  <rect x="0" y="0" width="600" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="20" width="544" height="160" rx="4" fill="transparent" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="8 4"/>
  <text x="300" y="48" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">data-theme="ocean" data-mode="dark"</text>
  <text x="300" y="62" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-style="italic">display: contents — no layout impact</text>
  <rect x="80" y="80" width="200" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="180" y="126" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif">child component A</text>
  <rect x="320" y="80" width="200" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.35))" stroke-width="1"/>
  <text x="420" y="126" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif">child component B</text>
  <circle cx="36" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="32.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <line x1="46" y1="20" x2="80" y2="6" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="6" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-theme-provider</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-theme-provider&gt;</code> — a single <code>display:contents</code> wrapper ① that rewrites <code>data-theme</code> and <code>data-mode</code> on its root element. Child components resolve their CSS custom properties against this new scope automatically.`,
        legend: [
            {
                num: 1,
                cls: '.origam-theme-provider',
                descriptionKey: 'components.theme_provider.anatomy.root',
                descriptionFallback: 'Root wrapper element (div by default). display:contents ensures it has no layout impact. data-theme and data-mode are set from the theme and mode props, enabling CSS variable scope resolution for all descendant components.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: display:contents — no layout impact -->
<component
  :is="tag"
  class="origam-theme-provider"
  :data-theme="theme !== 'auto' ? theme : undefined"
  :data-mode="mode !== 'auto' ? mode : undefined"
>
  <!-- all children resolve CSS vars from this scope -->
  <slot />
</component>`,
        classes: [
            {
                cls: 'origam-theme-provider',
                descriptionKey: 'components.theme_provider.anatomy.root',
                descriptionFallback: 'Root wrapper. display:contents. Sole purpose is to carry data-theme / data-mode attribute for CSS scope.'
            }
        ]
    } satisfies IComponentAnatomy,

    a11y: {
        roles: ['(none — display:contents wrapper)'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.theme_provider.a11y.contents_note',
                noteFallback: 'The root wrapper uses display:contents — it is invisible to the layout engine and does not create an extra stacking context or box. It should not affect the accessibility tree of its children.'
            },
            {
                noteKey: 'components.theme_provider.a11y.tag_note',
                noteFallback: "When the sub-tree is a semantic region, use tag='section' or tag='article' to add semantic meaning to the wrapper instead of the invisible div default."
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/theme-provider.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. The theme-provider token file only documents display:contents — all visual tokens come from the active theme.',
        excerpt: [
            {
                tokenPath: 'theme-provider._comment',
                value: 'display: contents',
                type: 'other',
                descriptionKey: 'components.theme_provider.tokens.display',
                descriptionFallback: 'ThemeProvider has no visible chrome — display:contents is its only CSS rule.'
            }
        ]
    } satisfies IComponentTokens
}
