const { userModel } = require("../models/auth.model");
const { tokenModel } = require("../models/token.model");
const { asyncHandler } = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");
const redis = require("../config/cache")




const register = asyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!password || (!email && !username)) {
            return res.status(400).json({ message: "Missing credentials" });
        }


        const isUserExist = await userModel.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        })

        if (isUserExist) return res.status(409).json({ message: "User Already Exists" })

        const user = await userModel.create({
            username: username,
            email: email,
            password: password
        })

        const updatedUser = user.toObject()
        delete updatedUser.password;

        const token = jwt.sign({ _id: user._id, username: user.username }, process.env.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
             maxAge: 3 * 24 * 60 * 60 * 1000
        })

        return res.status(201).json({ message: "User created successfully", user: updatedUser, token })


    } catch (error) {
        console.log(error)
    }
})

const login = asyncHandler(async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!password || (!email && !username)) {
            return res.status(400).json({ message: "Missing credentials" });
        }


        const isUserExist = await userModel.findOne({
            $or: [
                { email: email },
                { username: username }
            ]
        }).select("+password")

        if (!isUserExist) return res.status(400).json({ message: "Invalid Credentials" })


        const isMatched = await isUserExist.comparePassword(password)

        if (!isMatched) return res.status(400).json({ message: "Invalid Credentials" })


        const token = jwt.sign({ _id: isUserExist._id, username: isUserExist.username }, process.env.JWT_SECRET, { expiresIn: "3d" })

        res.cookie("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "None",
             maxAge: 3 * 24 * 60 * 60 * 1000
        })

        const userObj = isUserExist.toObject();
        delete userObj.password;

        return res.status(200).json({ message: "User Logged In successfully", user: userObj, token })


    } catch (error) {
        console.log(error)
    }
})


const logOut = asyncHandler(async (req, res) => {
    try {
        const token = req.cookies.token;


        // await tokenModel.create({
        //     token: token
        // })

        await redis.set(token, Date.now().toString(), "EX", 60 * 60 * 24 * 3)

        res.clearCookie("token", token)

        return res.status(200).json({ message: "Logged Out Successfully" })

    } catch (error) {
        console.log(error)
    }
})

const getUser = asyncHandler(async (req, res) => {
    try {
        const id = req.user._id;


        const user = await userModel.findById(id)

        if (user) {
            return res.status(200).json({ message: "User Fetched Successfully", user: user })
        }

        return res.status(404).json({ message: "User not found", user: null })


    } catch (error) {
        console.log(error)
    }
})







module.exports = { register, login, logOut, getUser }