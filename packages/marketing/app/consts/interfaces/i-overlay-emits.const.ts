import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_OVERLAY_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-overlay-emits',
    name: 'IOverlayEmits',
    category: 'Overlay',
    descriptionKey: '',
    descriptionFallback: `Emits fired by \`<OrigamOverlay>\` — v-model on the open state, outside
click, transition lifecycle hooks, and keyboard bubble.`,
    definition: `export interface IOverlayEmits extends ICommonsComponentEmits, IClickOutsideEmits {
    (e: 'afterEnter'): void;
    (e: 'afterLeave'): void;
    (e: 'keydown', event: KeyboardEvent): void;
}`,
    extends: ['ICommonsComponentEmits', 'IClickOutsideEmits'],
    props: [],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Overlay/overlay.interface.ts',
    examples: [],
}
