import type { IOrigamTheme } from 'origam/interfaces'

const GEEK_MONO = "'JetBrains Mono', 'Fira Code', ui-monospace, SFMono-Regular, Menlo, monospace"

export const geekLightTheme: IOrigamTheme = {
    name: 'geek',
    mode: 'light',
    label: 'Geek',
    description: 'Terminal · mono · green',
    swatch: 'linear-gradient(135deg, #050a05 50%, #16A34A 50%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'x-small' },
        'origam-card': { variant: 'outlined', rounded: 'x-small' },
        'origam-chip': { variant: 'outlined', rounded: 'x-small' }
    },
    colors: {
        surface: {
            default: '#F2FBF4',
            raised: '#FFFFFF',
            overlay: '#E3F7E8',
            sunken: '#E9F9ED',
            disabled: '#DCEFE1'
        },
        text: {
            primary: '#0B3D1E',
            secondary: '#15803D',
            disabled: '#6FA985',
            inverse: '#F2FBF4',
            onColor: '#F2FBF4'
        },
        border: {
            default: 'rgba(11,61,30,0.22)',
            subtle: 'rgba(11,61,30,0.10)',
            strong: 'rgba(11,61,30,0.50)',
            focus: '#15803D'
        },
        action: {
            primary: {
                bg: '#15803D',
                bgHover: '#0B5F2B',
                bgSubtle: 'rgba(21,128,61,0.10)',
                bgDisabled: '#DCEFE1',
                fg: '#F2FBF4',
                fgSubtle: '#15803D',
                fgDisabled: '#6FA985'
            },
            secondary: {
                bg: '#DCEFE1',
                bgHover: '#C6E6CF',
                bgDisabled: '#E9F9ED',
                fg: '#0B3D1E',
                fgDisabled: '#6FA985'
            },
            ghost: {
                bg: 'transparent',
                bgHover: 'rgba(21,128,61,0.10)',
                bgDisabled: 'transparent',
                fg: '#15803D',
                fgDisabled: '#6FA985'
            }
        },
        feedback: {
            success: { bg: '#15803D', bgSubtle: 'rgba(21,128,61,0.10)', fg: '#FFFFFF', fgSubtle: '#0B5F2B', border: '#15803D' },
            warning: { bg: '#B45309', bgSubtle: 'rgba(180,83,9,0.10)', fg: '#FFFFFF', fgSubtle: '#92400E', border: '#B45309' },
            danger: { bg: '#B91C1C', bgSubtle: 'rgba(185,28,28,0.10)', fg: '#FFFFFF', fgSubtle: '#991B1B', border: '#B91C1C' },
            info: { bg: '#1D4ED8', bgSubtle: 'rgba(29,78,216,0.10)', fg: '#FFFFFF', fgSubtle: '#1E40AF', border: '#1D4ED8' }
        },
        overlay: { scrim: '#0B3D1E' }
    },
    radius: { none: '0px', xs: '2px', sm: '2px', md: '3px', lg: '4px', xl: '4px', '2xl': '6px', full: '4px' },
    typography: {
        family: { sans: GEEK_MONO, serif: GEEK_MONO, mono: GEEK_MONO }
    },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 0 0 1px rgba(21,128,61,0.18)',
        sm: '0 1px 0 0 rgba(21,128,61,0.25)',
        md: '0 2px 0 0 rgba(21,128,61,0.30)',
        lg: '0 3px 0 0 rgba(21,128,61,0.35)',
        xl: '0 4px 0 0 rgba(21,128,61,0.40)'
    }
}

export const geekDarkTheme: IOrigamTheme = {
    name: 'geek',
    mode: 'dark',
    label: 'Geek',
    description: 'Terminal · mono · green',
    swatch: 'linear-gradient(135deg, #050a05 50%, #4ADE80 50%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'x-small' },
        'origam-card': { variant: 'outlined', rounded: 'x-small' },
        'origam-chip': { variant: 'outlined', rounded: 'x-small' }
    },
    colors: {
        surface: {
            default: '#04140A',
            raised: '#0A2114',
            overlay: '#0E2A19',
            sunken: '#020D06',
            disabled: '#0A2114'
        },
        text: {
            primary: '#7CF7A8',
            secondary: '#86EFAC',
            disabled: '#3F7E59',
            inverse: '#04140A',
            onColor: '#04140A'
        },
        border: {
            default: 'rgba(124,247,168,0.22)',
            subtle: 'rgba(124,247,168,0.10)',
            strong: 'rgba(124,247,168,0.45)',
            focus: '#7CF7A8'
        },
        action: {
            primary: {
                bg: '#22C55E',
                bgHover: '#4ADE80',
                bgSubtle: 'rgba(34,197,94,0.18)',
                bgDisabled: '#0E2A19',
                fg: '#04140A',
                fgSubtle: '#86EFAC',
                fgDisabled: '#3F7E59'
            },
            secondary: {
                bg: '#0E2A19',
                bgHover: '#143C24',
                bgDisabled: '#0A2114',
                fg: '#7CF7A8',
                fgDisabled: '#3F7E59'
            },
            ghost: {
                bg: 'transparent',
                bgHover: 'rgba(124,247,168,0.10)',
                bgDisabled: 'transparent',
                fg: '#86EFAC',
                fgDisabled: '#3F7E59'
            }
        },
        feedback: {
            success: { bg: '#22C55E', bgSubtle: 'rgba(34,197,94,0.18)', fg: '#04140A', fgSubtle: '#86EFAC', border: '#22C55E' },
            warning: { bg: '#FBBF24', bgSubtle: 'rgba(251,191,36,0.18)', fg: '#04140A', fgSubtle: '#FCD34D', border: '#FBBF24' },
            danger: { bg: '#FCA5A5', bgSubtle: 'rgba(252,165,165,0.18)', fg: '#04140A', fgSubtle: '#FCA5A5', border: '#FCA5A5' },
            info: { bg: '#93C5FD', bgSubtle: 'rgba(147,197,253,0.18)', fg: '#04140A', fgSubtle: '#93C5FD', border: '#93C5FD' }
        },
        overlay: { scrim: '#000000' }
    },
    radius: { none: '0px', xs: '2px', sm: '2px', md: '3px', lg: '4px', xl: '4px', '2xl': '6px', full: '4px' },
    typography: {
        family: { sans: GEEK_MONO, serif: GEEK_MONO, mono: GEEK_MONO }
    },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '0 0 4px 0 rgba(34,197,94,0.40)',
        sm: '0 0 8px 1px rgba(34,197,94,0.45)',
        md: '0 0 14px 2px rgba(34,197,94,0.45)',
        lg: '0 0 24px 4px rgba(34,197,94,0.50)',
        xl: '0 0 36px 6px rgba(34,197,94,0.55)'
    }
}
