import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_QR_CODE_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-qr-code-slots',
    name: 'IQrCodeSlots',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_qr_code_slots.description',
    descriptionFallback: 'Slots contract for <OrigamQrCode>. The center slot replaces the default icon/image overlay. When provided, both icon and image props are ignored.',
    definition: `export interface IQrCodeSlots {
    center?: (bindings: { size: number }) => any
}`,
    extends: [],
    props: [
        { name: 'center', type: '(bindings: { size: number }) => any', optional: true, descriptionFallback: 'Replaces the default icon or image overlay. Receives the resolved size of the central reserved square in module units so the consumer can paint a custom SVG or icon without re-deriving the geometry.' },
    ],
    usedBy: [
        { slug: 'qr-code', name: 'QrCode', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/QrCode/qr-code.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_qr_code_slots.example',
            titleFallback: 'Custom center overlay with brand logo',
            code: `<origam-qr-code value="https://origam.dev" error-correction-level="H">
    <template #center="{ size }">
        <image
            :width="size"
            :height="size"
            :x="-size / 2"
            :y="-size / 2"
            href="/logo.svg"
        />
    </template>
</origam-qr-code>`,
            lang: 'html',
        },
    ],
}
