import { Box, VStack } from "@chakra-ui/react";
import { ReactNode } from "react";
import { Plan } from "src/domain/models/Plan";
import { createArrayWithSize } from "src/domain/util/array";
import { HorizontalScrollableList } from "src/view/common/HorizontalScrollableList";
import { Routes } from "src/view/constants/router";
import { Size } from "src/view/constants/size";
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
    wrapTitle?: boolean;
    showAuthor?: boolean;
    px?: string | number;
};

export function PlanList({
    plans,
    isLoading = false,
    children,
    empty,
    numPlaceHolders = 6,
    grid = true,
    wrapTitle,
    showAuthor,
    px = 0,
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
                <Layout grid={grid} px={px}>
                    {createArrayWithSize(numPlaceHolders).map((i) => (
                        <PlanListItem
                            key={i}
                            plan={null}
                            grid={grid}
                            wrapTitle={wrapTitle}
                            showAuthor={showAuthor}
                        />
                    ))}
                </Layout>
            </Container>
        );
    }

    return (
        <Container>
            {children}
            <Layout grid={grid} px={px}>
                {plans.map((plan, index) => (
                    <>
                        <PlanListItem
                            key={plan.id}
                            plan={plan}
                            grid={grid}
                            wrapTitle={wrapTitle}
                            showAuthor={showAuthor}
                        />
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

function PlanListItem({
    plan,
    grid,
    wrapTitle,
    showAuthor,
}: {
    plan: Plan;
    grid: boolean;
    wrapTitle?: boolean;
    showAuthor?: boolean;
}) {
    return (
        <Box w={grid ? "100%" : "200px"}>
            <PlanPreview
                link={plan && Routes.plans.plan(plan.id)}
                plan={plan}
                planThumbnailHeight={
                    grid ? undefined : Size.PlanList.SavedPlan.ThumbnailHeight
                }
                wrapTitle={wrapTitle}
                showAuthor={showAuthor}
                draggableThumbnail={grid}
            />
        </Box>
    );
}

const Layout = ({
    grid,
    px,
    children,
}: {
    grid: boolean;
    px: string | number;
    children: ReactNode;
}) => {
    if (grid) {
        return <GridLayout px={px}>{children}</GridLayout>;
    }

    return (
        <HorizontalScrollableList pageButtonOffsetY={-8} px={px}>
            {children}
        </HorizontalScrollableList>
    );
};

const GridLayout = styled.div<{ px?: string | number }>`
    display: grid;
    width: 100%;
    column-gap: 24px;
    row-gap: 48px;
    padding: ${({ px }) => px};

    grid-template-columns: 1fr;

    @media (min-width: calc(600px + 16px + 16px)) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: calc(900px + 32px + 16px)) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;
