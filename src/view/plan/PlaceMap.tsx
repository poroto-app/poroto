import { Box, Center, HStack, Text, VStack } from "@chakra-ui/react";
import { InfoWindow, Marker } from "@react-google-maps/api";
import { useRef, useState } from "react";
import { ImageSizes, getImageSizeOf } from "src/domain/models/Image";
import { Place } from "src/domain/models/Place";
import { ImageWithSkeleton } from "src/view/common/ImageWithSkeleton";
import { MapViewer } from "src/view/common/MapViewer";

type Props = {
    places: Place[];
};

export const PlaceMap = ({ places }: Props) => {
    return (
        <Box w="100%" h="300px">
            <Map places={places} />
        </Box>
    );
};

const Map = ({ places }: { places: Place[] }) => {
    if (places.length === 0)
        return (
            <MapPlaceHolder text="プランに場所が含まれていないため表示できません。" />
        );

    return (
        <MapViewer
            zoom={
                15 /*https://developers.google.com/maps/documentation/javascript/overview?hl=ja#zoom-levels*/
            }
            center={{
                lat: places[0].location.latitude,
                lng: places[0].location.longitude,
            }}
            loadingPlaceHolder={
                <MapPlaceHolder text="地図を読み込んでいます" />
            }
        >
            {places.map((place, i) => (
                <PlaceMarkerWithInfoWindow
                    key={i}
                    place={place}
                    defaultVisible={i === 0}
                />
            ))}
        </MapViewer>
    );
};

const PlaceMarkerWithInfoWindow = ({
    place,
    defaultVisible = false,
}: {
    place: Place;
    defaultVisible?: boolean;
}) => {
    const [isInfoWindowVisible, setIsInfoWindowVisible] =
        useState(defaultVisible);
    const markerRef = useRef<Marker>(null);
    const infoWindowRef = useRef<InfoWindow>(null);

    return (
        <>
            <Marker
                ref={markerRef}
                position={{
                    lat: place.location.latitude,
                    lng: place.location.longitude,
                }}
                onClick={() => {
                    setIsInfoWindowVisible(true);
                    if (infoWindowRef.current) {
                        infoWindowRef.current.open(
                            infoWindowRef.current.state.infoWindow,
                            markerRef.current.marker
                        );
                    }
                }}
            />
            {markerRef.current && isInfoWindowVisible && (
                <InfoWindow
                    anchor={markerRef.current?.marker}
                    ref={infoWindowRef}
                >
                    <HStack>
                        {place.images.length > 0 && (
                            <Box
                                w="64px"
                                h="64px"
                                borderRadius="100%"
                                overflow="hidden"
                            >
                                <ImageWithSkeleton
                                    src={getImageSizeOf(
                                        ImageSizes.Small,
                                        place.images[0]
                                    )}
                                />
                            </Box>
                        )}
                        <VStack alignItems="flex-start" spacing={0}>
                            <Text fontSize="14px" fontWeight="semibold">
                                {place.name}
                            </Text>
                            <Text
                                fontSize="14px"
                                color="blue.600"
                                as="button"
                                onClick={() => setIsInfoWindowVisible(false)}
                            >
                                閉じる
                            </Text>
                        </VStack>
                    </HStack>
                </InfoWindow>
            )}
        </>
    );
};

const MapPlaceHolder = ({ text }: { text: string }) => {
    return (
        <Center w="100%" h="100%">
            <Text>{text}</Text>
        </Center>
    );
};
