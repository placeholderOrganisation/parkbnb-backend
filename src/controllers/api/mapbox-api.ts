import { Request, Response, Router } from "express";
import { GeocodeUtilFunctionResponse, geocode } from "../utils/mapbox-utils";
// going to contain routes to expose mapbox api from my app

export const mapBoxController = Router();

// Route to call the geocode function
mapBoxController.post("/geocode", async (req: Request, res: Response) => {
  try {
    const address = req.body.address;
    const result: GeocodeUtilFunctionResponse = await geocode(address);
    res.json(result);
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
});
