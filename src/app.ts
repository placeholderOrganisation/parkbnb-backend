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
app.set("port", process.env.PORT || 3000);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize(passportConfig));
app.use(passport.session());

app.use("/v1/user", userController);
app.use("/v1/auth", authController);

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default app;
