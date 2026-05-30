import type { IOrigamTheme } from 'origam/interfaces'

export const glassLightTheme: IOrigamTheme = {
    name: 'glass',
    mode: 'light',
    label: 'Glass',
    description: 'Frosted · luminous',
    swatch: 'linear-gradient(135deg, #1A1730 0%, #A78BFA 50%, #2DD4BF 100%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'x-large' },
        'origam-card': { variant: 'flat', rounded: 'large', elevation: 3 },
        'origam-chip': { variant: 'tonal', rounded: 'large' }
    },
    colors: {
        surface: {
            default: '#F5F3FF',
            raised: 'rgba(255,255,255,0.65)',
            overlay: 'rgba(255,255,255,0.85)',
            sunken: '#EDE9FE',
            disabled: 'rgba(255,255,255,0.45)'
        },
        text: {
            primary: '#1E1B4B',
            secondary: '#5B21B6',
            disabled: '#8B7FC7',
            inverse: '#FFFFFF',
            onColor: '#FFFFFF'
        },
        border: {
            default: 'rgba(124,58,237,0.20)',
            subtle: 'rgba(124,58,237,0.10)',
            strong: 'rgba(124,58,237,0.35)',
            focus: '#7C3AED'
        },
        action: {
            primary: {
                bg: '#7C3AED',
                bgHover: '#6D28D9',
                bgSubtle: 'rgba(124,58,237,0.10)',
                bgDisabled: 'rgba(167,139,250,0.30)',
                fg: '#FFFFFF',
                fgSubtle: '#6D28D9',
                fgDisabled: '#8B7FC7'
            },
            secondary: {
                bg: 'rgba(255,255,255,0.70)',
                bgHover: 'rgba(255,255,255,0.90)',
                bgDisabled: 'rgba(255,255,255,0.40)',
                fg: '#1E1B4B',
                fgDisabled: '#8B7FC7'
            },
            ghost: {
                bg: 'transparent',
                bgHover: 'rgba(124,58,237,0.08)',
                bgDisabled: 'transparent',
                fg: '#6D28D9',
                fgDisabled: '#8B7FC7'
            }
        },
        feedback: {
            success: { bg: '#15803D', bgSubtle: 'rgba(21,128,61,0.10)', fg: '#FFFFFF', fgSubtle: '#166534', border: '#15803D' },
            warning: { bg: '#B45309', bgSubtle: 'rgba(180,83,9,0.10)', fg: '#FFFFFF', fgSubtle: '#92400E', border: '#B45309' },
            danger: { bg: '#DC2626', bgSubtle: 'rgba(220,38,38,0.10)', fg: '#FFFFFF', fgSubtle: '#B91C1C', border: '#DC2626' },
            info: { bg: '#2563EB', bgSubtle: 'rgba(37,99,235,0.10)', fg: '#FFFFFF', fgSubtle: '#1D4ED8', border: '#2563EB' }
        },
        overlay: { scrim: '#1E1B4B' }
    },
    radius: { sm: '10px', md: '16px', lg: '22px' },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 4px 16px 0 rgba(124,58,237,0.10)',
        sm: '0 8px 24px 0 rgba(124,58,237,0.15)',
        md: '0 12px 36px -2px rgba(124,58,237,0.18)',
        lg: '0 20px 60px -4px rgba(124,58,237,0.22)',
        xl: '0 28px 80px -6px rgba(124,58,237,0.28)'
    }
}

export const glassDarkTheme: IOrigamTheme = {
    name: 'glass',
    mode: 'dark',
    label: 'Glass',
    description: 'Frosted · luminous',
    swatch: 'linear-gradient(135deg, #1A1730 0%, #A78BFA 50%, #2DD4BF 100%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'x-large' },
        'origam-card': { variant: 'flat', rounded: 'large', elevation: 3 },
        'origam-chip': { variant: 'tonal', rounded: 'large' }
    },
    colors: {
        surface: {
            default: '#0F0E1A',
            raised: 'rgba(255,255,255,0.06)',
            overlay: 'rgba(255,255,255,0.04)',
            sunken: '#0A0917',
            disabled: 'rgba(255,255,255,0.03)'
        },
        text: {
            primary: '#FFFFFF',
            secondary: '#C4B5FD',
            disabled: '#6B5FAF',
            inverse: '#0F0E1A',
            onColor: '#FFFFFF'
        },
        border: {
            default: 'rgba(255,255,255,0.12)',
            subtle: 'rgba(255,255,255,0.06)',
            strong: 'rgba(255,255,255,0.20)',
            focus: '#DDD6FE'
        },
        action: {
            primary: {
                bg: '#A78BFA',
                bgHover: '#DDD6FE',
                bgSubtle: 'rgba(167,139,250,0.14)',
                bgDisabled: 'rgba(255,255,255,0.06)',
                fg: '#0F0E1A',
                fgSubtle: '#DDD6FE',
                fgDisabled: '#6B5FAF'
            },
            secondary: {
                bg: 'rgba(255,255,255,0.06)',
                bgHover: 'rgba(255,255,255,0.12)',
                bgDisabled: 'rgba(255,255,255,0.03)',
                fg: '#FFFFFF',
                fgDisabled: '#6B5FAF'
            },
            ghost: {
                bg: 'transparent',
                bgHover: 'rgba(255,255,255,0.06)',
                bgDisabled: 'transparent',
                fg: '#DDD6FE',
                fgDisabled: '#6B5FAF'
            }
        },
        feedback: {
            success: { bg: '#6EE7B7', bgSubtle: 'rgba(110,231,183,0.14)', fg: '#0F0E1A', fgSubtle: '#6EE7B7', border: '#6EE7B7' },
            warning: { bg: '#FCD34D', bgSubtle: 'rgba(252,211,77,0.14)', fg: '#0F0E1A', fgSubtle: '#FCD34D', border: '#FCD34D' },
            danger: { bg: '#FCA5A5', bgSubtle: 'rgba(252,165,165,0.14)', fg: '#0F0E1A', fgSubtle: '#FCA5A5', border: '#FCA5A5' },
            info: { bg: '#93C5FD', bgSubtle: 'rgba(147,197,253,0.14)', fg: '#0F0E1A', fgSubtle: '#93C5FD', border: '#93C5FD' }
        },
        overlay: { scrim: '#0F0E1A' }
    },
    radius: { sm: '10px', md: '16px', lg: '22px' },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 4px 16px 0 rgba(167,139,250,0.20)',
        sm: '0 8px 28px 0 rgba(167,139,250,0.28)',
        md: '0 12px 40px -2px rgba(167,139,250,0.32)',
        lg: '0 20px 64px -4px rgba(167,139,250,0.38)',
        xl: '0 28px 90px -6px rgba(167,139,250,0.44)'
    }
}
