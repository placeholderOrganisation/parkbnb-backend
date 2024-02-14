import express, { Request, Response } from "express";
import Parking, { ParkingObject } from "../../models/parking-model";
import {
  PartialParkingObject,
  getPartialParkings,
} from "../utils/parking-utils";

export const parkingController = express.Router();

// Route to get all parkings which are is_available
parkingController.get("/parkings", async (req: Request, res: Response) => {
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
  }
});

// Route to get a parking given an ID
parkingController.get("/parkings/:id", async (req: Request, res: Response) => {
  try {
    const parkingId = req.params.id;
    const parking: ParkingObject | null = await Parking.findById(parkingId);
    if (!parking) {
      return res.status(404).json({ error: "Parking not found" });
    }
    res.status(200).json(parking);
  } catch (error) {
    res.status(500).json({ error: "Failed to get parking" });
  }
});

// Route to update a parking given an ID
parkingController.put("/parkings/:id", async (req: Request, res: Response) => {
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

parkingController.post("/parkings", async (req: Request, res: Response) => {
  try {
    const parkingData: ParkingObject = req.body;
    const newParking = await Parking.create(parkingData);
    res.status(201).json(newParking);
  } catch (error) {
    res.status(500).json({ error: "Failed to create parking" });
  }
});
