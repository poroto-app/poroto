import { LoadingModal } from "src/view/common/LoadingModal";
import React, { useEffect } from "react";
import { createPlanFromLocation, reduxPlanSelector } from "src/redux/plan";
import { useRouter } from "next/router";
import { Routes } from "src/view/constants/router";
import { reduxLocationSelector } from "src/redux/location";
import { useAppDispatch } from "src/redux/redux";

// TODO: 作成中でないときはトップに戻す
export default function CreatePlanPage() {
    const router = useRouter();
    const dispatch = useAppDispatch();
    const { searchLocation } = reduxLocationSelector();
    const { createPlanSession, categoryAccepted } = reduxPlanSelector();

    // 指定した場所からプランを作成する
    useEffect(() => {
        if (!searchLocation || !categoryAccepted) return;
        dispatch(
            createPlanFromLocation({
                location: searchLocation,
                categories: categoryAccepted,
            })
        );
    }, [searchLocation, categoryAccepted]);

    // プランが作成されたら、プラン作成画面に遷移する
    useEffect(() => {
        if (!createPlanSession) return;

        router.push(Routes.plans.select(createPlanSession)).then();
    }, [createPlanSession]);

    return <LoadingModal title="プランを作成しています" />;
}
