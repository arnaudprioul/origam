/**
 * /components/stepper-item — full documentation data for OrigamStepperItem.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Stepper/stepper.interface.ts  (IStepperItemProps)
 *   - packages/ds/src/components/Stepper/OrigamStepperItem.vue (template, emits, defineExpose)
 *   - packages/ds/tokens/component/stepper.json                (CSS tokens)
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

export const STEPPER_ITEM_DOC: IComponentDoc = {
    slug: 'stepper-item',
    name: 'StepperItem',
    tag: 'origam-stepper-item',
    icon: 'mdi-progress-check',
    category: 'Navigation',
    descriptionKey: 'components.catalog.stepper_item.description',
    descriptionFallback: 'Individual step inside a Stepper. Renders an indicator circle with its status (pending / active / done / error), a title, and an optional subtitle.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-stepper--design',
    docUrl: 'http://localhost:4000/components/Stepper/OrigamStepper',

    parentSlug: 'stepper',

    family: [
        {
            slug: 'stepper',
            name: 'Stepper',
            descriptionKey: 'components.catalog.stepper.description',
            descriptionFallback: 'Multi-step progress indicator with horizontal and vertical orientations.'
        }
    ],

    props: [
        {
            name: 'index',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.stepper_item.props.index.description',
            descriptionFallback: '0-based position of this step inside the stepper. Used to compute the status when status is not set explicitly.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.stepper_item.props.title.description',
            descriptionFallback: 'Step title rendered below the indicator. Also used to build the accessible aria-label for the step button.'
        },
        {
            name: 'subtitle',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.stepper_item.props.subtitle.description',
            descriptionFallback: 'Optional secondary line rendered below the title in a smaller, muted style.'
        },
        {
            name: 'icon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.stepper_item.props.icon.description',
            descriptionFallback: 'Custom icon rendered inside the indicator circle for the pending state. The done/error states always use their dedicated MDI icons regardless of this prop.'
        },
        {
            name: 'status',
            type: { label: 'TStepperItemStatus', slug: 'stepper-item-status', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.stepper_item.props.status.description',
            descriptionFallback: 'Explicit status override (pending | active | done | error). When omitted, the status is computed from the parent Stepper modelValue and this item\'s index.'
        },
        {
            name: 'clickable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.stepper_item.props.clickable.description',
            descriptionFallback: 'Whether clicking the item navigates the stepper. Inherits the parent Stepper clickable setting; this prop can only force it to true.'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.stepper_item.emits.click.description',
            descriptionFallback: 'Fired when the step is clicked (only when clickable is true). Payload is the step index.'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.stepper_item.examples.statuses.title',
            titleFallback: 'Statuses',
            lang: 'vue',
            code: `<template>
  <origam-stepper :model-value="1">
    <origam-stepper-item :index="0" title="Account" status="done" />
    <origam-stepper-item :index="1" title="Profile" status="active" />
    <origam-stepper-item :index="2" title="Plan" status="pending" />
    <origam-stepper-item :index="3" title="Confirm" status="error" />
  </origam-stepper>
</template>`
        },
        {
            titleKey: 'components.stepper_item.examples.clickable.title',
            titleFallback: 'Clickable steps',
            lang: 'vue',
            code: `<template>
  <origam-stepper v-model="step" clickable>
    <origam-stepper-item :index="0" title="Step 1" subtitle="Fill in your details" />
    <origam-stepper-item :index="1" title="Step 2" subtitle="Choose a plan" />
    <origam-stepper-item :index="2" title="Step 3" subtitle="Confirm" />
  </origam-stepper>
</template>

<script setup>
import { ref } from 'vue'
const step = ref(0)
</script>`
        }
    ],

    previewVariants: [
        { label: 'pending', props: { index: 0, title: 'Account', status: 'pending' } },
        { label: 'active', props: { index: 1, title: 'Profile', status: 'active' } },
        { label: 'done', props: { index: 2, title: 'Plan', status: 'done' } },
        { label: 'error', props: { index: 3, title: 'Confirm', status: 'error' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-stepper-item',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamStepperItem',
        svgDesc: 'Schematic of the StepperItem component with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #f8f5ff)" rx="4"/>
  <rect x="220" y="20" width="260" height="160" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5" stroke-dasharray="6 3"/>
  <text x="235" y="42" font-size="8" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-family="'JetBrains Mono',monospace" font-weight="700">origam-stepper-item</text>
  <circle cx="350" cy="80" r="24" fill="var(--origam-color__action--primary---bg, #7c3aed)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="2"/>
  <text x="350" y="85" font-size="13" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="600" font-family="'JetBrains Mono',monospace">2</text>
  <rect x="260" y="118" width="180" height="18" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))"/>
  <text x="350" y="131" font-size="10" fill="var(--origam-color__text---primary, #1a1a1a)" text-anchor="middle" font-family="'JetBrains Mono',monospace" font-weight="500">Profile</text>
  <rect x="275" y="142" width="150" height="14" rx="3" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.03))"/>
  <text x="350" y="153" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Fill in your details</text>
  <circle cx="228" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="228" y="32" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="326" cy="68" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="326" y="72" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="326" cy="126" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="326" y="130" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
  <circle cx="326" cy="149" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="326" y="153" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-stepper-item&gt;</code> — 4 internal parts. The root renders as <code>&lt;button&gt;</code> when clickable, <code>&lt;div&gt;</code> otherwise; the indicator circle shows step number, done-check or error-exclamation.`,
        legend: [
            {
                num: 1,
                cls: '.origam-stepper-item',
                descriptionKey: 'components.stepper_item.anatomy.root',
                descriptionFallback: 'Root element. Renders as <code>&lt;button type="button"&gt;</code> when clickable, <code>&lt;div&gt;</code> otherwise. Carries status and orientation modifier classes.'
            },
            {
                num: 2,
                cls: '.origam-stepper-item__indicator',
                descriptionKey: 'components.stepper_item.anatomy.indicator',
                descriptionFallback: 'Circular badge. Shows step number (pending), a check icon (done), an exclamation icon (error), or the custom icon prop. Background and border colour are token-driven per status.'
            },
            {
                num: 3,
                cls: '.origam-stepper-item__title',
                descriptionKey: 'components.stepper_item.anatomy.title',
                descriptionFallback: 'Primary label. Font-weight and color driven by <code>--origam-stepper---title-*</code> tokens.'
            },
            {
                num: 4,
                cls: '.origam-stepper-item__subtitle',
                descriptionKey: 'components.stepper_item.anatomy.subtitle',
                descriptionFallback: 'Secondary label shown below the title. Smaller size and muted colour via <code>--origam-stepper---subtitle-*</code> tokens.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- renders as <button> when clickable, <div> when not -->
<component :is="isClickable ? 'button' : 'div'"
  class="origam-stepper-item origam-stepper-item--active origam-stepper-item--horizontal"
  aria-current="step">
  <span class="origam-stepper-item__indicator origam-stepper-item__indicator--active"
    aria-hidden="true">
    2
  </span>
  <span class="origam-stepper-item__label">
    <span class="origam-stepper-item__title">Profile</span>
    <span class="origam-stepper-item__subtitle">Fill in your details</span>
  </span>
</component>`,
        classes: [
            {
                cls: 'origam-stepper-item',
                descriptionKey: 'components.stepper_item.anatomy.root',
                descriptionFallback: 'Root element with status + orientation modifiers.'
            },
            {
                cls: 'origam-stepper-item__indicator',
                descriptionKey: 'components.stepper_item.anatomy.indicator',
                descriptionFallback: 'Circular step badge with status modifier.'
            },
            {
                cls: 'origam-stepper-item__label',
                descriptionKey: 'components.stepper_item.anatomy.label',
                descriptionFallback: 'Column host for title and subtitle.'
            },
            {
                cls: 'origam-stepper-item__title',
                descriptionKey: 'components.stepper_item.anatomy.title',
                descriptionFallback: 'Primary step label.'
            },
            {
                cls: 'origam-stepper-item__subtitle',
                descriptionKey: 'components.stepper_item.anatomy.subtitle',
                descriptionFallback: 'Secondary step label.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-stepper---indicator-size',
            defaultValue: '32px',
            descriptionKey: 'components.stepper_item.css_vars.indicator_size',
            descriptionFallback: 'Width and height of the step indicator circle.'
        },
        {
            name: '--origam-stepper---indicator-bg',
            defaultValue: 'var(--origam-color__surface---overlay)',
            descriptionKey: 'components.stepper_item.css_vars.indicator_bg',
            descriptionFallback: 'Background of the pending step indicator.'
        },
        {
            name: '--origam-stepper---indicator-color',
            defaultValue: 'var(--origam-color__text---secondary)',
            descriptionKey: 'components.stepper_item.css_vars.indicator_color',
            descriptionFallback: 'Foreground of the pending step indicator.'
        },
        {
            name: '--origam-stepper---color',
            defaultValue: 'var(--origam-color__action--primary---bg)',
            descriptionKey: 'components.stepper_item.css_vars.color',
            descriptionFallback: 'Active/done indicator colour. Controls both the border and the background tint.'
        },
        {
            name: '--origam-stepper---indicator-error-bg',
            defaultValue: 'var(--origam-color__feedback--danger---bg)',
            descriptionKey: 'components.stepper_item.css_vars.indicator_error_bg',
            descriptionFallback: 'Background of the error state indicator.'
        },
        {
            name: '--origam-stepper---title-font-size',
            defaultValue: '0.875rem',
            descriptionKey: 'components.stepper_item.css_vars.title_font_size',
            descriptionFallback: 'Font size of the step title.'
        },
        {
            name: '--origam-stepper---title-font-weight',
            defaultValue: '500',
            descriptionKey: 'components.stepper_item.css_vars.title_font_weight',
            descriptionFallback: 'Font weight of the step title.'
        },
        {
            name: '--origam-stepper---subtitle-font-size',
            defaultValue: '0.75rem',
            descriptionKey: 'components.stepper_item.css_vars.subtitle_font_size',
            descriptionFallback: 'Font size of the step subtitle.'
        },
        {
            name: '--origam-stepper---subtitle-color',
            defaultValue: 'var(--origam-color__text---secondary)',
            descriptionKey: 'components.stepper_item.css_vars.subtitle_color',
            descriptionFallback: 'Colour of the step subtitle text.'
        },
        {
            name: '--origam-stepper---gap',
            defaultValue: '8px',
            descriptionKey: 'components.stepper_item.css_vars.gap',
            descriptionFallback: 'Gap between the indicator circle and the label column.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.stepper_item.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to a child component.'
        },
        {
            name: 'resolvedStatus',
            type: "ComputedRef<'pending' | 'active' | 'done' | 'error'>",
            descriptionKey: 'components.stepper_item.exposed.resolved_status',
            descriptionFallback: 'Computed status taking the explicit status prop or deriving it from the parent Stepper modelValue and this item\'s index.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['button'],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.stepper_item.a11y.key_tab',
                actionFallback: 'Moves focus to the next clickable step button.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.stepper_item.a11y.key_activate',
                actionFallback: 'Navigates to this step when clickable is true.'
            }
        ],
        notes: [
            {
                noteKey: 'components.stepper_item.a11y.current_note',
                noteFallback: 'The active step carries aria-current="step" so screen readers announce it as the current step in the sequence.'
            },
            {
                noteKey: 'components.stepper_item.a11y.label_note',
                noteFallback: 'When a title is provided, the step button receives an aria-label of the form "Step {n}: {title}" generated by the DS locale key origam.stepper.stepAriaLabel.'
            },
            {
                noteKey: 'components.stepper_item.a11y.indicator_note',
                noteFallback: 'The indicator circle carries aria-hidden="true" — its content (number, check, exclamation) is decorative because the aria-label on the root already conveys the step identity and status.'
            },
            {
                noteKey: 'components.stepper_item.a11y.focus_note',
                noteFallback: 'Clickable items show a focus-visible outline using the stepper primary colour token. Non-clickable items have cursor: default and are not keyboard-reachable.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/stepper.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'stepper.indicator-size',
                value: '{space.8}',
                type: 'dimension',
                descriptionKey: 'components.stepper_item.tokens.indicator_size',
                descriptionFallback: 'Width and height of the step indicator circle.'
            },
            {
                tokenPath: 'stepper.indicator-active-bg',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.stepper_item.tokens.indicator_active_bg',
                descriptionFallback: 'Background of the active step indicator.'
            },
            {
                tokenPath: 'stepper.indicator-error-bg',
                value: '{color.feedback.danger.bg}',
                type: 'color',
                descriptionKey: 'components.stepper_item.tokens.indicator_error_bg',
                descriptionFallback: 'Background of the error state indicator.'
            },
            {
                tokenPath: 'stepper.title-font-weight',
                value: '{font.weight.medium}',
                type: 'fontWeight',
                descriptionKey: 'components.stepper_item.tokens.title_font_weight',
                descriptionFallback: 'Font weight of the step title.'
            },
            {
                tokenPath: 'stepper.subtitle-color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.stepper_item.tokens.subtitle_color',
                descriptionFallback: 'Colour of the step subtitle.'
            }
        ]
    } satisfies IComponentTokens
}
