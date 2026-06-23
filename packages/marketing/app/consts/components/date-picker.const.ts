/**
 * /components/date-picker — full documentation data for OrigamDatePicker.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DatePicker/date-picker.interface.ts  (props)
 *   - packages/ds/src/components/DatePicker/OrigamDatePicker.vue      (template BEM, slots, defineExpose)
 *   - packages/ds/tokens/component/date-picker.json                   (CSS tokens)
 *
 * FAMILY (6 sub-components):
 *   OrigamDatePickerControls, OrigamDatePickerHeader, OrigamDatePickerMonth,
 *   OrigamDatePickerMonths, OrigamDatePickerYears
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

export const DATE_PICKER_DOC: IComponentDoc = {
    slug: 'date-picker',
    name: 'DatePicker',
    tag: 'origam-date-picker',
    icon: 'mdi-calendar',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.date_picker.description',
    descriptionFallback: 'Calendar popup to select a single date, multiple dates or a range. Supports month and year navigation with animated view transitions.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-datepicker--design',
    docUrl: 'http://localhost:4000/components/DatePicker/OrigamDatePicker',

    family: [
        {
            slug: 'date-picker-controls',
            name: 'DatePickerControls',
            descriptionKey: 'components.catalog.date_picker_controls.description',
            descriptionFallback: 'Navigation bar with prev/next and view-mode (month/year) toggle buttons.'
        },
        {
            slug: 'date-picker-header',
            name: 'DatePickerHeader',
            descriptionKey: 'components.catalog.date_picker_header.description',
            descriptionFallback: 'Coloured header strip showing the selected date or month.'
        },
        {
            slug: 'date-picker-month',
            name: 'DatePickerMonth',
            descriptionKey: 'components.catalog.date_picker_month.description',
            descriptionFallback: 'Day-grid view for picking a date within the current month.'
        },
        {
            slug: 'date-picker-months',
            name: 'DatePickerMonths',
            descriptionKey: 'components.catalog.date_picker_months.description',
            descriptionFallback: 'Month-grid view for picking a month within the current year.'
        },
        {
            slug: 'date-picker-years',
            name: 'DatePickerYears',
            descriptionKey: 'components.catalog.date_picker_years.description',
            descriptionFallback: 'Scrollable year list for picking a year.'
        }
    ],

    related: [
        {
            slug: 'date-picker-field',
            name: 'DatePickerField',
            kind: 'component',
            descriptionKey: 'components.catalog.date_picker_field.description',
            descriptionFallback: 'TextField + DatePicker dropdown in a single field component.'
        },
        {
            slug: 'menu',
            name: 'Menu',
            kind: 'component',
            descriptionKey: 'components.catalog.menu.description',
            descriptionFallback: 'Popup overlay used by DatePickerField to position the calendar.'
        }
    ],

    props: [
        {
            name: 'modelValue',
            type: { label: 'string | Date | Array<string | Date>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker.props.model_value.description',
            descriptionFallback: 'Selected date(s). Single value for single mode; array for multiple or range mode.'
        },
        // ── IDatePickerMonthProps ──────────────────────────────────────
        {
            name: 'multiple',
            type: { label: 'boolean | number', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker.props.multiple.description',
            descriptionFallback: 'Enables multi-date selection. Pass a number to limit how many dates can be selected.'
        },
        {
            name: 'range',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker.props.range.description',
            descriptionFallback: 'Enables date-range selection mode (start date + end date). modelValue should be an array of two dates.'
        },
        {
            name: 'showWeek',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker.props.show_week.description',
            descriptionFallback: 'Shows week numbers in the first column of the day grid.'
        },
        {
            name: 'hideWeekdays',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker.props.hide_weekdays.description',
            descriptionFallback: 'Hides the weekday labels (Mon, Tue…) above the day grid.'
        },
        // ── IDatePickerControlsProps ───────────────────────────────────
        {
            name: 'viewMode',
            type: { label: 'TDateMode', slug: 'date-mode', kind: 'type' },
            defaultValue: "'month'",
            descriptionKey: 'components.date_picker.props.view_mode.description',
            descriptionFallback: "Current calendar view. 'month' shows day grid; 'months' shows month grid; 'year' shows year list."
        },
        // ── IDatePickerMonthsProps / IDatePickerYearsProps ─────────────
        {
            name: 'min',
            type: { label: 'string | Date', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker.props.min.description',
            descriptionFallback: 'Minimum selectable date. Dates before this value are disabled.'
        },
        {
            name: 'max',
            type: { label: 'string | Date', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker.props.max.description',
            descriptionFallback: 'Maximum selectable date. Dates after this value are disabled.'
        },
        // ── IPickerProps ───────────────────────────────────────────────
        {
            name: 'landscape',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker.props.landscape.description',
            descriptionFallback: 'Displays the header on the left side and the calendar on the right (landscape orientation).'
        },
        {
            name: 'hideHeader',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker.props.hide_header.description',
            descriptionFallback: 'Hides the coloured header strip showing the selected date.'
        },
        {
            name: 'title',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker.props.title.description',
            descriptionFallback: 'Override text shown in the picker header.'
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker.props.color.description',
            descriptionFallback: 'Intent or custom colour used for the selected day/month/year and the header background.'
        },
        // ── IBorderProps / IRoundedProps / IElevationProps ─────────────
        {
            name: 'border',
            type: { label: 'boolean | string', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker.props.border.description',
            descriptionFallback: 'Applies a border around the picker surface.'
        },
        {
            name: 'rounded',
            type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' },
            defaultValue: "'md'",
            descriptionKey: 'components.date_picker.props.rounded.description',
            descriptionFallback: 'Border-radius of the picker surface.'
        },
        {
            name: 'elevation',
            type: { label: 'string | number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker.props.elevation.description',
            descriptionFallback: 'Box-shadow elevation of the picker surface.'
        }
    ],

    emits: [
        {
            event: 'update:modelValue',
            payload: { label: 'string | Date | Array<string | Date>', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker.emits.update_model_value.description',
            descriptionFallback: 'Fired when the selected date(s) change.'
        },
        {
            event: 'update:month',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker.emits.update_month.description',
            descriptionFallback: 'Fired when the displayed month changes via navigation.'
        },
        {
            event: 'update:year',
            payload: { label: 'number', slug: '', kind: 'primitive' },
            descriptionKey: 'components.date_picker.emits.update_year.description',
            descriptionFallback: 'Fired when the displayed year changes via navigation.'
        },
        {
            event: 'update:viewMode',
            payload: { label: 'TDateMode', slug: 'date-mode', kind: 'type' },
            descriptionKey: 'components.date_picker.emits.update_view_mode.description',
            descriptionFallback: 'Fired when the view changes (month → months → year → month).'
        }
    ],

    slots: [
        {
            slot: 'title',
            slotProps: '—',
            descriptionKey: 'components.date_picker.slots.title.description',
            descriptionFallback: 'Custom title rendered inside the picker header strip.'
        },
        {
            slot: 'header',
            slotProps: '{ header: string, … }',
            descriptionKey: 'components.date_picker.slots.header.description',
            descriptionFallback: 'Full override of the header area. Replaces OrigamDatePickerHeader. Receives header text and click handler as slot props.'
        },
        {
            slot: 'default',
            slotProps: '—',
            descriptionKey: 'components.date_picker.slots.default.description',
            descriptionFallback: 'Full override of the calendar body (controls + day/month/year grid). Use for deeply customised pickers.'
        },
        {
            slot: 'actions',
            slotProps: '—',
            descriptionKey: 'components.date_picker.slots.actions.description',
            descriptionFallback: 'Action buttons rendered below the calendar. Common use: "Cancel" and "OK" buttons to confirm the selection.'
        }
    ],

    examples: [
        {
            titleKey: 'components.date_picker.examples.basic.title',
            titleFallback: 'Single date',
            lang: 'vue',
            code: `<template>
  <origam-date-picker v-model="date" />
  <p>Selected: {{ date }}</p>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const date = ref<string | undefined>(undefined)
</script>`
        },
        {
            titleKey: 'components.date_picker.examples.range.title',
            titleFallback: 'Date range',
            lang: 'vue',
            code: `<template>
  <origam-date-picker v-model="dates" range />
  <p>From {{ dates[0] }} to {{ dates[1] }}</p>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const dates = ref<string[]>([])
</script>`
        },
        {
            titleKey: 'components.date_picker.examples.actions.title',
            titleFallback: 'With actions',
            lang: 'vue',
            code: `<template>
  <origam-date-picker v-model="date" color="primary">
    <template #actions>
      <origam-btn text="Cancel" variant="text" @click="date = undefined" />
      <origam-btn text="OK" color="primary" @click="confirm" />
    </template>
  </origam-date-picker>
</template>`
        }
    ],

    previewVariants: [
        { label: 'default', props: { color: 'primary' } },
        { label: 'range', props: { color: 'primary', range: true } },
        { label: 'no header', props: { color: 'primary', hideHeader: true } },
        { label: 'landscape', props: { color: 'primary', landscape: true } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-date-picker',
        svgViewBox: '0 0 700 360',
        svgTitle: 'Anatomy of OrigamDatePicker',
        svgDesc: 'Schematic of the DatePicker component with numbered internal regions.',
        svg: `
  <rect x="0" y="0" width="700" height="360" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <rect x="200" y="20" width="300" height="320" rx="10" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.1))" stroke-width="1.5"/>
  <circle cx="216" cy="28" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="216" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <rect x="200" y="20" width="300" height="64" rx="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <rect x="200" y="64" width="300" height="16" rx="0" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <circle cx="216" cy="52" r="10" fill="rgba(0,0,0,0.2)"/>
  <text x="216" y="56.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <text x="350" y="54" font-size="14" fill="#fff" text-anchor="middle" font-weight="600" font-family="system-ui">15 juin 2026</text>
  <rect x="200" y="80" width="300" height="40" rx="0" fill="none"/>
  <circle cx="216" cy="100" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="216" y="104.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <text x="244" y="104" font-size="10" fill="var(--origam-color__text---secondary, #555)" font-family="system-ui">&lt;</text>
  <text x="350" y="104" font-size="11" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui" font-weight="600">Juin 2026</text>
  <text x="454" y="104" font-size="10" fill="var(--origam-color__text---secondary, #555)" font-family="system-ui">&gt;</text>
  <rect x="206" y="124" width="288" height="168" rx="4" fill="none" stroke="none"/>
  <circle cx="216" cy="132" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="216" y="136.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
  <text x="219" y="148" font-size="9" fill="var(--origam-color__text---secondary, #888)" font-family="system-ui">Lu  Ma  Me  Je  Ve  Sa  Di</text>
  <text x="219" y="170" font-size="9" fill="var(--origam-color__text---primary, #222)" font-family="system-ui"> 1   2   3   4   5   6   7</text>
  <text x="219" y="192" font-size="9" fill="var(--origam-color__text---primary, #222)" font-family="system-ui"> 8   9  10  11  12  13  14</text>
  <circle cx="282" cy="212" r="14" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="283" y="216" font-size="9" fill="#fff" text-anchor="middle">15</text>
  <text x="222" y="215" font-size="9" fill="var(--origam-color__text---primary, #222)" font-family="system-ui">16  17  18  19  20  21</text>
  <text x="219" y="236" font-size="9" fill="var(--origam-color__text---primary, #222)" font-family="system-ui">22  23  24  25  26  27  28</text>
  <text x="219" y="258" font-size="9" fill="var(--origam-color__text---primary, #222)" font-family="system-ui">29  30</text>
  <rect x="200" y="300" width="300" height="40" rx="0" fill="var(--origam-color__surface---sunken, #f9f9f9)" stroke="none"/>
  <line x1="200" y1="300" x2="500" y2="300" stroke="var(--origam-color__border---subtle, rgba(0,0,0,0.1))" stroke-width="1"/>
  <circle cx="216" cy="320" r="10" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="216" y="324.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">5</text>
  <text x="420" y="324" font-size="10" fill="var(--origam-color__text---secondary, #666)" font-family="system-ui">Cancel</text>
  <text x="468" y="324" font-size="10" fill="var(--origam-color__action--primary---bg, #7c3aed)" font-family="system-ui" font-weight="700">OK</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-date-picker&gt;</code> — 5 regions: root ①, header strip ②, navigation controls ③, day grid ④, and optional actions ⑤.`,
        legend: [
            {
                num: 1,
                cls: '.origam-date-picker',
                descriptionKey: 'components.date_picker.anatomy.root',
                descriptionFallback: 'Root element. Fixed width 328px (368px with showWeek). Built on OrigamPicker with overflow:hidden. Modifier --year / --months applied while switching view.'
            },
            {
                num: 2,
                cls: 'OrigamDatePickerHeader',
                descriptionKey: 'components.date_picker.anatomy.header',
                descriptionFallback: 'Coloured header strip (background from header.background-color token = color.action.primary.bg). Shows the selected date. Hidden via hideHeader prop. Replaced by the #header slot.'
            },
            {
                num: 3,
                cls: 'OrigamDatePickerControls',
                descriptionKey: 'components.date_picker.anatomy.controls',
                descriptionFallback: 'Navigation bar with prev/next arrow buttons and a text button that toggles between month, months and year views.'
            },
            {
                num: 4,
                cls: 'OrigamDatePickerMonth',
                descriptionKey: 'components.date_picker.anatomy.month',
                descriptionFallback: 'Day-grid view. Weekday labels row + 6 rows of day buttons. Day cells use day.size (40px) and day.border-radius (full). Animated via OrigamFade when switching views.'
            },
            {
                num: 5,
                cls: '#actions slot',
                descriptionKey: 'components.date_picker.anatomy.actions',
                descriptionFallback: 'Optional action buttons row. Use for Cancel / OK confirmation pattern. Only rendered when the #actions slot is provided.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<origam-picker class="origam-date-picker origam-date-picker--month">
  <!-- slot: #title -->

  <!-- slot: #header → OrigamDatePickerHeader -->
  <template #header>
    <origam-date-picker-header :header="selectedDateLabel" />
  </template>

  <!-- default slot: controls + animated grid -->
  <origam-date-picker-controls @click:prev="prev" @click:next="next" @click:month="viewMonths" />

  <origam-fade>
    <!-- view: month grid -->
    <origam-date-picker-month v-model:date="model" v-model:month="month" v-model:year="year" />

    <!-- OR view: months -->
    <origam-date-picker-months v-model:month="month" :year="year" />

    <!-- OR view: years -->
    <origam-date-picker-years v-model:year="year" />
  </origam-fade>

  <!-- slot: #actions -->
  <template #actions>
    <origam-btn text="Cancel" variant="text" />
    <origam-btn text="OK" color="primary" />
  </template>
</origam-picker>`,
        classes: [
            { cls: 'origam-date-picker', descriptionKey: 'components.date_picker.anatomy.root', descriptionFallback: 'Root picker element.' },
            { cls: 'origam-date-picker--month', descriptionKey: 'components.date_picker.anatomy.month_modifier', descriptionFallback: 'Applied when viewMode="month". Modifier drives CSS transitions on sub-components.' },
            { cls: 'origam-date-picker--show-week', descriptionKey: 'components.date_picker.anatomy.show_week_modifier', descriptionFallback: 'Applied when showWeek=true. Widens the picker to 368px.' }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-date-picker---background-color',
            defaultValue: '{color.surface.raised}',
            descriptionKey: 'components.date_picker.css_vars.background_color',
            descriptionFallback: 'Picker surface background colour.'
        },
        {
            name: '--origam-date-picker---color',
            defaultValue: '{color.text.primary}',
            descriptionKey: 'components.date_picker.css_vars.color',
            descriptionFallback: 'Picker surface foreground colour.'
        },
        {
            name: '--origam-date-picker---border-radius',
            defaultValue: '{radius.md}',
            descriptionKey: 'components.date_picker.css_vars.border_radius',
            descriptionFallback: 'Picker surface border-radius.'
        },
        {
            name: '--origam-date-picker__header---background-color',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.date_picker.css_vars.header_background_color',
            descriptionFallback: 'Header strip background (selected-date display area).'
        },
        {
            name: '--origam-date-picker__header---color',
            defaultValue: '{color.action.primary.fg}',
            descriptionKey: 'components.date_picker.css_vars.header_color',
            descriptionFallback: 'Header strip text colour.'
        },
        {
            name: '--origam-date-picker__day---size',
            defaultValue: '40px',
            descriptionKey: 'components.date_picker.css_vars.day_size',
            descriptionFallback: 'Size (width and height) of day buttons in the day grid.'
        },
        {
            name: '--origam-date-picker__day---border-radius',
            defaultValue: '{radius.full}',
            descriptionKey: 'components.date_picker.css_vars.day_border_radius',
            descriptionFallback: 'Border-radius of day buttons (full circle by default).'
        },
        {
            name: '--origam-date-picker__day---background-color-selected',
            defaultValue: '{color.action.primary.bg}',
            descriptionKey: 'components.date_picker.css_vars.day_background_color_selected',
            descriptionFallback: 'Background of the selected day button.'
        },
        {
            name: '--origam-date-picker__day---background-color-in-range',
            defaultValue: '{color.surface.overlay}',
            descriptionKey: 'components.date_picker.css_vars.day_background_color_in_range',
            descriptionFallback: 'Background of days within a selected date range.'
        },
        {
            name: '--origam-date-picker__day---color-out-of-month',
            defaultValue: '{color.text.disabled}',
            descriptionKey: 'components.date_picker.css_vars.day_color_out_of_month',
            descriptionFallback: 'Text colour of days outside the current month.'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.date_picker.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.date_picker.exposed.css',
            descriptionFallback: 'Reactive CSS string for the injected style sheet.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.date_picker.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.date_picker.exposed.load',
            descriptionFallback: 'Injects the style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.date_picker.exposed.unload',
            descriptionFallback: 'Removes the style sheet from the document.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.date_picker.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['dialog', 'grid', 'gridcell', 'button'],
        keyboard: [
            {
                key: '← / → / ↑ / ↓',
                actionKey: 'components.date_picker.a11y.key_navigate_days',
                actionFallback: 'Navigate between day cells within the grid.'
            },
            {
                key: 'Enter / Space',
                actionKey: 'components.date_picker.a11y.key_select',
                actionFallback: 'Select the focused day, month or year.'
            },
            {
                key: 'PageUp / PageDown',
                actionKey: 'components.date_picker.a11y.key_month_nav',
                actionFallback: 'Move to the previous / next month without leaving the day grid.'
            },
            {
                key: 'Home / End',
                actionKey: 'components.date_picker.a11y.key_week_edges',
                actionFallback: 'Jump to the first / last day of the current week row.'
            },
            {
                key: 'Escape',
                actionKey: 'components.date_picker.a11y.key_close',
                actionFallback: 'Close the picker (when used inside DatePickerField).'
            }
        ],
        notes: [
            {
                noteKey: 'components.date_picker.a11y.grid_note',
                noteFallback: 'The day grid uses role="grid" with role="gridcell" for each day. Disabled days have aria-disabled="true" and are skipped in keyboard navigation.'
            },
            {
                noteKey: 'components.date_picker.a11y.label_note',
                noteFallback: 'Each day button has an aria-label with the full date string (e.g. "15 juin 2026") for screen reader users.'
            },
            {
                noteKey: 'components.date_picker.a11y.reduced_motion_note',
                noteFallback: 'View-change transitions (OrigamFade) are disabled under prefers-reduced-motion: reduce.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/date-picker.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'date-picker.background-color',
                value: '{color.surface.raised}',
                type: 'color',
                descriptionKey: 'components.date_picker.tokens.background_color',
                descriptionFallback: 'Picker surface background.'
            },
            {
                tokenPath: 'date-picker.header.background-color',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.date_picker.tokens.header_background_color',
                descriptionFallback: 'Header strip background colour.'
            },
            {
                tokenPath: 'date-picker.day.size',
                value: '40px',
                type: 'dimension',
                descriptionKey: 'components.date_picker.tokens.day_size',
                descriptionFallback: 'Day button size (width and height).'
            },
            {
                tokenPath: 'date-picker.day.border-radius',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.date_picker.tokens.day_border_radius',
                descriptionFallback: 'Day button border-radius (full circle).'
            },
            {
                tokenPath: 'date-picker.day.background-color-selected',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.date_picker.tokens.day_background_color_selected',
                descriptionFallback: 'Selected day button background.'
            },
            {
                tokenPath: 'date-picker.day.background-color-in-range',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.date_picker.tokens.day_background_color_in_range',
                descriptionFallback: 'Days in range background (range mode).'
            }
        ]
    } satisfies IComponentTokens,

    playground: {
        controls: [
            {
                prop: 'color',
                kind: 'select',
                labelKey: 'components.date_picker.playground.color',
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
                prop: 'multiple',
                kind: 'switch',
                labelKey: 'components.date_picker.playground.multiple',
                labelFallback: 'Multiple',
                defaultValue: false
            },
            {
                prop: 'range',
                kind: 'switch',
                labelKey: 'components.date_picker.playground.range',
                labelFallback: 'Range',
                defaultValue: false
            },
            {
                prop: 'hideHeader',
                kind: 'switch',
                labelKey: 'components.date_picker.playground.hide_header',
                labelFallback: 'Hide header',
                defaultValue: false
            },
            {
                prop: 'showWeek',
                kind: 'switch',
                labelKey: 'components.date_picker.playground.show_week',
                labelFallback: 'Show week numbers',
                defaultValue: false
            },
            {
                prop: 'landscape',
                kind: 'switch',
                labelKey: 'components.date_picker.playground.landscape',
                labelFallback: 'Landscape',
                defaultValue: false
            }
        ]
    } satisfies IComponentPlayground
}
