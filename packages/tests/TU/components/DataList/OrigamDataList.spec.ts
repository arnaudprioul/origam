// Unit tests for <OrigamDataList> — typography props (the shared ITypographyProps
// surface wired via two useTypography() calls, one per BEM-child surface).
//
// OrigamDataList sets typography vars on the root <dl> element via its
// `:style="dataListStyles"` binding. CSS custom properties cascade from the
// root to the `__title` and `__text` child elements where the SCSS reads them.
//
// Typography surfaces and their effective props (SCSS reads the generated var):
//   __title (varPrefix = 'data-list__title'): fontSize, fontWeight, lineHeight, letterSpacing
//   __text  (varPrefix = 'data-list__text'):  fontSize, lineHeight, letterSpacing
//     (fontWeight emits a __text var but no SCSS font-weight rule on __text)
//
// The component uses v-contrast (canvas-based — jsdom emits HTMLCanvasElement
// warnings, expected and harmless) and renders OrigamDataTitle / OrigamDataText
// children (stubbed to keep the test isolated from transitive deps).

import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamDataList } from '@origam/components'
import { createOrigam } from '@origam/origam'

const basicItems = [
    { title: { text: 'Status' }, text: [{ text: 'Active' }] }
]

function mountDl (props: Record<string, unknown> = {}) {
    return mount(OrigamDataList, {
        props: { items: basicItems, ...props } as never,
        global: {
            plugins: [createOrigam()],
            stubs: {
                OrigamDataTitle: { template: '<dt class="origam-data-list__title"/>' },
                OrigamDataText:  { template: '<dd class="origam-data-list__text"/>' }
            },
            directives: { contrast: {} }
        }
    })
}

function styleOf (props: Record<string, unknown> = {}): string {
    return mountDl(props).find('.origam-data-list').attributes('style') ?? ''
}

// ─── __title surface ─────────────────────────────────────────────────────────

describe('OrigamDataList — fontSize prop (data-list__title surface)', () => {
    it('emits no title font-size override when fontSize is unset', () => {
        expect(styleOf()).not.toContain('--origam-data-list__title---font-size:')
    })

    it('fontSize="xl" sets the title font-size var to the xl token', () => {
        expect(styleOf({ fontSize: 'xl' })).toContain('--origam-data-list__title---font-size: var(--origam-font__size---xl)')
    })

    it('fontSize="sm" sets the title font-size var to the sm token', () => {
        expect(styleOf({ fontSize: 'sm' })).toContain('--origam-data-list__title---font-size: var(--origam-font__size---sm)')
    })
})

describe('OrigamDataList — fontWeight prop (data-list__title surface)', () => {
    it('emits no title font-weight override when fontWeight is unset', () => {
        expect(styleOf()).not.toContain('--origam-data-list__title---font-weight:')
    })

    it('fontWeight="bold" sets the title font-weight var to the bold token', () => {
        expect(styleOf({ fontWeight: 'bold' })).toContain('--origam-data-list__title---font-weight: var(--origam-font__weight---bold)')
    })

    it('fontWeight="semibold" sets the title font-weight var to the semibold token', () => {
        expect(styleOf({ fontWeight: 'semibold' })).toContain('--origam-data-list__title---font-weight: var(--origam-font__weight---semibold)')
    })
})

describe('OrigamDataList — lineHeight prop (data-list__title surface)', () => {
    it('emits no title line-height override when lineHeight is unset', () => {
        expect(styleOf()).not.toContain('--origam-data-list__title---line-height:')
    })

    it('lineHeight="loose" sets the title line-height var to the loose token', () => {
        expect(styleOf({ lineHeight: 'loose' })).toContain('--origam-data-list__title---line-height: var(--origam-font__lineHeight---loose)')
    })

    it('lineHeight="tight" sets the title line-height var to the tight token', () => {
        expect(styleOf({ lineHeight: 'tight' })).toContain('--origam-data-list__title---line-height: var(--origam-font__lineHeight---tight)')
    })
})

describe('OrigamDataList — letterSpacing prop (data-list__title surface)', () => {
    it('emits no title letter-spacing override when letterSpacing is unset', () => {
        expect(styleOf()).not.toContain('--origam-data-list__title---letter-spacing:')
    })

    it('letterSpacing="wide" sets the title letter-spacing var to the wide token', () => {
        expect(styleOf({ letterSpacing: 'wide' })).toContain('--origam-data-list__title---letter-spacing: var(--origam-font__letterSpacing---wide)')
    })

    it('letterSpacing="tight" sets the title letter-spacing var to the tight token', () => {
        expect(styleOf({ letterSpacing: 'tight' })).toContain('--origam-data-list__title---letter-spacing: var(--origam-font__letterSpacing---tight)')
    })
})

// ─── __text surface ───────────────────────────────────────────────────────────

describe('OrigamDataList — fontSize prop (data-list__text surface)', () => {
    it('emits no text font-size override when fontSize is unset', () => {
        expect(styleOf()).not.toContain('--origam-data-list__text---font-size:')
    })

    it('fontSize="xl" sets the text font-size var to the xl token', () => {
        expect(styleOf({ fontSize: 'xl' })).toContain('--origam-data-list__text---font-size: var(--origam-font__size---xl)')
    })

    it('fontSize="sm" sets the text font-size var to the sm token', () => {
        expect(styleOf({ fontSize: 'sm' })).toContain('--origam-data-list__text---font-size: var(--origam-font__size---sm)')
    })
})

describe('OrigamDataList — lineHeight prop (data-list__text surface)', () => {
    it('emits no text line-height override when lineHeight is unset', () => {
        expect(styleOf()).not.toContain('--origam-data-list__text---line-height:')
    })

    it('lineHeight="loose" sets the text line-height var to the loose token', () => {
        expect(styleOf({ lineHeight: 'loose' })).toContain('--origam-data-list__text---line-height: var(--origam-font__lineHeight---loose)')
    })

    it('lineHeight="tight" sets the text line-height var to the tight token', () => {
        expect(styleOf({ lineHeight: 'tight' })).toContain('--origam-data-list__text---line-height: var(--origam-font__lineHeight---tight)')
    })
})

describe('OrigamDataList — letterSpacing prop (data-list__text surface)', () => {
    it('emits no text letter-spacing override when letterSpacing is unset', () => {
        expect(styleOf()).not.toContain('--origam-data-list__text---letter-spacing:')
    })

    it('letterSpacing="wide" sets the text letter-spacing var to the wide token', () => {
        expect(styleOf({ letterSpacing: 'wide' })).toContain('--origam-data-list__text---letter-spacing: var(--origam-font__letterSpacing---wide)')
    })

    it('letterSpacing="tight" sets the text letter-spacing var to the tight token', () => {
        expect(styleOf({ letterSpacing: 'tight' })).toContain('--origam-data-list__text---letter-spacing: var(--origam-font__letterSpacing---tight)')
    })
})

// ─── Cross-surface coherence ──────────────────────────────────────────────────

describe('OrigamDataList — fontSize drives both surfaces simultaneously', () => {
    it('a single fontSize prop sets vars on both __title and __text surfaces', () => {
        const style = styleOf({ fontSize: 'lg' })

        expect(style).toContain('--origam-data-list__title---font-size: var(--origam-font__size---lg)')
        expect(style).toContain('--origam-data-list__text---font-size: var(--origam-font__size---lg)')
    })
})
