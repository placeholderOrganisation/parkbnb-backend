import passport from "passport";
import express, { Request, Response } from "express";

export const authController = express.Router();

authController.get("/login/success", (req: Request, res: Response) => {
  if (req.user) {
    return res.status(200).json({
      success: true,
      message: "successfull",
      user: req.user,
    });
  }
  return res.status(201).json({
    success: false,
    message: "unsuccessful",
  });
});

authController.get("/login/failed", (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

authController.get("/logout", (req: Request, res: Response) => {
  req.logout(req.user, (err) => {
    res.redirect("/");
  });
});

authController.get(
  "/google",
  passport.authenticate("google", { scope: ["email", "profile"] })
);

authController.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: "/login/failed",
  })
);

authController.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["profile"] })
);

authController.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.SUCCESS_REDIRECT,
    failureRedirect: "/login/failed",
  })
);

authController.get("/twitter", (req, res) => {
    res.send("Twitter login");
});