import AWS from 'aws-sdk';
import stream from 'stream';
import 'dotenv/config';
import path from 'path';

export class AWSS3Uploader {
  constructor(config) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || 'ru-central1',
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      endpoint: 'https://storage.yandexcloud.net',
      // httpOptions: {
      //   timeout: 10000,
      //   connectTimeout: 10000
      // },
      sslEnabled: false,
      s3ForcePathStyle: true,
    });

    this.s3 = new AWS.S3();
    this.config = config;
  }

  // eslint-disable-next-line class-methods-use-this
  createDestinationFilePath(fileName) {
    return path.join('Avatars', fileName);
  }

  createUploadStream(key) {
    const pass = new stream.PassThrough();
    return {
      writeStream: pass,
      promise: this.s3
        .upload({
          Bucket: this.config.destinationBucketName,
          Key: key,
          Body: pass,
        })
        .promise(),
    };
  }

  async singleFileUploadResolver(_parent, { file: { file } }, { models, me }) {
    const {
      createReadStream, filename, mimetype, encoding,
    } = await file;
    console.log('me: ', me);
    console.log('singleFileUploadResolver:filename: ', filename);

    // Create the destination file path
    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding,
    );

    // Create an upload stream that goes to S3
    const uploadStream = this.createUploadStream(filePath);

    // Pipe the file data into the upload stream
    const fileStream = createReadStream();
    // stream.pipe(uploadStream.writeStream);
    fileStream.pipe(uploadStream.writeStream);

    // Start the stream
    const result = await uploadStream.promise
      .catch((err) => console.log('uploadStream: error: ', err));

    // Get the link representing the uploaded file
    const link = result.Location;
    console.log('result: ', result);
    // (optional) save it to our database
    models.setAvatarSrc(me.id, link);

    return {
      filename, mimetype, encoding, url: result.Location,
    };
  }
}

export default null;
