"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const globals_1 = require("@jest/globals");
const propertiesAggregation_1 = require("../../src/functions/propertiesAggregation");
(0, globals_1.describe)("excludeProperties function", () => {
    (0, globals_1.test)("Excluding properties", () => {
        const initialObject = { a: 12, b: 23, c: 45 };
        (0, globals_1.expect)((0, propertiesAggregation_1.excludeProperties)(initialObject, "a", "b")).toEqual({ c: 45 });
        (0, globals_1.expect)(initialObject).toEqual({ c: 45 });
    });
});
(0, globals_1.describe)("pickProperties function", () => {
    (0, globals_1.test)("Picking properties", () => {
        const initialObject = { a: 12, b: 23, c: 45 };
        (0, globals_1.expect)((0, propertiesAggregation_1.pickProperties)(initialObject, "a", "b")).toEqual({ a: 12, b: 23 });
        (0, globals_1.expect)(initialObject).toEqual({ a: 12, b: 23 });
    });
});
//# sourceMappingURL=propertiesAggregation.test.js.map