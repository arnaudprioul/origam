// Tests for the DataTable cell composable.
//
// Covers:
//   - getPadding returns '0 8' for special keys (data-table-select, data-table-expand)
//   - getPadding returns column.padding when it is set
//   - getPadding returns undefined for normal columns without padding

import { describe, expect, it } from 'vitest'

import { useCell } from '@origam/composables/DataTable/cell.composable'
import type { IInternalDataTableHeader } from '@origam/interfaces'

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function makeColumn (key: string | null, padding?: string | number): IInternalDataTableHeader {
    return {
        key,
        value: key,
        title: key ?? '',
        sortable: false,
        padding,
        colspan: 1,
        rowspan: 1
    } as unknown as IInternalDataTableHeader
}

// ---------------------------------------------------------------------------
// useCell — getPadding
// ---------------------------------------------------------------------------

describe('useCell — getPadding', () => {
    it('data-table-select key → returns "0 8"', () => {
        const { getPadding } = useCell()
        expect(getPadding(makeColumn('data-table-select'))).toBe('0 8')
    })

    it('data-table-expand key → returns "0 8"', () => {
        const { getPadding } = useCell()
        expect(getPadding(makeColumn('data-table-expand'))).toBe('0 8')
    })

    it('column with explicit padding → returns that padding value (string)', () => {
        const { getPadding } = useCell()
        expect(getPadding(makeColumn('name', '4 16'))).toBe('4 16')
    })

    it('column with explicit padding → returns that padding value (number)', () => {
        const { getPadding } = useCell()
        expect(getPadding(makeColumn('name', 8))).toBe(8)
    })

    it('normal column without padding → returns undefined', () => {
        const { getPadding } = useCell()
        expect(getPadding(makeColumn('name'))).toBeUndefined()
    })

    it('column with null key and no padding → returns undefined', () => {
        const { getPadding } = useCell()
        expect(getPadding(makeColumn(null))).toBeUndefined()
    })
})
