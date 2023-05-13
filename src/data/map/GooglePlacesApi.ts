import axios from "axios";

export class GooglePlacesApi {
    // SEE: https://developers.google.com/maps/documentation/places/web-service/autocomplete
    async placeAutoComplete({
                                input,
                                language,
                                radius
                            }: PlaceAutoCompleteRequest): Promise<google.maps.places.AutocompleteResponse> {
        const response = await axios.get("https://maps.googleapis.com/maps/api/place/autocomplete/json", {
            params: {
                input,
                language,
                radius,
                key: process.env.GCP_API_KEY,
            }
        })

        return response.data;
    }
}

type PlaceAutoCompleteRequest = {
    input: string;
    radius: string;
    language: "ja";
}