import { GraphQlRepository } from "src/data/graphql/GraphQlRepository";
import {
    fromGraphqlPlaceEntity,
    fromGraphqlPlanEntity,
} from "src/data/graphql/PlannerGraphQlApi";
import {
    BindPlanCandidateSetToUserDocument,
    FirebaseUserDocument,
} from "src/data/graphql/generated";
import {
    BindPlanCandidateSetsToUserRequest,
    BindPlanCandidateSetsToUserResponse,
    FetchByFirebaseUserRequest,
    FetchByFirebaseUserResponse,
    UserApi,
} from "src/domain/user/UserApi";

export class PlannerUserGraphqlApi
    extends GraphQlRepository
    implements UserApi
{
    async fetchByFirebaseUserId(
        request: FetchByFirebaseUserRequest
    ): Promise<FetchByFirebaseUserResponse> {
        const { data } = await this.client.query({
            query: FirebaseUserDocument,
            variables: {
                firebaseUserId: request.firebaseUserId,
                firebaseToken: request.firebaseToken,
            },
        });
        return {
            user: {
                id: data.firebaseUser.id,
                name: data.firebaseUser.name,
                photoUrl: data.firebaseUser.photoUrl,
            },
            plans: data.firebaseUser.plans.map(fromGraphqlPlanEntity),
            likedPlaces: data.firebaseUser.likedPlaces.map(
                fromGraphqlPlaceEntity
            ),
        };
    }

    async bindPlanCandidateSetsToUser(
        request: BindPlanCandidateSetsToUserRequest
    ): Promise<BindPlanCandidateSetsToUserResponse> {
        const { data } = await this.client.mutate({
            mutation: BindPlanCandidateSetToUserDocument,
            variables: {
                input: {
                    userId: request.userId,
                    firebaseAuthToken: request.firebaseAuthToken,
                    planCandidateSetIds: request.planCandidateSetIds,
                },
            },
        });

        return {
            userId: data.bindPlanCandidateSetToUser.user.id,
        };
    }
}
