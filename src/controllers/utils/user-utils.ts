import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { DoneCallback, Profile } from "passport";
import {
  AssembleNewUserBodyObject,
  PartialUserObject,
  User,
  UserObject,
} from "../../models/user-model";

/**
 * Save user signing up via google or facebook in the database.
 * @param profile
 * @param done
 * @returns
 */
export const handleSocialMediaSignUp = async (
  profile: Profile,
  done: DoneCallback
) => {
  const userObj: UserObject = assembleNewUserBody(
    (profile as unknown) as AssembleNewUserBodyObject
  );

  const existingUser = await User.findOne({ id: userObj.id });

  if (existingUser) {
    const partialUser: PartialUserObject = getPartialUserObject(existingUser);
    return done(null, partialUser);
  } else {
    try {
      // Validate the user data before saving
      await User.validate(userObj);

      const newUser = await User.create(userObj);
      
      const partialUser: PartialUserObject = getPartialUserObject(newUser);
      return done(null, partialUser);
    } catch (error) {
      return done(error);
    }
  }
};

// TODO: Add Tests
export const handleRegularSignIn = async (
  email: string,
  password: string,
  done: DoneCallback
) => {
  const existingUser = await User.findOne({ email: email });

  if (existingUser) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (isPasswordCorrect) {
      const partialUser: PartialUserObject = getPartialUserObject(existingUser);
      return done(null, partialUser);
    } else {
      return done(null, false);
    }
  } else {
    // User not found
    console.error("User not found with email: email");
    return done(null, false);
  }
};

export const assembleNewUserBody = (
  profile: AssembleNewUserBodyObject
): UserObject => {
  const newUser: UserObject = initializeEmptyUser();

  let email = "";
  if (profile.provider === "facebook" || profile.provider === "google") {
    email = profile.emails ? profile.emails[0].value : "no email found";
  } else {
    email = profile.userEmail;
  }

  newUser.id = profile.id || uuid();
  newUser.name = profile.displayName;
  newUser.provider = profile.provider || "local";
  newUser.email = email;
  newUser.images = profile.photos?.map((photo: any) => photo.value) || [];
  newUser.verified = false;

  if (profile.passwordHash) {
    newUser.passwordHash = profile.passwordHash;
  }

  return newUser;
};

export const initializeEmptyUser = (): UserObject => {
  const newUserObject: UserObject = {
    id: "",
    name: "",
    provider: "",
    email: "",
    images: [],
    verified: false,
    contactNumber: "",
  };

  return newUserObject;
};

export const getPartialUserObject = (user: UserObject): PartialUserObject => {
  const partialUser: PartialUserObject = {
    id: user.id,
    name: user.name,
    images: user.images,
    verified: user.verified,
    contactNumber: user.contactNumber || null,
  };

  return partialUser;
};

// TODO: Add Tests
export const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    return password;
  }
};
