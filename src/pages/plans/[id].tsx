import {Box, Center, HStack, Icon, Text, VStack} from "@chakra-ui/react"
import {NavBar} from "src/view/common/NavBar"
import {PlacePreview} from "src/view/plan/PlacePreview"
import {useAppDispatch} from "src/redux/redux";
import {fetchPlanDetail, reduxPlanSelector} from "src/redux/plan";
import {LoadingModal} from "src/view/common/LoadingModal";
import React, {useEffect} from "react";
import {useRouter} from "next/router";
import {IconType} from "react-icons";
import {MdSchedule} from "react-icons/md";
import {DateHelper} from "src/domain/util/date";

const PlanDetail = () => {

    const {id} = useRouter().query;
    const dispatch = useAppDispatch();
    const {preview: plan} = reduxPlanSelector();

    useEffect(() => {
        if (id && typeof id === "string") {
            dispatch(fetchPlanDetail({planId: id}));
        }
    }, [id]);

    if (!plan) return <LoadingModal title="素敵なプランを読み込んでいます"/>

    return <Center flexDirection="column">
        <NavBar title={plan.title}/>
        <Box maxWidth="990px" w="100%" px="8px" py="16px" boxSizing="border-box">
            <VStack py="16px">
                <PlanSummaryItem
                    icon={MdSchedule}
                    text={`${plan.timeInMinutes.toFixed()}分 (~ ${DateHelper.dateToHHMM(DateHelper.add(new Date(), plan.timeInMinutes * DateHelper.Minute))})`}
                />
            </VStack>
            <VStack spacing={8} w="100%">
                {
                    plan.places.map((place, i) => <PlacePreview
                        key={i}
                        name={place.name}
                        imageUrls={place.imageUrls}
                        tags={place.tags}
                    />)
                }
            </VStack>
        </Box>
    </Center>
}

const PlanSummaryItem = ({text, icon}: { text: string, icon: IconType }) => {
    return <HStack w="100%" px="16px" py="4px" columnGap="20px" spacing={0}>
        <Icon w="24px" h="24px" color="#BD9F8E" as={icon}/>
        <Text color="rgba(0,0,0,.6)">{text}</Text>
    </HStack>
}

export default PlanDetail