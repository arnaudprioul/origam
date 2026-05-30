import type { IOrigamTheme } from 'origam/interfaces'

const EDITORIAL_SERIF = "'Fraunces', 'Playfair Display', Georgia, 'Times New Roman', serif"

export const editorialLightTheme: IOrigamTheme = {
    name: 'editorial',
    mode: 'light',
    label: 'Editorial',
    description: 'Magazine · serif',
    swatch: 'linear-gradient(135deg, #0A0A0A 50%, #5B21B6 50%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'x-small' },
        'origam-card': { variant: 'outlined', rounded: 'x-small' },
        'origam-chip': { variant: 'outlined', rounded: 'x-small' }
    },
    colors: {
        surface: {
            default: '#FAFAF7',
            raised: '#FFFFFF',
            overlay: '#F5F5F0',
            sunken: '#EFEEEA',
            disabled: '#E6E6E6'
        },
        text: {
            primary: '#0A0A0A',
            secondary: '#404040',
            disabled: '#A3A3A3',
            inverse: '#FFFFFF',
            onColor: '#FFFFFF'
        },
        border: {
            default: 'rgba(0,0,0,0.10)',
            subtle: 'rgba(0,0,0,0.05)',
            strong: 'rgba(0,0,0,0.20)',
            focus: '#5B21B6'
        },
        action: {
            primary: {
                bg: '#5B21B6',
                bgHover: '#4C1D95',
                bgSubtle: 'rgba(91,33,182,0.10)',
                bgDisabled: '#E6E6E6',
                fg: '#FFFFFF',
                fgSubtle: '#4C1D95',
                fgDisabled: '#A3A3A3'
            },
            secondary: {
                bg: '#F5F5F0',
                bgHover: '#EFEEEA',
                bgDisabled: '#FAFAF7',
                fg: '#0A0A0A',
                fgDisabled: '#A3A3A3'
            },
            ghost: {
                bg: 'transparent',
                bgHover: 'rgba(0,0,0,0.05)',
                bgDisabled: 'transparent',
                fg: '#5B21B6',
                fgDisabled: '#A3A3A3'
            }
        },
        feedback: {
            success: { bg: '#15803D', bgSubtle: 'rgba(21,128,61,0.08)', fg: '#FFFFFF', fgSubtle: '#166534', border: '#15803D' },
            warning: { bg: '#B45309', bgSubtle: 'rgba(180,83,9,0.08)', fg: '#FFFFFF', fgSubtle: '#92400E', border: '#B45309' },
            danger: { bg: '#B91C1C', bgSubtle: 'rgba(185,28,28,0.08)', fg: '#FFFFFF', fgSubtle: '#991B1B', border: '#B91C1C' },
            info: { bg: '#1D4ED8', bgSubtle: 'rgba(29,78,216,0.08)', fg: '#FFFFFF', fgSubtle: '#1E40AF', border: '#1D4ED8' }
        },
        overlay: { scrim: '#000000' }
    },
    radius: { none: '0px', xs: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px', '2xl': '0px', full: '0px' },
    typography: {
        family: { sans: EDITORIAL_SERIF, serif: EDITORIAL_SERIF }
    },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 0 0 0 rgba(0,0,0,0)',
        sm: '0 1px 0 0 rgba(10,10,10,0.15)',
        md: '0 2px 0 0 rgba(10,10,10,0.18)',
        lg: '0 3px 0 0 rgba(10,10,10,0.22)',
        xl: '0 4px 0 0 rgba(10,10,10,0.25)'
    }
}

export const editorialDarkTheme: IOrigamTheme = {
    name: 'editorial',
    mode: 'dark',
    label: 'Editorial',
    description: 'Magazine · serif',
    swatch: 'linear-gradient(135deg, #0A0A0A 50%, #A78BFA 50%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'x-small' },
        'origam-card': { variant: 'outlined', rounded: 'x-small' },
        'origam-chip': { variant: 'outlined', rounded: 'x-small' }
    },
    colors: {
        surface: {
            default: '#0A0A0A',
            raised: '#0E0E0E',
            overlay: '#131313',
            sunken: '#050505',
            disabled: '#171717'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#D4D4D4',
            disabled: '#737373',
            inverse: '#0A0A0A',
            onColor: '#FFFFFF'
        },
        border: {
            default: 'rgba(255,255,255,0.10)',
            subtle: 'rgba(255,255,255,0.05)',
            strong: 'rgba(255,255,255,0.20)',
            focus: '#A78BFA'
        },
        action: {
            primary: {
                bg: '#A78BFA',
                bgHover: '#C4B5FD',
                bgSubtle: 'rgba(167,139,250,0.14)',
                bgDisabled: '#171717',
                fg: '#0A0A0A',
                fgSubtle: '#C4B5FD',
                fgDisabled: '#737373'
            },
            secondary: {
                bg: '#131313',
                bgHover: '#1F1F1F',
                bgDisabled: '#0E0E0E',
                fg: '#FFFFFF',
                fgDisabled: '#737373'
            },
            ghost: {
                bg: 'transparent',
                bgHover: 'rgba(255,255,255,0.06)',
                bgDisabled: 'transparent',
                fg: '#A78BFA',
                fgDisabled: '#737373'
            }
        },
        feedback: {
            success: { bg: '#6EE7B7', bgSubtle: 'rgba(110,231,183,0.12)', fg: '#0A0A0A', fgSubtle: '#6EE7B7', border: '#6EE7B7' },
            warning: { bg: '#FCD34D', bgSubtle: 'rgba(252,211,77,0.12)', fg: '#0A0A0A', fgSubtle: '#FCD34D', border: '#FCD34D' },
            danger: { bg: '#FCA5A5', bgSubtle: 'rgba(252,165,165,0.12)', fg: '#0A0A0A', fgSubtle: '#FCA5A5', border: '#FCA5A5' },
            info: { bg: '#93C5FD', bgSubtle: 'rgba(147,197,253,0.12)', fg: '#0A0A0A', fgSubtle: '#93C5FD', border: '#93C5FD' }
        },
        overlay: { scrim: '#000000' }
    },
    radius: { none: '0px', xs: '0px', sm: '0px', md: '0px', lg: '0px', xl: '0px', '2xl': '0px', full: '0px' },
    typography: {
        family: { sans: EDITORIAL_SERIF, serif: EDITORIAL_SERIF }
    },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 0 0 0 rgba(0,0,0,0)',
        sm: '0 1px 0 0 rgba(255,255,255,0.10)',
        md: '0 2px 0 0 rgba(255,255,255,0.12)',
        lg: '0 3px 0 0 rgba(255,255,255,0.15)',
        xl: '0 4px 0 0 rgba(255,255,255,0.18)'
    }
}
