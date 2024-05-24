import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { ReactNode, useState } from "react";
import { IconType } from "react-icons";
import { MdCurrencyYen, MdSchedule } from "react-icons/md";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { PriceRange } from "src/domain/models/PriceRange";
import { DateHelper } from "src/domain/util/date";
import { Size } from "src/view/constants/size";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";

type Props = {
    priceRange: PriceRange | null;
    categories: PlaceCategory[];
    tabHSpaacing?: string;
    estimatedStayDuration: number;
};

export const PlaceInfoTabs = {
    Information: "Information",
};
export type PlaceInfoTab = (typeof PlaceInfoTabs)[keyof typeof PlaceInfoTabs];

export const PlaceInfoTab = ({
    categories,
    priceRange,
    tabHSpaacing,
    estimatedStayDuration,
}: Props) => {
    const [activeTab, setActiveTab] = useState<PlaceInfoTab>(
        PlaceInfoTabs.Information
    );

    return (
        <VStack w="100%" spacing="16px" h={180} transition="height 0.4s ease">
            <HStack w="100%" px={tabHSpaacing} alignItems="flex-start">
                <Tab
                    active={activeTab === PlaceInfoTabs.Information}
                    tab={PlaceInfoTabs.Information}
                    label="情報"
                    onClick={setActiveTab}
                />
            </HStack>
            <Center w="100%" h="100%" flex={1} overflow="hidden">
                <TabPanel active={activeTab === PlaceInfoTabs.Information}>
                    <TabPanelInformation
                        categories={categories}
                        priceRange={priceRange}
                        estimatedStayDuration={estimatedStayDuration}
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
            onClick={() => onClick(tab)}
        >
            <VStack alignItems="center" spacing="0">
                <Text userSelect="none">{label}</Text>
                <Box
                    w="100%"
                    h="6px"
                    borderRadius="10px"
                    backgroundColor="#DCB78D"
                    opacity={active ? 1 : 0}
                    transition="all 0.4s ease"
                />
            </VStack>
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

const TabPanelInformation = ({
    categories,
    priceRange,
    estimatedStayDuration,
}: {
    categories: PlaceCategory[];
    priceRange: PriceRange | null;
    estimatedStayDuration: number;
}) => {
    const isEstimatedStayDurationEmpty = estimatedStayDuration === 0;
    const isCategoryEmpty = categories.length === 0;
    const isPriceRangeEmpty = !priceRange || priceRange.max === 0;

    if (isCategoryEmpty && isPriceRangeEmpty && isEstimatedStayDurationEmpty) {
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
                        key="category"
                        icon={getPlaceCategoryIcon(categories[0])}
                        value={categories[0].displayName}
                        label="カテゴリ"
                    />
                )}
                {!isPriceRangeEmpty && (
                    <InformationTag
                        key="priceRange"
                        icon={MdCurrencyYen}
                        value={`${priceRange.min}~${priceRange.max} 円`}
                        label="価格帯"
                    />
                )}
                {!isEstimatedStayDurationEmpty && (
                    <InformationTag
                        key="estimatedStayDuration"
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
