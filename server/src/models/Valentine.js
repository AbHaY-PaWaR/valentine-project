import mongoose from "mongoose";

const valentineSchema = new mongoose.Schema(
  {
    day: {
      type: String,
      required: true,
      enum: [
        "rose",
        "propose",
        "chocolate",
        "teddy",
        "promise",
        "hug",
        "kiss",
        "valentine",
      ],
    },
    senderName: {
      type: String,
      required: true,
      trim: true,
    },
    receiverName: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      maxlength: 500,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Valentine", valentineSchema);