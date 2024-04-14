import { notEmpty } from "src/domain/util/null";

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
