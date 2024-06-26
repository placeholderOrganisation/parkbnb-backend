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
  return res.status(403).json({
    success: false,
    message: "unsuccessful",
    user: null,
  });
});

authController.get("/login/failure", (req: Request, res: Response) => {
  res.status(401).json({
    success: false,
    message: "failure",
  });
});

// currently not in use
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
    successRedirect: process.env.SUCCESS_REDIRECT_FOR_SOCIAL,
    failureRedirect: process.env.FAILURE_REDIRECT_FOR_SOCIAL,
  })
);

authController.get(
  "/facebook",
  passport.authenticate("facebook", { scope: ["public_profile", "email"] })
);

authController.get(
  "/facebook/callback",
  passport.authenticate("facebook", {
    successRedirect: process.env.SUCCESS_REDIRECT_FOR_SOCIAL,
    failureRedirect: process.env.FAILURE_REDIRECT_FOR_SOCIAL,
  })
);

authController.post(
  "/local",
  passport.authenticate("local", {
    successRedirect: process.env.SUCCESS_REDIRECT_FOR_LOCAL,
    failureRedirect: process.env.FAILURE_REDIRECT_FOR_LOCAL,
  })
);
