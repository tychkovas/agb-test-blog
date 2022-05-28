const { GraphQLDateTime } = require("graphql-scalars");

// Resolvers define the technique for fetching the types defined in the
// schema. This resolver retrieves posts from the "posts" array above.
const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    posts: (_, __, { dataSources }) => {
      // console.debug('Query posts:', dataSources.PostAPI.getPosts());
      return dataSources.PostAPI.getPosts();
    },
    post: (_, args, { dataSources }) => {
      console.debug('Query post', JSON.stringify(args));
      return dataSources.PostAPI.getPost(args.id);
    },

    users: (_, __, { dataSources }) => dataSources.PostAPI.getUsers(),
    
    user: (_, args, { dataSources }) => {
      console.debug('Query user', JSON.stringify(args));
      return dataSources.PostAPI.getUser(args.id);
    },
  },

  Post: {
    author: ({ authorId }, _, { dataSources }) => {
      console.debug('Query author id=', JSON.stringify(authorId));
      return dataSources.PostAPI.getUser(authorId);
    },
  }
};

module.exports = resolvers;
