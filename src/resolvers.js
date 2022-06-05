const { GraphQLDateTime } = require('graphql-scalars');

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves posts from the "posts" array above.
const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    posts: (_, __, { db }) => db.getPosts(),
    post: (_, args, { db }) => db.getPost(args),
    users: (_, __, { db }) => db.getUsers(),
    user: (_, args, { db }) => db.getUser(args),
    comments: (_, __, { db }) => db.getComments(),
    comment: (_, args, { db }) => db.getComment(args),
  },

  Mutation: {
    // where our new resolver function will go
    createPost: async (_, { content }, { db }) => {
      console.log('Mutation:createPost', content);
      const newPost = await db.createPost(content);
      return {
        code: 200,
        success: true,
        message: `Successfully created post '${newPost.title}'`,
        contentPost: newPost,
      };
    },

    updatePost: async (_, { id, content }, { db }) => {
      console.log('Mutation:updatePost:', id, content);
      try {
        const updatedPost = await db.updatePost(id, content);
        return {
          code: 200,
          success: true,
          message: `Successfully update post '${updatedPost.title}'`,
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

    deletePost: async (_, { id }, { db }) => {
      console.log('Mutation:deletePost:id', id);
      try {
        const deletedPost = await db.deletePost(id);
        return {
          code: 200,
          success: true,
          message: `Successfully delete post '${deletedPost.title}'`,
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
    author: async (arg, _, { db }) => {
      const { userId } = arg;
      console.info('-resolvers:Post:author:id=', JSON.stringify(arg));
      return db.getUser({ id: userId });
    },
  },

  Comment: {
    author: async (arg, _, { db }) => {
      const { userId } = arg;
      console.info('-resolvers:Comment:author:id=', JSON.stringify(arg));
      return db.getUser({ id: userId });
    },
  },

  ContentPost: {
    nickname: async (arg, _, { db }) => {
      const { userId } = arg;
      console.info('-resolvers:ContentPost:author:id=', JSON.stringify(arg));
      if (!userId) return null;
      return db.getUser({ id: userId }).then(({ nickname }) => nickname);
    },
  },
};

module.exports = resolvers;
