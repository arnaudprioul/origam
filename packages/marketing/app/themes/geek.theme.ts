import type { IOrigamTheme } from 'origam/interfaces'

// ⛔ GÉNÉRÉ depuis les exports HTML par thème×mode (Desktop, source unique).
// Light et Dark ont chacun leur PROPRE palette (pas de mode partagé).
// Ne pas éditer à la main : régénérer via /tmp/gen-themes.mjs.

export const geekLightTheme: IOrigamTheme = {
    name: 'geek',
    mode: 'light',
    label: 'Geek',
    description: 'Cyberpunk terminal · mono · neon',
    swatch: 'linear-gradient(135deg, #F6F0FF 0%, #A21CAF 100%)',
    component: {
        'origam-btn': {
            variant: 'flat',
            rounded: 'x-small'
        },
        'origam-card': {
            variant: 'outlined',
            rounded: 'x-small'
        },
        'origam-chip': {
            variant: 'outlined',
            rounded: 'x-small'
        }
    },
    colors: {
        surface: {
            default: '#F6F0FF',
            raised: '#FFFFFF',
            overlay: '#FBF5FF',
            sunken: '#F6F0FF',
            disabled: '#FBF5FF'
        },
        text: {
            primary: '#1A0F2E',
            secondary: '#5B3E8C',
            disabled: '#B5A0D8',
            inverse: '#FFFFFF',
            onColor: '#FFFFFF'
        },
        border: {
            default: 'rgba(168,85,247,.28)',
            subtle: 'rgba(168,85,247,.14)',
            strong: 'rgba(217,70,239,.55)',
            focus: 'rgba(217,70,239,.45)'
        },
        action: {
            primary: {
                bg: '#A21CAF',
                bgHover: '#0891B2',
                bgSubtle: 'rgba(162,28,175,.10)',
                bgDisabled: '#FBF5FF',
                fg: '#FFFFFF',
                fgSubtle: '#0891B2',
                fgDisabled: '#B5A0D8'
            },
            secondary: {
                bg: '#FBF5FF',
                bgHover: 'rgba(168,85,247,.28)',
                bgDisabled: '#FFFFFF',
                fg: '#1A0F2E',
                fgDisabled: '#B5A0D8'
            },
            ghost: {
                bg: 'rgba(0,0,0,0)',
                bgHover: 'rgba(162,28,175,.10)',
                bgDisabled: 'rgba(0,0,0,0)',
                fg: '#0891B2',
                fgDisabled: '#B5A0D8'
            }
        },
        feedback: {
            success: {
                bg: '#15803D',
                bgSubtle: '#FBF5FF',
                fg: '#FFFFFF',
                fgSubtle: '#15803D',
                border: '#15803D'
            },
            warning: {
                bg: '#B45309',
                bgSubtle: '#FBF5FF',
                fg: '#FFFFFF',
                fgSubtle: '#B45309',
                border: '#B45309'
            },
            danger: {
                bg: '#DB2777',
                bgSubtle: '#FBF5FF',
                fg: '#FFFFFF',
                fgSubtle: '#DB2777',
                border: '#DB2777'
            },
            info: {
                bg: '#2563EB',
                bgSubtle: '#FBF5FF',
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
        xs: '2px',
        sm: '2px',
        md: '4px',
        lg: '4px',
        xl: '4px',
        '2xl': '4px',
        full: '4px'
    },
    typography: {
        family: {
            sans: '\'JetBrains Mono\', ui-monospace, monospace',
            serif: '\'JetBrains Mono\', ui-monospace, monospace',
            mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
        }
    },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 0 16px rgba(74,222,128,.4)',
        sm: '0 0 0 1px rgba(74,222,128,.15)',
        md: '0 0 0 1px rgba(74,222,128,.15)',
        lg: '0 24px 64px -16px rgba(0,0,0,.5)',
        xl: '0 24px 64px -16px rgba(0,0,0,.5)'
    }
}

export const geekDarkTheme: IOrigamTheme = {
    name: 'geek',
    mode: 'dark',
    label: 'Geek',
    description: 'Cyberpunk terminal · mono · neon',
    swatch: 'linear-gradient(135deg, #0A0612 0%, #C77DFF 100%)',
    component: {
        'origam-btn': {
            variant: 'flat',
            rounded: 'x-small'
        },
        'origam-card': {
            variant: 'outlined',
            rounded: 'x-small'
        },
        'origam-chip': {
            variant: 'outlined',
            rounded: 'x-small'
        }
    },
    colors: {
        surface: {
            default: '#0A0612',
            raised: '#140C24',
            overlay: '#1C1138',
            sunken: '#0A0612',
            disabled: '#1C1138'
        },
        text: {
            primary: '#ECE6FF',
            secondary: '#B4A4E8',
            disabled: '#4A3D6E',
            inverse: '#0A0612',
            onColor: '#0A0612'
        },
        border: {
            default: 'rgba(124,77,255,.28)',
            subtle: 'rgba(124,77,255,.14)',
            strong: 'rgba(0,240,255,.5)',
            focus: 'rgba(0,240,255,.5)'
        },
        action: {
            primary: {
                bg: '#C77DFF',
                bgHover: '#00F0FF',
                bgSubtle: 'rgba(199,125,255,.14)',
                bgDisabled: '#1C1138',
                fg: '#0A0612',
                fgSubtle: '#00F0FF',
                fgDisabled: '#4A3D6E'
            },
            secondary: {
                bg: '#1C1138',
                bgHover: 'rgba(124,77,255,.28)',
                bgDisabled: '#140C24',
                fg: '#ECE6FF',
                fgDisabled: '#4A3D6E'
            },
            ghost: {
                bg: 'rgba(0,0,0,0)',
                bgHover: 'rgba(199,125,255,.14)',
                bgDisabled: 'rgba(0,0,0,0)',
                fg: '#00F0FF',
                fgDisabled: '#4A3D6E'
            }
        },
        feedback: {
            success: {
                bg: '#39FF14',
                bgSubtle: '#1C1138',
                fg: '#0A0612',
                fgSubtle: '#39FF14',
                border: '#39FF14'
            },
            warning: {
                bg: '#FFD166',
                bgSubtle: '#1C1138',
                fg: '#0A0612',
                fgSubtle: '#FFD166',
                border: '#FFD166'
            },
            danger: {
                bg: '#FF3864',
                bgSubtle: '#1C1138',
                fg: '#0A0612',
                fgSubtle: '#FF3864',
                border: '#FF3864'
            },
            info: {
                bg: '#60A5FA',
                bgSubtle: '#1C1138',
                fg: '#0A0612',
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
        xs: '4px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '12px',
        '2xl': '12px',
        full: '4px'
    },
    typography: {
        family: {
            sans: '\'JetBrains Mono\', ui-monospace, monospace',
            serif: '\'JetBrains Mono\', ui-monospace, monospace',
            mono: '\'JetBrains Mono\', \'Fira Code\', ui-monospace, monospace'
        }
    },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 0 16px rgba(74,222,128,.4)',
        sm: '0 0 0 1px rgba(74,222,128,.15)',
        md: '0 0 0 1px rgba(74,222,128,.15)',
        lg: '0 24px 64px -16px rgba(0,0,0,.5)',
        xl: '0 24px 64px -16px rgba(0,0,0,.5)'
    }
}
