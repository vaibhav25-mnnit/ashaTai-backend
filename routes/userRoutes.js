import express from "express";
const router = express.Router()

import { getAllUsers, getUserById, updateUser, getUserAddressById } from "../controllers/userControllers.js";



router.get('/', getAllUsers)
    .get('/get/:id', getUserById)
    .patch('/update/:id', updateUser)
    .get('/address/:id', getUserAddressById)
export default router;