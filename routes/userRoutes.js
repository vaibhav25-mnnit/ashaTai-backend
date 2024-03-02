import express from "express";
const router = express.Router()

import { getAllUsers, getUserById, updateUser } from "../controllers/userControllers.js";



router.get('/', getAllUsers)
    .get('/get/:id', getUserById)
    .patch('/update/:id', updateUser)

export default router;