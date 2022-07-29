import AWS from 'aws-sdk';

export class AWSS3Uploader {
  constructor(config) {
    AWS.config = new AWS.Config();
    AWS.config.update({
      region: config.region || 'ru-central1',
      accessKeyId: config.accessKeyId,
      secretAccessKey: config.secretAccessKey,
      endpoint: 'https://storage.yandexcloud.net',
      httpOptions: {
        timeout: 10000,
        connectTimeout: 10000
      },
    });

    this.s3 = new AWS.S3();
    this.config = config;
  }

  async singleFileUploadResolver ( parent, { file }, ) {
    const { stream, filename, mimetype, encoding } = await file;

    // Create the destination file path
    const filePath = this.createDestinationFilePath(
      filename,
      mimetype,
      encoding
    );

    // Create an upload stream that goes to S3
    // Pipe the file data into the upload stream
    // Get the link representing the uploaded file
    // (optional) save it to our database

    return { filename, mimetype, encoding, url: '' };
  }
}

export default null;
