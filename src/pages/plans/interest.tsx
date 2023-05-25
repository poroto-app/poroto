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

    return (
        <PlanInterestPageComponent
            currentCategory={currentCategory}
            handleYes={handleYes}
            handleNo={handleNo}
            navBar={<NavBar title="今の気分を教えてください" />}
        />
    );
}

type Props = {
    currentCategory: LocationCategory | null;
    handleYes: (category: LocationCategory) => void;
    handleNo: (category: LocationCategory) => void;
    navBar: ReactNode;
};

export function PlanInterestPageComponent({
    currentCategory,
    handleYes,
    handleNo,
    navBar,
}: Props) {
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
                <AskInterestMessage message="どんな場所に行きたいですか？" />
                <CategorySelect
                    category={currentCategory}
                    onClickYes={handleYes}
                    onClickNo={handleNo}
                />
            </VStack>
        </VStack>
    );
}
