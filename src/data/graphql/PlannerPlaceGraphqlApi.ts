import { GraphQlRepository } from "src/data/graphql/GraphQlRepository";
import { fromGraphqlPlaceEntity } from "src/data/graphql/PlannerGraphQlApi";
import { PlaceRecommendationsDocument } from "src/data/graphql/generated";
import {
    PlaceApi,
    PlaceRecommendationResponse,
} from "src/domain/place/PlaceApi";

export class PlannerPlaceGraphqlApi
    extends GraphQlRepository
    implements PlaceApi
{
    async fetchPlaceRecommendations(): Promise<PlaceRecommendationResponse> {
        const { data } = await this.client.query({
            query: PlaceRecommendationsDocument,
        });
        return {
            places: data.placesRecommendation.places.map(
                fromGraphqlPlaceEntity
            ),
        };
    }
}
