import type { IOrigamTheme } from 'origam/interfaces'

// ⛔ GÉNÉRÉ depuis les exports HTML par thème×mode (Desktop, source unique).
// Light et Dark ont chacun leur PROPRE palette (pas de mode partagé).
// Ne pas éditer à la main : régénérer via /tmp/gen-themes.mjs.

export const cartoonLightTheme: IOrigamTheme = {
    name: 'cartoon',
    mode: 'light',
    label: 'Cartoon',
    description: 'Neo-brutalist · thick borders · hard shadows',
    swatch: 'linear-gradient(135deg, #FFF9F0 0%, #FF8FA3 100%)',
    vars: {
        color: {
            surface: {
                default: '#FFF9F0',
                raised: '#FFFFFF',
                overlay: '#FFF3D6',
                sunken: '#FFF9F0',
                disabled: '#FFF3D6'
            },
            text: {
                primary: '#2B2B2B',
                secondary: '#5A5048',
                disabled: '#737373',
                inverse: '#FFFFFF',
                onColor: '#3A2A2E'
            },
            border: {
                default: '#171717',
                subtle: '#171717',
                strong: '#000000',
                focus: '#7C3AED'
            },
            action: {
                primary: {
                    bg: '#FF8FA3',
                    bgHover: '#B5838D',
                    bgSubtle: '#FFE5EC',
                    bgDisabled: '#FFF3D6',
                    fg: '#3A2A2E',
                    fgSubtle: '#B5838D',
                    fgDisabled: '#737373'
                },
                secondary: {
                    bg: '#FFF3D6',
                    bgHover: '#171717',
                    bgDisabled: '#FFFFFF',
                    fg: '#2B2B2B',
                    fgDisabled: '#737373'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: '#FFE5EC',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#B5838D',
                    fgDisabled: '#737373'
                }
            },
            feedback: {
                success: {
                    bg: '#15803D',
                    bgSubtle: '#FFF3D6',
                    fg: '#FFFFFF',
                    fgSubtle: '#15803D',
                    border: '#15803D'
                },
                warning: {
                    bg: '#B45309',
                    bgSubtle: '#FFF3D6',
                    fg: '#FFFFFF',
                    fgSubtle: '#B45309',
                    border: '#B45309'
                },
                danger: {
                    bg: '#B91C1C',
                    bgSubtle: '#FFF3D6',
                    fg: '#FFFFFF',
                    fgSubtle: '#B91C1C',
                    border: '#B91C1C'
                },
                info: {
                    bg: '#2563EB',
                    bgSubtle: '#FFF3D6',
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
            xs: '8px',
            sm: '8px',
            md: '14px',
            lg: '20px',
            xl: '20px',
            '2xl': '20px',
            full: '999px'
        },
        border: {
            width: {
                thin: '3px'
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
            xs: '5px 5px 0 #171717',
            sm: '6px 6px 0 #171717',
            md: '6px 6px 0 #171717',
            lg: '9px 9px 0 #171717',
            xl: '9px 9px 0 #171717'
        }
    },
    component: {
        'origam-btn': {
            variant: 'flat',
            rounded: 'small'
        },
        'origam-card': {
            variant: 'outlined',
            rounded: 'small'
        },
        'origam-chip': {
            variant: 'outlined',
            rounded: 'small'
        }
    }
}

export const cartoonDarkTheme: IOrigamTheme = {
    name: 'cartoon',
    mode: 'dark',
    label: 'Cartoon',
    description: 'Neo-brutalist · thick borders · hard shadows',
    swatch: 'linear-gradient(135deg, #1A1A1A 0%, #FF8FA3 100%)',
    vars: {
        color: {
            surface: {
                default: '#1A1A1A',
                raised: '#262626',
                overlay: '#3D2E0A',
                sunken: '#1A1A1A',
                disabled: '#3D2E0A'
            },
            text: {
                primary: '#FFFEFB',
                secondary: '#D4D4D4',
                disabled: '#737373',
                inverse: '#1A1A1A',
                onColor: '#3A2A2E'
            },
            border: {
                default: '#FFFEFB',
                subtle: '#FFFEFB',
                strong: '#FFFFFF',
                focus: '#171717'
            },
            action: {
                primary: {
                    bg: '#FF8FA3',
                    bgHover: '#FFD6A5',
                    bgSubtle: '#FFE5EC',
                    bgDisabled: '#3D2E0A',
                    fg: '#3A2A2E',
                    fgSubtle: '#FFD6A5',
                    fgDisabled: '#737373'
                },
                secondary: {
                    bg: '#3D2E0A',
                    bgHover: '#FFFEFB',
                    bgDisabled: '#262626',
                    fg: '#FFFEFB',
                    fgDisabled: '#737373'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: '#FFE5EC',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#FFD6A5',
                    fgDisabled: '#737373'
                }
            },
            feedback: {
                success: {
                    bg: '#86EFAC',
                    bgSubtle: '#3D2E0A',
                    fg: '#1A1A1A',
                    fgSubtle: '#86EFAC',
                    border: '#86EFAC'
                },
                warning: {
                    bg: '#FCD34D',
                    bgSubtle: '#3D2E0A',
                    fg: '#1A1A1A',
                    fgSubtle: '#FCD34D',
                    border: '#FCD34D'
                },
                danger: {
                    bg: '#FCA5A5',
                    bgSubtle: '#3D2E0A',
                    fg: '#1A1A1A',
                    fgSubtle: '#FCA5A5',
                    border: '#FCA5A5'
                },
                info: {
                    bg: '#60A5FA',
                    bgSubtle: '#3D2E0A',
                    fg: '#1A1A1A',
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
            xs: '8px',
            sm: '8px',
            md: '14px',
            lg: '20px',
            xl: '20px',
            '2xl': '20px',
            full: '999px'
        },
        border: {
            width: {
                thin: '3px'
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
            xs: '5px 5px 0 #171717',
            sm: '6px 6px 0 #171717',
            md: '6px 6px 0 #171717',
            lg: '9px 9px 0 #171717',
            xl: '9px 9px 0 #171717'
        }
    },
    component: {
        'origam-btn': {
            variant: 'flat',
            rounded: 'small'
        },
        'origam-card': {
            variant: 'outlined',
            rounded: 'small'
        },
        'origam-chip': {
            variant: 'outlined',
            rounded: 'small'
        }
    }
}
