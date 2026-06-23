import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_QR_CODE_OPTIONS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-qr-code-options',
    name: 'IQrCodeOptions',
    category: 'Data Display',
    descriptionKey: 'interfaces.catalog.i_qr_code_options.description',
    descriptionFallback: 'Per-matrix overrides applied inside the SVG (modules + quiet zone) independently of the wrapper-level props. Pass via the qrCodeProps prop on <OrigamQrCode>.',
    definition: `export interface IQrCodeOptions extends IRoundedProps, IBgColorProps, IColorProps {}`,
    extends: ['IRoundedProps', 'IBgColorProps', 'IColorProps'],
    props: [],
    usedBy: [
        { slug: 'qr-code', name: 'QrCode', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/QrCode/qr-code.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_qr_code_options.example',
            titleFallback: 'Custom module color and rounded corners',
            code: `import type { IQrCodeOptions } from 'origam'

const qrCodeProps: IQrCodeOptions = {
    color: '#1a1a1a',
    bgColor: '#fafafa',
    rounded: 'sm',
}`,
            lang: 'typescript',
        },
    ],
}
