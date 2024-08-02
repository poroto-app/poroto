import { createParam } from "solito";
import { Padding } from "src/constant/padding";
import { getPlanPriceRange } from "src/domain/models/Plan";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { usePlan } from "src/hooks/usePlan";
import useUploadPlaceImage from "src/hooks/useUploadPlaceImage";
import { useUserPlan } from "src/hooks/useUserPlan";
import { ErrorPage } from "src/view/common/ErrorPage";
import { Layout } from "src/view/common/Layout";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NotFound } from "src/view/common/NotFound";
import {
    SectionTitlePlan,
    SectionTitlePlanInfo,
} from "src/view/common/SectionTitle";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { PlanInfoSection } from "src/view/plandetail/PlanInfoSection";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";
import { ScrollView, YStack } from "tamagui";

const { useParam } = createParam<{ id: string }>();

export default function PlanPage() {
    const [id] = useParam("id");
    const { t } = useAppTranslation();
    const { plan, isFetchingPlan, planError } = usePlan({ planId: id });
    const uploadImageProps = useUploadPlaceImage();
    const { userId, firebaseIdToken, likePlaceIds, updateLikePlace } =
        useUserPlan();

    if (isFetchingPlan) {
        return <LoadingModal title={t("plan:loadingPlan")} />;
    } else if (planError) {
        return <ErrorPage navBar={false} />;
    } else if (!plan) {
        return <NotFound navBar={false} />;
    }

    return (
        <ScrollView width="100%" h="100%">
            <Layout>
                <YStack gap={Padding.p16}>
                    <PlanPageSection sectionHeader={<SectionTitlePlanInfo />}>
                        <PlanInfoSection
                            durationInMinutes={plan.timeInMinutes}
                            priceRange={getPlanPriceRange(plan.places)}
                        />
                    </PlanPageSection>
                    <PlanPageSection sectionHeader={<SectionTitlePlan />}>
                        <PlanPlaceList
                            plan={plan}
                            likePlaceIds={likePlaceIds}
                            uploadPlaceImage={uploadImageProps}
                            onUpdateLikeAtPlace={({ like, placeId }) =>
                                updateLikePlace({
                                    planId: plan.id,
                                    placeId,
                                    like,
                                })
                            }
                        />
                    </PlanPageSection>
                </YStack>
            </Layout>
        </ScrollView>
    );
}
