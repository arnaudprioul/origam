import type { IUtilDoc } from '~/interfaces/utils-catalog.interface'

export const OOPS_UTIL_DOC: IUtilDoc = {
    slug: 'oops',
    name: 'oops',
    category: 'Commons',
    icon: 'mdi-alert-circle-outline',
    descriptionKey: 'utils.catalog.oops.description',
    descriptionFallback: 'Unconditionally throws an Error. Typed as returning `never`, making it usable as an exhaustiveness guard in switch/if chains where TypeScript must know all branches throw.',
    signature: `function oops(): never`,
    params: [],
    returns: {
        type: 'never',
        descriptionKey: 'utils.detail.oops.returns',
        descriptionFallback: 'Does not return — always throws an Error. The `never` return type lets TypeScript narrow exhaustively after the call site.',
    },
    sourceFile: 'packages/ds/src/utils/Commons/commons.util.ts',
    examples: [
        {
            titleKey: 'utils.detail.oops.example_exhaustive',
            titleFallback: 'Exhaustiveness guard in a switch',
            code: `import { oops } from 'origam'

type Direction = 'up' | 'down' | 'left' | 'right'

function move(dir: Direction): void {
  switch (dir) {
    case 'up':    return doUp()
    case 'down':  return doDown()
    case 'left':  return doLeft()
    case 'right': return doRight()
    default:      oops() // TypeScript error if a branch is missing
  }
}`,
            lang: 'typescript',
        },
    ],
    related: ['console-warn', 'console-error'],
}
