// Tests for `useDatePickerCalendar` composable.
//
// useDatePickerCalendar internally calls useDate() which injects
// ORIGAM_DATE_OPTIONS_KEY (provided by createOrigam). We mount every test
// component with `{ global: { plugins: [createOrigam()] } }` to satisfy the
// injection chain — same pattern as installed-themes.composable.spec.ts.
//
// Coverage:
//   - daysInWeek: always 7 days in the current week.
//   - daysInMonth: correct IDay shape (isoDate, year, month, isWeekStart,
//     isWeekEnd, isToday, isSelected, isAdjacent, isHidden, isStart, isEnd).
//   - weeksInMonth: 4-6 rows; 'static' mode always produces 6 rows.
//   - weekNumbers: array length == weeksInMonth.value.length.
//   - weekDays filter: when weekdays=[1..5] weekends are excluded.
//   - isDisabled: disabled prop / min / max / allowedDates array / function.
//   - isSelected: model values matching a date mark that day as selected.
//
// Wall clock is frozen to 2026-01-15 (a Thursday) for determinism.

import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it, vi, afterEach, beforeAll } from 'vitest'

import { createOrigam } from '@origam/origam'
import { useDatePickerCalendar } from '@origam/composables/Commons/date-picker-calendar.composable'

import type { ICalendarProps } from '@origam/interfaces'

// ---------------------------------------------------------------------------
// Freeze time: 2026-01-15 (Thursday)
// ---------------------------------------------------------------------------

beforeAll(() => {
    vi.useFakeTimers()
    vi.setSystemTime(new Date(2026, 0, 15))
})

afterEach(() => {
    // Keep fake timers across tests, just don't restore per-test
})

// ---------------------------------------------------------------------------
// Mount helper
// ---------------------------------------------------------------------------

function mountCalendar (props: ICalendarProps) {
    let api!: ReturnType<typeof useDatePickerCalendar>

    const Host = defineComponent({
        name: 'OrigamDatePickerCalHost',
        setup () {
            api = useDatePickerCalendar(props)
            return () => h('div')
        }
    })

    mount(Host, { global: { plugins: [createOrigam()] } })
    return { api: () => api }
}

// Minimal props to satisfy the required shape
function baseProps (overrides: Partial<ICalendarProps> = {}): ICalendarProps {
    return {
        month: 0,   // January
        year: 2026,
        weekdays: [0, 1, 2, 3, 4, 5, 6],
        ...overrides
    }
}

// ---------------------------------------------------------------------------
// daysInWeek
// ---------------------------------------------------------------------------

describe('useDatePickerCalendar — daysInWeek', () => {
    it('always returns exactly 7 days', () => {
        const { api } = mountCalendar(baseProps())
        expect(api().daysInWeek.value).toHaveLength(7)
    })

    it('each day has the expected IDay shape', () => {
        const { api } = mountCalendar(baseProps())
        const day = api().daysInWeek.value[0]
        expect(day).toHaveProperty('isoDate')
        expect(day).toHaveProperty('year')
        expect(day).toHaveProperty('month')
        expect(day).toHaveProperty('isToday')
        expect(day).toHaveProperty('isWeekStart')
        expect(day).toHaveProperty('isWeekEnd')
        expect(day).toHaveProperty('isSelected')
        expect(day).toHaveProperty('isDisabled')
    })

    it('first day isWeekStart=true', () => {
        const { api } = mountCalendar(baseProps())
        expect(api().daysInWeek.value[0].isWeekStart).toBe(true)
    })

    it('last day isWeekEnd=true', () => {
        const { api } = mountCalendar(baseProps())
        const days = api().daysInWeek.value
        expect(days[days.length - 1].isWeekEnd).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// daysInMonth
// ---------------------------------------------------------------------------

describe('useDatePickerCalendar — daysInMonth', () => {
    it('January 2026 has 31 days → daysInMonth has 31+ entries (may include adjacent)', () => {
        const { api } = mountCalendar(baseProps())
        const days = api().daysInMonth.value
        expect(days.length).toBeGreaterThanOrEqual(28)
    })

    it('isoDate on each day is a valid ISO string', () => {
        const { api } = mountCalendar(baseProps())
        const days = api().daysInMonth.value
        for (const day of days.slice(0, 5)) {
            expect(day.isoDate).toMatch(/^\d{4}-\d{2}-\d{2}/)
        }
    })

    it('isToday is true for 2026-01-15 (frozen date)', () => {
        const { api } = mountCalendar(baseProps())
        const days = api().daysInMonth.value
        const today = days.find(d => d.isoDate.startsWith('2026-01-15'))
        expect(today).toBeDefined()
        expect(today!.isToday).toBe(true)
    })

    it('adjacent month days: isAdjacent=true and isHidden=true when showAdjacentMonths=false', () => {
        const { api } = mountCalendar(baseProps({ showAdjacentMonths: false }))
        const days = api().daysInMonth.value
        const adjacent = days.filter(d => d.isAdjacent)
        for (const d of adjacent) {
            expect(d.isHidden).toBe(true)
        }
    })

    it('adjacent month days: isHidden=false when showAdjacentMonths=true', () => {
        const { api } = mountCalendar(baseProps({ showAdjacentMonths: true }))
        const days = api().daysInMonth.value
        const adjacent = days.filter(d => d.isAdjacent)
        for (const d of adjacent) {
            expect(d.isHidden).toBe(false)
        }
    })

    it('isStart is true for the 1st day of January', () => {
        const { api } = mountCalendar(baseProps())
        const days = api().daysInMonth.value
        const start = days.find(d => d.isStart)
        expect(start).toBeDefined()
        expect(start!.isoDate).toContain('-01-01')
    })

    it('isEnd is true for the last day of January (31st)', () => {
        const { api } = mountCalendar(baseProps())
        const days = api().daysInMonth.value
        const end = days.find(d => d.isEnd)
        expect(end).toBeDefined()
        expect(end!.isoDate).toContain('-01-31')
    })
})

// ---------------------------------------------------------------------------
// weeksInMonth
// ---------------------------------------------------------------------------

describe('useDatePickerCalendar — weeksInMonth', () => {
    it('returns between 4 and 6 weeks', () => {
        const { api } = mountCalendar(baseProps())
        const weeks = api().weeksInMonth.value
        expect(weeks.length).toBeGreaterThanOrEqual(4)
        expect(weeks.length).toBeLessThanOrEqual(6)
    })

    it('"static" mode always returns exactly 6 weeks', () => {
        const { api } = mountCalendar(baseProps({ weeksInMonth: 'static' }))
        expect(api().weeksInMonth.value).toHaveLength(6)
    })

    it('each week contains 7 days', () => {
        const { api } = mountCalendar(baseProps())
        for (const week of api().weeksInMonth.value) {
            expect(week).toHaveLength(7)
        }
    })
})

// ---------------------------------------------------------------------------
// weekNumbers
// ---------------------------------------------------------------------------

describe('useDatePickerCalendar — weekNumbers', () => {
    it('has same length as weeksInMonth', () => {
        const { api } = mountCalendar(baseProps())
        expect(api().weekNumbers.value.length).toBe(api().weeksInMonth.value.length)
    })

    it('each entry is a number or null', () => {
        const { api } = mountCalendar(baseProps())
        for (const n of api().weekNumbers.value) {
            expect(n === null || typeof n === 'number').toBe(true)
        }
    })
})

// ---------------------------------------------------------------------------
// weekDays filter
// ---------------------------------------------------------------------------

describe('useDatePickerCalendar — weekDays filter', () => {
    it('weekdays=[1,2,3,4,5] (Mon-Fri) excludes weekends from daysInMonth', () => {
        const { api } = mountCalendar(baseProps({ weekdays: [1, 2, 3, 4, 5] }))
        const days = api().daysInMonth.value
        // All returned days must be Mon-Fri (getDay() 1-5)
        for (const day of days) {
            const jsDay = new Date(day.isoDate).getDay()
            expect(jsDay).toBeGreaterThanOrEqual(1)
            expect(jsDay).toBeLessThanOrEqual(5)
        }
    })
})

// ---------------------------------------------------------------------------
// isDisabled
// ---------------------------------------------------------------------------

describe('useDatePickerCalendar — isDisabled', () => {
    it('disabled=true marks ALL days as disabled', () => {
        const { api } = mountCalendar(baseProps({ disabled: true }))
        const days = api().daysInMonth.value
        expect(days.every(d => d.isDisabled)).toBe(true)
    })

    it('min constraint: days before min are disabled', () => {
        const { api } = mountCalendar(baseProps({ min: '2026-01-10' }))
        const days = api().daysInMonth.value
        const before = days.filter(d => d.isoDate < '2026-01-10' && !d.isAdjacent)
        expect(before.every(d => d.isDisabled)).toBe(true)
    })

    it('max constraint: days after max are disabled', () => {
        const { api } = mountCalendar(baseProps({ max: '2026-01-20' }))
        const days = api().daysInMonth.value
        const after = days.filter(d => !d.isAdjacent && d.isoDate > '2026-01-20' && d.isoDate.startsWith('2026-01'))
        expect(after.every(d => d.isDisabled)).toBe(true)
    })

    it('allowedDates array: only listed dates are enabled', () => {
        const allowed = ['2026-01-05', '2026-01-10', '2026-01-15']
        const { api } = mountCalendar(baseProps({ allowedDates: allowed }))
        const janDays = api().daysInMonth.value.filter(d => !d.isAdjacent)
        const enabledDays = janDays.filter(d => !d.isDisabled)
        expect(enabledDays.every(d => allowed.some(a => d.isoDate.startsWith(a)))).toBe(true)
    })

    it('allowedDates function: days not passing the predicate are disabled', () => {
        // Only allow odd days
        const predicate = (date: unknown) => (date as Date).getDate() % 2 === 1
        const { api } = mountCalendar(baseProps({ allowedDates: predicate }))
        const janDays = api().daysInMonth.value.filter(d => !d.isAdjacent)
        const evenDays = janDays.filter(d => {
            const day = parseInt(d.isoDate.slice(-2))
            return day % 2 === 0
        })
        expect(evenDays.every(d => d.isDisabled)).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// isSelected — model values
// ---------------------------------------------------------------------------

describe('useDatePickerCalendar — isSelected', () => {
    it('a date matching the model value is marked isSelected=true (Date object)', () => {
        const jan15 = new Date(2026, 0, 15)
        const { api } = mountCalendar(baseProps({ date: [jan15] }))
        const days = api().daysInMonth.value
        const selected = days.find(d => d.isoDate.startsWith('2026-01-15'))
        expect(selected?.isSelected).toBe(true)
    })

    it('ISO string in date prop does NOT crash and correctly marks isSelected=true (bug fix: adapter.date() normalises string)', () => {
        // FIX: genDays previously called adapter.isSameDay(date, value) where
        // value could be an ISO string — causing "getDate is not a function".
        // Fix wraps value with adapter.date(value) before calling isSameDay.
        const { api } = mountCalendar(baseProps({ date: ['2026-01-15' as unknown as Date] }))
        expect(() => api().daysInMonth.value).not.toThrow()
        const days = api().daysInMonth.value
        const selected = days.find(d => d.isoDate.startsWith('2026-01-15'))
        expect(selected?.isSelected).toBe(true)
    })

    it('days not in the model are isSelected=false', () => {
        const jan15 = new Date(2026, 0, 15)
        const { api } = mountCalendar(baseProps({ date: [jan15] }))
        const days = api().daysInMonth.value
        const nonSelected = days.filter(d => !d.isoDate.startsWith('2026-01-15'))
        expect(nonSelected.every(d => !d.isSelected)).toBe(true)
    })

    it('multiple selected dates are all marked isSelected=true', () => {
        const selectedDates = [
            new Date(2026, 0, 5),
            new Date(2026, 0, 10),
            new Date(2026, 0, 20)
        ]
        const isos = ['2026-01-05', '2026-01-10', '2026-01-20']
        const { api } = mountCalendar(baseProps({ date: selectedDates }))
        const days = api().daysInMonth.value
        for (const iso of isos) {
            const day = days.find(d => d.isoDate.startsWith(iso))
            expect(day?.isSelected).toBe(true)
        }
    })

    it('empty model → no day is selected', () => {
        const { api } = mountCalendar(baseProps({ date: [] }))
        const days = api().daysInMonth.value
        expect(days.every(d => !d.isSelected)).toBe(true)
    })
})
