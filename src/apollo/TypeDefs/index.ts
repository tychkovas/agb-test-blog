import { gql } from "@apollo/client";

export const typeDefs = gql`
  """
  A date-time string at UTC, such as 2007-12-03T10:15:30Z, compliant with the date-time format outlined in section 5.6 of the RFC 3339 profile of the ISO 8601 standard for representation of dates and times using the Gregorian calendar.
  """
  scalar DateTime

  """Get data"""
  type Query {
    """Query to get pusts array"""
    posts(page: Int, per_page: Int): PagePosts

    """Fetch a specific post, provided a post's ID"""
    post(id: Int!): PostResponse

    """Query to get users array"""
    users: [User]

    """Fetch a specific user, provided a user's ID"""
    user(id: Int!): User
    me: User

    """Query to get comments array"""
    comments: [Comment]

    """Fetch a specific comment, provided a user's ID"""
    comment(id: Int!): Comment
  }

  """Change data"""
  type Mutation {
    """Create new post"""
    createPost(content: ContentPublishPost!): ContentPostResponse!

    """Update specific post, provided a post's ID"""
    updatePost(id: Int!, content: ContentPublishPost!): ContentPostResponse!

    """Delete specific post by ID"""
    deletePost(id: Int!): ContentPostResponse!
    signUp(nickname: String!, email: String!, password: String!): Token!
    signIn(nickname: String!, password: String!): Token!
    updateUser(nickname: String!): User!
    deleteUser(id: Int!): Boolean!
  }

  type Token {
    token: String!
  }

  """Mutation response common interface"""
  interface MutationResponse {
    """Similar to HTTP status code, represents the status of the mutation"""
    code: Int!

    """Indicates whether the mutation was successful"""
    success: Boolean!

    """Human-readable message for the UI"""
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

    """author’s nickname"""
    nickname: String
  }

  """Post after a successful mutation"""
  type ContentPostResponse implements MutationResponse {
    """Similar to HTTP status code, represents the status of the mutation"""
    code: Int!

    """Indicates whether the mutation was successful"""
    success: Boolean!
    message: String!

    """Content post data"""
    contentPost: ContentPost
  }

  """записи в блоге"""
  type Post {
    id: Int!
    title: String!
    body: String!

    """ссылка на автора"""
    author: User

    """дата-время размещения записи"""
    published_at: DateTime
  }

  """комментарии к записям"""
  type Comment {
    id: Int!
    body: String!

    """ссылка на автора"""
    author: User

    """дата-время размещения комментария"""
    published_at: DateTime
  }

  """пользователи/авторы"""
  type User {
    id: Int!
    nickname: String!
    email: String!
  }
`;
