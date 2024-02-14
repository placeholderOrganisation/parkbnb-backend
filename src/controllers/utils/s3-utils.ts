import AWS, { S3 } from "aws-sdk";
import { returnS3Client } from "../../clients/s3-client";

const s3: S3 = returnS3Client();

export const uploadFileToS3 = (file: File): Promise<string> => {
  const params: S3.Types.PutObjectRequest = {
    Bucket: "parkbnb-test",
    Key: file.name,
    Body: file,
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
