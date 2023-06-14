import { Plan } from "src/domain/models/Plan";
import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { PlanThumbnail } from "src/view/plan/PlanThumbnail";
import { MdDirectionsWalk } from "react-icons/md";
import Link from "next/link";
import React, { FC } from "react";
import { Routes } from "src/view/constants/router";

type Props = {
    session: string;
    plan: Plan;
};

export function PlanPreview({ session, plan }: Props) {
    const thumbnails = plan.places
        .map((place) =>
            place.imageUrls.length > 0 ? place.imageUrls[0] : null
        )
        .filter((v) => v !== null);

    const tagTime = `${plan.timeInMinutes.toFixed(0)}分`;

    return (
        <Link
            href={Routes.plans.planCandidate(session, plan.id)}
            style={{ width: "100%", maxWidth: "600px" }}
        >
            <VStack w="100%">
                <PlanThumbnail imageUrls={thumbnails} />
                <VStack w="100%" alignItems="flex-start" spacing={1}>
                    <Text fontWeight="bold" fontSize="1.25rem">
                        {plan.title}
                    </Text>
                    <HStack w="100%" justifyContent="flex-start">
                        {/* TODO: 最初の地点までの徒歩時間を移動距離を表示 */}
                        <TagContainer tag={tagTime}>
                            <Icon
                                w="24px"
                                h="24px"
                                color="#539565"
                                as={MdDirectionsWalk}
                            />
                        </TagContainer>
                        {plan.tags.map((tag, i) => (
                            <TagContainer key={i} tag={tag.content} />
                        ))}
                    </HStack>
                </VStack>
            </VStack>
        </Link>
    );
}

const TagContainer: FC<{ tag: string }> = ({ tag, children }) => {
    return (
        <HStack
            spacing={1}
            alignItems="center"
            justifyContent="center"
            border="1px solid rgba(0, 0, 0, .1)"
            borderRadius="5px"
            h="100%"
            px="4px"
            py="2px"
        >
            {children}
            <Text>{tag}</Text>
        </HStack>
    );
};
