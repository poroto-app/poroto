import { Center, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    createPlanFromPlace,
    fetchAvailablePlacesForPlan,
    fetchCachedCreatedPlans,
    reduxPlanCandidateSelector,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { Layout } from "src/view/common/Layout";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { Routes } from "src/view/constants/router";
import { AvailablePlaceSection } from "src/view/plan/candidate/AvailablePlaceSection";
import { PlanPreview } from "src/view/plan/PlanPreview";

const SelectPlanPage = () => {
    const dispatch = useAppDispatch();
    const {
        plansCreated,
        createPlanSession,
        placesAvailableForPlan,
        fetchAvailablePlacesForPlanRequestStatus,
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

    useEffect(() => {
        if (!sessionId || typeof sessionId !== "string") return;
        // TODO: 実際に使えるようにする
        if (process.env.NODE_ENV !== "production") {
            dispatch(fetchAvailablePlacesForPlan({ session: sessionId }));
        }
    }, [sessionId]);

    const handleOnClickPlaceCandidate = (placeId: string) => {
        if (!sessionId || typeof sessionId !== "string") return;
        if (createPlanFromPlaceRequestStatus === RequestStatuses.PENDING)
            return;
        dispatch(
            createPlanFromPlace({ placeId, createPlanSessionId: sessionId })
        );
    };

    if (!plansCreated) {
        // TODO: ホームに戻れる404ページを作る
        // sessionに紐づくプランが存在しない
        if (createPlanSession) return <h1>Not Found</h1>;

        return <LoadingModal title="プランを取得しています" />;
    }

    // TODO: プラン作成失敗 or 直接このページに来たときははじく
    if (plansCreated.length === 0)
        return (
            <Center>
                <Text>プランを作成することができませんでした。</Text>
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
                {
                    // TODO: 実際に利用できるようにする
                    process.env.NODE_ENV !== "production" && (
                        <AvailablePlaceSection
                            places={placesAvailableForPlan}
                            isFetching={
                                fetchAvailablePlacesForPlanRequestStatus ===
                                RequestStatuses.PENDING
                            }
                            onClickPlace={handleOnClickPlaceCandidate}
                        />
                    )
                }
            </VStack>
        </Layout>
    );
};

export default SelectPlanPage;
