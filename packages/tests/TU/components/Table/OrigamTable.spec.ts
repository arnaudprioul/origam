// Unit tests for OrigamTable — typography props surface.
//
// Three SCSS surfaces are tested:
//   'table'             → --origam-table---font-size         (root body)
//   'table__caption'    → --origam-table__caption---font-size (caption element, via :style binding)
//   'table__header-cell'→ --origam-table__header-cell---font-weight (root, cascades via :deep(th))
//
// Only fontSize and fontWeight have a visible effect (the SCSS reads those vars).
// fontFamily, lineHeight, letterSpacing are not exposed.

import { mount, type VueWrapper } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import OrigamTable from '@origam/components/Table/OrigamTable.vue'
import { createOrigam } from '@origam/origam'

import type { ITableProps } from '@origam/interfaces'

const mountTable = (props: Partial<ITableProps> = {}): VueWrapper => {
    return mount(OrigamTable, {
        props,
        global: {
            plugins: [createOrigam()]
        }
    })
}

// ---------------------------------------------------------------------------
// fontSize → 'table' surface (root body)
// ---------------------------------------------------------------------------
describe('OrigamTable — fontSize prop (table root body)', () => {
    it('does not emit --origam-table---font-size when fontSize is unset', () => {
        const wrapper = mountTable()
        expect(wrapper.attributes('style') ?? '').not.toContain('--origam-table---font-size')
    })

    it('fontSize="xl" → --origam-table---font-size: var(--origam-font__size---xl) on root', () => {
        const wrapper = mountTable({ fontSize: 'xl' })
        expect(wrapper.attributes('style')).toContain('--origam-table---font-size: var(--origam-font__size---xl)')
    })

    it('fontSize="sm" → --origam-table---font-size: var(--origam-font__size---sm) on root', () => {
        const wrapper = mountTable({ fontSize: 'sm' })
        expect(wrapper.attributes('style')).toContain('--origam-table---font-size: var(--origam-font__size---sm)')
    })
})

// ---------------------------------------------------------------------------
// fontSize → 'table__caption' surface (caption element inline style)
// ---------------------------------------------------------------------------
describe('OrigamTable — fontSize prop (table__caption surface)', () => {
    it('does not emit --origam-table__caption---font-size when fontSize is unset', () => {
        const wrapper = mountTable({ caption: 'Test caption' })
        const caption = wrapper.find('caption')
        expect(caption.attributes('style') ?? '').not.toContain('--origam-table__caption---font-size')
    })

    it('fontSize="lg" → --origam-table__caption---font-size: var(--origam-font__size---lg) on caption', () => {
        const wrapper = mountTable({ caption: 'Test caption', captionVisible: true, fontSize: 'lg' })
        const caption = wrapper.find('caption')
        expect(caption.attributes('style')).toContain('--origam-table__caption---font-size: var(--origam-font__size---lg)')
    })

    it('fontSize="2xl" → --origam-table__caption---font-size: var(--origam-font__size---2xl) on caption', () => {
        const wrapper = mountTable({ caption: 'Test caption', captionVisible: true, fontSize: '2xl' })
        const caption = wrapper.find('caption')
        expect(caption.attributes('style')).toContain('--origam-table__caption---font-size: var(--origam-font__size---2xl)')
    })
})

// ---------------------------------------------------------------------------
// fontWeight → 'table__header-cell' surface (root, cascades to :deep(th))
// ---------------------------------------------------------------------------
describe('OrigamTable — fontWeight prop (table__header-cell cascade from root)', () => {
    it('does not emit --origam-table__header-cell---font-weight when fontWeight is unset', () => {
        const wrapper = mountTable()
        expect(wrapper.attributes('style') ?? '').not.toContain('--origam-table__header-cell---font-weight')
    })

    it('fontWeight="bold" → --origam-table__header-cell---font-weight: var(--origam-font__weight---bold) on root', () => {
        const wrapper = mountTable({ fontWeight: 'bold' })
        expect(wrapper.attributes('style')).toContain('--origam-table__header-cell---font-weight: var(--origam-font__weight---bold)')
    })

    it('fontWeight="semibold" → --origam-table__header-cell---font-weight: var(--origam-font__weight---semibold) on root', () => {
        const wrapper = mountTable({ fontWeight: 'semibold' })
        expect(wrapper.attributes('style')).toContain('--origam-table__header-cell---font-weight: var(--origam-font__weight---semibold)')
    })
})
