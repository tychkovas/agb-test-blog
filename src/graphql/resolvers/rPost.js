import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

// import pubsub, { EVENTS } from '../subscription';
import { isAuthenticated, isPostOwner } from './authorization.js';

export default {
  Query: {
    // posts: (_, __, { models }) => models.getPosts(),
    posts: async (_, { page = 1, per_page: perPage = 3 }, { models }) => {
      console.log('Query:posts: page, per_page:', page, perPage);
      if (page <= 0) throw new Error('posts: in: error: page <= 0');
      const posts = await models.Post.findAll({
        order: [['published_at', 'DESC']],
        // limit: perPage + 1,
      });

      const totalPosts = posts.length;
      const totalPages = Math.ceil(posts.length / perPage);

      const hasNextPage = posts.length > (perPage * page);
      const curPage = (totalPages > page) ? page : totalPages;
      const first = perPage * (curPage - 1);
      const last = hasNextPage ? perPage * curPage : posts.length;
      const edges = posts.slice(first, last);

      console.log(`Query:posts:totalPosts: ${totalPosts}, totalPages: ${totalPages}, hasNextPage: ${hasNextPage}`);
      console.log('Query:posts:first: ', first, 'last: ', last);

      return {
        posts: edges,
        pageInfo: {
          totalPages,
          totalPosts,
          hasNextPage,
        },
      };
    },

    // post: (_, args, { models }) => models.getPost(args),

    post: async (_, { id }, { models }) => {
      console.log('Query:post:id:', id);
      return models.Post.findByPk(id);
    },
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

  // Mutation: {
  //   createPost: combineResolvers(
  //     isAuthenticated,
  //     async (parent, { text }, { models, me }) => {
  //       const post = await models.Post.create({
  //         text,
  //         userId: me.id,
  //       });

  //       // pubsub.publish(EVENTS.MESSAGE.CREATED, {
  //       //   postCreated: { post },
  //       // });

  //       return post;
  //     },
  //   ),

  //   deletePost: combineResolvers(
  //     isAuthenticated,
  //     isPostOwner,
  //     async (parent, { id }, { models }) => models.Post.destroy({ where: { id } }),
  //   ),
  // },

  // Post: {
  //   user: async (post, args, { loaders }) => loaders.user.load(post.userId),
  // },

  Post: {
    author: async (arg, _, { db }) => {
      const { userId } = arg;
      console.info('-resolvers:Post:author:id=', JSON.stringify(arg));
      return db.getUser({ id: userId });
    },
  },

  // Subscription: {
  //   postCreated: {
  //     subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
  //   },
  // },
};
