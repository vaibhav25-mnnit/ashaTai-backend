import mongoose, { Schema } from "mongoose";


// const tSchema = new mongoose.Schema({
//     name: { type: String },
//     price: { type: Number }
// }, { timestamps: true })

// export const tModel = mongoose.model('t', tSchema)

const tempSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    products: [
        {
            product: { type: mongoose.Schema.Types.ObjectId, ref: 'product' },
            otherData: {
                quantity: { type: Number },
                price: { type: Number },
                discountPercentage: { type: Number },
            }
        }

    ] 


}, { timestamps: true })



export const tempModel = mongoose.model('temp', tempSchema)