import mongoose, { Schema } from "mongoose";

export interface UserObject {
  id: string;
  name: string;
  provider: string;
  email: string;
  images: string[];
  verified: Boolean;
  contactNumber?: string;
  verificationImageLink?: string[];
  passwordHash?: string;
}

export interface RequestUserObject {
  id: string;
  name: string;
  provider: string;
  email: string;
  images: string[];
  verified: Boolean;
  contactNumber?: string;
  verificationImageLink?: string[];
  passwordHash?: string;
}

export interface PartialUserObject {
  name: string;
  images: string[];
  verified: Boolean;
  contactNumber?: string;
}

const userSchema = new Schema<UserObject>({
  id: { type: String, required: true },
  name: { type: String, required: true },
  provider: { type: String, required: true },
  email: { type: String, required: true },
  images: { type: [String], required: true },
  verified: { type: Boolean, required: true },
  contactNumber: { type: String, required: false },
  verificationImageLink: { type: [String], required: false },
  passwordHash: { type: String, required: false },
});

export const User = mongoose.model<UserObject>("User", userSchema);
