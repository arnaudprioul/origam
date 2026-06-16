/**
 * /components/kbd — full documentation data for OrigamKbd.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Kbd/kbd.interface.ts     (props)
 *   - packages/ds/src/types/Kbd/kbd.type.ts               (TKbdVariant)
 *   - packages/ds/src/components/Kbd/OrigamKbd.vue        (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/kbd.json               (CSS tokens)
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

export const KBD_DOC: IComponentDoc = {
    slug: 'kbd',
    name: 'Kbd',
    tag: 'origam-kbd',
    icon: 'mdi-keyboard-outline',
    category: 'Typography',
    descriptionKey: 'components.catalog.kbd.description',
    descriptionFallback: 'Keyboard shortcut renderer using semantic <kbd> elements with filled, outlined and tonal variants.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-kbd--design',
    docUrl: 'http://localhost:4000/components/Kbd/OrigamKbd',

    family: [],

    related: [],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.kbd.props.text.description',
            descriptionFallback: 'Single key label (e.g. "⌘", "Ctrl", "A"). Overridden by the default slot.'
        },
        {
            name: 'combination',
            type: { label: 'string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.kbd.props.combination.description',
            descriptionFallback: 'Composed shortcut rendered as individual nested <kbd> elements (e.g. ["Ctrl", "Shift", "Z"]).'
        },
        {
            name: 'separator',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'+'",
            descriptionKey: 'components.kbd.props.separator.description',
            descriptionFallback: 'Character shown between each key in a combination. Defaults to "+".'
        },
        {
            name: 'variant',
            type: { label: 'TKbdVariant', slug: 'kbd-variant', kind: 'type' },
            defaultValue: "'outlined'",
            descriptionKey: 'components.kbd.props.variant.description',
            descriptionFallback: 'Visual style. "outlined" (default) shows a border and shadow; "filled" uses a surface background; "tonal" uses a tinted background without border.'
        },
        // ── ISizeProps ─────────────────────────────────────────────────
        {
            name: 'size',
            type: { label: 'TSize', slug: 'size', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.kbd.props.size.description',
            descriptionFallback: 'Controls the font-size of the key label via design tokens.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.kbd.props.color.description',
            descriptionFallback: 'Foreground color override for the key text.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.kbd.props.bg_color.description',
            descriptionFallback: 'Background color override for the key surface.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.kbd.props.border.description',
            descriptionFallback: 'Applies a border. Pass true for the default border.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.kbd.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.kbd.slots.default.description',
            descriptionFallback: 'Custom key label content. Overrides the text prop. Use when you need formatted or rich text inside the key.'
        }
    ],

    examples: [
        {
            titleKey: 'components.kbd.examples.single.title',
            titleFallback: 'Single keys',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
    <origam-kbd text="⌘" />
    <origam-kbd text="Ctrl" />
    <origam-kbd text="Alt" />
    <origam-kbd text="⇧" />
    <origam-kbd text="Enter" />
    <origam-kbd text="⌫" />
  </div>
</template>`
        },
        {
            titleKey: 'components.kbd.examples.combinations.title',
            titleFallback: 'Keyboard shortcuts (combinations)',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; flex-direction: column; gap: 0.5rem;">
    <div>Save: <origam-kbd :combination="['⌘', 'S']" /></div>
    <div>Undo: <origam-kbd :combination="['Ctrl', 'Z']" /></div>
    <div>Find: <origam-kbd :combination="['Ctrl', 'Shift', 'F']" /></div>
  </div>
</template>`
        },
        {
            titleKey: 'components.kbd.examples.variants.title',
            titleFallback: 'Variants',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
    <origam-kbd text="Outlined" variant="outlined" />
    <origam-kbd text="Filled"   variant="filled" />
    <origam-kbd text="Tonal"    variant="tonal" />
  </div>
</template>`
        }
    ],

    previewVariants: [
        { label: 'outlined', props: { text: '⌘', variant: 'outlined' } },
        { label: 'filled', props: { text: 'Ctrl', variant: 'filled' } },
        { label: 'tonal', props: { text: 'Alt', variant: 'tonal' } },
        { label: 'combination', props: { combination: ['Ctrl', 'S'] } },
        { label: 'large', props: { text: 'Enter', size: 'large', variant: 'outlined' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-kbd',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamKbd',
        svgDesc: 'Schematic of the Kbd component with 3 numbered parts: root key, combination wrapper, and separator.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <text x="350" y="35" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">SINGLE KEY</text>
  <rect x="270" y="45" width="160" height="50" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, #d4d4d4)" stroke-width="1.5"/>
  <text x="350" y="76" font-size="14" fill="var(--origam-color__text---primary, #171717)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="500">Ctrl</text>
  <circle cx="278" cy="53" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="278" y="57.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <text x="350" y="125" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">COMBINATION</text>
  <rect x="170" y="140" width="80" height="40" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, #d4d4d4)" stroke-width="1.5"/>
  <text x="210" y="166" font-size="13" fill="var(--origam-color__text---primary, #171717)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="500">Ctrl</text>
  <text x="270" y="163" font-size="14" fill="var(--origam-color__text---secondary, rgba(0,0,0,0.55))" text-anchor="middle" font-family="'JetBrains Mono',monospace">+</text>
  <rect x="290" y="140" width="50" height="40" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, #d4d4d4)" stroke-width="1.5"/>
  <text x="315" y="166" font-size="13" fill="var(--origam-color__text---primary, #171717)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="500">S</text>
  <circle cx="178" cy="148" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="178" y="152.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="270" cy="148" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="270" y="152.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="350" y="195" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">Renders native &lt;kbd&gt; HTML elements — always semantic</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-kbd&gt;</code>. Single-key mode ① renders one <code>&lt;kbd&gt;</code>; combination mode ② wraps individual keys in nested <code>&lt;kbd&gt;</code> elements separated by a ③ span.`,
        legend: [
            {
                num: 1,
                cls: '.origam-kbd',
                descriptionKey: 'components.kbd.anatomy.root',
                descriptionFallback: 'Root <code>&lt;kbd&gt;</code> element. In single-key mode, renders the key directly. The <code>v-contrast</code> directive auto-adjusts text color for accessibility.'
            },
            {
                num: 2,
                cls: '.origam-kbd__key',
                descriptionKey: 'components.kbd.anatomy.key',
                descriptionFallback: 'Individual key element in combination mode. Each item in the <code>combination</code> array renders as a nested <code>&lt;kbd class="origam-kbd__key"&gt;</code>.'
            },
            {
                num: 3,
                cls: '.origam-kbd__separator',
                descriptionKey: 'components.kbd.anatomy.separator',
                descriptionFallback: 'Character rendered between keys in combination mode. <code>aria-hidden="true"</code> so screen readers skip it. Default: "+".'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- Single key -->
<kbd class="origam-kbd origam-kbd--variant-outlined">Ctrl</kbd>

<!-- Combination -->
<kbd class="origam-kbd origam-kbd--combination origam-kbd--variant-outlined">
  <kbd class="origam-kbd__key">Ctrl</kbd>
  <span class="origam-kbd__separator" aria-hidden="true">+</span>
  <kbd class="origam-kbd__key">S</kbd>
</kbd>`,
        classes: [
            {
                cls: 'origam-kbd',
                descriptionKey: 'components.kbd.anatomy.root',
                descriptionFallback: 'Root <kbd> element. Shared key-surface styles via @mixin key-surface.'
            },
            {
                cls: 'origam-kbd--variant-outlined',
                descriptionKey: 'components.kbd.anatomy.variant_outlined',
                descriptionFallback: 'Outlined variant: border + bottom shadow for 3D key effect.'
            },
            {
                cls: 'origam-kbd--variant-filled',
                descriptionKey: 'components.kbd.anatomy.variant_filled',
                descriptionFallback: 'Filled variant: surface-overlay background with stronger shadow.'
            },
            {
                cls: 'origam-kbd--variant-tonal',
                descriptionKey: 'components.kbd.anatomy.variant_tonal',
                descriptionFallback: 'Tonal variant: tinted background, no border, no shadow.'
            },
            {
                cls: 'origam-kbd--combination',
                descriptionKey: 'components.kbd.anatomy.combination',
                descriptionFallback: 'Applied when combination prop is set. Makes the root transparent; each __key inherits key-surface styles.'
            },
            {
                cls: 'origam-kbd__key',
                descriptionKey: 'components.kbd.anatomy.key',
                descriptionFallback: 'Individual nested key in combination mode. Inherits key-surface styles.'
            },
            {
                cls: 'origam-kbd__separator',
                descriptionKey: 'components.kbd.anatomy.separator',
                descriptionFallback: 'Separator text between keys. aria-hidden="true".'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-kbd---background-color',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.kbd.css_vars.background_color',
            descriptionFallback: 'Key background color. Overridden per variant.'
        },
        {
            name: '--origam-kbd---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.kbd.css_vars.color',
            descriptionFallback: 'Key foreground color. Auto-adjusted by v-contrast directive.'
        },
        {
            name: '--origam-kbd---border-color',
            defaultValue: '{color.border.subtle}',
            descriptionKey: 'components.kbd.css_vars.border_color',
            descriptionFallback: 'Key border color.'
        },
        {
            name: '--origam-kbd---border-width',
            defaultValue: '1px',
            descriptionKey: 'components.kbd.css_vars.border_width',
            descriptionFallback: 'Border width. Set to 0 for tonal variant.'
        },
        {
            name: '--origam-kbd---border-radius',
            defaultValue: '4px',
            descriptionKey: 'components.kbd.css_vars.border_radius',
            descriptionFallback: 'Key border radius. Overridden by the rounded prop.'
        },
        {
            name: '--origam-kbd---font-family',
            defaultValue: '{font.family.mono}',
            descriptionKey: 'components.kbd.css_vars.font_family',
            descriptionFallback: 'Monospace font family for the key label.'
        },
        {
            name: '--origam-kbd---font-weight',
            defaultValue: '{font.weight.medium}',
            descriptionKey: 'components.kbd.css_vars.font_weight',
            descriptionFallback: 'Key label font weight.'
        },
        {
            name: '--origam-kbd---box-shadow',
            defaultValue: '0 1px 0 0 color-mix(…), inset 0 1px 0 0 color-mix(…)',
            descriptionKey: 'components.kbd.css_vars.box_shadow',
            descriptionFallback: '3D key shadow. Composed of a bottom border-like shadow and an inset highlight. Cleared for tonal/combination variants.'
        },
        {
            name: '--origam-kbd---gap',
            defaultValue: '4px',
            descriptionKey: 'components.kbd.css_vars.gap',
            descriptionFallback: 'Gap between keys in combination mode.'
        },
        {
            name: '--origam-kbd__separator---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.kbd.css_vars.separator_color',
            descriptionFallback: 'Color of the separator character between keys.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.kbd.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.kbd.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed kbdStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.kbd.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.kbd.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.kbd.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.kbd.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.kbd.a11y.semantic_note',
                noteFallback: 'Uses native <kbd> HTML elements — screen readers announce these as keyboard input, requiring no ARIA role override.'
            },
            {
                noteKey: 'components.kbd.a11y.separator_note',
                noteFallback: 'The separator span in combination mode carries aria-hidden="true" so screen readers skip the "+" character and only read the key names.'
            },
            {
                noteKey: 'components.kbd.a11y.contrast_note',
                noteFallback: 'The v-contrast directive automatically adjusts the text color to ensure WCAG contrast requirements are met against the background.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/kbd.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'kbd.background-color',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.kbd.tokens.background_color',
                descriptionFallback: 'Default key background.'
            },
            {
                tokenPath: 'kbd.border-radius',
                value: '{radius.sm}',
                type: 'dimension',
                descriptionKey: 'components.kbd.tokens.border_radius',
                descriptionFallback: 'Default key border radius (4px).'
            },
            {
                tokenPath: 'kbd.font-family',
                value: '{font.family.mono}',
                type: 'fontFamily',
                descriptionKey: 'components.kbd.tokens.font_family',
                descriptionFallback: 'Monospace font stack for key labels.'
            },
            {
                tokenPath: 'kbd.font-weight',
                value: '{font.weight.medium}',
                type: 'fontWeight',
                descriptionKey: 'components.kbd.tokens.font_weight',
                descriptionFallback: 'Key label font weight.'
            },
            {
                tokenPath: 'kbd.box-shadow',
                value: '{shadow.xs}',
                type: 'shadow',
                descriptionKey: 'components.kbd.tokens.box_shadow',
                descriptionFallback: 'Key shadow for the 3D depth effect.'
            },
            {
                tokenPath: 'kbd.gap',
                value: '{space.1}',
                type: 'dimension',
                descriptionKey: 'components.kbd.tokens.gap',
                descriptionFallback: 'Gap between keys in combination mode.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'text',
                kind: 'text',
                labelKey: 'components.kbd.playground.text',
                labelFallback: 'Key text',
                defaultValue: '⌘'
            },
            {
                prop: 'variant',
                kind: 'select',
                labelKey: 'components.kbd.playground.variant',
                labelFallback: 'Variant',
                defaultValue: 'outlined',
                options: [
                    { label: 'outlined', value: 'outlined' },
                    { label: 'filled', value: 'filled' },
                    { label: 'tonal', value: 'tonal' }
                ]
            },
            {
                prop: 'size',
                kind: 'select',
                labelKey: 'components.kbd.playground.size',
                labelFallback: 'Size',
                defaultValue: 'default',
                options: [
                    { label: 'x-small', value: 'x-small' },
                    { label: 'small', value: 'small' },
                    { label: 'default', value: 'default' },
                    { label: 'large', value: 'large' },
                    { label: 'x-large', value: 'x-large' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
