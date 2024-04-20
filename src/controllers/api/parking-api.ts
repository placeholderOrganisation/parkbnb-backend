import express, { Request, Response } from "express";
import { Parking, ParkingObject } from "../../models/parking-model";
import {
  PartialParkingObject,
  RequestParkingObject,
  assembleNewParkingBody,
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

    // return neccessary data
    res.status(200).json(partialParkings);
  } catch (error) {
    res.status(500).json({ message: "Failed to get parkings" });
  }
});

// Route to get a parking given an ID
parkingController.get("/:id", async (req: Request, res: Response) => {
  try {
    const parkingId = req.params.id;
    const parking: ParkingObject | null = await Parking.findOne({
      _id: parkingId,
    });
    if (!parking) {
      return res.status(404).json({ message: "Parking not found" });
    }
    res.status(200).json(parking);
  } catch (error) {
    res.status(500).json({ message: "Failed to get parking" });
  }
});

// Route to update a parking given an ID
parkingController.put("/:id", async (req: Request, res: Response) => {
  try {
    const parkingId = req.params.id;
    const parkingData: RequestParkingObject = req.body;
    if (!parkingData || Object.keys(parkingData).length === 0 || parkingData.owner_id) {
      return res.status(400).json({ message: "Parking data is required" });
    }
    const updatedParking: ParkingObject | null = await Parking.findOneAndUpdate(
      { id: parkingId },
      parkingData,
      { new: true }
    );
    if (!updatedParking) {
      return res.status(404).json({ message: "Parking not found" });
    }
    res.status(200).json(updatedParking);
  } catch (error) {
    res.status(500).json({ message: "Failed to update parking" });
  }
});

parkingController.post("/", async (req: Request, res: Response) => {
  const parkingData: ParkingObject = req.body;
  try {
    if (!parkingData || Object.keys(parkingData).length === 0) {
      return res.status(400).json({ message: "Parking data is required" });
    }
    const parkingObj: ParkingObject = assembleNewParkingBody(parkingData);
    await Parking.validate(parkingObj);
    const newParking = await Parking.create(parkingObj);
    res.status(201).json(newParking);
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Failed to create parking", error });
  }
});
