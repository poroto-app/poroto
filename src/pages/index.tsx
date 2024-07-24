import { Text, VStack } from "@chakra-ui/react";
import { GetStaticProps } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { PlannerGraphQlApi } from "src/data/graphql/PlannerGraphQlApi";
import { CreatePlanPlaceCategorySet } from "src/domain/models/CreatePlanPlaceCategory";
import { PlannerApi } from "src/domain/plan/PlannerApi";
import { TranslationNameSpaces, i18nAppConfig } from "src/locales/i18n";
import { CreatePlanCategoryList } from "src/view/category/CreatePlanCategoryList";
import { CreatePlanRangeDialog } from "src/view/category/CreatePlanRangeDialog";
import { Layout } from "src/view/common/Layout";
import { LoadingModal } from "src/view/common/LoadingModal";
import { Padding } from "src/constant/padding";
import { Size } from "src/constant/size";
import { useAppTranslation } from "src/view/hooks/useAppTranslation";
import { useCreatePlanCategory } from "src/view/hooks/useCreatePlanCategory";
import { useGooglePlaceSearch } from "src/view/hooks/useGooglePlaceSearch";
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
    const { t } = useAppTranslation();
    const {
        isPwaInstallVisible,
        isPwaInstallInstructionVisible,
        installPwa,
        cancelInstallPwa,
        closePwaInstallInstruction,
        markAlreadyInstalledToIosHome,
    } = usePwaInstall();

    const {
        mapCenter,
        isCreatePlanCategoryRangeDialogVisible,
        isCreatingPlanFromCategory,
        setMapCenter,
        onSelectCreatePlanCategory,
        onSelectCreatePlanRange,
        onCloseCreatePlanCategoryRangeDialog,
    } = useCreatePlanCategory();

    const {
        placeSearchResults,
        searchGooglePlacesByQuery,
        onSelectedSearchResult,
    } = useGooglePlaceSearch({
        onMoveToSelectedLocation: ({ location }) => setMapCenter(location),
    });

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
                maxW={Size.mainContentWidth + "px"}
                pt="16px"
                pb="48px"
                spacing="24px"
            >
                <PwaInstallDialog
                    visible={isPwaInstallVisible}
                    onClickInstall={() => installPwa()}
                    onClickCancel={() => cancelInstallPwa()}
                />
                <VStack
                    w="100%"
                    spacing={Padding.p16 + "px"}
                    pt={Padding.p32 + "px"}
                >
                    <VStack w="100%" px={Size.top.px + "px"} spacing={0}>
                        <Text fontWeight="bold" fontSize="1.5rem">
                            {t("plan:createPlanByCategoryTitle")}
                        </Text>
                        <Text color="rgba(0,0,0,.8)">
                            {t("plan:createPlanByCategoryDescription")}
                        </Text>
                    </VStack>
                    <CreatePlanCategoryList
                        categorySets={props.categorySets}
                        onSelectCategory={(category) =>
                            onSelectCreatePlanCategory({ category })
                        }
                    />
                </VStack>
            </VStack>
            <>
                <PwaIosInstruction
                    visible={isPwaInstallInstructionVisible}
                    onClose={closePwaInstallInstruction}
                    onClickAlreadyInstalled={markAlreadyInstalledToIosHome}
                />
                <CreatePlanRangeDialog
                    defaultMapCenter={mapCenter}
                    visible={isCreatePlanCategoryRangeDialogVisible}
                    onClose={onCloseCreatePlanCategoryRangeDialog}
                    onConfirm={onSelectCreatePlanRange}
                    googlePlaceSearchResults={placeSearchResults}
                    onSearchGooglePlacesByQuery={searchGooglePlacesByQuery}
                    onClickGooglePlaceSearchResult={onSelectedSearchResult}
                />
                {isCreatingPlanFromCategory && (
                    <LoadingModal title={t("plan:createPlanInProgressTitle")} />
                )}
            </>
        </Layout>
    );
};

export const getStaticProps: GetStaticProps<Props> = async ({ locale }) => {
    const plannerApi: PlannerApi = new PlannerGraphQlApi();

    try {
        console.info({
            page: "/",
            message: "Fetching Create Plan Place Categories...",
        });
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
            revalidate: 60 * 60,
        };
    } catch (e) {
        console.error({
            page: "/",
            message: "Failed to fetch Create Plan Place Categories.",
            error: e,
        });

        return {
            props: {
                categorySets: [],
                ...(await serverSideTranslations(
                    locale,
                    TranslationNameSpaces,
                    i18nAppConfig
                )),
            },
            revalidate: 30,
        };
    }
};

export default IndexPage;
