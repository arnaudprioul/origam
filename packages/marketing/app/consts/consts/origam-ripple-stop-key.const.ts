import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_RIPPLE_STOP_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-ripple-stop-key',
    name: 'ORIGAM_RIPPLE_STOP_KEY',
    category: 'Directives',
    descriptionKey: 'consts.catalog.origam_ripple_stop_key.description',
    descriptionFallback: 'Symbol key attached to a DOM event to signal that the ripple propagation has been consumed and should not bubble further up the element tree.',
    definition: `export const ORIGAM_RIPPLE_STOP_KEY = Symbol('origam:rippleStop')`,
    value: `Symbol('origam:rippleStop')`,
    usedBy: [
        { name: 'v-ripple directive' },
        { name: 'ripple.util' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/ripple.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_ripple_stop_key.example',
            titleFallback: 'Manually stopping ripple propagation',
            code: `import { ORIGAM_RIPPLE_STOP_KEY } from 'origam'

function onPointerDown(e: PointerEvent) {
  // mark the event so nested v-ripple does not re-trigger
  ;(e as any)[ORIGAM_RIPPLE_STOP_KEY] = true
}`,
            lang: 'typescript',
        },
    ],
}
