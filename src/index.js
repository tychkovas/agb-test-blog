import { ApolloServer, AuthenticationError } from 'apollo-server';

import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';

// eslint-disable-next-line import/no-named-as-default-member
import models, { sequelize } from './db/db.js';
import loaders from './loaders/index.js';

// eslint-disable-next-line consistent-return
const getMe = async (req) => {
  const token = req.headers['x-token'];

  if (token) {
    try {
      return await jwt.verify(token, process.env.SECRET);
    } catch (e) {
      throw new AuthenticationError(
        'Your session expired. Sign in again.',
      );
    }
  }
  // throw new Error('getMe: no token, req', req);
};

// The ApolloServer constructor requires two parameters: your schema
// definition and your set of resolvers.
const server = new ApolloServer({
  // introspection: true,
  typeDefs,
  resolvers,
  // csrfPrevention: true,
  tracing: true,
  formatError: (error) => {
    // remove the internal sequelize error message
    // leave only the important validation error
    const message = error.message
      .replace('SequelizeValidationError: ', '')
      .replace('Validation error: ', '');

    return {
      ...error,
      message,
    };
  },
  // context: { db },
  context: async ({ req, connection }) => {
    if (connection) {
      return {
        models,
        db: models,
        loaders: {
          user: new DataLoader((keys) => loaders.user.batchUsers(keys, models)),
        },
      };
    }

    if (req) {
      const me = await getMe(req);

      return {
        models,
        db: models,
        me,
        secret: process.env.SECRET,
        loaders: {
          user: new DataLoader((keys) => loaders.user.batchUsers(keys, models)),
        },
      };
    }

    return new Error(`server:context:err: r='${req}' c='${connection}'`);
  },
});

const createUsersWithMessages = async (date) => {
  await models.User.create(
    {
      username: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      role: 'ADMIN',
      messages: [
        {
          text: 'Published the Road to learn React',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );

  await models.User.create(
    {
      username: 'ddavids',
      email: 'hello@david.com',
      password: 'ddavids',
      messages: [
        {
          text: 'Happy to release ...',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
        {
          text: 'Published a complete ...',
          createdAt: date.setSeconds(date.getSeconds() + 1),
        },
      ],
    },
    {
      include: [models.Message],
    },
  );
};

// // The `listen` method launches a web server.
// server.listen({ port: 4001 }).then(({ url }) => {
//   console.log(`\n\r🚀  Server ready at ${url} \n\r`);
// });

const isTest = !!process.env.TEST_DATABASE;
const isProduction = !!process.env.DATABASE_URL;
const port = process.env.PORT || 4001;

sequelize.sync({ force: isTest || isProduction }).then(async () => {
  if (isTest || isProduction) {
    createUsersWithMessages(new Date());
  }

  // The `listen` method launches a web server.
  server.listen({ port }).then(({ url }) => {
    console.log(`\n\r🚀  Server ready at ${url} \n\r`);
  });

  // httpServer.listen({ port }, () => {
  //   console.log(`Apollo Server on http://localhost:${port}/graphql`);
  // });
});
