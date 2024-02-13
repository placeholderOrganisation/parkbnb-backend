import mongoose, { Schema, Document } from "mongoose";

export interface ParkingObject {
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
    hourly: number;
    daily: number;
    monthly: number;
    yearly: number;
  };
  is_available: boolean;
  images: string[];
  created_at: string;
  length: number;
  width: number;
}

const parkingSchema: Schema = new Schema<ParkingObject>({
  owner_id: { type: String, required: true },
  address: {
    street: { type: String, required: true },
    lng: { type: String, required: false },
    lat: { type: String, required: false },
    city: { type: String, required: true },
    zip: { type: String, required: true },
    country: { type: String, required: false },
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

const Parking = mongoose.model<ParkingObject>("Parking", parkingSchema);

export default Parking;
