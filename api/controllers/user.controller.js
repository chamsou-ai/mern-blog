const User = require("../models/user.model.js");
const errorHandler = require('../utils/error.js')
const bcryptjs = require("bcryptjs")

const test = (req,res)=>{
res.json({message:"API is working !"})

};

const updateUser = async (req,res,next)=>{
  if(req.user.id !== req.params.userId){
    return next(errorHandler(403,"You can update only your account !"))
  }
  if(req.body.password ){
    if(req.body.password.length < 6){
      return next(errorHandler(400,"Password must be at least 6 characters !"))
    }
    req.body.password= bcryptjs.hashSync(req.body.password,10)
  }
  if(req.body.username){
    if(req.body.username < 7 || req.body.username > 20){
      return next(errorHandler(400,"Username must be between 7 and 20 characters !"))
    }
    if(req.body.username.includes(" ")){
      return next(errorHandler(400,"Username cannot contain spaces !"))
    }
    if(req.body.username !== req.body.username.toLowerCase()){
      return next(errorHandler(400,"Username must be lowercase !"))
    }
    if(!req.body.username.match(/^[a-zA-Z0-9]+$/)){
      return next(errorHandler(400,"Username can only contain alphanumeric characters !"))
    }
  }
  try{
    const updatedUser = await User.findByIdAndUpdate(req.params.userId,
    {
      $set:{
        username:req.body.username,
        email:req.body.email,
        password:req.body.password,
        profilePicture:req.body.profilePicture
      }
    },
    {
      new:true
    })
    const {password:pass , ...rest} = updatedUser._doc
    res.status(200).json(rest)
  }catch(error){
    next(errorHandler(400,error.message))
  }
}
const deleteUser = async (req,res,next)=>{
  if(req.user.id !== req.params.userId){
    return next(errorHandler(403,"You can delete only your account !"))
  }
  try{
    await User.findByIdAndDelete(req.params.userId)
    res.status(200).json("User deleted")
  }
  catch(error){
    next(errorHandler(400,error.message))
  }
}
const signout = (req,res,next)=>{
  try{
  res.clearCookie("access_token").status(200).json("User has been signed out !")
  }
  catch(error){
    next(error)
  }
}


module.exports  = {test,updateUser,deleteUser , signout}

