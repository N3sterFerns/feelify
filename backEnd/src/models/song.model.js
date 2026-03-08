const mongoose = require("mongoose")


const songSchema = mongoose.Schema({
    url:{
        type: String,
        required: [true, "Url is required"],
    },
    posterUrl:{
        type: String,
        required: [true, "Poster Url is required"],
    },
    title:{
        type: String,
        required: [true, "title is required"],
    },
    mood:{
        type:String,
        enum:['happy','sad','surprised','angry','neutral'],
        default:"neutral"
    }

}, {timestamps: true})


const songModel = mongoose.model("song", songSchema)

module.exports = {songModel}