import express from "express";
const router = express.Router()

import {
    addToCart, getCartItems, updateCart, deleteCartItem
} from '../controllers/cartControllers.js'


router.get('/get/:userId', getCartItems)
    .post('/add/', addToCart)
    .patch('/update/:itemId', updateCart)
    .delete('/delete/:id', deleteCartItem)
    .delete('/reset/:id', deleteCartItem)


export default router;