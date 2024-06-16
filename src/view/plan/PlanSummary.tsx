import { Box, Icon, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { useTranslation } from "react-i18next";
import { IconType } from "react-icons";
import { MdCurrencyYen, MdSchedule } from "react-icons/md";
import { DateHelper } from "src/domain/util/date";
import { AppTrans } from "src/view/common/AppTrans";
import styled from "styled-components";

type Props = {
    title: string;
    icon: IconType;
    children: ReactNode;
};

export const PlanSummary = ({ title, icon, children }: Props) => {
    return (
        <PlanSummaryContainer>
            <VStack alignItems="flex-start">
                <Icon w="24px" h="24px" color="#222222" as={icon} />
                <Text fontSize="0.75rem" color="gray">
                    {title}
                </Text>
            </VStack>
            <Box w="100%" pt="4px" color="#222222">
                {children}
            </Box>
        </PlanSummaryContainer>
    );
};

const PlanSummaryContainer = styled.div`
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    display: flex;
    align-items: flex-start;
    justify-content: space-between;
    flex-direction: column;
    min-width: 120px;
    width: 120px;
    height: 145px;
    padding: 16px;
`;

export const PlanSummaryDuration = ({
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
        <PlanSummary title={t("common:time")} icon={MdSchedule}>
            <VStack alignItems="flex-start" w="100%" spacing={0}>
                <Text>{DateHelper.formatHHMM(durationInMinutes)}</Text>
                <Text color="gray">~ {DateHelper.dateToHHMM(endPlanDate)}</Text>
            </VStack>
        </PlanSummary>
    );
};

export const PlanSummaryBudget = ({
    minBudget,
    maxBudget,
}: {
    minBudget: number;
    maxBudget: number;
}) => {
    const { t } = useTranslation();
    return (
        <PlanSummary title={t("common:budget")} icon={MdCurrencyYen}>
            <VStack alignItems="flex-start" w="100%" spacing={0}>
                {minBudget > 0 && <Text>{`${minBudget}`}</Text>}
                {maxBudget > 0 && (
                    <Text>
                        ~
                        <AppTrans
                            i18nKey="common:priceLabel"
                            values={{ price: maxBudget }}
                        />
                    </Text>
                )}
            </VStack>
        </PlanSummary>
    );
};
