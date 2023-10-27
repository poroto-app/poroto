import { Link } from "@chakra-ui/next-js";
import { Box, Text, VStack } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import {
    createPlanFromPlace,
    fetchAvailablePlacesForPlan,
    fetchCachedCreatedPlans,
    reduxPlanCandidateSelector,
    resetCreatePlanFromPlaceRequestStatus,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import EmptyIcon from "src/view/assets/svg/empty.svg";
import { ButtonWithBlur } from "src/view/common/ButtonWithBlur";
import { ErrorPage } from "src/view/common/ErrorPage";
import { Layout } from "src/view/common/Layout";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { NotFound } from "src/view/common/NotFound";
import { Routes } from "src/view/constants/router";
import { AvailablePlaceSection } from "src/view/plan/candidate/AvailablePlaceSection";
import { GeneratingPlanDialog } from "src/view/plan/candidate/GeneratingPlanDialog";
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
    const refPlanCandidateGallery = useRef<HTMLDivElement>(null);

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

        // プラン取得中は何もしない
        if (!plansCreated) return;

        dispatch(fetchAvailablePlacesForPlan({ session: sessionId }));
    }, [sessionId, plansCreated?.length]);

    // 指定した場所からプランを作成できたら、そのプランが選択されている状態にする
    useEffect(() => {
        if (createPlanFromPlaceRequestStatus !== RequestStatuses.FULFILLED)
            return;
        if (!plansCreated || plansCreated.length === 0) return;
        if (!createPlanSession) return;

        dispatch(resetCreatePlanFromPlaceRequestStatus());
        setSelectedPlanIndex(plansCreated.length - 1);

        // プラン一覧の上部にスクロールする
        refPlanCandidateGallery.current?.scrollIntoView();
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
        // ページ読み込み直後
        const isLoadingPlan =
            !fetchCachedCreatedPlansRequestStatus &&
            !createPlanFromLocationRequestStatus;
        // プラン作成中
        const isCreatingPlanFromLocation =
            createPlanFromLocationRequestStatus === RequestStatuses.PENDING;
        // プラン候補取得中
        const isFetchingPlanCandidate =
            fetchCachedCreatedPlansRequestStatus === RequestStatuses.PENDING;

        if (
            isLoadingPlan ||
            isCreatingPlanFromLocation ||
            isFetchingPlanCandidate
        )
            return <LoadingModal title="プランを作成しています" />;

        // プラン候補取得失敗
        if (fetchCachedCreatedPlansRequestStatus === RequestStatuses.REJECTED)
            return <ErrorPage />;

        // プラン候補が存在しない
        return <NotFound />;
    }

    // プラン生成に失敗した場合、他の場所からプランを作成できるようにする
    if (plansCreated.length === 0)
        return (
            <Layout navBar={<NavBar />}>
                <GeneratingPlanDialog
                    visible={[
                        RequestStatuses.PENDING,
                        RequestStatuses.REJECTED,
                    ].includes(createPlanFromPlaceRequestStatus)}
                    onClose={() =>
                        dispatch(resetCreatePlanFromPlaceRequestStatus())
                    }
                    failed={
                        createPlanFromPlaceRequestStatus ===
                        RequestStatuses.REJECTED
                    }
                />
                <VStack pb="48px" px="16px" w="100%">
                    <VStack py="48px" spacing="32px">
                        <Box w="100%" maxW="300px">
                            <EmptyIcon
                                viewBox="0 0 862.70323 644.78592"
                                style={{
                                    width: "100%",
                                    height: "100%",
                                }}
                            />
                        </Box>
                        <VStack spacing="8px">
                            <Text fontSize="1.2rem" fontWeight="bold">
                                プランを作成できませんでした
                            </Text>
                            <Text>
                                他の場所からプランを作成してみませんか？
                            </Text>
                        </VStack>
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

    return (
        <Layout navBar={<NavBar />}>
            <GeneratingPlanDialog
                visible={[
                    RequestStatuses.PENDING,
                    RequestStatuses.REJECTED,
                ].includes(createPlanFromPlaceRequestStatus)}
                onClose={() =>
                    dispatch(resetCreatePlanFromPlaceRequestStatus())
                }
                failed={
                    createPlanFromPlaceRequestStatus ===
                    RequestStatuses.REJECTED
                }
            />
            <VStack
                w="100%"
                px="16px"
                py="16px"
                spacing={8}
                ref={refPlanCandidateGallery}
            >
                <VStack spacing="32px" my="32px">
                    <PlanCandidatesGallery
                        planCandidates={plansCreated}
                        activePlanIndex={selectedPlanIndex}
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
