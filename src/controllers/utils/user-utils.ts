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
    return done(null, profile);
  } else {
    try {
      // Validate the user data before saving
      await User.validate(userObj);

      await User.create(userObj);

      return done(null, profile);
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
