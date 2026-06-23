// TU — console.util.ts
// Exports: consoleWarn, consoleError
//
// Both functions call Vue's `warn()` with a prefixed message.
// In a non-Vue-app context, Vue's warn() calls console.warn internally.
// We spy on console.warn to assert the prefix.

import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { consoleWarn, consoleError } from '@origam/utils/Commons/console.util'

describe('consoleWarn', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
        consoleSpy.mockRestore()
    })

    it('triggers a console.warn call', () => {
        consoleWarn('something bad')
        expect(consoleSpy).toHaveBeenCalled()
    })

    it('includes the "Origam:" prefix in the warning output', () => {
        consoleWarn('test message')
        const args = consoleSpy.mock.calls[0]
        // Vue's warn serialises as a string — check at least one arg contains our message
        const allArgs = args.join(' ')
        expect(allArgs).toContain('Origam:')
        expect(allArgs).toContain('test message')
    })

    it('handles an empty message without throwing', () => {
        expect(() => consoleWarn('')).not.toThrow()
    })

    it('handles a long message', () => {
        const longMsg = 'x'.repeat(500)
        expect(() => consoleWarn(longMsg)).not.toThrow()
        const allArgs = consoleSpy.mock.calls[0].join(' ')
        expect(allArgs).toContain(longMsg)
    })
})

describe('consoleError', () => {
    let consoleSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, 'warn').mockImplementation(() => {})
    })

    afterEach(() => {
        consoleSpy.mockRestore()
    })

    it('triggers a console.warn call (Vue warn is always warn)', () => {
        consoleError('error occurred')
        expect(consoleSpy).toHaveBeenCalled()
    })

    it('includes the "Origam error:" prefix', () => {
        consoleError('something failed')
        const allArgs = consoleSpy.mock.calls[0].join(' ')
        expect(allArgs).toContain('Origam error:')
        expect(allArgs).toContain('something failed')
    })

    it('handles an empty message without throwing', () => {
        expect(() => consoleError('')).not.toThrow()
    })
})
