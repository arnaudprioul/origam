// Unit tests for OrigamClipboard — feedbackMode API + deprecation shim.
//
// Strategy: stub navigator.clipboard so the copy pipeline resolves
// immediately. Vitest fake-timers let us control the 2 s `copied`
// window without actually waiting.
//
// Each feedbackMode value is exercised in isolation:
//   'button' → label span rendered, pill absent
//   'pill'   → pill rendered, label span absent
//   'both'   → label span + pill both rendered
//   'none'   → neither rendered
//
// The legacy `showFeedback` prop is also tested for backward-compat.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

import OrigamClipboard from './OrigamClipboard.vue'
import { CLIPBOARD_FEEDBACK_MODE } from '../../enums'
import { DEFAULT_SETS, MDI, MDI_ALIASES, ORIGAM_ICONS_KEY } from '../../consts'

// Minimal icons provide so OrigamIcon — used by the default Clipboard
// trigger — doesn't throw "Missing Origam Icons provide!" during mount.
const ICONS_PROVIDE = {
    defaultSet: DEFAULT_SETS.MDI,
    aliases: MDI_ALIASES,
    sets: { mdi: MDI }
}

// ── clipboard stub ──────────────────────────────────────────────────────────

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
const originalExecCommand = document.execCommand

function stubClipboard (writeText: ReturnType<typeof vi.fn> = vi.fn().mockResolvedValue(undefined)) {
    Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText }
    })
}

function triggerAndSettle () {
    return nextTick()
}

// ── helpers ─────────────────────────────────────────────────────────────────

const defaultProps = { value: 'hello-clipboard' }

function mountClipboard (props: Record<string, unknown> = {}) {
    return mount(OrigamClipboard, {
        props: { ...defaultProps, ...props },
        attachTo: document.body,
        global: {
            provide: { [ORIGAM_ICONS_KEY as symbol]: ICONS_PROVIDE }
        }
    })
}

// ── suite ────────────────────────────────────────────────────────────────────

describe('OrigamClipboard — feedbackMode', () => {
    beforeEach(() => {
        vi.useFakeTimers()
        stubClipboard()
    })

    afterEach(() => {
        vi.useRealTimers()
        if (originalClipboard) {
            Object.defineProperty(navigator, 'clipboard', originalClipboard)
        }
        document.execCommand = originalExecCommand
    })

    // ── default (button) ────────────────────────────────────────────────────

    describe('feedbackMode = "button" (default)', () => {
        it('renders the default icon trigger', () => {
            const wrapper = mountClipboard()
            expect(wrapper.find('[data-cy="origam-clipboard-default-trigger"]').exists()).toBe(true)
            wrapper.unmount()
        })

        it('shows the label span after copy', async () => {
            const wrapper = mountClipboard({ feedbackMode: CLIPBOARD_FEEDBACK_MODE.BUTTON })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            // Before copy — label absent
            expect(wrapper.find('.origam-clipboard__default-label').exists()).toBe(false)

            await trigger.trigger('click')
            await triggerAndSettle()

            // After copy — label present, text matches feedbackText default
            const label = wrapper.find('.origam-clipboard__default-label')
            expect(label.exists()).toBe(true)
            expect(label.text()).toBe('Copied!')

            wrapper.unmount()
        })

        it('does NOT render the pill after copy', async () => {
            const wrapper = mountClipboard({ feedbackMode: CLIPBOARD_FEEDBACK_MODE.BUTTON })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.find('[data-cy="origam-clipboard-feedback"]').exists()).toBe(false)

            wrapper.unmount()
        })

        it('label disappears after feedbackDuration resets copied', async () => {
            const wrapper = mountClipboard({
                feedbackMode: CLIPBOARD_FEEDBACK_MODE.BUTTON,
                feedbackDuration: 500
            })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.find('.origam-clipboard__default-label').exists()).toBe(true)

            vi.advanceTimersByTime(501)
            await triggerAndSettle()

            expect(wrapper.find('.origam-clipboard__default-label').exists()).toBe(false)

            wrapper.unmount()
        })
    })

    // ── pill ────────────────────────────────────────────────────────────────

    describe('feedbackMode = "pill"', () => {
        it('does NOT show the label span after copy', async () => {
            const wrapper = mountClipboard({ feedbackMode: CLIPBOARD_FEEDBACK_MODE.PILL })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.find('.origam-clipboard__default-label').exists()).toBe(false)

            wrapper.unmount()
        })

        it('renders the ARIA-live pill after copy', async () => {
            const wrapper = mountClipboard({ feedbackMode: CLIPBOARD_FEEDBACK_MODE.PILL })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            // Before copy — pill absent
            expect(wrapper.find('[data-cy="origam-clipboard-feedback"]').exists()).toBe(false)

            await trigger.trigger('click')
            await triggerAndSettle()

            const pill = wrapper.find('[data-cy="origam-clipboard-feedback"]')
            expect(pill.exists()).toBe(true)
            expect(pill.attributes('role')).toBe('status')
            expect(pill.attributes('aria-live')).toBe('polite')
            expect(pill.text()).toBe('Copied!')

            wrapper.unmount()
        })

        it('pill disappears after feedbackDuration resets copied', async () => {
            const wrapper = mountClipboard({
                feedbackMode: CLIPBOARD_FEEDBACK_MODE.PILL,
                feedbackDuration: 500
            })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.find('[data-cy="origam-clipboard-feedback"]').exists()).toBe(true)

            vi.advanceTimersByTime(501)
            await triggerAndSettle()

            expect(wrapper.find('[data-cy="origam-clipboard-feedback"]').exists()).toBe(false)

            wrapper.unmount()
        })
    })

    // ── both ────────────────────────────────────────────────────────────────

    describe('feedbackMode = "both"', () => {
        it('renders the label span AND the pill after copy', async () => {
            const wrapper = mountClipboard({ feedbackMode: CLIPBOARD_FEEDBACK_MODE.BOTH })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.find('.origam-clipboard__default-label').exists()).toBe(true)
            expect(wrapper.find('[data-cy="origam-clipboard-feedback"]').exists()).toBe(true)

            wrapper.unmount()
        })
    })

    // ── none ────────────────────────────────────────────────────────────────

    describe('feedbackMode = "none"', () => {
        it('renders neither the label span nor the pill after copy', async () => {
            const wrapper = mountClipboard({ feedbackMode: CLIPBOARD_FEEDBACK_MODE.NONE })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.find('.origam-clipboard__default-label').exists()).toBe(false)
            expect(wrapper.find('[data-cy="origam-clipboard-feedback"]').exists()).toBe(false)

            wrapper.unmount()
        })

        it('still emits @copy when feedbackMode is "none"', async () => {
            const wrapper = mountClipboard({ feedbackMode: CLIPBOARD_FEEDBACK_MODE.NONE })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.emitted('copy')).toBeTruthy()
            expect(wrapper.emitted('copy')![0]).toEqual(['hello-clipboard'])

            wrapper.unmount()
        })
    })

    // ── feedbackText / successText ───────────────────────────────────────────

    describe('feedbackText / successText props', () => {
        it('uses feedbackText in button label', async () => {
            const wrapper = mountClipboard({
                feedbackMode: CLIPBOARD_FEEDBACK_MODE.BUTTON,
                feedbackText: 'Copiado!'
            })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.find('.origam-clipboard__default-label').text()).toBe('Copiado!')

            wrapper.unmount()
        })

        it('successText takes precedence over feedbackText', async () => {
            const wrapper = mountClipboard({
                feedbackMode: CLIPBOARD_FEEDBACK_MODE.BUTTON,
                feedbackText: 'Copiado!',
                successText: 'Done!'
            })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.find('.origam-clipboard__default-label').text()).toBe('Done!')

            wrapper.unmount()
        })
    })

    // ── disabled ─────────────────────────────────────────────────────────────

    describe('disabled prop', () => {
        it('does not emit @copy when disabled', async () => {
            const wrapper = mountClipboard({ disabled: true })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click', { force: true })
            await triggerAndSettle()

            expect(wrapper.emitted('copy')).toBeFalsy()

            wrapper.unmount()
        })
    })

    // ── legacy showFeedback ──────────────────────────────────────────────────

    describe('showFeedback legacy prop (deprecated)', () => {
        it('showFeedback=true behaves like feedbackMode="pill" and emits a console.warn', async () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

            const wrapper = mountClipboard({ showFeedback: true })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            // Pill rendered
            expect(wrapper.find('[data-cy="origam-clipboard-feedback"]').exists()).toBe(true)
            // Label span NOT rendered (pill mode, not both)
            expect(wrapper.find('.origam-clipboard__default-label').exists()).toBe(false)

            // Deprecation warn was emitted
            expect(warnSpy).toHaveBeenCalledWith(expect.stringContaining('showFeedback'))

            warnSpy.mockRestore()
            wrapper.unmount()
        })

        it('showFeedback=false behaves like feedbackMode="none"', async () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

            const wrapper = mountClipboard({ showFeedback: false })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.find('[data-cy="origam-clipboard-feedback"]').exists()).toBe(false)
            expect(wrapper.find('.origam-clipboard__default-label').exists()).toBe(false)

            warnSpy.mockRestore()
            wrapper.unmount()
        })

        it('emits the deprecation warn only once per instance', async () => {
            const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => undefined)

            const wrapper = mountClipboard({ showFeedback: true })
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()
            vi.advanceTimersByTime(600)
            await triggerAndSettle()

            await trigger.trigger('click')
            await triggerAndSettle()

            const deprecationWarns = warnSpy.mock.calls.filter(
                call => typeof call[0] === 'string' && call[0].includes('showFeedback')
            )
            expect(deprecationWarns.length).toBe(1)

            warnSpy.mockRestore()
            wrapper.unmount()
        })
    })

    // ── emits ────────────────────────────────────────────────────────────────

    describe('emits', () => {
        it('emits @copy with the value after a successful write', async () => {
            const wrapper = mountClipboard()
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.emitted('copy')).toBeTruthy()
            expect(wrapper.emitted('copy')![0]).toEqual(['hello-clipboard'])

            wrapper.unmount()
        })

        it('emits @error when navigator.clipboard rejects', async () => {
            const writeText = vi.fn().mockRejectedValue(new Error('denied'))
            stubClipboard(writeText)
            document.execCommand = vi.fn().mockReturnValue(false) as unknown as typeof document.execCommand

            const wrapper = mountClipboard()
            const trigger = wrapper.find('[data-cy="origam-clipboard-default-trigger"]')

            await trigger.trigger('click')
            await triggerAndSettle()

            expect(wrapper.emitted('error')).toBeTruthy()
            expect(wrapper.emitted('copy')).toBeFalsy()

            wrapper.unmount()
        })
    })
})
