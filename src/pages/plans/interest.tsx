import {
    matchInterest,
    pushAcceptedCategory,
    pushRejectedCategory,
    reduxPlanSelector,
    resetInterest
} from "src/redux/plan";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/redux/redux";
import {LocationCategory} from "src/domain/models/LocationCategory";
import {useRouter} from "next/router";
import {Routes} from "src/view/constants/router";
import {CategorySelect} from "src/view/interest/CategorySelect";
import {LoadingModal} from "src/view/common/LoadingModal";
import {VStack} from "@chakra-ui/react";
import {NavBar} from "src/view/common/NavBar";
import {reduxLocationSelector} from "src/redux/location";
import {AskInterestMessage} from "src/view/plan/AskInterestMessage";

export const PlanInterestPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [currentCategory, setCurrentCategory] = useState<LocationCategory | null>(null);
    const {categoryCandidates} = reduxPlanSelector();
    const {location} = reduxLocationSelector();

    useEffect(() => {
        if (location) dispatch(matchInterest({location}));
        return () => {
            // 戻るボタンで戻ってきたときに、最初から始める
            dispatch(resetInterest());
        };
    }, [location]);

    useEffect(() => {
        if (!categoryCandidates) return;
        if (categoryCandidates.length === 0) {
            router.push(Routes.plans.select).then();
            return;
        }
        setCurrentCategory(categoryCandidates[0]);
    }, [categoryCandidates?.length]);

    const handleYes = (category: LocationCategory) => {
        dispatch(pushAcceptedCategory({category}));
    }

    const handleNo = (category: LocationCategory) => {
        dispatch(pushRejectedCategory({category}));
    }

    if (!currentCategory) return <LoadingModal title="近くに何があるかを探しています。"/>

    return <VStack h="100%" w="100%" spacing={0}>
        <NavBar title="今の気分を教えてください"/>
        <VStack
            flex={1} overflow="hidden"
            h="100%" w="100%" maxWidth="990px"
            px="16px" pt="8px" pb="32px"
        >
            <AskInterestMessage message="どんな場所に行きたいですか？"/>
            <CategorySelect category={currentCategory} onClickYes={handleYes} onClickNo={handleNo}/>
        </VStack>
    </VStack>
}

export default PlanInterestPage;