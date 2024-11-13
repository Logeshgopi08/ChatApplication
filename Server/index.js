const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDb = require("./config/connectDb");
const authRouter = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const userRoutes = require("./routes/userRoutes");
const {app,server} = require("./socket/socket");


dotenv.config();
// const app = express();

app.use(cors({
    origin:"http://localhost:3000",
    credentials:true
}));
app.use(express.json());
app.use(cookieParser());



app.use("/auth",authRouter);
app.use("/user",userRoutes);

const PORT = process.env.PORT 

connectDb().then(()=>{
    server.listen(PORT,()=>{
        console.log("Server is running "+ PORT);
        
    });
});