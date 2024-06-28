import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { useTranslation } from "next-i18next";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { MdCurrencyYen, MdSchedule } from "react-icons/md";
import { DateHelper } from "src/domain/util/date";
import { useAppTranslation } from "src/view/hooks/useAppTranslation";

type Props = {
    title: string;
    icon: IconType;
    children: ReactNode;
};

export const PlanInfoTag = ({ title, icon, children }: Props) => {
    return (
        <Box display="inline-block" whiteSpace="nowrap" flex={1}>
            <HStack
                backgroundColor="white"
                border="1px solid rgba(0,0,0,.2)"
                borderRadius="10px"
                px="12px"
                py="8px"
                spacing={4}
            >
                <Center
                    backgroundColor="#F9ECDD"
                    w="48px"
                    h="48px"
                    borderRadius="10px"
                >
                    <Icon w="24px" h="24px" color="#222222" as={icon} />
                </Center>
                <VStack alignItems="flex-start" spacing="0">
                    {children}
                    <Text color="gray">{title}</Text>
                </VStack>
            </HStack>
        </Box>
    );
};

export const PlanInfoTagDuration = ({
    durationInMinutes,
}: {
    durationInMinutes: number;
}) => {
    const { t } = useTranslation();
    const endPlanDate = DateHelper.add(
        new Date(),
        durationInMinutes * DateHelper.Minute
    );
    return (
        <PlanInfoTag title={t("common:time")} icon={MdSchedule}>
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
        <PlanInfoTag title={t("common:budget")} icon={MdCurrencyYen}>
            <HStack alignItems="flex-start" w="100%" spacing={0}>
                {minBudget > 0 && <Text>{`${minBudget}`}</Text>}
                {maxBudget > 0 && (
                    <Text>{`~${t("common:priceLabel", { price: maxBudget })}`}</Text>
                )}
            </HStack>
        </PlanInfoTag>
    );
};
