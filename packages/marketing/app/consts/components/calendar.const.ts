/**
 * /components/calendar — full documentation data for OrigamCalendar.
 *
 * SOURCE OF TRUTH:
 *   - packages/ds/src/interfaces/Calendar/calendar.interface.ts  (props + emits + slots)
 *   - packages/ds/src/components/Calendar/OrigamCalendar.vue     (template BEM, defineExpose)
 *   - packages/ds/tokens/component/calendar.json                 (CSS tokens)
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

export const CALENDAR_DOC: IComponentDoc = {
    slug: 'calendar',
    name: 'Calendar',
    tag: 'origam-calendar',
    icon: 'mdi-calendar',
    category: 'Data Display',
    descriptionKey: 'components.catalog.calendar.description',
    descriptionFallback: 'Full-featured calendar with month, week, day and agenda views, drag-select, event colouring by category and v-model bindings.',
    packageNote: 'origam',
    storyUrl: 'http://localhost:6006/?story=components-calendar--design',
    docUrl: 'http://localhost:4000/components/Calendar/OrigamCalendar',

    family: [],

    related: [
        { slug: 'date-picker', name: 'DatePicker', kind: 'component', descriptionFallback: 'Compact single-date or date-range picker.', descriptionKey: 'components.catalog.date_picker.description' }
    ],

    props: [
        {
            name: 'view',
            type: { label: 'TCalendarView', slug: 'calendar-view', kind: 'type' },
            defaultValue: "'month'",
            descriptionKey: 'components.calendar.props.view.description',
            descriptionFallback: 'Active view mode: "month", "week", "day" or "agenda". Supports v-model:view.'
        },
        {
            name: 'currentDate',
            type: { label: 'Date | string', slug: '', kind: 'primitive' },
            defaultValue: 'new Date()',
            descriptionKey: 'components.calendar.props.current_date.description',
            descriptionFallback: 'Anchor date. The calendar renders the period containing this date. Supports v-model:currentDate.'
        },
        {
            name: 'events',
            type: { label: 'Array<IEvent>', slug: '', kind: 'primitive' },
            defaultValue: '[]',
            descriptionKey: 'components.calendar.props.events.description',
            descriptionFallback: 'Event list. Recurring events are expanded internally. Each event requires id, title, start and end fields.'
        },
        {
            name: 'firstDayOfWeek',
            type: { label: '0 | 1 | 2 | 3 | 4 | 5 | 6', slug: '', kind: 'primitive' },
            defaultValue: '1',
            descriptionKey: 'components.calendar.props.first_day_of_week.description',
            descriptionFallback: 'First weekday rendered as the leftmost column. 1 (Monday) for EU/ISO, 0 (Sunday) for US locales.'
        },
        {
            name: 'timeFormat',
            type: { label: 'TCalendarTimeFormat', slug: 'calendar-time-format', kind: 'type' },
            defaultValue: "'24h'",
            descriptionKey: 'components.calendar.props.time_format.description',
            descriptionFallback: 'Clock format for timeline hour labels: "24h" or "12h".'
        },
        {
            name: 'locale',
            type: { label: 'string', slug: '', kind: 'primitive' },
            defaultValue: 'navigator.language',
            descriptionKey: 'components.calendar.props.locale.description',
            descriptionFallback: 'BCP 47 locale tag driving weekday and month names (e.g. "fr-FR", "en-US").'
        },
        {
            name: 'selectable',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.calendar.props.selectable.description',
            descriptionFallback: 'Enable drag-select on the month grid and timeline slots. Fires range-select and create-event-request emits.'
        },
        {
            name: 'eventColorKey',
            type: { label: "'category' | 'color' | string", slug: '', kind: 'primitive' },
            defaultValue: "'category'",
            descriptionKey: 'components.calendar.props.event_color_key.description',
            descriptionFallback: 'Which IEvent property to read for colouring. "category" uses categoryColors map; "color" reads the event.color directly.'
        },
        {
            name: 'categoryColors',
            type: { label: 'Record<string, TIntent | string>', slug: '', kind: 'primitive' },
            defaultValue: '{}',
            descriptionKey: 'components.calendar.props.category_colors.description',
            descriptionFallback: 'Map of category string to intent token or CSS colour (e.g. { work: "primary", personal: "success" }).'
        },
        {
            name: 'weekendHighlight',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'true',
            descriptionKey: 'components.calendar.props.weekend_highlight.description',
            descriptionFallback: 'Tint Saturday and Sunday cells in month and week views with the surface.sunken background.'
        },
        {
            name: 'showWeekNumbers',
            type: { label: 'boolean', slug: '', kind: 'primitive' },
            defaultValue: 'false',
            descriptionKey: 'components.calendar.props.show_week_numbers.description',
            descriptionFallback: 'Render a leading ISO week-number column. Useful for project or billing calendars.'
        },
        {
            name: 'dayStartHour',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '0',
            descriptionKey: 'components.calendar.props.day_start_hour.description',
            descriptionFallback: 'First hour rendered in week/day timeline views.'
        },
        {
            name: 'dayEndHour',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '24',
            descriptionKey: 'components.calendar.props.day_end_hour.description',
            descriptionFallback: 'Last hour rendered in week/day timeline views.'
        },
        {
            name: 'slotDuration',
            type: { label: 'number', slug: '', kind: 'primitive' },
            defaultValue: '30',
            descriptionKey: 'components.calendar.props.slot_duration.description',
            descriptionFallback: 'Minutes per timeline row. 30 for half-hour granularity, 15 for fine-grained drag-create, 60 for compact.'
        },
        {
            name: 'minDate',
            type: { label: 'Date | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.calendar.props.min_date.description',
            descriptionFallback: 'Lower navigation bound. The prev toolbar button is disabled when the current date would go below this.'
        },
        {
            name: 'maxDate',
            type: { label: 'Date | string', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.calendar.props.max_date.description',
            descriptionFallback: 'Upper navigation bound. The next toolbar button is disabled when the current date would exceed this.'
        },
        {
            name: 'disabledDates',
            type: { label: 'Array<Date | string> | ((d: Date) => boolean)', slug: '', kind: 'primitive' },
            defaultValue: 'undefined',
            descriptionKey: 'components.calendar.props.disabled_dates.description',
            descriptionFallback: 'Dates to grey out. Accepts an array of Date/ISO strings or a predicate function for dynamic rules.'
        },
        { name: 'color', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.calendar.props.color.description', descriptionFallback: 'Intent or custom foreground color.' },
        { name: 'bgColor', type: { label: 'TColor', slug: 'color', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.calendar.props.bg_color.description', descriptionFallback: 'Background color override.' },
        { name: 'rounded', type: { label: 'TRounded | boolean', slug: 'rounded', kind: 'type' }, defaultValue: 'undefined', descriptionKey: 'components.calendar.props.rounded.description', descriptionFallback: 'Border-radius token or boolean.' },
        { name: 'elevation', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.calendar.props.elevation.description', descriptionFallback: 'Box-shadow elevation token.' },
        { name: 'border', type: { label: 'boolean | string', slug: '', kind: 'primitive' }, defaultValue: 'false', descriptionKey: 'components.calendar.props.border.description', descriptionFallback: 'Applies a border to the calendar container.' },
        { name: 'density', type: { label: 'TDensity', slug: 'density', kind: 'type' }, defaultValue: "'default'", descriptionKey: 'components.calendar.props.density.description', descriptionFallback: 'Density modifier.' },
        { name: 'width', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.calendar.props.width.description', descriptionFallback: 'Calendar container width.' },
        { name: 'height', type: { label: 'string | number', slug: '', kind: 'primitive' }, defaultValue: 'undefined', descriptionKey: 'components.calendar.props.height.description', descriptionFallback: 'Calendar container height.' }
    ],

    emits: [
        { event: 'update:view', payload: { label: 'TCalendarView', slug: 'calendar-view', kind: 'type' }, descriptionKey: 'components.calendar.emits.update_view.description', descriptionFallback: 'Fired when the user switches view (month/week/day/agenda). Supports v-model:view.' },
        { event: 'update:currentDate', payload: { label: 'Date', slug: '', kind: 'primitive' }, descriptionKey: 'components.calendar.emits.update_current_date.description', descriptionFallback: 'Fired when the anchor date changes via navigation. Supports v-model:currentDate.' },
        { event: 'event-click', payload: { label: 'IEvent, MouseEvent', slug: '', kind: 'primitive' }, descriptionKey: 'components.calendar.emits.event_click.description', descriptionFallback: 'Fired when the user clicks an event chip or block. Payload: the event object + DOM event.' },
        { event: 'date-click', payload: { label: 'Date', slug: '', kind: 'primitive' }, descriptionKey: 'components.calendar.emits.date_click.description', descriptionFallback: 'Fired when the user clicks an empty day cell.' },
        { event: 'range-select', payload: { label: 'Date, Date', slug: '', kind: 'primitive' }, descriptionKey: 'components.calendar.emits.range_select.description', descriptionFallback: 'Fired when the user finishes a drag-select. Payload: start and end Date of the selection.' },
        { event: 'create-event-request', payload: { label: 'Date, Date', slug: '', kind: 'primitive' }, descriptionKey: 'components.calendar.emits.create_event_request.description', descriptionFallback: 'Fires alongside range-select as a semantic alias for "user wants to create an event here".' },
        { event: 'view-change', payload: { label: 'TCalendarView', slug: 'calendar-view', kind: 'type' }, descriptionKey: 'components.calendar.emits.view_change.description', descriptionFallback: 'Alias of update:view for consumers not using v-model.' },
        { event: 'navigate', payload: { label: 'TCalendarNavigate', slug: 'calendar-navigate', kind: 'type' }, descriptionKey: 'components.calendar.emits.navigate.description', descriptionFallback: 'Fired when the user clicks prev / next / today. Payload: "prev", "next" or "today".' }
    ],

    slots: [
        { slot: 'header', slotProps: '{ view, title, canPrev, canNext, setView, navigate }', descriptionKey: 'components.calendar.slots.header.description', descriptionFallback: 'Replace the entire toolbar (prev/today/next + title + view switcher).' },
        { slot: 'event', slotProps: '{ event, view, isPast, isToday }', descriptionKey: 'components.calendar.slots.event.description', descriptionFallback: 'Override event chip / block rendering for every visible event.' },
        { slot: 'day', slotProps: '{ date, events, isToday, isPast, isOutside, isWeekend, isDisabled }', descriptionKey: 'components.calendar.slots.day.description', descriptionFallback: 'Override an entire day cell in month view.' },
        { slot: 'dayHeader', slotProps: '{ date }', descriptionKey: 'components.calendar.slots.day_header.description', descriptionFallback: 'Override the day header in week view (weekday name + date number).' },
        { slot: 'empty', slotProps: '{ view }', descriptionKey: 'components.calendar.slots.empty.description', descriptionFallback: 'Shown in agenda view when there are no events in the visible range.' }
    ],

    examples: [
        {
            titleKey: 'components.calendar.examples.basic.title',
            titleFallback: 'Basic calendar',
            lang: 'vue',
            code: `<template>
  <origam-calendar
    v-model:view="view"
    v-model:current-date="currentDate"
    :events="events"
    @event-click="onEventClick"
    @date-click="onDateClick"
  />
</template>
<script setup lang="ts">
import { ref } from 'vue'
const view = ref('month')
const currentDate = ref(new Date())
const events = [
  { id: 1, title: 'Team Meeting', start: new Date(2026, 5, 16, 10), end: new Date(2026, 5, 16, 11), category: 'work' },
  { id: 2, title: 'Lunch', start: new Date(2026, 5, 18, 12), end: new Date(2026, 5, 18, 13), category: 'personal' }
]
const onEventClick = (event, domEvent) => console.log('clicked', event.title)
const onDateClick = (date) => console.log('date clicked', date)
</script>`
        },
        {
            titleKey: 'components.calendar.examples.category_colors.title',
            titleFallback: 'Category color mapping',
            lang: 'vue',
            code: `<template>
  <origam-calendar
    :events="events"
    :category-colors="{ work: 'primary', personal: 'success', holiday: 'danger' }"
    event-color-key="category"
  />
</template>`
        },
        {
            titleKey: 'components.calendar.examples.custom_event.title',
            titleFallback: 'Custom event slot',
            lang: 'vue',
            code: `<template>
  <origam-calendar :events="events">
    <template #event="{ event, isPast }">
      <div :style="{ opacity: isPast ? 0.5 : 1, background: event.color }">
        {{ event.title }}
      </div>
    </template>
  </origam-calendar>
</template>`
        }
    ],

    previewVariants: [
        { label: 'month view', props: { view: 'month' } },
        { label: 'week view', props: { view: 'week' } },
        { label: 'agenda view', props: { view: 'agenda' } }
    ] satisfies IComponentPreviewVariant[],

    anatomy: {
        rootClass: 'origam-calendar',
        svgViewBox: '0 0 700 300',
        svgTitle: 'Anatomy of OrigamCalendar',
        svgDesc: 'Schematic of the Calendar component with 5 numbered internal parts.',
        svg: `
  <rect x="0" y="0" width="700" height="300" fill="var(--origam-color__surface---sunken, #fbf5ff)" rx="4"/>
  <rect x="10" y="10" width="680" height="280" rx="8" fill="var(--origam-color__surface---raised, #fff)" stroke="var(--origam-color__action--primary---bg, #7c3aed)" stroke-width="1.5"/>
  <rect x="10" y="10" width="680" height="50" rx="4" fill="var(--origam-color__surface---overlay, rgba(124,58,237,0.04))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.25))" stroke-width="1"/>
  <text x="350" y="40" font-size="10" fill="var(--origam-color__text---secondary, #525252)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Toolbar: prev / today / next · title · view switcher</text>
  <rect x="10" y="65" width="680" height="25" rx="0" fill="var(--origam-color__surface---sunken, rgba(124,58,237,0.03))" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.15))" stroke-width="1"/>
  <text x="350" y="82" font-size="9" fill="var(--origam-color__text---tertiary, #7e5fb0)" text-anchor="middle" font-family="'JetBrains Mono',monospace">Mon · Tue · Wed · Thu · Fri · Sat · Sun</text>
  <rect x="10" y="90" width="680" height="160" rx="0" fill="var(--origam-color__surface---raised, #fff)"/>
  <line x1="107" y1="90" x2="107" y2="250" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1"/>
  <line x1="204" y1="90" x2="204" y2="250" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1"/>
  <line x1="301" y1="90" x2="301" y2="250" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1"/>
  <line x1="398" y1="90" x2="398" y2="250" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1"/>
  <line x1="495" y1="90" x2="495" y2="250" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1"/>
  <line x1="592" y1="90" x2="592" y2="250" stroke="var(--origam-color__border---subtle, rgba(168,85,247,0.2))" stroke-width="1"/>
  <rect x="204" y="140" width="96" height="16" rx="3" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="252" y="152" font-size="8" fill="#fff" text-anchor="middle" font-family="'JetBrains Mono',monospace">Team Meeting</text>
  <rect x="398" y="170" width="96" height="16" rx="3" fill="var(--origam-color__feedback--success---bg, #16a34a)"/>
  <text x="446" y="182" font-size="8" fill="#fff" text-anchor="middle" font-family="'JetBrains Mono',monospace">Lunch</text>
  <circle cx="12" cy="12" r="10" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="12" y="16" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">1</text>
  <circle cx="12" cy="67" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="12" y="71" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">2</text>
  <circle cx="12" cy="92" r="9" fill="var(--origam-color__action--primary---bg, #7c3aed)"/>
  <text x="12" y="96" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">3</text>
  <circle cx="206" cy="142" r="9" fill="var(--origam-color__action--primary---bgHover, #a855f7)"/>
  <text x="206" y="146" font-size="9" fill="#fff" text-anchor="middle" font-weight="700">4</text>
`,
        figcaption: 'Anatomy of <code>&lt;origam-calendar&gt;</code> — 4 visible parts: toolbar ①, weekday header row ②, day-cell grid ③ and event chips ④. The role="application" root handles all keyboard events via a single @keydown handler.',
        legend: [
            { num: 1, cls: '.origam-calendar__toolbar', descriptionKey: 'components.calendar.anatomy.toolbar', descriptionFallback: 'Navigation and view-switcher toolbar. role="toolbar" with aria-label. Contains prev/today/next BtnGroup and view BtnGroup.' },
            { num: 2, cls: '.origam-calendar__weekdays', descriptionKey: 'components.calendar.anatomy.weekdays', descriptionFallback: 'Weekday header row. role="row" with columnheader children. Rendered only in month view.' },
            { num: 3, cls: '.origam-calendar__month-grid', descriptionKey: 'components.calendar.anatomy.month_grid', descriptionFallback: 'Month grid with role="grid". Contains __month-row (role="row") > __day-cell (role="gridcell").' },
            { num: 4, cls: '.origam-calendar__event', descriptionKey: 'components.calendar.anatomy.event', descriptionFallback: 'Event chip (<button>) with role="button" and aria-label. Carries inline background-color from categoryColors / event.color.' }
        ] satisfies IComponentAnatomyLegendItem[],
    } satisfies IComponentAnatomy,

    cssVars: [
        { name: '--origam-calendar---background-color', defaultValue: '{color.surface.default}', descriptionKey: 'components.calendar.css_vars.background_color', descriptionFallback: 'Calendar background.' },
        { name: '--origam-calendar---color', defaultValue: '{color.text.primary}', descriptionKey: 'components.calendar.css_vars.color', descriptionFallback: 'Default text color.' },
        { name: '--origam-calendar---border-color', defaultValue: '{color.border.default}', descriptionKey: 'components.calendar.css_vars.border_color', descriptionFallback: 'Container border color.' },
        { name: '--origam-calendar---border-radius', defaultValue: '{radius.md}', descriptionKey: 'components.calendar.css_vars.border_radius', descriptionFallback: 'Container border-radius.' },
        { name: '--origam-calendar__day-cell---height', defaultValue: '120px', descriptionKey: 'components.calendar.css_vars.day_cell_height', descriptionFallback: 'Month-view day cell height.' },
        { name: '--origam-calendar__day-cell---bg-color-today', defaultValue: '{color.action.primary.bgSubtle}', descriptionKey: 'components.calendar.css_vars.today_bg', descriptionFallback: 'Background of today\'s cell.' },
        { name: '--origam-calendar__day-cell---bg-color-weekend', defaultValue: '{color.surface.sunken}', descriptionKey: 'components.calendar.css_vars.weekend_bg', descriptionFallback: 'Background of weekend cells when weekendHighlight=true.' },
        { name: '--origam-calendar__event---bg-color-default', defaultValue: '{color.action.primary.bg}', descriptionKey: 'components.calendar.css_vars.event_bg', descriptionFallback: 'Default event chip background.' },
        { name: '--origam-calendar__toolbar---background-color', defaultValue: '{color.surface.default}', descriptionKey: 'components.calendar.css_vars.toolbar_bg', descriptionFallback: 'Toolbar background.' },
        { name: '--origam-calendar__timeline---slot-height', defaultValue: '32px', descriptionKey: 'components.calendar.css_vars.slot_height', descriptionFallback: 'Height per timeline slot row (proportional to slotDuration).' }
    ] satisfies IComponentCssVar[],

    exposed: [
        { name: 'visibleDateRange', type: 'ComputedRef<{ start: Date; end: Date }>', descriptionKey: 'components.calendar.exposed.visible_date_range', descriptionFallback: 'Start and end Date of the currently rendered period (useful for fetching remote events).' },
        { name: 'expandedEvents', type: 'ComputedRef<IEvent[]>', descriptionKey: 'components.calendar.exposed.expanded_events', descriptionFallback: 'Events after recurring expansion within the visible date range.' },
        { name: 'navigate', type: '(direction: TCalendarNavigate) => void', descriptionKey: 'components.calendar.exposed.navigate', descriptionFallback: 'Programmatically navigate: "prev", "next" or "today".' },
        { name: 'setView', type: '(view: TCalendarView) => void', descriptionKey: 'components.calendar.exposed.set_view', descriptionFallback: 'Programmatically switch the view mode.' }
    ] satisfies IComponentExposed[],

    a11y: {
        roles: ['application', 'toolbar', 'grid', 'row', 'gridcell', 'columnheader', 'rowheader', 'button'],
        keyboard: [
            { key: 'Arrow keys', actionKey: 'components.calendar.a11y.key_arrows', actionFallback: 'Navigate between day cells in month view or seek in timeline views.' },
            { key: 'Tab', actionKey: 'components.calendar.a11y.key_tab', actionFallback: 'Move focus between toolbar controls and day cells.' },
            { key: 'Enter / Space', actionKey: 'components.calendar.a11y.key_activate', actionFallback: 'Activate a focused day cell (fires date-click) or event button (fires event-click).' }
        ],
        notes: [
            { noteKey: 'components.calendar.a11y.application_role', noteFallback: 'role="application" is used on the root to indicate rich interactive content to assistive technologies. The @keydown handler manages arrow navigation.' },
            { noteKey: 'components.calendar.a11y.grid_semantics', noteFallback: 'Month view uses role="grid" / role="row" / role="gridcell" for full grid semantics. Week numbers use role="rowheader".' },
            { noteKey: 'components.calendar.a11y.event_aria_label', noteFallback: 'Each event button has an aria-label describing the event title and time range.' },
            { noteKey: 'components.calendar.a11y.disabled_dates', noteFallback: 'Disabled day cells receive aria-disabled="true". Drag-select is prevented on disabled cells.' },
            { noteKey: 'components.calendar.a11y.today_cell', noteFallback: 'Today\'s cell is identified visually with a primary background tint. Consumers should add aria-label="Today" via the #day slot for full AT support.' }
        ]
    } satisfies IComponentA11y,

    tokens: {
        sourceFile: 'packages/ds/tokens/component/calendar.json',
        pipelineNote: 'Built with Style Dictionary v4 + @tokens-studio/sd-transforms.',
        excerpt: [
            { tokenPath: 'calendar.background-color', value: '{color.surface.default}', type: 'color', descriptionKey: 'components.calendar.tokens.background_color', descriptionFallback: 'Calendar background.' },
            { tokenPath: 'calendar.day-cell.height', value: '120px', type: 'dimension', descriptionKey: 'components.calendar.tokens.day_cell_height', descriptionFallback: 'Month-view day cell height.' },
            { tokenPath: 'calendar.day-cell.bg-color-today', value: '{color.action.primary.bgSubtle}', type: 'color', descriptionKey: 'components.calendar.tokens.today_bg', descriptionFallback: 'Today cell background.' },
            { tokenPath: 'calendar.event.bg-color-default', value: '{color.action.primary.bg}', type: 'color', descriptionKey: 'components.calendar.tokens.event_bg', descriptionFallback: 'Default event background.' },
            { tokenPath: 'calendar.toolbar.title-font-weight', value: '{font.weight.semibold}', type: 'fontWeight', descriptionKey: 'components.calendar.tokens.toolbar_title_weight', descriptionFallback: 'Toolbar title font weight.' },
            { tokenPath: 'calendar.timeline.slot-height', value: '32px', type: 'dimension', descriptionKey: 'components.calendar.tokens.slot_height', descriptionFallback: 'Timeline slot row height.' }
        ]
    } satisfies IComponentTokens,

    playground: {
        defaultSlotContent: undefined,
        controls: [
            { prop: 'view', kind: 'select', labelKey: 'components.calendar.playground.view', labelFallback: 'View', defaultValue: 'month', options: [{ label: 'month', value: 'month' }, { label: 'week', value: 'week' }, { label: 'day', value: 'day' }, { label: 'agenda', value: 'agenda' }] },
            { prop: 'firstDayOfWeek', kind: 'select', labelKey: 'components.calendar.playground.first_day_of_week', labelFallback: 'First day of week', defaultValue: 1, options: [{ label: 'Monday (1)', value: 1 }, { label: 'Sunday (0)', value: 0 }] },
            { prop: 'weekendHighlight', kind: 'switch', labelKey: 'components.calendar.playground.weekend_highlight', labelFallback: 'Weekend highlight', defaultValue: true },
            { prop: 'showWeekNumbers', kind: 'switch', labelKey: 'components.calendar.playground.show_week_numbers', labelFallback: 'Week numbers', defaultValue: false },
            { prop: 'selectable', kind: 'switch', labelKey: 'components.calendar.playground.selectable', labelFallback: 'Drag-select', defaultValue: true },
            { prop: 'timeFormat', kind: 'select', labelKey: 'components.calendar.playground.time_format', labelFallback: 'Time format', defaultValue: '24h', options: [{ label: '24h', value: '24h' }, { label: '12h', value: '12h' }] }
        ]
    } satisfies IComponentPlayground
}
