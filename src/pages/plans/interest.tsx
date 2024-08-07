import { useTranslation } from "next-i18next";
import Head from "next/head";
import { ReactNode } from "react";
import { createParam } from "solito";
import { PageMetaData } from "src/constant/meta";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { LocationCategoryWithPlace } from "src/domain/models/LocationCategoryWithPlace";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { useCreatePlanInterest } from "src/hooks/useCreatePlanInterest";
import { ErrorPage } from "src/view/common/ErrorPage";
import { LoadingModal } from "src/view/common/LoadingModal";
import { CategorySelect } from "src/view/interest/CategorySelect";
import { CouldNotFindAnyPlace } from "src/view/interest/CouldNotFindAnyPlace";
import { FetchLocationDialog } from "src/view/location/FetchLocationDialog";
import { NavBar } from "src/view/navigation/NavBar";
import { MatchInterestPageTemplate } from "src/view/plan/MatchInterestPageTemplate";

const { useParams } = createParam<{ location?: string }>();

export default function Page() {
    const { t } = useTranslation();
    const { params } = useParams();

    return (
        <>
            <Head>
                <title>
                    {PageMetaData(t).plans.interest.title(
                        params.location !== "true"
                    )}
                </title>
                <meta
                    name="description"
                    content={PageMetaData(t).plans.interest.description}
                />
            </Head>
            <PlanInterestPage />
        </>
    );
}

function PlanInterestPage() {
    const { t } = useAppTranslation();
    const {
        categoryCandidates,
        currentCategory,
        fetchLocationCategoryRequestId,
        matchInterestRequestStatus,
        matchInterestRequestId,
        searchLocation,
        fetchCurrentLocationStatus,
        handleAcceptCategory,
        handleRejectCategory,
        getCurrentLocation,
    } = useCreatePlanInterest();

    if (!searchLocation)
        return (
            <FetchLocationDialog
                skipLocationLabel={t("plan:createPlanFromFavoritePlace")}
                isSkipCurrentLocationVisible={true}
                fetchLocationRequestStatus={fetchCurrentLocationStatus}
                onRetry={() => getCurrentLocation().then()}
            />
        );

    return (
        <PlanInterestPageComponent
            categoryCandidates={categoryCandidates}
            currentCategory={
                // 別のリクエスト結果が使われないようにする
                matchInterestRequestId === fetchLocationCategoryRequestId &&
                currentCategory
            }
            matchInterestRequestStatus={matchInterestRequestStatus}
            handleAcceptCategory={handleAcceptCategory}
            handleRejectCategory={handleRejectCategory}
            navBar={<NavBar />}
        />
    );
}

type Props = {
    categoryCandidates: LocationCategoryWithPlace[] | null;
    currentCategory: LocationCategoryWithPlace | null;
    matchInterestRequestStatus: RequestStatus | null;
    handleAcceptCategory: (category: LocationCategory) => void;
    handleRejectCategory: (category: LocationCategory) => void;
    navBar: ReactNode;
};

export function PlanInterestPageComponent({
    categoryCandidates,
    currentCategory,
    matchInterestRequestStatus,
    handleAcceptCategory,
    handleRejectCategory,
    navBar,
}: Props) {
    const { t } = useTranslation();
    if (!currentCategory) {
        if (
            matchInterestRequestStatus === RequestStatuses.FULFILLED &&
            categoryCandidates?.length === 0
        )
            return <CouldNotFindAnyPlace />;

        if (matchInterestRequestStatus === RequestStatuses.REJECTED)
            return <ErrorPage />;

        return <LoadingModal title={t("place:nearbyPlacesSearching")} />;
    }

    return (
        <MatchInterestPageTemplate
            message={t("place:selectPlaceCategoryMessage")}
            navBar={navBar}
        >
            <CategorySelect
                category={currentCategory}
                onClickYes={handleAcceptCategory}
                onClickNo={handleRejectCategory}
            />
        </MatchInterestPageTemplate>
    );
}
