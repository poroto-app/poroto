import Head from "next/head";
import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { LocationCategoryWithPlace } from "src/domain/models/LocationCategoryWithPlace";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { reduxAuthSelector } from "src/redux/auth";
import {
    reduxLocationSelector,
    setCurrentLocation,
    setSearchLocation,
} from "src/redux/location";
import {
    createPlanFromLocation,
    fetchNearbyPlaceCategories,
    pushAcceptedCategory,
    pushRejectedCategory,
    reduxPlanCandidateSelector,
    resetInterest,
    setCreatedPlans,
    setTimeForPlan,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { ErrorPage } from "src/view/common/ErrorPage";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { LocalStorageKeys } from "src/view/constants/localStorageKey";
import { PageMetaData } from "src/view/constants/meta";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";
import { CategorySelect } from "src/view/interest/CategorySelect";
import { CouldNotFindAnyPlace } from "src/view/interest/CouldNotFindAnyPlace";
import { PlanDurationSelector } from "src/view/interest/PlanDurationSelector";
import { FetchLocationDialog } from "src/view/location/FetchLocationDialog";
import { MatchInterestPageTemplate } from "src/view/plan/MatchInterestPageTemplate";

const MatchInterestPages = {
    TIME: "TIME",
    CATEGORY: "CATEGORY",
};
type MatchInterestPage =
    (typeof MatchInterestPages)[keyof typeof MatchInterestPages];

export default function Page() {
    const router = useRouter();
    return (
        <>
            <Head>
                <title>
                    {PageMetaData.plans.interest.title(
                        router.query["location"] !== "true"
                    )}
                </title>
                <meta
                    name="description"
                    content={PageMetaData.plans.interest.description}
                />
            </Head>
            <PlanInterestPage />
        </>
    );
}

function PlanInterestPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { getCurrentLocation, location, fetchCurrentLocationStatus } =
        useLocation();
    const [currentCategory, setCurrentCategory] =
        useState<LocationCategoryWithPlace | null>(null);
    const [matchInterestRequestId, setMatchInterestRequestId] = useState<
        string | null
    >(null);
    const {
        categoryCandidates,
        createPlanSession,
        fetchLocationCategoryRequestId,
        fetchNearbyPlaceCategoriesRequestStatus: matchInterestRequestStatus,
    } = reduxPlanCandidateSelector();
    const { searchLocation, searchPlaceId } = reduxLocationSelector();
    const { user } = reduxAuthSelector();

    useEffect(() => {
        dispatch(resetInterest());
        setMatchInterestRequestId(null);

        // 2回目以降、プランを作成するときに、前回の結果が残らないようにする
        dispatch(
            setCreatedPlans({
                plans: null,
                session: null,
                createdBasedOnCurrentLocation: null,
            })
        );

        return () => {
            // 前回の結果をリセット
            // MEMO: 戻るボタンで遷移してきたときに、状態が残っていると/plans/selectに自動的に遷移してしまう
            dispatch(resetInterest());
            setCurrentCategory(null);
            setMatchInterestRequestId(null);

            // 場所を指定してプラン作成 -> 現在地からプラン作成
            // を行うと、指定した場所の情報が残り、そこからプランを作成してしまうためリセットする
            dispatch(
                setSearchLocation({ searchLocation: null, searchPlaceId: null })
            );
        };
    }, []);

    // 検索する場所が指定されていない場合は、現在地を取得する
    useEffect(() => {
        if (!searchLocation) {
            getCurrentLocation().then();
        }
    }, [searchLocation]);

    // 現在地を取得したら、それをもとに検索
    useEffect(() => {
        if (!location) return;
        const currentLocation = location;
        dispatch(setCurrentLocation({ currentLocation }));
        dispatch(
            setSearchLocation({
                searchLocation: currentLocation,
                searchPlaceId: null,
            })
        );
    }, [location]);

    // 検索する場所が指定されたら、興味を持つ場所を検索
    useEffect(() => {
        if (searchLocation) {
            const requestId = Date.now().toString();
            setMatchInterestRequestId(requestId);
            dispatch(
                fetchNearbyPlaceCategories({
                    location: searchLocation,
                    requestId,
                })
            );
        }
    }, [searchLocation]);

    useEffect(() => {
        if (!categoryCandidates) return;
        if (
            categoryCandidates.length === 0 &&
            searchLocation &&
            createPlanSession
        ) {
            dispatch(
                createPlanFromLocation({
                    location: searchLocation,
                    googlePlaceId: searchPlaceId,
                })
            );

            // TODO: hooksに処理を移す
            // 作成したプラン候補を保存
            if (!user) {
                const createdPlanCandidates: string[] = JSON.parse(
                    localStorage.getItem(LocalStorageKeys.PlanCandidate) ?? "[]"
                );
                createdPlanCandidates.push(createPlanSession);
                localStorage.setItem(
                    LocalStorageKeys.PlanCandidate,
                    JSON.stringify(createdPlanCandidates)
                );
            }

            router
                .push(Routes.plans.planCandidate.index(createPlanSession))
                .then();
            return;
        }
        setCurrentCategory(categoryCandidates[0]);
    }, [
        categoryCandidates?.length,
        searchLocation,
        searchPlaceId,
        createPlanSession,
    ]);

    const handleAcceptCategory = (category: LocationCategory) => {
        dispatch(pushAcceptedCategory({ category }));
    };

    const handleRejectCategory = (category: LocationCategory) => {
        dispatch(pushRejectedCategory({ category }));
    };

    const handleSelectTime = (time: number | null) => {
        dispatch(setTimeForPlan({ time }));
    };

    if (!searchLocation)
        return (
            <FetchLocationDialog
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
            onSelectTime={handleSelectTime}
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
    onSelectTime: (duration: number | null) => void;
    navBar: ReactNode;
};

export function PlanInterestPageComponent({
    categoryCandidates,
    currentCategory,
    matchInterestRequestStatus,
    handleAcceptCategory,
    handleRejectCategory,
    onSelectTime,
    navBar,
}: Props) {
    const [page, setPage] = useState<MatchInterestPage>(
        MatchInterestPages.TIME
    );

    const handleSelectTime = (duration: number | null) => {
        onSelectTime(duration);
        setPage(MatchInterestPages.CATEGORY);
    };

    if (page === MatchInterestPages.TIME)
        return (
            <MatchInterestPageTemplate
                message="どのくらいの時間を過ごしたいですか？"
                navBar={navBar}
            >
                <PlanDurationSelector
                    onClickNext={(duration) => handleSelectTime(duration)}
                    onClickIgnoreDuration={() => handleSelectTime(null)}
                />
            </MatchInterestPageTemplate>
        );

    if (!currentCategory) {
        if (
            matchInterestRequestStatus === RequestStatuses.FULFILLED &&
            categoryCandidates?.length === 0
        )
            return <CouldNotFindAnyPlace />;

        if (matchInterestRequestStatus === RequestStatuses.REJECTED)
            return <ErrorPage />;

        return <LoadingModal title="近くに何があるかを探しています。" />;
    }

    return (
        <MatchInterestPageTemplate
            message="どんな場所に行きたいですか？"
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
