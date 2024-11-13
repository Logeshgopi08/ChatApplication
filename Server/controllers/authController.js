const User = require("../models/userModel");
const bcyprt = require("bcryptjs");
const Jwt = require("jsonwebtoken");
const registerUser = async (req, res) => {
  try {
    const { name, emailId, password, profile_pic } = req.body;

    const checkEmail = await User.findOne({ emailId });
    if (checkEmail) {
      return res.status(400).json({
        message: "Already user exits",
        error: true,
      });
    }

    const slat = await bcyprt.genSalt(10);
    const hashPassword = await bcyprt.hash(password, slat);

    const payload = {
      name,
      emailId,
      password: hashPassword,
      profile_pic,
    };

    const user = new User(payload);
    const userSave = await user.save();
    res.status(201).json({
        message : "User created successfully",
        data : userSave,
        success : true
    })
  } catch (error) {
    return response.status(500).json({
      message: error.message || error,
      error: true,
    });
  }
};

const loginUser = async(req,res)=>{
    try {
        const {emailId,password} = req.body;
        const user = await User.findOne({emailId});
        if(!user){
            return res.status(400).json({
                message:"User not Found",
                error:true
            });
        }
        const verifyPassword = await bcyprt.compare(password,user.password);
        if(!verifyPassword){
            return res.status(400).json({
                message:"Password is Not Match",
                error:true
            });
        }

        const tokenData = {
            id:user._id,
            emailId:user.emailId
        }

        const token = await Jwt.sign(tokenData,process.env.JWT_SECREATE_KEY,{expiresIn:"1d"});

        const cookieOption ={
            http:true,
            secure:true
        }

        return res.cookie("token",token,cookieOption).status(200).json({
            message:"Login Successfully",
            token:token,
            success:true
        });
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true
        })
    }

}

const logoutUser = async(req,res)=>{
  try {
    const cookieOption ={
      http:true,
      secure:true
  }
    const token = req.cookies.token;
    return res.cookie("token","",cookieOption).json({
      message:"logout Successfully",
      success:true
    })

  } catch (error) {
      return res.status(400).json({
        message:error.message,
        success:false
      })
  }
}

module.exports ={registerUser,loginUser,logoutUser}
