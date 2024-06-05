import mongoose, { Schema } from "mongoose";

const ordersSchema = new mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'user', required: true  },
    items: { type: [], required: true },
    paymentDetails: { type: {} },
    priceDetails: { type: {}, required: true },
    status: { type: String, required: true, default: "pending" },
    statusHistory: {
        type: [], required: true, timestamps: true,
        default: [{
            status: "pending",
            time: new Date()
        }]
    },
    address: {},
}, { timestamps: true })


const virtual = ordersSchema.virtual('id')
virtual.get(function () {
    this._id;
})

ordersSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
})



export const ordersModel = mongoose.model('orders', ordersSchema)