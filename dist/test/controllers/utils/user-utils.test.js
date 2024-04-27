"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const user_utils_1 = require("../../../src/controllers/utils/user-utils");
const user_model_1 = require("../../../src/models/user-model");
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
    it("should save user when validation passes", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock done callback
        const done = jest.fn();
        // Call the function
        yield (0, user_utils_1.handleSocialMediaSignUp)(testPassportProfile, done);
        expect(user_model_1.User.findOne).toHaveBeenCalledWith({ id: testPassportProfile.id });
        expect(user_model_1.User.validate).toHaveBeenCalledTimes(1);
        expect(user_model_1.User.create).toHaveBeenCalledTimes(1);
    }));
    it("should return error if validation fails", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock done callback
        const done = jest.fn();
        // Mock validation error
        user_model_1.User.validate.mockRejectedValue("Validation error");
        // Call the function
        yield (0, user_utils_1.handleSocialMediaSignUp)(testPassportProfile, done);
        expect(user_model_1.User.findOne).toHaveBeenCalledWith({ id: testPassportProfile.id });
        expect(user_model_1.User.validate).toHaveBeenCalledTimes(1);
        expect(user_model_1.User.create).not.toHaveBeenCalled();
        expect(done).toHaveBeenCalledWith("Validation error");
    }));
    it("should return if user already exists", () => __awaiter(void 0, void 0, void 0, function* () {
        // Mock done callback
        const done = jest.fn();
        // Mock existing user
        user_model_1.User.findOne.mockResolvedValue({ id: testPassportProfile.id });
        // Call the function
        yield (0, user_utils_1.handleSocialMediaSignUp)(testPassportProfile, done);
        expect(user_model_1.User.findOne).toHaveBeenCalledWith({ id: testPassportProfile.id });
        expect(user_model_1.User.validate).not.toHaveBeenCalled();
        expect(user_model_1.User.create).not.toHaveBeenCalled();
    }));
});
describe("assembleNewUserBody", () => {
    it("should return a new user object which passes verification", () => {
        const newUser = (0, user_utils_1.assembleNewUserBody)(testPassportProfile);
        expect(newUser).toEqual(testUser);
    });
});
describe("initializeEmptyUser", () => {
    it("should return an empty user object which can pass verification", () => {
        const newUser = (0, user_utils_1.initializeEmptyUser)();
        expect(newUser).toEqual(emptyTestUser);
    });
});
describe("getPartialUserObject", () => {
    it("should return a partial user object", () => {
        const partialUser = (0, user_utils_1.getPartialUserObject)(testUser2);
        expect(partialUser).toEqual(testUser2Partial);
    });
    it("should return a partial user object with null contactNumber", () => {
        const partialUser = (0, user_utils_1.getPartialUserObject)(testUser3);
        expect(partialUser).toEqual(testUser3Partial);
    });
});
//# sourceMappingURL=user-utils.test.js.map