import userModel from "../Models/userModel.js";
import jwt from "jsonwebtoken";
import bcryptjs from 'bcryptjs'
import validator from "validator";

// login user

const loginUser = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.json({ success: false, message: "User Doesn't exist" })
        }

        const isMatch = await bcryptjs.compare(password, user.password);

        if (!isMatch) {
            return res.json({ success: false, message: "Invalid Credentials" })
        }

        const token = createToken(user._id);
        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error);
        res.json({ success: false, message: "Error" })
    }
}
// token
const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}

// register user

const registerUser = async (req, res) => {
    const { name, email, contactno, password } = req.body;
    try {
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }
        // validator email format and strong password
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" });
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }
        if (contactno.length < 10) {
            return res.json({ success: false, message: "Please enter a valid contact number" })
        }
        // hashing user password
        const salt = await bcryptjs.genSalt(10)
        const hashedPassword = await bcryptjs.hash(password, salt);

        const newUser = new userModel({
            name: name,
            email: email,
            password: hashedPassword,
            contactno: contactno
        })

        const user = await newUser.save();
        const token = createToken(user._id)
        res.json({ success: true, token })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: "Error" })
    }
}



export { loginUser, registerUser } 