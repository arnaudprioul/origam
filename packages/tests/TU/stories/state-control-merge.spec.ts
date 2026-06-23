import { describe, expect, it } from 'vitest'
import { applyState } from '@histoire/shared'

import {
    ACTIVE_OPTIONS,
    HOVER_OPTIONS,
    resolveActiveState,
    resolveHoverState
} from '@stories/const'

/**
 * Regression guard for the State-variant hover/active control bug.
 *
 * Histoire syncs control state panel→sandbox via `applyState`, which does
 * `Object.assign(target[key], value)` when the existing value is a plain
 * object — i.e. it MERGES successive selections. Binding the IHoverState /
 * IActiveState OBJECT directly therefore accumulated keys
 * ({ bgColor } then { border } → { bgColor, border }). The fix stores the
 * option's label (a STRING) as the control value and resolves it back to the
 * object in the story `#default`. A string can't be merged, so it replaces.
 */
describe('State control — Histoire applyState merge guard', () => {
    it('REPRODUCES the bug: object values MERGE under the real applyState', () => {
        const target: { hover?: unknown } = { hover: undefined }
        applyState(target, { hover: { bgColor: 'success' } })
        applyState(target, { hover: { border: '2px dashed' } })

        expect(target.hover).toEqual({ bgColor: 'success', border: '2px dashed' })
    })

    it('THE FIX: string keys REPLACE under the real applyState', () => {
        const target: { hover?: unknown } = { hover: undefined }
        applyState(target, { hover: 'bgColor → success' })
        applyState(target, { hover: 'border → 2px dashed' })

        expect(target.hover).toBe('border → 2px dashed')
    })

    it('resolveHoverState turns a key back into the exact IHoverState object', () => {
        expect(resolveHoverState('border → 2px dashed')).toEqual({ border: '2px dashed' })
        expect(resolveHoverState('bgColor → success')).toEqual({ bgColor: 'success' })
    })

    it('resolveActiveState turns a key back into the exact IActiveState object', () => {
        expect(resolveActiveState('border → 2px dashed')).toEqual({ border: '2px dashed' })
    })

    it('resolvers pass boolean / undefined through unchanged (forced-on + reset)', () => {
        expect(resolveHoverState(undefined)).toBeUndefined()
        expect(resolveHoverState(true)).toBe(true)
        expect(resolveActiveState(false)).toBe(false)
        expect(resolveActiveState(undefined)).toBeUndefined()
    })

    it('every published HOVER/ACTIVE option key resolves to a real state object', () => {
        for (const option of HOVER_OPTIONS) {
            expect(resolveHoverState(option.value), option.value).toBeTypeOf('object')
        }
        for (const option of ACTIVE_OPTIONS) {
            expect(resolveActiveState(option.value), option.value).toBeTypeOf('object')
        }
    })

    it('options expose STRING values (never objects) so applyState can never merge them', () => {
        for (const option of [...HOVER_OPTIONS, ...ACTIVE_OPTIONS]) {
            expect(typeof option.value).toBe('string')
        }
    })
})
