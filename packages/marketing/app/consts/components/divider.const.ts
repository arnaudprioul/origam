/**
 * /components/divider — full documentation data for OrigamDivider.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Divider/divider.interface.ts  (props)
 *   - packages/ds/src/components/Divider/OrigamDivider.vue     (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/divider.json                (CSS tokens)
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

export const DIVIDER_DOC: IComponentDoc = {
    slug: 'divider',
    name: 'Divider',
    tag: 'origam-divider',
    icon: 'mdi-minus',
    category: 'Layout',
    descriptionKey: 'components.catalog.divider.description',
    descriptionFallback: 'Horizontal or vertical separator rendered as a semantic <hr> with color, thickness and inset support.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-divider--design',
    docUrl: 'http://localhost:4000/components/Divider/OrigamDivider',

    family: [],

    related: [],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'inset',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.divider.props.inset.description',
            descriptionFallback: 'Adds a margin-inline-start indent so the divider aligns with list content.'
        },
        {
            name: 'length',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.divider.props.length.description',
            descriptionFallback: 'Constrains the divider length. Horizontal → max-width; vertical → max-height. Accepts CSS lengths or numbers (px).'
        },
        {
            name: 'thickness',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.divider.props.thickness.description',
            descriptionFallback: 'Overrides the border width (stroke thickness) of the divider.'
        },
        // ── IDirectionProps ────────────────────────────────────────────
        {
            name: 'direction',
            type: { label: "'horizontal' | 'vertical'", slug: '', kind: 'primitive' },
            defaultValue: "'horizontal'",
            descriptionKey: 'components.divider.props.direction.description',
            descriptionFallback: 'Controls the divider orientation. Horizontal renders as a full-width line; vertical as an inline inline block.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.divider.props.color.description',
            descriptionFallback: 'Intent or custom color for the divider line.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.divider.props.bg_color.description',
            descriptionFallback: 'Background color override. Useful for styled label dividers.'
        },
        // ── IMarginProps ───────────────────────────────────────────────
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.divider.props.margin.description',
            descriptionFallback: 'Shorthand margin applied to all sides.'
        }
    ],

    emits: [],

    slots: [],

    examples: [
        {
            titleKey: 'components.divider.examples.horizontal.title',
            titleFallback: 'Horizontal divider',
            lang: 'vue',
            code: `<template>
  <div>
    <p>Section A</p>
    <origam-divider />
    <p>Section B</p>
  </div>
</template>`
        },
        {
            titleKey: 'components.divider.examples.vertical.title',
            titleFallback: 'Vertical divider',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; align-items: center; height: 40px; gap: 8px;">
    <span>Left</span>
    <origam-divider direction="vertical" />
    <span>Right</span>
  </div>
</template>`
        },
        {
            titleKey: 'components.divider.examples.colored.title',
            titleFallback: 'Colored & inset',
            lang: 'vue',
            code: `<template>
  <div>
    <origam-divider color="primary" thickness="2" />
    <origam-divider inset color="success" />
    <origam-divider length="50%" />
  </div>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: {}, ariaLabel: 'Horizontal divider' },
        { label: 'colored', props: { color: 'primary' }, ariaLabel: 'Primary colored divider' },
        { label: 'thick', props: { thickness: 3, color: 'secondary' }, ariaLabel: 'Thick secondary divider' },
        { label: 'inset', props: { inset: true }, ariaLabel: 'Inset divider' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-divider',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamDivider',
        svgDesc: 'Schematic of the Divider component with 3 numbered parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <text x="350" y="40" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">HORIZONTAL</text>
  <rect x="40" y="55" width="620" height="2" rx="1" fill="var(--origam-color__border---subtle, #d4d4d4)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <circle cx="48" cy="56" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="60.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <text x="350" y="110" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">VERTICAL</text>
  <rect x="348" y="120" width="4" height="60" rx="1" fill="var(--origam-color__border---subtle, #d4d4d4)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1"/>
  <circle cx="350" cy="125" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="129.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <text x="350" y="195" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">Rendered as &lt;hr&gt; — native HTML separator with role="separator"</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-divider&gt;</code>. Horizontal ① is full-width; vertical ② is inline-flex with height: auto. Both render as a native <code>&lt;hr&gt;</code>.`,
        legend: [
            {
                num: 1,
                cls: '.origam-divider',
                descriptionKey: 'components.divider.anatomy.root_horizontal',
                descriptionFallback: 'Root <code>&lt;hr&gt;</code> element. In horizontal mode: <code>display: block; flex: 1 1 100%</code>. <code>aria-orientation="horizontal"</code>.'
            },
            {
                num: 2,
                cls: '.origam-divider--vertical',
                descriptionKey: 'components.divider.anatomy.vertical',
                descriptionFallback: 'Vertical variant modifier. Switches to <code>display: inline-flex</code>, <code>height: auto</code>, <code>align-self: stretch</code>. <code>aria-orientation="vertical"</code>.'
            },
            {
                num: 3,
                cls: '.origam-divider--inset',
                descriptionKey: 'components.divider.anatomy.inset',
                descriptionFallback: 'Inset modifier. Adds <code>margin-inline-start</code> so the line aligns with list item content.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<hr
  role="separator"
  aria-orientation="horizontal"
  class="origam-divider origam-divider--horizontal"
/>`,
        classes: [
            {
                cls: 'origam-divider',
                descriptionKey: 'components.divider.anatomy.root_horizontal',
                descriptionFallback: 'Root element. Renders as a semantic <hr> with role="separator".'
            },
            {
                cls: 'origam-divider--horizontal',
                descriptionKey: 'components.divider.anatomy.horizontal',
                descriptionFallback: 'Applied when direction="horizontal" (the default). Full-width block line.'
            },
            {
                cls: 'origam-divider--vertical',
                descriptionKey: 'components.divider.anatomy.vertical',
                descriptionFallback: 'Applied when direction="vertical". Inline-flex stretch line.'
            },
            {
                cls: 'origam-divider--inset',
                descriptionKey: 'components.divider.anatomy.inset',
                descriptionFallback: 'Applied when inset=true. Adds a leading margin offset.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-divider---opacity',
            defaultValue: '0.12',
            descriptionKey: 'components.divider.css_vars.opacity',
            descriptionFallback: 'Global opacity of the divider line. Token: {opacity.100} resolves to 1; the component overrides to 0.12 by default in SCSS.'
        },
        {
            name: '--origam-divider---border-top-width',
            defaultValue: 'thin',
            descriptionKey: 'components.divider.css_vars.border_top_width',
            descriptionFallback: 'Stroke thickness for the horizontal divider. Overridden by the thickness prop.'
        },
        {
            name: '--origam-divider---border-right-width',
            defaultValue: 'thin',
            descriptionKey: 'components.divider.css_vars.border_right_width',
            descriptionFallback: 'Stroke thickness for the vertical divider. Overridden by the thickness prop.'
        },
        {
            name: '--origam-divider---max-width',
            defaultValue: '100%',
            descriptionKey: 'components.divider.css_vars.max_width',
            descriptionFallback: 'Maximum width for horizontal dividers. Set by the length prop.'
        },
        {
            name: '--origam-divider---max-height',
            defaultValue: '100%',
            descriptionKey: 'components.divider.css_vars.max_height',
            descriptionFallback: 'Maximum height for vertical dividers. Set by the length prop.'
        },
        {
            name: '--origam-divider--inset---margin-inline-start',
            defaultValue: '16px',
            descriptionKey: 'components.divider.css_vars.inset_margin',
            descriptionFallback: 'Leading indent applied when inset=true.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.divider.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.divider.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed dividerStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.divider.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.divider.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.divider.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.divider.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['separator'],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.divider.a11y.role_note',
                noteFallback: 'Renders as a native <hr> element which has an implicit role="separator". The aria-orientation attribute matches the direction prop (horizontal or vertical).'
            },
            {
                noteKey: 'components.divider.a11y.decorative_note',
                noteFallback: 'When used purely for visual decoration, pass role="presentation" via attrs to remove the element from the accessibility tree.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/divider.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'divider.color',
                value: '{color.border.subtle}',
                type: 'color',
                descriptionKey: 'components.divider.tokens.color',
                descriptionFallback: 'Default divider color. References the subtle border semantic token.'
            },
            {
                tokenPath: 'divider.thickness',
                value: '{border.width.thin}',
                type: 'dimension',
                descriptionKey: 'components.divider.tokens.thickness',
                descriptionFallback: 'Default stroke thickness. Overridden by the thickness prop.'
            },
            {
                tokenPath: 'divider.opacity',
                value: '{opacity.100}',
                type: 'number',
                descriptionKey: 'components.divider.tokens.opacity',
                descriptionFallback: 'Token default opacity (1). SCSS overrides to 0.12 for a subtle separator effect.'
            },
            {
                tokenPath: 'divider.margin-block',
                value: '{space.0}',
                type: 'dimension',
                descriptionKey: 'components.divider.tokens.margin_block',
                descriptionFallback: 'Default block margin (0). Use the margin prop for spacing.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            {
                prop: 'direction',
                kind: 'select',
                labelKey: 'components.divider.playground.direction',
                labelFallback: 'Direction',
                defaultValue: 'horizontal',
                options: [
                    { label: 'horizontal', value: 'horizontal' },
                    { label: 'vertical', value: 'vertical' }
                ]
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.divider.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'warning', value: 'warning' }
                ]
            },
            {
                prop: 'inset',
                kind: 'switch',
                labelKey: 'components.divider.playground.inset',
                labelFallback: 'Inset',
                defaultValue: false
            },
            {
                prop: 'thickness',
                kind: 'number',
                labelKey: 'components.divider.playground.thickness',
                labelFallback: 'Thickness (px)',
                defaultValue: 1
            }
        ]
    } satisfies IComponentPlayground
}
