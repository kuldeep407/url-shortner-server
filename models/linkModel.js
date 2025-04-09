import mongoose from "mongoose";

const linkSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  originalUrl: {
    type: String,
    required: true,
  },
  shortId: {
    type: String,
    required: true,
    unique: true,
  },
  shortUrl: {
    type: String,
  },
  customAlias: {
    type: String,
    default: null,
  },
  clicks: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  expiration: {
    type: Date,
    default: null,
  },
  analytics: [
    {
      timestamp: {
        type: Date,
        default: Date.now,
      },
      device: {
        type: String,
      },
      os: {
        type: String,
      },
      browser: {
        type: String,
      },
      ip: {
        type: String,
      },
      location: {
        type: String,
      },
    },
  ],
});

export default mongoose.model("Link", linkSchema);
