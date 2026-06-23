import type { IChangelogVersion } from '~/interfaces/changelog.interface'

/**
 * Changelog versions — sourced exclusively from /CHANGELOG.md.
 * Content keys map to i18n entries in en.json / fr.json under `changelog.*`.
 * Version numbers and ISO dates are data, not i18n.
 */
export const CHANGELOG_VERSIONS: IChangelogVersion[] = [
    {
        version: 'Unreleased',
        date: null,
        type: 'unreleased',
        summaryKey: 'changelog.versions.unreleased.summary',
        highlights: [
            { type: 'added', textKey: 'changelog.versions.unreleased.h1' },
            { type: 'added', textKey: 'changelog.versions.unreleased.h2' },
            { type: 'changed', textKey: 'changelog.versions.unreleased.h3' },
            { type: 'fixed', textKey: 'changelog.versions.unreleased.h4' },
            { type: 'fixed', textKey: 'changelog.versions.unreleased.h5' }
        ]
    },
    {
        version: '2.6.0',
        date: '2026-06-11',
        type: 'minor',
        summaryKey: 'changelog.versions.v260.summary',
        highlights: [
            { type: 'added', textKey: 'changelog.versions.v260.h1' },
            { type: 'added', textKey: 'changelog.versions.v260.h2' },
            { type: 'added', textKey: 'changelog.versions.v260.h3' },
            { type: 'added', textKey: 'changelog.versions.v260.h4' },
            { type: 'changed', textKey: 'changelog.versions.v260.h5' },
            { type: 'fixed', textKey: 'changelog.versions.v260.h6' }
        ]
    },
    {
        version: '2.5.1',
        date: '2026-05-27',
        type: 'patch',
        summaryKey: 'changelog.versions.v251.summary',
        highlights: [
            { type: 'changed', textKey: 'changelog.versions.v251.h1' },
            { type: 'changed', textKey: 'changelog.versions.v251.h2' }
        ]
    },
    {
        version: '2.5.0',
        date: '2026-05-24',
        type: 'minor',
        summaryKey: 'changelog.versions.v250.summary',
        highlights: [
            { type: 'fixed', textKey: 'changelog.versions.v250.h1' },
            { type: 'fixed', textKey: 'changelog.versions.v250.h2' },
            { type: 'fixed', textKey: 'changelog.versions.v250.h3' },
            { type: 'changed', textKey: 'changelog.versions.v250.h4' }
        ]
    },
    {
        version: '2.4.0',
        date: '2026-05-23',
        type: 'minor',
        summaryKey: 'changelog.versions.v240.summary',
        highlights: [
            { type: 'added', textKey: 'changelog.versions.v240.h1' },
            { type: 'added', textKey: 'changelog.versions.v240.h2' },
            { type: 'added', textKey: 'changelog.versions.v240.h3' },
            { type: 'added', textKey: 'changelog.versions.v240.h4' },
            { type: 'changed', textKey: 'changelog.versions.v240.h5' },
            { type: 'fixed', textKey: 'changelog.versions.v240.h6' }
        ]
    },
    {
        version: '2.3.0',
        date: '2026-05-15',
        type: 'minor',
        summaryKey: 'changelog.versions.v230.summary',
        highlights: [
            { type: 'added', textKey: 'changelog.versions.v230.h1' },
            { type: 'changed', textKey: 'changelog.versions.v230.h2' },
            { type: 'changed', textKey: 'changelog.versions.v230.h3' },
            { type: 'fixed', textKey: 'changelog.versions.v230.h4' }
        ]
    },
    {
        version: '2.2.1',
        date: '2026-05-14',
        type: 'patch',
        summaryKey: 'changelog.versions.v221.summary',
        highlights: [
            { type: 'fixed', textKey: 'changelog.versions.v221.h1' },
            { type: 'fixed', textKey: 'changelog.versions.v221.h2' }
        ]
    },
    {
        version: '2.2.0',
        date: '2026-05-14',
        type: 'minor',
        summaryKey: 'changelog.versions.v220.summary',
        highlights: [
            { type: 'added', textKey: 'changelog.versions.v220.h1' },
            { type: 'changed', textKey: 'changelog.versions.v220.h2' },
            { type: 'fixed', textKey: 'changelog.versions.v220.h3' }
        ]
    },
    {
        version: '2.1.0',
        date: '2026-05-07',
        type: 'minor',
        summaryKey: 'changelog.versions.v210.summary',
        highlights: [
            { type: 'added', textKey: 'changelog.versions.v210.h1' },
            { type: 'added', textKey: 'changelog.versions.v210.h2' },
            { type: 'changed', textKey: 'changelog.versions.v210.h3' },
            { type: 'fixed', textKey: 'changelog.versions.v210.h4' }
        ]
    },
    {
        version: '2.0.0',
        date: '2026-04-26',
        type: 'major',
        summaryKey: 'changelog.versions.v200.summary',
        highlights: [
            { type: 'added', textKey: 'changelog.versions.v200.h1' },
            { type: 'added', textKey: 'changelog.versions.v200.h2' },
            { type: 'changed', textKey: 'changelog.versions.v200.h3' },
            { type: 'fixed', textKey: 'changelog.versions.v200.h4' }
        ]
    }
]

export const CHANGELOG_TYPE_COLOR = {
    unreleased: 'neutral',
    major: 'warning',
    minor: 'primary',
    patch: 'neutral'
} as const

export const CHANGELOG_HIGHLIGHT_COLOR = {
    added: 'success',
    changed: 'warning',
    fixed: 'secondary',
    deprecated: 'danger'
} as const

export const CHANGELOG_HIGHLIGHT_ICON = {
    added: 'mdi-plus-circle-outline',
    changed: 'mdi-pencil-circle-outline',
    fixed: 'mdi-wrench-outline',
    deprecated: 'mdi-alert-circle-outline'
} as const
