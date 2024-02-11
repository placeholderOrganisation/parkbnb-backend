require("dotenv").config();

import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";

import { saveUserInDB } from "./utils";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.CLIENT_URL}/v1/auth/google/callback`,
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) {
      /**
       * check if user exists in the database
       * if user exists, return the user
       * if user does not exist, create a new user and return the user
       */
      saveUserInDB(profile, done);
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: process.env.FACEBOOK_APP_ID,
      clientSecret: process.env.FACEBOOK_APP_SECRET,
      callbackURL: `${process.env.CLIENT_URL}/v1/auth/facebook/callback`,
      profileFields: ["id", "email", "displayName", "photos"],
    },
    function (
      accessToken: string,
      refreshToken: string,
      profile: any,
      done: any
    ) {
      /**
       * check if user exists in the database
       * if user exists, return the user
       * if user does not exist, create a new user and return the user
       */
      saveUserInDB(profile, done);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});
