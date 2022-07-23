import { InMemoryCache, ApolloClient, gql } from "@apollo/client";

export const apolloClient: ApolloClient<any> = new ApolloClient({
    uri: 'http://localhost:4001',
    cache: new InMemoryCache(),
});

apolloClient.query({
    query: gql`
      query Users {
        users {
        id
        nickname
        email
        }
     }
    `
})
.then((result) => console.log(result));
