import {ApolloClient, InMemoryCache} from "@apollo/client";

export class GraphQlRepository {
    protected readonly client = new ApolloClient({
        uri: `${process.env.PLANNER_API_ENDPOINT}/graphql`,
        cache: new InMemoryCache(),
    })
}