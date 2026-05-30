import type { IOrigamTheme } from 'origam/interfaces'

const APPLE_SANS = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', system-ui, sans-serif"

export const appleLightTheme: IOrigamTheme = {
    name: 'apple',
    mode: 'light',
    label: 'Apple',
    description: 'Premium · minimal · clean',
    swatch: 'linear-gradient(135deg, #ffffff 0%, #F5F5F7 50%, #0071E3 100%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'x-large' },
        'origam-card': { variant: 'flat', rounded: 'large', elevation: 1 },
        'origam-chip': { variant: 'tonal', rounded: 'x-large' }
    },
    colors: {
        surface: {
            default: '#FFFFFF',
            raised: '#FBFBFD',
            overlay: '#F5F5F7',
            sunken: '#F2F2F4',
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
                bgHover: '#0077ED',
                bgSubtle: '#F0F7FF',
                bgDisabled: '#E5E5E7',
                fg: '#FFFFFF',
                fgSubtle: '#0058B0',
                fgDisabled: '#86868B'
            },
            secondary: {
                bg: '#F5F5F7',
                bgHover: '#E5E5E7',
                bgDisabled: '#FBFBFD',
                fg: '#1D1D1F',
                fgDisabled: '#86868B'
            },
            ghost: {
                bg: 'transparent',
                bgHover: '#F5F5F7',
                bgDisabled: 'transparent',
                fg: '#0071E3',
                fgDisabled: '#86868B'
            }
        },
        feedback: {
            success: { bg: '#157F28', bgSubtle: '#E8F8EC', fg: '#FFFFFF', fgSubtle: '#198529', border: '#157F28' },
            warning: { bg: '#9A5A00', bgSubtle: '#FFF4E5', fg: '#FFFFFF', fgSubtle: '#A86600', border: '#9A5A00' },
            danger: { bg: '#D62A20', bgSubtle: '#FFE9E7', fg: '#FFFFFF', fgSubtle: '#C2271C', border: '#D62A20' },
            info: { bg: '#0071E3', bgSubtle: '#F0F7FF', fg: '#FFFFFF', fgSubtle: '#0058B0', border: '#0071E3' }
        },
        overlay: { scrim: '#1D1D1F' }
    },
    radius: { sm: '8px', md: '12px', lg: '18px', full: '980px' },
    typography: {
        family: { sans: APPLE_SANS }
    },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 1px 3px 0 rgba(0,0,0,0.10)',
        sm: '0 2px 6px 0 rgba(0,0,0,0.10)',
        md: '0 4px 14px -1px rgba(0,0,0,0.12)',
        lg: '0 8px 24px -2px rgba(0,0,0,0.14)',
        xl: '0 14px 40px -4px rgba(0,0,0,0.16)'
    }
}

export const appleDarkTheme: IOrigamTheme = {
    name: 'apple',
    mode: 'dark',
    label: 'Apple',
    description: 'Premium · minimal · clean',
    swatch: 'linear-gradient(135deg, #1D1D1F 0%, #2C2C2E 50%, #0A84FF 100%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'x-large' },
        'origam-card': { variant: 'flat', rounded: 'large', elevation: 1 },
        'origam-chip': { variant: 'tonal', rounded: 'x-large' }
    },
    colors: {
        surface: {
            default: '#000000',
            raised: '#1C1C1E',
            overlay: '#2C2C2E',
            sunken: '#0A0A0B',
            disabled: '#1C1C1E'
        },
        text: {
            primary: '#F5F5F7',
            secondary: '#A1A1A6',
            disabled: '#6E6E73',
            inverse: '#1D1D1F',
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
                bgHover: '#409CFF',
                bgSubtle: 'rgba(10,132,255,0.16)',
                bgDisabled: '#1C1C1E',
                fg: '#FFFFFF',
                fgSubtle: '#64B5FF',
                fgDisabled: '#6E6E73'
            },
            secondary: {
                bg: '#2C2C2E',
                bgHover: '#3A3A3C',
                bgDisabled: '#1C1C1E',
                fg: '#F5F5F7',
                fgDisabled: '#6E6E73'
            },
            ghost: {
                bg: 'transparent',
                bgHover: 'rgba(255,255,255,0.08)',
                bgDisabled: 'transparent',
                fg: '#0A84FF',
                fgDisabled: '#6E6E73'
            }
        },
        feedback: {
            success: { bg: '#30D158', bgSubtle: 'rgba(48,209,88,0.16)', fg: '#000000', fgSubtle: '#64E47C', border: '#30D158' },
            warning: { bg: '#FF9F0A', bgSubtle: 'rgba(255,159,10,0.16)', fg: '#000000', fgSubtle: '#FFB445', border: '#FF9F0A' },
            danger: { bg: '#FF453A', bgSubtle: 'rgba(255,69,58,0.16)', fg: '#FFFFFF', fgSubtle: '#FF6961', border: '#FF453A' },
            info: { bg: '#0A84FF', bgSubtle: 'rgba(10,132,255,0.16)', fg: '#FFFFFF', fgSubtle: '#64B5FF', border: '#0A84FF' }
        },
        overlay: { scrim: '#000000' }
    },
    radius: { sm: '8px', md: '12px', lg: '18px', full: '980px' },
    typography: {
        family: { sans: APPLE_SANS }
    },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 1px 4px 0 rgba(0,0,0,0.50)',
        sm: '0 2px 8px 0 rgba(0,0,0,0.50)',
        md: '0 4px 16px -1px rgba(0,0,0,0.55)',
        lg: '0 8px 30px -2px rgba(0,0,0,0.60)',
        xl: '0 14px 48px -4px rgba(0,0,0,0.65)'
    }
}
