import { LinearGradient } from "@tamagui/linear-gradient";
import { useState } from "react";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { Image, getDefaultPlaceImage } from "src/domain/models/Image";
import { Plan } from "src/domain/models/Plan";
import { createArrayWithSize } from "src/domain/util/array";
import { PlaceCategoryIcon } from "src/view/place/PlaceCategoryIcon";
import { StoryImagePreview } from "src/view/plancandidate/StoryImagePreview";
import { Text, XStack, YStack, isWeb, styled } from "tamagui";

type Props = {
    plan: Plan;
    isActive: boolean;
    // カード中の最初の画像をタップして、次の要素に移動しようとしている
    onClickFirstItem?: () => void;
    // カード中の最後の画像をタップして、次の要素に移動しようとしている
    onClickLastItem?: () => void;
};

export function PlanCandidateGalleryCard({
    plan,
    isActive,
    onClickFirstItem,
    onClickLastItem,
}: Props) {
    const [currentPlaceIndex, setCurrentPlaceIndex] = useState<number>(0);

    // TODO: Not Foundの画像がNativeでも表示されるようにする
    const images: Image[] = plan.places.map((place) =>
        place.images.length > 0 && place.images[0].default !== ""
            ? place.images[0]
            : getDefaultPlaceImage({ isWeb })
    );

    return (
        <YStack
            alignItems="center"
            justifyContent="center"
            h={Size.PlanCandidatesGallery.Card.h.active}
        >
            <Card animation="quick" isActive={isActive} position="relative">
                <StoryImagePreview
                    images={images}
                    slideable={isActive}
                    onActiveIndexChange={setCurrentPlaceIndex}
                    onClickFirstItem={onClickFirstItem}
                    onClickLastItem={onClickLastItem}
                />
                <LinearGradient
                    position="absolute"
                    left={0}
                    right={0}
                    bottom={0}
                    px={Padding.p16}
                    pb={Padding.p16}
                    pt={Padding.p32}
                    colors={[
                        "rgba(0, 0, 0, 0.00)",
                        "rgba(0, 0, 0, 0.30)",
                        "rgba(0, 0, 0, 0.50)",
                    ]}
                    locations={[0, 0.3, 1]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 0, y: 1 }}
                >
                    <YStack w="100%" alignItems="flex-start" gap={Padding.p4}>
                        <XStack gap={Padding.p8}>
                            <PlaceCategoryIcon
                                category={
                                    plan.places[currentPlaceIndex].categories
                                        .length > 0
                                        ? plan.places[currentPlaceIndex]
                                              .categories[0]
                                        : null
                                }
                                size={20}
                                color="white"
                            />
                            <Text color="white">
                                {plan.places[currentPlaceIndex].name}
                            </Text>
                        </XStack>
                        <Text
                            tag="h2"
                            color="white"
                            fontWeight="bold"
                            fontSize={18}
                        >
                            {plan.title}
                        </Text>
                    </YStack>
                </LinearGradient>
                <XStack position="absolute" top={0} right={0} left={0}>
                    <PageIndicator
                        activeIndex={currentPlaceIndex}
                        total={plan.places.length}
                    />
                </XStack>
            </Card>
        </YStack>
    );
}

export function PlanCandidateGalleryCardPlaceHolder() {
    return (
        <XStack
            w={Size.PlanCandidatesGallery.Card.w}
            h={Size.PlanCandidatesGallery.Card.h.inactive}
            borderRadius={Size.PlanCandidatesGallery.Card.borderRadius}
            backgroundColor="$gray8"
            overflow="hidden"
        />
    );
}

const Card = styled(YStack, {
    width: Size.PlanCandidatesGallery.Card.w,
    borderRadius: Size.PlanCandidatesGallery.Card.borderRadius,
    overflow: "hidden",
    shadowOffset: { width: 0, height: 0 },
    shadowColor: "black",
    backgroundColor: "$gray9",

    variants: {
        isActive: {
            true: {
                filter: "none",
                shadowOpacity: 0.25,
                height: Size.PlanCandidatesGallery.Card.h.active,
            },
            false: {
                filter: "blur(1px)",
                shadowOpacity: 0,
                height: Size.PlanCandidatesGallery.Card.h.inactive,
            },
        },
    },
});

function PageIndicator({
    activeIndex,
    total,
}: {
    activeIndex: number;
    total: number;
}) {
    return (
        <XStack
            py={Padding.p16}
            px={Padding.p16}
            w="100%"
            h={4}
            shadowColor="black"
            shadowOpacity={0.25}
            shadowRadius={20}
            columnGap={Padding.p4}
        >
            {createArrayWithSize(total).map((_, i) => {
                return (
                    <XStack
                        key={i}
                        flex={1}
                        h={4}
                        borderRadius={10}
                        backgroundColor="white"
                        opacity={i === activeIndex ? 0.8 : 0.5}
                    />
                );
            })}
        </XStack>
    );
}
