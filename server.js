import express from "express";
import dotenv from 'dotenv'
import cors from 'cors'
//checking if submodule works or not in backend
dotenv.config({ path: './.env' });

const port = process.env.PORT;
const app = express();


app.use(cors())

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//function to connect to database and it's import 
import connectTodb from "./utils/connectTodb.js";

connectTodb()


//routes imports 
import userRoutes from "./routes/userRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import cartRoutes from "./routes/cartRoutes.js"
import ordersRoutes from "./routes/orderRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
import authRoutes from "./routes/authRoutes.js"
import { tempModel } from "./models/tempSchmea.js";

import { createAndSendMail } from "./utils/nodeMailer.js"


app.use('/user', userRoutes)
app.use('/product', productRoutes)
app.use('/cart', cartRoutes)
app.use('/order', ordersRoutes)
app.use('/pay', paymentRoutes)
app.use('/auth', authRoutes)

app.get('/', async (req, res) => {
    res.status(200).send('Hello there I am listening....')
})

app.get('/temp/:id', async (req, res) => {
    const id = req.params.id;
    const q = tempModel.findById(id).populate('user').populate({
        path: 'products',
        populate: {
            path: 'product',
            select: 'title price thumbnail price'
        }
    })
    const temps = await q.exec()
    res.json(temps)
})

app.post('/temp', async (req, res) => {
    const newTemp = new tempModel(req.body)

    const r = await newTemp.save()

    res.status(200).json(r)
})

app.get("/sendmail/:id",async (req,res)=>{
    const id = req.params.id - '0';

    const mail = "bagatevaibhav555@gmail.com"
    createAndSendMail(mail,id);
    res.send("sending mail")
})

app.listen(port || 5000, () => {
    console.log("Server Listening to request's 👊 on port " + 5000)
})