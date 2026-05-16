import { describe, expect, it } from 'vitest'

import {
    addDays,
    buildDisabledPredicate,
    buildMonthMatrix,
    diffMinutes,
    eachDayOfInterval,
    endOfWeekFixed,
    formatTime,
    getWeekdayNames,
    isoWeekNumber,
    isPast,
    isToday,
    isWeekend,
    startOfWeekFixed,
    toDate
} from './date.util'

describe('Calendar date.util — toDate', () => {
    it('returns null for null/undefined', () => {
        expect(toDate(null)).toBe(null)
        expect(toDate(undefined)).toBe(null)
    })
    it('clones a Date input', () => {
        const d = new Date(2026, 4, 14)
        const out = toDate(d) as Date
        expect(out.getTime()).toBe(d.getTime())
        expect(out).not.toBe(d)
    })
    it('parses an ISO string', () => {
        const out = toDate('2026-05-14') as Date
        expect(out.getFullYear()).toBe(2026)
    })
    it('accepts a numeric epoch', () => {
        const millis = new Date(2026, 0, 1).getTime()
        const out = toDate(millis) as Date
        expect(out.getFullYear()).toBe(2026)
    })
    it('returns null for unparseable strings', () => {
        expect(toDate('not-a-date')).toBe(null)
    })
})

describe('Calendar date.util — startOfWeekFixed / endOfWeekFixed', () => {
    it('snaps to the configured first day (Monday=1)', () => {
        // 2026-05-14 is a Thursday
        const out = startOfWeekFixed(new Date(2026, 4, 14), 1)
        expect(out.getDay()).toBe(1)
        expect(out.getDate()).toBe(11)
    })
    it('snaps to Sunday when firstDayOfWeek=0', () => {
        const out = startOfWeekFixed(new Date(2026, 4, 14), 0)
        expect(out.getDay()).toBe(0)
        expect(out.getDate()).toBe(10)
    })
    it('endOfWeekFixed always returns start + 6 days', () => {
        const start = startOfWeekFixed(new Date(2026, 4, 14), 1)
        const end = endOfWeekFixed(new Date(2026, 4, 14), 1)
        expect(diffMinutes(start, end)).toBe(6 * 24 * 60)
    })
})

describe('Calendar date.util — isToday / isPast / isWeekend', () => {
    it('isToday returns true for now', () => {
        expect(isToday(new Date())).toBe(true)
    })
    it('isToday returns false for far dates', () => {
        expect(isToday(new Date(2000, 0, 1))).toBe(false)
    })
    it('isPast returns true for 1970', () => {
        expect(isPast(new Date(1970, 0, 1))).toBe(true)
    })
    it('isPast returns false for far future', () => {
        expect(isPast(new Date(3000, 0, 1))).toBe(false)
    })
    it('isWeekend recognises Saturday + Sunday', () => {
        // 2026-05-16 is Saturday, 2026-05-17 is Sunday
        expect(isWeekend(new Date(2026, 4, 16))).toBe(true)
        expect(isWeekend(new Date(2026, 4, 17))).toBe(true)
        expect(isWeekend(new Date(2026, 4, 18))).toBe(false)
    })
})

describe('Calendar date.util — diffMinutes', () => {
    it('returns 0 for the same date', () => {
        const d = new Date(2026, 4, 14, 10, 0)
        expect(diffMinutes(d, d)).toBe(0)
    })
    it('returns 60 for a 1h gap', () => {
        const a = new Date(2026, 4, 14, 10, 0)
        const b = new Date(2026, 4, 14, 11, 0)
        expect(diffMinutes(a, b)).toBe(60)
    })
    it('returns a negative value when b is before a', () => {
        const a = new Date(2026, 4, 14, 11, 0)
        const b = new Date(2026, 4, 14, 10, 0)
        expect(diffMinutes(a, b)).toBe(-60)
    })
})

describe('Calendar date.util — formatTime', () => {
    it('renders HH:MM in 24h mode', () => {
        const d = new Date(2026, 4, 14, 13, 5)
        expect(formatTime(d, '24h', 'en-US')).toMatch(/13[:.]05/)
    })
    it('renders AM/PM in 12h mode', () => {
        const d = new Date(2026, 4, 14, 13, 5)
        // intl renders "1:05 PM" or "1:05 pm" depending on engine
        expect(formatTime(d, '12h', 'en-US').toLowerCase()).toContain('pm')
    })
})

describe('Calendar date.util — buildMonthMatrix', () => {
    it('returns 6 rows of 7 cells', () => {
        const grid = buildMonthMatrix(new Date(2026, 4, 14), 1)
        expect(grid).toHaveLength(6)
        expect(grid[0]).toHaveLength(7)
    })
    it('starts on the configured weekday', () => {
        const grid = buildMonthMatrix(new Date(2026, 4, 14), 1)
        expect(grid[0][0].getDay()).toBe(1)
    })
})

describe('Calendar date.util — isoWeekNumber', () => {
    it('returns 1 for the first ISO week of the year', () => {
        // 2026-01-01 is a Thursday → ISO week 1
        expect(isoWeekNumber(new Date(2026, 0, 1))).toBe(1)
    })
    it('returns 20 for 2026-05-14 (Thursday)', () => {
        expect(isoWeekNumber(new Date(2026, 4, 14))).toBe(20)
    })
})

describe('Calendar date.util — buildDisabledPredicate', () => {
    it('returns a no-op predicate when input is undefined', () => {
        const pred = buildDisabledPredicate(undefined)
        expect(pred(new Date())).toBe(false)
    })
    it('forwards a function predicate untouched', () => {
        const pred = buildDisabledPredicate((d) => d.getFullYear() === 1999)
        expect(pred(new Date(1999, 0, 1))).toBe(true)
        expect(pred(new Date(2026, 0, 1))).toBe(false)
    })
    it('builds a set from an array of Dates', () => {
        const pred = buildDisabledPredicate([new Date(2026, 4, 14)])
        expect(pred(new Date(2026, 4, 14))).toBe(true)
        expect(pred(new Date(2026, 4, 15))).toBe(false)
    })
    it('builds a set from an array of strings', () => {
        const pred = buildDisabledPredicate(['2026-05-14'])
        const target = new Date('2026-05-14')
        expect(pred(target)).toBe(true)
    })
})

describe('Calendar date.util — eachDayOfInterval', () => {
    it('returns 7 dates for a 6-day inclusive range', () => {
        const out = eachDayOfInterval(new Date(2026, 4, 1), new Date(2026, 4, 7))
        expect(out).toHaveLength(7)
    })
    it('returns an empty array when end < start', () => {
        const out = eachDayOfInterval(new Date(2026, 4, 7), new Date(2026, 4, 1))
        expect(out).toEqual([])
    })
})

describe('Calendar date.util — getWeekdayNames', () => {
    it('returns 7 names', () => {
        const names = getWeekdayNames('en-US', 1)
        expect(names).toHaveLength(7)
    })
    it('rotates so Monday comes first when firstDayOfWeek=1', () => {
        const names = getWeekdayNames('en-US', 1, 'long')
        expect(names[0]).toBe('Monday')
        expect(names[6]).toBe('Sunday')
    })
})

describe('Calendar date.util — sanity on addDays composition', () => {
    it('addDays composes correctly', () => {
        const start = new Date(2026, 4, 14)
        const end = addDays(start, 30)
        expect(end.getMonth()).toBe(5) // June
    })
})
