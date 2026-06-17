/**
 * /components/confirm-wrapper — full documentation data for OrigamConfirmWrapper.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/ConfirmWrapper/confirm-wrapper.interface.ts  (props)
 *   - packages/ds/src/components/ConfirmWrapper/OrigamConfirmWrapper.vue      (template BEM, defineExpose)
 *   - packages/ds/tokens/component/confirm-wrapper.json                       (CSS tokens)
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

export const CONFIRM_WRAPPER_DOC: IComponentDoc = {
    slug: 'confirm-wrapper',
    name: 'ConfirmWrapper',
    tag: 'origam-confirm-wrapper',
    icon: 'mdi-form-textbox',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.confirm_wrapper.description',
    descriptionFallback: '"Type-it-twice" form helper that pairs a primary input with a confirmation input and validates that both values match.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-confirmwrapper--design',
    docUrl: 'http://localhost:4000/components/ConfirmWrapper/OrigamConfirmWrapper',

    family: [],

    related: [
        {
            slug: 'field',
            name: 'Field',
            kind: 'component',
            descriptionKey: 'components.catalog.field.description',
            descriptionFallback: 'Base field shell that ConfirmWrapper builds upon.'
        },
        {
            slug: 'form',
            name: 'Form',
            kind: 'component',
            descriptionKey: 'components.catalog.form.description',
            descriptionFallback: 'Form container that coordinates validation with ConfirmWrapper.'
        },
        {
            slug: 'text-field',
            name: 'TextField',
            kind: 'component',
            descriptionKey: 'components.catalog.text_field.description',
            descriptionFallback: 'Text field typically placed in the default and confirm slots.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.model_value.description',
            descriptionFallback: 'Value of the primary input (v-model).'
        },
        {
            name: 'confirm',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.confirm.description',
            descriptionFallback: 'Value of the confirmation input (v-model:confirm). Validation passes when it equals modelValue.'
        },
        {
            name: 'field',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.field.description',
            descriptionFallback: 'Field name used in error messages, e.g. "password".'
        },
        {
            name: 'defaults',
            type: { label: 'Record<string, any>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.defaults.description',
            descriptionFallback: 'Default prop overrides forwarded to both inner input components.'
        },
        {
            name: 'confirmLabel',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.confirm_label.description',
            descriptionFallback: 'Label for the confirmation input field.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.label.description',
            descriptionFallback: 'Label for the primary input field.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.confirm_wrapper.props.disabled.description',
            descriptionFallback: 'Disables both the primary and confirmation inputs.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.confirm_wrapper.props.readonly.description',
            descriptionFallback: 'Makes both inputs non-interactive without visually disabling them.'
        },
        {
            name: 'required',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.confirm_wrapper.props.required.description',
            descriptionFallback: 'Marks both fields as required.'
        },
        {
            name: 'error',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.confirm_wrapper.props.error.description',
            descriptionFallback: 'Forces the error visual state on both inputs.'
        },
        {
            name: 'errorMessages',
            type: { label: 'string | string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.error_messages.description',
            descriptionFallback: 'Custom error messages shown below the fields.'
        },
        {
            name: 'hint',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.hint.description',
            descriptionFallback: 'Helper text shown below the field.'
        },
        {
            name: 'persistentHint',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.confirm_wrapper.props.persistent_hint.description',
            descriptionFallback: 'Always shows the hint, even when the field is not focused.'
        },
        {
            name: 'hideDetails',
            type: { label: "boolean | 'auto'", slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.confirm_wrapper.props.hide_details.description',
            descriptionFallback: "Hides the hint/error messages area. 'auto' hides when there is nothing to show."
        },
        {
            name: 'messages',
            type: { label: 'string | string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.messages.description',
            descriptionFallback: 'Informational messages shown below the fields (non-error).'
        },
        {
            name: 'centerAffix',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.center_affix.description',
            descriptionFallback: 'Vertically centres the prepend/append icons within the field height.'
        },
        {
            name: 'variant',
            type: { label: 'TVariant', slug: 'variant', kind: 'type' },
            defaultValue: "'outlined'",
            descriptionKey: 'components.confirm_wrapper.props.variant.description',
            descriptionFallback: 'Visual style variant forwarded to both input fields (outlined, filled, plain, underlined, solo…).'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.color.description',
            descriptionFallback: 'Intent or custom colour for the active/focused state of both inputs.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.confirm_wrapper.props.density.description',
            descriptionFallback: 'Adjusts vertical padding density for both inputs.'
        },
        {
            name: 'direction',
            type: { label: "'horizontal' | 'vertical'", slug: '', kind: 'primitive' },
            defaultValue: "'vertical'",
            descriptionKey: 'components.confirm_wrapper.props.direction.description',
            descriptionFallback: 'Stacks the primary and confirmation inputs vertically or side by side.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.rounded.description',
            descriptionFallback: 'Border-radius token forwarded to both input fields.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation forwarded to both input fields.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.prepend_icon.description',
            descriptionFallback: 'Icon displayed in the prepend slot of the header.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.confirm_wrapper.props.append_icon.description',
            descriptionFallback: 'Icon displayed in the append slot of the header.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.confirm_wrapper.emits.update_model_value.description',
            descriptionFallback: 'Fired when the primary input value changes.'
        },
        {
            event: 'update:confirm',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.confirm_wrapper.emits.update_confirm.description',
            descriptionFallback: 'Fired when the confirmation input value changes.'
        },
        {
            event: 'focus',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.confirm_wrapper.emits.focus.description',
            descriptionFallback: 'Fired when either input receives focus.'
        },
        {
            event: 'blur',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.confirm_wrapper.emits.blur.description',
            descriptionFallback: 'Fired when either input loses focus.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.confirm_wrapper.slots.default.description',
            descriptionFallback: 'Primary input slot. Renders the first field (e.g. a PasswordField or TextField).'
        },
        {
            slot: 'confirm',
            slotProps: '—',
            descriptionKey: 'components.confirm_wrapper.slots.confirm.description',
            descriptionFallback: 'Confirmation input slot. Renders the second field that must match the primary.'
        },
        {
            slot: 'header',
            slotProps: '—',
            descriptionKey: 'components.confirm_wrapper.slots.header.description',
            descriptionFallback: 'Optional header area rendered above both fields. Contains prepend / title / append.'
        },
        {
            slot: 'title',
            slotProps: 'any',
            descriptionKey: 'components.confirm_wrapper.slots.title.description',
            descriptionFallback: 'Custom title inside the header area.'
        },
        {
            slot: 'messages',
            slotProps: '{ hasMessages: boolean, messages: string[], messagesId: string }',
            descriptionKey: 'components.confirm_wrapper.slots.messages.description',
            descriptionFallback: 'Custom messages block (replaces the default messages/errors area).'
        },
        {
            slot: 'message',
            slotProps: '{ message: string }',
            descriptionKey: 'components.confirm_wrapper.slots.message.description',
            descriptionFallback: 'Custom renderer for a single message entry.'
        },
        {
            slot: 'details',
            slotProps: '{ id: string, messagesId: string, isDirty: boolean, isDisabled: boolean, isReadonly: boolean }',
            descriptionKey: 'components.confirm_wrapper.slots.details.description',
            descriptionFallback: 'Custom details area below the fields (hint, counter, messages).'
        }
    ],

    examples: [
        {
            titleKey: 'components.confirm_wrapper.examples.password.title',
            titleFallback: 'Password confirmation',
            lang: 'vue',
            code: `<template>
  <origam-confirm-wrapper
    v-model="password"
    v-model:confirm="passwordConfirm"
    label="Password"
    confirm-label="Confirm password"
  >
    <template #default>
      <origam-password-field v-model="password" label="Password" />
    </template>
    <template #confirm>
      <origam-password-field v-model="passwordConfirm" label="Confirm password" />
    </template>
  </origam-confirm-wrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const password = ref('')
  const passwordConfirm = ref('')
</script>`
        },
        {
            titleKey: 'components.confirm_wrapper.examples.email.title',
            titleFallback: 'Email confirmation',
            lang: 'vue',
            code: `<template>
  <origam-confirm-wrapper
    v-model="email"
    v-model:confirm="emailConfirm"
    field="email"
    label="Email address"
    confirm-label="Confirm email"
    variant="outlined"
    color="primary"
  >
    <template #default>
      <origam-text-field v-model="email" label="Email address" type="email" />
    </template>
    <template #confirm>
      <origam-text-field v-model="emailConfirm" label="Confirm email" type="email" />
    </template>
  </origam-confirm-wrapper>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const email = ref('')
  const emailConfirm = ref('')
</script>`
        },
        {
            titleKey: 'components.confirm_wrapper.examples.horizontal.title',
            titleFallback: 'Horizontal layout',
            lang: 'vue',
            code: `<template>
  <origam-confirm-wrapper
    v-model="value"
    v-model:confirm="valueConfirm"
    direction="horizontal"
    label="PIN"
    confirm-label="Confirm PIN"
  >
    <template #default>
      <origam-text-field v-model="value" label="PIN" type="password" />
    </template>
    <template #confirm>
      <origam-text-field v-model="valueConfirm" label="Confirm PIN" type="password" />
    </template>
  </origam-confirm-wrapper>
</template>`
        }
    ],

    previewVariants: [] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-confirm-wrapper',
        svgViewBox: '0 0 700 280',
        svgTitle: 'Anatomy of OrigamConfirmWrapper',
        svgDesc: 'Schematic of the ConfirmWrapper component with numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="280" fill="var(--origam-color__surface---sunken, #f9f5ff)" rx="4"/>
  <rect x="20" y="20" width="660" height="240" rx="8" fill="none" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1.5"/>
  <circle cx="36" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <text x="60" y="30" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-confirm-wrapper</text>
  <rect x="28" y="36" width="644" height="48" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(124,58,237,0.2))" stroke-width="1"/>
  <circle cx="44" cy="60" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="44" y="64.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <text x="62" y="64" font-size="10" fill="var(--origam-color__text---secondary, #666)" font-family="system-ui">Header — prepend / title / append</text>
  <rect x="28" y="92" width="644" height="58" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(124,58,237,0.2))" stroke-width="1"/>
  <circle cx="44" cy="121" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="44" y="125.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="62" y="125" font-size="10" fill="var(--origam-color__text---secondary, #666)" font-family="system-ui">#default — Primary input field</text>
  <rect x="28" y="158" width="644" height="58" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(124,58,237,0.2))" stroke-width="1"/>
  <circle cx="44" cy="187" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="44" y="191.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <text x="62" y="191" font-size="10" fill="var(--origam-color__text---secondary, #666)" font-family="system-ui">#confirm — Confirmation input field</text>
  <rect x="28" y="224" width="644" height="28" rx="4" fill="none"/>
  <circle cx="44" cy="238" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="44" y="242.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <text x="62" y="242" font-size="10" fill="var(--origam-color__text---secondary, #666)" font-family="system-ui">Details — messages / hint / counter</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-confirm-wrapper&gt;</code> — 5 regions. The wrapper coordinates validation between the #default and #confirm slots, surfacing match errors in the details zone.`,
        legend: [
            {
                num: 1,
                cls: '.origam-confirm-wrapper',
                descriptionKey: 'components.confirm_wrapper.anatomy.root',
                descriptionFallback: 'Root element. Manages shared validation state between the two inner inputs.'
            },
            {
                num: 2,
                cls: '.origam-confirm-wrapper__header',
                descriptionKey: 'components.confirm_wrapper.anatomy.header',
                descriptionFallback: 'Optional header row. Contains prepend, title and append sub-elements. Hidden when no header content is provided.'
            },
            {
                num: 3,
                cls: '.origam-confirm-wrapper__field',
                descriptionKey: 'components.confirm_wrapper.anatomy.field',
                descriptionFallback: 'Primary input container. The <code>#default</code> slot renders here.'
            },
            {
                num: 4,
                cls: '.origam-confirm-wrapper__confirm',
                descriptionKey: 'components.confirm_wrapper.anatomy.confirm',
                descriptionFallback: 'Confirmation input container. The <code>#confirm</code> slot renders here.'
            },
            {
                num: 5,
                cls: '.origam-confirm-wrapper__details',
                descriptionKey: 'components.confirm_wrapper.anatomy.details',
                descriptionFallback: 'Details row. Shows hint, messages and match-error text. Height governed by <code>--origam-confirm-wrapper---details-min-height</code>.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-confirm-wrapper">

  <!-- header (conditional: prepend / title / append) -->
  <div class="origam-confirm-wrapper__header">
    <div class="origam-confirm-wrapper__prepend"><slot name="prepend"/></div>
    <div class="origam-confirm-wrapper__label"><slot name="title"/></div>
    <div class="origam-confirm-wrapper__append"><slot name="append"/></div>
  </div>

  <!-- field row -->
  <div class="origam-confirm-wrapper__content">
    <div class="origam-confirm-wrapper__field">
      <slot name="default" />  <!-- primary input -->
    </div>
    <div class="origam-confirm-wrapper__confirm">
      <slot name="confirm" />  <!-- confirmation input -->
    </div>
  </div>

  <!-- details / messages -->
  <div class="origam-confirm-wrapper__details">
    <slot name="messages" />
  </div>
</div>`,
        classes: [
            { cls: 'origam-confirm-wrapper', descriptionKey: 'components.confirm_wrapper.anatomy.root', descriptionFallback: 'Root container. Manages shared form validation.' },
            { cls: 'origam-confirm-wrapper__header', descriptionKey: 'components.confirm_wrapper.anatomy.header', descriptionFallback: 'Header row with prepend / label / append regions.' },
            { cls: 'origam-confirm-wrapper__prepend', descriptionKey: 'components.confirm_wrapper.anatomy.prepend', descriptionFallback: 'Leading icon/avatar area in the header.' },
            { cls: 'origam-confirm-wrapper__label', descriptionKey: 'components.confirm_wrapper.anatomy.label', descriptionFallback: 'Title area in the header.' },
            { cls: 'origam-confirm-wrapper__append', descriptionKey: 'components.confirm_wrapper.anatomy.append', descriptionFallback: 'Trailing icon/avatar area in the header.' },
            { cls: 'origam-confirm-wrapper__content', descriptionKey: 'components.confirm_wrapper.anatomy.content', descriptionFallback: 'Flex container holding both input slots (direction-aware: vertical / horizontal).' },
            { cls: 'origam-confirm-wrapper__field', descriptionKey: 'components.confirm_wrapper.anatomy.field', descriptionFallback: 'Primary input slot wrapper.' },
            { cls: 'origam-confirm-wrapper__confirm', descriptionKey: 'components.confirm_wrapper.anatomy.confirm', descriptionFallback: 'Confirmation input slot wrapper.' },
            { cls: 'origam-confirm-wrapper__details', descriptionKey: 'components.confirm_wrapper.anatomy.details', descriptionFallback: 'Messages and hint area below the inputs.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-confirm-wrapper---padding-start',
            defaultValue: '{space.2}',
            descriptionKey: 'components.confirm_wrapper.css_vars.padding_start',
            descriptionFallback: 'Inline-start (left in LTR) padding of the wrapper.'
        },
        {
            name: '--origam-confirm-wrapper---padding-end',
            defaultValue: '{space.2}',
            descriptionKey: 'components.confirm_wrapper.css_vars.padding_end',
            descriptionFallback: 'Inline-end (right in LTR) padding of the wrapper.'
        },
        {
            name: '--origam-confirm-wrapper---padding-top',
            defaultValue: '{space.2}',
            descriptionKey: 'components.confirm_wrapper.css_vars.padding_top',
            descriptionFallback: 'Block-start padding of the wrapper.'
        },
        {
            name: '--origam-confirm-wrapper---padding-bottom',
            defaultValue: '{space.4}',
            descriptionKey: 'components.confirm_wrapper.css_vars.padding_bottom',
            descriptionFallback: 'Block-end padding of the wrapper.'
        },
        {
            name: '--origam-confirm-wrapper---details-min-height',
            defaultValue: '22px',
            descriptionKey: 'components.confirm_wrapper.css_vars.details_min_height',
            descriptionFallback: 'Minimum height of the details row to prevent layout shift when messages appear.'
        },
        {
            name: '--origam-confirm-wrapper---horizontal-gap',
            defaultValue: '1em',
            descriptionKey: 'components.confirm_wrapper.css_vars.horizontal_gap',
            descriptionFallback: 'Gap between primary and confirmation fields in horizontal direction mode.'
        },
        {
            name: '--origam-confirm-wrapper--error---color',
            defaultValue: '{color.feedback.danger.fgSubtle}',
            descriptionKey: 'components.confirm_wrapper.css_vars.error_color',
            descriptionFallback: 'Error text color rendered in the details row when values do not match.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.confirm_wrapper.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'validate',
            type: '() => Promise<boolean>',
            descriptionKey: 'components.confirm_wrapper.exposed.validate',
            descriptionFallback: 'Triggers validation of both fields. Resolves to true when values match and all rules pass.'
        },
        {
            name: 'reset',
            type: '() => void',
            descriptionKey: 'components.confirm_wrapper.exposed.reset',
            descriptionFallback: 'Resets both input values and clears validation state.'
        },
        {
            name: 'resetValidation',
            type: '() => void',
            descriptionKey: 'components.confirm_wrapper.exposed.reset_validation',
            descriptionFallback: 'Clears validation messages without resetting values.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.confirm_wrapper.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle for the injected style sheet.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.confirm_wrapper.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.confirm_wrapper.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.confirm_wrapper.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.confirm_wrapper.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected into the DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Tab',
                actionKey: 'components.confirm_wrapper.a11y.key_tab',
                actionFallback: 'Moves focus from the primary input to the confirmation input, then to the next focusable element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.confirm_wrapper.a11y.error_note',
                noteFallback: 'When validation fails (values do not match), the error message is associated with the confirmation field via aria-describedby. The confirmation input receives aria-invalid="true".'
            },
            {
                noteKey: 'components.confirm_wrapper.a11y.required_note',
                noteFallback: 'When required=true, aria-required="true" is forwarded to both inner inputs.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/confirm-wrapper.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'confirm-wrapper.padding-bottom',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.confirm_wrapper.tokens.padding_bottom',
                descriptionFallback: 'Block-end padding of the wrapper.'
            },
            {
                tokenPath: 'confirm-wrapper.details-min-height',
                value: '22px',
                type: 'dimension',
                descriptionKey: 'components.confirm_wrapper.tokens.details_min_height',
                descriptionFallback: 'Minimum height of the details row.'
            },
            {
                tokenPath: 'confirm-wrapper.horizontal-gap',
                value: '1em',
                type: 'dimension',
                descriptionKey: 'components.confirm_wrapper.tokens.horizontal_gap',
                descriptionFallback: 'Gap between fields in horizontal mode.'
            },
            {
                tokenPath: 'confirm-wrapper.error.color',
                value: '{color.feedback.danger.fgSubtle}',
                type: 'color',
                descriptionKey: 'components.confirm_wrapper.tokens.error_color',
                descriptionFallback: 'Error text color when values do not match.'
            },
            {
                tokenPath: 'confirm-wrapper.disabled-opacity',
                value: '{opacity.50}',
                type: 'number',
                descriptionKey: 'components.confirm_wrapper.tokens.disabled_opacity',
                descriptionFallback: 'Opacity applied to both fields when disabled.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'variant',
                kind: 'select',
                labelKey: 'components.confirm_wrapper.playground.variant',
                labelFallback: 'Variant',
                defaultValue: 'outlined',
                options: [
                    { label: 'outlined', value: 'outlined' },
                    { label: 'filled', value: 'filled' },
                    { label: 'plain', value: 'plain' },
                    { label: 'underlined', value: 'underlined' },
                    { label: 'solo', value: 'solo' }
                ]
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.confirm_wrapper.playground.color',
                labelFallback: 'Color',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.confirm_wrapper.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'default', value: 'default' },
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'compact', value: 'compact' }
                ]
            },
            {
                prop: 'direction',
                kind: 'select',
                labelKey: 'components.confirm_wrapper.playground.direction',
                labelFallback: 'Direction',
                defaultValue: 'vertical',
                options: [
                    { label: 'vertical', value: 'vertical' },
                    { label: 'horizontal', value: 'horizontal' }
                ]
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.confirm_wrapper.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'error',
                kind: 'switch',
                labelKey: 'components.confirm_wrapper.playground.error',
                labelFallback: 'Error state',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
