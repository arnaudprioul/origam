/**
 * /components/date-picker-header — full documentation data for OrigamDatePickerHeader.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DatePicker/date-picker-header.interface.ts  (IDatePickerHeaderProps)
 *   - packages/ds/src/components/DatePicker/OrigamDatePickerHeader.vue        (template BEM)
 *   - packages/ds/tokens/component/date-picker.json                           (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const DATE_PICKER_HEADER_DOC: IComponentDoc = {
    slug: 'date-picker-header',
    name: 'DatePickerHeader',
    tag: 'origam-date-picker-header',
    icon: 'mdi-calendar-today',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.date_picker_header.description',
    descriptionFallback: 'Header banner of the DatePicker displaying the currently selected date value with animated transitions. Supports prepend/append slots and emits a click event for interactive headers.',
    packageNote: 'origam',
    parentSlug: 'date-picker',

    family: [
        { slug: 'date-picker', name: 'DatePicker', descriptionKey: 'components.catalog.date_picker.description', descriptionFallback: 'Full calendar date-picker component.' },
        { slug: 'date-picker-controls', name: 'DatePickerControls', descriptionKey: 'components.catalog.date_picker_controls.description', descriptionFallback: 'Navigation toolbar for the DatePicker.' },
        { slug: 'date-picker-month', name: 'DatePickerMonth', descriptionKey: 'components.catalog.date_picker_month.description', descriptionFallback: 'Monthly grid of selectable day cells.' },
        { slug: 'date-picker-months', name: 'DatePickerMonths', descriptionKey: 'components.catalog.date_picker_months.description', descriptionFallback: 'Month selection grid (12 tiles).' },
        { slug: 'date-picker-years', name: 'DatePickerYears', descriptionKey: 'components.catalog.date_picker_years.description', descriptionFallback: 'Scrollable year selection list.' }
    ],

    related: [
        { slug: 'date-picker', name: 'DatePicker', kind: 'component', descriptionKey: 'components.catalog.date_picker.description', descriptionFallback: 'Parent component that renders this header.' }
    ],

    props: [
        {
            name: 'header',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_header.props.header.description',
            descriptionFallback: 'Text content displayed in the header. Transitions animate between value changes.'
        },
        {
            name: 'transition',
            type: { label: 'TTransitionProps', slug: 'transition-props', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_header.props.transition.description',
            descriptionFallback: 'Transition applied to the header content when the header value changes.'
        },
        {
            name: 'color',
            type: { label: 'TColor | string', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_header.props.color.description',
            descriptionFallback: 'Text colour of the header.'
        },
        {
            name: 'density',
            type: { label: 'TDensity', slug: 'density', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_header.props.density.description',
            descriptionFallback: 'Density modifier forwarded to prepend/append icons and avatars.'
        },
        {
            name: 'prependIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_header.props.prepend_icon.description',
            descriptionFallback: 'MDI icon rendered in the prepend slot when no slot override is provided.'
        },
        {
            name: 'prependAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_header.props.prepend_avatar.description',
            descriptionFallback: 'Image URL for an avatar in the prepend area.'
        },
        {
            name: 'appendIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_header.props.append_icon.description',
            descriptionFallback: 'MDI icon rendered in the append slot when no slot override is provided.'
        },
        {
            name: 'appendAvatar',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_header.props.append_avatar.description',
            descriptionFallback: 'Image URL for an avatar in the append area.'
        }
    ],

    emits: [
        {
            event: 'click',
            payload: { label: 'void', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_header.emits.click.description',
            descriptionFallback: 'Fired when the header container is clicked (used to switch picker mode).'
        },
        {
            event: 'click:prepend',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_header.emits.click_prepend.description',
            descriptionFallback: 'Fired when the prepend area is clicked.'
        },
        {
            event: 'click:append',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_header.emits.click_append.description',
            descriptionFallback: 'Fired when the append area is clicked.'
        }
    ],

    slots: [
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.date_picker_header.slots.default.description',
            descriptionFallback: 'Header content. Falls back to the header prop value.'
        },
        {
            slot: 'prepend',
            slotProps: '—',
            descriptionKey: 'components.date_picker_header.slots.prepend.description',
            descriptionFallback: 'Custom prepend content. When absent, renders prependAvatar or prependIcon.'
        },
        {
            slot: 'append',
            slotProps: '—',
            descriptionKey: 'components.date_picker_header.slots.append.description',
            descriptionFallback: 'Custom append content. When absent, renders appendAvatar or appendIcon.'
        }
    ],

    examples: [
        {
            titleKey: 'components.date_picker_header.examples.basic.title',
            titleFallback: 'Date header with transition',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-header
    :header="selectedDateLabel"
    color="primary"
    @click="toggleMode"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-date-picker-header',
        svgViewBox: '0 0 560 100',
        svgTitle: 'Anatomy of OrigamDatePickerHeader',
        svgDesc: 'A grid-based header with prepend, animated content, and append areas.',
        svg: `
  <rect x="0" y="0" width="560" height="100" rx="4" fill="var(--origam-color__surface---sunken, #f8f5ff)"/>
  <rect x="8" y="16" width="544" height="68" rx="3" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <rect x="20" y="28" width="48" height="44" rx="2" fill="rgba(255,255,255,0.15)"/>
  <rect x="80" y="36" width="320" height="28" rx="2" fill="rgba(255,255,255,0.2)"/>
  <rect x="488" y="28" width="48" height="44" rx="2" fill="rgba(255,255,255,0.15)"/>
  <circle cx="16" cy="16" r="9" fill="var(--origam-color__feedback--success---bg, #059669)"/>
  <text x="16" y="20" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="44" cy="28" r="9" fill="rgba(255,255,255,0.6)"/>
  <text x="44" y="32" font-size="9" fill="#7c3aed" text-anchor="middle" font-weight="700">2</text>
  <circle cx="220" cy="28" r="9" fill="rgba(255,255,255,0.6)"/>
  <text x="220" y="32" font-size="9" fill="#7c3aed" text-anchor="middle" font-weight="700">3</text>
  <circle cx="512" cy="28" r="9" fill="rgba(255,255,255,0.6)"/>
  <text x="512" y="32" font-size="9" fill="#7c3aed" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-date-picker-header&gt;</code> — root grid ①, prepend area ②, animated content ③, append area ④.`,
        legend: [
            { num: 1, cls: '.origam-date-picker-header', descriptionKey: 'components.date_picker_header.anatomy.root', descriptionFallback: 'Root div with grid-template-areas: "prepend content append".' },
            { num: 2, cls: '.origam-date-picker-header__prepend', descriptionKey: 'components.date_picker_header.anatomy.prepend', descriptionFallback: 'Prepend grid area.' },
            { num: 3, cls: '.origam-date-picker-header__content', descriptionKey: 'components.date_picker_header.anatomy.content', descriptionFallback: 'Animated content area (wrapped in OrigamTransition).' },
            { num: 4, cls: '.origam-date-picker-header__append', descriptionKey: 'components.date_picker_header.anatomy.append', descriptionFallback: 'Append grid area.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-date-picker-header">
  <div class="origam-date-picker-header__prepend"><!-- prepend slot --></div>
  <origam-transition>
    <div class="origam-date-picker-header__content">
      <!-- default slot / header prop -->
    </div>
  </origam-transition>
  <div class="origam-date-picker-header__append"><!-- append slot --></div>
</div>`,
        classes: [
            { cls: 'origam-date-picker-header', descriptionKey: 'components.date_picker_header.anatomy.root', descriptionFallback: 'Root grid container.' },
            { cls: 'origam-date-picker-header__prepend', descriptionKey: 'components.date_picker_header.anatomy.prepend', descriptionFallback: 'Prepend area.' },
            { cls: 'origam-date-picker-header__content', descriptionKey: 'components.date_picker_header.anatomy.content', descriptionFallback: 'Animated header value area.' },
            { cls: 'origam-date-picker-header__append', descriptionKey: 'components.date_picker_header.anatomy.append', descriptionFallback: 'Append area.' },
            { cls: 'origam-date-picker-header--clickable', descriptionKey: 'components.date_picker_header.anatomy.clickable', descriptionFallback: 'Applied when a click listener is attached; adds cursor:pointer on the content.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-date-picker---header-background-color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.date_picker_header.css_vars.bg',
            descriptionFallback: 'Header background colour.'
        },
        {
            name: '--origam-date-picker---header-color',
            defaultValue: '{color.action.primary.fg}',
            descriptionKey: 'components.date_picker_header.css_vars.color',
            descriptionFallback: 'Header text colour.'
        },
        {
            name: '--origam-date-picker---header-font-size',
            defaultValue: '{font.size.lg}',
            descriptionKey: 'components.date_picker_header.css_vars.font_size',
            descriptionFallback: 'Header font size (content area).'
        },
        {
            name: '--origam-date-picker---header-min-height',
            defaultValue: '70px',
            descriptionKey: 'components.date_picker_header.css_vars.min_height',
            descriptionFallback: 'Minimum height of the header container.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        { name: 'filterProps', type: '(props: IDatePickerHeaderProps, exclude?: string[]) => Partial<IDatePickerHeaderProps>', descriptionKey: 'components.date_picker_header.exposed.filter_props', descriptionFallback: 'Filters component props for forwarding.' },
        { name: 'css', type: 'ComputedRef<string>', descriptionKey: 'components.date_picker_header.exposed.css', descriptionFallback: 'Serialised scoped CSS string.' },
        { name: 'id', type: 'string', descriptionKey: 'components.date_picker_header.exposed.id', descriptionFallback: 'Unique style scope identifier.' },
        { name: 'load', type: '() => void', descriptionKey: 'components.date_picker_header.exposed.load', descriptionFallback: 'Mounts the scoped style sheet.' },
        { name: 'unload', type: '() => void', descriptionKey: 'components.date_picker_header.exposed.unload', descriptionFallback: 'Unmounts the scoped style sheet.' },
        { name: 'isLoaded', type: 'Ref<boolean>', descriptionKey: 'components.date_picker_header.exposed.is_loaded', descriptionFallback: 'Whether the scoped style sheet is currently mounted.' }
    ],

    a11y: {
        roles: [],
        keyboard: [
            { key: 'Enter / Space', actionKey: 'components.date_picker_header.a11y.key_activate', actionFallback: 'Activates the header click when it is keyboard-focusable.' }
        ],
        notes: [
            { noteKey: 'components.date_picker_header.a11y.transition', noteFallback: 'OrigamTransition wraps the content; reduced-motion is respected by the transition component.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/date-picker.json',
        pipelineNote: 'Built with Style Dictionary v4. DatePickerHeader uses the date-picker.header.* sub-namespace.',
        excerpt: [
            { tokenPath: 'date-picker.header.background-color', value: '{color.action.primary.bg}', type: 'color', descriptionKey: 'components.date_picker_header.tokens.bg', descriptionFallback: 'Header background colour.' },
            { tokenPath: 'date-picker.header.color', value: '{color.action.primary.fg}', type: 'color', descriptionKey: 'components.date_picker_header.tokens.color', descriptionFallback: 'Header text colour.' },
            { tokenPath: 'date-picker.header.font-size', value: '{font.size.lg}', type: 'dimension', descriptionKey: 'components.date_picker_header.tokens.font_size', descriptionFallback: 'Header font size.' },
            { tokenPath: 'date-picker.header.min-height', value: '70px', type: 'dimension', descriptionKey: 'components.date_picker_header.tokens.min_height', descriptionFallback: 'Header minimum height.' }
        ]
    } satisfies IComponentTokens
}
