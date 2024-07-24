import { Link } from "@chakra-ui/next-js";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { LottiePlayer } from "src/view/common/LottiePlayer";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { Routes } from "src/constant/router";
import { useAppTranslation } from "src/view/hooks/useAppTranslation";
import animationDataFailedLocation from "src/view/lottie/location-failed.json";
import animationDataLoadingLocation from "src/view/lottie/location-loading.json";

type Props = {
    fetchLocationRequestStatus: RequestStatus | null;
    skipLocationLabel: string;
    isSkipCurrentLocationVisible?: boolean;
    onRetry: () => void;
};

export function FetchLocationDialog({
    fetchLocationRequestStatus,
    isSkipCurrentLocationVisible = false,
    skipLocationLabel,
    onRetry,
}: Props) {
    return (
        <FullscreenDialog
            visible={[
                RequestStatuses.PENDING,
                RequestStatuses.REJECTED,
            ].includes(fetchLocationRequestStatus)}
            padding="16px"
        >
            <RoundedDialog backgroundColor="white">
                <Box p="16px" w="100%">
                    {fetchLocationRequestStatus === RequestStatuses.PENDING && (
                        <Fetching
                            skipLocationLabel={skipLocationLabel}
                            isSkipCurrentLocationVisible={
                                isSkipCurrentLocationVisible
                            }
                        />
                    )}
                    {fetchLocationRequestStatus ===
                        RequestStatuses.REJECTED && (
                        <Failed
                            skipLocationLabel={skipLocationLabel}
                            onClickReFetch={onRetry}
                        />
                    )}
                </Box>
            </RoundedDialog>
        </FullscreenDialog>
    );
}

function Fetching({
    skipLocationLabel,
    isSkipCurrentLocationVisible,
}: {
    skipLocationLabel: string;
    isSkipCurrentLocationVisible: boolean;
}) {
    const { t } = useAppTranslation();
    return (
        <VStack w="100%">
            <Box w="100%" position="relative" h="250px">
                <LottiePlayer animationData={animationDataLoadingLocation} />
            </Box>
            <Text>{t("location:fetchCurrentLocationInProgress")}</Text>
            {isSkipCurrentLocationVisible && (
                <Link
                    href={Routes.places.search({ skipCurrentLocation: true })}
                    mt="16px"
                >
                    <Text color="blue.600">{skipLocationLabel}</Text>
                </Link>
            )}
        </VStack>
    );
}

// TODO: i18n
function Failed({
    skipLocationLabel,
    onClickReFetch,
}: {
    skipLocationLabel: string;
    onClickReFetch: () => void;
}) {
    return (
        <VStack w="100%">
            <VStack spacing={0}>
                <Text fontWeight="bold" fontSize="20px">
                    位置情報の取得に失敗しました
                </Text>
                <Text>設定をご確認ください</Text>
            </VStack>
            <Box w="100%" position="relative" h="250px">
                <LottiePlayer
                    animationData={animationDataFailedLocation}
                    loop={false}
                />
            </Box>
            <VStack w="100%" py="16px">
                <Link
                    href={Routes.places.search({ skipCurrentLocation: true })}
                    style={{ width: "100%" }}
                >
                    <Button
                        w="100%"
                        variant="outline"
                        colorScheme="blue"
                        onClick={onClickReFetch}
                    >
                        {skipLocationLabel}
                    </Button>
                </Link>
                <Button w="100%" variant="link" colorScheme="blue">
                    再取得
                </Button>
            </VStack>
        </VStack>
    );
}
