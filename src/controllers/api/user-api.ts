import express, { Request, Response } from "express";
import {
  assembleNewUserBody,
  getPartialUserObject,
  hashPassword,
} from "../utils/user-utils";
import {
  PartialUserObject,
  RequestUserObject,
  User,
  UserObject,
  UserSignupRequestObject,
} from "../../models/user-model";

export const userController = express.Router();

// Route to create a new User
userController.post("/sign-up", async (req: Request, res: Response) => {
  const userData: UserSignupRequestObject = req.body;

  if (!userData || Object.keys(userData).length === 0) {
    return res.status(400).json({ message: "User data is required" });
  }

  const passwordHash = await hashPassword(userData.password);
  const userObj: UserObject = assembleNewUserBody({
    ...userData,
    passwordHash,
  });
  try {
    const existingUser = await User.findOne({ email: userObj.email });

    // If user already exists, return an error
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate the user data before saving
    await User.validate(userObj);

    const newUser: UserObject = await User.create(userObj);
    const partialUser: PartialUserObject = getPartialUserObject(newUser);
    res.status(201).json(partialUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to update a User given an ID
userController.put("/:id", async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const userData: RequestUserObject = req.body;
    if (!userData || Object.keys(userData).length === 0 || userData.id) {
      return res.status(400).json({ message: "User data is required" });
    }
    const updatedUser: UserObject | null = await User.findOneAndUpdate(
      { id: userId },
      userData,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    const partialUser: PartialUserObject = getPartialUserObject(updatedUser);
    res.status(200).json(partialUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

// Route to get a User given an ID
userController.get("/:id", async (req: Request, res: Response) => {
  const userId = req.params.id;
  if (!userId || userId === "") {
    return res.status(400).json({ message: "Missing required fields" });
  }
  try {
    const user: UserObject | null = await User.findOne({ id: userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const partialUser: PartialUserObject = getPartialUserObject(user);
    res.status(200).json(partialUser);
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});
