import AWS, { S3 } from "aws-sdk";

// Configure AWS credentials and region
AWS.config.update({
  accessKeyId: "YOUR_ACCESS_KEY",
  secretAccessKey: "YOUR_SECRET_ACCESS_KEY",
  region: "YOUR_REGION",
});

// Create an S3 client
let s3: S3 | null = null;

/*
    @info   : This application implements singleton design pattern to have only 1 S3 conn
    @input  :
    @return : (S3 object) return the S3 connection
*/
export const returnS3Client = (): S3 => {
  if (!s3) {
    s3 = new AWS.S3();
  }
  return s3;
};
