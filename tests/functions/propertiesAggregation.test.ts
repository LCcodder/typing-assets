import { describe, test, expect } from "@jest/globals"
import {excludeProperties, pickProperties} from "../../src/functions/propertiesAggregation"

describe("excludeProperties function", () => {
    test("Excluding properties", () => {
        const initialObject = { a: 12, b: 23, c: 45 }
        expect(
            excludeProperties(initialObject, "a", "b")
        ).toEqual({c: 45})

        expect(initialObject).toEqual({c: 45})
    })
})


describe("pickProperties function", () => {
    test("Picking properties", () => {
        const initialObject = { a: 12, b: 23, c: 45 }
        expect(
            pickProperties(initialObject, "a", "b")
        ).toEqual({a: 12, b: 23})

        expect(initialObject).toEqual({a: 12, b: 23})
    })
})