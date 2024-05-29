
/**
 * @description Checks types of borrowed variables list
 * @param args List of values
 * @returns `boolean` - `true` if types are same, `false` if not
 */
export const isSameType = (...args: unknown[]): boolean => {
    for (let i = 1; i < args.length; i++) {
        if (typeof args[i] === typeof args[i - 1]) continue;
        return false;
    }
    return true;
}

/**
 * @description Fucntion generator for custom conditional *type guarding*
 * @param callback Condition callback function
 * @returns `Arrow function`, which returns `checkingVariable` is `T` *(boolean)*
 */
export function generateConditionalTypeGuard<T>(callback: (entity: T) => boolean): 
(checkingVariable: unknown) => checkingVariable is T {
    return (checkingVariable: unknown): checkingVariable is T => {
        return callback(checkingVariable as T);
    }
}


/**
 * 
 * @description Function generator for *type guarding*
 * @param prop Property to check *(must be string or symbol)*
 * @param propType This property `type` alias primitive in string
 * @returns `Arrow function`, which returns `checkingVariable` is `T` *(boolean)*
 */
export function generateTypeGuard<T>(prop: keyof T, propPrimitive: string | symbol): 
(checkingVariable: unknown) => checkingVariable is T {
    return (checkingVariable: unknown): checkingVariable is T => {
        return typeof (checkingVariable as Required<T>)[prop as keyof T] === propPrimitive;
    }
}


/**
 * 
 * @description Function generator for *type guarding*
 * @param prop Property to check *(must be string or symbol)*
 * @param propType This property `type` alias primitive in string
 * @returns `Arrow function`, which returns `checkingVariable` is `T` *(boolean)*
 */
function generateAssertPredicate <T>(
    isValid: (source: unknown, ...args: unknown[]) => source is T | boolean,
    errorMessage: string
): (checkingVariable: unknown) => asserts checkingVariable is T {
    return (source: unknown, ...args: unknown[]): asserts source is T => {
        const state = isValid(source, ...args)
        if (!state) throw new Error(errorMessage)
    }
}


export interface Predicates {
    guard: ReturnType<typeof generateTypeGuard>,
    asserter: ReturnType<typeof generateAssertPredicate>
}

export interface GuardOptions<T> {
    prop: keyof T
    propPrimitive: string | symbol
}

export interface AsserterOptions<T> {
    isValid: (source: unknown, ...args: unknown[]) => source is T | boolean
    errorMessage: string
}

/**
 * @description Asserter and guard generator
 * @param guardOptions Type guard function options
 * @param asserterOptions Type asserter function options 
 * @returns `Predicates` type object, which have asserter and guard bundled in one object
 */
export function generatePredicates <T>(
    guardOptions: GuardOptions<T>,
    asserterOptions: AsserterOptions<T>
): Predicates {
    return {
        guard: generateTypeGuard(guardOptions.prop, guardOptions.propPrimitive),
        asserter: generateAssertPredicate(asserterOptions.isValid, asserterOptions.errorMessage) 
    }
}
