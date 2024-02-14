import { Request, Response, Router } from "express";
const multer = require("multer");
import { uploadFileToS3, downloadFileFromS3 } from "../utils/s3-utils";

const upload = multer();

export const s3Controller = Router();

s3Controller.get("/images/:key", async (req: Request, res: Response) => {
  try {
    const key = req.params.key;
    const readStream: NodeJS.ReadableStream = await downloadFileFromS3(key);
    
    readStream.pipe(res);
  } catch (error) {
    res.status(500).json({ error: "Failed to download file from S3" });
  }
});

/**
 * test route for me to test the uploadFileToS3 function
 * once verified the uploafdFileToS3 will be used in the create a new parking route
 *
 * or maybe I should create a sepratae route for uploading files to s3
 */
s3Controller.post(
  "/upload",
  upload.single("file"),
  async (req: Request, res: Response) => {
    try {
      const file: Express.Multer.File = req.file; // Assuming the file is sent as multipart/form-data
      const uploadedFileLocation: String = await uploadFileToS3(file);
      res.status(200).send(uploadedFileLocation);
    } catch (error) {
      res.status(500).json({ error: "Failed to upload file to S3" });
    }
  }
);
