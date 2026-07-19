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

// ---------------------------------------------------------------------------
// Typography — BEM child __title (useTypography with varPrefix='alert__title')
//
// typographyStyles is bound as inline :style on the <span class="origam-alert__title">
// element (not the root). Alert uses useActive(props,'modelValue') which gates
// colorClasses — but typographyStyles is inline style, unaffected by active state.
// Mount with title prop set so hasTitle=true and __title renders.
// ---------------------------------------------------------------------------

describe('OrigamAlert — fontSize prop on __title', () => {
    it('emits no font-size override when fontSize is unset', () => {
        const wrapper = mountAlert({ title: 'Test' })
        const style = wrapper.find('.origam-alert__title').attributes('style') || ''
        expect(style).not.toContain('--origam-alert__title---font-size')
        wrapper.unmount()
    })

    it('fontSize="xl" sets --origam-alert__title---font-size to the xl token', () => {
        const wrapper = mountAlert({ title: 'Test', fontSize: 'xl' })
        const style = wrapper.find('.origam-alert__title').attributes('style') || ''
        expect(style).toContain('--origam-alert__title---font-size: var(--origam-font__size---xl)')
        wrapper.unmount()
    })

    it('fontSize="sm" sets --origam-alert__title---font-size to the sm token', () => {
        const wrapper = mountAlert({ title: 'Test', fontSize: 'sm' })
        const style = wrapper.find('.origam-alert__title').attributes('style') || ''
        expect(style).toContain('--origam-alert__title---font-size: var(--origam-font__size---sm)')
        wrapper.unmount()
    })
})

describe('OrigamAlert — fontWeight prop on __title', () => {
    it('emits no font-weight override when fontWeight is unset', () => {
        const wrapper = mountAlert({ title: 'Test' })
        const style = wrapper.find('.origam-alert__title').attributes('style') || ''
        expect(style).not.toContain('--origam-alert__title---font-weight')
        wrapper.unmount()
    })

    it('fontWeight="bold" sets --origam-alert__title---font-weight to the bold token', () => {
        const wrapper = mountAlert({ title: 'Test', fontWeight: 'bold' })
        const style = wrapper.find('.origam-alert__title').attributes('style') || ''
        expect(style).toContain('--origam-alert__title---font-weight: var(--origam-font__weight---bold)')
        wrapper.unmount()
    })

    it('fontWeight="black" sets --origam-alert__title---font-weight to the black token', () => {
        const wrapper = mountAlert({ title: 'Test', fontWeight: 'black' })
        const style = wrapper.find('.origam-alert__title').attributes('style') || ''
        expect(style).toContain('--origam-alert__title---font-weight: var(--origam-font__weight---black)')
        wrapper.unmount()
    })
})

describe('OrigamAlert — letterSpacing prop on __title', () => {
    it('emits no letter-spacing override when letterSpacing is unset', () => {
        const wrapper = mountAlert({ title: 'Test' })
        const style = wrapper.find('.origam-alert__title').attributes('style') || ''
        expect(style).not.toContain('--origam-alert__title---letter-spacing')
        wrapper.unmount()
    })

    it('letterSpacing="widest" sets --origam-alert__title---letter-spacing to the widest token', () => {
        const wrapper = mountAlert({ title: 'Test', letterSpacing: 'widest' })
        const style = wrapper.find('.origam-alert__title').attributes('style') || ''
        expect(style).toContain('--origam-alert__title---letter-spacing: var(--origam-font__letterSpacing---widest)')
        wrapper.unmount()
    })
})

describe('OrigamAlert — lineHeight prop on __title', () => {
    it('emits no line-height override when lineHeight is unset', () => {
        const wrapper = mountAlert({ title: 'Test' })
        const style = wrapper.find('.origam-alert__title').attributes('style') || ''
        expect(style).not.toContain('--origam-alert__title---line-height')
        wrapper.unmount()
    })

    it('lineHeight="loose" sets --origam-alert__title---line-height to the loose token', () => {
        const wrapper = mountAlert({ title: 'Test', lineHeight: 'loose' })
        const style = wrapper.find('.origam-alert__title').attributes('style') || ''
        expect(style).toContain('--origam-alert__title---line-height: var(--origam-font__lineHeight---loose)')
        wrapper.unmount()
    })
})

// ---------------------------------------------------------------------------
// useDefaults wiring (issue #242) — a theme's `components['origam-alert']`
// config must resolve on an un-passed prop, mirroring OrigamBtn/OrigamSwitch.
// ---------------------------------------------------------------------------

describe('OrigamAlert — useDefaults (theme components wiring)', () => {
    function mountAlertThemed(componentDefaults: Record<string, unknown>, props: Record<string, unknown> = {}) {
        const theme = { name: 'brandx', mode: 'light' as const, components: { 'origam-alert': componentDefaults }, vars: {} }
        const origam = createOrigam({ themes: [theme] })
        origam._defaultsRef.value = origam._activeDefaultsFor('brandx', 'light')
        return mount(OrigamAlert, { props: props as never, global: { plugins: [origam] } })
    }

    it('resolves rounded="lg" from theme.components[\'origam-alert\'] when not passed', () => {
        const wrapper = mountAlertThemed({ rounded: 'lg' })
        expect(wrapper.classes()).toContain('origam--rounded-lg')
    })

    it('an explicitly passed rounded prop overrides the theme default', () => {
        const wrapper = mountAlertThemed({ rounded: 'lg' }, { rounded: 'sm' })
        expect(wrapper.classes()).toContain('origam--rounded-sm')
        expect(wrapper.classes()).not.toContain('origam--rounded-lg')
    })

    it('resolves border=true from theme.components[\'origam-alert\'] when not passed', () => {
        const wrapper = mountAlertThemed({ border: true })
        expect(wrapper.classes()).toContain('origam-alert--border')
    })

    // Regression guard: the root `<component :is="…">` reads a bare `tag`
    // in `<script setup>`, which resolves against Vue's raw $props — NOT
    // this useDefaults() Proxy — unless written as `props.tag` explicitly.
    // See OrigamTable.vue for the full writeup of this footgun.
    it('resolves tag="aside" from theme.components[\'origam-alert\'] when not passed', () => {
        const wrapper = mountAlertThemed({ tag: 'aside' })
        expect(wrapper.element.tagName).toBe('ASIDE')
    })
})
