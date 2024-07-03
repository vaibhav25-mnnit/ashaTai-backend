import express from "express";
const router = express.Router();

import {
  getUserOrders,
  getSpecificOrder,
  updateOrder,
  adminOrders,
} from "../controllers/ordersControllers.js";

router
  .get("/admin", adminOrders)
  .get("/all/:id", getUserOrders)
  .get("/:id", getSpecificOrder)
  .patch("/update/:id", updateOrder);

export default router;
