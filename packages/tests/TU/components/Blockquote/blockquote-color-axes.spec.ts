import { beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamBlockquote } from '@origam/components'
import { createOrigam } from '@origam/origam'

const mountBq = (props: Record<string, unknown>) =>
    mount(OrigamBlockquote, {
        props: props as never,
        slots: { default: () => 'Talk is cheap.' },
        global: { plugins: [createOrigam()] }
    })

const rootClass = (props: Record<string, unknown>): string =>
    mountBq(props).find('.origam-blockquote').attributes('class') ?? ''

const rootStyle = (props: Record<string, unknown>): string =>
    mountBq(props).find('.origam-blockquote').attributes('style') ?? ''

describe('OrigamBlockquote — color = text, accentColor = accent', () => {
    it('color (intent) drives the TEXT via --color-{intent}, not the accent', () => {
        const cls = rootClass({ color: 'danger' })
        expect(cls).toMatch(/origam-blockquote--color-danger/)
        expect(cls).not.toMatch(/--accent-danger/)
    })

    it('accentColor (intent) drives the ACCENT via --accent-{intent}, not the text', () => {
        const cls = rootClass({ accentColor: 'success' })
        expect(cls).toMatch(/origam-blockquote--accent-success/)
        expect(cls).not.toMatch(/--color-success/)
    })

    it('the two axes are independent', () => {
        const cls = rootClass({ color: 'danger', accentColor: 'success' })
        expect(cls).toMatch(/origam-blockquote--color-danger/)
        expect(cls).toMatch(/origam-blockquote--accent-success/)
    })

    it('a custom color value falls back to inline text + source colour vars (no class)', () => {
        expect(rootClass({ color: '#ff0080' })).not.toMatch(/origam-blockquote--color-/)
        const style = rootStyle({ color: '#ff0080' })
        expect(style).toMatch(/--origam-blockquote---color:\s*#ff0080/)
        expect(style).toMatch(/--origam-blockquote__source---color:\s*#ff0080/)
    })

    it('a custom accentColor value falls back to inline accent vars (no class)', () => {
        expect(rootClass({ accentColor: '#00ffaa' })).not.toMatch(/origam-blockquote--accent-/)
        expect(rootStyle({ accentColor: '#00ffaa' })).toMatch(/--origam-blockquote---resolved-accent-color:\s*#00ffaa/)
    })

    it('inherits the standard cross-cutting surfaces (rounded/border)', () => {
        const cls = rootClass({ rounded: 'lg', border: true })
        expect(cls).toMatch(/rounded/i)
        expect(cls).toMatch(/border/i)
    })
})

// `warnDeprecatedProp` caches "already warned" per (component, oldProp,
// newProp) in a module-level Set for the lifetime of the module (mirrors
// `warnLegacyColor`'s once-per-key cache — see color.util.ts). Unlike
// `warnLegacyColor`'s spec (which dodges cross-test collisions with unique
// per-test sentinel VALUES), the key here is fixed for a given component +
// prop pair — there is no value to vary. So the warn-once behaviour is
// asserted in a SINGLE self-contained test (two mounts, one assertion
// block) rather than spread across independent `it`s: any other test in
// this file that also mounts with `bgColor` alone would silently consume
// the same "first warn" budget and make a separate assertion order-
// dependent. (NOTE: `vi.resetModules()` was tried first to get a clean
// cache per test, matching `TU/utils/Commons/requestNewFrame.util.spec.ts`
// — it does NOT work here: resetting the module registry also reloads
// `vue` itself, so the dynamically re-imported component is compiled
// against a different Vue runtime instance than the one `@vue/test-utils`
// already loaded, and `mount()` silently renders an empty shell. Pure-util
// specs don't hit this because they never touch Vue.)
describe('OrigamBlockquote — bgColor deprecated alias for accentColor', () => {
    let warnSpy: ReturnType<typeof vi.spyOn>

    beforeEach(() => {
        warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)
    })

    it('bgColor (intent) drives the ACCENT like accentColor, warns once, and does not re-warn for a later value', () => {
        const clsA = rootClass({ bgColor: 'success' })
        expect(clsA).toMatch(/origam-blockquote--accent-success/)
        expect(clsA).not.toMatch(/--color-success/)
        expect(warnSpy).toHaveBeenCalledWith(
            expect.stringMatching(/OrigamBlockquote.*prop "bgColor" is deprecated.*"accentColor"/)
        )
        expect(warnSpy).toHaveBeenCalledTimes(1)

        // A second mount with a DIFFERENT bgColor value renders correctly
        // but does NOT warn again — the cache is keyed by (component,
        // oldProp, newProp), not by value.
        const clsB = rootClass({ bgColor: 'danger' })
        expect(clsB).toMatch(/origam-blockquote--accent-danger/)
        expect(warnSpy).toHaveBeenCalledTimes(1)
    })

    it('a custom bgColor value still falls back to inline accent vars (no class)', () => {
        expect(rootClass({ bgColor: '#00ffaa' })).not.toMatch(/origam-blockquote--accent-/)
        expect(rootStyle({ bgColor: '#00ffaa' })).toMatch(/--origam-blockquote---resolved-accent-color:\s*#00ffaa/)
    })

    it('accentColor wins over bgColor when both are set', () => {
        const cls = rootClass({ bgColor: 'success', accentColor: 'danger' })
        expect(cls).toMatch(/origam-blockquote--accent-danger/)
        expect(cls).not.toMatch(/--accent-success/)
    })

    it('using accentColor alone does NOT log a deprecation warning', () => {
        mountBq({ accentColor: 'primary' })
        expect(warnSpy).not.toHaveBeenCalled()
    })

    it('using neither prop does NOT log a deprecation warning', () => {
        mountBq({})
        expect(warnSpy).not.toHaveBeenCalled()
    })
})
