import { useRouter } from "next/router";
import { ReactNode, useEffect, useState } from "react";
import { LocationCategory } from "src/domain/models/LocationCategory";
import {
    reduxLocationSelector,
    setCurrentLocation,
    setSearchLocation,
} from "src/redux/location";
import {
    createPlanFromLocation,
    matchInterest,
    pushAcceptedCategory,
    pushRejectedCategory,
    reduxPlanCandidateSelector,
    resetInterest,
    setCreatedPlans,
    setTimeForPlan,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { Routes } from "src/view/constants/router";
import { useLocation } from "src/view/hooks/useLocation";
import { CategorySelect } from "src/view/interest/CategorySelect";
import { PlanDurationSelector } from "src/view/interest/PlanDurationSelector";
import { FetchLocationDialog } from "src/view/location/FetchLocationDialog";
import { MatchInterestPageTemplate } from "src/view/plan/MatchInterestPageTemplate";

const MatchInterestPages = {
    TIME: "TIME",
    CATEGORY: "CATEGORY",
};
type MatchInterestPage =
    (typeof MatchInterestPages)[keyof typeof MatchInterestPages];

export default function PlanInterestPage() {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { getCurrentLocation, location, fetchCurrentLocationStatus } =
        useLocation();
    const [currentCategory, setCurrentCategory] =
        useState<LocationCategory | null>(null);
    const { categoryCandidates, createPlanSession } =
        reduxPlanCandidateSelector();
    const { searchLocation, searchPlaceId } = reduxLocationSelector();

    useEffect(() => {
        dispatch(resetInterest());

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
            // MEMO: 戻るボタンで遷移してきたときに、状態が残っていると/plans/createに自動的に遷移してしまう
            dispatch(resetInterest());
            setCurrentCategory(null);

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
            dispatch(matchInterest({ location: searchLocation }));
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
            router.push(Routes.plans.select(createPlanSession)).then();
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
                fetchLocationRequestStatus={fetchCurrentLocationStatus}
                onRetry={() => getCurrentLocation().then()}
            />
        );

    return (
        <PlanInterestPageComponent
            currentCategory={currentCategory}
            handleAcceptCategory={handleAcceptCategory}
            handleRejectCategory={handleRejectCategory}
            onSelectTime={handleSelectTime}
            navBar={<NavBar title="今の気分を教えてください" />}
        />
    );
}

type Props = {
    currentCategory: LocationCategory | null;
    handleAcceptCategory: (category: LocationCategory) => void;
    handleRejectCategory: (category: LocationCategory) => void;
    onSelectTime: (duration: number | null) => void;
    navBar: ReactNode;
};

export function PlanInterestPageComponent({
    currentCategory,
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

    if (!currentCategory)
        return <LoadingModal title="近くに何があるかを探しています。" />;

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
