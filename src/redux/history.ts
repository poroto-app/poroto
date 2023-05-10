import { createSlice } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/redux";

export type HistoryState = {
    // 一つ前のページがporoto内のページかとうかを判別するための値
    // ページリンクによる遷移で+1
    // 戻るボタンによる遷移で-1
    historyStack: number;
};

const initialState: HistoryState = {
    historyStack: 0,
};

export const slice = createSlice({
    name: 'history',
    initialState,
    reducers: {
        pushHistoryStack: (state) => {
            state.historyStack += 1;
        },
        popHistoryStack: (state) => {
            state.historyStack -= 1;
        },
    },
});

export const { pushHistoryStack, popHistoryStack } = slice.actions;

export const reduxHistorySelector = () => useSelector((state: RootState) => state.history);
export const historyReducer = slice.reducer;