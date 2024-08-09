import { Link } from "solito/link";
import { Padding } from "src/constant/padding";
import { Routes } from "src/constant/router";
import {
    RequestStatus,
    RequestStatuses,
} from "src/domain/models/RequestStatus";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { FullscreenDialog } from "src/view/common/FullscreenDialog";
import { LottiePlayer } from "src/view/common/LottiePlayer";
import { RoundedButton } from "src/view/common/RoundedButton";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import animationDataFailedLocation from "src/view/lottie/location-failed.json";
import animationDataLoadingLocation from "src/view/lottie/location-loading.json";
import { Text, XStack, YStack } from "tamagui";

type Props = {
    fetchLocationRequestStatus: RequestStatus | null;
    skipLocationLabel: string;
    isSkipCurrentLocationVisible?: boolean;
};

export function FetchLocationDialog({
    fetchLocationRequestStatus,
    isSkipCurrentLocationVisible = false,
    skipLocationLabel,
}: Props) {
    return (
        <FullscreenDialog
            visible={[
                RequestStatuses.PENDING,
                RequestStatuses.REJECTED,
            ].includes(fetchLocationRequestStatus)}
            padding={Padding.p16}
        >
            <RoundedDialog backgroundColor="white">
                <XStack p={Padding.p16} w="100%">
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
                        <Failed skipLocationLabel={skipLocationLabel} />
                    )}
                </XStack>
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
        <YStack w="100%" alignItems="center" gap={Padding.p16} py={Padding.p16}>
            <Text fontSize={20}>
                {t("location:fetchCurrentLocationInProgress")}
            </Text>
            <YStack w="100%" h={250} position="relative">
                <LottiePlayer animationData={animationDataLoadingLocation} />
            </YStack>
            {isSkipCurrentLocationVisible && (
                <YStack
                    alignItems="center"
                    animation="medium"
                    enterStyle={{
                        opacity: 0,
                    }}
                >
                    <Text color="$black075">
                        プランは好きな場所からも作ることができます
                    </Text>
                    <Link
                        href={Routes.places.search({
                            skipCurrentLocation: true,
                        })}
                        viewProps={{ style: { marginTop: Padding.p16 } }}
                    >
                        <RoundedButton w="100%" variant="outlined">
                            {skipLocationLabel}
                        </RoundedButton>
                    </Link>
                </YStack>
            )}
        </YStack>
    );
}

// TODO: i18n
function Failed({ skipLocationLabel }: { skipLocationLabel: string }) {
    const { t } = useAppTranslation();

    return (
        <YStack w="100%" alignItems="center">
            <YStack gap={0} alignItems="center">
                <Text fontWeight="bold" fontSize={20}>
                    位置情報の取得に失敗しました
                </Text>
                <Text>設定をご確認ください</Text>
            </YStack>
            <YStack w="100%" h={250} position="relative">
                <LottiePlayer
                    animationData={animationDataFailedLocation}
                    loop={false}
                />
            </YStack>
            <YStack w="100%" py={Padding.p16} gap={Padding.p8}>
                <Link
                    href={Routes.places.search({ skipCurrentLocation: true })}
                    viewProps={{ style: { width: "100%" } }}
                >
                    <RoundedButton w="100%" outlined>
                        {skipLocationLabel}
                    </RoundedButton>
                </Link>
                <Link
                    href={Routes.home}
                    viewProps={{ style: { width: "100%" } }}
                >
                    <RoundedButton w="100%" variant="ghost">
                        {t("common:backToHome")}
                    </RoundedButton>
                </Link>
            </YStack>
        </YStack>
    );
}
