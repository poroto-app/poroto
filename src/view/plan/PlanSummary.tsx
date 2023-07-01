import { Icon, Text, VStack } from "@chakra-ui/react";
import { IconType } from "react-icons";
import { BiYen } from "react-icons/bi";
import { MdSchedule } from "react-icons/md";
import { DateHelper } from "src/domain/util/date";
import styled from "styled-components";

type Props = {
    title: string;
    text: string;
    icon: IconType;
};

export const PlanSummary = ({ title, text, icon }: Props) => {
    return (
        <PlanSummaryContainer>
            <VStack alignItems="flex-start">
                <Icon w="24px" h="24px" color="#222222" as={icon} />
                <Text fontSize="0.75rem" color="gray">
                    {title}
                </Text>
            </VStack>
            <Text color="#222222" mt="4px">{text}</Text>
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

export const PlanDuration = ({
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
            text={`${duration} (~ ${endPlanTime})`}
            icon={MdSchedule}
        />
    );
};

export const PlanPrice = ({
    price,
    priceEnd,
}: {
    price: number;
    priceEnd?: number;
}) => {
    let priceStr = `${price}`;
    if (priceEnd) {
        priceStr += ` ~ ${priceEnd}`;
    }

    return <PlanSummary title="料金" text={priceStr} icon={BiYen} />;
};
