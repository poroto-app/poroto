import { useRouter } from "next/router";
import { Center, VStack } from "@chakra-ui/react";
import { NavBar } from "src/view/common/NavBar";
import { PlanPlaceList } from "src/view/plan/PlanPlaceList";
import { PlanDuration } from "src/view/plan/PlanSummaryItem";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import {fetchPlan, reduxPlanSelector} from "src/redux/plan";
import { LoadingModal } from "src/view/common/LoadingModal";
import {useEffect} from "react";
import {useAppDispatch} from "src/redux/redux";

export default function PlanPage() {
    const { id } = useRouter().query;
    const dispatch = useAppDispatch();
    const { preview: plan } = reduxPlanSelector();

    useEffect(() => {
        if(typeof id !== "string") return;
        dispatch(fetchPlan({ planId: id }));
    }, [id]);

    if (!plan) return <LoadingModal title="プランを読み込んでいます" />;

    return (
        <Center flexDirection="column">
            <NavBar title={plan.title} />
            <VStack
                maxWidth="990px"
                w="100%"
                px="8px"
                py="16px"
                boxSizing="border-box"
            >
                <PlanPlaceList plan={plan} />
                <VStack py="16px" w="100%" alignItems="flex-start">
                    <PlanDuration durationInMinutes={plan.timeInMinutes} />
                </VStack>
                <VStack w="100%">
                    <PlaceMap places={plan.places} />
                    <SavePlanAsImageButton plan={plan} />
                    <SearchRouteByGoogleMapButton
                        plan={plan}
                        currentLocation={null}
                    />
                </VStack>
            </VStack>
        </Center>
    );
}
