import {Loader} from "@googlemaps/js-api-loader";
import {GeoLocation} from "src/domain/models/GeoLocation";
import {locationSinjukuStation} from "src/view/constants/location";

// MEMO: axiosで直接リクエストするとCORSエラーが発生する
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

    // SEE: https://developers.google.com/maps/documentation/javascript/places-autocomplete
    async placeAutoComplete({
                                input,
                                language,
                                radius,
                                location,
                            }: PlaceAutoCompleteRequest): Promise<google.maps.places.AutocompleteResponse> {
        await this.loadMapApi();
        const service = new google.maps.places.AutocompleteService();
        return await service.getPlacePredictions({
            input,
            language,
            radius,
            location: new google.maps.LatLng(
                location?.latitude || locationSinjukuStation.latitude,
                location?.longitude || locationSinjukuStation.longitude
            ),
        })
    }

    // SEE: https://developers.google.com/maps/documentation/javascript/examples/place-details
    async placeDetail({placeId, language}: PlaceDetailRequest) {
        const mapApi = await this.loadMapApi();
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
                            latitude: place.geometry.location.lat(),
                            longitude: place.geometry.location.lng(),
                        }
                    })
                })
        });
    }

    // MEMO: この関数を呼び出さない限り、google.map.xxx の機能は利用できない
    // SEE: https://developers.google.com/maps/documentation/javascript/overview?hl=ja#js_api_loader_package
    private async loadMapApi() {
        if (this.mapApi) return this.mapApi;

        const loader = new Loader({
            apiKey: process.env.GCP_API_KEY,
            version: "weekly",
            libraries: ["places"],
        })
        await loader.load();

        const mapApi = new google.maps.Map(this.mapElement);
        this.mapApi = mapApi;
        return mapApi;
    }
}


type PlaceAutoCompleteRequest = {
    input: string;
    radius: number;
    language: "ja";
    location?: GeoLocation;
}

type PlaceDetailRequest = {
    placeId: string;
    language: "ja";
}

type PlaceDetailResponse = {
    location: GeoLocation
}