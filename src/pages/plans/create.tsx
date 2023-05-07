import {LoadingModal} from "src/view/common/LoadingModal";
import React, {useEffect} from "react";
import {reduxPlanSelector} from "src/redux/plan";
import {useRouter} from "next/router";
import {Routes} from "src/view/constants/router";

// TODO: 作成中でないときはトップに戻す
export default function CreatePlanPage() {
    const router = useRouter();
    const {createPlanSession} = reduxPlanSelector();

    useEffect(() => {
        if (!createPlanSession) return;

        router.push(Routes.plans.select(createPlanSession)).then();
    }, [createPlanSession]);

    return <LoadingModal title="プランを作成しています"/>
}