const express = require("express")
const { verifyAuth } = require("../middlewares/verifyAuth.middleware")
const upload = require("../middlewares/multer.middleware")
const { songUploadController, getSongController } = require("../controllers/song.controller")

const songRouter = express.Router()

songRouter.post("/", verifyAuth, upload.single("song"), songUploadController)
songRouter.get("/", verifyAuth, getSongController)


module.exports = songRouter