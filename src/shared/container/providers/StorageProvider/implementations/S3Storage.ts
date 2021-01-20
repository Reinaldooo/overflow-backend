import fs from "fs";
import path from "path";
import aws, { S3 } from "aws-sdk";
import mime from "mime";
//
import { uploadsDirConfig } from "@config/upload";
import IStorageProvider from "../models/IStorageProvider";

export default class S3Storage implements IStorageProvider {
  private client: S3;

  constructor() {
    this.client = new aws.S3({
      region: "us-east-1",
    });
  }

  public async save(file: string): Promise<string> {
    const filePath = path.resolve(uploadsDirConfig.tmp, file);

    const ContentType = mime.getType(filePath);

    const fileContent = await fs.promises.readFile(filePath);

    await this.client
      .putObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file,
        ACL: "public-read",
        Body: fileContent,
        ContentType,
      })
      .promise();

    await fs.promises.unlink(filePath);

    return file;
  }

  public async delete(file: string): Promise<void> {
    await this.client
      .deleteObject({
        Bucket: process.env.S3_BUCKET_NAME,
        Key: file,
      })
      .promise();
  }
}
