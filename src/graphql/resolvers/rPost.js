import Sequelize from 'sequelize';
import { combineResolvers } from 'graphql-resolvers';

// import pubsub, { EVENTS } from '../subscription';
import { isAuthenticated, isMessageOwner } from './authorization.js';

const toCursorHash = (string) => Buffer.from(string).toString('base64');

const fromCursorHash = (string) => Buffer.from(string, 'base64').toString('ascii');

export default {
  Query: {
    posts: async (parent, { cursor, limit = 100 }, { models }) => {
      const cursorOptions = cursor
        ? {
          where: {
            createdAt: {
              [Sequelize.Op.lt]: fromCursorHash(cursor),
            },
          },
        }
        : {};

      const posts = await models.Post.findAll({
        order: [['createdAt', 'DESC']],
        limit: limit + 1,
        ...cursorOptions,
      });

      const hasNextPage = posts.length > limit;
      const edges = hasNextPage ? posts.slice(0, -1) : posts;

      return {
        edges,
        pageInfo: {
          hasNextPage,
          endCursor: toCursorHash(
            edges[edges.length - 1].createdAt.toString(),
          ),
        },
      };
    },
    post: async (parent, { id }, { models }) => models.Post.findByPk(id),
  },

  Mutation: {
    createMessage: combineResolvers(
      isAuthenticated,
      async (parent, { text }, { models, me }) => {
        const post = await models.Post.create({
          text,
          userId: me.id,
        });

        // pubsub.publish(EVENTS.MESSAGE.CREATED, {
        //   messageCreated: { post },
        // });

        return post;
      },
    ),

    deleteMessage: combineResolvers(
      isAuthenticated,
      isMessageOwner,
      async (parent, { id }, { models }) => models.Post.destroy({ where: { id } }),
    ),
  },

  Post: {
    user: async (post, args, { loaders }) => loaders.user.load(post.userId),
  },

  // Subscription: {
  //   messageCreated: {
  //     subscribe: () => pubsub.asyncIterator(EVENTS.MESSAGE.CREATED),
  //   },
  // },
};
