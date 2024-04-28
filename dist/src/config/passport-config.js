"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const passport_google_oauth20_1 = require("passport-google-oauth20");
const passport_facebook_1 = require("passport-facebook");
const passport_local_1 = require("passport-local");
const user_utils_1 = require("../controllers/utils/user-utils");
passport_1.default.use(new passport_google_oauth20_1.Strategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.SERVER_URL}/v1/auth/google/callback`,
}, function (accessToken, refreshToken, profile, done) {
    /**
     * check if user exists in the database
     * if user exists, return the user
     * if user does not exist, create a new user and return the user
     */
    (0, user_utils_1.handleSocialMediaSignUp)(profile, done);
}));
passport_1.default.use(new passport_facebook_1.Strategy({
    clientID: process.env.FACEBOOK_APP_ID,
    clientSecret: process.env.FACEBOOK_APP_SECRET,
    callbackURL: `${process.env.SERVER_URL}/v1/auth/facebook/callback`,
    profileFields: ["id", "email", "displayName", "photos"],
}, function (accessToken, refreshToken, profile, done) {
    /**
     * check if user exists in the database
     * if user exists, return the user
     * if user does not exist, create a new user and return the user
     */
    (0, user_utils_1.handleSocialMediaSignUp)(profile, done);
}));
passport_1.default.use(new passport_local_1.Strategy({ usernameField: "userEmail" }, function (userEmail, password, done) {
    (0, user_utils_1.handleRegularSignIn)(userEmail, password, done);
}));
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((user, done) => {
    done(null, user);
});
//# sourceMappingURL=passport-config.js.map