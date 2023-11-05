import { Box, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { IconType } from "react-icons";
import { MdCurrencyYen } from "react-icons/md";
import { Place } from "src/domain/models/Place";
import { getPlaceCategoryIcon } from "src/view/plan/PlaceCategoryIcon";
import { TabPanelReviews } from "src/view/plandetail/TabPanelReviews";

type Props = {
    place: Place;
};

export const PlaceInfoTabs = {
    Information: "Information",
    Reviews: "Reviews",
};
export type PlaceInfoTab = (typeof PlaceInfoTabs)[keyof typeof PlaceInfoTabs];

export const PlaceInfoTab = ({ place }: Props) => {
    const [activeTab, setActiveTab] = useState<PlaceInfoTab>(
        PlaceInfoTabs.Information
    );
    return (
        <VStack w="100%" spacing="16px">
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
            {activeTab === PlaceInfoTabs.Information && (
                <TabPanelInformation place={place} />
            )}
            {activeTab === PlaceInfoTabs.Reviews && (
                <TabPanelReviews place={place} />
            )}
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
        <VStack onClick={() => onClick(tab)} flex={1} alignItems="flex-start">
            <Text>{label}</Text>
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

const TabPanelInformation = ({ place }: Props) => {
    return (
        <VStack w="100%" spacing="16px">
            <HStack w="100%" alignItems="stretch">
                {place.categories.length > 0 && (
                    <InformationTag
                        icon={getPlaceCategoryIcon(place.categories[0])}
                        label={place.categories[0].displayName}
                    />
                )}
                {place.priceRange && place.priceRange.max !== 0 && (
                    <InformationTag
                        icon={MdCurrencyYen}
                        label={`${place.priceRange.min}~\n${place.priceRange.max} 円`}
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
