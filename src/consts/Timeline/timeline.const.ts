import type { InjectionKey } from 'vue'

export interface ITimelineContext {
    side: 'start' | 'end' | 'alternating'
    truncateLine: boolean
    color?: string
}

export const TIMELINE_CONTEXT_KEY: InjectionKey<ITimelineContext | null> = Symbol.for('origam:timeline')
