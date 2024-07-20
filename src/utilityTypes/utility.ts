/**
 * @description Making all fields of type optional (including nested fields)
 */
export declare type DeepOptional<T> = T extends object ? {
    [P in keyof T]?: DeepOptional<T[P]>
} : T

/**
 * @description Making all fields of type required (including nested fields)
 */
export declare type DeepRequired<T> = T extends object ? {
    [P in keyof T]-?: DeepRequired<T[P]>
} : T

/**
 * @description Exporting union of all possible values (works also with arrays)
 */
export declare type ValueOf<T> = T extends unknown[] ? T[number] : T extends object ? T[keyof T] :  T

/**
 * @description Exporting value specifically from array
 */
export declare type FromArray<T> = T extends (infer U)[] ? U : T

/**
 * @description Excludes all nullable unions in nested fields
 */
export declare type ExcludeNullable<T> =  T extends object ? {
    [P in keyof T]: ExcludeNullable<T[P]>
} : Exclude<T, null | undefined | never | void>

/**
 * @description Excludes all primitive types from union type in nested properties
 */
export declare type ExcludeActual<T> = T extends object ? {
    [P in keyof T]: ExcludeActual<T[P]>
} : Exclude<T, string | number | T[] | symbol | bigint>


export declare type ActualReturnType<T> = T extends (args: any[]) => Promise<any> ? ExcludeNullable<Awaited<ReturnType<T>>> : T extends (args: any[]) => any ? ExcludeNullable<ReturnType<T>> : never
