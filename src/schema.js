const {gql} = require('apollo-server');

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar DateTime
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "posts" query returns an array of zero or more posts (defined above).
  "Get data"
  type Query {
    "Query to get pusts array"
    posts: [Post]
    "Fetch a specific post, provided a post's ID"
    post(id: ID!): Post
    "Query to get users array"
    users: [User]
    "Fetch a specific user, provided a user's ID"
    user(id: ID!): User
  }

  "Change data"
  type Mutation {
    "Create new post"
    createPost(content: ContentPublishPost!): ContentPostResponse!
    "Update specific post, provided a post's ID"
    updatePost(id: ID!, content: ContentPublishPost!): ContentPostResponse!
    "Delete specific post by ID"
    deletePost(id: ID!): ContentPostResponse! #TODO return id
  }

  "Mutation response common interface"
    interface MutationResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    "Human-readable message for the UI"
    message: String
  }

  input ContentPublishPost {
    title: String!
    body: String!
    published_at: DateTime
  }

  type ContentPost {
    id: ID!
    title: String!
    body: String!
    published_at: DateTime!
    "author’s nickname"
    nickname: String
  }

  "Post after a successful mutation"
  type ContentPostResponse implements MutationResponse {
    "Similar to HTTP status code, represents the status of the mutation"
    code: Int!
    "Indicates whether the mutation was successful"
    success: Boolean!
    # "Human-readable message for the UI"
    message: String!
    "Content post data"
    contentPost: ContentPost
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
