import AWS, { S3 } from "aws-sdk";

const s3: S3 = new AWS.S3();

export const uploadToS3 = (file: File): Promise<string> => {
  const params: S3.Types.PutObjectRequest = {
    Bucket: "your-bucket-name",
    Key: file.name,
    Body: file,
  };

return s3
    .upload(params)
    .promise()
    .then((response: S3.ManagedUpload.SendData) => {
        // Send the file URL using the response or perform any other action
        console.log("File uploaded successfully. URL:", response.Location);
        return response.Location;
    })
    .catch((error) => {
        console.error("Error uploading file to S3:", error);
        const errorMessage = "Failed to upload file to S3";
        const statusCode = 500;
        return Promise.reject({ statusCode, errorMessage });
    });
};
