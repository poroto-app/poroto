import { Center, useToast, VStack } from "@chakra-ui/react";
import { getAnalytics, logEvent } from "@firebase/analytics";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { Place } from "src/domain/models/Place";
import { getPlanPriceRange } from "src/domain/models/Plan";
import { RequestStatuses } from "src/domain/models/RequestStatus";
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
import { NavBar } from "src/view/common/NavBar";
import { NotFound } from "src/view/common/NotFound";
import { AnalyticsEvents } from "src/view/constants/analytics";
import { Routes } from "src/view/constants/router";
import { Size } from "src/view/constants/size";
import { isPC } from "src/view/constants/userAgent";
import { useUserPlan } from "src/view/hooks/useUserPlan";
import { SavePlanAsImageButton } from "src/view/plan/button/SavePlanAsImageButton";
import { SearchRouteByGoogleMapButton } from "src/view/plan/button/SearchRouteByGoogleMapButton";
import { PlaceMap } from "src/view/plan/PlaceMap";
import { PlanCreatedDialog } from "src/view/plan/PlanCreatedDialog";
import { PlanPageSection } from "src/view/plan/section/PlanPageSection";
import { CreatePlanDialog } from "src/view/plandetail/CreatePlanDialog";
import { PlanDetailPageHeader } from "src/view/plandetail/header/PlanDetailPageHeader";
import { NearbyPlaceList } from "src/view/plandetail/NearbyPlaceList";
import { PlanInfoSection } from "src/view/plandetail/PlanInfoSection";
import { PlanPlaceList } from "src/view/plandetail/PlanPlaceList";

export default function PlanPage() {
    const { id } = useRouter().query;
    const dispatch = useAppDispatch();
    const router = useRouter();
    const { userId, firebaseIdToken, likePlaceIds, updateLikePlace } =
        useUserPlan();
    const {
        preview: plan,
        placesNearbyPlanLocation,
        fetchPlanRequestStatus,
        showPlanCreatedModal,
        placeIdToCreatePlan,
    } = reduxPlanSelector();
    const toast = useToast();

    const handleOnCopyPlanUrl = () => {
        logEvent(getAnalytics(), AnalyticsEvents.Plan.CopyPlanUrl, {
            planId: id,
        });
        const url: string = location.href;
        navigator.clipboard.writeText(url);

        toast({
            title: "しおりのURLをコピーしました",
            description: "作ったしおりを共有してみましょう！",
            status: "success",
            duration: 3000, // ポップアップが表示される時間（ミリ秒）
            isClosable: true,
        });
    };

    // TODO: hooksで管理する
    const handleOnCreatePlan = async ({ place }: { place: Place }) => {
        dispatch(
            setSearchLocation({
                searchLocation: place.location,
                searchPlaceId: place.googlePlaceId,
            })
        );
        // ダイアログの背景固定を解除するためにモーダルを閉じる
        dispatch(setPlaceIdToCreatePlan(null));
        await router.push(Routes.plans.interest(true));
    };

    useEffect(() => {
        logEvent(getAnalytics(), AnalyticsEvents.Plan.View, {
            planId: id,
        });
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

        return () => {
            // 他のページに遷移するときにモーダルを閉じる
            // (戻るボタンでトップページに遷移したときの対応)
            dispatch(setShowPlanCreatedModal(false));
            dispatch(setPlaceIdToCreatePlan(null));
        };
    }, [id, userId, firebaseIdToken]);

    if (
        !fetchPlanRequestStatus ||
        (fetchPlanRequestStatus === RequestStatuses.PENDING &&
            // プランを取得したあとで、同じプランを再取得したときに画面がロード中になるのを防ぐ
            plan?.id !== id)
    )
        return <LoadingModal title="プランを読み込んでいます" />;

    if (fetchPlanRequestStatus === RequestStatuses.REJECTED)
        return <ErrorPage />;

    if (!plan) return <NotFound />;

    return (
        <Center flexDirection="column" pb="32px">
            <Head>
                <title>{plan.title} | poroto</title>
            </Head>
            <NavBar />
            <VStack
                w="100%"
                minH={!isPC && `calc(100vh - ${Size.NavBar.height})`}
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
                <PlanPageSection title="プランの情報">
                    <VStack>
                        <PlanInfoSection
                            durationInMinutes={plan.timeInMinutes}
                            priceRange={getPlanPriceRange(plan.places)}
                        />
                        <AdInPlanDetail />
                    </VStack>
                </PlanPageSection>
                <PlanPageSection title="プラン">
                    <PlanPlaceList
                        plan={plan}
                        likePlaceIds={likePlaceIds}
                        onUpdateLikeAtPlace={({ like, placeId }) =>
                            updateLikePlace({ planId: plan.id, placeId, like })
                        }
                    />
                </PlanPageSection>
                <PlanPageSection
                    title="プラン内の場所"
                    description="マーカーをクリックすると場所の詳細が表示されます"
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
                <PlanPageSection
                    title={`このプランの近くの場所から、新しいプランを作って見ませんか？`}
                >
                    <NearbyPlaceList
                        places={placesNearbyPlanLocation}
                        onSelectPlace={(place) =>
                            dispatch(setPlaceIdToCreatePlan(place.id))
                        }
                    />
                </PlanPageSection>
            </VStack>
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
        </Center>
    );
}
