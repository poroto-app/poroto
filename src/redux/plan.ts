import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Plan, PlanEntry} from "src/domain/plan/Plan";
import {PlannerApi} from "src/data/api/planner/PlannerApi";
import {useSelector} from "react-redux";
import {RootState} from "src/redux/redux";

export type PlanState = {
    // TODO: ここもPlanで管理する（提示するプランは３件だけでデータ量も多くないはずだから）
    plans: PlanEntry[] | null,
    preview: Plan | null,
}

const initialState: PlanState = {
    plans: null,
    preview: null,
}

type CreatePlanFromCurrentLocationProps = {
    location: {
        latitude: number,
        longitude: number,
    }
};
export const createPlanFromLocation = createAsyncThunk(
    'plan/createPlanFromCurrentLocation',
    async ({location}: CreatePlanFromCurrentLocationProps, {dispatch}) => {
        const plannerApi = new PlannerApi();
        const response = await plannerApi.createPlansFromLocation({location: location});
        const plans: PlanEntry[] = response.plans.map((plan) => ({
            id: plan.id,
            title: plan.title,
            imageUrls: plan.places.flatMap((place) => place.imageUrls),
            tags: plan.tags
        }));
        dispatch(setPlans({plans}))
    }
)

export const slice = createSlice({
    name: 'plan',
    initialState,
    reducers: {
        setPlans: (state, {payload}: PayloadAction<{ plans: PlanEntry[] | null }>) => {
            state.plans = payload.plans;
        },
        fetchPlanDetail: (state, {payload}: PayloadAction<{ planId: string }>) => {
            if (!state.plans) return;
            const entry = state.plans.find((plan) => plan.id === payload.planId);
            state.preview = {
                // TODO: replace
                id: entry.id,
                title: entry.title,
                places: [
                    {
                        name: "poroto書店",
                        imageUrls: [
                            "https://picsum.photos/200",
                            "https://picsum.photos/300",
                            "https://picsum.photos/400",
                        ],
                        tags: [
                            "書店",
                            "駅チカ",
                        ]
                    },
                    {
                        name: "スターバックス・コーヒー poroto店",
                        imageUrls: [
                            "https://picsum.photos/300/400",
                            "https://picsum.photos/1280/720",
                            "https://picsum.photos/400/600",
                        ],
                        tags: [
                            "スタバ",
                            "季節限定",
                            "もも",
                        ]
                    }
                ]
            }
        },
    },
    extraReducers: (builder) => {

    },
});

export const {
    setPlans,
    fetchPlanDetail,
} = slice.actions;

export const reduxPlanSelector = () => useSelector((state: RootState) => state.plan);

export const planReducer = slice.reducer;