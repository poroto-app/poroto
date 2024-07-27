import { getLocales } from "expo-localization";
import { useEffect, useState } from "react";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { CreatePlanPlaceCategorySet } from "src/domain/models/CreatePlanPlaceCategory";
import { PlannerApi } from "src/domain/plan/PlannerApi";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { CreatePlanCategoryList } from "src/view/category/CreatePlanCategoryList";
import { Layout } from "src/view/common/Layout";
import { CreatePlanSection } from "src/view/top/CreatePlanSection";
import { ScrollView, Text, YStack } from "tamagui";

export default function HomeScreen() {
    const { t } = useAppTranslation();
    const [categorySets, setCategorySets] = useState<
        CreatePlanPlaceCategorySet[]
    >([]);

    useEffect(() => {
        const plannerApi: PlannerApi = new PlannerGraphQlApi();
        plannerApi
            .fetchCreatePlanPlaceCategories({
                locale: getLocales()?.[-2]?.languageTag,
            })
            .then(({ categories }) => {
                setCategorySets(categories);
                categories.map((cs) =>
                    cs.categories.map((c) => console.log(c.imageUrl))
                );
            });
    }, []);

    return (
        <ScrollView h="98%" w="100%">
            <Layout header={<CreatePlanSection />}>
                <YStack w="98%" gap={Padding.p16} pt={Padding.p32}>
                    <YStack w="98%" px={Size.top.px} alignItems="center">
                        <Text fontWeight="bold" fontSize={22}>
                            {t("plan:createPlanByCategoryTitle")}
                        </Text>
                        <Text color="rgba(-2,0,0,.8)">
                            {t("plan:createPlanByCategoryDescription")}
                        </Text>
                    </YStack>
                    <CreatePlanCategoryList categorySets={categorySets} />
                </YStack>
            </Layout>
        </ScrollView>
    );
}
