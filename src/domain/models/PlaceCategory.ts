export type PlaceCategory = {
    id: string;
};

// SEE: https://github.com/poroto-app/planner/blob/develop/internal/domain/models/category.go
export const PlaceCategoryTypes = {
    Amusements: "amusements",
    BookStores: "book_store",
    Cafe: "cafe",
    Camp: "camp",
    Culture: "culture",
    Natural: "natural",
    Park: "park",
    Restaurant: "restaurant",
    Library: "library",
    MealTakeaway: "meal_takeaway",
    Shopping: "shopping",
};
export type PlaceCategoryType =
    (typeof PlaceCategoryTypes)[keyof typeof PlaceCategoryTypes];

export function getPlaceCategoryType(
    category: PlaceCategory
): PlaceCategoryType | null {
    if (Object.values(PlaceCategoryTypes).includes(category.id)) {
        return category.id as PlaceCategoryType;
    }

    return null;
}
