import mongoose from "mongoose";

const categoriesSchema = new mongoose.Schema({
    value: String,
    label: String,
    checked: Boolean
})



export const categoriesModel = mongoose.model('categories', categoriesSchema)