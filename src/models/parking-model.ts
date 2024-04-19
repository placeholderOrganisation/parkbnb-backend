import mongoose, { Schema } from "mongoose";
import { User } from "./user-model";
import { Dayjs } from "dayjs";

export interface ParkingObject {
  owner_id?: string;
  filters: {
    security_cameras: boolean;
    ALL_DAY_ACCESS: boolean;
    ev_charging: boolean;
    handicap_accessible: boolean;
    storage_type: string;
    vehicle_type: string;
    length: number;
    width: number;
    spaces: number;
  };
  address: {
    street: string;
    lng: string;
    lat: string;
    city: string;
    state: string;
    zip: string;
    country: string;
  };
  description: string;
  price: {
    hourly?: number;
    daily: number;
    monthly: number;
    yearly?: number;
  };
  is_available: boolean;
  images: string[];
  listed_on: Dayjs;
  is_scraped?: boolean;
  contact?: string;
}

const parkingSchema: Schema = new Schema<ParkingObject>({
  owner_id: { type: String, required: false },
  filters: {
    security_cameras: { type: Boolean, required: true },
    ALL_DAY_ACCESS: { type: Boolean, required: true },
    ev_charging: { type: Boolean, required: true },
    handicap_accessible: { type: Boolean, required: true },
    storage_type: { type: String, required: true },
    vehicle_type: { type: String, required: true },
    length: { type: Number, required: true },
    width: { type: Number, required: true },
    spaces: { type: Number, required: true },
  },
  address: {
    street: { type: String, required: true },
    lng: { type: String, required: true },
    lat: { type: String, required: true },
    state: { type: String, required: true },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: true },
  },
  description: { type: String, required: true },
  price: {
    hourly: { type: Number, required: false },
    daily: { type: Number, required: true },
    monthly: { type: Number, required: true },
    yearly: { type: Number, required: false },
  },
  is_available: { type: Boolean, required: true },
  images: { type: [String], required: true },
  listed_on: { type: String, required: false },
  is_scraped: { type: Boolean, required: false },
  contact: { type: String, required: false },
});

parkingSchema.pre<ParkingObject>("save", async function (next) {
  const lat = this.address.lat;
  const lng = this.address.lng;

  const isScrapedListing = this.is_scraped;
  const contact = this.contact;

  const owner_id = this.owner_id;

  try {
    let isExisting = await Parking.findOne({
      "address.lat": lat,
      "address.lng": lng,
    });
    if (isScrapedListing) {
      if (isExisting) {
        throw new Error("Duplicate scraped listing found");
      }
      if (contact) {
        next();
      }
      throw new Error("Contact should exist for scraped listing");
    } else {
      const user = await User.findOne({ id: owner_id });
      isExisting = await Parking.findOne({
        "address.lat": lat,
        "address.lng": lng,
        owner_id,
      });
      if (isExisting) {
        throw new Error("Duplicate listing found");
      }
      if (user) {
        next();
      } else {
        throw new Error("Owner should exist for each listing");
      }
    }
  } catch (error) {
    throw error;
  }
});

export const Parking = mongoose.model<ParkingObject>("Parking", parkingSchema);
