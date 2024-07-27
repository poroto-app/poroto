import { getAnalytics, logEvent } from "@firebase/analytics";
import { Map, MapPin } from "@tamagui/lucide-icons";
import { AnalyticsEvents } from "src/constant/analytics";
import { Routes } from "src/constant/router";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { useMediaQuery } from "src/hooks/useMediaQuery";
import HangOut from "src/view/assets/svg/hangout.svg";
import { AppTrans } from "src/view/common/AppTrans";
import { CreatePlanButton } from "src/view/top/CreatePlanButton";
import { Text, XStack, YStack, isWeb } from "tamagui";

export function CreatePlanSection() {
    const { t } = useAppTranslation();
    const { xs } = useMediaQuery();

    return (
        <XStack
            backgroundColor="#BD9F8E"
            justifyContent="center"
            w="100%"
            h={!isWeb && 700}
            py={32}
            px={24}
        >
            <XStack
                w="100%"
                maxWidth={800}
                gap={64}
                alignItems="center"
                justifyContent="center"
                $xs={{ py: 0, flexDirection: "column" }}
                $gtXs={{ py: 32, flexDirection: "row" }}
                {...(!isWeb && {
                    py: xs ? 0 : 32,
                    flexDirection: xs ? "column" : "row",
                    rowGap: 0,
                })}
            >
                <YStack
                    w="100%"
                    flex={1}
                    justifyContent="center"
                    alignItems="center"
                >
                    <HangOut
                        width="100%"
                        maxWidth={500}
                        height={300}
                        maxHeight={300}
                        viewBox="0 0 785.77114 658"
                    />
                </YStack>
                <YStack
                    w="100%"
                    maxWidth={500}
                    flex={1}
                    justifyContent="center"
                    alignItems="flex-start"
                    gap={16}
                >
                    <Text
                        tag="h1"
                        color="white"
                        fontWeight="bold"
                        fontSize={24}
                        zIndex={10}
                    >
                        {t("home:createPlanTitle")}
                    </Text>
                    <XStack
                        w="100%"
                        gap={16}
                        filter="drop-shadow(20px 20px 60px #a18779)"
                    >
                        <CreatePlanButton
                            title={
                                <AppTrans
                                    i18nKey={
                                        "home:createPlanFromCurrentLocation"
                                    }
                                />
                            }
                            icon={Map}
                            link={Routes.plans.interest({})}
                            onClick={() =>
                                logEvent(
                                    getAnalytics(),
                                    AnalyticsEvents.CreatePlan
                                        .FromCurrentLocation
                                )
                            }
                        />
                        <CreatePlanButton
                            title={
                                <AppTrans
                                    i18nKey={"home:createPlanFromFavoritePlace"}
                                />
                            }
                            icon={MapPin}
                            link={Routes.places.search({
                                skipCurrentLocation: true,
                            })}
                            onClick={() =>
                                logEvent(
                                    getAnalytics(),
                                    AnalyticsEvents.CreatePlan
                                        .FromSelectedLocation
                                )
                            }
                        />
                    </XStack>
                </YStack>
            </XStack>
        </XStack>
    );
}
