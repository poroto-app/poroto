import {Place} from "src/domain/models/Place"
import {Center, Text, VStack} from "@chakra-ui/react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

type Props = {
    places: Place[]
}

export const PlaceMap = ({places}: Props) => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.GCP_API_KEY,
    })

    return <VStack w="100%" h="300px" alignItems="flex-start">
        <Map isLoaded={isLoaded} places={places}/>
    </VStack>
}

const Map = ({isLoaded, places}: { isLoaded: boolean, places: Place[] }) => {
    if (!isLoaded) return <MapPlaceHolder
        text="地図を読み込んでいます"
    />

    if (places.length === 0) return <MapPlaceHolder
        text="プランに場所が含まれていないため表示できません。"
    />

    // @ts-ignore
    return <GoogleMap
        zoom={15/*https://developers.google.com/maps/documentation/javascript/overview?hl=ja#zoom-levels*/ }
        center={{lat: places[0].location.latitude, lng: places[0].location.longitude}}
        mapContainerStyle={{width: "100%", height: "100%"}}
    >
        {
            // @ts-ignore
            places.map((place, i) => <Marker
                key={i}
                position={{
                    lat: place.location.latitude,
                    lng: place.location.longitude
                }}
            />)
        }
    </GoogleMap>
}

const MapPlaceHolder = ({text}: { text: string }) => {
    return <Center w="100%" h="100%">
        <Text>{text}</Text>
    </Center>
}