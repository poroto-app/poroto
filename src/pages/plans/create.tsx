import { LoadingModal } from "src/view/common/LoadingModal";
import React, { useEffect } from "react";
import { createPlanFromLocation, reduxPlanSelector } from "src/redux/plan";
import { useRouter } from "next/router";
import { Routes } from "src/view/constants/router";
import { reduxLocationSelector } from "src/redux/location";
import { useAppDispatch } from "src/redux/redux";
import { PageTransitions, reduxHistorySelector } from "src/redux/history";

// TODO: 「戻るボタン」、「進むボタン」、「URLで直接ページを開く」場合の対応をしなくてもいいルーティングにする
export default function CreatePlanPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { searchLocation } = reduxLocationSelector();
    const { createPlanSession, categoryAccepted } = reduxPlanSelector();
    const { transition } = reduxHistorySelector();

    // HACK: このページに「戻るボタン」やURLを叩いて直接遷移してきた場合は、さらに前のページに戻す
    useEffect(() => {
        if (!searchLocation) {
            // URLを直接叩いて遷移してきた場合
            router.push(Routes.home).then();
        } else if (transition === PageTransitions.POP) {
            // 戻るボタンで遷移してきた場合
            router.back();
        } else if (transition === PageTransitions.CHANGE) {
            // 指定した場所からプランを作成する
            // （興味を聞く画面から画面遷移で来たときのみ）
            dispatch(
                createPlanFromLocation({
                    location: searchLocation,
                    categories: categoryAccepted,
                })
            );
        }
    }, []);

    // プランが作成されたら、プラン作成画面に遷移する
    useEffect(() => {
        if (!createPlanSession) return;
        router.push(Routes.plans.select(createPlanSession)).then();
    }, [createPlanSession]);

    return <LoadingModal title="プランを作成しています" />;
}
