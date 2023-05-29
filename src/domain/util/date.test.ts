import { describe, expect, test } from "@jest/globals";
import { DateHelper } from "src/domain/util/date";

describe("formatHHMM", () => {
    const cases: {
        name: string;
        timeInMinute: number;
        delimiterHour: string;
        delimiterMinute: string;
        expected: string;
    }[] = [
        {
            name: "0 min",
            timeInMinute: 0,
            delimiterHour: "時間",
            delimiterMinute: "分",
            expected: "0分",
        },
        {
            name: "59 min",
            timeInMinute: 59,
            delimiterHour: "時間",
            delimiterMinute: "分",
            expected: "59分",
        },
        {
            name: "60 min = 1 h",
            timeInMinute: 60,
            delimiterHour: "時間",
            delimiterMinute: "分",
            expected: "1時間",
        },
        {
            name: "61 min = 1 h 01 min",
            timeInMinute: 61,
            delimiterHour: "時間",
            delimiterMinute: "分",
            expected: "1時間01分",
        }
    ];

    cases.forEach((c) =>
        test(c.name, () => {
            const actual = DateHelper.formatHHMM(c.timeInMinute, {
                hour: c.delimiterHour,
                minute: c.delimiterMinute,
            });
            expect(actual).toEqual(c.expected);
        })
    );
});
