import { ApolloLink } from "@apollo/client";
import serverLink from "./server";

import { setContext } from '@apollo/client/link/context';
import authHeader from '../../services/auth-header';

const authLink = setContext((_, { headers }) => {
  // const token = localStorage.getItem('token');
  const token = authHeader();
  console.log('add header: ', JSON.stringify(token));

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      ...token,
     //   authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const link: ApolloLink = ApolloLink.from([serverLink]);

export default authLink.concat(link);