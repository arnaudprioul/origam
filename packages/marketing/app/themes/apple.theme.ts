import type { IOrigamTheme } from 'origam/interfaces'

export const appleLightTheme: IOrigamTheme = {
    name: 'apple',
    label: 'Apple',
    vars: {
        rounded: {
            card: '12px',
            btn: '12px',
            pill: '980px',
            sm: '8px',
            md: '12px',
            lg: '18px'
        },
        color: {
            surface: {
                default: '#ffffff',
                raised: '#fbfbfd',
                sunken: '#f5f5f7',
                overlay: '#f5f5f7',
                disabled: '#d2d2d7'
            },
            text: {
                primary: '#1d1d1f',
                secondary: '#515154',
                tertiary: '#86868b',
                disabled: '#86868b',
                inverse: '#ffffff',
                onColor: '#ffffff',
                ink: '#1d1d1f'
            },
            action: {
                primary: {
                    bg: '#0071e3',
                    bgHover: '#0058b0',
                    bgSubtle: '#f0f7ff',
                    bgDisabled: '#d2d2d7',
                    fg: '#ffffff',
                    fgSubtle: '#0058b0',
                    fgDisabled: '#86868b'
                },
                secondary: {
                    bg: '#fbfbfd',
                    bgHover: '#f5f5f7',
                    bgDisabled: '#d2d2d7',
                    fg: '#1d1d1f',
                    fgDisabled: '#86868b'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(0, 0, 0, 0.04)',
                    bgDisabled: 'transparent',
                    fg: '#1d1d1f',
                    fgDisabled: '#86868b'
                }
            },
            border: {
                default: '#d2d2d7',
                subtle: '#e5e5e7',
                strong: '#86868b',
                focus: '#0071e3',
                'subtle-alpha': 'rgba(210, 210, 215, 0.60)',
                ghost: 'rgba(210, 210, 215, 0.40)'
            },
            feedback: {
                success: {
                    bg: '#198529',
                    bgSubtle: 'rgba(25, 133, 41, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#198529',
                    border: '#198529'
                },
                warning: {
                    bg: '#a86600',
                    bgSubtle: 'rgba(168, 102, 0, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#a86600',
                    border: '#a86600'
                },
                danger: {
                    bg: '#c2271c',
                    bgSubtle: 'rgba(194, 39, 28, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#c2271c',
                    border: '#c2271c'
                },
                info: {
                    bg: '#0071e3',
                    bgSubtle: 'rgba(0, 113, 227, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#0058b0',
                    border: '#0071e3'
                }
            },
            'btn-primary-text': '#1d1d1f',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': '#d2d2d7',
            'btn-secondary-text': '#1d1d1f'
        },
        shadow: {
            'card-elevated': '0 4px 16px rgba(0, 0, 0, 0.04), 0 1px 2px rgba(0, 0, 0, 0.06)',
            'glow-primary': '0 2px 8px rgba(0, 113, 227, 0.25)',
            'btn-primary': '0 2px 8px rgba(0, 113, 227, 0.25)',
            'btn-secondary': 'none'
        }
    },
    cssVars: {}
}

export const appleDarkTheme: IOrigamTheme = {
    name: 'apple',
    mode: 'dark',
    vars: {
        rounded: {
            card: '12px',
            btn: '12px',
            pill: '980px',
            sm: '8px',
            md: '12px',
            lg: '18px'
        },
        color: {
            surface: {
                default: '#000000',
                raised: '#1c1c1e',
                sunken: '#2c2c2e',
                overlay: '#2c2c2e',
                disabled: '#38383a'
            },
            text: {
                primary: '#f5f5f7',
                secondary: '#a1a1a6',
                tertiary: '#6e6e73',
                disabled: '#6e6e73',
                inverse: '#000000',
                onColor: '#ffffff',
                ink: '#f5f5f7'
            },
            action: {
                primary: {
                    bg: '#0a84ff',
                    bgHover: '#64b5ff',
                    bgSubtle: 'rgba(10, 132, 255, 0.16)',
                    bgDisabled: '#38383a',
                    fg: '#ffffff',
                    fgSubtle: '#64b5ff',
                    fgDisabled: '#6e6e73'
                },
                secondary: {
                    bg: '#1c1c1e',
                    bgHover: '#2c2c2e',
                    bgDisabled: '#38383a',
                    fg: '#f5f5f7',
                    fgDisabled: '#6e6e73'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(255, 255, 255, 0.06)',
                    bgDisabled: 'transparent',
                    fg: '#f5f5f7',
                    fgDisabled: '#6e6e73'
                }
            },
            border: {
                default: '#38383a',
                subtle: '#2c2c2e',
                strong: '#6e6e73',
                focus: '#0a84ff',
                'subtle-alpha': 'rgba(56, 56, 58, 0.60)',
                ghost: 'rgba(56, 56, 58, 0.40)'
            },
            feedback: {
                success: {
                    bg: '#64e47c',
                    bgSubtle: 'rgba(100, 228, 124, 0.12)',
                    fg: '#000000',
                    fgSubtle: '#64e47c',
                    border: '#64e47c'
                },
                warning: {
                    bg: '#ffb445',
                    bgSubtle: 'rgba(255, 180, 69, 0.12)',
                    fg: '#000000',
                    fgSubtle: '#ffb445',
                    border: '#ffb445'
                },
                danger: {
                    bg: '#ff6961',
                    bgSubtle: 'rgba(255, 105, 97, 0.12)',
                    fg: '#ffffff',
                    fgSubtle: '#ff6961',
                    border: '#ff6961'
                },
                info: {
                    bg: '#0a84ff',
                    bgSubtle: 'rgba(10, 132, 255, 0.12)',
                    fg: '#ffffff',
                    fgSubtle: '#64b5ff',
                    border: '#0a84ff'
                }
            },
            'btn-primary-text': '#f5f5f7',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': '#38383a',
            'btn-secondary-text': '#f5f5f7'
        },
        shadow: {
            'card-elevated': '0 4px 16px rgba(0, 0, 0, 0.30), 0 1px 2px rgba(0, 0, 0, 0.30)',
            'glow-primary': '0 2px 8px rgba(0, 113, 227, 0.25)',
            'btn-primary': '0 2px 8px rgba(0, 113, 227, 0.25)',
            'btn-secondary': 'none'
        }
    },
    cssVars: {}
}

export const appleThemes: IOrigamTheme[] = [appleLightTheme, appleDarkTheme]
