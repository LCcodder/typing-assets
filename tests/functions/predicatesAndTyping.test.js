"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const predicatesAndTyping_1 = require("../../src/functions/predicatesAndTyping");
(0, globals_1.describe)("isSameType function", () => {
    (0, globals_1.test)("Testing comparing of same types", () => {
        const firstNumber = 0;
        const secondNumber = 12;
        (0, globals_1.expect)((0, predicatesAndTyping_1.isSameType)(firstNumber, secondNumber)).toEqual(true);
    });
    (0, globals_1.test)("Testing comparing of NOT same types", () => {
        const number = 0;
        const stringArray = [];
        (0, globals_1.expect)((0, predicatesAndTyping_1.isSameType)(stringArray, number)).toEqual(false);
    });
});
(0, globals_1.describe)("generateConditionalGuard function", () => {
    const guard = (0, predicatesAndTyping_1.generateConditionalGuard)((variable) => {
        return variable.name.charAt(0) === "A";
    });
    (0, globals_1.test)("Testing for guard failure", () => {
        const testUser = {
            id: 123,
            name: "Lisa",
            age: 19
        };
        (0, globals_1.expect)(guard(testUser)).toEqual(false);
    });
    (0, globals_1.test)("Testing for guard success", () => {
        const testUser = {
            id: 123,
            name: "Alex",
            age: 19
        };
        (0, globals_1.expect)(guard(testUser)).toEqual(true);
    });
});
(0, globals_1.describe)("generateGuard function", () => {
    const guard = (0, predicatesAndTyping_1.generateGuard)("name", "string");
    (0, globals_1.test)("Testing for guard failure", () => {
        const testUser = {
            id: 123,
            age: 19
        };
        (0, globals_1.expect)(guard(testUser)).toEqual(false);
    });
    (0, globals_1.test)("Testing for guard success", () => {
        const testUser = {
            id: 123,
            name: "Alex",
            age: 19
        };
        (0, globals_1.expect)(guard(testUser)).toEqual(true);
    });
});
// testing both type guard and type asserter via 'generatePredicates' generator with first overload
(0, globals_1.describe)("generatePredicates function (conditional type guard + type asserter)", () => {
    const predicates = (0, predicatesAndTyping_1.generatePredicates)("Name does not starts with 'A'", (source) => !source.name.startsWith("A"));
    // type guard tests
    (0, globals_1.test)("Testing to guard failure", () => {
        const testUser = {
            id: 123,
            name: "Alex",
            age: 32
        };
        (0, globals_1.expect)(predicates.guard(testUser)).toEqual(false);
    });
    (0, globals_1.test)("Testing to guard success", () => {
        const testUser = {
            id: 123,
            name: "Lisa",
            age: 19
        };
        (0, globals_1.expect)(predicates.guard(testUser)).toEqual(true);
    });
    // type asserter tests
    (0, globals_1.test)("Testing asserter to complete", () => {
        const testUser = {
            id: 123,
            name: "Lisa",
            age: 19
        };
        (0, globals_1.expect)(predicates.assert(testUser)).toEqual(undefined);
    });
    (0, globals_1.test)("Testing asserter to throw error", () => {
        const testUser = {
            id: 123,
            name: "Alex",
            age: 19
        };
        try {
            predicates.assert(testUser);
        }
        catch (error) {
            (0, globals_1.expect)(error).toBeDefined();
        }
    });
});
// testing both type guard and type asserter via 'generatePredicates' generator with first overload
(0, globals_1.describe)("generatePredicates function (default type guard + type asserter)", () => {
    const predicates = (0, predicatesAndTyping_1.generatePredicates)("Name is string", "name", "string");
    // type guard tests
    (0, globals_1.test)("Testing to guard failure", () => {
        const testUser = {
            id: 123,
            age: 32
        };
        (0, globals_1.expect)(predicates.guard(testUser)).toEqual(false);
    });
    (0, globals_1.test)("Testing to guard success", () => {
        const testUser = {
            id: 123,
            name: "Lisa",
            age: 19
        };
        (0, globals_1.expect)(predicates.guard(testUser)).toEqual(true);
    });
    // type asserter tests
    (0, globals_1.test)("Testing asserter to complete", () => {
        const testUser = {
            id: 123,
            name: "Lisa",
            age: 19
        };
        (0, globals_1.expect)(predicates.assert(testUser)).toEqual(undefined);
    });
    (0, globals_1.test)("Testing asserter to throw error", () => {
        const testUser = {
            id: 123,
            age: 19
        };
        try {
            predicates.assert(testUser);
        }
        catch (error) {
            (0, globals_1.expect)(error).toBeDefined();
        }
    });
});
//# sourceMappingURL=predicatesAndTyping.test.js.map