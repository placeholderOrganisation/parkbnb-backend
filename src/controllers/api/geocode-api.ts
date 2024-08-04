import { Request, Response, Router } from "express";
import { GeocodeUtilFunctionResponse, autocomplete, geocode } from "../utils/geocode-utils";
// going to contain routes to expose mapbox api from my app

export const geocodingController = Router();

// Route to call the geocode function
geocodingController.post("", async (req: Request, res: Response) => {
  try {
    const address = req.body.address;
    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }
    const result: GeocodeUtilFunctionResponse = await geocode(address);

    if (result.success === false) {
      return res.status(500).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Route to call the autocomplete function
geocodingController.post("/autocomplete", async (req: Request, res: Response) => {
  try {
    const address = req.body.address;
    if (!address) {
      return res.status(400).json({ error: "Address is required" });
    }
    const result: GeocodeUtilFunctionResponse = await autocomplete(address);

    if (result.success === false) {
      return res.status(500).json(result);
    }
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
