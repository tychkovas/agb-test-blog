const commentResolvers = {
  Query: {
    comments: (_, __, { models }) => models.getComments(),
    comment: (_, args, { models }) => models.getComment(args),
  },

  Mutation: {},

  Comment: {
    author: async (arg, _, { models }) => {
      const { userId } = arg;
      console.info('-resolvers:Comment:author:id=', JSON.stringify(arg));
      return models.getUser({ id: userId });
    },
  },
};

export default commentResolvers;
