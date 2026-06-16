/**
 * /components/date-picker-month — full documentation data for OrigamDatePickerMonth.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/DatePicker/date-picker-month.interface.ts  (props)
 *   - packages/ds/src/interfaces/Commons/calendar.interface.ts              (ICalendarProps)
 *   - packages/ds/src/components/DatePicker/OrigamDatePickerMonth.vue       (template BEM, defineExpose)
 *   - packages/ds/tokens/component/date-picker.json                         (CSS tokens — shared with DatePicker)
 *
 * FAMILY: DatePicker folder — sub-component of date-picker.
 */
import type {
    IComponentDoc,
    IComponentAnatomy,
    IComponentCssVar,
    IComponentExposed,
    IComponentA11y,
    IComponentTokens,
    IComponentAnatomyLegendItem
} from '~/interfaces/components-catalog.interface'

export const DATE_PICKER_MONTH_DOC: IComponentDoc = {
    slug: 'date-picker-month',
    name: 'DatePickerMonth',
    tag: 'origam-date-picker-month',
    icon: 'mdi-calendar-month',
    category: 'Form & Input',
    descriptionKey: 'components.catalog.date_picker_month.description',
    descriptionFallback: 'Day-grid view for picking a date within the current month. Renders weekday labels and day buttons with single, multiple and range selection support.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-datepicker--design',
    docUrl: 'http://localhost:4000/components/DatePicker/OrigamDatePickerMonth',

    parentSlug: 'date-picker',

    family: [
        {
            slug: 'date-picker',
            name: 'DatePicker',
            descriptionKey: 'components.catalog.date_picker.description',
            descriptionFallback: 'Calendar popup to select a single date, multiple dates or a range.'
        },
        {
            slug: 'date-picker-controls',
            name: 'DatePickerControls',
            descriptionKey: 'components.catalog.date_picker_controls.description',
            descriptionFallback: 'Navigation bar with prev/next and view-mode toggle buttons.'
        },
        {
            slug: 'date-picker-header',
            name: 'DatePickerHeader',
            descriptionKey: 'components.catalog.date_picker_header.description',
            descriptionFallback: 'Coloured header strip showing the selected date or month.'
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
        }
    ],

    props: [
        // ── IDatePickerMonthProps own ──────────────────────────────────
        {
            name: 'hideWeekdays',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_month.props.hide_weekdays.description',
            descriptionFallback: 'Hides the weekday label row (Mon, Tue…) above the day grid.'
        },
        {
            name: 'multiple',
            type: { label: 'boolean | number', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_month.props.multiple.description',
            descriptionFallback: 'Enables multi-date selection. Pass a number to cap the maximum selectable dates.'
        },
        {
            name: 'range',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_month.props.range.description',
            descriptionFallback: 'Enables date-range selection mode. Shift-click selects the range; Ctrl/Cmd-click adds individual dates.'
        },
        {
            name: 'showWeek',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_month.props.show_week.description',
            descriptionFallback: 'Shows ISO week numbers in an extra column on the left of the grid.'
        },
        {
            name: 'transition',
            type: { label: 'TTransitionProps', slug: '', kind: 'primitive' },
            defaultValue: 'OrigamTranslatePicker',
            descriptionKey: 'components.date_picker_month.props.transition.description',
            descriptionFallback: 'Enter transition when navigating forward through months.'
        },
        {
            name: 'reverseTransition',
            type: { label: 'TTransitionProps', slug: '', kind: 'primitive' },
            defaultValue: 'OrigamReverseTranslatePicker',
            descriptionKey: 'components.date_picker_month.props.reverse_transition.description',
            descriptionFallback: 'Enter transition when navigating backward through months.'
        },
        // ── ICalendarProps ─────────────────────────────────────────────
        {
            name: 'month',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.date_picker_month.props.month.description',
            descriptionFallback: 'Zero-based month index (0 = January, 11 = December) currently displayed.'
        },
        {
            name: 'year',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            required: true,
            descriptionKey: 'components.date_picker_month.props.year.description',
            descriptionFallback: 'Four-digit year currently displayed.'
        },
        {
            name: 'date',
            type: { label: 'Array<unknown>', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_month.props.date.description',
            descriptionFallback: 'Array of currently selected dates. Passed down from the parent DatePicker model.'
        },
        {
            name: 'min',
            type: { label: 'string | Date', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_month.props.min.description',
            descriptionFallback: 'Minimum selectable date. Days before this value are rendered as disabled.'
        },
        {
            name: 'max',
            type: { label: 'string | Date', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_month.props.max.description',
            descriptionFallback: 'Maximum selectable date. Days after this value are rendered as disabled.'
        },
        {
            name: 'allowedDates',
            type: { label: 'Array<unknown> | ((date: unknown) => boolean)', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_month.props.allowed_dates.description',
            descriptionFallback: 'Allowlist of selectable dates. Pass an array or a predicate function — other days are disabled.'
        },
        {
            name: 'showAdjacentMonths',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.date_picker_month.props.show_adjacent_months.description',
            descriptionFallback: 'Shows days from the previous and next months in the first and last rows. Adjacent days are faded (opacity: 0.5).'
        },
        {
            name: 'weekdays',
            type: { label: 'Array<number>', slug: '', kind: 'primitive' },
            defaultValue: '[0, 1, 2, 3, 4, 5, 6]',
            descriptionKey: 'components.date_picker_month.props.weekdays.description',
            descriptionFallback: 'Array of day indices (0 = Sunday) that define the column order of the grid.'
        },
        {
            name: 'firstDayOfWeek',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_month.props.first_day_of_week.description',
            descriptionFallback: 'First day of the week (0 = Sunday, 1 = Monday…). Defaults to the locale setting.'
        },
        {
            name: 'weeksInMonth',
            type: { label: 'TCalendarStrategy', slug: '', kind: 'primitive' },
            defaultValue: "'dynamic'",
            descriptionKey: 'components.date_picker_month.props.weeks_in_month.description',
            descriptionFallback: "Strategy for row count: 'dynamic' adapts to the month (4–6 rows); 'static' always renders 6 rows."
        },
        // ── IColorProps ────────────────────────────────────────────────
        {
            name: 'color',
            type: { label: 'TColor', slug: 'color', kind: 'type' },
            defaultValue: 'undefined',
            descriptionKey: 'components.date_picker_month.props.color.description',
            descriptionFallback: 'Intent or custom colour used for the selected day button background.'
        }
    ],

    emits: [],

    slots: [
        {
            slot: 'days',
            slotProps: '{ props, item, index }',
            descriptionKey: 'components.date_picker_month.slots.days.description',
            descriptionFallback: 'Custom day cell content. Slot props expose the click handler (props.onClick), the day descriptor (item: IDay) and its grid index.'
        }
    ],

    examples: [
        {
            titleKey: 'components.date_picker_month.examples.basic.title',
            titleFallback: 'Standalone month grid',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-month
    v-model:date="selectedDates"
    :month="currentMonth"
    :year="currentYear"
    color="primary"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const selectedDates = ref([])
  const currentMonth = ref(new Date().getMonth())
  const currentYear = ref(new Date().getFullYear())
</script>`
        },
        {
            titleKey: 'components.date_picker_month.examples.range.title',
            titleFallback: 'Range selection',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-month
    v-model:date="range"
    :month="5"
    :year="2026"
    range
    color="primary"
  />
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  const range = ref([])
</script>`
        },
        {
            titleKey: 'components.date_picker_month.examples.custom_day.title',
            titleFallback: 'Custom day cell via #days slot',
            lang: 'vue',
            code: `<template>
  <origam-date-picker-month :month="5" :year="2026">
    <template #days="{ item, props }">
      <origam-btn
        v-bind="props"
        :text="item.localized"
        :color="item.isToday ? 'warning' : undefined"
        icon
      />
    </template>
  </origam-date-picker-month>
</template>`
        }
    ],

    anatomy: {
        rootClass: 'origam-date-picker-month',
        svgViewBox: '0 0 700 280',
        svgTitle: 'Anatomy of OrigamDatePickerMonth',
        svgDesc: 'Schematic of the DatePickerMonth component showing weekday labels, day cells and week numbers column.',
        svg: `
  <rect x="0" y="0" width="700" height="280" fill="var(--origam-color__surface---sunken, #f9fafb)" rx="4"/>
  <!-- root -->
  <rect x="40" y="20" width="620" height="240" rx="6" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <!-- week numbers column -->
  <rect x="40" y="20" width="52" height="240" rx="6" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.05))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.2))" stroke-width="1" stroke-dasharray="4 2"/>
  <text x="66" y="50" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Wk</text>
  <text x="66" y="80"  font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">22</text>
  <text x="66" y="110" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">23</text>
  <text x="66" y="140" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">24</text>
  <text x="66" y="170" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">25</text>
  <text x="66" y="200" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">26</text>
  <!-- days grid -->
  <rect x="96" y="20" width="564" height="240" rx="0" fill="none"/>
  <!-- weekday header row -->
  <rect x="96" y="20" width="564" height="36" rx="0" fill="var(--origam-color__action--primary---bgSubtle, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---default, rgba(168,85,247,0.15))" stroke-width="1"/>
  <text x="378" y="42" font-size="9" fill="var(--origam-color__text---secondary, #5b3e8c)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Lu  Ma  Me  Je  Ve  Sa  Di</text>
  <!-- day cells sample -->
  <text x="378" y="76"  font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui"> 1   2   3   4   5   6   7</text>
  <text x="378" y="106" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui"> 8   9  10  11  12  13  14</text>
  <!-- selected day -->
  <circle cx="312" cy="135" r="14" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="312" y="139" font-size="9" fill="#fff" text-anchor="middle">15</text>
  <text x="386" y="140" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">16  17  18  19  20  21</text>
  <text x="378" y="170" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">22  23  24  25  26  27  28</text>
  <text x="346" y="200" font-size="9" fill="var(--origam-color__text---primary, #222)" text-anchor="middle" font-family="system-ui">29  30</text>
  <!-- adjacent days faded -->
  <text x="430" y="200" font-size="9" fill="var(--origam-color__text---disabled, #aaa)" text-anchor="middle" font-family="system-ui" opacity="0.5"> 1   2   3   4</text>
  <!-- markers -->
  <circle cx="48" cy="28" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="48" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="104" cy="28" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="104" y="32.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="104" cy="56" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="104" y="60.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="312" cy="118" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="312" y="122.5" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: `Anatomy of <code>&lt;origam-date-picker-month&gt;</code> — 4 parts: ① root wrapper, ② week-numbers column (showWeek), ③ weekday header row, ④ day button cells.`,
        legend: [
            {
                num: 1,
                cls: '.origam-date-picker-month',
                descriptionKey: 'components.date_picker_month.anatomy.root',
                descriptionFallback: 'Root flex container. Display: flex, padding: 0 12px 8px. Hosts the weeks column and the days grid side by side.'
            },
            {
                num: 2,
                cls: '.origam-date-picker-month__weeks',
                descriptionKey: 'components.date_picker_month.anatomy.weeks',
                descriptionFallback: 'Optional week-numbers column. Visible when showWeek=true. Uses grid-template-rows: repeat(7, 1fr).'
            },
            {
                num: 3,
                cls: '.origam-date-picker-month__weekday',
                descriptionKey: 'components.date_picker_month.anatomy.weekday',
                descriptionFallback: 'Weekday label cell (Mon, Tue…). Font-size 0.85rem. Hidden when hideWeekdays=true.'
            },
            {
                num: 4,
                cls: '.origam-date-picker-month__day',
                descriptionKey: 'components.date_picker_month.anatomy.day',
                descriptionFallback: 'Day cell. 40×40px. Contains the day button. Modifiers: --selected, --today, --adjacent, --hide-adjacent, --week-start, --week-end.'
            }
        ] satisfies IComponentAnatomyLegendItem[],
        code: `<div class="origam-date-picker-month">
  <!-- optional week numbers column (showWeek=true) -->
  <div class="origam-date-picker-month__weeks">
    <div class="origam-date-picker-month__day">&nbsp;</div>
    <div class="origam-date-picker-month__day origam-date-picker-month__day--adjacent">
      <span>22</span>
    </div>
    <!-- … -->
  </div>

  <!-- animated day grid (OrigamTransition wraps the inner div) -->
  <div class="origam-date-picker-month__days">
    <!-- weekday headers (hidden when hideWeekdays=true) -->
    <div class="origam-date-picker-month__day origam-date-picker-month__weekday">
      <span>Lu</span>
    </div>
    <!-- … -->

    <!-- day cell -->
    <div class="origam-date-picker-month__day origam-date-picker-month__day--selected">
      <origam-btn
        class="origam-date-picker-month__day-btn"
        :active="item.isSelected"
        :border="item.isToday"
        icon
        :text="item.localized"
      />
    </div>
  </div>
</div>`,
        classes: [
            {
                cls: 'origam-date-picker-month',
                descriptionKey: 'components.date_picker_month.anatomy.root',
                descriptionFallback: 'Root flex container.'
            },
            {
                cls: 'origam-date-picker-month__weeks',
                descriptionKey: 'components.date_picker_month.anatomy.weeks',
                descriptionFallback: 'Week-numbers column (showWeek=true).'
            },
            {
                cls: 'origam-date-picker-month__days',
                descriptionKey: 'components.date_picker_month.anatomy.days',
                descriptionFallback: 'Day grid — 7-column CSS grid.'
            },
            {
                cls: 'origam-date-picker-month__weekday',
                descriptionKey: 'components.date_picker_month.anatomy.weekday',
                descriptionFallback: 'Weekday label header cell.'
            },
            {
                cls: 'origam-date-picker-month__day',
                descriptionKey: 'components.date_picker_month.anatomy.day',
                descriptionFallback: 'Day wrapper cell. 40×40px.'
            },
            {
                cls: 'origam-date-picker-month__day--selected',
                descriptionKey: 'components.date_picker_month.anatomy.day_selected',
                descriptionFallback: 'Applied when the day is part of the current selection.'
            },
            {
                cls: 'origam-date-picker-month__day--today',
                descriptionKey: 'components.date_picker_month.anatomy.day_today',
                descriptionFallback: 'Applied when the day is today. The inner button receives border=true.'
            },
            {
                cls: 'origam-date-picker-month__day--adjacent',
                descriptionKey: 'components.date_picker_month.anatomy.day_adjacent',
                descriptionFallback: 'Days from the previous or next month. Opacity 0.5.'
            },
            {
                cls: 'origam-date-picker-month__day--hide-adjacent',
                descriptionKey: 'components.date_picker_month.anatomy.day_hide_adjacent',
                descriptionFallback: 'Adjacent days rendered invisible (opacity 0) when showAdjacentMonths=false.'
            },
            {
                cls: 'origam-date-picker-month__day-btn',
                descriptionKey: 'components.date_picker_month.anatomy.day_btn',
                descriptionFallback: 'Inner OrigamBtn inside each day cell. Height 24px, font-size 0.85rem.'
            }
        ]
    } satisfies IComponentAnatomy,

    cssVars: [
        {
            name: '--origam-date-picker-month-day-diff',
            defaultValue: '4px',
            descriptionKey: 'components.date_picker_month.css_vars.day_diff',
            descriptionFallback: 'Gap used to offset the range-selection pseudo-element (::before/::after) on selected day cells.'
        },
        {
            name: '--origam-btn---height',
            defaultValue: '24px',
            descriptionKey: 'components.date_picker_month.css_vars.btn_height',
            descriptionFallback: 'Height of the inner day button (overridden from the default btn height via :deep selector).'
        }
    ] satisfies IComponentCssVar[],

    exposed: [
        {
            name: 'filterProps',
            type: '<T extends object>(props: T, exclude?: string[]) => Partial<T>',
            descriptionKey: 'components.date_picker_month.exposed.filter_props',
            descriptionFallback: 'Utility to forward a filtered subset of props to child components.'
        },
        {
            name: 'css',
            type: 'Ref<string>',
            descriptionKey: 'components.date_picker_month.exposed.css',
            descriptionFallback: 'Reactive CSS string generated by useStyle.'
        },
        {
            name: 'id',
            type: 'string',
            descriptionKey: 'components.date_picker_month.exposed.id',
            descriptionFallback: 'Unique style-sheet ID for this instance.'
        },
        {
            name: 'load',
            type: '() => void',
            descriptionKey: 'components.date_picker_month.exposed.load',
            descriptionFallback: 'Injects the computed style sheet into the document.'
        },
        {
            name: 'unload',
            type: '() => void',
            descriptionKey: 'components.date_picker_month.exposed.unload',
            descriptionFallback: 'Removes the injected style sheet from the document.'
        },
        {
            name: 'isLoaded',
            type: 'Ref<boolean>',
            descriptionKey: 'components.date_picker_month.exposed.is_loaded',
            descriptionFallback: 'True once the style sheet has been injected.'
        }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['gridcell', 'button'],
        keyboard: [
            {
                key: 'Enter / Space',
                actionKey: 'components.date_picker_month.a11y.key_select',
                actionFallback: 'Selects the focused day.'
            },
            {
                key: 'Shift + Click',
                actionKey: 'components.date_picker_month.a11y.key_range',
                actionFallback: 'Selects a date range when multiple or range prop is active.'
            },
            {
                key: 'Ctrl / Cmd + Click',
                actionKey: 'components.date_picker_month.a11y.key_multi',
                actionFallback: 'Adds or removes a date from the selection when multiple is active.'
            }
        ],
        notes: [
            {
                noteKey: 'components.date_picker_month.a11y.disabled_note',
                noteFallback: 'Disabled day buttons receive the disabled attribute. Days outside the allowed range are also disabled.'
            },
            {
                noteKey: 'components.date_picker_month.a11y.today_note',
                noteFallback: 'Today\'s cell receives border=true on the inner button, providing a visual ring without relying solely on colour.'
            }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/date-picker.json',
        pipelineNote: 'Tokens are shared with the parent DatePicker component. Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            {
                tokenPath: 'date-picker.day.size',
                value: '40px',
                type: 'dimension',
                descriptionKey: 'components.date_picker_month.tokens.day_size',
                descriptionFallback: 'Day cell size (height and width).'
            },
            {
                tokenPath: 'date-picker.day.border-radius',
                value: '{radius.full}',
                type: 'dimension',
                descriptionKey: 'components.date_picker_month.tokens.day_border_radius',
                descriptionFallback: 'Day button border-radius (full circle by default).'
            },
            {
                tokenPath: 'date-picker.day.background-color-selected',
                value: '{color.action.primary.bg}',
                type: 'color',
                descriptionKey: 'components.date_picker_month.tokens.day_selected_bg',
                descriptionFallback: 'Selected day background colour.'
            },
            {
                tokenPath: 'date-picker.day.background-color-in-range',
                value: '{color.surface.overlay}',
                type: 'color',
                descriptionKey: 'components.date_picker_month.tokens.day_in_range_bg',
                descriptionFallback: 'Background of cells within a date-range selection.'
            }
        ]
    } satisfies IComponentTokens
}
