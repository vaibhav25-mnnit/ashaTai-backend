import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
  thumbnail: { type: String, required: true },
  value: { type: String, required: true },
  label: { type: String, required: true },
});

export const categoriesModel = mongoose.model("categories", categoriesSchema);
