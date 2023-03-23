import {combineReducers} from "redux";
import {configureStore} from "@reduxjs/toolkit";
import {planReducer} from "src/redux/plan";

const reducer = combineReducers({
    plan: planReducer
})

export const reduxStore = configureStore({
    reducer,
    devTools: true,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        thunk: true,
        immutableCheck: true,
        serializableCheck: true
    })
})

export type RootState = ReturnType<typeof reducer>;
export type AppDispatch = typeof reduxStore.dispatch;