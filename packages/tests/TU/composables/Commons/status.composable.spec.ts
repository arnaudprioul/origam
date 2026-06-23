// Tests for `useStatus` composable.
// Covers: statusIcon, statusIntent (STATUS_TO_INTENT mapping + fallback),
// icon/prependIcon/appendIcon routing by statusIconPosition, statusClasses,
// and override guards (explicit icons prevent status icon injection).

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IAdjacentProps, IStatusProps } from '@origam/interfaces'

import { useStatus } from '@origam/composables/Commons/status.composable'

type StatusTestProps = IStatusProps & IAdjacentProps

function mountWith (initial: StatusTestProps, name = 'OrigamStatusHost') {
    const props = reactive<StatusTestProps>({ ...initial })
    let api!: ReturnType<typeof useStatus>

    const Host = defineComponent({
        name,
        setup () {
            api = useStatus(props, name)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

describe('useStatus — statusIntent (STATUS_TO_INTENT mapping)', () => {
    it('status="success" → statusIntent = "success"', () => {
        const { api } = mountWith({ status: 'success' })
        expect(api().statusIntent.value).toBe('success')
    })

    it('status="info" → statusIntent = "info"', () => {
        const { api } = mountWith({ status: 'info' })
        expect(api().statusIntent.value).toBe('info')
    })

    it('status="warning" → statusIntent = "warning"', () => {
        const { api } = mountWith({ status: 'warning' })
        expect(api().statusIntent.value).toBe('warning')
    })

    it('status="error" → statusIntent = "danger" (mapping)', () => {
        const { api } = mountWith({ status: 'error' })
        expect(api().statusIntent.value).toBe('danger')
    })

    it('status=undefined → statusIntent = undefined', () => {
        const { api } = mountWith({})
        expect(api().statusIntent.value).toBeUndefined()
    })
})

describe('useStatus — prependIcon (default position = prepend)', () => {
    it('status="info", no statusIconPosition → prependIcon = "$info"', () => {
        const { api } = mountWith({ status: 'info' })
        expect(api().prependIcon.value).toBe('$info')
    })

    it('status="success", position="prepend" → prependIcon = "$success"', () => {
        const { api } = mountWith({ status: 'success', statusIconPosition: 'prepend' })
        expect(api().prependIcon.value).toBe('$success')
    })

    it('status="info", position="append" → prependIcon is undefined (no injection)', () => {
        const { api } = mountWith({ status: 'info', statusIconPosition: 'append' })
        expect(api().prependIcon.value).toBeUndefined()
    })

    it('status="info", position="both" → prependIcon = "$info"', () => {
        const { api } = mountWith({ status: 'info', statusIconPosition: 'both' })
        expect(api().prependIcon.value).toBe('$info')
    })

    it('status set but explicit prependIcon overrides injection', () => {
        const { api } = mountWith({ status: 'info', prependIcon: 'mdi-custom' })
        expect(api().prependIcon.value).toBe('mdi-custom')
    })

    it('no status → prependIcon passes through explicit prependIcon', () => {
        const { api } = mountWith({ prependIcon: 'mdi-star' })
        expect(api().prependIcon.value).toBe('mdi-star')
    })

    it('no status → prependIcon = undefined when not set', () => {
        const { api } = mountWith({})
        expect(api().prependIcon.value).toBeUndefined()
    })
})

describe('useStatus — appendIcon', () => {
    it('status="warning", position="append" → appendIcon = "$warning"', () => {
        const { api } = mountWith({ status: 'warning', statusIconPosition: 'append' })
        expect(api().appendIcon.value).toBe('$warning')
    })

    it('status="warning", position="both" → appendIcon = "$warning"', () => {
        const { api } = mountWith({ status: 'warning', statusIconPosition: 'both' })
        expect(api().appendIcon.value).toBe('$warning')
    })

    it('status="warning", no position → appendIcon is undefined (default=prepend)', () => {
        const { api } = mountWith({ status: 'warning' })
        expect(api().appendIcon.value).toBeUndefined()
    })

    it('status set but explicit appendIcon overrides injection', () => {
        const { api } = mountWith({ status: 'warning', statusIconPosition: 'append', appendIcon: 'mdi-alert' })
        expect(api().appendIcon.value).toBe('mdi-alert')
    })
})

describe('useStatus — icon (replace position)', () => {
    it('status="error", position="replace" → icon = "$error"', () => {
        const { api } = mountWith({ status: 'error', statusIconPosition: 'replace' })
        expect(api().icon.value).toBe('$error')
    })

    it('status set but NOT replace position → icon is undefined', () => {
        const { api } = mountWith({ status: 'error', statusIconPosition: 'prepend' })
        expect(api().icon.value).toBeUndefined()
    })

    it('status set, replace position, but explicit icon → explicit wins', () => {
        const { api } = mountWith({ status: 'error', statusIconPosition: 'replace', icon: 'mdi-custom' })
        expect(api().icon.value).toBe('mdi-custom')
    })

    it('no status → icon passes through explicit icon prop', () => {
        const { api } = mountWith({ icon: 'mdi-star' })
        expect(api().icon.value).toBe('mdi-star')
    })
})

describe('useStatus — statusClasses', () => {
    it('status="success" → emits "OrigamStatusHost--success" class', () => {
        const { api } = mountWith({ status: 'success' })
        expect(api().statusClasses.value).toContain('OrigamStatusHost--success')
    })

    it('status="error" → emits "OrigamStatusHost--error" class', () => {
        const { api } = mountWith({ status: 'error' })
        expect(api().statusClasses.value).toContain('OrigamStatusHost--error')
    })

    it('no status → statusClasses is empty', () => {
        const { api } = mountWith({})
        expect(api().statusClasses.value).toEqual([])
    })

    it('uses supplied component name in the class', () => {
        const { api } = mountWith({ status: 'info' }, 'OrigamAlert')
        expect(api().statusClasses.value).toContain('OrigamAlert--info')
    })
})

describe('useStatus — reactivity', () => {
    it('changing status prop updates statusIntent', () => {
        const { props, api } = mountWith({ status: 'info' })
        expect(api().statusIntent.value).toBe('info')
        props.status = 'error'
        expect(api().statusIntent.value).toBe('danger')
    })

    it('setting status to undefined clears classes', () => {
        const { props, api } = mountWith({ status: 'info' })
        expect(api().statusClasses.value.length).toBeGreaterThan(0)
        props.status = undefined
        expect(api().statusClasses.value).toEqual([])
    })
})
