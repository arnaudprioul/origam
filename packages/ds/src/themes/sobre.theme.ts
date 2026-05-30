import type { IOrigamTheme } from '../interfaces'

// ─────────────────────────────────────────────────────────────────────────────
// `sobre` — the single theme baked into the design system (ADR-004).
//
// ADR-004 pulls all brand themes (glass, geek, cartoon, editorial, material,
// ecom, apple) OUT of the DS — those now live in the marketing package. The DS
// ships PURE MECHANICS plus this ONE base theme, `sobre`, which doubles as the
// implicit default `createOrigam()` installs when the consumer passes no theme.
//
// A theme object has two orthogonal layers:
//   - `vars`      — the semantic CSS-var surface (brand identity: colors,
//                   gradients). Scoped to `[data-theme="sobre"][data-mode="…"]`.
//   - `component` — per-component DEFAULT PROPS (dogfood of the
//                   `useDefaults` provider chain). `createOrigam` provides this
//                   under `ORIGAM_DEFAULTS_KEY`, so a bare `<OrigamBtn>` with
//                   no props inherits these.
//
// The values mirror the canonical resolved token sheets (`light.css` /
// `dark.css`, source `tokens/semantic/{light,dark}.json`). One ADR-004 contrast
// correction is applied here: light-mode `color.text.secondary` moved from
// `#525252` to `#737373` so secondary text keeps a ≥ 4.5:1 ratio on the default
// white surface without looking heavier than primary text.
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
    vars: {
        '--origam-color__surface---default': '#ffffff',
        '--origam-color__surface---raised': '#ffffff',
        '--origam-color__surface---overlay': '#f5f5f5',
        '--origam-color__surface---sunken': '#fafafa',
        '--origam-color__surface---disabled': '#e6e6e6',
        '--origam-color__text---primary': '#171717',
        '--origam-color__text---secondary': '#737373',
        '--origam-color__text---disabled': '#a3a3a3',
        '--origam-color__text---inverse': '#ffffff',
        '--origam-color__text---onColor': '#ffffff',
        '--origam-color__border---default': '#a3a3a3',
        '--origam-color__border---subtle': '#d4d4d4',
        '--origam-color__border---strong': '#404040',
        '--origam-color__border---focus': '#7c3aed',
        '--origam-color__action--primary---bg': '#7c3aed',
        '--origam-color__action--primary---bgHover': '#6d28d9',
        '--origam-color__action--primary---bgSubtle': '#f5f3ff',
        '--origam-color__action--primary---bgDisabled': '#e6e6e6',
        '--origam-color__action--primary---fg': '#ffffff',
        '--origam-color__action--primary---fgSubtle': '#6d28d9',
        '--origam-color__action--primary---fgDisabled': '#a3a3a3',
        '--origam-color__action--secondary---bg': '#e6e6e6',
        '--origam-color__action--secondary---bgHover': '#d4d4d4',
        '--origam-color__action--secondary---bgDisabled': '#f5f5f5',
        '--origam-color__action--secondary---fg': '#262626',
        '--origam-color__action--secondary---fgDisabled': '#a3a3a3',
        '--origam-color__action--ghost---bg': 'rgba(0, 0, 0, 0)',
        '--origam-color__action--ghost---bgHover': '#f5f5f5',
        '--origam-color__action--ghost---bgDisabled': 'rgba(0, 0, 0, 0)',
        '--origam-color__action--ghost---fg': '#7c3aed',
        '--origam-color__action--ghost---fgDisabled': '#a3a3a3',
        '--origam-color__feedback--success---bg': '#4caf50',
        '--origam-color__feedback--success---bgSubtle': '#f0fdf4',
        '--origam-color__feedback--success---fg': '#ffffff',
        '--origam-color__feedback--success---fgSubtle': '#16a34a',
        '--origam-color__feedback--success---border': '#4caf50',
        '--origam-color__feedback--warning---bg': '#fb8c00',
        '--origam-color__feedback--warning---bgSubtle': '#fffbeb',
        '--origam-color__feedback--warning---fg': '#ffffff',
        '--origam-color__feedback--warning---fgSubtle': '#b45309',
        '--origam-color__feedback--warning---border': '#fb8c00',
        '--origam-color__feedback--danger---bg': '#ef4444',
        '--origam-color__feedback--danger---bgSubtle': '#fff1f2',
        '--origam-color__feedback--danger---fg': '#ffffff',
        '--origam-color__feedback--danger---fgSubtle': '#b91c1c',
        '--origam-color__feedback--danger---border': '#cf6679',
        '--origam-color__feedback--info---bg': '#2196f3',
        '--origam-color__feedback--info---bgSubtle': '#eff6ff',
        '--origam-color__feedback--info---fg': '#ffffff',
        '--origam-color__feedback--info---fgSubtle': '#1e40af',
        '--origam-color__feedback--info---border': '#2196f3',
        '--origam-color__overlay---scrim': '#ffffff',
        '--origam-gradient---sunset': 'linear-gradient(135deg, #ff7e5f, #feb47b)',
        '--origam-gradient---ocean': 'linear-gradient(135deg, #2193b0, #6dd5ed)',
        '--origam-gradient---forest': 'linear-gradient(135deg, #134e5e, #71b280)',
        '--origam-gradient---fire': 'linear-gradient(135deg, #f12711, #f5af19)',
        '--origam-gradient---midnight': 'linear-gradient(135deg, #232526, #414345)'
    }
}

export const sobreDarkTheme: IOrigamTheme = {
    name: 'sobre',
    mode: 'dark',
    label: 'Sobre',
    description: 'The neutral origam base — calm surfaces, a single violet accent.',
    component: { ...SOBRE_COMPONENT_DEFAULTS },
    vars: {
        '--origam-color__surface---default': '#0a0a0a',
        '--origam-color__surface---raised': '#171717',
        '--origam-color__surface---overlay': '#262626',
        '--origam-color__surface---sunken': '#0a0a0a',
        '--origam-color__surface---disabled': '#262626',
        '--origam-color__text---primary': '#fafafa',
        '--origam-color__text---secondary': '#a3a3a3',
        '--origam-color__text---disabled': '#525252',
        '--origam-color__text---inverse': '#171717',
        '--origam-color__text---onColor': '#ffffff',
        '--origam-color__border---default': '#404040',
        '--origam-color__border---subtle': '#262626',
        '--origam-color__border---strong': '#a3a3a3',
        '--origam-color__border---focus': '#a78bfa',
        '--origam-color__action--primary---bg': '#8b5cf6',
        '--origam-color__action--primary---bgHover': '#a78bfa',
        '--origam-color__action--primary---bgSubtle': '#4c1d95',
        '--origam-color__action--primary---bgDisabled': '#262626',
        '--origam-color__action--primary---fg': '#ffffff',
        '--origam-color__action--primary---fgSubtle': '#c4b5fd',
        '--origam-color__action--primary---fgDisabled': '#525252',
        '--origam-color__action--secondary---bg': '#262626',
        '--origam-color__action--secondary---bgHover': '#404040',
        '--origam-color__action--secondary---bgDisabled': '#171717',
        '--origam-color__action--secondary---fg': '#f5f5f5',
        '--origam-color__action--secondary---fgDisabled': '#525252',
        '--origam-color__action--ghost---bg': 'rgba(0, 0, 0, 0)',
        '--origam-color__action--ghost---bgHover': '#262626',
        '--origam-color__action--ghost---bgDisabled': 'rgba(0, 0, 0, 0)',
        '--origam-color__action--ghost---fg': '#a78bfa',
        '--origam-color__action--ghost---fgDisabled': '#525252',
        '--origam-color__feedback--success---bg': '#4caf50',
        '--origam-color__feedback--success---bgSubtle': '#171717',
        '--origam-color__feedback--success---fg': '#ffffff',
        '--origam-color__feedback--success---fgSubtle': '#4ade80',
        '--origam-color__feedback--success---border': '#4caf50',
        '--origam-color__feedback--warning---bg': '#fb8c00',
        '--origam-color__feedback--warning---bgSubtle': '#171717',
        '--origam-color__feedback--warning---fg': '#ffffff',
        '--origam-color__feedback--warning---fgSubtle': '#fbbf24',
        '--origam-color__feedback--warning---border': '#fb8c00',
        '--origam-color__feedback--danger---bg': '#ef4444',
        '--origam-color__feedback--danger---bgSubtle': '#171717',
        '--origam-color__feedback--danger---fg': '#ffffff',
        '--origam-color__feedback--danger---fgSubtle': '#cf6679',
        '--origam-color__feedback--danger---border': '#cf6679',
        '--origam-color__feedback--info---bg': '#2196f3',
        '--origam-color__feedback--info---bgSubtle': '#171717',
        '--origam-color__feedback--info---fg': '#ffffff',
        '--origam-color__feedback--info---fgSubtle': '#60a5fa',
        '--origam-color__feedback--info---border': '#2196f3',
        '--origam-color__overlay---scrim': '#000000',
        '--origam-gradient---sunset': 'linear-gradient(135deg, #b55149, #9d6f4a)',
        '--origam-gradient---ocean': 'linear-gradient(135deg, #134a59, #2f7e90)',
        '--origam-gradient---forest': 'linear-gradient(135deg, #0a2b34, #3a6047)',
        '--origam-gradient---fire': 'linear-gradient(135deg, #8c1a0b, #8a6210)',
        '--origam-gradient---midnight': 'linear-gradient(135deg, #0d0d0e, #1f2022)'
    }
}

/**
 * Both `sobre` modes combined — the DS's single built-in theme. `createOrigam`
 * installs this when the consumer supplies no theme of their own, so a bare
 * `app.use(createOrigam())` paints with the neutral origam identity in light
 * and dark.
 */
export const sobreTheme: IOrigamTheme[] = [sobreLightTheme, sobreDarkTheme]
