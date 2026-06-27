import type { IOrigamTheme } from 'origam/interfaces'

export const geekLightTheme: IOrigamTheme = {
    name: 'geek',
    label: 'Geek',
    vars: {
        rounded: {
            card: '4px',
            btn: '4px',
            pill: '4px',
            sm: '2px',
            md: '4px',
            lg: '4px'
        },
        color: {
            surface: {
                default: '#f6f0ff',
                raised: '#ffffff',
                sunken: '#fbf5ff',
                overlay: '#fbf5ff',
                disabled: '#e9e1f5'
            },
            text: {
                primary: '#1a0f2e',
                secondary: '#5b3e8c',
                tertiary: '#7e5fb0',
                disabled: '#b5a0d8',
                inverse: '#ffffff',
                onColor: '#ffffff',
                ink: '#1a0f2e'
            },
            action: {
                primary: {
                    bg: '#7c3aed',
                    bgHover: '#6d28d9',
                    bgSubtle: 'rgba(124, 58, 237, 0.10)',
                    bgDisabled: '#e9e1f5',
                    fg: '#ffffff',
                    fgSubtle: '#6d28d9',
                    fgDisabled: '#b5a0d8'
                },
                secondary: {
                    bg: '#fbf5ff',
                    bgHover: '#f3e8ff',
                    bgDisabled: '#f6f0ff',
                    fg: '#1a0f2e',
                    fgDisabled: '#b5a0d8'
                },
                ghost: {
                    bg: 'rgba(0, 0, 0, 0)',
                    bgHover: 'rgba(124, 58, 237, 0.08)',
                    bgDisabled: 'rgba(0, 0, 0, 0)',
                    fg: '#7c3aed',
                    fgDisabled: '#b5a0d8'
                }
            },
            border: {
                default: 'rgba(168, 85, 247, 0.28)',
                subtle: 'rgba(168, 85, 247, 0.14)',
                strong: 'rgba(217, 70, 239, 0.55)',
                focus: '#7c3aed',
                'subtle-alpha': 'rgba(168, 85, 247, 0.12)',
                ghost: 'rgba(168, 85, 247, 0.16)'
            },
            feedback: {
                success: {
                    bg: '#15803d',
                    bgSubtle: 'rgba(21, 128, 61, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#15803d',
                    border: '#15803d'
                },
                warning: {
                    bg: '#b45309',
                    bgSubtle: 'rgba(180, 83, 9, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#b45309',
                    border: '#b45309'
                },
                danger: {
                    bg: '#db2777',
                    bgSubtle: 'rgba(219, 39, 119, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#db2777',
                    border: '#db2777'
                },
                info: {
                    bg: '#0891b2',
                    bgSubtle: 'rgba(8, 145, 178, 0.08)',
                    fg: '#ffffff',
                    fgSubtle: '#0891b2',
                    border: '#0891b2'
                }
            },
            'btn-primary-text': '#ffffff',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': 'rgba(217, 70, 239, 0.55)',
            'btn-secondary-text': '#a21caf'
        },
        shadow: {
            'card-elevated': '0 1px 3px rgba(124, 58, 237, 0.06), 0 8px 24px -16px rgba(124, 58, 237, 0.20)',
            'glow-primary': 'inset 0 1px 0 rgba(255, 255, 255, 0.35), 0 8px 24px -8px rgba(124, 58, 237, 0.55), 0 0 32px -8px rgba(8, 145, 178, 0.30)',
            'btn-primary': 'rgba(217, 70, 239, 0.50) 0px 0px 18px -4px, rgba(8, 145, 178, 0.40) 0px 0px 30px -8px, rgba(255, 255, 255, 0.40) 0px 1px 0px 0px inset',
            'btn-secondary': 'rgba(217, 70, 239, 0.35) 0px 0px 10px -4px'
        }
    },
    cssVars: {}
}

export const geekDarkTheme: IOrigamTheme = {
    name: 'geek',
    mode: 'dark',
    vars: {
        rounded: {
            card: '8px',
            btn: '8px',
            pill: '4px',
            sm: '4px',
            md: '8px',
            lg: '12px'
        },
        color: {
            surface: {
                default: '#0a0612',
                raised: '#140c24',
                sunken: '#1c1138',
                overlay: '#0a0612',
                disabled: '#2a1d4a'
            },
            text: {
                primary: '#ece6ff',
                secondary: '#b4a4e8',
                tertiary: '#7e6bb8',
                disabled: '#4a3d6e',
                inverse: '#0a0612',
                onColor: '#0a0612',
                ink: '#ece6ff'
            },
            action: {
                primary: {
                    bg: '#c77dff',
                    bgHover: '#a855f7',
                    bgSubtle: 'rgba(199, 125, 255, 0.14)',
                    bgDisabled: '#2a1d4a',
                    fg: '#0a0612',
                    fgSubtle: '#00f0ff',
                    fgDisabled: '#4a3d6e'
                },
                secondary: {
                    bg: '#1c1138',
                    bgHover: '#2a1d4a',
                    bgDisabled: '#140c24',
                    fg: '#ece6ff',
                    fgDisabled: '#4a3d6e'
                },
                ghost: {
                    bg: 'rgba(0, 0, 0, 0)',
                    bgHover: 'rgba(199, 125, 255, 0.10)',
                    bgDisabled: 'rgba(0, 0, 0, 0)',
                    fg: '#00f0ff',
                    fgDisabled: '#4a3d6e'
                }
            },
            border: {
                default: 'rgba(124, 77, 255, 0.28)',
                subtle: 'rgba(124, 77, 255, 0.14)',
                strong: 'rgba(0, 240, 255, 0.50)',
                focus: '#00f0ff',
                'subtle-alpha': 'rgba(124, 77, 255, 0.16)',
                ghost: 'rgba(0, 240, 255, 0.12)'
            },
            feedback: {
                success: {
                    bg: '#39ff14',
                    bgSubtle: 'rgba(57, 255, 20, 0.10)',
                    fg: '#0a0612',
                    fgSubtle: '#39ff14',
                    border: '#39ff14'
                },
                warning: {
                    bg: '#ffd166',
                    bgSubtle: 'rgba(255, 209, 102, 0.10)',
                    fg: '#0a0612',
                    fgSubtle: '#ffd166',
                    border: '#ffd166'
                },
                danger: {
                    bg: '#ff3864',
                    bgSubtle: 'rgba(255, 56, 100, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#ff3864',
                    border: '#ff3864'
                },
                info: {
                    bg: '#00f0ff',
                    bgSubtle: 'rgba(0, 240, 255, 0.10)',
                    fg: '#0a0612',
                    fgSubtle: '#00f0ff',
                    border: '#00f0ff'
                }
            },
            'btn-primary-text': '#0a0612',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': 'rgba(0, 240, 255, 0.40)',
            'btn-secondary-text': '#00f0ff'
        },
        shadow: {
            'card-elevated': 'inset 0 1px 0 rgba(199, 125, 255, 0.08), 0 8px 28px -12px rgba(0, 0, 0, 0.80), 0 0 0 1px rgba(0, 240, 255, 0.04)',
            'glow-primary': 'inset 0 1px 0 rgba(255, 255, 255, 0.15), 0 8px 24px -8px rgba(0, 240, 255, 0.50), 0 0 32px -8px rgba(199, 125, 255, 0.35)',
            'btn-primary': 'rgba(0, 240, 255, 0.50) 0px 0px 18px -2px, rgba(199, 125, 255, 0.45) 0px 0px 32px -6px, rgba(255, 255, 255, 0.40) 0px 1px 0px 0px inset',
            'btn-secondary': 'rgba(0, 240, 255, 0.25) 0px 0px 12px -4px'
        }
    },
    cssVars: {}
}

export const geekThemes: IOrigamTheme[] = [geekLightTheme, geekDarkTheme]
