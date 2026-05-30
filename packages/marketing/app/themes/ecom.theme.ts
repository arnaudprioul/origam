import type { IDefault, IOrigamTheme } from 'origam/interfaces'

const ECOM_COLORS = {
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
        focus: '#FECDD3'
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
            bgDisabled: '#FFF7F0',
            fg: '#1A1A1A',
            fgDisabled: '#A3A3A3'
        },
        ghost: {
            bg: 'transparent',
            bgHover: '#FFE4E6',
            bgDisabled: 'transparent',
            fg: '#E11D48',
            fgDisabled: '#A3A3A3'
        }
    },
    feedback: {
        success: { bg: '#15803D', bgSubtle: '#DCFCE7', fg: '#FFFFFF', fgSubtle: '#166534', border: '#15803D' },
        warning: { bg: '#B45309', bgSubtle: '#FEF3C7', fg: '#FFFFFF', fgSubtle: '#92400E', border: '#B45309' },
        danger: { bg: '#BE123C', bgSubtle: '#FFE4E6', fg: '#FFFFFF', fgSubtle: '#9F1239', border: '#BE123C' },
        info: { bg: '#1D4ED8', bgSubtle: '#DBEAFE', fg: '#FFFFFF', fgSubtle: '#1E40AF', border: '#1D4ED8' }
    },
    overlay: { scrim: '#1A1A1A' }
}

const ECOM_RADIUS = { none: '0px', xs: '4px', sm: '4px', md: '6px', lg: '10px', xl: '10px', '2xl': '12px', full: '999px' }

const ECOM_SHADOW = {
    none: '0 0 0 0 rgba(0,0,0,0)',
    xs: '0 1px 2px rgba(0,0,0,0.06)',
    sm: '0 1px 3px rgba(225,29,72,0.08), 0 1px 2px rgba(0,0,0,0.06)',
    md: '0 2px 0 rgba(225,29,72,0.2), 0 4px 12px -2px rgba(225,29,72,0.35)',
    lg: '0 8px 24px -8px rgba(225,29,72,0.25)',
    xl: '0 12px 32px -8px rgba(225,29,72,0.3)'
}

const ECOM_COMPONENT: IDefault = {
    global: { density: 'compact' },
    'origam-btn': { variant: 'flat', rounded: 'small' },
    'origam-card': { variant: 'outlined', rounded: 'small' },
    'origam-chip': { variant: 'tonal', rounded: 'small' }
}

const ECOM_SWATCH = 'linear-gradient(135deg, #FFF7F0 0%, #E11D48 50%, #EA580C 100%)'

export const ecomLightTheme: IOrigamTheme = {
    name: 'ecom',
    mode: 'light',
    label: 'E-commerce',
    description: 'Bright · dense · conversion',
    swatch: ECOM_SWATCH,
    component: { ...ECOM_COMPONENT },
    colors: ECOM_COLORS,
    radius: ECOM_RADIUS,
    shadow: ECOM_SHADOW
}

export const ecomDarkTheme: IOrigamTheme = {
    name: 'ecom',
    mode: 'dark',
    label: 'E-commerce',
    description: 'Bright · dense · conversion',
    swatch: ECOM_SWATCH,
    component: { ...ECOM_COMPONENT },
    colors: ECOM_COLORS,
    radius: ECOM_RADIUS,
    shadow: ECOM_SHADOW
}
