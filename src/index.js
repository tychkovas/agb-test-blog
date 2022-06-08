import { ApolloServer } from 'apollo-server';

import typeDefs from './schema.js';
import resolvers from './resolvers.js';

// eslint-disable-next-line import/no-named-as-default-member
import db from './db/db.js';

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // csrfPrevention: true,
  tracing: true,
  context: { db },
});

// The `listen` method launches a web server.
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`\n\r🚀  Server ready at ${url} \n\r`);
});
