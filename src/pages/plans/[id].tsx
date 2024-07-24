import { Box, Button, Center, useToast, VStack } from "@chakra-ui/react";
import { getAnalytics, logEvent } from "@firebase/analytics";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { MdOutlineExplore, MdOutlineNearMe } from "react-icons/md";
import { AnalyticsEvents } from "src/constant/analytics";
import { Colors } from "src/constant/color";
import { Padding } from "src/constant/padding";
import { Routes } from "src/constant/router";
import { Size } from "src/constant/size";
import { isPC } from "src/constant/userAgent";
import { Place } from "src/domain/models/Place";
import { getPlanPriceRange } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { hasValue } from "src/domain/util/null";
import { useAuth } from "src/hooks/useAuth";
import { useCreatePlanFromSavedPlan } from "src/hooks/useCreatePlanFromSavedPlan";
import useUploadPlaceImage from "src/hooks/useUploadPlaceImage";
import { useUserPlan } from "src/hooks/useUserPlan";
import { setSearchLocation } from "src/redux/location";
import {
    fetchPlacesNearbyPlanLocation,
    fetchPlan,
    reduxPlanSelector,
    setPlaceIdToCreatePlan,
    setShowPlanCreatedModal,
} from "src/redux/plan";
import { useAppDispatch } from "src/redux/redux";
import { AdInPlanDetail } from "src/view/ad/AdInPlanDetail";
import { ErrorPage } from "src/view/common/ErrorPage";
import { LoadingModal } from "src/view/common/LoadingModal";
import { NotFound } from "src/view/common/NotFound";
import { SectionTitle } from "src/view/common/SectionTitle";
import { NavBar } from "src/view/navigation/NavBar";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { PlanCreatedDialog } from "src/view/plan/PlanCreatedDialog";
import { PlanFooter } from "src/view/plan/PlanFooter";
import { PlanList } from "src/view/plan/PlanList";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import DialogUploadImage from "src/view/plancandidate/DialogUploadImage";
import { CreatePlanDialog } from "src/view/plandetail/CreatePlanDialog";
import { PlanDetailPageHeader } from "src/view/plandetail/header/PlanDetailPageHeader";
import { LoginCallMessage } from "src/view/plandetail/LoginCallMessage";
import { NearbyPlaceList } from "src/view/plandetail/NearbyPlaceList";
import { PlanInfoSection } from "src/view/plandetail/PlanInfoSection";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";
import { PlanListSectionTitle } from "src/view/top/PlanListSectionTitle";

export default function PlanPage() {
    const { t } = useTranslation();
    const { id } = useRouter().query;
    const dispatch = useAppDispatch();
    const router = useRouter();
    const toast = useToast();

    const { user, signInWithGoogle } = useAuth();
    const { userId, firebaseIdToken, likePlaceIds, updateLikePlace } =
        useUserPlan();
    const { createPlanFromSavedPlan, isCreatingPlanFromSavedPlan } =
        useCreatePlanFromSavedPlan();
    const uploadImageProps = useUploadPlaceImage();
    const [isPlanFooterVisible, setIsPlanFooterVisible] = useState(false);

    const {
        preview: plan,
        nearbyPlans,
        placesNearbyPlanLocation,
        fetchPlanRequestStatus,
        showPlanCreatedModal,
        placeIdToCreatePlan,
    } = reduxPlanSelector();

    const handleOnCopyPlanUrl = () => {
        logEvent(getAnalytics(), AnalyticsEvents.Plan.CopyPlanUrl, {
            planId: id,
        });
        const url: string = location.href;
        navigator.clipboard.writeText(url);

        toast({
            title: t("plan:copiedPlanUrl"),
            description: t("plan:shareCreatedPlanMessage"),
            status: "success",
            duration: 3000, // ポップアップが表示される時間（ミリ秒）
            isClosable: true,
        });
    };

    // TODO: hooksで管理する
    const handleOnCreatePlan = async ({ place }: { place: Place }) => {
        logEvent(
            getAnalytics(),
            AnalyticsEvents.CreatePlan.FromPlaceNearbyPlan,
            {
                planId: plan.id,
                placeId: place.id,
            }
        );
        dispatch(
            setSearchLocation({
                searchLocation: place.location,
                searchPlaceId: place.googlePlaceId,
            })
        );
        // ダイアログの背景固定を解除するためにモーダルを閉じる
        dispatch(setPlaceIdToCreatePlan(null));
        await router.push(
            Routes.plans.interest({
                location: place.location,
                googlePlaceId: place.googlePlaceId,
            })
        );
    };

    useEffect(() => {
        logEvent(getAnalytics(), AnalyticsEvents.Plan.View, {
            planId: id,
        });

        return () => {
            // 他のページに遷移するときにモーダルを閉じる
            // (戻るボタンでトップページに遷移したときの対応)
            dispatch(setShowPlanCreatedModal(false));
            dispatch(setPlaceIdToCreatePlan(null));
        };
    }, []);

    useEffect(() => {
        if (typeof id !== "string") return;
        dispatch(
            fetchPlan({
                planId: id,
                userId: userId,
                firebaseIdToken: firebaseIdToken,
            })
        );
        dispatch(fetchPlacesNearbyPlanLocation({ planId: id, limit: 10 }));
    }, [id, userId, firebaseIdToken]);

    // Footerの表示制御
    useEffect(() => {
        // 自らが作者の場合はフッターを表示しない
        if (hasValue(user) && user.id === plan?.author?.id) {
            setIsPlanFooterVisible(false);
            return;
        }

        // Footerの高さ分スクロールしたら表示する
        const scrollHandler = () => {
            setIsPlanFooterVisible(scrollY >= Size.PlanFooter.h);
        };
        window.addEventListener("scroll", scrollHandler);
        return () => {
            window.removeEventListener("scroll", scrollHandler);
        };
    }, [user, plan?.author?.id]);

    if (
        !fetchPlanRequestStatus ||
        (fetchPlanRequestStatus === RequestStatuses.PENDING &&
            // プランを取得したあとで、同じプランを再取得したときに画面がロード中になるのを防ぐ
            plan?.id !== id)
    )
        return <LoadingModal title={t("plan:loadingPlan")} />;

    if (fetchPlanRequestStatus === RequestStatuses.REJECTED)
        return <ErrorPage />;

    if (!plan) return <NotFound />;

    return (
        <Center
            flexDirection="column"
            pb={32 + (isPlanFooterVisible ? Size.PlanFooter.h : 0) + "px"}
        >
            <Head>
                <title>{plan.title} | komichi</title>
            </Head>
            <NavBar />
            <VStack
                w="100%"
                minH={!isPC && `calc(100vh - ${Size.NavBar.height + "px"})`}
            >
                <PlanDetailPageHeader
                    plan={plan}
                    likedPlaceIds={likePlaceIds}
                    onUpdateLikePlace={(placeId, like) =>
                        updateLikePlace({
                            planId: plan.id,
                            placeId,
                            like,
                        })
                    }
                    onCopyPlanUrl={handleOnCopyPlanUrl}
                />
            </VStack>
            <VStack
                maxWidth="990px"
                w="100%"
                px="0"
                py="16px"
                boxSizing="border-box"
                spacing="16px"
                pb="32px"
            >
                {!user && (
                    <Box w="100%" px={Size.PlanDetail.px + "px"}>
                        <LoginCallMessage onLogin={signInWithGoogle} />
                    </Box>
                )}
                <PlanPageSection
                    sectionHeader={
                        <SectionTitle
                            title={t("plan:planInfo")}
                            px={Size.PlanDetail.px + "px"}
                        />
                    }
                >
                    <VStack>
                        <PlanInfoSection
                            durationInMinutes={plan.timeInMinutes}
                            priceRange={getPlanPriceRange(plan.places)}
                        />
                        <AdInPlanDetail />
                    </VStack>
                </PlanPageSection>
                <PlanPageSection
                    sectionHeader={
                        <SectionTitle
                            title={t("plan:plan")}
                            px={Size.PlanDetail.px + "px"}
                        />
                    }
                >
                    <PlanPlaceList
                        plan={plan}
                        likePlaceIds={likePlaceIds}
                        uploadPlaceImage={uploadImageProps}
                        onUpdateLikeAtPlace={({ like, placeId }) =>
                            updateLikePlace({ planId: plan.id, placeId, like })
                        }
                    />
                </PlanPageSection>
                <PlanPageSection
                    sectionHeader={
                        <SectionTitle
                            title={t("plan:placesInPlan")}
                            description={t("plan:clickMarkerToShowPlaceDetail")}
                            px={Size.PlanDetail.px + "px"}
                        />
                    }
                >
                    <PlaceMap places={plan.places} />
                </PlanPageSection>
                <VStack w="100%" px="16px">
                    <SavePlanAsImageButton plan={plan} />
                    <SearchRouteByGoogleMapButton
                        plan={plan}
                        currentLocation={null}
                    />
                </VStack>
                <VStack
                    w="100%"
                    spacing={Padding.p32 + "px"}
                    pt={Padding.p16 + "px"}
                >
                    {nearbyPlans?.length > 0 && (
                        <PlanPageSection
                            contentPaddingX={0}
                            sectionHeader={
                                <PlanListSectionTitle
                                    title={t("plan:nearbyPlans")}
                                    icon={MdOutlineNearMe}
                                    px={Size.PlanDetail.px + "px"}
                                />
                            }
                        >
                            <PlanList
                                plans={nearbyPlans}
                                isLoading={
                                    fetchPlanRequestStatus ===
                                    RequestStatuses.PENDING
                                }
                                numPlaceHolders={6}
                                grid={false}
                                wrapTitle={false}
                                showAuthor={false}
                                px={Size.PlanDetail.px + "px"}
                                ads={false}
                            />
                        </PlanPageSection>
                    )}
                    <PlanPageSection
                        contentPaddingX={0}
                        sectionHeader={
                            <PlanListSectionTitle
                                title={t("plan:createNewPlanTitle")}
                                icon={MdOutlineExplore}
                                px={Size.PlanDetail.px + "px"}
                            />
                        }
                    >
                        <NearbyPlaceList
                            places={placesNearbyPlanLocation}
                            px={Size.PlanDetail.px + "px"}
                            onSelectPlace={(place) =>
                                dispatch(setPlaceIdToCreatePlan(place.id))
                            }
                        />
                    </PlanPageSection>
                </VStack>
            </VStack>
            {/*Dialogs*/}
            <PlanCreatedDialog
                visible={showPlanCreatedModal}
                onClickClose={() => dispatch(setShowPlanCreatedModal(false))}
                onClickCopyUrl={() => {
                    dispatch(setShowPlanCreatedModal(false));
                    handleOnCopyPlanUrl();
                }}
            />
            <CreatePlanDialog
                place={placesNearbyPlanLocation?.find(
                    (place) => place.id === placeIdToCreatePlan
                )}
                onClickClose={() => dispatch(setPlaceIdToCreatePlan(null))}
                onClickCreatePlan={(place) => handleOnCreatePlan({ place })}
            />
            <DialogUploadImage
                visible={uploadImageProps.isUploadPlacePhotoDialogVisible}
                isUploading={uploadImageProps.isUploading}
                imageURLs={uploadImageProps.localPlaceImageUrls}
                onUploadClick={() => uploadImageProps.onUpload()}
                onClose={uploadImageProps.onCloseDialog}
            />
            {isCreatingPlanFromSavedPlan && (
                <LoadingModal title={t("plan:customizePlanCreating")} />
            )}
            <>
                <PlanFooter visible={isPlanFooterVisible}>
                    <Button
                        variant="outline"
                        flex={1}
                        color={Colors.primary[400]}
                        borderColor={Colors.primary[400]}
                        borderRadius={20}
                        onClick={() => {
                            createPlanFromSavedPlan({
                                userId,
                                firebaseIdToken,
                                planId: plan.id,
                            });
                        }}
                    >
                        {t("plan:customizePlan")}
                    </Button>
                </PlanFooter>
            </>
        </Center>
    );
}
