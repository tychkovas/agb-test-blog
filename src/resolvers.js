const { GraphQLDateTime } = require('graphql-scalars');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves posts from the "posts" array above.
const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    posts: (_, __, { dataSources }) => dataSources.PostAPI.getPosts(),

    post: (_, args, { dataSources }) => {
      console.warn('Query:post', JSON.stringify(args));
      return dataSources.PostAPI.getPost(args.id);
    },

    users: (_, __, { dataSources }) => dataSources.PostAPI.getUsers(),

    user: (_, args, { dataSources }) => {
      console.info('Query:user', JSON.stringify(args));
      return dataSources.PostAPI.getUser(args.id);
    },
  },

  Mutation: {
    // where our new resolver function will go
    createPost: (_, { content }, { dataSources }) => {
      console.log('Mutation:createPost', content);
      const newPost = dataSources.PostAPI.createPost(content);
      return {
        code: 200,
        success: true,
        message: `Successfully created post ${newPost.title}`,
        contentPost: newPost,
      };
    },

    updatePost: (_, { id, content }, { dataSources }) => {
      console.log('Mutation:updatePost', id, content);
      try {
        const updatedPost = dataSources.PostAPI.updatePost(id, content);
        return {
          code: 200,
          success: true,
          message: `Successfully update post ${updatedPost.title}`,
          contentPost: updatedPost,
        };
      } catch (e) {
        console.log('Mutation:updatePost:error:', e.message);
        return {
          code: 404,
          success: false,
          message: `Error: update post: ${e.message}`,
          contentPost: null,
        };
      }
    },

    deletePost: (_, { id }, { dataSources }) => {
      console.log('Mutation:deletePost:id', id);
      try {
        const deletedPost = dataSources.PostAPI.deletePost(id);
        return {
          code: 200,
          success: true,
          message: `Successfully delete post ${deletedPost.title}`,
          contentPost: deletedPost,
        };
      } catch (e) {
        console.log('Mutation:deletePost:error:', e.message);
        return {
          code: 404,
          success: false,
          message: `Error: delete post: ${e.message}`,
          contentPost: null,
        };
      }
    },

  },

  Post: {
    author: ({ authorId }, _, { dataSources }) => {
      console.info('Post:author:id=', JSON.stringify(authorId));
      return dataSources.PostAPI.getUser(authorId);
    },
  },

  ContentPost: {
    nickname: ({ authorId }, _, { dataSources }) => {
      console.info('ContentPost:author:id=', JSON.stringify(authorId));
      if (!authorId) return null;

      return dataSources.PostAPI.getUser(authorId).nickname;
    },
  },
};

module.exports = resolvers;
