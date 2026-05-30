import type { IDefault, IOrigamTheme } from 'origam/interfaces'

const MATERIAL_COLORS = {
    surface: {
        default: '#1C1B1F',
        raised: '#2B2930',
        overlay: '#36343B',
        sunken: '#1C1B1F',
        disabled: '#36343B'
    },
    text: {
        primary: '#E6E1E5',
        secondary: '#CAC4D0',
        disabled: '#79747E',
        inverse: '#1C1B1F',
        onColor: '#381E72'
    },
    border: {
        default: 'rgba(202,196,208,0.12)',
        subtle: 'rgba(202,196,208,0.06)',
        strong: 'rgba(202,196,208,0.3)',
        focus: 'rgba(208,188,255,0.4)'
    },
    action: {
        primary: {
            bg: '#D0BCFF',
            bgHover: '#EADDFF',
            bgSubtle: '#4A4458',
            bgDisabled: '#36343B',
            fg: '#381E72',
            fgSubtle: '#EADDFF',
            fgDisabled: '#79747E'
        },
        secondary: {
            bg: '#4A4458',
            bgHover: '#5A5468',
            bgDisabled: '#36343B',
            fg: '#E6E1E5',
            fgDisabled: '#79747E'
        },
        ghost: {
            bg: 'transparent',
            bgHover: 'rgba(208,188,255,0.12)',
            bgDisabled: 'transparent',
            fg: '#D0BCFF',
            fgDisabled: '#79747E'
        }
    },
    feedback: {
        success: { bg: '#6EE7B7', bgSubtle: 'rgba(110,231,183,0.16)', fg: '#1C1B1F', fgSubtle: '#86EFAC', border: '#6EE7B7' },
        warning: { bg: '#FBBF24', bgSubtle: 'rgba(251,191,36,0.16)', fg: '#1C1B1F', fgSubtle: '#FCD34D', border: '#FBBF24' },
        danger: { bg: '#F2B8B5', bgSubtle: 'rgba(242,184,181,0.16)', fg: '#601410', fgSubtle: '#F2B8B5', border: '#F2B8B5' },
        info: { bg: '#D0BCFF', bgSubtle: 'rgba(208,188,255,0.16)', fg: '#381E72', fgSubtle: '#EADDFF', border: '#D0BCFF' }
    },
    overlay: { scrim: '#000000' }
}

const MATERIAL_RADIUS = { none: '0px', xs: '12px', sm: '12px', md: '16px', lg: '28px', xl: '28px', '2xl': '28px', full: '999px' }

const MATERIAL_SHADOW = {
    none: '0 0 0 0 rgba(0,0,0,0)',
    xs: '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
    sm: '0 1px 2px rgba(0,0,0,0.3), 0 1px 3px 1px rgba(0,0,0,0.15)',
    md: '0 1px 2px rgba(0,0,0,0.3), 0 2px 6px 2px rgba(208,188,255,0.15)',
    lg: '0 6px 10px 4px rgba(0,0,0,0.15), 0 2px 3px rgba(0,0,0,0.3)',
    xl: '0 8px 12px 6px rgba(0,0,0,0.15), 0 4px 4px rgba(0,0,0,0.3)'
}

const MATERIAL_COMPONENT: IDefault = {
    'origam-btn': { variant: 'flat', rounded: 'pill' },
    'origam-card': { variant: 'flat', rounded: 'x-large', elevation: 1 },
    'origam-chip': { variant: 'tonal', rounded: 'pill' }
}

const MATERIAL_SWATCH = 'linear-gradient(135deg, #1C1B1F 0%, #4A4458 50%, #D0BCFF 100%)'

export const materialLightTheme: IOrigamTheme = {
    name: 'material',
    mode: 'light',
    label: 'Material',
    description: 'Material You · tonal · elevated',
    swatch: MATERIAL_SWATCH,
    component: { ...MATERIAL_COMPONENT },
    colors: MATERIAL_COLORS,
    radius: MATERIAL_RADIUS,
    shadow: MATERIAL_SHADOW
}

export const materialDarkTheme: IOrigamTheme = {
    name: 'material',
    mode: 'dark',
    label: 'Material',
    description: 'Material You · tonal · elevated',
    swatch: MATERIAL_SWATCH,
    component: { ...MATERIAL_COMPONENT },
    colors: MATERIAL_COLORS,
    radius: MATERIAL_RADIUS,
    shadow: MATERIAL_SHADOW
}
