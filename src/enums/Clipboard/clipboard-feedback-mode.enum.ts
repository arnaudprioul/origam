/**
 * Controls how `<OrigamClipboard>` renders its copy-success feedback.
 *
 * | Value    | Behaviour                                                                  |
 * |----------|----------------------------------------------------------------------------|
 * | `BUTTON` | The built-in trigger flips its label to `feedbackText` while `copied`.     |
 * |          | This is the default and matches the pre-v2 behaviour.                      |
 * | `PILL`   | An ARIA-live `role="status"` pill appears next to the trigger.             |
 *  |          | The built-in trigger does NOT flip its label.                               |
 * | `BOTH`   | Both the label-flip and the ARIA-live pill are active simultaneously.       |
 * | `NONE`   | No visual feedback is rendered. The `@copy` emit still fires.              |
 */
export enum CLIPBOARD_FEEDBACK_MODE {
    BUTTON = 'button',
    PILL   = 'pill',
    BOTH   = 'both',
    NONE   = 'none',
}
