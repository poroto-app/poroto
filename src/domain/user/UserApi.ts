import { PlaceEntity } from "src/domain/models/PlaceEntity";
import { PlanEntity } from "src/domain/models/PlanEntity";
import { User } from "src/domain/models/User";

export interface UserApi {
    fetchUser(request: FetchUserRequest): Promise<FetchUserResponse>;

    fetchByFirebaseUserId(
        request: FetchByFirebaseUserRequest
    ): Promise<FetchByFirebaseUserResponse>;

    bindPlanCandidateSetsToUser(
        request: BindPlanCandidateSetsToUserRequest
    ): Promise<BindPlanCandidateSetsToUserResponse>;
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

export type FetchUserRequest = {
    userId: string;
    firebaseToken: string;
};

export type FetchUserResponse = {
    user: UserEntity;
    plans: PlanEntity[];
    likedPlaces: PlaceEntity[];
};

export type FetchByFirebaseUserRequest = {
    firebaseUserId: string;
    firebaseToken: string;
};

export type FetchByFirebaseUserResponse = {
    user: UserEntity;
    plans: PlanEntity[];
    likedPlaces: PlaceEntity[];
};

export type BindPlanCandidateSetsToUserRequest = {
    userId: string;
    firebaseAuthToken: string;
    planCandidateSetIds: string[];
};

export type BindPlanCandidateSetsToUserResponse = {
    userId: string;
};
