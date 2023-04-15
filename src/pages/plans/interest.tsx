import {pushAcceptedCategory, pushRejectedCategory, reduxPlanSelector, setCategoryCandidates} from "src/redux/plan";
import {useEffect, useState} from "react";
import {useAppDispatch} from "src/redux/redux";
import {LocationCategory} from "src/domain/models/LocationCategory";
import {useRouter} from "next/router";
import {Routes} from "src/view/constants/router";
import {CategorySelect} from "src/view/interest/CategorySelect";
import {LoadingModal} from "src/view/common/LoadingModal";
import {Box, VStack} from "@chakra-ui/react";
import {NavBar} from "src/view/common/NavBar";

export const PlanInterestPage = () => {
    const dispatch = useAppDispatch();
    const router = useRouter();
    const [currentCategory, setCurrentCategory] = useState<LocationCategory | null>(null);
    const {categoryCandidates} = reduxPlanSelector();

    // TODO: DELETE
    useEffect(() => {
        dispatch(setCategoryCandidates({
            categories: [
                {
                    name: "温泉",
                    thumbnail: "https://images.pexels.com/photos/347137/pexels-photo-347137.jpeg",
                },
                {
                    name: "カフェ",
                    thumbnail: "https://images.pexels.com/photos/1402407/pexels-photo-1402407.jpeg"
                }
            ]
        }))
    }, []);

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
        <NavBar title="どんな場所に行きたいですか？"/>
        <Box h="100%" w="100%" maxWidth="990px" px="16px" pt="24px" pb="32px">
            <CategorySelect category={currentCategory} onClickYes={handleYes} onClickNo={handleNo}/>
        </Box>
    </VStack>
}

export default PlanInterestPage;