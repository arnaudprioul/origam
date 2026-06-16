/**
 * /components/app — full documentation data for OrigamApp.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/App/app.interface.ts       (props)
 *   - packages/ds/src/components/App/OrigamApp.vue          (template BEM, defineExpose)
 *   - packages/ds/tokens/component/app.json                 (CSS tokens)
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

export const APP_DOC: IComponentDoc = {
    slug: 'app',
    name: 'App',
    tag: 'origam-app',
    icon: 'mdi-application',
    category: 'Layout',
    descriptionKey: 'components.catalog.app.description',
    descriptionFallback: 'Application shell root. Thin wrapper over OrigamLayout that sets the page background and default text colour; all descendant components inherit the colour cascade.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-app--design',
    docUrl: 'http://localhost:4000/components/App/OrigamApp',

    family: [
        {
            slug: 'app-bar',
            name: 'AppBar',
            descriptionKey: 'components.catalog.app_bar.description',
            descriptionFallback: 'Top application bar with title, navigation and action slots.'
        }
    ],

    related: [
        {
            slug: 'layout',
            name: 'Layout',
            kind: 'component',
            descriptionKey: 'components.catalog.layout.description',
            descriptionFallback: 'Inner layout engine that App delegates to.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'fullHeight',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.app.props.full_height.description',
            descriptionFallback: 'Stretches the layout to fill the full viewport (100vw / 100vh). Default true.'
        },
        {
            name: 'overlaps',
            type: { label: 'Array<string>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.app.props.overlaps.description',
            descriptionFallback: 'IDs of layout items allowed to overlap each other. Forwarded to the underlying OrigamLayout.'
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.app.props.color.description',
            descriptionFallback: 'Root text colour. CSS-inherited by all descendants — sets the default foreground for the entire app.'
        },
        // ── IBgColorProps ──────────────────────────────────────────────
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.app.props.bg_color.description',
            descriptionFallback: 'Application surface background colour. Maps to --origam-app---background-color. Accepts semantic intents or a CSS colour value.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.app.slots.default.description',
            descriptionFallback: 'Main application content. Everything placed here inherits the color / bgColor cascade.'
        }
    ],

    examples: [
        {
            titleKey: 'components.app.examples.basic.title',
            titleFallback: 'Basic shell',
            lang: 'vue',
            code: `<template>
  <origam-app bg-color="surface">
    <origam-app-bar title="My App" />
    <main>
      <p>Content goes here.</p>
    </main>
  </origam-app>
</template>`
        },
        {
            titleKey: 'components.app.examples.themed.title',
            titleFallback: 'Dark themed shell',
            lang: 'vue',
            code: `<template>
  <origam-app bg-color="surface" color="primary">
    <origam-app-bar title="Dark App" color="primary" />
    <slot />
  </origam-app>
</template>`
        }
    ],

    /* App is a root layout shell (renders OrigamLayout, full-height). It cannot
       render in the small preview band without blowing up the layout, so no
       live preview / playground — the props + anatomy document the API. */
    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-app',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamApp',
        svgDesc: 'Schematic of the App component with 2 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="24" width="644" height="132" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="48" y="44" width="604" height="32" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="64" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">OrigamLayout (forwarded)</text>
  <rect x="48" y="84" width="604" height="60" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(168,85,247,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="118" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">#default slot</text>
  <circle cx="36" cy="32" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="36.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="56" cy="52" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="56" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-app&gt;</code> — 2 parts. The root ① delegates to OrigamLayout ② which receives color/bgColor/fullHeight/overlaps as forwarded props.`,
        legend: [
            {
                num: 1,
                cls: '.origam-app',
                descriptionKey: 'components.app.anatomy.root',
                descriptionFallback: 'Root element. Applies RTL utility classes and forwards all props to the inner OrigamLayout.'
            },
            {
                num: 2,
                cls: 'origam-layout (inner)',
                descriptionKey: 'components.app.anatomy.layout',
                descriptionFallback: 'Internal OrigamLayout receiving color, bgColor, fullHeight and overlaps. Hosts the default slot.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- OrigamApp — delegates to OrigamLayout -->
<origam-layout
  :color="color"
  :bg-color="bgColor"
  :full-height="fullHeight"
  :overlaps="overlaps"
  class="origam-app"
>
  <slot name="default" />
</origam-layout>`,
        classes: [
            {
                cls: 'origam-app',
                descriptionKey: 'components.app.anatomy.root',
                descriptionFallback: 'Root BEM class applied on top of the forwarded OrigamLayout element. Carries RTL direction classes.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-app---background-color',
            defaultValue: '{color.surface.default}',
            descriptionKey: 'components.app.css_vars.background_color',
            descriptionFallback: 'Application surface background. Defaults to the semantic surface token.'
        },
        {
            name: '--origam-app---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.app.css_vars.color',
            descriptionFallback: 'Root foreground colour, inherited by all descendants.'
        },
        {
            name: '--origam-app---min-height',
            defaultValue: '100vh',
            descriptionKey: 'components.app.css_vars.min_height',
            descriptionFallback: 'Minimum height ensuring the shell fills the viewport.'
        },
        {
            name: '--origam-app---display',
            defaultValue: 'flex',
            descriptionKey: 'components.app.css_vars.display',
            descriptionFallback: 'Display mode — always flex column so children stack vertically.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.app.exposed.filter_props',
            descriptionFallback: 'Filters and forwards a subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.app.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed appStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.app.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.app.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.app.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.app.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.app.a11y.key_tab',
                actionFallback: 'Moves focus through interactive children inside the app shell.'
            }
        ],
        notes: [
            {
                noteKey: 'components.app.a11y.landmark_note',
                noteFallback: 'App is a structural shell — it does not carry an ARIA role itself. Place semantic landmarks (<header>, <main>, <nav>, <footer>) inside the default slot.'
            },
            {
                noteKey: 'components.app.a11y.color_note',
                noteFallback: 'The color prop sets the root text colour via CSS inheritance. Ensure sufficient contrast between the chosen color and bgColor values.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/app.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'app.background-color',
                value: '{color.surface.default}',
                type: 'color',
                descriptionKey: 'components.app.tokens.background_color',
                descriptionFallback: 'Default app background. References the semantic surface default.'
            },
            {
                tokenPath: 'app.color',
                value: '{color.text.primary}',
                type: 'color',
                descriptionKey: 'components.app.tokens.color',
                descriptionFallback: 'Root text colour inherited by all descendants.'
            },
            {
                tokenPath: 'app.min-height',
                value: '100vh',
                type: 'dimension',
                descriptionKey: 'components.app.tokens.min_height',
                descriptionFallback: 'Minimum viewport height for the shell.'
            },
            {
                tokenPath: 'app.display',
                value: 'flex',
                type: 'other',
                descriptionKey: 'components.app.tokens.display',
                descriptionFallback: 'Always flex so the layout renders as a column.'
            }
        ]
    } satisfies IComponentTokens
}
