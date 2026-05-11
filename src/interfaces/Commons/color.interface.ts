import type { TColor } from "../../types"

/**
 * Foreground-only color contract.
 *
 * Use this interface on components whose only colour-related concern is
 * the **text** / icon (`color`, plus its hover / active variants). Pure
 * typographic components (Title, Caption, Subtitle, Tooltip text, …) and
 * any chrome that doesn't paint its own surface should extend this
 * interface — NOT the combined version below.
 *
 *   ┌──────────────────────────────────────────────────────────────┐
 *   │  IF the component paints a background → also extend          │
 *   │     IBgColorProps                                            │
 *   │  ELSE → keep IColorProps only.                               │
 *   └──────────────────────────────────────────────────────────────┘
 */
export interface IColorProps {
    color?: TColor
    activeColor?: TColor
    hoverColor?: TColor
}

/**
 * Background-only color contract.
 *
 * Combine with {@link IColorProps} on components that own a surface
 * (Btn, Card, Badge, Alert, Pagination, …). The two interfaces stay
 * orthogonal so a component can opt into one axis without inheriting
 * unused props on the other.
 *
 *   // Btn paints both surface and text.
 *   interface IBtnProps extends IColorProps, IBgColorProps { … }
 *
 *   // Title only paints text.
 *   interface ITitleProps extends IColorProps { … }
 */
export interface IBgColorProps {
    bgColor?: TColor
    activeBgColor?: TColor
    hoverBgColor?: TColor
}
