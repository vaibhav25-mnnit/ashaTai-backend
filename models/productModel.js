import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, min: [1, 'minimun price should be 1'], required: true },
    discountPercentage: { type: Number, min: [1, 'wrong min discount'], max: [99, 'wrong max discount'], required: true },
    rating: { type: Number, min: [0, 'minimum rating should be 0'], max: [5, 'max discount should be 5'], default: 0, required: true },
    stock: { type: Number, min: [0, 'minimum stock should be 0'], default: 0, required: true },
    brand: { type: String, required: true },
    category: { type: String, required: true },
    thumbnail: { type: String, required: true },
    images: { type: [String], required: true }
}, { timestamps: true })


const virtual = productSchema.virtual('id')
virtual.get(function () {
    this._id;
})

const virtual2 = productSchema.virtual('sellingPrice')
virtual2.get(function () {
    return Math.round(this.price - (this.price * (this.discountPercentage / 100)))
})

productSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        delete ret._id;
    }
})

export const productModel = mongoose.model('product', productSchema)