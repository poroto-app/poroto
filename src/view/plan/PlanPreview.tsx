import { ReactNode } from "react";
import { Link } from "solito/link";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { Plan } from "src/domain/models/Plan";
import { appImageLoader } from "src/view/image/appImageLoader";
import { PlanThumbnail } from "src/view/plan/PlanThumbnail";
import { Avatar, Text, XStack, YStack } from "tamagui";

type Props = {
    plan: Plan | null;
    link?: string;
    planThumbnailHeight?: number;
    wrapTitle?: boolean;
    showAuthor?: boolean;
    draggableThumbnail?: boolean;
};

export function PlaceHolder() {
    return (
        <YStack
            w="100%"
            maxWidth={600}
            alignItems="flex-start"
            gap={Padding.p8}
        >
            <PlaceHolderBox height={300} />
            <PlaceHolderBox height={20} width={200} />
        </YStack>
    );
}

export function PlanPreview({
    plan,
    link,
    planThumbnailHeight,
    wrapTitle = true,
    showAuthor = true,
    draggableThumbnail = true,
}: Props) {
    if (!plan) return <PlaceHolder />;

    const thumbnails = plan.places
        .map((place) => {
            if (place.images.length > 0) return place.images[0];
            return null;
        })
        .filter((v) => v !== null);

    return (
        <YStack
            w="100%"
            maxWidth={600}
            alignItems="flex-start"
            overflow="hidden"
            gap={Padding.p8}
        >
            <PlanThumbnail
                images={thumbnails}
                h={planThumbnailHeight}
                link={link}
                draggable={draggableThumbnail}
            />
            <LinkWrapper href={link}>
                <Text
                    fontWeight="bold"
                    fontSize={16}
                    color="#222222"
                    whiteSpace={wrapTitle ? "normal" : "nowrap"}
                    overflow="hidden"
                    textOverflow="ellipsis"
                >
                    {plan.title}
                </Text>
            </LinkWrapper>
            {plan.author && showAuthor && (
                <XStack w="100%" alignItems="center" gap={Padding.p8}>
                    <Avatar circular size={28}>
                        <Avatar.Image
                            source={{
                                uri: appImageLoader({
                                    src: plan.author?.avatarImage,
                                    width: Size.NavBar.avatar.width,
                                }),
                            }}
                            alt="avatar image"
                        />
                    </Avatar>
                    <Text
                        w="100%"
                        overflow="hidden"
                        whiteSpace="nowrap"
                        textOverflow="ellipsis"
                        fontSize={12}
                        color="rgba(8, 19, 26, 0.66)"
                    >
                        {plan.author.name}
                    </Text>
                </XStack>
            )}
        </YStack>
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
            <Link href={href} viewProps={{ style: { width: "100%" } }}>
                {children}
            </Link>
        );
    return <>{children}</>;
}

function PlaceHolderBox({
    width = "100%",
    height,
}: {
    width?: number | "100%";
    height: number;
}) {
    return (
        <XStack
            w={width}
            h={height}
            borderRadius={15}
            backgroundColor="rgba(0, 0, 0, 0.1)"
        />
    );
}
