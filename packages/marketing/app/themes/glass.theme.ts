import type { IOrigamTheme } from 'origam/interfaces'

// ⛔ GÉNÉRÉ depuis les exports HTML par thème×mode (Desktop, source unique).
// Light et Dark ont chacun leur PROPRE palette (pas de mode partagé).
// Ne pas éditer à la main : régénérer via /tmp/gen-themes.mjs.

export const glassLightTheme: IOrigamTheme = {
    name: 'glass',
    mode: 'light',
    label: 'Glass',
    description: 'Frosted glassmorphism · violet & teal',
    swatch: 'linear-gradient(135deg, #F5F3FF 0%, #7C3AED 100%)',
    vars: {
        color: {
            surface: {
                default: '#F5F3FF',
                raised: 'rgba(255,255,255,0.65)',
                overlay: 'rgba(255,255,255,0.85)',
                sunken: '#F5F3FF',
                disabled: 'rgba(255,255,255,0.85)'
            },
            text: {
                primary: '#1A1538',
                secondary: '#3F2E7E',
                disabled: '#A78BFA',
                inverse: '#FFFFFF',
                onColor: '#FFFFFF'
            },
            border: {
                default: 'rgba(124,58,237,0.20)',
                subtle: 'rgba(124,58,237,0.10)',
                strong: 'rgba(124,58,237,0.35)',
                focus: '#7C3AED'
            },
            action: {
                primary: {
                    bg: '#7C3AED',
                    bgHover: '#6D28D9',
                    bgSubtle: 'rgba(124,58,237,0.10)',
                    bgDisabled: 'rgba(255,255,255,0.85)',
                    fg: '#FFFFFF',
                    fgSubtle: '#6D28D9',
                    fgDisabled: '#A78BFA'
                },
                secondary: {
                    bg: 'rgba(255,255,255,0.85)',
                    bgHover: 'rgba(124,58,237,0.20)',
                    bgDisabled: 'rgba(255,255,255,0.65)',
                    fg: '#1A1538',
                    fgDisabled: '#A78BFA'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: 'rgba(124,58,237,0.10)',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#6D28D9',
                    fgDisabled: '#A78BFA'
                }
            },
            feedback: {
                success: {
                    bg: '#15803D',
                    bgSubtle: 'rgba(255,255,255,0.85)',
                    fg: '#FFFFFF',
                    fgSubtle: '#15803D',
                    border: '#15803D'
                },
                warning: {
                    bg: '#B45309',
                    bgSubtle: 'rgba(255,255,255,0.85)',
                    fg: '#FFFFFF',
                    fgSubtle: '#B45309',
                    border: '#B45309'
                },
                danger: {
                    bg: '#B91C1C',
                    bgSubtle: 'rgba(255,255,255,0.85)',
                    fg: '#FFFFFF',
                    fgSubtle: '#B91C1C',
                    border: '#B91C1C'
                },
                info: {
                    bg: '#2563EB',
                    bgSubtle: 'rgba(255,255,255,0.85)',
                    fg: '#FFFFFF',
                    fgSubtle: '#2563EB',
                    border: '#2563EB'
                }
            },
            overlay: {
                scrim: 'rgba(0,0,0,0.5)'
            }
        },
        rounded: {
            none: '0px',
            xs: '10px',
            sm: '10px',
            md: '16px',
            lg: '22px',
            xl: '22px',
            '2xl': '22px',
            full: '999px'
        },
        border: {
            width: {
                thin: '1px'
            }
        },
        typo: {
            family: {
                sans: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
                serif: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
                mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
            }
        },
        shadow: {
            none: '0 0 0 0 rgba(0,0,0,0)',
            xs: '0 1px 0 rgba(255,255,255,.2) inset, 0 8px 24px -8px rgba(124,58,237,.5)',
            sm: '0 1px 0 rgba(255,255,255,.08) inset, 0 16px 40px -20px rgba(167,139,250,.4)',
            md: '0 1px 0 rgba(255,255,255,.08) inset, 0 16px 40px -20px rgba(167,139,250,.4)',
            lg: '0 24px 64px -16px rgba(0,0,0,.5)',
            xl: '0 24px 64px -16px rgba(0,0,0,.5)'
        }
    },
    component: {
        'origam-btn': {
            variant: 'ghost',
            rounded: 'large'
        },
        'origam-card': {
            variant: 'ghost',
            rounded: 'large'
        },
        'origam-chip': {
            variant: 'ghost',
            rounded: 'large'
        }
    }
}

export const glassDarkTheme: IOrigamTheme = {
    name: 'glass',
    mode: 'dark',
    label: 'Glass',
    description: 'Frosted glassmorphism · violet & teal',
    swatch: 'linear-gradient(135deg, #0F0E1A 0%, #A78BFA 100%)',
    vars: {
        color: {
            surface: {
                default: '#0F0E1A',
                raised: 'rgba(255,255,255,0.06)',
                overlay: 'rgba(255,255,255,0.04)',
                sunken: '#0F0E1A',
                disabled: 'rgba(255,255,255,0.04)'
            },
            text: {
                primary: '#FFFFFF',
                secondary: '#E4DEFF',
                disabled: '#6B5FAF',
                inverse: '#0F0E1A',
                onColor: '#0F0E1A'
            },
            border: {
                default: 'rgba(255,255,255,0.12)',
                subtle: 'rgba(255,255,255,0.06)',
                strong: 'rgba(255,255,255,0.20)',
                focus: '#DDD6FE'
            },
            action: {
                primary: {
                    bg: '#A78BFA',
                    bgHover: '#DDD6FE',
                    bgSubtle: 'rgba(167,139,250,0.14)',
                    bgDisabled: 'rgba(255,255,255,0.04)',
                    fg: '#0F0E1A',
                    fgSubtle: '#DDD6FE',
                    fgDisabled: '#6B5FAF'
                },
                secondary: {
                    bg: 'rgba(255,255,255,0.04)',
                    bgHover: 'rgba(255,255,255,0.12)',
                    bgDisabled: 'rgba(255,255,255,0.06)',
                    fg: '#FFFFFF',
                    fgDisabled: '#6B5FAF'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: 'rgba(167,139,250,0.14)',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#DDD6FE',
                    fgDisabled: '#6B5FAF'
                }
            },
            feedback: {
                success: {
                    bg: '#6EE7B7',
                    bgSubtle: 'rgba(255,255,255,0.04)',
                    fg: '#0F0E1A',
                    fgSubtle: '#6EE7B7',
                    border: '#6EE7B7'
                },
                warning: {
                    bg: '#FCD34D',
                    bgSubtle: 'rgba(255,255,255,0.04)',
                    fg: '#0F0E1A',
                    fgSubtle: '#FCD34D',
                    border: '#FCD34D'
                },
                danger: {
                    bg: '#FCA5A5',
                    bgSubtle: 'rgba(255,255,255,0.04)',
                    fg: '#0F0E1A',
                    fgSubtle: '#FCA5A5',
                    border: '#FCA5A5'
                },
                info: {
                    bg: '#60A5FA',
                    bgSubtle: 'rgba(255,255,255,0.04)',
                    fg: '#0F0E1A',
                    fgSubtle: '#60A5FA',
                    border: '#60A5FA'
                }
            },
            overlay: {
                scrim: 'rgba(0,0,0,0.7)'
            }
        },
        rounded: {
            none: '0px',
            xs: '16px',
            sm: '16px',
            md: '22px',
            lg: '30px',
            xl: '30px',
            '2xl': '30px',
            full: '999px'
        },
        border: {
            width: {
                thin: '1px'
            }
        },
        typo: {
            family: {
                sans: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
                serif: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
                mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
            }
        },
        shadow: {
            none: '0 0 0 0 rgba(0,0,0,0)',
            xs: '0 1px 0 rgba(255,255,255,.2) inset, 0 8px 24px -8px rgba(124,58,237,.5)',
            sm: '0 1px 0 rgba(255,255,255,.08) inset, 0 16px 40px -20px rgba(167,139,250,.4)',
            md: '0 1px 0 rgba(255,255,255,.08) inset, 0 16px 40px -20px rgba(167,139,250,.4)',
            lg: '0 24px 64px -16px rgba(0,0,0,.5)',
            xl: '0 24px 64px -16px rgba(0,0,0,.5)'
        }
    },
    component: {
        'origam-btn': {
            variant: 'ghost',
            rounded: 'large'
        },
        'origam-card': {
            variant: 'ghost',
            rounded: 'large'
        },
        'origam-chip': {
            variant: 'ghost',
            rounded: 'large'
        }
    }
}
