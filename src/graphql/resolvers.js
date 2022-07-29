import { GraphQLDateTime } from 'graphql-scalars';

import userResolvers from './resolvers/user.js';
import postResolvers from './resolvers/rPost.js';
import commentResolvers from './resolvers/rComment.js';
import uploadedFiles from './resolvers/uploadedFiles.js';

const customScalarResolver = {
  DateTime: GraphQLDateTime,
};

// Resolvers define the technique for fetching the types defined in the schema.
const resolvers = [
  customScalarResolver,
  userResolvers,
  postResolvers,
  commentResolvers,
  uploadedFiles,
];

export default resolvers;
