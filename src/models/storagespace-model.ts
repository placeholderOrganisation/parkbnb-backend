import mongoose, { Schema } from "mongoose";
import { User } from "./user-model";

export interface StorageSpaceObject {
  owner_id: string;
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
  length: number;
  width: number;
  created_at: string;
}

const storageSpaceSchema: Schema = new Schema<StorageSpaceObject>({
  owner_id: { type: String, required: true },
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
  created_at: { type: String, required: true },
  length: { type: Number, required: true },
  width: { type: Number, required: true },
});

storageSpaceSchema.pre<StorageSpaceObject>("save", async function (next) {
  const owner_id = this.owner_id;

  try {
    const user = await User.findOne({ _id: owner_id });

    if (user) {
      next();
    } else {
      throw new Error("Owner does not exist");
    }
  } catch (error) {
    throw error;
  }
});

export const StorageSpace = mongoose.model<StorageSpaceObject>("StorageSpace", storageSpaceSchema);
