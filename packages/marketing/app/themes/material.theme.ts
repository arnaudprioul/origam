import type { IOrigamTheme } from 'origam/interfaces'

export const materialLightTheme: IOrigamTheme = {
    name: 'material',
    mode: 'light',
    label: 'Material',
    description: 'Google Material 3',
    swatch: 'linear-gradient(135deg, #1C1B1F 50%, #6750A4 50%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'x-large', elevation: 1 },
        'origam-card': { variant: 'elevated', rounded: 'large', elevation: 1 },
        'origam-chip': { variant: 'tonal', rounded: 'medium' }
    },
    colors: {
        surface: {
            default: '#FFFBFE',
            raised: '#FFFFFF',
            overlay: '#F7F2FA',
            sunken: '#F2EDF6',
            disabled: '#E7E0EC'
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
                bgHover: '#7F67BE',
                bgSubtle: '#EADDFF',
                bgDisabled: '#E7E0EC',
                fg: '#FFFFFF',
                fgSubtle: '#21005D',
                fgDisabled: '#79747E'
            },
            secondary: {
                bg: '#E7E0EC',
                bgHover: '#D9D2DE',
                bgDisabled: '#F2EDF6',
                fg: '#1C1B1F',
                fgDisabled: '#79747E'
            },
            ghost: {
                bg: 'transparent',
                bgHover: 'rgba(103,80,164,0.08)',
                bgDisabled: 'transparent',
                fg: '#6750A4',
                fgDisabled: '#79747E'
            }
        },
        feedback: {
            success: { bg: '#388E3C', bgSubtle: '#E8F5E9', fg: '#FFFFFF', fgSubtle: '#1B5E20', border: '#388E3C' },
            warning: { bg: '#F57C00', bgSubtle: '#FFF3E0', fg: '#FFFFFF', fgSubtle: '#E65100', border: '#F57C00' },
            danger: { bg: '#B3261E', bgSubtle: '#F9DEDC', fg: '#FFFFFF', fgSubtle: '#601410', border: '#B3261E' },
            info: { bg: '#0288D1', bgSubtle: '#E1F5FE', fg: '#FFFFFF', fgSubtle: '#01579B', border: '#0288D1' }
        },
        overlay: { scrim: '#000000' }
    },
    radius: { sm: '12px', md: '16px', lg: '28px' },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 1px 2px 0 rgba(0,0,0,0.30)',
        sm: '0 1px 2px 0 rgba(0,0,0,0.30), 0 1px 3px 1px rgba(0,0,0,0.15)',
        md: '0 2px 6px 2px rgba(0,0,0,0.15), 0 1px 2px 0 rgba(0,0,0,0.30)',
        lg: '0 4px 8px 3px rgba(0,0,0,0.15), 0 1px 3px 0 rgba(0,0,0,0.30)',
        xl: '0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px 0 rgba(0,0,0,0.30)'
    }
}

export const materialDarkTheme: IOrigamTheme = {
    name: 'material',
    mode: 'dark',
    label: 'Material',
    description: 'Google Material 3',
    swatch: 'linear-gradient(135deg, #1C1B1F 50%, #D0BCFF 50%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'x-large', elevation: 1 },
        'origam-card': { variant: 'elevated', rounded: 'large', elevation: 1 },
        'origam-chip': { variant: 'tonal', rounded: 'medium' }
    },
    colors: {
        surface: {
            default: '#1C1B1F',
            raised: '#2B2930',
            overlay: '#36343B',
            sunken: '#141318',
            disabled: '#2B2930'
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
                bgDisabled: '#2B2930',
                fg: '#381E72',
                fgSubtle: '#EADDFF',
                fgDisabled: '#79747E'
            },
            secondary: {
                bg: '#36343B',
                bgHover: '#48464D',
                bgDisabled: '#2B2930',
                fg: '#E6E1E5',
                fgDisabled: '#79747E'
            },
            ghost: {
                bg: 'transparent',
                bgHover: 'rgba(208,188,255,0.08)',
                bgDisabled: 'transparent',
                fg: '#D0BCFF',
                fgDisabled: '#79747E'
            }
        },
        feedback: {
            success: { bg: '#9CCC65', bgSubtle: '#33401C', fg: '#1C1B1F', fgSubtle: '#C5E1A5', border: '#9CCC65' },
            warning: { bg: '#FFD54F', bgSubtle: '#3D2F00', fg: '#1C1B1F', fgSubtle: '#FFE082', border: '#FFD54F' },
            danger: { bg: '#F2B8B5', bgSubtle: '#601410', fg: '#601410', fgSubtle: '#F9DEDC', border: '#F2B8B5' },
            info: { bg: '#80CEFE', bgSubtle: '#003C5C', fg: '#1C1B1F', fgSubtle: '#B3E5FC', border: '#80CEFE' }
        },
        overlay: { scrim: '#000000' }
    },
    radius: { sm: '12px', md: '16px', lg: '28px' },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 1px 2px 0 rgba(0,0,0,0.50)',
        sm: '0 1px 2px 0 rgba(0,0,0,0.50), 0 1px 3px 1px rgba(0,0,0,0.25)',
        md: '0 2px 6px 2px rgba(0,0,0,0.25), 0 1px 2px 0 rgba(0,0,0,0.50)',
        lg: '0 4px 8px 3px rgba(0,0,0,0.25), 0 1px 3px 0 rgba(0,0,0,0.50)',
        xl: '0 6px 10px 4px rgba(0,0,0,0.25), 0 2px 3px 0 rgba(0,0,0,0.50)'
    }
}
