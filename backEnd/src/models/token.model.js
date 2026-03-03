const mongoose = require("mongoose");


const tokenSchema = mongoose.Schema({
    token: {
        type: String,
        required: [true, "Username is required"]
    },
}, {
    timestamps: true
})


const tokenModel = mongoose.model("token", tokenSchema);


module.exports = {tokenModel}