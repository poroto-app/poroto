import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useSelector } from "react-redux";
import { RootState } from "src/redux/redux";

export type HistoryState = {
    historyStack: string[];
};

const initialState: HistoryState = {
    historyStack: [],
};

export const slice = createSlice({
    name: "history",
    initialState,
    reducers: {
        pushHistoryStack: (
            state,
            { payload }: PayloadAction<{ historyKey: string }>
        ) => {
            if (state.historyStack[state.historyStack.length - 1] === "POP") {
                // POPイベントがあった場合は、POPの値だけを削除し、履歴の追加は行わない
                state.historyStack.pop();
                return;
            }
            state.historyStack.push(payload.historyKey);
        },
        popHistoryStack: (
            state,
            { payload }: PayloadAction<{ historyKey: string }>
        ) => {
            // POPイベント（「戻るボタン」）の場合は、historyStackにhistoryKeyが存在する(過去にそのページを訪れている)
            // FORWARDイベント（「進むボタン」）の場合は、historyStackにhistoryKeyが存在しない(過去にそのページを訪れたがPOPイベントで削除されている)
            const isPopEvent =
                state.historyStack.indexOf(payload.historyKey) !== -1;
            if (isPopEvent) {
                // 履歴の最後の要素を削除する
                state.historyStack.pop();
                // pushHistoryStack関数にPOPイベントがあったことを伝える
                state.historyStack.push("POP");
            }
        },
    },
});

export const { pushHistoryStack, popHistoryStack } = slice.actions;

export const reduxHistorySelector = () =>
    useSelector((state: RootState) => state.history);
export const historyReducer = slice.reducer;
