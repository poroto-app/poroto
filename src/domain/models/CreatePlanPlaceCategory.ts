export type CreatePlanPlaceCategorySet = {
    displayName: string;
    categories: CreatePlanPlaceCategory[];
};

export type CreatePlanPlaceCategory = {
    id: string;
    displayName: string;
    imageUrl: string;
};
