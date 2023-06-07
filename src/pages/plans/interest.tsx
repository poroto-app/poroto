import {
    matchInterest,
    pushAcceptedCategory,
    pushRejectedCategory,
    reduxPlanSelector,
    resetInterest,
    resetPlanCandidates,
    setCreatedPlans,
    setTimeForPlan,
} from "src/redux/plan";
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch } from "src/redux/redux";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { useRouter } from "next/router";
import { Routes } from "src/view/constants/router";
import { CategorySelect } from "src/view/interest/CategorySelect";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { reduxLocationSelector } from "src/redux/location";
import { PlanDurationSelector } from "src/view/interest/PlanDurationSelector";
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
    const [currentCategory, setCurrentCategory] =
        useState<LocationCategory | null>(null);
    const { categoryCandidates } = reduxPlanSelector();
    const { searchLocation } = reduxLocationSelector();

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
        };
    }, []);

    useEffect(() => {
        if (searchLocation) {
            dispatch(matchInterest({ location: searchLocation }));
        }
    }, [searchLocation]);

    useEffect(() => {
        if (!categoryCandidates) return;
        if (categoryCandidates.length === 0) {
            router.push(Routes.plans.create).then();
            return;
        }
        setCurrentCategory(categoryCandidates[0]);
    }, [categoryCandidates?.length]);

    const handleAcceptCategory = (category: LocationCategory) => {
        dispatch(pushAcceptedCategory({ category }));
    };

    const handleRejectCategory = (category: LocationCategory) => {
        dispatch(pushRejectedCategory({ category }));
    };

    const handleSelectTime = (time: number | null) => {
        dispatch(setTimeForPlan({ time }));
    };

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
