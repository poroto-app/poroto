import { Link } from "@chakra-ui/next-js";
import { Box, Button, Text, VStack } from "@chakra-ui/react";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { LottiePlayer } from "src/view/common/LottiePlayer";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { Routes } from "src/view/constants/router";
import animationDataFailedLocation from "src/view/lottie/location-failed.json";
import animationDataLoadingLocation from "src/view/lottie/location-loading.json";

type Props = {
    fetchLocationRequestStatus: RequestStatus | null;
    isSkipCurrentLocationVisible?: boolean;
    onRetry: () => void;
};

export function FetchLocationDialog({
    fetchLocationRequestStatus,
    isSkipCurrentLocationVisible = false,
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
            <RoundedDialog>
                <Box p="16px" w="100%">
                    {fetchLocationRequestStatus === RequestStatuses.PENDING && (
                        <Fetching
                            isSkipCurrentLocationVisible={
                                isSkipCurrentLocationVisible
                            }
                        />
                    )}
                    {fetchLocationRequestStatus ===
                        RequestStatuses.REJECTED && (
                        <Failed onClickReFetch={onRetry} />
                    )}
                </Box>
            </RoundedDialog>
        </FullscreenDialog>
    );
}

function Fetching({
    isSkipCurrentLocationVisible,
}: {
    isSkipCurrentLocationVisible: boolean;
}) {
    return (
        <VStack w="100%">
            <Box w="100%" position="relative" h="250px">
                <LottiePlayer animationData={animationDataLoadingLocation} />
            </Box>
            <Text>位置情報を取得しています...</Text>
            {isSkipCurrentLocationVisible && (
                <Link href={Routes.places.search} mt="16px">
                    <Text color="blue.600">好きな場所からプランを作成する</Text>
                </Link>
            )}
        </VStack>
    );
}

function Failed({ onClickReFetch }: { onClickReFetch: () => void }) {
    return (
        <VStack w="100%">
            <Box w="100%" position="relative" h="250px">
                <LottiePlayer
                    animationData={animationDataFailedLocation}
                    loop={false}
                />
            </Box>
            <VStack spacing={0}>
                <Text>位置情報の取得に失敗しました</Text>
                <Text>設定をご確認ください</Text>
            </VStack>
            <VStack w="100%" pt="8px">
                <Button
                    w="100%"
                    variant="outline"
                    colorScheme="blue"
                    onClick={onClickReFetch}
                >
                    再取得
                </Button>
                <Link href={Routes.home} style={{ width: "100%" }}>
                    <Button w="100%" variant="link" colorScheme="blue">
                        ホームに戻る
                    </Button>
                </Link>
            </VStack>
        </VStack>
    );
}
