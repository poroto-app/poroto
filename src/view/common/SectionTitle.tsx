import { IconProps } from "@tamagui/helpers-icon";
import { NamedExoticComponent } from "react";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { Text, XStack, YStack } from "tamagui";

type Props = {
    title: string;
    description?: string;
    icon?: NamedExoticComponent<IconProps>;
    px?: number;
};

export function SectionTitle({ title, description, icon: Icon, px }: Props) {
    return (
        <YStack alignItems="flex-start" px={px} gap={Padding.p4}>
            <XStack>
                {Icon && <Icon size={24} />}
                <YStack>
                    {title.split("\n").map((line, index) => (
                        <Text
                            key={index}
                            fontWeight="bold"
                            fontSize={20}
                            color="#3E3E3E"
                        >
                            {line}
                        </Text>
                    ))}
                </YStack>
            </XStack>
            {description && (
                <Text fontSize="14px" color="#718096">
                    {description}
                </Text>
            )}
        </YStack>
    );
}

export function SectionTitlePlanInfo() {
    const { t } = useAppTranslation();

    return <SectionTitle title={t("plan:planInfo")} px={Size.PlanDetail.px} />;
}

export function SectionTitlePlan() {
    const { t } = useAppTranslation();
    return <SectionTitle title={t("plan:plan")} px={Size.PlanDetail.px} />;
}

export function SectionTitlePlanPlaces() {
    const { t } = useAppTranslation();
    return (
        <SectionTitle
            title={t("plan:placesInPlan")}
            description={t("plan:clickMarkerToShowPlaceDetail")}
            px={Size.PlanDetail.px}
        />
    );
}
