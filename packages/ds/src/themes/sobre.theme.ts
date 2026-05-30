import type { IOrigamTheme } from '../interfaces'

// ⛔ GÉNÉRÉ depuis les exports HTML par thème×mode (Desktop, source unique).
// Light et Dark ont chacun leur PROPRE palette (pas de mode partagé).
// Ne pas éditer à la main : régénérer via /tmp/gen-themes.mjs.

export const sobreLightTheme: IOrigamTheme = {
    name: 'sobre',
    mode: 'light',
    label: 'Sobre',
    description: 'The neutral origam base — calm surfaces, a single violet accent.',
    swatch: 'linear-gradient(135deg, #FFFFFF 0%, #7C3AED 100%)',
    component: {
        global: {
            density: 'comfortable'
        }
    },
    colors: {
        surface: {
            default: '#FFFFFF',
            raised: '#FAFAFA',
            overlay: '#F5F5F5',
            sunken: '#FFFFFF',
            disabled: '#F5F5F5'
        },
        text: {
            primary: '#0A0A0A',
            secondary: '#525252',
            disabled: '#A3A3A3',
            inverse: '#FFFFFF',
            onColor: '#FFFFFF'
        },
        border: {
            default: 'rgba(0,0,0,0.08)',
            subtle: 'rgba(0,0,0,0.04)',
            strong: 'rgba(0,0,0,0.16)',
            focus: '#7C3AED'
        },
        action: {
            primary: {
                bg: '#7C3AED',
                bgHover: '#6D28D9',
                bgSubtle: 'rgba(124,58,237,0.10)',
                bgDisabled: '#F5F5F5',
                fg: '#FFFFFF',
                fgSubtle: '#6D28D9',
                fgDisabled: '#A3A3A3'
            },
            secondary: {
                bg: '#F5F5F5',
                bgHover: 'rgba(0,0,0,0.08)',
                bgDisabled: '#FAFAFA',
                fg: '#0A0A0A',
                fgDisabled: '#A3A3A3'
            },
            ghost: {
                bg: 'rgba(0,0,0,0)',
                bgHover: 'rgba(124,58,237,0.10)',
                bgDisabled: 'rgba(0,0,0,0)',
                fg: '#6D28D9',
                fgDisabled: '#A3A3A3'
            }
        },
        feedback: {
            success: {
                bg: '#15803D',
                bgSubtle: '#F5F5F5',
                fg: '#FFFFFF',
                fgSubtle: '#15803D',
                border: '#15803D'
            },
            warning: {
                bg: '#B45309',
                bgSubtle: '#F5F5F5',
                fg: '#FFFFFF',
                fgSubtle: '#B45309',
                border: '#B45309'
            },
            danger: {
                bg: '#B91C1C',
                bgSubtle: '#F5F5F5',
                fg: '#FFFFFF',
                fgSubtle: '#B91C1C',
                border: '#B91C1C'
            },
            info: {
                bg: '#2563EB',
                bgSubtle: '#F5F5F5',
                fg: '#FFFFFF',
                fgSubtle: '#2563EB',
                border: '#2563EB'
            }
        },
        overlay: {
            scrim: 'rgba(0,0,0,0.5)'
        }
    },
    radius: {
        none: '0px',
        xs: '6px',
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '14px',
        '2xl': '14px',
        full: '999px'
    },
    typography: {
        family: {
            sans: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
            serif: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
            mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
        }
    },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 1px 0 rgba(255,255,255,.2) inset, 0 8px 24px -8px rgba(124,58,237,.5)',
        sm: '0 1px 0 rgba(255,255,255,.03) inset, 0 8px 24px -16px rgba(0,0,0,.6)',
        md: '0 1px 0 rgba(255,255,255,.03) inset, 0 8px 24px -16px rgba(0,0,0,.6)',
        lg: '0 24px 64px -16px rgba(0,0,0,.5)',
        xl: '0 24px 64px -16px rgba(0,0,0,.5)'
    }
}

export const sobreDarkTheme: IOrigamTheme = {
    name: 'sobre',
    mode: 'dark',
    label: 'Sobre',
    description: 'The neutral origam base — calm surfaces, a single violet accent.',
    swatch: 'linear-gradient(135deg, #0A0A0A 0%, #8B5CF6 100%)',
    component: {
        global: {
            density: 'comfortable'
        }
    },
    colors: {
        surface: {
            default: '#0A0A0A',
            raised: '#0E0E0E',
            overlay: '#171717',
            sunken: '#0A0A0A',
            disabled: '#171717'
        },
        text: {
            primary: '#FAFAFA',
            secondary: '#A3A3A3',
            disabled: '#525252',
            inverse: '#0A0A0A',
            onColor: '#FFFFFF'
        },
        border: {
            default: 'rgba(255,255,255,0.08)',
            subtle: 'rgba(255,255,255,0.04)',
            strong: 'rgba(255,255,255,0.16)',
            focus: '#A78BFA'
        },
        action: {
            primary: {
                bg: '#8B5CF6',
                bgHover: '#C4B5FD',
                bgSubtle: 'rgba(124,58,237,0.14)',
                bgDisabled: '#171717',
                fg: '#FFFFFF',
                fgSubtle: '#C4B5FD',
                fgDisabled: '#525252'
            },
            secondary: {
                bg: '#171717',
                bgHover: 'rgba(255,255,255,0.08)',
                bgDisabled: '#0E0E0E',
                fg: '#FAFAFA',
                fgDisabled: '#525252'
            },
            ghost: {
                bg: 'rgba(0,0,0,0)',
                bgHover: 'rgba(124,58,237,0.14)',
                bgDisabled: 'rgba(0,0,0,0)',
                fg: '#C4B5FD',
                fgDisabled: '#525252'
            }
        },
        feedback: {
            success: {
                bg: '#6EE7B7',
                bgSubtle: '#171717',
                fg: '#0A0A0A',
                fgSubtle: '#6EE7B7',
                border: '#6EE7B7'
            },
            warning: {
                bg: '#FBBF24',
                bgSubtle: '#171717',
                fg: '#0A0A0A',
                fgSubtle: '#FBBF24',
                border: '#FBBF24'
            },
            danger: {
                bg: '#F87171',
                bgSubtle: '#171717',
                fg: '#0A0A0A',
                fgSubtle: '#F87171',
                border: '#F87171'
            },
            info: {
                bg: '#60A5FA',
                bgSubtle: '#171717',
                fg: '#0A0A0A',
                fgSubtle: '#60A5FA',
                border: '#60A5FA'
            }
        },
        overlay: {
            scrim: 'rgba(0,0,0,0.7)'
        }
    },
    radius: {
        none: '0px',
        xs: '6px',
        sm: '6px',
        md: '10px',
        lg: '14px',
        xl: '14px',
        '2xl': '14px',
        full: '999px'
    },
    typography: {
        family: {
            sans: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
            serif: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
            mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
        }
    },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 1px 0 rgba(255,255,255,.2) inset, 0 8px 24px -8px rgba(124,58,237,.5)',
        sm: '0 1px 0 rgba(255,255,255,.03) inset, 0 8px 24px -16px rgba(0,0,0,.6)',
        md: '0 1px 0 rgba(255,255,255,.03) inset, 0 8px 24px -16px rgba(0,0,0,.6)',
        lg: '0 24px 64px -16px rgba(0,0,0,.5)',
        xl: '0 24px 64px -16px rgba(0,0,0,.5)'
    }
}

/**
 * Both `sobre` modes — the DS's single built-in theme, installed by
 * `createOrigam` when the consumer supplies none.
 */
export const sobreTheme: IOrigamTheme[] = [sobreLightTheme, sobreDarkTheme]
