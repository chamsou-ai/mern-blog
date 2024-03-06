
const User = require("../models/user.model.js")
const bcryptjs = require("bcryptjs");
const errorHandler = require("../utils/error.js");
const JWT = require("jsonwebtoken")

const signup = async (req,res , next )=>{
  const {username , email , password} = req.body;

  if(!username || !email || !password || username === "" || email === "" || password === ""){
    next(errorHandler(400,"All fields are required "));
  }

  
  const hashedPassword = bcryptjs.hashSync(password,10)

  const newUser = new User({
    username,
    email,
    password:hashedPassword
  })

  try {
    await newUser.save();
    res.json("Signup succesful")
  } catch (error) {
    next(error)
  }
}
const signin = async (req,res,next)=>{
  const { email,password } = req.body
  if(!email || !password || email === "" || password === ""){
    return next(errorHandler(400,"All fields are required !"))
  }
  try {

    const validUser = await User.findOne({email})
    if(!validUser){
      return next(errorHandler(404,"User not found"))
    }
    const validPassword = bcryptjs.compareSync(password,validUser.password)
    if(!validPassword){
      return next(errorHandler(404, "Invalid password"))
    }

    const {password:pass , ...rest} = validUser._doc;

    const token = JWT.sign(
      {id: validUser._id } , process.env.JWT_SECRET
    )
    res.status(200).cookie('access_token',token,{
      httpOnly:true
    }).json(rest)
  } catch (error) {
    next(error)
  }
} 

module.exports = {signup , signin}