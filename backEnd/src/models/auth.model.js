const mongoose = require("mongoose")
const bcrypt = require("bcrypt")


const userSchema = mongoose.Schema({
    username: {
        type: String,
        unique: [true, "Username should be unique"],
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        unique: [true, "email should be unique"],
        required: [true, "email is required"]
    },
    password: {
        type: String,
        required: [true, "password is required"],
        select: false
    },
}, {
    timestamps: true
})




userSchema.pre("save", async function () {
    try {
        if(!this.isModified("password")){
            return 
        }
    
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(this.password, salt)
    
        this.password = hashPassword
    } catch (error) {
        console.log(error)
    }

})


userSchema.methods.comparePassword = async function(password){
    return await bcrypt.compare(password, this.password)
}


const userModel = mongoose.model("user", userSchema);

module.exports = {userModel}