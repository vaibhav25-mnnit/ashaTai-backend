import { ordersModel } from "../models/ordersModel.js";

//get all the orders sorted in descending order of their creation
export const getUserOrders = async (req, res) => {
  const { status, year } = req.query;
  let query = ordersModel.find({ user: req.params.id });
  let totalItems = ordersModel.find({ user: req.params.id });
  const page = req.query._page - 1 || 0,
    limit = req.query._limit || 20;
  if (status) {
    query = query.find({ status: status });
    totalItems = totalItems.find({ status: status });
  }

  if (year) {
    if (Array.isArray(year)) {
      const yearQueries = year.map((y) => {
        const startDate = new Date(y, 0, 1);
        const endDate = new Date(y, 11, 31, 23, 59, 59, 999);
        return { createdAt: { $gte: startDate, $lte: endDate } };
      });

      query = query.find({ $or: yearQueries });
      totalItems = totalItems.find({ $or: yearQueries });
    } else {
      const startDate = new Date(year, 0, 1);
      const endDate = new Date(year, 11, 31, 23, 59, 59, 999);

      query = query.find({ createdAt: { $gte: startDate, $lte: endDate } });
      totalItems = totalItems.find({
        createdAt: { $gte: startDate, $lte: endDate },
      });
    }
  }

  query = query.sort({ createdAt: -1 });
  query.skip(page * limit).limit(limit); //for pagination logic
  try {
    const total = await totalItems.count().exec();
    const data = await query.exec(); //final execute query
    res.setHeader("X-total-Count", total);
    res.header("Access-Control-Expose-Headers", "X-Total-Count");
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json(error);
  }
};

//add new order
export const createOrder = async (body) => {
  const newOrder = new ordersModel(body);
  try {
    const response = await newOrder.save();
    return response;
  } catch (error) {
    throw new Error(error);
  }
};

export const getSpecificOrder = async (req, res) => {
  const id = req.params.id;
  try {
    const order = await ordersModel.findById(id);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update order
export const updateOrder = async (req, res) => {
  try {
    const newOrder = await ordersModel.findByIdAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.status(200).json(newOrder);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const adminOrders = async (req, res) => {
  let query = ordersModel.find();
  query = query.sort({ createdAt: -1 });
  console.log("getting order for admin");
  try {
    const response = await query.exec();
    res.status(200).send(response);
  } catch (error) {
    res.status(500).send(error);
  }
};
