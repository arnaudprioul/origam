/**
 * /components/select — full documentation data for OrigamSelect.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Select/select.interface.ts  (props)
 *   - packages/ds/src/components/Select/OrigamSelect.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/select.json               (CSS tokens)
 *
 * NOTE: Select is a data-driven component. All previewVariants MUST include
 * an `items` prop with valid demo data to avoid runtime crashes.
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

export const SELECT_DOC: IComponentDoc = {
    slug: 'select',
    name: 'Select',
    tag: 'origam-select',
    icon: 'mdi-form-select',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.select.description',
    descriptionFallback: 'Dropdown selection control with single/multiple mode, chip display, search/autocomplete, and full TextField chrome (label, prefix, suffix, clearable).',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-select--design',
    docUrl: 'http://localhost:4000/components/Select/OrigamSelect',

    family: [],

    related: [
        {
            slug: 'text-field',
            name: 'TextField',
            kind: 'component',
            descriptionKey: 'components.select.related.text_field',
            descriptionFallback: 'Select extends TextField to reuse its input chrome (label, validation, adjacent slots).'
        },
        {
            slug: 'menu',
            name: 'Menu',
            kind: 'component',
            descriptionKey: 'components.select.related.menu',
            descriptionFallback: 'Select uses OrigamMenu internally to render the dropdown list.'
        },
        {
            slug: 'chip',
            name: 'Chip',
            kind: 'component',
            descriptionKey: 'components.select.related.chip',
            descriptionFallback: 'When chips=true, selected items are displayed as OrigamChip elements.'
        }
    ],

    props: [
        // ── Own props ──────────────────────────────────────────────────
        {
            name: 'modelValue',
            type: { label: 'any', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.model_value.description',
            descriptionFallback: 'Current selected value(s). Bind with v-model. Array when multiple=true.'
        },
        {
            name: 'items',
            type: { label: 'Array<any>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.select.props.items.description',
            descriptionFallback: 'Array of items shown in the dropdown list. Can be strings, numbers, or objects with title/value keys.'
        },
        {
            name: 'multiple',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.multiple.description',
            descriptionFallback: 'Allows selecting multiple items. modelValue becomes an array.'
        },
        {
            name: 'chips',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.chips.description',
            descriptionFallback: 'Displays selected items as chips inside the input field.'
        },
        {
            name: 'closableChips',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.closable_chips.description',
            descriptionFallback: 'Renders a close button on each chip to remove that item from the selection.'
        },
        {
            name: 'autocomplete',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.autocomplete.description',
            descriptionFallback: 'Enables type-to-filter autocomplete mode. Matches items against the typed search string.'
        },
        {
            name: 'autoSelectFirst',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.auto_select_first.description',
            descriptionFallback: 'Automatically selects the first filtered result when the search query changes.'
        },
        {
            name: 'clearOnSelect',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.clear_on_select.description',
            descriptionFallback: 'Clears the search input after an item is selected. Useful in multiple mode.'
        },
        {
            name: 'search',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.search.description',
            descriptionFallback: 'Current search/filter string. Bindable with v-model:search.'
        },
        {
            name: 'hideNoData',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.hide_no_data.description',
            descriptionFallback: 'Hides the dropdown when no items match the current filter.'
        },
        {
            name: 'hideSelected',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.hide_selected.description',
            descriptionFallback: 'Hides already-selected items from the dropdown list.'
        },
        {
            name: 'menu',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.menu.description',
            descriptionFallback: 'Controls the open/closed state of the dropdown menu (v-model:menu).'
        },
        {
            name: 'menuIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.menu_icon.description',
            descriptionFallback: 'Icon for the menu toggle button. Defaults to a chevron-down icon.'
        },
        {
            name: 'menuProps',
            type: { label: 'IMenuProps', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.menu_props.description',
            descriptionFallback: 'Props forwarded directly to the inner OrigamMenu component.'
        },
        {
            name: 'chipProps',
            type: { label: 'IChipProps', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.chip_props.description',
            descriptionFallback: 'Props forwarded to each OrigamChip rendered for a selected value when chips=true.'
        },
        {
            name: 'listProps',
            type: { label: 'IListProps', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.list_props.description',
            descriptionFallback: 'Props forwarded to the OrigamList inside the dropdown menu.'
        },
        {
            name: 'noDataText',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.no_data_text.description',
            descriptionFallback: 'Text shown in the dropdown when no items match the search query.'
        },
        {
            name: 'openOnClear',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.open_on_clear.description',
            descriptionFallback: 'Re-opens the dropdown after the selection is cleared.'
        },
        {
            name: 'divider',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.divider.description',
            descriptionFallback: 'Character used as a separator between multiple selected values when displayed as text.'
        },
        // ── ITextFieldProps (key subset) ───────────────────────────────
        {
            name: 'label',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.label.description',
            descriptionFallback: 'Floating/static label shown inside the field.'
        },
        {
            name: 'placeholder',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.placeholder.description',
            descriptionFallback: 'Placeholder text shown when no value is selected.'
        },
        {
            name: 'clearable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.clearable.description',
            descriptionFallback: 'Shows a clear button to reset the selected value.'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.disabled.description',
            descriptionFallback: 'Disables the select field.'
        },
        {
            name: 'readonly',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.select.props.readonly.description',
            descriptionFallback: 'Makes the field read-only — displays the selection but prevents changes.'
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.color.description',
            descriptionFallback: 'Intent or custom color applied to the focused field chrome.'
        },
        // ── IDensityProps ──────────────────────────────────────────────
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: "'default'",
            descriptionKey: 'components.select.props.density.description',
            descriptionFallback: 'Adjusts the vertical padding density of the field.'
        },
        // ── IAdjacentProps ─────────────────────────────────────────────
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.prepend_icon.description',
            descriptionFallback: 'Icon displayed before the field.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.select.props.append_icon.description',
            descriptionFallback: 'Icon displayed after the field.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'any', slug: '', kind: 'primitive' },
            descriptionKey: 'components.select.emits.update_model_value.description',
            descriptionFallback: 'Emitted when the selected value changes.'
        },
        {
            event: 'update:menu',
            payload: { label: 'boolean', slug: '', kind: 'primitive' },
            descriptionKey: 'components.select.emits.update_menu.description',
            descriptionFallback: 'Emitted when the dropdown opens or closes.'
        },
        {
            event: 'update:search',
            payload: { label: 'string', slug: '', kind: 'primitive' },
            descriptionKey: 'components.select.emits.update_search.description',
            descriptionFallback: 'Emitted when the autocomplete search string changes.'
        },
        {
            event: 'focus',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.select.emits.focus.description',
            descriptionFallback: 'Fired when the input receives focus.'
        },
        {
            event: 'blur',
            payload: { label: 'FocusEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.select.emits.blur.description',
            descriptionFallback: 'Fired when the input loses focus.'
        },
        {
            event: 'click:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.select.emits.click_control.description',
            descriptionFallback: 'Fired when the user clicks the field surface.'
        },
        {
            event: 'mousedown:control',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.select.emits.mousedown_control.description',
            descriptionFallback: 'Fired on mousedown on the field surface. Used to toggle the menu.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.select.slots.default.description',
            descriptionFallback: 'Replaces the inner dropdown content area.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.select.slots.prepend.description',
            descriptionFallback: 'Content prepended outside the field (left of the border).'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.select.slots.append.description',
            descriptionFallback: 'Content appended outside the field (right of the border).'
        },
        {
            slot: 'prependInner',
            slotProps: '—',
            descriptionKey: 'components.select.slots.prepend_inner.description',
            descriptionFallback: 'Content prepended inside the field border.'
        },
        {
            slot: 'appendInner',
            slotProps: '—',
            descriptionKey: 'components.select.slots.append_inner.description',
            descriptionFallback: 'Content appended inside the field border (before the menu chevron).'
        },
        {
            slot: 'label',
            slotProps: '—',
            descriptionKey: 'components.select.slots.label.description',
            descriptionFallback: 'Custom label content.'
        },
        {
            slot: 'chip',
            slotProps: '{ item, index, props }',
            descriptionKey: 'components.select.slots.chip.description',
            descriptionFallback: 'Custom chip renderer when chips=true. Receives item data and chip props.'
        },
        {
            slot: 'item',
            slotProps: '{ item, index, props }',
            descriptionKey: 'components.select.slots.item.description',
            descriptionFallback: 'Custom list-item renderer inside the dropdown.'
        },
        {
            slot: 'no-data',
            slotProps: '—',
            descriptionKey: 'components.select.slots.no_data.description',
            descriptionFallback: 'Content shown when no items match the search query.'
        }
    ],

    examples: [
        {
            titleKey: 'components.select.examples.basic.title',
            titleFallback: 'Basic single select',
            lang: 'vue',
            code: `<template>
  <origam-select
    v-model="selected"
    :items="['Vue', 'React', 'Svelte', 'Angular']"
    label="Framework"
  />
</template>
<script setup>
const selected = ref('')
</script>`
        },
        {
            titleKey: 'components.select.examples.multiple.title',
            titleFallback: 'Multiple with chips',
            lang: 'vue',
            code: `<template>
  <origam-select
    v-model="selected"
    :items="['CSS', 'TypeScript', 'Vue', 'Pinia', 'Vite']"
    label="Technologies"
    :multiple="true"
    :chips="true"
    :closable-chips="true"
    :clearable="true"
  />
</template>
<script setup>
const selected = ref([])
</script>`
        },
        {
            titleKey: 'components.select.examples.autocomplete.title',
            titleFallback: 'Autocomplete',
            lang: 'vue',
            code: `<template>
  <origam-select
    v-model="country"
    :items="countries"
    label="Country"
    :autocomplete="true"
    placeholder="Type to search…"
  />
</template>
<script setup>
const country = ref('')
const countries = ['France', 'Germany', 'Japan', 'USA', 'Brazil', 'India']
</script>`
        }
    ],

    previewVariants: [
        {
            label: 'single',
            props: { label: 'Framework', items: ['Vue', 'React', 'Svelte'] as any }
        },
        {
            label: 'with value',
            props: { label: 'Framework', modelValue: 'Vue', items: ['Vue', 'React', 'Svelte'] as any }
        },
        {
            label: 'outlined',
            props: { label: 'Color', variant: 'outlined', items: ['primary', 'secondary', 'success'] as any }
        },
        {
            label: 'disabled',
            props: { label: 'Disabled', disabled: true, modelValue: 'Vue', items: ['Vue', 'React'] as any },
            ariaLabel: 'Disabled select'
        }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-select',
        svgViewBox: '0 0 560 200',
        svgTitle: 'Anatomy of OrigamSelect',
        svgDesc: 'Schematic of the Select component with 6 numbered parts.',
        svg: `
  <rect x="0" y="0" width="560" height="200" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="20" y="20" width="520" height="60" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <text x="40" y="43" font-size="10" fill="var(--origam-color__text---tertiary, #7e5fb0)" font-family="'JetBrains Mono',monospace">Framework</text>
  <text x="40" y="64" font-size="12" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">Vue 3</text>
  <text x="510" y="56" font-size="18" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">▾</text>
  <rect x="20" y="100" width="520" height="80" rx="4" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.3))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="46" y="122" font-size="11" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-family="'JetBrains Mono',monospace">Vue 3</text>
  <text x="46" y="146" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">React</text>
  <text x="46" y="166" font-size="11" fill="var(--origam-color__text---secondary, #5b3e8c)" font-family="'JetBrains Mono',monospace">Svelte</text>
  <circle cx="28" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="32" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="48" cy="48" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="48" y="52" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="120" cy="68" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="120" y="72" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="510" cy="40" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="510" y="44" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <circle cx="28" cy="108" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="28" y="112" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <circle cx="46" cy="122" r="7" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="46" y="126" font-size="8" fill="#fff" text-anchor="middle" font-weight="700">6</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-select&gt;</code> — 6 parts: the root field ①, label ②, selection text ③, menu chevron ④, dropdown list container ⑤, and list items ⑥.`,
        legend: [
            {
                num: 1,
                cls: '.origam-select',
                descriptionKey: 'components.select.anatomy.root',
                descriptionFallback: 'Root element extending OrigamTextField. Carries BEM modifiers for single/multiple, chips, autocomplete and open states.'
            },
            {
                num: 2,
                cls: 'origam-select (label via TextField)',
                descriptionKey: 'components.select.anatomy.label',
                descriptionFallback: 'Floating label managed by the inner TextField field slot.'
            },
            {
                num: 3,
                cls: '.origam-select__selection-text',
                descriptionKey: 'components.select.anatomy.selection_text',
                descriptionFallback: 'Selected value text displayed inside the field when not in chip mode.'
            },
            {
                num: 4,
                cls: '.origam-select__menu-icon',
                descriptionKey: 'components.select.anatomy.menu_icon',
                descriptionFallback: 'Chevron icon toggling the dropdown. Rotates 180° when the menu is open.'
            },
            {
                num: 5,
                cls: '.origam-select__content (inside OrigamMenu)',
                descriptionKey: 'components.select.anatomy.content',
                descriptionFallback: 'Dropdown container rendered by OrigamMenu. Contains the OrigamList of items.'
            },
            {
                num: 6,
                cls: '.origam-select__text / .origam-select__mask',
                descriptionKey: 'components.select.anatomy.text',
                descriptionFallback: 'Per-item text label. Includes .origam-select__mask and .origam-select__unmask for the search-highlight animation.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<!-- extends TextField chrome -->
<origam-text-field class="origam-select origam-select--single">
  <!-- dropdown via OrigamMenu -->
  <origam-menu content-class="origam-select__content">
    <origam-list class="origam-select__menu-list">
      <origam-list-item>
        <!-- item text with optional search highlight -->
        <span class="origam-select__text">Vue 3</span>
      </origam-list-item>
    </origam-list>
  </origam-menu>

  <!-- selected value display -->
  <span class="origam-select__selection-text">Vue 3</span>

  <!-- menu toggle chevron (appendInner) -->
  <origam-icon class="origam-select__menu-icon" />
</origam-text-field>`,
        classes: [
            { cls: 'origam-select', descriptionKey: 'components.select.anatomy.root', descriptionFallback: 'Root block.' },
            { cls: 'origam-select--single', descriptionKey: 'components.select.anatomy.modifier_single', descriptionFallback: 'Applied when multiple=false.' },
            { cls: 'origam-select--multiple', descriptionKey: 'components.select.anatomy.modifier_multiple', descriptionFallback: 'Applied when multiple=true.' },
            { cls: 'origam-select--chips', descriptionKey: 'components.select.anatomy.modifier_chips', descriptionFallback: 'Applied when chips=true.' },
            { cls: 'origam-select--active-menu', descriptionKey: 'components.select.anatomy.modifier_active_menu', descriptionFallback: 'Applied while the dropdown is open.' },
            { cls: 'origam-select--autocomplete', descriptionKey: 'components.select.anatomy.modifier_autocomplete', descriptionFallback: 'Applied when autocomplete=true.' },
            { cls: 'origam-select__selection-text', descriptionKey: 'components.select.anatomy.selection_text', descriptionFallback: 'Selected value text.' },
            { cls: 'origam-select__menu-icon', descriptionKey: 'components.select.anatomy.menu_icon', descriptionFallback: 'Chevron toggle icon.' },
            { cls: 'origam-select__content', descriptionKey: 'components.select.anatomy.content', descriptionFallback: 'Dropdown content wrapper (applied to OrigamMenu content-class).' },
            { cls: 'origam-select__text', descriptionKey: 'components.select.anatomy.text', descriptionFallback: 'Item title text span.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-select---min-width',
            defaultValue: '150px',
            descriptionKey: 'components.select.css_vars.min_width',
            descriptionFallback: 'Minimum width of the select field.'
        },
        {
            name: '--origam-select__list---background-color',
            defaultValue: '{color.surface.raised}',
            descriptionKey: 'components.select.css_vars.list_background_color',
            descriptionFallback: 'Background color of the dropdown list panel.'
        },
        {
            name: '--origam-select__list---border-radius',
            defaultValue: '{radius.md}',
            descriptionKey: 'components.select.css_vars.list_border_radius',
            descriptionFallback: 'Border-radius of the dropdown panel.'
        },
        {
            name: '--origam-select__list---max-height',
            defaultValue: '300px',
            descriptionKey: 'components.select.css_vars.list_max_height',
            descriptionFallback: 'Maximum height of the dropdown list before it scrolls.'
        },
        {
            name: '--origam-select__list---box-shadow',
            defaultValue: '{shadow.lg}',
            descriptionKey: 'components.select.css_vars.list_box_shadow',
            descriptionFallback: 'Box shadow of the dropdown panel.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.select.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to sub-components.'
        },
        {
            name: 'isFocused',
            type: 'Ref<boolean>',
            descriptionKey: 'components.select.exposed.is_focused',
            descriptionFallback: 'Reactive focus state of the underlying input.'
        },
        {
            name: 'menu',
            type: 'Ref<boolean>',
            descriptionKey: 'components.select.exposed.menu',
            descriptionFallback: 'Reactive open/closed state of the dropdown menu.'
        },
        {
            name: 'handleSelect',
            type: '(item: any) => void',
            descriptionKey: 'components.select.exposed.handle_select',
            descriptionFallback: 'Imperatively select an item programmatically.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.select.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.select.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.select.exposed.load',
            descriptionFallback: 'Injects the computed style sheet. Called automatically on mount.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.select.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet. Called automatically on unmount.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.select.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['combobox', 'listbox', 'option'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.select.a11y.key_enter',
                actionFallback: 'Opens the dropdown or confirms the highlighted option.'
            },
            {
                key: 'Escape',
                actionKey: 'components.select.a11y.key_escape',
                actionFallback: 'Closes the dropdown without changing the selection.'
            },
            {
                key: 'Arrow Down / Up',
                actionKey: 'components.select.a11y.key_arrows',
                actionFallback: 'Navigates between items in the open dropdown list.'
            },
            {
                key: 'Tab',
                actionKey: 'components.select.a11y.key_tab',
                actionFallback: 'Closes the dropdown and moves focus to the next element.'
            }
        ],
        notes: [
            {
                noteKey: 'components.select.a11y.combobox_note',
                noteFallback: 'The field uses role="combobox" with aria-expanded reflecting the menu state and aria-haspopup="listbox". The dropdown list has role="listbox" and each item has role="option".'
            },
            {
                noteKey: 'components.select.a11y.aria_label_note',
                noteFallback: 'The label prop is used as aria-label on the internal text field. When using a placeholder-only UI, also provide an explicit aria-label for screen readers.'
            },
            {
                noteKey: 'components.select.a11y.multiple_note',
                noteFallback: 'In multiple mode, aria-multiselectable="true" is set on the listbox. Each selected option has aria-selected="true".'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/select.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'select.min-width',
                value: '150px',
                type: 'dimension',
                descriptionKey: 'components.select.tokens.min_width',
                descriptionFallback: 'Minimum width of the select field.'
            },
            {
                tokenPath: 'select.list.background-color',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.select.tokens.list_background_color',
                descriptionFallback: 'Dropdown list background.'
            },
            {
                tokenPath: 'select.list.border-radius',
                value: '{radius.md}',
                type: 'dimension',
                descriptionKey: 'components.select.tokens.list_border_radius',
                descriptionFallback: 'Dropdown panel corner radius.'
            },
            {
                tokenPath: 'select.list.max-height',
                value: '300px',
                type: 'dimension',
                descriptionKey: 'components.select.tokens.list_max_height',
                descriptionFallback: 'Max scrollable height of the dropdown list.'
            },
            {
                tokenPath: 'select.list.box-shadow',
                value: '{shadow.lg}',
                type: 'shadow',
                descriptionKey: 'components.select.tokens.list_box_shadow',
                descriptionFallback: 'Elevation shadow of the dropdown panel.'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'label',
                kind: 'text',
                labelKey: 'components.select.playground.label',
                labelFallback: 'Label',
                defaultValue: 'Select an option'
            },
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.select.playground.color',
                labelFallback: 'Color',
                defaultValue: 'primary',
                options: [
                    { label: '(none)', value: '' },
                    { label: 'primary', value: 'primary' },
                    { label: 'secondary', value: 'secondary' },
                    { label: 'success', value: 'success' }
                ]
            },
            {
                prop: 'density',
                kind: 'select',
                labelKey: 'components.select.playground.density',
                labelFallback: 'Density',
                defaultValue: 'default',
                options: [
                    { label: 'compact', value: 'compact' },
                    { label: 'default', value: 'default' },
                    { label: 'comfortable', value: 'comfortable' }
                ]
            },
            {
                prop: 'clearable',
                kind: 'switch',
                labelKey: 'components.select.playground.clearable',
                labelFallback: 'Clearable',
                defaultValue: false
            },
            {
                prop: 'multiple',
                kind: 'switch',
                labelKey: 'components.select.playground.multiple',
                labelFallback: 'Multiple',
                defaultValue: false
            },
            {
                prop: 'chips',
                kind: 'switch',
                labelKey: 'components.select.playground.chips',
                labelFallback: 'Chips',
                defaultValue: false
            },
            {
                prop: 'disabled',
                kind: 'switch',
                labelKey: 'components.select.playground.disabled',
                labelFallback: 'Disabled',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
