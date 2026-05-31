import type { IOrigamTheme } from 'origam/interfaces'

// ⛔ GÉNÉRÉ depuis les exports HTML par thème×mode (Desktop, source unique).
// Light et Dark ont chacun leur PROPRE palette (pas de mode partagé).
// Ne pas éditer à la main : régénérer via /tmp/gen-themes.mjs.

export const materialLightTheme: IOrigamTheme = {
    name: 'material',
    mode: 'light',
    label: 'Material',
    description: 'Material You · rounded · elevation',
    swatch: 'linear-gradient(135deg, #FEF7FF 0%, #6750A4 100%)',
    vars: {
        color: {
            surface: {
                default: '#FEF7FF',
                raised: '#FFFFFF',
                overlay: '#F7F2FA',
                sunken: '#FEF7FF',
                disabled: '#F7F2FA'
            },
            text: {
                primary: '#1C1B1F',
                secondary: '#49454F',
                disabled: '#79747E',
                inverse: '#FFFFFF',
                onColor: '#FFFFFF'
            },
            border: {
                default: 'rgba(28,27,31,0.12)',
                subtle: 'rgba(28,27,31,0.06)',
                strong: 'rgba(28,27,31,0.30)',
                focus: '#6750A4'
            },
            action: {
                primary: {
                    bg: '#6750A4',
                    bgHover: '#21005D',
                    bgSubtle: '#EADDFF',
                    bgDisabled: '#F7F2FA',
                    fg: '#FFFFFF',
                    fgSubtle: '#21005D',
                    fgDisabled: '#79747E'
                },
                secondary: {
                    bg: '#F7F2FA',
                    bgHover: 'rgba(28,27,31,0.12)',
                    bgDisabled: '#FFFFFF',
                    fg: '#1C1B1F',
                    fgDisabled: '#79747E'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: '#EADDFF',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#21005D',
                    fgDisabled: '#79747E'
                }
            },
            feedback: {
                success: {
                    bg: '#1B5E20',
                    bgSubtle: '#F7F2FA',
                    fg: '#FFFFFF',
                    fgSubtle: '#1B5E20',
                    border: '#1B5E20'
                },
                warning: {
                    bg: '#E65100',
                    bgSubtle: '#F7F2FA',
                    fg: '#FFFFFF',
                    fgSubtle: '#E65100',
                    border: '#E65100'
                },
                danger: {
                    bg: '#601410',
                    bgSubtle: '#F7F2FA',
                    fg: '#FFFFFF',
                    fgSubtle: '#601410',
                    border: '#601410'
                },
                info: {
                    bg: '#2563EB',
                    bgSubtle: '#F7F2FA',
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
            xs: '12px',
            sm: '12px',
            md: '16px',
            lg: '28px',
            xl: '28px',
            '2xl': '28px',
            full: '999px'
        },
        border: {
            width: {
                thin: '1px'
            }
        },
        typo: {
            family: {
                sans: '\'Roboto\', \'Inter\', -apple-system, sans-serif',
                serif: '\'Roboto\', \'Inter\', -apple-system, sans-serif',
                mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
            }
        },
        shadow: {
            none: '0 0 0 0 rgba(0,0,0,0)',
            xs: '0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(208,188,255,.15)',
            sm: '0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15)',
            md: '0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15)',
            lg: '0 6px 10px 4px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.3)',
            xl: '0 6px 10px 4px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.3)'
        }
    },
    component: {
        'origam-btn': {
            variant: 'elevated',
            rounded: 'large'
        },
        'origam-card': {
            variant: 'elevated',
            rounded: 'large'
        },
        'origam-chip': {
            variant: 'tonal',
            rounded: 'large'
        }
    }
}

export const materialDarkTheme: IOrigamTheme = {
    name: 'material',
    mode: 'dark',
    label: 'Material',
    description: 'Material You · rounded · elevation',
    swatch: 'linear-gradient(135deg, #1C1B1F 0%, #D0BCFF 100%)',
    vars: {
        color: {
            surface: {
                default: '#1C1B1F',
                raised: '#2B2930',
                overlay: '#36343B',
                sunken: '#1C1B1F',
                disabled: '#36343B'
            },
            text: {
                primary: '#E6E1E5',
                secondary: '#CAC4D0',
                disabled: '#79747E',
                inverse: '#1C1B1F',
                onColor: '#381E72'
            },
            border: {
                default: 'rgba(202,196,208,0.12)',
                subtle: 'rgba(202,196,208,0.06)',
                strong: 'rgba(202,196,208,0.30)',
                focus: '#D0BCFF'
            },
            action: {
                primary: {
                    bg: '#D0BCFF',
                    bgHover: '#EADDFF',
                    bgSubtle: '#4A4458',
                    bgDisabled: '#36343B',
                    fg: '#381E72',
                    fgSubtle: '#EADDFF',
                    fgDisabled: '#79747E'
                },
                secondary: {
                    bg: '#36343B',
                    bgHover: 'rgba(202,196,208,0.12)',
                    bgDisabled: '#2B2930',
                    fg: '#E6E1E5',
                    fgDisabled: '#79747E'
                },
                ghost: {
                    bg: 'rgba(0,0,0,0)',
                    bgHover: '#4A4458',
                    bgDisabled: 'rgba(0,0,0,0)',
                    fg: '#EADDFF',
                    fgDisabled: '#79747E'
                }
            },
            feedback: {
                success: {
                    bg: '#C5E1A5',
                    bgSubtle: '#36343B',
                    fg: '#1C1B1F',
                    fgSubtle: '#C5E1A5',
                    border: '#C5E1A5'
                },
                warning: {
                    bg: '#FFE082',
                    bgSubtle: '#36343B',
                    fg: '#1C1B1F',
                    fgSubtle: '#FFE082',
                    border: '#FFE082'
                },
                danger: {
                    bg: '#F9DEDC',
                    bgSubtle: '#36343B',
                    fg: '#1C1B1F',
                    fgSubtle: '#F9DEDC',
                    border: '#F9DEDC'
                },
                info: {
                    bg: '#60A5FA',
                    bgSubtle: '#36343B',
                    fg: '#1C1B1F',
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
            xs: '12px',
            sm: '12px',
            md: '16px',
            lg: '28px',
            xl: '28px',
            '2xl': '28px',
            full: '999px'
        },
        border: {
            width: {
                thin: '1px'
            }
        },
        typo: {
            family: {
                sans: '\'Roboto\', \'Inter\', -apple-system, sans-serif',
                serif: '\'Roboto\', \'Inter\', -apple-system, sans-serif',
                mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
            }
        },
        shadow: {
            none: '0 0 0 0 rgba(0,0,0,0)',
            xs: '0 1px 2px rgba(0,0,0,.3), 0 2px 6px 2px rgba(208,188,255,.15)',
            sm: '0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15)',
            md: '0 1px 2px rgba(0,0,0,.3), 0 1px 3px 1px rgba(0,0,0,.15)',
            lg: '0 6px 10px 4px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.3)',
            xl: '0 6px 10px 4px rgba(0,0,0,.15), 0 2px 3px rgba(0,0,0,.3)'
        }
    },
    component: {
        'origam-btn': {
            variant: 'elevated',
            rounded: 'large'
        },
        'origam-card': {
            variant: 'elevated',
            rounded: 'large'
        },
        'origam-chip': {
            variant: 'tonal',
            rounded: 'large'
        }
    }
}
