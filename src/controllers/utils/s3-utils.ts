import { S3 } from "aws-sdk";
import { returnS3Client } from "../../clients/s3-client";

const s3: S3 = returnS3Client();

export const uploadFileToS3 = (file: Express.Multer.File): Promise<string> => {
  const params: S3.Types.PutObjectRequest = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: file.originalname,
    Body: file.buffer,
  };

  return s3
    .upload(params)
    .promise()
    .then((response: S3.ManagedUpload.SendData) => {
      // Send the file URL using the response or perform any other action
      // console.log("File uploaded successfully. URL:", response.Location);
      return response.Location;
    })
    .catch((error) => {
      console.error("Error uploading file to S3:", error);
      return Promise.reject("Failed to upload file to S3");
    });
};

export const uploadFilesToS3 = (
  files: Express.Multer.File[]
): Promise<string[]> => {
  const uploadPromises: Promise<string>[] = files.map((file) => {
    const params: S3.Types.PutObjectRequest = {
      Bucket: process.env.BUCKET_NAME as string,
      Key: file.originalname,
      Body: file.buffer,
    };

    return s3
      .upload(params)
      .promise()
      .then((response: S3.ManagedUpload.SendData) => {
        // Send the file URL using the response or perform any other action
        // console.log("File uploaded successfully. URL:", response.Location);
        return response.Location;
      })
      .catch((error) => {
        console.error("Error uploading file to S3:", error);
        return Promise.reject("Failed to upload file to S3");
      });
  });

  return Promise.all(uploadPromises);
};

export const downloadFileFromS3 = (
  key: string
): Promise<NodeJS.ReadableStream> => {
  const params: S3.Types.GetObjectRequest = {
    Bucket: process.env.BUCKET_NAME as string,
    Key: key,
  };

  return new Promise((resolve, reject) => {
    const stream = s3.getObject(params).createReadStream();
    stream.on("error", (error) => {
      console.error("Error downloading file from S3:", error);
      reject("Failed to download file from S3");
    });
    stream.on("end", () => {
      resolve(stream);
    });
  });
};
