import mongoose from "mongoose";

export interface UserObject {
  id: string;
  name: string;
  provider: string;
  email: string;
  images: string[];
  verified: Boolean;
  contactNumber?: string;
  verificationImageLink?: string[];
}

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  contactNumber: String,
  email: String,
  images: [String],
  verified: Boolean,
  provider: String,
});

export const User = mongoose.model("User", userSchema);
