import axios from "axios";
import {Loader} from "@googlemaps/js-api-loader";

//　MEMO: axiosで直接リクエストするとCORSエラーが発生する
export class GooglePlacesApi {
    private readonly mapElement: HTMLDivElement;
    private mapApi: google.maps.Map | null;

    constructor() {
        const createdElement = document.getElementById("GooglePlacesAPI");
        if (createdElement) {
            this.mapElement = createdElement as HTMLDivElement;
        } else {
            this.mapElement = document.createElement("div");
            this.mapElement.id = "GooglePlacesAPI";
        }
    }

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

    // SEE: https://developers.google.com/maps/documentation/javascript/examples/place-details
    async placeDetail({placeId, language}: PlaceDetailRequest) {
        const mapApi = await this.loadMapApi(this.mapElement);
        const service = new google.maps.places.PlacesService(mapApi);
        return new Promise<PlaceDetailResponse>((resolve, reject) => {
            service.getDetails(
                {
                    placeId,
                    language,
                    fields: ["geometry"],
                },
                (place, status) => {
                    if (status !== google.maps.places.PlacesServiceStatus.OK) {
                        return reject({
                            message: "error while requesting place details",
                            status,
                        });
                    }
                    resolve({
                        location: {
                            lat: place.geometry.location.lat(),
                            lng: place.geometry.location.lng(),
                        }
                    })
                })
        });
    }

    // SEE: https://developers.google.com/maps/documentation/javascript/overview?hl=ja#js_api_loader_package
    private async loadMapApi(divElement: HTMLDivElement) {
        if (this.mapApi) return this.mapApi;

        const loader = new Loader({
            apiKey: process.env.GCP_API_KEY,
            version: "weekly",
            libraries: ["places"],
        })
        await loader.load();

        const mapApi = new google.maps.Map(this.mapElement, divElement);
        this.mapApi = mapApi;
        return mapApi;
    }
}


type PlaceAutoCompleteRequest = {
    input: string;
    radius: string;
    language: "ja";
}

type PlaceDetailRequest = {
    placeId: string;
    language: "ja";
}

type PlaceDetailResponse = {
    location: {
        lat: number;
        lng: number;
    }
}