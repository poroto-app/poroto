import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { combineReducers } from "redux";
import { historyReducer } from "src/redux/history";
import { locationReducer } from "src/redux/location";
import { placeSearchReducer } from "src/redux/placeSearch";
import { planReducer } from "src/redux/plan";
import { planCandidateReducer } from "src/redux/planCandidate";

const reducer = combineReducers({
    plan: planReducer,
    planCandidate: planCandidateReducer,
    placeSearch: placeSearchReducer,
    location: locationReducer,
    history: historyReducer,
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
