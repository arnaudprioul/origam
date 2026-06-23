import type { IInterfaceDoc } from '~/interfaces/interfaces-catalog.interface'

export const I_AVATAR_EMITS_INTERFACE_DOC: IInterfaceDoc = {
    slug: 'i-avatar-emits',
    name: 'IAvatarEmits',
    category: 'Events & Emits',
    descriptionKey: 'interfaces.catalog.i_avatar_emits.description',
    descriptionFallback: 'Emits contract for <OrigamAvatar> — active state propagation and hover state propagation.',
    definition: `export interface IAvatarEmits extends IActiveEmits, IHoverEmits {}`,
    extends: ['IActiveEmits', 'IHoverEmits'],
    props: [
        { name: 'update:modelValue', type: '(value: boolean) => void', optional: false, descriptionFallback: 'Emitted when the avatar active state changes (two-way v-model binding).' },
        { name: 'mouseenter', type: '() => void', optional: false, descriptionFallback: 'Emitted when the pointer enters the avatar surface.' },
        { name: 'mouseleave', type: '() => void', optional: false, descriptionFallback: 'Emitted when the pointer leaves the avatar surface.' },
    ],
    usedBy: [
        { slug: 'avatar', name: 'Avatar', kind: 'component' },
    ],
    sourceFile: 'packages/ds/src/interfaces/Avatar/avatar.interface.ts',
    examples: [
        {
            titleKey: 'interfaces.detail.i_avatar_emits.example',
            titleFallback: 'Listening to hover events on OrigamAvatar',
            code: `<OrigamAvatar
    image="/user.jpg"
    @mouseenter="onHoverIn"
    @mouseleave="onHoverOut"
/>`,
            lang: 'vue',
        },
    ],
}
