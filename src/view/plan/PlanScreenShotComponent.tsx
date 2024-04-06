import { Box, Text, VStack } from "@chakra-ui/react";
import { MutableRefObject, forwardRef } from "react";
import { Place } from "src/domain/models/Place";
import { Plan } from "src/domain/models/Plan";
import { PlanSummaryDuration } from "src/view/plan/PlanSummary";
import styled from "styled-components";

type Props = {
    plan: Plan;
    ref?: MutableRefObject<HTMLDivElement>;
};

export const PlanScreenShotComponent = forwardRef<HTMLDivElement, Props>(
    function Component({ plan }, ref) {
        return (
            <VStack w="360px" spacing={0} ref={ref}>
                <PlanTitle>
                    <Text fontSize="16px" color="#5E6382">
                        {plan.title}
                    </Text>
                </PlanTitle>
                {plan.places.map((place, i) => (
                    <PlaceListItem key={i} place={place} />
                ))}
                <Box py="16px" w="100%">
                    <PlanSummaryDuration
                        durationInMinutes={plan.timeInMinutes}
                    />
                </Box>
                <img src="/images/komichi.jpg" alt="komichi" />
            </VStack>
        );
    }
);

const PlaceListItem = ({ place }: { place: Place }) => {
    return (
        <Box w="100%" p="16px" borderBottom="1px solid rgba(0, 0, 0, .1)">
            <Text fontSize="16px">{place.name}</Text>
            <Text fontSize="16px" color="#808080">
                {"住所" /*TODO: 住所を指定できるようにする*/}
            </Text>
        </Box>
    );
};

const PlanTitle = styled.div`
    padding: 8px 16px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    width: 100%;
`;
