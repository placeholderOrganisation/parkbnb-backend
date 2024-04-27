"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.returnS3Client = void 0;
const aws_sdk_1 = __importDefault(require("aws-sdk"));
// Configure AWS credentials and region
aws_sdk_1.default.config.update({
    accessKeyId: process.env.ACCESS_KEY_ID,
    secretAccessKey: process.env.SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION,
});
// Create an S3 client
let s3 = null;
/*
    @info   : This application implements singleton design pattern to have only 1 S3 conn
    @input  :
    @return : (S3 object) return the S3 connection
*/
const returnS3Client = () => {
    if (!s3) {
        try {
            s3 = new aws_sdk_1.default.S3();
        }
        catch (error) {
            // Handle the error here
            console.error("Error creating S3 client:", error);
            throw error;
        }
    }
    return s3;
};
exports.returnS3Client = returnS3Client;
//# sourceMappingURL=s3-client.js.map