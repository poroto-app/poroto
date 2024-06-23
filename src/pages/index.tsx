import { Box, Text, VStack } from "@chakra-ui/react";
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
import { Padding } from "src/view/constants/padding";
import { Size } from "src/view/constants/size";
import { useCreatePlanCategory } from "src/view/hooks/useCreatePlanCategory";
import { useGooglePlaceSearch } from "src/view/hooks/useGooglePlaceSearch";
import { usePwaInstall } from "src/view/hooks/usePwaInstall";
import {
    BottomNavigation,
    BottomNavigationPages,
} from "src/view/navigation/BottomNavigation";
import { NavBar } from "src/view/navigation/NavBar";
import { PlaceSearchBar } from "src/view/place/PlaceSearchBar";
import { PlaceSearchResults } from "src/view/place/PlaceSearchResults";
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
                    googlePlaceSearchBar={
                        <VStack
                            px={Padding.p8}
                            py={Padding.p16}
                            top={0}
                            left={0}
                            right={0}
                            position="relative"
                        >
                            <PlaceSearchBar
                                onSearch={searchGooglePlacesByQuery}
                            />
                            <Box
                                w="100%"
                                backgroundColor="white"
                                borderRadius={5}
                                boxShadow={
                                    placeSearchResults &&
                                    placeSearchResults.length !== 0 &&
                                    "0px 5px 20px 0px rgb(0 0 0 / 10%)"
                                }
                            >
                                <PlaceSearchResults
                                    places={placeSearchResults}
                                    onClickPlace={onSelectedSearchResult}
                                />
                            </Box>
                        </VStack>
                    }
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
