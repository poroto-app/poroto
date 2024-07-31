import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/redux";

export type NativeState = {
    screenWidth: number | null;
};

const initialState: NativeState = {
    screenWidth: null,
};

export const slice = createSlice({
    name: "native",
    initialState,
    reducers: {
        setScreenWidth: (state, action) => {
            state.screenWidth = action.payload;
        },
    },
});

export const { setScreenWidth } = slice.actions;

export const reduxNativeSelector = () =>
    useSelector((state: RootState) => state.native);

export const nativeReducer = slice.reducer;
