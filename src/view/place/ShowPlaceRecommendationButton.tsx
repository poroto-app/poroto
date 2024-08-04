import { Box, Text } from "@chakra-ui/react";
import { useAppTranslation } from "src/hooks/useAppTranslation";

type Props = {
    onClick?: () => void;
};

export function ShowPlaceRecommendationButton({ onClick }: Props) {
    const { t } = useAppTranslation();
    return (
        <Box
            cursor="pointer"
            backgroundColor="white"
            borderRadius="50px"
            px="8px"
            py="4px"
            boxShadow="2px 2px 4px #A2A2A2"
            onClick={onClick}
        >
            <Text color="#2D59C9">
                {t("place:recommendedTouristSpotsShow")}
            </Text>
        </Box>
    );
}
