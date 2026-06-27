import type { IOrigamTheme } from 'origam/interfaces'

export const materialLightTheme: IOrigamTheme = {
    name: 'material',
    label: 'Material',
    vars: {
        rounded: {
            card: '28px',
            btn: '999px',
            pill: '999px',
            sm: '12px',
            md: '16px',
            lg: '28px'
        },
        color: {
            surface: {
                default: '#fef7ff',
                raised: '#ffffff',
                sunken: '#f7f2fa',
                overlay: '#f7f2fa',
                disabled: '#e8def8'
            },
            text: {
                primary: '#1c1b1f',
                secondary: '#49454f',
                tertiary: '#49454f',
                disabled: '#79747e',
                inverse: '#ffffff',
                onColor: '#ffffff',
                ink: '#1c1b1f'
            },
            action: {
                primary: {
                    bg: '#6750a4',
                    bgHover: '#21005d',
                    bgSubtle: '#eaddff',
                    bgDisabled: '#e8def8',
                    fg: '#ffffff',
                    fgSubtle: '#21005d',
                    fgDisabled: '#79747e'
                },
                secondary: {
                    bg: '#eaddff',
                    bgHover: '#d0bcff',
                    bgDisabled: '#e8def8',
                    fg: '#21005d',
                    fgDisabled: '#79747e'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(103, 80, 164, 0.08)',
                    bgDisabled: 'transparent',
                    fg: '#6750a4',
                    fgDisabled: '#79747e'
                }
            },
            border: {
                default: 'rgba(28, 27, 31, 0.12)',
                subtle: 'rgba(28, 27, 31, 0.06)',
                strong: 'rgba(28, 27, 31, 0.30)',
                focus: '#6750a4',
                'subtle-alpha': 'rgba(28, 27, 31, 0.08)',
                ghost: 'rgba(28, 27, 31, 0.06)'
            },
            feedback: {
                success: {
                    bg: '#2e7d32',
                    bgSubtle: 'rgba(110, 231, 183, 0.14)',
                    fg: '#ffffff',
                    fgSubtle: '#1b5e20',
                    border: '#1b5e20'
                },
                warning: {
                    bg: '#e65100',
                    bgSubtle: 'rgba(230, 81, 0, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#bf360c',
                    border: '#e65100'
                },
                danger: {
                    bg: '#b00020',
                    bgSubtle: 'rgba(176, 0, 32, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#601410',
                    border: '#b00020'
                },
                info: {
                    bg: '#6750a4',
                    bgSubtle: 'rgba(103, 80, 164, 0.10)',
                    fg: '#ffffff',
                    fgSubtle: '#21005d',
                    border: '#6750a4'
                }
            },
            'btn-primary-bg': 'transparent',
            'btn-primary-text': '#1c1b1f',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': 'transparent',
            'btn-secondary-text': '#21005d'
        },
        shadow: {
            'card-elevated': '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
            'glow-primary': '0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(208, 188, 255, 0.15)',
            'btn-primary': '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
            'btn-secondary': 'none'
        }
    },
    cssVars: {}
}

export const materialDarkTheme: IOrigamTheme = {
    name: 'material',
    mode: 'dark',
    vars: {
        rounded: {
            card: '28px',
            btn: '999px',
            pill: '999px',
            sm: '12px',
            md: '16px',
            lg: '28px'
        },
        color: {
            surface: {
                default: '#1c1b1f',
                raised: '#2b2930',
                sunken: '#36343b',
                overlay: '#36343b',
                disabled: '#49454f'
            },
            text: {
                primary: '#e6e1e5',
                secondary: '#cac4d0',
                tertiary: '#cac4d0',
                disabled: '#79747e',
                inverse: '#1c1b1f',
                onColor: '#381e72',
                ink: '#e6e1e5'
            },
            action: {
                primary: {
                    bg: '#d0bcff',
                    bgHover: '#eaddff',
                    bgSubtle: '#4a4458',
                    bgDisabled: '#49454f',
                    fg: '#381e72',
                    fgSubtle: '#eaddff',
                    fgDisabled: '#79747e'
                },
                secondary: {
                    bg: '#4a4458',
                    bgHover: '#625b71',
                    bgDisabled: '#49454f',
                    fg: '#eaddff',
                    fgDisabled: '#79747e'
                },
                ghost: {
                    bg: 'transparent',
                    bgHover: 'rgba(208, 188, 255, 0.08)',
                    bgDisabled: 'transparent',
                    fg: '#d0bcff',
                    fgDisabled: '#79747e'
                }
            },
            border: {
                default: 'rgba(202, 196, 208, 0.12)',
                subtle: 'rgba(202, 196, 208, 0.06)',
                strong: 'rgba(202, 196, 208, 0.30)',
                focus: '#d0bcff',
                'subtle-alpha': 'rgba(202, 196, 208, 0.08)',
                ghost: 'rgba(202, 196, 208, 0.06)'
            },
            feedback: {
                success: {
                    bg: '#81c784',
                    bgSubtle: 'rgba(110, 231, 183, 0.14)',
                    fg: '#1b5e20',
                    fgSubtle: '#c5e1a5',
                    border: '#c5e1a5'
                },
                warning: {
                    bg: '#ffb300',
                    bgSubtle: 'rgba(255, 224, 130, 0.12)',
                    fg: '#3e2723',
                    fgSubtle: '#ffe082',
                    border: '#ffe082'
                },
                danger: {
                    bg: '#e57373',
                    bgSubtle: 'rgba(249, 222, 220, 0.12)',
                    fg: '#3e0012',
                    fgSubtle: '#f9dedc',
                    border: '#f9dedc'
                },
                info: {
                    bg: '#d0bcff',
                    bgSubtle: 'rgba(208, 188, 255, 0.12)',
                    fg: '#381e72',
                    fgSubtle: '#eaddff',
                    border: '#d0bcff'
                }
            },
            'btn-primary-bg': 'transparent',
            'btn-primary-text': '#e6e1e5',
            'btn-secondary-bg': 'transparent',
            'btn-secondary-border': 'transparent',
            'btn-secondary-text': '#eaddff'
        },
        shadow: {
            'card-elevated': '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
            'glow-primary': '0 1px 2px rgba(0, 0, 0, 0.3), 0 2px 6px 2px rgba(208, 188, 255, 0.15)',
            'btn-primary': '0 1px 2px rgba(0, 0, 0, 0.3), 0 1px 3px 1px rgba(0, 0, 0, 0.15)',
            'btn-secondary': 'none'
        }
    },
    cssVars: {}
}

export const materialThemes: IOrigamTheme[] = [materialLightTheme, materialDarkTheme]
