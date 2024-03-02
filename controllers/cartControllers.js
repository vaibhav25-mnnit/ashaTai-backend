
import { cartModel } from "../models/cartModel.js";


//add item to cart with
export const addToCart = async (req, res) => {
    const item = req.body;
    const newCartItem = new cartModel(item)
    try {
        const addedItem = await newCartItem.save()
        res.status(200).json({
            message: "Successfully added new item to cart",
            data: addedItem
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "Failed to add item to Cart ",
        })
    }

}

//get Cart Itmes  by user id
export const getCartItems = async (req, res) => {
    const userId = req.params.userId;

    try {
        const response = await cartModel.find({ user: userId }).populate({ path: 'user', select: 'name' }).populate({ path: 'product', select: 'title brand price discountPercentage thumbnail' })
        res.status(200).send(response)
    } catch (error) {
        res.status(500).send("Error fetching  the cart")
    }
}

//update cart by item id
export const updateCart = async (req, res) => {
    const id = req.params.itemId

    try {
        const updatedProduct = await cartModel.findOneAndUpdate({ _id: id }, req.body, { new: true })
        res.status(200).json(updatedProduct)
    } catch (err) {
        res.status(500).json(err)
    }
}

//delete cart item with item id or reset cart when no id is sent
export const deleteCartItem = async (req, res) => {
    const id = req.params.id
    const variable = req.path[1]
    try {
        let response;
        if (variable === 'd') {
            response = await cartModel.findByIdAndDelete(id)
        } else if (variable === 'r') {
            response = await cartModel.deleteMany({ user: id });
        }
        res.status(200).json({
            message: "Successfully removed item from cart.",
            data: response
        });
    } catch (error) {
        res.status(500).json(error)
    }
}

