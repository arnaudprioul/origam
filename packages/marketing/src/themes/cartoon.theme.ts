import type { IOrigamTheme } from 'origam/interfaces'

export const cartoonLightTheme: IOrigamTheme = {
    name: 'cartoon',
    label: 'Cartoon',
    vars: {
        rounded: {
            card: '14px',
            btn: '14px',
            pill: '9999px',
            sm: '8px',
            md: '14px',
            lg: '20px'
        },
        color: {
            surface: {
                default: '#fff9f0',
                raised: '#ffffff',
                sunken: '#fff3d6',
                overlay: '#fff3d6',
                disabled: '#e5e5e5'
            },
            text: {
                primary: '#2b2b2b',
                secondary: '#5a5048',
                tertiary: '#6b6258',
                disabled: '#737373',
                inverse: '#ffffff',
                onColor: '#3a2a2e',
                ink: '#2b2b2b'
            },
            action: {
                primary: {
                    bg: '#ff8fa3',
                    bgHover: '#ff6b8a',
                    bgSubtle: '#ffe5ec',
                    bgDisabled: '#e5e5e5',
                    fg: '#3a2a2e',
                    fgSubtle: '#c0174a',
                    fgDisabled: '#737373'
                },
                secondary: {
                    bg: '#ffffff',
                    bgHover: '#fff9f0',
                    bgDisabled: '#e5e5e5',
                    fg: '#2b2b2b',
                    fgDisabled: '#737373'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(255, 143, 163, 0.10)',
                    bgDisabled: 'transparent',
                    fg: '#2b2b2b',
                    fgDisabled: '#737373'
                }
            },
            border: {
                default: '#171717',
                subtle: '#171717',
                strong: '#000000',
                focus: '#ff8fa3',
                'subtle-alpha': 'rgba(23, 23, 23, 0.60)',
                ghost: 'rgba(23, 23, 23, 0.40)'
            },
            feedback: {
                success: {
                    bg: '#16a34a',
                    bgSubtle: '#bbf7d0',
                    fg: '#000000',
                    fgSubtle: '#166534',
                    border: '#171717'
                },
                warning: {
                    bg: '#fbbf24',
                    bgSubtle: '#fef3c7',
                    fg: '#171717',
                    fgSubtle: '#b45309',
                    border: '#171717'
                },
                danger: {
                    bg: '#ef4444',
                    bgSubtle: '#fecdd3',
                    fg: '#000000',
                    fgSubtle: '#b91c1c',
                    border: '#171717'
                },
                info: {
                    bg: '#60a5fa',
                    bgSubtle: '#dbeafe',
                    fg: '#171717',
                    fgSubtle: '#1d4ed8',
                    border: '#171717'
                }
            },
            'btn-primary-bg': '#ff8fa3',
            'btn-primary-text': '#3a2a2e',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': '#171717',
            'btn-secondary-text': '#2b2b2b'
        },
        // ⛔ ELEVATION = le tier `shadow` sémantique. On surcharge TOUTE l'échelle
        // (dégradé dérivé du défaut) en hard-shadows cartoon. Les composants
        // consomment via la prop `elevation` (ci-dessous), jamais de shadow inline.
        shadow: {
            none: 'none',
            xs: '2px 2px 0 #171717',
            sm: '3px 3px 0 #171717',
            md: '4px 4px 0 #171717',
            lg: '6px 6px 0 #171717',
            xl: '8px 8px 0 #171717'
        }
    },
    // ⛔ PROPS D'ABORD (logique DS). Overrides cartoon superposés sur la baseline
    // `origam` (deep-merge). Identité cartoon = bordures visibles + coins arrondis
    // + hard-shadows via la prop `elevation`. Seuls l'épaisseur 3px + la couleur
    // de bordure #171717 (non exprimables en props) restent dans `vars`.
    components: {
        'origam-btn': { variant: 'outlined', rounded: 'lg', border: true, elevation: 2 },
        'origam-btn-group': { variant: 'outlined', rounded: 'lg', border: true },
        'origam-btn-toggle': { variant: 'outlined', rounded: 'lg', border: true },
        'origam-card': { rounded: 'lg', border: true, flat: false, elevation: 4 },
        'origam-chip': { variant: 'outlined', rounded: 'lg', border: true, pill: false },
        'origam-alert': { rounded: 'lg', border: true, elevation: 2 },
        'origam-field': { variant: 'outlined', rounded: 'lg', border: true, elevation: 2 },
        'origam-text-field': { variant: 'outlined', rounded: 'lg', border: true, elevation: 2 },
        'origam-textarea-field': { variant: 'outlined', rounded: 'lg', border: true, elevation: 2 },
        'origam-number-field': { variant: 'outlined', rounded: 'lg', border: true, elevation: 2 },
        'origam-password-field': { variant: 'outlined', rounded: 'lg', border: true, elevation: 2 },
        'origam-select': { variant: 'outlined', rounded: 'lg', border: true, elevation: 2 },
        'origam-date-picker-field': { rounded: 'lg', border: true, elevation: 2 },
        'origam-file-field': { rounded: 'lg', border: true, elevation: 2 },
        'origam-color-picker-field': { rounded: 'lg', border: true, elevation: 2 },
        'origam-code': { rounded: 'lg', border: true, elevation: 2 },
        'origam-menu': { rounded: 'lg', border: true, elevation: 4 },
        'origam-table': { rounded: 'lg', border: true },
        'origam-avatar': { rounded: 'lg' },
        'origam-checkbox': { rounded: 'md' },
        // Switch harmony (lot 4) — mirrors `origam-text-field`'s rounded/
        // border/elevation so the track reads as the same visual family as
        // the theme's form fields, not a DS-default pill floating outside
        // the theme. Needs `OrigamSwitch.vue` to consume `useDefaults()`
        // for this to actually reach the component (see the DS branch's
        // fix). `origam-checkbox`/`origam-radio` stay untouched — the
        // glyph-based shape they render can't honour these props without a
        // rendering-mechanism change (issue #241), AND they share the same
        // missing-`useDefaults()` gap as 11 other components (issue #242).
        'origam-switch': { rounded: 'lg', border: true, elevation: 2 },
        'origam-snackbar': { rounded: 'lg', border: true, elevation: 4 }
    },
    // Overrides bruts non exprimables en props (couleur + épaisseur de bordure,
    // hard-shadow de bouton). Migrés depuis cartoon.css → appliqués par le DS via
    // `[data-theme="cartoon"]` (sous-arbre-capable).
    cssVars: {
        '--origam-btn---border-color': '#171717',
        '--origam-btn---border-width-outlined': '3px',
        '--origam-btn---border-width-ghost': '3px',
        '--origam-btn---box-shadow-elevated': '4px 4px 0 #171717',
        '--origam-btn---box-shadow-ghost': '4px 4px 0 #171717',
        '--origam-card---border-color': 'var(--origam-color__border---default)',
        '--origam-card---border-style': 'solid',
        '--origam-card---border-top-width': '3px',
        '--origam-card---border-right-width': '3px',
        '--origam-card---border-bottom-width': '3px',
        '--origam-card---border-left-width': '3px',
        '--origam-card---box-shadow': '6px 6px 0 #171717',
        '--origam-appbar---bg': '#fff9f0',
        '--origam-chip---border-color': '#171717',
        '--origam-chip---border-style': 'solid',
        '--origam-chip---border-width': '3px',
        '--origam-chip---border-width-outlined': '3px',
        '--origam-code---border-width': '3px',
        '--origam-code---border-color': '#171717',
        '--origam-menu---background': 'var(--origam-color__surface---default)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '14px',
        '--origam-menu---box-shadow': '4px 4px 0 #171717, 0 0 0 3px #171717',
        '--origam-menu__content---padding': '6px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        '--origam-field---border-width': '3px',
        '--origam-field---border-width-outlined': '3px',
        '--origam-field---border-opacity': '1',
        '--origam-field---border-opacity-outlined': '1',
        '--origam-field---border-color': 'var(--origam-color__border---default)',
        '--origam-avatar---border-width': '2px',
        '--origam-avatar---border-style': 'solid',
        '--origam-avatar---border-color': 'var(--origam-color__surface---default)',
        '--origam-avatar---box-shadow': 'none',
        '--origam-font-family---heading': "Inter, -apple-system, 'system-ui', sans-serif",
        '--origam-title---font-family': "Inter, -apple-system, 'system-ui', sans-serif"
    }
}

export const cartoonDarkTheme: IOrigamTheme = {
    name: 'cartoon',
    mode: 'dark',
    vars: {
        rounded: {
            card: '14px',
            btn: '14px',
            pill: '9999px',
            sm: '8px',
            md: '14px',
            lg: '20px'
        },
        color: {
            surface: {
                default: '#1a1a1a',
                raised: '#262626',
                sunken: '#3d2e0a',
                overlay: '#3d2e0a',
                disabled: '#404040'
            },
            text: {
                primary: '#fffefb',
                secondary: '#d4d4d4',
                tertiary: '#a3a3a3',
                disabled: '#737373',
                inverse: '#2b2b2b',
                onColor: '#3a2a2e',
                ink: '#fffefb'
            },
            action: {
                primary: {
                    bg: '#ff8fa3',
                    bgHover: '#ff6b8a',
                    bgSubtle: 'rgba(255, 143, 163, 0.14)',
                    bgDisabled: '#404040',
                    fg: '#3a2a2e',
                    fgSubtle: '#ff8fa3',
                    fgDisabled: '#737373'
                },
                secondary: {
                    bg: '#262626',
                    bgHover: '#333333',
                    bgDisabled: '#404040',
                    fg: '#fffefb',
                    fgDisabled: '#737373'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(255, 254, 251, 0.08)',
                    bgDisabled: 'transparent',
                    fg: '#fffefb',
                    fgDisabled: '#737373'
                }
            },
            border: {
                default: '#fffefb',
                subtle: '#fffefb',
                strong: '#ffffff',
                focus: '#ff8fa3',
                'subtle-alpha': 'rgba(255, 254, 251, 0.60)',
                ghost: 'rgba(255, 254, 251, 0.40)'
            },
            feedback: {
                success: {
                    bg: '#86efac',
                    bgSubtle: 'rgba(134, 239, 172, 0.12)',
                    fg: '#1a1a1a',
                    fgSubtle: '#86efac',
                    border: '#86efac'
                },
                warning: {
                    bg: '#fcd34d',
                    bgSubtle: 'rgba(252, 211, 77, 0.12)',
                    fg: '#1a1a1a',
                    fgSubtle: '#fcd34d',
                    border: '#fcd34d'
                },
                danger: {
                    bg: '#ff6961',
                    bgSubtle: 'rgba(255, 105, 97, 0.12)',
                    fg: '#ffffff',
                    fgSubtle: '#ff6961',
                    border: '#ff6961'
                },
                info: {
                    bg: '#7dd3fc',
                    bgSubtle: 'rgba(125, 211, 252, 0.12)',
                    fg: '#1a1a1a',
                    fgSubtle: '#7dd3fc',
                    border: '#7dd3fc'
                }
            },
            'btn-primary-bg': '#ff8fa3',
            'btn-primary-text': '#3a2a2e',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': '#fffefb',
            'btn-secondary-text': '#fffefb'
        },
        // ELEVATION (dark) : même échelle hard-shadow, offset clair #fffefb pour
        // rester visible sur fond sombre. Consommée via la prop `elevation`.
        shadow: {
            none: 'none',
            xs: '2px 2px 0 #fffefb',
            sm: '3px 3px 0 #fffefb',
            md: '4px 4px 0 #fffefb',
            lg: '6px 6px 0 #fffefb',
            xl: '8px 8px 0 #fffefb'
        }
    },
    cssVars: {
        '--origam-btn---border-color': '#fffefb',
        '--origam-btn---border-width-outlined': '3px',
        '--origam-btn---border-width-ghost': '3px',
        '--origam-btn---box-shadow-elevated': '4px 4px 0 #fffefb',
        '--origam-btn---box-shadow-ghost': '4px 4px 0 #fffefb',
        '--origam-card---border-color': 'var(--origam-color__border---default)',
        '--origam-card---border-style': 'solid',
        '--origam-card---border-top-width': '3px',
        '--origam-card---border-right-width': '3px',
        '--origam-card---border-bottom-width': '3px',
        '--origam-card---border-left-width': '3px',
        '--origam-card---box-shadow': '6px 6px 0 #fffefb',
        '--origam-appbar---bg': '#1a1a1a',
        '--origam-chip---border-color': '#fffefb',
        '--origam-chip---border-style': 'solid',
        '--origam-chip---border-width': '3px',
        '--origam-chip---border-width-outlined': '3px',
        '--origam-code---border-width': '3px',
        '--origam-code---border-color': '#fffefb',
        '--origam-menu---background': 'var(--origam-color__surface---default)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '14px',
        '--origam-menu---box-shadow': '4px 4px 0 #fffefb, 0 0 0 3px #fffefb',
        '--origam-menu__content---padding': '6px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        '--origam-field---border-width': '3px',
        '--origam-field---border-width-outlined': '3px',
        '--origam-field---border-opacity': '1',
        '--origam-field---border-opacity-outlined': '1',
        '--origam-field---border-color': 'var(--origam-color__border---default)',
        '--origam-avatar---border-width': '2px',
        '--origam-avatar---border-style': 'solid',
        '--origam-avatar---border-color': '#1a1a1a',
        '--origam-avatar---box-shadow': 'none',
        '--origam-font-family---heading': "Inter, -apple-system, 'system-ui', sans-serif",
        '--origam-title---font-family': "Inter, -apple-system, 'system-ui', sans-serif"
    }
}

export const cartoonThemes: IOrigamTheme[] = [cartoonLightTheme, cartoonDarkTheme]
