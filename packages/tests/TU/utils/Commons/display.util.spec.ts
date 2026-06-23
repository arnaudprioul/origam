// TU — display.util.ts
// Exports: parseDisplayOptions, getClientWidth, getClientHeight, getPlatform
//
// IN_BROWSER is true in jsdom (window is defined) so getClientWidth/Height
// will read window.innerWidth/innerHeight. We stub those values.
// SUPPORTS_TOUCH from consts drives the touch flag — jsdom does not expose
// touch APIs so this flag is false.

import { describe, expect, it, vi, afterEach } from 'vitest'
import {
    parseDisplayOptions,
    getClientWidth,
    getClientHeight,
    getPlatform
} from '@origam/utils/Commons/display.util'

afterEach(() => {
    vi.restoreAllMocks()
})

describe('parseDisplayOptions', () => {
    it('returns a complete options object when called with no arguments', () => {
        const result = parseDisplayOptions()
        // Must contain the expected keys from DEFAULT_DISPLAY_OPTIONS
        expect(result).toHaveProperty('mobileBreakpoint')
        expect(result).toHaveProperty('thresholds')
    })

    it('merges provided options over the defaults', () => {
        const result = parseDisplayOptions({ mobileBreakpoint: 'sm' } as any)
        expect(result.mobileBreakpoint).toBe('sm')
    })

    it('preserves unspecified default keys when partial options are provided', () => {
        const defaults = parseDisplayOptions()
        const custom  = parseDisplayOptions({ mobileBreakpoint: 'xl' } as any)
        expect(custom.thresholds).toEqual(defaults.thresholds)
    })
})

describe('getClientWidth', () => {
    it('returns window.innerWidth in a browser environment (no ssr arg)', () => {
        vi.stubGlobal('innerWidth', 1280)
        expect(getClientWidth()).toBe(1280)
    })

    it('returns 0 when ssr=true', () => {
        expect(getClientWidth(true)).toBe(0)
    })

    it('returns the clientWidth from an ssr options object', () => {
        expect(getClientWidth({ clientWidth: 768, clientHeight: 0 })).toBe(768)
    })

    it('returns 0 when ssr object has no clientWidth', () => {
        expect(getClientWidth({ clientHeight: 0 } as any)).toBe(0)
    })
})

describe('getClientHeight', () => {
    it('returns window.innerHeight in a browser environment', () => {
        vi.stubGlobal('innerHeight', 800)
        expect(getClientHeight()).toBe(800)
    })

    it('returns 0 when ssr=true', () => {
        expect(getClientHeight(true)).toBe(0)
    })

    it('returns the clientHeight from an ssr options object', () => {
        expect(getClientHeight({ clientWidth: 0, clientHeight: 1024 })).toBe(1024)
    })
})

describe('getPlatform', () => {
    it('returns a platform object with expected boolean flags', () => {
        const p = getPlatform()
        const flags = ['android', 'ios', 'cordova', 'electron', 'chrome', 'edge', 'firefox', 'opera', 'win', 'mac', 'linux', 'touch', 'ssr'] as const
        for (const flag of flags) {
            expect(typeof p[flag]).toBe('boolean')
        }
    })

    it('sets ssr=false in a browser-like environment (jsdom)', () => {
        const p = getPlatform()
        expect(p.ssr).toBe(false)
    })

    it('sets ssr=true when ssr option is provided', () => {
        const p = getPlatform(true)
        expect(p.ssr).toBe(true)
    })

    it('matches chrome flag to the userAgent', () => {
        vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 Chrome/118.0 Safari/537.36' })
        const p = getPlatform()
        expect(p.chrome).toBe(true)
        expect(p.firefox).toBe(false)
    })

    it('matches firefox flag to the userAgent', () => {
        vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (X11; Linux x86_64; rv:109.0) Gecko/20100101 Firefox/115.0' })
        const p = getPlatform()
        expect(p.firefox).toBe(true)
        expect(p.chrome).toBe(false)
    })

    it('matches android flag to the userAgent', () => {
        vi.stubGlobal('navigator', { userAgent: 'Mozilla/5.0 (Linux; Android 13; Pixel 7) AppleWebKit/537.36' })
        const p = getPlatform()
        expect(p.android).toBe(true)
        expect(p.ios).toBe(false)
    })
})
