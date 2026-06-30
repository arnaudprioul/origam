// Unit tests for <OrigamListSubheader> — typography props (the shared
// ITypographyProps surface wired by useTypography with the 'list-subheader'
// varPrefix).
//
// OrigamListSubheader applies its computed styles through `useStyle(listSubheaderStyles)`,
// which injects a scoped `<style>` element rather than an inline `style=""` attribute.
// The generated CSS string is exposed on the instance as `css`, so the assertions
// read `wrapper.vm.css` instead of the element's style attribute — same pattern
// as OrigamBtn.spec.ts and OrigamChip.spec.ts.
//
// The SCSS reads `--origam-list-subheader---font-size / font-weight / line-height`
// at the root level, so fontSize / fontWeight / lineHeight each have a real visual
// effect. fontFamily and letterSpacing emit their vars but the SCSS has no matching
// rules — they are not exercised here.

import { describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'

import OrigamListSubheader from '@origam/components/List/OrigamListSubheader.vue'
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

function mountSubheader (props: Record<string, unknown> = {}) {
    return mount(OrigamListSubheader, {
        props: { title: 'Section', ...props } as never,
        global: { plugins: [createOrigam()] }
    })
}

function cssOf (props: Record<string, unknown> = {}): string {
    return (mountSubheader(props).vm as unknown as { css: string }).css || ''
}

// ---------------------------------------------------------------------------
// fontSize
// ---------------------------------------------------------------------------

describe('OrigamListSubheader — fontSize prop', () => {
    it('emits no font-size override when fontSize is unset', () => {
        expect(cssOf()).not.toContain('--origam-list-subheader---font-size:')
    })

    it('fontSize="xl" sets the font-size var to the xl token', () => {
        expect(cssOf({ fontSize: 'xl' })).toContain('--origam-list-subheader---font-size: var(--origam-font__size---xl)')
    })

    it('fontSize="xs" sets the font-size var to the xs token', () => {
        expect(cssOf({ fontSize: 'xs' })).toContain('--origam-list-subheader---font-size: var(--origam-font__size---xs)')
    })
})

// ---------------------------------------------------------------------------
// fontWeight
// ---------------------------------------------------------------------------

describe('OrigamListSubheader — fontWeight prop', () => {
    it('emits no font-weight override when fontWeight is unset', () => {
        expect(cssOf()).not.toContain('--origam-list-subheader---font-weight:')
    })

    it('fontWeight="semibold" sets the font-weight var to the semibold token', () => {
        expect(cssOf({ fontWeight: 'semibold' })).toContain('--origam-list-subheader---font-weight: var(--origam-font__weight---semibold)')
    })

    it('fontWeight="bold" sets the font-weight var to the bold token', () => {
        expect(cssOf({ fontWeight: 'bold' })).toContain('--origam-list-subheader---font-weight: var(--origam-font__weight---bold)')
    })
})

// ---------------------------------------------------------------------------
// lineHeight
// ---------------------------------------------------------------------------

describe('OrigamListSubheader — lineHeight prop', () => {
    it('emits no line-height override when lineHeight is unset', () => {
        expect(cssOf()).not.toContain('--origam-list-subheader---line-height:')
    })

    it('lineHeight="relaxed" sets the line-height var to the relaxed token', () => {
        expect(cssOf({ lineHeight: 'relaxed' })).toContain('--origam-list-subheader---line-height: var(--origam-font__lineHeight---relaxed)')
    })

    it('lineHeight="tight" sets the line-height var to the tight token', () => {
        expect(cssOf({ lineHeight: 'tight' })).toContain('--origam-list-subheader---line-height: var(--origam-font__lineHeight---tight)')
    })
})
