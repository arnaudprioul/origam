import type { TPlaygroundTemplate } from '~/types/playground-template.type'

export interface IPlaygroundTemplate {
    id: TPlaygroundTemplate
    label: string
    description: string
    code: string
    icon?: string
}

export interface IPlaygroundState {
    code: string
    activeTemplate: TPlaygroundTemplate | null
    lastShareUrl?: string
}
