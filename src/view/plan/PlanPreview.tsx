import { Link } from "@chakra-ui/next-js";
import { HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { MdSchedule } from "react-icons/md";
import { Plan } from "src/domain/models/Plan";
import { DateHelper } from "src/domain/util/date";
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