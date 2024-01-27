import { Link } from "@chakra-ui/next-js";
import { Avatar, HStack, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
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
    if (!plan) return <PlaceHolder />;

    const thumbnails = plan.places
        .map((place) => {
            if (place.images.length > 0) return place.images[0];
            return null;
        })
        .filter((v) => v !== null);

    return (
        <VStack w="100%" maxW="600px" alignItems="flex-start">
            <PlanThumbnail images={thumbnails} link={link} />
            <LinkWrapper href={link}>
                <Text fontWeight="bold" fontSize="1.1rem" color="#222222">
                    {plan.title}
                </Text>
            </LinkWrapper>
            {plan.author && (
                <HStack w="100%">
                    <Avatar
                        name={plan.author.name}
                        src={plan.author.avatarImage}
                        size="xs"
                    />
                    <Text
                        w="100%"
                        overflowX="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        fontSize={12}
                        color="rgba(8, 19, 26, 0.66)"
                    >
                        {plan.author.name}
                    </Text>
                </HStack>
            )}
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
