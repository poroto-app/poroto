import { describe, test, expect } from "@jest/globals";
import { createArrayWithSize } from "src/domain/util/array";

describe("createArrayWithSize", () => {
    const cases: {
        name: string;
        size: number;
        expected: number[];
    }[] = [
        {
            name: "size 3 array should be [0, 1, 2]",
            size: 3,
            expected: [0, 1, 2],
        },
        {
            name: "size 0 return empty array",
            size: 0,
            expected: [],
        },
        {
            name: "negative size return empty array",
            size: -1,
            expected: [],
        },
    ];

    cases.forEach((c) =>
        test(c.name, () => {
            const actual = createArrayWithSize(c.size);
            expect(actual).toEqual(c.expected);
        })
    );
});
