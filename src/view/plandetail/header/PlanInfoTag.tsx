import { Box, Center, HStack, Icon, Text, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { IconType } from "react-icons";
import { MdCurrencyYen, MdSchedule } from "react-icons/md";
import { DateHelper } from "src/domain/util/date";

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
                    backgroundColor="#EFEEEE"
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
    const endPlanDate = DateHelper.add(
        new Date(),
        durationInMinutes * DateHelper.Minute
    );
    return (
        <PlanInfoTag title="時間" icon={MdSchedule}>
            <Text>
                {DateHelper.formatHHMM(durationInMinutes)}(~{" "}
                {DateHelper.dateToHHMM(endPlanDate)})
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
    return (
        <PlanInfoTag title="予算" icon={MdCurrencyYen}>
            <HStack alignItems="flex-start" w="100%" spacing={0}>
                {minBudget > 0 && <Text>{`${minBudget}`}</Text>}
                {maxBudget > 0 && <Text>{`~${maxBudget}円`}</Text>}
            </HStack>
        </PlanInfoTag>
    );
};
