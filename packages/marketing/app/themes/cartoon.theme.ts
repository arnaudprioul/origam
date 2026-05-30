import type { IDefault, IOrigamTheme } from 'origam/interfaces'

const CARTOON_COLORS = {
    surface: {
        default: '#FFFEFB',
        raised: '#FFFFFF',
        overlay: '#FEF3C7',
        sunken: '#FFFEFB',
        disabled: '#FEF3C7'
    },
    text: {
        primary: '#171717',
        secondary: '#404040',
        disabled: '#737373',
        inverse: '#FFFFFF',
        onColor: '#FFFFFF'
    },
    border: {
        default: '#171717',
        subtle: '#171717',
        strong: '#171717',
        focus: '#171717'
    },
    action: {
        primary: {
            bg: '#7C3AED',
            bgHover: '#5B21B6',
            bgSubtle: '#DDD6FE',
            bgDisabled: '#FEF3C7',
            fg: '#FFFFFF',
            fgSubtle: '#5B21B6',
            fgDisabled: '#737373'
        },
        secondary: {
            bg: '#FEF3C7',
            bgHover: '#FDE68A',
            bgDisabled: '#FFFEFB',
            fg: '#171717',
            fgDisabled: '#737373'
        },
        ghost: {
            bg: 'transparent',
            bgHover: '#DDD6FE',
            bgDisabled: 'transparent',
            fg: '#7C3AED',
            fgDisabled: '#737373'
        }
    },
    feedback: {
        success: { bg: '#15803D', bgSubtle: '#DCFCE7', fg: '#FFFFFF', fgSubtle: '#166534', border: '#171717' },
        warning: { bg: '#B45309', bgSubtle: '#FEF3C7', fg: '#FFFFFF', fgSubtle: '#92400E', border: '#171717' },
        danger: { bg: '#BE123C', bgSubtle: '#FFE4E6', fg: '#FFFFFF', fgSubtle: '#9F1239', border: '#171717' },
        info: { bg: '#1D4ED8', bgSubtle: '#DBEAFE', fg: '#FFFFFF', fgSubtle: '#1E40AF', border: '#171717' }
    },
    overlay: { scrim: '#171717' }
}

const CARTOON_RADIUS = { none: '0px', xs: '8px', sm: '8px', md: '14px', lg: '20px', xl: '20px', '2xl': '24px', full: '999px' }

const CARTOON_SHADOW = {
    none: '0 0 0 0 rgba(0,0,0,0)',
    xs: '3px 3px 0 #171717',
    sm: '5px 5px 0 #171717',
    md: '5px 5px 0 #171717',
    lg: '8px 8px 0 #171717',
    xl: '10px 10px 0 #171717'
}

const CARTOON_COMPONENT: IDefault = {
    'origam-btn': { variant: 'outlined', rounded: 'large' },
    'origam-card': { variant: 'outlined', rounded: 'large' },
    'origam-chip': { variant: 'outlined', rounded: 'pill' }
}

const CARTOON_SWATCH = 'linear-gradient(135deg, #FCD34D 0%, #7C3AED 50%, #EC4899 100%)'

export const cartoonLightTheme: IOrigamTheme = {
    name: 'cartoon',
    mode: 'light',
    label: 'Cartoon',
    description: 'Neo-brutalist · bold · playful',
    swatch: CARTOON_SWATCH,
    component: { ...CARTOON_COMPONENT },
    colors: CARTOON_COLORS,
    radius: CARTOON_RADIUS,
    shadow: CARTOON_SHADOW
}

export const cartoonDarkTheme: IOrigamTheme = {
    name: 'cartoon',
    mode: 'dark',
    label: 'Cartoon',
    description: 'Neo-brutalist · bold · playful',
    swatch: CARTOON_SWATCH,
    component: { ...CARTOON_COMPONENT },
    colors: CARTOON_COLORS,
    radius: CARTOON_RADIUS,
    shadow: CARTOON_SHADOW
}
