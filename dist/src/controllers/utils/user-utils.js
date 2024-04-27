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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.hashPassword = exports.getPartialUserObject = exports.initializeEmptyUser = exports.assembleNewUserBody = exports.handleRegularSignIn = exports.handleSocialMediaSignUp = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const uuid_1 = require("uuid");
const user_model_1 = require("../../models/user-model");
/**
 * Save user signing up via google or facebook in the database.
 * @param profile
 * @param done
 * @returns
 */
const handleSocialMediaSignUp = (profile, done) => __awaiter(void 0, void 0, void 0, function* () {
    const userObj = (0, exports.assembleNewUserBody)(profile);
    const existingUser = yield user_model_1.User.findOne({ id: userObj.id });
    if (existingUser) {
        const partialUser = (0, exports.getPartialUserObject)(existingUser);
        return done(null, partialUser);
    }
    else {
        try {
            // Validate the user data before saving
            yield user_model_1.User.validate(userObj);
            const newUser = yield user_model_1.User.create(userObj);
            const partialUser = (0, exports.getPartialUserObject)(newUser);
            return done(null, partialUser);
        }
        catch (error) {
            return done(error);
        }
    }
});
exports.handleSocialMediaSignUp = handleSocialMediaSignUp;
// TODO: Add Tests
const handleRegularSignIn = (email, password, done) => __awaiter(void 0, void 0, void 0, function* () {
    const existingUser = yield user_model_1.User.findOne({ email: email });
    if (existingUser) {
        const isPasswordCorrect = yield bcrypt_1.default.compare(password, existingUser.passwordHash);
        if (isPasswordCorrect) {
            const partialUser = (0, exports.getPartialUserObject)(existingUser);
            return done(null, partialUser);
        }
        else {
            return done(null, false);
        }
    }
    else {
        // User not found
        console.error("User not found with email: email");
        return done(null, false);
    }
});
exports.handleRegularSignIn = handleRegularSignIn;
const assembleNewUserBody = (profile) => {
    var _a;
    const newUser = (0, exports.initializeEmptyUser)();
    let email = "";
    if (profile.provider === "facebook" || profile.provider === "google") {
        email = profile.emails ? profile.emails[0].value : "no email found";
    }
    else {
        email = profile.userEmail;
    }
    newUser.id = profile.id || (0, uuid_1.v4)();
    newUser.name = profile.displayName;
    newUser.provider = profile.provider || "local";
    newUser.email = email;
    newUser.images = ((_a = profile.photos) === null || _a === void 0 ? void 0 : _a.map((photo) => photo.value)) || [];
    newUser.verified = false;
    if (profile.passwordHash) {
        newUser.passwordHash = profile.passwordHash;
    }
    return newUser;
};
exports.assembleNewUserBody = assembleNewUserBody;
const initializeEmptyUser = () => {
    const newUserObject = {
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
exports.initializeEmptyUser = initializeEmptyUser;
const getPartialUserObject = (user) => {
    const partialUser = {
        id: user.id,
        name: user.name,
        images: user.images,
        verified: user.verified,
        contactNumber: user.contactNumber || null,
    };
    return partialUser;
};
exports.getPartialUserObject = getPartialUserObject;
// TODO: Add Tests
const hashPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const saltRounds = 10;
        const hashedPassword = yield bcrypt_1.default.hash(password, saltRounds);
        return hashedPassword;
    }
    catch (error) {
        return password;
    }
});
exports.hashPassword = hashPassword;
//# sourceMappingURL=user-utils.js.map