import { AWSS3Uploader } from '../../s3/AWSS3Uploader.js';

const s3Uploader = new AWSS3Uploader({
  accessKeyId: process.env.YA_STORAGE_ACCESS_KEY,
  secretAccessKey: process.env.YA_STORAGE_SECRET_KEY,
  destinationBucketName: 'agb-blog',
});

export default {
  Query: {
    hello: () => 'Hey!',
  },
  Mutation: {
    singleUpload: s3Uploader.singleFileUploadResolver.bind(s3Uploader),
  },
};
