import { Center, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { useEffect } from "react";
import InfiniteScroll from "react-infinite-scroller";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { Plan } from "src/domain/models/Plan";
import {
    createPlanFromPlanEntity,
    PlannerApi,
} from "src/domain/plan/PlannerApi";
import {
    fetchPlansRecentlyCreated,
    pushPlansRecentlyCreated,
    reduxPlanSelector,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { Routes } from "src/view/constants/router";
import { Size } from "src/view/constants/size";
import { PlanPreview } from "src/view/plan/PlanPreview";
import { CreatePlanSection } from "src/view/top/CreatePlanSection";

type Props = {
    plansRecentlyCreated: Plan[];
    nextPageTokenPlansRecentlyCreated: string | null;
};

const IndexPage = (props: Props) => {
    const dispatch = useAppDispatch();
    const { plansRecentlyCreated, nextPageTokenPlansRecentlyCreated } =
        reduxPlanSelector();

    useEffect(() => {
        // 初期表示時のみISRで取得したプランをReduxに保存する
        if (!plansRecentlyCreated)
            dispatch(
                pushPlansRecentlyCreated({
                    plans: props.plansRecentlyCreated,
                    nextPageTokenPlansRecentlyCreated:
                        props.nextPageTokenPlansRecentlyCreated,
                })
            );
    }, [plansRecentlyCreated]);

    return (
        <VStack w="100%">
            <CreatePlanSection />
            <Center w="100%">
                <VStack maxW={Size.mainContentWidth} w="100%" px="16px" py="48px" spacing="24px">
                    {plansRecentlyCreated && (
                        // TODO: React 18に対応
                        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                        // @ts-ignore
                        <InfiniteScroll
                            loadMore={() =>
                                dispatch(fetchPlansRecentlyCreated())
                            }
                            hasMore={nextPageTokenPlansRecentlyCreated !== null}
                        >
                            <VStack px="16px" spacing={16} w="100%">
                                {plansRecentlyCreated.map((plan, index) => (
                                    <PlanPreview
                                        key={index}
                                        link={Routes.plans.plan(plan.id)}
                                        plan={plan}
                                    />
                                ))}
                            </VStack>
                        </InfiniteScroll>
                    )}
                </VStack>
            </Center>
        </VStack>
    );
};

export const getStaticProps: GetStaticProps<Props> = async () => {
    const plannerApi: PlannerApi = new PlannerGraphQlApi();

    let plans: Plan[] = [];
    let nextPageKey: string | null = null;
    try {
        console.info({
            page: "/",
            message: "Fetching Recently Created Plans...",
        });
        const response = await plannerApi.fetchPlans({
            pageKey: null,
        });
        plans = response.plans.map((entity) =>
            createPlanFromPlanEntity(entity)
        );
        nextPageKey = response.nextPageKey;
    } catch (e) {
        console.error({
            page: "/",
            message: "Failed to fetch Recently Created Plans .",
            error: e,
        });

        return {
            props: {
                plansRecentlyCreated: [],
                nextPageTokenPlansRecentlyCreated: null,
            },
            revalidate: 30,
        };
    } finally {
        console.info({
            page: "/",
            message: "Fetched Recently Created Plans.",
        });
    }

    return {
        props: {
            plansRecentlyCreated: plans,
            nextPageTokenPlansRecentlyCreated: nextPageKey,
        },
        revalidate: 60,
    };
};

export default IndexPage;
