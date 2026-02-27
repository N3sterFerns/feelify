const cookieParser = require("cookie-parser")
const express = require("express")
const dotenv = require("dotenv")
dotenv.config()


const app = express()
app.use(express.json())
app.use(cookieParser())

app.get("/", (req, res)=>{
    res.send("home")
})


module.exports = app