// Tests for `useProgress` composable.
// Covers the pure-logic outputs: normalizedValue, thickness, max, progressClasses.
//
// useProgress wires: useVModel (modelValue), useIntersectionObserver,
// useMargin, usePadding. In jsdom the IntersectionObserver is not implemented.
// The vitest setup file provides a polyfill (entries=[]) so `isIntersecting`
// starts false — `origam-progress--visible` is therefore absent initially.

import { defineComponent, h, reactive } from 'vue'
import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'

import type { IProgressTypeProps } from '@origam/interfaces'

import { useProgress } from '@origam/composables/Progress/progress.composable'

// ---------------------------------------------------------------------------
// Helper
// ---------------------------------------------------------------------------

function mountWith (initial: Partial<IProgressTypeProps> = {}) {
    const props = reactive<IProgressTypeProps>({
        modelValue: 50,
        max: 100,
        thickness: 4,
        indeterminate: false,
        active: false,
        striped: false,
        absolute: false,
        ...initial
    })
    let api!: ReturnType<typeof useProgress>

    const Host = defineComponent({
        name: 'OrigamProgressHost',
        emits: ['update:modelValue'],
        setup () {
            api = useProgress(props)
            return () => h('div')
        }
    })

    mount(Host)
    return { props, api: () => api }
}

// ---------------------------------------------------------------------------
// normalizedValue
// ---------------------------------------------------------------------------

describe('useProgress — normalizedValue', () => {
    it('50/100 → 50%', () => {
        const { api } = mountWith({ modelValue: 50, max: 100 })
        expect(api().normalizedValue.value).toBe(50)
    })

    it('0/100 → 0%', () => {
        const { api } = mountWith({ modelValue: 0, max: 100 })
        expect(api().normalizedValue.value).toBe(0)
    })

    it('100/100 → 100%', () => {
        const { api } = mountWith({ modelValue: 100, max: 100 })
        expect(api().normalizedValue.value).toBe(100)
    })

    it('75/200 → 37.5%', () => {
        const { api } = mountWith({ modelValue: 75, max: 200 })
        expect(api().normalizedValue.value).toBeCloseTo(37.5)
    })

    it('200/100 → 200% (no clamping in the composable)', () => {
        const { api } = mountWith({ modelValue: 200, max: 100 })
        expect(api().normalizedValue.value).toBe(200)
    })

    it('string modelValue "60" parses as 60%', () => {
        const { api } = mountWith({ modelValue: '60', max: 100 })
        expect(api().normalizedValue.value).toBe(60)
    })
})

// ---------------------------------------------------------------------------
// max
// ---------------------------------------------------------------------------

describe('useProgress — max', () => {
    it('numeric max=200 → 200', () => {
        const { api } = mountWith({ max: 200 })
        expect(api().max.value).toBe(200)
    })

    it('string max "150" → 150', () => {
        const { api } = mountWith({ max: '150' })
        expect(api().max.value).toBe(150)
    })
})

// ---------------------------------------------------------------------------
// thickness
// ---------------------------------------------------------------------------

describe('useProgress — thickness', () => {
    it('numeric 8 → 8', () => {
        const { api } = mountWith({ thickness: 8 })
        expect(api().thickness.value).toBe(8)
    })

    it('string "12" → 12', () => {
        const { api } = mountWith({ thickness: '12' })
        expect(api().thickness.value).toBe(12)
    })
})

// ---------------------------------------------------------------------------
// Helpers to inspect progressClasses (mixed string + object class descriptor)
// ---------------------------------------------------------------------------

/**
 * progressClasses returns `['origam-progress', { 'origam-progress--indeterminate': bool, … }, …]`.
 * Flatten resolves strings; for the conditional object block we must check it directly.
 */
function classObjectHas (classes: any[], key: string): boolean {
    const strings: string[] = []
    for (const entry of classes) {
        if (typeof entry === 'string') strings.push(entry)
        else if (Array.isArray(entry)) {
            if (classObjectHas(entry, key)) return true
        } else if (entry && typeof entry === 'object') {
            if (key in entry) return entry[key] === true
        }
    }
    return strings.includes(key)
}

// ---------------------------------------------------------------------------
// progressClasses
// ---------------------------------------------------------------------------

describe('useProgress — progressClasses', () => {
    it('always contains "origam-progress"', () => {
        const { api } = mountWith({})
        expect(classObjectHas(api().progressClasses.value, 'origam-progress')).toBe(true)
    })

    it('indeterminate=true → contains origam-progress--indeterminate', () => {
        const { api } = mountWith({ indeterminate: true })
        expect(classObjectHas(api().progressClasses.value, 'origam-progress--indeterminate')).toBe(true)
    })

    it('indeterminate=false → does NOT contain origam-progress--indeterminate', () => {
        const { api } = mountWith({ indeterminate: false })
        expect(classObjectHas(api().progressClasses.value, 'origam-progress--indeterminate')).toBe(false)
    })

    it('active=true → contains origam-progress--active', () => {
        const { api } = mountWith({ active: true })
        expect(classObjectHas(api().progressClasses.value, 'origam-progress--active')).toBe(true)
    })

    it('striped=true → contains origam-progress--striped', () => {
        const { api } = mountWith({ striped: true })
        expect(classObjectHas(api().progressClasses.value, 'origam-progress--striped')).toBe(true)
    })

    it('absolute=true → contains origam-progress--absolute', () => {
        const { api } = mountWith({ absolute: true })
        expect(classObjectHas(api().progressClasses.value, 'origam-progress--absolute')).toBe(true)
    })

    it('origam-progress--visible absent when isIntersecting=false (jsdom default)', () => {
        const { api } = mountWith({})
        expect(classObjectHas(api().progressClasses.value, 'origam-progress--visible')).toBe(false)
    })
})

// ---------------------------------------------------------------------------
// Reactivity
// ---------------------------------------------------------------------------

describe('useProgress — reactivity', () => {
    it('normalizedValue updates when modelValue prop changes', async () => {
        const { props, api } = mountWith({ modelValue: 25, max: 100 })
        expect(api().normalizedValue.value).toBe(25)

        props.modelValue = 75
        await Promise.resolve()
        expect(api().normalizedValue.value).toBe(75)
    })

    it('progressClasses update when indeterminate changes', async () => {
        const { props, api } = mountWith({ indeterminate: false })
        expect(classObjectHas(api().progressClasses.value, 'origam-progress--indeterminate')).toBe(false)

        props.indeterminate = true
        await Promise.resolve()
        expect(classObjectHas(api().progressClasses.value, 'origam-progress--indeterminate')).toBe(true)
    })
})
