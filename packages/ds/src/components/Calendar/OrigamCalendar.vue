<template>
  <div
    class="origam-calendar"
    :class="rootClasses"
    :style="rootStyles"
    role="application"
    :aria-label="ariaLabel"
    data-cy="origam-calendar"
    @keydown="onKeydown"
  >
    <slot
      name="header"
      :view="resolvedView"
      :title="headerTitle"
      :can-prev="canPrev"
      :can-next="canNext"
      :set-view="onSetView"
      :navigate="onNavigate"
    >
      <div
        class="origam-calendar__toolbar"
        role="toolbar"
        :aria-label="ariaToolbarLabel"
        data-cy="origam-calendar-toolbar"
      >
        <div class="origam-calendar__toolbar-nav">
          <button
            type="button"
            class="origam-calendar__toolbar-btn"
            :aria-label="ariaPrevLabel"
            :disabled="!canPrev"
            data-cy="origam-calendar-prev"
            @click="onNavigate('prev')"
          >
            &lt;
          </button>
          <button
            type="button"
            class="origam-calendar__toolbar-btn"
            :aria-label="ariaTodayLabel"
            data-cy="origam-calendar-today"
            @click="onNavigate('today')"
          >
            {{ todayLabel }}
          </button>
          <button
            type="button"
            class="origam-calendar__toolbar-btn"
            :aria-label="ariaNextLabel"
            :disabled="!canNext"
            data-cy="origam-calendar-next"
            @click="onNavigate('next')"
          >
            &gt;
          </button>
        </div>

        <div
          class="origam-calendar__toolbar-title"
          data-cy="origam-calendar-title"
        >
          {{ headerTitle }}
        </div>

        <div
          class="origam-calendar__toolbar-views"
          role="tablist"
          :aria-label="ariaViewListLabel"
        >
          <button
            v-for="viewOption in VIEW_OPTIONS"
            :key="viewOption"
            type="button"
            class="origam-calendar__toolbar-btn origam-calendar__toolbar-btn--view"
            :class="{ 'origam-calendar__toolbar-btn--active': resolvedView === viewOption }"
            role="tab"
            :aria-selected="resolvedView === viewOption"
            :data-cy="`origam-calendar-view-${viewOption}`"
            @click="onSetView(viewOption)"
          >
            {{ viewOption }}
          </button>
        </div>
      </div>
    </slot>

    <div
      v-if="resolvedView === VIEW.MONTH"
      class="origam-calendar__body origam-calendar__body--month"
      data-cy="origam-calendar-body-month"
    >
      <div
        class="origam-calendar__weekdays"
        role="row"
      >
        <div
          v-if="showWeekNumbers"
          class="origam-calendar__weekday origam-calendar__week-number-head"
          aria-hidden="true"
        />
        <div
          v-for="weekdayName in weekdayNames"
          :key="weekdayName"
          class="origam-calendar__weekday"
          role="columnheader"
        >
          {{ weekdayName }}
        </div>
      </div>
      <div
        class="origam-calendar__month-grid"
        role="grid"
        :aria-label="ariaMonthLabel"
      >
        <div
          v-for="(weekRow, rowIndex) in monthGrid"
          :key="rowIndex"
          class="origam-calendar__month-row"
          role="row"
        >
          <div
            v-if="showWeekNumbers"
            class="origam-calendar__week-number"
            role="rowheader"
            :aria-label="ariaWeekNumberLabel(weekRow[0])"
          >
            {{ weekNumberOf(weekRow[0]) }}
          </div>
          <div
            v-for="dayCell in weekRow"
            :key="dayCell.toISOString()"
            class="origam-calendar__day-cell"
            :class="dayCellClasses(dayCell)"
            role="gridcell"
            tabindex="0"
            :aria-label="ariaDayLabel(dayCell)"
            :aria-selected="isInDragSelection(dayCell)"
            :aria-disabled="isDayDisabled(dayCell)"
            :data-cy="`origam-calendar-day-${dayCellKey(dayCell)}`"
            @click="onDayClick(dayCell, $event)"
            @mousedown="onCellMouseDown(dayCell, $event)"
            @mouseenter="onCellMouseEnter(dayCell)"
          >
            <slot
              name="day"
              :date="dayCell"
              :events="eventsOnDay(dayCell)"
              :is-today="isCellToday(dayCell)"
              :is-past="isCellPast(dayCell)"
              :is-outside="isOutsideMonth(dayCell)"
              :is-weekend="isCellWeekend(dayCell)"
              :is-disabled="isDayDisabled(dayCell)"
            >
              <div class="origam-calendar__day-number">{{ dayCell.getDate() }}</div>
              <div class="origam-calendar__day-events">
                <button
                  v-for="event in dayEventsCapped(dayCell)"
                  :key="`${event.id}-${dayCellKey(dayCell)}`"
                  type="button"
                  class="origam-calendar__event"
                  :style="eventStyle(event)"
                  role="button"
                  :aria-label="ariaEventLabel(event)"
                  :data-cy="`origam-calendar-event-${event.id}`"
                  @click.stop="onEventClick(event, $event)"
                >
                  <slot
                    name="event"
                    :event="event"
                    :view="resolvedView"
                    :is-past="isEventPast(event)"
                    :is-today="isEventToday(event)"
                  >
                    <span class="origam-calendar__event-title">{{ event.title }}</span>
                  </slot>
                </button>
                <div
                  v-if="eventsOnDay(dayCell).length > MONTH_EVENT_LIMIT"
                  class="origam-calendar__day-more"
                  :data-cy="`origam-calendar-more-${dayCellKey(dayCell)}`"
                >
                  +{{ eventsOnDay(dayCell).length - MONTH_EVENT_LIMIT }}
                </div>
              </div>
            </slot>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else-if="resolvedView === VIEW.WEEK || resolvedView === VIEW.DAY"
      class="origam-calendar__body"
      :class="{
					'origam-calendar__body--week': resolvedView === VIEW.WEEK,
					'origam-calendar__body--day': resolvedView === VIEW.DAY
				}"
      :data-cy="`origam-calendar-body-${resolvedView}`"
    >
      <div class="origam-calendar__timeline">
        <div class="origam-calendar__timeline-hours">
          <div
            v-for="(hourLabel, hourIndex) in hourLabels"
            :key="hourIndex"
            class="origam-calendar__hour-label"
            :style="{ height: `${slotPx * 60 / slotDuration}px` }"
          >
            {{ hourLabel }}
          </div>
        </div>
        <div class="origam-calendar__timeline-grid">
          <div
            v-for="day in timelineDays"
            :key="day.toISOString()"
            class="origam-calendar__timeline-day"
            :class="{
								'origam-calendar__timeline-day--today': isCellToday(day),
								'origam-calendar__timeline-day--weekend': isCellWeekend(day) && weekendHighlight
							}"
            role="gridcell"
            :aria-label="ariaDayLabel(day)"
            :data-cy="`origam-calendar-timeline-day-${dayCellKey(day)}`"
          >
            <div
              v-if="resolvedView === VIEW.WEEK"
              class="origam-calendar__day-header"
            >
              <slot
                name="dayHeader"
                :date="day"
              >
								<span class="origam-calendar__day-header-weekday">
									{{ weekdayShort(day) }}
								</span>
                <span class="origam-calendar__day-header-number">
									{{ day.getDate() }}
								</span>
              </slot>
            </div>
            <div
              class="origam-calendar__timeline-slots"
              :style="{ height: `${(dayEndHour - dayStartHour) * 60 / slotDuration * slotPx}px` }"
              @mousedown="onSlotMouseDown(day, $event)"
              @mousemove="onSlotMouseMove(day, $event)"
              @mouseup="onSlotMouseUp(day, $event)"
              @click="onSlotClick(day, $event)"
            >
              <div
                v-for="(slot, slotIndex) in dayGridFor(day)"
                :key="slotIndex"
                class="origam-calendar__timeline-slot"
                :class="{ 'origam-calendar__timeline-slot--hour': slot.isHourMark }"
                :style="{ height: `${slotPx}px` }"
                :data-slot-index="slotIndex"
              />
              <div
                v-for="event in eventsOnTimeline(day)"
                :key="`${event.id}-${day.toISOString()}`"
                class="origam-calendar__event origam-calendar__event--timeline"
                :style="timelineEventStyle(event, day)"
                role="button"
                tabindex="0"
                :aria-label="ariaEventLabel(event)"
                :data-cy="`origam-calendar-event-${event.id}`"
                @click="onEventClick(event, $event)"
                @mousedown.stop
              >
                <slot
                  name="event"
                  :event="event"
                  :view="resolvedView"
                  :is-past="isEventPast(event)"
                  :is-today="isEventToday(event)"
                >
                  <span class="origam-calendar__event-title">{{ event.title }}</span>
                  <span class="origam-calendar__event-time">{{ eventTimeLabel(event) }}</span>
                </slot>
              </div>
              <div
                v-if="dragSelection && isSameDayLocal(dragSelection.day, day)"
                class="origam-calendar__range-overlay"
                :style="dragOverlayStyle"
              />
            </div>
          </div>
        </div>
      </div>
    </div>

    <div
      v-else
      class="origam-calendar__body origam-calendar__body--agenda"
      data-cy="origam-calendar-body-agenda"
    >
      <template v-if="agendaEntries.length > 0">
        <div
          v-for="entry in agendaEntries"
          :key="entry.date.toISOString()"
          class="origam-calendar__agenda-day"
        >
          <div class="origam-calendar__agenda-day-header">
            {{ agendaDayHeader(entry.date) }}
          </div>
          <button
            v-for="event in entry.events"
            :key="event.id"
            type="button"
            class="origam-calendar__agenda-event"
            :style="eventStyle(event)"
            :aria-label="ariaEventLabel(event)"
            :data-cy="`origam-calendar-event-${event.id}`"
            @click="onEventClick(event, $event)"
          >
            <slot
              name="event"
              :event="event"
              :view="resolvedView"
              :is-past="isEventPast(event)"
              :is-today="isEventToday(event)"
            >
              <span class="origam-calendar__event-time">{{ eventTimeLabel(event) }}</span>
              <span class="origam-calendar__event-title">{{ event.title }}</span>
            </slot>
          </button>
        </div>
      </template>
      <div
        v-else
        class="origam-calendar__agenda-empty"
        data-cy="origam-calendar-agenda-empty"
      >
        <slot
          name="empty"
          :view="resolvedView"
        >
          {{ emptyLabel }}
        </slot>
      </div>
    </div>
  </div>
</template>

<script
  lang="ts"
  setup
>
  import {
    computed,
    ref,
    type StyleValue
  } from 'vue'

  import { useCalendar } from '../../composables'

  import type {
    ICalendarComponentProps,
    IEvent,
    ICalendarEmits
  } from '../../interfaces'

  import type {
    TCalendarNavigate,
    TCalendarView,
    TIntent
  } from '../../types'

  import {
    buildDisabledPredicate,
    formatDate,
    formatTime,
    getWeekdayNames,
    isAfter,
    isBefore,
    isoWeekNumber,
    isPast,
    isSameDay,
    isToday,
    isWeekend,
    startOfDay,
    toDate
  } from '../../utils/Calendar/date.util'

  /*********************************************************
   * Global — `<OrigamCalendar>` props + defaults.
   *
   * Defaults are inlined here (no `CALENDAR_DEFAULTS.*` indirection)
   * because the Vue SFC compiler analyses `withDefaults` statically
   * and only resolves literals — cf. CLAUDE.md "withDefaults() —
   * inline literals only" rule.
   ********************************************************/
  const props = withDefaults(defineProps<ICalendarComponentProps>(), {
    view: 'month',
    currentDate: () => new Date(),
    events: () => [],
    firstDayOfWeek: 1,
    timeFormat: '24h',
    locale: undefined,
    selectable: true,
    eventColorKey: 'category',
    categoryColors: () => ({}),
    weekendHighlight: true,
    showWeekNumbers: false,
    dayStartHour: 0,
    dayEndHour: 24,
    slotDuration: 30,
    minDate: undefined,
    maxDate: undefined,
    disabledDates: undefined
  })

  const emit = defineEmits<ICalendarEmits>()

  /*********************************************************
   * Constants — view enumeration, default event limits, ARIA copy.
   *
   * Kept in-file (not in a const file) because they're internal to
   * the SFC; the public surface that consumers extend is the
   * `ICalendarProps`/`IEvent` interface pair.
   ********************************************************/
  const VIEW = {
    MONTH: 'month',
    WEEK: 'week',
    DAY: 'day',
    AGENDA: 'agenda'
  } as const

  const VIEW_OPTIONS: Array<TCalendarView> = [ VIEW.MONTH, VIEW.WEEK, VIEW.DAY, VIEW.AGENDA ]
  const MONTH_EVENT_LIMIT = 3
  const DEFAULT_SLOT_HEIGHT_PX = 32

  const ariaLabel = computed(() => 'Calendar')
  const ariaToolbarLabel = computed(() => 'Calendar toolbar')
  const ariaPrevLabel = computed(() => 'Previous')
  const ariaNextLabel = computed(() => 'Next')
  const ariaTodayLabel = computed(() => 'Today')
  const ariaViewListLabel = computed(() => 'View')
  const ariaMonthLabel = computed(() => 'Month grid')
  const todayLabel = computed(() => 'Today')
  const emptyLabel = computed(() => 'No events to display')

  const slotPx = DEFAULT_SLOT_HEIGHT_PX
  const slotDuration = computed(() => props.slotDuration)
  const dayStartHour = computed(() => props.dayStartHour)
  const dayEndHour = computed(() => props.dayEndHour)
  const showWeekNumbers = computed(() => props.showWeekNumbers)
  const weekendHighlight = computed(() => props.weekendHighlight)

  /*********************************************************
   * Reactive normalisation — coerce string dates to Date once, build
   * the disabled-date predicate once. Anything downstream consumes
   * the normalised forms.
   ********************************************************/
  const resolvedView = computed<TCalendarView>(() => props.view ?? 'month')

  const resolvedDate = computed<Date>(() => {
    const d = toDate(props.currentDate as Date | string)
    return d ?? new Date()
  })

  const resolvedLocale = computed<string>(() => {
    if (props.locale) return props.locale
    if (typeof document !== 'undefined' && document.documentElement.lang) {
      return document.documentElement.lang
    }
    return 'en-US'
  })

  const minDate = computed<Date | null>(() => props.minDate ? toDate(props.minDate as Date | string) : null)
  const maxDate = computed<Date | null>(() => props.maxDate ? toDate(props.maxDate as Date | string) : null)

  const disabledPredicate = computed<(d: Date) => boolean>(() =>
    buildDisabledPredicate(props.disabledDates)
  )

  /*********************************************************
   * Composable wiring — driven by getter thunks so we never
   * accidentally close over a stale value.
   ********************************************************/
  const calendar = useCalendar(
    {
      events: () => props.events ?? [],
      view: () => resolvedView.value,
      currentDate: () => resolvedDate.value,
      firstDayOfWeek: () => props.firstDayOfWeek,
      slotDuration: () => slotDuration.value,
      dayStartHour: () => dayStartHour.value,
      dayEndHour: () => dayEndHour.value,
      minDate: () => minDate.value,
      maxDate: () => maxDate.value,
      locale: () => resolvedLocale.value
    },
    (next) => {
      emit('update:view', next)
      emit('view-change', next)
    },
    (next) => {
      emit('update:currentDate', next)
    }
  )

  function onSetView(next: TCalendarView): void {
    calendar.setView(next)
  }

  function onNavigate(direction: TCalendarNavigate): void {
    calendar.navigate(direction)
    emit('navigate', direction)
  }

  /*********************************************************
   * Header — view-dependent title format. Uses `Intl.DateTimeFormat`
   * so the user's locale drives month / weekday names.
   ********************************************************/
  const headerTitle = computed(() => {
    const date = resolvedDate.value
    const locale = resolvedLocale.value
    switch (resolvedView.value) {
      case 'week': {
        const range = calendar.visibleDateRange.value
        const startLabel = formatDate(range.start, locale, { month: 'short', day: 'numeric' })
        const endLabel = formatDate(range.end, locale, { month: 'short', day: 'numeric', year: 'numeric' })
        return `${ startLabel } — ${ endLabel }`
      }
      case 'day':
        return formatDate(date, locale, {
          weekday: 'long',
          month: 'long',
          day: 'numeric',
          year: 'numeric'
        })
      case 'month':
      case 'agenda':
      default:
        return formatDate(date, locale, { month: 'long', year: 'numeric' })
    }
  })

  const canPrev = computed(() => {
    if (!minDate.value) return true
    return isAfter(resolvedDate.value, minDate.value)
  })

  const canNext = computed(() => {
    if (!maxDate.value) return true
    return isBefore(resolvedDate.value, maxDate.value)
  })

  /*********************************************************
   * Month view bindings.
   ********************************************************/
  const monthGrid = computed(() => calendar.buildMonthGrid(resolvedDate.value))

  const weekdayNames = computed(() => getWeekdayNames(resolvedLocale.value, props.firstDayOfWeek, 'short'))

  function dayCellKey(date: Date): string {
    return `${ date.getFullYear() }-${ String(date.getMonth() + 1).padStart(2, '0') }-${ String(date.getDate()).padStart(2, '0') }`
  }

  function isCellToday(date: Date): boolean {
    return isToday(date)
  }

  function isCellPast(date: Date): boolean {
    return isPast(startOfDay(date)) && !isCellToday(date)
  }

  function isCellWeekend(date: Date): boolean {
    return isWeekend(date)
  }

  function isOutsideMonth(date: Date): boolean {
    return date.getMonth() !== resolvedDate.value.getMonth()
  }

  function isDayDisabled(date: Date): boolean {
    if (disabledPredicate.value(date)) return true
    if (minDate.value && isBefore(startOfDay(date), startOfDay(minDate.value))) return true
    if (maxDate.value && isAfter(startOfDay(date), startOfDay(maxDate.value))) return true
    return false
  }

  function dayCellClasses(date: Date): Record<string, boolean> {
    return {
      'origam-calendar__day-cell--today': isCellToday(date),
      'origam-calendar__day-cell--past': isCellPast(date),
      'origam-calendar__day-cell--outside': isOutsideMonth(date),
      'origam-calendar__day-cell--weekend': isCellWeekend(date) && weekendHighlight.value,
      'origam-calendar__day-cell--disabled': isDayDisabled(date),
      'origam-calendar__day-cell--selected': isInDragSelection(date)
    }
  }

  function eventsOnDay(date: Date): Array<IEvent> {
    return calendar.eventsOnDay(date)
  }

  function dayEventsCapped(date: Date): Array<IEvent> {
    return eventsOnDay(date).slice(0, MONTH_EVENT_LIMIT)
  }

  function weekNumberOf(date: Date): number {
    return isoWeekNumber(date)
  }

  function ariaWeekNumberLabel(date: Date): string {
    return `Week ${ weekNumberOf(date) }`
  }

  function ariaDayLabel(date: Date): string {
    return formatDate(date, resolvedLocale.value, {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    })
  }

  /*********************************************************
   * Week / day view bindings.
   ********************************************************/
  const timelineDays = computed<Array<Date>>(() => {
    if (resolvedView.value === 'day') return [ startOfDay(resolvedDate.value) ]
    const range = calendar.visibleDateRange.value
    const out: Array<Date> = []
    let cursor = startOfDay(range.start)
    for (let i = 0; i < 7; i++) {
      out.push(cursor)
      cursor = calendar.helpers.addDays(cursor, 1)
    }
    return out
  })

  const hourLabels = computed<Array<string>>(() => {
    const out: Array<string> = []
    const date = new Date(resolvedDate.value)
    date.setMinutes(0, 0, 0)
    for (let h = dayStartHour.value; h < dayEndHour.value; h++) {
      date.setHours(h)
      out.push(formatTime(date, props.timeFormat, resolvedLocale.value))
    }
    return out
  })

  function dayGridFor(date: Date) {
    return calendar.buildDayGrid(date)
  }

  function eventsOnTimeline(day: Date): Array<IEvent> {
    return eventsOnDay(day).filter((event) => !event.allDay)
  }

  function timelineEventStyle(event: IEvent, day: Date): StyleValue {
    const dayStartTime = new Date(day)
    dayStartTime.setHours(dayStartHour.value, 0, 0, 0)
    const pxPerMin = slotPx / slotDuration.value
    const pos = calendar.positionEvent(event, dayStartTime, pxPerMin)
    if (!pos) return {}
    return {
      top: `${ pos.top }px`,
      height: `${ pos.height }px`,
      ...colorStyleFor(event)
    }
  }

  function weekdayShort(date: Date): string {
    return formatDate(date, resolvedLocale.value, { weekday: 'short' })
  }

  function eventTimeLabel(event: IEvent): string {
    const start = toDate(event.start)
    if (!start) return ''
    return formatTime(start, props.timeFormat, resolvedLocale.value)
  }

  /*********************************************************
   * Agenda view bindings.
   ********************************************************/
  const agendaEntries = computed(() => calendar.buildAgenda())

  function agendaDayHeader(date: Date): string {
    return formatDate(date, resolvedLocale.value, {
      weekday: 'long',
      month: 'short',
      day: 'numeric'
    })
  }

  /*********************************************************
   * Color resolution — `eventColorKey` selects the source. We map
   * tokenised intents to the matching CSS variable so the calendar
   * inherits theme-aware colours without re-implementing the
   * intent → color matrix.
   ********************************************************/
  const INTENT_NAMES: ReadonlyArray<TIntent> = [
    'neutral', 'primary', 'secondary', 'ghost',
    'success', 'warning', 'danger', 'info'
  ]

  function colorFor(event: IEvent): string | null {
    if (props.eventColorKey === 'color' && event.color) {
      return resolveColor(event.color)
    }
    if (event.color) return resolveColor(event.color)
    const cat = event.category
    if (!cat) return null
    const mapped = props.categoryColors?.[cat]
    if (!mapped) return null
    return resolveColor(mapped)
  }

  function resolveColor(value: TIntent | string): string {
    if (INTENT_NAMES.includes(value as TIntent)) {
      return `var(--origam-color__action--${ value }---bg, var(--origam-color__feedback--${ value }---bg, currentColor))`
    }
    return value
  }

  function colorStyleFor(event: IEvent): Record<string, string> {
    const c = colorFor(event)
    if (!c) return {}
    return {
      'background-color': c,
      'border-color': c
    }
  }

  function eventStyle(event: IEvent): StyleValue {
    return colorStyleFor(event)
  }

  function isEventPast(event: IEvent): boolean {
    const start = toDate(event.start)
    return start ? isPast(start) : false
  }

  function isEventToday(event: IEvent): boolean {
    const start = toDate(event.start)
    return start ? isToday(start) : false
  }

  function ariaEventLabel(event: IEvent): string {
    const start = toDate(event.start)
    if (!start) return event.title
    return `${ event.title } — ${ formatDate(start, resolvedLocale.value, {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric'
    }) }`
  }

  /*********************************************************
   * Click + drag-select wiring.
   *
   * Month view: `mousedown` on a cell starts a drag, `mouseenter` on
   * subsequent cells extends it, `mouseup` (window-level) emits the
   * range. We listen to `mouseup` on the document to catch drags
   * that end outside the calendar root.
   *
   * Week / day view: same idea but on individual slots, with a
   * pixel-level overlay that paints the in-progress range.
   ********************************************************/
  interface IDragMonthState {
    startDate: Date
    endDate: Date
  }

  interface IDragSlotState {
    day: Date
    startMin: number
    endMin: number
  }

  const monthDrag = ref<IDragMonthState | null>(null)
  const dragSelection = ref<IDragSlotState | null>(null)
  const isMouseDown = ref(false)

  function onDayClick(date: Date, _event: MouseEvent): void {
    if (isDayDisabled(date)) return
    if (monthDrag.value && !isSameDay(monthDrag.value.startDate, monthDrag.value.endDate)) return
    emit('date-click', date)
  }

  function onCellMouseDown(date: Date, _ev: MouseEvent): void {
    if (!props.selectable) return
    if (isDayDisabled(date)) return
    isMouseDown.value = true
    monthDrag.value = { startDate: date, endDate: date }
  }

  function onCellMouseEnter(date: Date): void {
    if (!isMouseDown.value || !monthDrag.value) return
    monthDrag.value = { startDate: monthDrag.value.startDate, endDate: date }
  }

  function onMonthMouseUp(): void {
    if (!monthDrag.value || !isMouseDown.value) {
      isMouseDown.value = false
      return
    }
    const { startDate, endDate } = monthDrag.value
    isMouseDown.value = false
    if (!isSameDay(startDate, endDate)) {
      const [ from, to ] = startDate.getTime() <= endDate.getTime() ? [ startDate, endDate ] : [ endDate, startDate ]
      emit('range-select', from, to)
      emit('create-event-request', from, to)
    }
    monthDrag.value = null
  }

  function isInDragSelection(date: Date): boolean {
    if (!monthDrag.value) return false
    const { startDate, endDate } = monthDrag.value
    const [ from, to ] = startDate.getTime() <= endDate.getTime() ? [ startDate, endDate ] : [ endDate, startDate ]
    return (
      date.getTime() >= startOfDay(from).getTime()
      && date.getTime() <= startOfDay(to).getTime() + 24 * 60 * 60 * 1000 - 1
    )
  }

  function slotMinutesFromY(event: MouseEvent): number {
    const target = event.currentTarget as HTMLElement
    const rect = target.getBoundingClientRect()
    const y = event.clientY - rect.top
    const pxPerMin = slotPx / slotDuration.value
    return Math.max(0, Math.round(y / pxPerMin))
  }

  function onSlotMouseDown(day: Date, event: MouseEvent): void {
    if (!props.selectable) return
    if (event.button !== 0) return
    const minutes = slotMinutesFromY(event)
    const start = new Date(day)
    start.setHours(dayStartHour.value, 0, 0, 0)
    start.setMinutes(start.getMinutes() + minutes)
    dragSelection.value = { day, startMin: minutes, endMin: minutes + slotDuration.value }
    isMouseDown.value = true
  }

  function onSlotMouseMove(day: Date, event: MouseEvent): void {
    if (!isMouseDown.value || !dragSelection.value) return
    if (!isSameDayLocal(dragSelection.value.day, day)) return
    const minutes = slotMinutesFromY(event)
    dragSelection.value = {
      day: dragSelection.value.day,
      startMin: dragSelection.value.startMin,
      endMin: Math.max(minutes, dragSelection.value.startMin + slotDuration.value)
    }
  }

  function onSlotMouseUp(day: Date, _event: MouseEvent): void {
    if (!isMouseDown.value || !dragSelection.value) {
      isMouseDown.value = false
      return
    }
    const start = new Date(day)
    start.setHours(dayStartHour.value, 0, 0, 0)
    start.setMinutes(start.getMinutes() + dragSelection.value.startMin)
    const end = new Date(start)
    end.setMinutes(start.getMinutes() + (dragSelection.value.endMin - dragSelection.value.startMin))
    const dragged = dragSelection.value.endMin - dragSelection.value.startMin > slotDuration.value
    isMouseDown.value = false
    dragSelection.value = null
    if (dragged) {
      emit('range-select', start, end)
      emit('create-event-request', start, end)
    }
  }

  function onSlotClick(day: Date, event: MouseEvent): void {
    const minutes = slotMinutesFromY(event)
    const slotDate = new Date(day)
    slotDate.setHours(dayStartHour.value, 0, 0, 0)
    slotDate.setMinutes(slotDate.getMinutes() + minutes)
    // Only emit when this wasn't part of a drag.
    const wasDrag = dragSelection.value !== null
    if (!wasDrag) emit('date-click', slotDate)
  }

  const dragOverlayStyle = computed<StyleValue>(() => {
    if (!dragSelection.value) return {}
    const pxPerMin = slotPx / slotDuration.value
    return {
      top: `${ dragSelection.value.startMin * pxPerMin }px`,
      height: `${ (dragSelection.value.endMin - dragSelection.value.startMin) * pxPerMin }px`
    }
  })

  function isSameDayLocal(a: Date, b: Date): boolean {
    return isSameDay(a, b)
  }

  /*********************************************************
   * Global mouseup listener — attached on mount so drags that end
   * outside the calendar root still emit. SSR-safe because the
   * onMounted hook only runs client-side.
   ********************************************************/
  if (typeof window !== 'undefined') {
    window.addEventListener('mouseup', () => {
      if (monthDrag.value) onMonthMouseUp()
      else if (dragSelection.value) {
        dragSelection.value = null
        isMouseDown.value = false
      }
    })
  }

  function onEventClick(event: IEvent, originalEvent: MouseEvent): void {
    emit('event-click', event, originalEvent)
  }

  /*********************************************************
   * Keyboard navigation — arrow keys move the current date by the
   * unit relevant to the view. Page Up / Page Down jump month.
   ********************************************************/
  function onKeydown(event: KeyboardEvent): void {
    const target = event.target as HTMLElement | null
    if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) return
    let next: Date | null = null
    const current = resolvedDate.value
    switch (event.key) {
      case 'ArrowRight':
        next = calendar.helpers.addDays(current, 1)
        break
      case 'ArrowLeft':
        next = calendar.helpers.addDays(current, -1)
        break
      case 'ArrowUp':
        next = calendar.helpers.addDays(current, -7)
        break
      case 'ArrowDown':
        next = calendar.helpers.addDays(current, 7)
        break
      case 'PageUp':
        next = calendar.helpers.addMonths(current, -1)
        break
      case 'PageDown':
        next = calendar.helpers.addMonths(current, 1)
        break
    }
    if (next) {
      event.preventDefault()
      emit('update:currentDate', next)
    }
  }

  /*********************************************************
   * Class & Style
   ********************************************************/
  const rootClasses = computed(() => [
    `origam-calendar--${ resolvedView.value }`,
    {
      'origam-calendar--week-numbers': showWeekNumbers.value
    },
    props.class
  ])

  const rootStyles = computed<StyleValue>(() => [ props.style ] as StyleValue)

  /*********************************************************
   * Expose
   ********************************************************/
  defineExpose({
    visibleDateRange: calendar.visibleDateRange,
    expandedEvents: calendar.expandedEvents,
    navigate: onNavigate,
    setView: onSetView
  })
</script>

<style
  lang="scss"
  scoped
>
  .origam-calendar {
    display: flex;
    flex-direction: column;
    width: 100%;
    background-color: var(--origam-calendar---background-color, #ffffff);
    color: var(--origam-calendar---color, inherit);
    border: var(--origam-calendar---border-width, 1px) solid var(--origam-calendar---border-color, #e5e7eb);
    border-radius: var(--origam-calendar---border-radius, 8px);
    overflow: hidden;
  }

  .origam-calendar__toolbar {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: var(--origam-calendar__toolbar---gap, 8px);
    padding: var(--origam-calendar__toolbar---padding, 12px);
    background-color: var(--origam-calendar__toolbar---background-color, transparent);
    border-bottom: 1px solid var(--origam-calendar__toolbar---border-color, #e5e7eb);
  }

  .origam-calendar__toolbar-nav,
  .origam-calendar__toolbar-views {
    display: inline-flex;
    gap: 4px;
  }

  .origam-calendar__toolbar-title {
    flex: 1 1 auto;
    text-align: center;
    color: var(--origam-calendar__toolbar---title-color, inherit);
    font-size: var(--origam-calendar__toolbar---title-font-size, 1rem);
    font-weight: var(--origam-calendar__toolbar---title-font-weight, 600);
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .origam-calendar__toolbar-btn {
    all: unset;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    min-width: 32px;
    min-height: 32px;
    padding: 0 8px;
    text-transform: capitalize;
    border-radius: 4px;
    cursor: pointer;
    font: inherit;
    color: inherit;
    transition: background-color 120ms ease, color 120ms ease;
  }

  .origam-calendar__toolbar-btn:hover:not(:disabled),
  .origam-calendar__toolbar-btn:focus-visible {
    background-color: var(--origam-calendar__day-cell---bg-color-hover, rgba(0, 0, 0, 0.06));
  }

  .origam-calendar__toolbar-btn:disabled {
    opacity: 0.4;
    cursor: not-allowed;
  }

  /*
   * Active toolbar button (selected view: Month / Week / Day / Agenda).
   * Previously fell back to `currentColor` for bg + `#ffffff` for fg —
   * when the calendar lived on a light surface with white-ish
   * `currentColor` (e.g. tinted via a wrapper, or the unset token
   * resolved to a near-white value), the active btn rendered as
   * white-on-white and the user lost the selected view indicator.
   *
   * Use the DS primary intent pair (`action.primary.bg` + matching
   * `.fg`) so the selected view is unambiguously highlighted on any
   * surface, light or dark, with WCAG-validated contrast.
   */
  .origam-calendar__toolbar-btn--active {
    background-color: var(--origam-calendar__toolbar-btn--active---background-color, var(--origam-color__action--primary---bg));
    color: var(--origam-calendar__toolbar-btn--active---color, var(--origam-color__action--primary---fg));
  }

  .origam-calendar__toolbar-btn--active:hover:not(:disabled),
  .origam-calendar__toolbar-btn--active:focus-visible {
    background-color: var(--origam-calendar__toolbar-btn--active---background-color-hover, color-mix(in srgb, var(--origam-color__action--primary---bg) 88%, black));
  }

  .origam-calendar__body {
    flex: 1 1 auto;
    min-width: 0;
    display: flex;
    flex-direction: column;
  }

  .origam-calendar__weekdays {
    display: grid;
    grid-template-columns: var(--origam-calendar__week-number---grid-template-columns, repeat(7, minmax(0, 1fr)));
  }

  .origam-calendar--week-numbers .origam-calendar__weekdays,
  .origam-calendar--week-numbers .origam-calendar__month-row {
    grid-template-columns: var(--origam-calendar__week-number---width, 32px) repeat(7, minmax(0, 1fr));
  }

  .origam-calendar__weekday {
    padding: 8px;
    text-align: center;
    font-size: 0.75rem;
    text-transform: uppercase;
    color: var(--origam-calendar__day-cell---color-muted, #6b7280);
  }

  .origam-calendar__week-number {
    padding: 8px 4px;
    font-size: var(--origam-calendar__week-number---font-size, 0.75rem);
    color: var(--origam-calendar__week-number---color, #6b7280);
    text-align: center;
    align-self: center;
  }

  .origam-calendar__week-number-head {
    min-width: var(--origam-calendar__week-number---width, 32px);
  }

  .origam-calendar__month-grid {
    display: flex;
    flex-direction: column;
    flex: 1 1 auto;
  }

  .origam-calendar__month-row {
    display: grid;
    grid-template-columns: repeat(7, minmax(0, 1fr));
    flex: 1 1 auto;
  }

  .origam-calendar__day-cell {
    min-height: var(--origam-calendar__day-cell---height, 96px);
    padding: var(--origam-calendar__day-cell---padding, 6px);
    border-top: 1px solid var(--origam-calendar__day-cell---border-color, #e5e7eb);
    border-left: 1px solid var(--origam-calendar__day-cell---border-color, #e5e7eb);
    background-color: var(--origam-calendar---background-color, #ffffff);
    color: var(--origam-calendar__day-cell---color, inherit);
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 4px;
    user-select: none;
  }

  .origam-calendar__day-cell:focus-visible {
    outline: 2px solid var(--origam-calendar__range-select---border-color, currentColor);
    outline-offset: -2px;
  }

  .origam-calendar__day-cell--today {
    background-color: var(--origam-calendar__day-cell---bg-color-today, rgba(59, 130, 246, 0.08));
  }

  .origam-calendar__day-cell--outside {
    background-color: var(--origam-calendar__day-cell---bg-color-outside, #f9fafb);
    color: var(--origam-calendar__day-cell---color-muted, #9ca3af);
  }

  .origam-calendar__day-cell--weekend {
    background-color: var(--origam-calendar__day-cell---bg-color-weekend, #f9fafb);
  }

  .origam-calendar__day-cell--disabled {
    opacity: 0.5;
    cursor: not-allowed;
    color: var(--origam-calendar__day-cell---color-disabled, #d1d5db);
  }

  .origam-calendar__day-cell--selected {
    background-color: var(--origam-calendar__range-select---bg-color, rgba(59, 130, 246, 0.12));
  }

  .origam-calendar__day-number {
    font-size: 0.875rem;
    font-weight: 500;
  }

  .origam-calendar__day-events {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .origam-calendar__event {
    all: unset;
    display: flex;
    align-items: center;
    gap: 4px;
    padding: var(--origam-calendar__event---padding, 2px 4px);
    font-size: var(--origam-calendar__event---font-size, 0.75rem);
    border-radius: var(--origam-calendar__event---border-radius, 4px);
    background-color: var(--origam-calendar__event---bg-color-default, #3b82f6);
    color: var(--origam-calendar__event---color-default, #ffffff);
    cursor: pointer;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .origam-calendar__event-title {
    overflow: hidden;
    text-overflow: ellipsis;
    flex: 1 1 auto;
  }

  .origam-calendar__event-time {
    opacity: 0.85;
    font-size: 0.6875rem;
  }

  .origam-calendar__day-more {
    font-size: 0.6875rem;
    color: var(--origam-calendar__day-cell---color-muted, #6b7280);
    padding-left: 4px;
  }

  .origam-calendar__timeline {
    display: flex;
    flex: 1 1 auto;
    min-height: 0;
    overflow: auto;
  }

  .origam-calendar__timeline-hours {
    display: flex;
    flex-direction: column;
    width: var(--origam-calendar__timeline__hour-label---width, 56px);
    padding-top: 32px;
    border-right: 1px solid var(--origam-calendar__day-cell---border-color, #e5e7eb);
  }

  .origam-calendar__hour-label {
    font-size: var(--origam-calendar__timeline__hour-label---font-size, 0.6875rem);
    color: var(--origam-calendar__timeline__hour-label---color, #6b7280);
    text-align: right;
    padding-right: 6px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-end;
  }

  .origam-calendar__timeline-grid {
    display: flex;
    flex: 1 1 auto;
  }

  .origam-calendar__timeline-day {
    flex: 1 1 0;
    min-width: 0;
    border-left: 1px solid var(--origam-calendar__day-cell---border-color, #e5e7eb);
    display: flex;
    flex-direction: column;
  }

  .origam-calendar__timeline-day--today {
    background-color: var(--origam-calendar__day-cell---bg-color-today, rgba(59, 130, 246, 0.04));
  }

  .origam-calendar__timeline-day--weekend {
    background-color: var(--origam-calendar__day-cell---bg-color-weekend, rgba(0, 0, 0, 0.02));
  }

  .origam-calendar__day-header {
    padding: 8px;
    text-align: center;
    border-bottom: 1px solid var(--origam-calendar__day-cell---border-color, #e5e7eb);
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .origam-calendar__day-header-weekday {
    font-size: 0.75rem;
    color: var(--origam-calendar__day-cell---color-muted, #6b7280);
    text-transform: uppercase;
  }

  .origam-calendar__day-header-number {
    font-size: 1.25rem;
    font-weight: 600;
  }

  .origam-calendar__timeline-slots {
    position: relative;
    display: flex;
    flex-direction: column;
  }

  .origam-calendar__timeline-slot {
    border-top: 1px solid var(--origam-calendar__timeline---grid-line-color, #f3f4f6);
    pointer-events: auto;
  }

  .origam-calendar__timeline-slot--hour {
    border-top-color: var(--origam-calendar__day-cell---border-color, #e5e7eb);
  }

  .origam-calendar__event--timeline {
    position: absolute;
    left: 4px;
    right: 4px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
    padding: 4px 6px;
    font-size: 0.75rem;
    line-height: 1.2;
  }

  .origam-calendar__range-overlay {
    position: absolute;
    left: 4px;
    right: 4px;
    background-color: var(--origam-calendar__range-select---bg-color, rgba(59, 130, 246, 0.18));
    border: 1px dashed var(--origam-calendar__range-select---border-color, rgba(59, 130, 246, 0.6));
    pointer-events: none;
    border-radius: 4px;
  }

  .origam-calendar__body--agenda {
    padding: var(--origam-calendar__agenda---padding, 12px);
    display: flex;
    flex-direction: column;
    gap: var(--origam-calendar__agenda---row-gap, 12px);
  }

  .origam-calendar__agenda-day {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .origam-calendar__agenda-day-header {
    font-size: 0.875rem;
    color: var(--origam-calendar__agenda---day-color, inherit);
    font-weight: var(--origam-calendar__agenda---day-font-weight, 600);
  }

  .origam-calendar__agenda-event {
    all: unset;
    display: flex;
    align-items: center;
    gap: 8px;
    padding: 8px 12px;
    border-radius: 6px;
    cursor: pointer;
    background-color: var(--origam-calendar__event---bg-color-default, #3b82f6);
    color: var(--origam-calendar__event---color-default, #ffffff);
    font-size: 0.875rem;
  }

  .origam-calendar__agenda-empty {
    padding: 32px;
    text-align: center;
    color: var(--origam-calendar__day-cell---color-muted, #6b7280);
  }
</style>
