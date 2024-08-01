import { IconProps } from "@tamagui/helpers-icon";
import { Clock, JapaneseYen } from "@tamagui/lucide-icons";
import { NamedExoticComponent, ReactNode } from "react";
import { Padding } from "src/constant/padding";
import { DateHelper } from "src/domain/util/date";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { Text, XStack, YStack } from "tamagui";

type Props = {
    title: string;
    icon: NamedExoticComponent<IconProps>;
    children: ReactNode;
};

export const PlanInfoTag = ({ title, icon: Icon, children }: Props) => {
    return (
        <XStack
            w="100%"
            backgroundColor="white"
            borderWidth={1}
            borderColor="rgba(0,0,0,.2)"
            borderRadius={10}
            px={Padding.p16}
            py={Padding.p8}
            gap={Padding.p8}
            flex={1}
        >
            <XStack
                backgroundColor="#F9ECDD"
                alignItems="center"
                justifyContent="center"
                w={48}
                h={48}
                borderRadius={10}
            >
                <Icon size={24} color="#222222" />
            </XStack>
            <YStack alignItems="flex-start" gap={0}>
                {children}
                <Text color="gray">{title}</Text>
            </YStack>
        </XStack>
    );
};

export const PlanInfoTagDuration = ({
    durationInMinutes,
}: {
    durationInMinutes: number;
}) => {
    const { t } = useAppTranslation();
    const endPlanDate = DateHelper.add(
        new Date(),
        durationInMinutes * DateHelper.Minute
    );
    return (
        <PlanInfoTag title={t("common:time")} icon={Clock}>
            <Text>
                {DateHelper.formatHHMM(durationInMinutes, {
                    hour: t("common:labelHour"),
                    minute: t("common:labelMinute"),
                })}
                (~ {DateHelper.dateToHHMM(endPlanDate)})
            </Text>
        </PlanInfoTag>
    );
};

export const PlanInfoTagBudget = ({
    minBudget,
    maxBudget,
}: {
    minBudget: number;
    maxBudget: number;
}) => {
    const { t } = useAppTranslation();
    return (
        <PlanInfoTag title={t("common:budget")} icon={JapaneseYen}>
            <XStack alignItems="flex-start" w="100%" gap={0}>
                {minBudget > 0 && <Text>{`${minBudget}`}</Text>}
                {maxBudget > 0 && (
                    <Text>{`~${t("common:priceLabel", { price: maxBudget })}`}</Text>
                )}
            </XStack>
        </PlanInfoTag>
    );
};
