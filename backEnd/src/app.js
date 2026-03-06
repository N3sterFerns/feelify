const dotenv = require("dotenv")
dotenv.config()
const cookieParser = require("cookie-parser")
const express = require("express")
const authRouter = require("./routes/auth.route")
const cors = require("cors")
const songRouter = require("./routes/song.route")


const app = express()
app.use(express.json())
app.use(cookieParser())
app.use(cors({
    origin: process.env.FRONTEND_URL,
    credentials: true
}))

app.use("/api/auth", authRouter)
app.use("/api/songs", songRouter)


module.exports = app