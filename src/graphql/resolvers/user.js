import jwt from 'jsonwebtoken';
import { combineResolvers } from 'graphql-resolvers';
import { AuthenticationError, UserInputError } from 'apollo-server';

import { isAdmin, isAuthenticated } from './authorization.js';

const createToken = async (user, secret, expiresIn) => {
  const {
    id, email, nickname,
  } = user;

  const payload = { id, email, nickname };

  return jwt.sign(
    payload,
    secret,
    { expiresIn },
  );
};

export default {
  Query: {
    users: async (parent, args, { models }) => {
      console.log('Query:users:');
      return models.User.findAll();
    },
    user: async (parent, { id }, { models }) => (
      models.User.findByPk(id)
    ),
    me: async (parent, args, { models, me }) => {
      if (!me) {
        return null;
      }

      return models.User.findByPk(me.id);
    },
  },

  Mutation: {
    signUp: async (
      parent,
      { nickname, email, password },
      { models, secret },
    ) => {
      const user = await models.User.create({
        nickname,
        email,
        password,
      });

      return { token: createToken(user, secret, '30m') };
    },

    signIn: async (
      parent,
      { nickname, password },
      { models, secret },
    ) => {
      console.log('nickname, password: ', nickname, password);
      const user = await models.User.findByLogin(nickname);

      if (!user) {
        throw new UserInputError(
          'No user found with this nickname credentials.',
        );
      }

      const isValid = await user.validatePassword(password);

      if (!isValid) {
        throw new AuthenticationError('Invalid password.');
      }

      return { token: createToken(user, secret, '30m') };
    },

    updateUser: combineResolvers(
      isAuthenticated,
      async (parent, { nickname }, { models, me }) => {
        const user = await models.User.findByPk(me.id);
        return user.update({ nickname });
      },
    ),

    deleteUser: combineResolvers(
      isAuthenticated, // isAdmin,
      async (parent, { id }, { models, me }) => {
        if (id !== me.id) throw new AuthenticationError('Invalid user id.');
        return models.User.destroy({
          where: { id },
        });
      },
    ),
  },

  User: {
    // messages: async (user, args, { models }) => (
    //   models.Message.findAll({
    //     where: {
    //       userId: user.id,
    //     },
    //   })
    // ),
  },
};
