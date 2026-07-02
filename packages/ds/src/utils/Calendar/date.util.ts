/**
 * Calendar-specific date helpers.
 *
 * We re-export a subset of the rich `src/utils/Commons/date.util.ts`
 * surface (the parts the `OrigamCalendar` component depends on), and
 * add a handful of helpers that only the full-calendar component
 * cares about (`isToday`, `isPast`, `isWeekend`, `diffMinutes`,
 * `formatTime`, `buildMonthMatrix`). Keeping the calendar-side
 * surface narrow makes the public API obvious and lets us evolve
 * the underlying helpers without auditing every component.
 *
 * **SSR-safe** — every function takes a `Date` argument (the caller
 * provides "now" via `new Date()`), so no module-scope `Date()` call
 * runs at import time.
 */

import {
    addDays,
    isSameDay,
    startOfDay,
    startOfMonth
} from '../Commons/date.util'

export {
    addDays,
    addMonths,
    addWeeks,
    endOfMonth,
    endOfWeek,
    isAfter,
    isBefore,
    isSameDay,
    isSameMonth,
    startOfDay,
    startOfMonth
} from '../Commons/date.util'

/**
 * Coerce a `Date | string | number` to a `Date`. Strings go through
 * `new Date()` (which accepts ISO-8601 natively); numbers are treated
 * as epoch milliseconds. Returns `null` for unparseable values so the
 * caller can branch on `!= null`.
 */
export function toDate (value: Date | string | number | null | undefined): Date | null {
    if (value == null) return null
    if (value instanceof Date) return Number.isNaN(value.getTime()) ? null : new Date(value.getTime())
    if (typeof value === 'number') {
        const d = new Date(value)
        return Number.isNaN(d.getTime()) ? null : d
    }
    const parsed = new Date(value)
    return Number.isNaN(parsed.getTime()) ? null : parsed
}

/**
 * Start of week aware of `firstDayOfWeek`. We don't go through the
 * locale-based path in `Commons/date.util.ts` (`startOfWeek(date, locale)`)
 * because the calendar receives the first-day-of-week as an explicit
 * prop — letting the locale override it would surprise the consumer.
 */
export function startOfWeekFixed (date: Date, firstDayOfWeek: number): Date {
    const d = new Date(date)
    d.setHours(0, 0, 0, 0)
    const diff = (d.getDay() - firstDayOfWeek + 7) % 7
    d.setDate(d.getDate() - diff)
    return d
}

/** Symmetric counterpart to `startOfWeekFixed`. */
export function endOfWeekFixed (date: Date, firstDayOfWeek: number): Date {
    const start = startOfWeekFixed(date, firstDayOfWeek)
    return addDays(start, 6)
}

/**
 * `true` when the date falls on the current calendar day (local
 * timezone). The "now" reference is captured at call time so the
 * function stays pure between calls — we don't memoize.
 */
export function isToday (date: Date): boolean {
    return isSameDay(date, new Date())
}

/**
 * `true` when the date sits in the past — including today's earlier
 * hours. Used to fade out past events in the toolbar/agenda.
 */
export function isPast (date: Date): boolean {
    return date.getTime() < Date.now()
}

/**
 * `true` for Saturday / Sunday. Used to paint the weekend stripe in
 * month / week views when `weekendHighlight` is on.
 */
export function isWeekend (date: Date): boolean {
    const day = date.getDay()
    return day === 0 || day === 6
}

/**
 * Difference between two dates expressed in **minutes** (positive
 * when `b` is after `a`). Used for event-height calculations in the
 * week / day timelines.
 */
export function diffMinutes (a: Date, b: Date): number {
    return Math.round((b.getTime() - a.getTime()) / 60000)
}

/**
 * Format a `Date` as `HH:MM` (`'24h'`) or `H:MM AM/PM` (`'12h'`).
 * Goes through `Intl.DateTimeFormat` so the locale's separator and
 * AM/PM marker are honoured.
 */
export function formatTime (date: Date, format: '12h' | '24h', locale?: string): string {
    const options: Intl.DateTimeFormatOptions = {
        hour: '2-digit',
        minute: '2-digit',
        hour12: format === '12h'
    }
    return new Intl.DateTimeFormat(locale, options).format(date)
}

/**
 * Locale-aware date formatter. Thin wrapper over `Intl.DateTimeFormat`
 * — kept here so callers don't have to repeat the locale fallback.
 */
export function formatDate (date: Date, locale: string, options: Intl.DateTimeFormatOptions): string {
    return new Intl.DateTimeFormat(locale, options).format(date)
}

/**
 * Build a 6-row × 7-col matrix anchored on the month that contains
 * `date`. Rows always equal 6 so the grid height stays stable when
 * navigating month-to-month (some months span only 4 or 5 weeks
 * otherwise).
 */
export function buildMonthMatrix (date: Date, firstDayOfWeek: number): Array<Array<Date>> {
    const firstOfMonth = startOfMonth(date)
    const gridStart = startOfWeekFixed(firstOfMonth, firstDayOfWeek)
    const rows: Array<Array<Date>> = []
    for (let r = 0; r < 6; r++) {
        const row: Array<Date> = []
        for (let c = 0; c < 7; c++) {
            row.push(addDays(gridStart, r * 7 + c))
        }
        rows.push(row)
    }
    return rows
}

/**
 * Get the ISO 8601 week number for the given date. Used to render the
 * optional `showWeekNumbers` column in month / week views.
 *
 * Algorithm — Thursday-of-the-week / first-Thursday-of-year, which is
 * the ISO 8601 spec (week 1 contains the year's first Thursday).
 */
export function isoWeekNumber (date: Date): number {
    const d = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
    const day = d.getUTCDay() || 7
    d.setUTCDate(d.getUTCDate() + 4 - day)
    const yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1))
    return Math.ceil((((d.getTime() - yearStart.getTime()) / 86400000) + 1) / 7)
}

/**
 * Predicate factory. Resolves the user-supplied `disabledDates` (array
 * of `Date | string` or a predicate function) into a single
 * `(date: Date) => boolean` we can call from the cell builders.
 */
export function buildDisabledPredicate (
    input: Array<Date | string> | ((d: Date) => boolean) | undefined
): (date: Date) => boolean {
    if (!input) return () => false
    if (typeof input === 'function') return input
    const set = new Set<string>(
        input
            .map((value) => toDate(value))
            .filter((value): value is Date => value !== null)
            .map((value) => `${value.getFullYear()}-${value.getMonth()}-${value.getDate()}`)
    )
    return (date: Date): boolean => set.has(`${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`)
}

/**
 * Inclusive day-range iterator. Returns every date between `from`
 * and `to` (00:00 local).
 */
export function eachDayOfInterval (from: Date, to: Date): Array<Date> {
    const start = startOfDay(from)
    const end = startOfDay(to)
    if (end.getTime() < start.getTime()) return []
    const out: Array<Date> = []
    let cursor = start
    while (cursor.getTime() <= end.getTime()) {
        out.push(cursor)
        cursor = addDays(cursor, 1)
    }
    return out
}

/**
 * Read the weekday short names for the given locale. The output is
 * already rotated so `firstDayOfWeek` is the first item.
 */
export function getWeekdayNames (locale: string, firstDayOfWeek: number, length: 'narrow' | 'short' | 'long' = 'short'): Array<string> {
    const formatter = new Intl.DateTimeFormat(locale, { weekday: length })
    // A known Sunday — 2000-01-02 — used as a stable anchor for the
    // weekday rotation. The actual day doesn't matter, only that we
    // know its weekday index.
    const anchor = new Date(2000, 0, 2)
    const out: Array<string> = []
    for (let i = 0; i < 7; i++) {
        const day = addDays(anchor, (firstDayOfWeek + i) % 7)
        out.push(formatter.format(day))
    }
    return out
}
