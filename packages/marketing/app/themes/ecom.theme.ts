import type { IOrigamTheme } from 'origam/interfaces'

export const ecomLightTheme: IOrigamTheme = {
    name: 'ecom',
    mode: 'light',
    label: 'Ecom',
    description: 'AliExpress · Amazon vibe',
    swatch: 'linear-gradient(135deg, #E11D48 0%, #EA580C 50%, #F59E0B 100%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'small' },
        'origam-card': { variant: 'outlined', rounded: 'small' },
        'origam-chip': { variant: 'flat', rounded: 'small' }
    },
    colors: {
        surface: {
            default: '#FFF7F0',
            raised: '#FFFFFF',
            overlay: '#FFEDD5',
            sunken: '#FFF1E1',
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
            focus: '#E11D48'
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
                bg: '#C2410C',
                bgHover: '#9A3412',
                bgDisabled: '#FFEDD5',
                fg: '#FFFFFF',
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
            info: { bg: '#0284C7', bgSubtle: '#E0F2FE', fg: '#FFFFFF', fgSubtle: '#075985', border: '#0284C7' }
        },
        overlay: { scrim: '#1A1A1A' }
    },
    radius: { sm: '4px', md: '6px', lg: '10px' },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 1px 3px 0 rgba(26,26,26,0.08)',
        sm: '0 2px 8px 0 rgba(26,26,26,0.10)',
        md: '0 4px 16px 0 rgba(26,26,26,0.12)',
        lg: '0 8px 28px -2px rgba(26,26,26,0.14)',
        xl: '0 12px 40px -4px rgba(26,26,26,0.16)'
    }
}

export const ecomDarkTheme: IOrigamTheme = {
    name: 'ecom',
    mode: 'dark',
    label: 'Ecom',
    description: 'AliExpress · Amazon vibe',
    swatch: 'linear-gradient(135deg, #F43F5E 0%, #EA580C 50%, #FBBF24 100%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'small' },
        'origam-card': { variant: 'outlined', rounded: 'small' },
        'origam-chip': { variant: 'flat', rounded: 'small' }
    },
    colors: {
        surface: {
            default: '#1A0F0A',
            raised: '#231510',
            overlay: '#2E1B14',
            sunken: '#120906',
            disabled: '#2E1B14'
        },
        text: {
            primary: '#FFF7F0',
            secondary: '#FBCFA0',
            disabled: '#A3786A',
            inverse: '#1A0F0A',
            onColor: '#FFFFFF'
        },
        border: {
            default: 'rgba(251,146,60,0.20)',
            subtle: 'rgba(251,146,60,0.10)',
            strong: '#FB923C',
            focus: '#F87171'
        },
        action: {
            primary: {
                bg: '#F43F5E',
                bgHover: '#E11D48',
                bgSubtle: 'rgba(244,63,94,0.14)',
                bgDisabled: '#2E1B14',
                fg: '#FFFFFF',
                fgSubtle: '#FB7185',
                fgDisabled: '#A3786A'
            },
            secondary: {
                bg: '#EA580C',
                bgHover: '#FB923C',
                bgDisabled: '#2E1B14',
                fg: '#FFFFFF',
                fgDisabled: '#A3786A'
            },
            ghost: {
                bg: 'transparent',
                bgHover: 'rgba(244,63,94,0.10)',
                bgDisabled: 'transparent',
                fg: '#FB7185',
                fgDisabled: '#A3786A'
            }
        },
        feedback: {
            success: { bg: '#4ADE80', bgSubtle: 'rgba(74,222,128,0.14)', fg: '#1A0F0A', fgSubtle: '#86EFAC', border: '#4ADE80' },
            warning: { bg: '#FBBF24', bgSubtle: 'rgba(251,191,36,0.14)', fg: '#1A0F0A', fgSubtle: '#FCD34D', border: '#FBBF24' },
            danger: { bg: '#F87171', bgSubtle: 'rgba(248,113,113,0.14)', fg: '#1A0F0A', fgSubtle: '#FCA5A5', border: '#F87171' },
            info: { bg: '#60A5FA', bgSubtle: 'rgba(96,165,250,0.14)', fg: '#1A0F0A', fgSubtle: '#93C5FD', border: '#60A5FA' }
        },
        overlay: { scrim: '#000000' }
    },
    radius: { sm: '4px', md: '6px', lg: '10px' },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 1px 4px 0 rgba(0,0,0,0.45)',
        sm: '0 2px 8px 0 rgba(0,0,0,0.48)',
        md: '0 4px 16px 0 rgba(0,0,0,0.50)',
        lg: '0 8px 28px -2px rgba(0,0,0,0.55)',
        xl: '0 12px 40px -4px rgba(0,0,0,0.60)'
    }
}
