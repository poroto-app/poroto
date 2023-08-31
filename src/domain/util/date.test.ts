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
        },
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

describe("roundMinute", () => {
    const cases: {
        name: string;
        timeInMinute: number;
        round: number;
        expected: number;
    }[] = [
        {
            name: "0 min",
            timeInMinute: 0,
            round: 60,
            expected: 0,
        },
        {
            name: "29min rounded by 60min",
            timeInMinute: 29,
            round: 60,
            expected: 0,
        },
        {
            name: "30min rounded by 60min",
            timeInMinute: 30,
            round: 60,
            expected: 60,
        },
        {
            name: "31min rounded by 60min",
            timeInMinute: 31,
            round: 60,
            expected: 60,
        },
        {
            name: "89min rounded by 60min",
            timeInMinute: 89,
            round: 60,
            expected: 60,
        },
        {
            name: "90min rounded by 60min",
            timeInMinute: 90,
            round: 60,
            expected: 120,
        },
        {
            name: "91min rounded by 60min",
            timeInMinute: 91,
            round: 60,
            expected: 120,
        },
    ];

    cases.forEach((c) =>
        test(c.name, () => {
            const actual = DateHelper.roundMinute(c.timeInMinute, c.round);
            expect(actual).toEqual(c.expected);
        })
    );
});
