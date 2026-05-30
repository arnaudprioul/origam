import type { IDefault, IOrigamTheme } from 'origam/interfaces'

const GLASS_COLORS = {
    surface: {
        default: '#0F0E1A',
        raised: 'rgba(255,255,255,0.06)',
        overlay: 'rgba(255,255,255,0.04)',
        sunken: '#0F0E1A',
        disabled: 'rgba(255,255,255,0.04)'
    },
    text: {
        primary: '#FFFFFF',
        secondary: '#C4B5FD',
        disabled: '#6B5FAF',
        inverse: '#0F0E1A',
        onColor: '#0F0E1A'
    },
    border: {
        default: 'rgba(255,255,255,0.12)',
        subtle: 'rgba(255,255,255,0.06)',
        strong: 'rgba(255,255,255,0.24)',
        focus: '#A78BFA'
    },
    action: {
        primary: {
            bg: '#A78BFA',
            bgHover: '#DDD6FE',
            bgSubtle: 'rgba(167,139,250,0.16)',
            bgDisabled: 'rgba(255,255,255,0.04)',
            fg: '#0F0E1A',
            fgSubtle: '#DDD6FE',
            fgDisabled: '#6B5FAF'
        },
        secondary: {
            bg: 'rgba(255,255,255,0.06)',
            bgHover: 'rgba(255,255,255,0.12)',
            bgDisabled: 'rgba(255,255,255,0.04)',
            fg: '#FFFFFF',
            fgDisabled: '#6B5FAF'
        },
        ghost: {
            bg: 'transparent',
            bgHover: 'rgba(255,255,255,0.08)',
            bgDisabled: 'transparent',
            fg: '#C4B5FD',
            fgDisabled: '#6B5FAF'
        }
    },
    feedback: {
        success: { bg: '#6EE7B7', bgSubtle: 'rgba(110,231,183,0.16)', fg: '#0F0E1A', fgSubtle: '#86EFAC', border: '#6EE7B7' },
        warning: { bg: '#FBBF24', bgSubtle: 'rgba(251,191,36,0.16)', fg: '#0F0E1A', fgSubtle: '#FCD34D', border: '#FBBF24' },
        danger: { bg: '#F87171', bgSubtle: 'rgba(248,113,113,0.16)', fg: '#0F0E1A', fgSubtle: '#FCA5A5', border: '#F87171' },
        info: { bg: '#A78BFA', bgSubtle: 'rgba(167,139,250,0.16)', fg: '#0F0E1A', fgSubtle: '#DDD6FE', border: '#A78BFA' }
    },
    overlay: { scrim: '#000000' }
}

const GLASS_RADIUS = { none: '0px', xs: '8px', sm: '10px', md: '16px', lg: '22px', xl: '22px', '2xl': '24px', full: '999px' }

const GLASS_SHADOW = {
    none: '0 0 0 0 rgba(0,0,0,0)',
    xs: '0 1px 0 rgba(255,255,255,0.08) inset',
    sm: '0 1px 0 rgba(255,255,255,0.08) inset, 0 16px 40px -20px rgba(167,139,250,0.4)',
    md: '0 1px 0 rgba(255,255,255,0.08) inset, 0 16px 40px -20px rgba(167,139,250,0.4)',
    lg: '0 1px 0 rgba(255,255,255,0.08) inset, 0 24px 60px -24px rgba(167,139,250,0.5)',
    xl: '0 1px 0 rgba(255,255,255,0.08) inset, 0 32px 80px -28px rgba(167,139,250,0.55)'
}

const GLASS_COMPONENT: IDefault = {
    'origam-btn': { variant: 'tonal', rounded: 'x-large' },
    'origam-card': { variant: 'flat', rounded: 'large', elevation: 2 },
    'origam-chip': { variant: 'tonal', rounded: 'x-large' }
}

const GLASS_SWATCH = 'linear-gradient(135deg, #0F0E1A 0%, #A78BFA 50%, #2DD4BF 100%)'

export const glassLightTheme: IOrigamTheme = {
    name: 'glass',
    mode: 'light',
    label: 'Glass',
    description: 'Frosted · violet · luminous',
    swatch: GLASS_SWATCH,
    component: { ...GLASS_COMPONENT },
    colors: GLASS_COLORS,
    radius: GLASS_RADIUS,
    shadow: GLASS_SHADOW
}

export const glassDarkTheme: IOrigamTheme = {
    name: 'glass',
    mode: 'dark',
    label: 'Glass',
    description: 'Frosted · violet · luminous',
    swatch: GLASS_SWATCH,
    component: { ...GLASS_COMPONENT },
    colors: GLASS_COLORS,
    radius: GLASS_RADIUS,
    shadow: GLASS_SHADOW
}
