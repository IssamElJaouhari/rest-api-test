const mongoose = require("mongoose")

const userSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: true,
            trim: true,
            max:15
        },
        email:{
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
         
        },
        age:{
            type:Number,
            min:0
        },
        createdAt:{
            type:Date,
            default:Date.now
        }
    }
)

module.exports = mongoose.model('User', userSchema)