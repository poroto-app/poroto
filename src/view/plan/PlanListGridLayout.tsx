import { ReactNode } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { Routes } from "src/constant/router";
import { Size } from "src/constant/size";
import { createArrayWithSize } from "src/domain/util/array";
import { hasValue } from "src/domain/util/null";
import { PlanListProps } from "src/types/props";
import { AdInPlanList } from "src/view/ad/AdInPlanList";
import { PlanPreview } from "src/view/plan/PlanPreview";
import styled from "styled-components";
import { YStack } from "tamagui";

const Layout = styled.div<{ px?: number }>`
    display: grid;
    width: 100%;
    column-gap: ${Size.PlanList.RecentlyCreated.columnGap}px;
    row-gap: ${Size.PlanList.RecentlyCreated.rowGap}px;
    padding: 0 ${({ px }) => px + "px"};

    grid-template-columns: 1fr;

    @media (min-width: ${({ px }) =>
            Size.PlanList.Card.minW * 2 +
            Size.PlanList.RecentlyCreated.columnGap +
            px * 2}px) {
        grid-template-columns: 1fr 1fr;
    }

    @media (min-width: ${({ px }) =>
            Size.PlanList.Card.minW * 3 +
            Size.PlanList.RecentlyCreated.columnGap * 2 +
            px * 2}px) {
        grid-template-columns: 1fr 1fr 1fr;
    }
`;

function Container({
    canLoadMore,
    loadMore,
    children,
}: { children?: ReactNode } & PlanListProps) {
    if (hasValue(loadMore)) {
        return (
            // TODO: React 18に対応
            // eslint-disable-next-line @typescript-eslint/ban-ts-comment
            // @ts-ignore
            <InfiniteScroll
                loadMore={() => loadMore()}
                hasMore={canLoadMore}
                style={{ width: "100%" }}
            >
                {children}
            </InfiniteScroll>
        );
    }

    return children;
}

export function PlanListGridLayout(props: PlanListProps) {
    const {
        plans,
        px = 0,
        numPlaceHolders,

        wrapTitle,
        showAuthor,

        ads,
    } = props;

    const data = plans || createArrayWithSize(numPlaceHolders).map(() => null);

    return (
        <Container {...props}>
            <Layout px={px}>
                {data.map((plan, index) => {
                    return (
                        <>
                            <YStack minWidth="100%" key={index}>
                                <PlanPreview
                                    plan={plan}
                                    link={plan && Routes.plans.plan(plan.id)}
                                    wrapTitle={wrapTitle}
                                    showAuthor={showAuthor}
                                    draggableThumbnail={true}
                                />
                            </YStack>
                            {(index + 1) % 6 === 0 && ads && <AdInPlanList />}
                        </>
                    );
                })}
            </Layout>
        </Container>
    );
}
