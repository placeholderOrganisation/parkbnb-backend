import mongoose, { Error, Mongoose } from "mongoose";

let db: Mongoose;
const uri: string =
  "mongodb+srv://admin:1IyDaSFqqN3c0hSs@parkbnb.ermevwo.mongodb.net/?retryWrites=true&w=majority";

/*
    @info   : This application implements singleton design pattern to have only 1 db conn
    @input  :
    @return : (db object) return the db connection
*/
export const getDbConnection = () => {
  if (!db) {
    mongoose
      .connect(uri)
      .then((response: Mongoose) => {
        console.log("Connected to MongoDB");
        db = response;
      })
      .catch((err: Error) => console.error("Could not connect to MongoDB"));
  }
  return db;
};
