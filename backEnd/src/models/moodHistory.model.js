const mongoose = require("mongoose")


const moodHistorySchema = mongoose.Schema({
    emotion: {
        type: String,
        required: true,
    },
    intensity: {
        type: String,
        required: true,
    },
    level: {
        type: String,
        required: true,
    },
    recommendedMood: {
        type: String,
    },
    song: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "song",
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user"
    },

    dayofWeek: {
        type: String,
        enum: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
        default: () => {
            const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
            return days[new Date().getDay()];
        }
    }

}, { timestamps: true })


moodHistorySchema.index({user: 1, emotion: 1})


const moodHistoryModel = mongoose.model("moodhistory", moodHistorySchema)

module.exports = { moodHistoryModel }