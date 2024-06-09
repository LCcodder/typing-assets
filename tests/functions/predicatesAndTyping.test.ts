import { describe, test, expect } from "@jest/globals"
import {isSameType, generateConditionalGuard, generateAsserter, generateGuard, generatePredicates, Predicates, Asserter} from "../../src/functions/predicatesAndTyping"


describe("isSameType function", () => {
    test("Testing comparing of same types", () => {
        const firstNumber: number = 0
        const secondNumber: number = 12

        expect(isSameType(firstNumber, secondNumber)).toEqual(true)
    })  

    test("Testing comparing of NOT same types", () => {
        const number: number = 0
        const stringArray: string[] = []

        expect(isSameType(stringArray, number)).toEqual(false)
    })
})


type User = {
    id: number
    name: string
    age: number
}

describe("generateConditionalGuard function", () => {
    const guard = generateConditionalGuard((variable: unknown) => {
        return (variable as User).name.charAt(0) === "A"
    })

    test("Testing for guard failure", () => {
        const testUser = {
            id: 123,
            name: "Lisa",
            age: 19   
        }

        expect(guard(testUser)).toEqual(false)
    })

    test("Testing for guard success", () => {
        const testUser = {
            id: 123,
            name: "Alex",
            age: 19   
        }

        expect(guard(testUser)).toEqual(true)
    })
})

describe("generateGuard function", () => {
    const guard = generateGuard<User>(
        "name",
        "string"
    )


    test("Testing for guard failure", () => {
        const testUser = {
            id: 123,
            age: 19
        }

        expect(guard(testUser)).toEqual(false)
    })

    test("Testing for guard success", () => {
        const testUser = {
            id: 123,
            name: "Alex",
            age: 19   
        }

        expect(guard(testUser)).toEqual(true)
    })
})


describe("generateAsserter function", () => {
    const assert: Asserter<User> = generateAsserter(
        "Name does not starts with 'A'",
        (source: unknown) => !(source as User).name.startsWith("A")
    )
    
    // type asserter tests
    test("Testing asserter to complete", () => {
        const testUser = {
            id: 123,
            name: "Lisa",
            age: 19
        }
        expect(assert(testUser)).toEqual(undefined)
    })

    test("Testing asserter to throw error", () => {
        const testUser = {
            id: 123,
            name: "Alex",
            age: 19
        }
        try {
            assert(testUser)   
        } catch (error) {
            expect(error).toBeDefined()
        }
    })
})

// testing both type guard and type asserter via 'generatePredicates' generator with first overload
describe("generatePredicates function (conditional type guard + type asserter)", () => {
    const predicates: Predicates<User> = generatePredicates<User>(
        "Name does not starts with 'A'",
        (source: unknown) => !(source as User).name.startsWith("A")
    )

    // type guard tests
    test("Testing to guard failure", () => {
        const testUser = {
            id: 123,
            name: "Alex",
            age: 32
        }

        expect(predicates.guard(testUser)).toEqual(false)
    })

    test("Testing to guard success", () => {
        
        const testUser = {
            id: 123,
            name: "Lisa",
            age: 19
        }

        expect(predicates.guard(testUser)).toEqual(true)
    })

    // type asserter tests
    test("Testing asserter to complete", () => {
        const testUser = {
            id: 123,
            name: "Lisa",
            age: 19
        }
        expect(predicates.assert(testUser)).toEqual(undefined)
    })

    test("Testing asserter to throw error", () => {
        const testUser = {
            id: 123,
            name: "Alex",
            age: 19
        }
        try {
         
            predicates.assert(testUser)   
        } catch (error) {
            expect(error).toBeDefined()
        }
    })
})


// testing both type guard and type asserter via 'generatePredicates' generator with first overload
describe("generatePredicates function (default type guard + type asserter)", () => {
    const predicates: Predicates<User> = generatePredicates<User>(
        "Name is string",
        "name",
        "string"
    )

    // type guard tests
    test("Testing to guard failure", () => {
        const testUser = {
            id: 123,
            age: 32
        }

        expect(predicates.guard(testUser)).toEqual(false)
    })

    test("Testing to guard success", () => {
        const testUser = {
            id: 123,
            name: "Lisa",
            age: 19
        }

        expect(predicates.guard(testUser)).toEqual(true)
    })

    // type asserter tests
    test("Testing asserter to complete", () => {
        const testUser = {
            id: 123,
            name: "Lisa",
            age: 19
        }
        expect(predicates.assert(testUser)).toEqual(undefined)
    })

    test("Testing asserter to throw error", () => {
        const testUser = {
            id: 123,
            age: 19
        }
        try {
         
            predicates.assert(testUser)   
        } catch (error) {
            expect(error).toBeDefined()
        }
    })
})