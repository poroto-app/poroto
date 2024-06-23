import { Text, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { CreatePlanPlaceCategorySet } from "src/domain/models/CreatePlanPlaceCategory";
import { PlannerApi } from "src/domain/plan/PlannerApi";
import { TranslationNameSpaces, i18nAppConfig } from "src/locales/i18n";
import { CreatePlanCategoryList } from "src/view/category/CreatePlanCategoryList";
import { Layout } from "src/view/common/Layout";
import { Padding } from "src/view/constants/padding";
import { Size } from "src/view/constants/size";
import { usePwaInstall } from "src/view/hooks/usePwaInstall";
import {
    BottomNavigation,
    BottomNavigationPages,
} from "src/view/navigation/BottomNavigation";
import { NavBar } from "src/view/navigation/NavBar";
import { CreatePlanSection } from "src/view/top/CreatePlanSection";
import { PwaInstallDialog } from "src/view/top/PwaInstallDialog";
import { PwaIosInstruction } from "src/view/top/PwaIosInstruction";

type Props = {
    categorySets: CreatePlanPlaceCategorySet[];
};

const IndexPage = (props: Props) => {
    const {
        isPwaInstallVisible,
        isPwaInstallInstructionVisible,
        installPwa,
        cancelInstallPwa,
        closePwaInstallInstruction,
        markAlreadyInstalledToIosHome,
    } = usePwaInstall();

    return (
        <Layout
            height="auto"
            navBar={<NavBar />}
            bottomNavigation={
                <BottomNavigation page={BottomNavigationPages.Home} />
            }
            header={<CreatePlanSection />}
        >
            <VStack
                w="100%"
                maxW={Size.mainContentWidth}
                pt="16px"
                pb="48px"
                spacing="24px"
            >
                <PwaInstallDialog
                    visible={isPwaInstallVisible}
                    onClickInstall={() => installPwa()}
                    onClickCancel={() => cancelInstallPwa()}
                />
                <VStack w="100%" spacing={Padding.p16} pt={Padding.p32}>
                    <VStack w="100%" px={Size.top.px} spacing={0}>
                        <Text fontWeight="bold" fontSize="1.5rem">
                            どんなことしたい気分？
                        </Text>
                        <Text color="rgba(0,0,0,.8)">
                            今の気分からお任せでプランを作ってみましょう！
                        </Text>
                    </VStack>
                    <CreatePlanCategoryList categorySets={props.categorySets} />
                </VStack>
            </VStack>
            <>
                <PwaInstallDialog
                    visible={isPwaInstallVisible}
                    onClickInstall={() => installPwa()}
                    onClickCancel={() => cancelInstallPwa()}
                />
                <PwaIosInstruction
                    visible={isPwaInstallInstructionVisible}
                    onClose={closePwaInstallInstruction}
                    onClickAlreadyInstalled={markAlreadyInstalledToIosHome}
                />
            </>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const plannerApi: PlannerApi = new PlannerGraphQlApi();

    const { categories } = await plannerApi.fetchCreatePlanPlaceCategories({
        locale: locale,
    });

    return {
        props: {
            categorySets: categories,
            ...(await serverSideTranslations(
                locale,
                TranslationNameSpaces,
                i18nAppConfig
            )),
        },
        revalidate: 60,
    };
};

export default IndexPage;
