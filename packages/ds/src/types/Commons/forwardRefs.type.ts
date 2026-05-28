export type TUnionToIntersection<U> =
    (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

export type TOmitPrefix<T, P extends string> = [Extract<keyof T, `${P}${any}`>] extends [never] ? T : Omit<T, `${P}${any}`>

export type TOmitProps<T> = T extends { $props: any } ? Omit<T, keyof T['$props']> : T