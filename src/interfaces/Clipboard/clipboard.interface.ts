import type {
    ICommonsComponentProps,
    ITagProps
} from '../../interfaces'

import type { CLIPBOARD_FEEDBACK_MODE } from '../../enums'

/**
 * Props for `<OrigamClipboard>` — copy-to-clipboard wrapper.
 *
 * The component is intentionally chrome-less: it owns the copy
 * pipeline (`navigator.clipboard.writeText` + `execCommand` fallback),
 * the auto-resetting `copied` flag and the optional ARIA-live feedback
 * overlay, but it does NOT impose any visual on the trigger. Consumers
 * either pass a `#default` scoped slot (full control) or rely on the
 * built-in icon button rendered when no slot is provided.
 */
export interface IClipboardProps extends ICommonsComponentProps, ITagProps {
    /**
     * Text payload written to the clipboard on `copy()`. Required.
     * Re-read each time the trigger fires, so a parent that mutates
     * the value between mounts still copies the up-to-date string.
     */
    value: string
    /**
     * Duration (ms) the `copied` flag stays true after a successful
     * write. The state auto-resets after this window — there is no
     * need to clear it from the consumer side.
     *
     * @default 2000
     */
    feedbackDuration?: number
    /**
     * Label rendered inside the built-in feedback overlay (and the
     * auto-rendered button label when no slot is provided). Consumers
     * wrap with `t()` if they need full i18n.
     *
     * @default 'Copied!'
     */
    feedbackText?: string
    /**
     * Alias for `feedbackText`. Takes precedence when both are passed.
     * Provided for callers who prefer the "success" framing in their
     * codebase.
     */
    successText?: string
    /**
     * Controls how copy-success feedback is rendered.
     *
     * - `'button'` (default) — the built-in trigger flips its label to
     *   `feedbackText` while `copied` is true. No extra pill is shown.
     * - `'pill'` — an ARIA-live `role="status"` pill appears next to
     *   the trigger. The built-in trigger label does NOT flip.
     * - `'both'` — both the label-flip and the ARIA-live pill are active.
     * - `'none'` — no visual feedback. The `@copy` emit still fires.
     *
     * @default 'button'
     */
    feedbackMode?: CLIPBOARD_FEEDBACK_MODE | `${CLIPBOARD_FEEDBACK_MODE}`
    /**
     * @deprecated Since v2.2 — use `feedbackMode="pill"` instead.
     *
     * When `true`, equivalent to `feedbackMode="pill"` (renders the
     * ARIA-live pill while suppressing the button label-flip). A one-shot
     * `console.warn` is emitted when this prop is detected.
     *
     * This prop will be removed in v3.0.
     *
     * @default undefined
     */
    showFeedback?: boolean
    /**
     * Disables the copy action. The default trigger becomes
     * non-interactive (`disabled` attribute) and `copy()` becomes a
     * no-op. The scoped slot still receives the `copy` function so
     * consumers can decide what to render — but it will short-circuit.
     *
     * @default false
     */
    disabled?: boolean
}

/**
 * Emits for `<OrigamClipboard>`.
 */
export interface IClipboardEmits {
    /** Fired after a successful write. Carries the payload string. */
    (e: 'copy', value: string): void
    /** Fired after a failed write (clipboard API denied, no permission, …). */
    (e: 'error', err: Error): void
}

/**
 * Bindings exposed via the `#default` scoped slot. Consumers use these
 * to wire any trigger — button, icon, span, custom widget — to the
 * copy pipeline without re-implementing the timing logic.
 */
export interface IClipboardScopedSlotBindings {
    /** Triggers the copy pipeline. Promise resolves true on success. */
    copy: () => Promise<boolean>
    /** True for `feedbackDuration` ms after a successful copy. */
    copied: boolean
    /** Set when the last copy attempt threw, null otherwise. */
    error: Error | null
}

/**
 * Slot signatures for `<OrigamClipboard>`.
 */
export interface IClipboardSlots {
    /**
     * Custom trigger. Scoped — receives `{ copy, copied, error }`.
     * When omitted, the component renders a default icon button with
     * `mdi:mdi-content-copy`.
     */
    default?: (bindings: IClipboardScopedSlotBindings) => any
    /**
     * Custom feedback marker rendered when `showFeedback` is true and
     * `copied` is true. Scoped — receives the boolean for symmetry
     * with the default slot.
     */
    feedback?: (bindings: { copied: boolean }) => any
}

/**
 * Options for the `useClipboard` composable.
 */
export interface IUseClipboardOptions {
    /**
     * Duration (ms) the returned `copied` ref stays true after a
     * successful write before auto-resetting.
     *
     * @default 2000
     */
    feedbackDuration?: number
}
