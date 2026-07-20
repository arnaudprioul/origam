import { afterEach, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamAvatarGroup } from '@origam/components'
import { createOrigam } from '@origam/origam'
import type { IOrigamTheme } from '@origam/interfaces'

afterEach(() => {
    document.querySelectorAll('style[data-origam-theme]').forEach(el => el.remove())
})

const ITEMS = [{ text: 'A' }, { text: 'B' }, { text: 'C' }]

const childClass = (props: Record<string, unknown>): string => {
    const wrapper = mount(OrigamAvatarGroup, {
        props: { items: ITEMS, max: 3, ...props } as never,
        global: { plugins: [createOrigam()] }
    })
    return wrapper.find('.origam-avatar').attributes('class') ?? ''
}

describe('OrigamAvatarGroup — rounded/border/elevation propagation', () => {
    it('propagates rounded to child avatars', () => {
        // NB: the DS's own baseline theme (`origam.theme.ts`) already ships
        // `'origam-avatar': { rounded: 'lg', … }` — using `'lg'` here would
        // make `base` and `withProp` collide by coincidence (both resolve
        // to the SAME baseline default) and the assertion below would pass
        // for the wrong reason. `'xl'` is guaranteed distinct from the
        // baseline so this only turns green if the prop was truly forwarded.
        const base = childClass({})
        const withProp = childClass({ rounded: 'xl' })
        expect(withProp, `base="${base}" with="${withProp}"`).not.toBe(base)
        expect(withProp).toMatch(/rounded/i)
    })

    it('propagates border to child avatars', () => {
        const base = childClass({})
        const withProp = childClass({ border: true })
        expect(withProp, `base="${base}" with="${withProp}"`).not.toBe(base)
        expect(withProp).toMatch(/border/i)
    })

    it('propagates elevation to child avatars', () => {
        const base = childClass({})
        const withProp = childClass({ elevation: 'xl' })
        expect(withProp, `base="${base}" with="${withProp}"`).not.toBe(base)
        expect(withProp).toMatch(/shadow|elevat/i)
    })
})

// Regression coverage for #263: `<origam-avatar-group>` used to forward
// EVERY visual-token prop unconditionally into the `'origam-avatar'` slot
// defaults it provides to its children — including props the consumer never
// set. For `border`/`rounded` this is not even an `undefined` — Vue resolves
// an unset prop whose type includes `boolean` to the concrete value `false`
// — so a naive `undefined` filter cannot catch it. The forwarded `false`
// then won the `mergeDeep` against an ancestor/theme `'origam-avatar'`
// default (e.g. `border: true`), silently erasing it — reported as "glass
// avatar-group renders with no border".
describe('OrigamAvatarGroup — does NOT clobber ancestor/theme avatar defaults (#263)', () => {
    const themeWithAvatarDefaults: IOrigamTheme = {
        name: 'glasslike',
        mode: 'light',
        components: { 'origam-avatar': { rounded: 'lg', border: true, elevation: 2 } },
        vars: {}
    }

    const themedChildClass = (props: Record<string, unknown> = {}): string => {
        const origam = createOrigam({ themes: [themeWithAvatarDefaults] })
        origam._defaultsRef.value = origam._activeDefaultsFor('glasslike', 'light')

        const wrapper = mount(OrigamAvatarGroup, {
            props: { items: ITEMS, max: 3, ...props } as never,
            global: { plugins: [origam] }
        })
        return wrapper.find('.origam-avatar').attributes('class') ?? ''
    }

    it('preserves the theme `border: true` default when the group passes no border prop', () => {
        const cls = themedChildClass()
        expect(cls).toMatch(/origam-avatar--border\b/)
    })

    it('preserves the theme `rounded: "lg"` default when the group passes no rounded prop', () => {
        const cls = themedChildClass()
        expect(cls).toMatch(/origam--rounded-lg\b/)
    })

    it('preserves the theme `elevation: 2` default when the group passes no elevation prop', () => {
        const cls = themedChildClass()
        expect(cls).toMatch(/origam-avatar--elevated\b/)
    })

    it('an EXPLICIT `border={false}` on the group still overrides the theme default', () => {
        const cls = themedChildClass({ border: false })
        expect(cls).not.toMatch(/origam-avatar--border\b/)
    })
})
