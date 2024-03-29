import { LikePlacesDocument } from "src/data/graphql/generated";
import { GraphQlRepository } from "src/data/graphql/GraphQlRepository";
import { fromGraphqlPlaceEntity } from "src/data/graphql/PlannerGraphQlApi";
import {
    FetchLikePlacesRequest,
    FetchLikePlacesResponse,
    PlannerPlaceApi,
} from "src/domain/place/PlannerPlaceApi";

export class PlannerPlaceGraphqlApi
    extends GraphQlRepository
    implements PlannerPlaceApi
{
    async fetchLikePlaces(
        request: FetchLikePlacesRequest
    ): Promise<FetchLikePlacesResponse> {
        const { data } = await this.client.query({
            query: LikePlacesDocument,
            variables: {
                input: {
                    userId: request.userId,
                    firebaseAuthToken: request.firebaseIdToken,
                },
            },
        });
        return {
            places: data.likePlaces.map((place) =>
                fromGraphqlPlaceEntity(place)
            ),
        };
    }
}
