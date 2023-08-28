import { User } from "src/domain/models/User";

export interface UserApi {
    fetchByFirebaseUserId(
        request: FetchByFirebaseUserRequest
    ): Promise<FetchByFirebaseUserResponse>;
}

export type FetchByFirebaseUserRequest = {
    firebaseUserId: string;
    firebaseToken: string;
};

export type FetchByFirebaseUserResponse = {
    user: User;
};
