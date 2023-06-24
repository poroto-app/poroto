import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useLottie } from "lottie-react";
import Link from "next/link";
import { useEffect } from "react";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { Routes } from "src/view/constants/router";
import animationDataFailedLocation from "src/view/lottie/location-failed.json";
import animationDataLoadingLocation from "src/view/lottie/location-loading.json";

type Props = {
    isRejected: boolean;
    isLoadingLocation: boolean;
    onRetry: () => void;

    // ホームでのみ利用
    onClickClose: () => void;
    isHome?: boolean;
};

export function FetchLocationDialog({
    isLoadingLocation,
    isRejected,
    isHome,
    onRetry,
    onClickClose,
}: Props) {
    if (!isRejected && !isLoadingLocation) return <></>;

    return (
        <FullscreenDialog padding="16px">
            <RoundedDialog>
                <Box p="16px" w="100%">
                    {isLoadingLocation && <Fetching />}
                    {isRejected && (
                        <Failed
                            onClickReFetch={onRetry}
                            onClickClose={onClickClose}
                            isHome={isHome ?? false}
                        />
                    )}
                </Box>
            </RoundedDialog>
        </FullscreenDialog>
    );
}

function Fetching() {
    return (
        <VStack w="100%">
            <LottieContainer animationData={animationDataLoadingLocation} />
            <Text>位置情報を取得しています...</Text>
        </VStack>
    );
}

function Failed({
    onClickReFetch,
    onClickClose,
    isHome,
}: {
    onClickReFetch: () => void;
    onClickClose: () => void;
    isHome: boolean;
}) {
    return (
        <VStack w="100%">
            <LottieContainer
                animationData={animationDataFailedLocation}
                loop={false}
            />
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
                {!isHome ? (
                    <Link href={Routes.home} style={{ width: "100%" }}>
                        <Button w="100%" variant="link" colorScheme="blue">
                            ホームに戻る
                        </Button>
                    </Link>
                ) : (
                    <Button
                        w="100%"
                        variant="link"
                        colorScheme="blue"
                        onClick={onClickClose}
                    >
                        閉じる
                    </Button>
                )}
            </VStack>
        </VStack>
    );
}

function LottieContainer({
    animationData,
    loop = true,
}: {
    animationData: unknown;
    loop?: boolean;
}) {
    const {
        View: LottieView,
        play,
        stop,
    } = useLottie({
        animationData,
        loop,
        autoplay: false,
        style: {
            position: "absolute",
            top: 0,
            right: 0,
            bottom: 0,
            left: 0,
        },
    });

    useEffect(() => {
        play();
    }, []);

    return (
        <Box w="100%" position="relative" h="250px">
            {LottieView}
        </Box>
    );
}
