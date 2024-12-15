const User = require('../models/userModel');
const generateTokensAndCookies = require('../utils/generateTokensAndCookies');

const brcrypt = require('bcryptjs')

const signUp = async(req,res) => {
    try {

        const { name, email, password } = req.body;

        const userExists = await User.findOne({
            email: email,
        })

        if(userExists) {
            return res.status(400).json({ message: 'User already exists' });
        }
        
        const user = new User({
            name,
            email,
            password,
        })

        await user.save();

        const token = generateTokensAndCookies(user)

        return res.status(200).json({token, message : 'User registration successful' });

        
    } catch (error) {

        if (error.name === 'ValidationError') {
            const validationErrors = Object.values(error.errors).map(err => err.message);
            return res.status(400).json({ message: 'Validation failed', errors: validationErrors });
        }

        console.log(error);
        res.status(500).json({ error: "An error occurred while signing up." });
    }
}

const signIn = async(req, res) => {
    try {

        const { email, password } = req.body;

        console.log("object", req.body);

        const user = await User.findOne({
            email: email,
        })

        if(!user) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const isMatch = await brcrypt.compare(password, user.password);

        if(!isMatch) {
            return res.status(400).json({ message: 'Invalid credentials' });
        }

        const token = generateTokensAndCookies(user)

        return res.status(200).json({ token, message : 'User login successful' });

    
        
    } catch (error) {
        console.log(error.message);
        return res.status(500).json({ error: "An error occurred while signing" });
    }
}

module.exports = {
    signUp,signIn
}