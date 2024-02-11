import ValidationError from "mongoose";
import { User } from "../models/user-model";

export const saveUserInDB = async (profile: any, done: any) => {

  const userObj = _extractUserData(profile);

  const newUser = new User(userObj);

  try {
    // Validate the user data before saving
    await newUser.validate();

    // If validation passes, save the user to the database
    await newUser.save();
    console.info("saved user to database");
  } catch (error) {
    if (error instanceof (ValidationError as any)) {
      // If validation fails, handle the validation error
      console.error("Validation error:", error.message);
    } else {
      // Handle other errors
      console.error("Error saving user to database", error);
    }
  }

  done(null, profile);
};

const _extractUserData = (profile: any) => {
  const id = profile.id;
  const name = profile.displayName;
  const email = profile.emails[0].value;
  const images = profile.photos.map((photo: any) => photo.value);

  return { id, name, email, images };
}