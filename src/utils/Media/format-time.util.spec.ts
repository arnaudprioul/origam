import { describe, expect, it } from 'vitest'

import { formatMediaTime } from './format-time.util'

describe('formatMediaTime', () => {
    it('returns the em-dash placeholder for NaN', () => {
        expect(formatMediaTime(NaN)).toBe('--:--')
    })

    it('returns the em-dash placeholder for negative values', () => {
        expect(formatMediaTime(-1)).toBe('--:--')
    })

    it('returns the em-dash placeholder for Infinity', () => {
        expect(formatMediaTime(Infinity)).toBe('--:--')
    })

    it('formats sub-minute durations with leading zero', () => {
        expect(formatMediaTime(5)).toBe('00:05')
    })

    it('formats short medias as mm:ss', () => {
        expect(formatMediaTime(65)).toBe('01:05')
        expect(formatMediaTime(130)).toBe('02:10')
    })

    it('formats hour-long medias as h:mm:ss', () => {
        expect(formatMediaTime(3725)).toBe('1:02:05')
        expect(formatMediaTime(7200)).toBe('2:00:00')
    })

    it('floors fractional seconds', () => {
        expect(formatMediaTime(65.9)).toBe('01:05')
    })
})
