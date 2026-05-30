import type { IOrigamTheme } from 'origam/interfaces'

export const cartoonLightTheme: IOrigamTheme = {
    name: 'cartoon',
    mode: 'light',
    label: 'Cartoon',
    description: 'daisyUI · neo-brutalist',
    swatch: 'linear-gradient(135deg, #FCD34D 33%, #7C3AED 33% 66%, #EC4899 66%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'medium' },
        'origam-card': { variant: 'flat', rounded: 'large' },
        'origam-chip': { variant: 'flat', rounded: 'medium' }
    },
    colors: {
        surface: {
            default: '#FFFEFB',
            raised: '#FFFFFF',
            overlay: '#FEF3C7',
            sunken: '#FFF8E5',
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
            strong: '#000000',
            focus: '#7C3AED'
        },
        action: {
            primary: {
                bg: '#7C3AED',
                bgHover: '#5B21B6',
                bgSubtle: '#DDD6FE',
                bgDisabled: '#E5E5E5',
                fg: '#FFFFFF',
                fgSubtle: '#5B21B6',
                fgDisabled: '#737373'
            },
            secondary: {
                bg: '#FCD34D',
                bgHover: '#FBBF24',
                bgDisabled: '#FEF3C7',
                fg: '#171717',
                fgDisabled: '#737373'
            },
            ghost: {
                bg: 'transparent',
                bgHover: '#FEF3C7',
                bgDisabled: 'transparent',
                fg: '#7C3AED',
                fgDisabled: '#737373'
            }
        },
        feedback: {
            success: { bg: '#16A34A', bgSubtle: '#BBF7D0', fg: '#FFFFFF', fgSubtle: '#15803D', border: '#171717' },
            warning: { bg: '#FBBF24', bgSubtle: '#FEF3C7', fg: '#171717', fgSubtle: '#92400E', border: '#171717' },
            danger: { bg: '#EF4444', bgSubtle: '#FECDD3', fg: '#FFFFFF', fgSubtle: '#B91C1C', border: '#171717' },
            info: { bg: '#60A5FA', bgSubtle: '#DBEAFE', fg: '#171717', fgSubtle: '#1D4ED8', border: '#171717' }
        },
        overlay: { scrim: '#171717' }
    },
    radius: { sm: '8px', md: '14px', lg: '20px' },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '2px 2px 0 0 #171717',
        sm: '4px 4px 0 0 #171717',
        md: '4px 4px 0 0 #171717',
        lg: '6px 6px 0 0 #171717',
        xl: '8px 8px 0 0 #171717'
    }
}

export const cartoonDarkTheme: IOrigamTheme = {
    name: 'cartoon',
    mode: 'dark',
    label: 'Cartoon',
    description: 'daisyUI · neo-brutalist',
    swatch: 'linear-gradient(135deg, #FCD34D 33%, #7C3AED 33% 66%, #EC4899 66%)',
    component: {
        'origam-btn': { variant: 'flat', rounded: 'medium' },
        'origam-card': { variant: 'flat', rounded: 'large' },
        'origam-chip': { variant: 'flat', rounded: 'medium' }
    },
    colors: {
        surface: {
            default: '#1A1A1A',
            raised: '#262626',
            overlay: '#3D2E0A',
            sunken: '#0F0F0F',
            disabled: '#262626'
        },
        text: {
            primary: '#FFFEFB',
            secondary: '#D4D4D4',
            disabled: '#8A8A8A',
            inverse: '#171717',
            onColor: '#FFFFFF'
        },
        border: {
            default: '#FFFEFB',
            subtle: '#FFFEFB',
            strong: '#FFFFFF',
            focus: '#A78BFA'
        },
        action: {
            primary: {
                bg: '#A78BFA',
                bgHover: '#C4B5FD',
                bgSubtle: '#5B21B6',
                bgDisabled: '#404040',
                fg: '#171717',
                fgSubtle: '#C4B5FD',
                fgDisabled: '#8A8A8A'
            },
            secondary: {
                bg: '#FCD34D',
                bgHover: '#FBBF24',
                bgDisabled: '#404040',
                fg: '#171717',
                fgDisabled: '#8A8A8A'
            },
            ghost: {
                bg: 'transparent',
                bgHover: 'rgba(255,254,251,0.10)',
                bgDisabled: 'transparent',
                fg: '#A78BFA',
                fgDisabled: '#8A8A8A'
            }
        },
        feedback: {
            success: { bg: '#4ADE80', bgSubtle: '#14532D', fg: '#171717', fgSubtle: '#86EFAC', border: '#FFFEFB' },
            warning: { bg: '#FBBF24', bgSubtle: '#78350F', fg: '#171717', fgSubtle: '#FCD34D', border: '#FFFEFB' },
            danger: { bg: '#F87171', bgSubtle: '#7F1D1D', fg: '#171717', fgSubtle: '#FCA5A5', border: '#FFFEFB' },
            info: { bg: '#60A5FA', bgSubtle: '#1E3A8A', fg: '#171717', fgSubtle: '#93C5FD', border: '#FFFEFB' }
        },
        overlay: { scrim: '#000000' }
    },
    radius: { sm: '8px', md: '14px', lg: '20px' },
    shadow: {
        none: '0 0 0 0 rgba(0,0,0,0)',
        xs: '2px 2px 0 0 #FFFEFB',
        sm: '4px 4px 0 0 #FFFEFB',
        md: '4px 4px 0 0 #FFFEFB',
        lg: '6px 6px 0 0 #FFFEFB',
        xl: '8px 8px 0 0 #FFFEFB'
    }
}
