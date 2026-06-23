/**
 * /components/date-picker-field — full documentation data for OrigamDatePickerField.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DatePickerField/date-picker-field.interface.ts  (props)
 *   - packages/ds/src/components/DatePickerField/OrigamDatePickerField.vue        (template BEM, slots, defineExpose)
 *   - packages/ds/tokens/component/date-picker-field.json                        (CSS tokens)
 *
 * Note: IDatePickerFieldProps extends ITextFieldProps — all TextField props are inherited.
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

export const DATE_PICKER_FIELD_DOC: IComponentDoc = {
    slug: 'date-picker-field',
    name: 'DatePickerField',
    tag: 'origam-date-picker-field',
    icon: 'mdi-calendar-edit',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.date_picker_field.description',
    descriptionFallback: 'Text field with a built-in calendar dropdown. Combines OrigamTextField and OrigamDatePicker into a single form control with chip display for multiple/range selections.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-datepickerfield--design',
    docUrl: 'http://localhost:4000/components/DatePickerField/OrigamDatePickerField',

    family: [],

    related: [
        {
            slug: 'date-picker',
            name: 'DatePicker',
            kind: 'component',
            descriptionKey: 'components.catalog.date_picker.description',
            descriptionFallback: 'The standalone calendar panel embedded inside DatePickerField.'
        },
        {
            slug: 'text-field',
            name: 'TextField',
            kind: 'component',
            descriptionKey: 'components.catalog.text_field.description',
            descriptionFallback: 'The input chrome that DatePickerField extends.'
        },
        {
            slug: 'menu',
            name: 'Menu',
            kind: 'component',
            descriptionKey: 'components.catalog.menu.description',
            descriptionFallback: 'Floating panel used to position the DatePicker dropdown below the field.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'menu',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_field.props.menu.description',
            descriptionFallback: 'Controls whether the calendar dropdown is open (v-model:menu).'
        },
        {
            name: 'menuProps',
            type: { label: 'IMenuProps', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.menu_props.description',
            descriptionFallback: 'Props forwarded to the underlying OrigamMenu used to float the DatePicker.'
        },
        {
            name: 'range',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_field.props.range.description',
            descriptionFallback: 'Enables date-range mode. The field accepts two dates (start/end) and displays them as chips.'
        },
        {
            name: 'multiple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_field.props.multiple.description',
            descriptionFallback: 'Enables multi-date selection. Each selected date is displayed as a chip inside the field.'
        },
        {
            name: 'openOnClear',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_field.props.open_on_clear.description',
            descriptionFallback: 'Reopens the calendar dropdown when the clear button is clicked.'
        },
        {
            name: 'closeText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.close_text.description',
            descriptionFallback: 'Accessible label for the close/calendar toggle icon button.'
        },
        {
            name: 'openText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.open_text.description',
            descriptionFallback: 'Accessible label for the open/calendar toggle icon button.'
        },
        {
            name: 'closeOnSelect',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.date_picker_field.props.close_on_select.description',
            descriptionFallback: 'Closes the calendar dropdown automatically after a date is selected. Disabled for range and multiple modes.'
        },
        {
            name: 'chipProps',
            type: { label: 'IChipProps', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.chip_props.description',
            descriptionFallback: 'Props forwarded to each OrigamChip that represents a selected date in multiple/range mode.'
        },
        {
            name: 'closableChips',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_field.props.closable_chips.description',
            descriptionFallback: 'Adds a close icon on each chip to allow removing individual dates in multiple/range mode.'
        },
        // ── ITextFieldProps (inherited) ────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'string | Date | Array<string | Date>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.model_value.description',
            descriptionFallback: 'Selected date(s). Single value for single mode; array for multiple or range mode.'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.label.description',
            descriptionFallback: 'Field label text.'
        },
        {
            name: 'placeholder',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.placeholder.description',
            descriptionFallback: 'Placeholder text shown when no date is selected.'
        },
        {
            name: 'variant',
            type: { label: 'TVariant', slug: 'variant', kind: 'type' },
            defaultValue: "'outlined'",
            descriptionKey: 'components.date_picker_field.props.variant.description',
            descriptionFallback: 'TextField visual style variant (outlined, filled, underlined, solo…).'
        },
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.color.description',
            descriptionFallback: 'Active/focused colour and calendar selection colour.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.date_picker_field.props.density.description',
            descriptionFallback: 'Field vertical density.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_field.props.disabled.description',
            descriptionFallback: 'Disables the field and prevents the calendar from opening.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_field.props.readonly.description',
            descriptionFallback: 'Makes the field non-interactive without visually disabling it.'
        },
        {
            name: 'clearable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_field.props.clearable.description',
            descriptionFallback: 'Shows a clear icon button to reset the selected date(s).'
        },
        {
            name: 'error',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_field.props.error.description',
            descriptionFallback: 'Forces the error visual state on the field.'
        },
        {
            name: 'hint',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.hint.description',
            descriptionFallback: 'Helper text shown below the field.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.prepend_icon.description',
            descriptionFallback: 'Icon prepended before the field.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.append_icon.description',
            descriptionFallback: 'Icon appended after the field.'
        },
        {
            name: 'prependInnerIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_field.props.prepend_inner_icon.description',
            descriptionFallback: 'Icon inside the field, before the value.'
        },
        {
            name: 'appendInnerIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-calendar'",
            descriptionKey: 'components.date_picker_field.props.append_inner_icon.description',
            descriptionFallback: 'Icon inside the field, after the value. Defaults to mdi-calendar (calendar toggle).'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'string | Date | Array<string | Date>', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_field.emits.update_model_value.description',
            descriptionFallback: 'Fired when the selected date(s) change.'
        },
        {
            event: 'update:menu',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_field.emits.update_menu.description',
            descriptionFallback: 'Fired when the calendar dropdown opens or closes.'
        },
        {
            event: 'focus',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_field.emits.focus.description',
            descriptionFallback: 'Fired when the field receives focus.'
        },
        {
            event: 'blur',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_field.emits.blur.description',
            descriptionFallback: 'Fired when the field loses focus.'
        },
        {
            event: 'click:clear',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_field.emits.click_clear.description',
            descriptionFallback: 'Fired when the clear button is clicked.'
        }
    ],

    slots: [
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.date_picker_field.slots.prepend.description',
            descriptionFallback: 'Content before the field (outside the border).'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.date_picker_field.slots.loader.description',
            descriptionFallback: 'Custom loader shown while loading=true.'
        },
        {
            slot: 'prependInner',
            slotProps: '—',
            descriptionKey: 'components.date_picker_field.slots.prepend_inner.description',
            descriptionFallback: 'Content inside the field before the value.'
        },
        {
            slot: 'floatingLabel',
            slotProps: '—',
            descriptionKey: 'components.date_picker_field.slots.floating_label.description',
            descriptionFallback: 'Custom floating label.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.date_picker_field.slots.label.description',
            descriptionFallback: 'Custom label.'
        },
        {
            slot: 'prefix',
            slotProps: '—',
            descriptionKey: 'components.date_picker_field.slots.prefix.description',
            descriptionFallback: 'Text prefix displayed inside the field before the value.'
        },
        {
            slot: 'selection',
            slotProps: '{ date: string | Date, index: number }',
            descriptionKey: 'components.date_picker_field.slots.selection.description',
            descriptionFallback: 'Custom renderer for each selected date. Replaces the default chip/text display.'
        },
        {
            slot: 'rangeSelection',
            slotProps: '{ dates: Array<string | Date> }',
            descriptionKey: 'components.date_picker_field.slots.range_selection.description',
            descriptionFallback: 'Custom renderer for the range selection display. Receives the start and end date.'
        },
        {
            slot: 'suffix',
            slotProps: '—',
            descriptionKey: 'components.date_picker_field.slots.suffix.description',
            descriptionFallback: 'Text suffix displayed inside the field after the value.'
        },
        {
            slot: 'appendInner',
            slotProps: '—',
            descriptionKey: 'components.date_picker_field.slots.append_inner.description',
            descriptionFallback: 'Content inside the field after the value (defaults to calendar toggle icon).'
        },
        {
            slot: 'clear',
            slotProps: '—',
            descriptionKey: 'components.date_picker_field.slots.clear.description',
            descriptionFallback: 'Custom clear button replacing the default × icon.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.date_picker_field.slots.append.description',
            descriptionFallback: 'Content after the field (outside the border).'
        }
    ],

    examples: [
        {
            titleKey: 'components.date_picker_field.examples.basic.title',
            titleFallback: 'Basic date field',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-field
    v-model="date"
    label="Date de naissance"
    variant="outlined"
    color="primary"
    clearable
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const date = ref<string | undefined>(undefined)
</script>`
        },
        {
            titleKey: 'components.date_picker_field.examples.range.title',
            titleFallback: 'Date range field',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-field
    v-model="dates"
    label="Période"
    range
    closable-chips
    variant="outlined"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const dates = ref<string[]>([])
</script>`
        },
        {
            titleKey: 'components.date_picker_field.examples.multiple.title',
            titleFallback: 'Multiple dates',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-field
    v-model="dates"
    label="Jours de fermeture"
    multiple
    closable-chips
    :chip-props="{ color: 'primary', variant: 'tonal' }"
    variant="outlined"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const dates = ref<string[]>([])
</script>`
        }
    ],

    previewVariants: [
        { label: 'single', props: { label: 'Date', variant: 'outlined', color: 'primary' } },
        { label: 'range', props: { label: 'Date range', variant: 'outlined', color: 'primary', range: true } },
        { label: 'multiple', props: { label: 'Multiple dates', variant: 'outlined', color: 'primary', multiple: true, closableChips: true } },
        { label: 'clearable', props: { label: 'Date', variant: 'outlined', color: 'primary', clearable: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-date-picker-field',
        svgViewBox: '0 0 700 240',
        svgTitle: 'Anatomy of OrigamDatePickerField',
        svgDesc: 'Schematic of the DatePickerField component with numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="240" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <rect x="60" y="30" width="580" height="54" rx="8" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(0,0,0,0.3))" stroke-width="1.5"/>
  <circle cx="76" cy="38" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="76" y="42.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <text x="78" y="54" font-size="9" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-weight="700" font-family="'JetBrains Mono',monospace">origam-date-picker-field</text>
  <text x="80" y="66" font-size="12" fill="var(--origam-color__text---disabled, #aaa)" font-family="system-ui">DD / MM / YYYY</text>
  <circle cx="620" cy="57" r="14" fill="var(--origam-color__surface---raised, #fff)" stroke="none"/>
  <text x="620" y="61" font-size="16" fill="var(--origam-color__text---secondary, #888)" text-anchor="middle">📅</text>
  <circle cx="636" cy="42" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="636" y="46.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <rect x="60" y="100" width="580" height="130" rx="10" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.1))" stroke-width="1.5"/>
  <circle cx="76" cy="108" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="76" y="112.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="350" y="145" font-size="11" fill="var(--origam-color__text---secondary, #888)" text-anchor="middle" font-family="system-ui">OrigamDatePicker</text>
  <text x="350" y="168" font-size="10" fill="var(--origam-color__text---disabled, #bbb)" text-anchor="middle" font-family="system-ui">(calendar grid)</text>
  <text x="350" y="220" font-size="9" fill="var(--origam-color__text---disabled, #b0b0b0)" text-anchor="middle" font-style="italic">① = text-field chrome. ② = appendInner calendar icon. ③ = DatePicker dropdown (OrigamMenu).</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-date-picker-field&gt;</code>. The component combines an <code>OrigamTextField</code> chrome ① with a calendar toggle icon ② that opens an <code>OrigamMenu</code> containing <code>OrigamDatePicker</code> ③.`,
        legend: [
            {
                num: 1,
                cls: '.origam-date-picker-field (TextField root)',
                descriptionKey: 'components.date_picker_field.anatomy.field',
                descriptionFallback: 'TextField chrome — label, border, density, variant. The selected date(s) appear as formatted text or chips inside the control area. Extends all ITextFieldProps.'
            },
            {
                num: 2,
                cls: 'appendInner — calendar toggle icon',
                descriptionKey: 'components.date_picker_field.anatomy.toggle_icon',
                descriptionFallback: 'Calendar icon rendered in the appendInner slot by default (mdi-calendar). Clicking it toggles the menu open/closed. aria-label comes from openText/closeText props.'
            },
            {
                num: 3,
                cls: 'OrigamMenu + OrigamDatePicker',
                descriptionKey: 'components.date_picker_field.anatomy.menu',
                descriptionFallback: 'Floating menu (OrigamMenu) containing the full OrigamDatePicker. Positioned below the field with an offset from --origam-date-picker-field---menu-offset. Content class: origam-date-picker-field__content.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- DatePickerField = TextField chrome + Menu + DatePicker -->
<origam-text-field class="origam-date-picker-field" :aria-label="label">

  <!-- #prepend, #prependInner, #label, #prefix slots passthrough -->

  <!-- selected dates as text or chips -->
  <span class="origam-date-picker-field__selection-text">
    {{ formattedDates }}
  </span>
  <!-- OR chips in multiple/range mode -->
  <origam-chip
    v-for="date in selectedDates"
    :closable="closableChips"
    v-bind="chipProps"
  />

  <!-- #suffix, #clear slots passthrough -->

  <!-- calendar toggle icon -->
  <template #appendInner>
    <origam-icon icon="mdi-calendar" />
  </template>

  <!-- #append slot passthrough -->

  <!-- floating DatePicker -->
  <origam-menu
    v-model="menu"
    content-class="origam-date-picker-field__content"
  >
    <origam-date-picker v-model="model" />
  </origam-menu>
</origam-text-field>`,
        classes: [
            { cls: 'origam-date-picker-field', descriptionKey: 'components.date_picker_field.anatomy.root', descriptionFallback: 'Root — extends TextField BEM classes.' },
            { cls: 'origam-date-picker-field__selection-text', descriptionKey: 'components.date_picker_field.anatomy.selection_text', descriptionFallback: 'Formatted date text displayed in the field when mode is single.' },
            { cls: 'origam-date-picker-field__selection-chips', descriptionKey: 'components.date_picker_field.anatomy.selection_chips', descriptionFallback: 'Chip container in multiple/range mode.' },
            { cls: 'origam-date-picker-field__content', descriptionKey: 'components.date_picker_field.anatomy.content', descriptionFallback: 'Menu content class applied to the OrigamMenu teleport target.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-date-picker-field---min-width',
            defaultValue: '200px',
            descriptionKey: 'components.date_picker_field.css_vars.min_width',
            descriptionFallback: 'Minimum field width.'
        },
        {
            name: '--origam-date-picker-field---max-width',
            defaultValue: '320px',
            descriptionKey: 'components.date_picker_field.css_vars.max_width',
            descriptionFallback: 'Maximum field width.'
        },
        {
            name: '--origam-date-picker-field---menu-offset',
            defaultValue: '{space.1}',
            descriptionKey: 'components.date_picker_field.css_vars.menu_offset',
            descriptionFallback: 'Vertical gap between the field bottom and the calendar dropdown.'
        },
        {
            name: '--origam-date-picker-field__icon---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.date_picker_field.css_vars.icon_color',
            descriptionFallback: 'Default colour of the calendar toggle icon.'
        },
        {
            name: '--origam-date-picker-field__icon---color-hover',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.date_picker_field.css_vars.icon_color_hover',
            descriptionFallback: 'Icon colour on hover.'
        },
        {
            name: '--origam-date-picker-field__icon---color-error',
            defaultValue: '{color.feedback.danger.fgSubtle}',
            descriptionKey: 'components.date_picker_field.css_vars.icon_color_error',
            descriptionFallback: 'Icon colour in error state.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.date_picker_field.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        },
        {
            name: 'isFocused',
            type: 'Ref<boolean>',
            descriptionKey: 'components.date_picker_field.exposed.is_focused',
            descriptionFallback: 'Whether the field is currently focused.'
        },
        {
            name: 'menu',
            type: 'Ref<boolean>',
            descriptionKey: 'components.date_picker_field.exposed.menu',
            descriptionFallback: 'Whether the calendar dropdown is currently open.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.date_picker_field.exposed.css',
            descriptionFallback: 'Reactive CSS string for the injected style sheet.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.date_picker_field.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.date_picker_field.exposed.load',
            descriptionFallback: 'Injects the style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.date_picker_field.exposed.unload',
            descriptionFallback: 'Removes the style sheet from the document.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.date_picker_field.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['combobox', 'dialog'],
        keyboard: [
            {
                key: 'Enter / Space (on field)',
                actionKey: 'components.date_picker_field.a11y.key_open',
                actionFallback: 'Opens the calendar dropdown.'
            },
            {
                key: 'Escape',
                actionKey: 'components.date_picker_field.a11y.key_close',
                actionFallback: 'Closes the calendar dropdown and returns focus to the field.'
            },
            {
                key: 'Tab',
                actionKey: 'components.date_picker_field.a11y.key_tab',
                actionFallback: 'Moves focus between the field, calendar navigation and days.'
            }
        ],
        notes: [
            {
                noteKey: 'components.date_picker_field.a11y.aria_haspopup_note',
                noteFallback: 'The field sets aria-haspopup="datepickerbox" on the inner input to signal that activating it opens a date picker. The calendar dropdown uses role="dialog" with aria-modal="true" when open.'
            },
            {
                noteKey: 'components.date_picker_field.a11y.label_note',
                noteFallback: 'The field must have a label (via the label prop or an external aria-label). Without a label, the calendar toggle icon is not accessible.'
            },
            {
                noteKey: 'components.date_picker_field.a11y.chip_note',
                noteFallback: 'In multiple/range mode, each chip has aria-label with the formatted date. Closable chips have an aria-label on the close button ("Remove date X").'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/date-picker-field.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms. Inherits TextField tokens for the field chrome and DatePicker tokens for the popup.',
        excerpt: [
            {
                tokenPath: 'date-picker-field.min-width',
                value: '200px',
                type: 'dimension',
                descriptionKey: 'components.date_picker_field.tokens.min_width',
                descriptionFallback: 'Minimum field width.'
            },
            {
                tokenPath: 'date-picker-field.max-width',
                value: '320px',
                type: 'dimension',
                descriptionKey: 'components.date_picker_field.tokens.max_width',
                descriptionFallback: 'Maximum field width.'
            },
            {
                tokenPath: 'date-picker-field.menu-offset',
                value: '{space.1}',
                type: 'dimension',
                descriptionKey: 'components.date_picker_field.tokens.menu_offset',
                descriptionFallback: 'Gap between field and calendar dropdown.'
            },
            {
                tokenPath: 'date-picker-field.icon.color',
                value: '{color.text.secondary}',
                type: 'color',
                descriptionKey: 'components.date_picker_field.tokens.icon_color',
                descriptionFallback: 'Default calendar icon colour.'
            },
            {
                tokenPath: 'date-picker-field.icon.color-error',
                value: '{color.feedback.danger.fgSubtle}',
                type: 'color',
                descriptionKey: 'components.date_picker_field.tokens.icon_color_error',
                descriptionFallback: 'Calendar icon colour in error state.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'variant',
                kind: 'select',
                labelKey: 'components.date_picker_field.playground.variant',
                labelFallback: 'Variant',
                defaultValue: 'outlined',
                options: [
                    { label: 'outlined', value: 'outlined' },
                    { label: 'filled', value: 'filled' },
                    { label: 'underlined', value: 'underlined' },
                    { label: 'solo', value: 'solo' },
                    { label: 'solo-filled', value: 'solo-filled' }
                ]
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.date_picker_field.playground.color',
                labelFallback: 'Color',
                defaultValue: 'primary',
                options: [
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' },
                    { label: 'danger', value: 'danger' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.date_picker_field.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'default', value: 'default' },
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'compact', value: 'compact' }
                ]
            },
            {
                prop: 'range',
                kind: 'switch',
                labelKey: 'components.date_picker_field.playground.range',
                labelFallback: 'Range mode',
                defaultValue: false
            },
            {
                prop: 'multiple',
                kind: 'switch',
                labelKey: 'components.date_picker_field.playground.multiple',
                labelFallback: 'Multiple',
                defaultValue: false
            },
            {
                prop: 'clearable',
                kind: 'switch',
                labelKey: 'components.date_picker_field.playground.clearable',
                labelFallback: 'Clearable',
                defaultValue: false
            },
            {
                prop: 'closableChips',
                kind: 'switch',
                labelKey: 'components.date_picker_field.playground.closable_chips',
                labelFallback: 'Closable chips',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.date_picker_field.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
