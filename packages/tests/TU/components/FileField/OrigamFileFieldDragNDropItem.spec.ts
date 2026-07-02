// Unit tests for <OrigamFileFieldDragNDropItem> — typography props
// (ITypographyProps surface wired via useTypography).
//
// Typography is bound on .origam-file-field-dragndrop-item__name (the file
// name text surface). Effective props: fontSize, fontWeight.
// The __meta surface (font-size only) is a secondary, multi-surface candidate
// pending its own typography binding — not exercised here.

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamFileFieldDragNDropItem from '@origam/components/FileField/OrigamFileFieldDragNDropItem.vue'
import { createOrigam } from '@origam/origam'

Object.defineProperty(window, 'matchMedia', {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
        matches: false,
        media: query,
        onchange: null,
        addListener: vi.fn(),
        removeListener: vi.fn(),
        addEventListener: vi.fn(),
        removeEventListener: vi.fn(),
        dispatchEvent: vi.fn()
    }))
})

const mockFile = (name = 'test.pdf'): File => {
    const blob = new Blob([''], { type: 'application/pdf' })
    return new File([blob], name, { type: 'application/pdf' })
}

function mountDragNDropItem (props: Record<string, unknown> = {}) {
    return mount(OrigamFileFieldDragNDropItem, {
        props: { file: mockFile(), index: 0, ...props } as never,
        global: {
            plugins: [createOrigam()],
            stubs: {
                OrigamBtn: { template: '<button />' },
                OrigamIcon: { template: '<i />' },
                OrigamProgress: { template: '<div />' }
            }
        }
    })
}

function nameStyle (props: Record<string, unknown> = {}): string {
    return mountDragNDropItem(props).find('.origam-file-field-dragndrop-item__name').attributes('style') || ''
}

// ---------------------------------------------------------------------------
// Surface presence + no-op guard
// ---------------------------------------------------------------------------

describe('OrigamFileFieldDragNDropItem — typography surface (__name)', () => {
    it('renders the __name element in the default slot', () => {
        const wrapper = mountDragNDropItem()
        expect(wrapper.find('.origam-file-field-dragndrop-item__name').exists()).toBe(true)
    })

    it('emits no typography override when no typo prop is set', () => {
        expect(nameStyle()).not.toContain('--origam-file-field-dragndrop-item__name---')
    })
})

// ---------------------------------------------------------------------------
// fontSize prop
// ---------------------------------------------------------------------------

describe('OrigamFileFieldDragNDropItem — fontSize prop', () => {
    it('fontSize="xl" → --origam-file-field-dragndrop-item__name---font-size: var(--origam-font__size---xl)', () => {
        expect(nameStyle({ fontSize: 'xl' })).toContain(
            '--origam-file-field-dragndrop-item__name---font-size: var(--origam-font__size---xl)'
        )
    })

    it('fontSize="sm" → --origam-file-field-dragndrop-item__name---font-size: var(--origam-font__size---sm)', () => {
        expect(nameStyle({ fontSize: 'sm' })).toContain(
            '--origam-file-field-dragndrop-item__name---font-size: var(--origam-font__size---sm)'
        )
    })

    it('emits no font-size override when fontSize is unset', () => {
        expect(nameStyle()).not.toContain('---font-size:')
    })
})

// ---------------------------------------------------------------------------
// fontWeight prop
// ---------------------------------------------------------------------------

describe('OrigamFileFieldDragNDropItem — fontWeight prop', () => {
    it('fontWeight="bold" → --origam-file-field-dragndrop-item__name---font-weight: var(--origam-font__weight---bold)', () => {
        expect(nameStyle({ fontWeight: 'bold' })).toContain(
            '--origam-file-field-dragndrop-item__name---font-weight: var(--origam-font__weight---bold)'
        )
    })

    it('fontWeight="regular" → --origam-file-field-dragndrop-item__name---font-weight: var(--origam-font__weight---regular)', () => {
        expect(nameStyle({ fontWeight: 'regular' })).toContain(
            '--origam-file-field-dragndrop-item__name---font-weight: var(--origam-font__weight---regular)'
        )
    })

    it('emits no font-weight override when fontWeight is unset', () => {
        expect(nameStyle()).not.toContain('---font-weight:')
    })
})
