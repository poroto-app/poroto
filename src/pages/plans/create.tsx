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
    const { searchLocation, currentLocation } = reduxLocationSelector();
    const { createPlanSession, categoryAccepted, timeForPlan } =
        reduxPlanSelector();
    const { transition } = reduxHistorySelector();

    // HACK: このページに「戻るボタン」やURLを叩いて直接遷移してきた場合は、さらに前のページに戻す
    useEffect(() => {
        if (!searchLocation) {
            // URLを直接叩いて遷移してきた場合
            router.push(Routes.home).then();
        } else if (transition === PageTransitions.POP) {
            // 戻るボタンで遷移してきた場合
            router.back();
        } else if ([null, PageTransitions.CHANGE].includes(transition)) {
            // 指定した場所からプランを作成する
            //  change: 画面遷移で来た場合
            //  null: POP後に遷移してきた場合
            const createBasedOnCurrentLocation =
                currentLocation !== null &&
                currentLocation.latitude === searchLocation.latitude &&
                currentLocation.longitude === searchLocation.longitude;

            // HACK: 画面が読み込まれた直後の値が保持されるため、resetInterestの影響を受けない
            // TODO: プラン作成時に適切のreduxの状態を使えるようにする（戻るボタンを押したときに最初から操作できるようにする）
            dispatch(
                createPlanFromLocation({
                    location: searchLocation,
                    categories: categoryAccepted,
                    isCurrentLocation: createBasedOnCurrentLocation,
                    timeForPlan: timeForPlan,
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
