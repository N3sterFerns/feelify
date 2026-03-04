const mongoose = require("mongoose")

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(`mongodb+srv://videomedia:${process.env.MONGODB_PASS}@feelify.stugcgl.mongodb.net/feelify`)
        return connect
    } catch (error) {
        console.log(error)
    }
}

module.exports = {dbConnect}