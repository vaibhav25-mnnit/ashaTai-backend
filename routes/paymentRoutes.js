import express from "express";
import { createPayment, verifyOrder } from "../utils/payment.js";
const router = express.Router();

router
  .get("/", (req, res) => res.send("payment routes"))
  .post("/create-order", createPayment)
  .get("/verify-order/:id", verifyOrder);

export default router;
