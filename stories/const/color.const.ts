import type { IOptions } from '@origam/interfaces'
import type { TColor } from '@origam/types'

/**
 * Catch-all list for the `color` / `bgColor` controls in stories.
 * Mirrors the origam-design-system pattern: intents + every CSS-color
 * format the prop can accept. Lets testers cover the whole behaviour
 * matrix in one Variant.
 *
 *  - `undefined` → component default
 *  - intent strings (`primary`, `success`, …) → only honoured by
 *    components that wire an intent → SCSS class mapping (e.g. Btn).
 *    No-op on intent-agnostic surfaces — by design.
 *  - named / hex / rgb / hsl / hsla / rgba → resolved as raw CSS
 *    colors by `useColor` on every component.
 */
export const colorList: Array<IOptions<TColor>> = [
    { label: '(default)', value: undefined },

    // Intents — honoured by Btn and other intent-aware components.
    { label: 'Primary', value: 'primary' },
    { label: 'Secondary', value: 'secondary' },
    { label: 'Success', value: 'success' },
    { label: 'Warning', value: 'warning' },
    { label: 'Danger', value: 'danger' },
    { label: 'Info', value: 'info' },
    { label: 'Ghost', value: 'ghost' },

    // Named CSS colors.
    { label: 'Name — white', value: 'white' },
    { label: 'Name — black', value: 'black' },

    // Hex.
    { label: 'HEX — #01161e', value: '#01161e' },
    { label: 'HEX — #f8fafc', value: '#f8fafc' },

    // HSL / HSLA.
    { label: 'HSL — hsl(197, 66%, 21%)', value: 'hsl(197, 66%, 21%)' },
    { label: 'HSLA — hsla(197, 66%, 21%, 0.6)', value: 'hsla(197, 66%, 21%, 0.6)' },

    // RGB / RGBA.
    { label: 'RGB — rgb(117, 119, 223)', value: 'rgb(117, 119, 223)' },
    { label: 'RGBA — rgba(117, 119, 223, 0.4)', value: 'rgba(117, 119, 223, 0.4)' },
]
