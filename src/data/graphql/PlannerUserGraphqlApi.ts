import { GraphQlRepository } from "src/data/graphql/GraphQlRepository";
import {
    fromGraphqlPlaceEntity,
    fromGraphqlPlanEntity,
} from "src/data/graphql/PlannerGraphQlApi";
import {
    BindPlanCandidateSetToUserDocument,
    FirebaseUserDocument,
    UserDocument,
} from "src/data/graphql/generated";
import {
    BindPlanCandidateSetsToUserRequest,
    BindPlanCandidateSetsToUserResponse,
    FetchByFirebaseUserRequest,
    FetchByFirebaseUserResponse,
    FetchUserRequest,
    FetchUserResponse,
    UserApi,
} from "src/domain/user/UserApi";

export class PlannerUserGraphqlApi
    extends GraphQlRepository
    implements UserApi
{
    async fetchUser(request: FetchUserRequest): Promise<FetchUserResponse> {
        const { data } = await this.clientWithAuthHeader({
            token: request.firebaseToken,
        }).query({
            query: UserDocument,
            variables: {
                userId: request.userId,
                userIdString: request.userId,
                firebaseToken: request.firebaseToken,
            },
        });
        return {
            user: {
                id: data.plansByUser.author.id,
                name: data.plansByUser.author.name,
                photoUrl: data.plansByUser.author.photoUrl,
            },
            plans: data.plansByUser.plans.map(fromGraphqlPlanEntity),
            likedPlaces: data.likePlaces.map(fromGraphqlPlaceEntity),
        };
    }

    async fetchByFirebaseUserId(
        request: FetchByFirebaseUserRequest
    ): Promise<FetchByFirebaseUserResponse> {
        const { data } = await this.clientWithAuthHeader({
            token: request.firebaseToken,
        }).query({
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
