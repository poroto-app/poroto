import { Center, Divider, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import Link from "next/link";
import { useEffect } from "react";
import { MdOutlinePlace } from "react-icons/md";
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
import { RoundedIconButton } from "src/view/common/RoundedIconButton";
import { Routes } from "src/view/constants/router";
import { PlaceSearchButton } from "src/view/place/PlaceSearchButton";
import { PlanPreview } from "src/view/plan/PlanPreview";

type Props = {
    plansRecentlyCreated: Plan[];
    nextPageTokenPlansRecentlyCreated: string | null;
};

const IndexPage = (props: Props) => {
    const dispatch = useAppDispatch();
    const { plansRecentlyCreated, nextPageTokenPlansRecentlyCreated } =
        reduxPlanSelector();

    useEffect(() => {
        dispatch(
            pushPlansRecentlyCreated({
                plans: props.plansRecentlyCreated,
                nextPageTokenPlansRecentlyCreated:
                    props.nextPageTokenPlansRecentlyCreated,
            })
        );
    }, []);

    return (
        <Center w="100%">
            <VStack
                maxW="990px"
                w="100%"
                px="16px"
                divider={<Divider />}
                spacing="24px"
            >
                <VStack w="100%" spacing={4} pt="32px">
                    <PlaceSearchButton />
                    <Link
                        href={Routes.plans.interest}
                        style={{ width: "100%" }}
                    >
                        <RoundedIconButton icon={MdOutlinePlace}>
                            現在地からプランを作成
                        </RoundedIconButton>
                    </Link>
                </VStack>
                {plansRecentlyCreated && (
                    // TODO: React 18に対応
                    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                    // @ts-ignore
                    <InfiniteScroll
                        loadMore={() => dispatch(fetchPlansRecentlyCreated())}
                        hasMore={nextPageTokenPlansRecentlyCreated !== null}
                    >
                        <VStack px="16px" spacing={16} w="100%">
                            {plansRecentlyCreated.map((plan, index) => (
                                <Link
                                    href={Routes.plans.plan(plan.id)}
                                    key={index}
                                    style={{ width: "100%" }}
                                >
                                    <Center>
                                        <PlanPreview plan={plan} />
                                    </Center>
                                </Link>
                            ))}
                        </VStack>
                    </InfiniteScroll>
                )}
            </VStack>
        </Center>
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
