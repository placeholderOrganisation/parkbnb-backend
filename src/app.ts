require("dotenv").config();

import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import passport from "passport";
import cookieSession from "cookie-session";

// Controllers (route handlers)
import { userController } from "./controllers/user";
import { authController } from "./controllers/auth";

// API keys and Passport configuration
import * as passportConfig from "./config/passport";

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

app.use("/v1/users", userController);
app.use("/v1/auth", authController);

app.get("/success", (req: Request, res: Response) => {
  res.send(req.user);
})

app.listen(app.get("port"), () => {
  console.log(
    "  App is running at http://localhost:%d in %s mode",
    app.get("port"),
    app.get("env")
  );
  console.log("  Press CTRL-C to stop\n");
});

export default app;
