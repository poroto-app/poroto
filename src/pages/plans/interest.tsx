import {matchInterest, pushAcceptedCategory, pushRejectedCategory, reduxPlanSelector} from "src/redux/plan";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/redux/redux";
import {LocationCategory} from "src/domain/models/LocationCategory";
import {useRouter} from "next/router";
import {Routes} from "src/view/constants/router";
import {CategorySelect} from "src/view/interest/CategorySelect";
import {LoadingModal} from "src/view/common/LoadingModal";
import {Box, VStack} from "@chakra-ui/react";
import {NavBar} from "src/view/common/NavBar";
import {reduxLocationSelector} from "src/redux/location";

export const PlanInterestPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const {location} = reduxLocationSelector();

    useEffect(() => {
        if (location) dispatch(matchInterest({location}));
    }, [location]);

    const handleOnDoneCategory = () => {
        // TODO: 選択されたカテゴリをもとにプランを作成
        router.push(Routes.plans.select).then();
    }

    return <VStack h="100%" w="100%" spacing={0}>
        <NavBar title="どんな場所に行きたいですか？"/>
        <PageCategory onDone={handleOnDoneCategory}/>
    </VStack>
}

const PageCategory = ({onDone}: { onDone: () => void }) => {
    const dispatch = useAppDispatch();
    const {categoryCandidates} = reduxPlanSelector();
    const [currentCategory, setCurrentCategory] = useState<LocationCategory | null>(null);

    useEffect(() => {
        if (!categoryCandidates) return;
        if (categoryCandidates.length === 0) {
            onDone();
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
    return <Box
        flex={1} overflow="hidden"
        h="100%" w="100%" maxWidth="990px"
        px="16px" pt="24px" pb="32px"
    >
        <CategorySelect category={currentCategory} onClickYes={handleYes} onClickNo={handleNo}/>
    </Box>
}

export default PlanInterestPage;