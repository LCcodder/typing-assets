import { describe, test, expect } from "@jest/globals"
import {isSameType, generateConditionalTypeGuard, generatePredicates, Predicates} from "../../src/functions/predicatesAndTyping"


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


type TestUser = {
    id: number
    name: string
    age: number
}

describe("generateConditionalTypeGuard function", () => {
    const guard = generateConditionalTypeGuard((variable: unknown) => {
        return (variable as TestUser).name.charAt(0) === "A"
    })

    test("Testing to guard failure", () => {
        const testUser: TestUser = {
            id: 123,
            name: "Lisa",
            age: 19   
        }

        expect(guard(testUser)).toEqual(false)
    })

    test("Testing to guard success", () => {
        const testUser: TestUser = {
            id: 123,
            name: "Alex",
            age: 19   
        }

        expect(guard(testUser)).toEqual(true)
    })
})

// testing both type guard and type asserter via 'generatePredicates' generator
describe("generatePredicates function (default type guard + type asserter)", () => {
    const predicates: Predicates = generatePredicates<TestUser>(
        {prop: "age", propPrimitive: "number"}, 
        {
            isValid: (source: unknown): source is TestUser | boolean => {
                return (source as TestUser).name.charAt(0) === "A"
            }, 
            errorMessage: "Name does not starts with 'A'"
        }
    )

    // type guard tests
    test("Testing to guard failure", () => {
        const testUser = {
            id: 123,
            name: "Alex"
        }

        expect(predicates.guard(testUser)).toEqual(false)
    })

    test("Testing to guard success", () => {
        
        const testUser: TestUser = {
            id: 123,
            name: "Lisa",
            age: 19
        }

        expect(predicates.guard(testUser)).toEqual(true)
    })

    // type asserter tests
    test("Testing asserter to complete", () => {
        const testUser: TestUser = {
            id: 123,
            name: "Alex",
            age: 19
        }
        expect(predicates.asserter(testUser)).toEqual(undefined)
    })

    test("Testing asserter to throw error", () => {
        const testUser: TestUser = {
            id: 123,
            name: "Lisa",
            age: 19
        }

        try {
         
            predicates.asserter(testUser)   
        } catch (error) {
            expect(error).toBeDefined()
        }
    })
})