/**
 * /components/date-picker-controls — full documentation data for OrigamDatePickerControls.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DatePicker/date-picker-controls.interface.ts  (IDatePickerControlsProps)
 *   - packages/ds/src/components/DatePicker/OrigamDatePickerControls.vue        (template BEM)
 *   - packages/ds/tokens/component/date-picker.json                             (CSS tokens)
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const DATE_PICKER_CONTROLS_DOC: IComponentDoc = {
    slug: 'date-picker-controls',
    name: 'DatePickerControls',
    tag: 'origam-date-picker-controls',
    icon: 'mdi-calendar-arrow-left',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.date_picker_controls.description',
    descriptionFallback: 'Navigation toolbar for the DatePicker. Renders a month/year label button, a mode-toggle icon button, and prev/next navigation buttons. Emits discrete click events for each control.',
    packageNote: 'origam',
    parentSlug: 'date-picker',

    family: [
        { slug: 'date-picker', name: 'DatePicker', descriptionKey: 'components.catalog.date_picker.description', descriptionFallback: 'Full calendar date-picker component.' },
        { slug: 'date-picker-header', name: 'DatePickerHeader', descriptionKey: 'components.catalog.date_picker_header.description', descriptionFallback: 'Header area of the DatePicker showing the selected value.' },
        { slug: 'date-picker-month', name: 'DatePickerMonth', descriptionKey: 'components.catalog.date_picker_month.description', descriptionFallback: 'Monthly grid of selectable day cells.' },
        { slug: 'date-picker-months', name: 'DatePickerMonths', descriptionKey: 'components.catalog.date_picker_months.description', descriptionFallback: 'Month selection grid (12 tiles).' },
        { slug: 'date-picker-years', name: 'DatePickerYears', descriptionKey: 'components.catalog.date_picker_years.description', descriptionFallback: 'Scrollable year selection list.' }
    ],

    related: [
        { slug: 'date-picker', name: 'DatePicker', kind: 'component', descriptionKey: 'components.catalog.date_picker.description', descriptionFallback: 'Parent component that orchestrates the controls, header, and grids.' }
    ],

    props: [
        {
            name: 'text',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_controls.props.text.description',
            descriptionFallback: 'Label displayed on the month button (e.g. "June 2024").'
        },
        {
            name: 'viewMode',
            type: { label: 'TDateMode', slug: 'date-mode', kind: 'type' },
            defaultValue: "'month'",
            descriptionKey: 'components.date_picker_controls.props.view_mode.description',
            descriptionFallback: 'Current view mode — controls which panel (month/year) is active.'
        },
        {
            name: 'nextIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-right'",
            descriptionKey: 'components.date_picker_controls.props.next_icon.description',
            descriptionFallback: 'Icon for the "next" navigation button.'
        },
        {
            name: 'prevIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-chevron-left'",
            descriptionKey: 'components.date_picker_controls.props.prev_icon.description',
            descriptionFallback: 'Icon for the "previous" navigation button.'
        },
        {
            name: 'modeIcon',
            type: { label: 'TIcon', slug: 'icon', kind: 'type' },
            defaultValue: "'mdi-menu-down-outline'",
            descriptionKey: 'components.date_picker_controls.props.mode_icon.description',
            descriptionFallback: 'Icon for the view-mode toggle button (next to the month label).'
        },
        {
            name: 'disabled',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_controls.props.disabled.description',
            descriptionFallback: 'Disables all controls simultaneously.'
        },
        {
            name: 'disabledMonth',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_controls.props.disabled_month.description',
            descriptionFallback: 'Disables the month label button only.'
        },
        {
            name: 'disabledYear',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_controls.props.disabled_year.description',
            descriptionFallback: 'Disables the mode-toggle (year) button only.'
        },
        {
            name: 'disabledPrev',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_controls.props.disabled_prev.description',
            descriptionFallback: 'Disables the previous navigation button only.'
        },
        {
            name: 'disabledNext',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_controls.props.disabled_next.description',
            descriptionFallback: 'Disables the next navigation button only.'
        },
        {
            name: 'active',
            type: { label: 'string | string[]', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_controls.props.active.description',
            descriptionFallback: 'Active state passed to child button groups.'
        }
    ],

    emits: [
        {
            event: 'click:prev',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_controls.emits.click_prev.description',
            descriptionFallback: 'Fired when the previous navigation button is clicked.'
        },
        {
            event: 'click:next',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_controls.emits.click_next.description',
            descriptionFallback: 'Fired when the next navigation button is clicked.'
        },
        {
            event: 'click:year',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_controls.emits.click_year.description',
            descriptionFallback: 'Fired when the mode-toggle button is clicked to switch to year view.'
        },
        {
            event: 'click:month',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_controls.emits.click_month.description',
            descriptionFallback: 'Fired when the month label button is clicked.'
        },
        {
            event: 'click:text',
            payload: { label: 'MouseEvent', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker_controls.emits.click_text.description',
            descriptionFallback: 'Fired when the text label area is clicked.'
        }
    ],

    slots: [],

    examples: [
        {
            titleKey: 'components.date_picker_controls.examples.basic.title',
            titleFallback: 'Navigation controls bar',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-controls
    text="June 2024"
    @click:prev="onPrev"
    @click:next="onNext"
    @click:year="onToggleYear"
  />
</template>`
        }
    ],

    previewVariants: [],

    anatomy: {
        rootClass: 'origam-date-picker-controls',
        svgViewBox: '0 0 560 80',
        svgTitle: 'Anatomy of OrigamDatePickerControls',
        svgDesc: 'A flex row with a button group on the left and navigation buttons on the right.',
        svg: `
  <rect x="0" y="0" width="560" height="80" rx="4" fill="var(--origam-color__surface---sunken, #f8f5ff)"/>
  <rect x="8" y="16" width="544" height="48" rx="3" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---default, rgba(124,58,237,0.2))" stroke-width="1"/>
  <rect x="16" y="24" width="160" height="32" rx="2" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.07))"/>
  <rect x="420" y="24" width="120" height="32" rx="2" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.07))"/>
  <circle cx="16" cy="16" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="16" y="20" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="80" cy="24" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="80" y="28" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="456" cy="24" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="456" y="28" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-date-picker-controls&gt;</code> — root flex row ①, left button group (month label + mode toggle) ②, right navigation button group (prev + next) ③.`,
        legend: [
            { num: 1, cls: '.origam-date-picker-controls', descriptionKey: 'components.date_picker_controls.anatomy.root', descriptionFallback: 'Root flex container.' },
            { num: 2, cls: '.origam-date-picker-controls__month-btn / .origam-date-picker-controls__mode-btn', descriptionKey: 'components.date_picker_controls.anatomy.left_group', descriptionFallback: 'Left button group: month label button and mode-toggle icon button.' },
            { num: 3, cls: '.origam-date-picker-controls__month', descriptionKey: 'components.date_picker_controls.anatomy.right_group', descriptionFallback: 'Right flex container holding the prev/next navigation button group.' }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-date-picker-controls">
  <!-- left: month label + mode toggle -->
  <origam-btn-group>
    <origam-btn class="origam-date-picker-controls__month-btn" />
    <origam-btn class="origam-date-picker-controls__mode-btn" />
  </origam-btn-group>
  <origam-spacer />
  <!-- right: prev / next -->
  <div class="origam-date-picker-controls__month">
    <origam-btn-group>
      <origam-btn /><!-- prev -->
      <origam-btn /><!-- next -->
    </origam-btn-group>
  </div>
</div>`,
        classes: [
            { cls: 'origam-date-picker-controls', descriptionKey: 'components.date_picker_controls.anatomy.root', descriptionFallback: 'Root flex container.' },
            { cls: 'origam-date-picker-controls__month-btn', descriptionKey: 'components.date_picker_controls.anatomy.month_btn', descriptionFallback: 'Month label text button.' },
            { cls: 'origam-date-picker-controls__mode-btn', descriptionKey: 'components.date_picker_controls.anatomy.mode_btn', descriptionFallback: 'Mode-toggle icon button.' },
            { cls: 'origam-date-picker-controls__month', descriptionKey: 'components.date_picker_controls.anatomy.nav_group', descriptionFallback: 'Navigation buttons container.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-date-picker---controls-color',
            defaultValue: '{color.text.secondary}',
            descriptionKey: 'components.date_picker_controls.css_vars.color',
            descriptionFallback: 'Default text colour of the controls.'
        },
        {
            name: '--origam-date-picker---controls-color-hover',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.date_picker_controls.css_vars.color_hover',
            descriptionFallback: 'Text colour on hover.'
        },
        {
            name: '--origam-date-picker---controls-color-disabled',
            defaultValue: '{color.text.disabled}',
            descriptionKey: 'components.date_picker_controls.css_vars.color_disabled',
            descriptionFallback: 'Text colour when disabled.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        { name: 'filterProps', type: '(props: IDatePickerControlsProps, exclude?: string[]) => Partial<IDatePickerControlsProps>', descriptionKey: 'components.date_picker_controls.exposed.filter_props', descriptionFallback: 'Filters component props for forwarding.' },
        { name: 'css', type: 'ComputedRef<string>', descriptionKey: 'components.date_picker_controls.exposed.css', descriptionFallback: 'Serialised scoped CSS string.' },
        { name: 'id', type: 'string', descriptionKey: 'components.date_picker_controls.exposed.id', descriptionFallback: 'Unique style scope identifier.' },
        { name: 'load', type: '() => void', descriptionKey: 'components.date_picker_controls.exposed.load', descriptionFallback: 'Mounts the scoped style sheet.' },
        { name: 'unload', type: '() => void', descriptionKey: 'components.date_picker_controls.exposed.unload', descriptionFallback: 'Unmounts the scoped style sheet.' },
        { name: 'isLoaded', type: 'Ref<boolean>', descriptionKey: 'components.date_picker_controls.exposed.is_loaded', descriptionFallback: 'Whether the scoped style sheet is currently mounted.' }
    ],

    a11y: {
        roles: [],
        keyboard: [
            { key: 'Tab', actionKey: 'components.date_picker_controls.a11y.key_tab', actionFallback: 'Moves focus between the five control buttons.' },
            { key: 'Enter / Space', actionKey: 'components.date_picker_controls.a11y.key_activate', actionFallback: 'Activates the focused button.' }
        ],
        notes: [
            { noteKey: 'components.date_picker_controls.a11y.disabled', noteFallback: 'Disabled controls receive tabindex="-1" via OrigamBtn and are not reachable by keyboard.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/date-picker.json',
        pipelineNote: 'Built with Style Dictionary v4. DatePickerControls consumes the date-picker.controls.* sub-namespace.',
        excerpt: [
            { tokenPath: 'date-picker.controls.color', value: '{color.text.secondary}', type: 'color', descriptionKey: 'components.date_picker_controls.tokens.color', descriptionFallback: 'Controls text colour.' },
            { tokenPath: 'date-picker.controls.color-hover', value: '{color.text.primary}', type: 'color', descriptionKey: 'components.date_picker_controls.tokens.color_hover', descriptionFallback: 'Controls hover text colour.' },
            { tokenPath: 'date-picker.controls.color-disabled', value: '{color.text.disabled}', type: 'color', descriptionKey: 'components.date_picker_controls.tokens.color_disabled', descriptionFallback: 'Controls disabled text colour.' },
            { tokenPath: 'date-picker.controls.padding', value: '{space.2}', type: 'dimension', descriptionKey: 'components.date_picker_controls.tokens.padding', descriptionFallback: 'Controls bar padding.' }
        ]
    } satisfies IComponentTokens
}
