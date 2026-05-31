import type { IOrigamTheme } from 'origam/interfaces'

// ⛔ GÉNÉRÉ depuis les exports HTML par thème×mode (Desktop, source unique).
// Light et Dark ont chacun leur PROPRE palette (pas de mode partagé).
// Ne pas éditer à la main : régénérer via /tmp/gen-themes.mjs.

export const ecomLightTheme: IOrigamTheme = {
    name: 'ecom',
    mode: 'light',
    label: 'Ecom',
    description: 'Bright commerce · dense · rose accent',
    swatch: 'linear-gradient(135deg, #FFF7F0 0%, #E11D48 100%)',
    vars: {
        color: {
            surface: {
                default: '#FFF7F0',
                raised: '#FFFFFF',
                overlay: '#FFEDD5',
                sunken: '#FFF7F0',
                disabled: '#FFEDD5'
            },
            text: {
                primary: '#1A1A1A',
                secondary: '#404040',
                disabled: '#A3A3A3',
                inverse: '#FFFFFF',
                onColor: '#FFFFFF'
            },
            border: {
                default: '#FED7AA',
                subtle: '#FFEDD5',
                strong: '#FB923C',
                focus: '#E11D48'
            },
            action: {
                primary: {
                    bg: '#E11D48',
                    bgHover: '#BE123C',
                    bgSubtle: '#FFE4E6',
                    bgDisabled: '#FFEDD5',
                    fg: '#FFFFFF',
                    fgSubtle: '#BE123C',
                    fgDisabled: '#A3A3A3'
                },
                secondary: {
                    bg: '#FFEDD5',
                    bgHover: '#FED7AA',
                    bgDisabled: '#FFFFFF',
                    fg: '#1A1A1A',
                    fgDisabled: '#A3A3A3'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: '#FFE4E6',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#BE123C',
                    fgDisabled: '#A3A3A3'
                }
            },
            feedback: {
                success: {
                    bg: '#166534',
                    bgSubtle: '#FFEDD5',
                    fg: '#FFFFFF',
                    fgSubtle: '#166534',
                    border: '#166534'
                },
                warning: {
                    bg: '#92400E',
                    bgSubtle: '#FFEDD5',
                    fg: '#FFFFFF',
                    fgSubtle: '#92400E',
                    border: '#92400E'
                },
                danger: {
                    bg: '#9F1239',
                    bgSubtle: '#FFEDD5',
                    fg: '#FFFFFF',
                    fgSubtle: '#9F1239',
                    border: '#9F1239'
                },
                info: {
                    bg: '#2563EB',
                    bgSubtle: '#FFEDD5',
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
            xs: '4px',
            sm: '4px',
            md: '6px',
            lg: '10px',
            xl: '10px',
            '2xl': '10px',
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
            xs: '0 2px 0 rgba(225,29,72,.2), 0 4px 12px -2px rgba(225,29,72,.35)',
            sm: '0 1px 3px rgba(225,29,72,.08), 0 1px 2px rgba(0,0,0,.06)',
            md: '0 1px 3px rgba(225,29,72,.08), 0 1px 2px rgba(0,0,0,.06)',
            lg: '0 8px 24px -8px rgba(225,29,72,.25)',
            xl: '0 8px 24px -8px rgba(225,29,72,.25)'
        }
    },
    component: {
        'origam-btn': {
            variant: 'flat',
            rounded: 'small'
        },
        'origam-card': {
            variant: 'elevated',
            rounded: 'small'
        },
        'origam-chip': {
            variant: 'flat',
            rounded: 'small'
        }
    }
}

export const ecomDarkTheme: IOrigamTheme = {
    name: 'ecom',
    mode: 'dark',
    label: 'Ecom',
    description: 'Bright commerce · dense · rose accent',
    swatch: 'linear-gradient(135deg, #1A0F0A 0%, #F43F5E 100%)',
    vars: {
        color: {
            surface: {
                default: '#1A0F0A',
                raised: '#231510',
                overlay: '#2E1B14',
                sunken: '#1A0F0A',
                disabled: '#2E1B14'
            },
            text: {
                primary: '#FFF7F0',
                secondary: '#FED7AA',
                disabled: '#A3786A',
                inverse: '#1A0F0A',
                onColor: '#FFFFFF'
            },
            border: {
                default: 'rgba(251,146,60,0.20)',
                subtle: 'rgba(251,146,60,0.10)',
                strong: '#FB923C',
                focus: '#F87171'
            },
            action: {
                primary: {
                    bg: '#F43F5E',
                    bgHover: '#FB7185',
                    bgSubtle: 'rgba(244,63,94,0.14)',
                    bgDisabled: '#2E1B14',
                    fg: '#FFFFFF',
                    fgSubtle: '#FB7185',
                    fgDisabled: '#A3786A'
                },
                secondary: {
                    bg: '#2E1B14',
                    bgHover: 'rgba(251,146,60,0.20)',
                    bgDisabled: '#231510',
                    fg: '#FFF7F0',
                    fgDisabled: '#A3786A'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: 'rgba(244,63,94,0.14)',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#FB7185',
                    fgDisabled: '#A3786A'
                }
            },
            feedback: {
                success: {
                    bg: '#86EFAC',
                    bgSubtle: '#2E1B14',
                    fg: '#1A0F0A',
                    fgSubtle: '#86EFAC',
                    border: '#86EFAC'
                },
                warning: {
                    bg: '#FCD34D',
                    bgSubtle: '#2E1B14',
                    fg: '#1A0F0A',
                    fgSubtle: '#FCD34D',
                    border: '#FCD34D'
                },
                danger: {
                    bg: '#FCA5A5',
                    bgSubtle: '#2E1B14',
                    fg: '#1A0F0A',
                    fgSubtle: '#FCA5A5',
                    border: '#FCA5A5'
                },
                info: {
                    bg: '#60A5FA',
                    bgSubtle: '#2E1B14',
                    fg: '#1A0F0A',
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
            xs: '4px',
            sm: '4px',
            md: '6px',
            lg: '10px',
            xl: '10px',
            '2xl': '10px',
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
            xs: '0 2px 0 rgba(225,29,72,.2), 0 4px 12px -2px rgba(225,29,72,.35)',
            sm: '0 1px 3px rgba(225,29,72,.08), 0 1px 2px rgba(0,0,0,.06)',
            md: '0 1px 3px rgba(225,29,72,.08), 0 1px 2px rgba(0,0,0,.06)',
            lg: '0 8px 24px -8px rgba(225,29,72,.25)',
            xl: '0 8px 24px -8px rgba(225,29,72,.25)'
        }
    },
    component: {
        'origam-btn': {
            variant: 'flat',
            rounded: 'small'
        },
        'origam-card': {
            variant: 'elevated',
            rounded: 'small'
        },
        'origam-chip': {
            variant: 'flat',
            rounded: 'small'
        }
    }
}
