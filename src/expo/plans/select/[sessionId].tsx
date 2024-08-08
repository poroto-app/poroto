import { useEffect, useState } from "react";
import { createParam } from "solito";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { usePlanCandidateSet } from "src/hooks/usePlanCandidateSet";
import { ErrorPage } from "src/view/common/ErrorPage";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NotFound } from "src/view/common/NotFound";
import { PlanCandidatesGallery } from "src/view/plancandidate/PlanCandidatesGallery";
import { YStack } from "tamagui";

const { useParams } = createParam<{ sessionId?: string }>();

export default function PlanCandidatePage() {
    const { sessionId } = useParams().params;

    const { t } = useAppTranslation();
    const [selectedPlanIndex, setSelectedPlanIndex] = useState(0);
    const {
        plansCreated,
        placesAvailableForPlan,
        isCreatingPlan,
        createPlanFromPlaceRequestStatus,
        createPlanFromLocationRequestStatus,
        fetchAvailablePlacesForPlanRequestStatus,
        fetchCachedCreatedPlansRequestStatus,
        createPlanCandidateFromPlace,
    } = usePlanCandidateSet({
        planCandidateSetId: sessionId as string,
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
        <YStack w="100%" h="100%">
            <PlanCandidatesGallery planCandidates={plansCreated} />
        </YStack>
    );
}
