const { ApolloServer } = require('apollo-server');
const typeDefs = require('./schema');

const posts = [
  {
    title: 'post title 1',
    body: 'post body 1',
    // author: User
    // published: Data
  },
  {
    title: 'post title 2',
    body: 'post body 2',
  },
];

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves posts from the "posts" array above.
const resolvers = {
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