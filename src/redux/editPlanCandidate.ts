import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { createPlaceFromPlaceEntity } from "src/domain/factory/Place";
import { createPlanFromPlanEntity } from "src/domain/factory/Plan";
import { Place } from "src/domain/models/Place";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { PlannerApi } from "src/domain/plan/PlannerApi";
import { updatePlanOfPlanCandidate } from "src/redux/planCandidate";
import { RootState } from "src/redux/redux";

export type EditPlanCandidateState = {
    placesToReplace: Place[] | null;
    requestStatusFetchPlacesToReplace: RequestStatus | null;
    requestStatusReplacePlaceOfPlanCandidate: RequestStatus | null;

    placesToAdd: {
        placesRecommend: Place[];
        placesGroupedByCategories: {
            category: PlaceCategory;
            places: Place[];
        }[];
    } | null;
    requestStatusFetchPlacesToAdd: RequestStatus | null;
    requestStatusAddPlaceToPlanCandidate: RequestStatus | null;
    requestStatusDeletePlaceFromPlanOfPlanCandidate: RequestStatus | null;
};

const initialState: EditPlanCandidateState = {
    placesToReplace: null,
    requestStatusFetchPlacesToReplace: null,
    requestStatusReplacePlaceOfPlanCandidate: null,

    placesToAdd: null,
    requestStatusFetchPlacesToAdd: null,
    requestStatusAddPlaceToPlanCandidate: null,
    requestStatusDeletePlaceFromPlanOfPlanCandidate: null,
};

type FetchPlacesToReplaceProps = {
    planCandidateId: string;
    planId: string;
    placeId: string;
};
export const fetchPlacesToReplace = createAsyncThunk(
    "editPlanCandidate/fetchPlacesToReplace",
    async ({ planCandidateId, planId, placeId }: FetchPlacesToReplaceProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const { places } =
            await plannerApi.fetchPlacesToReplaceForPlanOfPlanCandidate({
                planCandidateId,
                planId,
                placeId,
            });
        return {
            places: places.map((place) => createPlaceFromPlaceEntity(place)),
        };
    }
);

type ReplacePlaceOfPlanCandidateProps = {
    planCandidateId: string;
    planId: string;
    placeIdToReplace: string;
    placeIdToAdd: string;
};
export const replacePlaceOfPlanCandidate = createAsyncThunk(
    "editPlanCandidate/replacePlaceOfPlanCandidate",
    async (
        {
            planCandidateId,
            planId,
            placeIdToReplace,
            placeIdToAdd,
        }: ReplacePlaceOfPlanCandidateProps,
        { dispatch }
    ) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const { plan } = await plannerApi.replacePlaceInPlanOfPlanCandidate({
            planCandidateId,
            planId,
            placeIdToReplace,
            placeIdToAdd,
        });

        dispatch(
            updatePlanOfPlanCandidate({
                plan: createPlanFromPlanEntity(plan, null),
            })
        );

        return {
            plan: createPlanFromPlanEntity(plan, null),
        };
    }
);

type FetchPlacesToAddForPlanOfPlanCandidateProps = {
    planCandidateId: string;
    planId: string;
};
export const fetchPlacesToAddToPlanCandidate = createAsyncThunk(
    "editPlanCandidate/FetchPlacesToAddForPlanOfPlanCandidate",
    async ({
        planCandidateId,
        planId,
    }: FetchPlacesToAddForPlanOfPlanCandidateProps) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const { placesRecommend, placesGroupedByCategories } =
            await plannerApi.fetchPlacesToAddForPlanOfPlanCandidate({
                planCandidateId,
                planId,
            });

        return {
            places: placesRecommend.map((place) =>
                createPlaceFromPlaceEntity(place)
            ),
            placesGroupedByCategories: placesGroupedByCategories.map(
                (placeGroupedByCategory) => ({
                    category: placeGroupedByCategory.category,
                    places: placeGroupedByCategory.places.map((place) =>
                        createPlaceFromPlaceEntity(place)
                    ),
                })
            ),
        };
    }
);

type AddPlaceToPlanCandidateProps = {
    planCandidateId: string;
    planId: string;
    previousPlaceId: string;
    placeId: string;
};
export const addPlaceToPlanOfPlanCandidate = createAsyncThunk(
    "editPlanCandidate/AddPlaceToPlanOfPlanCandidate",
    async (
        {
            planCandidateId,
            planId,
            previousPlaceId,
            placeId,
        }: AddPlaceToPlanCandidateProps,
        { dispatch }
    ) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const { plan } = await plannerApi.addPlaceToPlanOfPlanCandidate({
            planCandidateId,
            planId,
            previousPlaceId,
            placeId,
        });

        dispatch(
            updatePlanOfPlanCandidate({
                plan: createPlanFromPlanEntity(plan, null),
            })
        );

        return {
            plan: createPlanFromPlanEntity(plan, null),
        };
    }
);

type DeletePlaceFromPlanOfPlanCandidateProps = {
    planCandidateId: string;
    planId: string;
    placeId: string;
};
export const deletePlaceFromPlanOfPlanCandidate = createAsyncThunk(
    "editPlanCandidate/deletePlaceFromPlanOfPlanCandidate",
    async (
        {
            planCandidateId,
            planId,
            placeId,
        }: DeletePlaceFromPlanOfPlanCandidateProps,
        { dispatch }
    ) => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        const { plan } = await plannerApi.deletePlaceFromPlanOfPlanCandidate({
            planCandidateId,
            planId,
            placeId,
        });

        dispatch(
            updatePlanOfPlanCandidate({
                plan: createPlanFromPlanEntity(plan, null),
            })
        );

        return {
            plan: createPlanFromPlanEntity(plan, null),
        };
    }
);

export const slice = createSlice({
    name: "editPlanCandidate",
    initialState,
    reducers: {
        resetReorderPlaceOfPlanCandidateState: (state) => {
            state.placesToReplace = null;
            state.requestStatusFetchPlacesToReplace = null;
            state.requestStatusReplacePlaceOfPlanCandidate = null;
        },
        resetAddPlaceToPlanCandidateState: (state) => {
            state.placesToAdd = null;
            state.requestStatusFetchPlacesToAdd = null;
            state.requestStatusAddPlaceToPlanCandidate = null;
        },
    },
    extraReducers: (builder) => {
        builder
            // Fetch Places To Replace
            .addCase(fetchPlacesToReplace.pending, (state) => {
                state.requestStatusFetchPlacesToReplace =
                    RequestStatuses.PENDING;
                state.placesToReplace = null;
            })
            .addCase(
                fetchPlacesToReplace.fulfilled,
                (state, { payload: { places } }) => {
                    state.requestStatusFetchPlacesToReplace =
                        RequestStatuses.FULFILLED;
                    state.placesToReplace = places;
                }
            )
            .addCase(fetchPlacesToReplace.rejected, (state) => {
                state.requestStatusReplacePlaceOfPlanCandidate =
                    RequestStatuses.REJECTED;
                state.placesToReplace = null;
            })
            // Replace Place Of Plan Candidate
            .addCase(replacePlaceOfPlanCandidate.pending, (state) => {
                state.requestStatusReplacePlaceOfPlanCandidate =
                    RequestStatuses.PENDING;
                state.placesToReplace = null;
            })
            .addCase(
                replacePlaceOfPlanCandidate.fulfilled,
                (state, { payload: { plan } }) => {
                    state.requestStatusReplacePlaceOfPlanCandidate =
                        RequestStatuses.FULFILLED;
                    state.placesToReplace = null;
                }
            )
            .addCase(replacePlaceOfPlanCandidate.rejected, (state) => {
                state.requestStatusReplacePlaceOfPlanCandidate =
                    RequestStatuses.REJECTED;
                state.placesToReplace = null;
            })
            // Fetch Places To Add To Plan Candidate
            .addCase(fetchPlacesToAddToPlanCandidate.pending, (state) => {
                state.requestStatusFetchPlacesToAdd = RequestStatuses.PENDING;
                state.placesToAdd = null;
            })
            .addCase(
                fetchPlacesToAddToPlanCandidate.fulfilled,
                (state, { payload: { places, placesGroupedByCategories } }) => {
                    state.requestStatusFetchPlacesToAdd =
                        RequestStatuses.FULFILLED;
                    state.placesToAdd = {
                        placesRecommend: places,
                        placesGroupedByCategories: placesGroupedByCategories,
                    };
                }
            )
            .addCase(fetchPlacesToAddToPlanCandidate.rejected, (state) => {
                state.requestStatusFetchPlacesToAdd = RequestStatuses.REJECTED;
                state.placesToAdd = null;
            })
            // Add Place To Plan Of Plan Candidate
            .addCase(addPlaceToPlanOfPlanCandidate.pending, (state) => {
                state.requestStatusAddPlaceToPlanCandidate =
                    RequestStatuses.PENDING;
                state.placesToAdd = null;
            })
            .addCase(addPlaceToPlanOfPlanCandidate.fulfilled, (state) => {
                state.requestStatusAddPlaceToPlanCandidate =
                    RequestStatuses.FULFILLED;
                state.placesToAdd = null;
            })
            .addCase(addPlaceToPlanOfPlanCandidate.rejected, (state) => {
                state.requestStatusAddPlaceToPlanCandidate =
                    RequestStatuses.REJECTED;
                state.placesToAdd = null;
            })
            // Delete Place From Plan Of Plan Candidate
            .addCase(deletePlaceFromPlanOfPlanCandidate.pending, (state) => {
                state.requestStatusDeletePlaceFromPlanOfPlanCandidate =
                    RequestStatuses.PENDING;
            })
            .addCase(deletePlaceFromPlanOfPlanCandidate.fulfilled, (state) => {
                state.requestStatusDeletePlaceFromPlanOfPlanCandidate =
                    RequestStatuses.FULFILLED;
            })
            .addCase(deletePlaceFromPlanOfPlanCandidate.rejected, (state) => {
                state.requestStatusDeletePlaceFromPlanOfPlanCandidate =
                    RequestStatuses.REJECTED;
            });
    },
});

export const {
    resetReorderPlaceOfPlanCandidateState,
    resetAddPlaceToPlanCandidateState,
} = slice.actions;

export const reduxEditPlanCandidateSelector = () =>
    useSelector((state: RootState) => state.editPlanCandidate);

export const editPlanCandidateReducer = slice.reducer;
