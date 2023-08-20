import { Center, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    createPlanFromPlace,
    fetchAvailablePlacesForPlan,
    fetchCachedCreatedPlans,
    reduxPlanCandidateSelector,
    resetCreatePlanFromPlaceRequestStatus,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { Layout } from "src/view/common/Layout";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { Routes } from "src/view/constants/router";
import { AvailablePlaceSection } from "src/view/plan/candidate/AvailablePlaceSection";
import { PlanGenerationFailure } from "src/view/plan/PlanGenerationFailure";
import { PlanPreview } from "src/view/plan/PlanPreview";

const SelectPlanPage = () => {
    const dispatch = useAppDispatch();
    const {
        plansCreated,
        createPlanSession,
        placesAvailableForPlan,
        fetchAvailablePlacesForPlanRequestStatus,
        createPlanFromLocationRequestStatus,
        createPlanFromPlaceRequestStatus,
    } = reduxPlanCandidateSelector();

    const router = useRouter();
    const { sessionId } = router.query;

    useEffect(() => {
        // ページをリロードしたときのみキャッシュを取得する
        if (!sessionId || typeof sessionId !== "string") return;
        if (!plansCreated) {
            dispatch(fetchCachedCreatedPlans({ session: sessionId }));
        }
    }, [sessionId, plansCreated]);

    // プラン作成の候補地を取得
    useEffect(() => {
        if (!sessionId || typeof sessionId !== "string") return;

        // プラン作成完了前にリクエストが送信されないようにする
        if(!plansCreated || plansCreated.length === 0) return;
        
        dispatch(fetchAvailablePlacesForPlan({ session: sessionId }));
    }, [sessionId, plansCreated]);

    // 指定した場所からプランを作成できたら、そのページへ遷移する
    useEffect(() => {
        if (createPlanFromPlaceRequestStatus !== RequestStatuses.FULFILLED)
            return;
        if (!plansCreated || plansCreated.length === 0) return;
        if (!createPlanSession) return;

        dispatch(resetCreatePlanFromPlaceRequestStatus());
        router
            .push(
                Routes.plans.planCandidate(
                    createPlanSession,
                    plansCreated[plansCreated.length - 1].id
                )
            )
            .then();
    }, [
        createPlanFromPlaceRequestStatus,
        plansCreated?.length,
        createPlanSession,
    ]);

    const handleOnClickPlaceCandidate = (placeId: string) => {
        if (!sessionId || typeof sessionId !== "string") return;
        if (createPlanFromPlaceRequestStatus === RequestStatuses.PENDING)
            return;
        dispatch(
            createPlanFromPlace({ placeId, createPlanSessionId: sessionId })
        );
    };

    // プランを作成中
    if (createPlanFromLocationRequestStatus === RequestStatuses.PENDING)
        return <LoadingModal title="プランを作成しています" />;

    if (!plansCreated) {
        // TODO: ホームに戻れる404ページを作る
        // sessionに紐づくプランが存在しない
        if (createPlanSession) return <h1>Not Found</h1>;

        return <LoadingModal title="プランを取得しています" />;
    }

    // TODO: プラン作成失敗 or 直接このページに来たときははじく
    if (plansCreated.length === 0)
        return (
            <Center h="100%" w="100%">
                <PlanGenerationFailure />
            </Center>
        );

    // 場所を指定してプランを作成中
    if (createPlanFromPlaceRequestStatus === RequestStatuses.PENDING)
        return <LoadingModal title="プランを作成しています" />;

    return (
        <Layout navBar={<NavBar title="プランを選ぶ" />}>
            <VStack w="100%" px="16px" py="16px" spacing={8}>
                <VStack w="100%" spacing={8}>
                    {plansCreated.map((plan, i) => (
                        <PlanPreview
                            plan={plan}
                            key={i}
                            link={Routes.plans.planCandidate(
                                createPlanSession,
                                plan.id
                            )}
                        />
                    ))}
                </VStack>
                <AvailablePlaceSection
                    places={placesAvailableForPlan}
                    isFetching={
                        fetchAvailablePlacesForPlanRequestStatus ===
                        RequestStatuses.PENDING
                    }
                    onClickPlace={handleOnClickPlaceCandidate}
                />
            </VStack>
        </Layout>
    );
};

export default SelectPlanPage;
