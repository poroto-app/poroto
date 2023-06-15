import { Center, Text, VStack } from "@chakra-ui/react";
import { Marker } from "@react-google-maps/api";
import { Place } from "src/domain/models/Place";
import { MapViewer } from "src/view/common/MapViewer";

type Props = {
    places: Place[];
};

export const PlaceMap = ({ places }: Props) => {
    return (
        <VStack w="100%" h="300px" alignItems="flex-start">
            <Text fontWeight="bold" fontSize="1.25rem">
                プラン内の場所
            </Text>
            <Map places={places} />
        </VStack>
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
                <Marker
                    key={i}
                    position={{
                        lat: place.location.latitude,
                        lng: place.location.longitude,
                    }}
                />
            ))}
        </MapViewer>
    );
};

const MapPlaceHolder = ({ text }: { text: string }) => {
    return (
        <Center w="100%" h="100%">
            <Text>{text}</Text>
        </Center>
    );
};
