import { Router } from "express";

export const userController = Router();

userController.get("/", (req, res) => {
  res.send("Hello, world!");
});

