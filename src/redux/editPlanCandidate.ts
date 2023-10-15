import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { Place } from "src/domain/models/Place";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import {
    createPlaceFromPlaceEntity,
    createPlanFromPlanEntity,
    PlannerApi,
} from "src/domain/plan/PlannerApi";
import { updatePlanOfPlanCandidate } from "src/redux/planCandidate";
import { RootState } from "src/redux/redux";

export type EditPlanCandidateState = {
    placesToReplace: Place[] | null;
    requestStatusFetchPlacesToReplace: RequestStatus | null;
    requestStatusReplacePlaceOfPlanCandidate: RequestStatus | null;
};

const initialState: EditPlanCandidateState = {
    placesToReplace: null,
    requestStatusFetchPlacesToReplace: null,
    requestStatusReplacePlaceOfPlanCandidate: null,
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

export const slice = createSlice({
    name: "editPlanCandidate",
    initialState,
    reducers: {
        resetEditPlanCandidateState: (state) => {
            state.placesToReplace = null;
            state.requestStatusFetchPlacesToReplace = null;
            state.requestStatusReplacePlaceOfPlanCandidate = null;
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
                state.requestStatusFetchPlacesToReplace =
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
            });
    },
});

export const { resetEditPlanCandidateState } = slice.actions;

export const reduxEditPlanCandidateSelector = () =>
    useSelector((state: RootState) => state.editPlanCandidate);

export const editPlanCandidateReducer = slice.reducer;
