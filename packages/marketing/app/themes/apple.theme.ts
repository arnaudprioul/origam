import type { IOrigamTheme } from 'origam/interfaces'

// ⛔ GÉNÉRÉ depuis les exports HTML par thème×mode (Desktop, source unique).
// Light et Dark ont chacun leur PROPRE palette (pas de mode partagé).
// Ne pas éditer à la main : régénérer via /tmp/gen-themes.mjs.

export const appleLightTheme: IOrigamTheme = {
    name: 'apple',
    mode: 'light',
    label: 'Apple',
    description: 'Premium minimal · blue accent',
    swatch: 'linear-gradient(135deg, #FFFFFF 0%, #0071E3 100%)',
    vars: {
        color: {
            surface: {
                default: '#FFFFFF',
                raised: '#FBFBFD',
                overlay: '#F5F5F7',
                sunken: '#FFFFFF',
                disabled: '#F5F5F7'
            },
            text: {
                primary: '#1D1D1F',
                secondary: '#515154',
                disabled: '#86868B',
                inverse: '#FFFFFF',
                onColor: '#FFFFFF'
            },
            border: {
                default: '#D2D2D7',
                subtle: '#E5E5E7',
                strong: '#86868B',
                focus: '#0071E3'
            },
            action: {
                primary: {
                    bg: '#0071E3',
                    bgHover: '#0058B0',
                    bgSubtle: '#F0F7FF',
                    bgDisabled: '#F5F5F7',
                    fg: '#FFFFFF',
                    fgSubtle: '#0058B0',
                    fgDisabled: '#86868B'
                },
                secondary: {
                    bg: '#F5F5F7',
                    bgHover: '#D2D2D7',
                    bgDisabled: '#FBFBFD',
                    fg: '#1D1D1F',
                    fgDisabled: '#86868B'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: '#F0F7FF',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#0058B0',
                    fgDisabled: '#86868B'
                }
            },
            feedback: {
                success: {
                    bg: '#198529',
                    bgSubtle: '#F5F5F7',
                    fg: '#FFFFFF',
                    fgSubtle: '#198529',
                    border: '#198529'
                },
                warning: {
                    bg: '#A86600',
                    bgSubtle: '#F5F5F7',
                    fg: '#FFFFFF',
                    fgSubtle: '#A86600',
                    border: '#A86600'
                },
                danger: {
                    bg: '#C2271C',
                    bgSubtle: '#F5F5F7',
                    fg: '#FFFFFF',
                    fgSubtle: '#C2271C',
                    border: '#C2271C'
                },
                info: {
                    bg: '#2563EB',
                    bgSubtle: '#F5F5F7',
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
            md: '12px',
            lg: '18px',
            xl: '18px',
            '2xl': '18px',
            full: '980px'
        },
        border: {
            width: {
                thin: '1px'
            }
        },
        typo: {
            family: {
                sans: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
                serif: '-apple-system, BlinkMacSystemFont, \'SF Pro Display\', \'Inter\', sans-serif',
                mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
            }
        },
        shadow: {
            none: '0 0 0 0 rgba(0,0,0,0)',
            xs: '0 2px 8px rgba(0,113,227,.25)',
            sm: '0 4px 16px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06)',
            md: '0 4px 16px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06)',
            lg: '0 20px 40px -8px rgba(0,0,0,.08)',
            xl: '0 20px 40px -8px rgba(0,0,0,.08)'
        }
    },
    component: {
        'origam-btn': {
            variant: 'flat',
            rounded: 'large'
        },
        'origam-card': {
            variant: 'flat',
            rounded: 'large'
        },
        'origam-chip': {
            variant: 'tonal',
            rounded: 'large'
        }
    }
}

export const appleDarkTheme: IOrigamTheme = {
    name: 'apple',
    mode: 'dark',
    label: 'Apple',
    description: 'Premium minimal · blue accent',
    swatch: 'linear-gradient(135deg, #000000 0%, #0A84FF 100%)',
    vars: {
        color: {
            surface: {
                default: '#000000',
                raised: '#1C1C1E',
                overlay: '#2C2C2E',
                sunken: '#000000',
                disabled: '#2C2C2E'
            },
            text: {
                primary: '#F5F5F7',
                secondary: '#A1A1A6',
                disabled: '#6E6E73',
                inverse: '#000000',
                onColor: '#FFFFFF'
            },
            border: {
                default: '#38383A',
                subtle: '#2C2C2E',
                strong: '#6E6E73',
                focus: '#0A84FF'
            },
            action: {
                primary: {
                    bg: '#0A84FF',
                    bgHover: '#64B5FF',
                    bgSubtle: 'rgba(10,132,255,0.16)',
                    bgDisabled: '#2C2C2E',
                    fg: '#FFFFFF',
                    fgSubtle: '#64B5FF',
                    fgDisabled: '#6E6E73'
                },
                secondary: {
                    bg: '#2C2C2E',
                    bgHover: '#38383A',
                    bgDisabled: '#1C1C1E',
                    fg: '#F5F5F7',
                    fgDisabled: '#6E6E73'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: 'rgba(10,132,255,0.16)',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#64B5FF',
                    fgDisabled: '#6E6E73'
                }
            },
            feedback: {
                success: {
                    bg: '#64E47C',
                    bgSubtle: '#2C2C2E',
                    fg: '#000000',
                    fgSubtle: '#64E47C',
                    border: '#64E47C'
                },
                warning: {
                    bg: '#FFB445',
                    bgSubtle: '#2C2C2E',
                    fg: '#000000',
                    fgSubtle: '#FFB445',
                    border: '#FFB445'
                },
                danger: {
                    bg: '#FF6961',
                    bgSubtle: '#2C2C2E',
                    fg: '#000000',
                    fgSubtle: '#FF6961',
                    border: '#FF6961'
                },
                info: {
                    bg: '#60A5FA',
                    bgSubtle: '#2C2C2E',
                    fg: '#000000',
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
            md: '12px',
            lg: '18px',
            xl: '18px',
            '2xl': '18px',
            full: '980px'
        },
        border: {
            width: {
                thin: '1px'
            }
        },
        typo: {
            family: {
                sans: '\'Inter\', -apple-system, BlinkMacSystemFont, sans-serif',
                serif: '-apple-system, BlinkMacSystemFont, \'SF Pro Display\', \'Inter\', sans-serif',
                mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
            }
        },
        shadow: {
            none: '0 0 0 0 rgba(0,0,0,0)',
            xs: '0 2px 8px rgba(0,113,227,.25)',
            sm: '0 4px 16px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06)',
            md: '0 4px 16px rgba(0,0,0,.04), 0 1px 2px rgba(0,0,0,.06)',
            lg: '0 20px 40px -8px rgba(0,0,0,.08)',
            xl: '0 20px 40px -8px rgba(0,0,0,.08)'
        }
    },
    component: {
        'origam-btn': {
            variant: 'flat',
            rounded: 'large'
        },
        'origam-card': {
            variant: 'flat',
            rounded: 'large'
        },
        'origam-chip': {
            variant: 'tonal',
            rounded: 'large'
        }
    }
}
