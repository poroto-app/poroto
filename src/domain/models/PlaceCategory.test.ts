import { describe, expect, test } from "@jest/globals";
import {
    getPlaceCategoryType,
    PlaceCategory,
    PlaceCategoryType,
    PlaceCategoryTypes,
} from "src/domain/models/PlaceCategory";

describe("getPlaceCategoryType", () => {
    const cases: {
        name: string;
        category: PlaceCategory;
        expected: PlaceCategoryType | null;
    }[] = [
        {
            name: "should return null when category is not in PlaceCategoryTypes",
            category: {
                id: "not_in_place_category_types",
                displayName: "not_in_place_category_types",
            },
            expected: null,
        },
        {
            name: "should return category id when category is in PlaceCategoryTypes",
            category: {
                id: "amusements",
                displayName: "amusements",
            },
            expected: PlaceCategoryTypes.Amusements,
        },
    ];

    cases.forEach((c) =>
        test(c.name, () => {
            const actual = getPlaceCategoryType(c.category);
            expect(actual).toEqual(c.expected);
        })
    );
});
