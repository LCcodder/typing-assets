/**
 * @description Making all fields of type optional (including nested fields)
 */
export type DeepOptional<T> = T extends object ? {
    [P in keyof T]?: DeepOptional<T[P]>
} : T

/**
 * @description Making all fields of type required (including nested fields)
 */
export type DeepRequired<T> = T extends object ? {
    [P in keyof T]-?: DeepRequired<T[P]>
} : T

/**
 * @description Exporting union of all possible values (works also with arrays)
 */
export type ValueOf<T> = T extends unknown[] ? T[number] : T extends object ? T[keyof T] :  T

/**
 * @description Exporting value specifically from array
 */
export type FromArray<T> = T extends (infer U)[] ? U : T

export type ExcludeNullable<T> = T extends object ? DeepRequired<T> : Exclude<T, null | undefined | never | void | "">

export type ExcludeActual<T> = T extends infer U ? Exclude<T, ExcludeNullable<U>> : T

export type ActualReturnType<T> = T extends (args: any[]) => Promise<any> ? ExcludeActual<Awaited<ReturnType<T>>> : T extends (args: any[]) => any ? ExcludeActual<ReturnType<T>> : never
