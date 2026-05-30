import type { IDefault, IOrigamTheme } from 'origam/interfaces'

const GEEK_MONO = "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace"

const GEEK_COLORS = {
    surface: {
        default: '#050a05',
        raised: '#0A140A',
        overlay: '#0E1A0E',
        sunken: '#050a05',
        disabled: '#0A140A'
    },
    text: {
        primary: '#4ADE80',
        secondary: '#16A34A',
        disabled: '#064E1A',
        inverse: '#050a05',
        onColor: '#050a05'
    },
    border: {
        default: 'rgba(74,222,128,0.15)',
        subtle: 'rgba(74,222,128,0.06)',
        strong: 'rgba(74,222,128,0.35)',
        focus: 'rgba(74,222,128,0.4)'
    },
    action: {
        primary: {
            bg: '#4ADE80',
            bgHover: '#6EE7B7',
            bgSubtle: 'rgba(74,222,128,0.1)',
            bgDisabled: '#0E1A0E',
            fg: '#050a05',
            fgSubtle: '#6EE7B7',
            fgDisabled: '#064E1A'
        },
        secondary: {
            bg: '#0E1A0E',
            bgHover: '#14271A',
            bgDisabled: '#0A140A',
            fg: '#4ADE80',
            fgDisabled: '#064E1A'
        },
        ghost: {
            bg: 'transparent',
            bgHover: 'rgba(74,222,128,0.1)',
            bgDisabled: 'transparent',
            fg: '#6EE7B7',
            fgDisabled: '#064E1A'
        }
    },
    feedback: {
        success: { bg: '#4ADE80', bgSubtle: 'rgba(74,222,128,0.1)', fg: '#050a05', fgSubtle: '#6EE7B7', border: '#4ADE80' },
        warning: { bg: '#FBBF24', bgSubtle: 'rgba(251,191,36,0.12)', fg: '#050a05', fgSubtle: '#FCD34D', border: '#FBBF24' },
        danger: { bg: '#F87171', bgSubtle: 'rgba(248,113,113,0.12)', fg: '#050a05', fgSubtle: '#FCA5A5', border: '#F87171' },
        info: { bg: '#60A5FA', bgSubtle: 'rgba(96,165,250,0.12)', fg: '#050a05', fgSubtle: '#93C5FD', border: '#60A5FA' }
    },
    overlay: { scrim: '#000000' }
}

const GEEK_RADIUS = { none: '0px', xs: '2px', sm: '2px', md: '4px', lg: '4px', xl: '4px', '2xl': '4px', full: '4px' }

const GEEK_TYPOGRAPHY = {
    family: { sans: GEEK_MONO, serif: GEEK_MONO, mono: GEEK_MONO }
}

const GEEK_SHADOW = {
    none: '0 0 0 0 rgba(0,0,0,0)',
    xs: '0 0 0 1px rgba(74,222,128,0.15)',
    sm: '0 0 0 1px rgba(74,222,128,0.15)',
    md: '0 0 16px rgba(74,222,128,0.4)',
    lg: '0 0 24px rgba(74,222,128,0.4)',
    xl: '0 0 36px rgba(74,222,128,0.45)'
}

const GEEK_COMPONENT: IDefault = {
    'origam-btn': { variant: 'flat', rounded: 'x-small' },
    'origam-card': { variant: 'outlined', rounded: 'x-small' },
    'origam-chip': { variant: 'outlined', rounded: 'x-small' }
}

const GEEK_SWATCH = 'linear-gradient(135deg, #050a05 50%, #4ADE80 50%)'

export const geekLightTheme: IOrigamTheme = {
    name: 'geek',
    mode: 'light',
    label: 'Geek',
    description: 'Terminal · mono · green',
    swatch: GEEK_SWATCH,
    component: { ...GEEK_COMPONENT },
    colors: GEEK_COLORS,
    radius: GEEK_RADIUS,
    typography: GEEK_TYPOGRAPHY,
    shadow: GEEK_SHADOW
}

export const geekDarkTheme: IOrigamTheme = {
    name: 'geek',
    mode: 'dark',
    label: 'Geek',
    description: 'Terminal · mono · green',
    swatch: GEEK_SWATCH,
    component: { ...GEEK_COMPONENT },
    colors: GEEK_COLORS,
    radius: GEEK_RADIUS,
    typography: GEEK_TYPOGRAPHY,
    shadow: GEEK_SHADOW
}
