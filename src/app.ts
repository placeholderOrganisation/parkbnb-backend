require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cookieSession from "cookie-session";

// Passport + mongoose configuration
import * as passportConfig from "./config/passport-config";
import { returnDbClient } from "./clients/db-client";
returnDbClient();

// Controllers (route handlers)
import { authController } from "./controllers/api/auth-api";
import { userController } from "./controllers/api/user-api";
import { parkingController } from "./controllers/api/parking-api";
import { storageSpaceController } from "./controllers/api/storagespace-api";

// @ts-ignore
import { s3Controller } from "./controllers/api/s3-api";
import { mapBoxController } from "./controllers/api/mapbox-api";

// Create Express server
const app = express();

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SECRET],
    maxAge: 24 * 60 * 60 * 100,
  })
);

// Express configuration
app.set("port", process.env.PORT || 3001);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize(passportConfig));
app.use(passport.session());

app.use("/v1/auth", authController);
app.use("/v1/user", userController);
app.use("/v1/parking", parkingController);
app.use("/v1/storagespace", storageSpaceController);
app.use("/v1/s3", s3Controller);
app.use("/v1/mapbox", mapBoxController);

// Route used to test app
app.get("/test-route", (req, res) => {
  res.status(200).send("Hello, World!");
});

// Route to return HTML img tag
app.get("/image", (req, res) => {
  const imageUrl =
    "https://parkbnb-test.s3.us-east-2.amazonaws.com/engagement%20%281%29.jpg";
  const imgTag = `<img src="${imageUrl}" alt="Image">`;
  res.send(imgTag);
});

// Route to /test that sends a form as HTML to upload a file to /v1/parking/upload
app.get("/test/s3", (req, res) => {
  res.send(`
    <form action="/v1/s3/upload-single" method="post" enctype="multipart/form-data">
      <input type="file" name="file" />
      <input type="submit" value="Upload" />
    </form>
  `);
});

// Route to test auth
app.get("/test/auth", (req, res) => {
  res.send(`
    <form action="/v1/auth/local" method="post">
      <input type="text" name="userEmail" />
      <input type="text" name="password" />
      <input type="submit" value="Upload" />
    </form>
  `);
});

export default app;
