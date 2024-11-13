
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    emailId:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    profile_pic:{
        type:String,
        default :""
    }
},{timestamps:true});

module.exports = mongoose.model("User",userSchema);