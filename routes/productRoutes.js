import express from 'express'
const router = express.Router();

import { addNewProduct, deleteProduct, getAllProducts, getSpecificProducts, updateProduct } from '../controllers/productControllers.js'


router.get('/get', getAllProducts)
    .get('/getProduct/:id', getSpecificProducts)
    .post('/add', addNewProduct)
    .patch('/update/:id', updateProduct)
    .delete('/delete/:id', deleteProduct)




export default router;