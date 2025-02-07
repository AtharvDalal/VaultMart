import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';

@Injectable()
export class S3Service {
  private s3: AWS.S3;

  constructor() {
    this.s3 = new AWS.S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      region: process.env.AWS_REGION,
    });
  }

  async uploadFileToS3(file: Express.Multer.File) {
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: `products/${Date.now()}_${file.originalname}`,
      Body: file.buffer,
      ContentType: file.mimetype,
      ACL: 'public-read',
    };

    try {
      const data = await this.s3.upload(params).promise();
      return data.Location;
    } catch (err) {
      console.error(err);
      throw new Error('Error uploading file to S3');
    }
  }
}
