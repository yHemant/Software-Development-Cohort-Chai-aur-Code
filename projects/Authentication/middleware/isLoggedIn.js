import jwt from "jsonwebtoken";
import User from "../models/user.model.js"
import cookieParser from "cookie-parser";



const isLoggedIn = async (req, res, next) => {
    // try {
    //     //1. get token from cookie
    //     const token = req.cookies.jwtToken;

    //     if (!token) {
    //         return res.status(400).json({
    //             success: false,
    //             message: "token invalid"
    //         })
    //     }
    //     // verify if token valid
    //     const decoded = jwt.verify(token, process.env.JWT_SECRET)
    
    //     req.user = decoded;
    //     next();
    // }
    
    // catch (error){
        //     return res.status(500).json({
            //         success: false,
            //         message: "Error in checking LoggedIn"
            //     })
            // }
            
            try {
                const accessToken = req.cookies.accessToken;
                // console.log("main hoon naa");
                const refreshToken = req.cookies.refreshToken;
                
                if(!accessToken){
                    if(!refreshToken){
                        return res.status(401).json({
                success: false,
                message: "Unauthorised access",
            })
        }

        const refreshDecoded = jwt.verify(refreshToken, process.env.REFRESHTOKEN_SECRET)
        console.log(refreshDecoded.id);

        const user = await User.findOne({_id:refreshDecoded.id});
        console.log(user.email);

        if(!user){
            return res.status(401).json({
                success: false,
                message: "Please Login Again"
            });
        }

        const newAccessToken = jwt.sign({id: user._id}, process.env.ACCESSTOKEN_SECRET,{
            expiresIn: process.env.ACCESSTOKEN_EXPIRY,
        });
        const newRefreshToken = jwt.sign({id: user._id}, process.env.REFRESHTOKEN_SECRET,{
            expiresIn: process.env.REFRESHTOKEN_EXPIRY,
        });

        user.refreshToken = newRefreshToken;
        await user.save();

        const cookieOptions = {
            httpOnly: true, // prevents from XSS attacks
        } 

        res.cookie("accessToken", newAccessToken, cookieOptions);
        res.cookie("refreshToken", newRefreshToken, cookieOptions);
        req.user = refreshDecoded;
        next();
    }else{
        const accessDecoded = jwt.verify(accessToken, process.env.ACCESSTOKEN_SECRET)

        const user = await User.findOne({_id:accessDecoded.id});
        if(!user){
            return res.status(401).json({
                success: false,
                message: "Unauthorized access"
            });
        }

        const newAccessToken = jwt.sign({id: user._id}, process.env.ACCESSTOKEN_SECRET,{
            expiresIn: process.env.ACCESSTOKEN_EXPIRY,
        });
        const newRefreshToken = jwt.sign({id: user._id}, process.env.REFRESHTOKEN_SECRET,{
            expiresIn: process.env.REFRESHTOKEN_EXPIRY,
        });

        user.refreshToken=newRefreshToken;
        await user.save();
        const cookieOptions = {
            httpOnly: true,
        };

        res.cookie("accessToken", newAccessToken, cookieOptions);
        res.cookie("refreshToken", newRefreshToken, cookieOptions);
        req.user = accessDecoded;
        next();
    }
   } catch (error) {
    console.error("Error verifying token:", error);
    return res.status(500).json({
        success: false,
        message: "Error in isLoggedIn, reached catch"
    })
    
   }
};

export default isLoggedIn