import mongoose from "mongoose";

const specialPasswordSchema = new mongoose.Schema(
  {
    password: {
      type: String,
      required: true,
      trim: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("SpecialPassword", specialPasswordSchema);
