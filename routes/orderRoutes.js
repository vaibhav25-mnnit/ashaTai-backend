import express from "express";
const router = express.Router()


import { getOrders, getSpecificOrder, updateOrder } from '../controllers/ordersControllers.js'



router.get('/all/:id', getOrders)
    .get('/:id', getSpecificOrder)
    .patch('/update/:id', updateOrder)



export default router;  