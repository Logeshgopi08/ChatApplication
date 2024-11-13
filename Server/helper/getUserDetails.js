const Jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const getUserDetails = async(token)=>{
    try {
        if(!token ){
            return {
                message:"session Time Out",
                error:true
            }
        }
    
    
        const decode = await  Jwt.verify(token,process.env.JWT_SECREATE_KEY);
        if(!decode){
            return {
                message:"Invalid Token",
                error:true
            }
        }
        //  console.log(decode);
         
        const user = await User.findById(decode.id);
        
        
    
        return user;
    } catch (error) {
        return {
            message:error.message
        }
    }
}

module.exports = getUserDetails;