 
import { userModel } from '../models/userModel.js'
import { encryptPassword, decryptPassword } from '../utils/bcrypt.js';
import crypto from "crypto"
import { createAndSendMail } from '../utils/nodeMailer.js';

export const signUp = async (req, res) => {
    //get the details from req body
    const { name, email } = req.body;
    const pass = req.body.password;

    try {
        //check if that email is already present in database or not
        const user = await userModel.findOne({ email: email })

        //->if present send error with email already present 
        if (user) {
            res.status(500).json({
                message: "User with that email already exist.",
                data:null
            })
            return;
        }
        //-->else
       
        //hash the password 
        const hashedPassword = await encryptPassword(pass)
        const resetToken =  crypto.randomBytes(20).toString('hex');

        //create the new user and save into database
        let newUser = new userModel({ name: name, email: email, password: hashedPassword,resetPasswordToken:resetToken }) 
        newUser = await newUser.save(); 
        const { password, resetPasswordToken, ...response } = newUser._doc;
            res.status(201).json({
                message: "Please,login signed up successfully",
                redirect: true,
                data: response
            })

    } catch (error) {
        console.log("Error in sign up");
        res.status(500).json(error);
    }
}

export const login = async (req, res) => {
    //get the email and password
    const { email, password } = req.body; 
    try {
        //check if user with that email exist or not 
        const user = await userModel.findOne({ email: email })

        if (!user) {
            //->if not send res with error that user with that email does not exist
            res.status(500).json({ message: "No User with that email id." })
            return;
        }

        //->if exist compare the password using hashing
        const isPasswordMatched = await decryptPassword(password, user.password)
 
        //-->else error with wrong password
        if (!isPasswordMatched) {
            res.status(500).json({ message: "Invalid credentials", data:null })
            return;
        }

        if (isPasswordMatched) {
            //->if passwords match send res with successfull login
            const { password, resetPasswordToken, ...response } = user._doc;
            res.status(200).json({
                message: "Logged in successfully",
                data: response
            })
        } 
    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
}

export const sendResetMail = async (req, res) => {
     
    try {
        //check if user with that email exist or not 
        const user = await userModel.findOne({ email: req.query.mail })

        if (!user) {
            //->if not send res with error that user with that email does not exist
            res.status(500).json({ success:false, message: "No User with that email id." })
            return;
        }
        await createAndSendMail(user.email,4,user);
        
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: "Unable to send reset mail.Please try after sometime." })
    }

    res.status(200).send({ success:true, message: "Password reset mail sent successfully.Please,check you inbox." });
}

export const resetPassword= async (req, res) => {  
    const { token,password } = req.body;
    try {
        //check if user with that email exist or not 
        const user = await userModel.findOne({ resetPasswordToken: token })

        if (!user) {
            //->if not send res with error that user with that email does not exist
            res.status(500).json({ success:false,  message: "Provided password reset token is incorrect." })
            return;
        }

         //hash the password 
        const hashedPassword = await encryptPassword(password);
        user.password = hashedPassword;
        await user.save();
        res.status(200).json({success:true, message: "Successfully Updated password." });
    } catch (error) {
        console.log(error)
        res.status(500).json({success:false, message: "Unable to reset password.Please try after sometime." })
    }

}
