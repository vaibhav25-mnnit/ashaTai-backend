import { userModel, addressModel } from "../models/userModel.js";

export const getAllUsers = async (req, res) => {
    try {
        const users = await userModel.find({})
        res.status(200).json(users)
    } catch (error) {
        res.status(500).send(error)
    }
}

//get user's id here
export const getUserById = async (req, res) => {
    const id = req.params.id
    try {
        const user = await userModel.findById(id).populate('addresses')

        const { password, ...response } = user._doc;
        res.status(200).send(response)
    } catch (error) {
        console.log(error)
        res.status(500).send(error)
    }
}


//get user's id here
export const updateUser = async (req, res) => {
    const id = req.params.id;
    const query = req.query;


    // edit saved address 
    if (query.edit) {
        const fields = req.body

        try {
            const q = await addressModel.findByIdAndUpdate(query.edit, fields);
            res.status(200).json({
                message: 'Address updated successfully',
                data: q
            })
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
        return;
    }

    // add new address in user's array of addresses
    if (query.add) {

        try {
            const newAddress = new addressModel({ ...req.body, user: id })
            const saveAddress = await newAddress.save();
            const updatedUser = await userModel.findByIdAndUpdate(id, { $push: { "addresses": saveAddress._id } }, { new: true })
            const { password, ...response } = updatedUser._doc;
            res.status(200).json(response)

        } catch (error) {
            res.status(500).json(error)
        }
        return;
    }


    // delete address from user's array of addresses
    if (query.delete) {
        try {
            await addressModel.findByIdAndDelete(query.delete)
            let updatedUser = await userModel.findByIdAndUpdate(id, { $pull: { addresses: query.delete } }, { new: true })



            if (updatedUser.selectedAddress.equals(query.delete)) {
                updatedUser = await userModel.findByIdAndUpdate(id, { selectedAddress: updatedUser._id }, { new: true })
            }

            const { password, ...response } = updatedUser._doc;
            res.status(200).json(response)
        } catch (err) {
            console.log(err)
            res.status(500).json(err)
        }
        return;
    }


    //other than address field update like name email phoneNumber etc
    try {
        const updatedUser = await userModel.findByIdAndUpdate(id, req.body, { new: true })
        res.status(200).json(updatedUser)

    } catch (err) {
        console.log(err)
        res.status(500).json(err)

    }
}   
