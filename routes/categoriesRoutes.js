import express from "express";
const router = express.Router();

import { categoriesModel } from "../models/categoriesModel.js";

router.get("/all", async (req, res) => {
  try {
    const response = await categoriesModel.find();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.post("/add", async (req, res) => {
  const newCategory = new categoriesModel(req.body);
  try {
    const response = await newCategory.save();
    res.status(200).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

export default router;
