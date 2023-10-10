import { Link } from "@chakra-ui/next-js";
import { HStack, Text, VStack } from "@chakra-ui/react";
import { ReactNode, useState} from "react";
import { getImageSizeOf, ImageSizes } from "src/domain/models/Image";
import { Plan } from "src/domain/models/Plan";
import { PlanThumbnail } from "src/view/plan/PlanThumbnail";
import styled from "styled-components";

type Props = {
    plan: Plan | null;
    link?: string;
};

export function PlaceHolder() {
    return (
        <VStack w="100%" maxW="600px" alignItems="flex-start">
            <PlaceHolderBox height={300} />
            <PlaceHolderBox height={20} width={200} />
        </VStack>
    );
}

export function PlanPreview({ plan, link }: Props) {

    const [modalImageUrl, setModalImageUrl] = useState<string | null>(null);
    if (!plan) return <PlaceHolder />;

    const thumbnails = plan.places
        .map(
            (place) =>
                place.images.length > 0 &&
                getImageSizeOf(ImageSizes.Small, place.images[0])
        )
        .filter((v) => v !== null || v !== undefined);

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

const PlaceHolderBox = styled.div<{ width?: number; height: number }>`
    width: ${({ width }) => (width ? width + "px" : "100%")};
    max-width: 100%;
    height: ${({ height }) => height + "px"};
    border-radius: 15px;
    background-color: rgba(0, 0, 0, 0.1);
`;
