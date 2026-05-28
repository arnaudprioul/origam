import type { IMarketingTheme } from '~/interfaces/marketing-theme.interface'

export const MARKETING_THEMES: ReadonlyArray<IMarketingTheme> = [
    {
        id: 'sobre',
        label: 'Sobre',
        desc: 'Linear · Vercel-style',
        swatch: 'linear-gradient(135deg, #0A0A0A 50%, #8B5CF6 50%)'
    },
    {
        id: 'glass',
        label: 'Glass',
        desc: 'Frosted · luminous',
        swatch: 'linear-gradient(135deg, #1A1730 0%, #A78BFA 50%, #2DD4BF 100%)'
    },
    {
        id: 'geek',
        label: 'Geek',
        desc: 'Terminal · mono · green',
        swatch: 'linear-gradient(135deg, #050a05 50%, #4ADE80 50%)'
    },
    {
        id: 'cartoon',
        label: 'Cartoon',
        desc: 'daisyUI · neo-brutalist',
        swatch: 'linear-gradient(135deg, #FCD34D 33%, #7C3AED 33% 66%, #EC4899 66%)'
    },
    {
        id: 'editorial',
        label: 'Editorial',
        desc: 'Magazine · serif',
        swatch: 'linear-gradient(135deg, #0A0A0A 50%, #A78BFA 50%)'
    },
    {
        id: 'material',
        label: 'Material',
        desc: 'Google Material 3',
        swatch: 'linear-gradient(135deg, #1C1B1F 50%, #D0BCFF 50%)'
    },
    {
        id: 'ecom',
        label: 'Ecom',
        desc: 'AliExpress · Amazon vibe',
        swatch: 'linear-gradient(135deg, #E11D48 0%, #EA580C 50%, #F59E0B 100%)'
    },
    {
        id: 'apple',
        label: 'Apple',
        desc: 'Premium · minimal · clean',
        swatch: 'linear-gradient(135deg, #fff 0%, #F5F5F7 50%, #0071E3 100%)'
    }
] as const
