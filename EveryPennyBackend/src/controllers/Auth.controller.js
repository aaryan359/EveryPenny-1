const User = require("../model/User.model");
const bcrypt = require("bcrypt");
const env = require("dotenv");
const jwt = require("jsonwebtoken");

env.config();

// Register API
const register = async (req, res) => {

    const {  useremail,username } = req.body;

    try {


        if (!username || !useremail) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const existingUser = await User.findOne({ useremail });
        if (existingUser) {

            return await login(req, res);
            
        }


        const newUser = await User.create({
            useremail,
            username,
        });



        const token = jwt.sign({ Id: newUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });


        res.json({ message: "Signup successful", token });


    }
     catch (error) {
        res.status(500).json({ message: "Error while signing up", error });
    }


};



// Login API
const login = async (req, res) => {
    const { useremail } = req.body;

    try {
        if (!useremail || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }

        const user = await User.findOne({ useremail });

        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

    
        const token = jwt.sign({ Id: user._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        });


        res.json({ message: "Login successful", token });


    } catch (error) {

        res.status(500).json({ message: "Error while logging in", error });
    }
};

module.exports = { register, login };
