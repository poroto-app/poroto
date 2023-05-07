import {NavBar} from "src/view/common/NavBar";
import {Center, Grid, GridItem, HStack, Icon, Skeleton, Text, VStack} from "@chakra-ui/react";
import styled from "styled-components";
import React, {FC, useEffect} from "react";
import {fetchCachedCreatedPlans, reduxPlanSelector} from "src/redux/plan";
import Link from "next/link";
import {LoadingModal} from "src/view/common/LoadingModal";
import {MdDirectionsWalk} from "react-icons/md";
import {useRouter} from "next/router";
import {useAppDispatch} from "src/redux/redux";


const SelectPlanPage = () => {

    const dispatch = useAppDispatch();
    const {plansCreated, createPlanSession} = reduxPlanSelector();

    const router = useRouter();
    const {id} = router.query;

    useEffect(() => {
        if (id && typeof id === "string") {
            dispatch(fetchCachedCreatedPlans({session: id}));
        }
    }, [id]);

    if (!plansCreated) {
        // TODO: ホームに戻れる404ページを作る
        // sessionに紐づくプランが存在しない
        if (createPlanSession) return <h1>Not Found</h1>

        return <LoadingModal title="プランを取得しています"/>
    }

    // TODO: プラン作成失敗 or 直接このページに来たときははじく
    if (plansCreated.length === 0) return <Center>
        <Text>プランを作成することができませんでした。</Text>
    </Center>

    return <div>
        <NavBar title="プランを選ぶ"/>
        <VStack w="100%" px="16px" spacing={16} py="16px">
            {
                (plansCreated || []).map((plan, i) => <Link key={i} href={"/plans/" + plan.id}>
                        <VStack w="100%" maxW="300px">
                            <PlanThumbnail imageUrls={plan.places.flatMap((place) => place.imageUrls)}/>
                            <VStack w="100%" alignItems="flex-start" spacing={1}>
                                <Text fontWeight="bold" fontSize="1.25rem">{plan.title}</Text>
                                <HStack w="100%" justifyContent="flex-start">
                                    {/* TODO: 最初の地点までの徒歩時間を移動距離を表示 */}
                                    <TagContainer tag={`${plan.timeInMinutes.toFixed(0)}分`}>
                                        <Icon w="24px" h="24px" color="#539565" as={MdDirectionsWalk}/>
                                    </TagContainer>
                                    {plan.tags.map((tag, i) => <TagContainer key={i} tag={tag.content}/>)}
                                </HStack>
                            </VStack>
                        </VStack>
                    </Link>
                )
            }
        </VStack>
    </div>
}


const PlanThumbnail = ({imageUrls}: { imageUrls: string[] }) => {

    imageUrls = imageUrls.slice(0, 4);

    const gridAreas = ["A", "B", "C", "D"]
    const gridAreaTemplates = [
        `"A A"
         "A A"`,

        `"A B"
         "A B"`,

        `"A A"\n"B C"`,

        `"A B"\n"C D"`
    ]

    return <Grid
        width="300px" height="300px"
        templateColumns="repeat(2, 1fr)" templateRows="repeat(2, 1fr)"
        gridTemplateAreas={gridAreaTemplates[imageUrls.length - 1]}
        borderRadius="10px" overflow="hidden" cursor="pointer"
    >
        {
            imageUrls.map((url, i) => <GridItem
                key={i}
                w="100%" h="100%" overflow="hidden" position="relative"
                gridArea={gridAreas[i]}
            >
                <Skeleton position="absolute" top="0" right="0" bottom="0" left="0" zIndex="-1"/>
                <Thumbnail src={url}/>
            </GridItem>)
        }
    </Grid>
}

const Thumbnail = styled.img`
  overflow: clip;
  height: 100%;
  width: 100%;
  object-fit: cover;
`;

const TagContainer: FC<{ tag: string }> = ({tag, children}) => {
    return <HStack
        spacing={1} alignItems="center" justifyContent="center"
        border="1px solid rgba(0, 0, 0, .1)" borderRadius="5px"
        h="100%" px="4px" py="2px"
    >
        {children}
        <Text>{tag}</Text>
    </HStack>
}

export default SelectPlanPage;