import express from "express";
import dotenv from "dotenv";
import cors from "cors";
//checking if submodule works or not in backend
dotenv.config({ path: "./.env" });

const port = process.env.PORT;
const app = express();

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//function to connect to database and it's import
import connectTodb from "./utils/connectTodb.js";

connectTodb();

//routes imports
import userRoutes from "./routes/userRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import ordersRoutes from "./routes/orderRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import authRoutes from "./routes/authRoutes.js";

app.use("/user", userRoutes);
app.use("/product", productRoutes);
app.use("/cart", cartRoutes);
app.use("/order", ordersRoutes);
app.use("/pay", paymentRoutes);
app.use("/auth", authRoutes);

app.get("/", async (req, res) => {
  res.status(200).send("Hello there I am listening....");
});

app.listen(port || 5000, () => {
  console.log("Server Listening to request's 👊 on port " + 5000);
});
