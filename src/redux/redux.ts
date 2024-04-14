import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { authReducer } from "src/redux/auth";
import { editPlanCandidateReducer } from "src/redux/editPlanCandidate";
import { historyReducer } from "src/redux/history";
import { locationReducer } from "src/redux/location";
import { placeReducer } from "src/redux/place";
import { placeSearchReducer } from "src/redux/placeSearch";
import { planReducer } from "src/redux/plan";
import { planCandidateReducer } from "src/redux/planCandidate";
import { userReducer } from "src/redux/user";

const reducer = combineReducers({
    auth: authReducer,
    plan: planReducer,
    planCandidate: planCandidateReducer,
    editPlanCandidate: editPlanCandidateReducer,
    placeSearch: placeSearchReducer,
    place: placeReducer,
    location: locationReducer,
    history: historyReducer,
    user: userReducer,
});

export const reduxStore = configureStore({
    reducer,
    devTools: true,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            thunk: true,
            immutableCheck: true,
            serializableCheck: true,
        }),
});

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof reduxStore.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
