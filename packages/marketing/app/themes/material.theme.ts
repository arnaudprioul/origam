import type { IOrigamTheme } from 'origam/interfaces'

export const materialLightTheme: IOrigamTheme = {
    name: 'material',
    label: 'Material',
    vars: {
        rounded: {
            card: '28px',
            btn: '999px',
            pill: '999px',
            sm: '12px',
            md: '16px',
            lg: '28px'
        },
        color: {
            surface: {
                default: '#fef7ff',
                raised: '#ffffff',
                sunken: '#f7f2fa',
                overlay: '#f7f2fa',
                disabled: '#e8def8'
            },
            text: {
                primary: '#1c1b1f',
                secondary: '#49454f',
                tertiary: '#49454f',
                disabled: '#79747e',
                inverse: '#ffffff',
                onColor: '#ffffff',
                ink: '#1c1b1f'
            },
            action: {
                primary: {
                    bg: '#6750a4',
                    bgHover: '#21005d',
                    bgSubtle: '#eaddff',
                    bgDisabled: '#e8def8',
                    fg: '#ffffff',
                    fgSubtle: '#21005d',
                    fgDisabled: '#79747e'
                },
                secondary: {
                    bg: '#eaddff',
                    bgHover: '#d0bcff',
                    bgDisabled: '#e8def8',
                    fg: '#21005d',
                    fgDisabled: '#79747e'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(103, 80, 164, 0.08)',
                    bgDisabled: 'transparent',
                    fg: '#6750a4',
                    fgDisabled: '#79747e'
                }
            },
            border: {
                default: 'rgba(28, 27, 31, 0.12)',
                subtle: 'rgba(28, 27, 31, 0.06)',
                strong: 'rgba(28, 27, 31, 0.30)',
                focus: '#6750a4',
                'subtle-alpha': 'rgba(28, 27, 31, 0.08)',
                ghost: 'rgba(28, 27, 31, 0.06)'
            },
            feedback: {
                success: {
                    bg: '#388e3c',
                    bgSubtle: '#e8f5e9',
                    fg: '#000000',
                    fgSubtle: '#1b5e20',
                    border: '#388e3c'
                },
                warning: {
                    bg: '#f57c00',
                    bgSubtle: '#fff3e0',
                    fg: '#000000',
                    fgSubtle: '#9a3412',
                    border: '#f57c00'
                },
                danger: {
                    bg: '#b3261e',
                    bgSubtle: '#f9dedc',
                    fg: '#ffffff',
                    fgSubtle: '#601410',
                    border: '#b3261e'
                },
                info: {
                    bg: '#0288d1',
                    bgSubtle: '#e1f5fe',
                    fg: '#000000',
                    fgSubtle: '#01579b',
                    border: '#0288d1'
                }
            },
            'btn-primary-bg': 'transparent',
            'btn-primary-text': '#1c1b1f',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': 'transparent',
            'btn-secondary-text': '#21005d'
        },
        // ⛔ ELEVATION = tier `shadow` sémantique. Rampe M3 (dp1..dp5) :
        // key layer (opacity 0.3) + ambient layer (opacity 0.15). Les composants
        // consomment via la prop `elevation` (bloc `components` ci-dessous).
        shadow: {
            none: 'none',
            xs: '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
            sm: '0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(0,0,0,0.15)',
            md: '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px rgba(0,0,0,0.3)',
            lg: '0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3)',
            xl: '0 8px 12px 6px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.3)'
        }
    },
    // ⛔ PROPS D'ABORD (logique DS). Overrides Material superposés sur la baseline
    // `origam` (deep-merge). Identité M3 = très arrondi (rounded lg), elevation marquée,
    // variantes elevated/tonal, champs filled. Seule la rampe shadow (non exprimable
    // en props) reste dans `vars`.
    components: {
        'origam-btn': { variant: 'elevated', rounded: 'lg', elevation: 1 },
        'origam-btn-group': { variant: 'elevated', rounded: 'lg' },
        'origam-btn-toggle': { variant: 'tonal', rounded: 'lg' },
        'origam-card': { rounded: 'lg', flat: false, border: false, elevation: 1 },
        'origam-chip': { variant: 'tonal', rounded: 'lg', pill: true, border: false },
        'origam-alert': { rounded: 'lg', elevation: 1 },
        'origam-field': { variant: 'filled', rounded: 'lg' },
        'origam-text-field': { variant: 'filled', rounded: 'lg' },
        'origam-textarea-field': { variant: 'filled', rounded: 'lg' },
        'origam-number-field': { variant: 'filled', rounded: 'lg' },
        'origam-password-field': { variant: 'filled', rounded: 'lg' },
        'origam-select': { variant: 'outlined', rounded: 'lg' },
        'origam-date-picker-field': { rounded: 'lg' },
        'origam-file-field': { rounded: 'lg' },
        'origam-color-picker-field': { rounded: 'lg' },
        'origam-code': { rounded: 'lg', elevation: 1 },
        'origam-menu': { rounded: 'lg', elevation: 2 },
        'origam-table': { rounded: 'lg', border: false, elevation: 1 },
        'origam-avatar': { rounded: 'lg' },
        'origam-checkbox': { rounded: 'md' },
        'origam-snackbar': { rounded: 'lg', elevation: 3 }
    },
    cssVars: {
        "--origam-font-family---heading": "'Roboto', 'Inter', -apple-system, sans-serif",
        "--origam-title---font-family": "'Roboto', 'Inter', -apple-system, sans-serif",
        '--origam-font-weight---extrabold': '600',
        '--origam-letter-spacing---hero': '-0.025em',
        '--origam-appbar---backdrop-filter': 'saturate(140%) blur(16px)',
        '--origam-menu---background': 'var(--origam-color__surface---raised)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '16px',
        '--origam-menu__content---padding': '6px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        '--origam-card---background': 'var(--origam-color__surface---raised)',
        '--origam-card---border-radius': '28px',
        '--origam-card---border-width': '1px',
        '--origam-card---border-color': 'var(--origam-color__border---default)',
        '--origam-chip---border-radius': '999px',
        '--origam-chip---background': 'var(--origam-color__surface---raised)',
        '--origam-chip---background-color': 'var(--origam-color__surface---raised)',
        '--origam-chip---border-color': 'var(--origam-color__border---default)',
        '--origam-btn---border-radius': '999px',
        '--origam-btn---border-radius-rounded': '999px',
        '--origam-btn---border-color': 'var(--origam-color__border---default)',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-elevated': '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-code---border-radius': '12px',
        '--origam-code---border-width': '0',
        '--origam-alert---border-radius': 'var(--origam-radius---lg, 12px)',
        '--origam-alert---box-shadow-elevated': '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
        '--origam-table---border-radius': '28px',
        '--origam-appbar---bg': 'color-mix(in srgb, #fef7ff 72%, transparent)',
        '--origam-menu---box-shadow': '0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(208, 188, 255, 0.15), 0 0 0 1px var(--origam-color__border---default)'
    }
}

export const materialDarkTheme: IOrigamTheme = {
    name: 'material',
    mode: 'dark',
    vars: {
        rounded: {
            card: '28px',
            btn: '999px',
            pill: '999px',
            sm: '12px',
            md: '16px',
            lg: '28px'
        },
        color: {
            surface: {
                default: '#1c1b1f',
                raised: '#2b2930',
                sunken: '#36343b',
                overlay: '#36343b',
                disabled: '#49454f'
            },
            text: {
                primary: '#e6e1e5',
                secondary: '#cac4d0',
                tertiary: '#cac4d0',
                disabled: '#79747e',
                inverse: '#1c1b1f',
                onColor: '#381e72',
                ink: '#e6e1e5'
            },
            action: {
                primary: {
                    bg: '#d0bcff',
                    bgHover: '#eaddff',
                    bgSubtle: '#4a4458',
                    bgDisabled: '#49454f',
                    fg: '#381e72',
                    fgSubtle: '#eaddff',
                    fgDisabled: '#79747e'
                },
                secondary: {
                    bg: '#4a4458',
                    bgHover: '#625b71',
                    bgDisabled: '#49454f',
                    fg: '#eaddff',
                    fgDisabled: '#79747e'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(208, 188, 255, 0.08)',
                    bgDisabled: 'transparent',
                    fg: '#d0bcff',
                    fgDisabled: '#79747e'
                }
            },
            border: {
                default: 'rgba(202, 196, 208, 0.12)',
                subtle: 'rgba(202, 196, 208, 0.06)',
                strong: 'rgba(202, 196, 208, 0.30)',
                focus: '#d0bcff',
                'subtle-alpha': 'rgba(202, 196, 208, 0.08)',
                ghost: 'rgba(202, 196, 208, 0.06)'
            },
            feedback: {
                success: {
                    bg: '#81c784',
                    bgSubtle: 'rgba(110, 231, 183, 0.14)',
                    fg: '#1b5e20',
                    fgSubtle: '#c5e1a5',
                    border: '#c5e1a5'
                },
                warning: {
                    bg: '#ffb300',
                    bgSubtle: 'rgba(255, 224, 130, 0.12)',
                    fg: '#3e2723',
                    fgSubtle: '#ffe082',
                    border: '#ffe082'
                },
                danger: {
                    bg: '#e57373',
                    bgSubtle: 'rgba(249, 222, 220, 0.12)',
                    fg: '#3e0012',
                    fgSubtle: '#f9dedc',
                    border: '#f9dedc'
                },
                info: {
                    bg: '#d0bcff',
                    bgSubtle: 'rgba(208, 188, 255, 0.12)',
                    fg: '#381e72',
                    fgSubtle: '#eaddff',
                    border: '#d0bcff'
                }
            },
            'btn-primary-bg': 'transparent',
            'btn-primary-text': '#e6e1e5',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': 'transparent',
            'btn-secondary-text': '#eaddff'
        },
        // ELEVATION (dark) : M3 dark mode → même rampe key+ambient, alphas renforcés
        // car les surfaces sombres offrent moins de contraste pour l'elevation tonale.
        shadow: {
            none: 'none',
            xs: '0 1px 2px rgba(0,0,0,0.5), 0 1px 3px 1px rgba(0,0,0,0.3)',
            sm: '0 1px 2px rgba(0,0,0,0.5), 0 2px 6px 2px rgba(0,0,0,0.3)',
            md: '0 4px 8px 3px rgba(0,0,0,0.3), 0 1px 3px rgba(0,0,0,0.5)',
            lg: '0 6px 10px 4px rgba(0,0,0,0.3), 0 2px 3px rgba(0,0,0,0.5)',
            xl: '0 8px 12px 6px rgba(0,0,0,0.3), 0 4px 4px rgba(0,0,0,0.5)'
        }
    },
    cssVars: {
        "--origam-font-family---heading": "'Roboto', 'Inter', -apple-system, sans-serif",
        "--origam-title---font-family": "'Roboto', 'Inter', -apple-system, sans-serif",
        '--origam-font-weight---extrabold': '600',
        '--origam-letter-spacing---hero': '-0.025em',
        '--origam-appbar---backdrop-filter': 'saturate(140%) blur(16px)',
        '--origam-menu---background': 'var(--origam-color__surface---raised)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '16px',
        '--origam-menu__content---padding': '6px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        '--origam-card---background': 'var(--origam-color__surface---raised)',
        '--origam-card---border-radius': '28px',
        '--origam-card---border-width': '1px',
        '--origam-card---border-color': 'var(--origam-color__border---default)',
        '--origam-chip---border-radius': '999px',
        '--origam-chip---background': 'var(--origam-color__surface---raised)',
        '--origam-chip---background-color': 'var(--origam-color__surface---raised)',
        '--origam-chip---border-color': 'var(--origam-color__border---default)',
        '--origam-btn---border-radius': '999px',
        '--origam-btn---border-radius-rounded': '999px',
        '--origam-btn---border-color': 'var(--origam-color__border---default)',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-elevated': '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-code---border-radius': '12px',
        '--origam-code---border-width': '0',
        '--origam-alert---border-radius': 'var(--origam-radius---lg, 12px)',
        '--origam-alert---box-shadow-elevated': '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
        '--origam-table---border-radius': '28px',
        '--origam-appbar---bg': 'color-mix(in srgb, #1c1b1f 72%, transparent)',
        '--origam-menu---box-shadow': '0 4px 24px -4px rgba(0, 0, 0, 0.50), 0 1px 2px rgba(0, 0, 0, 0.30), 0 0 0 1px var(--origam-color__border---default)'
    }
}

export const materialThemes: IOrigamTheme[] = [materialLightTheme, materialDarkTheme]
