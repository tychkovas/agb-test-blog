import express from 'express';
import { ApolloServer, AuthenticationError } from 'apollo-server-express';
import graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.mjs';

import 'dotenv/config';
import jwt from 'jsonwebtoken';
import DataLoader from 'dataloader';
import typeDefs from './graphql/schema.js';
import resolvers from './graphql/resolvers.js';

// eslint-disable-next-line import/no-named-as-default-member
import models, { sequelize } from './db/db.js';
import loaders from './loaders/index.js';

console.log('process.env.SECRET: ', process.env.SECRET);

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
  // Using graphql-upload without CSRF prevention is very insecure.
  csrfPrevention: true,
  cache: 'bounded',
  introspection: true,
  playground: true,
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
      // if (req.headers['x-token']) console.log('req: ', req.headers['x-token']);
      // const token = req.headers.authorization || '';
      // if (token) console.log('token: ', token);
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

const createUsersWithPosts = async () => { // date
  await models.User.create(
    {
      nickname: 'rwieruch',
      email: 'hello@robin.com',
      password: 'rwieruch',
      // role: 'ADMIN',
      // posts: [
      //   {
      //     title: 'Published the Road',
      //     body: 'Published the Road to learn React',
      //     published_at: date.setSeconds(date.getSeconds() + 1),
      //   },
      // ],
    },
    // {
    //   include: [models.Post],
    // },
  );

  await models.User.create(
    {
      nickname: 'ddavids',
      email: 'hello@david.com',
      password: 'ddavids',
    //   posts: [
    //     {
    //       title: 'Happy',
    //       body: 'Happy to release ...',
    //       published_at: date.setSeconds(date.getSeconds() + 1),
    //     },
    //     {
    //       title: 'Published',
    //       body: 'Published a complete ...',
    //       published_at: date.setSeconds(date.getSeconds() + 1),
    //     },
    //   ],
    },
    // {
    //   include: [models.Post],
    // },
  );
};

// // The `listen` method launches a web server.
// server.listen({ port: 4001 }).then(({ url }) => {
//   console.log(`\n\r🚀  Server ready at ${url} \n\r`);
// });

const isTest = !!process.env.TEST_DATABASE;
const isProduction = false; // !!process.env.DATABASE_URL;
const port = process.env.PORT || 4001;

sequelize.sync({ force: isTest || isProduction }).then(async () => {
  if (isTest || isProduction) {
    console.log('isTest || isProduction: ', isTest, isProduction);
    createUsersWithPosts(new Date());
  }

  await server.start();

  const app = express();

  app.use(graphqlUploadExpress());

  server.applyMiddleware({ app });

  await new Promise((r) => { app.listen({ port }, r); });

  console.log(`🚀 Server ready at http://localhost:${port}${server.graphqlPath} \n\r`);

  // The `listen` method launches a web server.
  // server.listen({ port }).then(({ url }) => {
  //   console.log(`\n\r🚀  Server ready at ${url} \n\r`);
  // });

  // httpServer.listen({ port }, () => {
  //   console.log(`Apollo Server on http://localhost:${port}/graphql`);
  // });
});
