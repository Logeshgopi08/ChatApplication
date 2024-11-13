const mongoose = require("mongoose");

const conversationSchema = new mongoose.Schema({
    sender:{
        type: mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    receiver:{
        type:mongoose.Schema.ObjectId,
        required:true,
        ref:"User"
    },
    messages :[
        {
            type:mongoose.Schema.ObjectId,
            ref:"Message",
            
        }
    ]
});


module.exports = mongoose.model("conversation",conversationSchema);