import type { IEnumDoc } from '~/interfaces/enums-catalog.interface'

export const BREAKPOINTS_ENUM_DOC: IEnumDoc = {
    slug: 'breakpoints',
    name: 'BREAKPOINTS',
    category: 'Layout & Sizing',
    descriptionKey: 'enums.catalog.breakpoints.description',
    descriptionFallback: 'TypeScript enum for responsive breakpoint tiers used in the grid system (xs, sm, md, lg, xl, xxl).',
    definition: `export enum BREAKPOINTS {
    XS  = 'xs',
    SM  = 'sm',
    MD  = 'md',
    LG  = 'lg',
    XL  = 'xl',
    XXL = 'xxl',
}`,
    values: [
        { value: 'BREAKPOINTS.XS', descriptionKey: 'enums.detail.breakpoints.xs', descriptionFallback: 'Extra small — targets viewports below the sm threshold.' },
        { value: 'BREAKPOINTS.SM', descriptionKey: 'enums.detail.breakpoints.sm', descriptionFallback: 'Small — targets small viewports (typically >= 600px).' },
        { value: 'BREAKPOINTS.MD', descriptionKey: 'enums.detail.breakpoints.md', descriptionFallback: 'Medium — targets medium viewports (typically >= 960px).' },
        { value: 'BREAKPOINTS.LG', descriptionKey: 'enums.detail.breakpoints.lg', descriptionFallback: 'Large — targets large viewports (typically >= 1280px).' },
        { value: 'BREAKPOINTS.XL', descriptionKey: 'enums.detail.breakpoints.xl', descriptionFallback: 'Extra large — targets extra-large viewports (typically >= 1920px).' },
        { value: 'BREAKPOINTS.XXL', descriptionKey: 'enums.detail.breakpoints.xxl', descriptionFallback: 'Double extra large — targets the widest viewports (typically >= 2560px).' },
    ],
    usedBy: [],
    sourceFile: 'packages/ds/src/enums/Commons/display.enum.ts',
    examples: [
        {
            titleKey: 'enums.detail.breakpoints.example',
            titleFallback: 'Using the enum in script setup',
            code: `import { BREAKPOINTS } from 'origam'

const breakpoint: BREAKPOINTS = BREAKPOINTS.MD`,
            lang: 'typescript',
        },
    ],
}
