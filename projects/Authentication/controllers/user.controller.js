
import User from "../models/user.model.js";
import crypto from "crypto";
import sendVerificationEmail from "../utils/sendMail.utils.js";
import jwt from 'jsonwebtoken';
const register = async (req, res)=> {
    // 1. get user data from req body
    console.log("entered in register function")
    const {name, email, password } = req.body;
    
    console.log("name email password allocated", {name, email, password})
    //2. validate data

    if(!name || !email || !password) {
        return res.status(400).json({
            success: false,
            message: "All fields are required"
        })
    }

    // 3. password check

    if (password.length < 6) {
        return res.status(400).json({
            success: false,
            message: "password is not valid"
        })
    }

    try {
        console.log("entered in try block")
        // 1. if existing user
        const existingUser =  await User.findOne({
            email
        });
        console.log(`existing user with this email (${email})  is ${existingUser}`)
        if (existingUser){
            return res.status(400).json({
                success: false,
                message: "User is already exists"
            })
        }

        // 2. User verification token
        const token = crypto.randomBytes(32).toString("hex");
        const tokenExpiry = Date.now() + 10*60*60*1000;

        console.log(`token created successfully token: ${token} and expiry: ${tokenExpiry}`);
        // 3. create a new user
        const user = await User.create({
            name,
            email,
            password,
            verificationToken: token,
            verificationTokenExpiry: tokenExpiry
        })

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "User not created"
            })
        }

        //
        await sendVerificationEmail(user.email, token);

        //response to user
        return res.status(200).json({
            success: true,
            message: "User registered successfully, please verify your email"
        })

    } catch (error) {
       return res.status(500).json({
        success: false,
        message: "Internal server error",
       }); 
    }
};

// verify controller
const verify = async (req, res) => {
    try {
        // 1. get token from params
        const token = req.params.token;

        // get user
        const user =  await User.findOne({
            verificationToken: token,
            verificationTokenExpiry: {$gt: Date.now()}
        })

        // does user exist
        if(!user){
            return res.status(200).json({
                success: false,
                message: "token invalid"
            })
        }

        user.isVerified = true;
        user.verificationToken =  undefined;
        user.verificationTokenExpiry = undefined;
        
        await user.save();

        return res.status(200).json({
            success: true,
            message: "User account is verified"
        })
    } catch(error){
        return res.status(500).json({
            success: false,
            message: "Internal server error",
           });    
    }
}

// Login controller
const login = async (req, res) =>{
    // 1. get user data
    const { email, password } = req.body

    // 2. validate
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            message: "all fields required"
        })
    }

    try {
        const user = await User.findOne({email});

        if(!user) {
            return res.status(400).json({
                success: false,
                message: "user not found"
            })
        }

        // check if user verified
        if(!user.isVerified) {
            return res.status(400).json({
                success: false,
                message: "user not verified"
            });
        }

        //check password
        const isPasswordMatch = await user.comparePassword(password);
        console.log(`password match? ${isPasswordMatch}`)
        if (!isPasswordMatch){
            return res.status(400).json({
                success: false,
                message: "password is not correct"
            });
        }

        //jwt token
        const accessToken = jwt.sign({id: user._id}, process.env.ACCESSTOKEN_SECRET, {
            expiresIn: process.env.ACCESSTOKEN_EXPIRY,
        })
        
        const refreshToken = jwt.sign({id: user._id}, process.env.REFRESHTOKEN_SECRET, {
            expiresIn: process.env.REFRESHTOKEN_EXPIRY
        })

        user.refreshToken=refreshToken;

        await user.save();

        // set cookie

        const cookieOptions = {
            httpOnly: true, // prevents from XSS attacks
        }

        // res.cookie("jwt", jwtToken, cookieOptions)
        res.cookie("accessToken", accessToken, cookieOptions);
        res.cookie("refreshToken", refreshToken, cookieOptions);

        return res.status(200).json({
            success: true,
            message: "Login Successfull"
        })

    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
           }); 
    }

}

// get profile controller

const getProfile = async (req, res) => {
    // get user id from request object
    const userId = req.user.id;

    const user = await User.findById(userId).select("-password")

    if(!user){
        return res.status(400).json({
            success: false,
            message: "password is not correct",
        });
    }
    return res.status(200).json({
        success: true,
        message:"user profile accessed"
    })
}


const logout = async (req, res) =>{
    const token = req.cookies.refreshToken;
    if(!token){
        return res.status(401).json({
            success: false,
            message: "Unauthorized access"
        })
    }

    try {
        const refreshDecoded = jwt.verify(token, process.env.REFRESHTOKEN_SECRET);
        const user = await User.findOne({_id:refreshDecoded.id});

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }
        user.refreshToken=null;

        //2. clear cookie
        res.cookie("accessToken", "",{
            httpOnly: true,
        });
        res.cookie("refreshToken", "", {
            httpOnly: true,
        })

        // 3. send response
        return res.status(200).json({
            status: true,
            message: "User logged out successfully"
        });
    } catch (error) {
        console.error("User logout failed", error);
        return res.status(500).json({
            success: false,
            message: "User logout failed"
        });
    }
};

export { register, verify, login, getProfile };