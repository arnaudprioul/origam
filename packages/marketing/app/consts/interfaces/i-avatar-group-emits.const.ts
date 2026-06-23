import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AVATAR_GROUP_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-avatar-group-emits',
    name: 'IAvatarGroupEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_avatar_group_emits.description',
    descriptionFallback: 'Emits contract for <OrigamAvatarGroup> — propagates active and hover state from the underlying avatars.',
    definition: `export interface IAvatarGroupEmits extends IActiveEmits, IHoverEmits {}`,
    extends: ['IActiveEmits', 'IHoverEmits'],
    props: [
        { name: 'update:modelValue', type: '(value: boolean) => void', optional: false, descriptionFallback: 'Emitted when the group active state changes (two-way v-model binding).' },
        { name: 'mouseenter', type: '() => void', optional: false, descriptionFallback: 'Emitted when the pointer enters the group surface.' },
        { name: 'mouseleave', type: '() => void', optional: false, descriptionFallback: 'Emitted when the pointer leaves the group surface.' },
    ],
    usedBy: [
        { slug: 'avatar-group', name: 'AvatarGroup', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Avatar/avatar-group.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_avatar_group_emits.example',
            titleFallback: 'Listening to hover events on OrigamAvatarGroup',
            code: `<OrigamAvatarGroup :items="avatars" @mouseenter="onGroupHover" />`,
            lang: 'vue',
        },
    ],
}
