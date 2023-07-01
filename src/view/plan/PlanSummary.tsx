import {Box, Icon, Text, VStack} from "@chakra-ui/react";
import { IconType } from "react-icons";
import { MdSchedule } from "react-icons/md";
import { DateHelper } from "src/domain/util/date";
import styled from "styled-components";
import {ReactNode} from "react";

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
    width: 120px;
    height: 100%;
    padding: 16px;
`;

export const PlanSummaryDuration = ({
    durationInMinutes,
}: {
    durationInMinutes: number;
}) => {
    const duration = `${durationInMinutes.toFixed()}分`;
    const endPlanDate = DateHelper.add(
        new Date(),
        durationInMinutes * DateHelper.Minute
    );
    const endPlanTime = `${DateHelper.dateToHHMM(endPlanDate)}`;
    return (
        <PlanSummary
            title="移動時間"
            icon={MdSchedule}
        >
            <VStack alignItems="flex-start" w="100%" spacing={0}>
                <Text>{duration}</Text>
                <Text color="gray">~ {endPlanTime}</Text>
            </VStack>
        </PlanSummary>
    );
};
