import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Plan } from "src/domain/models/Plan";
import { createArrayWithSize } from "src/domain/util/array";
import { HorizontalScrollablelList } from "src/view/common/HorizontalScrollablelList";
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
    grid?: boolean;
};

export function PlanList({
    plans,
    isLoading = false,
    children,
    empty,
    numPlaceHolders = 6,
    grid = true,
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
                <Layout grid={grid}>
                    {createArrayWithSize(numPlaceHolders).map((i) => (
                        <PlanCardContainer key={i} grid={grid}>
                            <PlanPreview plan={null} />
                        </PlanCardContainer>
                    ))}
                </Layout>
            </Container>
        );
    }

    return (
        <Container>
            {children}
            <Layout grid={grid}>
                {plans.map((plan, index) => (
                    <>
                        <PlanCardContainer key={index} grid={grid}>
                            <PlanPreview
                                link={Routes.plans.plan(plan.id)}
                                plan={plan}
                            />
                        </PlanCardContainer>
                        {(index + 1) % 6 === 0 && <AdInPlanList />}
                    </>
                ))}
            </Layout>
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

function PlanCardContainer({
    grid,
    children,
}: {
    grid: boolean;
    children: ReactNode;
}) {
    return <Box w={grid ? "100%" : "200px"}>{children}</Box>;
}

const Layout = ({ grid, children }: { grid: boolean; children: ReactNode }) => {
    if (grid) {
        return <GridLayout>{children}</GridLayout>;
    }

    return (
        <HorizontalScrollablelList pageButtonOffsetY={-48}>
            {children}
        </HorizontalScrollablelList>
    );
};

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
