import cors from "cors";
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

// @ts-ignore
import { s3Controller } from "./controllers/api/s3-api";
import { geocodingController } from "./controllers/api/geocode-api";

// Create Express server
const app = express();

const isProduction = process.env.NODE_ENV === "production";

// Behind Render's proxy, trust X-Forwarded-Proto so `secure` cookies work
app.set("trust proxy", 1);

app.use(
  cors({
    origin: [process.env.CLIENT_URL, process.env.CLIENT_WITH_WWW, process.env.SERVER_WITH_WWW, "https://checkout.stripe.com"],
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);

app.use(
  cookieSession({
    name: "session",
    keys: [process.env.COOKIE_SECRET],
    maxAge: 24 * 60 * 60 * 1000,
    // Cross-site cookies (frontend and backend are different hosts) require
    // SameSite=None + Secure in production. Keep lax/insecure for local HTTP dev.
    sameSite: isProduction ? "none" : "lax",
    secure: isProduction,
    httpOnly: true,
  })
);

// Express configuration
app.set("port", process.env.PORT || 10000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize(passportConfig));
app.use(passport.session());

app.use("/v1/auth", authController);
app.use("/v1/user", userController);
app.use("/v1/parking", parkingController);
app.use("/v1/s3", s3Controller);
app.use("/v1/geocode", geocodingController);

// Route used to test app
app.get("/health", (req, res) => {
  res.status(200).send("OK");
});

// // Route to return HTML img tag
// app.get("/sa/image", (req, res) => {
//   const imageUrl =
//     "https://parkbnb-test.s3.us-east-2.amazonaws.com/engagement%20%281%29.jpg";
//   const imgTag = `<img src="${imageUrl}" alt="Image">`;
//   res.send(imgTag);
// });

// // Route to /test that sends a form as HTML to upload a file to /v1/parking/upload
// app.get("/test/sa/s3", (req, res) => {
//   res.send(`
//     <form action="/v1/s3/upload-single" method="post" enctype="multipart/form-data">
//       <input type="file" name="file" />
//       <input type="submit" value="Upload" />
//     </form>
//   `);
// });

// // Route to test auth
// app.get("/test/sa/auth", (req, res) => {
//   res.send(`
//     <form action="/v1/auth/local" method="post">
//       <input type="text" name="userEmail" />
//       <input type="text" name="password" />
//       <input type="submit" value="Upload" />
//     </form>
//   `);
// });

export default app;
