
const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
async function connectDb (){
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Database Connected");
        
        const connection = mongoose.connection;
        connection.on("connected",()=>{
            console.log("Connected to Database");
            
        });

        connection.on("error",()=>{
            console.log("Not Connected to Database");
            
        })
    } catch (error) {
        console.log("Something is Wrong",error);
        
    }
}

module.exports = connectDb;