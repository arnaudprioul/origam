import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const UTILITY_SHADOW_RUNGS_CONST_DOC: IConstDoc = {
    slug: 'utility-shadow-rungs',
    name: 'UTILITY_SHADOW_RUNGS',
    category: 'Elevation & Shadows',
    descriptionKey: 'consts.catalog.utility_shadow_rungs.description',
    descriptionFallback: 'Subset of shadow rungs (none, xs, sm, md, lg, xl) for which a global utility class exists in origam-utilities.css. The 2xl and 3xl rungs are not yet emitted as utilities and fall back to inline styles.',
    definition: `export const UTILITY_SHADOW_RUNGS: ReadonlySet<string> = new Set([
    'none', 'xs', 'sm', 'md', 'lg', 'xl'
])`,
    values: [
        { value: "'none'", descriptionKey: 'consts.detail.utility_shadow_rungs.none', descriptionFallback: 'No shadow — maps to --origam-shadow-none.' },
        { value: "'xs'", descriptionKey: 'consts.detail.utility_shadow_rungs.xs', descriptionFallback: 'Extra-small shadow.' },
        { value: "'sm'", descriptionKey: 'consts.detail.utility_shadow_rungs.sm', descriptionFallback: 'Small shadow.' },
        { value: "'md'", descriptionKey: 'consts.detail.utility_shadow_rungs.md', descriptionFallback: 'Medium shadow.' },
        { value: "'lg'", descriptionKey: 'consts.detail.utility_shadow_rungs.lg', descriptionFallback: 'Large shadow.' },
        { value: "'xl'", descriptionKey: 'consts.detail.utility_shadow_rungs.xl', descriptionFallback: 'Extra-large shadow.' },
    ],
    usedBy: [
        { name: 'useElevation' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/elevation.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.utility_shadow_rungs.example',
            titleFallback: 'Check if an elevation value maps to a utility class',
            code: `import { UTILITY_SHADOW_RUNGS } from 'origam'

const hasClass = UTILITY_SHADOW_RUNGS.has(elevation)
// true for 'none'|'xs'|'sm'|'md'|'lg'|'xl'`,
            lang: 'typescript',
        },
    ],
}
