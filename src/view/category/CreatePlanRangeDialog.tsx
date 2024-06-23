import {
    Box,
    Center,
    HStack,
    Icon,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    Text,
    VStack,
} from "@chakra-ui/react";
import { Circle, Marker } from "@react-google-maps/api";
import { useState } from "react";
import { MdArrowBack, MdDirectionsCar, MdDirectionsWalk } from "react-icons/md";
import { RiPinDistanceFill } from "react-icons/ri";
import { GeoLocation } from "src/data/graphql/generated";
import {
    DialogPositions,
    FullscreenDialog,
} from "src/view/common/FullscreenDialog";
import { MapViewer } from "src/view/common/MapViewer";
import { RoundedButton } from "src/view/common/RoundedButton";
import { RoundedDialog } from "src/view/common/RoundedDialog";
import { locationSinjukuStation } from "src/view/constants/location";
import { Padding } from "src/view/constants/padding";

type Props = {
    visible: boolean;
    minRangeInKm: number;
    onClose: () => void;
    onConfirm: (props: { range: number; location: GeoLocation }) => void;
};

export function CreatePlanRangeDialog({
    visible,
    minRangeInKm = 2,
    onClose,
    onConfirm,
}: Props) {
    const [rangeInKm, setRangeInKm] = useState(minRangeInKm);
    const [mapCenter, setMapCenter] = useState<GeoLocation>(
        locationSinjukuStation
    );
    const [location, setLocation] = useState(mapCenter);

    const handleOnConfirm = () => {
        onConfirm({ range: rangeInKm, location });
    };

    return (
        <FullscreenDialog
            visible={visible}
            height="calc(100% - 16px)"
            onClickOutside={onClose}
            position={DialogPositions.BOTTOM}
        >
            <RoundedDialog h="100%">
                <VStack
                    w="100%"
                    h="100%"
                    px={Padding.p16}
                    py={Padding.p24}
                    flex={1}
                >
                    <HStack w="100%" pb={Padding.p8}>
                        <Center as="button" onClick={onClose}>
                            <Icon
                                w="24px"
                                h="24px"
                                color="rgba(0,0,0,.5)"
                                as={MdArrowBack}
                            />
                        </Center>
                        <Text flex={1} fontWeight="semibold" fontSize={18}>
                            どこまで行く？
                        </Text>
                    </HStack>
                    <Box
                        flex={1}
                        w="100%"
                        borderRadius="20px"
                        overflow="hidden"
                        position="relative"
                    >
                        <MapViewer
                            zoom={14}
                            center={{
                                lat: mapCenter.latitude,
                                lng: mapCenter.longitude,
                            }}
                            onClick={(e) => {
                                setLocation({
                                    latitude: e.latLng.lat(),
                                    longitude: e.latLng.lng(),
                                });
                            }}
                            options={() => ({
                                fullscreenControl: false,
                                mapTypeControl: false,
                                streetViewControlOptions: {
                                    position:
                                        google.maps.ControlPosition
                                            .RIGHT_CENTER,
                                },
                                zoomControlOptions: {
                                    position:
                                        google.maps.ControlPosition
                                            .RIGHT_CENTER,
                                },
                            })}
                        >
                            <Marker
                                position={{
                                    lat: location.latitude,
                                    lng: location.longitude,
                                }}
                            />
                            <Circle
                                center={{
                                    lat: location.latitude,
                                    lng: location.longitude,
                                }}
                                radius={rangeInKm * 1000}
                                options={{
                                    fillColor: "#099C5E",
                                    strokeColor: "#099C5E",
                                }}
                                onClick={(e) => {
                                    setLocation({
                                        latitude: e.latLng.lat(),
                                        longitude: e.latLng.lng(),
                                    });
                                }}
                            />
                            <VStack
                                w="150px"
                                justifyContent="center"
                                px={Padding.p8}
                                py={Padding.p8}
                                borderRadius="10px"
                                position="absolute"
                                bottom={Padding.p24}
                                right={Padding.p8}
                                userSelect="none"
                                backgroundColor="rgba(0,0,0,.6)"
                            >
                                <Box color="white">
                                    <Text fontWeight="bold">
                                        {rangeInKm} km
                                    </Text>
                                </Box>
                                <DirectionTime
                                    icon={MdDirectionsWalk}
                                    time="10分"
                                />
                                <DirectionTime
                                    icon={MdDirectionsCar}
                                    time="1分"
                                />
                            </VStack>
                        </MapViewer>
                    </Box>

                    <Center w="100%" py={Padding.p16} px={Padding.p24}>
                        <Slider
                            aria-label="slider-ex-1"
                            w="100%"
                            min={0}
                            max={50}
                            defaultValue={rangeInKm}
                            value={rangeInKm}
                            colorScheme="green"
                            onChange={(value) =>
                                setRangeInKm(Math.max(minRangeInKm, value))
                            }
                        >
                            <SliderTrack>
                                <SliderFilledTrack />
                            </SliderTrack>
                            <SliderThumb boxSize={6}>
                                <Icon
                                    as={RiPinDistanceFill}
                                    color="green.400"
                                />
                            </SliderThumb>
                        </Slider>
                    </Center>
                    <RoundedButton w="100%">
                        選択した範囲でプランを作成
                    </RoundedButton>
                </VStack>
            </RoundedDialog>
        </FullscreenDialog>
    );
}

const DirectionTime = ({ icon, time }) => {
    return (
        <HStack
            w="100%"
            color="white"
            backgroundColor="#099C5E"
            borderRadius="5px"
            px={Padding.p4}
            spacing={Padding.p4}
        >
            <Icon as={icon} width="20px" height="20px" />
            <Text>およそ {time}</Text>
        </HStack>
    );
};
