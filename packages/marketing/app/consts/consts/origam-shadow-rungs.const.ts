import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_SHADOW_RUNGS_CONST_DOC: IConstDoc = {
    slug: 'origam-shadow-rungs',
    name: 'ORIGAM_SHADOW_RUNGS',
    category: 'Layout & Sizing',
    descriptionKey: 'consts.catalog.origam_shadow_rungs.description',
    descriptionFallback: 'ReadonlySet of named shadow-rung identifiers accepted by the elevation prop. Each rung maps to a --origam-shadow-{rung} CSS custom property. Numeric elevation values are handled separately via elevationToToken.',
    definition: `export const ORIGAM_SHADOW_RUNGS: ReadonlySet<string> = new Set([
    'none', 'xs', 'sm', 'md', 'lg', 'xl', '2xl', '3xl'
])`,
    values: [
        { value: `'none'`, descriptionKey: 'consts.detail.origam_shadow_rungs.none', descriptionFallback: 'No shadow.' },
        { value: `'xs'`, descriptionKey: 'consts.detail.origam_shadow_rungs.xs', descriptionFallback: 'Extra-small shadow.' },
        { value: `'sm'`, descriptionKey: 'consts.detail.origam_shadow_rungs.sm', descriptionFallback: 'Small shadow.' },
        { value: `'md'`, descriptionKey: 'consts.detail.origam_shadow_rungs.md', descriptionFallback: 'Medium shadow.' },
        { value: `'lg'`, descriptionKey: 'consts.detail.origam_shadow_rungs.lg', descriptionFallback: 'Large shadow.' },
        { value: `'xl'`, descriptionKey: 'consts.detail.origam_shadow_rungs.xl', descriptionFallback: 'Extra-large shadow.' },
        { value: `'2xl'`, descriptionKey: 'consts.detail.origam_shadow_rungs.2xl', descriptionFallback: '2× extra-large shadow (no utility class in Phase 1 — falls back to inline style).' },
        { value: `'3xl'`, descriptionKey: 'consts.detail.origam_shadow_rungs.3xl', descriptionFallback: '3× extra-large shadow (no utility class in Phase 1 — falls back to inline style).' },
    ],
    usedBy: [
        { name: 'useElevation' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/elevation.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_shadow_rungs.example',
            titleFallback: 'Checking whether an elevation value is a named rung',
            code: `import { ORIGAM_SHADOW_RUNGS } from 'origam'

const isNamedRung = (v: string) => ORIGAM_SHADOW_RUNGS.has(v)
isNamedRung('md')   // true
isNamedRung('8')    // false — numeric, resolved separately`,
            lang: 'typescript',
        },
    ],
}
