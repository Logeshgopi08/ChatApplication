const User = require("../models/userModel");
const getUserDetails = require("../helper/getUserDetails");

const userDetails = async(req,res)=>{
    try {
        const token = req.cookies.token ;
        
        const user = await getUserDetails(token);

        

        return res.status(200).json({
            message:"User details",
            data:user,
            success:true
        });
        
    } catch (error) {
        return response.status(500).json({
            message : error.message || error,
            error : true
        });
    }
}

const updateUserDetails = async(req,res)=>{
    try {
        const token = req.cookies.token;

    const user = await getUserDetails(token);
    // console.log(user);
    

    const {name,profile_pic} = req.body;
    console.log(name);
    

    const updated = await User.updateOne({_id:user._id},{name,profile_pic});
     
     
      const updatedUser = await User.findById(user._id).select("-password");
    //   console.log(updatedUser);
      

    return res.status(200).json({
        messgage:"Updated Successfully",
        data:updatedUser,
        success:true
    });

    } catch (error) {
        return res.status(400).json({
            message:error.message,
            success:false
        })
    }

}

const SearchUser = async(req,res)=>{
   const token = req.cookies.token;
   const user =  await getUserDetails(token);
   try {
    const {search} = req.body;
   const query = new RegExp(search,"i","g");

   const searchUser = await User.find({
    $or:[
        {name:query},
        {emailId:query}
    ]
   }).select("-password");

   res.status(200).json({
    message:"Search User",
    data:searchUser,
    success:true
   })
   } catch (error) {
    res.status(500).json({
        message:error.message,
        error:true
    })
   }
   
   
}

module.exports = {userDetails,updateUserDetails,SearchUser};