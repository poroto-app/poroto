import { VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Plan } from "src/domain/models/Plan";
import { Routes } from "src/view/constants/router";
import { PlanPreview } from "src/view/plan/PlanPreview";
import styled from "styled-components";

type Props = {
    children?: ReactNode;
    plans: Plan[] | null;
};

export function PlanList({ plans, children }: Props) {
    return (
        <VStack w="100%" spacing={4} alignItems="center">
            {children}
            <GridLayout>
                {plans &&
                    plans.map((plan, index) => (
                        <PlanPreview
                            key={index}
                            link={Routes.plans.plan(plan.id)}
                            plan={plan}
                        />
                    ))}
            </GridLayout>
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
