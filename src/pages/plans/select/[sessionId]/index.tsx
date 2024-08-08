import { Box, Center, Text, VStack } from "@chakra-ui/react";
import { useRef, useState } from "react";
import { createParam } from "solito";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { usePlanCandidateGalleryPageAutoScroll } from "src/hooks/usePlanCandidateGalleryPageAutoScroll";
import { usePlanCandidateSet } from "src/hooks/usePlanCandidateSet";
import { resetCreatePlanFromPlaceRequestStatus } from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import EmptyIcon from "src/view/assets/svg/empty.svg";
import { ButtonWithBlur } from "src/view/common/ButtonWithBlur";
import { ErrorPage } from "src/view/common/ErrorPage";
import { Layout } from "src/view/common/Layout";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NotFound } from "src/view/common/NotFound";
import { NavBar } from "src/view/navigation/NavBar";
import { AvailablePlaceSection } from "src/view/plan/candidate/AvailablePlaceSection";
import { GeneratingPlanDialog } from "src/view/plan/candidate/GeneratingPlanDialog";
import { PlanCandidatesGallery } from "src/view/plancandidate/PlanCandidatesGallery";
import { PlanDetailPage } from "src/view/plandetail/PlanDetailPage";

const { useParams } = createParam<{ sessionId?: string }>();

const SelectPlanPage = () => {
    const { t } = useAppTranslation();
    const dispatch = useAppDispatch();

    const { sessionId } = useParams().params;
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
    const refPlanCandidateGallery = useRef<HTMLDivElement>(null);
    const {
        plansCreated,
        placesAvailableForPlan,
        isCreatingPlan,
        currentPlanId,
        createPlanFromPlaceRequestStatus,
        createPlanFromLocationRequestStatus,
        fetchAvailablePlacesForPlanRequestStatus,
        fetchCachedCreatedPlansRequestStatus,
        createPlanCandidateFromPlace,
    } = usePlanCandidateSet({
        planCandidateSetId: sessionId as string,
        selectedPlanIndex,
        onCreatedPlanFromPlace: ({ plansCreated }) => {
            // プラン作成完了後、ページトップに移動し、作成されたプランを中央に表示
            setSelectedPlanIndex(plansCreated.length - 1);
            window.scrollTo({
                top: 0,
                behavior: "smooth",
            });
        },
    });
    const { isPlanFooterVisible, planDetailPageRef, scrollToPlanDetailPage } =
        usePlanCandidateGalleryPageAutoScroll({
            planCandidateId: sessionId as string,
            // うまく動作しないことが多いので、一時的に JS によるスクロールスナップを行わない
            isScrollSnapEnabled: false,
        });

    const handleOnCreatePlan = () => {
        // トップまでスクロール(1sスリープ)
        setTimeout(() => {
            window.scrollTo({ top: 0, behavior: "smooth" });
        }, 200);

        // プラン作成中は最後のプランにフォーカスをさせる
        if (plansCreated?.length > 0) {
            setSelectedPlanIndex(plansCreated.length - 1);
        }
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
            return <LoadingModal title={t("plan:createPlanInProgressTitle")} />;

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
                    <VStack py="100px" spacing="32px">
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
                                {t("plan:createPlanFailedTitle")}
                            </Text>
                            <Text>{t("plan:createPlanFailedDescription")}</Text>
                        </VStack>
                    </VStack>
                    <AvailablePlaceSection
                        places={placesAvailableForPlan}
                        isFetching={
                            fetchAvailablePlacesForPlanRequestStatus ===
                            RequestStatuses.PENDING
                        }
                        onClickPlace={(placeId) =>
                            createPlanCandidateFromPlace({ placeId })
                        }
                    />
                </VStack>
            </Layout>
        );

    return (
        <VStack w="100%" spacing={0}>
            <NavBar />
            <Center
                w="100%"
                h={`calc(100vh - ${Size.NavBar.height + "px"})`}
                px="16px"
                ref={refPlanCandidateGallery}
                overflowX="hidden"
            >
                <VStack spacing="32px">
                    <PlanCandidatesGallery
                        planCandidates={plansCreated}
                        activePlanIndex={selectedPlanIndex}
                        isCreating={isCreatingPlan}
                        onActiveIndexChange={setSelectedPlanIndex}
                    />
                    <ButtonWithBlur
                        px={Padding.p16}
                        py={Padding.p16}
                        backgroundColor="#84A6FF"
                        borderRadius={50}
                        onClick={scrollToPlanDetailPage}
                    >
                        <Text color="white" fontWeight="bold" fontSize="18px">
                            {t("plan:showPlan")}
                        </Text>
                    </ButtonWithBlur>
                </VStack>
            </Center>
            <Box w="100%" overflowX="hidden" ref={planDetailPageRef}>
                <PlanDetailPage
                    planId={currentPlanId}
                    planCandidateSetId={sessionId as string}
                    isPlanFooterVisible={isPlanFooterVisible}
                    onCreatePlan={() => handleOnCreatePlan()}
                />
            </Box>
        </VStack>
    );
};

export default SelectPlanPage;
