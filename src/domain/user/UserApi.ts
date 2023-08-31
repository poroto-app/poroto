import { User } from "src/domain/models/User";

export interface UserApi {
    fetchByFirebaseUserId(
        request: FetchByFirebaseUserRequest
    ): Promise<FetchByFirebaseUserResponse>;
}

export function createUserFromEntity(entity: UserEntity): User {
    return {
        id: entity.id,
        name: entity.name,
        avatarImage: entity.photoUrl,
    };
}

export type UserEntity = {
    id: string;
    name: string;
    photoUrl?: string;
};

export type FetchByFirebaseUserRequest = {
    firebaseUserId: string;
    firebaseToken: string;
};

export type FetchByFirebaseUserResponse = {
    user: UserEntity;
};
