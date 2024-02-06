import { Avatar, Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { MdLink } from "react-icons/md";
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
    onCopyPlanUrl: () => void;
};

// TODO: 画像の背景に影を入れる
// TODO: 共有ボタンの追加
export function PlanDetailPageHeader({ plan, onCopyPlanUrl }: Props) {
    const [currentPage, setCurrentPage] = useState(0);
    const placesWithImages = plan.places.filter(
        (place) => place.images.length > 0
    );
    return (
        <VStack
            w="100%"
            h="100%"
            py="32px"
            background="linear-gradient(180deg, #7D6447 0%, #644B2E 70%, #3d2b15 100%)"
            spacing="16px"
            overflow="hidden"
        >
            <Box px={Size.PlanDetailHeader.px} zIndex={0}>
                <PlaceImageGallery
                    places={placesWithImages}
                    currentPage={currentPage}
                    onPageChange={(page) => setCurrentPage(page)}
                />
            </Box>
            <Box zIndex={1} w="100%">
                <PlaceList
                    places={plan.places}
                    onClickPlace={({ index }) => setCurrentPage(index)}
                />
            </Box>
            <VStack
                w="100%"
                spacing="16px"
                alignItems="flex-start"
                justifyContent="flex-end"
                flex={1}
                zIndex={1}
            >
                <VStack
                    alignSelf="center"
                    w="100%"
                    mb="16px"
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
                <HStack
                    w="100%"
                    maxW={Size.PlanDetailHeader.maxW}
                    px={Size.PlanDetailHeader.px}
                    alignSelf="center"
                >
                    <HStack
                        as="button"
                        px="4px"
                        py="2px"
                        backgroundColor="rgba(255,255,255,.8)"
                        color="#282828"
                        borderRadius="8px"
                        onClick={onCopyPlanUrl}
                        spacing="4px"
                    >
                        <Icon w="32px" h="32px" color="#5E6382" as={MdLink} />
                        <Text>リンクをコピー</Text>
                    </HStack>
                </HStack>
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
