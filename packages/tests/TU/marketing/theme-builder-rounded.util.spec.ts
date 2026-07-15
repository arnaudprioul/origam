// Contrôle 3 (Rounded) — BOTH linked and unlinked modes write into the
// single `rounded` prop as a CSS-length string (never the 4 discrete
// `roundedTopLeft`/… props, which `useRounded` never reads — see the
// correction documented in `theme-builder-rounded.util.ts`). Order is
// TL/TR/BL/BR, matching `BORDER_RADIUS_REGEX` in the DS.
import { describe, expect, it } from 'vitest'

import {
    parseRoundedCorners,
    parseRoundedUniform,
    serializeRoundedCorners,
    serializeRoundedUniform
} from '~/utils/theme-builder-rounded.util'

describe('theme-builder-rounded.util', () => {
    describe('serializeRoundedCorners', () => {
        it('serialises corners in TL/TR/BL/BR order', () => {
            expect(serializeRoundedCorners({ topLeft: 1, topRight: 2, bottomLeft: 3, bottomRight: 4 })).toBe('1px 2px 3px 4px')
        })
    })

    describe('serializeRoundedUniform', () => {
        it('serialises a single px value', () => {
            expect(serializeRoundedUniform(8)).toBe('8px')
        })
    })

    describe('parseRoundedCorners', () => {
        it('parses a 4-value px string in TL/TR/BL/BR order', () => {
            expect(parseRoundedCorners('16px 16px 0px 0px')).toEqual({
                topLeft: 16, topRight: 16, bottomLeft: 0, bottomRight: 0
            })
        })

        it('returns null for a non-4-value string', () => {
            expect(parseRoundedCorners('8px')).toBeNull()
        })

        it('returns null when any part is not a plain px length', () => {
            expect(parseRoundedCorners('8px 8px 8px 8%')).toBeNull()
        })
    })

    describe('parseRoundedUniform', () => {
        it('parses a px string', () => {
            expect(parseRoundedUniform('8px')).toBe(8)
        })

        it('parses a bare numeric string', () => {
            expect(parseRoundedUniform('8')).toBe(8)
        })

        it('passes a number straight through', () => {
            expect(parseRoundedUniform(8)).toBe(8)
        })

        it('returns null for a named rung (not a length)', () => {
            expect(parseRoundedUniform('default')).toBeNull()
        })
    })

    describe('round trip', () => {
        it('serialise → parse restores the original corners', () => {
            const corners = { topLeft: 4, topRight: 8, bottomLeft: 12, bottomRight: 16 }
            expect(parseRoundedCorners(serializeRoundedCorners(corners))).toEqual(corners)
        })
    })
})
