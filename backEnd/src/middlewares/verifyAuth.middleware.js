const jwt = require("jsonwebtoken");
const { tokenModel } = require("../models/token.model");
const redis = require("../config/cache.js")

const verifyAuth = async (req, res, next)=>{
    try {
        const token = req.cookies.token;
    
        if(!token) return res.status(401).json({message: "Unauthorized access"})
            
        // const isTokenBlackListed = await tokenModel.findOne({token: token});
        const isTokenBlackListed = await redis.get(token)
        
        if(isTokenBlackListed) return res.status(401).json({message: "Invalid token"})
            
        const isValidToken =  jwt.verify(token, process.env.JWT_SECRET);
            
        if(!isValidToken) return res.status(401).json({message: "Invalid token"})
    
        req.user = isValidToken;
        next()
    } catch (error) {
        console.log(error)
        return res.status(401).json({ message: "Invalid or expired token" })
    }
}

module.exports = {verifyAuth}