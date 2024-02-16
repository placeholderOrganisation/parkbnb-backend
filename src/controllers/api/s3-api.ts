import multer from "multer";
import { Request, Response, Router } from "express";
import {
  uploadFilesToS3,
  uploadFileToS3,
} from "../utils/s3-utils";

const upload = multer();

export const s3Controller = Router();

s3Controller.post(
  "/upload-single",
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

s3Controller.post(
  "/upload-multiple",
  upload.array("files", 10),
  async (req: Request, res: Response) => {
    try {
      const files: Express.Multer.File[] = req.files as Express.Multer.File[];
      const uploadedFileLocations: String[] = await uploadFilesToS3(files);
      res.status(200).send(uploadedFileLocations);
    } catch (error) {
      res.status(500).json({ error: "Failed to upload files to S3" });
    }
  }
);
