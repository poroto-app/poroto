import { getAnalytics, logEvent } from "@firebase/analytics";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { AnalyticsEvents } from "src/constant/analytics";
import { Routes } from "src/constant/router";
import { CreatePlanPlaceCategory } from "src/domain/models/CreatePlanPlaceCategory";
import { GeoLocation } from "src/domain/models/GeoLocation";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    createPlanByCategory,
    reduxPlanCandidateSelector,
    resetCreatePlanByCategoryRequestStatus,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";

export const useCreatePlanCategory = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [category, setCategory] = useState<CreatePlanPlaceCategory>(null);
    const [
        isCreatePlanCategoryRangeDialogVisible,
        setIsCreatePlanCategoryRangeDialogVisible,
    ] = useState(false);
    const [mapCenter, setMapCenter] = useState<GeoLocation>(null);
    const [isCreatingPlanFromCategory, setIsCreatingPlanFromCategory] =
        useState(false);
    const { createPlanByCategoryRequestStatus, createPlanSession } =
        reduxPlanCandidateSelector();

    const onSelectCreatePlanCategory = ({
        category,
    }: {
        category: CreatePlanPlaceCategory;
    }) => {
        logEvent(
            getAnalytics(),
            AnalyticsEvents.CreatePlan.SelectCreatePlanCategory,
            { category: category.id }
        );
        setCategory(category);
        setIsCreatePlanCategoryRangeDialogVisible(true);
    };

    const onCloseCreatePlanCategoryRangeDialog = () => {
        setIsCreatePlanCategoryRangeDialogVisible(false);
        setCategory(null);
        setMapCenter(null);
        setIsCreatingPlanFromCategory(false);
    };

    const onSelectCreatePlanRange = ({
        rangeInKm,
        location,
    }: {
        rangeInKm: number;
        location: GeoLocation;
    }) => {
        if (!category) return;
        setIsCreatePlanCategoryRangeDialogVisible(false);
        dispatch(
            createPlanByCategory({
                categoryId: category.id,
                rangeInKm,
                location,
            })
        );
        setIsCreatingPlanFromCategory(true);
    };

    useEffect(() => {
        dispatch(resetCreatePlanByCategoryRequestStatus());
        return () => {
            dispatch(resetCreatePlanByCategoryRequestStatus());
        };
    }, []);

    useEffect(() => {
        if (
            createPlanSession &&
            createPlanByCategoryRequestStatus === RequestStatuses.FULFILLED
        ) {
            router
                .push(Routes.plans.planCandidate.index(createPlanSession))
                .then(() => {
                    setIsCreatingPlanFromCategory(false);
                    dispatch(resetCreatePlanByCategoryRequestStatus());
                });
        }
    }, [createPlanSession, createPlanByCategoryRequestStatus]);

    return {
        category,
        mapCenter,
        isCreatePlanCategoryRangeDialogVisible,
        isCreatingPlanFromCategory,
        setMapCenter,
        onSelectCreatePlanCategory,
        onSelectCreatePlanRange,
        onCloseCreatePlanCategoryRangeDialog,
    };
};
