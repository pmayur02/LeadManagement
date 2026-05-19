import mongoose from "mongoose";

const leadSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },

    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true
    },

    status: {
      type: String,
      enum: ["new", "contacted", "qualified", "lost"],
      default: "new",
      required: true
    },

    source: {
      type: String,
      enum: ["website", "instagram", "referral"],
      required: true
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  {
    timestamps: true
  }
);

export const Lead = mongoose.model("Lead", leadSchema);