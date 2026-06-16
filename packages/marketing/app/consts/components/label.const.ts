/**
 * /components/label — full documentation data for OrigamLabel.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Label/label.interface.ts  (props)
 *   - packages/ds/src/components/Label/OrigamLabel.vue     (template BEM, defineExpose, aria-*)
 *   - packages/ds/tokens/component/label.json              (CSS tokens)
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

export const LABEL_DOC: IComponentDoc = {
    slug: 'label',
    name: 'Label',
    tag: 'origam-label',
    icon: 'mdi-tag-outline',
    category: 'Feedback & Status',
    descriptionKey: 'components.catalog.label.description',
    descriptionFallback: 'Form field label with required indicator and floating state support.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-label--design',
    docUrl: 'http://localhost:4000/components/Label/OrigamLabel',

    family: [],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.label.props.text.description',
            descriptionFallback: 'Label text content. Can also be set via the default slot.'
        },
        {
            name: 'floating',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.label.props.floating.description',
            descriptionFallback: 'Activates the floating label variant (smaller font-size, hidden by default until field activation).'
        },
        {
            name: 'required',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.label.props.required.description',
            descriptionFallback: 'Appends a <sup>*</sup> required indicator after the label text.'
        },
        {
            name: 'name',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.label.props.name.description',
            descriptionFallback: 'HTML name attribute forwarded to the root element.'
        },
        // ── ITagProps ──────────────────────────────────────────────────
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'label'",
            descriptionKey: 'components.label.props.tag.description',
            descriptionFallback: 'HTML element rendered at root. Defaults to <label>.'
        },
        // ── IColorProps / IBgColorProps ────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.label.props.color.description',
            descriptionFallback: 'Foreground (text) color. Accepts semantic intents or a CSS color.'
        },
        {
            name: 'bgColor',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.label.props.bg_color.description',
            descriptionFallback: 'Background color override.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.label.props.border.description',
            descriptionFallback: 'Applies a border. Pass true for the default border or a CSS shorthand.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.label.props.rounded.description',
            descriptionFallback: 'Border-radius token or boolean.'
        },
        // ── IMarginProps / IPaddingProps ───────────────────────────────
        {
            name: 'margin',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.label.props.margin.description',
            descriptionFallback: 'CSS margin shorthand applied via the margin composable.'
        },
        {
            name: 'padding',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.label.props.padding.description',
            descriptionFallback: 'CSS padding shorthand applied via the padding composable.'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.label.emits.click.description',
            descriptionFallback: 'Fired when the label element is clicked.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.label.slots.default.description',
            descriptionFallback: 'Main label content. Overrides the text prop. The required indicator <sup>*</sup> is appended after the slot when required=true.'
        }
    ],

    examples: [
        {
            titleKey: 'components.label.examples.basic.title',
            titleFallback: 'Basic label',
            lang: 'vue',
            code: `<template>
  <origam-label text="Email address" />
</template>`
        },
        {
            titleKey: 'components.label.examples.required.title',
            titleFallback: 'Required field',
            lang: 'vue',
            code: `<template>
  <origam-label text="Password" :required="true" />
</template>`
        },
        {
            titleKey: 'components.label.examples.colors.title',
            titleFallback: 'Color variants',
            lang: 'vue',
            code: `<template>
  <div style="display: flex; gap: 0.5rem; flex-direction: column;">
    <origam-label text="Default label" />
    <origam-label text="Primary label" color="primary" />
    <origam-label text="Danger label" color="danger" :required="true" />
  </div>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: {}, slotContent: 'Email address' },
        { label: 'required', props: { required: true }, slotContent: 'Password' },
        { label: 'primary', props: { color: 'primary' }, slotContent: 'Username' },
        { label: 'danger', props: { color: 'danger', required: true }, slotContent: 'Error field' }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-label',
        svgViewBox: '0 0 500 160',
        svgTitle: 'Anatomy of OrigamLabel',
        svgDesc: 'Schematic of the Label component with 2 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="500" height="160" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="40" width="300" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="120" y="76" font-size="13" fill="var(--origam-color__text---primary, #1a1a2e)" font-family="'JetBrains Mono',monospace">Label text</text>
  <text x="240" y="70" font-size="10" fill="var(--origam-color__feedback--danger---bg, #ef4444)" font-weight="700" font-family="'JetBrains Mono',monospace">*</text>
  <circle cx="36" cy="48" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="52.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="248" cy="60" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="248" y="64.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <line x1="46" y1="40" x2="80" y2="22" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="84" y="22" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-label</text>
  <line x1="248" y1="69" x2="248" y2="118" stroke="var(--origam-color__border---default, rgba(168,85,247,0.5))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="180" y="132" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-style="italic">sup · visible when required=true</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-label&gt;</code> — 2 internal parts. The required indicator ② is a <code>&lt;sup&gt;*&lt;/sup&gt;</code> appended when <code>required=true</code>.`,
        legend: [
            {
                num: 1,
                cls: '.origam-label',
                descriptionKey: 'components.label.anatomy.root',
                descriptionFallback: 'Root element. Renders as <code>&lt;label&gt;</code> by default. Accepts <code>tag</code> override.'
            },
            {
                num: 2,
                cls: '.origam-label sup',
                descriptionKey: 'components.label.anatomy.required',
                descriptionFallback: 'Required indicator <code>&lt;sup&gt;*&lt;/sup&gt;</code>. Only rendered when <code>required=true</code>. Color driven by <code>--origam-label---required-indicator-color</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: <label> by default -->
<component :is="tag" class="origam-label" @click="handleClick">
  <!-- default slot or text prop -->
  <slot>
    <span>{{ text }}</span>
    <!-- required indicator -->
    <sup v-if="required">*</sup>
  </slot>
</component>`,
        classes: [
            {
                cls: 'origam-label',
                descriptionKey: 'components.label.anatomy.root',
                descriptionFallback: 'Root element. Renders as <label> by default.'
            },
            {
                cls: 'origam-label--floating',
                descriptionKey: 'components.label.anatomy.floating',
                descriptionFallback: 'Applied when floating=true. Reduces font-size and hides the label until field activation.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-label---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.label.css_vars.color',
            descriptionFallback: 'Default label text color.'
        },
        {
            name: '--origam-label---font-size',
            defaultValue: '{font.size.md}',
            descriptionKey: 'components.label.css_vars.font_size',
            descriptionFallback: 'Default font size. Overridden to 1em when used inside OrigamField.'
        },
        {
            name: '--origam-label---font-weight',
            defaultValue: '{font.weight.regular}',
            descriptionKey: 'components.label.css_vars.font_weight',
            descriptionFallback: 'Label font weight.'
        },
        {
            name: '--origam-label---line-height',
            defaultValue: '{font.lineHeight.normal}',
            descriptionKey: 'components.label.css_vars.line_height',
            descriptionFallback: 'Label line height.'
        },
        {
            name: '--origam-label---letter-spacing',
            defaultValue: '{font.letterSpacing.normal}',
            descriptionKey: 'components.label.css_vars.letter_spacing',
            descriptionFallback: 'Label letter spacing.'
        },
        {
            name: '--origam-label---pointer-events',
            defaultValue: 'none',
            descriptionKey: 'components.label.css_vars.pointer_events',
            descriptionFallback: 'Labels do not capture pointer events (positioned on top of input).'
        },
        {
            name: '--origam-label---transition-duration',
            defaultValue: '{motion.duration.normal}',
            descriptionKey: 'components.label.css_vars.transition_duration',
            descriptionFallback: 'Duration of opacity/transform transitions for the float animation.'
        },
        {
            name: '--origam-label---required-indicator-color',
            defaultValue: '{color.feedback.danger.fgSubtle}',
            descriptionKey: 'components.label.css_vars.required_indicator_color',
            descriptionFallback: 'Color of the asterisk required indicator <sup>*</sup>.'
        },
        {
            name: '--origam-label__floating---font-size',
            defaultValue: '0.75em',
            descriptionKey: 'components.label.css_vars.floating_font_size',
            descriptionFallback: 'Font size of the floating variant (clone shown in the field notch).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.label.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.label.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.label.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.label.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.label.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.label.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['label (native HTML)'],
        keyboard: [
            {
                key: 'click on label',
                actionKey: 'components.label.a11y.key_click',
                actionFallback: 'Clicking the label focuses its associated input (native <label> for= binding).'
            }
        ],
        notes: [
            {
                noteKey: 'components.label.a11y.association_note',
                noteFallback: 'Use the for= attribute (via id matching) or wrap the input inside the label to associate them. The component does not auto-generate the for= relationship.'
            },
            {
                noteKey: 'components.label.a11y.required_note',
                noteFallback: 'The <sup>*</sup> required indicator is a visual cue only. Screen readers may not announce it. Pair with aria-required="true" on the input for complete accessibility.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/label.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'label.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.label.tokens.color',
                descriptionFallback: 'Default label text color.'
            },
            {
                tokenPath: 'label.font-size',
                value: '{font.size.md}',
                type: 'dimension',
                descriptionKey: 'components.label.tokens.font_size',
                descriptionFallback: 'Default font size.'
            },
            {
                tokenPath: 'label.font-weight',
                value: '{font.weight.regular}',
                type: 'fontWeight',
                descriptionKey: 'components.label.tokens.font_weight',
                descriptionFallback: 'Label font weight.'
            },
            {
                tokenPath: 'label.transition-duration',
                value: '{motion.duration.normal}',
                type: 'duration',
                descriptionKey: 'components.label.tokens.transition_duration',
                descriptionFallback: 'Duration of float animation transitions.'
            },
            {
                tokenPath: 'label.required-indicator.color',
                value: '{color.feedback.danger.fgSubtle}',
                type: 'color',
                descriptionKey: 'components.label.tokens.required_indicator_color',
                descriptionFallback: 'Color of the asterisk required indicator.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: 'Email address',
        controls: [
            {
                prop: 'required',
                kind: 'switch',
                labelKey: 'components.label.playground.required',
                labelFallback: 'Required',
                defaultValue: false
            },
            {
                prop: 'floating',
                kind: 'switch',
                labelKey: 'components.label.playground.floating',
                labelFallback: 'Floating',
                defaultValue: false
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.label.playground.color',
                labelFallback: 'Color',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' },
                    { label: 'warning', value: 'warning' }
                ]
            },
            {
                prop: 'tag',
                kind: 'select',
                labelKey: 'components.label.playground.tag',
                labelFallback: 'Tag',
                defaultValue: 'label',
                options: [
                    { label: 'label', value: 'label' },
                    { label: 'span', value: 'span' },
                    { label: 'legend', value: 'legend' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
