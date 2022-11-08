import AWS from 'aws-sdk';
import stream from 'stream';
import 'dotenv/config';

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
  createDestinationFilePath(fileName) { return fileName; }

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

  async singleFileUploadResolver(_parent, { file }, { models, me }) {
    const {
      stream: fileStream, filename, mimetype, encoding,
    } = await file;

    // Create the destination file path
    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding,
    );

    // Create an upload stream that goes to S3
    const uploadStream = this.createUploadStream(filePath);

    // Pipe the file data into the upload stream
    fileStream.pipe(uploadStream.writeStream);

    // Start the stream
    const result = await uploadStream.promise;

    // Get the link representing the uploaded file
    const link = result.Location;
    // (optional) save it to our database
    models.setAvatarSrc(me.id, link);

    return {
      filename, mimetype, encoding, url: result.Location,
    };
  }
}

export default null;
