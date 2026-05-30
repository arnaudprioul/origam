import type { IDefault, IOrigamTheme } from 'origam/interfaces'

const EDITORIAL_SERIF = "'Fraunces', 'Playfair Display', Georgia, 'Times New Roman', serif"

const EDITORIAL_COLORS = {
    surface: {
        default: '#0A0A0A',
        raised: '#0E0E0E',
        overlay: '#131313',
        sunken: '#0A0A0A',
        disabled: '#131313'
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#D4D4D4',
        disabled: '#525252',
        inverse: '#0A0A0A',
        onColor: '#0A0A0A'
    },
    border: {
        default: 'rgba(255,255,255,0.1)',
        subtle: 'rgba(255,255,255,0.06)',
        strong: 'rgba(255,255,255,0.2)',
        focus: '#A78BFA'
    },
    action: {
        primary: {
            bg: '#A78BFA',
            bgHover: '#C4B5FD',
            bgSubtle: 'rgba(167,139,250,0.14)',
            bgDisabled: '#131313',
            fg: '#0A0A0A',
            fgSubtle: '#C4B5FD',
            fgDisabled: '#525252'
        },
        secondary: {
            bg: '#131313',
            bgHover: '#1C1C1C',
            bgDisabled: '#0E0E0E',
            fg: '#FFFFFF',
            fgDisabled: '#525252'
        },
        ghost: {
            bg: 'transparent',
            bgHover: 'rgba(255,255,255,0.06)',
            bgDisabled: 'transparent',
            fg: '#C4B5FD',
            fgDisabled: '#525252'
        }
    },
    feedback: {
        success: { bg: '#6EE7B7', bgSubtle: 'rgba(110,231,183,0.14)', fg: '#0A0A0A', fgSubtle: '#86EFAC', border: '#6EE7B7' },
        warning: { bg: '#FBBF24', bgSubtle: 'rgba(251,191,36,0.14)', fg: '#0A0A0A', fgSubtle: '#FCD34D', border: '#FBBF24' },
        danger: { bg: '#F87171', bgSubtle: 'rgba(248,113,113,0.14)', fg: '#0A0A0A', fgSubtle: '#FCA5A5', border: '#F87171' },
        info: { bg: '#A78BFA', bgSubtle: 'rgba(167,139,250,0.14)', fg: '#0A0A0A', fgSubtle: '#C4B5FD', border: '#A78BFA' }
    },
    overlay: { scrim: '#000000' }
}

const EDITORIAL_RADIUS = { none: '0px', xs: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px', '2xl': '0px', full: '0px' }

const EDITORIAL_TYPOGRAPHY = {
    family: { sans: EDITORIAL_SERIF, serif: EDITORIAL_SERIF }
}

const EDITORIAL_SHADOW = {
    none: '0 0 0 0 rgba(0,0,0,0)',
    xs: '0 0 0 0 rgba(0,0,0,0)',
    sm: '0 0 0 0 rgba(0,0,0,0)',
    md: '0 0 0 0 rgba(0,0,0,0)',
    lg: '0 0 0 0 rgba(0,0,0,0)',
    xl: '0 0 0 0 rgba(0,0,0,0)'
}

const EDITORIAL_COMPONENT: IDefault = {
    'origam-btn': { variant: 'outlined', rounded: 0 },
    'origam-card': { variant: 'outlined', rounded: 0 },
    'origam-chip': { variant: 'outlined', rounded: 0 }
}

const EDITORIAL_SWATCH = 'linear-gradient(135deg, #0A0A0A 50%, #A78BFA 50%)'

export const editorialLightTheme: IOrigamTheme = {
    name: 'editorial',
    mode: 'light',
    label: 'Editorial',
    description: 'Magazine · serif · refined',
    swatch: EDITORIAL_SWATCH,
    component: { ...EDITORIAL_COMPONENT },
    colors: EDITORIAL_COLORS,
    radius: EDITORIAL_RADIUS,
    typography: EDITORIAL_TYPOGRAPHY,
    shadow: EDITORIAL_SHADOW
}

export const editorialDarkTheme: IOrigamTheme = {
    name: 'editorial',
    mode: 'dark',
    label: 'Editorial',
    description: 'Magazine · serif · refined',
    swatch: EDITORIAL_SWATCH,
    component: { ...EDITORIAL_COMPONENT },
    colors: EDITORIAL_COLORS,
    radius: EDITORIAL_RADIUS,
    typography: EDITORIAL_TYPOGRAPHY,
    shadow: EDITORIAL_SHADOW
}
