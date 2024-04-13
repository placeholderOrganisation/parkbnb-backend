// @ts-nocheck
import {
  handleSocialMediaSignUp,
  assembleNewUserBody,
  initializeEmptyUser,
  getPartialUserObject,
} from "../../../src/controllers/utils/user-utils";
import { User } from "../../../src/models/user-model";

jest.mock("../../../src/models/user-model", () => ({
  User: {
    findOne: jest.fn(),
    validate: jest.fn(),
    create: jest.fn(),
  },
}));

const testPassportProfile = {
  id: "1",
  displayName: "John Doe",
  provider: "google",
  emails: [{ value: "" }],
  photos: [{ value: "image1.jpg" }],
};

const testUser = {
  id: "1",
  name: "John Doe",
  provider: "google",
  email: "",
  images: ["image1.jpg"],
  verified: false,
  contactNumber: "",
};

const emptyTestUser = {
  id: "",
  name: "",
  provider: "",
  email: "",
  images: [],
  verified: false,
  contactNumber: "",
};

const testUser2 = {
  id: 2,
  name: "sid ahluwalia",
  provider: "facebook",
  email: "s@g.com",
  images: ["https://www.google.com"],
  verified: true,
  contactNumber: "+11234567890",
  verification_img: ["https://www.google.com"],
};

const testUser2Partial = {
  id: 2,
  name: "sid ahluwalia",
  images: ["https://www.google.com"],
  verified: true,
  contactNumber: "+11234567890",
};

const testUser3 = {
  id: 2,
  name: "sid ahluwalia",
  provider: "facebook",
  email: "s@g.com",
  images: ["https://www.google.com"],
  verified: true,
  verification_img: ["https://www.google.com"],
};

const testUser3Partial = {
  id: 2,
  name: "sid ahluwalia",
  images: ["https://www.google.com"],
  verified: true,
  contactNumber: null,
};

describe("handleSocialMediaSignUp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save user when validation passes", async () => {
    // Mock done callback
    const done = jest.fn();

    // Call the function
    await handleSocialMediaSignUp(testPassportProfile, done);

    expect(User.findOne).toHaveBeenCalledWith({ id: testPassportProfile.id });
    expect(User.validate).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledTimes(1);
  });

  it("should return error if validation fails", async () => {
    // Mock done callback
    const done = jest.fn();

    // Mock validation error
    User.validate.mockRejectedValue("Validation error");

    // Call the function
    await handleSocialMediaSignUp(testPassportProfile, done);

    expect(User.findOne).toHaveBeenCalledWith({ id: testPassportProfile.id });
    expect(User.validate).toHaveBeenCalledTimes(1);
    expect(User.create).not.toHaveBeenCalled();
    expect(done).toHaveBeenCalledWith("Validation error");
  });

  it("should return if user already exists", async () => {
    // Mock done callback
    const done = jest.fn();

    // Mock existing user
    User.findOne.mockResolvedValue({ id: testPassportProfile.id });

    // Call the function
    await handleSocialMediaSignUp(testPassportProfile, done);

    expect(User.findOne).toHaveBeenCalledWith({ id: testPassportProfile.id });
    expect(User.validate).not.toHaveBeenCalled();
    expect(User.create).not.toHaveBeenCalled();
  });
});

describe("assembleNewUserBody", () => {
  it("should return a new user object which passes verification", () => {
    const newUser = assembleNewUserBody(testPassportProfile);

    expect(newUser).toEqual(testUser);
  });
});

describe("initializeEmptyUser", () => {
  it("should return an empty user object which can pass verification", () => {
    const newUser = initializeEmptyUser();

    expect(newUser).toEqual(emptyTestUser);
  });
});

describe("getPartialUserObject", () => {
  it("should return a partial user object", () => {
    const partialUser = getPartialUserObject(testUser2);

    expect(partialUser).toEqual(testUser2Partial);
  });

  it("should return a partial user object with null contactNumber", () => {
    const partialUser = getPartialUserObject(testUser3);

    expect(partialUser).toEqual(testUser3Partial);
  });
});
