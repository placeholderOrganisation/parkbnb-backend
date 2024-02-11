import { Mongoose } from "mongoose";
import { getDbConnection } from "./db";

const client: Mongoose = getDbConnection();

export const saveUserInDB = (profile: any, done: any) => {
  // extract display name
  // extract email
  // extract photos
  // extract id

  // insert into user collection/document
  console.log("profile", profile);
  done(null, profile);
};
