/**
 * /components/color-picker-field — full documentation data for OrigamColorPickerField.
 *
 * SOURCE OF TRUTH: packages/ds/src/interfaces/ColorPickerField/color-picker-field.interface.ts
 * cross-checked against packages/ds/src/components/ColorPickerField/OrigamColorPickerField.vue.
 * The .md doc was used only for descriptions and example copy.
 */
import type { IComponentDoc } from '~/interfaces/components-catalog.interface'

export const COLOR_PICKER_FIELD_DOC: IComponentDoc = {
    slug: 'color-picker-field',
    name: 'ColorPickerField',
    tag: 'origam-color-picker-field',
    icon: 'mdi-eyedropper-variant',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.color_picker_field.description',
    descriptionFallback: 'Text field input that opens a ColorPicker in a dropdown menu. The selected colour is displayed as a swatch inside the field prefix.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-colorpickerfield--design',
    docUrl: 'http://localhost:4000/components/ColorPickerField/OrigamColorPickerField',

    family: [],

    related: [
        {
            slug: 'color-picker',
            name: 'ColorPicker',
            kind: 'component',
            descriptionKey: 'components.catalog.color_picker.description',
            descriptionFallback: 'Standalone colour picker panel embedded inside the field popover.'
        },
        {
            slug: 'field',
            name: 'Field',
            kind: 'component',
            descriptionKey: 'components.catalog.field.description',
            descriptionFallback: 'Base form field shell that ColorPickerField extends.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'menu',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_field.props.menu.description',
            descriptionFallback: 'Controls whether the colour picker popover is open.'
        },
        {
            name: 'menuProps',
            type: { label: 'IMenuProps', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_field.props.menu_props.description',
            descriptionFallback: 'Props forwarded to the inner OrigamMenu component.'
        },
        {
            name: 'openOnClear',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_field.props.open_on_clear.description',
            descriptionFallback: 'Re-opens the picker dropdown when the field value is cleared.'
        },
        {
            name: 'closeText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_field.props.close_text.description',
            descriptionFallback: 'Accessible label for the close action inside the picker popover.'
        },
        {
            name: 'openText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_field.props.open_text.description',
            descriptionFallback: 'Accessible label for the open action inside the picker popover.'
        },
        {
            name: 'closeOnSelect',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_field.props.close_on_select.description',
            descriptionFallback: 'Closes the picker popover automatically when a colour is selected.'
        },
        // ── ITextFieldProps (inherited) ────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_field.props.model_value.description',
            descriptionFallback: 'Current colour value (v-model). CSS colour string, e.g. "#ff0080" or "hsl(320, 100%, 50%)".'
        },
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_field.props.label.description',
            descriptionFallback: 'Floating label displayed above the field.'
        },
        {
            name: 'placeholder',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_field.props.placeholder.description',
            descriptionFallback: 'Placeholder text shown when the field is empty.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker_field.props.disabled.description',
            descriptionFallback: 'Disables the field and prevents opening the picker.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker_field.props.readonly.description',
            descriptionFallback: 'Makes the field non-interactive without visually disabling it.'
        },
        {
            name: 'clearable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker_field.props.clearable.description',
            descriptionFallback: 'Displays a clear icon to reset the selected colour.'
        },
        // ── IVariantProps ──────────────────────────────────────────────
        {
            name: 'variant',
            type: { label: "'outlined' | 'filled' | 'plain' | 'underlined' | 'solo' | 'solo-filled' | 'solo-inverted'", slug: '', kind: 'primitive' },
            defaultValue: "'outlined'",
            descriptionKey: 'components.color_picker_field.props.variant.description',
            descriptionFallback: 'Visual style variant for the field wrapper.'
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TIntent | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_field.props.color.description',
            descriptionFallback: 'Intent or custom colour applied to the active/focused field state.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: "'default' | 'compact' | 'comfortable'", slug: '', kind: 'primitive' },
            defaultValue: "'default'",
            descriptionKey: 'components.color_picker_field.props.density.description',
            descriptionFallback: 'Adjusts the vertical padding density of the field.'
        },
        // ── IRoundedProps ──────────────────────────────────────────────
        {
            name: 'rounded',
            type: { label: "'0' | 'sm' | 'md' | 'lg' | 'xl' | 'pill' | 'circle' | boolean", slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.color_picker_field.props.rounded.description',
            descriptionFallback: 'Border-radius token for the field wrapper.'
        },
        // ── IBorderProps ───────────────────────────────────────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.color_picker_field.props.border.description',
            descriptionFallback: 'Applies an explicit border to the field.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.color_picker_field.emits.update_model_value.description',
            descriptionFallback: 'Fired when the selected colour changes. Payload is the new colour string.'
        },
        {
            event: 'update:menu',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.color_picker_field.emits.update_menu.description',
            descriptionFallback: 'Fired when the picker popover opens or closes.'
        },
        {
            event: 'click:clear',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.color_picker_field.emits.click_clear.description',
            descriptionFallback: 'Fired when the user clicks the clear icon.'
        }
    ],

    slots: [
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.color_picker_field.slots.prepend.description',
            descriptionFallback: 'Content placed before the field (outside the field wrapper).'
        },
        {
            slot: 'prependInner',
            slotProps: '—',
            descriptionKey: 'components.color_picker_field.slots.prepend_inner.description',
            descriptionFallback: 'Content placed inside the field before the input (swatch area).'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.color_picker_field.slots.append.description',
            descriptionFallback: 'Content placed after the field (outside the field wrapper).'
        },
        {
            slot: 'appendInner',
            slotProps: '—',
            descriptionKey: 'components.color_picker_field.slots.append_inner.description',
            descriptionFallback: 'Content placed inside the field after the input.'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.color_picker_field.slots.label.description',
            descriptionFallback: 'Custom label content. Overrides the label prop.'
        },
        {
            slot: 'loader',
            slotProps: '—',
            descriptionKey: 'components.color_picker_field.slots.loader.description',
            descriptionFallback: 'Custom loader shown inside the field when loading is true.'
        }
    ],

    examples: [
        {
            titleKey: 'components.color_picker_field.examples.basic.title',
            titleFallback: 'Basic usage',
            lang: 'vue',
            code: `<template>
  <origam-color-picker-field
    v-model="colour"
    label="Brand colour"
    variant="outlined"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const colour = ref('#6200ea')
</script>`
        },
        {
            titleKey: 'components.color_picker_field.examples.close_on_select.title',
            titleFallback: 'Close on select',
            lang: 'vue',
            code: `<template>
  <origam-color-picker-field
    v-model="colour"
    label="Pick a colour"
    close-on-select
    clearable
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const colour = ref('#03dac6')
</script>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { label: 'Brand colour', modelValue: '#7c3aed' }, slotContent: '' },
        { label: 'outlined', props: { label: 'Outlined', modelValue: '#7c3aed', variant: 'outlined' }, slotContent: '' },
        { label: 'disabled', props: { label: 'Disabled', modelValue: '#7c3aed', disabled: true }, slotContent: '' }
    ],

    anatomy: {
        rootClass: 'origam-color-picker-field',
        svgViewBox: '0 0 700 180',
        svgTitle: 'Anatomy of OrigamColorPickerField',
        svgDesc: 'Schematic of the ColorPickerField with 4 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="180" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="100" y="40" width="500" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.35))" stroke-width="1.5"/>
  <text x="132" y="60" font-size="10" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="sans-serif">Brand colour</text>
  <rect x="116" y="68" width="24" height="24" rx="4" fill="#7c3aed" stroke="rgba(124,58,237,0.3)" stroke-width="1"/>
  <rect x="152" y="68" width="380" height="24" rx="3" fill="transparent"/>
  <text x="154" y="84" font-size="12" fill="var(--origam-color__text---primary, #1a0f3c)" font-family="'JetBrains Mono',monospace">#7c3aed</text>
  <text x="556" y="84" font-size="16" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="sans-serif">⌄</text>
  <circle cx="108" cy="48" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="108" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="116" cy="68" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="116" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="350" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="350" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="556" cy="68" r="9" fill="var(--origam-color__text---tertiary, #7e5fb0)"/>
  <text x="556" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <text x="350" y="165" font-size="9" fill="var(--origam-color__text---disabled, #b5a0d8)" text-anchor="middle" font-style="italic">Clicking the field or swatch opens an OrigamColorPicker in an OrigamMenu popover</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-color-picker-field&gt;</code> — 4 visual parts.`,
        legend: [
            { num: 1, cls: '.origam-color-picker-field', descriptionKey: 'components.color_picker_field.anatomy.root', descriptionFallback: 'Root element — extends OrigamTextField with a colour swatch prefix.' },
            { num: 2, cls: '.origam-color-picker-field__swatch', descriptionKey: 'components.color_picker_field.anatomy.swatch', descriptionFallback: 'Small coloured square inside the input prefix. Shows the current selected colour. Clicking opens the picker.' },
            { num: 3, cls: '.origam-text-field__input', descriptionKey: 'components.color_picker_field.anatomy.input', descriptionFallback: 'Editable text input showing the colour value (hex string). Clearing triggers openOnClear if enabled.' },
            { num: 4, cls: '.origam-color-picker-field__chevron', descriptionKey: 'components.color_picker_field.anatomy.chevron', descriptionFallback: 'Append icon indicating the dropdown can be opened.' }
        ],
        code: `<origam-text-field class="origam-color-picker-field">
  <template #prependInner>
    <!-- colour swatch -->
    <span class="origam-color-picker-field__swatch"
      :style="{ backgroundColor: modelValue }"
    />
  </template>

  <!-- native input for the hex value -->
  <input class="origam-text-field__input" :value="modelValue" />

  <!-- dropdown chevron -->
  <template #appendInner>
    <origam-icon class="origam-color-picker-field__chevron" />
  </template>
</origam-text-field>

<!-- colour picker in a popover -->
<origam-menu v-model="menu">
  <origam-color-picker v-model="modelValue" @update:modelValue="handleChange" />
</origam-menu>`,
        classes: [
            { cls: 'origam-color-picker-field', descriptionKey: 'components.color_picker_field.anatomy.root', descriptionFallback: 'Root field element.' },
            { cls: 'origam-color-picker-field__swatch', descriptionKey: 'components.color_picker_field.anatomy.swatch', descriptionFallback: 'Colour preview swatch inside the input prefix.' },
            { cls: 'origam-color-picker-field__chevron', descriptionKey: 'components.color_picker_field.anatomy.chevron', descriptionFallback: 'Dropdown chevron icon.' }
        ]
    },

    cssVars: [
        {
            name: '--origam-color-picker-field---min-width',
            defaultValue: '200px',
            descriptionKey: 'components.color_picker_field.css_vars.min_width',
            descriptionFallback: 'Minimum width of the field.'
        },
        {
            name: '--origam-color-picker-field__swatch---width',
            defaultValue: '24px',
            descriptionKey: 'components.color_picker_field.css_vars.swatch_width',
            descriptionFallback: 'Width of the colour swatch inside the input.'
        },
        {
            name: '--origam-color-picker-field__swatch---height',
            defaultValue: '24px',
            descriptionKey: 'components.color_picker_field.css_vars.swatch_height',
            descriptionFallback: 'Height of the colour swatch.'
        },
        {
            name: '--origam-color-picker-field__swatch---border-radius',
            defaultValue: '{radius.sm}',
            descriptionKey: 'components.color_picker_field.css_vars.swatch_border_radius',
            descriptionFallback: 'Border radius of the colour swatch.'
        },
        {
            name: '--origam-color-picker-field__icon---color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.color_picker_field.css_vars.icon_color',
            descriptionFallback: 'Colour of the dropdown chevron icon.'
        },
        {
            name: '--origam-color-picker-field__icon---color-hover',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.color_picker_field.css_vars.icon_color_hover',
            descriptionFallback: 'Colour of the chevron icon on hover.'
        }
    ],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.color_picker_field.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to OrigamTextField.'
        },
        {
            name: 'isFocused',
            type: 'Ref<boolean>',
            descriptionKey: 'components.color_picker_field.exposed.is_focused',
            descriptionFallback: 'True while the field is focused.'
        },
        {
            name: 'menu',
            type: 'Ref<boolean>',
            descriptionKey: 'components.color_picker_field.exposed.menu',
            descriptionFallback: 'Controls the picker popover open state programmatically.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.color_picker_field.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.color_picker_field.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.color_picker_field.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.color_picker_field.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.color_picker_field.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ],

    a11y: {
        roles: ['combobox'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.color_picker_field.a11y.key_open',
                actionFallback: 'Opens the colour picker popover.'
            },
            {
                key: 'Escape',
                actionKey: 'components.color_picker_field.a11y.key_close',
                actionFallback: 'Closes the colour picker popover without applying changes.'
            },
            {
                key: 'Tab',
                actionKey: 'components.color_picker_field.a11y.key_tab',
                actionFallback: 'Moves focus into or out of the picker panel when open.'
            }
        ],
        notes: [
            {
                noteKey: 'components.color_picker_field.a11y.combobox',
                noteFallback: 'The field behaves as a combobox: aria-haspopup="dialog" and aria-expanded reflect the popover open state.'
            },
            {
                noteKey: 'components.color_picker_field.a11y.swatch',
                noteFallback: 'The colour swatch is decorative (aria-hidden="true"). The accessible value is provided by the text input which holds the hex string.'
            }
        ]
    },

    tokens: {
        sourceFile: 'packages/ds/tokens/component/color-picker-field.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'color-picker-field.min-width', value: '200px', type: 'dimension', descriptionKey: 'components.color_picker_field.tokens.min_width', descriptionFallback: 'Minimum field width.' },
            { tokenPath: 'color-picker-field.swatch.width', value: '24px', type: 'dimension', descriptionKey: 'components.color_picker_field.tokens.swatch_width', descriptionFallback: 'Swatch width.' },
            { tokenPath: 'color-picker-field.swatch.height', value: '24px', type: 'dimension', descriptionKey: 'components.color_picker_field.tokens.swatch_height', descriptionFallback: 'Swatch height.' },
            { tokenPath: 'color-picker-field.swatch.border-radius', value: '{radius.sm}', type: 'dimension', descriptionKey: 'components.color_picker_field.tokens.swatch_border_radius', descriptionFallback: 'Swatch corner radius.' },
            { tokenPath: 'color-picker-field.icon.color', value: '{color.text.secondary}', type: 'color', descriptionKey: 'components.color_picker_field.tokens.icon_color', descriptionFallback: 'Chevron icon colour.' }
        ]
    },

    playground: {
        controls: [
            {
                prop: 'label',
                kind: 'text',
                labelKey: 'components.color_picker_field.playground.label',
                labelFallback: 'Label',
                defaultValue: 'Brand colour'
            },
            {
                prop: 'variant',
                kind: 'select',
                labelKey: 'components.color_picker_field.playground.variant',
                labelFallback: 'Variant',
                defaultValue: 'outlined',
                options: [
                    { label: 'outlined', value: 'outlined' },
                    { label: 'filled', value: 'filled' },
                    { label: 'underlined', value: 'underlined' },
                    { label: 'plain', value: 'plain' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.color_picker_field.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'default', value: 'default' },
                    { label: 'comfortable', value: 'comfortable' },
                    { label: 'compact', value: 'compact' }
                ]
            },
            {
                prop: 'clearable',
                kind: 'switch',
                labelKey: 'components.color_picker_field.playground.clearable',
                labelFallback: 'Clearable',
                defaultValue: false
            },
            {
                prop: 'closeOnSelect',
                kind: 'switch',
                labelKey: 'components.color_picker_field.playground.close_on_select',
                labelFallback: 'Close on select',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.color_picker_field.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    }
}
