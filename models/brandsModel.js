import mongoose from "mongoose";

const brandsSchema = new mongoose.Schema({
    value: String,
    label: String,
    checked: Boolean
})


export const brandsModel = mongoose.model('brands', brandsSchema)