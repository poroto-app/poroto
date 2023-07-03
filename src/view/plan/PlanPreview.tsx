import { Link } from "@chakra-ui/next-js";
import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { MdDirectionsWalk } from "react-icons/md";
import { Plan } from "src/domain/models/Plan";
import { Colors } from "src/view/constants/color";
import { PlanThumbnail } from "src/view/plan/PlanThumbnail";

type Props = {
    plan: Plan;
    link?: string;
};

export function PlanPreview({ plan, link }: Props) {
    const thumbnails = plan.places
        .map((place) =>
            place.imageUrls.length > 0 ? place.imageUrls[0] : null
        )
        .filter((v) => v !== null);

    const tagTime = `${plan.timeInMinutes.toFixed(0)}分`;

    return (
        <VStack w="100%" maxW="600px">
            <PlanThumbnail imageUrls={thumbnails} link={link} />
            <LinkWrapper href={link}>
                <VStack w="100%" alignItems="flex-start" spacing={1}>
                    <Text fontWeight="bold" fontSize="1.1rem" color="#222222">
                        {plan.title}
                    </Text>
                    <HStack w="100%" justifyContent="flex-start">
                        {/* TODO: 最初の地点までの徒歩時間を移動距離を表示 */}
                        <TagContainer tag={tagTime}>
                            <Icon
                                w="24px"
                                h="24px"
                                color={Colors.primary["500"]}
                                as={MdDirectionsWalk}
                            />
                        </TagContainer>
                        {plan.tags.map((tag, i) => (
                            <TagContainer key={i} tag={tag.content} />
                        ))}
                    </HStack>
                </VStack>
            </LinkWrapper>
        </VStack>
    );
}

function LinkWrapper({
    href,
    children,
}: {
    href?: string;
    children?: ReactNode;
}) {
    if (href)
        return (
            <Link href={href} w="100%">
                {children}
            </Link>
        );
    return <>{children}</>;
}

function TagContainer({
    tag,
    children,
}: {
    tag: string;
    children?: ReactNode;
}) {
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
}
