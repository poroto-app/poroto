import { Avatar, Box, HStack, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { ImageSize } from "src/domain/models/Image";
import { getPlanPriceRange, Plan } from "src/domain/models/Plan";
import { PriceRange } from "src/domain/models/PriceRange";
import { Size } from "src/view/constants/size";
import { isPC } from "src/view/constants/userAgent";
import { PlaceImageGallery } from "src/view/plandetail/header/PlaceImageGallery";
import { PlaceList } from "src/view/plandetail/header/PlaceList";
import {
    PlanInfoTagBudget,
    PlanInfoTagDuration,
} from "src/view/plandetail/header/PlanInfoTag";

type Props = {
    plan: Plan;
    imageSizeOfPlacePhoto?: ImageSize;
};

// TODO: 画像の背景に影を入れる
// TODO: 共有ボタンの追加
export function PlanDetailPageHeader({ plan }: Props) {
    const [currentPage, setCurrentPage] = useState(0);
    const placesWithImages = plan.places.filter(
        (place) => place.images.length > 0
    );
    return (
        <VStack
            w="100%"
            h="100%"
            py="32px"
            backgroundColor="#483216"
            spacing="16px"
        >
            <Box px={Size.PlanDetailHeader.px}>
                <PlaceImageGallery
                    places={placesWithImages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </Box>
            <PlaceList
                places={plan.places}
                onClickPlace={({ index }) => setCurrentPage(index)}
            />
            <VStack w="100%" spacing="16px" alignItems="flex-start" justifyContent="flex-end" flex={1}>
                <VStack
                    alignSelf="center"
                    w="100%"
                    px={Size.PlanDetailHeader.px}
                    maxW={Size.PlanDetailHeader.maxW}
                    alignItems="flex-start"
                    justifyContent="center"
                >
                    <Text color="white" fontWeight="bold" fontSize="20px">
                        {plan.title}
                    </Text>
                    {plan.author && (
                        <HStack>
                            <Avatar
                                name={plan.author.name}
                                src={plan.author.avatarImage}
                            />
                            <Text color="white">{plan.author.name}</Text>
                        </HStack>
                    )}
                </VStack>
                <PlanInfoSection
                    durationInMinutes={plan.timeInMinutes}
                    priceRange={getPlanPriceRange(plan.places)}
                />
            </VStack>
        </VStack>
    );
}

function PlanInfoSection({
    durationInMinutes,
    priceRange,
}: {
    durationInMinutes: number;
    priceRange: PriceRange;
}) {
    return (
        <HStack
            w="100%"
            maxW={isPC && Size.PlanDetailHeader.maxW}
            mt="16px"
            px={Size.PlanDetailHeader.px}
            alignSelf="center"
            overflowX="auto"
            flexWrap={isPC ? "wrap" : "nowrap"}
            sx={{
                "::-webkit-scrollbar": {
                    display: "none",
                },
            }}
        >
            <PlanInfoTagDuration durationInMinutes={durationInMinutes} />
            {(priceRange.min !== 0 || priceRange.max !== 0) && (
                <PlanInfoTagBudget
                    minBudget={priceRange.min}
                    maxBudget={priceRange.max}
                />
            )}
        </HStack>
    );
}
