import express from "express";
const router = express.Router()

import { login, signUp, sendResetMail, resetPassword  } from "../controllers/authControllers.js";

router.get('/', (req, res) => {
    res.send('authentating....s')
})

router.post('/login', login);

router.post('/signup', signUp);

router.get('/sendResetMail',sendResetMail); 

router.post('/resetPassword/:token',resetPassword);

export default router;