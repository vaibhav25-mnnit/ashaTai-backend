import mongoose, { Schema } from "mongoose"

const addressSchema = new mongoose.Schema({
    user: { type: Schema.ObjectId, ref: 'user', required: true },
    fullName: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    email: { type: String, required: true },
    streetAddress: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    pinCode: { type: Number, required: true },
})

export const addressModel = mongoose.model('address', addressSchema)


const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    selectedAddress: {
        type: Schema.ObjectId, ref: 'address',
    },
    addresses: [{ type: Schema.ObjectId, ref: 'address' }],
}, { timestamps: true })


const virtual = userSchema.virtual('id')
virtual.get(function () {
    this._id;
})


userSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
})

export const userModel = mongoose.model('user', userSchema)