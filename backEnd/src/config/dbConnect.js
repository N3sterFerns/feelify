const mongoose = require("mongoose")

const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(`${process.env.MONGO_URL}/feelify`)
        return connect
    } catch (error) {
        console.log(error)
    }
}

module.exports = {dbConnect}