const {gql} = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar DateTime
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "posts" query returns an array of zero or more posts (defined above).
  "Get posts array"
  type Query {
    posts(id: ID!): [Post]
    post(id: ID!): Post
  }

  interface MutationResponse {
    code: String!
    success: Boolean!
    message: String!
  }

  type Mutation implements MutationResponse {
    code: String!
    success: Boolean!
    message: String!
    createPost(
      title: String!
      body: String!
      published_at: DateTime
    ): Post

    publishPost(content: ContentPublishPost!): ContentPublishPostAnswer

    updatePost(id: ID!, content: ContentPublishPost!): Post
  }

  input ContentPublishPost {
    title: String!,
    body: String!
    published_at: DateTime
  }

  type ContentPublishPostAnswer {
    id: ID!
    title: String!
    body: String!
    published_at: DateTime!
    "author’s nickname"
    nickname: String
  }

  "записи в блоге"
  type Post {
    id: ID!
    title: String!
    body: String!
    "ссылка на автора"
    author: User
    "дата-время размещения записи"
    published_at: DateTime
  }

  "комментарии к записям"
  type Comment{
    id: ID!
    body: String!
    "ссылка на автора"
    author: User
    "дата-время размещения комментария"
    published_at: DateTime
  }

  "пользователи/авторы"
  type User {
    id: ID!
    nickname: String!
    email: String!
    password: String!
  }
`;

module.exports = typeDefs;
