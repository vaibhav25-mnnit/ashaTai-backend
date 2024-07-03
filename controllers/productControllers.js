import { productModel } from "../models/productModel.js";

//get products based on different filters
export const getAllProducts = async (req, res) => {
  let query = productModel.find(),
    totalItems = productModel.find();

  const page = req.query._page - 1 || 0,
    limit = req.query._limit || 20;

  if (req.query.category) {
    query = query.find({ category: req.query.category });
    totalItems = totalItems.find({ category: req.query.category });
  }

  if (req.query.brand) {
    query = query.find({ brand: req.query.brand });
    totalItems = totalItems.find({ brand: req.query.brand });
  }

  if (req.query._sort && req.query._order) {
    query = query.sort({ [req.query._sort]: req.query._order });
  }

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

//get specific product based on id
export const getSpecificProducts = async (req, res) => {
  const id = req.params.id;

  try {
    const product = await productModel.findById(id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

//add new Product
export const addNewProduct = async (req, res) => {
  const newProduct = new productModel(req.body);
  try {
    const response = await newProduct.save();
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json(error);
  }
};

//update product using patch request
export const updateProduct = async (req, res) => {
  const id = req.params.id;
  try {
    const updatedProduct = await productModel.findOneAndUpdate(
      { _id: id },
      req.body,
      { new: true }
    );
    res.status(200).json(updatedProduct);
  } catch (err) {
    res.status(500).json(err);
  }
};

//deleting product based on id
export const deleteProduct = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteProduct = await productModel.findByIdAndDelete(id);
    res.status(200).json(deleteProduct);
  } catch (error) {
    res.status(500).json(error);
  }
};
