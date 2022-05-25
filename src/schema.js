const {gql} = require('apollo-server');

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

module.exports = typeDefs;
