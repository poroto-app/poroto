import {
    matchInterest,
    pushAcceptedCategory,
    pushRejectedCategory,
    reduxPlanSelector,
    resetInterest,
} from "src/redux/plan";
import { ReactNode, useEffect, useState } from "react";
import { useAppDispatch } from "src/redux/redux";
import { LocationCategory } from "src/domain/models/LocationCategory";
import { useRouter } from "next/router";
import { Routes } from "src/view/constants/router";
import { CategorySelect } from "src/view/interest/CategorySelect";
import { LoadingModal } from "src/view/common/LoadingModal";
import { VStack } from "@chakra-ui/react";
import { NavBar } from "src/view/common/NavBar";
import { reduxLocationSelector } from "src/redux/location";
import { AskInterestMessage } from "src/view/plan/AskInterestMessage";
import { PlanDurationSelector } from "src/view/interest/PlanDurationSelector";

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
        if (searchLocation)
            dispatch(matchInterest({ location: searchLocation }));
        return () => {
            // 戻るボタンで戻ってきたときに、最初から始める
            dispatch(resetInterest());
        };
    }, [searchLocation]);

    useEffect(() => {
        if (!categoryCandidates) return;
        if (categoryCandidates.length === 0) {
            router.push(Routes.plans.create).then();
            return;
        }
        setCurrentCategory(categoryCandidates[0]);
    }, [categoryCandidates?.length]);

    const handleYes = (category: LocationCategory) => {
        dispatch(pushAcceptedCategory({ category }));
    };

    const handleNo = (category: LocationCategory) => {
        dispatch(pushRejectedCategory({ category }));
    };

    {/*TODO: 指定した時間をreduxで管理する*/}
    return (
        <PlanInterestPageComponent
            currentCategory={currentCategory}
            handleAcceptCategory={handleYes}
            handleRejectCategory={handleNo}
            onSelectTime={(duration) => console.log(duration)}
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
    const [page, setPage] = useState<MatchInterestPage>(MatchInterestPages.TIME);
    const matchInterestPrompts = {
        [MatchInterestPages.TIME]: "どのくらいの時間を過ごしたいですか？",
        [MatchInterestPages.CATEGORY]: "どんな場所に行きたいですか？",
    };

    const handleSelectTime = (duration: number | null) => {
        onSelectTime(duration);
        setPage(MatchInterestPages.CATEGORY);
    };

    if (page === MatchInterestPages.TIME)
        return (
            <VStack h="100%" w="100%" spacing={0}>
                {navBar}
                <VStack
                    flex={1}
                    h="100%"
                    w="100%"
                    maxWidth="990px"
                    px="16px"
                    pt="8px"
                    pb="32px"
                >
                    <AskInterestMessage message={matchInterestPrompts[page]} />
                    <PlanDurationSelector
                        onClickNext={(duration) => handleSelectTime(duration)}
                        onClickIgnoreDuration={() => handleSelectTime(null)}
                    />
                </VStack>
            </VStack>
        );

    if (!currentCategory)
        return <LoadingModal title="近くに何があるかを探しています。" />;

    return (
        <VStack h="100%" w="100%" spacing={0}>
            {navBar}
            <VStack
                flex={1}
                h="100%"
                w="100%"
                maxWidth="990px"
                px="16px"
                pt="8px"
                pb="32px"
            >
                <AskInterestMessage message={matchInterestPrompts[page]} />
                <CategorySelect
                    category={currentCategory}
                    onClickYes={handleAcceptCategory}
                    onClickNo={handleRejectCategory}
                />
            </VStack>
        </VStack>
    );
}