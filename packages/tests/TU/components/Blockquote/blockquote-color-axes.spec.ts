import { describe, expect, it } from 'vitest'
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

describe('OrigamBlockquote — color = text, bgColor = accent', () => {
    it('color (intent) drives the TEXT via --color-{intent}, not the accent', () => {
        const cls = rootClass({ color: 'danger' })
        expect(cls).toMatch(/origam-blockquote--color-danger/)
        expect(cls).not.toMatch(/--accent-danger/)
    })

    it('bgColor (intent) drives the ACCENT via --accent-{intent}, not the text', () => {
        const cls = rootClass({ bgColor: 'success' })
        expect(cls).toMatch(/origam-blockquote--accent-success/)
        expect(cls).not.toMatch(/--color-success/)
    })

    it('the two axes are independent', () => {
        const cls = rootClass({ color: 'danger', bgColor: 'success' })
        expect(cls).toMatch(/origam-blockquote--color-danger/)
        expect(cls).toMatch(/origam-blockquote--accent-success/)
    })

    it('a custom color value falls back to inline text + source colour vars (no class)', () => {
        expect(rootClass({ color: '#ff0080' })).not.toMatch(/origam-blockquote--color-/)
        const style = rootStyle({ color: '#ff0080' })
        expect(style).toMatch(/--origam-blockquote---color:\s*#ff0080/)
        expect(style).toMatch(/--origam-blockquote__source---color:\s*#ff0080/)
    })

    it('a custom bgColor value falls back to inline accent vars (no class)', () => {
        expect(rootClass({ bgColor: '#00ffaa' })).not.toMatch(/origam-blockquote--accent-/)
        expect(rootStyle({ bgColor: '#00ffaa' })).toMatch(/--origam-blockquote---resolved-accent-color:\s*#00ffaa/)
    })

    it('inherits the standard cross-cutting surfaces (rounded/border)', () => {
        const cls = rootClass({ rounded: 'lg', border: true })
        expect(cls).toMatch(/rounded/i)
        expect(cls).toMatch(/border/i)
    })
})
