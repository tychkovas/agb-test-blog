import { InMemoryCache, ApolloClient, gql } from "@apollo/client";
import { typeDefs } from "./TypeDefs";
import link from "./Middlewares";
import initCache from "./Cache";

let client: ApolloClient<any>;

export const getApolloClient = async (): Promise<ApolloClient<any>> => {
  if (client) return client;

  const cache: InMemoryCache = await initCache();

  const apolloClient: ApolloClient<any> = new ApolloClient({
      link,
      cache,
      connectToDevTools: true, // process.env.NODE_ENV === "development"
      typeDefs,
  });

  client = apolloClient;

  apolloClient.query({
    query: gql`
      query Users {
        users {
        id
        nickname
        email
        avatar_src
        }
     }
    `
  })
  .then((result) => console.log('ApolloClient init =', result));

  return apolloClient;
};
