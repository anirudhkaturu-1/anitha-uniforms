import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";




//creating Token

const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" })
}

//Route for user Login       

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({
                success: false,
                message: "User not found",

            })
        }

        const isMatch = await bcrypt.compare(String(password), String(user.password));

        if (!isMatch) {
            return res.json({
                success: false,
                message: "Incorrect password"
            })
        }

        const token = createToken(user._id);

        return res.json({
            success: true,
            token,
            message: "User logged in successfully",
            user: { name: user.name }

        })

    } catch (error) {

        console.log(error);
        return res.json({ success: false, message: "Something went wrong" })

    }

}



//Route for user signup



const signup = async (req, res) => {
    try {
        //request body
        const { name, email, password } = req.body;

        //checking if user already exists or not
        const exitingUser = await userModel.findOne({ email })

        if (exitingUser) {
            return res.json({ success: false, message: "User already exists" })
        }

        //validating email

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Invalid email" })
        }
        // validating password

        if (password.length < 6) {
            return res.json({ success: false, message: "Password must be at least 6 characters" })
        }
        //hashing password

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(String(password), salt);

        //creating user

        const newUser = new userModel({
            name,
            email,
            password: hashPassword
        })

        const newUserSaved = await newUser.save();
        const token = createToken(newUserSaved._id);

        return res.json({
            success: true, token, message: "User created successfully", 

        });


    } catch (error) {

        console.log(error);
        return res.json({ success: false, message: "Something went wrong" })

    }



}


//Route for Admin Login


const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (email !== process.env.ADMIN_EMAIL || password !== process.env.ADMIN_PASSWORD) {
            return res.json({ success: false, message: "Invalid credentials" })
        }

        const token = jwt.sign({ email: process.env.ADMIN_EMAIL }, process.env.JWT_SECRET_KEY, { expiresIn: "1d" });
        return res.json({ success: true, token })


    } catch (error) {

        console.log(error);
        return res.json({ success: false, message: "Something went wrong" })
    }


}


const getUserName=async(req,res)=>{
    try{
        const userId = req.userId;
        const user = await userModel.findById(userId);
        res.json({success:true,user})

    }catch(error){
        console.log(error);
        res.status(500).json({success:false,message:error.message})
    }
}



export { login, signup, adminLogin, getUserName }
