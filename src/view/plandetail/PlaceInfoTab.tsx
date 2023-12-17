import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { FaRegStar } from "react-icons/fa6";
import { MdCurrencyYen, MdSchedule } from "react-icons/md";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { PriceRange } from "src/domain/models/PriceRange";
import { DateHelper } from "src/domain/util/date";
import { Size } from "src/view/constants/size";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import { PlaceInfoTabPanelReviews } from "src/view/plandetail/PlaceInfoTabPanelReviews";

type Props = {
    priceRange: PriceRange | null;
    categories: PlaceCategory[];
    tabHSpaacing?: string;
    googlePlaceReviews: GooglePlaceReview[];
    estimatedStayDuration: number;
};

export const PlaceInfoTabs = {
    Information: "Information",
    Reviews: "Reviews",
};
export type PlaceInfoTab = (typeof PlaceInfoTabs)[keyof typeof PlaceInfoTabs];

export const PlaceInfoTab = ({
    categories,
    priceRange,
    tabHSpaacing,
    googlePlaceReviews,
    estimatedStayDuration,
}: Props) => {
    const [activeTab, setActiveTab] = useState<PlaceInfoTab>(
        PlaceInfoTabs.Information
    );

    const tabHeight = {
        [PlaceInfoTabs.Information]: 180,
        [PlaceInfoTabs.Reviews]: googlePlaceReviews.length > 0 ? 300 : 180,
    };

    return (
        <VStack
            w="100%"
            spacing="16px"
            h={tabHeight[activeTab]}
            transition="height 0.4s ease"
        >
            <HStack
                w="100%"
                px={tabHSpaacing}
                alignItems="flex-start"
            >
                <Tab
                    active={activeTab === PlaceInfoTabs.Information}
                    tab={PlaceInfoTabs.Information}
                    label="情報"
                    onClick={setActiveTab}
                />
                <Tab
                    active={activeTab === PlaceInfoTabs.Reviews}
                    tab={PlaceInfoTabs.Reviews}
                    label="レビュー"
                    onClick={setActiveTab}
                />
            </HStack>
            <Center w="100%" h="100%" flex={1} overflow="hidden">
                <TabPanel active={activeTab === PlaceInfoTabs.Information}>
                    <TabPanelInformation
                        categories={categories}
                        priceRange={priceRange}
                        googlePlaceReviews={googlePlaceReviews}
                        estimatedStayDuration={estimatedStayDuration}
                    />
                </TabPanel>
                <TabPanel active={activeTab === PlaceInfoTabs.Reviews}>
                    <PlaceInfoTabPanelReviews
                        googlePlaceReviews={googlePlaceReviews}
                    />
                </TabPanel>
            </Center>
        </VStack>
    );
};

export const Tab = ({
    active,
    tab,
    label,
    onClick,
}: {
    active: boolean;
    tab: PlaceInfoTab;
    label: string;
    onClick: (tab: PlaceInfoTab) => void;
}) => {
    return (
        <VStack
            flex={1}
            alignItems="flex-start"
            as="button"
            spacing="0"
            onClick={() => onClick(tab)}
        >
            <Text userSelect="none">{label}</Text>
            <Box
                w={active ? "40px" : "20px"}
                h="8px"
                backgroundColor="#DCB78D"
                opacity={active ? 1 : 0}
                transition="all 0.2s ease"
            />
        </VStack>
    );
};

export const TabPanel = ({
    active,
    children,
}: {
    active: boolean;
    children?: ReactNode;
}) => {
    return (
        <Box
            w={active ? "100%" : "0"}
            h="100%"
            opacity={active ? 1 : 0.5}
            transition="opacity 0.2s ease, height 0.2s ease"
        >
            {active && children}
        </Box>
    );
};

const average = (values: number[]) => {
    const sum = values.reduce((acc, rating) => acc + rating, 0);
    return sum / values.length;
};

const TabPanelInformation = ({
    categories,
    priceRange,
    googlePlaceReviews,
    estimatedStayDuration,
}: {
    categories: PlaceCategory[];
    priceRange: PriceRange | null;
    googlePlaceReviews: GooglePlaceReview[] | null;
    estimatedStayDuration: number;
}) => {
    const isEstimatedStayDurationEmpty = estimatedStayDuration === 0;
    const isCategoryEmpty = categories.length === 0;
    const isPriceRangeEmpty = !priceRange || priceRange.max === 0;
    const isGooglePlaceReviewsEmpty =
        !googlePlaceReviews || googlePlaceReviews.length === 0;
    const averageRating = average(
        googlePlaceReviews.map((review) => review.rating)
    );

    if (
        isCategoryEmpty &&
        isPriceRangeEmpty &&
        isGooglePlaceReviewsEmpty &&
        isEstimatedStayDurationEmpty
    ) {
        return (
            <Center w="100%" h="100%">
                <Text color="#574836">情報がありません</Text>
            </Center>
        );
    }

    return (
        <VStack
            w="100%"
            spacing="8px"
            px={Size.PlaceCardPaddingH}
            overflowX="hidden"
        >
            <HStack
                w="100%"
                alignItems="stretch"
                overflowX="scroll"
                overflowY="hidden"
                sx={{
                    "::-webkit-scrollbar": {
                        display: "none",
                    },
                }}
            >
                {!isCategoryEmpty && (
                    <InformationTag
                        icon={getPlaceCategoryIcon(categories[0])}
                        value={categories[0].displayName}
                        label="カテゴリ"
                    />
                )}
                {!isPriceRangeEmpty && (
                    <InformationTag
                        icon={MdCurrencyYen}
                        value={`${priceRange.min}~${priceRange.max} 円`}
                        label="価格帯"
                    />
                )}
                {!isGooglePlaceReviewsEmpty && (
                    <InformationTag
                        icon={FaRegStar}
                        value={averageRating.toFixed(1)}
                        label="評価"
                    />
                )}
                {!isEstimatedStayDurationEmpty && (
                    <InformationTag
                        icon={MdSchedule}
                        value={DateHelper.formatHHMM(estimatedStayDuration)}
                        label="予想滞在時間"
                    />
                )}
            </HStack>
        </VStack>
    );
};

const InformationTag = ({
    icon,
    value,
    label,
}: {
    icon: IconType;
    value: string;
    label: string;
}) => {
    return (
        <VStack
            px="20px"
            py="16px"
            spacing="16px"
            border="0.5px solid #CEB79B"
            borderRadius="10px"
            justifyContent="space-between"
            alignItems="flex-start"
        >
            <Icon as={icon} w="24px" h="24px" color="#946A35" />
            <VStack spacing={0} alignItems="flex-start">
                <Text fontSize="0.8rem" color="#574836" whiteSpace="nowrap">
                    {label}
                </Text>
                <Text color="#574836" whiteSpace="nowrap">
                    {value.split("\n").map((l) => (
                        <>
                            {l}
                            <br />
                        </>
                    ))}
                </Text>
            </VStack>
        </VStack>
    );
};
