import type { IOrigamTheme } from 'origam/interfaces'

// ⛔ GÉNÉRÉ depuis les exports HTML par thème×mode (Desktop, source unique).
// Light et Dark ont chacun leur PROPRE palette (pas de mode partagé).
// Ne pas éditer à la main : régénérer via /tmp/gen-themes.mjs.

export const editorialLightTheme: IOrigamTheme = {
    name: 'editorial',
    mode: 'light',
    label: 'Editorial',
    description: 'Magazine · serif display · square corners',
    swatch: 'linear-gradient(135deg, #FBF7EE 0%, #5B21B6 100%)',
    vars: {
        color: {
            surface: {
                default: '#FBF7EE',
                raised: '#FFFDF7',
                overlay: '#F3ECDD',
                sunken: '#FBF7EE',
                disabled: '#F3ECDD'
            },
            text: {
                primary: '#1A1714',
                secondary: '#4A4036',
                disabled: '#A3A3A3',
                inverse: '#FFFFFF',
                onColor: '#FFFFFF'
            },
            border: {
                default: 'rgba(26,23,20,.16)',
                subtle: 'rgba(26,23,20,.08)',
                strong: 'rgba(26,23,20,.4)',
                focus: '#7C3AED'
            },
            action: {
                primary: {
                    bg: '#5B21B6',
                    bgHover: '#4C1D95',
                    bgSubtle: 'rgba(91,33,182,0.10)',
                    bgDisabled: '#F3ECDD',
                    fg: '#FFFFFF',
                    fgSubtle: '#4C1D95',
                    fgDisabled: '#A3A3A3'
                },
                secondary: {
                    bg: '#F3ECDD',
                    bgHover: 'rgba(26,23,20,.16)',
                    bgDisabled: '#FFFDF7',
                    fg: '#1A1714',
                    fgDisabled: '#A3A3A3'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: 'rgba(91,33,182,0.10)',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#4C1D95',
                    fgDisabled: '#A3A3A3'
                }
            },
            feedback: {
                success: {
                    bg: '#166534',
                    bgSubtle: '#F3ECDD',
                    fg: '#FFFFFF',
                    fgSubtle: '#166534',
                    border: '#166534'
                },
                warning: {
                    bg: '#92400E',
                    bgSubtle: '#F3ECDD',
                    fg: '#FFFFFF',
                    fgSubtle: '#92400E',
                    border: '#92400E'
                },
                danger: {
                    bg: '#991B1B',
                    bgSubtle: '#F3ECDD',
                    fg: '#FFFFFF',
                    fgSubtle: '#991B1B',
                    border: '#991B1B'
                },
                info: {
                    bg: '#2563EB',
                    bgSubtle: '#F3ECDD',
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
            xs: '0px',
            sm: '0px',
            md: '0px',
            lg: '0px',
            xl: '0px',
            '2xl': '0px',
            full: '0px'
        },
        border: {
            width: {
                thin: '1px'
            }
        },
        typo: {
            family: {
                sans: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
                serif: '\'Fraunces\', \'Playfair Display\', Georgia, serif',
                mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
            }
        },
        shadow: {
            none: '0 0 0 0 rgba(0,0,0,0)',
            xs: 'none',
            sm: 'none',
            md: 'none',
            lg: '0 24px 64px -16px rgba(0,0,0,.5)',
            xl: '0 24px 64px -16px rgba(0,0,0,.5)'
        }
    },
    component: {
        'origam-btn': {
            variant: 'outlined',
            rounded: 'default'
        },
        'origam-card': {
            variant: 'flat',
            rounded: 'default'
        },
        'origam-chip': {
            variant: 'outlined',
            rounded: 'default'
        }
    }
}

export const editorialDarkTheme: IOrigamTheme = {
    name: 'editorial',
    mode: 'dark',
    label: 'Editorial',
    description: 'Magazine · serif display · square corners',
    swatch: 'linear-gradient(135deg, #0A0A0A 0%, #A78BFA 100%)',
    vars: {
        color: {
            surface: {
                default: '#0A0A0A',
                raised: '#0E0E0E',
                overlay: '#131313',
                sunken: '#0A0A0A',
                disabled: '#131313'
            },
            text: {
                primary: '#FFFFFF',
                secondary: '#D4D4D4',
                disabled: '#525252',
                inverse: '#0A0A0A',
                onColor: '#0A0A0A'
            },
            border: {
                default: 'rgba(255,255,255,0.10)',
                subtle: 'rgba(255,255,255,0.05)',
                strong: 'rgba(255,255,255,0.20)',
                focus: '#A78BFA'
            },
            action: {
                primary: {
                    bg: '#A78BFA',
                    bgHover: '#C4B5FD',
                    bgSubtle: 'rgba(167,139,250,0.14)',
                    bgDisabled: '#131313',
                    fg: '#0A0A0A',
                    fgSubtle: '#C4B5FD',
                    fgDisabled: '#525252'
                },
                secondary: {
                    bg: '#131313',
                    bgHover: 'rgba(255,255,255,0.10)',
                    bgDisabled: '#0E0E0E',
                    fg: '#FFFFFF',
                    fgDisabled: '#525252'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: 'rgba(167,139,250,0.14)',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#C4B5FD',
                    fgDisabled: '#525252'
                }
            },
            feedback: {
                success: {
                    bg: '#6EE7B7',
                    bgSubtle: '#131313',
                    fg: '#0A0A0A',
                    fgSubtle: '#6EE7B7',
                    border: '#6EE7B7'
                },
                warning: {
                    bg: '#FCD34D',
                    bgSubtle: '#131313',
                    fg: '#0A0A0A',
                    fgSubtle: '#FCD34D',
                    border: '#FCD34D'
                },
                danger: {
                    bg: '#FCA5A5',
                    bgSubtle: '#131313',
                    fg: '#0A0A0A',
                    fgSubtle: '#FCA5A5',
                    border: '#FCA5A5'
                },
                info: {
                    bg: '#60A5FA',
                    bgSubtle: '#131313',
                    fg: '#0A0A0A',
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
            xs: '0px',
            sm: '0px',
            md: '0px',
            lg: '0px',
            xl: '0px',
            '2xl': '0px',
            full: '0px'
        },
        border: {
            width: {
                thin: '1px'
            }
        },
        typo: {
            family: {
                sans: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
                serif: '\'Fraunces\', \'Playfair Display\', Georgia, serif',
                mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
            }
        },
        shadow: {
            none: '0 0 0 0 rgba(0,0,0,0)',
            xs: 'none',
            sm: 'none',
            md: 'none',
            lg: '0 24px 64px -16px rgba(0,0,0,.5)',
            xl: '0 24px 64px -16px rgba(0,0,0,.5)'
        }
    },
    component: {
        'origam-btn': {
            variant: 'outlined',
            rounded: 'default'
        },
        'origam-card': {
            variant: 'flat',
            rounded: 'default'
        },
        'origam-chip': {
            variant: 'outlined',
            rounded: 'default'
        }
    }
}
