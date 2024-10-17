const mongoose = require('mongoose')
const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required:[true,'User name is required'],
        trim:true,
    },
    email:{
        type:String,
        required:[true,'Email rquired'],
        unique:true,
        lowercase:true
    },
    password:{
        type:String,
        required:[true,'Password required']
    }
})
const users = mongoose.model("users",userSchema)
module.exports = users
