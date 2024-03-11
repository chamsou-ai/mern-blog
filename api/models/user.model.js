const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  username:{
    type:String,
    required:true,
    unique: true,
  },
  email:{
    type:String,
    required:true,
    unique: true,
  },
  password:{
    type:String,
    required:true,
  },
  profilePicture:{
    type:String,
    default: "https://www.flaticon.com/free-icon/user_149071?term=user&page=1&position=12&origin=tag&related_id=149071",
  },
  isAdmin:{
    type:Boolean,
    default: false,
  }
  },{timestamps:true}
);

const User = mongoose.model("User",userSchema);

module.exports = User
