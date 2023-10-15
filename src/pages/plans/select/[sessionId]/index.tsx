import { Link } from "@chakra-ui/next-js";
import { Center, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    createPlanFromPlace,
    fetchAvailablePlacesForPlan,
    fetchCachedCreatedPlans,
    reduxPlanCandidateSelector,
    resetCreatePlanFromPlaceRequestStatus,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { ButtonWithBlur } from "src/view/common/ButtonWithBlur";
import { ErrorPage } from "src/view/common/ErrorPage";
import { Layout } from "src/view/common/Layout";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { NotFound } from "src/view/common/NotFound";
import { Routes } from "src/view/constants/router";
import { AvailablePlaceSection } from "src/view/plan/candidate/AvailablePlaceSection";
import { GeneratingPlanDialog } from "src/view/plan/candidate/GeneratingPlanDialog";
import { PlanGenerationFailure } from "src/view/plan/PlanGenerationFailure";
import { PlanCandidatesGallery } from "src/view/plancandidate/PlanCandidatesGallery";

const SelectPlanPage = () => {
    const dispatch = useAppDispatch();
    const {
        plansCreated,
        createPlanSession,
        placesAvailableForPlan,
        fetchCachedCreatedPlansRequestStatus,
        fetchAvailablePlacesForPlanRequestStatus,
        createPlanFromLocationRequestStatus,
        createPlanFromPlaceRequestStatus,
    } = reduxPlanCandidateSelector();

    const router = useRouter();
    const { sessionId } = router.query;
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);

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
        if (!plansCreated || plansCreated.length === 0) return;

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

    if (!plansCreated) {
        if (
            // ページ読み込み直後
            (!fetchCachedCreatedPlansRequestStatus &&
                !createPlanFromLocationRequestStatus) ||
            // プラン作成中
            createPlanFromLocationRequestStatus === RequestStatuses.PENDING ||
            // プラン候補取得中
            fetchCachedCreatedPlansRequestStatus === RequestStatuses.PENDING
        )
            return <LoadingModal title="プランを作成しています" />;

        // プラン候補取得失敗
        if (fetchCachedCreatedPlansRequestStatus === RequestStatuses.REJECTED)
            return <ErrorPage />;

        // プラン候補が存在しない
        return <NotFound />;
    }

    // TODO: プラン作成失敗 or 直接このページに来たときははじく
    if (plansCreated.length === 0)
        return (
            <Center h="100%" w="100%">
                <PlanGenerationFailure />
            </Center>
        );

    return (
        <Layout navBar={<NavBar />}>
            {[RequestStatuses.PENDING, RequestStatuses.REJECTED].includes(
                createPlanFromPlaceRequestStatus
            ) && (
                <GeneratingPlanDialog
                    onClose={() =>
                        dispatch(resetCreatePlanFromPlaceRequestStatus())
                    }
                    failed={
                        createPlanFromPlaceRequestStatus ===
                        RequestStatuses.REJECTED
                    }
                />
            )}
            <VStack w="100%" px="16px" py="16px" spacing={8}>
                <VStack spacing="32px" my="32px">
                    <PlanCandidatesGallery
                        planCandidates={plansCreated}
                        onActiveIndexChange={setSelectedPlanIndex}
                    />
                    <Link
                        href={Routes.plans.planCandidate(
                            createPlanSession,
                            plansCreated[selectedPlanIndex].id
                        )}
                    >
                        <ButtonWithBlur
                            px="16px"
                            py="16px"
                            backgroundColor="#84A6FF"
                            borderRadius="50px"
                        >
                            <Text
                                color="white"
                                fontWeight="bold"
                                fontSize="18px"
                            >
                                プランをみてみる
                            </Text>
                        </ButtonWithBlur>
                    </Link>
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
