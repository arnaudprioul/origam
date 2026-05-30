import type { IOrigamTheme } from '../interfaces'

// ─────────────────────────────────────────────────────────────────────────────
// `sobre` — the single theme baked into the design system (ADR-004).
//
// ADR-004 pulls all brand themes (glass, geek, cartoon, editorial, material,
// ecom, apple) OUT of the DS — those now live in the marketing package. The DS
// ships PURE MECHANICS plus this ONE base theme, `sobre`, which doubles as the
// implicit default `createOrigam()` installs when the consumer passes no theme.
//
// AUTHORING FORMAT (the normal way): plain nested JSON keyed by intention. No
// `--origam-*` prefixes, no DTCG `$value` ceremony. The DS walks `colors`
// (and the sibling scales) and derives each CSS-variable name from the leaf
// path, so this resolves to the EXACT same `--origam-*` names as the published
// token sheets (parity is asserted in the unit specs).
//
//   colors.surface.default     → --origam-color__surface---default
//   colors.text.secondary      → --origam-color__text---secondary
//   colors.action.primary.bg   → --origam-color__action--primary---bg
//   colors.feedback.success.bg → --origam-color__feedback--success---bg
//
// A color slot accepts any CSS color OR a gradient (a gradient is an ordinary
// color value — there is no dedicated `gradient` group anymore).
//
// Two orthogonal layers ship together:
//   - the semantic surface (`colors`, …) — sobre's calm neutral identity,
//   - `component` — per-component DEFAULT PROPS (dogfood of the `useDefaults`
//     provider chain), provided by `createOrigam` under `ORIGAM_DEFAULTS_KEY`.
//
// `sobreLightTheme` is the canonical origam white (untouched). `sobreDarkTheme`
// is authored from the HTML marketing mockup's `sobre` palette (#0A0A0A surface
// stack, violet #8B5CF6 accent, soft feedback). One contrast correction stays
// applied to light: `colors.text.secondary` is `#737373` (was `#525252`) so
// secondary text keeps a ≥ 4.5:1 ratio on the default white surface.
// ─────────────────────────────────────────────────────────────────────────────

const SOBRE_COMPONENT_DEFAULTS = {
    global: { density: 'comfortable' }
} as const

export const sobreLightTheme: IOrigamTheme = {
    name: 'sobre',
    mode: 'light',
    label: 'Sobre',
    description: 'The neutral origam base — calm surfaces, a single violet accent.',
    component: { ...SOBRE_COMPONENT_DEFAULTS },
    colors: {
        surface: {
            default: '#ffffff',
            raised: '#ffffff',
            overlay: '#f5f5f5',
            sunken: '#fafafa',
            disabled: '#e6e6e6'
        },
        text: {
            primary: '#171717',
            secondary: '#737373',
            disabled: '#a3a3a3',
            inverse: '#ffffff',
            onColor: '#ffffff'
        },
        border: {
            default: '#a3a3a3',
            subtle: '#d4d4d4',
            strong: '#404040',
            focus: '#7c3aed'
        },
        action: {
            primary: {
                bg: '#7c3aed',
                bgHover: '#6d28d9',
                bgSubtle: '#f5f3ff',
                bgDisabled: '#e6e6e6',
                fg: '#ffffff',
                fgSubtle: '#6d28d9',
                fgDisabled: '#a3a3a3'
            },
            secondary: {
                bg: '#e6e6e6',
                bgHover: '#d4d4d4',
                bgDisabled: '#f5f5f5',
                fg: '#262626',
                fgDisabled: '#a3a3a3'
            },
            ghost: {
                bg: 'rgba(0, 0, 0, 0)',
                bgHover: '#f5f5f5',
                bgDisabled: 'rgba(0, 0, 0, 0)',
                fg: '#7c3aed',
                fgDisabled: '#a3a3a3'
            }
        },
        feedback: {
            success: { bg: '#4caf50', bgSubtle: '#f0fdf4', fg: '#ffffff', fgSubtle: '#16a34a', border: '#4caf50' },
            warning: { bg: '#fb8c00', bgSubtle: '#fffbeb', fg: '#ffffff', fgSubtle: '#b45309', border: '#fb8c00' },
            danger: { bg: '#ef4444', bgSubtle: '#fff1f2', fg: '#ffffff', fgSubtle: '#b91c1c', border: '#cf6679' },
            info: { bg: '#2196f3', bgSubtle: '#eff6ff', fg: '#ffffff', fgSubtle: '#1e40af', border: '#2196f3' }
        },
        overlay: {
            scrim: '#ffffff'
        }
    }
}

export const sobreDarkTheme: IOrigamTheme = {
    name: 'sobre',
    mode: 'dark',
    label: 'Sobre',
    description: 'The neutral origam base — calm surfaces, a single violet accent.',
    component: { ...SOBRE_COMPONENT_DEFAULTS },
    colors: {
        surface: {
            default: '#0a0a0a',
            raised: '#0e0e0e',
            overlay: '#171717',
            sunken: '#0a0a0a',
            disabled: '#171717'
        },
        text: {
            primary: '#fafafa',
            secondary: '#a3a3a3',
            disabled: '#525252',
            inverse: '#0a0a0a',
            onColor: '#ffffff'
        },
        border: {
            default: 'rgba(255,255,255,0.08)',
            subtle: 'rgba(255,255,255,0.04)',
            strong: 'rgba(255,255,255,0.16)',
            focus: '#a78bfa'
        },
        action: {
            primary: {
                bg: '#8b5cf6',
                bgHover: '#c4b5fd',
                bgSubtle: 'rgba(124,58,237,0.14)',
                bgDisabled: '#171717',
                fg: '#ffffff',
                fgSubtle: '#c4b5fd',
                fgDisabled: '#525252'
            },
            secondary: {
                bg: '#171717',
                bgHover: '#262626',
                bgDisabled: '#0e0e0e',
                fg: '#fafafa',
                fgDisabled: '#525252'
            },
            ghost: {
                bg: 'rgba(0, 0, 0, 0)',
                bgHover: '#171717',
                bgDisabled: 'rgba(0, 0, 0, 0)',
                fg: '#a78bfa',
                fgDisabled: '#525252'
            }
        },
        feedback: {
            success: { bg: '#6ee7b7', bgSubtle: '#171717', fg: '#0a0a0a', fgSubtle: '#6ee7b7', border: '#6ee7b7' },
            warning: { bg: '#fbbf24', bgSubtle: '#171717', fg: '#0a0a0a', fgSubtle: '#fbbf24', border: '#fbbf24' },
            danger: { bg: '#f87171', bgSubtle: '#171717', fg: '#0a0a0a', fgSubtle: '#f87171', border: '#f87171' },
            info: { bg: '#2196f3', bgSubtle: '#171717', fg: '#ffffff', fgSubtle: '#60a5fa', border: '#2196f3' }
        },
        overlay: {
            scrim: '#000000'
        }
    }
}

/**
 * Both `sobre` modes combined — the DS's single built-in theme. `createOrigam`
 * installs this when the consumer supplies no theme of their own, so a bare
 * `app.use(createOrigam())` paints with the neutral origam identity in light
 * and dark.
 */
export const sobreTheme: IOrigamTheme[] = [sobreLightTheme, sobreDarkTheme]
