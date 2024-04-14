import { notEmpty, when } from "src/domain/util/null";

describe("notEmpty", () => {
    const cases: {
        name: string;
        value: number | null | undefined;
        expected: boolean;
    }[] = [
        {
            name: "null",
            value: null,
            expected: false,
        },
        {
            name: "undefined",
            value: undefined,
            expected: false,
        },
        {
            name: "number",
            value: 1,
            expected: true,
        },
        {
            name: "zero value",
            value: 0,
            expected: true,
        },
    ];

    cases.forEach((c) =>
        test(c.name, () => {
            const actual = notEmpty(c.value);
            expect(actual).toEqual(c.expected);
        })
    );
});

describe("when", () => {
    const cases: {
        name: string;
        condition: boolean;
        value: number;
        expected: number | undefined;
    }[] = [
        {
            name: "should return value when condition is true",
            condition: true,
            value: 1,
            expected: 1,
        },
        {
            name: "should return undefined when condition is false",
            condition: false,
            value: 1,
            expected: undefined,
        },
    ];

    cases.forEach((c) =>
        test(c.name, () => {
            const actual = when(c.condition, c.value);
            expect(actual).toEqual(c.expected);
        })
    );
});
