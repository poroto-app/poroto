import { IconProps } from "@tamagui/helpers-icon";
import {
    Bookmark,
    Compass,
    Heart,
    PlaneTakeoff,
    TrendingUp,
} from "@tamagui/lucide-icons";
import { NamedExoticComponent } from "react";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { Text, XStack, YStack } from "tamagui";

type Props = {
    title: string;
    icon: NamedExoticComponent<IconProps>;
    px?: number;
    pt?: number;
    pb?: number;
};

export function PlanListSectionTitle({
    title,
    icon: Icon,
    px = Size.top.SectionTitle.px,
    pt = 32,
    pb = 32,
}: Props) {
    return (
        <YStack w="100%" alignItems="flex-start">
            <YStack
                pt={pt}
                pb={pb}
                px={px}
                alignItems="flex-start"
                gap={Padding.p8}
            >
                <XStack alignItems="center" gap={Padding.p8}>
                    <Icon size={30} color="#3E3E3E" />
                    <Text tag="h1" fontSize={20} fontWeight="bold">
                        {title}
                    </Text>
                </XStack>
                <XStack
                    w="100%"
                    h={4}
                    backgroundColor="#3E3E3E"
                    borderRadius={10}
                />
            </YStack>
        </YStack>
    );
}

export function PlanListSectionRecentlyCreated() {
    const { t } = useAppTranslation();
    return (
        <PlanListSectionTitle
            title={t("home:recentlyCreatedPlans")}
            icon={TrendingUp}
        />
    );
}

export function PlanListSectionTitleNearbyPlans({ px }: { px: number }) {
    const { t } = useAppTranslation();
    return (
        <PlanListSectionTitle
            title={t("plan:nearbyPlans")}
            icon={Compass}
            px={px}
        />
    );
}
export function PlanListSectionTitleCreatePlan() {
    const { t } = useAppTranslation();
    return (
        <PlanListSectionTitle
            title={t("plan:createNewPlanTitle")}
            icon={PlaneTakeoff}
            px={Size.PlanDetail.px}
        />
    );
}

export function PlanListSectionTitleCreatePlanFromOtherLocation() {
    const { t } = useAppTranslation();
    return (
        <PlanListSectionTitle
            title={t("plan:createPlanFromOtherLocation")}
            icon={Compass}
            px={Size.PlanDetail.px}
            pt={0}
        />
    );
}

export function PlanListSectionTitleFavoritePlaces() {
    const { t } = useAppTranslation();
    return (
        <PlanListSectionTitle
            px={Padding.p16}
            title={t("place:favoritePlaces")}
            icon={Heart}
        />
    );
}

export function PlanListSectionTitleSavedPlans() {
    const { t } = useAppTranslation();
    return (
        <PlanListSectionTitle
            title={t("plan:savedPlans")}
            icon={Bookmark}
            px={Padding.p16}
        />
    );
}
