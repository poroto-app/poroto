import { IconProps } from "@tamagui/helpers-icon";
import {
    ArrowLeft,
    Car,
    Footprints,
    MapPin,
    MousePointerClick,
    Ruler,
} from "@tamagui/lucide-icons";
import { useToastController } from "@tamagui/toast";
import { NamedExoticComponent, useEffect, useState } from "react";
import { locationSinjukuStation } from "src/constant/location";
import { Padding } from "src/constant/padding";
import { isPC } from "src/constant/userAgent";
import { GeoLocation } from "src/data/graphql/generated";
import { RequestStatuses } from "src/domain/models/RequestStatus";
import { useAppTranslation } from "src/hooks/useAppTranslation";
import { useLocation } from "src/hooks/useLocation";
import { OnClickHandler } from "src/types/handler";
import { CreatePlanLocationMap } from "src/view/category/CreatePlanLocationMap";
import { AppTrans } from "src/view/common/AppTrans";
import {
    DialogPositions,
    FullscreenDialog,
} from "src/view/common/FullscreenDialog";
import { RoundedButton } from "src/view/common/RoundedButton";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { PlaceSearch, PlaceSearchProps } from "src/view/place/PlaceSearch";
import {
    AnimatePresence,
    Slider,
    Spinner,
    Text,
    XStack,
    YStack,
} from "tamagui";

type Props = {
    visible: boolean;
    minRangeInKm?: number;
    defaultMapCenter?: GeoLocation;
    onClose: () => void;
    onConfirm: (props: { rangeInKm: number; location: GeoLocation }) => void;
} & PlaceSearchProps;

export function CreatePlanRangeDialog({
    visible,
    defaultMapCenter,
    minRangeInKm = 2,
    onClose,
    onConfirm,

    googlePlaceSearchResults,
    onSearchGooglePlacesByQuery,
    onClickGooglePlaceSearchResult,
}: Props) {
    const { t } = useAppTranslation();
    const toast = useToastController();
    const [rangeInKm, setRangeInKm] = useState(minRangeInKm);
    const [location, setLocation] = useState<GeoLocation>(null);
    const [mapCenter, setMapCenter] = useState<GeoLocation>(
        locationSinjukuStation
    );

    const handleSetLocation = ({
        location,
        moveCenter = true,
    }: {
        location: GeoLocation;
        moveCenter?: boolean;
    }) => {
        setLocation(location);
        if (moveCenter) setMapCenter(location);
    };

    const handleOnConfirm = () => {
        if (!location) {
            toast.show(t("plan:createPlanByCategoryLocationNotSelectedError"), {
                burntOptions: { preset: "error" },
                duration: 3000,
            });
            return;
        }
        onConfirm({ rangeInKm, location });
    };

    useEffect(() => {
        if (defaultMapCenter) handleSetLocation({ location: defaultMapCenter });
    }, [defaultMapCenter?.latitude, defaultMapCenter?.longitude]);

    return (
        <FullscreenDialog
            visible={visible}
            height={isPC ? 800 : "100%"}
            width={!isPC && "100%"}
            maxHeight="100%"
            maxWidth="100%"
            paddingX={Padding.p8}
            paddingY={Padding.p32}
            position={DialogPositions.CENTER}
            onClickOutside={onClose}
        >
            <RoundedDialog h="100%" w={isPC ? 900 : "100%"} maxW="100%">
                <YStack
                    w="100%"
                    h="100%"
                    px={Padding.p16}
                    py={Padding.p24}
                    flex={1}
                >
                    <DialogTitle onBack={onClose} />
                    <YStack
                        flex={1}
                        w="100%"
                        borderRadius={20}
                        overflow="hidden"
                        position="relative"
                    >
                        <CreatePlanLocationMap
                            location={location}
                            mapCenter={mapCenter}
                            rangeInKm={rangeInKm}
                            onClickLocation={(location) => {
                                handleSetLocation({
                                    location,
                                    moveCenter: false,
                                });
                            }}
                        ></CreatePlanLocationMap>
                        <XStack
                            w="100%"
                            position="absolute"
                            pt={Padding.p24}
                            px={Padding.p8}
                        >
                            <PlaceSearch
                                placeSearchBarAutoFocus={false}
                                onSearchGooglePlacesByQuery={
                                    onSearchGooglePlacesByQuery
                                }
                                onClickGooglePlaceSearchResult={
                                    onClickGooglePlaceSearchResult
                                }
                                googlePlaceSearchResults={
                                    googlePlaceSearchResults
                                }
                                placeSearchActions={
                                    <SetByCurrentLocationButton
                                        onGetCurrentLocation={(location) =>
                                            handleSetLocation({ location })
                                        }
                                    />
                                }
                            />
                        </XStack>
                        <DirectionIndicator rangeInKm={rangeInKm} />
                        <TapMapOverlay />
                    </YStack>
                    <YStack
                        w="100%"
                        alignItems="center"
                        justifyContent="center"
                        py={Padding.p24}
                        px={Padding.p24}
                    >
                        <RangeInput
                            rangeInKm={rangeInKm}
                            onValueChange={(value) =>
                                setRangeInKm(Math.max(minRangeInKm, value))
                            }
                        />
                    </YStack>
                    <RoundedButton
                        w="100%"
                        onClick={handleOnConfirm}
                        disabled={!location}
                        label={
                            location
                                ? t("plan:createPlanByCategory")
                                : t(
                                      "plan:createPlanByCategorySelectLocationTitle"
                                  )
                        }
                    />
                </YStack>
            </RoundedDialog>
        </FullscreenDialog>
    );
}

const DialogTitle = ({ onBack }: { onBack: OnClickHandler }) => {
    const { t } = useAppTranslation();
    return (
        <XStack w="100%" pb={Padding.p8} gap={Padding.p8} alignItems="center">
            <XStack
                tag="button"
                onPress={onBack}
                alignItems="center"
                justifyContent="center"
            >
                <ArrowLeft size={24} color="rgba(0,0,0,.5)" />
            </XStack>
            <Text flex={1} fontWeight="semibold" fontSize={18}>
                {t("plan:createPlanByCategorySelectRangeTitle")}
            </Text>
        </XStack>
    );
};

function TapMapOverlay() {
    const { t } = useAppTranslation();
    const [isFirstTap, setIsFirstTap] = useState(true);

    return (
        <AnimatePresence>
            {isFirstTap && (
                <XStack
                    key="tapMapOverlay"
                    animation="quick"
                    enterStyle={{
                        opacity: 0,
                    }}
                    exitStyle={{
                        opacity: 0,
                    }}
                    alignItems="center"
                    justifyContent="center"
                    backgroundColor="rgba(0,0,0,.4)"
                    onPress={() => setIsFirstTap(false)}
                    position="absolute"
                    top={0}
                    right={0}
                    bottom={0}
                    left={0}
                >
                    <YStack gap={Padding.p16} alignItems="center">
                        <MousePointerClick size={48} color="white" />
                        <Text fontWeight="bold" fontSize={20} color="white">
                            {t("plan:createPlanByCategorySelectLocationTitle")}
                        </Text>
                    </YStack>
                </XStack>
            )}
        </AnimatePresence>
    );
}

function SetByCurrentLocationButton({
    onGetCurrentLocation,
}: {
    onGetCurrentLocation: (location: GeoLocation) => void;
}) {
    const { t } = useAppTranslation();
    const toast = useToastController();
    const [isFetching, setIsFetching] = useState(false);
    const { getCurrentLocation, fetchCurrentLocationStatus } = useLocation();

    const handleOnClick = async () => {
        const currentLocation = await getCurrentLocation();
        if (currentLocation) onGetCurrentLocation(currentLocation);
    };

    useEffect(() => {
        setIsFetching(fetchCurrentLocationStatus === RequestStatuses.PENDING);
        if (fetchCurrentLocationStatus === RequestStatuses.REJECTED) {
            toast.show(t("location:fetchCurrentLocationFailed"), {
                burntOptions: { preset: "error" },
                duration: 3000,
            });
        }
    }, [fetchCurrentLocationStatus]);

    // TODO: i18n
    return (
        <XStack
            tag="button"
            alignItems="center"
            backgroundColor="white"
            borderRadius={50}
            shadowRadius={4}
            shadowOffset={{ width: 2, height: 2 }}
            shadowColor="#A2A2A2"
            px={Padding.p8}
            py={Padding.p4}
            gap={Padding.p4}
            onPress={handleOnClick}
        >
            {isFetching ? (
                <Spinner size="small" />
            ) : (
                <MapPin size={14} color="#2D59C9" />
            )}
            <Text fontSize={14} color="#2D59C9">
                {t("place:setMapCenterOnCurrentLocation")}
            </Text>
        </XStack>
    );
}

function DirectionIndicator({ rangeInKm }: { rangeInKm: number }) {
    const calcDirectionWalkTime = (distanceInKm: number) => {
        const walkSpeed = 4;
        const walkTime = distanceInKm / walkSpeed;
        return Math.ceil(walkTime * 60);
    };

    const calcDirectionCarTime = (distanceInKm: number) => {
        const carSpeed = 60;
        const carTime = distanceInKm / carSpeed;
        return Math.ceil(carTime * 60);
    };

    return (
        <YStack
            w={170}
            alignItems="center"
            justifyContent="center"
            px={Padding.p8}
            py={Padding.p8}
            gap={Padding.p8}
            borderRadius={10}
            position="absolute"
            bottom={Padding.p24}
            right={Padding.p8}
            userSelect="none"
            backgroundColor="rgba(0,0,0,.6)"
        >
            <Text fontWeight="bold" color="white">
                {rangeInKm} km
            </Text>
            {rangeInKm < 10 && (
                <DirectionTime
                    icon={Footprints}
                    time={calcDirectionWalkTime(rangeInKm)}
                />
            )}
            <DirectionTime icon={Car} time={calcDirectionCarTime(rangeInKm)} />
        </YStack>
    );
}

const DirectionTime = ({
    icon: Icon,
    time,
}: {
    icon: NamedExoticComponent<IconProps>;
    time: number;
}) => {
    return (
        <XStack
            w="100%"
            alignItems="center"
            justifyContent="space-between"
            backgroundColor="#099C5E"
            borderRadius={5}
            px={Padding.p4}
            gap={Padding.p4}
        >
            <Icon size={20} color="white" />
            <Text color="white">
                <AppTrans
                    i18nKey={"common:minuteApproximatelyLabel"}
                    values={{ minutes: time }}
                />
            </Text>
        </XStack>
    );
};

function RangeInput({
    rangeInKm,
    onValueChange,
}: {
    rangeInKm: number;
    onValueChange: (value: number) => void;
}) {
    return (
        <Slider
            theme="green"
            h={4}
            w="100%"
            min={0}
            max={80}
            defaultValue={[rangeInKm]}
            value={[rangeInKm]}
            onValueChange={(values) => onValueChange(values[0])}
        >
            <Slider.Track backgroundColor="#E2E8F0">
                <Slider.TrackActive backgroundColor="#38A169" />
            </Slider.Track>
            <Slider.Thumb
                size={32}
                circular
                index={0}
                justifyContent="center"
                alignItems="center"
                padding={Padding.p4}
                backgroundColor="white"
            >
                <Ruler size={20} color="#38A169" />
            </Slider.Thumb>
        </Slider>
    );
}
