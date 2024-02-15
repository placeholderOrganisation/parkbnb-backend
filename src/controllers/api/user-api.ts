import { Router } from "express";
import { User } from "../../models/user-model";

export const userController = Router();

// Complete sign up route
userController.put("/complete-sign-up", async (req, res) => {

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
            return res.status(400).json({ message: "User already completed sign up" });
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

