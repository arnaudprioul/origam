import type { IOrigamTheme } from 'origam/interfaces'

export const glassLightTheme: IOrigamTheme = {
    name: 'glass',
    label: 'Glass',
    vars: {
        rounded: {
            card: '16px',
            btn: '999px',
            pill: '999px',
            sm: '10px',
            md: '16px',
            lg: '22px'
        },
        color: {
            surface: {
                default: '#e9ecff',
                raised: 'rgba(255, 255, 255, 0.65)',
                sunken: 'rgba(255, 255, 255, 0.85)',
                overlay: 'rgba(255, 255, 255, 0.85)',
                disabled: 'rgba(196, 181, 253, 0.20)'
            },
            text: {
                primary: '#1a1538',
                secondary: '#3f2e7e',
                tertiary: '#4c3a8c',
                disabled: '#a78bfa',
                inverse: '#ffffff',
                onColor: '#ffffff',
                ink: '#1a1538'
            },
            action: {
                primary: {
                    bg: '#7c3aed',
                    bgHover: '#6d28d9',
                    bgSubtle: 'rgba(124, 58, 237, 0.10)',
                    bgDisabled: 'rgba(196, 181, 253, 0.20)',
                    fg: '#ffffff',
                    fgSubtle: '#6d28d9',
                    fgDisabled: '#a78bfa'
                },
                secondary: {
                    bg: 'rgba(255, 255, 255, 0.18)',
                    bgHover: 'rgba(255, 255, 255, 0.28)',
                    bgDisabled: 'rgba(255, 255, 255, 0.08)',
                    fg: '#1a1538',
                    fgDisabled: '#a78bfa'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(124, 58, 237, 0.08)',
                    bgDisabled: 'transparent',
                    fg: '#6d28d9',
                    fgDisabled: '#a78bfa'
                }
            },
            border: {
                default: 'rgba(124, 58, 237, 0.20)',
                subtle: 'rgba(124, 58, 237, 0.10)',
                strong: 'rgba(124, 58, 237, 0.35)',
                focus: '#7c3aed',
                'subtle-alpha': 'rgba(124, 58, 237, 0.12)',
                ghost: 'rgba(124, 58, 237, 0.16)'
            },
            feedback: {
                success: {
                    bg: '#15803d',
                    bgSubtle: 'rgba(21, 128, 61, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#15803d',
                    border: '#15803d'
                },
                warning: {
                    bg: '#b45309',
                    bgSubtle: 'rgba(180, 83, 9, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#b45309',
                    border: '#b45309'
                },
                danger: {
                    bg: '#b91c1c',
                    bgSubtle: 'rgba(185, 28, 28, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#b91c1c',
                    border: '#b91c1c'
                },
                info: {
                    bg: '#0891b2',
                    bgSubtle: 'rgba(8, 145, 178, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#0891b2',
                    border: '#0891b2'
                }
            },
            'btn-primary-text': '#1a1538',
            'btn-secondary-bg': 'rgba(255, 255, 255, 0.22)',
            'btn-secondary-border': 'transparent',
            'btn-secondary-text': '#1a1538'
        },
        // ⛔ ELEVATION = le tier `shadow` sémantique. Échelle croissante glassmorphism :
        // inset white highlights (reflets internes) + blur diffus violet. Les composants
        // consomment via la prop `elevation` (ci-dessous), jamais de shadow custom nommée.
        shadow: {
            none: 'none',
            xs: 'inset 0 1px 0 rgba(255, 255, 255, 0.70), 0 1px 4px -1px rgba(60, 30, 120, 0.08)',
            sm: 'inset 0 1px 1px rgba(255, 255, 255, 0.80), inset 1px 0 1px rgba(255, 255, 255, 0.40), 0 4px 12px -4px rgba(60, 30, 120, 0.15)',
            md: 'inset 0 1px 1px rgba(255, 255, 255, 0.90), inset 1px 0 1px rgba(255, 255, 255, 0.50), inset 0 -1px 1px rgba(124, 58, 237, 0.10), 0 6px 20px -6px rgba(60, 30, 120, 0.25)',
            lg: 'inset 0 1px 1px rgba(255, 255, 255, 0.90), inset 1px 0 1px rgba(255, 255, 255, 0.50), inset 0 -1px 1px rgba(124, 58, 237, 0.12), 0 10px 30px -12px rgba(60, 30, 120, 0.40)',
            xl: 'inset 0 1px 1px rgba(255, 255, 255, 0.90), inset 1px 0 1px rgba(255, 255, 255, 0.60), inset 0 -1px 1px rgba(124, 58, 237, 0.18), 0 16px 48px -16px rgba(60, 30, 120, 0.55), 0 4px 12px -4px rgba(60, 30, 120, 0.20)'
        }
    },
    // ⛔ PROPS D'ABORD (logique DS). Overrides glass superposés sur la baseline
    // `origam` (deep-merge). Identité glassmorphism = très arrondi + translucide
    // + bordures subtiles + elevation diffuse. Seuls les reflets et couleurs
    // translucides (non exprimables en props) restent dans `vars`.
    components: {
        'origam-btn': { variant: 'tonal', rounded: 'lg', pill: true, elevation: 2 },
        'origam-btn-group': { variant: 'tonal', rounded: 'lg' },
        'origam-btn-toggle': { variant: 'tonal', rounded: 'lg' },
        'origam-card': { rounded: 'lg', border: true, flat: false, elevation: 3 },
        'origam-chip': { variant: 'tonal', rounded: 'lg', border: true, pill: true },
        'origam-alert': { rounded: 'lg', border: true, elevation: 2 },
        'origam-field': { variant: 'outlined', rounded: 'lg', border: true },
        'origam-text-field': { variant: 'outlined', rounded: 'lg', border: true },
        'origam-textarea-field': { variant: 'outlined', rounded: 'lg', border: true },
        'origam-number-field': { variant: 'outlined', rounded: 'lg', border: true },
        'origam-password-field': { variant: 'outlined', rounded: 'lg', border: true },
        'origam-select': { variant: 'outlined', rounded: 'lg', border: true },
        'origam-date-picker-field': { rounded: 'lg', border: true },
        'origam-file-field': { rounded: 'lg', border: true },
        'origam-color-picker-field': { rounded: 'lg', border: true },
        'origam-code': { rounded: 'lg', border: true, elevation: 2 },
        'origam-menu': { rounded: 'lg', border: true, elevation: 3 },
        'origam-table': { rounded: 'lg', border: true },
        'origam-avatar': { rounded: 'lg', border: true },
        'origam-checkbox': { rounded: 'lg' },
        'origam-snackbar': { rounded: 'lg', border: true, elevation: 3 }
    },
    // Overrides bruts glassmorphism non exprimables en props (bordures translucides,
    // backdrop-filter, ombres douces à reflets internes). Migrés depuis glass.css →
    // appliqués par le DS via `[data-theme="glass"]` (sous-arbre-capable).
    cssVars: {
        '--origam-btn---border-color': 'rgba(124, 58, 237, 0.35)',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-elevated': 'inset 0 1px 1px rgba(255, 255, 255, 0.90), inset 1px 0 1px rgba(255, 255, 255, 0.50), inset 0 -1px 1px rgba(124, 58, 237, 0.12), 0 10px 30px -12px rgba(60, 30, 120, 0.40)',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-btn---backdrop-filter-ghost': 'blur(12px) saturate(1.8) brightness(1.05)',
        '--origam-card---box-shadow': 'var(--origam-shadow---card-elevated)',
        '--origam-code---border-radius': '16px',
        '--origam-card---backdrop-filter': 'blur(3px) saturate(1.8) brightness(1.08)',
        '--origam-sheet---backdrop-filter': 'blur(3px) saturate(1.8) brightness(1.08)',
        '--origam-appbar---backdrop-filter': 'saturate(2) brightness(1.1) blur(26px)',
        '--origam-menu---backdrop-filter': 'blur(20px) saturate(1.8) brightness(1.05)',
        '--origam-appbar---bg': 'rgba(255, 255, 255, 0.30)',
        '--origam-menu---background': 'rgba(255, 255, 255, 0.80)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '16px',
        '--origam-menu---box-shadow': '0 8px 32px -8px rgba(124, 58, 237, 0.18), 0 1px 4px -1px rgba(124, 58, 237, 0.10), 0 0 0 1px var(--origam-color__border---default), inset 0 1px 0 rgba(255, 255, 255, 0.60)',
        '--origam-menu__content---padding': '6px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
    }
}

export const glassDarkTheme: IOrigamTheme = {
    name: 'glass',
    mode: 'dark',
    vars: {
        rounded: {
            card: '22px',
            btn: '999px',
            pill: '999px',
            sm: '16px',
            md: '22px',
            lg: '30px'
        },
        color: {
            surface: {
                default: '#07060f',
                raised: 'rgba(255, 255, 255, 0.05)',
                sunken: 'rgba(255, 255, 255, 0.04)',
                overlay: 'rgba(255, 255, 255, 0.04)',
                disabled: 'rgba(107, 95, 175, 0.20)'
            },
            text: {
                primary: '#ffffff',
                secondary: '#e4deff',
                tertiary: '#cfc4f5',
                disabled: '#6b5faf',
                inverse: '#07060f',
                onColor: '#07060f',
                ink: '#ffffff'
            },
            action: {
                primary: {
                    bg: 'rgba(255, 255, 255, 0.08)',
                    bgHover: 'rgba(255, 255, 255, 0.14)',
                    bgSubtle: 'rgba(167, 139, 250, 0.14)',
                    bgDisabled: 'rgba(107, 95, 175, 0.20)',
                    fg: '#ffffff',
                    fgSubtle: '#ddd6fe',
                    fgDisabled: '#6b5faf'
                },
                secondary: {
                    bg: 'rgba(255, 255, 255, 0.05)',
                    bgHover: 'rgba(255, 255, 255, 0.10)',
                    bgDisabled: 'rgba(255, 255, 255, 0.02)',
                    fg: '#ffffff',
                    fgDisabled: '#6b5faf'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(167, 139, 250, 0.10)',
                    bgDisabled: 'transparent',
                    fg: '#ddd6fe',
                    fgDisabled: '#6b5faf'
                }
            },
            border: {
                default: 'rgba(255, 255, 255, 0.12)',
                subtle: 'rgba(255, 255, 255, 0.06)',
                strong: 'rgba(255, 255, 255, 0.20)',
                focus: '#a78bfa',
                'subtle-alpha': 'rgba(255, 255, 255, 0.08)',
                ghost: 'rgba(255, 255, 255, 0.08)'
            },
            feedback: {
                success: {
                    bg: '#6ee7b7',
                    bgSubtle: 'rgba(110, 231, 183, 0.10)',
                    fg: '#07060f',
                    fgSubtle: '#6ee7b7',
                    border: '#6ee7b7'
                },
                warning: {
                    bg: '#fcd34d',
                    bgSubtle: 'rgba(252, 211, 77, 0.10)',
                    fg: '#07060f',
                    fgSubtle: '#fcd34d',
                    border: '#fcd34d'
                },
                danger: {
                    bg: '#fca5a5',
                    bgSubtle: 'rgba(252, 165, 165, 0.10)',
                    fg: '#07060f',
                    fgSubtle: '#fca5a5',
                    border: '#fca5a5'
                },
                info: {
                    bg: '#7dd3fc',
                    bgSubtle: 'rgba(125, 211, 252, 0.10)',
                    fg: '#07060f',
                    fgSubtle: '#7dd3fc',
                    border: '#7dd3fc'
                }
            },
            'btn-primary-text': '#ffffff',
            'btn-secondary-bg': 'rgba(255, 255, 255, 0.08)',
            'btn-secondary-border': 'transparent',
            'btn-secondary-text': '#ffffff'
        },
        // ELEVATION (dark) : même rampe glassmorphism, reflets blancs atténués sur fond
        // sombre + ombres portées profondes. Consommée via la prop `elevation`.
        shadow: {
            none: 'none',
            xs: 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 1px 4px -1px rgba(0, 0, 0, 0.25)',
            sm: 'inset 0 1px 1px rgba(255, 255, 255, 0.18), inset 1px 0 1px rgba(255, 255, 255, 0.10), 0 4px 12px -4px rgba(0, 0, 0, 0.35)',
            md: 'inset 0 1px 1px rgba(255, 255, 255, 0.25), inset 1.5px 0 1px rgba(255, 255, 255, 0.14), inset 0 -1px 1px rgba(0, 0, 0, 0.10), 0 8px 24px -8px rgba(0, 0, 0, 0.45)',
            lg: 'inset 0 1px 1px rgba(255, 255, 255, 0.60), inset 1.5px 0 1px rgba(255, 255, 255, 0.28), inset -1.5px 0 1px rgba(255, 255, 255, 0.14), inset 0 -10px 22px rgba(255, 255, 255, 0.05), inset 0 -1px 1px rgba(0, 0, 0, 0.20), 0 12px 34px -10px rgba(0, 0, 0, 0.50), 0 2px 6px -2px rgba(0, 0, 0, 0.30)',
            xl: 'inset 0 1px 1px rgba(255, 255, 255, 0.70), inset 1.5px 0 1px rgba(255, 255, 255, 0.35), inset -1.5px 0 1px rgba(255, 255, 255, 0.20), inset 0 -10px 22px rgba(255, 255, 255, 0.06), inset 0 -1px 1px rgba(0, 0, 0, 0.25), 0 16px 48px -12px rgba(0, 0, 0, 0.65), 0 4px 10px -4px rgba(0, 0, 0, 0.40)'
        }
    },
    cssVars: {
        '--origam-btn---border-color': 'rgba(255, 255, 255, 0.20)',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-elevated': 'inset 0 1px 1px rgba(255, 255, 255, 0.60), inset 1.5px 0 1px rgba(255, 255, 255, 0.28), inset 0 -1px 1px rgba(0, 0, 0, 0.20), 0 8px 24px -6px rgba(167, 139, 250, 0.60)',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-btn---backdrop-filter-ghost': 'blur(12px) saturate(1.6) brightness(1.02)',
        '--origam-card---box-shadow': 'var(--origam-shadow---card-elevated)',
        '--origam-code---border-radius': '16px',
        '--origam-card---backdrop-filter': 'blur(3px) saturate(1.8) brightness(1.08)',
        '--origam-sheet---backdrop-filter': 'blur(3px) saturate(1.8) brightness(1.08)',
        '--origam-appbar---backdrop-filter': 'saturate(2) brightness(1.1) blur(26px)',
        '--origam-menu---backdrop-filter': 'blur(20px) saturate(1.6) brightness(1.02)',
        '--origam-appbar---bg': 'rgba(255, 255, 255, 0.06)',
        '--origam-menu---background': 'rgba(20, 18, 40, 0.85)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '22px',
        '--origam-menu---box-shadow': '0 8px 32px -8px rgba(0, 0, 0, 0.60), 0 0 0 1px rgba(255, 255, 255, 0.12), inset 0 1px 0 rgba(255, 255, 255, 0.10)',
        '--origam-menu__content---padding': '6px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
    }
}

export const glassThemes: IOrigamTheme[] = [glassLightTheme, glassDarkTheme]
