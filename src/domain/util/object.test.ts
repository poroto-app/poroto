import {describe, test, expect} from '@jest/globals';
import {copyObject} from "src/domain/util/object";

describe("copyObject", () => {
    const cases: {
        name: string,
        object: any,
        expected: any,
    }[] = [
        {
            name: "copy json object",
            object: { name: "Alice" },
            expected: { name: "Alice" }
        },
        {
            name: "the copy of null is null",
            object: null,
            expected: null,
        },
        {
            name: "the copy of undefined is undefined",
            object: undefined,
            expected: undefined
        }
    ]

    cases.forEach((c) => test(c.name, () => {
        const actual = copyObject(c.object);
        expect(actual).toEqual(c.expected);
    }));
})