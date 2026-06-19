const jwt = require('jsonwebtoken');
const User = require('../models/User');
// const bcrypt = require('bcrypt');
const bcrypt = require('bcryptjs');


exports.registerUser = async (req, res) => {
    try{
        const {name, email, password, phone} = req.body;

        // checking user exixtence
        const userExits = await User.findOne({ email });
        if(userExits){
            return res.status(400).json({message: 'User already exixts'});
        }

        // hashing password
        const hashedPassword = await bcrypt.hash(password,10);

        // creating user
        const user = await User.create({
            name, email, password:hashedPassword, phone
        });

        // sending response
        res.status(201).json({
            message: 'User registered successfully',
            user: {
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone
            }
        });
    } catch (error) {
        res.status(500).json({message: 'Internal server error'});

    }
}

exports.loginUser = async (req, res) =>{
    try{
        const {email,password} = req.body;

        // check for user 
        const user = await User.findOne({email});
        if(!user){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        // comparing password
        const isMatch = await bcrypt.compare(password, user.password);
        if(!isMatch){
            return res.status(400).json({message: 'Invalid email or password'});
        }

        // creating token 
        // console.log("JWT token: " ,process.env.JWT_SECRET);

        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: '7d' }
        );

        // sending response
        res.status(200).json({
            message: 'Login successfully',
            token,
            user:{
                _id: user._id,
                email: user.email,
                name: user.name
            }
        });
    }catch(error){
        res.status(500).json({message: 'Something went wrong!', error: error.message});
    }
}