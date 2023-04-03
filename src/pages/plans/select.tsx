import {NavBar} from "src/view/common/NavBar";
import {PlanTag} from "src/domain/plan/Plan";
import {Box, Center, Grid, GridItem, HStack, Skeleton, Text, VStack} from "@chakra-ui/react";
import styled from "styled-components";
import React from "react";
import {reduxPlanSelector} from "src/redux/plan";
import Link from "next/link";
import {LoadingModal} from "src/view/common/LoadingModal";


const SelectPlanPage = () => {

    const {plans} = reduxPlanSelector();

    if (!plans) return <LoadingModal title="プランを作成しています"/>

    // TODO: プラン作成失敗 or 直接このページに来たときははじく
    if (plans.length === 0) return <Center>
        <Text>プランを作成することができませんでした。</Text>
    </Center>

    return <div>
        <NavBar title="プランを選ぶ"/>
        <VStack w="100%" px="16px" spacing={16} py="16px">
            {
                (plans || []).map((plan, i) => <Link key={i} href={"/plans/" + plan.id}>
                        <VStack w="100%" maxW="300px">
                            <PlanThumbnail imageUrls={plan.imageUrls}/>
                            <HStack w="100%" justifyContent="flex-start">
                                {plan.tags.map((tag, i) => <Tag key={i} tag={tag}/>)}
                            </HStack>
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

const Tag = ({tag}: { tag: PlanTag }) => {
    return <Box
        px="8px" py="4px"
        borderRadius="5px" border="1px solid rgba(0, 0, 0, .1)"
        cursor="pointer"
    >
        <Text>{tag.content}</Text>
    </Box>
}

export default SelectPlanPage;