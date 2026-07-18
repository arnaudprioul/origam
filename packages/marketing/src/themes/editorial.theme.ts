import type { IOrigamTheme } from 'origam/interfaces'

export const editorialLightTheme: IOrigamTheme = {
    name: 'editorial',
    label: 'Editorial',
    vars: {
        rounded: {
            card: '0px',
            btn: '0px',
            pill: '0px',
            sm: '0px',
            md: '0px',
            lg: '0px'
        },
        color: {
            surface: {
                default: '#fbf7ee',
                raised: '#fffdf7',
                sunken: '#f3ecdd',
                overlay: '#f3ecdd',
                disabled: '#e6dfd1'
            },
            text: {
                primary: '#1a1714',
                secondary: '#4a4036',
                tertiary: '#6b5f50',
                disabled: '#a3a3a3',
                inverse: '#ffffff',
                onColor: '#ffffff',
                ink: '#1a1714'
            },
            action: {
                primary: {
                    bg: '#5b21b6',
                    bgHover: '#4c1d95',
                    bgSubtle: 'rgba(91, 33, 182, 0.10)',
                    bgDisabled: '#e6dfd1',
                    fg: '#ffffff',
                    fgSubtle: '#4c1d95',
                    fgDisabled: '#a3a3a3'
                },
                secondary: {
                    bg: 'transparent',
                    bgHover: 'rgba(91, 33, 182, 0.04)',
                    bgDisabled: 'transparent',
                    fg: '#1a1714',
                    fgDisabled: '#a3a3a3'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(91, 33, 182, 0.04)',
                    bgDisabled: 'transparent',
                    fg: '#5b21b6',
                    fgDisabled: '#a3a3a3'
                }
            },
            border: {
                default: 'rgba(26, 23, 20, 0.16)',
                subtle: 'rgba(26, 23, 20, 0.08)',
                strong: 'rgba(26, 23, 20, 0.40)',
                focus: '#7c3aed',
                'subtle-alpha': 'rgba(26, 23, 20, 0.10)',
                ghost: 'rgba(26, 23, 20, 0.16)'
            },
            feedback: {
                success: {
                    bg: '#15803d',
                    bgSubtle: 'rgba(21, 128, 61, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#166534',
                    border: '#15803d'
                },
                warning: {
                    bg: '#b45309',
                    bgSubtle: 'rgba(180, 83, 9, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#92400e',
                    border: '#b45309'
                },
                danger: {
                    bg: '#b91c1c',
                    bgSubtle: 'rgba(185, 28, 28, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#991b1b',
                    border: '#b91c1c'
                },
                info: {
                    bg: '#1d4ed8',
                    bgSubtle: 'rgba(29, 78, 216, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#1e40af',
                    border: '#1d4ed8'
                }
            },
            'btn-primary-bg': '#5b21b6',
            'btn-primary-text': '#ffffff',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': 'rgba(26, 23, 20, 0.40)',
            'btn-secondary-text': '#1a1714'
        },
        // ⛔ ELEVATION = le tier `shadow` sémantique. Editorial = flat (pas d'ombre).
        // Rampe TRÈS discrète sur xs/sm (séparateurs à peine perceptibles) ;
        // md/lg/xl = none pour conserver l'identité magazine plat + carré.
        shadow: {
            none: 'none',
            xs: '0 1px 2px rgba(0, 0, 0, 0.04)',
            sm: '0 1px 4px rgba(0, 0, 0, 0.06)',
            md: 'none',
            lg: 'none',
            xl: 'none'
        }
    },
    // ⛔ PROPS D'ABORD (logique DS). Identité éditoriale = coins carrés (rounded
    // 'none'), surfaces plates (flat + elevation 0), variant outlined pour les champs
    // interactifs. Sobre comme un magazine : structure visible, sans ornementation.
    components: {
        'origam-btn': { variant: 'outlined', rounded: 'none', border: true, elevation: 0 },
        'origam-btn-group': { variant: 'outlined', rounded: 'none', border: true, elevation: 0 },
        'origam-btn-toggle': { variant: 'outlined', rounded: 'none', border: true, elevation: 0 },
        'origam-card': { rounded: 'none', border: true, flat: true },
        'origam-chip': { variant: 'outlined', rounded: 'none', border: true, pill: false },
        'origam-alert': { rounded: 'none', border: true, elevation: 0 },
        'origam-field': { variant: 'outlined', rounded: 'none', border: true },
        'origam-text-field': { variant: 'outlined', rounded: 'none', border: true },
        'origam-textarea-field': { variant: 'outlined', rounded: 'none', border: true },
        'origam-number-field': { variant: 'outlined', rounded: 'none', border: true },
        'origam-password-field': { variant: 'outlined', rounded: 'none', border: true },
        'origam-select': { variant: 'outlined', rounded: 'none', border: true },
        'origam-date-picker-field': { rounded: 'none', border: true },
        'origam-file-field': { rounded: 'none', border: true },
        'origam-color-picker-field': { rounded: 'none', border: true },
        'origam-code': { rounded: 'none', border: true, elevation: 0 },
        'origam-menu': { rounded: 'none', border: true, elevation: 0 },
        'origam-table': { rounded: 'none', border: true },
        'origam-avatar': { rounded: 'none', border: true },
        'origam-checkbox': { rounded: 'none' },
        // Switch harmony (lot 4) — mirrors `origam-text-field`'s rounded/
        // border so the track reads as the same visual family as the
        // theme's fields (see cartoon.theme.ts for the full rationale).
        'origam-switch': { rounded: 'none', border: true },
        'origam-snackbar': { rounded: 'none', border: true, elevation: 0 }
    },
    cssVars: {
        "--origam-font-family---heading": "'Fraunces', 'Playfair Display', Georgia, serif",
        "--origam-title---font-family": "'Fraunces', 'Playfair Display', Georgia, serif",
        '--origam-font-weight---extrabold': '400',
        '--origam-letter-spacing---hero': '-0.04em',
        '--origam-line-height---hero': '0.9',
        '--origam-letter-spacing---tight': '-0.03em',
        '--origam-appbar---backdrop-filter': 'saturate(140%) blur(16px)',
        '--origam-menu---background': 'var(--origam-color__surface---default)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '0px',
        '--origam-menu__content---padding': '4px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-elevated': 'none',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-btn---border-radius': '0px',
        // Editorial keeps buttons unfilled at rest (btn-secondary-bg above
        // is 'transparent', by design — a print/minimalist surface). But
        // OrigamBtn's outlined active-state rule paints its fill FROM that
        // same base background token, so an active/selected button (e.g.
        // the Light|Dark toggle's current mode) inherited the SAME
        // transparent value and became indistinguishable from a resting
        // one — no selection affordance at all. This dedicated token lets
        // the active state use its own fill, independent of the resting
        // background; every other theme leaves it unset and keeps its
        // existing behaviour untouched (see OrigamBtn.vue's fallback chain).
        '--origam-btn---background-color-active': 'var(--origam-color__action--primary---bgSubtle)',
        '--origam-card---background': 'var(--origam-color__surface---raised)',
        '--origam-card---border-color': 'var(--origam-color__border---default)',
        '--origam-card---border-style': 'solid',
        '--origam-card---border-top-width': '1px',
        '--origam-card---border-right-width': '1px',
        '--origam-card---border-bottom-width': '1px',
        '--origam-card---border-left-width': '1px',
        '--origam-card---box-shadow': 'none',
        '--origam-chip---border-radius': '0px',
        '--origam-chip---background-color': 'var(--origam-color__surface---raised)',
        '--origam-chip---border-color': 'var(--origam-color__border---default)',
        '--origam-chip---border-width': '1px',
        '--origam-chip---border-style': 'solid',
        '--origam-code---border-radius': '0px',
        '--origam-code---border-color': 'var(--origam-color__border---default)',
        '--origam-code---border-width': '1px',
        '--origam-field---border-radius': '0px',
        '--origam-field---border-opacity': '1',
        '--origam-alert---border-radius': '0px',
        '--origam-appbar---bg': 'color-mix(in srgb, #fbf7ee 72%, transparent)',
        '--origam-menu---box-shadow': '0 4px 16px -4px rgba(0, 0, 0, 0.12), 0 0 0 1px var(--origam-color__border---default)',
        '--origam-btn---border-color': 'rgba(26, 23, 20, 0.40)',
        '--origam-code---background-color': 'var(--origam-color__surface---sunken, #f3ecdd)',
        '--origam-field---border-color': 'rgba(26, 23, 20, 0.40)'
    }
}

export const editorialDarkTheme: IOrigamTheme = {
    name: 'editorial',
    mode: 'dark',
    vars: {
        rounded: {
            card: '0px',
            btn: '0px',
            pill: '0px',
            sm: '0px',
            md: '0px',
            lg: '0px'
        },
        color: {
            surface: {
                default: '#0a0a0a',
                raised: '#0e0e0e',
                sunken: '#131313',
                overlay: '#131313',
                disabled: '#262626'
            },
            text: {
                primary: '#ffffff',
                secondary: '#d4d4d4',
                tertiary: '#d4d4d4',
                disabled: '#525252',
                inverse: '#0a0a0a',
                onColor: '#0a0a0a',
                ink: '#ffffff'
            },
            action: {
                primary: {
                    bg: '#a78bfa',
                    bgHover: '#8b5cf6',
                    bgSubtle: 'rgba(167, 139, 250, 0.14)',
                    bgDisabled: '#262626',
                    fg: '#0a0a0a',
                    fgSubtle: '#c4b5fd',
                    fgDisabled: '#525252'
                },
                secondary: {
                    bg: 'transparent',
                    bgHover: 'rgba(167, 139, 250, 0.08)',
                    bgDisabled: 'transparent',
                    fg: '#ffffff',
                    fgDisabled: '#525252'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(167, 139, 250, 0.08)',
                    bgDisabled: 'transparent',
                    fg: '#a78bfa',
                    fgDisabled: '#525252'
                }
            },
            border: {
                default: 'rgba(255, 255, 255, 0.10)',
                subtle: 'rgba(255, 255, 255, 0.05)',
                strong: 'rgba(255, 255, 255, 0.20)',
                focus: '#a78bfa',
                'subtle-alpha': 'rgba(255, 255, 255, 0.08)',
                ghost: 'rgba(255, 255, 255, 0.10)'
            },
            feedback: {
                success: {
                    bg: '#4ade80',
                    bgSubtle: 'rgba(74, 222, 128, 0.12)',
                    fg: '#0a0a0a',
                    fgSubtle: '#4ade80',
                    border: '#4ade80'
                },
                warning: {
                    bg: '#fbbf24',
                    bgSubtle: 'rgba(251, 191, 36, 0.12)',
                    fg: '#0a0a0a',
                    fgSubtle: '#fbbf24',
                    border: '#fbbf24'
                },
                danger: {
                    bg: '#f87171',
                    bgSubtle: 'rgba(248, 113, 113, 0.12)',
                    fg: '#0a0a0a',
                    fgSubtle: '#f87171',
                    border: '#f87171'
                },
                info: {
                    bg: '#60a5fa',
                    bgSubtle: 'rgba(96, 165, 250, 0.12)',
                    fg: '#0a0a0a',
                    fgSubtle: '#60a5fa',
                    border: '#60a5fa'
                }
            },
            'btn-primary-bg': '#a78bfa',
            'btn-primary-text': '#0a0a0a',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': 'rgba(255, 255, 255, 0.30)',
            'btn-secondary-text': '#ffffff'
        },
        // ELEVATION (dark) : editorial = plat, pas d'ombre. Toute l'échelle à none
        // — sur fond sombre une ombre serait de toute façon imperceptible.
        shadow: {
            none: 'none',
            xs: 'none',
            sm: 'none',
            md: 'none',
            lg: 'none',
            xl: 'none'
        }
    },
    cssVars: {
        "--origam-font-family---heading": "'Fraunces', 'Playfair Display', Georgia, serif",
        "--origam-title---font-family": "'Fraunces', 'Playfair Display', Georgia, serif",
        '--origam-font-weight---extrabold': '400',
        '--origam-letter-spacing---hero': '-0.04em',
        '--origam-line-height---hero': '0.9',
        '--origam-letter-spacing---tight': '-0.03em',
        '--origam-appbar---backdrop-filter': 'saturate(140%) blur(16px)',
        '--origam-menu---background': 'var(--origam-color__surface---default)',
        '--origam-menu---color': 'var(--origam-color__text---primary)',
        '--origam-menu---border-radius': '0px',
        '--origam-menu__content---padding': '4px',
        '--origam-list---background': 'transparent',
        '--origam-list---padding-block-start': '0',
        '--origam-list---padding-block-end': '0',
        '--origam-list-item---padding-inline-start': '12px',
        '--origam-list-item---padding-inline-end': '12px',
        '--origam-btn---border-width-outlined': '1px',
        '--origam-btn---border-width-ghost': '1px',
        '--origam-btn---box-shadow-elevated': 'none',
        '--origam-btn---box-shadow-ghost': 'none',
        '--origam-btn---border-radius': '0px',
        // See the matching comment in editorialLightTheme — same rationale,
        // dark-mode accent tint.
        '--origam-btn---background-color-active': 'var(--origam-color__action--primary---bgSubtle)',
        '--origam-card---background': 'var(--origam-color__surface---raised)',
        '--origam-card---border-color': 'var(--origam-color__border---default)',
        '--origam-card---border-style': 'solid',
        '--origam-card---border-top-width': '1px',
        '--origam-card---border-right-width': '1px',
        '--origam-card---border-bottom-width': '1px',
        '--origam-card---border-left-width': '1px',
        '--origam-card---box-shadow': 'none',
        '--origam-chip---border-radius': '0px',
        '--origam-chip---background-color': 'var(--origam-color__surface---raised)',
        '--origam-chip---border-color': 'var(--origam-color__border---default)',
        '--origam-chip---border-width': '1px',
        '--origam-chip---border-style': 'solid',
        '--origam-code---border-radius': '0px',
        '--origam-code---border-color': 'var(--origam-color__border---default)',
        '--origam-code---border-width': '1px',
        '--origam-field---border-radius': '0px',
        '--origam-field---border-opacity': '1',
        '--origam-alert---border-radius': '0px',
        '--origam-appbar---bg': 'color-mix(in srgb, #0a0a0a 72%, transparent)',
        '--origam-menu---box-shadow': '0 4px 24px -4px rgba(0, 0, 0, 0.50), 0 0 0 1px var(--origam-color__border---default)',
        '--origam-btn---border-color': 'rgba(255, 255, 255, 0.20)',
        '--origam-code---background-color': 'var(--origam-color__surface---sunken, #131313)',
        '--origam-field---border-color': 'rgba(255, 255, 255, 0.30)'
    }
}

export const editorialThemes: IOrigamTheme[] = [editorialLightTheme, editorialDarkTheme]
