import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_BLOCKQUOTE_SLOTS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-blockquote-slots',
    name: 'IBlockquoteSlots',
    category: 'Slots',
    descriptionKey: 'interfaces.catalog.i_blockquote_slots.description',
    descriptionFallback: 'Slot signatures for <OrigamBlockquote>. The default slot owns the citation body; author and source are optional overrides for custom rendering. When a slot is provided it wins over the matching prop.',
    definition: `export interface IBlockquoteSlots {
    default?: () => any
    author?: () => any
    source?: () => any
}`,
    extends: [],
    props: [
        { name: 'default', type: '() => any', optional: true, descriptionFallback: 'Citation body content. Replaces inline text when provided.' },
        { name: 'author', type: '() => any', optional: true, descriptionFallback: 'Override for the author attribution. Wins over the author prop when provided.' },
        { name: 'source', type: '() => any', optional: true, descriptionFallback: 'Override for the source attribution. Wins over the source prop when provided.' },
    ],
    usedBy: [
        { slug: 'blockquote', name: 'Blockquote', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Blockquote/blockquote.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_blockquote_slots.example',
            titleFallback: 'Custom author slot with a link',
            code: `<OrigamBlockquote variant="bordered">
    <template #default>
        The only way to do great work is to love what you do.
    </template>
    <template #author>
        <a href="/bio/steve-jobs">Steve Jobs</a>
    </template>
    <template #source>Stanford Commencement, 2005</template>
</OrigamBlockquote>`,
            lang: 'vue',
        },
    ],
}
