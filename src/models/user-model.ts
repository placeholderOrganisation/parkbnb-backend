import mongoose from "mongoose";

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
