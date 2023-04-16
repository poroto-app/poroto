import {GraphQlRepository} from "src/data/graphql/GraphQlRepository";
import {
    CreatePlanFromLocationRequest,
    CreatePlanFromLocationResponse,
    MatchInterestRequest, MatchInterestResponse,
    PlannerApi
} from "src/domain/plan/PlannerApi";
import {CreatePlanByLocationDocument} from "src/graphql/graphql";

export class PlannerGraphQlApi extends GraphQlRepository implements PlannerApi {
    async createPlansFromLocation(request: CreatePlanFromLocationRequest): Promise<CreatePlanFromLocationResponse> {
        return Promise.resolve(undefined);
    }

    matchInterest(request: MatchInterestRequest): Promise<MatchInterestResponse> {
        return Promise.resolve(undefined);
    }
}