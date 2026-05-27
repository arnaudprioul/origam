import type { TChangelogType } from '~/types/changelog-type.type'

export const CHANGELOG_TYPES: TChangelogType[] = [
    'feat',
    'fix',
    'chore',
    'refactor',
    'docs',
    'breaking'
]

export const CHANGELOG_TYPE_LABELS: Record<TChangelogType, string> = {
    feat: 'Features',
    fix: 'Bug Fixes',
    chore: 'Chores',
    refactor: 'Refactors',
    docs: 'Documentation',
    breaking: 'Breaking Changes'
}

export const CHANGELOG_TYPE_COLORS: Record<TChangelogType, string> = {
    feat: 'success',
    fix: 'info',
    chore: 'ghost',
    refactor: 'secondary',
    docs: 'warning',
    breaking: 'danger'
}

export const CHANGELOG_TYPE_ICONS: Record<TChangelogType, string> = {
    feat: 'mdi:plus-circle',
    fix: 'mdi:bug',
    chore: 'mdi:cog',
    refactor: 'mdi:recycle',
    docs: 'mdi:book-open-variant',
    breaking: 'mdi:alert-circle'
}
