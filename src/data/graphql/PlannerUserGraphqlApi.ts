import {
    BindPlanCandidateSetToUserDocument,
    FirebaseUserDocument,
} from "src/data/graphql/generated";
import { GraphQlRepository } from "src/data/graphql/GraphQlRepository";
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

        return {};
    }
}
