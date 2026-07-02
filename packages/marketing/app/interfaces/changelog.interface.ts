export type TChangelogVersionType = 'unreleased' | 'major' | 'minor' | 'patch'

export type TChangelogHighlightType = 'added' | 'changed' | 'fixed' | 'deprecated'

export interface IChangelogHighlight {
    type: TChangelogHighlightType
    textKey: string
}

export interface IChangelogVersion {
    version: string
    date: string | null
    type: TChangelogVersionType
    summaryKey: string
    highlights: IChangelogHighlight[]
}
