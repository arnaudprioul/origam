import type { IOrigamTheme } from 'origam/interfaces'

export const ecomLightTheme: IOrigamTheme = {
    name: 'ecom',
    label: 'Ecom',
    vars: {
        rounded: {
            card: '10px',
            btn: '6px',
            pill: '999px',
            sm: '4px',
            md: '10px',
            lg: '10px'
        },
        color: {
            surface: {
                default: '#fff7f0',
                raised: '#ffffff',
                sunken: '#ffedd5',
                overlay: '#ffedd5',
                disabled: '#fed7aa'
            },
            text: {
                primary: '#1a1a1a',
                secondary: '#404040',
                tertiary: '#404040',
                disabled: '#a3a3a3',
                inverse: '#ffffff',
                onColor: '#ffffff',
                ink: '#1a1a1a'
            },
            action: {
                primary: {
                    bg: '#e11d48',
                    bgHover: '#be123c',
                    bgSubtle: '#ffe4e6',
                    bgDisabled: '#fed7aa',
                    fg: '#ffffff',
                    fgSubtle: '#be123c',
                    fgDisabled: '#a3a3a3'
                },
                secondary: {
                    bg: '#ffffff',
                    bgHover: '#ffedd5',
                    bgDisabled: '#fed7aa',
                    fg: '#1a1a1a',
                    fgDisabled: '#a3a3a3'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(225, 29, 72, 0.06)',
                    bgDisabled: 'transparent',
                    fg: '#e11d48',
                    fgDisabled: '#a3a3a3'
                }
            },
            border: {
                default: '#fed7aa',
                subtle: '#ffedd5',
                strong: '#fb923c',
                focus: '#e11d48',
                'subtle-alpha': 'rgba(254, 215, 170, 0.60)',
                ghost: 'rgba(254, 215, 170, 0.50)'
            },
            feedback: {
                success: {
                    bg: '#16a34a',
                    bgSubtle: 'rgba(22, 163, 74, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#166534',
                    border: '#166534'
                },
                warning: {
                    bg: '#d97706',
                    bgSubtle: 'rgba(217, 119, 6, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#92400e',
                    border: '#92400e'
                },
                danger: {
                    bg: '#e11d48',
                    bgSubtle: 'rgba(225, 29, 72, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#9f1239',
                    border: '#9f1239'
                },
                info: {
                    bg: '#0ea5e9',
                    bgSubtle: 'rgba(14, 165, 233, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#0369a1',
                    border: '#0ea5e9'
                }
            },
            'btn-primary-bg': '#e11d48',
            'btn-primary-text': '#ffffff',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': '#fed7aa',
            'btn-secondary-text': '#1a1a1a'
        },
        // ⛔ ELEVATION = le tier `shadow` sémantique. Échelle croissante avec teinte
        // rose/rouge de marque (rgba(225,29,72,…)), subtile et propre façon AliExpress /
        // Ant Design. Consommée via la prop `elevation`, jamais de shadow inline.
        shadow: {
            none: 'none',
            xs: '0px 1px 2px 0px rgba(225, 29, 72, 0.06)',
            sm: '0px 2px 4px 0px rgba(225, 29, 72, 0.08), 0px 1px 2px -1px rgba(0, 0, 0, 0.04)',
            md: '0px 4px 12px 0px rgba(225, 29, 72, 0.10), 0px 1px 3px 0px rgba(0, 0, 0, 0.06)',
            lg: '0px 8px 20px 0px rgba(225, 29, 72, 0.12), 0px 2px 6px -1px rgba(0, 0, 0, 0.08)',
            xl: '0px 12px 32px 0px rgba(225, 29, 72, 0.15), 0px 4px 10px -2px rgba(0, 0, 0, 0.10)'
        }
    },
    // ⛔ PROPS D'ABORD (logique DS). Overrides ecom superposés sur la baseline
    // `origam` (deep-merge). Identité e-commerce (AliExpress / Ant Design) :
    // arrondi modéré (sm/md), boutons flat d'action, cartes propres avec ombre légère.
    components: {
        'origam-btn': { variant: 'flat', rounded: 'sm', elevation: 1 },
        'origam-btn-group': { variant: 'flat', rounded: 'sm' },
        'origam-btn-toggle': { variant: 'flat', rounded: 'sm' },
        'origam-card': { rounded: 'md', border: true, flat: false, elevation: 1 },
        'origam-chip': { variant: 'outlined', rounded: 'sm', border: true, pill: false },
        'origam-alert': { rounded: 'sm', border: true },
        'origam-field': { variant: 'outlined', rounded: 'sm', border: true },
        'origam-text-field': { variant: 'outlined', rounded: 'sm', border: true },
        'origam-textarea-field': { variant: 'outlined', rounded: 'sm', border: true },
        'origam-number-field': { rounded: 'sm', border: true },
        'origam-password-field': { rounded: 'sm' },
        'origam-select': { variant: 'outlined', rounded: 'sm', border: true },
        'origam-date-picker-field': { rounded: 'sm', border: true },
        'origam-file-field': { rounded: 'sm', border: true },
        'origam-color-picker-field': { rounded: 'sm', border: true },
        'origam-code': { rounded: 'md', border: true, elevation: 1 },
        'origam-menu': { rounded: 'sm', border: true, elevation: 2 },
        'origam-table': { rounded: 'md', border: true },
        'origam-avatar': { rounded: 'sm' },
        'origam-checkbox': { rounded: 'sm' },
        'origam-snackbar': { rounded: 'sm', border: true, elevation: 2 }
    },
    cssVars: {
        "--origam-font-family---heading": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        "--origam-title---font-family": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        '--origam-appbar---backdrop-filter': 'saturate(140%) blur(16px)',
        '--origam-menu---background': 'var(--origam-color__surface---raised)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '6px',
        '--origam-menu__content---padding': '4px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-btn---border-radius': 'var(--origam-radius---btn, 6px)',
        '--origam-card---border-style': 'solid',
        '--origam-card---border-top-width': '1px',
        '--origam-card---border-right-width': '1px',
        '--origam-card---border-bottom-width': '1px',
        '--origam-card---border-left-width': '1px',
        '--origam-card---border-start-start-radius': '10px',
        '--origam-card---border-start-end-radius': '10px',
        '--origam-card---border-end-end-radius': '10px',
        '--origam-card---border-end-start-radius': '10px',
        '--origam-chip---border-radius': '6px',
        '--origam-chip---border-width': '1px',
        '--origam-chip---border-style': 'solid',
        '--origam-code---border-radius': '6px',
        '--origam-code---border-width': '1px',
        '--origam-field---border-radius': '6px',
        '--origam-field---border-color': '#fb923c',
        '--origam-alert---border-radius': '6px',
        '--origam-appbar---bg': 'color-mix(in srgb, #fff7f0 72%, transparent)',
        '--origam-menu---box-shadow': '0 1px 3px rgba(225, 29, 72, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06), 0 0 0 1px var(--origam-color__border---default)',
        '--origam-btn---border-color': '#fed7aa',
        '--origam-btn---box-shadow-elevated': '0 2px 0 rgba(225, 29, 72, 0.20), 0 4px 12px -2px rgba(225, 29, 72, 0.35)',
        '--origam-card---background': '#ffffff',
        '--origam-card---border-color': '#fed7aa',
        '--origam-card---box-shadow': '0 1px 3px rgba(225, 29, 72, 0.08), 0 1px 2px rgba(0, 0, 0, 0.06)',
        '--origam-chip---border-color': '#fed7aa',
        '--origam-chip---background-color': 'var(--origam-color__surface---sunken, #ffedd5)',
        '--origam-code---border-color': '#fed7aa',
        '--origam-code---background-color': '#ffedd5',
        '--origam-field---border-opacity': '0.50'
    }
}

export const ecomDarkTheme: IOrigamTheme = {
    name: 'ecom',
    mode: 'dark',
    vars: {
        rounded: {
            card: '10px',
            btn: '6px',
            pill: '999px',
            sm: '4px',
            md: '10px',
            lg: '10px'
        },
        color: {
            surface: {
                default: '#1a0f0a',
                raised: '#2e1b14',
                sunken: '#231510',
                overlay: '#2e1b14',
                disabled: '#3d2518'
            },
            text: {
                primary: '#fff7f0',
                secondary: '#fed7aa',
                tertiary: '#fed7aa',
                disabled: '#a3786a',
                inverse: '#1a0f0a',
                onColor: '#ffffff',
                ink: '#fff7f0'
            },
            action: {
                primary: {
                    bg: '#f43f5e',
                    bgHover: '#fb7185',
                    bgSubtle: 'rgba(244, 63, 94, 0.14)',
                    bgDisabled: '#3d2518',
                    fg: '#ffffff',
                    fgSubtle: '#fb7185',
                    fgDisabled: '#a3786a'
                },
                secondary: {
                    bg: '#2e1b14',
                    bgHover: '#3d2518',
                    bgDisabled: '#3d2518',
                    fg: '#fff7f0',
                    fgDisabled: '#a3786a'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(244, 63, 94, 0.08)',
                    bgDisabled: 'transparent',
                    fg: '#fb7185',
                    fgDisabled: '#a3786a'
                }
            },
            border: {
                default: 'rgba(251, 146, 60, 0.20)',
                subtle: 'rgba(251, 146, 60, 0.10)',
                strong: '#fb923c',
                focus: '#f43f5e',
                'subtle-alpha': 'rgba(251, 146, 60, 0.16)',
                ghost: 'rgba(251, 146, 60, 0.20)'
            },
            feedback: {
                success: {
                    bg: '#86efac',
                    bgSubtle: 'rgba(134, 239, 172, 0.12)',
                    fg: '#1a0f0a',
                    fgSubtle: '#86efac',
                    border: '#86efac'
                },
                warning: {
                    bg: '#fcd34d',
                    bgSubtle: 'rgba(252, 211, 77, 0.12)',
                    fg: '#1a0f0a',
                    fgSubtle: '#fcd34d',
                    border: '#fcd34d'
                },
                danger: {
                    bg: '#fca5a5',
                    bgSubtle: 'rgba(252, 165, 165, 0.12)',
                    fg: '#1a0f0a',
                    fgSubtle: '#fca5a5',
                    border: '#fca5a5'
                },
                info: {
                    bg: '#38bdf8',
                    bgSubtle: 'rgba(56, 189, 248, 0.12)',
                    fg: '#1a0f0a',
                    fgSubtle: '#38bdf8',
                    border: '#38bdf8'
                }
            },
            'btn-primary-bg': '#f43f5e',
            'btn-primary-text': '#ffffff',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': 'rgba(251, 146, 60, 0.30)',
            'btn-secondary-text': '#fff7f0'
        },
        // ELEVATION (dark) : même rampe, opacité renforcée pour rester lisible
        // sur fond sombre. Teinte rose de marque `rgba(225,29,72,…)` conservée.
        shadow: {
            none: 'none',
            xs: '0px 1px 2px 0px rgba(225, 29, 72, 0.10)',
            sm: '0px 2px 4px 0px rgba(225, 29, 72, 0.14), 0px 1px 2px -1px rgba(0, 0, 0, 0.20)',
            md: '0px 4px 12px 0px rgba(225, 29, 72, 0.16), 0px 1px 3px 0px rgba(0, 0, 0, 0.30)',
            lg: '0px 8px 20px 0px rgba(225, 29, 72, 0.18), 0px 2px 6px -1px rgba(0, 0, 0, 0.40)',
            xl: '0px 12px 32px 0px rgba(225, 29, 72, 0.22), 0px 4px 10px -2px rgba(0, 0, 0, 0.50)'
        }
    },
    cssVars: {
        "--origam-font-family---heading": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        "--origam-title---font-family": "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
        '--origam-appbar---backdrop-filter': 'saturate(140%) blur(16px)',
        '--origam-menu---background': 'var(--origam-color__surface---raised)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '6px',
        '--origam-menu__content---padding': '4px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-btn---border-radius': 'var(--origam-radius---btn, 6px)',
        '--origam-card---border-style': 'solid',
        '--origam-card---border-top-width': '1px',
        '--origam-card---border-right-width': '1px',
        '--origam-card---border-bottom-width': '1px',
        '--origam-card---border-left-width': '1px',
        '--origam-card---border-start-start-radius': '10px',
        '--origam-card---border-start-end-radius': '10px',
        '--origam-card---border-end-end-radius': '10px',
        '--origam-card---border-end-start-radius': '10px',
        '--origam-chip---border-radius': '6px',
        '--origam-chip---border-width': '1px',
        '--origam-chip---border-style': 'solid',
        '--origam-code---border-radius': '6px',
        '--origam-code---border-width': '1px',
        '--origam-field---border-radius': '6px',
        '--origam-field---border-color': '#fb923c',
        '--origam-alert---border-radius': '6px',
        '--origam-appbar---bg': 'color-mix(in srgb, #1a0f0a 72%, transparent)',
        '--origam-menu---box-shadow': '0 4px 24px -4px rgba(0, 0, 0, 0.60), 0 0 0 1px var(--origam-color__border---default)',
        '--origam-btn---border-color': 'rgba(251, 146, 60, 0.30)',
        '--origam-btn---box-shadow-elevated': '0 2px 0 rgba(244, 63, 94, 0.25), 0 4px 12px -2px rgba(244, 63, 94, 0.40)',
        '--origam-card---background': '#2e1b14',
        '--origam-card---border-color': 'rgba(251, 146, 60, 0.20)',
        '--origam-card---box-shadow': '0 1px 3px rgba(225, 29, 72, 0.12), 0 1px 2px rgba(0, 0, 0, 0.30)',
        '--origam-chip---border-color': 'rgba(251, 146, 60, 0.30)',
        '--origam-chip---background-color': 'var(--origam-color__surface---sunken, #231510)',
        '--origam-code---border-color': 'rgba(251, 146, 60, 0.20)',
        '--origam-code---background-color': '#231510',
        '--origam-field---border-opacity': '0.40'
    }
}

export const ecomThemes: IOrigamTheme[] = [ecomLightTheme, ecomDarkTheme]
