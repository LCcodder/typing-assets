
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
export function generateConditionalGuard<T>(callback: (entity: T) => boolean): 
(checkingVariable: unknown) => checkingVariable is T {
    return (checkingVariable: unknown): checkingVariable is T => {
        return callback(checkingVariable as T);
    }
}


/**
 * 
 * @description Function generator for *type guarding*
 * @param prop Property to check *(must be string or symbol)*
 * @param propPrimitive This property `type` alias primitive in string
 * @returns `Arrow function`, which returns `checkingVariable` is `T` *(boolean)*
 */
export function generateGuard<T>(prop: keyof T, propPrimitive: string | symbol): 
(checkingVariable: unknown) => checkingVariable is T {
    return (checkingVariable: unknown): checkingVariable is T => {
        return typeof (checkingVariable as Required<T>)[prop as keyof T] === propPrimitive;
    }
}

/**
 * 
 * @param isValid Callback function, that have to return true ro 
 * @param errorMessage 
 * @returns 
 */
export function generateAsserter <T>(
    isValid: (source: unknown, ...args: unknown[]) => source is T | boolean,
    errorMessage: string
): (checkingVariable: unknown) => asserts checkingVariable is T {
    return (source: unknown, ...args: unknown[]): asserts source is T => {
        const state = isValid(source, ...args)
        if (!state) throw new Error(errorMessage)
    }
}

export interface Predicates<T> {
    guard: ReturnType<typeof generateGuard<T>>,
    assert: ReturnType<typeof generateAsserter<T>>
}

/**
 * @description Generates predicates by provided validation callback
 * @param errorMessage Error message `string` for *asserter*
 * @param validation Validation `callback`, like in *conditional type guard*
 * @returns Object with both asserter and type guard
 */
export function generatePredicates<T>(
    errorMessage: string,
    validation: (source: unknown, ...args: unknown[]) => boolean
): Predicates<T>

/**
 * @description Generates predicates by provided property and its primitive
 * @param prop Property to check *(must be string or symbol)*
 * @param propPrimitive This property `type` alias primitive in string
 * @returns Object with both asserter and type guard
 */
export function generatePredicates<T>(
    errorMessage: string,
    prop: keyof T, 
    propPrimitive: string | symbol    
): Predicates<T>

export function generatePredicates<T>(
    errorMessage: string,
    validationOrProp: keyof T | ((source: unknown, ...args: unknown[]) => boolean),
    propPrimitive?: string | symbol
): any {
    if (validationOrProp instanceof Function) {
        return {
            guard: generateConditionalGuard<T>(validationOrProp),
            assert: generateAsserter<T>(validationOrProp as (source: unknown, ...args: unknown[]) => source is T | boolean, errorMessage) 
        }
    } else if (propPrimitive) {
        const guard = generateGuard<T>(validationOrProp, propPrimitive)
        return {
            guard,
            assert: generateAsserter<T>(
                guard, errorMessage
            ) 
        }
    }
}
