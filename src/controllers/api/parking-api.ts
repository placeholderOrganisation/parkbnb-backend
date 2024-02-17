import express, { Request, Response } from "express";
import { Parking, ParkingObject } from "../../models/parking-model";
import {
  PartialParkingObject,
  RequestParkingObject,
  getPartialParkings,
} from "../utils/parking-utils";

export const parkingController = express.Router();

// Route to get all parkings which are is_available
parkingController.get("/", async (req: Request, res: Response) => {
  try {
    const parkings: ParkingObject[] = await Parking.find({
      is_available: true,
    });
    const partialParkings: PartialParkingObject[] = getPartialParkings(
      parkings
    );

    res.status(200).json(partialParkings);
  } catch (error) {
    res.status(500).json({ error: "Failed to get parkings" });
    throw error; // Add this line
  }
});

// Route to get a parking given an ID
parkingController.get("/:id", async (req: Request, res: Response) => {
  try {
    const parkingId = req.params.id;
    const parking: ParkingObject | null = await Parking.findOne({
      id: parkingId,
    });
    if (!parking) {
      return res.status(404).json({ error: "Parking not found" });
    }
    res.status(200).json(parking);
  } catch (error) {
    res.status(500).json({ error: "Failed to get parking" });
  }
});

// Route to update a parking given an ID
parkingController.put("/:id", async (req: Request, res: Response) => {
  try {
    const parkingId = req.params.id;
    const parkingData: RequestParkingObject = req.body;
    const updatedParking = await Parking.findOneAndUpdate(
      { id: parkingId },
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

parkingController.post("/", async (req: Request, res: Response) => {
  try {
    const parkingData: ParkingObject = req.body;
    await Parking.validate(parkingData);
    const newParking = await Parking.create(parkingData);
    res.status(201).json(newParking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create parking" });
    throw error; // Add this line
  }
});
