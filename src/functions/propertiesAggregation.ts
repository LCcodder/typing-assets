/**
 * 
 * @param source Source object
 * @param properties Properties to exclude (as `array`)
 * @returns Source with excluded properties
 */
export const excludeProperties = <TSource, TProp extends keyof TSource> (source: TSource, ...args: TProp[]): Omit<TSource, TProp> => {
    for (const key in source) {
        if ([...args].includes(key as string as TProp )) {
            source[key] = undefined as any
            delete source[key]
        }
    }
    return source
}


/**
 * 
 * @param source Source object
 * @param properties Properties to pick (as `array`)
 * @returns Only picked properties from `source`
 */
export const pickProperties = <TSource, TProp extends keyof TSource>(source: TSource, ...args: TProp[]): Pick<TSource, TProp> => {
    for (const key in source) {
        if (![...args].includes(key as string as TProp )) {
            source[key] = undefined as any
            delete source[key]
        }
    }
    return source
}