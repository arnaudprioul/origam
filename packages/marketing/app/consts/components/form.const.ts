/**
 * /components/form — full documentation data for OrigamForm.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Form/form.interface.ts  (props, emits, slots)
 *   - packages/ds/src/components/Form/OrigamForm.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/form.json             (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentPlayground,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const FORM_DOC: IComponentDoc = {
    slug: 'form',
    name: 'Form',
    tag: 'origam-form',
    icon: 'mdi-form-select',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.form.description',
    descriptionFallback: 'Form container with centralised validation, global error messaging, accessible submit/reset lifecycle, and an optional scroll-to-first-error behaviour. Wraps any number of Origam input fields and coordinates their validation state.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-form--design',
    docUrl: 'http://localhost:4000/components/Form/OrigamForm',

    family: [],

    related: [
        {
            slug: 'text-field',
            name: 'TextField',
            kind: 'component',
            descriptionKey: 'components.catalog.text_field.description',
            descriptionFallback: 'Single-line text input that registers with an ancestor Form.'
        },
        {
            slug: 'field',
            name: 'Field',
            kind: 'component',
            descriptionKey: 'components.catalog.field.description',
            descriptionFallback: 'Shared field primitive consumed by all inputs inside a Form.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'boolean | null', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.form.props.model_value.description',
            descriptionFallback: 'v-model binding reflecting the overall validity: true = valid, false = invalid, null = not yet validated.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.form.props.disabled.description',
            descriptionFallback: 'Disables all child input fields. Injected as IFormProvide.isDisabled.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.form.props.readonly.description',
            descriptionFallback: 'Makes all child input fields read-only. Injected as IFormProvide.isReadonly.'
        },
        {
            name: 'fastFail',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.form.props.fast_fail.description',
            descriptionFallback: 'When true, stops validating subsequent fields after the first error. Useful for long forms where early errors should block submission.'
        },
        {
            name: 'validateOn',
            type: { label: 'TValidateOn', slug: 'validate-on', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.form.props.validate_on.description',
            descriptionFallback: "Controls when child fields trigger validation. Values: 'blur' | 'input' | 'change' | 'submit' | 'lazy' | combinations."
        },
        {
            name: 'rules',
            type: { label: 'Array<any>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.form.props.rules.description',
            descriptionFallback: 'Form-level validation rules. Run on submit; errors appear in the __details section.'
        },
        {
            name: 'errorMessages',
            type: { label: 'Array<string> | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.form.props.error_messages.description',
            descriptionFallback: 'Pre-set error messages displayed in the form details zone (e.g. server-side errors after submit).'
        },
        {
            name: 'hint',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.form.props.hint.description',
            descriptionFallback: 'Helper text shown in the form details zone when no error is present.'
        },
        {
            name: 'messages',
            type: { label: 'Array<string> | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.form.props.messages.description',
            descriptionFallback: 'Informational messages displayed in the form details zone.'
        },
        {
            name: 'scrollToError',
            type: { label: 'boolean | ScrollIntoViewOptions', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.form.props.scroll_to_error.description',
            descriptionFallback: 'Automatically scrolls to the first field in error on submit. Pass a ScrollIntoViewOptions object to customise the scroll behaviour.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'boolean | null', slug: '', kind: 'primitive' },
            descriptionKey: 'components.form.emits.update_model_value.description',
            descriptionFallback: 'Fired when the global validity changes.'
        },
        {
            event: 'submit',
            payload: { label: 'ISubmitEventPromise', slug: '', kind: 'primitive' },
            descriptionKey: 'components.form.emits.submit.description',
            descriptionFallback: 'Fired on form submit. The event is augmented with a Promise that resolves to { valid, errors }. Prevent the default to stop the native form submission.'
        },
        {
            event: 'reset',
            payload: { label: 'Event', slug: '', kind: 'primitive' },
            descriptionKey: 'components.form.emits.reset.description',
            descriptionFallback: 'Fired when the form is reset (via the native reset event or the exposed reset() method).'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '{ submit, reset, validate, resetValidation, isValid, isValidating, items, errors }',
            descriptionKey: 'components.form.slots.default.description',
            descriptionFallback: 'Form content. Receives the form helpers (submit, reset, validate, resetValidation) and state (isValid, isValidating, items, errors).'
        },
        {
            slot: 'messages',
            slotProps: '{ hasMessages, messages }',
            descriptionKey: 'components.form.slots.messages.description',
            descriptionFallback: 'Replaces the OrigamMessages zone in the __details section.'
        },
        {
            slot: 'message',
            slotProps: '{ message }',
            descriptionKey: 'components.form.slots.message.description',
            descriptionFallback: 'Replaces a single message row inside the messages slot.'
        },
        {
            slot: 'actions',
            slotProps: '{ submit, reset }',
            descriptionKey: 'components.form.slots.actions.description',
            descriptionFallback: 'Action buttons rendered inside the __actions div below the form content. Receives submit and reset callbacks.'
        }
    ],

    examples: [
        {
            titleKey: 'components.form.examples.basic.title',
            titleFallback: 'Basic validated form',
            lang: 'vue',
            code: `<template>
  <origam-form v-model="isValid" @submit.prevent="onSubmit">
    <origam-text-field
      v-model="email"
      label="Email"
      type="email"
      :rules="[v => !!v || 'Required', v => /.+@.+/.test(v) || 'Invalid email']"
    />
    <origam-text-field
      v-model="password"
      label="Password"
      type="password"
      :rules="[v => !!v || 'Required']"
    />

    <template #actions="{ submit }">
      <origam-btn type="submit" color="primary" text="Submit" :disabled="!isValid" />
    </template>
  </origam-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const isValid = ref(null)
const email = ref('')
const password = ref('')
const onSubmit = () => console.log('submitted')
</script>`
        },
        {
            titleKey: 'components.form.examples.server_errors.title',
            titleFallback: 'Server-side errors',
            lang: 'vue',
            code: `<template>
  <origam-form
    :error-messages="serverErrors"
    @submit.prevent="handleSubmit"
  >
    <origam-text-field v-model="username" label="Username" />
    <template #actions="{ submit }">
      <origam-btn text="Login" @click="submit" />
    </template>
  </origam-form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
const username = ref('')
const serverErrors = ref([])
const handleSubmit = async () => {
  const res = await login(username.value)
  if (!res.ok) serverErrors.value = [res.message]
}
</script>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-form',
        svgViewBox: '0 0 700 200',
        svgTitle: 'Anatomy of OrigamForm',
        svgDesc: 'Schematic of the Form component with 3 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="28" y="16" width="644" height="168" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="48" y="32" width="604" height="80" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.06))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.25))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="76" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__content (#default slot — form fields)</text>
  <rect x="48" y="124" width="604" height="24" rx="3" fill="var(--origam-color__feedback--danger---bgSubtle, rgba(220,38,38,0.05))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="350" y="140" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">__details (OrigamMessages — error / hint)</text>
  <rect x="48" y="156" width="200" height="20" rx="3" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.08))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="3 2"/>
  <text x="148" y="169" font-size="8" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle">__actions (#actions slot)</text>
  <circle cx="36" cy="24" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="36" y="28.5" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">1</text>
  <circle cx="56" cy="40" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="44" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">2</text>
  <circle cx="56" cy="132" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="56" y="136" font-size="9" fill="var(--origam-color__action--primary---fg, #fff)" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-form&gt;</code> — 3 internal zones. The root ① is a native <code>&lt;form novalidate&gt;</code>. Content ② holds the input fields. Details ③ shows form-level error/hint messages via OrigamMessages.`,
        legend: [
            {
                num: 1,
                cls: '.origam-form',
                descriptionKey: 'components.form.anatomy.root',
                descriptionFallback: 'Root <form> element with novalidate (prevents browser default validation). Handles @submit and @reset natively.'
            },
            {
                num: 2,
                cls: '.origam-form__content',
                descriptionKey: 'components.form.anatomy.content',
                descriptionFallback: 'Wrapper div hosting the #default slot. Contains all field components that register with the form.'
            },
            {
                num: 3,
                cls: '.origam-form__details',
                descriptionKey: 'components.form.anatomy.details',
                descriptionFallback: 'Form-level messages zone. Renders OrigamMessages when there are form-level errors or hints. Hidden when no messages are active.'
            },
            {
                num: 4,
                cls: '.origam-form__actions',
                descriptionKey: 'components.form.anatomy.actions',
                descriptionFallback: 'Actions row. Rendered only when the #actions slot is provided. Flex container with gap and top margin.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<form class="origam-form" novalidate @submit="handleSubmit" @reset="handleReset">

  <!-- input fields register automatically via inject(IFormProvide) -->
  <div class="origam-form__content">
    <slot name="default" v-bind="form" />
  </div>

  <!-- form-level error / hint messages — v-if hasMessages -->
  <div class="origam-form__details">
    <slot name="messages" v-bind="{ hasMessages, messages }">
      <origam-messages :messages="messages" />
    </slot>
  </div>

  <!-- action buttons — v-if slots.actions -->
  <div class="origam-form__actions">
    <slot name="actions" v-bind="{ submit, reset }" />
  </div>
</form>`,
        classes: [
            {
                cls: 'origam-form',
                descriptionKey: 'components.form.anatomy.root',
                descriptionFallback: 'Root <form> element.'
            },
            {
                cls: 'origam-form--error',
                descriptionKey: 'components.form.anatomy.error',
                descriptionFallback: 'Applied when form-level validation fails. Changes message/icon colour to danger semantic.'
            },
            {
                cls: 'origam-form__content',
                descriptionKey: 'components.form.anatomy.content',
                descriptionFallback: 'Form fields wrapper.'
            },
            {
                cls: 'origam-form__details',
                descriptionKey: 'components.form.anatomy.details',
                descriptionFallback: 'Form-level message zone (error / hint).'
            },
            {
                cls: 'origam-form__actions',
                descriptionKey: 'components.form.anatomy.actions',
                descriptionFallback: 'Action buttons row. Flex with gap.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-form__actions---margin-top',
            defaultValue: '{space.4} (16px)',
            descriptionKey: 'components.form.css_vars.actions_margin_top',
            descriptionFallback: 'Top margin separating the actions row from the form body.'
        },
        {
            name: '--origam-form__actions---gap',
            defaultValue: '{space.2} (8px)',
            descriptionKey: 'components.form.css_vars.actions_gap',
            descriptionFallback: 'Gap between action buttons in the __actions row.'
        },
        {
            name: '--origam-form__details---font-size',
            defaultValue: '{font.size.sm} (0.75rem)',
            descriptionKey: 'components.form.css_vars.details_font_size',
            descriptionFallback: 'Font size of form-level messages.'
        },
        {
            name: '--origam-form__details---min-height',
            defaultValue: '22px',
            descriptionKey: 'components.form.css_vars.details_min_height',
            descriptionFallback: 'Minimum height of the details zone. Prevents layout shift when messages appear.'
        },
        {
            name: '--origam-form--error---messages-color',
            defaultValue: '{color.feedback.danger.fgSubtle}',
            descriptionKey: 'components.form.css_vars.error_messages_color',
            descriptionFallback: 'Message text colour in error state.'
        },
        {
            name: '--origam-form--error---icon-color',
            defaultValue: '{color.feedback.danger.fgSubtle}',
            descriptionKey: 'components.form.css_vars.error_icon_color',
            descriptionFallback: 'Icon colour in error state.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.form.exposed.filter_props',
            descriptionFallback: 'Filters and forwards props to child components.'
        },
        {
            name: 'submit',
            type: '() => void',
            descriptionKey: 'components.form.exposed.submit',
            descriptionFallback: 'Triggers form validation and submit. Equivalent to clicking a [type=submit] button.'
        },
        {
            name: 'reset',
            type: '() => void',
            descriptionKey: 'components.form.exposed.reset',
            descriptionFallback: 'Resets all child fields to their initial value and clears validation errors.'
        },
        {
            name: 'validate',
            type: '() => Promise<IFormValidationResult>',
            descriptionKey: 'components.form.exposed.validate',
            descriptionFallback: 'Programmatically validates all registered child fields. Returns { valid, errors }.'
        },
        {
            name: 'resetValidation',
            type: '() => void',
            descriptionKey: 'components.form.exposed.reset_validation',
            descriptionFallback: 'Clears all validation errors without resetting field values.'
        },
        {
            name: 'isValid',
            type: 'Ref<boolean | null>',
            descriptionKey: 'components.form.exposed.is_valid',
            descriptionFallback: 'Current overall validity: true (valid), false (invalid), null (pending).'
        },
        {
            name: 'isValidating',
            type: 'Ref<boolean>',
            descriptionKey: 'components.form.exposed.is_validating',
            descriptionFallback: 'True while async validators are running.'
        },
        {
            name: 'items',
            type: 'Ref<IFormField[]>',
            descriptionKey: 'components.form.exposed.items',
            descriptionFallback: 'All registered child field descriptors (id, validate, reset, resetValidation, isValid, errorMessages).'
        },
        {
            name: 'errors',
            type: 'ComputedRef<IFieldValidationResult[]>',
            descriptionKey: 'components.form.exposed.errors',
            descriptionFallback: 'Flat list of { id, errorMessages } for all fields currently in error.'
        },
        {
            name: 'scrollToFirstError',
            type: '(options?: boolean | ScrollIntoViewOptions) => Promise<void>',
            descriptionKey: 'components.form.exposed.scroll_to_first_error',
            descriptionFallback: 'Scrolls to the first .origam-input--error element in the form DOM.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: [],
        keyboard: [
            {
                key: 'Enter (on submit button)',
                actionKey: 'components.form.a11y.key_submit',
                actionFallback: 'Submits the form when focus is on a [type=submit] button inside the form.'
            },
            {
                key: 'Escape',
                actionKey: 'components.form.a11y.key_escape',
                actionFallback: 'No built-in behaviour — consumers may bind Escape to call reset() or navigate away.'
            }
        ],
        notes: [
            {
                noteKey: 'components.form.a11y.novalidate',
                noteFallback: 'The form element uses novalidate to suppress browser-native validation bubbles. All validation is handled by Origam components and displayed in field detail zones.'
            },
            {
                noteKey: 'components.form.a11y.live_region',
                noteFallback: 'Form-level messages appear in the __details section via OrigamMessages which carries aria-live="polite" internally. Screen readers announce errors after submit.'
            },
            {
                noteKey: 'components.form.a11y.scroll_to_error',
                noteFallback: 'scrollToError (prop) and scrollToFirstError (exposed method) move focus to the first errored field after validation. This is an important accessibility improvement for long forms — screen readers naturally encounter the error context without manual navigation.'
            },
            {
                noteKey: 'components.form.a11y.disabled',
                noteFallback: 'Setting disabled=true injects IFormProvide.isDisabled = true into all descendant fields via provide/inject. No need to set disabled individually on each field.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/form.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Outputs: CSS custom properties, SCSS variables, TypeScript types.',
        excerpt: [
            {
                tokenPath: 'form.actions.margin-top',
                value: '{space.4}',
                type: 'dimension',
                descriptionKey: 'components.form.tokens.actions_margin_top',
                descriptionFallback: 'Top margin of the actions zone (16px).'
            },
            {
                tokenPath: 'form.actions.gap',
                value: '{space.2}',
                type: 'dimension',
                descriptionKey: 'components.form.tokens.actions_gap',
                descriptionFallback: 'Gap between action buttons (8px).'
            },
            {
                tokenPath: 'form.details.font-size',
                value: '{font.size.sm}',
                type: 'dimension',
                descriptionKey: 'components.form.tokens.details_font_size',
                descriptionFallback: 'Message text font size (0.75rem).'
            },
            {
                tokenPath: 'form.details.min-height',
                value: '22px',
                type: 'dimension',
                descriptionKey: 'components.form.tokens.details_min_height',
                descriptionFallback: 'Minimum height of the message zone.'
            },
            {
                tokenPath: 'form.error.messages-color',
                value: '{color.feedback.danger.fgSubtle}',
                type: 'color',
                descriptionKey: 'components.form.tokens.error_messages_color',
                descriptionFallback: 'Error message colour.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.form.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            },
            {
                prop: 'readonly',
                kind: 'switch',
                labelKey: 'components.form.playground.readonly',
                labelFallback: 'Readonly',
                defaultValue: false
            },
            {
                prop: 'fastFail',
                kind: 'switch',
                labelKey: 'components.form.playground.fast_fail',
                labelFallback: 'Fast fail',
                defaultValue: false
            },
            {
                prop: 'validateOn',
                kind: 'select',
                labelKey: 'components.form.playground.validate_on',
                labelFallback: 'Validate on',
                defaultValue: '',
                options: [
                    { label: '(default)', value: '' },
                    { label: 'blur', value: 'blur' },
                    { label: 'input', value: 'input' },
                    { label: 'submit', value: 'submit' }
                ]
            }
        ]
    } satisfies IComponentPlayground
}
