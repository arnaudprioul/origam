import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { OrigamBtn } from '@origam/components'
import { createOrigam } from '@origam/origam'

const mountBtn = (props: Record<string, unknown>) =>
    mount(OrigamBtn, { props: props as never, global: { plugins: [createOrigam()] } })

const rootClass = (wrapper: ReturnType<typeof mountBtn>) => wrapper.get('.origam-btn').classes().join(' ')

describe('status overrides color/bgColor (non-overridable)', () => {
    it('forces the status intent bg over a consumer bgColor', () => {
        const cls = rootClass(mountBtn({ status: 'success', bgColor: 'primary', text: 'x' }))

        expect(cls).toContain('origam--bg-success')
        expect(cls).not.toContain('origam--bg-primary')
    })

    it('maps the `error` status to the `danger` intent', () => {
        expect(rootClass(mountBtn({ status: 'error', text: 'x' }))).toContain('origam--bg-danger')
    })

    it('leaves bgColor untouched when no status is set', () => {
        expect(rootClass(mountBtn({ bgColor: 'primary', text: 'x' }))).toContain('origam--bg-primary')
    })
})
