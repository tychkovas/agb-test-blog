import { gql } from 'apollo-server';

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = gql`
  scalar DateTime
  scalar Upload
  # The "Query" type is special: it lists all of the available queries that
  # clients can execute, along with the return type for each. In this
  # case, the "posts" query returns an array of zero or more posts (defined above).
  "Get data"
  type Query {
    "Query to get pusts array"
    posts(page: Int, per_page: Int): PagePosts
    "Fetch a specific post, provided a post's ID"
    post(id: Int!): PostResponse
    "Query to get users array"
    users: [User]
    "Fetch a specific user, provided a user's ID"
    user(id: Int!): User

    me: User

    "Query to get comments array"
    comments: [Comment]
    "Fetch a specific comment, provided a user's ID"
    comment(id: Int!): Comment

    hello: String
  }

  "Change data"
  type Mutation {
    "Create new post"
    createPost(content: ContentPublishPost!): ContentPostResponse!
    "Update specific post, provided a post's ID"
    updatePost(id: Int!, content: ContentPublishPost!): ContentPostResponse!
    "Delete specific post by ID"
    deletePost(id: Int!): ContentPostResponse! #TODO return id

    signUp(
      nickname: String!
      email: String!
      password: String!
    ): Token!

    signIn(nickname: String!, password: String!): Token!
    updateUser(nickname: String!): User!
    deleteUser(id: Int!): Boolean!

    singleUpload(file: Upload!): UploadedFileResponse!
  }

  type UploadedFileResponse {
      filename: String!
      mimetype: String!
      encoding: String!
      url: String!
  }

  type Token {
    token: String!
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

  type PagePosts {
    posts: [PostResponse]
    pageInfo: PageInfo
  }

  type PageInfo {
    totalPages: Int!
    totalPosts: Int!
    hasNextPage: Boolean!
  }

  type PostResponse {
    title: String!
    body: String!
    published_at: DateTime
  }

  input ContentPublishPost {
    title: String!
    body: String!
    published_at: DateTime
  }

  type ContentPost {
    id: Int!
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
    id: Int!
    title: String!
    body: String!
    "ссылка на автора"
    author: User
    "дата-время размещения записи"
    published_at: DateTime
  }

  "комментарии к записям"
  type Comment{
    id: Int!
    body: String!
    "ссылка на автора"
    author: User
    "дата-время размещения комментария"
    published_at: DateTime
  }

  "пользователи/авторы"
  type User {
    id: Int!
    nickname: String!
    email: String!
    # password: String!
  }
`;

export default typeDefs;
