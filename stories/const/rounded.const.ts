import { ROUNDED } from '@origam/enums'

export const roundedList = [
    // ── Off / boolean ───────────────────────────────────────────
    {value: false, label: 'No Rounded'},
    {value: true, label: 'Rounded (legacy boolean)'},

    // ── Named variants (token-driven, theme-aware) ──────────────
    {value: ROUNDED.X_SMALL, label: 'x-small (radius.xs / 2px)'},
    {value: ROUNDED.SMALL, label: 'small (radius.sm / 4px)'},
    {value: ROUNDED.DEFAULT, label: 'default (radius.md / 8px)'},
    {value: ROUNDED.MEDIUM, label: 'medium (radius.lg / 12px)'},
    {value: ROUNDED.LARGE, label: 'large (radius.xl / 16px)'},
    {value: ROUNDED.X_LARGE, label: 'x-large (radius.2xl / 24px)'},

    // ── Free-form CSS escape hatches ────────────────────────────
    {value: '9999px', label: 'Circled (9999px)'},
    {value: '0 4px 0 4px', label: 'Right Rounded'},
    {value: '4px 0 4px 0', label: 'Left Rounded'},
    {value: '4px 4px 0 0', label: 'Top Rounded'},
    {value: '0 0 4px 4px', label: 'Bottom Rounded'}
]
