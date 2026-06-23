// Unit tests for <OrigamAlert>
//
// Strategy: mount with createOrigam() plugin (provides locale + theme).
// Tests assert BEM classes, conditional rendering and emitted events.
// No CSS assertions — jsdom does not compute SCSS-generated styles.

import { afterEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import OrigamAlert from '@origam/components/Alert/OrigamAlert.vue'
import { createOrigam } from '@origam/origam'

// jsdom does not implement window.matchMedia — stub it globally so
// useTheme (consumed transitively) does not throw.
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

function mountAlert(props: Record<string, unknown> = {}, slots: Record<string, unknown> = {}) {
    return mount(OrigamAlert, {
        props: props as never,
        slots,
        global: { plugins: [createOrigam()] }
    })
}

// ---------------------------------------------------------------------------
// Rendering
// ---------------------------------------------------------------------------

describe('OrigamAlert — rendering', () => {
    it('renders the root with class origam-alert', () => {
        const wrapper = mountAlert()
        expect(wrapper.find('.origam-alert').exists()).toBe(true)
    })

    it('uses <div> as default root tag', () => {
        const wrapper = mountAlert()
        expect(wrapper.element.tagName).toBe('DIV')
    })

    it('uses a custom tag when prop tag is set', () => {
        const wrapper = mountAlert({ tag: 'aside' })
        expect(wrapper.element.tagName).toBe('ASIDE')
    })

    it('renders a title when prop title is provided', () => {
        const wrapper = mountAlert({ title: 'Attention' })
        expect(wrapper.find('.origam-alert__title').text()).toBe('Attention')
    })

    it('does not render the title block when title is absent', () => {
        const wrapper = mountAlert()
        expect(wrapper.find('.origam-alert__title').exists()).toBe(false)
    })

    it('renders text content via the text prop', () => {
        const wrapper = mountAlert({ text: 'Something went wrong.' })
        expect(wrapper.find('.origam-alert__body').text()).toBe('Something went wrong.')
    })

    it('renders text content via the #text slot (overrides text prop)', () => {
        const wrapper = mountAlert({ text: 'Prop text' }, { text: '<span>Slot text</span>' })
        expect(wrapper.find('.origam-alert__body').text()).toBe('Slot text')
    })
})

// ---------------------------------------------------------------------------
// Visibility (modelValue)
// ---------------------------------------------------------------------------

describe('OrigamAlert — modelValue visibility', () => {
    it('is visible by default (modelValue defaults to true)', () => {
        const wrapper = mountAlert()
        // The root element itself is always in DOM; active classes drive visibility.
        expect(wrapper.find('.origam-alert').exists()).toBe(true)
        // No --inactive class should be present when visible.
        expect(wrapper.find('.origam-alert').classes()).not.toContain('origam-alert--inactive')
    })
})

// ---------------------------------------------------------------------------
// Close button / dismiss
// ---------------------------------------------------------------------------

describe('OrigamAlert — close button', () => {
    it('does not render the close button when closable is false (default)', () => {
        const wrapper = mountAlert()
        expect(wrapper.find('.origam-alert__close').exists()).toBe(false)
    })

    it('renders the close button when closable=true', () => {
        const wrapper = mountAlert({ closable: true })
        expect(wrapper.find('.origam-alert__close').exists()).toBe(true)
    })

    it('clicking the close button emits click:close with a MouseEvent', async () => {
        const wrapper = mountAlert({ closable: true })
        await wrapper.find('[data-cy="close"]').trigger('click')
        const emitted = wrapper.emitted('click:close') as MouseEvent[][] | undefined
        expect(emitted).toBeTruthy()
        expect(emitted!.length).toBe(1)
    })

    it('clicking close emits update:modelValue=false to dismiss the alert', async () => {
        const wrapper = mountAlert({ closable: true, modelValue: true })
        await wrapper.find('[data-cy="close"]').trigger('click')
        // useActive calls onActive() which emits update:modelValue with the toggled value.
        const updates = wrapper.emitted('update:modelValue') as boolean[][] | undefined
        expect(updates).toBeTruthy()
        expect(updates![0][0]).toBe(false)
    })

    afterEach(() => {
        vi.restoreAllMocks()
    })
})

// ---------------------------------------------------------------------------
// Status classes
// ---------------------------------------------------------------------------

describe('OrigamAlert — status modifier classes', () => {
    for (const status of ['warning', 'error', 'success', 'info'] as const) {
        it(`applies origam-alert--${status} class when status="${status}"`, () => {
            const wrapper = mountAlert({ status })
            expect(wrapper.find('.origam-alert').classes()).toContain(`origam-alert--${status}`)
        })
    }
})

// ---------------------------------------------------------------------------
// Density
// ---------------------------------------------------------------------------

describe('OrigamAlert — density', () => {
    it('applies origam-alert--density-default by default', () => {
        const wrapper = mountAlert()
        expect(wrapper.find('.origam-alert').classes().some(c => c.includes('density-default'))).toBe(true)
    })

    it('applies origam-alert--density-compact when density="compact"', () => {
        const wrapper = mountAlert({ density: 'compact' })
        expect(wrapper.find('.origam-alert').classes().some(c => c.includes('density-compact'))).toBe(true)
    })

    it('applies origam-alert--density-comfortable when density="comfortable"', () => {
        const wrapper = mountAlert({ density: 'comfortable' })
        expect(wrapper.find('.origam-alert').classes().some(c => c.includes('density-comfortable'))).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// ARIA role
// ---------------------------------------------------------------------------

describe('OrigamAlert — ARIA roles', () => {
    it('uses role="alert" for error status', () => {
        const wrapper = mountAlert({ status: 'error' })
        expect(wrapper.find('.origam-alert').attributes('role')).toBe('alert')
    })

    it('uses role="alert" for warning status', () => {
        const wrapper = mountAlert({ status: 'warning' })
        expect(wrapper.find('.origam-alert').attributes('role')).toBe('alert')
    })

    it('uses role="status" for success status', () => {
        const wrapper = mountAlert({ status: 'success' })
        expect(wrapper.find('.origam-alert').attributes('role')).toBe('status')
    })

    it('uses role="status" for info status', () => {
        const wrapper = mountAlert({ status: 'info' })
        expect(wrapper.find('.origam-alert').attributes('role')).toBe('status')
    })

    it('uses role="status" when no status is given', () => {
        const wrapper = mountAlert()
        expect(wrapper.find('.origam-alert').attributes('role')).toBe('status')
    })
})

// ---------------------------------------------------------------------------
// Rounded
// ---------------------------------------------------------------------------

describe('OrigamAlert — rounded', () => {
    it('applies a rounded class when rounded="lg"', () => {
        const wrapper = mountAlert({ rounded: 'lg' })
        const classes = wrapper.find('.origam-alert').classes().join(' ')
        expect(classes).toMatch(/rounded/)
    })
})

// ---------------------------------------------------------------------------
// Prepend / Append content
// ---------------------------------------------------------------------------

describe('OrigamAlert — prepend and append', () => {
    it('renders the prepend area when prependIcon is set', () => {
        const wrapper = mountAlert({ prependIcon: 'mdi-check' })
        expect(wrapper.find('.origam-alert__prepend').exists()).toBe(true)
    })

    it('does not render the prepend area when no icon/avatar is given', () => {
        const wrapper = mountAlert()
        expect(wrapper.find('.origam-alert__prepend').exists()).toBe(false)
    })

    it('renders the append area when appendIcon is set', () => {
        const wrapper = mountAlert({ appendIcon: 'mdi-arrow-right' })
        expect(wrapper.find('.origam-alert__append').exists()).toBe(true)
    })
})

// ---------------------------------------------------------------------------
// Slot: #close (custom close button)
// ---------------------------------------------------------------------------

describe('OrigamAlert — slot #close', () => {
    it('renders custom close slot content when provided (regardless of closable prop)', () => {
        const wrapper = mountAlert({}, { close: '<button data-cy="custom-close">X</button>' })
        expect(wrapper.find('[data-cy="custom-close"]').exists()).toBe(true)
        // The default close button should not be rendered.
        expect(wrapper.find('[data-cy="close"]').exists()).toBe(false)
    })
})
