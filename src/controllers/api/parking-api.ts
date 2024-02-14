import express, { Request, Response } from "express";
import Parking, { ParkingObject } from "../../models/parking-model";
import { uploadFileToS3 } from "../utils/s3-utils";

const router = express.Router();

// Route to update a parking given an ID
router.put("/parkings/:id", async (req: Request, res: Response) => {
  try {
    const parkingId = req.params.id;
    const parkingData: ParkingObject = req.body;
    const updatedParking = await Parking.findByIdAndUpdate(
      parkingId,
      parkingData,
      { new: true }
    );
    if (!updatedParking) {
      return res.status(404).json({ error: "Parking not found" });
    }
    res.status(200).json(updatedParking);
  } catch (error) {
    res.status(500).json({ error: "Failed to update parking" });
  }
});


router.post("/parkings", async (req: Request, res: Response) => {
  try {
    const parkingData: ParkingObject = req.body;
    const newParking = await Parking.create(parkingData);
    res.status(201).json(newParking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create parking" });
  }
});

/**
 * test route for me to test the uploadFileToS3 function
 * once verified the uploafdFileToS3 will be used in the create a new parking route
 * 
 * or maybe I should create a sepratae route for uploading files to s3
 */
router.post("/upload", async (req: Request, res: Response) => {
  try {
    const file: File = req.body.file; // Assuming the file is sent as multipart/form-data

    const uploadedFileLocation = await uploadFileToS3(file);
    res.status(200).json({ location: uploadedFileLocation });
  } catch (error) {
    res.status(500).json({ error: "Failed to upload file to S3" });
  }
});

export default router;
