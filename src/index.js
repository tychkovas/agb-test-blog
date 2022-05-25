const { ApolloServer } = require('apollo-server');
const { GraphQLDateTime } = require("graphql-scalars");
const typeDefs = require('./schema');

const posts = [
  {
    id: 'post_id_1',
    title: 'post title 1',
    body: 'post body 1',
    // author: User
    published_at: () => new Date(Date.UTC(2017, 0, 10, 21, 33, 15, 233))
  },
  {
    id: 'post_id_2',
    title: 'post title 2',
    body: 'post body 2',
    published_at: () => new Date(Date.UTC(2018, 0, 10, 21, 33, 15, 233))
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves posts from the "posts" array above.
const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    posts: () => posts,
  },
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  typeDefs,
  resolvers,
  // csrfPrevention: true,
});

// The `listen` method launches a web server.
server.listen().then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});