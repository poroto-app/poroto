import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import { Plan } from "src/domain/models/Plan";
import { PlanThumbnail } from "src/view/plan/PlanThumbnail";

type Props = {
    plan: Plan;
};

export function PlanPageThumbnail({ plan }: Props) {
    const thumbnails = plan.places
        .map((place) => (place.images.length > 0 ? place.images[0] : null))
        .filter((v) => v !== null);

    return (
        <VStack w="100%" alignItems="flex-start" px="16px" pb="16px">
            {thumbnails.length > 0 && <PlanThumbnail images={thumbnails} />}
            <Text
                as="h1"
                color="rgb(34,34,34)"
                fontWeight="600"
                fontSize="20px"
            >
                {plan.title}
            </Text>
            {plan.author && (
                <HStack>
                    <Avatar
                        size="sm"
                        name={plan.author.name}
                        src={plan.author.avatarImage}
                    />
                    <Text fontSize="14px" color="#222222">
                        {plan.author.name}
                    </Text>
                </HStack>
            )}
        </VStack>
    );
}
