import AWS, { S3 } from "aws-sdk";

// Configure AWS credentials and region
AWS.config.update({
  accessKeyId: process.env.ACCESS_KEY_ID,
  secretAccessKey: process.env.SECRET_ACCESS_KEY,
  region: process.env.AWS_REGION,
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
    try {
      s3 = new AWS.S3();
    } catch (error) {
      // Handle the error here
      console.error("Error creating S3 client:", error);
      throw error;
    }
  }
  return s3;
};
