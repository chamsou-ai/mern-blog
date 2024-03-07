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
    default: "https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909563_Bupx0k1Nqdz2tXPs78semH3IoGEjehgF.jpg",
  }
  },{timestamps:true}
);

const User = mongoose.model("User",userSchema);

module.exports = User
