import { FirebaseUserDocument } from "src/data/graphql/generated";
import { GraphQlRepository } from "src/data/graphql/GraphQlRepository";
import {
    FetchByFirebaseUserRequest,
    FetchByFirebaseUserResponse,
    UserApi,
} from "src/domain/user/UserApi";

export class PlannerGraphqlUserApi
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
}
