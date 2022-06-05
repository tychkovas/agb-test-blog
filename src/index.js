const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const PostAPI = require('./datasources/post-db');
const db = require('./db/models/db');

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  dataSources: () => ({ PostAPI: new PostAPI() }),
  // csrfPrevention: true,
  tracing: true,
  context: { db },
});

// The `listen` method launches a web server.
server.listen({ port: 4001 }).then(({ url }) => {
  console.log(`\n\r🚀  Server ready at ${url} \n\r`);
});
