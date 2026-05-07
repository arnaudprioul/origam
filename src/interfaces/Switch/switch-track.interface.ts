import type {
    IColorProps,
    ICommonsComponentEmits,
    ICommonsComponentProps,
    ICommonsComponentSlots
} from '../../interfaces'

/**
 * Props for `<OrigamSwitchTrack>` — the rounded "rail" sitting behind the
 * Switch thumb. The track owns its own visual surface (background, border,
 * inset variant, error state) and exposes slots for content shown on the
 * `true` (left) and `false` (right) sides of the rail.
 *
 * Color contract — strict channel separation:
 *  • `bgColor` paints the rail (the box behind the thumb).
 *  • `color`   is the foreground intent inherited from the parent
 *              SelectionControl (it paints the thumb via `currentColor`,
 *              not the track) — exposed here so the slot content can
 *              react to it (e.g. an icon inside `track.true`).
 */
export interface ISwitchTrackProps extends ICommonsComponentProps, IColorProps {
    /** Whether the switch is currently ON. Drives the `--dirty` modifier. */
    modelValue?: boolean
    /** Validation state forwarded from the surrounding `<OrigamInput>`. */
    isValid?: boolean | null
    /** Disabled state — applies the muted token + cursor. */
    disabled?: boolean
    /** Readonly state — keeps appearance interactive but blocks input. */
    readonly?: boolean
    /** Error state — overrides the rail with the danger token. */
    error?: boolean
    /** Inset (Material) variant — taller, fully-rounded rail. */
    inset?: boolean
}

export interface ISwitchTrackEmits extends ICommonsComponentEmits {
    (e: 'click', event: MouseEvent): void
}

/**
 * Slot payload — `model` and `isValid` are forwarded so the consumer can
 * render contextual content (a checkmark on ON, an `x` on OFF, …).
 */
export interface ISwitchTrackSlotsProps {
    model: boolean
    isValid: boolean | null
}

export interface ISwitchTrackSlots extends ICommonsComponentSlots {
    'track.true'?: (props: ISwitchTrackSlotsProps) => any
    'track.false'?: (props: ISwitchTrackSlotsProps) => any
}
