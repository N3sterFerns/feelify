const { songModel } = require("../models/song.model");
const { uploadFile } = require("../services/storage.service");
const { asyncHandler } = require("../utils/asyncHandler");
const id3 = require("node-id3")
// const {parseBuffer} = require("music-metadata")


const songUploadController = asyncHandler(async (req, res)=>{
    const {mood} = req.body;
    try {
        const songBuffer = req.file.buffer
        const tags = id3.read(req.file.buffer)
        console.log(tags)
        const [songFile, posterFile] = await Promise.all([
            uploadFile({
                buffer: songBuffer,
                filename: tags.title+".mp3",
                folder: "/feelify/songs"
            }),
            uploadFile({
                buffer: tags.image.imageBuffer,
                filename: tags.title+".jpeg",
                folder: "/feelify/posters"
            })

        ])



        const song = await songModel.create({
            title: tags.title,
            url: songFile.url,
            posterUrl: posterFile.url,
            mood: mood
        })

        return res.status(201).json({message: "Song uploaded successfully", song})
        
    } catch (error) {
        console.log(error)
    }
})


const getSongController = asyncHandler(async (req, res)=>{
    try {
        const {mood} = req.query;

        const song = await songModel.aggregate([
            { $match: { mood: mood } },
            { $sample: { size: 1 } }
        ]);

        if (!song.length) {
            return res.status(404).json({ message: "No songs found for this mood" });
        }

        return res.status(200).json({message: "Song fetched successfully", song: song[0]})
        
    } catch (error) {
        console.log(error)
    }
})


module.exports = {songUploadController, getSongController}