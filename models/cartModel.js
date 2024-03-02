import mongoose, { Schema } from "mongoose";

const cartSchema = new mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'user', required: true },
    quantity: { type: Number, min: [1, 'minimun quantity should be 1'] },
    product: { type: Schema.ObjectId, ref: 'product', required: true },
}, { timestamps: true })


const virtual = cartSchema.virtual('id')
virtual.get(function () {
    this._id;
})

cartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
})


export const cartModel = mongoose.model('cart', cartSchema)