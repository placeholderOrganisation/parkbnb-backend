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
  id?: string;
  name?: string;
  provider?: string;
  email?: string;
  images?: string[];
  verified?: Boolean;
  contactNumber?: string;
  verificationImageLink?: string[];
  passwordHash?: string;
}

export interface PartialUserObject {
  id: string;
  name: string;
  images: string[];
  verified: Boolean;
  contactNumber?: string;
}

export interface AssembleNewUserBodyObject {
  id?: string;
  displayName: string;
  provider?: string;
  emails?: Array<{ value: string }>;
  userEmail?: string;
  photos?: string[] | undefined;
  passwordHash?: string;
}

export interface UserSignupRequestObject {
  displayName: string;
  userEmail: string;
  password: string;
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
