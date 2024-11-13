
const express  = require("express");
const {userDetails, updateUserDetails, SearchUser} = require("../controllers/userController");
const userRoutes = express.Router();

userRoutes.get("/user-detail",userDetails);
userRoutes.post("/update",updateUserDetails);
userRoutes.post("/search",SearchUser);


module.exports = userRoutes;