import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { MdCurrencyYen } from "react-icons/md";
import { GooglePlaceReview } from "src/domain/models/GooglePlaceReview";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { PriceRange } from "src/domain/models/PriceRange";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import { PlaceInfoTabPanelReviews } from "src/view/plandetail/PlaceInfoTabPanelReviews";

type Props = {
    priceRange: PriceRange | null;
    categories: PlaceCategory[];
    googlePlaceReviews: GooglePlaceReview[];
};

export const PlaceInfoTabs = {
    Information: "Information",
    Reviews: "Reviews",
};
export type PlaceInfoTab = (typeof PlaceInfoTabs)[keyof typeof PlaceInfoTabs];

export const PlaceInfoTab = ({
    categories,
    priceRange,
    googlePlaceReviews,
}: Props) => {
    const [activeTab, setActiveTab] = useState<PlaceInfoTab>(
        PlaceInfoTabs.Information
    );

    const tabHeight = {
        [PlaceInfoTabs.Information]:
            categories.length > 0 || (priceRange && priceRange.max !== 0)
                ? 180
                : 50,
        [PlaceInfoTabs.Reviews]: googlePlaceReviews.length > 0 ? 300 : 50,
    };

    return (
        <VStack
            w="100%"
            spacing="16px"
            h={tabHeight[activeTab]}
            transition="height 0.4s ease"
        >
            <HStack w="100%" alignItems="flex-start">
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
            w="100%"
            h="100%"
            opacity={active ? 1 : 0.5}
            transition="all 0.2s ease"
        >
            {active && children}
        </Box>
    );
};

const TabPanelInformation = ({
    categories,
    priceRange,
}: {
    categories: PlaceCategory[];
    priceRange: PriceRange | null;
}) => {
    return (
        <VStack w="100%" spacing="8px">
            <HStack w="100%" alignItems="stretch">
                {categories.length > 0 && (
                    <InformationTag
                        icon={getPlaceCategoryIcon(categories[0])}
                        label={categories[0].displayName}
                    />
                )}
                {priceRange && priceRange.max !== 0 && (
                    <InformationTag
                        icon={MdCurrencyYen}
                        label={`${priceRange.min}~\n${priceRange.max} 円`}
                    />
                )}
            </HStack>
        </VStack>
    );
};

const InformationTag = ({ icon, label }: { icon: IconType; label: string }) => {
    return (
        <VStack
            minW="80px"
            px="16px"
            py="16px"
            spacing="16px"
            border="0.5px solid #CEB79B"
            borderRadius="10px"
            justifyContent="space-between"
        >
            <Icon as={icon} w="24px" h="24px" color="#946A35" />
            <Text color="#574836">
                {label.split("\n").map((l) => (
                    <>
                        {l}
                        <br />
                    </>
                ))}
            </Text>
        </VStack>
    );
};