import { IconProps } from "@tamagui/helpers-icon";
import { Calendar, JapaneseYen } from "@tamagui/lucide-icons";
import { NamedExoticComponent, ReactNode, useState } from "react";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { PlaceCategory } from "src/domain/models/PlaceCategory";
import { PriceRange } from "src/domain/models/PriceRange";
import { DateHelper } from "src/domain/util/date";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import { Text, XStack, YStack } from "tamagui";

type Props = {
    priceRange: PriceRange | null;
    categories: PlaceCategory[];
    tabHSpacing?: number;
    estimatedStayDuration: number;
};

export const PlaceInfoTabs = {
    Information: "Information",
};
export type PlaceInfoTab = (typeof PlaceInfoTabs)[keyof typeof PlaceInfoTabs];

export const PlaceInfoTab = ({
    categories,
    priceRange,
    tabHSpacing,
    estimatedStayDuration,
}: Props) => {
    const { t } = useAppTranslation();
    const [activeTab, setActiveTab] = useState<PlaceInfoTab>(
        PlaceInfoTabs.Information
    );

    return (
        <YStack
            w="100%"
            gap={Padding.p16}
            h={180}
            transition="height 0.4s ease"
        >
            <XStack w="100%" px={tabHSpacing} alignItems="flex-start">
                <Tab
                    active={activeTab === PlaceInfoTabs.Information}
                    tab={PlaceInfoTabs.Information}
                    label={t("common:info")}
                    onClick={setActiveTab}
                />
            </XStack>
            <YStack
                alignItems="center"
                justifyContent="center"
                w="100%"
                h="100%"
                flex={1}
                overflow="hidden"
            >
                <TabPanel active={activeTab === PlaceInfoTabs.Information}>
                    <TabPanelInformation
                        categories={categories}
                        priceRange={priceRange}
                        estimatedStayDuration={estimatedStayDuration}
                    />
                </TabPanel>
            </YStack>
        </YStack>
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
        <YStack
            flex={1}
            alignItems="flex-start"
            tag="button"
            onPress={() => onClick(tab)}
        >
            <YStack alignItems="center" gap={0}>
                <Text userSelect="none">{label}</Text>
                <YStack
                    w="100%"
                    h={6}
                    borderRadius={10}
                    backgroundColor="#DCB78D"
                    opacity={active ? 1 : 0}
                    transition="all 0.4s ease"
                />
            </YStack>
        </YStack>
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
        <YStack
            w={active ? "100%" : 0}
            h="100%"
            opacity={active ? 1 : 0.5}
            transition="opacity 0.2s ease, height 0.2s ease"
        >
            {active && children}
        </YStack>
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
    const { t } = useAppTranslation();
    const isEstimatedStayDurationEmpty = estimatedStayDuration === 0;
    const isCategoryEmpty = categories.length === 0;
    const isPriceRangeEmpty = !priceRange || priceRange.max === 0;

    if (isCategoryEmpty && isPriceRangeEmpty && isEstimatedStayDurationEmpty) {
        return (
            <YStack
                w="100%"
                h="100%"
                justifyContent="center"
                alignItems="center"
            >
                <Text color="#574836">{t("place:noInformation")}</Text>
            </YStack>
        );
    }

    return (
        <YStack
            w="100%"
            gap={Padding.p8}
            px={Size.PlaceCard.px}
            overflow="hidden"
        >
            <HorizontalScrollableList
                roundedEdgeCorner={false}
                pageButtonVisible={false}
            >
                <XStack gap={Padding.p8} width="100%">
                    {!isCategoryEmpty && (
                        <InformationTag
                            key="category"
                            icon={getPlaceCategoryIcon(categories[0])}
                            value={categories[0].displayName}
                            label={t("place:category")}
                        />
                    )}
                    {!isPriceRangeEmpty && (
                        <InformationTag
                            key="priceRange"
                            icon={JapaneseYen}
                            value={`${priceRange.min}~${t("common:priceLabel", {
                                price: priceRange.max,
                            })}`}
                            label={t("place:priceRange")}
                        />
                    )}
                    {!isEstimatedStayDurationEmpty && (
                        <InformationTag
                            key="estimatedStayDuration"
                            icon={Calendar}
                            value={DateHelper.formatHHMM(
                                estimatedStayDuration,
                                {
                                    hour: t("common:labelHour"),
                                    minute: t("common:labelMinute"),
                                }
                            )}
                            label={t("place:estimatedStayDuration")}
                        />
                    )}
                </XStack>
            </HorizontalScrollableList>
        </YStack>
    );
};

const InformationTag = ({
    icon: Icon,
    value,
    label,
}: {
    icon: NamedExoticComponent<IconProps>;
    value: string;
    label: string;
}) => {
    return (
        <YStack
            px={Padding.p24}
            py={Padding.p16}
            gap={Padding.p16}
            borderWidth={0.5}
            borderColor="#CEB79B"
            borderRadius={10}
            justifyContent="space-between"
            alignItems="flex-start"
        >
            <Icon size={24} color="#946A35" />
            <YStack gap={0} alignItems="flex-start">
                <Text fontSize={14} color="#574836" whiteSpace="nowrap">
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
            </YStack>
        </YStack>
    );
};
