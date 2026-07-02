/**
 * Default global hotkey combinations for `<OrigamCommandPalette>`. We
 * register both `⌘+K` (macOS) and `Ctrl+K` (Windows / Linux) so the
 * same component works cross-platform without consumer branching.
 *
 * The composable `useHotkey` itself normalises `meta` vs `ctrl` per
 * platform, but we still register both because some hardware /
 * input-method combinations on Linux ship `meta` differently.
 */
export const COMMAND_PALETTE_DEFAULT_HOTKEY: ReadonlyArray<ReadonlyArray<string>> = [
    ['meta', 'k'],
    ['ctrl', 'k']
]

/** Default v-model name of the global palette singleton in `useCommand`. */
export const COMMAND_PALETTE_GLOBAL_ID = 'origam-command-palette-global'

/** Default max-height of the result list (px). */
export const COMMAND_PALETTE_DEFAULT_MAX_HEIGHT = 480

/** Default width of the palette dialog (px). */
export const COMMAND_PALETTE_DEFAULT_WIDTH = 640
