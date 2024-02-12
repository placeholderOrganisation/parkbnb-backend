import ValidationError from "mongoose";
import { User, UserObject } from "../../models/user-model";

/**
 * Save user signing up via google or facebook in the database.
 * @param profile
 * @param done
 * @returns
 */
export const handleSocialMediaSignUp = async (profile: any, done: any) => {
  const userObj: UserObject = assembleNewUserBody(profile);

  const existingUser: UserObject = await User.findOne({ id: userObj.id });

  if (existingUser) {
    console.info("User already exists in the database");
    return done(null, profile);
  } else {
    try {
      const newUser = new User(userObj);

      // Validate the user data before saving
      await newUser.validate();

      // If validation passes, save the user to the database
      await newUser.save();

      console.info("saved user to database");

      return done(null, profile);
    } catch (error) {
      if (error instanceof (ValidationError as any)) {
        // If validation fails, handle the validation error
        console.error("Validation error:", error.message);
      } else {
        // Handle other errors
        console.error("Error saving user to database", error);
      }
      return done(error);
    }
  }
};

const assembleNewUserBody = (profile: any): UserObject => {
  const newUser: UserObject = initializeEmptyUser();
  newUser.id = profile.id;
  newUser.name = profile.displayName;
  newUser.provider = profile.provider;
  newUser.email = profile.emails[0].value;
  newUser.images = profile.photos.map((photo: any) => photo.value);
  newUser.verified = false;

  return newUser;
};

const initializeEmptyUser = (): UserObject => {
  const newUserObject: UserObject = {
    id: "",
    name: "",
    provider: "",
    email: "",
    images: [],
    verified: false,
    contactNumber: "",
    verificationImageLink: [],
  };

  return newUserObject;
};
