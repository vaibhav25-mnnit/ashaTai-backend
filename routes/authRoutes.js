import express from "express";
const router = express.Router()

import { login, signUp } from "../controllers/authControllers.js";

router.get('/', (req, res) => {
    res.send('authentating....s')
})

router.post('/login', login);


router.post('/signup', signUp);

export default router;