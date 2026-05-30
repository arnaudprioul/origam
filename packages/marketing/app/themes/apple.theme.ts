import type { IDefault, IOrigamTheme } from 'origam/interfaces'

const APPLE_SANS = "-apple-system, BlinkMacSystemFont, 'SF Pro Display', 'SF Pro Text', 'Inter', system-ui, sans-serif"

const APPLE_COLORS = {
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
        focus: '#CCE4FF'
    },
    action: {
        primary: {
            bg: '#0071E3',
            bgHover: '#0077ED',
            bgSubtle: '#F0F7FF',
            bgDisabled: '#F5F5F7',
            fg: '#FFFFFF',
            fgSubtle: '#0071E3',
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
            bgHover: '#F0F7FF',
            bgDisabled: 'transparent',
            fg: '#0071E3',
            fgDisabled: '#86868B'
        }
    },
    feedback: {
        success: { bg: '#15803D', bgSubtle: '#DCFCE7', fg: '#FFFFFF', fgSubtle: '#166534', border: '#15803D' },
        warning: { bg: '#B45309', bgSubtle: '#FEF3C7', fg: '#FFFFFF', fgSubtle: '#92400E', border: '#B45309' },
        danger: { bg: '#BE123C', bgSubtle: '#FFE4E6', fg: '#FFFFFF', fgSubtle: '#9F1239', border: '#BE123C' },
        info: { bg: '#0071E3', bgSubtle: '#F0F7FF', fg: '#FFFFFF', fgSubtle: '#0071E3', border: '#0071E3' }
    },
    overlay: { scrim: '#1D1D1F' }
}

const APPLE_RADIUS = { none: '0px', xs: '8px', sm: '8px', md: '12px', lg: '18px', xl: '18px', '2xl': '22px', full: '980px' }

const APPLE_TYPOGRAPHY = {
    family: { sans: APPLE_SANS }
}

const APPLE_SHADOW = {
    none: '0 0 0 0 rgba(0,0,0,0)',
    xs: '0 2px 8px rgba(0,113,227,0.25)',
    sm: '0 4px 16px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    md: '0 4px 16px rgba(0,0,0,0.04), 0 1px 2px rgba(0,0,0,0.06)',
    lg: '0 20px 40px -8px rgba(0,0,0,0.08)',
    xl: '0 28px 56px -10px rgba(0,0,0,0.1)'
}

const APPLE_COMPONENT: IDefault = {
    'origam-btn': { variant: 'flat', rounded: 'pill' },
    'origam-card': { variant: 'flat', rounded: 'large', elevation: 1 },
    'origam-chip': { variant: 'tonal', rounded: 'pill' }
}

const APPLE_SWATCH = 'linear-gradient(135deg, #FFFFFF 0%, #F5F5F7 50%, #0071E3 100%)'

export const appleLightTheme: IOrigamTheme = {
    name: 'apple',
    mode: 'light',
    label: 'Apple',
    description: 'Premium · minimal · clean',
    swatch: APPLE_SWATCH,
    component: { ...APPLE_COMPONENT },
    colors: APPLE_COLORS,
    radius: APPLE_RADIUS,
    typography: APPLE_TYPOGRAPHY,
    shadow: APPLE_SHADOW
}

export const appleDarkTheme: IOrigamTheme = {
    name: 'apple',
    mode: 'dark',
    label: 'Apple',
    description: 'Premium · minimal · clean',
    swatch: APPLE_SWATCH,
    component: { ...APPLE_COMPONENT },
    colors: APPLE_COLORS,
    radius: APPLE_RADIUS,
    typography: APPLE_TYPOGRAPHY,
    shadow: APPLE_SHADOW
}
