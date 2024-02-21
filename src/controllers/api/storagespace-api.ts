import express, { Request, Response } from "express";
import {
  StorageSpace,
  StorageSpaceObject,
} from "../../models/storagespace-model";
import {
  PartialStorageSpaceObject,
  RequestStorageSpaceObject,
  getPartialStorageSpaces,
} from "../utils/storagespace-utils";

export const storageSpaceController = express.Router();

// Route to get all storagespaces which are is_available
storageSpaceController.get("/", async (req: Request, res: Response) => {
  try {
    const storageSpaces: StorageSpaceObject[] = await StorageSpace.find({
      is_available: true,
    });
    const partialStorageSpaces: PartialStorageSpaceObject[] = getPartialStorageSpaces(
        storageSpaces
    );

    res.status(200).json(partialStorageSpaces);
  } catch (error) {
    res.status(500).json({ message: "Failed to get storage spaces" });
  }
});

// Route to get a parking given an ID
storageSpaceController.get("/:id", async (req: Request, res: Response) => {
  try {
    const storageSpaceId = req.params.id;
    const storageSpace: StorageSpaceObject | null = await StorageSpace.findOne({
      id: storageSpaceId,
    });
    if (!storageSpace) {
      return res.status(404).json({ message: "storage space not found" });
    }
    res.status(200).json(storageSpace);
  } catch (error) {
    res.status(500).json({ message: "Failed to get storage space" });
  }
});

// Route to update a parking given an ID
storageSpaceController.put("/:id", async (req: Request, res: Response) => {
  try {
    const storageSpaceId = req.params.id;
    const storageSpaceData: RequestStorageSpaceObject = req.body;
    if (!storageSpaceData || Object.keys(storageSpaceData).length === 0) {
      return res.status(400).json({ message: "storage space data is required" });
    }
    const updatedStorageSpace: StorageSpaceObject | null = await StorageSpace.findOneAndUpdate(
      { id: storageSpaceId },
      storageSpaceData,
      { new: true }
    );
    if (!updatedStorageSpace) {
      return res.status(404).json({ message: "storage space not found" });
    }
    res.status(200).json(updatedStorageSpace);
  } catch (error) {
    res.status(500).json({ message: "Failed to update storage space" });
  }
});

storageSpaceController.post("/", async (req: Request, res: Response) => {
  try {
    const storageSpaceData: StorageSpaceObject = req.body;
    if (!storageSpaceData || Object.keys(storageSpaceData).length === 0) {
      return res.status(400).json({ message: "storage space data is required" });
    }
    await StorageSpace.validate(storageSpaceData);
    const newStorageSpace = await StorageSpace.create(storageSpaceData);
    res.status(201).json(newStorageSpace);
  } catch (error) {
    res.status(500).json({ message: "Failed to create storage space" });
  }
});
