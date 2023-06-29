import { Center, Text, VStack } from "@chakra-ui/react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";
import {
    fetchCachedCreatedPlans,
    reduxPlanCandidateSelector,
} from "src/redux/planCandidate";
import { useAppDispatch } from "src/redux/redux";
import { Layout } from "src/view/common/Layout";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NavBar } from "src/view/common/NavBar";
import { Routes } from "src/view/constants/router";
import { PlanPreview } from "src/view/plan/PlanPreview";

const SelectPlanPage = () => {
    const dispatch = useAppDispatch();
    const { plansCreated, createPlanSession } = reduxPlanCandidateSelector();

    const router = useRouter();
    const { sessionId } = router.query;

    useEffect(() => {
        // ページをリロードしたときのみキャッシュを取得する
        if (!sessionId || typeof sessionId !== "string") return;
        if (!plansCreated) {
            dispatch(fetchCachedCreatedPlans({ session: sessionId }));
        }
    }, [sessionId, plansCreated]);

    if (!plansCreated) {
        // TODO: ホームに戻れる404ページを作る
        // sessionに紐づくプランが存在しない
        if (createPlanSession) return <h1>Not Found</h1>;

        return <LoadingModal title="プランを取得しています" />;
    }

    // TODO: プラン作成失敗 or 直接このページに来たときははじく
    if (plansCreated.length === 0)
        return (
            <Center>
                <Text>プランを作成することができませんでした。</Text>
            </Center>
        );

    return (
        <Layout navBar={<NavBar title="プランを選ぶ" />}>
            <VStack w="100%" px="16px" spacing={8} py="16px">
                {plansCreated.map((plan, i) => (
                    <Link
                        href={Routes.plans.planCandidate(
                            createPlanSession,
                            plan.id
                        )}
                        key={i}
                        style={{ width: "100%" }}
                    >
                        <Center>
                            <PlanPreview plan={plan} key={i} />
                        </Center>
                    </Link>
                ))}
            </VStack>
        </Layout>
    );
};

export default SelectPlanPage;
