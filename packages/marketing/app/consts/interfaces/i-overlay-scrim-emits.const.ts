import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_OVERLAY_SCRIM_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-overlay-scrim-emits',
    name: 'IOverlayScrimEmits',
    category: 'Overlay',
    descriptionKey: '',
    descriptionFallback: `Emits fired by \`<OrigamOverlayScrim>\` — click + pointer hover events
surface to the parent overlay (so it can close on backdrop click
or pause its auto-close timer while the pointer is over the scrim).`,
    definition: `export interface IOverlayScrimEmits extends IClickEmits {
    (e: 'mouseenter', event: MouseEvent): void;
    (e: 'mouseleave', event: MouseEvent): void;
}`,
    extends: ['IClickEmits'],
    props: [],
    usedBy: [],
    sourceFile: 'packages/ds/src/interfaces/Overlay/overlay-scrim.interface.ts',
    examples: [],
}
