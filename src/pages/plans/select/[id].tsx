import { NavBar } from "src/view/common/NavBar";
import {
    Center,
    Text,
    VStack,
} from "@chakra-ui/react";
import React, { useEffect } from "react";
import { fetchCachedCreatedPlans, reduxPlanSelector } from "src/redux/plan";
import { LoadingModal } from "src/view/common/LoadingModal";
import { useRouter } from "next/router";
import { useAppDispatch } from "src/redux/redux";
import { Layout } from "src/view/common/Layout";
import { PlanPreview } from "src/view/plan/PlanPreview";

const SelectPlanPage = () => {
    const dispatch = useAppDispatch();
    const { plansCreated, createPlanSession } = reduxPlanSelector();

    const router = useRouter();
    const { id } = router.query;

    useEffect(() => {
        // ページをリロードしたときのみキャッシュを取得する
        if (!id || typeof id !== "string") return;
        if (!plansCreated) {
            dispatch(fetchCachedCreatedPlans({ session: id }));
        }
    }, [id, plansCreated]);

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
            <VStack w="100%" px="16px" spacing={16} py="16px">
                {plansCreated.map((plan, i) => (
                    <PlanPreview plan={plan} key={i} />
                ))}
            </VStack>
        </Layout>
    );
};

export default SelectPlanPage;
