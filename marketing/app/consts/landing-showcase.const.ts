import type { IShowcaseItem } from '~/interfaces/landing.interface'

export const LANDING_SHOWCASE: ReadonlyArray<IShowcaseItem> = [
    {
        id: 'btn-primary',
        labelKey: 'showcase.btn.label',
        labelFallback: 'Button variants',
        component: 'OrigamBtn',
        intent: 'primary',
        variant: 'flat'
    },
    {
        id: 'btn-outline',
        labelKey: 'showcase.btnOutline.label',
        labelFallback: 'Outlined button',
        component: 'OrigamBtn',
        intent: 'success',
        variant: 'outlined'
    },
    {
        id: 'chip',
        labelKey: 'showcase.chip.label',
        labelFallback: 'Chips',
        component: 'OrigamChip',
        intent: 'secondary',
        variant: 'flat'
    },
    {
        id: 'alert-info',
        labelKey: 'showcase.alert.label',
        labelFallback: 'Alert info',
        component: 'OrigamAlert',
        intent: 'info',
        variant: 'tonal'
    },
    {
        id: 'alert-success',
        labelKey: 'showcase.alertSuccess.label',
        labelFallback: 'Alert success',
        component: 'OrigamAlert',
        intent: 'success',
        variant: 'tonal'
    },
    {
        id: 'card',
        labelKey: 'showcase.card.label',
        labelFallback: 'Card with badge',
        component: 'OrigamCard',
        intent: 'primary',
        variant: 'elevated'
    },
    {
        id: 'avatar',
        labelKey: 'showcase.avatar.label',
        labelFallback: 'Avatar group',
        component: 'OrigamAvatar',
        intent: 'warning',
        variant: 'flat'
    },
    {
        id: 'badge',
        labelKey: 'showcase.badge.label',
        labelFallback: 'Badge',
        component: 'OrigamBadge',
        intent: 'danger',
        variant: 'flat'
    }
] as const
