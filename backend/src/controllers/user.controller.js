import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt ,{ hash } from "bcrypt";
import crypto from "crypto";

const register = async (req,res) => {
    const { name , username , password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(httpStatus.FOUND).json({message : "user already exist"});
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const newUser = new User({
            name : name,
            username : username,
            password : hashedPassword
        })
        await newUser.save();
        res.status(httpStatus.CREATED).json({messgae : "User Registered"});
    }
    catch(e){
        res.json({message :  `something went wrong : ${e.message} !`});
    }
}

const login = async (req,res) =>{
    const {username , password} = req.body;
    if(!username || !password){
        return res.status(httpStatus[400]).json({message : "Please enter info"});
    }
    try{
        const user = await User.find({ username });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({messgae : "please sign up"});
        }
        if(bcrypt.compare(password , user.password)){
            let token = crypto.randomBytes(10);
        }
    }
    catch(e){

    }
}

export {register};