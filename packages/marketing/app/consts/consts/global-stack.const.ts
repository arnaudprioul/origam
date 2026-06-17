import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const GLOBAL_STACK_CONST_DOC: IConstDoc = {
    slug: 'global-stack',
    name: 'GLOBAL_STACK',
    category: 'Composables & Internals',
    descriptionKey: 'consts.catalog.global_stack.description',
    descriptionFallback: 'Reactive array of [uid, zIndex] tuples tracking every active stacked surface (Dialog, Menu, Tooltip, Snackbar…). Used by useStack to compute z-index increments and ensure correct stacking order.',
    definition: `export const GLOBAL_STACK = reactive<Array<[uid: number, zIndex: number]>>([])`,
    usedBy: [
        { name: 'useStack' },
        { name: 'OrigamDialog', slug: 'dialog' },
        { name: 'OrigamMenu', slug: 'menu' },
        { name: 'OrigamTooltip', slug: 'tooltip' },
        { name: 'OrigamSnackbar', slug: 'snackbar' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/stack.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.global_stack.example',
            titleFallback: 'Inspecting the stacking order at runtime',
            code: `import { GLOBAL_STACK } from 'origam'

// Reactive — watch for changes
watch(GLOBAL_STACK, (stack) => {
  console.log('Top z-index:', stack.at(-1)?.[1])
})`,
            lang: 'typescript',
        },
    ],
}
