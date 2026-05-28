import type { TChangelogType } from '~/types/changelog-type.type'

export interface IChangelogEntry {
    description: string
    scope?: string
    pr?: string
}

export interface IChangelogSection {
    type: TChangelogType
    entries: IChangelogEntry[]
}

export interface IChangelogRelease {
    version: string
    date: string
    sections: IChangelogSection[]
}
