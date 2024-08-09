import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/redux";

export type NativeState = {
    safeAreaTop: number | null;
    safeAreaBottom: number | null;
    safeAreaLeft: number | null;
    safeAreaRight: number | null;
    screenWidth: number | null;
    screenHeight: number | null;
};

const initialState: NativeState = {
    safeAreaTop: null,
    safeAreaBottom: null,
    safeAreaLeft: null,
    safeAreaRight: null,

    screenWidth: null,
    screenHeight: null,
};

export const slice = createSlice({
    name: "native",
    initialState,
    reducers: {
        setScreenSize: (
            state,
            { payload }: PayloadAction<{ width: number; height: number }>
        ) => {
            state.screenWidth = payload.width;
            state.screenHeight = payload.height;
        },
        setSafeArea: (
            state,
            {
                payload,
            }: PayloadAction<{
                top: number;
                left: number;
                right: number;
                bottom: number;
            }>
        ) => {
            state.safeAreaTop = payload.top;
            state.safeAreaLeft = payload.left;
            state.safeAreaRight = payload.right;
            state.safeAreaBottom = payload.bottom;
        },
    },
});

export const { setScreenSize, setSafeArea } = slice.actions;

export const reduxNativeSelector = () =>
    useSelector((state: RootState) => state.native);

export const nativeReducer = slice.reducer;
