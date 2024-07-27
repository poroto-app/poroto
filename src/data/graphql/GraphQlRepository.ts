import { ApolloClient, InMemoryCache } from "@apollo/client";
import { AppEnv } from "src/constant/env";

export class GraphQlRepository {
    protected readonly client = new ApolloClient({
        uri: `${AppEnv.PLANNER_API_ENDPOINT}/graphql`,
        cache: new InMemoryCache(),
    });

    clientWithAuthHeader({ token }: { token: string }) {
        return new ApolloClient({
            uri: `${AppEnv.PLANNER_API_ENDPOINT}/graphql`,
            cache: new InMemoryCache(),
            headers: {
                Authorization: `Bearer ${token}`,
            },
        });
    }
}
