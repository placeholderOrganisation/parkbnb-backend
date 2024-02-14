import express, { Request, Response } from "express";
import Parking, { ParkingObject } from "../../models/parking-model";

export const parkingController = express.Router();

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
