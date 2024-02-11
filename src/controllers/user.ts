import { Router } from "express";
import { User } from "../models/user-model";
export const userController = Router();

// Update user route
userController.put("/complete-sign-up", async (req, res) => {

    const { id, contactInfo } = req.body;

    try {
        // Find the user by ID
        const existingUser = await User.findOne({ id });

        if (!existingUser) {
            return res.status(404).json({ message: "User not found" });
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

