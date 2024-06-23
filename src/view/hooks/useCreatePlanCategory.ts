import { useState } from "react";
import { CreatePlanPlaceCategory } from "src/domain/models/CreatePlanPlaceCategory";
import { GeoLocation } from "src/domain/models/GeoLocation";

export const useCreatePlanCategory = () => {
    const [category, setCategory] = useState<CreatePlanPlaceCategory>(null);
    const [
        isCreatePlanCategoryRangeDialogVisible,
        setIsCreatePlanCategoryRangeDialogVisible,
    ] = useState(false);
    const [mapCenter, setMapCenter] = useState<GeoLocation>(null);

    const onSelectCreatePlanCategory = ({
        category,
    }: {
        category: CreatePlanPlaceCategory;
    }) => {
        setCategory(category);
        setIsCreatePlanCategoryRangeDialogVisible(true);
    };

    const onCloseCreatePlanCategoryRangeDialog = () => {
        setIsCreatePlanCategoryRangeDialogVisible(false);
        setCategory(null);
        setMapCenter(null);
    };

    const onSelectCreatePlanRange = ({
        range,
        location,
    }: {
        range: number;
        location: GeoLocation;
    }) => {};

    return {
        category,
        mapCenter,
        isCreatePlanCategoryRangeDialogVisible,
        setMapCenter,
        onSelectCreatePlanCategory,
        onSelectCreatePlanRange,
        onCloseCreatePlanCategoryRangeDialog,
    };
};
