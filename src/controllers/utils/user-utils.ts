import bcrypt from "bcrypt";
import { v4 as uuid } from "uuid";
import { DoneCallback, Profile } from "passport";
import { PartialUserObject, User, UserObject } from "../../models/user-model";

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
  const userObj: UserObject = assembleNewUserBody(profile);

  const existingUser = await User.findOne({ id: userObj.id });

  if (existingUser) {
    return done(null, existingUser);
  } else {
    try {
      // Validate the user data before saving
      await User.validate(userObj);

      const newUser = await User.create(userObj);

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
};

// TODO: Add Tests
export const handleRegularSignUp = async (
  email: string,
  password: string,
  done: DoneCallback
) => {
  const newProfile: Profile = {
    id: uuid(),
    displayName: email,
    provider: "local",
    emails: [{ value: email }],
    photos: [],
  };
  const userObj: UserObject = assembleNewUserBody(newProfile);

  const existingUser = await User.findOne({ email: userObj.email });

  if (existingUser) {
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );
    if (isPasswordCorrect) {
      return done(null, existingUser);
    } else {
      return done(null, false);
    }
  } else {
    try {
      const passwordHash: string = (await hashPassword(password)) || password;
      userObj.passwordHash = passwordHash;

      // Validate the user data before saving
      await User.validate(userObj);

      const newUser = await User.create(userObj);

      return done(null, newUser);
    } catch (error) {
      return done(error);
    }
  }
};

export const assembleNewUserBody = (profile: Profile): UserObject => {
  const newUser: UserObject = initializeEmptyUser();
  newUser.id = profile.id;
  newUser.name = profile.displayName;
  newUser.provider = profile.provider;
  newUser.email = profile.emails[0].value;
  newUser.images = profile.photos.map((photo: any) => photo.value);
  newUser.verified = false;

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
  };

  return newUserObject;
};

export const getPartialUserObject = (user: UserObject): PartialUserObject => {
  const partialUser: PartialUserObject = {
    name: user.name,
    images: user.images,
    verified: user.verified,
    contactNumber: user.contactNumber || null,
  };

  return partialUser;
};

// TODO: Add Tests
const hashPassword = async (password: string): Promise<string> => {
  try {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
  } catch (error) {
    return password;
  }
};
