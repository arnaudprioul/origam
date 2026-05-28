// Unit tests for OrigamCode — copy-to-clipboard flow.
//
// Strategy: mock `shiki` (heavy grammar JSON) and stub `useCode` so
// the highlight pipeline is a no-op. The real `useClipboard` composable
// is exercised to verify the refactored integration end-to-end.
//
// Vitest fake-timers let us assert the `copied` feedback window without
// actually waiting 2 s.

import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { nextTick } from 'vue'

// --- Shiki mock (must be hoisted before any imports that trigger the module) ---
vi.mock('shiki', () => ({
    createHighlighter: vi.fn(async () => ({
        codeToHtml: vi.fn((_code: string) => '<pre><code></code></pre>')
    }))
}))

// --- Import after mocks so composables pick up the mocked shiki ---
import OrigamCode from '@origam/components/Code/OrigamCode.vue'
import { CODE_DEFAULTS } from '@origam/consts'

// jsdom does not implement window.matchMedia — stub it globally so
// the useTheme composable (called inside OrigamCode) does not throw.
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

// Preserve originals for restore
const originalClipboard = Object.getOwnPropertyDescriptor(navigator, 'clipboard')
const originalExecCommand = document.execCommand

// Helpers
function stubClipboard (writeText: ReturnType<typeof vi.fn>) {
    Object.defineProperty(navigator, 'clipboard', {
        configurable: true,
        value: { writeText }
    })
}

describe('OrigamCode — copy-to-clipboard', () => {
    beforeEach(() => {
        vi.useFakeTimers()
    })

    afterEach(() => {
        vi.useRealTimers()
        // Restore clipboard
        if (originalClipboard) {
            Object.defineProperty(navigator, 'clipboard', originalClipboard)
        }
        document.execCommand = originalExecCommand
    })

    it('emits "copy" with the formatted code when the copy button is clicked', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined)
        stubClipboard(writeText)

        const wrapper = mount(OrigamCode, {
            props: { copyable: true, code: 'const x = 1' },
            attachTo: document.body
        })

        // Wait for onMounted rebuild to settle
        await nextTick()

        const btn = wrapper.find('[data-cy="origam-code-copy"]')
        expect(btn.exists()).toBe(true)

        await btn.trigger('click')
        // The copy() call is async — wait for it to resolve
        await nextTick()

        const emitted = wrapper.emitted('copy') as string[][] | undefined
        expect(emitted).toBeTruthy()
        expect(emitted![0][0]).toBe('const x = 1')

        wrapper.unmount()
    })

    it('flips copied to true immediately after a successful copy', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined)
        stubClipboard(writeText)

        const wrapper = mount(OrigamCode, {
            props: { copyable: true, code: 'hello' },
            attachTo: document.body
        })
        await nextTick()

        const btn = wrapper.find('[data-cy="origam-code-copy"]')
        await btn.trigger('click')
        await nextTick()

        // `copied` is exposed via defineExpose — vue-test-utils auto-unwraps refs
        // so the exposed field is the unwrapped boolean, not { value: boolean }
        expect((wrapper.vm as unknown as { copied: boolean }).copied).toBe(true)

        wrapper.unmount()
    })

    it('resets copied to false after CODE_DEFAULTS.copyFeedbackDurationMs', async () => {
        const writeText = vi.fn().mockResolvedValue(undefined)
        stubClipboard(writeText)

        const wrapper = mount(OrigamCode, {
            props: { copyable: true, code: 'hello' },
            attachTo: document.body
        })
        await nextTick()

        const btn = wrapper.find('[data-cy="origam-code-copy"]')
        await btn.trigger('click')
        await nextTick()

        const vm = wrapper.vm as unknown as { copied: boolean }
        expect(vm.copied).toBe(true)

        vi.advanceTimersByTime(CODE_DEFAULTS.copyFeedbackDurationMs - 1)
        expect(vm.copied).toBe(true)

        vi.advanceTimersByTime(2)
        expect(vm.copied).toBe(false)

        wrapper.unmount()
    })

    it('does not emit "copy" when the clipboard write fails', async () => {
        // Both modern and legacy paths fail
        const writeText = vi.fn().mockRejectedValue(new Error('denied'))
        stubClipboard(writeText)
        document.execCommand = vi.fn().mockReturnValue(false) as unknown as typeof document.execCommand

        const wrapper = mount(OrigamCode, {
            props: { copyable: true, code: 'fail' },
            attachTo: document.body
        })
        await nextTick()

        const btn = wrapper.find('[data-cy="origam-code-copy"]')
        await btn.trigger('click')
        await nextTick()

        expect(wrapper.emitted('copy')).toBeFalsy()

        wrapper.unmount()
    })
})
