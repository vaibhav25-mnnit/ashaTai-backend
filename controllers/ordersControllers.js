import { ordersModel } from "../models/ordersModel.js";



//get all the orders sorted in descending order of their creation
export const getOrders = async (req, res) => {

    let query = ordersModel.find({ user: req.params.id })
    query = query.sort({ createdAt: -1 })

    try {
        const response = await query.exec()
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send(error)
    }
}

//add new order
export const createOrder = async (body) => {
    const newOrder = new ordersModel(body)
    try {
        const response = await newOrder.save();
        return response;
    } catch (error) {
        throw new Error(error)
    }
}


export const getSpecificOrder = async (req, res) => {
    const id = req.params.id;
    try {
        const order = await ordersModel.findById(id)
        res.status(200).json(order)
    } catch (error) {
        res.status(500).json(error)
    }
}

//update order
export const updateOrder = async (req, res) => {
    try {
        const newOrder = await ordersModel.findByIdAndUpdate({ _id: req.params.id }, req.body, { new: true })
        res.status(200).json(newOrder)
    } catch (error) {
        res.status(500).json(error)
    }
}
