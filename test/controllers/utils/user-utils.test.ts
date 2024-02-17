// @ts-nocheck
import {
  handleSocialMediaSignUp,
  assembleNewUserBody,
  initializeEmptyUser,
  getPartialUserObject
} from "../../../src/controllers/utils/user-utils";
import { User } from "../../../src/models/user-model";

jest.mock("../../../src/models/user-model", () => ({
  User: {
    findOne: jest.fn(),
    validate: jest.fn(),
    create: jest.fn(),
  },
}));

describe("handleSocialMediaSignUp", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should save user when validation passes", async () => {
    // Mock profile data
    const profile = {
      id: "1",
      displayName: "John Doe",
      provider: "google",
      emails: [{ value: "" }],
      photos: [{ value: "image1.jpg" }],
    };

    // Mock done callback
    const done = jest.fn();

    // Call the function
    await handleSocialMediaSignUp(profile, done);

    expect(User.findOne).toHaveBeenCalledWith({ id: "1" });
    expect(User.validate).toHaveBeenCalledTimes(1);
    expect(User.create).toHaveBeenCalledTimes(1);
  });

  it("should return error if validation fails", async () => {
    // Mock profile data
    const profile = {
      id: "3",
      displayName: "John Doe",
      provider: "google",
      emails: [{ value: "" }],
      photos: [{ value: "image1.jpg" }],
    };

    // Mock done callback
    const done = jest.fn();

    // Mock validation error
    User.validate.mockRejectedValue("Validation error");

    // Call the function
    await handleSocialMediaSignUp(profile, done);

    expect(User.findOne).toHaveBeenCalledWith({ id: "3" });
    expect(User.validate).toHaveBeenCalledTimes(1);
    expect(User.create).not.toHaveBeenCalled();
    expect(done).toHaveBeenCalledWith("Validation error");
  });

  it("should return if user already exists", async () => {
    // Mock profile data
    const profile = {
      id: "2",
      displayName: "John Doe",
      provider: "google",
      emails: [{ value: "" }],
      photos: [{ value: "image1.jpg" }],
    };

    // Mock done callback
    const done = jest.fn();

    // Mock existing user
    User.findOne.mockResolvedValue({ id: "2" });

    // Call the function
    await handleSocialMediaSignUp(profile, done);

    expect(User.findOne).toHaveBeenCalledWith({ id: "2" });
    expect(User.validate).not.toHaveBeenCalled();
    expect(User.create).not.toHaveBeenCalled();
  });
});

describe("assembleNewUserBody", () => {
  it("should return a new user object which passes verification", () => {
    const profile = {
      id: "1",
      displayName: "John Doe",
      provider: "google",
      emails: [{ value: "" }],
      photos: [{ value: "image1.jpg" }],
    };

    const newUser = assembleNewUserBody(profile);

    expect(newUser).toEqual({
      id: "1",
      name: "John Doe",
      provider: "google",
      email: "",
      images: ["image1.jpg"],
      verified: false,
    });
  });
});

describe("initializeEmptyUser", () => {
  it("should return an empty user object which can pass verification", () => {
    const newUser = initializeEmptyUser();

    expect(newUser).toEqual({
      id: "",
      name: "",
      provider: "",
      email: "",
      images: [],
      verified: false,
    });
  });
});

describe("getPartialUserObject", () => {
  it("should return a partial user object", () => {
    const user2 = {
      id: 2,
      name: "sid ahluwalia",
      provider: "facebook",
      email: "s@g.com",
      images: ["https://www.google.com"],
      verified: true,
      contactNumber: "+16478634180",
      verification_img: ["https://www.google.com"],
    };

    const partialUser = getPartialUserObject(user2);

    expect(partialUser).toEqual({
      name: "sid ahluwalia",
      images: ["https://www.google.com"],
      verified: true,
      contactNumber: "+16478634180",
    });
  });

  it("should return a partial user object with null contactNumber", () => {
    const user2 = {
      id: 2,
      name: "sid ahluwalia",
      provider: "facebook",
      email: "s@g.com",
      images: ["https://www.google.com"],
      verified: true,
      verification_img: ["https://www.google.com"],
    };

    const partialUser = getPartialUserObject(user2);

    expect(partialUser).toEqual({
      name: "sid ahluwalia",
      images: ["https://www.google.com"],
      verified: true,
      contactNumber: null,
    });
  });
});
