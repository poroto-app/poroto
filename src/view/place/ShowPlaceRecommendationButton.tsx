import { Padding } from "src/constant/padding";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { Text, YStack } from "tamagui";

type Props = {
    onClick?: () => void;
};

export function ShowPlaceRecommendationButton({ onClick }: Props) {
    const { t } = useAppTranslation();
    return (
        <YStack
            tag="button"
            cursor="pointer"
            backgroundColor="white"
            borderRadius={50}
            px={Padding.p8}
            py={Padding.p4}
            shadowOffset={{ width: 2, height: 2 }}
            shadowRadius={4}
            shadowColor="#A2A2A2"
            elevationAndroid={4}
            onPress={onClick}
        >
            <Text color="#2D59C9">
                {t("place:recommendedTouristSpotsShow")}
            </Text>
        </YStack>
    );
}
