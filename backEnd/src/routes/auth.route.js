const express = require("express")
const { register, login, logOut, getUser } = require("../controllers/auth.controller")
const { verifyAuth } = require("../middlewares/verifyAuth.middleware")


const authRouter = express.Router()


authRouter.post("/register", register)
authRouter.post("/login", login)
authRouter.post("/logout",verifyAuth,  logOut)
authRouter.get("/",verifyAuth,  getUser)



module.exports = authRouter

