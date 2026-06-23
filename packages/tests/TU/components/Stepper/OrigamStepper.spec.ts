// Unit tests for <OrigamStepper>
//
// Strategy: OrigamStepper accepts either an `items` array prop or slotted
// OrigamStepperItem children. We use the `items` prop path to avoid
// duplicating child-component setup. OrigamStepperItem is stubbed.
//
// Coverage:
//  - items prop renders stepper items
//  - modelValue drives the active step (provide context)
//  - update:modelValue emit when clickable=true and item is clicked
//  - connector rendering / connector--done class
//  - orientation class modifiers
//  - size / density class modifiers
//  - non-clickable mode (no emit, no state change)

import { mount } from '@vue/test-utils'
import { describe, expect, it } from 'vitest'
import { defineComponent, h, inject, nextTick } from 'vue'

import OrigamStepper from '@origam/components/Stepper/OrigamStepper.vue'
import { ORIGAM_STEPPER_KEY } from '@origam/consts'
import { createOrigam } from '@origam/origam'

// ---------------------------------------------------------------------------
// Stubs
// ---------------------------------------------------------------------------
// OrigamStepperItem stub: emits click with its index when clicked.
const OrigamStepperItemStub = defineComponent({
    name: 'OrigamStepperItem',
    props: {
        index: Number,
        title: String,
        subtitle: String,
        status: String
    },
    emits: ['click'],
    template: `<div class="origam-stepper-item" :data-cy="'stepper-item-' + index" @click="$emit('click', index)">{{ title }}</div>`
})

const makeGlobal = () => ({
    plugins: [createOrigam()],
    stubs: {
        OrigamStepperItem: OrigamStepperItemStub
    }
})

const SAMPLE_ITEMS = [
    { title: 'Step 1', status: 'active' },
    { title: 'Step 2', status: 'pending' },
    { title: 'Step 3', status: 'pending' }
]

const mountStepper = (props: Record<string, any> = {}) => {
    return mount(OrigamStepper, {
        props: { modelValue: 0, items: SAMPLE_ITEMS, ...props },
        attachTo: document.body,
        global: makeGlobal()
    })
}

// ---------------------------------------------------------------------------
// Tests
// ---------------------------------------------------------------------------
describe('OrigamStepper — rendering', () => {
    it('renders a <nav> element with role navigation', () => {
        const wrapper = mountStepper()
        // The template root is a <nav>
        expect(wrapper.element.tagName.toLowerCase()).toBe('nav')
        wrapper.unmount()
    })

    it('has origam-stepper base class', () => {
        const wrapper = mountStepper()
        expect(wrapper.classes()).toContain('origam-stepper')
        wrapper.unmount()
    })

    it('renders the correct number of stepper items', () => {
        const wrapper = mountStepper()
        expect(wrapper.findAll('.origam-stepper-item').length).toBe(3)
        wrapper.unmount()
    })
})

describe('OrigamStepper — orientation', () => {
    it('adds origam-stepper--horizontal by default', () => {
        const wrapper = mountStepper()
        expect(wrapper.classes()).toContain('origam-stepper--horizontal')
        wrapper.unmount()
    })

    it('adds origam-stepper--vertical when orientation=vertical', () => {
        const wrapper = mountStepper({ orientation: 'vertical' })
        expect(wrapper.classes()).toContain('origam-stepper--vertical')
        wrapper.unmount()
    })
})

describe('OrigamStepper — connectors', () => {
    it('renders N-1 connectors between N items when showConnectors=true (default)', () => {
        const wrapper = mountStepper()
        // Connectors are <span class="origam-stepper__connector">
        expect(wrapper.findAll('.origam-stepper__connector').length).toBe(2)
        wrapper.unmount()
    })

    it('renders no connectors when showConnectors=false', () => {
        const wrapper = mountStepper({ showConnectors: false })
        expect(wrapper.findAll('.origam-stepper__connector').length).toBe(0)
        wrapper.unmount()
    })

    it('connector before current step has --done class (modelValue=1 → connector at index 1 is done)', () => {
        const wrapper = mountStepper({ modelValue: 1 })
        const connectors = wrapper.findAll('.origam-stepper__connector')
        // Connector at position 1 (between item 0 and item 1): index-1=0 < modelValue=1 → done
        expect(connectors[0].classes()).toContain('origam-stepper__connector--done')
        wrapper.unmount()
    })

    it('connector after current step has --pending class', () => {
        const wrapper = mountStepper({ modelValue: 0 })
        const connectors = wrapper.findAll('.origam-stepper__connector')
        // Connector at position 2 (index-1=1 >= modelValue=0) → pending
        expect(connectors[1].classes()).toContain('origam-stepper__connector--pending')
        wrapper.unmount()
    })
})

describe('OrigamStepper — clickable mode', () => {
    it('does NOT emit update:modelValue when clickable=false (default)', async () => {
        const wrapper = mountStepper({ modelValue: 0, clickable: false })
        const items = wrapper.findAll('.origam-stepper-item')
        await items[1].trigger('click')
        await nextTick()

        expect(wrapper.emitted('update:modelValue')).toBeFalsy()
        wrapper.unmount()
    })

    it('emits update:modelValue with the clicked step index when clickable=true', async () => {
        const wrapper = mountStepper({ modelValue: 0, clickable: true })
        const items = wrapper.findAll('.origam-stepper-item')
        await items[2].trigger('click')
        await nextTick()

        const emitted = wrapper.emitted('update:modelValue')
        expect(emitted).toBeTruthy()
        expect(emitted![0]).toEqual([2])
        wrapper.unmount()
    })

    it('updates internalModel after click when clickable=true', async () => {
        // The provide context is the source of truth for child items.
        // We can observe via the connector--done class after step change.
        const wrapper = mountStepper({ modelValue: 0, clickable: true })

        const items = wrapper.findAll('.origam-stepper-item')
        await items[1].trigger('click')
        await nextTick()

        // After clicking step 1, connector[0] should now be done
        const connectors = wrapper.findAll('.origam-stepper__connector')
        expect(connectors[0].classes()).toContain('origam-stepper__connector--done')
        wrapper.unmount()
    })
})

describe('OrigamStepper — size classes', () => {
    it('adds origam-stepper--size-small when size=small', () => {
        const wrapper = mountStepper({ size: 'small' })
        expect(wrapper.classes()).toContain('origam-stepper--size-small')
        wrapper.unmount()
    })

    it('adds origam-stepper--size-large when size=large', () => {
        const wrapper = mountStepper({ size: 'large' })
        expect(wrapper.classes()).toContain('origam-stepper--size-large')
        wrapper.unmount()
    })
})

describe('OrigamStepper — density classes', () => {
    it('adds density class when density=compact', () => {
        // useDensity emits `${componentName}--density-${value}`
        // OrigamStepper → `origam-stepper--density-compact`
        const wrapper = mountStepper({ density: 'compact' })
        expect(wrapper.classes()).toContain('origam-stepper--density-compact')
        wrapper.unmount()
    })
})

describe('OrigamStepper — provide context', () => {
    // Verify the stepper provides context that child items can inject.
    it('provides ORIGAM_STEPPER_KEY context with modelValue and clickable', () => {
        let injected: any = null

        const Spy = defineComponent({
            setup() {
                injected = inject(ORIGAM_STEPPER_KEY, null)
                return () => null
            }
        })

        mount(OrigamStepper, {
            props: { modelValue: 1, items: SAMPLE_ITEMS, clickable: true },
            slots: { default: () => h(Spy) },
            attachTo: document.body,
            global: makeGlobal()
        }).unmount()

        expect(injected).not.toBeNull()
        expect(injected.modelValue.value).toBe(1)
        expect(injected.clickable.value).toBe(true)
    })
})

describe('OrigamStepper — prop-to-internal sync', () => {
    it('updates internalModel when modelValue prop changes', async () => {
        const wrapper = mountStepper({ modelValue: 0 })

        await wrapper.setProps({ modelValue: 2 })
        await nextTick()

        // Both connectors should be done now (indices 0,1 are < modelValue 2)
        const connectors = wrapper.findAll('.origam-stepper__connector')
        expect(connectors[0].classes()).toContain('origam-stepper__connector--done')
        expect(connectors[1].classes()).toContain('origam-stepper__connector--done')
        wrapper.unmount()
    })
})
