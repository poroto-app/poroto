import {Place} from "src/domain/models/Place"
import {Box} from "@chakra-ui/react";
import {GoogleMap, Marker, useLoadScript} from "@react-google-maps/api";

type Props = {
    places: Place[]
}

// TODO: 場所の名前を表示する
export const PlaceMap = ({places}: Props) => {
    const {isLoaded} = useLoadScript({
        googleMapsApiKey: process.env.GCP_API_KEY,
    })

    return <Box w="500px" h="500px">
        {
            isLoaded && <Map places={places}/>
        }
    </Box>
}

const Map = ({places}: { places: Place[] }) => {
    // @ts-ignore
    return <GoogleMap
        zoom={15}
        center={{lat: places[0].location.latitude, lng: places[0].location.longitude}}
        mapContainerStyle={{ width: "100%", height: "100%"}}
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