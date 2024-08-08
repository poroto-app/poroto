import { useRef, useState } from "react";
import { createParam } from "solito";
import { Colors } from "src/constant/color";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { getPlanPriceRange } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { usePlaceLikeInPlanCandidate } from "src/hooks/usePlaceLikeInPlanCandidate";
import { usePlanCandidate } from "src/hooks/usePlanCandidate";
import { usePlanCandidateSet } from "src/hooks/usePlanCandidateSet";
import { usePlanSave } from "src/hooks/usePlanSave";
import { reduxNativeSelector } from "src/redux/native";
import { ButtonWithBlur } from "src/view/common/ButtonWithBlur";
import { ErrorPage } from "src/view/common/ErrorPage";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NotFound } from "src/view/common/NotFound";
import { RoundedButton } from "src/view/common/RoundedButton";
import { SectionTitle } from "src/view/common/SectionTitle";
import { PlanFooter } from "src/view/plan/PlanFooter";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { PlanCandidatesGallery } from "src/view/plancandidate/PlanCandidatesGallery";
import { PlanInfoSection } from "src/view/plandetail/PlanInfoSection";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";
import { ScrollView, Text, YStack } from "tamagui";

const { useParams } = createParam<{ sessionId?: string }>();

export default function PlanCandidatePage() {
    const { sessionId } = useParams().params;

    const { t } = useAppTranslation();
    const scrollViewRef = useRef<ScrollView>(null);
    const [scrollY, setScrollY] = useState(0);
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
    const { screenHeight, safeAreaTop, safeAreaBottom } = reduxNativeSelector();
    const planCandidateListHeight =
        screenHeight - (Size.NavBar.height + safeAreaTop + safeAreaBottom);
    const {
        plansCreated,
        placesAvailableForPlan,
        currentPlanId,
        isCreatingPlan,
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
            // TODO: ページトップに移動
        },
    });

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
            return <ErrorPage navBar={false} />;

        // プラン候補が存在しない
        return <NotFound navBar={false} />;
    }

    return (
        <>
            <ScrollView
                ref={scrollViewRef}
                style={{
                    width: "100%",
                    height: "100%",
                    backgroundColor: "white",
                }}
                pagingEnabled={scrollY <= planCandidateListHeight}
                scrollEventThrottle={16}
                onScroll={(event) => {
                    setScrollY(event.nativeEvent.contentOffset.y);
                }}
            >
                <YStack
                    alignItems="center"
                    justifyContent="center"
                    w="100%"
                    h={planCandidateListHeight}
                    gap={Padding.p32}
                >
                    <PlanCandidatesGallery
                        planCandidates={plansCreated}
                        isCreating={isCreatingPlan}
                    />
                    <ButtonWithBlur
                        px={Padding.p16}
                        py={Padding.p16}
                        backgroundColor="#84A6FF"
                        borderRadius={50}
                        onClick={() =>
                            scrollViewRef.current?.scrollTo({
                                y: planCandidateListHeight,
                            })
                        }
                    >
                        <Text color="white" fontWeight="bold" fontSize={18}>
                            {t("plan:showPlan")}
                        </Text>
                    </ButtonWithBlur>
                </YStack>
                <PlanDetailPage
                    planId={currentPlanId}
                    planCandidateSetId={sessionId}
                    isPlanFooterVisible={true}
                />
            </ScrollView>
            <PlanFooter visible={scrollY > planCandidateListHeight}>
                <RoundedButton
                    flex={1}
                    outlined
                    color={Colors.primary[400]}
                    label={t("plan:reorderPlaces")}
                />
                <RoundedButton
                    flex={1}
                    color="#BF756E"
                    label={t("plan:saveThisPlan")}
                />
            </PlanFooter>
        </>
    );
}

export function PlanDetailPage({
    planId,
    planCandidateSetId,
    isPlanFooterVisible,
    onCreatePlan,
}: {
    planId: string | null;
    planCandidateSetId: string;
    isPlanFooterVisible: boolean;
    onCreatePlan?: () => void;
}) {
    const { t } = useAppTranslation();

    const {
        plan,
        currentLocation,
        createdBasedOnCurrentLocation,
        destinationPlacesForPlanCandidate,
        placeToCreatePlan,
        onSelectDestinationPlace,
        onCloseCreatePlanFromPlace,
        onCreatePlanFromPlace,
    } = usePlanCandidate({
        planId: planId,
    });

    const { likedPlaceIdsInPlanCandidate, updateLikeAtPlace } =
        usePlaceLikeInPlanCandidate();

    const { createPlan, isCreatingPlan } = usePlanSave({
        planCandidateSetId: planCandidateSetId,
        planId: planId,
    });

    if (isCreatingPlan) {
        return <LoadingModal title={t("plan:createPlanInProgressTitle")} />;
    }

    if (!plan || !planId) {
        return <></>;
    }

    return (
        <>
            <YStack
                w="100%"
                pb={Size.PlanFooter.h}
                alignItems="center"
                justifyContent="center"
            >
                <YStack
                    maxWidth={Size.mainContentWidth}
                    w="100%"
                    px={0}
                    py={Padding.p16}
                    gap={Padding.p16}
                >
                    <PlanPageSection
                        sectionHeader={
                            <SectionTitle
                                title={t("plan:planInfo")}
                                px={Size.PlanDetail.px}
                            />
                        }
                    >
                        <YStack>
                            <PlanInfoSection
                                durationInMinutes={plan.timeInMinutes}
                                priceRange={getPlanPriceRange(plan.places)}
                            />
                        </YStack>
                    </PlanPageSection>
                    <PlanPageSection
                        sectionHeader={
                            <SectionTitle
                                title={t("plan:plan")}
                                px={Size.PlanDetail.px}
                            />
                        }
                    >
                        <PlanPlaceList
                            plan={plan}
                            likePlaceIds={likedPlaceIdsInPlanCandidate}
                            createdBasedOnCurrentLocation={
                                createdBasedOnCurrentLocation
                            }
                            onClickAddPlace={({ previousPlaceId }) => 0}
                            onClickShowRelatedPlaces={(placeId) => 0}
                            onClickDeletePlace={(placeId) => 0}
                            onUpdateLikeAtPlace={updateLikeAtPlace}
                        />
                    </PlanPageSection>
                </YStack>
            </YStack>
        </>
    );
}
