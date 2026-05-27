export interface IAboutSection {
    id: string
    title: string
    body: string
}

export interface IAboutStat {
    label: string
    value: string | number
    icon?: string
}

export interface IAboutStackItem {
    name: string
    url: string
    role: string
    icon?: string
}

export interface IAboutPrinciple {
    title: string
    body: string
    icon: string
}

export interface IAboutLink {
    label: string
    url: string
    icon?: string
}
