import { User } from "../models/user.model.js";
import httpStatus from "http-status";
import bcrypt from "bcrypt";
import crypto from "crypto";

const register = async (req,res) => {
    const { name , username , password } = req.body;
    try {
        const existingUser = await User.findOne({ username });
        if(existingUser){
            return res.status(httpStatus.CONFLICT).json({message : "user already exist"});
        }
        const hashedPassword = await bcrypt.hash(password , 10);
        const newUser = new User({
            name : name,
            username : username,
            password : hashedPassword
        })
        await newUser.save();
        res.status(httpStatus.CREATED).json({message : "User Registered"});
    }
    catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({message :  `something went wrong : ${e.message} !`});
    }
}

const login = async (req,res) =>{
    const {username , password} = req.body;
    if(!username || !password){
        return res.status(httpStatus.BAD_REQUEST).json({message : "Please enter info"});
    }
    try{
        const user = await User.findOne({ username });
        if(!user){
            return res.status(httpStatus.NOT_FOUND).json({message : "please sign up"});
        }
        const isMatch = await bcrypt.compare(password,user.password);
        if(isMatch){
            let token = crypto.randomBytes(20).toString("hex");

            user.token = token;
            await user.save();
            return res.status(httpStatus.OK).json({ token : token});
        }
        else{
            return res.status(httpStatus.UNAUTHORIZED).json({message : "Invalid Username or password"});
        }
    }
    catch(e){
        return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({ message : "something went wrong"});
    }
}

export {login , register};