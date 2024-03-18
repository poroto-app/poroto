import { VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Plan } from "src/domain/models/Plan";
import { createArrayWithSize } from "src/domain/util/array";
import { Routes } from "src/view/constants/router";
import { PlanPreview } from "src/view/plan/PlanPreview";
import styled from "styled-components";
import { AdInPlanList } from "../ad/AdInPlanList";

type Props = {
    children?: ReactNode;
    isLoading?: boolean;
    plans: Plan[] | null;
    numPlaceHolders?: number;
    empty?: ReactNode;
};

export function PlanList({
    plans,
    isLoading = false,
    children,
    empty,
    numPlaceHolders = 6,
}: Props) {
    if (!plans || plans.length == 0 || isLoading) {
        if (empty && !isLoading) {
            return (
                <Container>
                    {children}
                    {empty}
                </Container>
            );
        }

        return (
            <Container>
                {children}
                <GridLayout>
                    {createArrayWithSize(numPlaceHolders).map((i) => (
                        <PlanPreview key={i} plan={null} />
                    ))}
                </GridLayout>
            </Container>
        );
    }

    return (
        <Container>
            {children}
            <GridLayout>
                {plans.map((plan, index) => (
                    <>
                        <PlanPreview
                            key={index}
                            link={Routes.plans.plan(plan.id)}
                            plan={plan}
                        />
                        {(index + 1) % 6 === 0 && <AdInPlanList />}
                    </>
                ))}
            </GridLayout>
        </Container>
    );
}

function Container({ children }: { children: ReactNode }) {
    return (
        <VStack w="100%" spacing={4} alignItems="center">
            {children}
        </VStack>
    );
}

const GridLayout = styled.div`
    display: grid;
    width: 100%;
    column-gap: 24px;
    row-gap: 48px;

    grid-template-columns: 1fr;

    @media (min-width: calc(600px + 16px + 16px)) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: calc(900px + 32px + 16px)) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;
