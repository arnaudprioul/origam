import type { IOrigamTheme } from 'origam/interfaces'

export const appleLightTheme: IOrigamTheme = {
    name: 'apple',
    label: 'Apple',
    vars: {
        rounded: {
            card: '12px',
            btn: '12px',
            pill: '980px',
            sm: '8px',
            md: '12px',
            lg: '18px'
        },
        color: {
            surface: {
                default: '#ffffff',
                raised: '#fbfbfd',
                sunken: '#f5f5f7',
                overlay: '#f5f5f7',
                disabled: '#d2d2d7'
            },
            text: {
                primary: '#1d1d1f',
                secondary: '#515154',
                tertiary: '#86868b',
                disabled: '#86868b',
                inverse: '#ffffff',
                onColor: '#ffffff',
                ink: '#1d1d1f'
            },
            action: {
                primary: {
                    bg: '#0071e3',
                    bgHover: '#0058b0',
                    bgSubtle: '#f0f7ff',
                    bgDisabled: '#d2d2d7',
                    fg: '#ffffff',
                    fgSubtle: '#0058b0',
                    fgDisabled: '#86868b'
                },
                secondary: {
                    bg: '#fbfbfd',
                    bgHover: '#f5f5f7',
                    bgDisabled: '#d2d2d7',
                    fg: '#1d1d1f',
                    fgDisabled: '#86868b'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(0, 0, 0, 0.04)',
                    bgDisabled: 'transparent',
                    fg: '#1d1d1f',
                    fgDisabled: '#86868b'
                }
            },
            border: {
                default: '#d2d2d7',
                subtle: '#e5e5e7',
                strong: '#86868b',
                focus: '#0071e3',
                'subtle-alpha': 'rgba(210, 210, 215, 0.60)',
                ghost: 'rgba(210, 210, 215, 0.40)'
            },
            feedback: {
                success: {
                    bg: '#198529',
                    bgSubtle: 'rgba(25, 133, 41, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#198529',
                    border: '#198529'
                },
                warning: {
                    bg: '#a86600',
                    bgSubtle: 'rgba(168, 102, 0, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#a86600',
                    border: '#a86600'
                },
                danger: {
                    bg: '#c2271c',
                    bgSubtle: 'rgba(194, 39, 28, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#c2271c',
                    border: '#c2271c'
                },
                info: {
                    bg: '#0071e3',
                    bgSubtle: 'rgba(0, 113, 227, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#0058b0',
                    border: '#0071e3'
                }
            }
        },
        // ⛔ ELEVATION = le tier `shadow` sémantique. Rampe croissante iOS :
        // ombres douces, multicouches, opacités très faibles (style HIG Apple).
        // Les composants consomment via la prop `elevation`, jamais de shadow inline.
        shadow: {
            none: 'none',
            xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
            sm: '0 2px 6px rgba(0, 0, 0, 0.06)',
            md: '0 4px 12px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.04)',
            lg: '0 8px 20px rgba(0, 0, 0, 0.08), 0 2px 6px rgba(0, 0, 0, 0.04)',
            xl: '0 12px 32px rgba(0, 0, 0, 0.10), 0 4px 8px rgba(0, 0, 0, 0.04)'
        }
    },
    // ⛔ PROPS D'ABORD (logique DS). Overrides apple superposés sur la baseline
    // `origam` (deep-merge). Identité Apple/iOS HIG = boutons pleins, coins
    // arrondis modérés, bordures minimales, elevation subtile via ombres douces.
    // Mode-agnostic : s'applique aux deux modes (light + dark).
    components: {
        'origam-btn': { variant: 'flat', rounded: 'md', elevation: 1 },
        'origam-btn-group': { variant: 'flat', rounded: 'md' },
        'origam-btn-toggle': { variant: 'flat', rounded: 'md' },
        'origam-card': { rounded: 'md', flat: false, elevation: 2, border: false },
        'origam-chip': { variant: 'tonal', rounded: 'md', pill: false, border: false },
        'origam-alert': { rounded: 'md', elevation: 1 },
        'origam-field': { variant: 'outlined', rounded: 'md', border: true },
        'origam-text-field': { variant: 'outlined', rounded: 'md', density: 'compact' },
        'origam-textarea-field': { variant: 'outlined', rounded: 'md' },
        'origam-number-field': { variant: 'outlined', rounded: 'md', border: true },
        'origam-password-field': { variant: 'outlined', rounded: 'md' },
        'origam-select': { variant: 'outlined', rounded: 'md', border: true, density: 'compact' },
        'origam-date-picker-field': { rounded: 'md', border: true },
        'origam-file-field': { rounded: 'md', border: true },
        'origam-color-picker-field': { rounded: 'md', border: true },
        'origam-code': { rounded: 'md', elevation: 1 },
        'origam-menu': { rounded: 'md', elevation: 3 },
        'origam-table': { rounded: 'md', border: true },
        'origam-avatar': { rounded: 'full' },
        'origam-checkbox': { rounded: 'sm' },
        'origam-snackbar': { rounded: 'lg', elevation: 4 }
    },
    cssVars: {
        "--origam-font-family---heading": "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
        "--origam-title---font-family": "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
        '--origam-appbar---backdrop-filter': 'saturate(180%) blur(20px)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '12px',
        '--origam-menu__content---padding': '6px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-card---box-shadow': 'var(--origam-shadow---card-elevated)',
        '--origam-code---border-radius': '12px',
        '--origam-appbar---bg': 'color-mix(in srgb, #ffffff 80%, transparent)',
        '--origam-menu---background': 'color-mix(in srgb, var(--origam-color__surface---raised) 92%, transparent)',
        '--origam-menu---box-shadow': '0 4px 16px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.06), 0 0 0 0.5px var(--origam-color__border---default)',
        '--origam-btn---border-color': '#d2d2d7',
        '--origam-btn---box-shadow-elevated': '0 2px 8px rgba(0, 113, 227, 0.25)'
    }
}

export const appleDarkTheme: IOrigamTheme = {
    name: 'apple',
    mode: 'dark',
    vars: {
        rounded: {
            card: '12px',
            btn: '12px',
            pill: '980px',
            sm: '8px',
            md: '12px',
            lg: '18px'
        },
        color: {
            surface: {
                default: '#000000',
                raised: '#1c1c1e',
                sunken: '#2c2c2e',
                overlay: '#2c2c2e',
                disabled: '#38383a'
            },
            text: {
                primary: '#f5f5f7',
                secondary: '#a1a1a6',
                tertiary: '#6e6e73',
                disabled: '#6e6e73',
                inverse: '#000000',
                onColor: '#ffffff',
                ink: '#f5f5f7'
            },
            action: {
                primary: {
                    bg: '#0a84ff',
                    bgHover: '#64b5ff',
                    bgSubtle: 'rgba(10, 132, 255, 0.16)',
                    bgDisabled: '#38383a',
                    fg: '#ffffff',
                    fgSubtle: '#64b5ff',
                    fgDisabled: '#6e6e73'
                },
                secondary: {
                    bg: '#1c1c1e',
                    bgHover: '#2c2c2e',
                    bgDisabled: '#38383a',
                    fg: '#f5f5f7',
                    fgDisabled: '#6e6e73'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(255, 255, 255, 0.06)',
                    bgDisabled: 'transparent',
                    fg: '#f5f5f7',
                    fgDisabled: '#6e6e73'
                }
            },
            border: {
                default: '#38383a',
                subtle: '#2c2c2e',
                strong: '#6e6e73',
                focus: '#0a84ff',
                'subtle-alpha': 'rgba(56, 56, 58, 0.60)',
                ghost: 'rgba(56, 56, 58, 0.40)'
            },
            feedback: {
                success: {
                    bg: '#64e47c',
                    bgSubtle: 'rgba(100, 228, 124, 0.12)',
                    fg: '#000000',
                    fgSubtle: '#64e47c',
                    border: '#64e47c'
                },
                warning: {
                    bg: '#ffb445',
                    bgSubtle: 'rgba(255, 180, 69, 0.12)',
                    fg: '#000000',
                    fgSubtle: '#ffb445',
                    border: '#ffb445'
                },
                danger: {
                    bg: '#ff6961',
                    bgSubtle: 'rgba(255, 105, 97, 0.12)',
                    fg: '#ffffff',
                    fgSubtle: '#ff6961',
                    border: '#ff6961'
                },
                info: {
                    bg: '#0a84ff',
                    bgSubtle: 'rgba(10, 132, 255, 0.12)',
                    fg: '#ffffff',
                    fgSubtle: '#64b5ff',
                    border: '#0a84ff'
                }
            }
        },
        // ELEVATION (dark) : même style iOS, opacités plus profondes pour
        // rester visible sur fond noir. Consommée via la prop `elevation`.
        shadow: {
            none: 'none',
            xs: '0 1px 2px rgba(0, 0, 0, 0.20)',
            sm: '0 2px 6px rgba(0, 0, 0, 0.30)',
            md: '0 4px 12px rgba(0, 0, 0, 0.40), 0 1px 3px rgba(0, 0, 0, 0.20)',
            lg: '0 8px 20px rgba(0, 0, 0, 0.45), 0 2px 6px rgba(0, 0, 0, 0.25)',
            xl: '0 12px 32px rgba(0, 0, 0, 0.50), 0 4px 8px rgba(0, 0, 0, 0.30)'
        }
    },
    cssVars: {
        "--origam-font-family---heading": "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
        "--origam-title---font-family": "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'Inter', sans-serif",
        '--origam-appbar---backdrop-filter': 'saturate(180%) blur(20px)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '12px',
        '--origam-menu__content---padding': '6px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-card---box-shadow': 'var(--origam-shadow---card-elevated)',
        '--origam-code---border-radius': '12px',
        '--origam-appbar---bg': 'color-mix(in srgb, #000000 80%, transparent)',
        '--origam-menu---background': 'var(--origam-color__surface---raised)',
        '--origam-menu---box-shadow': '0 4px 24px rgba(0, 0, 0, 0.50), 0 1px 2px rgba(0, 0, 0, 0.40), 0 0 0 0.5px var(--origam-color__border---default)',
        '--origam-btn---border-color': '#38383a',
        '--origam-btn---box-shadow-elevated': '0 2px 8px rgba(10, 132, 255, 0.30)'
    }
}

export const appleThemes: IOrigamTheme[] = [appleLightTheme, appleDarkTheme]
