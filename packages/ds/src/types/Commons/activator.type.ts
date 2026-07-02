export type TActivatorTarget<T> = HTMLElement | undefined | (T extends any[] ? [x: number, y: number] : never)
