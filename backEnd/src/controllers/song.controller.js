const { default: mongoose } = require("mongoose");
const { moodHistoryModel } = require("../models/moodHistory.model");
const { songModel } = require("../models/song.model");
const { uploadFile } = require("../services/storage.service");
const { asyncHandler } = require("../utils/asyncHandler");
const id3 = require("node-id3")
// const {parseBuffer} = require("music-metadata")


const songUploadController = asyncHandler(async (req, res) => {
    const { mood } = req.body;
    try {
        const songBuffer = req.file.buffer
        const tags = id3.read(req.file.buffer)
        console.log(tags)
        const [songFile, posterFile] = await Promise.all([
            uploadFile({
                buffer: songBuffer,
                filename: tags.title + ".mp3",
                folder: "/feelify/songs"
            }),
            uploadFile({
                buffer: tags.image.imageBuffer,
                filename: tags.title + ".jpeg",
                folder: "/feelify/posters"
            })

        ])



        const song = await songModel.create({
            title: tags.title,
            url: songFile.url,
            posterUrl: posterFile.url,
            mood: mood
        })

        return res.status(201).json({ message: "Song uploaded successfully", song })

    } catch (error) {
        console.log(error)
    }
})


const getSongController = asyncHandler(async (req, res) => {
    try {
        const { mood, intensity, level, recommended } = req.query;
        const userId = req.user._id;

        const intensityValue = Number(intensity);

        const moodMap = {
            sad: "happy",
            angry: "happy"
        }

        const recommendedMood = moodMap[mood] || mood;


        const result = await songModel.aggregate([
            { $match: { mood: recommendedMood } },
            { $sample: { size: 7 } }
        ]);


        if (!result.length) {
            return res.status(404).json({ message: "No songs found for this mood" });
        }

        const song = result[0];
        const recommendations = result.splice(1, 7)

        await moodHistoryModel.create({
            emotion: mood,
            intensity,
            level,
            recommendedMood: recommended,
            song: song._id,
            user: userId
        })

        return res.status(200).json({
            message: "Song fetched successfully",
            song: song,
            intensity: intensityValue,
            detectedEmotion: mood,
            recommendedMood: recommendedMood,
            level,
            songs: recommendations
        })

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" }); 
    }
})

const getMoodHistoryController = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;
        const history = await moodHistoryModel.find({ user: userId }).populate("song", "title").sort({ createdAt: -1 }).limit(20)

        return res.status(200).json({
            message: "Mood history created",
            history
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" }); 
    }
})

const clearMoodHistory = asyncHandler(async (req, res) => {
    try {
        const userId = req.user._id;

        await moodHistoryModel.deleteMany({ user: userId })

        return res.status(200).json({
            message: "Mood history cleared successfully"
        });

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" }); 
    }
    
})

const getMoodAnalyticsController = asyncHandler(async (req, res)=>{
    try {
        const sevenDaysAgo = new Date()
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7)

        const analytics = await moodHistoryModel.aggregate([
            {
                $match:{
                    user:  new mongoose.Types.ObjectId(req.user._id),
                    createdAt: {$gte: sevenDaysAgo}
                }
            },
            {
                $group:{
                    _id: "$emotion",
                    count: {$sum: 1}
                }
            },
            {
                $project:{
                    emotion: "$_id",
                    count: 1,
                    _id: 0
                }
            }
        ])


        return res.status(200).json({
            message: "Mood Analytics Fetched",
            analytics
        })
        
    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Server error" }); 
    }
})


module.exports = { songUploadController, getSongController, clearMoodHistory, getMoodHistoryController, getMoodAnalyticsController }