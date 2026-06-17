import type { IConstDoc } from '~/interfaces/consts-catalog.interface'

export const ORIGAM_HOVER_STOP_KEY_CONST_DOC: IConstDoc = {
    slug: 'origam-hover-stop-key',
    name: 'ORIGAM_HOVER_STOP_KEY',
    category: 'Injection Keys',
    descriptionKey: 'consts.catalog.origam_hover_stop_key.description',
    descriptionFallback: 'Local Symbol (non-global, not shareable across bundles) used by the v-hover directive to store its cleanup/stop handle on the DOM element, preventing memory leaks on unmount.',
    definition: `export const ORIGAM_HOVER_STOP_KEY = Symbol('origam:hoverStop')`,
    value: "Symbol('origam:hoverStop')",
    usedBy: [
        { name: 'vHover' },
    ],
    sourceFile: 'packages/ds/src/consts/Commons/hover.const.ts',
    examples: [
        {
            titleKey: 'consts.detail.origam_hover_stop_key.example',
            titleFallback: 'Using v-hover to react to pointer enter/leave',
            code: `<template>
  <div v-hover="{ handler: onHover, class: 'is-hovered' }">
    Hover me
  </div>
</template>`,
            lang: 'html',
        },
    ],
}
