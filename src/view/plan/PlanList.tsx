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
    plans: Plan[] | null;
    empty?: ReactNode;
};

export function PlanList({ plans, children, empty }: Props) {
    return (
        <VStack w="100%" spacing={4} alignItems="center">
            {children}
            {plans === null || plans.length === 0 ? (
                empty ? (
                    empty
                ) : (
                    <GridLayout>
                        {createArrayWithSize(6).map((i) => (
                            <PlanPreview key={i} plan={null} />
                        ))}
                    </GridLayout>
                )
            ) : (
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
            )}
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
