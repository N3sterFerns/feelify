const express = require("express")
const { verifyAuth } = require("../middlewares/verifyAuth.middleware")
const upload = require("../middlewares/multer.middleware")
const { songUploadController, getSongController, getMoodHistoryController, clearMoodHistory, getMoodAnalyticsController } = require("../controllers/song.controller")

const songRouter = express.Router()

songRouter.post("/", verifyAuth, upload.single("song"), songUploadController)
songRouter.get("/", verifyAuth, getSongController)
songRouter.get("/mood-history", verifyAuth, getMoodHistoryController)
songRouter.get("/clear-history", verifyAuth, clearMoodHistory)
songRouter.get("/analytics", verifyAuth, getMoodAnalyticsController)


module.exports = songRouter