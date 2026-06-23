import type { ITypeDoc } from '~/interfaces/types-catalog.interface'

export const BLOCK_TYPE_DOC: ITypeDoc = {
    slug: 'block',
    name: 'block',
    kind: 'type',
    category: 'Layout',
    descriptionKey: 'types.catalog.block.description',
    descriptionFallback: 'Boolean prop on OrigamBtn that makes the button stretch to fill 100% of its container width.',
    definition: `block?: boolean`,
    values: [
        {
            value: 'true',
            descriptionKey: 'types.detail.block.true',
            descriptionFallback: 'The button expands to full container width (width: 100%; display: flex).',
        },
        {
            value: 'false',
            descriptionKey: 'types.detail.block.false',
            descriptionFallback: 'Default behaviour — the button sizes itself to its content.',
        },
    ],
    usedBy: [
        { slug: 'btn', name: 'Btn', propName: 'block' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Btn/btn.interface.ts',
    examples: [
        {
            titleKey: 'types.detail.block.example',
            titleFallback: 'Full-width block button',
            code: `<origam-btn block color="primary">Submit</origam-btn>`,
            lang: 'html',
        },
    ],
}
