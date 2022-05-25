const { ApolloServer, gql } = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "posts" query returns an array of zero or more posts (defined above).
  "Get posts array"
  type Query {
    posts: [Post]
  }

  "записи в блоге"
  type Post {
    title: String!
    body: String!
    "ссылка на автора"
    author: User
    "дата-время размещения записи"
    published: String #Data
  }

  "комментарии к записям"
  type Commnet{
    body: String!
    "ссылка на автора"
    author: User
    "дата-время размещения комментария"
    published_at: String #Data
  }

  "пользователи/авторы"
  type User {
    nickname: String!
    email: String!
    password: String!
  }
`;

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