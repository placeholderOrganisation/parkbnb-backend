import express, { Request, Response } from "express";
import { PartialUserObject, User } from "../../models/user-model";

export const userController = express.Router();

// Complete sign up route
userController.put("/complete-sign-up", async (req: Request, res: Response) => {
  const { id, contactInfo } = req.body;

  if (!id || !contactInfo) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  try {
    // Find the user by ID
    const existingUser = await User.findOne({ id });

    if (!existingUser) {
      return res.status(404).json({ message: "User not found" });
    }

    if (existingUser.contactNumber) {
      return res
        .status(400)
        .json({ message: "User already completed sign up" });
    }

    // Update the user's contact information
    existingUser.contactNumber = contactInfo;

    // Save the updated user
    await existingUser.save();

    res.status(204).json({ message: "User updated successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get a User given an ID
userController.get("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const user: PartialUserObject | null = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ error: "Failed to get parking" });
  }
});
