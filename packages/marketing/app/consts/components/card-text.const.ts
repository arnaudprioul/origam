/**
 * /components/card-text — full documentation data for OrigamCardText.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Card/card-text.interface.ts  (props)
 *   - packages/ds/src/components/Card/OrigamCardText.vue      (template BEM, defineExpose)
 *   - CSS vars: <style> block in OrigamCardText.vue (:root section)
 *
 * Sub-component of: OrigamCard (parentSlug: 'card')
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

export const CARD_TEXT_DOC: IComponentDoc = {
    slug: 'card-text',
    name: 'CardText',
    tag: 'origam-card-text',
    icon: 'mdi-text-long',
    category: 'Surface',
    descriptionKey: 'components.catalog.card_text.description',
    descriptionFallback: 'Card body text section. A flex-grow container with density-aware padding and body typography defaults.',
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
            slug: 'card-header',
            name: 'CardHeader',
            descriptionKey: 'components.catalog.card_header.description',
            descriptionFallback: 'Card header section rendering title, subtitle and optional prepend/append icon or avatar.'
        }
    ],

    related: [
        { slug: 'card', name: 'Card', kind: 'component', descriptionFallback: 'Parent card container that typically wraps OrigamCardText.', descriptionKey: 'components.catalog.card.description' }
    ],

    props: [
        {
            name: 'text',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card_text.props.text.description',
            descriptionFallback: 'Text content rendered inside a <span>. Overridable with the #default slot for richer content.'
        },
        {
            name: 'tag',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: "'div'",
            descriptionKey: 'components.card_text.props.tag.description',
            descriptionFallback: 'HTML element rendered at the root. Defaults to <div>; can be changed to <p>, <section>, etc.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.card_text.props.density.description',
            descriptionFallback: 'Density modifier adjusting the block and inline padding via --origam-card-text---density.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.card_text.props.rounded.description',
            descriptionFallback: 'Border-radius for the text container.'
        },
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.card_text.props.border.description',
            descriptionFallback: 'Applies a border to the text container.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.card_text.slots.default.description',
            descriptionFallback: 'Overrides the text prop. Use for rich HTML content (paragraphs, lists, etc.) inside the card body.'
        }
    ],

    examples: [
        {
            titleKey: 'components.card_text.examples.basic.title',
            titleFallback: 'Basic card text',
            lang: 'vue',
            code: `<template>
  <origam-card>
    <origam-card-header title="Card Title" />
    <origam-card-text
      text="Lorem ipsum dolor sit amet, consectetur adipiscing elit."
    />
  </origam-card>
</template>`
        },
        {
            titleKey: 'components.card_text.examples.rich_content.title',
            titleFallback: 'Rich slot content',
            lang: 'vue',
            code: `<template>
  <origam-card>
    <origam-card-header title="Features" />
    <origam-card-text>
      <ul>
        <li>Design tokens</li>
        <li>Accessibility built-in</li>
        <li>Dark mode support</li>
      </ul>
    </origam-card-text>
  </origam-card>
</template>`
        },
        {
            titleKey: 'components.card_text.examples.density.title',
            titleFallback: 'Compact density',
            lang: 'vue',
            code: `<template>
  <origam-card density="compact">
    <origam-card-header title="Compact" subtitle="Less padding" density="compact" />
    <origam-card-text density="compact">
      Short body text with compact density.
    </origam-card-text>
  </origam-card>
</template>`
        }
    ],

    previewVariants: [
        { label: 'with text prop', props: { text: 'Card body text goes here.' } },
        { label: 'compact density', props: { text: 'Compact padding', density: 'compact' } },
        { label: 'comfortable density', props: { text: 'Comfortable padding', density: 'comfortable' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-card-text',
        svgViewBox: '0 0 600 120',
        svgTitle: 'Anatomy of OrigamCardText',
        svgDesc: 'Schematic of the CardText component with 2 numbered parts.',
        svg: `
  <rect x="0" y="0" width="600" height="120" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="560" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="36" y="34" width="528" height="52" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="300" y="58" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif">Body text or #default slot content</text>
  <text x="300" y="74" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="sans-serif" opacity="0.7">font-size: 0.875rem · flex: 1 1 auto</text>
  <circle cx="28" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="44" cy="36" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="44" y="40.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <line x1="38" y1="26" x2="90" y2="8" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="94" y="6" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-card-text</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-card-text&gt;</code> — root container ① (flex: 1 1 auto) with density-aware padding ② wrapping the body text or <code>#default</code> slot.',
        legend: [
            {
                num: 1,
                cls: '.origam-card-text',
                descriptionKey: 'components.card_text.anatomy.root',
                descriptionFallback: 'Root element (default: <code>&lt;div&gt;</code>). flex: 1 1 auto so it fills available card height. font-size: 0.875rem, font-weight: 400. Padding is density-adjusted.'
            },
            {
                num: 2,
                cls: '(content / #default slot)',
                descriptionKey: 'components.card_text.anatomy.content',
                descriptionFallback: 'Inner content: renders <code>&lt;span&gt;{{ text }}&lt;/span&gt;</code> when the text prop is provided, or the #default slot for richer content.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- root: <div> by default, customisable via tag prop -->
<div class="origam-card-text">
  <slot name="default">
    <span>{{ text }}</span>
  </slot>
</div>`,
        classes: [
            {
                cls: 'origam-card-text',
                descriptionKey: 'components.card_text.anatomy.root',
                descriptionFallback: 'Root element. flex: 1 1 auto, body typography, density-aware padding on all sides.'
            },
            {
                cls: 'origam-card-text--density-default',
                descriptionKey: 'components.card_text.anatomy.density_default',
                descriptionFallback: 'Density default (0px offset).'
            },
            {
                cls: 'origam-card-text--density-compact',
                descriptionKey: 'components.card_text.anatomy.density_compact',
                descriptionFallback: 'Density compact (−8px offset on all padding sides).'
            },
            {
                cls: 'origam-card-text--density-comfortable',
                descriptionKey: 'components.card_text.anatomy.density_comfortable',
                descriptionFallback: 'Density comfortable (+8px offset on all padding sides).'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-card-text---flex',
            defaultValue: '1 1 auto',
            descriptionKey: 'components.card_text.css_vars.flex',
            descriptionFallback: 'Flex grow/shrink/basis for the text area. 1 1 auto ensures it fills available vertical space.'
        },
        {
            name: '--origam-card-text---font-size',
            defaultValue: '0.875rem',
            descriptionKey: 'components.card_text.css_vars.font_size',
            descriptionFallback: 'Body text font size (0.875rem = 14px).'
        },
        {
            name: '--origam-card-text---font-weight',
            defaultValue: '400',
            descriptionKey: 'components.card_text.css_vars.font_weight',
            descriptionFallback: 'Body text font weight (normal).'
        },
        {
            name: '--origam-card-text---letter-spacing',
            defaultValue: '0.0178571429em',
            descriptionKey: 'components.card_text.css_vars.letter_spacing',
            descriptionFallback: 'Letter spacing applied to body text.'
        },
        {
            name: '--origam-card-text---padding-block-start',
            defaultValue: '1rem',
            descriptionKey: 'components.card_text.css_vars.padding_block_start',
            descriptionFallback: 'Block-start padding (density-adjusted at render time).'
        },
        {
            name: '--origam-card-text---padding-block-end',
            defaultValue: '1rem',
            descriptionKey: 'components.card_text.css_vars.padding_block_end',
            descriptionFallback: 'Block-end padding (density-adjusted).'
        },
        {
            name: '--origam-card-text---padding-inline-start',
            defaultValue: '1rem',
            descriptionKey: 'components.card_text.css_vars.padding_inline_start',
            descriptionFallback: 'Inline-start padding (density-adjusted).'
        },
        {
            name: '--origam-card-text---padding-inline-end',
            defaultValue: '1rem',
            descriptionKey: 'components.card_text.css_vars.padding_inline_end',
            descriptionFallback: 'Inline-end padding (density-adjusted).'
        },
        {
            name: '--origam-card-text---density',
            defaultValue: '0px',
            descriptionKey: 'components.card_text.css_vars.density',
            descriptionFallback: 'Density offset added to all four padding values. compact: −8px, default: 0px, comfortable: +8px.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.card_text.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.card_text.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle from the computed cardTextStyles.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.card_text.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.card_text.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.card_text.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.card_text.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [],
        notes: [
            {
                noteKey: 'components.card_text.a11y.semantics',
                noteFallback: 'OrigamCardText renders as a <div> by default. When the content is a paragraph of text, consider passing tag="p" or wrapping inner content in <p> tags for correct semantics. Avoid placing block-level elements inside a <p> tag if you change the root tag.'
            },
            {
                noteKey: 'components.card_text.a11y.focus',
                noteFallback: 'CardText is not interactive and does not receive focus. Interactive elements inside the text (links, buttons) manage their own focus and keyboard interaction.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/card.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. CardText tokens are namespaced under card-text.*.',
        excerpt: [
            {
                tokenPath: 'card-text.font-size',
                value: '0.875rem',
                type: 'dimension',
                descriptionKey: 'components.card_text.tokens.font_size',
                descriptionFallback: 'Body text font size.'
            },
            {
                tokenPath: 'card-text.padding-block',
                value: '1rem',
                type: 'dimension',
                descriptionKey: 'components.card_text.tokens.padding_block',
                descriptionFallback: 'Vertical padding of the card text area.'
            },
            {
                tokenPath: 'card-text.padding-inline',
                value: '1rem',
                type: 'dimension',
                descriptionKey: 'components.card_text.tokens.padding_inline',
                descriptionFallback: 'Horizontal padding of the card text area.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore.',
        controls: [
            {
                prop: 'text',
                kind: 'text',
                labelKey: 'components.card_text.playground.text',
                labelFallback: 'Text',
                defaultValue: ''
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.card_text.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'default', value: 'default' },
                    { label: 'compact', value: 'compact' }
                ]
            },
            {
                prop: 'rounded',
                kind: 'select',
                labelKey: 'components.card_text.playground.rounded',
                labelFallback: 'Rounded',
                defaultValue: '',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'sm', value: 'sm' },
                    { label: 'md', value: 'md' },
                    { label: 'lg', value: 'lg' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
