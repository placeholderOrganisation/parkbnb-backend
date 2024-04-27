"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadFilesToS3 = exports.uploadFileToS3 = exports.s3 = void 0;
const s3_client_1 = require("../../clients/s3-client");
exports.s3 = (0, s3_client_1.returnS3Client)();
const uploadFileToS3 = (file) => {
    const params = {
        Bucket: process.env.BUCKET_NAME,
        Key: file.originalname,
        Body: file.buffer,
        ACL: "public-read",
    };
    return exports.s3
        .upload(params)
        .promise()
        .then((response) => {
        // Send the file URL using the response or perform any other action
        // console.log("File uploaded successfully. URL:", response.Location);
        return response.Location;
    })
        .catch((error) => {
        return Promise.reject("Failed to upload file to S3");
    });
};
exports.uploadFileToS3 = uploadFileToS3;
const uploadFilesToS3 = (files) => {
    const uploadPromises = files.map((file) => {
        const params = {
            Bucket: process.env.BUCKET_NAME,
            Key: file.originalname,
            Body: file.buffer,
            ACL: "public-read",
        };
        return exports.s3
            .upload(params)
            .promise()
            .then((response) => {
            // Send the file URL using the response or perform any other action
            // console.log("File uploaded successfully. URL:", response.Location);
            return response.Location;
        })
            .catch((error) => {
            return Promise.reject("Failed to upload file to S3");
        });
    });
    return Promise.all(uploadPromises);
};
exports.uploadFilesToS3 = uploadFilesToS3;
//# sourceMappingURL=s3-utils.js.map