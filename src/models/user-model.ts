import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  id: String,
  name: String,
  contact: String,
  email: String,
  images: [String],
  rating: {
    host: Number,
    renter: Number,
  },
  reviews: [
    {
      review: String,
      rating: Number,
      user_id: String,
    },
  ],
  verified: Boolean,
  provider: String,
});

export const User = mongoose.model("User", userSchema);
