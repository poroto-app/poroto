import {Box, Center, VStack} from "@chakra-ui/react"
import {NavBar} from "src/view/common/NavBar"
import {PlacePreview} from "src/view/plan/PlacePreview"
import {useAppDispatch} from "src/redux/redux";
import {fetchPlanDetail, reduxPlanSelector} from "src/redux/plan";
import {LoadingModal} from "src/view/common/LoadingModal";
import {useEffect} from "react";
import {useRouter} from "next/router";
import {PlanActionButton} from "src/view/plan/Props";
import {MdPhotoCamera} from "react-icons/all";

const PlanDetail = () => {

    const {id} = useRouter().query;
    const dispatch = useAppDispatch();
    const {preview: plan} = reduxPlanSelector();

    useEffect(() => {
        if (id && typeof id === "string") {
            dispatch(fetchPlanDetail({planId: id}));
        }
    }, [id]);

    const handleOnClickSaveAsImage = () => {

    }

    if (!plan) return <LoadingModal title="素敵なプランを読み込んでいます"/>

    return <Center flexDirection="column">
        <NavBar title={plan.title}/>
        <VStack maxWidth="990px" w="100%" px="8px" py="16px" boxSizing="border-box">
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
            <VStack w="100%">
                <PlanActionButton text="画像で保存する" color="#539565" icon={MdPhotoCamera} onClick={handleOnClickSaveAsImage}/>
            </VStack>
        </VStack>
    </Center>
}

export default PlanDetail