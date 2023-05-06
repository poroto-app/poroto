import {NavBar} from "src/view/common/NavBar";
import {Center, Grid, GridItem, HStack, Icon, Skeleton, Text, VStack} from "@chakra-ui/react";
import styled from "styled-components";
import React, {FC} from "react";
import {reduxPlanSelector} from "src/redux/plan";
import Link from "next/link";
import {LoadingModal} from "src/view/common/LoadingModal";
import {MdDirectionsWalk} from "react-icons/md";
import { PlanThumbnail } from "src/view/plan/PlanThumbnail";


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